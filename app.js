const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

const inputFilePath = 'Artefacts/artefact.json'; // Fichier d'entrée
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_Discord_${Math.floor(Math.random() * 999) + 1}.json`);

// Regex pour détecter les liens
const linkRegex = /(https?:\/\/[^\s]+)/g;

async function extractAndSaveAuthorsData() {
    try {
        // Création du dossier de sortie s'il n'existe pas
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Vérification de l'existence du fichier d'entrée
        await fs.promises.access(inputFilePath);

        const fileStream = fs.createReadStream(inputFilePath);
        const jsonStream = JSONStream.parse('messages.*');
        const outputStream = fs.createWriteStream(outputFilePath);

        outputStream.write('['); // Début du fichier JSON
        let first = true;

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                const authorId = message.author?.id || 'Unknown_ID';
                const username = message.author?.nickname || message.author?.name || 'Unknown_Username';
                let content = message.content || 'No message';

                // Remplacement des liens par un message générique
                if (linkRegex.test(content)) {
                    content = '[Lien Photo ou Vidéo à usage d\'hypersexualisation (DeepFake, etc...)]';
                }

                const timestamp = message.timestamp || 'Unknown_Timestamp';

                // Écriture progressive dans le fichier JSON
                outputStream.write(first ? '' : ',');
                first = false;
                outputStream.write(JSON.stringify({ id: authorId, username, message: content, timestamp }));
            })
            .on('end', () => {
                outputStream.write(']'); // Fin du fichier JSON
                outputStream.end();
                console.log(`[${new Date().toISOString()}] Données des auteurs sauvegardées dans ${outputFilePath}`);
            })
            .on('error', (err) => {
                console.error(`[${new Date().toISOString()}] Erreur dans le flux de lecture JSON:`, err);
                outputStream.end();
            });

    } catch (err) {
        console.error(`[${new Date().toISOString()}] ${err.code === 'ENOENT' 
            ? `Le fichier d'entrée est introuvable: ${inputFilePath}` 
            : 'Erreur: ' + err.message}`);
    }
}

extractAndSaveAuthorsData();