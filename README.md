# K2geLocker
A plugin of [Enmity](https://enmity.app/) to lock the specific server with passcode.

## Install
Add this download link in plugin setting of Enmity.
https://raw.githubusercontent.com/m4fn3/K2geLocker/master/dist/K2geLocker.js

## Usage
- Set your passcode in plugin setting.
- **Reload Discord after enabling plugin from setting to properly initialize K2gelocker, or you will face problems.**
- Long press server icon, and select "Lock Server" to lock the server.<br>
  Also you can tap "Invite" button and select "Lock the Server" or use /lock command to lock the server.
- Select server icon and modal to unlock server will show up.

## ScreenShot
Preview video:
https://cdn.discordapp.com/attachments/887259186918998046/1056581692804055060/K2geLocker.mp4

## Dev
### build
`npm run build`
### auto_uploader.py
Simple python script to automatically build and send plugin to idevice on editing files
1. openssh need to be installed on idevice
2. config your ip/user/password/plugin_dir/plugin_name first
3. `pip install -r requirements.txt` to install dependencies
4. `python auto_uploader.py` to start watching