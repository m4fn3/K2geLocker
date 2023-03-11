import {StyleSheet, Constants, Dialog, React, Toasts, Navigation} from 'enmity/metro/common'
import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {bulk, filters} from 'enmity/metro'
import {Image, Text, View, Button, Modal} from 'enmity/components'
import {get, set} from 'enmity/api/settings'
import {create} from 'enmity/patcher'
import {getIDByName} from "enmity/api/assets"
import {findInReactTree} from 'enmity/utilities'

// @ts-ignore
import manifest, {name} from '../manifest.json'
import {e} from "./utils/encryption"
import {getStoreHandlers, patchView} from "../../hook"
import {checkUpdate} from "./utils/update"
import Settings from "./components/Settings"
import {lock, unlock} from "./components/Commands"
import {Unlock} from "./components/UnlockModal"
import {sendCommand} from "./utils/native"

const Patcher = create('K2geLocker')

const [
    Messages,
    MessagesWrapper,
    LazyActionSheet,
    SelectedGuildStore,
    SelectedChannelStore,
    GuildTooltipActionSheets,
    RouteUtils,
    GuildStore,
    PrivateChannelRecipientsInviteStore
] = bulk(
    filters.byName('MessagesConnected', false),
    filters.byName('MessagesWrapperConnected', false),
    filters.byProps("openLazy", "hideActionSheet"),
    filters.byProps("getLastSelectedGuildId"),
    filters.byProps("getMostRecentSelectedTextChannelId"),
    filters.byName('GuildTooltipActionSheets', false),
    filters.byProps("transitionTo"),
    filters.byProps("getChannels"),
    filters.byProps("popModal")
)

const [
    AppStateStore,
    DeveloperOptionsStore,
    DefaultRouteStore,
    ModalDeprecatedStore
] = [
    getStoreHandlers("AppStateStore"),
    getStoreHandlers("DeveloperOptionsStore"),
    getStoreHandlers("DefaultRouteStore"),
    getStoreHandlers("ModalDeprecatedStore")
]

const LockIcon = getIDByName('nsfw_gate_lock')
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')
const KeyIcon = getIDByName('ic_locked_24px')
const KeyIcon2 = getIDByName('ic_full_server_gating_24px')

// 環境変数の初期化
function initVariable(name, defVal, force = false) {
    if (force) {
        set("K2geLocker", name, defVal)
    } else if (get("K2geLocker", name) === undefined) {
        set("K2geLocker", name, defVal)
    }
}

