import subprocess
import importlib.util
import sys
import json

def run_bandit():
    if sys.argv[2] != "0": 
        list_files = subprocess.run(["bandit",sys.argv[1], "-f", "json"], stdout=subprocess.PIPE)
        print(json.dumps(list_files.stdout.decode('utf-8'),ensure_ascii=False))
    else:
        list_files = subprocess.run(["bandit",sys.argv[1], "-f", "csv"])   


if __name__ == '__main__':
    run_bandit()
   
