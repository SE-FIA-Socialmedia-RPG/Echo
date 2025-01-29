// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client';

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { id, name, adminUserId, bannerImageId, backgroundImageId, profileImageId } = await readBody(event);

    // Prüfe, ob die Pflichtfelder (Text) vorhanden sind
    if (!adminUserId || !name) {
        return {
            statusCode: 400, // Rückgabe eines 400-Fehlers für eine fehlerhafte Anfrage
            message: 'Cant make a community without a name or admin',
        };
    }

    // Fall: Die ID ist gesetzt, es handelt sich um ein Update eines bestehenden Kommentars
    if (id) {
        try {
            // Aktualisiere ein Kommentar in der Datenbank basierend auf der ID
            await prisma.comment.update({
                where: {
                    id: id, // Kommentar anhand der ID identifizieren
                },
                data: {
                    name: name,
                    bannerImageId: bannerImageId, 
                    profileImageId: profileImageId, 
                    backgroundImageId: backgroundImageId
                },
            });
            return {
                statusCode: 200,
                message: 'Community updated successfully',
            };
        } catch (error) {
            // Fehlerhandling für Datenbankprobleme während des Updates
            return {
                statusCode: 400,
                message: 'Database request failed', // Fehlerdetails an den Client weitergeben
            };
        }
    }

    // Fall: Neues Kommentar (ID ist nicht gesetzt)
    try {
        const newComment = await prisma.community.create({
            data: {
                name: name,
                adminUser: {
                    connect: { id: adminUserId },
                },
            },
        });
        return {
            statusCode: 201,
            message: 'Comment created successfully',
            data: newComment,
        };
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme bei der Erstellung
        return {
            statusCode: 400,
            message: 'Database request failed', // Fehlerdetails an den Client weitergeben
        };
    }
});