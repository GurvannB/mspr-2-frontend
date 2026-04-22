# MSPR 2 (2025-2026) - Frontend

Cette application est réalisée dans le cadre de la 2e MSPR du parcours EISI de l'EPSI à Lille.\
Elle a pour but de mettre en place un système de mot de passe à usage unique avec rotation régulière.

## Conventions de code

Le projet suit les conventions de code suivantes :
- 2 espaces pour l'indentation.
- Utilisation de guillemets simples pour les chaînes de caractères.
- Utilisation de points-virgules à la fin des instructions.
- Nommage clair et descriptif des variables, fonctions et composants en anglais.
- Utilisation de la notation camelCase pour les noms de variables et de fonctions.
- Utilisation de la notation PascalCase pour les noms de composants React.
- Utilisation de commentaires pour expliquer les parties complexes du code.
- Utilisation de TypeScript, sans usage de `any`, pour assurer une typage strict et éviter les erreurs de type.

## Linting

EsLint est utilisé pour maintenir la qualité du code.\
Il est configuré pour suivre les meilleures pratiques de développement et éviter les erreurs courantes.\
Vous pouvez exécuter `npm run lint` pour vérifier le code et `npm run lint:fix` pour corriger automatiquement les problèmes détectés.

Une étape de lint doit être ajouté dans la chaine d'intégration continue.

## Git

Le projet utilise Git pour le contrôle de version.\
Il est recommandé de suivre les bonnes pratiques de Git, telles que :

### Nommage des commits
- Préfixer les noms de commit avec des Gitmojis adaptés pour indiquer le type de changement (par exemple, :sparkles: pour une nouvelle fonctionnalité, :bug: pour une correction de bug, etc.). [voir gitmoji](https://gitmoji.dev/)
- Utiliser un terme d'action en suite du gitmoji (par exemple: ✨ added user authentication).

### Recommandations globales

- Faire des commits fréquents et significatifs.
- Utiliser des messages de commit clairs et descriptifs (en anglais).
- Créer des branches pour les nouvelles fonctionnalités ou les corrections de bugs, et les fusionner une fois terminées.
- Utiliser des pull requests pour les revues de code et les discussions avant la fusion.
- Éviter de committer des fichiers générés ou des dépendances (utiliser un fichier `.gitignore` approprié).

## Scripts

Au sein du projet, vous pouvez exécuter les commandes suivantes :

### `npm start`

Démarre l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour la visualiser dans le navigateur.

La page se rechargera automatiquement si le code est modifié.\
Vous verrez également les éventuelles erreurs de lint dans la console.

### `npm test`

Démarre les tests en mode interactif.\
Consultez la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour
plus d'informations.

### `npm run build`

Compile l'application pour la production dans le dossier `build`.\
Il regroupe correctement React en mode production et optimise la construction pour les meilleures performances.

L'application est alors prête à être déployée
Pour plus d'informations sur le déploiement, consultez la section
sur [le déploiement](https://facebook.github.io/create-react-app/docs/deployment).
