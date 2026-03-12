# L'ESCALE VERTE — Architecture Technique

> Hôtel ★★★ · Yaoundé, Cameroun · DOC-02 · Version 1.0 · 2025  
> _Confidentiel — Usage interne_

---

## 1. Vue d'ensemble de l'Architecture

L'architecture du projet L'Escale Verte repose sur trois couches distinctes : le frontend (Next.js déployé sur Vercel), le moteur d'automatisation (n8n self-hosté sur VPS), et la couche de données (Notion comme CRM/base clients). Ces trois couches communiquent via des webhooks et des API REST.

### Schéma général

| Couche         | Technologie        | Rôle                               | Hébergement            |
| -------------- | ------------------ | ---------------------------------- | ---------------------- |
| Frontend       | Next.js 14 + React | Site web vitrine, formulaires, SEO | Vercel (gratuit)       |
| Automatisation | n8n (self-hosté)   | Workflows, emails, notifications   | VPS Ubuntu             |
| Données        | Notion API         | CRM clients, réservations          | Cloud Notion           |
| Email          | Zoho Mail / SMTP   | Envoi emails transactionnels       | Zoho Cloud             |
| Messaging      | WhatsApp Business  | Notifications gérant & clients     | Via Twilio / 360dialog |

### Flux de données global

```
Client (navigateur)
  └─► Site Next.js (Vercel)
        └─► API Route /api/reservation
              └─► n8n Webhook (VPS)
                    ├─► Notion API  →  Base clients
                    ├─► SMTP        →  Email client (confirmation)
                    └─► SMTP        →  Email gérant (alerte)
```

---

## 2. Stack Frontend — Next.js

### 2.1 Dépendances principales

| Package               | Version | Usage                                  |
| --------------------- | ------- | -------------------------------------- |
| `next`                | 14+     | Framework React — App Router, SSR, SSG |
| `react` / `react-dom` | 18+     | Librairie UI                           |
| `next-intl`           | latest  | Internationalisation FR/EN             |
| `tailwindcss`         | 3+      | Framework CSS utilitaire               |
| `framer-motion`       | latest  | Animations et transitions              |
| `react-hook-form`     | latest  | Gestion formulaires                    |
| `zod`                 | latest  | Validation des données côté client     |
| `@vercel/analytics`   | latest  | Analytics de visite                    |
| `sharp`               | latest  | Optimisation images Next.js            |

### 2.2 Structure des dossiers

```
lescaleverte/
├── app/
│   └── [locale]/               # Routes bilingues (fr, en)
│       ├── page.tsx            # Accueil
│       ├── chambres/
│       ├── services/
│       ├── reservation/
│       ├── blog/
│       └── contact/
├── components/
│   ├── ui/                     # Boutons, cartes, modales, inputs
│   └── sections/               # Hero, Services, Galerie, etc.
├── lib/                        # Utilitaires, helpers, clients API
├── messages/
│   ├── fr.json                 # Traductions françaises
│   └── en.json                 # Traductions anglaises
├── public/                     # Assets statiques (images, fonts, favicon)
├── styles/                     # CSS global, variables Tailwind
├── .env.local                  # Variables d'environnement (non commité)
└── next.config.js
```

### 2.3 Variables d'environnement (`.env.local`)

```bash
# n8n Webhooks
N8N_WEBHOOK_URL=https://n8n.lescaleverte.cm/webhook/reservation-hotel
N8N_CONTACT_WEBHOOK_URL=https://n8n.lescaleverte.cm/webhook/contact-hotel

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=237600000000

# Google Maps (optionnel)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=votre_cle_api

# Notion (si utilisé pour le blog)
NOTION_API_KEY=secret_xxx
NOTION_BLOG_DB_ID=xxx
```

> ⚠️ **Ne jamais commiter `.env.local`** — ajouter au `.gitignore`

### 2.4 SEO & Métadonnées

- **Metadata API Next.js 14** : `generateMetadata()` par page
- **OpenGraph tags** : titre, description, image pour chaque page
- **Schema.org** : type `Hotel` avec adresse, rating, `amenityFeature`
- **Sitemap dynamique** : `app/sitemap.ts` généré automatiquement
- **robots.txt** : `app/robots.ts`
- **Balises hreflang** pour le contenu bilingue FR/EN

### 2.5 Internationalisation (next-intl)

```
messages/
├── fr.json   →  { "hero": { "title": "Où le confort rencontre l'élégance" } }
└── en.json   →  { "hero": { "title": "Where comfort meets elegance" } }
```

Toutes les pages sont accessibles sous `/fr/...` et `/en/...` avec redirection automatique selon la langue du navigateur.

