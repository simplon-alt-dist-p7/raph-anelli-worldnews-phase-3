# World News – Writer

**Module de rédaction d'articles pour le prototype World News**

[Documentation Backend](./BACK/README.md) · [Documentation Frontend](./FRONT/README.md) · [Dépôt Reader](https://github.com/simplon-alt-dist-p7/wn-rajar-ms_reader)

---

## À propos

Ce dépôt correspond à la **partie Writer** du prototype *World News*, développé dans le cadre d'un exercice pédagogique visant à valider la pertinence d'une **architecture microservices** en remplacement d'une application monolithique.

### Périmètre fonctionnel

Le module **Writer** (destiné aux journalistes) couvre :

- Gestion des articles (création, modification, consultation, suppression)
- Association des articles à des catégories
- Génération de contenu assistée par IA (Google Gemini)

---

## Stack technique

| Composant | Technologies |
|:----------|:-------------|
| **Backend** | Node.js · Express · TypeScript · TypeORM |
| **Frontend** | React · TypeScript · Vite · React Router |
| **Base de données** | PostgreSQL |
| **IA** | Google Gemini |
| **Qualité de code** | ESLint · Prettier |

---

## Installation

### Pré-requis

- Node.js v18+
- npm v9+
- PostgreSQL 16

### Mise en route

```bash
git clone https://github.com/simplon-alt-dist-p7/wm-rajar-ms_writer.git
cd wm-rajar-ms_writer
```

> Pour les instructions détaillées d'installation et de configuration, se référer aux documentations [Backend](./BACK/README.md) et [Frontend](./FRONT/README.md).

---

## Architecture

### Backend

Architecture en couches :

```
Routes → Controllers → Services → Repositories → TypeORM → PostgreSQL
```

### Frontend

Architecture orientée composants :

```
Router → Pages → Components → Services → API Client → Backend
```

### Base de données

| Schéma | Description |
|:-------|:------------|
| `writer` | Tables principales (articles, catégories) |
| `reader` | Vues matérialisées pour le microservice Reader |

Les vues matérialisées sont automatiquement rafraîchies via des triggers lors des opérations CRUD.

> Les diagrammes MCD et MLD sont disponibles dans le dossier [`Docs/`](./Docs/).

---

## Organisation

### Équipes

| Équipe | Effectif | Périmètre |
|:-------|:--------:|:----------|
| **Writer** *(ce dépôt)* | 3 | Microfrontend React, Microservice Node.js/Express, gestion des articles et catégories |
| **Reader** | 3 | Microfrontend React, Microservice Node.js/Express, recherche et lecture des articles |

Chaque équipe est autonome sur son périmètre tout en respectant une cohérence d'ensemble.

### Gestion de projet

| Tableau | Description |
|:--------|:------------|
| Tickets fonctionnels | Alimentés par les formateurs / PO |
| Tâches techniques | Conception et développement, gérées par l'équipe |

**Workflow** : `Todo` → `In progress` → `Done`

---

## Bonnes pratiques

| Pratique | Description |
|:---------|:------------|
| Séparation des responsabilités | Frontend et backend distincts |
| Architecture en couches | Organisation claire du backend |
| API REST | Interface stable et documentée |
| TypeORM | Abstraction de la base de données |
| Variables d'environnement | Configuration externalisée |
| Soft delete | Traçabilité des suppressions |
| TypeScript strict | Sécurité du typage |

---

## Objectifs pédagogiques

Ce prototype vise à démontrer :

- La compréhension des limites d'une architecture monolithique
- La capacité à concevoir une solution modulaire orientée métier
- La mise en oeuvre d'une architecture microfrontends / microservices
- La collaboration entre équipes dans un contexte proche du réel
- L'intégration d'outils d'IA générative dans un workflow métier

---

*Prototype fonctionnel développé à des fins pédagogiques.*
