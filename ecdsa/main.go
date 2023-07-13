package main

import (
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	curve "ecdsa/utils"
	"fmt"
	"math/big"
	"strings"
)

type ECDSASignature struct {
	r *big.Int
	s *big.Int
}

func generateKeys() (*big.Int, curve.ECPoint) {
	privateKey, err := rand.Int(rand.Reader, elliptic.P256().Params().N)
	if err != nil {
		panic(err)
	}

	publicKey := curve.ScalarMult(privateKey, curve.BasePointGGet())
	return privateKey, publicKey
}

func sign(privateKey *big.Int, message string) ECDSASignature {
	//hashing message
	hash := sha256.Sum256([]byte(message))

	//generating random number in range [1...n-1]
	k, err := rand.Int(rand.Reader, elliptic.P256().Params().N)
	if err != nil {
		panic(err)
	}

	R := curve.ScalarMult(k, curve.BasePointGGet())
	r := new(big.Int).Mod(R.X, elliptic.P256().Params().N)

	kInverse := new(big.Int).ModInverse(k, elliptic.P256().Params().N)
	s := new(big.Int).SetBytes(hash[:])
	s.Add(s, new(big.Int).Mul(privateKey, r))
	s.Mul(s, kInverse)
	s.Mod(s, elliptic.P256().Params().N)

	return ECDSASignature{r, s}
}

func verify(publicKey curve.ECPoint, signature ECDSASignature, message string) bool {
	hash := sha256.Sum256([]byte(message))
	r := signature.r
	s := signature.s

	if r.Cmp(elliptic.P256().Params().N) >= 0 || s.Cmp(elliptic.P256().Params().N) >= 0 {
		return false
	}

	sInverse := new(big.Int).ModInverse(s, elliptic.P256().Params().N)
	w := new(big.Int).Mod(sInverse, elliptic.P256().Params().N)
	u1 := new(big.Int).Mul(new(big.Int).SetBytes(hash[:]), w)
	u1.Mod(u1, elliptic.P256().Params().N)

	u2 := new(big.Int).Mul(r, sInverse)
	u2.Mod(u2, elliptic.P256().Params().N)

	R1 := curve.ScalarMult(u1, curve.BasePointGGet())
	R2 := curve.ScalarMult(u2, publicKey)
	R := curve.AddECPoints(R1, R2).X

	if r.Cmp(R) == 0 {
		return true
	}
	return false
}

func serializePublicKey(publicKey curve.ECPoint) string {
	return curve.ECPointToString(publicKey)
}

func serializePrivateKey(privateKey *big.Int) string {
	return privateKey.Text(16)
}

func serializeSignature(signature ECDSASignature) string {
	return signature.r.Text(16) + "," + signature.s.Text(16)
}

func deserializePublicKey(stringPubKey string) curve.ECPoint {
	return curve.StringToECPoint(stringPubKey)
}

func deserializePrivateKey(stringPrvKey string) *big.Int {
	res := new(big.Int)
	res.SetString(stringPrvKey, 16)
	return res
}

func deserializeSignature(signatureStr string) (*big.Int, *big.Int) {
	values := strings.Split(signatureStr, ",")
	if len(values) != 2 {
		panic("Error while deserializing signature!")
	}

	r := new(big.Int)
	s := new(big.Int)

	r.SetString(values[0], 16)
	s.SetString(values[1], 16)

	return r, s
}

func displayVerifiedMessage(message string, signature ECDSASignature) {
	fmt.Printf("\n%s\n", "===============================================================================================")
	fmt.Println("**Message has been verified successfully**")
	fmt.Printf("%s\n\n", message)
	fmt.Println("Signature data:")
	fmt.Printf("r, s: %s\n", serializeSignature(signature))
	fmt.Println("===============================================================================================")
}

func serializingKeysTests(publicKey curve.ECPoint, privateKey *big.Int) {
	//serialize keys
	fmt.Printf("\nSerialized public key: %s\n", serializePublicKey(publicKey))
	fmt.Printf("Serialized private key: %s\n", serializePrivateKey(privateKey))

	//deserialize private key
	serializedPrivateKey := "30046030f26f462d7ac21a27eb9d53fff233c7acd12d87e96aff2"
	fmt.Printf("Deserialized private key: %d\n", deserializePrivateKey(serializedPrivateKey))

	//deserialize public key
	serializedPublicKey := "30046030f26f462d7ac21a27eb9d53fff233c7acd12d87e96aff2,1802301c24dc7603f86d1d445f746905d09b7af3b84aea59bdbb34"
	fmt.Println("Deserialized public key:")
	curve.PrintECPoint(deserializePublicKey(serializedPublicKey))
}

func main() {
	message := "Hello wrld"

	//generating keys
	privateKey, publicKey := generateKeys()

	//signing message
	signature := sign(privateKey, message)

	//tests for de/serializing keys
	//serializingKeysTests(publicKey, privateKey)

	//deserialize signature
	//r, s := deserializeSignature("30046030f26f462d7ac21a27eb9d53fff233c7acd12d87e96aff2,1802301c24dc7603f86d1d445f746905d09b7af3b84aea59bdbb34")
	//fmt.Printf("r, s: %d %d\n", r, s)

	//verifying signature
	if verify(publicKey, signature, message) == true {
		displayVerifiedMessage(message, signature)
	} else {
		fmt.Printf("\n%s\n", "The message is not verified, it could have been changed!")
	}
}
