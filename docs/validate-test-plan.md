# Validate-Testplan VibeMatch

## Ziel der Testingphase
Am 20. Mai 2026 wird VibeMatch mit anderen Studierenden in kurzen moderierten Usability-Tests geprueft. Validiert wird, ob Testpersonen ohne lange Erklaerung von Inspiration zu einer passenden Aktivitaet, Entscheidung und Planung kommen.

Die Testingphase ist Teil der Projektdokumentation. Vorarbeit, Testaufbau, Beobachtungen, Erkenntnisse und daraus abgeleitete Verbesserungen werden in diesem Dokument gesammelt und in der README unter `3.5 Validate` zusammengefasst.

## Fragestellungen
| Frage | Woran wird es erkannt? |
|---|---|
| Verstehen Testpersonen sofort, was VibeMatch macht? | Sie koennen Home und Hauptnavigation in eigenen Worten erklaeren. |
| Finden sie eine passende Aktivitaet fuer ein konkretes Szenario? | Sie nutzen Schnellfilter, Kategorien oder Map und erreichen eine Detailseite. |
| Sind Detailinformationen ausreichend klar? | Preis, Dauer, Ort, Bilder, Reviews und Planungsinfos werden in der Entscheidung genannt. |
| Funktionieren Wishlist und Planung als Folgeaktion? | Aktivitaet wird gespeichert oder geplant und danach in Wishlist/Upcoming wiedergefunden. |
| Sind Teilen-Prototyp und Community-Ausblick verstaendlich abgegrenzt? | Testperson erkennt, dass Community fuer ein spaeteres MVP geplant ist. |
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

## Workflowbasierte Testaufgaben
Die Testaufgaben sind direkt aus den in der README dokumentierten User-Journey-Workflows abgeleitet. Jede Aufgabe testet einen realistischen Nutzungskontext und nicht nur eine einzelne Funktion.

| Aufgabe | README-Workflow | Aufgabenstellung fuer Testperson | Getestete Prototypteile | Beobachtungsfokus | Erfolgskriterium | Nachfragen |
|---|---|---|---|---|---|---|
| 1 | Lea / Paar-Flow: Quality Time planen | Stell dir vor, du moechtest heute eine gemeinsame Aktivitaet fuer einen entspannten Abend finden. Suche eine passende Idee, pruefe die Detailinformationen und speichere oder plane sie. | Home, Schnellfilter, Kategorien, Detailseite, Wishlist, Planung | Wird der Einstieg verstanden? Werden Preis, Dauer, Ort, Bilder und Reviews beachtet? | Testperson findet eine passende Aktivitaet und nutzt Wishlist oder Planen. | Welche Information hat deine Entscheidung beeinflusst? Was hat gefehlt? |
| 2 | Nico / First-Date-Flow: sichere Idee finden | Du planst ein erstes Date in St. Gallen. Finde eine sichere, oeffentliche Aktivitaet, pruefe Bewertungen und Ort und entscheide, ob du sie planen wuerdest. | Kategorien, Filter, Map, Detailseite, Reviews, Planungsmodal | Findet die Person Ort und Sicherheits-/Oeffentlichkeitsinformationen? Werden Reviews und Karte genutzt? | Testperson findet eine passende Aktivitaet in/bei St. Gallen und kann die Entscheidung begruenden. | Hat die App genug Vertrauen fuer ein erstes Date vermittelt? |
| 3 | Sara / Gruppen-Flow: gemeinsame Aktivitaet organisieren | Du organisierst etwas fuer eine kleine Gruppe. Finde eine Aktivitaet, die fuer mehrere Personen passt, achte auf Budget und Dauer und teile die Idee. | Kategorien, erweiterte Filter, Detailseite, Teilen-Prototyp, Upcoming | Werden Personenanzahl, Budget und Dauer gefunden? Ist Teilen als Prototyp verstaendlich? | Testperson findet eine gruppentaugliche Aktivitaet und versteht die Folgeaktion Teilen/Planen. | Was braeuchte eine Gruppe noch, um gemeinsam zu entscheiden? |
| 4 | Mia / Time-Saver-Flow: schnelle Entscheidung | Du hast wenig Zeit und moechtest moeglichst schnell eine passende Aktivitaet finden. Nutze den schnellsten Weg, den du in der App erkennst, und plane die Aktivitaet. | Home, Schnellfilter, Zuletzt angesehen, Detailseite, Planen, Upcoming | Wird ein schneller Weg erkannt? Gibt es zu viele Entscheidungen oder zu viel Text? | Testperson kommt mit wenigen Schritten zu einer geplanten Aktivitaet. | Was hat dich beschleunigt oder aufgehalten? |
| 5 | Jonas / Creator-Flow: eigene Aktivitaet sichtbar machen | Du kennst eine gute lokale Aktivitaet und moechtest sie in VibeMatch erfassen. Loese einmal bewusst einen Pflichtfeldfehler aus, korrigiere ihn und speichere die Aktivitaet. | Aktivitaet erfassen, Pflichtfeldvalidierung, Bild-Upload, Vorschau, Detailseite | Sind Labels, Fehlermeldungen, Bild-Upload und Vorschau verstaendlich? | Testperson erkennt den Fehler, korrigiert ihn und landet nach dem Speichern auf der Detailseite. | War klar, welche Angaben Pflicht sind und was nach dem Speichern passiert? |
| 6 | Community-Ausblick / MVP-Abgrenzung | Oeffne die Community-Seite und erklaere kurz, ob fuer dich klar ist, was in diesem MVP umgesetzt ist und was erst spaeter geplant ist. | Community-Ausblickseite, Navigation, MVP-Abgrenzung | Wird die Abgrenzung verstanden oder wirkt die Seite wie ein unfertiger Feed? | Testperson erkennt Community als geplantes MVP-2-Feature. | Ist die Abgrenzung glaubwuerdig und verstaendlich? |

