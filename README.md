# Formation Étoile Bleue Urgence — Training Site

Site de formation statique (HTML/CSS/JS) pour les urgentistes. Comportement type PowerPoint sur laptop : aperçus à gauche, slide active au centre, navigation clavier.

## Démarrage local

```bash
cd training-site
npx serve .
# ou : python3 -m http.server 8080
```

Ouvrir `http://localhost:3000` (ou `:8080`).

## Déploiement Vercel

1. Créer un projet Vercel pointant vers ce dossier (`training-site`)
2. Framework : **Other** (pas de build)
3. Deploy

## Navigation

| Action | Raccourci |
|--------|-----------|
| Slide suivante | `↓` `→` `Espace` `Page Down` |
| Slide précédente | `↑` `←` `Page Up` |
| Première / dernière | `Home` / `End` |
| Notes formateur | `N` |
| Plein écran | `F` |
| Masquer l'aperçu | `B` |
| Clic miniature | Aller à la slide |

URL directe : `#slide-4` pour la slide 4.

## Captures d'écran

Déposer les JPG dans `screenshots/`. **Les images manquantes n'empêchent pas la formation** — un placeholder s'affiche dans le mockup téléphone.

| Fichier | Slide |
|---------|-------|
| `04-login.jpg` | Connexion |
| `05-tabs.jpg` | Navigation |
| `06-service.jpg` | Mise en service |
| `08-alerte.jpg` | Alerte mission |
| `09-intervention.jpg` | Intervention en cours |
| `10-mission-active.jpg` | En route |
| `11-signalement.jpg` | Signalement |
| `12-victimes.jpg` | Victimes |
| `13-abcde.jpg` | ABCDE |
| `14-constantes.jpg` | Constantes |
| `15-soins.jpg` | Premiers soins |
| `16-evacuation.jpg` | Évacuation |
| `17-hopital.jpg` | Affectation |
| `18-hopital-portail.jpg` | Handoff hôpital |
| `19-transport.jpg` | Transport |
| `20-cloture.jpg` | Clôture |
| `21-appels.jpg` | Communication |
| `22-journal.jpg` | Journal |
| `23-carte.jpg` | Carte tactique |
| `24-profil.jpg` | Profil (optionnel) |

Format recommandé : JPG portrait, capture native du téléphone.
