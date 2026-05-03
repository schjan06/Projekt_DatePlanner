# Codex Instructions – VibeMatch Prototyping-Projekt

## 1. Projektziel

Erstelle eine moderne Web-App mit dem Namen **VibeMatch**.  
VibeMatch ist eine Plattform, auf der Nutzerinnen und Nutzer Aktivitäten für Paare, Freunde oder Gruppen entdecken, filtern, speichern, planen, bewerten und teilen können.

Der Fokus liegt nicht auf klassischem Dating oder Partner-Matching, sondern auf **Inspiration für gemeinsame Aktivitäten**. Die Webseite soll helfen, schneller passende Ideen zu finden, diese nach persönlichen Kriterien zu filtern und geplante oder vergangene Aktivitäten übersichtlich zu verwalten.

Die Anwendung ist ein Prototyp für das Modul **Prototyping** und soll mehrere realistische Screens/Pages enthalten. Die App muss visuell sauber, klickbar und nachvollziehbar aufgebaut sein.

---

## 2. Fachlicher Hintergrund und Problemstellung

Viele Menschen kennen das Problem, dass sie zwar etwas unternehmen möchten, aber nicht genau wissen, was. Besonders bei Paaren, Freundesgruppen oder kleinen Gruppen entstehen oft Fragen wie:

- Was könnten wir heute machen?
- Was passt zu unserem Budget?
- Was ist in der Nähe?
- Was eignet sich für 2 Personen oder eine Gruppe?
- Welche Aktivität ist romantisch, kreativ, aktiv oder entspannt?
- Was wollten wir schon lange einmal machen?
- Was haben wir bereits gemacht und wie war es?

VibeMatch löst dieses Problem durch eine Inspirationsplattform mit Filterfunktionen, Wishlist, Planung, Bewertungen, Kartenansicht und Community-Elementen.

---

## 3. Zielgruppen

Die App soll für mehrere Zielgruppen funktionieren:

### Primäre Zielgruppen

1. **Paare**
   - suchen Dateideen
   - möchten neue Aktivitäten entdecken
   - möchten gemeinsame Erinnerungen sammeln

2. **Freunde und kleine Gruppen**
   - suchen Freizeitaktivitäten
   - möchten Ideen miteinander teilen
   - möchten gemeinsam planen

### Sekundäre Zielgruppen

3. **Singles / First Dates**
   - suchen neutrale, einfache und sichere Aktivitäten
   - möchten Inspiration für Treffen erhalten

4. **Personen mit wenig Zeit**
   - möchten schnell passende Vorschläge erhalten
   - benötigen Filter nach Ort, Preis, Dauer und Stimmung

---

## 4. Zentrale User Needs

Die Webseite soll folgende Bedürfnisse abdecken:

- Schnelle Inspiration für Aktivitäten
- Aktivitäten nach Kategorien filtern
- Aktivitäten nach Preis, Dauer, Ort, Anzahl Personen, Bewertung und Stimmung filtern
- Details zu einer Aktivität anzeigen
- Aktivitäten zur Wishlist hinzufügen
- Geplante Aktivitäten verwalten
- Vergangene Aktivitäten sehen und bewerten
- Aktivitäten mit anderen Personen teilen
- Aktivitäten auf einer Karte anzeigen
- Ein persönliches Profil mit Statistiken anzeigen

---

## 5. Gewünschter Tech Stack

Nutze für die Umsetzung vorzugsweise:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Lucide React Icons**
- Optional: **Framer Motion** für kleine Animationen
- Optional: **Google Maps Embed / Leaflet / statische Map-Komponente** für den Karten-Prototyp

Falls kein echtes Backend benötigt wird, arbeite mit:

- lokalen Mock-Daten in `src/data/activities.ts`
- React State
- optional `localStorage` für Wishlist und geplante Aktivitäten

---

## 6. Allgemeine Design-Richtung

Die App soll einen modernen, freundlichen und leicht spielerischen Look haben.

### Stil

- Hell, sauber, modern
- Viel Weissraum
- Abgerundete Cards
- Weiche Schatten
- Klare Navigation
- Akzentfarbe: Violett/Lila
- Sekundärfarben: sehr helle Pastellfarben
- Gute Lesbarkeit
- Mobile-first, aber auch als Desktop-Webseite nutzbar

### Visuelle Orientierung

Orientiere dich an einem Dashboard-/Web-App-Stil mit:

