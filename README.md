# Fluffy-Artefacts
 Outil qui lit un fichier JSON contenant des messages, extrait certaines informations et les enregistre dans un nouveau fichier JSON Anonymisé. Le nom du fichier de sortie inclut un nombre aléatoire pour éviter les collisions.

## Fonctionnalités

- Anonymisation des messages JSON.
- Traitement des données utilisateurices.
- Exportation des messages anonymisés sous différents formats.
- Génération d’identifiants uniques (UUID) pour chaque message.
- Respect des meilleures pratiques en matière de sécurité et de qualité du code.

## Structure du Projet
```
Fluffy-Artefacts/
├── Artefacts/
│   ├── artefact.json        // Fichier JSON source.
│   └── output/              // Dossier des fichiers anonymisés générés.
├── src/
│   ├── reader.js            // Gestion de la lecture des fichiers.
│   ├── processor.js         // Traitement et anonymisation des données.
│   ├── writer.js            // Écriture des données dans des fichiers JSON.
│   └── utils/logger.js      // Module pour la gestion des logs.
├── app.js                   // Script principal qui orchestre tout.
├── package.json             // Dépendances du projet.
└── README.md                // Documentation du projet.

```

## Installation

### Prérequis

Avant d'installer et d'exécuter ce projet, assurez-vous que Node.js et npm sont installés. Vous pouvez les télécharger et les installer depuis [Node.js](https://nodejs.org/).


## Exemple & Résultat
### Artefact (Exemple : Capture Data d'un Discord problématique via un autre script non public):
![alt text](images/artefact.png)
### Résultat (Exemple : Ce sont les ID des messages):
![alt text](images/result.png)

### Étapes d'installation

1. Clonez ce dépôt dans votre répertoire local :

   ```
   git clone https://github.com/PotiteBulle/Fluffy-Artefacts.git
   cd Fluffy-Artefacts
   ```

2. Installez les dépendances nécessaires :

   ```
   npm install
   ```

3. Lancez le projet avec la commande suivante :

   ```
   npm start
   ```

## Utilisation

Une fois le projet démarré, vous pouvez interagir avec l'outil via la ligne de commande ou utiliser les points de terminaison API fournis pour l'intégration dans d'autres systèmes.


# Clause de non-responsabilité :
Les outils et scripts présentés ici sont fournis à des fins éducatives et informatives. Leur utilisation se fait à vos propres risques. L’auteur·ice ne peut être tenu·e responsable de tout dommage, perte de données ou violation de sécurité résultant de leur utilisation. Veillez à tester ces outils dans un environnement sécurisé et à respecter les lois et réglementations en vigueur dans votre juridiction. L’utilisation non autorisée de ces outils peut contrevenir à la législation locale ou internationale.


## License
Ce projet est sous licence MIT. Consultez le fichier [LICENSE](https://github.com/PotiteBulle/Fluffy-Artefacts/blob/main/LICENSE) pour plus de détails.
