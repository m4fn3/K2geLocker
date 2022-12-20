import {React, Navigation, NavigationNative, NavigationStack, StyleSheet, Constants, Toasts} from 'enmity/metro/common'
import {Button, View, Image, Text, TextInput} from 'enmity/components'
import {getIDByName} from "enmity/api/assets"
import {e} from "../utils/encryption"
import {get, set} from "enmity/api/settings"

// @ts-ignore
import { name } from '../../manifest.json'

export const Settings = NavigationStack.createStackNavigator()

// asset resources
const n = "Love K2ge3 lol"
const LockIcon = getIDByName('nsfw_gate_lock')
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')

// モーダル本体
export default ({guildId, fn}) => {
    // 内部のページ(変数引き継ぎのため内包)
    function page() {
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
        return (
            <View style={styles.container}>
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
                            if (event.nativeEvent.text == e(get(name, "passcode"), `${n[5]}${n[6]}${n[0]}`)) {
                                set(name, guildId, false)
                                fn()  // onGuildSelectedの中身を更新
                                let toast_text = "Successfully unlocked!"
                                if (get(name, "no_auto_refresh")){
                                    toast_text = "Now, long press on server icon to apply unlocking!"
                                }
                                Toasts.open({
                                    content: toast_text,
                                    source: StarIcon
                                })
                                Navigation.pop() // モーダルを閉じる
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
        )
    }

    const styles = StyleSheet.createThemedStyleSheet({
        container: {
            backgroundColor: Constants.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
            flex: 1,
        },
        cardStyle: {
            backgroundColor: Constants.ThemeColorMap.BACKGROUND_MOBILE_PRIMARY,
            color: Constants.ThemeColorMap.TEXT_NORMAL
        },
        header: {
            backgroundColor: Constants.ThemeColorMap.BACKGROUND_MOBILE_SECONDARY,
            shadowColor: 'transparent',
            elevation: 0,
        },
        headerTitleContainer: {
            color: Constants.ThemeColorMap.HEADER_PRIMARY,
        },
        close: {
            color: Constants.ThemeColorMap.HEADER_PRIMARY,
        }
    })
    return (
        <NavigationNative.NavigationContainer>
            <Settings.Navigator
                initialRouteName="K2egeLocker"
                style={styles.container}
                screenOptions={{
                    cardOverlayEnabled: !1,
                    cardShadowEnabled: !1,
                    cardStyle: styles.cardStyle,
                    headerStyle: styles.header,
                    headerTitleContainerStyle: styles.headerTitleContainer,
                    headerTitleAlign: 'center',
                    safeAreaInsets: {
                        top: 0,
                    },
                }}
            >
                <Settings.Screen
                    name="K2geLocker"
                    component={page}
                    options={{
                        headerTitleStyle: {
                            color: 'white',
                        },
                        headerLeft: () => (
                            <Button
                                color={styles.close.color}
                                title='Close'
                                onPress={() => Navigation.pop()}
                            />
                        ),
                        ...NavigationStack.TransitionPresets.ModalSlideFromBottomIOS
                    }}
                />
            </Settings.Navigator>
        </NavigationNative.NavigationContainer>
    )
}