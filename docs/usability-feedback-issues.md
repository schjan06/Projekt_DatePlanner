# GitHub-Issue-Vorlage aus Usability-Feedback

Quelle: `VibeMatch_Usability_Feedback_Erfassung.xlsx`, Testingphase vom 20.05.2026.

Diese Liste enthaelt die aus der Feedback-Datei abgeleiteten Issues. Sie ist als direkte Vorlage fuer GitHub gedacht: Titel, Beschreibung, Beobachtung, erwartetes Verhalten, Akzeptanzkriterien, Prioritaet, Labels und Bezug zur Testaufgabe sind bereits vorbereitet.

## Label-Set
`usability`, `bug`, `enhancement`, `documentation`, `mvp-2`, `validation`, `ui`, `map`, `calendar`, `activity-form`, `wishlist`, `planning`, `history`

## Issues

### 1. Aktivitaetskarten vollstaendig klickbar machen
**Beschreibung:** Aktivitaetscards sollen nicht nur ueber Bild/Titel, sondern als gesamte Karte zur Detailseite fuehren.

**Beobachtung aus dem Test:** T1 war nicht sofort klar, dass nur Bild/Titel bzw. Details zur Detailansicht fuehren.

**Erwartetes Verhalten:** Die gesamte Card ist als interaktiver Einstieg erkennbar; der Wishlist-Button bleibt separat bedienbar.

**Akzeptanzkriterien:**
- Klick auf die Card-Flaeche oeffnet die Detailseite.
- Klick auf den Wishlist-Button toggelt weiterhin nur die Wishlist.
- Tastaturfokus bleibt verstaendlich und erreichbar.

**Prioritaet:** Hoch  
**Labels:** `usability`, `ui`, `enhancement`, `validation`  
**Bezug zur Testaufgabe:** Aufgabe 1: Home/Kategorien -> Detailseite

### 2. Hover-/Preview-Effekt fuer Cards oder Details-Button pruefen
**Beschreibung:** Cards oder Details-Button sollen visuell deutlicher signalisieren, dass sie zur Detailseite fuehren.

**Beobachtung aus dem Test:** Feedback aus Aufgabe 1 nennt Preview/Hover beim Details-Bereich als Verbesserungsidee.

**Erwartetes Verhalten:** Hover/Fokus macht Interaktion erkennbar, ohne Layoutspruenge.

**Akzeptanzkriterien:**
- Hover- und Focus-State sind sichtbar.
- Es entstehen keine Layoutspruenge oder Textueberlaeufe.
- Mobile Ansicht bleibt unveraendert sauber.

**Prioritaet:** Niedrig  
**Labels:** `usability`, `ui`, `enhancement`  
**Bezug zur Testaufgabe:** Aufgabe 1: Home/Kategorien -> Detailseite

### 3. Zurueck-Button auf Detailseite ergaenzen
**Beschreibung:** Detailseiten sollen eine klare Ruecknavigation zur vorherigen Seite bzw. Home/Inspiration anbieten.

**Beobachtung aus dem Test:** Nach Einstieg ueber Home/Inspiration wurde ein Zurueck-Button gewuenscht.

**Erwartetes Verhalten:** Nutzer koennen nach Detailpruefung ohne Browser-Back sichtbar zurueck.

**Akzeptanzkriterien:**
- Button ist im Detailseiten-Kopfbereich sichtbar.
- Ruecknavigation nutzt Browser-History und faellt sonst auf `/` zurueck.
- Beschriftung ist klar und nicht mit Hauptaktionen verwechselbar.

**Prioritaet:** Mittel  
**Labels:** `usability`, `ui`, `enhancement`  
**Bezug zur Testaufgabe:** Aufgabe 2: Wishlist -> Planung

### 4. Kalenderansicht mit klarerem Symbol oder Hinweis versehen
**Beschreibung:** Upcoming/Kalender soll visuell klarer als Kalender- und Drag-&-Drop-Bereich erkennbar sein.

**Beobachtung aus dem Test:** Terminverschiebung funktionierte, aber Kalenderansicht soll ein passendes Symbol erhalten.

**Erwartetes Verhalten:** Nutzer erkennen schneller, dass Termine im Kalender verschoben werden koennen.

**Akzeptanzkriterien:**
- Kalender-Icon oder kompakter Hinweis im Kalenderkopf ist vorhanden.
- Drag & Drop bleibt unveraendert nutzbar.
- Mobile Darstellung bleibt sauber.

