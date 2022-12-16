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
    GuildTooltipActionSheets
] = bulk(
    filters.byName('MessagesConnected', false),
    filters.byProps("openLazy", "hideActionSheet"),
    filters.byName('GuildTooltipActionSheets', false)
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

        // const [
        //     t1,
        //     t2,
        //     t3
        // ] = bulk(
        //     filters.byProps('fetchGuild'),
        //     filters.byProps('getGuilds'),
        //     filters.byProps('updateGuild')
        // )
        //
        // console.log(t1)
        // console.log(t2)
        // console.log(t3)
        // Patcher.after(t3, "updateGuild", (self, args, org) => {
        //     console.log(args)
        //     console.log(org)
        // })
        // console.log(t2.getGuilds())

        // add command
        this.commands = [lock]
        // variables
        let cachedArgs = {}
        let cachedOLP = {}
        let cachedSelectedGuild = "0"
        let n = this.name
        if (get(this.name, "inv_hijack") === undefined) {
            set(this.name, "inv_hijack", true)
        }
        // on render
        // Viewのrender関数をフックしてひたすら追跡
        const unpatch = Patcher.after(View, 'render', (_, __, res) => {
            const Guild = findInReactTree(res, r => r.props?.delayLongPress == 300 && r.props?.onGuildSelected === undefined && r.props?.guild)
            if (Guild) {
                // guildUpdate = Guild.type.type
                // console.log(Guild)

                // Guild
                Patcher.before(Guild.type, 'type', (self, args, res) => { // args[0]: Guild / res: Guild (同じ)
                    // console.log(`--Guild更新before--${args[0].guild.id}`)
                    // if (args[0].TROLL){
                    //     console.log("--[[[[^^^^^^^]]]] TROLL_UPDATE")
                    // }
                    // console.log(args)
                    cachedOLP[args[0].guild.id] = args[0].onLongPress
                    // 先にロックされているかに合わせてonGuildSelectedを編集してから元の関数へ(Patcher.before)
                    if (get(this.name, args[0].guild.id)) {
                        //　ロック時 : undefined以外が入っていると、この関数が呼び出され通常の動作をしない
                        args[0].onGuildSelected = (guildId) => {
                            // アイコンがおされてOnGSが呼ばれた時点で参照して使用しているので問題なし
                            Navigation.push(
                                UnlockModal, {guildId: guildId, args: cachedArgs[guildId], fn: cachedOLP[guildId]}
                            )
                        }
                    } else { // 非ロック時 : undefinedが入っているときは通常の動作をする
                        args[0].onGuildSelected = undefined
                    }
                    // 値編集後 lock中の場合は longpressしないと更新されない問題 ->
                    //  別の方法で更新(X) / longpressする(ぎりセーフ) / 直接呼ぶtroll(X)
                })
                // 引数を再利用のためにキャッシュ
                Patcher.before(Guild.props, "onPressOut", (self, args, res) => {
                    // ( onPressは実際何もしないため置き換えて無にしても動作してしまう... )
                    let obj = findInReactTree(args[0]._targetInst?.pendingProps?.children, r => r.props?.guild)
                    cachedArgs[obj.props.guild.id] = [self, args]
                })
                Patcher.before(Guild.props, "onLongPress", (self, args, res) => {
                    let obj = findInReactTree(args[0]._targetInst?.pendingProps?.children, r => r.props?.guild)
                    cachedArgs[obj.props.guild.id] = [self, args]
                })
                return
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
                            Navigation.push(
                                UnlockModal, {guildId: args[0].guildId, args: cachedArgs[args[0].guildId], fn: cachedOLP[args[0].guildId]}
                            )
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
                            } else if (get(this.name, args[0].guildId)) {
                                Toasts.open({
                                    content: "This server is already locked!",
                                    source: FailIcon
                                })
                            } else {
                                set(this.name, args[0].guildId, true)
                                // console.log(`--------LOCK----${args[0].guildId}---------------`)
                                // console.log(selectHandler[args[0].guildId])
                                // selectHandler[args[0].guildId][0]["TROLL"] = true
                                // wrapInHooks(guildUpdate)(selectHandler[args[0].guildId][0])
                                // console.log("wrapInHooks()")

                                /*** 最悪なくても
                                  他の鯖選択状態で別鯖ロックしたとき:一回目押したときに開けてしまうだけ(メッセージ閲覧制限はあり)
                                  不具合のほうが深刻なのでパス ***/
                                // LongPressを無理やり実行して更新することでonGuildSelectedの中身を更新
                                // let fn = cachedOLP[args[0].guildId]
                                // let fn_args = cachedArgs[args[0].guildId]
                                // fn(... fn_args)
                                Toasts.open({
                                    content: "Successfully locked!",
                                    source: StarIcon
                                })
                            }
                        }
                    })
                }
                /* wrapInHooksした場合どこにrender済をなげればいいのかよくわからんけどとりあえずrowsに挿入でいけたのでヨシ
                // [Object].type.renderにある関数を無理やり実行する(引数:res.props)
                let res2 = wrapInHooks(res.type.render)(res.props)
                console.log(res2.props.children[1].props.children) // ここにPopoutMenuRow等が並んでいる
                */
                return res
            })

            // const test = findInReactTree(res, r => r.props?.onSelect)
            // if (test){
            //     console.log("~~~~~~~~~~~~~~~~~~")
            //     // console.log(test)
            //     Patcher.after(test.type, 'type', (_, args, res) => {
            //         return <></> // 下のバー
            //     })
            // }

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
