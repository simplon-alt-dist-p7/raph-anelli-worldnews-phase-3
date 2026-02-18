import { AppDataSource } from "../config/database.js";
import { Article } from "../models/article.model.js";

async function seedArticles() {
  await AppDataSource.initialize();

  const articleRepo = AppDataSource.getRepository(Article);

  const articles = [
    {
      title: "Les avancées de l'IA en 2025",
      subtitle: "L'intelligence artificielle transforme le monde du travail",
      subhead: "Entre opportunités et défis, l'IA redéfinit nos métiers et notre quotidien",
      body: "L'intelligence artificielle a connu des avancées spectaculaires en 2025. De nombreuses entreprises ont adopté des solutions d'IA générative pour améliorer leur productivité. Les modèles de langage sont désormais capables de comprendre et de générer du contenu dans plus de 100 langues. Cependant, ces progrès soulèvent également des questions éthiques importantes concernant la vie privée et l'emploi.",
      category: { id: 4 } // Sciences et technologies
    },
    {
      title: "Le retour de l'exploration spatiale",
      subtitle: "La Lune et Mars deviennent des objectifs concrets",
      subhead: "Plusieurs pays lancent des missions ambitieuses vers notre satellite et la planète rouge",
      body: "Après plusieurs décennies de ralentissement, l'exploration spatiale connaît un renouveau spectaculaire. Les agences spatiales du monde entier préparent activement le retour de l'humanité sur la Lune, avec l'objectif d'établir une base permanente d'ici 2030. En parallèle, les missions vers Mars se multiplient, avec des projets de colonisation qui semblent désormais à portée de main. Les entreprises privées jouent un rôle croissant dans cette nouvelle ère spatiale.",
      category: { id: 4 } // Sciences et technologies
    },
    {
      title: "La révolution des énergies renouvelables",
      subtitle: "Le solaire et l'éolien dominent la production électrique mondiale",
      subhead: "Les énergies vertes dépassent enfin les combustibles fossiles dans plusieurs pays",
      body: "Pour la première fois dans l'histoire, les énergies renouvelables représentent plus de 50% de la production électrique mondiale. Les panneaux solaires sont devenus si efficaces et abordables qu'ils équipent désormais la majorité des nouvelles constructions. L'éolien offshore se développe rapidement, avec des parcs géants en mer du Nord et dans l'océan Atlantique. Cette transition énergétique s'accompagne d'innovations majeures dans le stockage de l'énergie, notamment grâce aux batteries à haute capacité.",
      category: { id: 3 } // Économie
    },
    {
      title: "Avancées médicales majeures en 2025",
      subtitle: "De nouvelles thérapies révolutionnent le traitement des maladies rares",
      subhead: "Les chercheurs développent des solutions personnalisées pour chaque patient",
      body: "En 2025, la médecine personnalisée a fait un bond en avant avec des traitements adaptés au profil génétique des patients. Plusieurs maladies auparavant incurables voient désormais leur prise en charge révolutionnée.",
      category: { id: 7 } // Santé
    },
    {
      title: "Exploration des fonds marins",
      subtitle: "Découverte de nouvelles espèces et écosystèmes profonds",
      subhead: "Les océans révèlent encore leurs mystères grâce aux technologies avancées",
      body: "Les expéditions en 2025 ont permis de cartographier des zones inexplorées des océans et de découvrir plusieurs nouvelles espèces. Ces avancées ouvrent la voie à de nouvelles recherches scientifiques et écologiques.",
      category: { id: 4 } // Sciences et technologies
    },
    {
      title: "Technologies de transport du futur",
      subtitle: "Hyperloop, véhicules autonomes et mobilité durable",
      subhead: "Les innovations transforment radicalement nos déplacements quotidiens",
      body: "En 2025, le transport connaît une transformation majeure avec l'arrivée de véhicules autonomes, de réseaux Hyperloop expérimentaux et d'initiatives massives pour réduire l'empreinte carbone des transports.",
      category: { id: 4 } // Sciences et technologies
    }
  ];

 // Insertion dans la DB
  for (const data of articles) {
    const exists = await articleRepo.findOneBy({ title: data.title });
    if (!exists) {
      const article = articleRepo.create(data);
      await articleRepo.save(article);
    }
  }

  console.log("✅ Seed completed!");
  process.exit();
}

seedArticles().catch(err => {
  console.error(err);
  process.exit(1);
});
