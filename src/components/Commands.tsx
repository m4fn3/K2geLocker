import {Command, ApplicationCommandType} from "enmity/api/commands"
import {get, set} from 'enmity/api/settings'
import {Toasts} from "enmity/metro/common"
import {getIDByName} from "enmity/api/assets"

// @ts-ignore
import {name} from '../../manifest.json'

const StarIcon = getIDByName('img_nitro_star')
const FailIcon = getIDByName('Small')

const lock: Command = {
    id: "lock",
    name: "lock",
    displayName: "lock",
    description: "Lock the server with passcode",
    displayDescription: "Lock the server with passcode",
    type: ApplicationCommandType.Chat,
    execute: async function (args, message) {
        if (get(name, "passcode") === undefined) {
            Toasts.open({
                content: "Please set passcode in plugin setting before you lock the server!",
                source: FailIcon
            })
        } else {
            set(name, message.guild.id, true)
            Toasts.open({
                content: "Successfully locked!",
                source: StarIcon
            })
        }
    }
}

const unlock: Command = {
    id: "unlock",
    name: "unlock",
    displayName: "unlock",
    description: "Unlock server lock",
    displayDescription: "Unlock server lock",
    type: ApplicationCommandType.Chat,
    execute: async function (args, message) {
        set(name, message.guild.id, false)
        Toasts.open({
            content: "Successfully unlocked!",
            source: StarIcon
        })
    }
}

// const k2l: Command = {
//     id: "K2geLocker",
//     name: "K2geLocker",
//     displayName: "K2geLocker",
//     description: "Open K2geLocker",
//     displayDescription: "Open K2geLocker",
//     type: ApplicationCommandType.Chat,
//     execute: async function (args, message) {
//         Navigation.push(Unlock, {component: Settings}) // settingsスイッチが正常に動作しない
//     }
// }

export {lock, unlock}