import {StyleSheet, Constants, Dialog, React, Toasts, Navigation} from 'enmity/metro/common'
import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {bulk, filters} from 'enmity/metro'
import {Image, Text, View, Button} from 'enmity/components'
import {get, set} from 'enmity/api/settings'
import {create} from 'enmity/patcher'
import {getIDByName} from "enmity/api/assets"
import {findInReactTree} from 'enmity/utilities'

// @ts-ignore
import manifest, {name} from '../manifest.json'
import {e} from "./utils/encryption"
import {getStoreHandlers} from "./utils/store"
import {checkUpdate} from "./utils/update"
import Settings from "./components/Settings"
import lock from "./components/Commands"
import {AppUnlock} from "./components/UnlockModal"

const Patcher = create('K2geLocker')

// get modules
const [
    Messages,
    LazyActionSheet,
    SelectedGuildStore,
    SelectedChannelStore,
    FluxDispatcher
] = bulk(
    filters.byName('MessagesConnected', false),
    filters.byProps("openLazy", "hideActionSheet"),
    filters.byProps("getLastSelectedGuildId"),
    filters.byProps("getMostRecentSelectedTextChannelId"),
    filters.byProps("_currentDispatchActionType", "_subscriptions", "_waitQueue")
)

const [
    AppStateStore,
    DeveloperOptionsStore,
    ModalDeprecatedStore,
    GatewayConnectionStore
] = [
    getStoreHandlers("AppStateStore"),
    getStoreHandlers("DeveloperOptionsStore"),
    getStoreHandlers("ModalDeprecatedStore"),
    getStoreHandlers("GatewayConnectionStore")
]

// asset resources
const LockIcon = getIDByName('nsfw_gate_lock')
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')
const KeyIcon = getIDByName('ic_locked_24px')
const KeyIcon2 = getIDByName('ic_full_server_gating_24px')

function initVariable(name, defVal) {
    if (get("K2geLocker", name) === undefined) {
        set("K2geLocker", name, defVal)
    }
}

