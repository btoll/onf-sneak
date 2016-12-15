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
const dh = require('./dh');
let sharedKey = null;

const convertKey = key => {
    if (!key) {
        throw new Error('Sneak: There is no key to decode, aborting...');
    }

    if (bignum.isBigNum(key) || (typeof key === 'number')) {
        return bignum(key);
    } else {
        throw new Error('Sneak: Key must be of type Number or BigNum');
    }
};

const decode = (msg, key) => {
    const secret = convertKey(key || sharedKey);
    const toDecode = new Buffer(msg, 'base64').toString('utf8');

    return toDecode.split(' ')
        .map(c => String.fromCharCode(
            bignum.xor(c, secret)
        ))
        .join('');
};

const encode = (msg, key) => {
    const secret = convertKey(key || sharedKey);

    const encoded = msg.split('')
        .map(c =>
            bignum.xor(c.charCodeAt(), secret)
        ).join(' ');

    return new Buffer(encoded, 'utf8').toString('base64');
};

const generateKey = n => {
    let res;

    if (n < 1) {
        return '';
    }

    res = [];
    // Default to 50-digit keys.
    n = n || 50;
    // Keys will be 1-9, inclusive.
    res.push(new Uint32Array(crypto.randomBytes(1))[0] % 9 + 1);

    return bignum(res.concat(generateKey(--n)).join(''));
};

const generatePrime = n =>
    bignum.prime(n || 512);

const getKey = () =>
    sharedKey;

const setKey = key => {
    sharedKey = convertKey(key);
};

module.exports = {
    decode,
    encode,
    generateDHKey: dh,
    generateKey,
    generatePrime,
    getKey,
    setKey
};

