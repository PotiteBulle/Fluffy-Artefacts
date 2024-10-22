const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/artefact_********.json'; // CHANGE THIS
// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;
// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_Discord_ID_${randomNum}.json`); // CHANGE THIS

async function extractAndSaveAuthorsIds() {
    try {
        // Vérifier si le fichier d'entrée existe et créer le dossier de sortie
        await fs.promises.access(inputFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Flux de lecture pour le fichier d'entrée
        const fileStream = fs.createReadStream(inputFilePath);
        const jsonStream = JSONStream.parse('messages.*');
        const extractedAuthorsIds = new Set(); // Set pour éviter les doublons

        // Utiliser des promesses pour les opérations d'écriture
        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                // Ajouter l'ID de l'auteur uniquement si présent
                message.author?.id && extractedAuthorsIds.add(message.author.id);
            })
            .on('end', async () => {
                // Écrire les IDs des auteurs uniques dans le fichier
                const uniqueIds = [...extractedAuthorsIds].join('\n');
                await fs.promises.writeFile(outputFilePath, uniqueIds, 'utf8');
                console.log(`Les ID des auteurs ont été sauvegardés avec succès dans ${outputFilePath}`);
            })
            .on('error', (err) => {
                console.error('Erreur lors de la lecture du flux:', err);
            });
    } catch (err) {
        // Gestion des erreurs
        console.error(err.code === 'ENOENT' 
            ? `Le fichier d'entrée est introuvable: ${inputFilePath}` 
            : 'Erreur:', err);
    }
}

extractAndSaveAuthorsIds();