const K2geLocker: Plugin = {
    ...manifest,
    onStart() {
        // add command
        this.commands = [lock]

        // variables
        // let previous_id = "0"
        let n = this.name
        const metas = [["inv_hijack", true], ["check_updates", true], ["lock_app", false]]
        metas.forEach((meta) => {
            initVariable(meta[0], meta[1])
        })

        /*** NOTE
         前のほうの記述は実行されるのが速いためログに流れないがちゃんと起動時に呼ばれている
         また、このあたりで重めの処理を置くとフックが遅れて正常に動作しなくなる
         ここにパッチをおきまくらずに速さ重視でないものは後ろに回せ！！
         -----
         LockServerの選択肢が出てこない -> 重い処理等でパッチ遅れ
         APPLOCKがでてこない -> 強制的に閉じられてててopenedがバグってる
         ログが見れない -> stackにpushして後でまとめてprint
         なぜかどこかでとまってる -> try~catchしてeをstackにpush
         ***/

        // move to unlocked guild
        function moveToUnlockedGuild(guildId) {
            let channelId = SelectedChannelStore.getMostRecentSelectedTextChannelId(guildId)
            FluxDispatcher.dispatch({
                type: 'CHANNEL_SELECT',
                guildId: guildId,
                channelId: channelId,
                messageId: undefined,
                jumpType: 'ANIMATED',
                preserveDrawerState: false,
                source: undefined
            })
        }

        // define handler
        function onGuildSelected(guildId) {
            // アイコンがおされてOnGSが呼ばれた時点で参照して使用しているので問題なし
            Navigation.push(
                AppUnlock, {
                    callback: () => {
                        set(n, guildId, false)
                        moveToUnlockedGuild(guildId)  // onGuildSelectedの中身を更新
                    }
                }
            )
        }

        function lockApp() {
            Navigation.push(
                AppUnlock, {
                    callback: () => {
                        opened = false // 変数を共有するのがめんどくさいので無名関数で代用
                    },
                    showClose: false
                }
            )
        }

        // on app state changed
        let opened = false
        let isFirstOpen = true
        Patcher.before(AppStateStore, "APP_STATE_UPDATE", (self, args, res) => {
            let state = args[0].state
            if (get(n, "lock_app") && !opened) { // 既に開いているのにもう一度開くのを防ぐ
                if (get(n, "passcode") === undefined) { // リセット等によりpasscodeが無いがロックされている場合は解除する(例外処理)
                    set(n, "lock_app", false)
                } else if (isFirstOpen || state == "background") { // 初めて開いたとき(activeでもok) または background になったときにロック
                    lockApp()
                    opened = true
                    isFirstOpen = false // 常にfalse入れとけばok
                }
            }
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
                    if (get(n, args[0].guild.id)) {
                        if (get(n, "passcode") === undefined) { // リセット等によりpasscodeが無いがロックされている場合は解除する(例外処理)
                            set(n, args[0].guild.id, undefined)
                            args[0].onGuildSelected = undefined
                        } else {
                            //　ロック時 : undefined以外が入っていると、この関数が呼び出され通常の動作をしない
                            args[0].onGuildSelected = onGuildSelected
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
                if (get(n, args[0].guildId)) {
                    // 完全置換
                    res.props.rows = [{
                        "icon": KeyIcon2,
                        "text": "Unlock Server",
                        "onClick": () => {
                            onGuildSelected(args[0].guildId)
                        }
                    }]
                } else {
                    // 他の要素と同様の形式で新規追加
                    res.props.rows.unshift({ // 先頭に追加
                        "icon": KeyIcon,
                        "text": "Lock Server",
                        "onClick": () => {
                            if (get(n, "passcode") === undefined) {
                                Toasts.open({
                                    content: "Please set passcode in plugin setting before you lock the server!",
                                    source: FailIcon
                                })
                            } else if (get(n, args[0].guildId)) {
                                Toasts.open({
                                    content: "This server is already locked!",
                                    source: FailIcon
                                })
                            } else {
                                set(n, args[0].guildId, true)
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

            // 通常Guildが起動時に呼ばれる=先に呼ばれるためこの順序でここまでたどり着いた場合にunpatchする
            unpatch() // 目的のオブジェクトを見つけてフック出来た後は不要なので
        })

        // on load channel
        Patcher.instead(Messages, 'default', (self, args, org) => {
            let res = org.apply(self, args)
            let guild_id = res?.props?.guildId
            if (guild_id && get(n, guild_id)) { // replace return view
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
                        fontSize: 25,
                        marginBottom: 30
                    },
                    button: {
                        fontSize: 30
                    },
                    footer: {
                        color: Constants.ThemeColorMap.HEADER_SECONDARY,
                        fontSize: 16,
                        marginTop: 80,
                        marginBottom: 70
                    }
                })
                return <View style={styles.container}>
                    <Image style={styles.image} source={LockIcon}/>
                    <Text style={styles.header}>
                        This server is locked!
                    </Text>
                    <Button
                        style={styles.button}
                        onPress={() => onGuildSelected(guild_id)}
                        title="Unlock"
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
            if ((sheet.startsWith("instant-invite") || sheet.startsWith("vanity-url-invite")) && get(n, "inv_hijack")) {
                let selectedGuildId = SelectedGuildStore.getLastSelectedGuildId()
                if (get(n, selectedGuildId)) {
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
                            if (get(n, "passcode") === undefined) {
                                Toasts.open({
                                    content: "Please set passcode in plugin setting before you lock the server!",
                                    source: FailIcon
                                })
                            } else {
                                set(n, selectedGuildId, true)
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

        // on logout - そのままログアウトした場合次回起動時にクラッシュしてしまうためログアウト時にプラグインを無効化する()
        Patcher.before(DeveloperOptionsStore, "LOGOUT", (self, args, res) => {
            Dialog.show({
                title: "K2geLocker",
                body: "Automatically disabled itself to prevent app from causing weird problems!\nPlease enable plugin manually after you re-login to the account.",
                confirmText: "See you again!"
            })
            this.commands = []
            Patcher.unpatchAll()
            // @ts-ignore
            window.enmity.plugins.disablePlugin("K2geLocker")
        })

        let isPushNotificationClicked = false
        let modalCloseFuncCallStat = []
        // detect push notification click
        Patcher.before(GatewayConnectionStore, "PUSH_NOTIFICATION_CLICK", (self, args, res) => {
            isPushNotificationClicked = true
            modalCloseFuncCallStat = []
        })
        // prevent AppLock modal from closing
        const modalCLoseFuncList = ["MODAL_POP_ALL", "CHANGE_LOG_CLOSE", "CHANNEL_SETTINGS_CLOSE", "GUILD_SETTINGS_CLOSE", "EMAIL_VERIFICATION_MODAL_CLOSE", "NOTIFICATION_SETTINGS_MODAL_CLOSE", "SEARCH_MODAL_CLOSE", "USER_SETTINGS_MODAL_CLOSE", "MENTION_MODAL_CLOSE"]
        Object.keys(ModalDeprecatedStore).forEach((key) => {
            if (modalCLoseFuncList.includes(key)) { // 通知からの起動時は様々な関数を読んで片っ端からModalを閉じようとするので、一度のみ処理を止める
                Patcher.instead(ModalDeprecatedStore, key, (self, args, org) => {
                    if (isPushNotificationClicked && !Object.keys(modalCloseFuncCallStat).includes(key)) {
                        modalCloseFuncCallStat[key] = true  // 全て止め終わってもmodalCloseFuncCallStatに全て入って実質isPushNotificationLocked=trueと同じ
                    } else {
                        org.apply(self, args)
                    }
                })
            }
        })

        // check for updates    // 時間は対してかからないがパッチは速さ重視なので最後に
        if (get(n, "check_updates")) {
            if (get(n, "updating")) { // アップデート中はチェックを飛ばす
                set(name, "updating", false) // Updateを押した後にCancelした場合はinstallPluginのCallbackが呼ばれないためここでオフにする
            } else {
                checkUpdate()
            }
        }

        let current_pass = e(get(n, "passcode"), `${n[0]}${n[1]}${n[4]}`)
        // @ts-ignore // passcodeが数字でなく未設定でない場合リセットする (例外処理)[下位互換性]
        if (isNaN(current_pass) && current_pass !== undefined) {
            set(n, "passcode", undefined)
        }


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