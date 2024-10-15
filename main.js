const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/***********.json'; // CHANGE THIS
// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;
// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_Discord_ID_${randomNum}.json`); // CHANGE THIS

async function extractAndSaveAuthorsIds() {
    try {
        // Vérifier si le fichier d'entrée existe
        await fs.promises.access(inputFilePath);

        // Créer le dossier de sortie s'il n'existe pas
        await fs.promises.mkdir(outputDir, { recursive: true });

        // Créer un flux de lecture pour le fichier d'entrée
        const fileStream = fs.createReadStream(inputFilePath);

        // Créer un transformateur pour le flux JSON
        const jsonStream = JSONStream.parse('messages.*');

        const extractedAuthorsIds = new Set(); // Utiliser un Set pour éviter les doublons

        // Traiter chaque message du flux
        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                // Vérifier si l'auteur est présent dans le message
                const author = message.author;
                if (author && author.id) {
                    extractedAuthorsIds.add(author.id); // Ajouter uniquement l'ID de l'auteur
                }
            })
            .on('end', async () => {
                // Écrire les ID des auteurs extraits dans le fichier de sortie
                const uniqueIds = Array.from(extractedAuthorsIds).join('\n'); // Convertir le Set en tableau et joindre par nouvelle ligne
                await fs.promises.writeFile(outputFilePath, uniqueIds, 'utf8');
                console.log(`Les ID des auteurs ont été sauvegardés avec succès dans ${outputFilePath}`);
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

extractAndSaveAuthorsIds();