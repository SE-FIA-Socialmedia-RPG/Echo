// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { id,
            title,
            awardImageId,
            users } = await readBody(event);

    // Prüfe, ob die Pflichtfelder (username, email, password) vorhanden sind
    if (!title) {
        return {
            statusCode: 400, // Rückgabe eines 400-Fehlers für eine fehlerhafte Anfrage
            message: 'A Title is required',
        };
    }
    
    // Fall: Die ID ist gesetzt, es handelt sich um ein Update eines bestehenden Awards
    if (id) {
        try {
            // Aktualisiere den Nutzer in der Datenbank basierend auf der ID
            await prisma.award.update({
                where: {
                    id: id // Award anhand der ID identifizieren
                },
                data: {
                    title: title,
                    awardImageId: awardImageId,
                    users: users, 
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

    // Fall: Neue Erstellung eines Awards (ID ist nicht gesetzt)
    try {
        const user = await prisma.award.create({
            data: {
                title: title,
                awardImageId: awardImageId,
                users: users,   
            },
        });
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme bei der Erstellung
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});

