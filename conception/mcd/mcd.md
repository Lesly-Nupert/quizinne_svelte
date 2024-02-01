# 1 Entités

- recette
- membre
- commentaire

# 2 Attributs des entités

- recette
  - titre
  - image
  - categorie
  - ingrédients
  - étapes
  

- membre
  - pseudo
  - email
  - mot de passe

- commentaire
  - contenu
 

# 3 Mocodo
Une recette a min 1 membre et max 1 membre
Un membre a min 0 recette ou max N recettes
Un commentaire est écrit par min 1 membre et max 1 membre
Un membre écrit min 0 commentaire ou max N commentaire
Un commentaire est dans min 1 recette et max 1 recette
Une recette contient min 0 commentaire ou max N commentaires


MEMBRE: pseudo, email, mot de passe
ECRIT_PAR, 11 COMMENTAIRE, 0N MEMBRE
COMMENTAIRE: contenu

A, 0N MEMBRE, 11 RECETTE
RECETTE: titre, image, categorie, ingredients, etapes
CONTIENT, 0N RECETTE, 11 COMMENTAIRE 



