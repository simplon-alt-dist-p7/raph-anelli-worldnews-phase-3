// vi : permet de remplacer des fonctions et/ou des modules par des versions simulées pour les tests
// describe : conteneur, sert à organiser/regrouper les tests, à structurer et à rendre la lecture claire
// it : test individuel, avec à l'intérieur ce qu'on veut vérifier
// expect : premet la vérification du résultat d'un test
const { vi, describe, it, expect } = require('vitest')

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

describe('ArticlesService - getById', () =>{    // Conteneur groupant les tests de getById
    it("Appel de getById et retourne un article", async () =>{  // test individuel
        const result = await articlesService.getById(1)
        expect(result).toEqual({ id: 1, title: "Titre de l'article"})   // Comparaison entre le résultat obtenu et le résultat demandé

        // On vérifie l'appel du mock pour être sûr que la fonction na pas été modifiée
        const prisma = require('./../lib/prisma')   // récupération du module mocké
        expect(prisma.article.findFirst).toHaveBeenCalledWith({
            where: { id: 1, delete_date: null}
        })
    })
})