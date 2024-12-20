const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Définition des chemins pour les dossiers et fichiers
const artefactsDir = 'Artefacts'; // Dossier contenant les artefacts
const outputDir = path.join(artefactsDir, 'output'); // Dossier de sortie pour les fichiers générés

// Fichier d'entrée principal
const artefactJsonFilePath = path.join(artefactsDir, 'artefact.json');

// Fonction 1 : Extraction des messages du fichier JSON
async function extractMessages() {
    const randomNum = Math.floor(Math.random() * 999) + 1; // Génération d'un identifiant aléatoire
    const outputFilePath = path.join(outputDir, `artefact_messages_${randomNum}.json`); // Fichier de sortie

    try {
        // Vérifie si le fichier JSON d'entrée existe et crée le dossier de sortie si nécessaire
        await fs.promises.access(artefactJsonFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Configuration des flux de lecture et d'écriture
        const fileStream = fs.createReadStream(artefactJsonFilePath);
        const outputStream = fs.createWriteStream(outputFilePath);
        const jsonStream = JSONStream.parse('messages.*'); // Extraction des objets sous "messages"

        outputStream.write('['); // Début du tableau JSON dans le fichier de sortie

        let isFirstMessage = true; // Gérer la virgule entre les objets JSON

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                // Écrit chaque message dans le fichier de sortie
                outputStream.write(isFirstMessage ? '' : ',');
                isFirstMessage = false;
                outputStream.write(
                    JSON.stringify({
                        id: message.id,
                        timestamp: message.timestamp,
                        content: message.content,
                    })
                );
            })
            .on('end', () => {
                // Termine le tableau JSON
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
    const randomNum = Math.floor(Math.random() * 999) + 1; // Génération d'un identifiant aléatoire
    const outputFilePath = path.join(outputDir, `artefact_Discord_ID_${randomNum}.txt`); // Fichier de sortie

    try {
        // Vérifie si le fichier JSON d'entrée existe et crée le dossier de sortie si nécessaire
        await fs.promises.access(artefactJsonFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        const fileStream = fs.createReadStream(artefactJsonFilePath);
        const jsonStream = JSONStream.parse('messages.*');
        const extractedAuthorsIds = new Set(); // Utilisation d'un Set pour garantir l'unicité des IDs

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                // Ajoute l'ID de l'auteur si présent
                if (message.author?.id) extractedAuthorsIds.add(message.author.id);
            })
            .on('end', async () => {
                const uniqueIds = [...extractedAuthorsIds].join('\n'); // Convertit en texte
                await fs.promises.writeFile(outputFilePath, uniqueIds, 'utf8');
                console.log(`IDs des auteurs sauvegardés dans ${outputFilePath}`);

                // Appelle la suppression des doublons
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
        // Lecture du fichier pour supprimer les doublons
        const data = await fs.promises.readFile(filePath, 'utf8');
        const lines = data.split('\n').filter(Boolean); // Supprime les lignes vides
        const uniqueLines = Array.from(new Set(lines)); // Supprime les doublons

        // Écriture des lignes uniques dans le même fichier
        await fs.promises.writeFile(filePath, uniqueLines.join('\n'), 'utf8');
        console.log(`Doublons supprimés dans ${filePath}`);
    } catch (err) {
        console.error('Erreur dans removeDuplicates:', err.message);
    }
}

// Fonction principale orchestrant les étapes du script
async function main() {
    console.log('Début de l\'exécution...');
    await extractMessages(); // Étape 1 : Extraction des messages
    await extractAuthorsIds(); // Étape 2 : Extraction des IDs et suppression des doublons
    console.log('Exécution terminée.');
}

// Démarre l'exécution du script
main();