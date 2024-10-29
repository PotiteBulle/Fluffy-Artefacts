const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/artefact_***********.json'; // CHANGE THIS

// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;

// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_Discord_ID_${randomNum}.json`); // CHANGE THIS

async function extractAndSaveAuthorsIds() {
    try {
        // Vérifier l'existence du fichier d'entrée et créer le dossier de sortie si nécessaire
        await fs.promises.access(inputFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        const fileStream = fs.createReadStream(inputFilePath);
        const jsonStream = JSONStream.parse('messages.*');
        const extractedAuthorsIds = new Set();

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                // Ajouter l'ID de l'auteur uniquement s'il est présent
                if (message.author?.id) extractedAuthorsIds.add(message.author.id);
            })
            .on('end', async () => {
                try {
                    const uniqueIds = [...extractedAuthorsIds].join('\n');
                    await fs.promises.writeFile(outputFilePath, uniqueIds, 'utf8');
                    console.log(`Les ID des auteurs ont été sauvegardés avec succès dans ${outputFilePath}`);
                } catch (writeError) {
                    console.error('Erreur lors de l\'écriture du fichier de sortie:', writeError);
                }
            })
            .on('error', (streamError) => {
                console.error('Erreur lors de la lecture du flux:', streamError);
            });

    } catch (err) {
        console.error(err.code === 'ENOENT' 
            ? `Le fichier d'entrée est introuvable: ${inputFilePath}` 
            : 'Erreur:', err);
    }
}

extractAndSaveAuthorsIds();