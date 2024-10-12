const fs = require('fs');

// Chemin du fichier d'entrée
const inputFilePath = 'Artefacts/artefact.json';
// Générer un nombre aléatoire entre 1 et 999
const randomNum = Math.floor(Math.random() * 999) + 1;
// Chemin du fichier de sortie avec un nombre aléatoire dans le nom
const outputFilePath = `Results/Log_${randomNum}.json`;

// Lire le fichier d'entrée
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    // Gérer les erreurs de lecture du fichier
    if (err) {
        console.error('Erreur de lecture du fichier JSON:', err);
        return; 
    }

    try {
        // Parse JSON
        const jsonData = JSON.parse(data);
        // Extraire les champs requis de chaque message
        const extractedData = jsonData.messages.map(message => ({
            id: message.id, // ID du message
            timestamp: message.timestamp, // Horodatage du message
            content: message.content // Contenu du message
        }));

        // Écrire les données extraites dans le fichier de sortie
        fs.writeFile(outputFilePath, JSON.stringify(extractedData, null, 2), 'utf8', (err) => {
            // Gérer les erreurs de sauvegarde du fichier
            if (err) {
                console.error('Erreur de sauvegarde du fichier JSON:', err);
                return;
            }
            // Confirmer que les données ont été sauvegardées avec succès
            console.log('Les données ont été sauvegardées avec succès dans', outputFilePath);
        });
    } catch (parseError) {
        // Gérer les erreurs de parsing du fichier JSON
        console.error('Erreur de parsing du fichier JSON:', parseError);
    }
});