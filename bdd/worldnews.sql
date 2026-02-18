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