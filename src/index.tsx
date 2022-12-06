import {StyleSheet, Constants, Dialog, React, Toasts} from 'enmity/metro/common';
import {Plugin, registerPlugin} from 'enmity/managers/plugins';
import {bulk, filters} from 'enmity/metro';
import {Image, Text, View, TextInput} from 'enmity/components';
import {get, set} from 'enmity/api/settings';

import {create} from 'enmity/patcher';
import {getIDByName} from "enmity/api/assets";

const Patcher = create('K2geLocker');

// モジュール読み込み
const [
    Messages,
    LazyActionSheet
] = bulk(
    filters.byName('MessagesConnected', false),
    filters.byProps("openLazy", "hideActionSheet")
);

// アセット資源
const LockIcon = getIDByName('nsfw_gate_lock');
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')

const K2geLocker: Plugin = {
    name: 'K2geLocker',
    version: '1.0.0',
    description: 'Lock ur <3',
    authors: [
        {
            name: 'mafu',
            id: '519760564755365888'
        }
    ],
    onStart() {
        let cache_guild = "0" // TODO: 直接ロックすると値が更新されない問題
        // チャンネル読み込み
        Patcher.instead(Messages, 'default', (self, args, org) => {
            console.log("[K2geLocker] ON_LOAD_MESSAGES")
            let res = org.apply(self, args)
            let guild_id = res?.props?.guildId
            cache_guild = guild_id // キャッシュ
            if (guild_id && get(this.name, guild_id)) { // ロック時はビューを置換(DM等の例外処理として?でnullへ)
                const styles = StyleSheet.createThemedStyleSheet({
                    image: {
                        width: 100,
                        height: 100,
                        padding: 5,
                        marginBottom: 15
                    },
                    container: {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: Constants.ThemeColorMap.BACKGROUND_PRIMARY,
                    },
                    header: {
                        color: Constants.ThemeColorMap.HEADER_PRIMARY,
                        fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
                        fontWeight: 'bold',
                        fontSize: 24
                    },
                    description: {
                        color: Constants.ThemeColorMap.HEADER_SECONDARY,
                        fontSize: 16,
                        fontFamily: Constants.Fonts.PRIMARY_SEMIBOLD,
                        marginLeft: 2.5,
                        marginRight: 2.5,
                        marginBottom: 70,
                        paddingLeft: 25,
                        paddingRight: 25,
                        paddingTop: 5,
                        textAlign: 'center'
                    },
                    passcode: {
                        width: 100,
                        height: 20,
                        marginTop: 50,
                        marginBottom: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ccc"
                    }
                });
                return <View style={styles.container}>
                    <Image style={styles.image} source={LockIcon}/>
                    <Text style={styles.header}>
                        This server is locked!
                    </Text>
                    <TextInput
                        style={styles.passcode}
                        onSubmitEditing={
                            (event) => {
                                if (event.nativeEvent.text == "pass") { // パスワード確認 TODO: パスワード設定画面作成
                                    set(this.name, guild_id, false)
                                    console.log("[K2geLocker] Set: FALSE")
                                    Toasts.open({
                                        content: "Successfully unlocked!",
                                        source: StarIcon
                                    })
                                } else { // 不一致
                                    Toasts.open({
                                        content: "Incorrect password. Try again.",
                                        source: FailIcon
                                    })
                                }
                            }
                        }
                        secureTextEntry={true}
                    />
                    <Text style={styles.description}>
                        K2geLocker
                    </Text>
                </View>;
            } else {
                return res
            }
        });
        // メニュー選択画面
        Patcher.instead(LazyActionSheet, "openLazy", (self, args, org) => {
            let component = args[0]
            let sheet = args[1]
            if (sheet.startsWith("instant-invite")) { // 招待画面のフック
                console.log("[K2geLocker] ON_INVITE_MENU")
                Dialog.show({
                    title: "K2geLocker",
                    body: "Select an action you wanna perform:",
                    confirmText: "Lock the Guild",
                    cancelText: "Open invite menu",
                    onConfirm: () => {  // ロックを有効にするボタンで置換
                        console.log("[K2geLocker] Confirm")
                        set(this.name, cache_guild, true)
                        console.log("[K2geLocker] Set: TRUE")
                        Toasts.open({
                            content: "Successfully locked!",
                            source: StarIcon
                        })
                    },
                    onCancel: () => {  // 元の招待画面を開く
                        console.log("[K2geLocker] Cancel")
                        org.apply(self, args)
                    }
                })
            } else {
                org.apply(self, args)
            }
        })

    },
    onStop() {
        Patcher.unpatchAll();
    }
};

registerPlugin(K2geLocker);
