var assert = require('assert');
const { sboxDecrypt, sboxEncrypt } = require('../src/sbox.js');

describe('sBox', function () {
    describe('Encrypt', function () {
      it('Encryption of the block 11111100 - should return 10110000', function () {
        assert.equal(sboxEncrypt('11111100'), '10110000');
      });
      it('Encryption of the block 11011011 - should return 10111001', function () {
        assert.equal(sboxEncrypt('11011011'), '10111001');
      });
      it('Encryption of the block 00110011 - should return 11000011', function () {
        assert.equal(sboxEncrypt('00110011'), '11000011');
      });
      it('Encryption of the block 11001011 - should return 00011111', function () {
        assert.equal(sboxEncrypt('11001011'), '00011111');
      });
      it('Encryption of the block 01010101 - should return 11111100', function () {
        assert.equal(sboxEncrypt('01010101'), '11111100');
      });
      it('Encryption of the block 10001001 - should return 10100111', function () {
        assert.equal(sboxEncrypt('10001001'), '10100111');
      });
    });
    describe('Decrypt', function () {
      it('Decryption of the block 10110000 - should return 11111100', function () {
          assert.equal(sboxDecrypt('10110000'), '11111100');
      });
      it('Decryption of the block 10111001 - should return 11011011', function () {
          assert.equal(sboxDecrypt('10111001'), '11011011');
      });
      it('Decryption of the block 11000011 - should return 00110011', function () {
          assert.equal(sboxDecrypt('11000011'), '00110011');
      });
      it('Decryption of the block 00011111 - should return 11001011', function () {
          assert.equal(sboxDecrypt('00011111'), '11001011');
      });
      it('Decryption of the block 11111100 - should return 01010101', function () {
          assert.equal(sboxDecrypt('11111100'), '01010101');
      });
      it('Decryption of the block 10100111 - should return 10001001', function () {
          assert.equal(sboxDecrypt('10100111'), '10001001');
      });
    });
});