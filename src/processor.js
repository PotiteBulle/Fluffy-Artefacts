const { v4: uuidv4 } = require('uuid');

/**
 * Fonction pour anonymiser et valider les messages.
 * Cette version prend également en compte les liens dans le contenu du message.
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

        // Remplacer les liens dans le contenu par un identifiant unique
        const contentWithAnonymizedLinks = anonymizeLinks(msg.content);

        return {
            anonymizedID: uuidv4(),
            pseudo: msg.pseudo,
            timestamp: msg.timestamp,
            content: contentWithAnonymizedLinks,
        };
    }).filter(Boolean); // Filtre les messages invalides
}

/**
 * Remplace les liens dans le contenu par un identifiant unique.
 * @param {string} content - Le contenu du message.
 * @returns {string} Le contenu avec les liens anonymisés.
 */
function anonymizeLinks(content) {
    // Expression régulière pour détecter les liens (URLs)
    const urlRegex = /https?:\/\/[^\s]+/g;
    
    return content.replace(urlRegex, (url) => {
        // Remplacer chaque lien par un identifiant unique
        return `[Lien Anonymisé ${uuidv4()}]`;
    });
}

module.exports = { processMessages };
