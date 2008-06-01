#!/usr/bin/python

from manager import Manager
import os
import os.path
import sys

if __name__ == "__main__":
    manager = Manager()
    manager.initialize()
    lockfile = os.path.join(sys.path[0], ".%s-lock" % manager.configname)

    if os.path.exists(lockfile):
        f = file(lockfile)
        pid = f.read()
        f.close()
        print "Another process (%s) is running, will exit" % pid.strip()
        sys.exit(1)

    f = file(lockfile, 'w')
    f.write("PID: %s\n" % os.getpid())
    f.close()
    
    if manager.options.doc:
        manager.print_module_doc()
    elif manager.options.list:
        manager.print_module_list()
    elif manager.options.failed:
        manager.print_failed()
    elif manager.options.clear_failed:
        manager.clear_failed()
    else:
        manager.execute()

    os.remove(lockfile)
