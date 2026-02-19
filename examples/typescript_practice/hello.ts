import type { User, UserEntity } from './types.ts'

const user1: User = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  company: {
    name: 'Generic Corp',
    address: '123 Main St'
  },
  role: 'user'
};

const user2: User = {
  name: 'Jane Smith',
  age: 25,
  email: 'jane.smith@example.com',
  company: {
    name: 'Solutions Inc',
    address: '456 Market Rd'
  },
  role: 'editor'
}

const entity: UserEntity = {
  id: 123,
  name: 'Chris',
  age: 22,
  email: 'chris@mail.com',
  role: 'admin',
  company: {
    name: 'mi empresa',
    address: 'mi direccion'
  },
}

// Index signatures
type Dictionary = {
  [key: string]: string
}

const dictionary: Dictionary = {
  apple: 'A fruit that is usually red, green or yellow',
  banana: 'A long yellow fruit',
  cherry: 'A small round red fruit',
}

// Tuplas
const persona: [name: string, age: number] = ["Ender", 22]
const [personaName, personaAge] = persona

type Persona = [name: string, age: number]
const persona2: Persona = ['Aeron', 22]

// Diferentes usos: 
// 1. RGB
type RGB = [r: number, g: number, b: number]
const color: RGB = [255, 0, 0]

// 2. Coordenadas
type Coordenadas = [x: number, y: number]
const coordenadas: Coordenadas = [10, 20]


// Tuplas con REST elements
type StringYMuchosNumeros = [string, ...number[]]
const [text, firstNumber, ...restOfNumbers]: StringYMuchosNumeros = ['text', 1, 2, 3, 4, 5]

console.log(text)
console.log(firstNumber)
console.log(restOfNumbers)

type Config = readonly [server: string, port: number, useSSL: boolean]
const dbConfig: Config = ['localhost', 5432, false]
console.log(dbConfig)




// ==============================================
// ANY, UNKNOWN, VOID, NEVER
// ==============================================

// ==============
// Any: el que desactiva TypeScript
// ==============
let a: any = 10
a = 'hello'
a = true
a = {}
// a.saludar() 
// Solo usar en casos muy concretos, como: 
// 1. Migraciones de JS a TS
// 2. Librerias externas que no tienen tipos (Pero es mejor evitarlo a toda costa)

// ==============
// Unknown: alternativa segura a any. Usar mejor en migraciones
// ==============
let b: unknown = 10
b = 'hello'
b = true
b = {}
// b.saludar() // b is of type unknown
// En caso haya un unknown, lo ideal es hacer un type narrowing
if (typeof b === 'object') {
  const bFalse = !b
  console.log(bFalse)
}

// =======================
// Void: funciones que no retornan nada
// =======================
function sayHello(): void {
  console.log('Hello')
}

// =======================
// Never: un valor que nunca ocurre
// =======================
function throwError(): never {
  throw new Error('Error')
}

function neverEnd(): never {
  let a = 0
  while (true) {
    a++
    console.log('Never end. ' + a)
  }
}

function revisarValor(x: number | string) {
  if (typeof x === 'number') {
    console.log("Es de tipo number")
  } else if (typeof x === 'string') {
    console.log("Es de tipo string")
  } else {
    // X es de tipo never
    throw new Error("Tipo no soportado")
  }
}

// =======================