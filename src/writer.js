const fs = require('fs');
const path = require('path');

/**
 * Écrit les données JSON dans un fichier.
 * @param {string} outputDir - Dossier de sortie.
 * @param {Array} data - Données à écrire.
 * @returns {string} Chemin du fichier généré.
 */
function writeJSON(outputDir, data) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `anonymized-${Date.now()}.json`;
    const filePath = path.join(outputDir, fileName);

    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Fichier généré : ${filePath}`);
        return filePath;
    } catch (err) {
        throw new Error(`Erreur d'écriture : ${err.message}`);
    }
}

module.exports = { writeJSON };