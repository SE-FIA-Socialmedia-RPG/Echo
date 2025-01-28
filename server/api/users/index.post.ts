// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'
// Importiere bcrypt für das Hashen von Passwörtern
import bcrypt from 'bcrypt';

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { id,
            username,
            email,
            password,
            xp,
            profileImageId,
            backgroundImageId,
            bannerImageId,
            color } = await readBody(event);

    // Prüfe, ob die Pflichtfelder (username, email, password) vorhanden sind
    if (!username || !email || !password) {
        return {
            statusCode: 400, // Rückgabe eines 400-Fehlers für eine fehlerhafte Anfrage
            message: 'Username, email, and password are required.',
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
    
    // Fall: Die ID ist gesetzt, es handelt sich um ein Update eines bestehenden Nutzers
    if (id) {
        try {
            // Aktualisiere den Nutzer in der Datenbank basierend auf der ID
            await prisma.User.update({
                where: {
                    id: id // Zielnutzer anhand der ID identifizieren
                },
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword,
                    xp: xp,
                    profileImageId: profileImageId,
                    backgroundImageId: backgroundImageId,
                    bannerImageId: bannerImageId,
                    accentColor: color, // Farbschema des Nutzers
                },
            });
        } catch (error) {
            // Fehlerhandling für Datenbankprobleme während des Updates
            return {
                statusCode: 400,
                message: "Database request failed", // Fehlerdetails an den Client weitergeben
            };
        }
        return; // Ende des Handlers, wenn Update erfolgreich war
    }

    // Fall: Neue Nutzererstellung (ID ist nicht gesetzt)
    try {
        const user = await prisma.User.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                profileImageId: profileImageId,
                backgroundImageId: backgroundImageId,
                bannerImageId: bannerImageId,
                accentColor: color,
            },
        });
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme bei der Erstellung
        return {
            statusCode: 400,
            message: `Database request failed: ${error.message}`, // Fehlerdetails an den Client weitergeben
        };
    }
});

