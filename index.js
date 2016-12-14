// Simple message encoder using XOR.
//
//
// 'hello world'
// .split('')
// .map(s => s.charCodeAt() ^ 42)
// .map(s => String.fromCharCode(s ^ 42))
// .join('');
//
//
'use strict';

const bignum = require('bignum');
const crypto = require('crypto');
let sharedKey = null;

const checkKey = key => {
    if (key && (typeof key !== 'number')) {
        throw new Error('Sneak: Key must be of type Number');
    }
};

const decode = (msg, key) => {
    const secret = key || sharedKey;

    if (secret == null) {
        throw new Error('Sneak: There is no key to decode, aborting...');
    }

    checkKey(secret);

    const toDecode = new Buffer(msg, 'base64').toString('utf8');

    return toDecode.split(' ')
        .map(c => String.fromCharCode(
            bignum.xor(
                c,
                secret
            )
        ))
        .join('');
};

const encode = (msg, key) => {
    checkKey(key);

    const encoded = msg.split('')
        .map(c => bignum.xor(
            c.charCodeAt(),
            (key || sharedKey))
        )
        .join(' ');

    return new Buffer(encoded, 'utf8').toString('base64');
};

const generateKey = n => {
    let res;

    if (n < 1) {
        return '';
    }

    res = [];
    // Default to 10-digit keys.
    n = n || 10;
    // Keys will be 1-9, inclusive.
    res.push(new Uint32Array(crypto.randomBytes(1))[0] % 9 + 1);

    return Number(res.concat(generateKey(--n)).join(''));
};

const getKey = () =>
    sharedKey;

const setKey = key => {
    checkKey(key);
    sharedKey = key;
};

module.exports = {
    decode,
    encode,
    generateKey,
    getKey,
    setKey
};