- linker Sidebar auf Desktop
- oberer Suchleiste
- Karten/Cards für Aktivitäten
- Badges für Kategorien
- Icons für Preis, Dauer, Ort, Bewertung und Personenanzahl
- klaren Call-to-Action Buttons

---

## 7. Navigationsstruktur

Die App soll folgende Hauptnavigation besitzen:

1. **Home / Inspiration**
2. **Kategorien & Filter**
3. **Karte**
4. **Wishlist**
5. **Kommende Aktivitäten**
6. **Vergangene Aktivitäten**
7. **Community / Teilen**
8. **Profil**

Die Navigation soll auf Desktop als Sidebar umgesetzt werden.  
Auf Mobile kann sie als Bottom Navigation oder kompakte Navigation umgesetzt werden.

---

## 8. Benötigte Pages / Screens

### 8.1 Home / Inspiration Feed

Route: `/`

Ziel: Nutzerinnen und Nutzer sollen direkt Inspiration erhalten.

Inhalte:

- Begrüssung / Hero-Bereich
- Suchfeld: Suche nach Aktivitäten, Orten oder Stimmung
- Standortauswahl, z. B. Zürich, St. Gallen, Winterthur
- Bereich "Für dich empfohlen"
- Karten mit Aktivitäten
- Bereich "Beliebte Kategorien"
- Tipp des Tages
- Button oder Link zu Kategorien/Filter

Aktivitätskarten sollen anzeigen:

- Bild
- Titel
- Kategorie-Badges
- Bewertung
- Preis
- Ort oder Indoor/Outdoor
- Wishlist-Herz

Beispiele für Aktivitäten:

- Sunset Picknick am See
- Keramik Workshop für Zwei
- Minigolf Abend
- Escape Room Challenge
- Paint & Wine Night
- Kletterhalle Besuch
- Street Food Tour
- Sternenhimmel beobachten
- Pizza & Drinks
- Bowling Night

---

### 8.2 Aktivitäts-Detailseite

Route: `/activity/:id`

Ziel: Eine einzelne Aktivität detailliert darstellen.

Inhalte:

- grosses Hero-Bild
- Titel der Aktivität
- Bewertung
- Anzahl Bewertungen
- Kategorie-Badges
- Kurzbeschreibung
- Preis
- Dauer
- Ort
- beste Zeit / Saison
- Anzahl Personen
- Buttons:
  - "Zur Wishlist hinzufügen"
  - "Planen"
  - "Teilen"
- Tabs oder Abschnitte:
  - Überblick
  - Tipps
  - Bewertungen
  - Fotos
- Liste "Was ihr braucht"
- Ähnliche Aktivitäten
- Rezensionen mit Sternebewertung und Kommentar

Wichtig: Der Begriff ist **Rezensionen** oder **Bewertungen**, nicht "Rezessionen".

---

### 8.3 Kategorien & Filter

Route: `/categories`

Ziel: Nutzerinnen und Nutzer können Aktivitäten gezielt suchen und einschränken.

Filtermöglichkeiten:

- Kategorie
  - Romantisch
  - Aktiv
  - Kreativ
  - Essen & Trinken
  - Abenteuer
  - Entspannung
  - Draussen
  - Indoor
- Preis
  - Kostenlos
  - CHF
  - CHF CHF
  - CHF CHF CHF
- Dauer
  - Kurz, unter 1h
  - 1–3h
  - Halber Tag
  - Ganzer Tag
- Ort
  - beliebiger Ort
  - Zürich
  - St. Gallen
  - Winterthur
  - Luzern
  - Umgebung
- Umkreis
- Beste Zeit
  - Frühling
  - Sommer
  - Herbst
  - Winter
  - Abend
  - Wochenende
- Stimmung
  - Entspannt
  - Abenteuerlustig
  - Romantisch
  - Gesellig
  - Kreativ
- Anzahl Personen
  - 2 Personen
  - 3–4 Personen
  - Gruppe
- Bewertung
  - ab 3 Sterne
  - ab 4 Sterne
  - ab 4.5 Sterne

Die Filter sollen sichtbare Auswirkungen auf die Aktivitätsliste haben.

---

### 8.4 Wishlist

Route: `/wishlist`

Ziel: Gespeicherte Aktivitäten anzeigen.

Inhalte:

