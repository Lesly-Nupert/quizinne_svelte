recette (id_recette INTEGER PK, titre, image, catégorie, ingredients, etapes, id_membre INTEGER FK membre(id))

membre (id_membre INTEGER PK, pseudo, email, mot_de_passe)

commentaire (id_commentaire INTEGER PK, contenu, id_membre INTEGER FK membre(id), id_recette INTEGER FK recette(id))