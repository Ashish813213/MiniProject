# tunnel.py
import subprocess

def start_tunnel(port):
    process = subprocess.Popen(['pylt', 'port', str(port)], stdout=subprocess.PIPE, text=True)
    while True:
        line = process.stdout.readline()
        if not line:
            break
        if "https://" in line:
            print(f"Tunnel URL: {line.strip()}")
            break

if __name__ == "__main__":
    start_tunnel(5000)
