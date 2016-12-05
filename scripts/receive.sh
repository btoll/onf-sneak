#!/bin/bash

receive() {
    ssh my_vps "cat my_pipe" | xargs sneak -d
    receive
}

receive