- Titel "Meine Wishlist"
- kurze Beschreibung
- Liste gespeicherter Aktivitäten
- Aktivitätsbild
- Titel
- Kategorien
- Preis
- Ort
- Herz zum Entfernen
- Drei-Punkte-Menü
- Button "Planen" oder "In kommende Aktivitäten verschieben"
- Hinweisbox: "Tipp: Verschiebe Ideen in Kommende, wenn ihr sie plant."

---

### 8.5 Kommende Aktivitäten / Geplante Aktivitäten

Route: `/upcoming`

Ziel: Geplante Aktivitäten anzeigen.

Inhalte:

- Titel "Kommende Aktivitäten"
- Tabs:
  - Geplant
  - Kalenderansicht
- Aktivitäten als Liste mit Datumsblock
- Datum
- Uhrzeit
- Ort
- Aktivitätsbild
- Titel
- Button "Details"
- Drei-Punkte-Menü
- Button "Neue Aktivität planen"

Beispiele:

- Minigolf Abend
- Pizza & Drinks
- Escape Room Challenge

---

### 8.6 Vergangene Aktivitäten / Erinnerungen

Route: `/history`

Ziel: Bereits gemachte Aktivitäten anzeigen und als Erinnerungen speichern.

Inhalte:

- Titel "Vergangene Aktivitäten"
- Grid mit vergangenen Aktivitäten
- Bild
- Titel
- Datum
- Bewertung
- Favoriten-Herz
- Button "Erinnerungen teilen"
- Möglichkeit, Bewertung oder Kommentar zu hinterlegen

---

### 8.7 Community / Ideen teilen

Route: `/community`

Ziel: Nutzerinnen und Nutzer können Aktivitäten oder Erinnerungen mit anderen teilen.

Inhalte:

- Tabs:
  - Entdecken
  - Folge ich
  - Meine Beiträge
- Community Feed
- Beitrag mit:
  - Profilbild
  - Name
  - Ort
  - Datum
  - Text
  - Bildcollage
  - Likes
  - Kommentare
  - Speichern-Icon
- Button "Idee teilen"

Zusätzlich soll es eine Seite oder ein Modal geben:

Route optional: `/share/:id`

Formular "Idee teilen":

- Aktivität auswählen
- Nachricht hinzufügen
- Personen hinzufügen
- Sichtbarkeit auswählen
  - Privat
  - Nur mit Link
  - Öffentlich
- Button "Link kopieren" oder "Teilen"

---

### 8.8 Karte / Map

Route: `/map`

Ziel: Aktivitäten räumlich anzeigen.

Inhalte:

- Karte mit Pins
- Seitenpanel oder Card-Liste mit Aktivitäten
- Filter nach Ort, Kategorie, Preis und Dauer
- Klick auf Pin öffnet Aktivitätsvorschau
- Button zur Detailseite

Da es sich um einen Prototyp handelt, kann die Karte zunächst simuliert werden:

- statisches Kartenlayout mit Pins
- Leaflet-Karte mit Mock-Koordinaten
- oder Google Maps Embed mit daneben platzierten Activity Cards

Aktivitäten sollen Koordinaten oder zumindest Ortsinformationen besitzen.

---

### 8.9 Profil & Einstellungen

Route: `/profile`

Ziel: Persönliche Übersicht und Einstellungen.

Inhalte:

- Profilbild
- Name
- Ort
- Mitglied seit
- Button "Profil bearbeiten"
- Statistiken:
  - Kommende Aktivitäten
  - Ideen in Wishlist
  - Vergangene Aktivitäten
  - Durchschnittliche Bewertung
- Menüpunkte:
  - Einstellungen
  - Benachrichtigungen
  - Hilfe & Support
  - Ausloggen
- Box "Freunde einladen"

---

## 9. Datenmodell / Mock-Daten

Lege eine zentrale Datei für Beispieldaten an:

`src/data/activities.ts`

### Activity Type

```ts
export type Activity = {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery?: string[];
  categories: string[];
  priceLevel: 0 | 1 | 2 | 3;
  priceText: string;
  duration: string;
  location: string;
  city: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  rating: number;
  reviewCount: number;
  bestTime?: string[];
  season?: string[];
  people: string;
  indoorOutdoor: "Indoor" | "Outdoor" | "Beides";
  mood: string[];
  tips?: string[];
  requirements?: string[];
};
```

### Review Type

```ts
export type Review = {
  id: string;
  activityId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};
```

### PlannedActivity Type

```ts
export type PlannedActivity = {
  id: string;
  activityId: string;
  date: string;
  time: string;
  location: string;
  notes?: string;
};
```

