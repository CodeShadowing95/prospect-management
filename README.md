# Gestion des Leads - Application JavaScript

## Aperçu de l'application
![Aperçu de l'application](./public/showcase.jpeg)

## Description
Cette application permet de gérer une liste de demandes de financement (leads) avec plusieurs fonctionnalités :

- Affichage de la liste des leads à partir d'un JSON simulé.
- Filtrage des leads par statut (En attente, Confirmé, Refusé).
- Modification du statut d'un lead.
- Ajout manuel d'un lead avec un formulaire (statut initial "En attente").
- Suppression d'un lead.
- (Bonus) Recherche par nom dans la liste.
- (Bonus) Stockage des données en `localStorage` pour persister après un rafraîchissement.

## Démo en ligne
[Accéder à la démo en ligne](https://prospectify.netlify.app/)

## Installation et exécution du projet

### 1. Cloner le projet
```bash
git clone https://github.com/CodeShadowing95/prospect-management.git
cd prospect-management
```

### 2. Installer les dépendances (si applicable)
Si vous utilisez un gestionnaire de paquets comme `npm` ou `yarn` :
```bash
npm install  # ou yarn install
npm run dev
```

## Approche du développement

### 1. **Gestion de l'état et stockage local**
- L'état des leads est géré avec `useState`, initialisé à partir des données stockées en `localStorage`.
- Les modifications des leads (ajout, modification, suppression) sont directement synchronisées avec `localStorage`.

### 2. **Gestion du modal d'ajout/modification**
- `handleModalAdd` ouvre le modal et initialise un nouvel objet `formData`.
- `handleEdit` remplit le formulaire avec les données existantes du lead en édition.
- `handleAddModifyProspect` ajoute un nouveau lead ou met à jour un lead existant.

### 3. **Recherche et filtrage dynamique**
- `handleSearch` filtre les leads en fonction du nom saisi par l'utilisateur.
- `handleFilter` filtre les leads selon leur statut (Confirmé, En attente, Refusé).

### 4. **Suppression des leads**
- `handleDelete` permet de supprimer un lead et met à jour l'état ainsi que `localStorage`.

### 5. **Affichage des leads**
- La liste des leads est affichée en utilisant `ProspectCard`.
- Si aucun lead ne correspond aux critères de recherche/filtrage, un message est affiché.

## Fonctionnalités

### 1. Affichage des leads
- Chargement des leads à partir d’un fichier JSON simulé.
- Affichage des informations : Nom, Statut, Montant, Date de demande.

### 2. Filtrage des leads
- Un menu déroulant permet de filtrer les leads selon leur statut (En attente, Confirmé, Refusé).

### 3. Modification du statut
- Chaque lead dispose d’un bouton permettant de modifier son statut.

### 4. Ajout d’un lead
- Un formulaire permet d’ajouter un lead avec un nom et un montant.
- Le statut est défini par défaut à "En attente".

### 5. Suppression d’un lead
- Chaque lead dispose d’un bouton de suppression.

### 6. (Bonus) Recherche par nom
- Un champ de recherche permet de filtrer les leads par nom.

### 7. (Bonus) Persistance des données
- Les leads sont sauvegardés dans `localStorage` pour être conservés après rafraîchissement.

## Technologies utilisées
```txt
- HTML, CSS, JavaScript (ES6+)
- Stockage local via `localStorage`
```

## Auteurs
```txt
- Patrick NAMEGNI
- Contact : patrick.namegni@gmail.com
```

