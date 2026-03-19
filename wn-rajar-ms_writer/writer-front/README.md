# 📋 À propos du projet

Ce projet est le frontend microfrontend pour la gestion des articles par les journalistes de World News. Il fait partie d'un prototype visant à valider l'architecture microservices et microfrontends avant une refonte complète du système d'information.

## Contexte

World News souhaite moderniser son infrastructure en adoptant une architecture modulaire basée sur des microfrontends et des microservices. Ce prototype démontre les bénéfices de cette approche sur un périmètre fonctionnel restreint.

## ✨ Fonctionnalités

  👀 Voir la liste et le détail des articles rédigés
  ✍️ Créer de nouveaux articles
  ✏️ Modifier les articles existants
  🗑️ Activer/désactiver individuellement chaque article
  🏷️ Associer les articles à des catégories
  🤖 Assistant IA pour aide à la rédaction

## 🛠️ Technologies utilisées

Framework : React
Langage : JavaScript/ TypeScript

## 📦 Prérequis
Avant de commencer, assurez-vous d'avoir installé :

Node.js (version 18 ou sup)
npm
Git

## 🚀 Installation

  Cloner le repository
  Installer les dépendances
    npm install
  Configurer les variables d'environnement

  Créez un fichier .env à la racine du projet
  Lancer le serveur de développement
    npm run dev

  Note : Ce README sera mis à jour au fur et à mesure de l'avancement du projet.

## 🔍 Détail sur chaque fonctionnalité

### 👀 Liste des articles rédigés

- Articles listés par date de modification et de création, de la plus récente à la plus ancienne.
- Pagination des articles (5 ou 10 par page, modifiable via un sélecteur en bas de la page)
- Indication du nombre total d'articles en haut de la liste
- Recherche d'article par titre

### ✍️ Création et modification d'un article

Formulaire de rédaction d'un article, nécessitant l'écriture d'un titre, d'un sous-titre, d'un chapeau, d'un corps de texte et l'association à une catégorie.

### 🤖 Assistant IA pour aide à la rédaction

Pour aider à la rédaction, un assistant IA est en place, permettant de
- Générer un titre à partir du corps de texte écrit
- Générer un sous-titre à partir du titre et du corps de texte écrit
- Générer un chapeau à partir du corps de texte écrit
- Reformuler le corps de texte et corriger les fautes d'orthographes

Chacune de ces actions est individuelle et est possible via un bouton  sur les champs correspondants.

### 🗑️ Activer/désactiver individuellement chaque article

On ne supprime pas les articles, au cas où le rédacteur souhaite garder une trace de chaque article, y compris ceux "supprimés". A la place, il est possible d'activer ou de désactiver l'article. La principale conséquence est que les articles désactivés ne seront pas visibles du côté des lecteurs (voir le projet correspondant).

## Tests

### Tests unitaires de composant
Pour les tests du front-end, la dépendance Vitest est installé, avec les librairies suivantes :
- @testing-library/react : simule l'affichage du composant
- @testing-library/jest-dom : pour les assertions DOM (par exemple : expect(button).toBeInTheDocument())
- @testing-library/user-event : afin de tester les interactions de l'utilisateur
- jsdom → pour simuler un navigateur lors des tests

Commande pour effectuer les tests : 
```bash
npm run test
```
Script configuré dans le fichier package.json

### Tests End-to-End

Pour effectuer les tests End-to-End (E2E), j'ai installé le framework de test Playwright.

```bash
npm install -D @playwright/test

npx playwright install
```

Pour lancer les tests :

```bash
npm run test:e2e
```
Script configuré dans le fichier package.json