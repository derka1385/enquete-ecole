---
name: "Regards d’école"
description: "Un espace calme et précis pour transcrire les questionnaires papier de l’école."
colors:
  paper: "#f5f6f2"
  white: "#fff"
  ink: "#253c34"
  muted: "#69756d"
  forest: "#203f34"
  green: "#267c69"
  green-dark: "#1b6554"
  tint: "#eaf2ed"
  line: "#dfe5dd"
  input-border: "#cdd7cd"
  secondary-border: "#ccd7cc"
  focus-amber: "#b5843e"
  review-bg: "#f5eddd"
  review-ink: "#8e652a"
  complete-bg: "#eaf3e9"
  complete-ink: "#397643"
  summary-bg: "#edf1e7"
  nav-active-bg: "#edf2e5"
  nav-active-ink: "#204b3a"
  nav-hover: "#2c4b3e"
  nav-text: "#c7d7c9"
  option-selected-bg: "#edf5ec"
  option-selected-border: "#79a58b"
  option-selected-ink: "#204f3a"
  error-bg: "#fbede5"
  error-ink: "#903f30"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(44px, 4.7vw, 70px)"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "34px"
    fontWeight: 750
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 550
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 650
  question:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 550
    lineHeight: 1.65
rounded:
  badge: "4px"
  option: "6px"
  control: "7px"
  tab: "10px"
  surface: "12px"
spacing:
  xs: "6px"
  sm: "8px"
  control-gap: "9px"
  md: "12px"
  lg: "20px"
  xl: "24px"
  workspace: "38px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "11px 15px"
  button-primary-hover:
    backgroundColor: "{colors.green-dark}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "11px 15px"
  button-secondary-hover:
    backgroundColor: "{colors.tint}"
  button-text:
    textColor: "{colors.green}"
    padding: "5px 0"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 12px"
  navigation-active:
    backgroundColor: "{colors.nav-active-bg}"
    textColor: "{colors.nav-active-ink}"
    rounded: "{rounded.control}"
    padding: "13px 12px"
  status-draft:
    backgroundColor: "{colors.review-bg}"
    textColor: "{colors.review-ink}"
    rounded: "{rounded.badge}"
    padding: "3px 7px"
  status-complete:
    backgroundColor: "{colors.complete-bg}"
    textColor: "{colors.complete-ink}"
    rounded: "{rounded.badge}"
    padding: "3px 7px"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  answer-option-selected:
    backgroundColor: "{colors.option-selected-bg}"
    textColor: "{colors.option-selected-ink}"
    rounded: "{rounded.option}"
    padding: "8px 11px"
  entry-summary:
    backgroundColor: "{colors.summary-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "22px 21px"
---

# Design System: Regards d’école

## Overview

**Creative North Star: "Le carnet de transcription partagé"**

Une interface de travail calme, précise et accueillante, où les feuilles papier restent la source et où chaque fiche garde une référence anonyme lisible. La navigation vert forêt pose un repère stable ; le canevas clair chaud et les formulaires blancs donnent la priorité à la lecture des questions.

Cette documentation décrit le système réalisé dans app/globals.css et app/page.tsx, sans maquette approuvée distincte. Les choix de composition peuvent évoluer avec la tâche ; la hiérarchie sobre, les contrôles natifs et les états de transcription explicites constituent la continuité visuelle.

**Key Characteristics:**
- Navigation forêt stable et espace de travail clair.
- Typographie Manrope pour les titres, DM Sans pour la saisie.
- Formulaires plats, séparateurs fins et choix natifs visibles.
- Verts pour les actions et sélections ; ambre pour le focus et la révision.
- Adaptation mobile en une colonne, sans mouvement essentiel.

## Colors

Palette végétale assourdie : les fonds presque blancs laissent les questions lisibles, tandis que les verts structurent le parcours. Les valeurs normatives sont dans le frontmatter.

### Primary

- **Vert d’action** (`green`) : actions d’enregistrement et progression ; sa variante profonde (`green-dark`) marque le survol.
- **Forêt** (`forest`) : fond de navigation et panneau d’accueil, avec texte clair et sélection pâle.
- **Vert de sélection** (`tint`, famille `option-selected-*`) : retour discret sur les réponses cochées et les actions secondaires survolées.

### Secondary