const K2geLocker: Plugin = {
    ...manifest,
    onStart() {
        // コマンド追加
        this.commands = [lock, unlock]

        // 初期化処理
        let n = this.name
        const metas = [["inv_hijack", true], ["check_updates", true], ["lock_app", false], ["use_bio", false], ["persist_lock", false], ["gray_out", true], ["_isK2genmity", false, true], ["_hasBiometricsPerm", false, true]]
        metas.forEach((meta) => {
            // @ts-ignore
            initVariable(...meta)
        })
        let allowViewing = null

        // 特定のサーバーへ移動
        function moveToGuild(guildId) {
            let channelId = SelectedChannelStore.getMostRecentSelectedTextChannelId(guildId)
            allowViewing = guildId // メッセージrender時のロックにより見れなくなるため回避できるようIDを保存
            let channels = GuildStore.getChannels(guildId)["SELECTABLE"]
            if (channels.length !== 1) { // チャンネル一つの時は諦める
                let tempChannelId = channels[0].channel.id != channelId ? channels[0].channel.id : channels[1].channel.id
                RouteUtils.transitionTo(`/channels/${guildId}/${tempChannelId}`, undefined) // 一旦別のチャンネルに移動して
            }
            RouteUtils.transitionTo(`/channels/${guildId}/${channelId}`, undefined) // 再読み込みする
        }

        // 生体認証処理
        function authenticate(interval, callbackBefore = () => void 0, callbackAfter = () => void 0) {
            if (get(n, "use_bio")) {
                setTimeout(() => {
                    sendCommand("K2geLocker", ["authentication"], (data) => {
                        if (data == "success") {
                            callbackBefore()
                            Navigation.pop()
                            callbackAfter()
                        }
                    })
                }, interval)
            }
        }

        // サーバーロックでの選択時の処理
        function onGuildSelected(guildId, unlock = false) {
            let isPersistLock = get(name, "persist_lock")
            const callbackBefore = () => {
                // ロック状態永久保存でない or ロック状態永久保存の解除
                if (!isPersistLock || (isPersistLock && unlock)) {
                    set(n, guildId, false)
                    Toasts.open({
                        content: "Successfully unlocked!",
                        source: StarIcon
                    })
                }
            }
            const callbackAfter = () => { // Modalを閉じた後でなければ移動が適用されないので後に行う
                moveToGuild(guildId)  // onGuildSelectedの中身を更新
            }
            // アイコンがおされてOnGSが呼ばれた時点で参照して使用しているので問題なし
            Navigation.push(
                Unlock, {
                    callbackBefore: callbackBefore, callbackAfter: callbackAfter, isUnlock: isPersistLock && unlock
                }
            )
            authenticate(300, callbackBefore, callbackAfter) // モーダルが完全に開くのを待つ
        }

        // アプリロックのコールバック関数
        const lockAppCallback = () => {
            set(n, "_locked", false)
        }

        // アプリロック用のModal表示処理
        function lockApp() {
            Navigation.push(
                Unlock, {
                    callbackBefore: lockAppCallback,
                    showClose: false
                }
            )
        }

        // 通知や起動時のModalを閉じる処理を止める // PrivateChannelRecipientsInviteStore 170+ / ModalDeprecatedStore 164-
        const [modalMdl, modalCloseFuncs] = [PrivateChannelRecipientsInviteStore, ["popModal", "popAllModals"]] ? PrivateChannelRecipientsInviteStore : [ModalDeprecatedStore, ["MODAL_POP_ALL", "CHANGE_LOG_CLOSE", "CHANNEL_SETTINGS_CLOSE", "GUILD_SETTINGS_CLOSE", "EMAIL_VERIFICATION_MODAL_CLOSE", "NOTIFICATION_SETTINGS_MODAL_CLOSE", "SEARCH_MODAL_CLOSE", "USER_SETTINGS_MODAL_CLOSE", "MENTION_MODAL_CLOSE"]]
        modalCloseFuncs.forEach((key) => {
            Patcher.instead(modalMdl, key, (self, args, org) => {
                if (!get(n, "_locked")) {
                    org.apply(self, args)
                }
            })
        })

        // 起動時のアプリロックを行う
        let isFirst = true
        Patcher.before(DefaultRouteStore, "SAVE_LAST_ROUTE", (self, args, org) => {
            if (isFirst) {
                if (get(n, "lock_app") && get(n, "passcode") !== undefined) {
                    lockApp() // (有効にした時にも出てくるが仕方ない->hook内におくことで回避できている)
                    authenticate(100, lockAppCallback)
                }
                isFirst = false
            }
        })

        // アプリの起動/バックグラウンド移行時にアプリのロックを処理する
        let lockNext = false
        Patcher.before(AppStateStore, "APP_STATE_UPDATE", (self, args, res) => {
            let state = args[0].state
            if (get(n, "lock_app")) {
                if (get(n, "passcode") === undefined) { // リセット等によりpasscodeが無いがロックされている場合は解除する(例外処理)
                    set(n, "lock_app", false)
                } else if (state == "background") { // background になったときにロック
                    if (!get(n, "_locked")) { // 既に開いているのにもう一度開くのを防ぐ
                        lockApp()
                        set(n, "_locked", true)
                    }
                    lockNext = true // ロックされていてもされてなくても次回active時に認証画面出す
                } else if (state == "active") { // 認証画面出すことでもinactive/activeが発生するためlockNextで管理
                    if (get(n, "_locked") && lockNext) {
                        lockNext = false
                        authenticate(100, lockAppCallback)
                    }
                }
            }
        })

        // サーバーのアイコン押下処理等を行う
        patchView(Patcher, {
            "Guild": (args, res, unpatch) => {
                const Guild = findInReactTree(res, r => r.props?.delayLongPress == 300 && r.props?.onGuildSelected === undefined && r.props?.guild)
                if (Guild) {
                    // Guild
                    Patcher.before(Guild.type, 'type', (self, args, res) => { // args[0]: Guild / res: Guild (同じ)
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
                    unpatch()
                }
            },
            "GuildPopoutMenu": (args, res, unpatch) => {
                const GuildPopoutMenu = findInReactTree(res, r => r.props?.guildId && r.props?.yPos && r.props?.onClose)
                if (GuildPopoutMenu) { // [Object].props.guildIdが存在するかどうか
                    Patcher.after(GuildPopoutMenu.type, 'render', (_, args, res) => {
                        // args[0]: { type: 'guild', title: 'guild_name',  guildId: '', yPos: 120.5, onClose: [Function: onClose]
                        if (get(n, args[0].guildId)) {
                            // 完全置換
                            res.props.rows = [{
                                "icon": KeyIcon2,
                                "text": "Unlock Server",
                                "onClick": () => {
                                    onGuildSelected(args[0].guildId, true)
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
                                        let selectedGuildId = SelectedGuildStore.getLastSelectedGuildId()
                                        if (args[0].guildId !== selectedGuildId) { // 別のサーバーを選択した状態でロックした場合はそのサーバーに移動して更新する
                                            moveToGuild(args[0].guildId)
                                        }
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
                    unpatch()
                }
            },
            "GuildIcon": (args, res, unpatch) => {
                const GuildIcon = findInReactTree(res, r => r.props?.animate !== undefined && r.props?.selected !== undefined)
                if (GuildIcon) {
                    Patcher.before(GuildIcon, "type", (self, args, res) => {
                        if (get(n, args[0].guild.id) && get(name, "gray_out")) { // ロック中のサーバーは色を薄くする
                            args[0].style["opacity"] = 0.3
                        } else {
                            args[0].style["opacity"] = 1
                        }
                    })
                    // unpatch() // hookをやめると何故か更新されなくなってしまうので継続する
                }
            }
        })

        // サーバー選択の記録を行う
        Patcher.instead(GuildTooltipActionSheets, "default", (self, args, org) => {
            if (allowViewing !== args[0]["guildId"]) { // 別のサーバーに移動したらリセットする
                allowViewing = null
            }
            return org.apply(self, args) // 別のものを返しても全く影響なし
        })

        // メッセージ表示ビュー
        const Messages_ = Messages ? Messages : MessagesWrapper  // MessagesWrapper : 163+ / Messages : 162-
        Patcher.instead(Messages_, 'default', (self, args, org) => {
            let res = org.apply(self, args)
            let guild_id = res?.props?.guildId
            if (guild_id && get(n, guild_id) && allowViewing !== guild_id) { // replace return view // allowViewingで一時的に見れるようにする
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
                        title="Enter passcode"
                    />
                    <Text style={styles.footer}>
                        K2geLocker
                    </Text>
                </View>
            } else {
                return res
            }
        })

        // 招待生成ActionSheet
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

        // ログアウト検知処理 - そのままログアウトした場合次回起動時にクラッシュしてしまうためログアウト時にプラグインを無効化する()
        Patcher.before(DeveloperOptionsStore, "LOGOUT", (self, args, res) => {
            Dialog.show({
                title: "K2geLocker",
                body: "Automatically disabled itself to prevent app from causing problems!\nPlease enable plugin manually after you re-login to the account.",
                confirmText: "See you again!"
            })
            this.commands = []
            Patcher.unpatchAll()
            // @ts-ignore
            window.enmity.plugins.disablePlugin("K2geLocker")
        })

        // K2genmity利用の可否を確認
        sendCommand("K2geLocker", ["check"], (data) => {
            set(n, "_isK2genmity", true)
            if (data == "yes") {
                set(n, "_hasBiometricsPerm", true)
            }
        })

        // 更新の確認   // 時間は対してかからないがパッチは速さ重視なので最後に
        if (get(n, "check_updates")) {
            if (get(n, "_updating")) { // アップデート中はチェックを飛ばす
                set(name, "_updating", false) // Updateを押した後にCancelした場合はinstallPluginのCallbackが呼ばれないためここでオフにする
            } else {
                checkUpdate()
            }
        }

        // 下位互換性
        let rawPass = get(name, "passcode")
        if (rawPass !== undefined) { // undefinedをe()にかけるとエラーになるので注意 : 'Cannot read property \'length\' of undefined'
            let currentPass = e(rawPass, `${n[0]}${n[1]}${n[4]}`)
            // @ts-ignore // passcodeが数字でなく未設定でない場合リセットする (例外処理)[下位互換性]
            if (isNaN(currentPass)) {
                set(n, "passcode", undefined)
            }
        }
        setTimeout(() => console.error(`[End]`), 3000)
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