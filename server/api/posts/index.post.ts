// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'


// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { 
        id,
        title,
        text,
        imageId,
        userId,
        } = await readBody(event);

    // Prüfe, ob die Pflichtfelder (Tile, text) vorhanden sind
    if (!title || !text) {
        return {
            statusCode: 400, // Rückgabe eines 400-Fehlers für eine fehlerhafte Anfrage
            message: 'Title and text are required.',
        };
    }
    
    // Fall: Die ID ist gesetzt, es handelt sich um ein Update eines bestehenden Posts
    if (id) {
        try {
            // Aktualisiere den Post in der Datenbank basierend auf der ID
            await prisma.post.update({
                where: {
                    id: id // Zielpost anhand der ID identifizieren
                },
                data: {
                    text: text,
                    title: title,
                    imageId: imageId,
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

    // Fall: Neue Posterstellung (ID ist nicht gesetzt)
    try {
        const user = await prisma.post.create({
            data: {
                id: id,
                text: text,
                title: title,
                imageId: imageId,
                userId: userId,
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

