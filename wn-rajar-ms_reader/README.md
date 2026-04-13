# 🌍 World News Reader

Une application web moderne pour consulter les dernières actualités du monde entier.

Liens de l'application :
- Frontend : https://world-news-reader-front.vercel.app/
- Backend : https://worldnews-reader-back-p1n3.onrender.com/articles
- DB : https://supabase.com

## ✨ Fonctionnalités

- 📰 Affichage des 10 derniers articles
- 📄 Consultation détaillée de chaque article
- 🔗 Navigation fluide entre les pages

## 🛠️ Stack technique

Ce projet utilise une architecture moderne avec séparation frontend/backend :

| Frontend | Backend | Base de données |
|----------|---------|-----------------|
| React 19 | Express 5 | PostgreSQL 16 |
| React Router 7 | Prisma 7 | |
| Vite 7 | | |

## 🚀 Installation

### Prérequis

- Node.js >= 20.19
- PostgreSQL 16

### 1. Base de données

Créez la base de données et insérez les données de test :

```bash
psql -U postgres -f Db/init-db.sql
psql -U postgres -d worldnews -f Db/worldnews.sql
psql -U postgres -d worldnews -f Db/seed.sql
```

### 2. Backend

Lancez le serveur API :

```bash
cd Backend
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

### 3. Frontend

Lancez l'application React :

```bash
cd Frontend
npm install
npm run dev
```

## ⚙️ Variables d'environnement

### Backend (.env)

```
PORT=3000
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/worldnews"
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
```

## 📡 API Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/articles` | 10 derniers articles |
| `GET` | `/articles/:id` | Article par ID |

---

## 👥 Équipe

Projet réalisé par **Raphael, Aline, Jules, Alexis & Raphaël**
