package main

import (
	"fmt"
	"math/big"
)

type CustomBigInt struct {
	digits []string
}

func (n *CustomBigInt) SetHex(hexValue string) {
	bigInt := new(big.Int)
	bigInt.SetString(hexValue, 16)
	strVal := bigInt.Text(10)

	for i := 0; i < len(strVal); i += 32 {
		end := i + 32
		if end > len(strVal) {
			end = len(strVal)
		}
		block := strVal[i:end]
		//blockBigInt, _ := new(big.Int).SetString(block, 10)
		n.digits = append(n.digits, block)
	}
}

func (n *CustomBigInt) GetHex() string {
	str := ""
	for i := 0; i < len(n.digits); i++ {
		str += n.digits[i]
	}

	bigInt := new(big.Int)
	bigInt.SetString(str, 10)

	hexValue := fmt.Sprintf("%x", bigInt)

	return hexValue
}

func XOR(a, b *CustomBigInt) *CustomBigInt {
	result := new(CustomBigInt)

	for i := 0; i < len(a.digits); i++ {
		blockA, _ := new(big.Int).SetString(a.digits[i], 10)
		blockB, _ := new(big.Int).SetString(b.digits[i], 10)
		blockResult := new(big.Int).Xor(blockA, blockB)
		result.digits = append(result.digits, blockResult.Text(10))
	}

	return result
}

func AND(a, b *CustomBigInt) *CustomBigInt {
	result := new(CustomBigInt)

	for i := 0; i < len(a.digits); i++ {
		blockA, _ := new(big.Int).SetString(a.digits[i], 10)
		blockB, _ := new(big.Int).SetString(b.digits[i], 10)
		blockResult := new(big.Int).And(blockA, blockB)
		result.digits = append(result.digits, blockResult.Text(10))
	}

	return result
}

func OR(a, b *CustomBigInt) *CustomBigInt {
	result := new(CustomBigInt)

	for i := 0; i < len(a.digits); i++ {
		blockA, _ := new(big.Int).SetString(a.digits[i], 10)
		blockB, _ := new(big.Int).SetString(b.digits[i], 10)
		blockResult := new(big.Int).Or(blockA, blockB)
		result.digits = append(result.digits, blockResult.Text(10))
	}

	return result
}

func shiftR(x *CustomBigInt, n uint) *CustomBigInt {
	result := new(CustomBigInt)

	blockVal, _ := new(big.Int).SetString(x.GetHex(), 16)
	blockResult := new(big.Int).Rsh(blockVal, n)
	strVal := blockResult.Text(10)

	for i := 0; i < len(strVal); i += 32 {
		end := i + 32
		if end > len(strVal) {
			end = len(strVal)
		}
		block := strVal[i:end]
		result.digits = append(result.digits, block)
	}

	return result
}

func shiftL(x *CustomBigInt, n uint) *CustomBigInt {
	result := new(CustomBigInt)

	blockVal, _ := new(big.Int).SetString(x.GetHex(), 16)
	blockResult := new(big.Int).Lsh(blockVal, n)
	strVal := blockResult.Text(10)

	for i := 0; i < len(strVal); i += 32 {
		end := i + 32
		if end > len(strVal) {
			end = len(strVal)
		}
		block := strVal[i:end]
		result.digits = append(result.digits, block)
	}

	return result
}

func INV(x *CustomBigInt) *CustomBigInt {
	result := new(CustomBigInt)

	for i := 0; i < len(x.digits); i++ {
		block, _ := new(big.Int).SetString(x.digits[i], 10)
		blockResult := new(big.Int).Not(block)
		result.digits = append(result.digits, blockResult.Text(10))
	}

	return result
}

func main() {
	numberA := new(CustomBigInt)
	numberB := new(CustomBigInt)

	numberA.SetHex("51bf608414ad5726a3c1bec098f77b1b54ffb2787f8d528a74c1d7fde6470ea4")
	numberB.SetHex("403db8ad88a3932a0b7e8189aed9eeffb8121dfac05c3512fdb396dd73f6331c")

	fmt.Printf("Array inside structure numberA: %v\n", numberA.digits)
	fmt.Printf("Array inside structure numberB: %v\n", numberB.digits)
	fmt.Printf("GetHex numberA: %s\n", numberA.GetHex())
	fmt.Printf("GetHex numberB: %s\n", numberB.GetHex())
}
