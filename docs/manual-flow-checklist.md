# Manuelle Flow-Checkliste

Diese Checkliste wird vor der Abgabe mit der lokalen App, Seed-Daten und Build-Version durchgegangen. Waehrend der Testingphase am 20. Mai 2026 werden Status und Screenshot-Pfade nach den Studierenden-Tests aktualisiert.

| Flow | Schritte | Erwartetes Ergebnis | Status | Screenshot |
|---|---|---|---|---|
| Home/Kategorien -> Detail | Login, Home oder Kategorien oeffnen, Aktivitaet auswaehlen, Detailseite beurteilen | Detailseite mit Galerie, Metadaten und Aktionen oeffnet; Card-Klickbarkeit wird beobachtet | bereit | `docs/screenshots/home-detail.png` |
| Wishlist -> Planung | Detailseite oeffnen, Aktivitaet speichern, in `/wishlist` wiederfinden und spaeter planen | Aktivitaet erscheint in Wishlist und anschliessend in Upcoming | bereit | `docs/screenshots/wishlist.png` |
| Kalender verschieben | Upcoming oeffnen, Kalenderansicht pruefen, geplanten Termin per Drag & Drop verschieben | Termin liegt am neuen Tag und bleibt sichtbar | bereit | `docs/screenshots/upcoming.png` |
| Abgelaufene Planung -> History | Geplanten Termin mit Datum vor heute vorbereiten, `/upcoming` oeffnen, danach `/history` pruefen | Vergangener Termin verschwindet aus Upcoming und erscheint als History-Eintrag ohne echten Reminder | bereit | `docs/screenshots/history-share.png` |
| History / vergangene Aktivitaeten | Termin als erledigt markieren, History pruefen, bewerten/bearbeiten/teilen | History-Eintrag bleibt sichtbar; echte Reminder werden als nicht aktueller MVP abgegrenzt | bereit | `docs/screenshots/history-share.png` |
| Aktivitaet erfassen | `/activities/new` oeffnen, Pflichtfeldfehler ausloesen, Bildangaben pruefen, gueltig speichern | Fehlermeldungen sind verstaendlich; Bildlogik ist klar; Redirect zur Detailseite funktioniert | bereit | `docs/screenshots/activity-create.png` |
| Map -> Planung | `/map` oeffnen, Ortschaft suchen, Aktivitaet auswaehlen, Detailseite oeffnen und planen | Karte, Preview, Detailnavigation und Planung funktionieren; Preview-Schliessen wird beobachtet | bereit | `docs/screenshots/map.png` |
| Community-Ausblick | `/community` oeffnen | Seite erklaert MVP-2-Status, Abgrenzung und naechste Community-Funktionen | bereit | `docs/screenshots/community-roadmap.png` |
| Profil | Profil bearbeiten, Kategorien setzen, Reminder-/Benachrichtigungsabgrenzung oeffnen | Modals geben Feedback; Reminder, Push und E-Mail werden klar als nicht aktueller MVP abgegrenzt | bereit | `docs/screenshots/profile.png` |
| Leere Daten | Datenbank ohne Seed-Daten oder leere Listen pruefen | Empty States erklaeren den Zustand und bieten naechste Aktion | bereit | `docs/screenshots/empty-states.png` |
| Tastatur | Per Tab durch Header, Filter, Modals und MobileNav navigieren | Fokus ist sichtbar, Escape schliesst Modals | bereit | `docs/screenshots/accessibility.png` |

## Abschlusskriterien
- `npm run build` ist erfolgreich.
- Seed-Daten lassen sich mit `npm run seed` einspielen.
- Alle zentralen Flows haben Status `bestanden` oder eine begruendete Notiz.
- Screenshots werden unter den oben genannten Pfaden abgelegt, sobald die finale Version lokal oder deployt geprueft wurde.
- Erkenntnisse aus den Studierenden-Tests sind in `docs/validate-test-plan.md` und README `3.5 Validate` zusammengefasst.
