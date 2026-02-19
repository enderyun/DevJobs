// ===========================
// INTERFACES EN TYPESCRIPT
// Mejor par objetos y clases
// Para todo lo demas, usar types 
// ===========================

interface Persona {
  readonly name: string
  readonly age: number
}

interface Indetificable {
  id: `user-${number}`
}

interface User extends Persona, Indetificable {
  email?: string;
  role: "admin" | "user" | "editor" // No se deberia hacer con interfaces
  saludar: () => void
  login(): boolean // Otra sintaxis
}

interface AdminUser extends User {
  adminLevel: number,
  accessAllAreas: boolean
  rootAdmin(): void
}

// Para todo lo demas
export type UserType = {
  readonly name: string;
  readonly age: number;
  email?: string;
  role: "admin" | "user" | "editor" //  Union types
}

const user: User = {
  id: 'user-123',
  name: 'Ender',
  age: 22,
  email: 'chris@gmail.com',
  role: 'admin',
  saludar: () => 'Hola!',
  login() {
    return true
  }
}

// Tener precaucion con los duplicados de interfaces
interface hero {
  name: string
}

interface hero {
  power: string
}

const spiderman: hero = {
  name: 'Spiderman',
  power: 'Super fuerza'
}

// Tipar con una funcion
// Creo que esto es mejor con types y no con
// interfaces
interface Calculadora {
  (a: number, b: number): number
}

const calcular: Calculadora = (a, b) => a + b

// ===========================
// CLASES EN TYPESCRIPT
// ===========================

interface MediaPlayer {
  play(): void
  pause(): void
  stop(): void
}

interface AudioPlayer {
  volume: number
}

// Lo mejor es evitar hacer muchas interfaces para
// una sola clase

class MusicPlayer implements MediaPlayer, AudioPlayer {
  volume: number = 100

  play() {
    console.log('Playing music')
  }
  pause() {
    console.log('Pausing music')
  }
  stop() {
    console.log('Stopping music')
  }
}


