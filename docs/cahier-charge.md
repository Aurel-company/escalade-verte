# L'ESCALE VERTE — Cahier des Charges

> Hôtel ★★★ · Yaoundé, Cameroun · DOC-01 · Version 1.0 · 2025  
> _Confidentiel — Usage interne_

---

## 1. Contexte & Objectifs

L'Escale Verte est un hôtel 3 étoiles situé à Yaoundé, Cameroun. Le projet vise à développer une présence digitale complète — site web vitrine bilingue (FR/EN) associé à des automatisations n8n — afin d'augmenter la visibilité de l'établissement, centraliser les demandes de réservation et automatiser la gestion des clients.

### 1.1 Problèmes actuels

- Aucun système de réservation en place — les demandes passent uniquement par WhatsApp ou bouche-à-oreille
- Pas de présence web structurée ni de vitrine numérique
- Gestion manuelle des confirmations et suivi clients
- Aucune capitalisation sur les avis clients (Google, TripAdvisor)

### 1.2 Objectifs du projet

1. Créer un site vitrine bilingue (FR/EN) professionnel et optimisé SEO
2. Mettre en place un formulaire de réservation connecté à n8n
3. Automatiser les confirmations, rappels et suivi clients via n8n
4. Centraliser les données clients dans Notion
5. Mettre en valeur les services différenciants : piscine, salle de conférence, restaurant

---

## 2. Description de l'Établissement

| Attribut           | Valeur                                    |
| ------------------ | ----------------------------------------- |
| **Nom**            | L'Escale Verte                            |
| **Catégorie**      | Hôtel 3 étoiles (★★★)                     |
| **Localisation**   | Yaoundé, Cameroun                         |
| **Positionnement** | Milieu de gamme — confort & business      |
| **Langues**        | Français & Anglais (site bilingue)        |
| **Cibles**         | Voyageurs d'affaires, touristes, familles |

### 2.1 Chambres proposées

| Type             | Description                                  | Tarif indicatif              |
| ---------------- | -------------------------------------------- | ---------------------------- |
| Chambre Standard | WiFi, climatisation, TV — séjours courts     | À partir de 35 000 FCFA/nuit |
| Chambre Deluxe   | WiFi, minibar, vue jardin, finitions premium | À partir de 55 000 FCFA/nuit |

### 2.2 Services & équipements

- **Restaurant sur place** — cuisine camerounaise & internationale, petit-déjeuner sur demande
- **Piscine extérieure** — accès inclus pour tous les résidents, ouverte tous les jours
- **Salle de conférence / coworking** — jusqu'à 50 personnes, équipée, modulable
- **WiFi haut débit** dans tout l'établissement
- **Chat WhatsApp** — contact direct avec la réception

### 2.3 Avantage concurrentiel

> "L'Escale Verte combine l'efficacité business (salle de conférence, WiFi premium) et la détente (piscine, restaurant local) — un positionnement rare parmi les hôtels 3 étoiles de Yaoundé, idéal pour les séjours prolongés et les séminaires d'entreprise."

---

## 3. Périmètre — Site Web

### 3.1 Technologie

| Élément         | Choix                                                        |
| --------------- | ------------------------------------------------------------ |
| **Framework**   | Next.js 16+ (React) avec App Router                          |
| **Hébergement** | Vercel (plan Hobby — gratuit)                                |
| **Domaine**     | À acquérir (ex: lescaleverte.cm ou .com)                     |
| **Email**       | Email professionnel custom via Zoho Mail ou Google Workspace |
| **CMS Blog**    | MDX ou Notion API                                            |

### 3.2 Pages du site

| Page        | URL            | Contenu principal                                  |
| ----------- | -------------- | -------------------------------------------------- |
| Accueil     | `/`            | Hero, services clés, CTA réservation, avis clients |
| Chambres    | `/chambres`    | Galerie, détails & tarifs Standard et Deluxe       |
| Services    | `/services`    | Restaurant, piscine, salle de conférence           |
| Réservation | `/reservation` | Formulaire de réservation connecté à n8n           |
| Blog        | `/blog`        | Actualités, conseils séjour à Yaoundé              |
| Contact     | `/contact`     | Formulaire + WhatsApp + carte Google Maps          |
| À propos    | `/a-propos`    | Histoire, valeurs, équipe                          |

### 3.3 Fonctionnalités requises

