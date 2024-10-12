const fs = require('fs').promises;
const path = require('path');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/artefact.json';
// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;
// Chemin du dossier et du fichier de sortie
const outputDir = 'Results';
const outputFilePath = path.join(outputDir, `Log_${randomNum}.json`);

async function extractAndSaveData() {
    try {
        // Vérifier si le fichier d'entrée existe
        await fs.access(inputFilePath);

        // Lire le fichier d'entrée
        const data = await fs.readFile(inputFilePath, 'utf8');

        // Parse JSON
        const jsonData = JSON.parse(data);

        // Extraire les champs requis de chaque message
        const extractedData = jsonData.messages.map(message => ({
            id: message.id, // ID du message
            timestamp: message.timestamp, // Horodatage du message
            content: message.content // Contenu du message
        }));

        // Créer le dossier de sortie s'il n'existe pas
        await fs.mkdir(outputDir, { recursive: true });

        // Écrire les données extraites dans le fichier de sortie
        await fs.writeFile(outputFilePath, JSON.stringify(extractedData, null, 2), 'utf8');
        
        // Confirmer que les données ont été sauvegardées avec succès
        console.log(`Les données ont été sauvegardées avec succès dans ${outputFilePath}`);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Le fichier d\'entrée est introuvable:', inputFilePath);
        } else if (err.name === 'SyntaxError') {
            console.error('Erreur de parsing du fichier JSON:', err.message);
        } else {
            console.error('Erreur:', err);
        }
    }
}

extractAndSaveData();