## Aufgabenkarte Fuer Testpersonen
Diese Kurzfassung kann waehrend des Tests auf Papier, einem separaten Laptop oder Smartphone angezeigt werden.

1. Finde eine passende Aktivitaet fuer einen entspannten Abend zu zweit und speichere oder plane sie.
2. Plane ein erstes Date in St. Gallen: Suche eine sichere, oeffentliche Aktivitaet und pruefe Bewertungen und Ort.
3. Organisiere eine Aktivitaet fuer eine kleine Gruppe: Achte auf Personenanzahl, Budget, Dauer und teile die Idee.
4. Du hast wenig Zeit: Finde auf dem schnellsten Weg eine passende Aktivitaet und plane sie.
5. Erfasse eine eigene lokale Aktivitaet, loese einmal einen Pflichtfeldfehler aus und speichere danach gueltig.
6. Oeffne die Community-Seite und erklaere, was jetzt umgesetzt ist und was erst spaeter geplant ist.

## Testszenarien
| Szenario | Aufgabe an Testperson | Erfolgskriterium | Beobachtung |
|---|---|---|---|
| Einstieg | Logge dich ein und erklaere kurz, was du auf der Startseite machen kannst. | Zweck, Navigation und Einstieg sind verstaendlich. | offen |
| Aktivitaet finden | Finde eine Aktivitaet in Zuerich oder St. Gallen, die zu einem Treffen passt. | Filter oder Suche fuehren zu passender Detailseite. | offen |
| Detailentscheidung | Entscheide anhand der Detailseite, ob du diese Aktivitaet planen wuerdest. | Preis, Dauer, Ort, Bilder oder Reviews werden genutzt. | offen |
| Wishlist und Planung | Speichere die Idee und plane daraus einen Termin. | Aktivitaet erscheint in Wishlist und Upcoming. | offen |
| Map | Oeffne die Karte, waehle Ort/Filter und oeffne eine Aktivitaet ueber Marker oder Liste. | Map, Marker und Detailnavigation funktionieren. | offen |
| History und Review | Markiere einen Termin als erledigt oder bearbeite eine Erinnerung/Bewertung. | History-Eintrag und Review-Feedback sind nachvollziehbar. | offen |
| Teilen und Community-Ausblick | Pruefe den Teilen-Flow und oeffne `/community`. | Community wird als MVP-2-Ausblick verstanden. | offen |
| Aktivitaet erfassen | Erfasse eine neue Aktivitaet, loese einmal einen Pflichtfeldfehler aus und speichere danach gueltig. | Validierung, Bild-Upload und Redirect sind verstaendlich. | offen |
| Mobile optional | Nutze Navigation, Filter oder Erfassung auf Smartphonegroesse. | Mobile Navigation und Inhalte bleiben bedienbar. | offen |

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
| offen | offen | offen | umsetzen / dokumentieren / spaeteres MVP |
| offen | offen | offen | umsetzen / dokumentieren / spaeteres MVP |
| offen | offen | offen | umsetzen / dokumentieren / spaeteres MVP |
| offen | offen | offen | umsetzen / dokumentieren / spaeteres MVP |

## Erwartete Auswertung
Nach den Tests werden die wichtigsten Erkenntnisse in der README unter `3.5 Validate` zusammengefasst. Dokumentiert werden tatsaechliche Stichprobe, getestete Geraete, zentrale Huerden, positive Beobachtungen, abgeleitete Aenderungen und bewusst nicht umgesetzte Punkte.
