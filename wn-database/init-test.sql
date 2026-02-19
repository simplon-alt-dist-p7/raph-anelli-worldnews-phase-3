\connect worldnews_test

CREATE SCHEMA writer;
CREATE SCHEMA reader;

-- Table pour les articles
CREATE TABLE writer.t_categories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE writer.t_articles (
    id SERIAL UNIQUE,
    title VARCHAR(300) NOT NULL,
    subtitle VARCHAR(300) NOT NULL,
    subhead VARCHAR(1000) NOT NULL,
    body TEXT NOT NULL,
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delete_date TIMESTAMP NULL,
    update_date TIMESTAMP NULL,
    category_id INT NOT NULL,
    CONSTRAINT pk_articles PRIMARY KEY (title, publish_date),
    CONSTRAINT fk_articles_categories
        FOREIGN KEY (category_id)
        REFERENCES writer.t_categories(id)
);

-- Table pour les favoris
CREATE TABLE reader.t_article_favorites (
    article_id INT NOT NULL PRIMARY KEY,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_favorites_articles
        FOREIGN KEY (article_id)
        REFERENCES writer.t_articles(id)    
);


-- Table pour les commentaires
CREATE TABLE reader.t_article_comments (
    id SERIAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    article_id INT NOT NULL REFERENCES writer.t_articles(id),
    content VARCHAR(1000) NOT NULL,
    CONSTRAINT pk_article_comments PRIMARY KEY (id),
      -- Contrainte métier : un seul commentaire par article par instant
    CONSTRAINT uk_comments_article_time UNIQUE (article_id, created_at)
);

-- Vue matérialisée pour les articles

CREATE MATERIALIZED VIEW reader.v_categories AS
    SELECT 
    id, 
    title
    FROM writer.t_categories;

CREATE MATERIALIZED VIEW reader.v_articles AS
    SELECT
    a.id,
    a.title,
    a.subtitle,
    a.subhead,
    a.body,
    a.publish_date,
    a.update_date,
    a.delete_date,
    a.category_id,
    c.title AS category_title
    FROM writer.t_articles a
    JOIN writer.t_categories c ON a.category_id = c.id;

-- Fonction pour rafraîchir la vue matérialisée après modification des articles
CREATE FUNCTION reader.refresh_v_articles()
RETURNS TRIGGER AS $$  
BEGIN
    REFRESH MATERIALIZED VIEW reader.v_articles;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour rafraîchir la vue matérialisée après modification des categories
CREATE FUNCTION reader.refresh_v_categories()
RETURNS TRIGGER AS $$  
BEGIN
    REFRESH MATERIALIZED VIEW reader.v_categories;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour appeler la fonction de rafraîchissement après chaque modification
CREATE TRIGGER trg_refresh_v_categories
AFTER INSERT OR UPDATE OR DELETE ON writer.t_categories
FOR EACH STATEMENT
EXECUTE FUNCTION reader.refresh_v_categories();

CREATE TRIGGER trg_refresh_v_articles
AFTER INSERT OR UPDATE OR DELETE ON writer.t_articles
FOR EACH STATEMENT
EXECUTE FUNCTION reader.refresh_v_articles();

-- Jeu de données de test
INSERT INTO writer.t_categories (title) VALUES
('Culture'),
('Technologie'),
('Intelligence Artificielle'),
('Transport'),
('Sport'),
('Science'),
('Économie'),
('Santé'),
('Politique'),
('Environnement');

