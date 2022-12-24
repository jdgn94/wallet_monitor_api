package main

import "fmt"

func main() {
	var number1, number2 int
	fmt.Println("Se va a realizar una sume de 2 números enteros.")
	fmt.Printf("Ingrese el primer numero: ")
	fmt.Scanln(&number1)
	fmt.Printf("Ingrese el segundo numero: ")
	fmt.Scanln(&number2)

	sum := number1 + number2
	fmt.Println("La suma de los 2 números:", sum)

	fmt.Println("\nAhora se ara la división entre 2 números.")
	fmt.Printf("Ingrese el primer numero: ")
	fmt.Scanln(&number1)
	fmt.Printf("Ingrese el segundo numero: ")
	fmt.Scanln(&number2)

	div := number1 / number2
	res := number1 % number2
	fmt.Println("La división de los números es:", div)
	fmt.Println("El residuo de la división de los números es:", res)

	var cost float32
	fmt.Println("\nSe va a realizar el valor de venta de un producto con IVA.")
	fmt.Printf("Ingresar el costo del producto: ")
	fmt.Scanln(&cost)
	iva := cost * 0.16
	price := cost + iva
	fmt.Println("El IVA del producto es:", iva)
	fmt.Println("El precio de venta del producto es:", price)
}
