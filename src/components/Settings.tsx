import {FormInput, View, FormSection, FormDivider, FormRow, FormSwitch, Image, Text} from "enmity/components"
import {SettingsStore} from "enmity/api/settings"
import {Constants, React, StyleSheet, Toasts} from "enmity/metro/common"
import {getIDByName} from "enmity/api/assets"
import {Linking} from "enmity/metro/common";

import {e} from "../utils/encryption"

interface SettingsProps {
    settings: SettingsStore
}

// variables
const n = "Love K2ge3 lol"
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')

// setting menu
export default ({settings}: SettingsProps) => {
    const styles = StyleSheet.createThemedStyleSheet({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        },
        image: {
            width: 50,
            height: 50,
            marginTop: 20,
            marginLeft: 20
        },
        description: {
            flex: 1,
            fontSize: 30,
            paddingTop: 20,
            paddingLeft: 30,
            color: Constants.ThemeColorMap.HEADER_PRIMARY
        },
        info: {
            height: 35,
            paddingTop: 3,
            paddingBottom: 3,
            justifyContent: "center",
            alignItems: "center"
        }
    })
    return (
        <View>
            <View style={styles.container}>
                <Image
                    source={{uri: 'https://avatars.githubusercontent.com/u/43488869'}}
                    style={styles.image}
                />
                <Text style={styles.description}>K2geLocker</Text>
            </View>
            <FormSection title="SETTINGS">
                <FormInput
                    value={settings.get("passcode")}
                    title="Passcode"
                    placeholder="input your custom passcode here!"
                    onSubmitEditing={
                        (event) => {
                            if (event.nativeEvent.text == "") {
                                Toasts.open({
                                    content: "Please enter your custom passcode",
                                    source: FailIcon,
                                })
                            } else {
                                let key = e(event.nativeEvent.text, `${n[5]}${n[6]}${n[0]}`)
                                settings.set("passcode", key)
                                Toasts.open({
                                    content: "Successfully set new passcode!",
                                    source: StarIcon,
                                })
                            }
                        }
                    }
                    secureTextEntry={true}
                />
                <FormRow
                    label="Enable invitation menu hijacking"
                    trailing={
                        <FormSwitch
                            value={settings.getBoolean("inv_hijack", true)}
                            onValueChange={(value) => {
                                settings.set("inv_hijack", value)
                            }}
                        />
                    }
                />
            </FormSection>
            <FormSection title="INFORMATION">
                <FormRow
                    label="GitHub"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    onPress={() => {
                        Linking.openURL("https://github.com/m4fn3/K2geLocker")
                    }}
                />
                <FormRow
                    label="Twitter"
                    style={styles.info}
                    trailing={FormRow.Arrow}
                    onPress={() => {
                        Linking.openURL("https://twitter.com/m4fn3")
                    }}
                />
            </FormSection>
        </View>
    )
}