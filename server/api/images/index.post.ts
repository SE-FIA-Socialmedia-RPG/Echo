// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { id,
            path, 
            hash
            } = await readBody(event);

            // Fall: Neue Nutzererstellung (ID ist nicht gesetzt)
    try {
        const user = await prisma.image.create({
            data: {
                id: id,
                path: path,
                hash: hash,
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