# ------------------------------------------------------------------------------------------
# Simple python script to automatically build and send plugin to idevice on editing files
# - openssh need to be installed on idevice
# - config your ip/user/password/plugin_dir/plugin_name first
# ------------------------------------------------------------------------------------------
# by https://github.com/m4fn3

import os
import paramiko
import scp
import time
from watchdog.events import PatternMatchingEventHandler
from watchdog.observers import Observer

# ***** config *****************************
ip = "192.168.11.7"
user = "root"
password = "alpine"
plugin_dir = "/var/mobile/Containers/Data/Application/F8279772-F3E0-4ADE-8E01-E996FFE32FC9/Documents/Plugins/"
plugin_name = "K2geLocker"


# listener
def on_modified(event):
    filepath = event.src_path
    filename = filepath.split("\\")[-1]
    if filepath.startswith(r".\src") and ("~" not in filename and "." in filename):
        os.system("npm run build")  # build
        client.put(f"./dist/{plugin_name}.js", plugin_dir)  # make sure that plugin name and file name is the same or you will face weird bugs
        ssh.exec_command(f"rm {plugin_dir}K2geLocker.js.disable")  # remove disable stat if exists


# ssh connection
with paramiko.SSHClient() as ssh:
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, port=22, username=user, password=password)
    client = scp.SCPClient(ssh.get_transport())

    # watch file editing
    event_handler = PatternMatchingEventHandler(["*"])
    event_handler.on_modified = on_modified
    observer = Observer()
    observer.schedule(event_handler, ".", recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
