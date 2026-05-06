export const categories = [
	'Romantisch',
	'Aktiv',
	'Kreativ',
	'Essen & Trinken',
	'Abenteuer',
	'Entspannung',
	'Draußen',
	'Indoor'
];

export const activities = [
	{
		id: 'sunset-picknick',
		title: 'Sunset Picknick am See',
		description:
			'Ein entspanntes Picknick am Zürichsee mit Blick auf den Sonnenuntergang, kleinen Snacks und Zeit für gute Gespräche.',
		image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Picknickdecke auf einer Wiese mit Blick Richtung Wasser und Sonnenuntergang',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
				alt: 'Picknickdecke auf einer Wiese mit Blick Richtung Wasser und Sonnenuntergang'
			},
			{
				src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
				alt: 'Ruhiger Seeuferbereich mit hellem Sommerhimmel'
			},
			{
				src: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80',
				alt: 'Ausblick auf See und Landschaft als Stimmung für ein Picknick'
			},
			{
				src: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=1200&q=80',
				alt: 'Picknickkorb mit Snacks und Getränken im Freien'
			}
		],
		categories: ['Romantisch', 'Entspannung', 'Draußen'],
		priceLevel: 1,
		priceText: 'CHF 20-40',
		duration: '2h',
		durationGroup: '1-3h',
		location: 'Zürichsee',
		city: 'Zürich',
		rating: 4.8,
		reviewCount: 128,
		bestTime: ['Sommer', 'Abend', 'Wochenende'],
		people: '2 Personen',
		indoorOutdoor: 'Outdoor',
		mood: ['Romantisch', 'Entspannt'],
		latitude: 47.3565,
		longitude: 8.5518,
		tips: ['Eine Decke mitnehmen', 'Vorher kleine Snacks vorbereiten', 'Kurz vor Sonnenuntergang ankommen'],
		requirements: ['Picknickdecke', 'Getränke', 'Leichte Jacke']
	},
	{
		id: 'keramik-workshop',
		title: 'Keramik Workshop für Zwei',
		description:
			'Gemeinsam Tassen, Schalen oder kleine Kunstwerke formen und bemalen. Perfekt für einen kreativen Nachmittag.',
		image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Hände formen Ton auf einer Töpferscheibe in einem Keramikatelier',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
				alt: 'Hände formen Ton auf einer Töpferscheibe in einem Keramikatelier'
			},
			{
				src: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=80',
				alt: 'Keramikstücke und Arbeitsmaterialien in einem Atelier'
			},
			{
				src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
				alt: 'Handgemachte Keramikgefässe auf einem Arbeitstisch'
			},
			{
				src: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
				alt: 'Bemalte Keramiktassen und Schalen nach einem Workshop'
			}
		],
		categories: ['Kreativ', 'Indoor', 'Romantisch'],
		priceLevel: 2,
		priceText: 'CHF 65 p.P.',
		duration: '2.5h',
		durationGroup: '1-3h',
		location: 'Atelier Kreis 4',
		city: 'Zürich',
		rating: 4.7,
		reviewCount: 86,
		bestTime: ['Herbst', 'Winter', 'Wochenende'],
		people: '2 Personen',
		indoorOutdoor: 'Indoor',
		mood: ['Kreativ', 'Entspannt'],
		latitude: 47.3782,
		longitude: 8.5253,
		tips: ['Kleidung wählen, die schmutzig werden darf', 'Vorab Wunschmotiv sammeln'],
		requirements: ['Reservation', 'Geduld', 'Offene Ideen']
	},
	{
		id: 'minigolf-abend',
		title: 'Minigolf Abend',
		description: 'Locker, spielerisch und ideal für Paare oder kleine Gruppen, die etwas Aktives ohne Druck suchen.',
		image: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Minigolfschläger und Ball auf einer grünen Minigolfbahn',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80',
				alt: 'Minigolfschläger und Ball auf einer grünen Minigolfbahn'
			},
			{
				src: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
				alt: 'Golfball auf kurz geschnittenem Grün als spielerisches Detail'
			},
			{
				src: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
				alt: 'Freizeitspiel auf gepflegter Grünfläche am Abend'
			},
			{
				src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
				alt: 'Grüne Outdoor-Umgebung für einen lockeren Abend draussen'
			}
		],
		categories: ['Aktiv', 'Gesellig', 'Draußen'],
		priceLevel: 1,
		priceText: 'CHF 12 p.P.',
		duration: '1.5h',
		durationGroup: '1-3h',
		location: 'Minigolfanlage Drei Weieren',
		city: 'St. Gallen',
		rating: 4.4,
		reviewCount: 54,
		bestTime: ['Frühling', 'Sommer', 'Abend'],
		people: '2-4 Personen',
		indoorOutdoor: 'Outdoor',
		mood: ['Gesellig', 'Aktiv'],
		latitude: 47.4163,
		longitude: 9.3867,
		tips: ['Kleine Wette vereinbaren', 'Danach Spaziergang bei den Drei Weieren'],
		requirements: ['Bequeme Schuhe']
	},
	{
		id: 'escape-room',
		title: 'Escape Room Challenge',
		description:
			'Rätsel lösen, Hinweise kombinieren und gemeinsam unter Zeitdruck entkommen. Gut für Teams und Gruppen.',
		image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Gruppe arbeitet gemeinsam an einem Tisch und löst Aufgaben',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
				alt: 'Gruppe arbeitet gemeinsam an einem Tisch und löst Aufgaben'
			},
			{
				src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
				alt: 'Team bespricht Hinweise und Ideen gemeinsam'
			},
			{
				src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
				alt: 'Dunklere Raumstimmung passend zu einer Rätsel-Challenge'
			},
			{
				src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
				alt: 'Notizen und digitale Hinweise für ein gemeinsames Rätsel'
			}
		],
		categories: ['Abenteuer', 'Indoor', 'Aktiv'],
		priceLevel: 2,
		priceText: 'CHF 38 p.P.',
		duration: '1h',
		durationGroup: '1-3h',
		location: 'Altstadt',
		city: 'Luzern',
		rating: 4.6,
		reviewCount: 103,
		bestTime: ['Winter', 'Abend', 'Wochenende'],
		people: '3-4 Personen',
		indoorOutdoor: 'Indoor',
		mood: ['Abenteuerlustig', 'Gesellig'],
		latitude: 47.0526,
		longitude: 8.3065,
		tips: ['Vorher gemeinsam Schwierigkeitsgrad wählen', 'Nach dem Spiel etwas trinken gehen'],
		requirements: ['Reservation', 'Teamgeist']
	},
	{
		id: 'paint-wine',
		title: 'Paint & Wine Night',
		description: 'Malen mit Anleitung, ein Glas Wein und eine lockere Atmosphäre für kreative Abende.',
		image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Pinsel, Farben und Leinwand für einen kreativen Malabend',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
				alt: 'Pinsel, Farben und Leinwand für einen kreativen Malabend'
			},
			{
				src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
				alt: 'Farben und Pinsel liegen bereit für einen Workshop'
			},
			{
				src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1200&q=80',
				alt: 'Kreativer Arbeitsplatz mit Skizzen und Malutensilien'
			},
			{
				src: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=1200&q=80',
				alt: 'Glas Wein und kreative Atmosphäre für einen Abendkurs'
			}
		],
		categories: ['Kreativ', 'Essen & Trinken', 'Indoor'],
		priceLevel: 2,
		priceText: 'CHF 59 p.P.',
		duration: '3h',
		durationGroup: '1-3h',
		location: 'Altstadt Atelier',
		city: 'Winterthur',
		rating: 4.9,
		reviewCount: 71,
		bestTime: ['Abend', 'Herbst', 'Winter'],
		people: '2 Personen',
		indoorOutdoor: 'Indoor',
		mood: ['Kreativ', 'Romantisch', 'Gesellig'],
		latitude: 47.4992,
		longitude: 8.7284,
		tips: ['Motiv offen lassen', 'Fotos vom Prozess machen'],
		requirements: ['Reservation']
	},
	{
		id: 'kletterhalle',
		title: 'Kletterhalle Besuch',
		description: 'Aktiver Ausflug mit Bouldern, Sichern und kleinen Erfolgsmomenten für jedes Fitnesslevel.',
		image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Person klettert an einer Kletterwand in einer Halle',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
				alt: 'Person klettert an einer Kletterwand in einer Halle'
			},
			{
				src: 'https://images.unsplash.com/photo-1526925539332-aa3b66e35444?auto=format&fit=crop&w=1200&q=80',
				alt: 'Klettergriffe an einer farbigen Boulderwand'
			},
			{
				src: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=1200&q=80',
				alt: 'Sportliche Person beim Klettern mit Sicherung'
			},
			{
				src: 'https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=1200&q=80',
				alt: 'Kletterhalle mit Routen für verschiedene Levels'
			}
		],
		categories: ['Aktiv', 'Abenteuer', 'Indoor'],
		priceLevel: 2,
		priceText: 'CHF 29 p.P.',
		duration: '2h',
		durationGroup: '1-3h',
		location: 'Kletterzentrum',
		city: 'Zürich',
		rating: 4.5,
		reviewCount: 92,
		bestTime: ['Winter', 'Wochenende', 'Abend'],
		people: '2-4 Personen',
		indoorOutdoor: 'Indoor',
		mood: ['Aktiv', 'Abenteuerlustig'],
		latitude: 47.3936,
		longitude: 8.5147,
		tips: ['Mit leichter Route starten', 'Magnesium und Schuhe vor Ort mieten'],
		requirements: ['Sportkleidung', 'Wasserflasche']
	},
	{
		id: 'street-food-tour',
		title: 'Street Food Tour',
		description: 'Mehrere kleine Stopps, neue Geschmäcker und ein unkomplizierter Abend in der Stadt.',
		image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Verschiedene kleine Gerichte auf einem Street-Food-Markt',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
				alt: 'Verschiedene kleine Gerichte auf einem Street-Food-Markt'
			},
			{
				src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
				alt: 'Frisch zubereitetes Street Food auf einem Teller'
			},
			{
				src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
				alt: 'Belebte Outdoor-Atmosphäre für einen entspannten Stadtabend'
			},
			{
				src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80',
				alt: 'Geteilte Speisen und Snacks für eine Food-Tour'
			}
		],
		categories: ['Essen & Trinken', 'Gesellig', 'Draußen'],
		priceLevel: 2,
		priceText: 'CHF 45 p.P.',
		duration: '3h',
		durationGroup: '1-3h',
		location: 'Markthalle',
		city: 'Zürich',
		rating: 4.6,
		reviewCount: 144,
		bestTime: ['Abend', 'Wochenende', 'Sommer'],
		people: 'Gruppe',
		indoorOutdoor: 'Beides',
		mood: ['Gesellig', 'Entspannt'],
		latitude: 47.3817,
		longitude: 8.5294,
		tips: ['Kleine Portionen teilen', 'Vorher Allergien klären'],
		requirements: ['Appetit', 'Bequeme Schuhe']
	},
	{
		id: 'sternenhimmel',
		title: 'Sternenhimmel beobachten',
		description: 'Raus aus der Stadt, Decke ausbreiten und gemeinsam den Nachthimmel beobachten.',
		image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Klarer Sternenhimmel über einer ruhigen Berglandschaft',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
				alt: 'Klarer Sternenhimmel über einer ruhigen Berglandschaft'
			},
			{
				src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
				alt: 'Weite Landschaft in ruhiger Abendstimmung'
			},
			{
				src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
				alt: 'Bergpanorama als Ausflugsziel für eine klare Nacht'
			},
			{
				src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80',
				alt: 'Nachthimmel mit Sternen über dunkler Landschaft'
			}
		],
		categories: ['Romantisch', 'Draußen', 'Entspannung'],
		priceLevel: 0,
		priceText: 'Kostenlos',
		duration: '2h',
		durationGroup: '1-3h',
		location: 'Uetliberg',
		city: 'Zürich',
		rating: 4.7,
		reviewCount: 67,
		bestTime: ['Abend', 'Sommer', 'Herbst'],
		people: '2 Personen',
		indoorOutdoor: 'Outdoor',
		mood: ['Romantisch', 'Entspannt'],
		latitude: 47.3499,
		longitude: 8.491,
		tips: ['Wetter und Mondphase prüfen', 'Thermoskanne mitnehmen'],
		requirements: ['Warme Kleidung', 'Decke']
	},
	{
		id: 'bowling-night',
		title: 'Bowling Night',
		description: 'Ein Klassiker für Gruppenabende mit Musik, Snacks und freundschaftlichem Wettbewerb.',
		image: 'https://images.unsplash.com/photo-1538511059256-46e475d804da?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Bowlingkugel rollt auf einer Bahn Richtung Pins',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1538511059256-46e475d804da?auto=format&fit=crop&w=1200&q=80',
				alt: 'Bowlingkugel rollt auf einer Bahn Richtung Pins'
			},
			{
				src: 'https://images.unsplash.com/photo-1573508915901-b5f84c1dcde1?auto=format&fit=crop&w=1200&q=80',
				alt: 'Bowlingbahnen mit leuchtenden Bahnen für einen Gruppenabend'
			},
			{
				src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
				alt: 'Indoor-Abendstimmung für eine gemeinsame Aktivität'
			},
			{
				src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
				alt: 'Gruppe verbringt einen geselligen Abend zusammen'
			}
		],
		categories: ['Aktiv', 'Indoor', 'Gesellig'],
		priceLevel: 1,
		priceText: 'CHF 18 p.P.',
		duration: '2h',
		durationGroup: '1-3h',
		location: 'Bowling Center',
		city: 'St. Gallen',
		rating: 4.3,
		reviewCount: 48,
		bestTime: ['Abend', 'Winter', 'Wochenende'],
		people: 'Gruppe',
		indoorOutdoor: 'Indoor',
		mood: ['Gesellig', 'Aktiv'],
		latitude: 47.4247,
		longitude: 9.3674,
		tips: ['Bahn vorreservieren', 'Teams auslosen'],
		requirements: ['Reservation empfohlen']
	},
	{
		id: 'brunch-sonntag',
		title: 'Brunch am Sonntag',
		description: 'Langer Brunch mit Kaffee, frischem Brot und Zeit, ohne Hektik in den Tag zu starten.',
		image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Brunchtisch mit Kaffee, Gebäck, Früchten und herzhaften Speisen',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
				alt: 'Brunchtisch mit Kaffee, Gebäck, Früchten und herzhaften Speisen'
			},
			{
				src: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=80',
				alt: 'Frühstücksteller mit Kaffee und frischen Zutaten'
			},
			{
				src: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80',
				alt: 'French Toast und Früchte als Brunchgericht'
			},
			{
				src: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80',
				alt: 'Reich gedeckter Frühstückstisch für einen ruhigen Sonntag'
			}
		],
		categories: ['Essen & Trinken', 'Entspannung', 'Indoor'],
		priceLevel: 2,
		priceText: 'CHF 42 p.P.',
		duration: '2h',
		durationGroup: '1-3h',
		location: 'Café am Platz',
		city: 'Rapperswil',
		rating: 4.5,
		reviewCount: 112,
		bestTime: ['Wochenende', 'Frühling', 'Winter'],
		people: '2-4 Personen',
		indoorOutdoor: 'Indoor',
		mood: ['Entspannt', 'Gesellig'],
		latitude: 47.2267,
		longitude: 8.8179,
		tips: ['Fensterplatz reservieren', 'Danach am See spazieren'],
		requirements: ['Reservation']
	},
	{
		id: 'kunst-museum',
		title: 'Kunstmuseum Besuch',
		description: 'Ruhiger Kulturmoment mit inspirierenden Ausstellungen und anschließendem Kaffee-Stopp.',
		image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Besucherinnen und Besucher betrachten Kunstwerke in einer hellen Galerie',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=80',
				alt: 'Besucherinnen und Besucher betrachten Kunstwerke in einer hellen Galerie'
			},
			{
				src: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=1200&q=80',
				alt: 'Ausstellungsraum mit farbigen Kunstwerken an der Wand'
			},
			{
				src: 'https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?auto=format&fit=crop&w=1200&q=80',
				alt: 'Ruhige Museumsatmosphäre mit moderner Kunst'
			},
			{
				src: 'https://images.unsplash.com/photo-1507643179773-3e975d7ac515?auto=format&fit=crop&w=1200&q=80',
				alt: 'Heller Galerieraum für einen entspannten Museumsbesuch'
			}
		],
		categories: ['Kreativ', 'Indoor', 'Entspannung'],
		priceLevel: 1,
		priceText: 'CHF 16 p.P.',
		duration: '2h',
		durationGroup: '1-3h',
		location: 'Kunstmuseum',
		city: 'St. Gallen',
		rating: 4.4,
		reviewCount: 39,
		bestTime: ['Winter', 'Herbst', 'Nachmittag'],
		people: '2 Personen',
		indoorOutdoor: 'Indoor',
		mood: ['Kreativ', 'Entspannt'],
		latitude: 47.4268,
		longitude: 9.3772,
		tips: ['Lieblingswerk gegenseitig auswählen', 'Audio-Guide ausprobieren'],
		requirements: ['Museumsticket']
	},
	{
		id: 'alpaka-spaziergang',
		title: 'Alpaka Spaziergang',
		description: 'Ein besonderer Ausflug in der Natur mit geführtem Spaziergang und ruhiger Begleitung.',
		image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80',
		imageAlt: 'Alpaka steht auf einer grünen Wiese in ländlicher Umgebung',
		imageCredit: 'Unsplash',
		gallery: [
			{
				src: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1200&q=80',
				alt: 'Alpaka steht auf einer grünen Wiese in ländlicher Umgebung'
			},
			{
				src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
				alt: 'Ländliche Wiese mit Tieren und ruhiger Ausflugsstimmung'
			},
			{
				src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
				alt: 'Weite Landschaft mit Feldweg für einen Spaziergang'
			},
			{
				src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
				alt: 'Naturpfad und Berge als Kulisse für einen ruhigen Ausflug'
			}
		],
		categories: ['Draußen', 'Entspannung', 'Abenteuer'],
		priceLevel: 2,
		priceText: 'CHF 55 p.P.',
		duration: '2.5h',
		durationGroup: '1-3h',
		location: 'Säntisregion',
		city: 'Appenzell',
		rating: 4.9,
		reviewCount: 77,
		bestTime: ['Frühling', 'Sommer', 'Wochenende'],
		people: '2-4 Personen',
		indoorOutdoor: 'Outdoor',
		mood: ['Entspannt', 'Abenteuerlustig'],
		latitude: 47.3011,
		longitude: 9.4117,
		tips: ['Wetterfeste Schuhe tragen', 'Kamera mitnehmen'],
		requirements: ['Reservation', 'Wetterfeste Kleidung']
	}
];

export function getActivityById(id) {
	return activities.find((activity) => activity.id === id);
}
