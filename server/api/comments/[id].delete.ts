// Importiere PrismaClient aus dem Prisma-ORM-Paket
import { PrismaClient } from '@prisma/client'

// Initialisiere eine Instanz des PrismaClient
const prisma = new PrismaClient();

// Exportiere den Event-Handler als Standard-Export
export default defineEventHandler(async (event) => {
    // Extrahiere die benötigten Daten aus den Parametern der Anfrage
    const { id } = event.context.params;

    try {
        // Finde einen einzigartigen Kommentar anhand der ID und lösche ihn
        await prisma.comment.delete({
            where: {
                id: parseInt(id) // Konvertiere die ID zu einer Ganzzahl und suche den Kommentar
            },
        });
        // Überprüfe, ob der Kommentar gefunden wurde und gib das Ergebnis zurück
        return { message: `Entry with ID ${id} was deleted.` } 
    } catch (error) {
        // Fehlerhandling für Datenbankprobleme während der Abfrage
        return {
            statusCode: 400,
            message: "Database request failed", // Fehlerdetails an den Client weitergeben
        };
    }
});