- **Ambre de révision** (`review-bg`, `review-ink`) : fiches à compléter et points à vérifier ; `focus-amber` rend le clavier visible sans changer la signification de l’action.
- **Terre d’erreur** (`error-bg`, `error-ink`) : bandeau d’erreur lisible, associé à un message et une icône.

### Neutral

- **Papier clair** (`paper`) : canevas général.
- **Blanc de saisie** (`white`) : formulaires et zones de lecture.
- **Encre végétale** (`ink`) : titres et contenus principaux.
- **Gris feuillage** (`muted`) : aides et métadonnées secondaires.
- **Filet végétal** (`line`) : limites de surfaces, lignes de tableau et séparateurs de questions.
- **Sauge claire** (`summary-bg`) : récapitulatif de la fiche, distinct du formulaire blanc sans effet de relief.

**The La couleur accompagne le libellé Rule.** Toujours accompagner les états de couleur par un texte, une coche native ou une icône explicite.

## Typography

**Display Font:** Manrope, avec repli sans-serif. **Body Font:** DM Sans, avec repli sans-serif. Les familles sont chargées dans la feuille globale. Aucun caractère monospace distinct n’est utilisé.

Les titres légèrement resserrés structurent une interface de travail compacte ; les labels et les réponses utilisent une famille plus souple. Le frontmatter consigne les rôles récurrents ; le corps de page n’a pas de taille globale imposée et ses blocs règlent leur densité localement.

- **Display** : réservé au message d’accueil ; sur téléphone, taille fixe observée à (45px).
- **Headline** : titre d’une vue de travail, ramené à (29px) sous la première réduction de largeur.
- **Title** : titre de section ; les petits panneaux utilisent des variantes de (16–19px).
- **Body** : textes principaux de travail autour de (13–15px), avec aides et métadonnées plus petites selon le contexte. Les descriptions longues restent contenues, généralement entre (55ch) et (65ch).
- **Label / Question** : poids modéré et interligne aéré pour les questions longues ; les références courtes accompagnent le libellé sans le concurrencer.
- Les tableaux, effectifs et comptes emploient des chiffres tabulaires. Garder les accents et la ponctuation française.

## Layout

Sur ordinateur, une barre latérale fixe occupe (242px), avec un espace de travail décalé de la même largeur. La barre supérieure blanche mesure (72px). Le contenu est centré dans une largeur maximale de (1580px), avec marges intérieures horizontales de (38px). La fiche principale occupe une colonne fluide, suivie d’un récapitulatif de (264px) avec un espace de (23px). Le récapitulatif reste visible par position collante à (24px) du haut.

Les profils sont distribués en quatre colonnes égales. La saisie affiche une question à la fois, avec compteur, thème, référence et boutons Précédent/Suivant. Un menu compact permet l’accès direct à une question. Les réponses multiples utilisent deux colonnes lorsqu’elles disposent de la place nécessaire.

- À partir de (1600px), le récapitulatif s’élargit à (300px) et les formulaires respirent davantage.
- À (1200px) et moins, la navigation passe à (211px), les marges à (24px), et le récapitulatif à (228px).
- À (1000px) et moins, la saisie et les analyses passent en une colonne principale. Le récapitulatif suit la question sur une seule colonne ; ses informations conservent une petite grille interne lorsque la place le permet.
- À (760px) et moins, la barre latérale devient un tiroir de (245px), le contenu utilise toute la largeur et des marges de (18px). La barre supérieure mesure (63px), les réponses multiples passent en une colonne et les retraits de saisie disparaissent. Les tableaux restent défilants horizontalement. L’accueil passe d’une répartition moitié-moitié à une seule colonne.

Les espaces récurrents sont consignés dans le frontmatter ; les valeurs locales ajustent la densité selon le composant. Ne pas imposer une composition d’écran identique à toutes les tâches.

## Elevation & Depth

Le système est plat au repos : contraste tonal, traits fins et espace indiquent les groupes. Les formulaires blancs et panneaux de résumé n’ont pas d’ombre. Seuls les éléments qui passent devant le contenu utilisent une ombre : notification flottante et tiroir mobile ouvert. Leur valeur exacte est conservée dans le sidecar.

**Saisie séquentielle.** Afficher une seule question et ses options. Les boutons Précédent/Suivant restent disponibles en bas du formulaire ; la position est conservée dans le brouillon.

## Shapes

