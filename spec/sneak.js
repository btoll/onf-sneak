/* eslint-disable no-console */
'use strict';

const sneak = require('../index');

describe('sneak', () => {
    const msg = 'foo';
    let value;

    describe('no shared key', () => {
        it('should encode', () => {
            value = sneak.encode(msg);
            expect(value).not.toBe(msg);
        });

        it('should decode', () => {
            expect(sneak.decode(value)).toBe(msg);
        });
    });

    describe('shared key', () => {
        describe('when passed as a param', () => {
            let key = 1992;

            it('should encode', () => {
                value = sneak.encode(msg, key);
                expect(value).not.toBe(msg, key);
            });

            it('should decode', () => {
                expect(sneak.decode(value, key)).toBe(msg);
            });

            it('should throw if key is not of type Number', () => {
                expect(() => sneak.decode(value, 'rupert')).toThrow();
                expect(() => sneak.decode(value, true)).toThrow();
                expect(() => sneak.decode(value, {})).toThrow();
                expect(() => sneak.decode(value, [])).toThrow();
            });
        });

        describe('when set using #setKey API', () => {
            beforeAll(() => sneak.setKey(64000));

            it('should encode', () => {
                value = sneak.encode(msg);
                expect(value).not.toBe(msg);
            });

            it('should decode', () => {
                expect(sneak.decode(value)).toBe(msg);
            });

            it('should throw if key is not of type Number', () => {
                expect(() => sneak.setKey('rupert')).toThrow();
                expect(() => sneak.setKey(true)).toThrow();
                expect(() => sneak.setKey({})).toThrow();
                expect(() => sneak.setKey([])).toThrow();
            });
        });
    });

    describe('#generateKey', () => {
        it('should generate a 10-digit key by default', () => {
            expect(sneak.generateKey().toString().length).toBe(10);
        });

        it('should generate a custom key length when passed a param', () => {
            expect(sneak.generateKey(15).toString().length).toBe(15);
        });
    });
});

