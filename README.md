# Sneak

[![Build Status](https://travis-ci.org/btoll/sneak.svg?branch=master)](https://travis-ci.org/btoll/sneak)
[![Coverage Status](https://coveralls.io/repos/github/btoll/sneak/badge.svg?branch=master)](https://coveralls.io/github/btoll/sneak?branch=master)

## Installation

`npm install https://github.com/btoll/sneak.git -g`

## Example

Generate a symmetric key and send to a friend using GPG:

    sneak generateKey | gpg -e -a -r ben@example.com

## License

[MIT](LICENSE)

