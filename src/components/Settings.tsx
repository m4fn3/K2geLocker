import {FormInput, View, FormSection, FormDivider,FormRow,FormSwitch} from "enmity/components"
import {SettingsStore} from "enmity/api/settings"
import {React, Toasts} from "enmity/metro/common"
import {getIDByName} from "enmity/api/assets"

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
    return (
        <View>
            <FormSection title="Settings">
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

            <FormDivider/>
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
        </View>
    )
}