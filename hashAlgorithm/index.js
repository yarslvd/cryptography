const hash = require('object-hash');

const generateSequence = (length) => {
    let sequence = '';
  
    for (let i = 0; i < length; i++) {
        //random bit generation
        const bit = Math.round(Math.random());
        sequence += bit;
    }

    return sequence;
}

const stringToBytes = (bitString) => {
    const byteLength = Math.ceil(bitString.length / 8);
    const bytes = new Uint8Array(byteLength);
  
    for (let i = 0; i < byteLength; i++) {
      let byte = 0;
      for (let j = 0; j < 8; j++) {
        const bitIndex = i * 8 + j;
        if (bitIndex < bitString.length && bitString[bitIndex] === '1') {
          byte |= 1 << (7 - j);
        }
      }
      bytes[i] = byte;
    }
  
    return bytes;
}

const createChunks = (sequence) => {
    const blocksNumber = Math.ceil(sequence.length / 448);
    const binaryArr = new Array(blocksNumber).fill('');
    const messageLengthBinary = sequence.length.toString(2);
    const pad = messageLengthBinary.padStart(64 ,'0');

    for (let i = 0, j = 0; j <= blocksNumber; i++) {
        if(i % 448 === 0) {
            ++j;
        }
        if(!sequence[i]) {
            binaryArr[j - 1] += '1';
            const currValue = binaryArr[j - 1];
            const zeroes = '0'.repeat(448 - currValue.length);
            binaryArr[j - 1] = currValue.concat(zeroes);
            break;
        }

        binaryArr[j - 1] += sequence[i];
    }

    return binaryArr.map(el => el.concat(pad));
}

function bytesToBinaryString(buffer) {
    let binaryString = '';
    for (let i = 0; i < buffer.length; i++) {
        binaryString += buffer[i].toString(2).padStart(8, '0');
    }
    return binaryString;
}

const xOR = (str1, str2) =>  {
    let arr1 = str1.split('').map((lt) => +lt );
    let arr2 = str2.split('').map((lt) => +lt );
    const xORarray = arr1.map((num, index) => num ^ arr2[index]);
    return xORarray.join('').toString();
}
  
const and = (str1, str2) => {
    let arr1 = str1.split('').map((lt) => +lt );
    let arr2 = str2.split('').map((lt) => +lt );
    const anDarray = arr1.map((num, index) => num & arr2[index]);
    return anDarray.join('').toString();
}
  
function or(str1, str2) {
    let arr1 = str1.split('').map((lt) => +lt );
    let arr2 = str2.split('').map((lt) => +lt );
    const oRarray = arr1.map((num, index) => num | arr2[index]);
    return oRarray.join('').toString();
}
  
function not(str) {
    let arr = str.split('').map((lt) => +lt );
    return arr.map(lt => lt === '1' ? 1 : 0).join('');
}
  
function binaryAddition(str1, str2) {
    const num1 = parseInt(str1, 2);
    const num2 = parseInt(str2, 2);
    let sum = (num1 + num2).toString(2);
    const length = str1.length;

    while (sum.length < str1.length) {
        sum = '0' + sum;
    }

    return sum.length === length ? '1' + sum : sum;
}
  
function truncate(str, len) {
    while (str.length > len) {
        str = str.slice(1);
    }

    return str;
}
  

const sha1 = (sequence) => {
    //constants used later during the hashing function
    let h0 = '01100111010001010010001100000001';
    let h1 = '11101111110011011010101110001001';
    let h2 = '10011000101110101101110011111110';
    let h3 = '00010000001100100101010001110110';
    let h4 = '11000011110100101110000111110000';

    //convert to string of bits
    const bitsStr = bytesToBinaryString(sequence);

    //creating chunks with length 512
    const chunks = createChunks(bitsStr);
    //divide each chunk on bloks of 16 elements with 32 bits
    const words = chunks.map(el => el.match(/.{1,32}/g) ?? []);

    //create extended arrays with 80 words
    const wordsNew = words.map((arr) => {
        for(let i = 16; i <= 79; i++) {
            const wordA = arr[i - 3];
            const wordB = arr[i - 8];
            const wordC = arr[i - 14];
            const wordD = arr[i - 16];
    
            const xorA = xOR(wordA, wordB);
            const xorB = xOR(xorA, wordC);
            const xorC = xOR(xorB, wordD);

            const leftRotated = xorC.slice(1) + xorC.slice(0, 1);
            arr.push(leftRotated);
        }
        return arr;
    });

    for(let i = 0; i < wordsNew.length; i++) {
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;

        for(let j = 0; j < 80; j++) {
            let f;
            let k;
            if(j < 20) {
                let BandC = and(b, c);
                let notBandD = and(not(b), d);
                f = or(BandC, notBandD);
                k = '01011010100000100111100110011001';
            }
            else if(j < 40) {
                let BxorC = xOR(b, c);
                f = xOR(BxorC, d);
                k = '01101110110110011110101110100001';
            }
            else if(j < 60) {
                let BandC = and(b, c);
                let BandD = and(b, d);
                let CandD = and(c, d);
                let BandCorBandD = or(BandC, BandD);
                f = or(BandCorBandD, CandD);
                k = '10001111000110111011110011011100';
            }
            else {
                let BxorC = xOR(b, c);
                f = xOR(BxorC, d);
                k = '11001010011000101100000111010110';
            }

            const word = wordsNew[i][j];
            let AleftRotated5 = a.slice(5) + a.slice(0, 5);
            const temp1 = binaryAddition(AleftRotated5, f);
            const temp2 = binaryAddition(temp1, e);
            const temp3 = binaryAddition(temp2, k);
            let temp = binaryAddition(temp3, word);

            // console.log(temp.length, temp)
            temp = truncate(temp, 32);
            e = d;
            d = c;
            c = b.slice(30) + b.slice(0, 30);
            b = a;
            a = temp;
        }

        h0 = truncate(binaryAddition(h0, a), 32);
        h1 = truncate(binaryAddition(h1, b), 32);
        h2 = truncate(binaryAddition(h2, c), 32);
        h3 = truncate(binaryAddition(h3, d), 32);
        h4 = truncate(binaryAddition(h4, e), 32);
    }

    //return [h0, h1, h2, h3, h4].join('');
    return stringToBytes([h0, h1, h2, h3, h4].join(''));
}

const handleStringInput = () => {
    //generating 1000 bits
    const sequence = generateSequence(1000);
    //converting bits to bytes array
    const bytesArray = stringToBytes(sequence);

    console.time('My implementation');
    const res = sha1(bytesArray);
    console.timeEnd('My implementation');
    // console.log(res);

    console.time('Library');
    const objHash = hash(stringToBytes(sequence), { algorithm: 'sha1', encoding: 'buffer' });
    console.timeEnd('Library');
    // console.log(objHash);
}

handleStringInput();