---

## 3. Infrastructure VPS — n8n

### 3.1 Configuration serveur recommandée

| Paramètre         | Valeur recommandée                                 |
| ----------------- | -------------------------------------------------- |
| **OS**            | Ubuntu 22.04 LTS                                   |
| **RAM**           | 2 GB minimum (4 GB recommandé)                     |
| **CPU**           | 1–2 vCPU                                           |
| **Stockage**      | 20 GB SSD                                          |
| **Fournisseur**   | OVH VPS Starter (~4€/mois) ou DigitalOcean Droplet |
| **Reverse proxy** | Nginx avec SSL Let's Encrypt (Certbot)             |
| **Domaine n8n**   | `n8n.lescaleverte.cm` (sous-domaine dédié)         |

### 3.2 Installation n8n via Docker

```bash
# 1. Installer Docker & Nginx
apt update && apt install -y docker.io docker-compose nginx certbot python3-certbot-nginx

# 2. Créer le répertoire de travail
mkdir -p /opt/n8n && cd /opt/n8n

# 3. docker-compose.yml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n.lescaleverte.cm
      - N8N_PROTOCOL=https
      - N8N_PORT=5678
      - WEBHOOK_URL=https://n8n.lescaleverte.cm
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=MotDePasseForte123!
    volumes:
      - n8n_data:/home/node/.n8n
volumes:
  n8n_data:

# 4. Lancer n8n
docker-compose up -d

# 5. Configurer Nginx (reverse proxy vers localhost:5678)
# 6. Activer SSL
certbot --nginx -d n8n.lescaleverte.cm
```

### 3.3 Configuration Nginx

```nginx
server {
    server_name n8n.lescaleverte.cm;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # SSL géré par Certbot
}
```

### 3.4 Sécurité n8n

- Authentification basique activée (`N8N_BASIC_AUTH_ACTIVE=true`)
- Accès restreint par IP si possible (hôtel + développeur)
- Sauvegardes automatiques des workflows (cron + rsync vers stockage distant)
- Rate limiting sur les webhooks publics via Nginx

---

## 4. Base de données — Notion

### 4.1 Structure de la base clients

| Propriété Notion | Type       | Description                           |
| ---------------- | ---------- | ------------------------------------- |
| Nom complet      | Texte      | Nom et prénom du client               |
| Email            | Email      | Adresse email principale              |
| Téléphone        | Téléphone  | Numéro WhatsApp / mobile              |
| Date arrivée     | Date       | Date de check-in prévue               |
| Date départ      | Date       | Date de check-out prévue              |
| Type chambre     | Select     | Standard / Deluxe                     |
| Nb personnes     | Nombre     | Nombre de voyageurs                   |
| Statut           | Select     | Nouveau / Confirmé / Annulé / Terminé |
| Source           | Select     | Site web / WhatsApp / Direct          |
| Newsletter       | Checkbox   | Accepte les offres promotionnelles    |
| Notes            | Texte long | Demandes spéciales, remarques         |
| Date création    | Date créée | Horodatage automatique Notion         |

### 4.2 Vues recommandées dans Notion

- **Vue Tableau** : toutes les réservations triées par date d'arrivée
- **Vue Calendrier** : visualisation des séjours par période
- **Vue Galerie** : fiches clients avec statut coloré
- **Filtre rapide** : `Statut = "Nouveau"` pour traitement des demandes en attente

---

## 5. Flux de données — Détail

| Étape                          | Source             | Destination        | Protocole        |
| ------------------------------ | ------------------ | ------------------ | ---------------- |
| 1. Client remplit formulaire   | Site Next.js       | API Route Next.js  | HTTP POST        |
| 2. API Route envoie au webhook | `/api/reservation` | n8n Webhook        | HTTP POST + JSON |
| 3. n8n traite les données      | n8n Workflow       | Notion API         | HTTPS REST       |
| 4. Email confirmation client   | n8n (SMTP)         | Boîte email client | SMTP             |
| 5. Alerte email gérant         | n8n (SMTP)         | Email hôtel        | SMTP             |
| 6. Rappel J-1 (cron)           | n8n Cron Trigger   | Email client       | SMTP             |

### Exemple de payload envoyé par Next.js à n8n

```json
{
  "nom": "Jean Mbarga",
  "email": "jean@email.com",
  "telephone": "+237 699 000 111",
  "dateArrivee": "2025-07-15",
  "dateDepart": "2025-07-18",
  "typeChambre": "Deluxe",
  "nbPersonnes": 2,
  "demandesSpeciales": "Chambre non-fumeur svp",
  "newsletter": true,
  "langue": "fr"
}
```
