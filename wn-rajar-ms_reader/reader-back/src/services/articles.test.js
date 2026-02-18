// vi : permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
const { vi } = require('vitest')

// Création d'un mock de Prisma
vi.mock('./../lib/prisma', () => { // Remplace tout le module Prisma importé par la classe par cette version mocké
    return {
        article: {
            findFirst: vi.fn(async () => {      //vi.fn crée une fonction mockée, async est utilisé pour renvoyer une promesse
                return { id: 1, title: "Titre de l'article" }     //on renvoie l'objet mocké
            })
        }
    }
})

// Import de la classe après le mock pour qu'il soit pris en compte par la classe
const ArticlesService = require('./articles');
const articlesService = new ArticlesService();