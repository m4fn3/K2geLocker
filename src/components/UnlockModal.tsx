import {React, Navigation, NavigationNative, NavigationStack, StyleSheet, Constants, Toasts} from 'enmity/metro/common'
import {Button, View, Image, Text, TextInput, TouchableOpacity, FormRow} from 'enmity/components'
import {getIDByName} from "enmity/api/assets"
import {filters, bulk} from 'enmity/metro'
import {e} from "../utils/encryption"
import {get, set} from "enmity/api/settings"

// @ts-ignore
import {name} from '../../manifest.json'

export const Settings = NavigationStack.createStackNavigator()

// components
const [ReactNative] = bulk(filters.byProps("AppState"))

// asset resources
const n = "Love K2ge3 lol"
const LockIcon = getIDByName('nsfw_gate_lock')
const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')
const BackIcon = getIDByName("ic_arrow_back_24px")

const header_styles = StyleSheet.createThemedStyleSheet({
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

function AppUnlock({setOpened}) {
    const screen_width = ReactNative.useWindowDimensions().width
    const main_width = Math.min(screen_width, 450)

    function page() {
        const styles = StyleSheet.createThemedStyleSheet({
            container: {
                flex: 1,
                backgroundColor: Constants.ThemeColorMap.BACKGROUND_PRIMARY,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                width: main_width,
            },
            title: {
                height: 40
            },
            titleText: {
                color: Constants.ThemeColorMap.HEADER_PRIMARY,
                fontSize: 30,
            },
            circleBox: {
                flexDirection: 'row',
                height: 130,
                paddingTop: 20
            },
            white_circle: {
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'white',
                marginRight: 10
            },
            gray_circle: {
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'gray',
                marginRight: 10
            },
            numberBox: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: 300
            },
            number: {
                width: 300 / 3,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center'
            },
            numberText: {
                color: Constants.ThemeColorMap.HEADER_PRIMARY,
                fontSize: 30
            }
        })

        const [passcode, setPasscode] = React.useState("")
        const defaultCircleStyles = [styles.gray_circle, styles.gray_circle, styles.gray_circle, styles.gray_circle]
        const [circleStyles, setCircleStyles] = React.useState(defaultCircleStyles)

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Enter passcode</Text>
                </View>
                <View style={styles.circleBox}>
                    <View style={circleStyles[0]}/>
                    <View style={circleStyles[1]}/>
                    <View style={circleStyles[2]}/>
                    <View style={circleStyles[3]}/>
                </View>
                <View style={styles.numberBox}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'back'].map((num, index) => {
                            if (num !== '') {
                                return (
                                    <TouchableOpacity
                                        style={styles.number}
                                        key={index}
                                        onPress={() => { // number
                                            if (typeof num === "number") {
                                                let newPass = passcode + num.toString()
                                                setPasscode(newPass)
                                                let newStyles = circleStyles
                                                newStyles[newPass.length - 1] = styles.white_circle
                                                setCircleStyles(newStyles)
                                                if (newPass.length === 4) {
                                                    setTimeout(() => {
                                                        if (newPass === e(get(name, "passcode"), `${n[5]}${n[6]}${n[0]}`)) {
                                                            Navigation.pop()
                                                            setOpened(false)
                                                        } else {
                                                            setPasscode("")
                                                            setCircleStyles(defaultCircleStyles)
                                                        }
                                                    }, 200)
                                                }
                                            } else { // back
                                                let newPass = passcode.slice(0, -1)
                                                setPasscode(newPass)
                                                let newStyles = circleStyles
                                                newStyles[newPass.length] = styles.gray_circle
                                                setCircleStyles(newStyles)
                                            }
                                        }}
                                    >
                                        {
                                            typeof num === "number"
                                                ? <Text style={styles.numberText}>{num}</Text>
                                                : <Image source={BackIcon}/>
                                        }
                                    </TouchableOpacity>
                                )
                            } else {
                                return <View style={styles.number} key={index}/>
                            }
                        })
                    }
                </View>
            </View>
        )
    }

    return (
        <NavigationNative.NavigationContainer>
            <Settings.Navigator
                initialRouteName="K2geLocker"
                style={header_styles.container}
                screenOptions={{
                    cardOverlayEnabled: !1,
                    cardShadowEnabled: !1,
                    cardStyle: header_styles.cardStyle,
                    headerStyle: header_styles.header,
                    headerTitleContainerStyle: header_styles.headerTitleContainer,
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
                        ...NavigationStack.TransitionPresets.ModalSlideFromBottomIOS
                    }}
                />
            </Settings.Navigator>
        </NavigationNative.NavigationContainer>
    )
}

// モーダル本体
function GuildUnlock({guildId, fn}) {
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
                                fn(guildId)  // onGuildSelectedの中身を更新
                                let toast_text = "Successfully unlocked!"
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


    return (
        <NavigationNative.NavigationContainer>
            <Settings.Navigator
                initialRouteName="K2egeLocker"
                style={header_styles.container}
                screenOptions={{
                    cardOverlayEnabled: !1,
                    cardShadowEnabled: !1,
                    cardStyle: header_styles.cardStyle,
                    headerStyle: header_styles.header,
                    headerTitleContainerStyle: header_styles.headerTitleContainer,
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
                                color={header_styles.close.color}
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

export {GuildUnlock, AppUnlock}