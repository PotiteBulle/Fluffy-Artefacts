const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/********.json'; // CHANGE THIS
// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;
// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_messages_${randomNum}.json`); // CHANGE THIS

async function extractAndSaveData() {
    try {
        // Vérifier si le fichier d'entrée existe
        await fs.promises.access(inputFilePath);

        // Créer le dossier de sortie s'il n'existe pas
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Créer un flux de lecture pour le fichier d'entrée
        const fileStream = fs.createReadStream(inputFilePath);
        
        // Créer un flux d'écriture pour le fichier de sortie
        const outputStream = fs.createWriteStream(outputFilePath);

        // Créer un transformateur pour le flux JSON
        const jsonStream = JSONStream.parse('messages.*');

        // Écrire le début du tableau dans le fichier de sortie
        outputStream.write('[');

        // Compteur pour gérer la virgule entre les objets
        let first = true;

        // Traiter chaque message du flux
        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                if (!first) {
                    outputStream.write(',');
                }
                first = false;
                // Écrire chaque message dans le fichier de sortie
                outputStream.write(JSON.stringify({
                    id: message.id, // ID du message
                    timestamp: message.timestamp, // Horodatage du message
                    content: message.content // Contenu du message
                }));
            })
            .on('end', () => {
                // Écrire la fin du tableau dans le fichier de sortie
                outputStream.write(']');
                outputStream.end();
                console.log(`Les données ont été sauvegardées avec succès dans ${outputFilePath}`);
            })
            .on('error', (err) => {
                console.error('Erreur:', err);
            });
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Le fichier d\'entrée est introuvable:', inputFilePath);
        } else {
            console.error('Erreur:', err);
        }
    }
}

extractAndSaveData();
