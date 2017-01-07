#!/bin/bash

# -q      Quiet mode.  Causes most warning and diagnostic messages to be suppressed.
#
# -t      Force pseudo-tty allocation.  This can be used to execute arbitrary screen-based programs on a remote
#         machine, which can be very useful, e.g. when implementing menu services.  Multiple -t options force tty
#         allocation, even if ssh has no local tty.
#
# $1 = The message to encode
# $2 = Thhe shared secret symmetric key.
#
onf-sneak -e "$1" "$2" | xargs -I % echo "echo % > fifo" | xargs ssh -q -tt remote_machine

