// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus den Parametern der Anfrage
    const { id } = event.context.params;

    try {
        // Finde einen einzigartigen Benutzer anhand der ID
        const ret = await prisma.User.findUnique({
            where: {
                id: parseInt(id) // Konvertiere die ID zu einer Ganzzahl und suche den Benutzer
            },
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                xp: true,
                awards: true,
                profileImageId: true,
                backgroundImageId: true,
                bannerImageId: true,
                profileImage: true,
                backgroundImage: true,
                bannerImage: true,
                accentColor: true,
                comments: true,
                posts: true,
                communities: true,
                communitiesAdmin: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        // Überprüfe, ob der Benutzer gefunden wurde und gib das Ergebnis zurück
        return ret ? ret : {
            statusCode: 404,
            message: "User not found", // Benutzer nicht gefunden
        };
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Abfrage
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});
