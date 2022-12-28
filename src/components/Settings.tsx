import {View, FormSection, FormRow, FormSwitch, Image, Text, ScrollView} from "enmity/components"
import {set, SettingsStore} from "enmity/api/settings"
import {Constants, Navigation, React, StyleSheet, Toasts} from "enmity/metro/common"
import {getIDByName} from "enmity/api/assets"
import {Linking} from "enmity/metro/common"
import {reload} from "enmity/api/native"

import {checkUpdate} from "../utils/update"
import {AppUnlock} from "./UnlockModal";
// @ts-ignore
import {version} from '../../manifest.json'

interface SettingsProps {
    settings: SettingsStore
}

// variables
const n = "Love K2ge3 lol"
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')
const GitHubIcon = getIDByName('img_account_sync_github_white')
const TwitterIcon = getIDByName('img_account_sync_twitter_white')
const ReloadIcon = getIDByName('ic_message_retry') // ic_sync_24px
const InviteIcon = getIDByName('hub-invite')
// const DevIcon = getIDByName('debug') // ic_hammer_and_chisel_24px / ic_home_remove / ic_progress_wrench_24px
const LockIcon = getIDByName('ic_lock') // ic_locked_24px
const UpdateIcon = getIDByName('toast_image_saved')
const KeyboardIcon = getIDByName('ic_drag_icon_24px')

// setting menu
export default ({settings}: SettingsProps) => {
    const styles = StyleSheet.createThemedStyleSheet({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        image: {
            width: 70,
            height: 70,
            marginTop: 20,
            marginLeft: 20
        },
        title: {
            flexDirection: "column",

        },
        name: {
            fontSize: 30,
            paddingTop: 20,
            paddingLeft: 20,
            paddingRight: 30,
            color: Constants.ThemeColorMap.HEADER_PRIMARY,
        },
        author: {
            fontSize: 15,
            paddingLeft: 50,
            color: Constants.ThemeColorMap.HEADER_SECONDARY,
        },
        info: {
            height: 45,
            paddingTop: 3,
            paddingBottom: 3,
            justifyContent: "center",
            alignItems: "center"
        },
        footer: {
            color: Constants.ThemeColorMap.HEADER_SECONDARY,
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 20
        }
    })
    return (
        <ScrollView>
            <View style={styles.container}>
                <Image
                    source={{uri: 'https://avatars.githubusercontent.com/u/43488869'}}
                    style={styles.image}
                />
                <View style={styles.title}>
                    <Text style={styles.name}>K2geLocker</Text>
                    <Text style={styles.author}>by mafu</Text>
                </View>
            </View>
            <FormSection title="SETTINGS">
                <FormRow
                    label="Setup Passcode"
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={KeyboardIcon}/>}
                    subLabel={`Open password setup modal`}
                    onPress={() => {
                        Navigation.push(
                            AppUnlock, {isSetup: true}
                        )
                    }}
                />
                <FormRow
                    label="Reload Discord"
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={ReloadIcon}/>}
                    subLabel={`Reloading is required in order to properly initialize K2geLocker after enabling plugin`}
                    onPress={() => {
                        reload()
                    }}
                />
                <FormRow
                    label="Enable app-wide locking"
                    subLabel={`You can lock entire app with passcode!`}
                    leading={<FormRow.Icon source={LockIcon}/>}
                    trailing={
                        <FormSwitch
                            value={settings.getBoolean("lock_app", false)}
                            onValueChange={(value) => {
                                if (value && (settings.get("passcode") === undefined)) {
                                    Toasts.open({
                                        content: "Please set passcode in plugin setting first!",
                                        source: FailIcon
                                    })
                                    value = false
                                } else {
                                    settings.set("lock_app", value)
                                    set(n, "_locked", false) // 基本不要だが念のためON\OFF時にリセットしておく
                                }
                            }}
                        />
                    }
                />
                <FormRow
                    label="Enable invitation menu hijacking"
                    subLabel={`Useful for iPad on which can't long press icon. For servers with inv disabled, use /lock command.`}
                    leading={<FormRow.Icon source={InviteIcon}/>}
                    trailing={
                        <FormSwitch
                            value={settings.getBoolean("inv_hijack", true)}
                            onValueChange={(value) => {
                                settings.set("inv_hijack", value)
                            }}
                        />
                    }
                />
                <FormRow
                    label="Check for updates"
                    subLabel={`Whether automatically check or not. You can tap here to check manually too.`}
                    leading={<FormRow.Icon source={UpdateIcon}/>}
                    trailing={
                        <FormSwitch
                            value={settings.getBoolean("check_updates", true)}
                            onValueChange={(value) => {
                                settings.set("check_updates", value)
                            }}
                        />
                    }
                    onPress={() => {
                        checkUpdate(true)
                    }}
                />
            </FormSection>
            <FormSection title="INFORMATION">
                <FormRow
                    label="Twitter @m4fn3"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={TwitterIcon}/>}
                    onPress={() => {
                        Linking.openURL("https://twitter.com/m4fn3")
                    }}
                />
                <FormRow
                    label="GitHub (m4fn3)"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    leading={<FormRow.Icon source={GitHubIcon}/>}
                    onPress={() => {
                        Linking.openURL("https://github.com/m4fn3/K2geLocker")
                    }}
                />
            </FormSection>
            <Text style={styles.footer}>
                {`v${version}`}
            </Text>
        </ScrollView>
    )
}