### CommunityPost Type

```ts
export type CommunityPost = {
  id: string;
  userName: string;
  userLocation: string;
  avatar: string;
  activityId: string;
  text: string;
  images: string[];
  likes: number;
  comments: number;
  createdAt: string;
};
```

---

## 10. Komponentenstruktur

Erstelle wiederverwendbare Komponenten:

```txt
src/
  components/
    layout/
      AppLayout.tsx
      Sidebar.tsx
      Topbar.tsx
      MobileNav.tsx
    activities/
      ActivityCard.tsx
      ActivityGrid.tsx
      ActivityListItem.tsx
      ActivityDetailHeader.tsx
      ActivityMeta.tsx
      RatingStars.tsx
      CategoryBadge.tsx
    filters/
      FilterPanel.tsx
      FilterButton.tsx
      PriceFilter.tsx
      DurationFilter.tsx
    community/
      CommunityPostCard.tsx
      ShareIdeaModal.tsx
    map/
      ActivityMap.tsx
      MapPin.tsx
    profile/
      StatCard.tsx
```

---

## 11. Interaktionen

Die folgenden Interaktionen sollen im Prototyp funktionieren:

### Navigation

- Klick auf Sidebar-Menüpunkte wechselt die Page.
- Klick auf Aktivitätskarte öffnet Detailseite.

### Wishlist

- Klick auf Herz speichert Aktivität in Wishlist.
- Erneuter Klick entfernt Aktivität aus Wishlist.
- Wishlist-Zustand soll mindestens während der Session erhalten bleiben.
- Optional: Persistenz über `localStorage`.

### Filter

- Filterauswahl verändert die angezeigten Aktivitäten.
- Es soll einen Button "Filter zurücksetzen" geben.
- Anzahl gefundener Ideen soll angezeigt werden, z. B. "Ideen anzeigen (42)".

### Planen

- Auf Detailseite Button "Planen".
- Öffnet Modal oder Formular.
- Nutzer kann Datum, Uhrzeit und Notiz erfassen.
- Aktivität erscheint danach in "Kommende Aktivitäten".

### Bewerten

- Bei vergangenen Aktivitäten kann eine Bewertung angezeigt werden.
- Optional kann ein Review-Formular simuliert werden.

### Teilen

- Button "Teilen" öffnet Share-Dialog.
- Nutzer kann Nachricht und Sichtbarkeit wählen.
- Button "Link kopieren" oder "Teilen" zeigt Erfolgsmeldung.

### Karte

- Klick auf Map-Pin zeigt kleine Vorschau.
- Klick auf Vorschau führt zur Detailseite.

---

## 12. Routing

Nutze React Router mit diesen Routen:

```tsx
/
 /activity/:id
 /categories
 /map
 /wishlist
 /upcoming
 /history
 /community
 /profile
```

Optional:

```tsx
/share/:id
```

---

## 13. Content-Beispiele

Nutze realistische Schweizer Orte:

- Zürich
- St. Gallen
- Winterthur
- Luzern
- Rapperswil
- Bodensee
- Säntisregion
- Uetliberg
- Altstadt St. Gallen
- Zürichsee

Beispiele für Aktivitäten:

1. Sunset Picknick am See
2. Keramik Workshop für Zwei
3. Minigolf Abend
4. Escape Room Challenge
5. Paint & Wine Night
6. Kletterhalle Besuch
7. Street Food Tour
8. Sternenhimmel beobachten
9. Bowling Night
10. Pizza & Drinks
11. Kunstmuseum Besuch
12. Spaziergang mit Kaffee-Stopp
13. Outdoor Fondue Abend
14. Brunch am Sonntag
15. Alpaka Spaziergang

---

## 14. Anforderungen an Usability

Die App soll einfach verständlich sein.

Wichtig:

- Jede Page hat einen klaren Titel.
- Die wichtigsten Aktionen sind gut sichtbar.
- Filter sind einfach bedienbar.
- Cards sind klickbar.
- Der Status von Wishlist und geplanten Aktivitäten ist visuell erkennbar.
- Keine überladenen Screens.
- Die Anwendung soll ohne Erklärung bedienbar sein.
- Die App soll auf Desktop und Mobile funktionieren.

---

## 15. Anforderungen an Barrierefreiheit

