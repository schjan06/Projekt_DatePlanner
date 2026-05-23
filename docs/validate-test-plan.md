# Validate-Testplan VibeMatch

## Ziel der Testingphase
Am 20. Mai 2026 wird VibeMatch mit anderen Studierenden in kurzen moderierten Usability-Tests geprueft. Validiert wird, ob Testpersonen ohne lange Erklaerung von Inspiration zu einer passenden Aktivitaet, Entscheidung und Planung kommen.

Die Testingphase ist Teil der Projektdokumentation. Vorarbeit, Testaufbau, Beobachtungen, Erkenntnisse und daraus abgeleitete Verbesserungen werden in diesem Dokument gesammelt und in der README unter `3.5 Validate` zusammengefasst.

## Fragestellungen
| Frage | Woran wird es erkannt? |
|---|---|
| Verstehen Testpersonen sofort, was VibeMatch macht? | Sie koennen Home und Hauptnavigation in eigenen Worten erklaeren. |
| Finden sie eine passende Aktivitaet fuer ein konkretes Szenario? | Sie nutzen Home, Kategorien oder Map und erreichen eine Detailseite. |
| Sind Detailinformationen ausreichend klar? | Preis, Dauer, Ort, Bilder, Reviews und Planungsinfos werden in der Entscheidung genannt. |
| Funktionieren Wishlist und Planung als Folgeaktion? | Aktivitaet wird gespeichert oder geplant und danach in Wishlist/Upcoming wiedergefunden. |
| Ist die Kalenderverwaltung verstaendlich? | Geplante Termine koennen in Upcoming/Kalender gefunden und verschoben werden. |
| Sind History, Teilen-Flow und MVP-Abgrenzung verstaendlich? | Testperson versteht History als vergangene Aktivitaeten und echte Reminder als spaeteres MVP. |
| Wirkt die Erfassungsseite bedienbar und professionell? | Pflichtfelder, Bild-Upload, Validierung und Vorschau sind nachvollziehbar. |

## Testaufbau
| Aspekt | Festlegung |
|---|---|
| Testform | kurzer moderierter Usability-Test mit lautem Denken |
| Dauer | 8-12 Minuten pro Testperson |
| Stichprobe | 3-5 Studierende, anonymisiert als T1 bis T5 |
| Geraete | mindestens ein Desktop-Test und, falls moeglich, ein Mobile-Test |
| Testversion | lokale App mit Seed-Daten, Build-Version nach `npm run build` |
| Login | Demo-Account `demo` / `demo123` |
| Dokumentation | Beobachtungsbogen unten, Screenshots unter `docs/screenshots/` |

## Rollen
| Rolle | Aufgabe |
|---|---|
| Moderator | Begruesst, erklaert lautes Denken, stellt Aufgaben, hilft nur bei Blockaden. |
| Beobachter | Notiert Klickpfad, Huerden, Zitate, Zeit, Verbesserungsideen und Screenshots. |
| Testperson | Nutzt die App moeglichst selbststaendig und kommentiert Gedanken laut. |

## Stichprobe
| Testperson | Zielgruppenbezug | Geraet | Status | Notiz |
|---|---|---|---|---|
| T1 | Paar / Date-Planung | Mobile | geplant | nach Test ergaenzen |
| T2 | Freundesgruppe | Desktop | geplant | nach Test ergaenzen |
| T3 | wenig Zeit / schnelle Entscheidung | Mobile oder Desktop | geplant | nach Test ergaenzen |
| T4 | Gruppenorganisation | Desktop | optional | nach Test ergaenzen |
| T5 | eigene Aktivitaetsidee erfassen | Desktop | optional | nach Test ergaenzen |

## Ablauf Pro Test
1. Kurz erklaeren: Es wird der Prototyp getestet, nicht die Person.
2. Testperson mit Demo-Account einloggen lassen.
3. Aufgaben nacheinander stellen, ohne den Loesungsweg zu zeigen.
4. Beobachtungen und Zitate direkt notieren.
5. Nachfragen stellen.
6. Wichtigste Huerden und Verbesserungsideen direkt markieren.

## Funktionsbezogene Testaufgaben
Die finalen Testaufgaben wurden nach der Feedback-Erfassung ueberarbeitet. Sie testen zentrale App-Funktionen ueber mehrere Bereiche hinweg und sind nicht mehr nur unterschiedliche Filter- oder Suchwege.

