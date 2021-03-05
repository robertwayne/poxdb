from subprocess import Popen, PIPE

commands = r'''
    git pull
    psql
    \i populate.sql
    \q
    logout
'''

process = Popen('/bin/bash', shell=False, universal_newlines=True,
                stdin=PIPE, stdout=PIPE, stderr=PIPE)

out, _ = process.communicate(commands)
print(out)
