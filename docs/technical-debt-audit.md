# Technical-Debt-Audit

## Ergebnis
Die in Issue #13 genannten Kandidaten wurden auf Nutzung und Risiko geprueft.

| Kandidat | Entscheidung | Begruendung |
|---|---|---|
| `src/lib/components/filters/FilterChip.svelte` | entfernt | Keine Imports im Projekt; aktive Filterchips werden direkt in `FilterPanel.svelte` gerendert |
| `src/lib/components/filters/SegmentedControl.svelte` | entfernt | Keine Imports im Projekt; bestehende Reiter und Auswahlbuttons sind lokal umgesetzt |
| `src/lib/utils/activityFilters.js` | behalten | `priceGroup()` und Filteroptionen werden von Home und Map genutzt |
| `src/lib/data/activities.js` | behalten | Seed-Daten und Kategorien werden von Seed-Skript und Map verwendet |
| `src/routes/api/history/share/+server.js` | behalten | API bleibt als dokumentierter Share-Endpunkt fuer History und den Teilen-Flow bestehen und wurde validiert |

## Nacharbeit
Bei kuenftigen Refactorings sollte erneut `rg "Komponentenname"` genutzt werden, bevor Dateien entfernt werden. Bei Routen ist zusaetzlich zu pruefen, ob sie in README, Diagrammen oder manuellen Testflows referenziert sind.
