// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { page, limit } = getQuery(event);

    try {
        // Wenn kein Limit oder Seite übergeben wird, werden standardmäßig 10 Einträge pro Seite ausgegeben
        return await prisma.comment.findMany({
            skip: (page && limit) ? (parseInt(page) * parseInt(limit)) - parseInt(limit) : 0,
            take: (page && limit) ? parseInt(limit) : 10,
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
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Abfrage
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});
