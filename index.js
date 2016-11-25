// Simple message encoder using XOR.
//
//
// 'hello world'
// .split('')
// .map(s => s.charCodeAt() ^ key)
// .map(s => String.fromCharCode(s ^ key))
// .join('');

'use strict';
let secret = null;
let sharedKey = null;

module.exports = {
    decode: (msg, key) =>
        (
          secret = new Buffer(msg, 'base64').toString('utf8'),

          secret.split(' ')
              .map(c => String.fromCharCode(c ^ (key || sharedKey)))
              .join('')
        ),

    encode: (msg, key) =>
        (
            secret = msg.split('')
                .map(c => c.charCodeAt() ^ (key || sharedKey))
                .join(' '),

            new Buffer(secret, 'utf8').toString('base64')
        ),

    setKey: key => sharedKey = key
};

