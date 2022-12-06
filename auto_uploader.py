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
with paramiko.SSHClient() as ssh:
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, port=22, username=user, password=password)
    client = scp.SCPClient(ssh.get_transport())


    def on_modified(event):
        filepath = event.src_path
        print(f"{filepath}")
        if filepath == r".\src\index.tsx":
            os.system("npm run build")
            client.put("./dist/K2geLocker.js", "/var/mobile/Containers/Data/Application/682C29DA-0995-431A-8F7E-66368B706006/Documents/Plugins/")


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
