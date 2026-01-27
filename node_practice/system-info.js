import os from "node:os"
import ms from "ms"

console.log('Informacion del sistema operativo')

console.log('Usuario: ', os.userInfo())
console.log('Tipo: ', os.type())
console.log('Plataforma: ', os.platform())
console.log('Version: ', os.release())
console.log('Uptime: ', ms(os.uptime() * 1000))
console.log('Load average: ', os.loadavg())
console.log('Memoria libre: ', os.freemem())
console.log('Memoria total: ', os.totalmem())
console.log('Numero de nucleos de la CPU: ', os.cpus().length)