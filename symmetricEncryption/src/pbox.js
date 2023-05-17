// Define the P-box permutation table
const table = [2, 4, 6, 8, 1, 3, 5, 7];

//helper functions
function isBinary(str) {
    for(el of str) {
        if(el != "0" || el != "1") {
            return false;
        }
    }
    return true;
}

function handleError(input) {
    if(!isBinary(input) && input.length != 8) {
        return 'It is not a binary number or your block is not 8 bits long';
    }
}

function pboxEncrypt(input) {
    //handling incorrect input
    handleError(input);

    //creating an empty array with 8 elements and filling it with 0
    let resArr = Array(8).fill(0);

    //fill array with elements according to table
    for(let i = 0; i < resArr.length; i++) {
        const out = table.findIndex(el => el === i + 1);
        resArr[i] = input[out];
    }

    //return encrypted value
    return resArr.join('');
}

function pboxDecrypt(input) {
    //handling incorrect input
    handleError(input);

    //creating an empty array with 8 elements and filling it with 0
    let resArr = Array(8).fill(0);

    //fill array with elements according to table
    for(let i = 0; i < resArr.length; i++) {
        resArr[i] = input[table[i] - 1];
    }

    //return decrypted value
    return resArr.join('');
}

// console.log(pboxEncrypt('10110100')); //01100101
console.log(pboxDecrypt('01100101')); //10110100

module.exports = {
    pboxDecrypt,
    pboxEncrypt
}