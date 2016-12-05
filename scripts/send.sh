#!/bin/bash

sneak -e "$1" | xargs -I % echo "echo % > my_pipe" | xargs ssh my_vps

