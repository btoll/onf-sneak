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
        });
    });
});