INSERT INTO writer.t_articles (title, subtitle, subhead, body, publish_date, category_id) VALUES
(
    'Les avancées de l''intelligence artificielle en 2025',
    'Une révolution technologique en marche',
    'L''IA continue de transformer notre quotidien avec des innovations majeures dans tous les secteurs.',
    'L''année 2025 marque un tournant décisif dans le développement de l''intelligence artificielle. Les modèles de langage atteignent désormais des niveaux de compréhension et de génération de texte inégalés. Dans le secteur de la santé, l''IA permet de diagnostiquer des maladies avec une précision remarquable. Les entreprises adoptent massivement ces technologies pour optimiser leurs processus.',
    '2025-12-18 10:00:00',
    3
),
(
    'Changement climatique : les nouvelles mesures européennes',
    'L''UE renforce ses engagements environnementaux',
    'Face à l''urgence climatique, l''Union européenne adopte un nouveau plan ambitieux pour réduire les émissions.',
    'La Commission européenne a présenté ce matin un ensemble de mesures visant à accélérer la transition écologique. Parmi les points clés : l''interdiction progressive des véhicules thermiques, le développement massif des énergies renouvelables et la création d''un fonds de soutien pour les industries en reconversion. Ces mesures devraient permettre d''atteindre la neutralité carbone d''ici 2050.',
    '2025-12-17 14:30:00',
    2
),
(
    'Football : résultats de la Ligue des Champions',
    'Soirée de surprises en Europe',
    'Plusieurs favoris ont trébuché lors de cette nouvelle journée de compétition européenne.',
    'La Ligue des Champions a offert son lot de surprises cette semaine. Le Paris Saint-Germain s''est incliné à domicile face à une équipe déterminée. De son côté, le Real Madrid a arraché la victoire dans les dernières minutes grâce à un but de son attaquant vedette. Le classement des groupes s''annonce serré pour la suite de la compétition.',
    '2025-12-16 22:45:00',
    5
),
(
    'Économie : la BCE maintient ses taux directeurs',
    'Une décision attendue par les marchés',
    'La Banque centrale européenne a choisi la stabilité face aux incertitudes économiques mondiales.',
    'Lors de sa réunion mensuelle, la BCE a décidé de maintenir ses taux directeurs inchangés. Cette décision, largement anticipée par les analystes, vise à soutenir la croissance tout en surveillant l''inflation. La présidente de l''institution a souligné que la situation économique reste fragile et nécessite une approche prudente.',
    '2025-12-15 16:00:00',
    7
),
(
    'Découverte scientifique : une nouvelle exoplanète habitable',
    'À 40 années-lumière de la Terre',
    'Les astronomes ont identifié une planète présentant des conditions favorables à la vie.',
    'Une équipe internationale d''astronomes a annoncé la découverte d''une exoplanète située dans la zone habitable de son étoile. Cette planète, baptisée Kepler-2025b, possède une atmosphère et une température compatibles avec la présence d''eau liquide. Cette découverte relance les espoirs de trouver des signes de vie extraterrestre.',
    '2025-12-14 09:15:00',
    6
),
(
    'Technologie : lancement du nouveau smartphone révolutionnaire',
    'Un concentré d''innovations',
    'Le géant de la tech dévoile son dernier flagship avec des fonctionnalités inédites.',
    'La conférence annuelle du fabricant a été l''occasion de présenter son nouveau smartphone phare. Parmi les nouveautés : un écran pliable de nouvelle génération, une batterie à autonomie record et un système de caméra assisté par intelligence artificielle. Le prix de lancement reste cependant élevé, ce qui pourrait freiner les ventes.',
    '2025-12-13 18:00:00',
    2
),
(
    'Santé : nouvelle campagne de vaccination hivernale',
    'Les autorités appellent à la vigilance',
    'Face à la recrudescence des virus saisonniers, le gouvernement lance une campagne de prévention.',
    'Le ministère de la Santé a lancé sa campagne annuelle de vaccination contre la grippe et autres virus hivernaux. Les personnes fragiles et les professionnels de santé sont particulièrement invités à se faire vacciner. Des centres de vaccination éphémères seront installés dans les principales villes du pays.',
    '2025-12-12 11:30:00',
    5
),
(
    'Culture : le film français triomphe aux Golden Globes',
    'Une reconnaissance internationale',
    'Le cinéma français brille une nouvelle fois sur la scène mondiale avec plusieurs nominations.',
    'Le film français "Les Lumières de Paris" a remporté le Golden Globe du meilleur film étranger. Cette récompense couronne le travail du réalisateur et de son équipe, qui ont su capturer l''essence de la capitale française. Le film avait déjà connu un succès critique lors de sa sortie en salles.',
    '2025-12-11 08:00:00',
    1
),
(
    'Transport : la SNCF annonce de nouvelles lignes TGV',
    'Vers une France mieux connectée',
    'Le réseau ferroviaire à grande vitesse va s''étendre avec plusieurs nouvelles dessertes.',
    'La SNCF a dévoilé son plan d''expansion du réseau TGV pour les cinq prochaines années. De nouvelles lignes relieront des villes moyennes jusqu''ici mal desservies. L''objectif est de proposer une alternative écologique à l''avion pour les trajets intérieurs. Les travaux devraient débuter dès l''année prochaine.',
    '2025-12-10 15:45:00',
    4
),
(
    'Éducation : réforme du baccalauréat confirmée',
    'Des changements majeurs pour 2026',
    'Le ministre de l''Éducation nationale a présenté les grandes lignes de la nouvelle mouture du bac.',
    'La réforme du baccalauréat entrera en vigueur à la rentrée 2026. Parmi les principales modifications : la suppression de certaines épreuves écrites au profit du contrôle continu, l''introduction d''un grand oral renforcé et la création de nouvelles spécialités. Les syndicats enseignants ont exprimé des réserves sur certains aspects du projet.',
    '2025-12-09 12:00:00',
    6
);


INSERT INTO reader.t_article_comments (article_id, content, created_at) VALUES
(1, 'Article très intéressant, on voit bien l’impact de l''intelligence artificielle dans notre quotidien.', '2025-12-11 11:15:00'),
(1, 'Si l’IA pouvait faire mes tâches ménagères, histoire de pouvoir coder tranquille toute la semaine, je signe tout de suite.', '2025-12-18 11:15:00'),
(1, 'Sujet passionnant, mais j’aurais aimé plus d’exemples concrets.', '2025-12-18 12:40:00'),
(2, 'Des mesures ambitieuses, reste à voir leur mise en application réelle.', '2025-12-17 16:00:00'),
(2, 'C''est un complot !', '2025-12-17 16:30:00'),
(3, 'Quelle soirée incroyable, la Ligue des Champions réserve toujours des surprises.', '2025-12-16 23:30:00'),
(3, 'Le PSG a manqué de réalisme, dommage pour le classement.', '2025-12-17 00:10:00'),
(5, 'Découverte fascinante, la recherche spatiale progresse à grande vitesse.', '2025-12-14 10:00:00'),
(5, 'À 40 années-lumière… quelqu’un sait si la fibre y arrive ?', '2025-12-14 10:05:00'),  
(8, 'Une belle reconnaissance pour le cinéma français.', '2025-12-11 09:20:00'),
(10, 'Réforme intéressante mais qui soulève encore beaucoup de questions.', '2025-12-09 13:45:00');
