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
![IMG_4512](https://user-images.githubusercontent.com/43488869/208257019-f7fb370c-aed7-4beb-9ea2-e0db63e7fca3.png)
![IMG_4511](https://user-images.githubusercontent.com/43488869/208257021-4e90075f-3fff-4b4d-acde-ee6e5b62c8ea.png)
![IMG_4513](https://user-images.githubusercontent.com/43488869/208257024-aec595a3-305a-42c4-be83-9e4c151fffd4.png)
![IMG_4514](https://user-images.githubusercontent.com/43488869/208257023-fe391849-60f7-41d7-956c-8c8550e8c087.png)


## Dev
### build
`npm run build`
### auto_uploader.py
Simple python script to automatically build and send plugin to idevice on editing files
1. openssh need to be installed on idevice
2. config your ip/user/password/plugin_dir/plugin_name first
3. `pip install -r requirements.txt` to install dependencies
4. `python auto_uploader.py` to start watching