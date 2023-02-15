import subprocess
import importlib.util
import sys
#import bandit
import json

# def install_bandit():
#     name = 'bandit'

#     if name in sys.modules:
#         print(f"{name!r} already in sys.modules")
#     elif (spec := importlib.util.find_spec(name)) is not None:
#     # perform the actual import ...
#         module = importlib.util.module_from_spec(spec)
#         sys.modules[name] = module
#         spec.loader.exec_module(module)
#         print(f"{name!r} has been imported")
#     else:
#         print(f"can't find the {name!r} module, installing...")
#         subprocess.run([sys.executable, "-m", "pip", "install", name])
        



def run_bandit():

#arg 1 is path to dir with python files
#outputs
    #print(sys.argv[2])

    if sys.argv[2] != "0": 
        #list_files = subprocess.run(["py", "-m","bandit", "-r",sys.argv[1], "-f", "json"], stdout=subprocess.PIPE)
        list_files = subprocess.run(["bandit",sys.argv[1], "-f", "json"], stdout=subprocess.PIPE)
        #print("the list_files was")
        #print(list_files.stdout.decode('utf-8'))
        print(json.dumps(list_files.stdout.decode('utf-8'),ensure_ascii=False))
    else:
        list_files = subprocess.run(["bandit",sys.argv[1], "-f", "csv"])   
    #print("The exit code was: %d" % list_files.returncode)


if __name__ == '__main__':
    #install_bandit()
    run_bandit()
   
