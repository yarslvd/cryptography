package main

import (
	"crypto/elliptic"
	"crypto/rand"
	curve "ecdh/utils"
	"fmt"
	"math/big"
)

func ecdh(privKey1, privKey2 *big.Int) {
	pubKey1 := curve.ScalarMult(privKey1, curve.BasePointGGet())
	pubKey2 := curve.ScalarMult(privKey2, curve.BasePointGGet())

	//Generating common key by using scalar multiplying of your own private key with smbd public key
	commonKey1 := curve.ScalarMult(privKey1, pubKey2)
	commonKey2 := curve.ScalarMult(privKey2, pubKey1)

	//Checking if the common key is equal
	if commonKey1.X.Cmp(commonKey2.X) == 0 && commonKey2.X.Cmp(commonKey1.X) == 0 {
		fmt.Printf("Common secret key created successfully: %d", commonKey1.X)
	} else {
		fmt.Println("Error while creating share secret, keys do not match")
	}
}

func main() {
	//Generating first private key
	privKey1, err := rand.Int(rand.Reader, elliptic.P256().Params().N)
	if err != nil {
		fmt.Println("Error while generating first key")
		return
	}

	//Generating second private key
	privKey2, err := rand.Int(rand.Reader, elliptic.P256().Params().N)
	if err != nil {
		fmt.Println("Error while generating second key")
		return
	}

	//ECDH protocol to establish mutual secret key
	ecdh(privKey1, privKey2)
}
