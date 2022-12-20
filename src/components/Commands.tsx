import {Command, ApplicationCommandType} from "enmity/api/commands"
import {get, set} from 'enmity/api/settings'
import {Toasts} from "enmity/metro/common"
import {getIDByName} from "enmity/api/assets"

// @ts-ignore
import { name } from '../../manifest.json'

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

export default lock