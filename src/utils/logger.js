function logInfo(message) {
    console.log(`[INFO] ${message}`);
}

function logError(message) {
    console.error(`[ERROR] ${message}`);
}

function logWarning(message) {
    console.warn(`[WARN] ${message}`);
}

module.exports = { logInfo, logError, logWarning };