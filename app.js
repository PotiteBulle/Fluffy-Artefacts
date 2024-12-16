// Importation des modules nécessaires
const path = require('path');
const { readJSON } = require('./src/reader');
const { processMessages } = require('./src/processor');
const { writeJSON } = require('./src/writer');
const { logInfo, logError } = require('./src/utils/logger');

// Chemins pour les fichiers
const inputFilePath = './Artefacts/artefact.json';
const outputDir = './Artefacts/output';

// Fonction principale
async function main() {
    try {
        logInfo('Lecture du fichier JSON...');
        const data = readJSON(inputFilePath);

        logInfo('Traitement des messages...');
        const processedData = processMessages(data.messages);

        logInfo('Écriture des messages anonymisés...');
        writeJSON(outputDir, processedData);

        logInfo('Processus terminé avec succès.');
    } catch (err) {
        logError(`Erreur : ${err.message}`);
    }
}

// Exécution
main();