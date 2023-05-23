const monobitTest = (arr) => {
    //let numOnes = 0;
    let numZeros = 0;

    //Calculate total number of all 0's and 1's seperately
    for(let el of arr) {
        for(let bit of el) {
            try {
                if(+bit === 0) {
                    //Incrementing numZeros variable if bit is 0
                    numZeros++;
                }
                else if(+bit === 1) {
                    //Incrementing numOnes variable if bit is 1
                    //numOnes++;
                }
                else {
                    //throwing error if the bit is neither 0 nor 1
                    throw new Error('Invalid character in binary string: ' + bit);
                }
            }
            catch(e) {
                return e;
            }
        }
    }

    return numZeros > 9654 && numZeros < 10346 ? true : false;
}

// const validateSequence = () => {
//     for(let el of arr) {
//         for(let bit of el) {
//             try {
//                 if(+bit !== 0 || +bit !== 0) {
//                     throw new Error('Invalid character in binary string: ' + bit);
//                 }
//             }
//             catch(e) {
//                 return e;
//             }
//         }
//     }
// }

const generateSequence = (length) => {
    //defining number of elements in array
    const byteLength = Math.ceil(length / 2500);
    //creating an empty array of byteLength elements and filling it with empty string
    const sequenceArr = new Array(byteLength).fill('');
  
    for (let i = 0, j = 0; i <= length; i++) {
        //random bit generation
        const bit = Math.round(Math.random());
        //adding it to an element sequence
        sequenceArr[j - 1] += bit;

        //if sequence has 2500 writing in the next one
        if(i % 2500 === 0) {
            ++j;
        }
    }
    delete sequenceArr['-1'];
    return sequenceArr;
}

const maxLengthSeriesTest = (arr) => {
    let maxSeries = 0;
    let currentSeries = 0;

    for(let el of arr) {
        for(let i = 0; i < el.length; i++) {
            //increment current series length if the next value is the same
            if(el[i] === el[i - 1]) {
                currentSeries++;
            }
            else {
                //update max series length if the current series is bigger than max series
                if (currentSeries > maxSeries) {
                    maxSeries = currentSeries;
                }
                //reset current series counter
                currentSeries = 1;
            }
        }
    }

    if (currentSeries > maxSeries) {
        maxSeries = currentSeries;
    }

    return maxSeries <= 36 ? true : false;
}

//helper function for pokkertest
const validateResult = (arr) => {
    if(arr[0] >= 2267 && arr[0] <= 2733 &&
        arr[1] >= 1079  && arr[1] <= 1421 &&
        arr[2] >= 502 && arr[2] <= 748 &&
        arr[3] >= 223 && arr[3] <= 402 &&
        arr[4] >= 90 && arr[4] <= 223 &&
        arr[5] >= 90 && arr[5] <= 223) {
            return true;
    }
}

const seriesLengthTest = (arr) => {
    //length of the series
    let currentSeries = 1;
    const seriesLengths = [1, 2, 3, 4, 5, 6];
    //array to store zeros values sums
    const seriesFrequencyZeros = new Array(seriesLengths.length).fill(0);
    //array to store ones values sums
    const seriesFrequencyOnes = new Array(seriesLengths.length).fill(0);

    for(let el of arr) {
        for(let i = 1; i < el.length; i++) {
            //increment current series length if the next value is the same
            if(el[i] === el[i + 1]) {
                currentSeries++;
            }
            else {
                //find number to increment value in array
                const seriesLength = Math.min(currentSeries, seriesLengths.length);
                if(+el[i] === 0) {
                    seriesFrequencyZeros[seriesLength - 1]++;
                }
                if(+el[i] === 1) {
                    seriesFrequencyOnes[seriesLength - 1]++;
                }
                currentSeries = 1;
            }
        }
        const seriesLength = Math.min(currentSeries, seriesLengths.length);
        if(+el[el.length - 1] === 0) {
            seriesFrequencyZeros[seriesLength - 1]++;
        }
        if(+el[el.length - 1] === 1) {
            seriesFrequencyOnes[seriesLength - 1]++;
        }
    }

    //validate the results and return true if they are satisfied
    if(validateResult(seriesFrequencyZeros) && validateResult(seriesFrequencyOnes)) {
        return true;
    }
}

const pokkerTest = (arr) => {
    //create frequency table to store numbers of occured blocks
    const frequenciesTable = {};

    for(let el of arr) {
        for(let i = 0; i < el.length; i += 4) {
            //take a block of 4 bits
            const block = el.substr(i, 4);
            //if there is not such type of block in object, add it and increment value
            if(!Object.hasOwn(frequenciesTable, block)) { 
                frequenciesTable[block] = 1;
            }
            else {
                //increment value of found block
                frequenciesTable[block] += 1;
            }
        }
    }

    //calculate the the quadratic sum of the all sums occurences in the sequence
    const sum = Object.values(frequenciesTable).reduce(
        (total, current) => total + Math.pow(current, 2), 0
    );

    //using formula to calculate the Poker value
    const resValue = (2 ** 4 / (20000 / 4)) * sum - (20000 / 4);

    return resValue >= 1.03 && resValue <= 57.4 ? true : false;
}

function runTests() {
    //generate bits
    const binaryData = generateSequence(20000);
    //run tests
    try {
        if(!monobitTest(binaryData)) {
            return 'Test 1 failed'; 
        }
        if(!maxLengthSeriesTest(binaryData)) {
            return 'Test 2 failed';
        }
        if(!seriesLengthTest(binaryData)) {
            return 'Test 3 failed';
        }
        if(!pokkerTest(binaryData)) {
            return 'Test 4 failed';
        }
        return 'Sequence successfully passed all the tests, the bits are enough random';
        //Output with validated binary sequence
        //return {message: 'Sequence successfully passed all the tests, the bits are enough random', binaryData};
    }
    catch(err) {
        return err;
    }
}

console.log(runTests());