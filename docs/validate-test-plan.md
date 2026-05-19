# Validate-Testplan VibeMatch

## Ziel
Validiert wird, ob Nutzerinnen und Nutzer mit VibeMatch ohne Erklaerung von Inspiration zu einer geplanten Aktivitaet kommen. Wichtig sind Verstaendlichkeit der Filter, mobile Navigation, Detailentscheidung, Wishlist, Planung, Karte, History, Teilen-Prototyp, Community-Ausblick und Profil.

## Stichprobe
Geplant sind 3 bis 5 kurze Tests mit Personen aus den Zielgruppen Paare, Freundesgruppen und kleine Gruppen. Fuer die Abgabe werden die Personen anonym als T1 bis T5 dokumentiert.

| Testperson | Zielgruppenbezug | Geraet | Status |
|---|---|---|---|
| T1 | Paar / Date-Planung | Mobile | bereit |
| T2 | Freundesgruppe | Desktop | bereit |
| T3 | wenig Zeit / schnelle Entscheidung | Mobile | bereit |
| T4 | Gruppenorganisation | Desktop | optional |
| T5 | eigene Aktivitaetsidee erfassen | Desktop | optional |

## Testszenarien
| Szenario | Aufgabe | Erfolgskriterium |
|---|---|---|
| Login und Einstieg | Mit `demo` / `demo123` einloggen und Home verstehen | Home, Schnellfilter und Hauptnavigation sind auffindbar |
| Aktivitaet finden | Aktivitaet in Zuerich oder St. Gallen ueber Filter finden | Filterchip ist sichtbar, Ergebnis fuehrt zur Detailseite |
| Wishlist und Planung | Aktivitaet speichern und einen Termin erstellen | Aktivitaet erscheint in Wishlist und Upcoming |
| Karte | Map oeffnen, Marker auswaehlen und Detailseite oeffnen | Marker und Detailnavigation funktionieren |
| History und Teilen | Termin als erledigt markieren, Erinnerung bearbeiten und Teilen-Flow pruefen | History-Eintrag wird sichtbar und Teilen wird als Prototyp verstaendlich |
| Community-Ausblick | `/community` oeffnen und einordnen | Nutzer versteht, dass Community fuer ein spaeteres MVP geplant ist |
| Profil | Profil oeffnen und Einstellung oder Lieblingskategorie bearbeiten | Rueckmeldung erscheint und Aenderung bleibt nach Reload erhalten |
| Aktivitaet erfassen | Neue Aktivitaet mit Pflichtfeldern speichern | Validierung greift bei Fehlern, gueltige Aktivitaet wird gespeichert |

## Beobachtungsbogen
| Testperson | Erfolgreiche Szenarien | Huerden | Verbesserung | Ergebnis |
|---|---:|---|---|---|
| T1 | offen | offen | offen | nach Durchfuehrung eintragen |
| T2 | offen | offen | offen | nach Durchfuehrung eintragen |
| T3 | offen | offen | offen | nach Durchfuehrung eintragen |
| T4 | optional | optional | optional | nach Durchfuehrung eintragen |
| T5 | optional | optional | optional | nach Durchfuehrung eintragen |

## Erwartete Auswertung
Die wichtigsten Kennzahlen sind Erfolgsquote pro Szenario, benoetigte Zeit fuer den Weg Home -> Detail -> Planen, Verstaendlichkeit der Filter und Auffindbarkeit der mobilen Hauptbereiche. Beobachtungen werden direkt in der Tabelle erfasst und anschliessend in der README unter Validate zusammengefasst.
