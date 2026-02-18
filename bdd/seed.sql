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