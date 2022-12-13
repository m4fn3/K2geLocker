import {StyleSheet, Constants, Dialog, React, Toasts} from 'enmity/metro/common'
import {Plugin, registerPlugin} from 'enmity/managers/plugins'
import {bulk, filters} from 'enmity/metro'
import {Image, Text, View, TextInput} from 'enmity/components'
import {get, set} from 'enmity/api/settings'
import {create} from 'enmity/patcher'
import {getIDByName} from "enmity/api/assets"


import {e} from "./utils/encryption"
import Settings from "./components/Settings"
import lock from "./components/Commands"

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


const K2geLocker: Plugin = {
    name: 'K2geLocker',
    version: '1.0.2',
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
        let cache_guild = "0"
        let n = this.name
        if (get(this.name, "inv_hijack") === undefined){
            set(this.name, "inv_hijack", true)
        }
        // on select server
        Patcher.instead(GuildTooltipActionSheets, "default", (self, args, org) => {
            cache_guild = args[0]["guildId"] // cache selected server id
            return org.apply(self, args)
        })
        // on load channel
        Patcher.instead(Messages, 'default', (self, args, org) => {
            let res = org.apply(self, args)
            let guild_id = res?.props?.guildId
            if (guild_id && get(this.name, guild_id)) { // replace return view
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
                })
                return <View style={styles.container}>
                    <Image style={styles.image} source={LockIcon}/>
                    <Text style={styles.header}>
                        This server is locked!
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
                    <Text style={styles.description}>
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
                Dialog.show({
                    title: "K2geLocker",
                    body: "Select an action you wanna perform:",
                    confirmText: "Lock the Server",
                    cancelText: "Open invite menu",
                    onConfirm: () => {
                        if (get(this.name, "passcode") === undefined) {
                            Toasts.open({
                                content: "Please set passcode in plugin setting before you lock the server!",
                                source: FailIcon
                            })
                        } else if (cache_guild == "0") {
                            Toasts.open({
                                content: "It seems that plugin failed to get the server. Please select another channel and try again!",
                                source: FailIcon
                            })
                        } else {
                            set(this.name, cache_guild, true)
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
