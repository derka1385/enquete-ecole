# Regards d’école

Outil de saisie collaborative des questionnaires CEE École de septembre 2025.

## Utilisation

1. Créer une étude, puis copier son lien depuis « Partager le lien ».
2. Répartir les piles de papier et attribuer une référence anonyme distincte à chaque questionnaire.
3. Choisir Élèves, Parents, Enseignants ou Autres personnels ; transcrire les réponses une question à la fois avec Précédent / Suivant. Le menu « Aller à une question » permet une correction directe.
4. Distinguer une réponse cochée de « Sans réponse sur papier », « Illisible / ambigu » et « Non posée / non applicable ».
5. « Enregistrer le brouillon » rend la fiche disponible à l’équipe. Le brouillon automatique du navigateur reste sur cet appareil.
6. « Finaliser & fiche suivante » ajoute la fiche aux statistiques, après confirmation des champs manquants ou incohérences.
7. Dans Analyses, choisir jusqu’à six questions avec les mêmes modalités ; utiliser le filtre pour explorer un sous-groupe.
8. Exporter les graphiques en PNG ou SVG ; télécharger l’Excel complet et une copie JSON dans Exports.

Toute personne possédant le lien complet peut consulter et modifier l’étude, lorsque l’accès sans compte du site est activé. Le lien inclut une clé aléatoire ; aucune liste des études n’est exposée. Ne pas publier le lien d’équipe. Aucun nom de répondant n’est demandé. Les commentaires sont à relire pour éviter l’identification d’un répondant.

## Contenu du questionnaire

286 champs : 79 élèves, 41 parents, 109 enseignants, 57 autres personnels. Les lignes des tableaux sont représentées par des sous-codes (.1, .2…). Les pourcentages de temps des enseignants sont des champs .pct. Le dictionnaire Excel conserve modalités, type, thème, page PDF et conditions.

Les questions hors parcours restent saisissables pour transcrire fidèlement un papier incohérent. Une alerte signale cette incohérence sans supprimer la réponse. Les questions complémentaires du référentiel sont disponibles et peuvent être masquées pendant la saisie.

## Calculs et exports

Seules les fiches finalisées participent aux analyses. Pourcentage = effectif d’une modalité / nombre de répondants ayant une réponse exploitable à cette question × 100. « Sans avis » et « Non concerné » quand il s’agit d’une modalité du papier restent inclus. Les états techniques de transcription sont exclus et dénombrés séparément. Les choix multiples peuvent dépasser 100 %. Une question conditionnelle vide dont la condition n’est pas remplie est non applicable. Les effectifs de population n’étant pas fournis, aucun taux de participation n’est inventé.

Le classeur .xlsx contient le mode d’emploi, quatre feuilles de réponses (brouillons inclus et identifiés), un dictionnaire, les statistiques globales et filtrées, et les données du graphique sélectionné le cas échéant. Les données exportées sont des valeurs au moment de l’export. Les graphiques sont exportés séparément en PNG et SVG.

Le JSON est une copie des données brutes ; la restauration par import n’est pas proposée dans cette version.

## Technique

Interface React / Vinext sur Cloudflare Workers. Données partagées D1. Les accès à une étude nécessitent sa clé, conservée sous forme hachée côté serveur. Vérification de version sur les modifications, référence papier unique par étude et profil. Rafraîchissement toutes les 15 secondes. Ne pas changer la migration déjà déployée : ajouter une migration Drizzle pour toute évolution de schéma.

Installation : utiliser le helper Sites. Développement : `npm run dev`. Vérification : `npx tsc --noEmit`. Construction : helper `build-site.mjs`. Migrations dans `drizzle/`. Le stockage local de prévisualisation est séparé de la base de production.

## Stockage des téléchargements

Les téléchargements utilisent le dossier choisi par le navigateur. L’utilisateur souhaite les conserver dans `/Users/petrinolann/Document` ou `/Users/petrinolann/Coding`, et non les nouveaux PNG dans Documents synchronisé avec iCloud.
