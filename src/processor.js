const { v4: uuidv4 } = require('uuid');

/**
 * Anonymise et valide les messages.
 * @param {Array} messages - Liste des messages.
 * @returns {Array} Messages anonymisés.
 */
function processMessages(messages) {
    if (!Array.isArray(messages)) {
        throw new Error('Le fichier JSON ne contient pas une liste valide de messages.');
    }

    return messages.map((msg, index) => {
        if (!msg.id || !msg.pseudo || !msg.timestamp || !msg.content) {
            console.warn(`Message incomplet à l'index ${index}`);
            return null;
        }

        return {
            anonymizedID: uuidv4(),
            pseudo: msg.pseudo,
            timestamp: msg.timestamp,
            content: msg.content,
        };
    }).filter(Boolean); // Filtre les messages invalides
}

module.exports = { processMessages };