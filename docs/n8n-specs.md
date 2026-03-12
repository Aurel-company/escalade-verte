# L'ESCALE VERTE — Spécifications n8n

> Hôtel ★★★ · Yaoundé, Cameroun · DOC-03 · Version 1.0 · 2025  
> _Confidentiel — Usage interne_

---

## Introduction

Ce document décrit en détail les 5 workflows n8n à implémenter pour L'Escale Verte. Chaque workflow est spécifié avec ses noeuds, sa logique, les données manipulées et les messages à envoyer. Ces spécifications servent de référence directe pour la configuration dans l'interface n8n.

### Récapitulatif des workflows

| #    | Workflow                    | Priorité          | Déclencheur                       |
| ---- | --------------------------- | ----------------- | --------------------------------- |
| WF-1 | Confirmation de réservation | **P0 — Critique** | Webhook POST (formulaire site)    |
| WF-2 | Rappel J-1 avant arrivée    | P1 — Important    | Cron (09h00 quotidien)            |
| WF-3 | Gestion avis Google         | P1 — Important    | Webhook / Polling                 |
| WF-4 | Newsletter & offres promo   | P2 — Utile        | Manuel (gérant)                   |
| WF-5 | Formulaire contact          | P1 — Important    | Webhook POST (formulaire contact) |

---

## Workflow 1 — Confirmation de Réservation

> **Priorité : P0 — Critique** · À implémenter en premier

- **Déclencheur** : Webhook POST — appelé par l'API Route Next.js du site
- **URL webhook** : `/webhook/reservation-hotel`

### Données reçues (JSON payload)

| Champ               | Type         | Exemple                    |
| ------------------- | ------------ | -------------------------- |
| `nom`               | string       | `"Jean Mbarga"`            |
| `email`             | string       | `"jean@email.com"`         |
| `telephone`         | string       | `"+237 699 000 111"`       |
| `dateArrivee`       | string (ISO) | `"2025-07-15"`             |
| `dateDepart`        | string (ISO) | `"2025-07-18"`             |
| `typeChambre`       | string       | `"Deluxe"`                 |
| `nbPersonnes`       | number       | `2`                        |
| `demandesSpeciales` | string       | `"Chambre non-fumeur svp"` |
| `newsletter`        | boolean      | `true`                     |
| `langue`            | string       | `"fr"`                     |

### Noeuds du workflow

| #   | Noeud n8n                | Action                    | Configuration clé                                     |
| --- | ------------------------ | ------------------------- | ----------------------------------------------------- |
| 1   | **Webhook**              | Reçoit la réservation     | Method: POST · Path: `reservation-hotel`              |
| 2   | **Set**                  | Formate les données       | Calcule `nbNuits = dateDepart - dateArrivee`          |
| 3   | **Notion — Create Page** | Crée la fiche client      | DB ID: `[ID base clients Notion]` · Statut: "Nouveau" |
| 4   | **Send Email (SMTP)**    | Email confirmation client | To: `{{email}}` · Template FR/EN selon `langue`       |
| 5   | **Send Email (SMTP)**    | Alerte email gérant       | To: `reservations@lescaleverte.cm`                    |
| 6   | **Respond to Webhook**   | Retourne succès au site   | Status: 200 · Body: `{"success": true}`               |

### Template email — Confirmation client (FR)

```
Objet : Confirmation de votre réservation — L'Escale Verte

Cher(e) {{nom}},

Nous avons bien reçu votre demande de réservation et nous sommes
ravis de vous accueillir prochainement.

Récapitulatif de votre séjour :
  • Arrivée   : {{dateArrivee}}
  • Départ    : {{dateDepart}} ({{nbNuits}} nuit(s))
  • Chambre   : {{typeChambre}}
  • Personnes : {{nbPersonnes}}

Notre équipe vous contactera dans les 2 heures pour finaliser
votre réservation.

Pour toute question :
  WhatsApp : +237 6XX XXX XXX
  Email    : reservations@lescaleverte.cm

À très bientôt,
L'équipe de L'Escale Verte
```

### Template email — Alerte gérant

