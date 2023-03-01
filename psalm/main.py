import subprocess
import importlib.util
import sys
import json

# defines the subprocess for running psalm

def run_psalm():
    if sys.argv[2] != "0": 
        # executes psalm on the file given in arg[1]
        list_files = subprocess.run(["../vendor/bin/psalm",sys.argv[1]], stdout=subprocess.PIPE)
        print(json.dumps(list_files.stdout.decode('utf-8'),ensure_ascii=False))
    else:
        list_files = subprocess.run(["bandit",sys.argv[1], "-f", "csv"])   

if __name__ == '__main__':
    run_psalm()