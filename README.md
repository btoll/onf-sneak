# onf-sneak

This is a simple message encoder that is intended to be fun and whimsical and a bit educational.

[![Build Status](https://travis-ci.org/btoll/onf-sneak.svg?branch=master)](https://travis-ci.org/btoll/onf-sneak)
[![Coverage Status](https://coveralls.io/repos/github/btoll/onf-sneak/badge.svg?branch=master)](https://coveralls.io/github/btoll/onf-sneak?branch=master)

## Installation

`npm i onf-sneak`

## Example

Generate a symmetric key and send to a friend using GPG:

    onf-sneak generateKey | gpg -e -a -r ben@example.com

Poor Man's Chat App

- Each participant generates SSH keys (with secure passphrase, of course).
- Add each public key to the remote server's `authorized_keys` file.
- Each participant should add their SSH key to their `GPG-AGENT` or `SSH-AGENT`.
- Create a named pipe on the remote server.
- Replace the vps name and the name of the named pipe for each script in the `scripts/` directory.
- Generate a shared key by using either the `generateKey` or `generateDHKey` function.
- Have fun!

## License

[MIT](LICENSE)