| Aufgabe | Fokus | Aufgabenstellung fuer Testperson | Getestete Prototypteile | Beobachtungsfokus | Erfolgskriterium | Nachfragen |
|---|---|---|---|---|---|---|
| 1 | Inspiration und Detailentscheidung | Sie moechten eine passende Aktivitaet fuer heute auswaehlen und anhand der Detailinformationen entscheiden, ob sie zu Ihrer Situation passt. | Home, Kategorien, Aktivitaetskarten, Detailseite, Preis/Dauer/Ort/Reviews | Wird klar, welche Elemente zur Detailseite fuehren? Reichen die Detailinformationen fuer eine Entscheidung? | Testperson gelangt zur Detailseite und kann die Entscheidung begruenden. | Welche Information hat Ihre Entscheidung beeinflusst? War der Weg zur Detailseite klar? |
| 2 | Wishlist und spaetere Planung | Sie moechten eine interessante Aktivitaet fuer spaeter merken und daraus zu einem spaeteren Zeitpunkt einen konkreten Termin machen. | Detailseite, Wishlist-Button, Wishlist-Seite, Planungsmodal, Upcoming | Wird die Wishlist-Aktion gefunden? Ist klar, wie aus einer gespeicherten Idee ein Termin wird? | Aktivitaet erscheint in der Wishlist und danach als geplanter Termin. | War klar, wo gespeicherte Ideen wiedergefunden und geplant werden? |
| 3 | Upcoming und Kalenderverwaltung | Sie moechten einen bereits geplanten Termin anpassen, weil sich der Tag geaendert hat, und pruefen, ob Ihre Aenderung sichtbar bleibt. | Upcoming, Kalenderansicht, Drag & Drop, Terminbearbeitung | Wird die Kalenderansicht erkannt? Ist die Terminverschiebung verstaendlich? | Termin wird auf einen anderen Tag verschoben und bleibt dort sichtbar. | Was hat beim Anpassen des Termins geholfen oder gefehlt? |
| 4 | History, Teilen und MVP-Abgrenzung | Sie moechten nach einer durchgefuehrten Aktivitaet nachvollziehen, wo vergangene Aktivitaeten erscheinen, und dort Bewertung, Rueckblick und Teilen pruefen. | Automatische History-Uebernahme, History, Bewertung, Rueckblicksnotiz, Teilen-Flow, MVP-Abgrenzung | Ist History als vergangene Aktivitaeten verstaendlich? Werden Reminder-Erwartungen vermieden? | Testperson versteht History, findet vergangene Aktivitaeten und kann Reminder als nicht umgesetztes MVP einordnen. | War der Unterschied zwischen History/Rueckblicksnotiz und echten Remindern klar? |
| 5 | Aktivitaet erfassen und Validierung | Sie moechten eine eigene lokale Aktivitaetsidee erfassen und pruefen, ob die App Sie bei fehlenden Pflichtangaben und Bildangaben verstaendlich unterstuetzt. | Aktivitaet erfassen, Pflichtfelder, Fehlermeldungen, Bild-Upload, Vorschau, Redirect | Sind Fehlermeldungen sichtbar genug? Ist klar, dass Bilder fuer neue Aktivitaeten Pflicht sind? | Testperson erkennt Fehler, korrigiert sie und versteht die Bildlogik. | Welche Fehlermeldung war hilfreich oder zu unauffaellig? |
| 6 | Karte und ortsbasierte Planung | Sie moechten in einer bestimmten Ortschaft ueber die Karte eine passende Aktivitaet auswaehlen und daraus eine Planung starten. | Map, Ortsuche, Filter, Marker, Map-Preview, Detailseite, Planungsmodal | Ist Ortsuche intuitiv? Kann die Preview wieder verlassen werden? Fuehrt die Karte zur Planung? | Testperson findet eine Aktivitaet ueber die Karte und kann sie planen. | War die Karten-Preview kontrollierbar und verstaendlich? |

## Aufgabenkarte Fuer Testpersonen
Diese Kurzfassung kann waehrend des Tests auf Papier, einem separaten Laptop oder Smartphone angezeigt werden.

1. Sie moechten eine passende Aktivitaet fuer heute auswaehlen und anhand der Detailinformationen entscheiden, ob sie zu Ihrer Situation passt.
2. Sie moechten eine interessante Aktivitaet fuer spaeter merken und daraus zu einem spaeteren Zeitpunkt einen konkreten Termin machen.
3. Sie moechten einen bereits geplanten Termin anpassen, weil sich der Tag geaendert hat, und pruefen, ob Ihre Aenderung sichtbar bleibt.
4. Sie moechten nach einer durchgefuehrten Aktivitaet nachvollziehen, wo vergangene Aktivitaeten erscheinen, und dort Bewertung, Rueckblick und Teilen pruefen.
5. Sie moechten eine eigene lokale Aktivitaetsidee erfassen und pruefen, ob die App Sie bei fehlenden Pflichtangaben und Bildangaben verstaendlich unterstuetzt.
6. Sie moechten in einer bestimmten Ortschaft ueber die Karte eine passende Aktivitaet auswaehlen und daraus eine Planung starten.

