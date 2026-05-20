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
| 1 | Lea / Paar-Flow: Quality Time planen | Sie moechten heute eine passende Aktivitaet fuer einen entspannten Abend zu zweit finden und entscheiden, ob Sie diese speichern oder direkt planen. | Home, Schnellfilter, Kategorien, Detailseite, Wishlist, Planung | Wird der Einstieg verstanden? Werden Preis, Dauer, Ort, Bilder und Reviews beachtet? | Testperson findet eine passende Aktivitaet und nutzt Wishlist oder Planen. | Welche Information hat Ihre Entscheidung beeinflusst? Was hat gefehlt? |
| 2 | Nico / First-Date-Flow: sichere Idee finden | Sie moechten ein erstes Date in St. Gallen planen und herausfinden, ob eine Aktivitaet sicher, oeffentlich und gut erreichbar wirkt. | Kategorien, Filter, Map, Detailseite, Reviews, Planungsmodal | Findet die Person Ort und Sicherheits-/Oeffentlichkeitsinformationen? Werden Reviews und Karte genutzt? | Testperson findet eine passende Aktivitaet in/bei St. Gallen und kann die Entscheidung begruenden. | Hat die App genug Vertrauen fuer ein erstes Date vermittelt? |
| 3 | Sara / Gruppen-Flow: gemeinsame Aktivitaet organisieren | Sie moechten eine Aktivitaet fuer eine kleine Gruppe organisieren und dabei Budget, Dauer und Gruppentauglichkeit beruecksichtigen. | Kategorien, erweiterte Filter, Detailseite, Teilen-Prototyp, Upcoming | Werden Personenanzahl, Budget und Dauer gefunden? Ist Teilen als Prototyp verstaendlich? | Testperson findet eine gruppentaugliche Aktivitaet und versteht die Folgeaktion Teilen/Planen. | Was braeuchte eine Gruppe noch, um gemeinsam zu entscheiden? |
| 4 | Mia / Time-Saver-Flow: schnelle Entscheidung | Sie haben wenig Zeit und moechten moeglichst schnell zu einer passenden Aktivitaet kommen, die Sie direkt planen koennen. | Home, Schnellfilter, Zuletzt angesehen, Detailseite, Planen, Upcoming | Wird ein schneller Weg erkannt? Gibt es zu viele Entscheidungen oder zu viel Text? | Testperson kommt mit wenigen Schritten zu einer geplanten Aktivitaet. | Was hat Sie beschleunigt oder aufgehalten? |
| 5 | Jonas / Creator-Flow: eigene Aktivitaet sichtbar machen | Sie moechten eine eigene lokale Aktivitaet erfassen und pruefen, ob die App Sie bei fehlenden Pflichtangaben verstaendlich unterstuetzt. | Aktivitaet erfassen, Pflichtfeldvalidierung, Bild-Upload, Vorschau, Detailseite | Sind Labels, Fehlermeldungen, Bild-Upload und Vorschau verstaendlich? | Testperson erkennt den Fehler, korrigiert ihn und landet nach dem Speichern auf der Detailseite. | War klar, welche Angaben Pflicht sind und was nach dem Speichern passiert? |
| 6 | Community-Ausblick / MVP-Abgrenzung | Sie moechten verstehen, welche Community-Funktionen im aktuellen MVP enthalten sind und was erst fuer eine spaetere Version geplant ist. | Community-Ausblickseite, Navigation, MVP-Abgrenzung | Wird die Abgrenzung verstanden oder wirkt die Seite wie ein unfertiger Feed? | Testperson erkennt Community als geplantes MVP-2-Feature. | Ist die Abgrenzung glaubwuerdig und verstaendlich? |

## Aufgabenkarte Fuer Testpersonen
Diese Kurzfassung kann waehrend des Tests auf Papier, einem separaten Laptop oder Smartphone angezeigt werden.

1. Sie moechten heute eine passende Aktivitaet fuer einen entspannten Abend zu zweit finden und entscheiden, ob Sie diese speichern oder direkt planen.
2. Sie moechten ein erstes Date in St. Gallen planen und herausfinden, ob eine Aktivitaet sicher, oeffentlich und gut erreichbar wirkt.
3. Sie moechten eine Aktivitaet fuer eine kleine Gruppe organisieren und dabei Budget, Dauer und Gruppentauglichkeit beruecksichtigen.
4. Sie haben wenig Zeit und moechten moeglichst schnell zu einer passenden Aktivitaet kommen, die Sie direkt planen koennen.
5. Sie moechten eine eigene lokale Aktivitaet erfassen und pruefen, ob die App Sie bei fehlenden Pflichtangaben verstaendlich unterstuetzt.
6. Sie moechten verstehen, welche Community-Funktionen im aktuellen MVP enthalten sind und was erst fuer eine spaetere Version geplant ist.

## Testszenarien
| Szenario | Aufgabe an Testperson | Erfolgskriterium | Beobachtung |
|---|---|---|---|
| Einstieg | Sie moechten verstehen, welchen Zweck VibeMatch hat und welche Moeglichkeiten Ihnen die Startseite bietet. | Zweck, Navigation und Einstieg sind verstaendlich. | offen |
| Aktivitaet finden | Sie moechten eine Aktivitaet in Zuerich oder St. Gallen finden, die zu einem Treffen passt. | Filter oder Suche fuehren zu passender Detailseite. | offen |
| Detailentscheidung | Sie moechten anhand der Detailseite entscheiden, ob die Aktivitaet fuer Sie passend ist. | Preis, Dauer, Ort, Bilder oder Reviews werden genutzt. | offen |
| Wishlist und Planung | Sie moechten eine interessante Idee fuer spaeter speichern oder direkt in einen Termin umwandeln. | Aktivitaet erscheint in Wishlist und Upcoming. | offen |
| Map | Sie moechten pruefen, wo eine passende Aktivitaet liegt und ob Sie ueber die Karte zur Detailseite gelangen. | Map, Marker und Detailnavigation funktionieren. | offen |
| History und Review | Sie moechten ein abgeschlossenes Erlebnis nachvollziehen und bewerten oder bearbeiten. | History-Eintrag und Review-Feedback sind nachvollziehbar. | offen |
| Teilen und Community-Ausblick | Sie moechten eine Idee teilen und verstehen, welche Community-Funktionen erst spaeter geplant sind. | Community wird als MVP-2-Ausblick verstanden. | offen |
| Aktivitaet erfassen | Sie moechten eine eigene Aktivitaet erfassen und herausfinden, ob Pflichtfeldfehler verstaendlich erklaert werden. | Validierung, Bild-Upload und Redirect sind verstaendlich. | offen |
| Mobile optional | Sie moechten zentrale Funktionen auf Smartphonegroesse nutzen und pruefen, ob die Navigation bedienbar bleibt. | Mobile Navigation und Inhalte bleiben bedienbar. | offen |

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