- Genügend Farbkontrast
- Buttons mit klaren Labels
- Formulare mit Labels
- Bilder mit sinnvollen Alt-Texten
- Fokuszustände für Tastaturnavigation
- Keine rein farbbasierte Informationsvermittlung

---

## 16. Umsetzungsschritte

Arbeite schrittweise:

### Phase 1 – Grundstruktur

- Vite + React + TypeScript Projekt erstellen
- Tailwind einrichten
- React Router einrichten
- AppLayout mit Sidebar erstellen
- Mock-Daten anlegen

### Phase 2 – Hauptseiten

- Home Page
- Detail Page
- Kategorien & Filter
- Wishlist
- Kommende Aktivitäten
- Vergangene Aktivitäten

### Phase 3 – Erweiterte Seiten

- Community Page
- Share Modal oder Share Page
- Map Page
- Profile Page

### Phase 4 – Interaktionen

- Wishlist State
- Filterlogik
- Planen-Modal
- Teilen-Modal
- Review-Anzeige
- Map-Pin-Vorschau

### Phase 5 – Feinschliff

- Responsive Design
- Animationen
- Hover States
- Empty States
- kleine Erfolgsmeldungen
- Konsistenz der Abstände, Farben und Typografie

---

## 17. Qualitätskriterien

Der finale Prototyp soll:

- optisch professionell wirken
- mehrere vollständige Pages enthalten
- realistische Daten verwenden
- klar navigierbar sein
- die wichtigsten User Flows unterstützen
- eine erkennbare visuelle Identität besitzen
- für eine Präsentation oder einen Video-Walkthrough geeignet sein

---

## 18. Wichtige User Flows für den Video-Walkthrough

### Flow 1: Inspiration finden

1. User startet auf Home.
2. User sieht empfohlene Aktivitäten.
3. User klickt auf eine Aktivität.
4. Detailseite öffnet sich.

### Flow 2: Aktivität speichern

1. User öffnet Detailseite.
2. User klickt auf "Zur Wishlist hinzufügen".
3. User wechselt zur Wishlist.
4. Aktivität ist dort sichtbar.

### Flow 3: Aktivität planen

1. User öffnet eine Aktivität.
2. User klickt auf "Planen".
3. User wählt Datum und Uhrzeit.
4. Aktivität erscheint unter "Kommende Aktivitäten".

### Flow 4: Aktivitäten filtern

1. User geht zu Kategorien & Filter.
2. User wählt Kategorie, Preis, Dauer und Ort.
3. Ergebnisliste wird aktualisiert.
4. User öffnet passende Aktivität.

### Flow 5: Aktivität auf Karte entdecken

1. User öffnet Map.
2. User sieht Pins auf der Karte.
3. User klickt auf Pin.
4. Aktivitätsvorschau erscheint.
5. User öffnet Detailseite.

### Flow 6: Erinnerung teilen

1. User öffnet vergangene Aktivitäten.
2. User wählt eine Aktivität.
3. User klickt auf "Erinnerungen teilen".
4. Share-Dialog öffnet sich.
5. Beitrag erscheint im Community Feed.

---

## 19. Tonalität und Texte

Die Sprache soll freundlich, direkt und motivierend sein.

Beispiele:

- "Finde dein nächstes unvergessliches Erlebnis."
- "Lass dich inspirieren und plane besondere Momente."
- "Speichere Ideen, die du später machen möchtest."
- "Entdecke Aktivitäten in deiner Nähe."
- "Teile deine schönsten Erinnerungen mit anderen."

---

## 20. Nicht umsetzen / vermeiden

- Kein echtes Login-System nötig
- Kein echtes Zahlungs- oder Buchungssystem nötig
- Kein komplexes Backend nötig
- Keine echte Google-API zwingend erforderlich
- Kein Fokus auf romantisches Dating allein
- Kein reines Matching-System als Hauptfunktion
- Keine überladenen Screens mit zu vielen Informationen

---

## 21. Erwartetes Ergebnis

Am Ende soll eine lauffähige React-Web-App entstehen, die als Prototyp für das Modul Prototyping verwendet werden kann.

Die App soll mindestens diese Pages vollständig enthalten:

- Home / Inspiration Feed
- Aktivitäts-Detailseite
- Kategorien & Filter
- Wishlist
- Kommende Aktivitäten
- Vergangene Aktivitäten
- Community / Teilen
- Karte
- Profil

Die App soll mit Mock-Daten funktionieren und visuell dem bestehenden VibeMatch-Prototyp folgen.
