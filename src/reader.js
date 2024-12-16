const fs = require('fs');
const path = require('path');

/**
 * Lire un fichier JSON.
 * @param {string} filePath - Chemin du fichier JSON.
 * @returns {Object} Contenu JSON.
 */
function readJSON(filePath) {
    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
        throw new Error(`Fichier introuvable : ${absolutePath}`);
    }

    try {
        const data = fs.readFileSync(absolutePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        throw new Error(`Erreur lors de la lecture du fichier JSON : ${err.message}`);
    }
}

module.exports = { readJSON };