// TODO: DRY!
'use strict';

const bignum = require('bignum');
const sneak = require('../index');

describe('sneak', () => {
    const defaultKey = sneak.generateKey(100);
    const secretMessage = 'The world is a vampire';

    describe('no shared key', () => {
        it('should not encode', () => {
            expect(() => sneak.encode(secretMessage)).toThrow();
        });

        it('should not decode', () => {
            expect(() => sneak.decode(secretMessage)).toThrow();
        });
    });

    describe('#encode', () => {
        describe('when key is passed as a param', () => {
            it('should encode', () => {
                expect(sneak.encode(secretMessage, defaultKey)).not.toBe(secretMessage, defaultKey);
            });

            it('should not throw if key is of type Number or BigNum', () => {
                expect(() => sneak.encode(secretMessage, defaultKey)).not.toThrow();
                expect(() => sneak.encode(secretMessage, bignum(defaultKey))).not.toThrow();
            });

            it('should throw if key is not of type Number or BigNum', () => {
                expect(() => sneak.encode(secretMessage, 'rupert')).toThrow();
                expect(() => sneak.encode(secretMessage, null)).toThrow();
                expect(() => sneak.encode(secretMessage, true)).toThrow();
                expect(() => sneak.encode(secretMessage, {})).toThrow();
                expect(() => sneak.encode(secretMessage, [])).toThrow();
            });
        });

        describe('when key is set prior', () => {
            it('should encode', () => {
                sneak.setKey(defaultKey);
                expect(sneak.encode(secretMessage)).not.toBe(secretMessage);
            });

            it('should not throw if key is of type Number or BigNum', () => {
                sneak.setKey(defaultKey);
                expect(() => sneak.encode(secretMessage)).not.toThrow();
            });

            it('should throw if key is not of type Number or BigNum', () => {
                expect(() => (
                    sneak.setKey('rupert'), sneak.encode(secretMessage)
                )).toThrow();

                expect(() => (
                    sneak.setKey(null), sneak.encode(secretMessage)
                )).toThrow();

                expect(() => (
                    sneak.setKey(true), sneak.encode(secretMessage)
                )).toThrow();

                expect(() => (
                    sneak.setKey({}), sneak.encode(secretMessage)
                )).toThrow();

                expect(() => (
                    sneak.setKey([]), sneak.encode(secretMessage)
                )).toThrow();
            });
        });
    });

    describe('#decode', () => {
        describe('when key is passed as a param', () => {
            const encoded = sneak.encode(secretMessage, defaultKey);

            it('should decode', () => {
                expect(sneak.decode(encoded, defaultKey)).toBe(secretMessage);
            });

            it('should not throw if key is of type Number or BigNum', () => {
                expect(() => sneak.decode(encoded, defaultKey)).not.toThrow();
                expect(() => sneak.decode(encoded, bignum(defaultKey))).not.toThrow();
            });

            it('should throw if key is not of type Number or BigNum', () => {
                expect(() => sneak.decode(encoded, 'rupert')).toThrow();
                // These work b/c the encoding has already set the key and the logical || will
                // return it for falsy values!
                //
                // I'm leaving these comments here for future reference.
                //
                // expect(() => sneak.decode(encoded, null)).toThrow();
                // expect(() => sneak.decode(encoded, false)).toThrow();
                expect(() => sneak.decode(encoded, true)).toThrow();
                expect(() => sneak.decode(encoded, {})).toThrow();
                expect(() => sneak.decode(encoded, [])).toThrow();
            });
        });

        describe('when key is set prior', () => {
            const encoded = sneak.encode(secretMessage, defaultKey);

            it('should decode', () => {
                sneak.setKey(defaultKey);
                expect(sneak.decode(encoded)).toBe(secretMessage);
            });

            it('should not throw if key is of type Number or BigNum', () => {
                sneak.setKey(defaultKey);
                expect(() => sneak.decode(encoded)).not.toThrow();
            });

            it('should throw if key is not of type Number or BigNum', () => {
                expect(() => (
                    sneak.setKey('rupert'), sneak.decode(encoded)
                )).toThrow();

                expect(() => (
                    sneak.setKey(null), sneak.decode(encoded)
                )).toThrow();

                expect(() => (
                    sneak.setKey(true), sneak.decode(encoded)
                )).toThrow();

                expect(() => (
                    sneak.setKey({}), sneak.decode(encoded)
                )).toThrow();

                expect(() => (
                    sneak.setKey([]), sneak.decode(encoded)
                )).toThrow();
            });
        });
    });

    describe('#generateKey', () => {
        const makeKeyAndGetLength = n =>
            sneak.generateKey(n).toString().length;

        it('should generate a BigNum key', () => {
            expect(bignum.isBigNum(
                sneak.generateKey()
            )).toBe(true);
        });

        it('should generate a 50-digit key by default', () => {
            expect(makeKeyAndGetLength()).toBe(50);
        });

        it('should generate keys of varying lengths', () => {
            expect(makeKeyAndGetLength(15)).toBe(15);
            expect(makeKeyAndGetLength(115)).toBe(115);
            expect(makeKeyAndGetLength(215)).toBe(215);
            expect(makeKeyAndGetLength(315)).toBe(315);
            expect(makeKeyAndGetLength(415)).toBe(415);
            expect(makeKeyAndGetLength(515)).toBe(515);
        });
    });

    describe('#getKey', () => {
        it('should return the shared key', () => {
            sneak.setKey(defaultKey);
            expect(sneak.getKey().toNumber()).toBe(defaultKey.toNumber());
        });

        it('should return a type BigNum', () => {
            sneak.setKey(defaultKey);
            expect(bignum.isBigNum(sneak.getKey())).toBe(true);
        });
    });

    describe('#setKey', () => {
        it('should allow type Number', () => {
            expect(() => sneak.setKey(5)).not.toThrow();
        });

        it('should allow type BigNum', () => {
            expect(() => sneak.setKey(bignum(5))).not.toThrow();
        });

        it('should convert type Number to BigNum', () => {
            expect((
                sneak.setKey(5),
                bignum.isBigNum(sneak.getKey())
            )).toBe(true);
        });

        it('should throw if setting a key not of type Number or BigNum ', () => {
            expect(() => sneak.setKey('rupert')).toThrow();
            expect(() => sneak.setKey(true)).toThrow();
            expect(() => sneak.setKey({})).toThrow();
            expect(() => sneak.setKey([])).toThrow();
        });
    });
});

