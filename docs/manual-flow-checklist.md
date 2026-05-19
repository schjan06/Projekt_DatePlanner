# Manuelle Flow-Checkliste

Diese Checkliste wird vor der Abgabe mit der lokalen App, Seed-Daten und Build-Version durchgegangen.

| Flow | Schritte | Erwartetes Ergebnis | Status | Screenshot |
|---|---|---|---|---|
| Home -> Detail | Login, Home oeffnen, empfohlene Aktivitaet auswaehlen | Detailseite mit Galerie, Metadaten und Aktionen oeffnet | bereit | `docs/screenshots/home-detail.png` |
| Filter | `/categories` oeffnen, Stimmung/Budget/Ort setzen, Chip entfernen | Ergebnisliste und aktive Filter bleiben nachvollziehbar | bereit | `docs/screenshots/filter.png` |
| Wishlist | Detailseite oeffnen, Aktivitaet speichern, Wishlist pruefen | Aktivitaet erscheint in `/wishlist` und kann geplant werden | bereit | `docs/screenshots/wishlist.png` |
| Planen | Aktivitaet planen, Upcoming oeffnen, Liste/Kalender pruefen | Termin erscheint in Liste und Kalender | bereit | `docs/screenshots/upcoming.png` |
| Map | `/map` oeffnen, Stadt waehlen, Marker anklicken | Marker zeigt passende Aktivitaet und Detailnavigation | bereit | `docs/screenshots/map.png` |
| History -> Teilen | Termin als erledigt markieren, Erinnerung bearbeiten, Teilen-Flow pruefen | History-Eintrag bleibt sichtbar und Teilen-Feedback erscheint | bereit | `docs/screenshots/history-share.png` |
| Community-Ausblick | `/community` oeffnen | Seite erklaert MVP-2-Status, Abgrenzung und naechste Community-Funktionen | bereit | `docs/screenshots/community-roadmap.png` |
| Profil | Profil bearbeiten, Kategorien setzen, Benachrichtigungen oeffnen | Modals geben Feedback und sind per Escape schliessbar | bereit | `docs/screenshots/profile.png` |
| Leere Daten | Datenbank ohne Seed-Daten oder leere Listen pruefen | Empty States erklaeren den Zustand und bieten naechste Aktion | bereit | `docs/screenshots/empty-states.png` |
| Tastatur | Per Tab durch Header, Filter, Modals und MobileNav navigieren | Fokus ist sichtbar, Escape schliesst Modals | bereit | `docs/screenshots/accessibility.png` |

## Abschlusskriterien
- `npm run build` ist erfolgreich.
- Seed-Daten lassen sich mit `npm run seed` einspielen.
- Alle zentralen Flows haben Status `bestanden` oder eine begruendete Notiz.
- Screenshots werden unter den oben genannten Pfaden abgelegt, sobald die finale Version lokal oder deployt geprueft wurde.
