'use strict';

const bignum = require('bignum');
const logger = require('onf-logger');
const readline = require('readline');

let getSecretIter = null;
let textIter = null;

const ask = query =>
    rl.question(query, answer => {
        const n = bignum(answer);

        if (n) {
            getSecretIter.next([
                n,
                textIter.next().value
            ]);
        }
    });

function* getSecret(baseQuestion) {
    const [g, modulusQuestion] = yield ask(baseQuestion);
    const [p, secretQuestion] = yield ask(modulusQuestion);
    const [exp, shareResultText] = yield ask(secretQuestion);
    const bobResult = g.pow(exp).mod(p);
    logger.info(`${shareResultText}${bobResult}`);
    const [aliceResult, completionText] = yield ask(textIter.next().value);
    const key = aliceResult.pow(exp).mod(p);
    logger.success(`${completionText}${key}`);
    rl.close();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const text = new Set([
    'Enter the base number `g`:',
    'Enter the modulus `p` (should be a sufficiently large prime):\n',
    'Enter your secret exponent:\n',
    'Share this result with your friend:\n',
    'Enter your friend\'s result:\n',
    'Use the following symmetric key for your secret communication:\n'
]);

module.exports = () => (
    // textIter = text[Symbol.iterator]();
    textIter = text.values(),

    // Start the generators...GO!
    getSecretIter = getSecret(textIter.next().value),
    getSecretIter.next(),

    // TODO: How to prevent the function return value from being logged to stdout.
    ''
);

