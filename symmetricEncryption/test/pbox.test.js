var assert = require('assert');
const { pboxDecrypt, pboxEncrypt } = require('../src/pbox.js');

describe('pBox', function () {
    describe('Encrypt', function () {
      it('Encryption of the block 10110100 - should return 01100101', function () {
        assert.equal(pboxEncrypt('10110100'), '01100101');
      });
      it('Encryption of the block 11110011 - should return 01011111', function () {
        assert.equal(pboxEncrypt('11110011'), '01011111');
      });
      it('Encryption of the block 00100100 - should return 00100100', function () {
        assert.equal(pboxEncrypt('00100100'), '00100100');
      });
      it('Encryption of the block 11011001 - should return 11010011', function () {
        assert.equal(pboxEncrypt('11011001'), '11010011');
      });
      it('Encryption of the block 01010111 - should return 00111011', function () {
        assert.equal(pboxEncrypt('01010111'), '00111011');
      });
      it('Encryption of the block 10000011 - should return 01001010', function () {
        assert.equal(pboxEncrypt('10000011'), '01001010');
      });
    });

    describe('Decrypt', function () {
        it('Decryption of the block 01100101 - should return 10110100', function () {
          assert.equal(pboxDecrypt('01100101'), '10110100');
        });
        it('Decryption of the block 01011111 - should return 11110011', function () {
            assert.equal(pboxDecrypt('01011111'), '11110011');
        });
        it('Decryption of the block 00100100 - should return 00100100', function () {
            assert.equal(pboxDecrypt('00100100'), '00100100');
        });
        it('Decryption of the block 11010011 - should return 11011001', function () {
            assert.equal(pboxDecrypt('11010011'), '11011001');
        });
        it('Decryption of the block 00111011 - should return 01010111', function () {
            assert.equal(pboxDecrypt('00111011'), '01010111');
        });
        it('Decryption of the block 01001010 - should return 10000011', function () {
            assert.equal(pboxDecrypt('01001010'), '10000011');
        });
      });
});