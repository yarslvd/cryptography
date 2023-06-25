package main

import (
	"crypto/elliptic"
	"crypto/rand"
	"fmt"
	"math/big"
	"strings"
)

type ECPoint struct {
	X *big.Int
	Y *big.Int
}

func BasePointGGet() ECPoint {
	curve := elliptic.P256()

	return ECPoint{
		X: curve.Params().Gx,
		Y: curve.Params().Gy,
	}
}

func ECPointGen(x, y *big.Int) ECPoint {
	return ECPoint{X: x, Y: y}
}

func isOnCurveCheck(a ECPoint) bool {
	curve := elliptic.P256()
	return curve.IsOnCurve(a.X, a.Y)
}

func AddECPoints(a, b ECPoint) ECPoint {
	curve := elliptic.P256()
	x, y := curve.Add(a.X, a.Y, b.X, b.Y)
	return ECPoint{X: x, Y: y}
}

func DoubleECPoints(a ECPoint) ECPoint {
	curve := elliptic.P256()
	x, y := curve.Double(a.X, a.Y)
	return ECPoint{X: x, Y: y}
}

func ScalarMult(k *big.Int, a ECPoint) ECPoint {
	curve := elliptic.P256()
	x, y := curve.ScalarMult(a.X, a.Y, k.Bytes())
	return ECPoint{X: x, Y: y}
}

func ECPointToString(point ECPoint) string {
	s := point.X.Text(16) + "," + point.Y.Text(16)
	return s
}

func StringToECPoint(s string) ECPoint {
	coordinates := strings.Split(s, ",")
	if len(coordinates) != 2 {
		return ECPoint{}
	}

	x := new(big.Int)
	y := new(big.Int)

	x.SetString(coordinates[0], 16)
	y.SetString(coordinates[1], 16)

	return ECPoint{X: x, Y: y}
}

func PrintECPoint(point ECPoint) {
	fmt.Printf("X: %s\n", point.X.Text(16))
	fmt.Printf("Y: %s\n\n", point.Y.Text(16))
}

func tests() {
	// get base point
	basePoint := BasePointGGet()
	fmt.Println("\nBase Point:")
	PrintECPoint(basePoint)

	//creating EC points
	x1 := new(big.Int)
	y1 := new(big.Int)
	x1.SetString("1234567890123456789012345678901234567890123456789012345678901234", 10) //false for isOnCurve
	y1.SetString("9876543210987654321098765432109876543210987654321098765432109876", 10) //false for isOnCurve
	newPoint1 := ECPointGen(x1, y1)

	x2 := new(big.Int)
	y2 := new(big.Int)
	x2.SetString("99900999", 10)                                                                     //true for isOnCurve
	y2.SetString("9851151978220366039615215600016114916758994648000171558822843077797956858945", 10) //true for isOnCurve
	newPoint2 := ECPointGen(x2, y2)

	fmt.Println("Generated Point1:")
	PrintECPoint(newPoint1)

	fmt.Println("Generated Point2:")
	PrintECPoint(newPoint2)

	//check if this point is on curve
	fmt.Printf("isOnCurve: %t\n", isOnCurveCheck(newPoint1))
	fmt.Printf("isOnCurve: %t\n\n", isOnCurveCheck(newPoint2))

	//addition of 2 points that are on the same curve
	addition := AddECPoints(newPoint2, newPoint2)
	fmt.Println("Addition of the points:")
	PrintECPoint(addition)

	//double point
	double := DoubleECPoints(newPoint2)
	fmt.Println("Double of the point:")
	PrintECPoint(double)

	//multiply by scalar
	scalar := new(big.Int)
	scalarMult := ScalarMult(scalar.SetInt64(2), newPoint2)
	fmt.Println("Multiply by scalar:")
	PrintECPoint(scalarMult)

	//serialize to string
	fmt.Println("Serialize: ")
	fmt.Printf("%s\n", ECPointToString(newPoint1))

	//deserialize point
	fmt.Println("Deserialize: ")
	serialized := "30046030f26f462d7ac21a27eb9d53fff233c7acd12d87e96aff2,1802301c24dc7603f86d1d445f746905d09b7af3b84aea59bdbb34"
	PrintECPoint(StringToECPoint(serialized))

	return
}

func main() {
	//if you want to test each function just uncomment the line below
	//tests()

	G := BasePointGGet()
	k, _ := rand.Int(rand.Reader, new(big.Int).SetBit(new(big.Int), 256, 1))
	d, _ := rand.Int(rand.Reader, new(big.Int).SetBit(new(big.Int), 256, 1))

	H1 := ScalarMult(d, G)
	H2 := ScalarMult(k, H1)

	H3 := ScalarMult(k, G)
	H4 := ScalarMult(d, H3)

	result := H2.X.Cmp(H4.X) == 0 && H2.Y.Cmp(H4.Y) == 0

	fmt.Println("Equation Result:", result)
}
