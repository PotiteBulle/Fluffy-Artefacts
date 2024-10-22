const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/artefact_********.json'; // CHANGE THIS
// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;
// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_messages_${randomNum}.json`); // CHANGE THIS

async function extractAndSaveData() {
    try {
        // Vérifier si le fichier d'entrée existe et créer le dossier de sortie
        await fs.promises.access(inputFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Utiliser des promesses pour créer les flux de lecture/écriture
        const fileStream = fs.createReadStream(inputFilePath);
        const outputStream = fs.createWriteStream(outputFilePath);

        // Transformer les messages JSON
        const jsonStream = JSONStream.parse('messages.*');
        outputStream.write('[');

        let first = true;

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                // Simplification de la logique pour écrire une virgule
                outputStream.write(first ? '' : ',');
                first = false;
                outputStream.write(JSON.stringify({
                    id: message.id,
                    timestamp: message.timestamp,
                    content: message.content
                }));
            })
            .on('end', () => {
                outputStream.write(']');
                outputStream.end();
                console.log(`Les données ont été sauvegardées avec succès dans ${outputFilePath}`);
            })
            .on('error', (err) => {
                console.error('Erreur lors de la lecture des données:', err);
            });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Le fichier d'entrée est introuvable: ${inputFilePath}`);
        } else {
            console.error('Erreur:', err);
        }
    }
}

extractAndSaveData();