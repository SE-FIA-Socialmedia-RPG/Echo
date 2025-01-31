// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus den Parametern der Anfrage
    const { id } = event.context.params;

    try {
        // Finde einen einzigartigen Kommentar anhand der ID
        const ret = await prisma.comment.findUnique({
            where: {
                id: parseInt(id) // Konvertiere die ID zu einer Ganzzahl und suche den Kommentar
            },
            select: {
                id: true,
                user: true,
                text: true,
                likes: true, 
                postId: true, 
                userId: true, 
                post: true, 
                createdAt: true,
                updatedAt: true,
            },
        });
        // Überprüfe, ob der Kommentar gefunden wurde und gib das Ergebnis zurück
        return ret ? ret : {
            statusCode: 404,
            message: "User not found", // Kommentar nicht gefunden
        };
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Abfrage
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});