```
Objet : [NOUVELLE RÉSERVATION] {{typeChambre}} — {{dateArrivee}}

Nouvelle demande reçue via le site web :

  Client   : {{nom}}
  Email    : {{email}}
  Tél      : {{telephone}}
  Séjour   : {{dateArrivee}} → {{dateDepart}} ({{nbNuits}} nuits)
  Chambre  : {{typeChambre}} — {{nbPersonnes}} personne(s)
  Demandes : {{demandesSpeciales}}
  Newsletter : {{newsletter}}

⚠️ ACTION REQUISE : Confirmer la disponibilité et contacter
le client sous 2h.
```

---

## Workflow 2 — Rappel J-1 avant Arrivée

> **Priorité : P1 — Important**

- **Déclencheur** : Cron Trigger — tous les jours à **09h00** (heure Yaoundé, UTC+1)

### Logique du workflow

1. Cron déclenche le workflow chaque matin à 09h00
2. Noeud **Notion Query** : récupère toutes les fiches avec `dateArrivee = demain` ET `statut = "Confirmé"`
3. Boucle sur chaque client trouvé
4. Envoie l'email de rappel personnalisé

### Noeuds du workflow

| #   | Noeud n8n                   | Action                             | Configuration clé                                          |
| --- | --------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| 1   | **Cron**                    | Déclenchement quotidien            | Heure : `09:00` · TZ: `Africa/Douala`                      |
| 2   | **Function**                | Calcule la date de demain          | `new Date() + 1 jour` au format ISO                        |
| 3   | **Notion — Query Database** | Récupère les arrivées du lendemain | Filter: `dateArrivee = {{demain}}` AND `statut = Confirmé` |
| 4   | **IF**                      | Vérifie s'il y a des résultats     | Si 0 résultat → fin du workflow                            |
| 5   | **Loop Over Items**         | Boucle sur chaque client           | Itération sur résultats Notion                             |
| 6   | **Send Email**              | Envoie le rappel J-1               | Template rappel personnalisé                               |

### Template email — Rappel J-1

```
Objet : Votre arrivée demain à L'Escale Verte — Infos pratiques

Cher(e) {{nom}}, nous vous attendons demain !

Votre séjour :
  • Check-in  : demain {{dateArrivee}} à partir de 14h00
  • Check-out : {{dateDepart}} avant 12h00
  • Chambre   : {{typeChambre}}

Infos pratiques :
  📍 Adresse : [Adresse complète de l'hôtel], Yaoundé
  🚗 Parking : Disponible sur place, gratuit
  🕐 Réception ouverte 24h/24 — pas besoin de prévenir pour
     l'heure d'arrivée
  💬 WhatsApp réception : +237 6XX XXX XXX

Nous nous réjouissons de vous accueillir. À demain !

L'équipe de L'Escale Verte
```

---

## Workflow 3 — Gestion Avis Google

> **Priorité : P1 — Important**

- **Déclencheur** : Webhook Google My Business (via Make.com comme intermédiaire) ou polling HTTP toutes les 6h

### Noeuds du workflow

| #   | Noeud n8n                  | Action                       | Configuration clé                                         |
| --- | -------------------------- | ---------------------------- | --------------------------------------------------------- |
| 1   | **HTTP Request / Webhook** | Récupère le nouvel avis      | Polling via Google My Business API                        |
| 2   | **IF**                     | Filtre les avis récents      | Vérifie si l'avis date de moins de 24h                    |
| 3   | **Send Email**             | Alerte interne à l'équipe    | Résumé : note + auteur + texte de l'avis                  |
| 4   | **IF**                     | Analyse le sentiment         | Note ≥ 4 → réponse positive · Note ≤ 2 → réponse délicate |
| 5   | **Send Email**             | Réponse automatique suggérée | Template adapté à la note, à valider avant envoi          |

### Templates de réponse automatique

**Avis positif (4–5 étoiles) :**

```
Merci infiniment {{auteur}} pour ce magnifique avis ! C'est avec
grand plaisir que nous vous avons accueilli à L'Escale Verte. Votre
satisfaction est notre plus belle récompense. Nous espérons vous
revoir très bientôt !
```

