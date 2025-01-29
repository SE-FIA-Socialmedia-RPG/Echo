// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'
// Importiere bcrypt für das Hashen von Passwörtern
import bcrypt from 'bcrypt';

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { email,
            password } = await readBody(event);

    // Prüfe, ob die Pflichtfelder (username, email, password) vorhanden sind
    if (!email || !password) {
        return {
            statusCode: 400, // Rückgabe eines 400-Fehlers für eine fehlerhafte Anfrage
            message: 'E-Mail and password are required.',
        };
    }

    // Validierung der Email-Adresse mit einem regulären Ausdruck
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            statusCode: 400,
            message: 'Invalid email format.', // Rückmeldung für ungültige Email-Formate
        };
    }

    // Prüfung auf Mindestlänge des Passworts (mindestens 10 Zeichen)
    if (password.length < 10) {
        return {
            statusCode: 400,
            message: 'Password must be at least 10 characters long.', // Rückmeldung für schwaches Passwort
        };
    }

    // Passwort sicher mit bcrypt hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email as string,// Zielnutzer anhand der E-Mail identifizieren
            },
            select: {
                id: true,
                password: true,
            },
        });

        if (! await bcrypt.compare(password as string, user.password)) {
            return {
                statusCode: 400,
                message: "E-Mail or password incorrect",
            }
        }

        const login = await prisma.login.create({
            data: {
                userId: user.id, 
            },
        })

        return {
            statusCode: 200,
            message: "Login Successfull",
            key: login.key,
        }

    } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Suche
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});

