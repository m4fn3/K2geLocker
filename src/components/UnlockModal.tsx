import {React, Navigation, NavigationNative, NavigationStack, StyleSheet, Constants, Toasts} from 'enmity/metro/common'
import {Button, View, Image, Text, TouchableOpacity} from 'enmity/components'
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
const CheckIcon = getIDByName('ic_following')
const InfoIcon = getIDByName('ic_info_24px')
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

function AppUnlock({callback = null, isSetup = false, showClose = true}) {
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

        let rawPass = get(name, "passcode") // パスワード未設定の場合undefinedになるためe()に駆ける前に分けてさらに"pass"を代入してcurrentPassのlengthをとれるようにする
        let currentPass = rawPass === undefined ? "pass" : e(rawPass, `${n[5]}${n[6]}${n[0]}`)

        const [setupPass, setSetupPass] = React.useState("")
        const [passcode, setPasscode] = React.useState("")
        let defaultCircleStyles = new Array(currentPass.length).fill(styles.gray_circle)
        const [circleStyles, setCircleStyles] = React.useState(defaultCircleStyles) // この配列の長さでパスワードの長さを管理する
        let titleText = isSetup ? "Enter new passcode" : "Enter passcode "

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{titleText}</Text>
                </View>
                <View style={styles.circleBox}>
                    {circleStyles.map((val, idx) =>
                        <View style={circleStyles[idx]}/>
                    )}
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
                                                if (newPass.length === circleStyles.length) { // パスワードの長さに達したとき
                                                    setTimeout(() => {
                                                        if (!isSetup) { // ロック解除(運用)
                                                            // 成功
                                                            if (newPass === currentPass) {
                                                                Navigation.pop()
                                                                callback() // callback関数でそれぞれの処理をする
                                                            } else {  // 失敗
                                                                setPasscode("")
                                                                setCircleStyles(defaultCircleStyles)
                                                                Toasts.open({
                                                                    content: "Incorrect password. Try again.",
                                                                    source: FailIcon
                                                                })
                                                            }
                                                        } else { // 設定画面
                                                            if (!setupPass) { // 1回目
                                                                setSetupPass(newPass)
                                                                setPasscode("") // defaultCircleStyleは更新されないのでcircleStylesから作り直す
                                                                defaultCircleStyles = new Array(circleStyles.length).fill(styles.gray_circle)
                                                                setCircleStyles(defaultCircleStyles)
                                                                Toasts.open({
                                                                    content: "Retype new passcode to confirm.",
                                                                    source: InfoIcon
                                                                })
                                                            } else { // 2回目
                                                                if (setupPass === newPass) { // 一致
                                                                    let key = e(setupPass, `${n[5]}${n[6]}${n[0]}`)
                                                                    set(name, "passcode", key)
                                                                    Toasts.open({
                                                                        content: "Successfully set new passcode!",
                                                                        source: StarIcon
                                                                    })
                                                                } else {
                                                                    Toasts.open({
                                                                        content: "Passcode didn't match.",
                                                                        source: FailIcon
                                                                    })
                                                                }
                                                                Navigation.pop()
                                                            }
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
                <View>
                    {   // 条件:設定画面の一回目で絞って配列作成
                        [1].filter((f) => isSetup && !setupPass).map((f) =>
                            <Button
                                onPress={() => {
                                    let newLength = circleStyles.length === 4 ? 6 : 4
                                    defaultCircleStyles = new Array(newLength).fill(styles.gray_circle)
                                    setCircleStyles(defaultCircleStyles)  // 設定をリセットする
                                    setPasscode("")
                                }}
                                title="Change passcode length"
                            />
                        )
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
                        }, headerLeft: () => {
                            if (showClose) {
                                return <Button
                                    color={header_styles.close.color}
                                    title='Close'
                                    onPress={() => Navigation.pop()}
                                />
                            }
                        },
                        ...NavigationStack.TransitionPresets.ModalSlideFromBottomIOS
                    }}
                />
            </Settings.Navigator>
        </NavigationNative.NavigationContainer>
    )
}


export {AppUnlock}