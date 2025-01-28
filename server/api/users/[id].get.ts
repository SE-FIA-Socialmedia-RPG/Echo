// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus dem Body der Anfrage
    const { id } = getQuery(event);
        try {
            return await prisma.User.findUnique({
                where: {
                id: id // Zielnutzer anhand der ID identifizieren
                },
            });
        } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Abfrage
             return {
                statusCode: 400,
                message: `Database request failed: ${error.message}`, // Fehlerdetails an den Client weitergeben
            };
        }
});