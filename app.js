const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/artefact.json'; // CHANGE THIS

// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;

// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `data_artefact_Discord_${randomNum}.json`); // CHANGE THIS

// Regex pour détecter les liens
const linkRegex = /(https?:\/\/[^\s]+)/g;

async function extractAndSaveAuthorsData() {
    try {
        // Vérifier l'existence du fichier d'entrée et créer le dossier de sortie si nécessaire
        await fs.promises.access(inputFilePath);
        await fs.promises.mkdir(outputDir, { recursive: true });

        const fileStream = fs.createReadStream(inputFilePath);
        const jsonStream = JSONStream.parse('messages.*');
        const extractedData = [];

        fileStream
            .pipe(jsonStream)
            .on('data', (message) => {
                const authorId = message.author?.id || 'Unknown_ID';

                // Prioriser `nickname` puis `name`
                let username = message.author?.nickname || message.author?.name || 'Unknown_Username';

                let content = message.content || 'No message';

                // Remplacement des liens par un message générique
                if (linkRegex.test(content)) {
                    content = '[Lien Photo ou Vidéo à usage d\'hypersexualisation]';
                }

                // Récupération du timestamp
                let timestamp = message.timestamp || 'Unknown_Timestamp';

                // Ajout des données extraites au tableau
                extractedData.push({
                    id: authorId,
                    username: username,
                    message: content,
                    timestamp: timestamp
                });
            })
            .on('end', async () => {
                try {
                    // Écriture des données extraites dans le fichier JSON
                    await fs.promises.writeFile(outputFilePath, JSON.stringify(extractedData, null, 2), 'utf8');
                    console.log(`Les données des auteurs ont été sauvegardées avec succès dans ${outputFilePath}`);
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

extractAndSaveAuthorsData();