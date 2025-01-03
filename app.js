const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Définition des chemins pour les dossiers et fichiers
const artefactsDir = 'Artefacts'; // Dossier contenant les artefacts
const outputDir = path.join(artefactsDir, 'output'); // Dossier de sortie pour les fichiers générés

// Fichier d'entrée principal
const artefactJsonFilePath = path.join(artefactsDir, 'artefact.json');

// Fonction pour randomiser une chaîne de caractères
function randomizeString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
}

// Fonction pour remplacer les liens Discord par [Lien interdit]
function replaceDiscordLinks(content) {
    const discordLinkRegex = /https:\/\/discord\.gg\/[a-zA-Z0-9]+/gi;
    return content.replace(discordLinkRegex, (match) => {
        const randomizedLink = `https://discord.gg/${randomizeString()}`;
        console.log(`Lien Discord randomisé : ${match} -> ${randomizedLink}`);
        return "[Lien interdit]";
    });
}

// Fonction 1 : Extraction des messages du fichier JSON
async function extractMessages() {
    const randomNum = Math.floor(Math.random() * 999) + 1;
    const outputFilePath = path.join(outputDir, `artefact_messages_${randomNum}.json`);

    try {
        await fs.promises.access(artefactJsonFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        const fileStream = fs.createReadStream(artefactJsonFilePath);
        const outputStream = fs.createWriteStream(outputFilePath);
        const jsonStream = JSONStream.parse('messages.*');

        outputStream.write('[');

        let isFirstMessage = true;

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                const sanitizedContent = replaceDiscordLinks(message.content);
                outputStream.write(isFirstMessage ? '' : ',');
                isFirstMessage = false;
                outputStream.write(
                    JSON.stringify({
                        id: message.id,
                        timestamp: message.timestamp,
                        content: sanitizedContent,
                    })
                );
            })
            .on('end', () => {
                outputStream.write(']');
                outputStream.end();
                console.log(`Messages sauvegardés dans ${outputFilePath}`);
            })
            .on('error', (err) => console.error('Erreur dans extractMessages:', err));
    } catch (err) {
        console.error('Erreur dans extractMessages:', err.message);
    }
}

// Fonction 2 : Extraction des IDs Discord uniques des auteurs
async function extractAuthorsIds() {
    const randomNum = Math.floor(Math.random() * 999) + 1;
    const outputFilePath = path.join(outputDir, `artefact_Discord_ID_${randomNum}.txt`);

    try {
        await fs.promises.access(artefactJsonFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        const fileStream = fs.createReadStream(artefactJsonFilePath);
        const jsonStream = JSONStream.parse('messages.*');
        const extractedAuthorsIds = new Set();

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                if (message.author?.id) extractedAuthorsIds.add(message.author.id);
            })
            .on('end', async () => {
                const uniqueIds = [...extractedAuthorsIds].join('\n');
                await fs.promises.writeFile(outputFilePath, uniqueIds, 'utf8');
                console.log(`IDs des auteurs sauvegardés dans ${outputFilePath}`);

                await removeDuplicates(outputFilePath);
            })
            .on('error', (err) => console.error('Erreur dans extractAuthorsIds:', err));
    } catch (err) {
        console.error('Erreur dans extractAuthorsIds:', err.message);
    }
}

// Fonction 3 : Suppression des doublons dans un fichier
async function removeDuplicates(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const lines = data.split('\n').filter(Boolean);
        const uniqueLines = Array.from(new Set(lines));
        await fs.promises.writeFile(filePath, uniqueLines.join('\n'), 'utf8');
        console.log(`Doublons supprimés dans ${filePath}`);
    } catch (err) {
        console.error('Erreur dans removeDuplicates:', err.message);
    }
}

// Fonction principale orchestrant les étapes du script
async function main() {
    console.log('Début de l\'exécution...');
    await extractMessages();
    await extractAuthorsIds();
    console.log('Exécution terminée.');
}

// Démarre l'exécution du script
main();