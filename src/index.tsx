import {StyleSheet, Constants, Dialog, React, Toasts, Navigation} from 'enmity/metro/common'
import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {bulk, filters} from 'enmity/metro'
import {Image, Text, View, TextInput} from 'enmity/components'
import {get, set} from 'enmity/api/settings'
import {create} from 'enmity/patcher'
import {getIDByName} from "enmity/api/assets"


import {e} from "./utils/encryption"
import Settings from "./components/Settings"
import lock from "./components/Commands"
import UnlockModal from "./components/UnlockModal"

const Patcher = create('K2geLocker')

// get modules
const [
    Messages,
    LazyActionSheet,
    GuildTooltipActionSheets,
    GuildsConnected
] = bulk(
    filters.byName('MessagesConnected', false),
    filters.byProps("openLazy", "hideActionSheet"),
    filters.byName('GuildTooltipActionSheets', false),
    filters.byName("GuildsConnected", false)
)

// asset resources
const LockIcon = getIDByName('nsfw_gate_lock')
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')
const KeyIcon = getIDByName('ic_locked_24px')
const KeyIcon2 = getIDByName('ic_full_server_gating_24px')

import {findInReactTree, wrapInHooks} from 'enmity/utilities'

const K2geLocker: Plugin = {
    name: 'K2geLocker',
    version: '1.1.0',
    description: 'Lock the specific server with passcode.',
    authors: [
        {
            name: 'mafu',
            id: '519760564755365888'
        }
    ],
    onStart() {

        // add command
        this.commands = [lock]
        // variables
        let handleGuildFolderExpand
        // let previous_id = "0"
        let cachedSelectedGuild = "0"
        let n = this.name
        if (get(this.name, "inv_hijack") === undefined) {
            set(this.name, "inv_hijack", true)
        }

        // Guild更新に使える関数を取得
        // GuildsConnected // 起動時に呼び出し
        // (フォルダー開閉バグはこの関数をフックしていることによるが、フックを外すとGuild更新が行われなくなってしまうため外せない)
        Patcher.after(GuildsConnected, "default", (self, args, org) => {
            // Guilds
            Patcher.after(org, "type", (self, args, org) => {
                handleGuildFolderExpand = org.handleGuildFolderExpand
            })
        })

        // on render
        // Viewのrender関数をフックしてひたすら追跡
        const unpatch = Patcher.after(View, 'render', (_, __, res) => {
            const Guild = findInReactTree(res, r => r.props?.delayLongPress == 300 && r.props?.onGuildSelected === undefined && r.props?.guild)
            if (Guild) {
                // Guild
                Patcher.before(Guild.type, 'type', (self, args, res) => { // args[0]: Guild / res: Guild (同じ)
                    // if (previous_id != args[0].guild.id) {
                    //     console.log(`-- Guild更新 --${args[0].guild.id}`)
                    // }
                    // previous_id = args[0].guild.id
                    // 先にロックされているかに合わせてonGuildSelectedを編集してから元の関数へ(Patcher.before)
                    if (get(this.name, args[0].guild.id)) {
                        //　ロック時 : undefined以外が入っていると、この関数が呼び出され通常の動作をしない
                        args[0].onGuildSelected = (guildId) => {
                            if (handleGuildFolderExpand === undefined) {
                                Toasts.open({
                                    content: "You need to reload Discord first to properly initialize K2geLocker.",
                                    source: FailIcon
                                })
                            } else {
                                // アイコンがおされてOnGSが呼ばれた時点で参照して使用しているので問題なし
                                Navigation.push(
                                    UnlockModal, {guildId: guildId, fn: handleGuildFolderExpand}
                                )
                            }
                        }
                    } else { // 非ロック時 : undefinedが入っているときは通常の動作をする
                        args[0].onGuildSelected = undefined
                    }
                    // 以上の変更はGuild関数が呼びだされて更新したあとに適用されるのでlock状態変更時には必ず適切な関数を呼びだして更新する必要がある
                })
                return // Guildが見つかればもう他はチェックする必要はないので
            }

            // GuildPopoutMenu : 目的のプロパティを持つオブジェクトを探す -> 結果がundefinedでなければそれが目的のオブジェクトなのでそれをフックする
            const GuildPopoutMenu = findInReactTree(res, r => r.props?.guildId && r.props?.yPos && r.props?.onClose)
            if (!GuildPopoutMenu) return  // [Object].props.guildIdが存在するかどうか
            // PopoutMenu : [Object].type.renderにある関数をフックする
            Patcher.after(GuildPopoutMenu.type, 'render', (_, args, res) => {
                // args[0]: { type: 'guild', title: 'guild_name',  guildId: '', yPos: 120.5, onClose: [Function: onClose]
                if (get(this.name, args[0].guildId)) {
                    // 完全置換
                    res.props.rows = [{
                        "icon": KeyIcon2,
                        "text": "Unlock Server",
                        "onClick": () => {
                            if (handleGuildFolderExpand === undefined) {
                                Toasts.open({
                                    content: "You need to reload Discord first to properly initialize K2geLocker.",
                                    source: FailIcon
                                })
                            } else {
                                // アイコンがおされてOnGSが呼ばれた時点で参照して使用しているので問題なし
                                Navigation.push(
                                    UnlockModal, {guildId: args[0].guildId, fn: handleGuildFolderExpand}
                                )
                            }
                        }
                    }]
                } else {
                    // 他の要素と同様の形式で新規追加
                    res.props.rows.unshift({ // 先頭に追加
                        "icon": KeyIcon,
                        "text": "Lock Server",
                        "onClick": () => {
                            if (get(this.name, "passcode") === undefined) {
                                Toasts.open({
                                    content: "Please set passcode in plugin setting before you lock the server!",
                                    source: FailIcon
                                })
                            } else if (handleGuildFolderExpand === undefined) {
                                Toasts.open({
                                    content: "You need to reload Discord first to properly initialize K2geLocker.",
                                    source: FailIcon
                                })
                            } else if (get(this.name, args[0].guildId)) {
                                Toasts.open({
                                    content: "This server is already locked!",
                                    source: FailIcon
                                })
                            } else {
                                set(this.name, args[0].guildId, true)
                                // onGuildSelectedの中身を更新
                                handleGuildFolderExpand()
                                Toasts.open({
                                    content: "Successfully locked!",
                                    source: StarIcon
                                })
                            }
                        }
                    })
                }
                return res
            })

            // MEMO
            // const test = findInReactTree(res, r => r.props?.onSelect) // Patcher.after(test.type, 'type', (_, args, res) =>()) // 下のバー
            // const test = findInReactTree(res, r => r.props?.accessibilityLabel === "ダイレクトメッセージ" && r.props?.onPress) // 色々なボタンの押下をフックできる
            // const test = findInReactTree(res, r => r.props?.onPress // これも様々なボタン
            // ConnectedDCDChat : on Event × たくさん

            // 通常Guildが起動時に呼ばれる=先に呼ばれるためこの順序でここまでたどり着いた場合にunpatchする
            unpatch() // 目的のオブジェクトを見つけてフック出来た後は不要なので
        })
        // on select server
        Patcher.instead(GuildTooltipActionSheets, "default", (self, args, org) => {
            cachedSelectedGuild = args[0]["guildId"] // cache selected server id
            return org.apply(self, args) // 別のものを返しても全く影響なし
        })
        // on load channel
        Patcher.instead(Messages, 'default', (self, args, org) => {
            let res = org.apply(self, args)
            let guild_id = res?.props?.guildId
            if (guild_id && get(this.name, guild_id)) { // replace return view
                const styles = StyleSheet.createThemedStyleSheet({
                    container: {
                        fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Constants.ThemeColorMap.BACKGROUND_PRIMARY
                    },
                    image: {
                        width: 120,
                        height: 120,
                        padding: 5,
                        marginBottom: 30
                    },
                    header: {
                        color: Constants.ThemeColorMap.HEADER_PRIMARY,
                        fontWeight: 'bold',
                        fontSize: 25
                    },
                    text: {
                        color: Constants.ThemeColorMap.HEADER_SECONDARY,
                        fontSize: 16
                    },
                    passcode: {
                        width: 100,
                        height: 20,
                        marginTop: 30,
                        borderWidth: 1,
                        borderColor: Constants.ThemeColorMap.HEADER_SECONDARY,
                        backgroundColor: Constants.ThemeColorMap.HEADER_SECONDARY
                    },
                    footer: {
                        color: Constants.ThemeColorMap.HEADER_SECONDARY,
                        fontSize: 16,
                        marginTop: 100,
                        marginBottom: 70
                    }
                })

                return <View style={styles.container}>
                    <Image style={styles.image} source={LockIcon}/>
                    <Text style={styles.header}>
                        This server is locked!
                    </Text>
                    <Text style={styles.text}>
                        enter passcode to unlock
                    </Text>
                    <TextInput
                        style={styles.passcode}
                        onSubmitEditing={
                            (event) => {
                                // password certification
                                if (event.nativeEvent.text == e(get(this.name, "passcode"), `${n[0]}${n[1]}${n[4]}`)) {
                                    set(this.name, guild_id, false)
                                    Toasts.open({
                                        content: "Successfully unlocked!",
                                        source: StarIcon
                                    })
                                } else {
                                    Toasts.open({
                                        content: "Incorrect password. Try again.",
                                        source: FailIcon
                                    })
                                }
                            }
                        }
                        secureTextEntry={true}
                    />
                    <Text style={styles.footer}>
                        K2geLocker
                    </Text>
                </View>
            } else {
                return res
            }
        })
        // on open invite menu
        Patcher.instead(LazyActionSheet, "openLazy", (self, args, org) => {
            let sheet = args[1]
            if ((sheet.startsWith("instant-invite") || sheet.startsWith("vanity-url-invite")) && get(this.name, "inv_hijack")) {
                if (get(this.name, cachedSelectedGuild)) {
                    Dialog.show({
                        title: "K2geLocker",
                        body: "This server is locked",
                        confirmText: "Ok"
                    })
                } else {
                    Dialog.show({
                        title: "K2geLocker",
                        body: "Select an action",
                        confirmText: "Lock the Server",
                        cancelText: "Open invite menu",
                        onConfirm: () => {
                            if (get(this.name, "passcode") === undefined) {
                                Toasts.open({
                                    content: "Please set passcode in plugin setting before you lock the server!",
                                    source: FailIcon
                                })
                            } else {
                                set(this.name, cachedSelectedGuild, true)
                                Toasts.open({
                                    content: "Successfully locked!",
                                    source: StarIcon
                                })
                            }
                        },
                        onCancel: () => {  // open original menu
                            org.apply(self, args)
                        }
                    })
                }
            } else {
                org.apply(self, args)
            }
        })
    },
    onStop() {
        this.commands = []
        Patcher.unpatchAll()
    },
    getSettingsPanel({settings}) {
        return <Settings settings={settings}/>
    }
}

registerPlugin(K2geLocker)