- Formulaire de réservation en ligne (date arrivée, départ, nb personnes, type de chambre, email, téléphone)
- Galerie photos par chambre et par service
- Page tarifs avec disponibilité indicative
- Bouton WhatsApp flottant (lien `wa.me`)
- Blog / actualités (articles en FR et EN)
- Intégration avis Google Reviews & widget TripAdvisor
- Switch de langue FR ↔ EN (i18n via `next-intl`)
- SEO optimisé : meta tags, OpenGraph, `sitemap.xml`, `robots.txt`
- Google Analytics / Plausible pour les statistiques de visite

### 3.4 Design System

| Élément                | Valeur                                         |
| ---------------------- | ---------------------------------------------- |
| **Couleur principale** | `#102C26` (Vert forêt)                         |
| **Couleur secondaire** | `#F7E7CE` (Crème chaud)                        |
| **Couleur accent**     | `#C9A96E` (Or)                                 |
| **Police display**     | Cormorant Garamond (titres)                    |
| **Police texte**       | Jost (corps de texte)                          |
| **Ambiance**           | Colonial tropical raffiné — élégant, mémorable |

---

## 4. Périmètre — Automatisations n8n

### 4.1 Infrastructure

| Élément              | Choix                                                 |
| -------------------- | ----------------------------------------------------- |
| **Déploiement**      | n8n self-hosté sur VPS (Ubuntu) — OVH ou DigitalOcean |
| **Stockage données** | Notion (base de données clients)                      |
| **Email sortant**    | Zoho Mail / Gmail SMTP                                |
| **Notifications**    | WhatsApp Business API (via Twilio ou 360dialog)       |

### 4.2 Workflows à implémenter

| Workflow                 | Déclencheur                   | Actions                                                      | Priorité          |
| ------------------------ | ----------------------------- | ------------------------------------------------------------ | ----------------- |
| Confirmation réservation | Soumission formulaire site    | Email confirmation client + création fiche Notion            | **P0 — Critique** |
| Notification gérant      | Soumission formulaire site    | Email + alerte interne avec détails réservation              | **P0 — Critique** |
| Rappel avant arrivée     | J-1 (cron quotidien 09h00)    | Email client avec infos pratiques (accès, parking, check-in) | P1 — Important    |
| Gestion avis Google      | Nouveau avis Google (webhook) | Alerte interne + réponse automatique courtoise               | P1 — Important    |
| Newsletter / promo       | Manuel ou planifié (cron)     | Email promotionnel segmenté aux clients Notion               | P2 — Utile        |

---

## 5. Contraintes & Exigences

### 5.1 Performance

- Score Lighthouse > 90 (performance, SEO, accessibilité)
- Temps de chargement < 3 secondes sur connexion 4G
- Images optimisées via `next/image` (WebP automatique)

### 5.2 Sécurité

- HTTPS obligatoire (certificat SSL via Vercel)
- Variables d'environnement pour toutes les clés API (jamais en dur dans le code)
- Protection CSRF sur les formulaires
- Rate limiting sur les endpoints n8n webhook

### 5.3 Accessibilité & SEO

- Balises `alt` sur toutes les images
- Contenu bilingue indexable (FR et EN)
- Schema.org `Hotel` markup pour les moteurs de recherche
- Fiche Google My Business à créer / optimiser en parallèle

---

## 6. Livrables Attendus

| Livrable      | Description                            | Format       |
| ------------- | -------------------------------------- | ------------ |
| DOC-01        | Cahier des charges (ce document)       | MD / DOCX    |
| DOC-02        | Architecture technique & stack         | MD / DOCX    |
| DOC-03        | Spécifications n8n & workflows         | MD / DOCX    |
| Design system | Composants UI de référence             | Aperçu HTML  |
| Site web      | Code source Next.js déployé sur Vercel | GitHub + URL |
| n8n           | Workflows exportés et documentés       | JSON + MD    |

---

## 7. Planning Indicatif

| Phase                     | Contenu                                       | Durée estimée |
| ------------------------- | --------------------------------------------- | ------------- |
| Phase 1 — Fondations      | Setup Next.js, design system, pages statiques | 1 semaine     |
| Phase 2 — Fonctionnalités | Formulaire réservation, galerie, i18n, blog   | 1–2 semaines  |
| Phase 3 — n8n             | Workflows automatisation, tests, Notion       | 1 semaine     |
| Phase 4 — SEO & QA        | Optimisation, tests, mise en production       | 3–5 jours     |
