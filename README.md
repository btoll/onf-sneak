# Sneak

[![Build Status](https://travis-ci.org/btoll/sneak.svg?branch=master)](https://travis-ci.org/btoll/sneak)
[![Coverage Status](https://coveralls.io/repos/github/btoll/sneak/badge.svg?branch=master)](https://coveralls.io/github/btoll/sneak?branch=master)

## Installation

`npm install https://github.com/btoll/sneak.git -g`

## Example

Generate a symmetric key and send to a friend using GPG:

    sneak generateKey | gpg -e -a -r ben@example.com

Poor Man's Chat App

- Each participant generates SSH keys (with secure passphrase, of course).
- Add each public key to the remote server's `authorized_keys` file.
- Each participant should add their key to their `SSH-AGENT`.
- Create a named pipe on the remote server.
- Replace the vps name and named pipe name for each script in the `scripts/` directory.
- Have fun!

## License

[MIT](LICENSE)

