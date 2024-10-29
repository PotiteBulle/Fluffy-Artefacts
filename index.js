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
        // Vérifier si le fichier d'entrée existe et créer le dossier de sortie si nécessaire
        await fs.promises.access(inputFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        const fileStream = fs.createReadStream(inputFilePath);
        const outputStream = fs.createWriteStream(outputFilePath);

        const jsonStream = JSONStream.parse('messages.*');
        outputStream.write('[');

        let isFirstMessage = true;

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                try {
                    outputStream.write(isFirstMessage ? '' : ',');
                    isFirstMessage = false;
                    outputStream.write(JSON.stringify({
                        id: message.id,
                        timestamp: message.timestamp,
                        content: message.content
                    }));
                } catch (writeError) {
                    console.error('Erreur lors de l\'écriture des données:', writeError);
                    fileStream.destroy(); // Arrête le flux en cas d'erreur d'écriture
                }
            })
            .on('end', () => {
                outputStream.write(']');
                outputStream.end();
                console.log(`Les données ont été sauvegardées avec succès dans ${outputFilePath}`);
            })
            .on('error', (streamError) => {
                console.error('Erreur lors de la lecture des données:', streamError);
            });

    } catch (err) {
        console.error(err.code === 'ENOENT' 
            ? `Le fichier d'entrée est introuvable: ${inputFilePath}` 
            : 'Erreur:', err);
    }
}

extractAndSaveData();