Les grandes surfaces ont des angles doucement arrondis (`surface`). Les champs et boutons partagent des angles plus petits (`control`), les options de réponse restent légèrement plus serrées (`option`) et les badges sont compacts (`badge`). Les onglets de profils forment un seul groupe joint, séparé par des filets. Les formes arrondies servent la lisibilité sans produire de pilules décoratives généralisées.

## Components

### Buttons

Actions simples, nommées par leur résultat. Les boutons principaux sont verts, les secondaires blancs à contour fin, les actions textuelles vertes et sans fond. Les boutons principaux et secondaires ont une hauteur minimale de (42px), un espacement intérieur de (11px 15px) et un intervalle icône-texte de (9px). Les variantes compactes et larges mesurent au minimum (35px) et (49px). Le survol principal utilise `green-dark`, le secondaire `tint`. L’indisponibilité est indiquée par l’attribut natif `disabled`, une opacité de (.48) et un curseur adapté.

### Inputs / Fields

Champs blancs avec contour végétal fin, angles `control` et espacement intérieur de (11px 12px). Garder des labels reliés aux champs, des légendes pour les questions et les contrôles HTML natifs. Radios et cases à cocher utilisent le vert d’action ; la tuile sélectionnée ajoute un fond pâle, un contour renforcé et une coche visible. Les commentaires restent redimensionnables verticalement.

Le focus clavier de tous les éléments interactifs est un contour ambre de (3px), décalé de (3px). Les états spéciaux de transcription restent un sélecteur explicite, séparé des réponses de fond. Les erreurs apparaissent dans un bandeau textuel identifiable.

### Navigation

Fond forêt, icônes de trait et texte atténué au repos. L’élément actif est un rectangle clair avec texte forêt, le survol une nuance plus claire du fond sombre. Les comptes restent des badges discrets. Sur mobile, ouverture par un bouton libellé et fermeture visible ; conserver la même hiérarchie des destinations.

### Chips / Status

Badges compacts à petite courbure : « À compléter » ambre, « Finalisée » vert clair. Chaque badge contient un texte et une icône. Les onglets de profil indiquent leur sélection par un fond pâle et un trait inférieur vert ; le thème de la question actuelle figure sous le compteur.

### Cards / Containers

Un panneau blanc à contour `line` et rayon `surface` constitue le niveau principal. Une seule question est visible dans le formulaire de saisie. Les outils d’analyse, résultats et tableaux reprennent cette famille. Le récapitulatif utilise `summary-bg`, des espaces plus compacts et aucune ombre.

### Transcription row

Une question est un `fieldset` avec `legend`, référence, provenance PDF, conditions éventuelles et options. Les états hors parcours restent visibles et explicités. La présence d’un contrôle coché se lit à la fois dans le contrôle natif et dans sa surface sélectionnée. Ne pas confondre réponse absente, illisible, non applicable, sans avis et champ non saisi.

### Charts / Feedback

Les graphiques présentent les modalités, les valeurs et la base ; une table permet de relire les chiffres. Les états sans données expliquent la prochaine action. La notification de confirmation est un élément flottant sobre avec fermeture visible et annonce `status` ; les erreurs utilisent `alert`.

Les changements de couleur utilisent une transition courte de (160ms) ; l’ouverture du tiroir utilise (200ms). Aucune animation n’est essentielle. La préférence de mouvement réduit désactive les transitions et animations et rétablit le défilement immédiat.

## Do's and Don'ts

### Do:

- Do conserver les labels, légendes de groupes et références papier visibles.
- Do reprendre les tokens existants pour les nouvelles vues et garder le focus ambre au clavier.
- Do distinguer sélection, brouillon, finalisation et erreur avec un libellé explicite.
- Do placer le récapitulatif après la question lorsque la largeur ne permet plus deux colonnes.
- Do présenter les graphiques avec leurs libellés, bases et tableaux de valeurs.

### Don't:

- Don't remplacer radios, cases à cocher ou sélecteurs par des contrôles sans comportement clavier natif.
- Don't encadrer chaque question dans une nouvelle carte ni ajouter des ombres aux formulaires au repos.
- Don't transformer les couleurs d’alerte en décoration générale.
- Don't préremplir des réponses ou afficher des résultats fictifs dans les états vides.
- Don't rendre une animation nécessaire à la compréhension d’un état.
