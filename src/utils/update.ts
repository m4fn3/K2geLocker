import {REST, Dialog, Linking} from 'enmity/metro/common'
import {getPlugin} from 'enmity/managers/plugins'
import {get, set} from "enmity/api/settings"
import {reload} from "enmity/api/native"

// @ts-ignore
import {name} from '../../manifest.json'

const repo_url = "https://github.com/m4fn3/K2geLocker"
const manifest_url = "https://raw.githubusercontent.com/m4fn3/K2geLocker/master/manifest.json"
const install_url = "https://raw.githubusercontent.com/m4fn3/K2geLocker/master/dist/K2geLocker.js"

function updatePlugin(from, to) {
    // @ts-ignore
    window.enmity.plugins.installPlugin(install_url, () => {
        Dialog.show({
            title: "K2geLocker",
            body: `Updated from ${from} to ${to}!\nDo you want to reload Discord now?`,
            confirmText: "Yes",
            cancelText: "Later",
            onConfirm: () => reload()
        })
    })
}


function checkUpdate(forceUpdate = false) {
    REST.get(manifest_url).then(manifestRaw => {
        const manifest = JSON.parse(manifestRaw.text)
        const plugin = getPlugin(manifest.name)
        console.log((manifest.version.localeCompare(plugin.version, undefined, {numeric: true})))
        if (manifest.version.localeCompare(plugin.version, undefined, {numeric: true}) === 1) {
            if (forceUpdate || (!forceUpdate && get(name, "ignored") != manifest.version)) {
                Dialog.show({
                    title: "K2geLocker",
                    body: `New version v${manifest.version} is available!`,
                    confirmText: "Update",
                    cancelText: "Ignore",
                    onConfirm: () => {
                        set(name, "updating", true)
                        updatePlugin(plugin.version, manifest.version)
                    },
                    onCancel: () => set(name, "ignored", manifest.version)
                })
            }
        } else if (forceUpdate) {
            Dialog.show({
                title: "K2geLocker",
                body: `You are using latest version v${plugin.version}!`,
                confirmText: "OK"
            })
        }
    }).catch(response => {
        if (response.status === 404) {
            Dialog.show({
                title: "K2geLocker",
                body: "Failed to check for updates. Please check GitHub manually.",
                confirmText: "GitHub",
                cancelText: "Close",
                onConfirm: () => Linking.openURL(repo_url),
            })
        }
    })
}

export {checkUpdate}