# wm-rajar-ms_writer - Backend - WORLD NEWS

## Description

API backend pour le projet wm-rajar-ms_writer, construite avec Express et TypeScript. Sert à la gestion des articles, des catégories et l'implémentation d'un assistant IA.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm (inclus avec Node.js)

## Installation et initialisation

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de l'environnement

Créez un fichier `.env` à la racine du dossier BACK :

```bash
cp .env.example .env
```

Puis configurez les variables d'environnement nécessaires dans le fichier `.env`.

### 3. Compilation TypeScript

Pour compiler le code TypeScript :

```bash
npm run build
```

### 4. Démarrage du serveur

#### Mode développement (avec rechargement automatique)

```bash
npm run dev
```

#### Mode production

```bash
npm start
```

## Scripts disponibles

- `npm start` : Démarre le serveur en mode production
- `npm run dev` : Démarre le serveur en mode développement avec rechargement automatique
- `npm run build` : Compile le code TypeScript
- `npm test` : Lance les tests

## Structure du projet

```
BACK/
├── src/           # Code source TypeScript
├── dist/          # Code compilé (généré)
├── .env           # Variables d'environnement (à créer)
├── package.json   # Dépendances et scripts
└── tsconfig.json  # Configuration TypeScript
```

## Routes API
#### Articles :
- `GET /articles/` : récupération de tous les articles
- `GET /articles/:id` : récupération d'un article spécifique
- `GET /articles/search` : recherche d'un article
- `POST /articles/` : création d'un article
- `PATCH /articles/:id` : mise à jour d'un article
- `PATCH /articles/:id/delete` : suppression (softdelete) d'un article
- `PATCH /articles/:id` : restoration d'un article

#### Catégories :
- `GET /categories/` : récupération de toutes les catégories
- `GET /categories/:id` : récupération d'une catégorie spécifique

#### IA :
- `POST /gemini/generate-titre` : généreration d'un titre à partir du corps de l'article
- `POST /gemini/generate-sous-titre` : généreration d'un sous-titre à partir du corps et du titre de l'article
- `POST /gemini/generate-chapeau` : généreration d'un chapeau à partir du corps de l'article
- `POST /gemini/generate-body` : correction et reformulation du corps de l'article


## Technologies utilisées

- **Express** : Framework web Node.js
- **TypeScript** : Superset typé de JavaScript
- **dotenv** : Gestion des variables d'environnement
- **ts-node-dev** : Rechargement automatique en développement