**Prioritaet:** Mittel  
**Labels:** `calendar`, `planning`, `ui`, `usability`  
**Bezug zur Testaufgabe:** Aufgabe 3: Upcoming/Kalender

### 5. Pflichtfeld-Fehlermeldungen im Aktivitaetsformular sichtbarer machen
**Beschreibung:** Fehlermeldungen beim Erfassen einer Aktivitaet sollen staerker auffallen.

**Beobachtung aus dem Test:** T1 bemerkte Pflichtfeldvalidierung, wuenschte aber groessere/sichtbarere Meldungen.

**Erwartetes Verhalten:** Fehler sind direkt beim Feld und zusaetzlich klar visuell wahrnehmbar.

**Akzeptanzkriterien:**
- `.field-error` ist im Aktivitaetsformular deutlicher sichtbar.
- Fehlermeldungen ueberlagern keine Labels oder Eingabefelder.
- Screenreader-/Fokusverhalten bleibt plausibel.

**Prioritaet:** Hoch  
**Labels:** `activity-form`, `usability`, `ui`, `validation`  
**Bezug zur Testaufgabe:** Aufgabe 5: Aktivitaet erfassen

### 6. Bildupload fachlich entscheiden: Pflichtfeld oder bewusst optional
**Beschreibung:** Der Bildupload soll entweder Pflicht werden oder in README/Formular klar als optional begruendet sein.

**Beobachtung aus dem Test:** T2 schlug vor, Bildupload als Pflicht zu definieren.

**Erwartetes Verhalten:** Nutzer verstehen, ob ein Bild erwartet wird und warum.

**Akzeptanzkriterien:**
- Entscheidung ist in README oder Validate-Doku dokumentiert.
- UI-Text beim Bildupload ist entsprechend angepasst.
- Falls Pflicht: serverseitige Validierung ist ergaenzt.
- Falls optional: Fallback-Bild ist fachlich erklaert.

**Prioritaet:** Mittel  
**Labels:** `activity-form`, `documentation`, `validation`, `enhancement`  
**Bezug zur Testaufgabe:** Aufgabe 5: Aktivitaet erfassen

### 7. Map-Preview schliessbar machen
**Beschreibung:** Die Detail-Preview einer ausgewaehlten Aktivitaet auf der Karte soll geschlossen werden koennen.

**Beobachtung aus dem Test:** T1 fand Map intuitiv, konnte die angewaehlte Preview aber nicht wegklicken.

**Erwartetes Verhalten:** Preview hat einen sichtbaren Schliessen-Button und kann per Escape geschlossen werden.

**Akzeptanzkriterien:**
- Close-Button mit `aria-label` ist vorhanden.
- Escape schliesst die Preview.
- Auswahl in Liste/Marker wird zurueckgesetzt.
- Marker-Auswahl funktioniert weiterhin.

**Prioritaet:** Hoch  
**Labels:** `map`, `usability`, `ui`, `bug`  
**Bezug zur Testaufgabe:** Aufgabe 6: Map -> Planung

### 8. Teilen-Funktion fuer kommende Events pruefen
**Beschreibung:** Teilen soll nicht nur bei Aktivitaeten/History, sondern auch bei kommenden geplanten Events geprueft bzw. konzipiert werden.

**Beobachtung aus dem Test:** Excel-Ueberblick nennt Teilen via WhatsApp/kommende Events als Verbesserung.

**Erwartetes Verhalten:** Bei Upcoming ist klar, ob und wie ein geplanter Termin geteilt werden kann.

**Akzeptanzkriterien:**
- Analyse und UI-Entscheidung sind dokumentiert.
- Falls umgesetzt: Share-Aktion ist am geplanten Event verfuegbar.
- Falls spaeter: Funktion ist klar als MVP-2 markiert.

**Prioritaet:** Mittel  
**Labels:** `planning`, `enhancement`, `usability`, `validation`  
**Bezug zur Testaufgabe:** Aufgabe 3/4: Upcoming und History

### 9. WhatsApp-/System-Share fuer Aktivitaeten evaluieren
**Beschreibung:** Der bestehende Teilen-Prototyp soll um realistischere Sharing-Optionen geprueft werden.

**Beobachtung aus dem Test:** Feedback nennt Teilen via WhatsApp als erwartbares Nutzungsszenario.