## Testszenarien
| Szenario | Aufgabe an Testperson | Erfolgskriterium | Beobachtung |
|---|---|---|---|
| Inspiration -> Detail | Sie moechten eine passende Aktivitaet fuer heute auswaehlen und anhand der Detailinformationen entscheiden, ob sie zu Ihrer Situation passt. | Detailseite wird erreicht und Informationen werden verstanden. | T1 fand die Aufgabe schnell, war aber bei Card-Klickbarkeit unsicher. |
| Merken -> Planung | Sie moechten eine interessante Aktivitaet fuer spaeter merken und daraus zu einem spaeteren Zeitpunkt einen konkreten Termin machen. | Aktivitaet erscheint in Wishlist und Upcoming. | T1 fand den Flow schnell; Zuruecknavigation von Detailseite wurde gewuenscht. |
| Termin anpassen | Sie moechten einen bereits geplanten Termin anpassen, weil sich der Tag geaendert hat, und pruefen, ob Ihre Aenderung sichtbar bleibt. | Termin wird verschoben und bleibt sichtbar. | T1 konnte Drag & Drop nutzen; Kalender-Hinweis/Icon wurde gewuenscht. |
| Vergangene Aktivitaeten | Sie moechten nach einer durchgefuehrten Aktivitaet nachvollziehen, wo vergangene Aktivitaeten erscheinen, und dort Bewertung, Rueckblick und Teilen pruefen. | History ist als vergangene Aktivitaeten verstaendlich. | Aus Feedback: Erinnerungen nicht als echte Reminder umsetzen, sondern als History schaerfen. |
| Eigene Aktivitaet | Sie moechten eine eigene lokale Aktivitaetsidee erfassen und pruefen, ob die App Sie bei fehlenden Pflichtangaben und Bildangaben verstaendlich unterstuetzt. | Fehler werden erkannt und korrigierbar dargestellt. | T1 fand Fehlerhinweis, wuenschte ihn groesser; T2 regte Bildpflicht an. |
| Karte -> Planung | Sie moechten in einer bestimmten Ortschaft ueber die Karte eine passende Aktivitaet auswaehlen und daraus eine Planung starten. | Karte, Preview, Detailseite und Planung funktionieren. | T1 fand den Flow intuitiv; Map-Preview konnte nicht geschlossen werden. |

## Nachfragen
- Was war der Zweck der App aus deiner Sicht?
- Wo warst du unsicher oder musstest du suchen?
- Welche Information hat dir fuer die Entscheidung gefehlt?
- Welche Seite wirkte am ueberzeugendsten?
- Welche Seite wirkte am unfertigsten?
- War verstaendlich, dass Community erst fuer ein spaeteres MVP geplant ist?
- Was wuerdest du vor der Abgabe am ehesten verbessern?

## Beobachtungsbogen
| Testperson | Erfolgreiche Szenarien | Huerden / Zitate | Verbesserungsidee | Ergebnis |
|---|---:|---|---|---|
| T1 | offen | offen | offen | nach Durchfuehrung eintragen |
| T2 | offen | offen | offen | nach Durchfuehrung eintragen |
| T3 | offen | offen | offen | nach Durchfuehrung eintragen |
| T4 | optional | optional | optional | nach Durchfuehrung eintragen |
| T5 | optional | optional | optional | nach Durchfuehrung eintragen |

## Auswertungsvorlage
| Erkenntnis | Beobachtung aus Test | Auswirkung | Entscheidung |
|---|---|---|---|
| Aktivitaetskarten wirken nicht vollstaendig klickbar. | T1 erkannte nicht sofort, dass Bild/Titel zur Detailseite fuehren. | Einstieg zur Detailseite kann stocken. | GitHub-Issue: Card-Klickbarkeit und Hover/Fokus verbessern. |
| Wishlist, Planung, Kalender und Map wurden grundsaetzlich verstanden. | T1 fand diese Flows schnell und konnte Drag & Drop sowie Map-Ortssuche nutzen. | Kernflows sind validierbar und koennen dokumentiert werden. | In README als positive Beobachtung festhalten. |
| Einzelne UI-Hinweise sind zu schwach. | Kalender braucht klareres Symbol; Formularfehler sollten sichtbarer sein; Map-Preview braucht Close-Aktion. | Bedienbarkeit leidet trotz funktionalem Flow. | Hoch/mittel priorisierte Usability-Issues erstellen. |
| Reminder und Freunde-Einladung sind nicht aktueller MVP. | Excel-Feedback nennt Erinnerungen nicht umsetzen und Freunde zu Events einladen als Idee. | Abgrenzung muss dokumentiert werden. | Reminder als bewusst ausgeschlossen dokumentieren; Freunde einladen als MVP-2-Issue. |

## Erwartete Auswertung
Nach den Tests werden die wichtigsten Erkenntnisse in der README unter `3.5 Validate` zusammengefasst. Dokumentiert werden tatsaechliche Stichprobe, getestete Geraete, zentrale Huerden, positive Beobachtungen, abgeleitete Aenderungen und bewusst nicht umgesetzte Punkte.