**Avis négatif (1–2 étoiles) :**

```
Cher(e) {{auteur}}, nous sommes sincèrement désolés que votre séjour
n'ait pas répondu à vos attentes. Votre avis est précieux et nous
prenons vos remarques très au sérieux. Notre équipe prendra contact
avec vous directement pour comprendre et remédier à la situation.
Merci de nous donner l'opportunité de nous améliorer.
```

---

## Workflow 4 — Newsletter & Offres Promotionnelles

> **Priorité : P2 — Utile**

- **Déclencheur** : Manuel — déclenché par le gérant depuis l'interface n8n

### Noeuds du workflow

| #   | Noeud n8n                   | Action                               | Configuration clé                                     |
| --- | --------------------------- | ------------------------------------ | ----------------------------------------------------- |
| 1   | **Manual Trigger**          | Lancement manuel par le gérant       | Formulaire de saisie : sujet, corps du message, offre |
| 2   | **Notion — Query Database** | Récupère la liste clients newsletter | Filter: `newsletter = true` AND `statut ≠ Annulé`     |
| 3   | **IF**                      | Vérifie qu'il y a des destinataires  | Si 0 → fin du workflow                                |
| 4   | **Loop Over Items**         | Boucle sur chaque client             | Personnalisation par prénom                           |
| 5   | **Send Email**              | Envoie l'email promotionnel          | Template newsletter avec l'offre du gérant            |
| 6   | **Set**                     | Log des envois                       | Compte le nombre d'emails envoyés                     |

---

## Workflow 5 — Fiche Client (Formulaire Contact)

> **Priorité : P1 — Important**

- **Déclencheur** : Webhook POST — formulaire `/contact` du site
- **URL webhook** : `/webhook/contact-hotel`

### Noeuds du workflow

| #   | Noeud n8n                | Action                       | Configuration clé                                    |
| --- | ------------------------ | ---------------------------- | ---------------------------------------------------- |
| 1   | **Webhook**              | Reçoit le message de contact | Path: `contact-hotel`                                |
| 2   | **Notion — Create Page** | Crée une fiche prospect      | Statut: "Nouveau" · Source: "Contact Web"            |
| 3   | **Send Email**           | Accusé de réception client   | Confirmation que le message a bien été reçu sous 24h |
| 4   | **Send Email**           | Alerte équipe hôtel          | Détails du message + coordonnées client              |
| 5   | **Respond to Webhook**   | Retourne succès              | Status 200 · Body: `{"success": true}`               |

---

## Checklist de Mise en Production n8n

| #   | Tâche                                                    | Statut |
| --- | -------------------------------------------------------- | ------ |
| 1   | VPS Ubuntu commandé et configuré (SSH, firewall UFW)     | `[ ]`  |
| 2   | Docker + n8n installé et démarré                         | `[ ]`  |
| 3   | Nginx configuré comme reverse proxy                      | `[ ]`  |
| 4   | SSL Let's Encrypt activé (HTTPS)                         | `[ ]`  |
| 5   | Compte email professionnel Zoho créé                     | `[ ]`  |
| 6   | Intégration SMTP configurée dans n8n                     | `[ ]`  |
| 7   | Base Notion créée avec les bonnes propriétés             | `[ ]`  |
| 8   | Clé API Notion ajoutée dans n8n                          | `[ ]`  |
| 9   | WF-1 (Confirmation) créé et testé                        | `[ ]`  |
| 10  | WF-2 (Rappel J-1) créé et testé                          | `[ ]`  |
| 11  | WF-3 (Avis Google) créé et testé                         | `[ ]`  |
| 12  | WF-4 (Newsletter) créé et testé                          | `[ ]`  |
| 13  | WF-5 (Contact) créé et testé                             | `[ ]`  |
| 14  | URLs webhooks enregistrées dans `.env` du site Next.js   | `[ ]`  |
| 15  | Test end-to-end : formulaire site → n8n → Notion → Email | `[ ]`  |
