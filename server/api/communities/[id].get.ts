// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus den Parametern der Anfrage
    const { id } = event.context.params;

    try {
        // Finde eine einzigartige Community anhand der ID
        const ret = await prisma.community.findUnique({
            where: {
                id: parseInt(id) // Konvertiere die ID zu einer Ganzzahl und suche die Community
            },
            select: {
                id: true,
                name: true,
                profileImageId: true,
                backgroundImageId: true,
                bannerImageId: true,
                profileImage: true,
                backgroundImage: true,
                bannerImage: true,
                posts: true,
                users: true,
                adminUser: true,
                adminUserId: true,
                createdAt: true,
                updatedAt: true
            },
        });
        // Überprüfe, ob die Community gefunden wurde und gib das Ergebnis zurück
        return ret ? ret : {
            statusCode: 404,
            message: "User not found", // Community nicht gefunden
        };
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Abfrage
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});
