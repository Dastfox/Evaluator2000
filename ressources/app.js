document.addEventListener('DOMContentLoaded', () => {
	let students = [];
	const studentList = document.querySelector('.student-list');
	const container = document.querySelector('.container');
	const AUTO_SAVE_DELAY = 1000;
	let evaluations = {
		language: {},
		math: {},
	};
	// Load evaluations from localStorage
	try {
		const savedEvaluations = localStorage.getItem('evaluationsData');
		if (savedEvaluations) {
			evaluations = JSON.parse(savedEvaluations);
		}
	} catch (error) {
		console.error('Error loading evaluations:', error);
	}

	const competencies = {
		math1: {
			name: 'Nombre et calculs',
			objectives: [
				{
					category: 'Nombres et calculs',
					expectations: [
						'Dénombrer des collections en les organisant',
						"Ordonner dans l'ordre croissant ou décroissant",
						'Repérer un rang ou une position dans une file ou sur une piste',
						'Comparer, ranger, encadrer, intercaler des nombres entiers',
						'Utiliser diverses représentations des nombres',
						'Lire les nombres écrit en chiffres',
						'Ecrire les nombres dictés en chiffres et en lettres',
						'Connaître et utiliser la relation dizaine et unité',
						'Calcul mental : Calculer mentalement des sommes et des différences',
						'Calcul en ligne : Calculer en utilisant des écritures en lignes additives, soustractives',
						'Calcul posé : Poser et calculer des additions en colonnes avec ou sans retenue',
					],
				},
			],
		},
		math2: {
			name: 'Grandeurs Et mesures',
			objectives: [
				{
					category: 'Grandeurs Et mesures',
					expectations: [
						'Comparer des objets ou des segments selon leur longueur',
						'Mesurer avec une règle graduée',
						'Tracer ou reproduire des segments',
						'Comparer des objets selon leur masse',
						'Lire des horaires sur une horloge à aiguilles',
						'Utiliser le lexique associé aux longueurs et aux masses (plus long, court, près, loin, double, moitié/ lourd, léger)',
						'Résoudre des problèmes impliquant des longueurs, des durées ou des prix',
					],
				},
			],
		},
		math3: {
			name: 'Espace Et Géométrie',
			objectives: [
				{
					category: 'Espace et géométrie',
					expectations: [
						'Situer des objets ou des personnes en utilisant le vocabulaire : Gauche, droite, sur, sous, devant derrière, entre, en dessous, au-dessus',
						'Coder un déplacement sur un tapis quadrillé',
						'Avancer, reculer, tourner à droite, à gauche, monter, descendre',
						'Reconnaître des solides usuels : Cube, boule, cône, pyramide, cylindre, pavé droit',
						'Nommer le cube, la boule et le pavé',
						'Décrire le cube et le pavé en utilisant « face » et « sommet »',
						'Reconnaître et nommer les figures usuelles : cercle, carré, triangle et rectangle',
						'Décrire et reproduire : carré, rectangle et triangle avec ou sans règle graduée (« sommet » et « côté »)',
						'Tracer à la règle et repérer des alignements',
					],
				},
			],
		},
		lang1: {
			name: 'Langage',
			objectives: [
				{
					category: 'COMPRENDRE ET S’EXPRIMER A L’ORAL',
					expectations: [
						'Mémoriser du vocabulaire, des informations importantes et des textes',
						'Concentration et attention',
						'Organiser son discours',
						'Lire à haute voix en s’adaptant à la situation (auditoire)',
						'Respecter les règles régulant les échanges',
						'Reformuler les propose d’un pair pour l’améliorer',
						'S’auto corriger/ améliorer son propos',
					],
				},
				{
					category: 'LECTURE ET COMPREHENSION DE L’ECRIT',
					expectations: [
						'Conscience phonologique (manipuler syllabes, entendre les phonèmes)',
						'Connaître les lettres et leur son',
						'Connaitre les correspondances graphophonologiques et la combinatoire : ENCODER',
						'Mémoriser des mots fréquents et irréguliers (femme, yeux, Mr, fils, sept, compter, automne, igloo, clown, football…)',
						'DECODER',
						'Compréhension : fluence',
						'Comprendre un texte lu seul',
						'Comprendre un texte lu par l’enseignant',
						'Justifier son interprétation ou ses réponses.',
						'Verbaliser l’objectif de sa lecture (construire, rechercher, raconter, plaisir)',
						'Identifier et prendre en compte les marques de ponctuation comme le point',
						'Montrer sa compréhension par une lecture expressive',
					],
				},
			],
		},
		ecrit1: {
			name: 'Ecriture',
			objectives: [
				{
					category: 'Ecriture',
					expectations: [
						'Maitriser les gestes de l’écriture cursive.',
						'Transcrire script/cursive',
						'Mettre en place une stratégie de copie.',
						'Relire pour vérifier la conformité de la copie, comparer, rectifier',
						'Manier le traitement de texte pour la mise en page de courts textes.',
						'Mettre en œuvre une démarche de production de textes (idée, phrase cohérence)',
						'Identifier différents genres de textes (documentaire, etc.)',
						'Mobiliser des outils à disposition, dans la classe, liés à l’étude de la langue (affichage, mémo-porte-clé …)',
						'Repérer les dysfonctionnements dans les textes produits par la relecture de l’enseignant',
						'Exercer une vigilance orthographique pour améliorer son texte',
					],
				},
			],
		},
		ecrit2: {
			name: 'Etude de la langue',
			objectives: [
				{
					category: 'Etude de la langue (grammaire, orthographe, lexique)',
					expectations: [
						'Connaître les correspondances graphophonologiques.',
						'Connaître la composition de certains graphèmes selon la lettre qui suit (an/Am, en/em, on/om, in/im)',
						'Connaître les valeurs sonores de s-c-g',
						'Mémoriser l’orthographe du vocabulaire courant et des mots invariables.',
						'Identifier la phrase (maj, point, sens)',
						'Identifier le groupe nominal et le verbe.',
						'Classer des mots : nom, verbe, déterminant.',
						'Reconnaître les phrases déclaratives, interrogatives et impératives et les formes négatives et exclamatives.',
						'Identifier la ponctuation de fin de phrase et les signes du discours',
						'Comprendre la notion de chaine d’accords pour déterminant/nom en genre (féminin/masculin) et en nombre (singulier/pluriel)',
						'Oraliser les pluriels irréguliers (cheval/aux)',
						'VERBE : identifier radical et terminaison',
						'Se familiariser avec l’indicatif présent',
						'Connaître les notions de famille de mots',
						'Travailler sur les registres familiers, courant, soutenu (lien avec enseignement civique et moral)',
						'Connaître l’ordre alphabétique',
					],
				},
			],
		},
		arts1: {
			name: 'Musique',
			objectives: [
				{
					category: 'Chanter',
					expectations: ['Expérimenter et explorer sa voix Reproduire un modèle Chanter et interpréter'],
				},
				{
					category: 'Écouter et comparer',
					expectations: ['Décrire et comparer des éléments sonores'],
				},
				{
					category: 'Explorer, imaginer',
					expectations: ['Expérimenter hauteur, timbre,durée, intensité'],
				},
				{
					category: 'Echanger partager',
					expectations: ['Exprimer des préférences et émotions en respectant celles des autres'],
				},
			],
		},
		arts2: {
			name: 'Arts plastiques',
			objectives: [
				{
					category: 'La représentation du monde',
					expectations: ['Utiliser le dessin comme moyen d’expression Employer divers outils', 'Expérimenter 2 et 3 D', 'Connaître diverses formes artistiques et comparer (réseaux)'],
				},
				{
					category: 'L’expression des émotions',
					expectations: ['Utiliser le vocabulaire adéquat', 'Expérimenter, créer des compositions plastiques', 'Exprimer ses émotions et respecter celles des autres'],
				},
				{
					category: 'La narration et le témoignage par les images',
					expectations: ['Réaliser des productions pour raconter, témoigner', 'Transformer images ou objets', 'Articuler texte/image'],
				},
			],
		},
		lang2: {
			name: 'Langage oral',
			objectives: [
				{
					category: "Comprendre l'oral",
					expectations: ['Comprendre les consignes de la classe et suivre des instructions simples', 'Utiliser quelques mots familiers (nom, âge, politesse…)', "Suivre le fil d'une histoire courte avec des aides appropriées"],
				},
				{
					category: "S'exprimer oralement en continu",
					expectations: ['Utiliser des expressions et des phrases simples pour se décrire (âge, nom) Reproduire un modèle simple (comptine, chansons, histoire…)'],
				},
				{
					category: 'Prendre part à une conversation',
					expectations: ['Saluer, se présenter', 'Formuler des souhaits'],
				},
				{
					category: 'Découvrir les aspects culturels',
					expectations: ["Thèmes à aborder en CP : \n•    Les drapeaux    \n•   Les animaux \n•   Sensations, goût et sentiments \n•    L'alphabet \n•    Les nombres \n•   La date et la météo \n•   Les comptines et chansons \n• Les couleurs"],
				},
			],
		},
		science1: {
			name: 'Sciences',
			objectives: [
				{
					category: 'Monde de la matière',
					expectations: ["Mettre en œuvre des expériences simples impliquant l'eau et/ou l'air", 'Quelques propriétés des solides, des liquides et des gaz', "Les états de l'eau (liquide, glace, vapeur d'eau)"],
				},
				{
					category: 'Monde du vivant',
					expectations: [
						"Identifier ce qui est animal, végétal, minéral ou élaboré par des êtres vivants Développement d'animaux et de végétaux Cycle de vie des êtres vivants Régimes alimentaires de quelques animaux Quelques besoins vitaux des végétaux",
						"Repérer les éléments permettant la réalisation d'un mouvement corporel Mesurer et observer la croissance de son corps (croissance, taille, masse, pointure) Modification de la dentition",
						"Mettre en œuvre et apprécier quelques règles d'hygiène de vie : variété alimentaire, activités physiques, capacité à se relaxer et mise en relation de son âge et de ses habitudes quotidiennes de repos et de besoins en sommeil, soins quotidiens de propreté (dents, mains, corps) Catégories d'aliments, leur variété, leurs apports spécifiques des aliments → la notion d’équilibre alimentaire (sur un repas, sur la journée, sur la semaine)",
					],
				},
			],
		},
		sport1: {
			name: 'Education physique',
			objectives: [
				{
					category: 'Produire une performance maximale, mesurée à une échéance donnée',
					expectations: [
						'Courir, sauter, lancer à des intensités et des durées variables dans des contextes adaptés',
						'Savoir différencier : courir vite et longtemps / lancer loin ou précis / sauter haut et loin',
						'Accepter de viser une performance mesurée et de se confronter aux autres',
						'Remplir quelques rôles spécifiques',
					],
				},
				{
					category: 'Adapter ses déplacements à des environnements variés',
					expectations: ["Se déplacer dans l'eau sur une 15aine de mètres sans appui et après un temps d'immersion", 'Réaliser un parcours en adaptant ses déplacements à un environnement inhabituel', 'Respecter les règles de sécurité'],
				},
				{
					category: "S'exprimer devant les autres par une prestation artistique ou acrobatique",
					expectations: [
						"Mobiliser le pouvoir expressif du corps, en reproduisant une séquence simple d'actions apprise ou en présentant une action inventée",
						"S'adapter au rythme, mémoriser des pas, des figures, des éléments et des enchaînements pour réaliser des actions individuelles et collectives",
					],
				},
				{
					category: 'Conduire et maîtriser un affrontement collectif ou interindividuel',
					expectations: [
						"S'engager dans un affrontement individuel ou collectif en respectant les règles du jeu",
						'Contrôler son engagement moteur et affectif pour réussir des actions simples',
						'Connaître le but du jeu / Reconnaître ses partenaires et ses adversaires',
					],
				},
			],
		},
	};

	let selectedCompetency = Object.keys(competencies)[0];

	function setupUI() {
		// Create main UI elements
		const nav = document.createElement('nav');
		nav.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        justify-content: center;
    `;

		const listButton = document.createElement('button');
		listButton.textContent = 'Liste des élèves';
		listButton.className = 'nav-button active';

		const chartButton = document.createElement('button');
		chartButton.textContent = 'Tableau de progression';
		chartButton.className = 'nav-button';

		const overviewButton = document.createElement('button');
		overviewButton.textContent = 'Vue globale';
		overviewButton.className = 'nav-button';

		nav.appendChild(listButton);
		nav.appendChild(chartButton);
		nav.appendChild(overviewButton);

		// Add Student Button
		const addButton = document.createElement('button');
		addButton.textContent = '+';
		addButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #3498db;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        transition: transform 0.2s;
    `;

		// Global competency selector
		const globalCompetencySelect = document.createElement('select');
		globalCompetencySelect.className = 'global-competency-selector';
		globalCompetencySelect.style.cssText = `
        display: none;
        top: 20px;
        left: 20px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        background-color: white;
        min-width: 150px;
        font-size: 14px;
    `;

		Object.entries(competencies).forEach(([key, value]) => {
			const option = document.createElement('option');
			option.value = key;
			option.textContent = value.name;
			globalCompetencySelect.appendChild(option);
		});

		globalCompetencySelect.addEventListener('change', (e) => {
			selectedCompetency = e.target.value;
			const chartSelector = document.querySelector('.competency-selector');
			if (chartSelector) {
				chartSelector.value = selectedCompetency;
			}
			renderProgressChart();
		});

		globalCompetencySelect.value = selectedCompetency;

		// Create view containers
		const listView = document.createElement('div');
		listView.className = 'view';
		listView.appendChild(studentList);

		const chartView = document.createElement('div');
		chartView.className = 'view chart-view';
		chartView.style.display = 'none';

		// Create the overview container
		const overviewView = document.createElement('div');
		overviewView.className = 'view overview-view';
		overviewView.style.display = 'none';

		// Create student selector
		const studentSelect = document.createElement('select');
		studentSelect.className = 'student-selector';
		studentSelect.innerHTML = '<option value="">Sélectionner un élève</option>';

		// Create overview table container
		const overviewTableContainer = document.createElement('div');
		overviewTableContainer.className = 'overview-table-container';

		overviewView.appendChild(studentSelect);
		overviewView.appendChild(overviewTableContainer);
		document.querySelector('.container').appendChild(overviewView);

		// Add competency selector for chart view
		const competencySelect = document.createElement('select');
		competencySelect.className = 'competency-selector';
		competencySelect.style.cssText = `
        margin-bottom: 20px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
    `;

		Object.entries(competencies).forEach(([key, value]) => {
			competencySelect.innerHTML += `<option value="${key}">${value.name}</option>`;
		});
		competencySelect.addEventListener('change', handleCompetencyChange);
		chartView.appendChild(competencySelect);

		// Import/Export Controls
		const controls = document.createElement('div');
		controls.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 1000;
    `;

		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = '.json';
		fileInput.style.display = 'none';

		const importBtn = document.createElement('button');
		importBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
        Import
    `;

		const exportBtn = document.createElement('button');
		exportBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
        Export
    `;

		[importBtn, exportBtn].forEach((btn) => {
			btn.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
            font-size: 14px;
        `;
		});

		controls.appendChild(importBtn);
		controls.appendChild(exportBtn);
		controls.appendChild(fileInput);

		// Add styles for the global competency selector
		const style = document.createElement('style');
		style.textContent = `
        .global-competency-selector {
            z-index: 1;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: border-color 0.2s;
        }
        
        .global-competency-selector:hover {
            border-color: #3498db;
        }
        
        .global-competency-selector:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
    `;
		document.head.appendChild(style);

		// Add initial class for list view
		container.classList.add('list-view');

		// Navigation event listeners
		listButton.addEventListener('click', () => {
			globalCompetencySelect.style.display = 'none';
			listView.style.display = 'block';
			chartView.style.display = 'none';
			overviewView.style.display = 'none';
			listButton.classList.add('active');
			chartButton.classList.remove('active');
			addButton.style.display = 'block';
			container.classList.remove('table-view');
			container.classList.add('list-view');
		});

		chartButton.addEventListener('click', () => {
			globalCompetencySelect.style.display = 'block';
			listView.style.display = 'none';
			overviewView.style.display = 'none';
			chartView.style.display = 'block';
			chartButton.classList.add('active');
			listButton.classList.remove('active');
			addButton.style.display = 'none';
			container.classList.remove('list-view');
			container.classList.add('table-view');
			renderProgressChart();
		});

		overviewButton.addEventListener('click', () => {
			globalCompetencySelect.style.display = 'none';
			document.querySelector('.student-list').parentElement.style.display = 'none';
			document.querySelector('.chart-view').style.display = 'none';
			overviewView.style.display = 'block';
			document.querySelectorAll('.nav-button').forEach((btn) => btn.classList.remove('active'));
			overviewButton.classList.add('active');
			document.querySelector('.container').classList.remove('list-view', 'table-view');
			document.querySelector('.container').classList.add('overview-view');
			ui.addButton.style.display = 'none';
			updateStudentSelector();
			renderCompetencyOverview(); // Initial render
		});

		studentSelect.addEventListener('change', renderCompetencyOverview);

		// Assemble the UI in the correct order
		container.innerHTML = ''; // Clear container first
		// Add global competency selector to the nav before first button
		nav.insertBefore(globalCompetencySelect, nav.firstChild);
		container.appendChild(addButton);
		container.appendChild(nav);
		container.appendChild(listView);
		container.appendChild(chartView);
		container.appendChild(overviewView);
		document.body.appendChild(controls);

		return { addButton, importBtn, exportBtn, fileInput, globalCompetencySelect };
	}

	// Get evaluation status for a specific competency
	// Modify the getCompetencyStatus function to handle the new data structure
	function getCompetencyStatus(studentId, competencyKey, objIndex, expIndex) {
		const evaluation = evaluations[competencyKey]?.[studentId]?.[`${objIndex}-${expIndex}`];

		if (!evaluation || evaluation.value === '') return 'Non évalué';
		const score = parseInt(evaluation.value);
		if (score >= 66.6) return 'Dépassés';
		if (score >= 33.3) return 'Atteints';
		return 'Non atteints';
	}

	// Get status color
	function getStatusColor(status) {
		const colors = {
			'Non évalué': '#f3f4f6', // grey
			'Non atteints': '#fee2e2', // red
			Atteints: '#dcfce7', // green
			Dépassés: '#fef9c3', // yellow
		};
		return colors[status];
	}

	// Render the overview table
	function renderCompetencyOverview() {
		const studentSelect = document.querySelector('.student-selector');
		const tableContainer = document.querySelector('.overview-table-container');
		const selectedStudentId = studentSelect.value;

		if (!selectedStudentId) {
			tableContainer.innerHTML = '<p class="select-prompt">Veuillez sélectionner un élève</p>';
			return;
		}

		let tableHTML = '<table class="overview-table">';
		tableHTML += '<thead><tr><th>Domaine</th><th>Objectif</th><th>Attendu</th><th>Niveau</th></tr></thead><tbody>';

		Object.entries(competencies).forEach(([compKey, comp]) => {
			comp.objectives.forEach((objective, objIndex) => {
				objective.expectations.forEach((expectation, expIndex) => {
					const status = getCompetencyStatus(selectedStudentId, compKey, objIndex, expIndex);
					tableHTML += `
                        <tr>
                            <td>${comp.name}</td>
                            <td>${objective.category}</td>
                            <td>${expectation}</td>
                            <td class="status-cell" style="background-color: ${getStatusColor(status)}">${status}</td>
                        </tr>
                    `;
				});
			});
		});

		tableHTML += '</tbody></table>';
		tableContainer.innerHTML = tableHTML;
	}

	function updateStudentSelector() {
		const selector = document.querySelector('.student-selector');
		selector.innerHTML = ''; // Remove placeholder
		students.forEach((student, index) => {
			const option = document.createElement('option');
			option.value = student.id;
			option.textContent = student.name;
			// Set selected attribute for the first student
			if (index === 0) {
				option.selected = true;
			}
			selector.appendChild(option);
		});
	}

	function getEvaluationColor(percentage) {
		if (percentage === '') return '#f9fafb'; // gray-50
		const value = parseInt(percentage);
		if (value >= 80) {
			return '#dcfce7'; // green-100
		} else if (value >= 60) {
			return '#fef9c3'; // yellow-100
		} else if (value >= 40) {
			return '#ffedd5'; // orange-100
		} else {
			return '#fee2e2'; // red-100
		}
	}

	function handleEvaluationChange(studentId, competency, expectationIndex, value) {
		evaluations[competency] = evaluations[competency] || {};
		evaluations[competency][studentId] = evaluations[competency][studentId] || {};
		evaluations[competency][studentId][expectationIndex] = {
			value: value,
			lastModified: new Date().toISOString(),
		};
		localStorage.setItem('evaluationsData', JSON.stringify(evaluations));
		renderProgressChart(competency);
	}

	function getCurrentObjectives() {
		return competencies[selectedCompetency].objectives;
	}

	function handleCompetencyChange(event) {
		selectedCompetency = event.target.value;
		// Update the global selector
		document.querySelector('.global-competency-selector').value = selectedCompetency;
		renderProgressChart(selectedCompetency);
	}

	function renderProgressChart(competency = selectedCompetency) {
		const chartView = document.querySelector('.chart-view');
		chartView.innerHTML = '';

		// Create fixed columns table
		const fixedTable = document.createElement('table');
		fixedTable.className = 'progress-table fixed-table';

		// Create scrollable table
		const scrollTable = document.createElement('table');
		scrollTable.className = 'progress-table scroll-table';

		// Create wrapper for horizontal scrolling
		const scrollWrapper = document.createElement('div');
		scrollWrapper.className = 'scroll-wrapper';

		// Create headers
		const fixedHeader = document.createElement('thead');
		const scrollHeader = document.createElement('thead');

		const fixedHeaderRow = document.createElement('tr');
		const scrollHeaderRow = document.createElement('tr');

		// Add fixed columns headers
		fixedHeaderRow.innerHTML = `
        <th class="objective-header">Objectifs</th>
        <th class="expectation-header">Attendus en fin de CP</th>
    `;

		// Add scrollable student headers
		scrollHeaderRow.innerHTML = students.map((student) => `<th class="student-header">${student.name}</th>`).join('');

		fixedHeader.appendChild(fixedHeaderRow);
		scrollHeader.appendChild(scrollHeaderRow);

		// Create bodies
		const fixedBody = document.createElement('tbody');
		const scrollBody = document.createElement('tbody');

		// Populate tables
		const currentObjectives = competencies[competency].objectives;
		currentObjectives.forEach((objective, objIndex) => {
			objective.expectations.forEach((expectation, expIndex) => {
				const fixedRow = document.createElement('tr');
				const scrollRow = document.createElement('tr');

				// Fixed columns (categories and expectations)
				if (expIndex === 0) {
					const categoryCell = document.createElement('td');
					categoryCell.rowSpan = objective.expectations.length;
					categoryCell.className = 'category-cell';
					categoryCell.textContent = objective.category;
					fixedRow.appendChild(categoryCell);
				}

				const expectationCell = document.createElement('td');
				expectationCell.className = 'expectation-cell';

				// Create a wrapper div for the content
				const contentWrapper = document.createElement('div');
				contentWrapper.className = 'expectation-cell-content';
				contentWrapper.innerHTML = expectation.replace(/\n/g, '<br>');

				expectationCell.appendChild(contentWrapper);
				fixedRow.appendChild(expectationCell);

				// Scrollable columns (student evaluations)
				students.forEach((student) => {
					const evalCell = document.createElement('td');
					evalCell.className = 'evaluation-cell';

					const input = document.createElement('input');
					input.type = 'number';
					input.min = '0';
					input.max = '100';
					input.className = 'evaluation-input';
					input.style.cssText = `
            width: 60px;
            padding: 4px;
            border: 1px solid #ddd;
            border-radius: 4px;
            text-align: center;
        `;

					const evaluation = evaluations[competency]?.[student.id]?.[`${objIndex}-${expIndex}`] || { value: '', lastModified: null };
					input.value = evaluation.value;
					input.style.backgroundColor = getEvaluationColor(evaluation.value);

					// Add tooltip with last modification date
					if (evaluation.lastModified) {
						const date = new Date(evaluation.lastModified);
						const formattedDate = new Intl.DateTimeFormat('fr-FR', {
							dateStyle: 'medium',
							timeStyle: 'short',
						}).format(date);
						input.title = `Dernière modification: ${formattedDate}`;
					}

					input.addEventListener('input', (e) => {
						const value = e.target.value;
						input.style.backgroundColor = getEvaluationColor(value);
					});

					input.addEventListener('blur', (e) => {
						let value = e.target.value;
						if (value !== '' && !isNaN(value)) {
							value = Math.max(0, Math.min(100, parseInt(value) || 0));
							e.target.value = value;
						}
						handleEvaluationChange(student.id, competency, `${objIndex}-${expIndex}`, value);

						// Update tooltip after saving
						const date = new Date();
						const formattedDate = new Intl.DateTimeFormat('fr-FR', {
							dateStyle: 'medium',
							timeStyle: 'short',
						}).format(date);
						input.title = `Dernière modification: ${formattedDate}`;
					});

					evalCell.appendChild(input);
					scrollRow.appendChild(evalCell);
				});

				fixedBody.appendChild(fixedRow);
				scrollBody.appendChild(scrollRow);
			});
		});

		// Assemble tables
		fixedTable.appendChild(fixedHeader);
		fixedTable.appendChild(fixedBody);
		scrollTable.appendChild(scrollHeader);
		scrollTable.appendChild(scrollBody);

		// Create and append containers
		const fixedContainer = document.createElement('div');
		fixedContainer.className = 'fixed-container';
		fixedContainer.appendChild(fixedTable);

		scrollWrapper.appendChild(scrollTable);

		chartView.appendChild(fixedContainer);
		chartView.appendChild(scrollWrapper);
	}
	// Data persistence
	const DataStore = {
		save: function (data) {
			try {
				localStorage.setItem('studentsData', JSON.stringify(data));
				localStorage.setItem('studentsBackup', JSON.stringify(data));
				return true;
			} catch (error) {
				console.error('Error saving data:', error);
				return false;
			}
		},

		load: function () {
			try {
				const data = localStorage.getItem('studentsData');
				if (data) return JSON.parse(data);

				const backup = localStorage.getItem('studentsBackup');
				if (backup) return JSON.parse(backup);

				return { students: [] };
			} catch (error) {
				console.error('Error loading data:', error);
				return { students: [] };
			}
		},
	};

	// Import/Export functions
	function exportData() {
		const data = JSON.stringify({ students }, null, 2);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'students.json';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
		showNotification('Data exported successfully', 'success');
	}

	async function importData(file) {
		try {
			const text = await file.text();
			const data = JSON.parse(text);
			if (Array.isArray(data.students)) {
				students = data.students;
				renderStudents();
				debouncedSave();
				showNotification('Data imported successfully', 'success');
			} else {
				throw new Error('Invalid data format');
			}
		} catch (error) {
			showNotification('Error importing data', 'error');
			console.error('Import error:', error);
		}
	}

	// Debounced save
	let saveTimeout = null;
	function debouncedSave() {
		if (saveTimeout) clearTimeout(saveTimeout);
		saveTimeout = setTimeout(() => {
			DataStore.save({ students });
		}, AUTO_SAVE_DELAY);
	}

	// Render students list
	function renderStudents() {
		studentList.innerHTML = '';

		students.forEach((student) => {
			const li = document.createElement('li');
			li.className = 'student-item';

			const initials = student.name
				.split(' ')
				.map((n) => n[0])
				.join('');

			li.innerHTML = `
                <div class="student-avatar">${initials}</div>
                <div class="student-info">
                    <h3 class="student-name">${student.name}</h3>
                </div>
                <button class="student-delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            `;

			const deleteButton = li.querySelector('.student-delete-button');
			deleteButton.addEventListener('click', () => {
				if (confirm('Are you sure you want to delete this student?')) {
					students = students.filter((s) => s.id !== student.id);
					renderStudents();
					debouncedSave();
				}
			});

			studentList.appendChild(li);
		});
	}

	// Notification system
	function showNotification(message, type = 'info') {
		const notification = document.createElement('div');
		notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            border-radius: 5px;
            color: white;
            z-index: 1000;
            animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
        `;

		const colors = {
			success: '#2ecc71',
			error: '#e74c3c',
			warning: '#f1c40f',
			info: '#3498db',
		};

		notification.style.backgroundColor = colors[type];
		notification.textContent = message;
		document.body.appendChild(notification);

		setTimeout(() => {
			document.body.removeChild(notification);
		}, 3000);
	}

	// Initialize the app
	const ui = setupUI();

	// Event Listeners
	ui.addButton.addEventListener('click', () => {
		const name = prompt('Enter student name:');
		if (name && name.trim()) {
			const newStudent = {
				id: Date.now().toString(),
				name: name.trim(),
			};
			students.push(newStudent);
			renderStudents();
			debouncedSave();
		}
	});

	ui.exportBtn.addEventListener('click', () => {
		const data = {
			students,
			evaluations: {
				language: evaluations.language || {},
				math: evaluations.math || {},
			},
		};
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'students-data.json';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
		showNotification('Data exported successfully', 'success');
	});

	ui.fileInput.addEventListener('change', async (event) => {
		const file = event.target.files[0];
		if (file) {
			try {
				const text = await file.text();
				const data = JSON.parse(text);
				if (Array.isArray(data.students)) {
					students = data.students;
					if (data.evaluations) {
						evaluations = { language: data.evaluations.language || {}, math: data.evaluations.math || {} };
						localStorage.setItem('evaluationsData', JSON.stringify(evaluations));
					}
					renderStudents();
					renderProgressChart();
					debouncedSave();
					showNotification('Data imported successfully', 'success');
				}
			} catch (error) {
				showNotification('Error importing data', 'error');
				console.error('Import error:', error);
			}
		}
		ui.fileInput.value = '';
	});

	ui.importBtn.addEventListener('click', () => {
		ui.fileInput.click();
	});

	// Load initial data
	const loadedData = DataStore.load();
	students = loadedData.students || [];
	renderStudents();

	if (students.length > 0) {
		showNotification('Data loaded successfully', 'success');
	}

	// Periodic backup
	setInterval(() => {
		if (students.length > 0) {
			DataStore.save({ students });
		}
	}, 5 * 60 * 1000);
});
