// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'
// Importiere bcrypt für das Hashen von Passwörtern
import bcrypt from 'bcrypt'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient()

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event:any) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { email, password } = await readBody(event)

    // Prüfe, ob die Pflichtfelder (email, password) vorhanden sind
    if (!email || !password) {
        return {
            statusCode: 400,
            message: 'E-Mail and password are required'
        }
    }

    // Validierung der Email-Adresse mit einem regulären Ausdruck
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return {
            statusCode: 400,
            message: 'Invalid email format'
        }
    }

    // Suche den Benutzer in der Datenbank anhand der Email
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        // Falls kein Benutzer gefunden wurde, gebe einen Fehler zurück
        if (!user) {
            return {
                statusCode: 401,
                message: 'Invalid email or password'
            }
        }

        // Vergleiche das eingegebene Passwort mit dem gespeicherten Hash
        const passwordMatch = await bcrypt.compare(password, user.password)

        // Falls das Passwort nicht übereinstimmt, gebe einen Fehler zurück
        if (!passwordMatch) {
            return {
                statusCode: 401,
                message: 'Invalid email or password'
            }
        }

        const login = await prisma.login.create({
            data: {
                userId: user.id
            }
        })

        // Falls die Anmeldung erfolgreich ist, erstelle eine Antwort
        return {
            statusCode: 200,
            message: 'Login successful',
            key: login.key
        }
    } catch(error) {
        return {
            statusCode: 400,
            message: "Database request failed."
        }
    }
})