**Erwartetes Verhalten:** Teilen wirkt weniger wie ein reiner Community-Datenbank-Prototyp.

**Akzeptanzkriterien:**
- Entscheidung zwischen Web Share API, WhatsApp-Link oder MVP-2-Dokumentation ist getroffen.
- README-Abgrenzung ist aktualisiert.
- Bestehender Teilen-Prototyp bleibt nachvollziehbar.

**Prioritaet:** Niedrig  
**Labels:** `enhancement`, `mvp-2`, `usability`  
**Bezug zur Testaufgabe:** Aufgabe 4: History/Teilen

### 10. Freunde zu kommenden Events einladen als MVP-2 erfassen
**Beschreibung:** Einladungen von Freunden zu geplanten Events sollen als spaetere Erweiterung dokumentiert werden.

**Beobachtung aus dem Test:** Excel-Ueberblick nennt Freunde einladen fuer kommende Events.

**Erwartetes Verhalten:** Feature wird nicht halb umgesetzt, aber als nachvollziehbarer MVP-2-Ausbau gefuehrt.

**Akzeptanzkriterien:**
- Issue beschreibt Zielbild fuer spaetere Einladungen.
- README/MVP-2-Liste referenziert Gruppen-/Einladungsfunktion.
- Kein aktueller MVP-Blocker wird erzeugt.

**Prioritaet:** Niedrig  
**Labels:** `mvp-2`, `planning`, `enhancement`  
**Bezug zur Testaufgabe:** Aufgabe 3/4: Upcoming und History

### 11. History fuer vergangene Aktivitaeten begrifflich und funktional schaerfen
**Beschreibung:** History soll als Bereich fuer vergangene Aktivitaeten, Bewertungen und Erinnerungsnotizen klarer verstaendlich sein.

**Beobachtung aus dem Test:** Excel nennt "Erinnerungen anpassen zu History" und "vergangene Events/Aktivitaeten".

**Erwartetes Verhalten:** Nutzer verstehen, dass es um vergangene Aktivitaeten geht, nicht um Reminder-Benachrichtigungen.

**Akzeptanzkriterien:**
- Texte und Navigationslabel sind geprueft.
- README beschreibt History korrekt.
- UI vermeidet Begriffe, die echte Push-/Terminreminder versprechen.

**Prioritaet:** Mittel  
**Labels:** `history`, `documentation`, `usability`, `ui`  
**Bezug zur Testaufgabe:** Aufgabe 4: History

### 12. Reminder-/Erinnerungsfunktion bewusst aus MVP ausschliessen
**Beschreibung:** Echte Erinnerungen/Reminder sollen nicht umgesetzt, sondern sauber abgegrenzt werden.

**Beobachtung aus dem Test:** Excel haelt fest: "Erinnerungen nicht umsetzen".

**Erwartetes Verhalten:** Dokumentation unterscheidet History/Memory von Reminder-System.

**Akzeptanzkriterien:**
- README-Abgrenzung ist eindeutig.
- Validate-Erkenntnis nennt die Nicht-Umsetzung.
- Spaetere Reminder werden hoechstens als MVP-2-Ausblick gefuehrt.

**Prioritaet:** Mittel  
**Labels:** `documentation`, `mvp-2`, `history`, `validation`  
**Bezug zur Testaufgabe:** Aufgabe 4: History

### 13. Testaufgaben in README und Validate-Doku funktionsbezogen finalisieren
**Beschreibung:** Testaufgaben sollen professionell, zielorientiert und breiter ueber Kernfunktionen verteilt sein.

**Beobachtung aus dem Test:** Excel-Ueberblick fordert klarere, professionellere Aufgaben statt filterlastiger Varianten.

**Erwartetes Verhalten:** Aufgaben decken Home, Detail, Wishlist, Planung/Kalender, History, Aktivitaetsformular und Map ab.

**Akzeptanzkriterien:**
- README `3.5 Validate` ist aktualisiert.
- `docs/validate-test-plan.md` ist aktualisiert.
- Aufgabenkarte enthaelt die sechs finalen Aufgaben.
- Getestete Funktionen und Erkenntnisse sind dokumentiert.

**Prioritaet:** Hoch  
**Labels:** `documentation`, `validation`, `usability`  
**Bezug zur Testaufgabe:** Aufgaben 1-6
