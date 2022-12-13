from watchdog.events import PatternMatchingEventHandler
from watchdog.observers import Observer
import os
import scp
import paramiko
import time
import os
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(verbose=True)
load_dotenv(join(dirname(__file__), '.env'))

ip = "192.168.11.7"
user = "root"
password = os.getenv("password")
plugin_dir = "/var/mobile/Containers/Data/Application/F8279772-F3E0-4ADE-8E01-E996FFE32FC9/Documents/Plugins/"
with paramiko.SSHClient() as ssh:
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, port=22, username=user, password=password)
    client = scp.SCPClient(ssh.get_transport())


    def on_modified(event):
        filepath = event.src_path
        print(f"{filepath}")
        if filepath in [r".\src\index.tsx", r".\src\components\Settings.tsx"]:
            os.system("npm run build")
            client.put("./dist/K2geLocker.js", plugin_dir)
            ssh.exec_command(f"{plugin_dir}K2geLocker.js.disable")


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
