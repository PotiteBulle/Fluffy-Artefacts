# Fluffy-Artefacts
 Outil qui lit un fichier JSON contenant des messages, extrait certaines informations et les enregistre dans un nouveau fichier JSON Anonymisé. Le nom du fichier de sortie inclut un nombre aléatoire pour éviter les collisions.

## Fonctionnalités

- **Extraction des messages** : Lecture d'un fichier JSON d'entrée et extraction des messages avec leurs identifiants, horodatages et contenus.
- **Extraction des IDs des auteurs** : Identification et enregistrement des identifiants uniques des auteurs des messages.
- **Suppression des doublons** : Élimination des entrées en double dans les fichiers de sortie pour garantir l'unicité des données.
- **Génération de fichiers de sortie uniques** : Les fichiers générés portent des noms incluant un nombre aléatoire pour éviter les collisions et assurer une gestion efficace des versions.

## Structure du projet

- `app.js` : Script principal orchestrant l'extraction des messages, l'identification des auteurs, et la suppression des doublons.
- `Artefacts/` : Répertoire contenant le fichier d'entrée `artefact.json` et les fichiers de sortie générés.
- `package.json` : Fichier listant les dépendances du projet, notamment `JSONStream`.
- `README.md` : Documentation du projet.

## Installation

### Prérequis

**Node.js** : Assurez-vous que Node.js est installé sur votre machine. Vous pouvez le télécharger depuis [le site officiel](https://nodejs.org/).
- **Dépendances** : Installez les dépendances nécessaires en exécutant la commande suivante dans le répertoire du projet :
  ```bash
  npm install
  ```



## Exemple & Résultat
### Artefact (Exemple : Capture Data d'un Discord problématique via un autre script non public):
![alt text](images/artefact.png)
### Résultat (Exemple : Ce sont les ID des messages):
![alt text](images/result.png)

### Étapes d'installation

- Clonez ce dépôt dans votre répertoire local
- Installez les dépendances nécessaires
- Lancez le projet avec la commande suivante

## Utilisation

Une fois le projet démarré, vous pouvez interagir avec l'outil via la ligne de commande ou utiliser les points de terminaison API fournis pour l'intégration dans d'autres systèmes.


# Clause de non-responsabilité : Avertissement
Les outils et scripts présentés ici sont fournis à des fins éducatives et informatives. Leur utilisation se fait à vos propres risques. L’auteur·ice ne peut être tenu·e responsable de tout dommage, perte de données ou violation de sécurité résultant de leur utilisation. Veillez à tester ces outils dans un environnement sécurisé et à respecter les lois et réglementations en vigueur dans votre juridiction. L’utilisation non autorisée de ces outils peut contrevenir à la législation locale ou internationale.


## License
Ce projet est sous licence MIT. Consultez le fichier [LICENSE](https://github.com/PotiteBulle/Fluffy-Artefacts/blob/main/LICENSE) pour plus de détails.
