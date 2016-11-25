// TODO: #generateKey should be stronger.
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

const crypto = require('crypto');
let sharedKey = null;

const checkKey = key => {
    if (key && (typeof key !== 'number')) {
        throw new Error('Sneak: Key must be of type Number');
    }
};

const decode = (msg, key) => {
    checkKey(key);

    const secret = new Buffer(msg, 'base64').toString('utf8');

    return secret.split(' ')
        .map(c => String.fromCharCode(c ^ (key || sharedKey)))
        .join('');
};

const encode = (msg, key) => {
    checkKey(key);

    const secret = msg.split('')
        .map(c => c.charCodeAt() ^ (key || sharedKey))
        .join(' ');

    return new Buffer(secret, 'utf8').toString('base64');
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

const setKey = key => {
    checkKey(key);
    sharedKey = key;
};

module.exports = {
    decode,
    encode,
    generateKey,
    setKey
};

