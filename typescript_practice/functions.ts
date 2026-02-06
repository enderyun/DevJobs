// ===========================
// FUNCIONES EN TYPESCRIPT
// ===========================

function suma(a: number, b: number) {
  return a + b
}

const multiplicacion = (a: number, b: number) => a * b

const division = function (a: number, b: number) {
  return a / b
}

// ===========================
// PARAMETROS OPCIONALES
// ===========================

function saludar(name: string, age?: number) {
  if (age) {
    return `Hola ${name}, tienes ${age} años`
  }
  return `Hola ${name}`
}

console.log(saludar('Ender'))
console.log(saludar('Ender', 22))

// ===========================
// PARAMETROS POR DEFECTO
// ===========================

function saludarConDefault(name: string, age: number = 22)/*: { name: string, age: number } */ {
  return { name, age }
}

console.log(saludarConDefault('Ender'))
console.log(saludarConDefault('Ender', 22))

// ===========================
// PARAMETROS REST
// ===========================
// Aca no sabes cuantos parametros se van a recibir
// Debe de ser de tipo array 
function sumaTodos(...numbers: number[]) {
  return numbers.reduce((acc, num) => acc + num, 0)
}

console.log(sumaTodos(1, 2, 3, 4, 5))

// ===========================
// FUNCIONES COMO TIPOS
// ===========================

type Operation = (a: number, b: number) => number

const sumar: Operation = (a, b) => a + b
const restar: Operation = (a, b) => a - b
const multiplicar: Operation = (a, b) => a * b
const dividir: Operation = (a, b) => a / b

// ===========================
// TYPE NARROWING
// ===========================

function procesar(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase())
  } else {
    console.log(value.toFixed(2))
  }
}

function imprimirMensaje(mensaje: string | null | undefined) {
  // El mensaje es de tipo string | null | undefined
  if (mensaje) {
    // El mensaje es de tipo string
    console.log(mensaje.toUpperCase())
  }
}

procesar('hello')
procesar(123)


// ===========================
// OPERATOR NARROWING
// ===========================

type Pez = {
  nadar: () => void
  nombre: string
}

type Pajaro = {
  volar: () => void
  nombre: string
}

type Perro = {
  ladrar: () => void
  nombre: string
}

type Animal = Pez | Pajaro | Perro

function verificarAnimal(animal: Animal) {
  if ('nadar' in animal) {
    animal.nadar()
  } else if ('volar' in animal) {
    animal.volar()
  } else {
    animal.ladrar()
  }
}

const pez: Pez = {
  nadar: () => console.log('El pez nada'),
  nombre: 'Pez'
}

const pajaro: Pajaro = {
  volar: () => console.log('El pajaro vuela'),
  nombre: 'Pajaro'
}

verificarAnimal(pez)
verificarAnimal(pajaro)


// ===========================
// FUNCIONES CALLBACK
// ===========================

function procesarNumeros(numbers: number[], callback: (num: number) => number) {
  return numbers.map(callback)
}

const numeros = [1, 2, 3, 4, 5]
const numerosDobles = procesarNumeros(numeros, (num) => num * 2)
console.log(numerosDobles)

// ===========================
// FUNCIONES ASINCRONAS
// ===========================

async function obtenerDatos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos obtenidos')
    }, 2000)
  })
}

obtenerDatos().then((data) => console.log(data))

// ===========================
// OVERLOADS
// ===========================

function parsear(value: string): number
function parsear(value: number): string
function parsear(value: string | number): string | number {
  if (typeof value === 'string') {
    return parseInt(value)
  }
  return value.toString()
}

console.log(parsear('123'))
console.log(parsear(123))
