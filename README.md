# Hotline Wei - Gestion de commandes

Projet de gestion de commandes pour la **Hotline Wei**, permettant aux utilisateurs de passer et suivre des commandes, et aux administrateurs de gérer les articles et images associées.

---

## 🚀 Technologies utilisées

* **Next.js (App Router / Server Components)** – Framework principal pour le frontend et le backend.
* **TanStack Query** – Gestion des requêtes et mutations côté client.
* **Ant Design (v5)** – Composants UI 
* **Tailwind CSS** – Utilisé pour le style et la mise en page responsive.
* **Zod** – Validation des données côté frontend et backend.
* **Clerk** – Authentification et gestion des utilisateurs.
* **Drizzle ORM** – Gestion de la base de données SQL.
* **Neon DB** – Base de données PostgreSQL.
* **Cloudflare R2** – Bucket pour le stockage des images d’articles.
* **Vercel** – Déploiement du projet.

---

## 📦 Fonctionnalités principales

### Utilisateur

* Voir la liste des catégories et des articles.
* Passer des commandes avec date, heure et lieu.
* Visualiser un historique des commandes.
* Interface responsive pour mobile et desktop.

### Administrateur

* Ajouter / modifier des articles.
* Upload d’images pour les articles sur Cloudflare R2.
* Gestion des catégories d’articles.
* Interface responsive et intuitive.

---

## 🖼 Gestion des images

* Les images sont uploadées via un endpoint Next.js `/api/items/[id]/upload`.
* Upload géré avec **TanStack Mutation** et **Axios**, avec notifications pour succès / erreur.
* Les images sont stockées sur **Cloudflare R2** (bucket public).
* Les URLs des images sont stockées en base de données pour association aux articles.

---


## 🔐 Authentification

* Utilisation de **Clerk** pour la gestion des utilisateurs.
* Les noms et prénoms sont récupérés pour personnaliser l’interface (`Bienvenue {firstName} {lastName}`).

---

## 🔧 Configurations importantes

### Next.js

* Fonts : `Geist` et `Geist Mono` via `next/font/google`.
* Dark mode support via Tailwind.
* Remote images (Cloudflare R2) ajoutées dans `next.config.js` :

---

## 📝 Auteurs

* Paulin & Malo Bonnefoy
