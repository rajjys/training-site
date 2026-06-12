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

Déposer les PNG dans `screenshots/`. **Les images manquantes n'empêchent pas la formation** — un placeholder s'affiche dans le mockup téléphone.

| Fichier | Slide |
|---------|-------|
| `04-login.png` | Connexion |
| `05-tabs.png` | Navigation |
| `06-service.png` | Mise en service |
| `08-alerte.png` | Alerte mission |
| `09-intervention.png` | Intervention en cours |
| `10-mission-active.png` | En route |
| `11-signalement.png` | Signalement |
| `12-victimes.png` | Victimes |
| `13-abcde.png` | ABCDE |
| `14-constantes.png` | Constantes |
| `15-soins.png` | Premiers soins |
| `16-evacuation.png` | Évacuation |
| `17-hopital.png` | Affectation |
| `18-hopital-portail.png` | Handoff hôpital |
| `19-transport.png` | Transport |
| `20-cloture.png` | Clôture |
| `21-appels.png` | Communication |
| `22-journal.png` | Journal |
| `23-carte.png` | Carte tactique |
| `24-profil.png` | Profil (optionnel) |

Format recommandé : PNG portrait, capture native du téléphone.
