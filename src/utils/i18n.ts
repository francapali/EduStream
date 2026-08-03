export type Language = 'en' | 'ta' | 'fr' | 'it';

export interface TranslationDictionary {
  appName: string;
  appSubName: string;
  tagline: string;
  teacherPortal: string;
  studentView: string;
  searchPlaceholder: string;
  helplinesBtn: string;
  logoutBtn: string;
  darkMode: string;
  lightMode: string;
  selectLanguage: string;
  
  // Tabs
  overviewTab: string;
  atRiskTab: string;
  whatIfTab: string;
  analyticsTab: string;
  studentDashboardTab: string;

  // Student Metaphor Labels (Kind & Encouraging)
  studentStatusTitle: string;
  metaphorCategory1: string;
  metaphorCategory2: string;
  metaphorCategory3: string;
  metaphorCategory4: string;
  metaphorCategory5: string;
  encouragementCategory1: string;
  encouragementCategory2: string;
  encouragementCategory3: string;
  encouragementCategory4: string;
  encouragementCategory5: string;

  // Metrics
  cgpaLabel: string;
  predictedCgpaLabel: string;
  overallAttendanceLabel: string;
  batchRankLabel: string;
  riskLevelLabel: string;
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;
  criticalRisk: string;

  // Faculty View
  classPerformanceOverview: string;
  rfModelSummary: string;
  studentRoster: string;
  logInterventionBtn: string;
  shapTitle: string;

  // Helplines Modal
  coimbatoreHelplinesTitle: string;
  coimbatoreHelplinesSub: string;
  emergencyCategory: string;
  mentalHealthCategory: string;
  academicCategory: string;
  medicalCategory: string;

  // Simulation & What-If
  whatIfTitle: string;
  whatIfSub: string;
  runSimulationBtn: string;
  predictedOutcome: string;

  // Usability Advice & Toasts
  toastLangChanged: string;
  toastThemeToggled: string;
  toastInterventionSaved: string;
  toastSimulationComplete: string;
  toastStudentSelected: string;
  smartAdviceTitle: string;
  smartAdviceText: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: "EduStream Analytics",
    appSubName: "University Helper for Teachers and Students",
    tagline: "Real-Time 4-Year Student Trajectory & Explainable AI Analyzer",
    teacherPortal: "Teacher Portal",
    studentView: "Student View",
    searchPlaceholder: "Search students by name, roll no, or branch...",
    helplinesBtn: "Coimbatore Helplines",
    logoutBtn: "Sign Out",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    selectLanguage: "Language",

    overviewTab: "Overview",
    atRiskTab: "Early Interventions",
    whatIfTab: "Grade Simulator",
    analyticsTab: "XAI SHAP Drivers",
    studentDashboardTab: "My Progress Journey",

    studentStatusTitle: "Your Personal Academic Learning Journey",
    metaphorCategory1: "Starlight Navigator 🌌 — Flying High with Outstanding Academic Momentum!",
    metaphorCategory2: "Steady Voyager 🚀 — Sailing Smoothly Towards Academic Excellence!",
    metaphorCategory3: "Rising Phoenix 🌿 — Gathering Strength and Focus for Your Next Breakthrough!",
    metaphorCategory4: "Mountain Climber 🧗 — Stepping Steadily Upward, Every Little Effort Counts!",
    metaphorCategory5: "Seed in Golden Soil 🌰 — Preparing for a Remarkable Turnaround. Support is All Around You!",

    encouragementCategory1: "Your dedication is shining brightly. Keep inspiring everyone around you with your wonderful journey!",
    encouragementCategory2: "You are making impressive progress every day. Your steady rhythm is carrying you to great heights!",
    encouragementCategory3: "Every session is an opportunity to blossom. You have great potential waiting to be unlocked!",
    encouragementCategory4: "The path upward takes patience, but support and guidance are with you at every step. You can do this!",
    encouragementCategory5: "Remember that every challenge is the beginning of a fresh breakthrough. Reach out to your mentors—we are warmly here for you!",

    cgpaLabel: "Current CGPA",
    predictedCgpaLabel: "Random Forest Predicted CGPA",
    overallAttendanceLabel: "Overall Attendance",
    batchRankLabel: "Batch Standing",
    riskLevelLabel: "Academic Trajectory Status",
    lowRisk: "Excellent Standing",
    moderateRisk: "Steady Progress",
    highRisk: "Requires Guidance",
    criticalRisk: "High Priority Support",

    classPerformanceOverview: "Class Academic Trajectory Overview",
    rfModelSummary: "Python Random Forest ML Model Insights",
    studentRoster: "Enrolled Student Roster",
    logInterventionBtn: "Log Faculty Support Record",
    shapTitle: "SHAP Explainable Feature Drivers",

    coimbatoreHelplinesTitle: "Coimbatore & Tamil Nadu Emergency Support Helplines",
    coimbatoreHelplinesSub: "Verified official emergency contacts & counseling helplines near Coimbatore, India.",
    emergencyCategory: "District Emergency & Student Welfare",
    mentalHealthCategory: "Tele-MANAS & Mental Health Guidance",
    academicCategory: "Anna University Coimbatore & Academic Cell",
    medicalCategory: "Coimbatore Medical College & Condonation",

    whatIfTitle: "Interactive Grade Trajectory Simulator",
    whatIfSub: "Adjust attendance and quiz targets to see real-time Random Forest predictions.",
    runSimulationBtn: "Calculate Trajectory",
    predictedOutcome: "Predicted Trajectory Result",

    toastLangChanged: "Language switched to English",
    toastThemeToggled: "Theme mode updated",
    toastInterventionSaved: "Faculty support intervention recorded in database!",
    toastSimulationComplete: "Random Forest simulation updated successfully!",
    toastStudentSelected: "Active student profile loaded",
    smartAdviceTitle: "Proactive Usability Tip",
    smartAdviceText: "Use the top language selector to view Tamil, French, or Italian. Click 'Grade Simulator' to simulate live Random Forest outcomes!"
  },

  ta: {
    appName: "எடுஸ்ட்ரீம் பகுப்பாய்வு",
    appSubName: "University Helper for Teachers and Students",
    tagline: "நிகழ்நேர 4-ஆண்டு மாணவர் முன்னேற்றம் மற்றும் XAI பகுப்பாய்வு",
    teacherPortal: "ஆசிரியர் போர்ட்டல்",
    studentView: "மாணவர் பார்வை",
    searchPlaceholder: "பெயர், ரோல் எண் அல்லது துறை மூலம் தேடவும்...",
    helplinesBtn: "கோவை உதவி எண்கள்",
    logoutBtn: "வெளியேறு",
    darkMode: "இரவு முறை",
    lightMode: "பகல் முறை",
    selectLanguage: "மொழி",

    overviewTab: "மேலோட்டம்",
    atRiskTab: "முன்னெச்சரிக்கை நடவடிக்கைகள்",
    whatIfTab: "மதிப்பெண் மாதிரி",
    analyticsTab: "XAI SHAP காரணிகள்",
    studentDashboardTab: "என் கல்விப் பயணம்",

    studentStatusTitle: "உங்கள் தனிப்பட்ட கல்வி கற்றல் பயணம்",
    metaphorCategory1: "நட்சத்திர வழிகாட்டி 🌌 — மிகச்சிறந்த கல்வி வேகத்துடன் உயர்ந்து பறக்கிறீர்கள்!",
    metaphorCategory2: "நிலையான பயணி 🚀 — கல்விச் சிறப்பை நோக்கி மென்மையாகப் பயணிக்கிறீர்கள்!",
    metaphorCategory3: "உயரும் ஃபீனிக்ஸ் 🌿 — உங்கள் அடுத்த வெற்றிக்கு கவனத்தையும் ஆற்றலையும் திரட்டுகிறீர்கள்!",
    metaphorCategory4: "மலை ஏறுபவர் 🧗 — படிப்படியாக மேலேறுகிறீர்கள், ஒவ்வொரு முயற்சியும் முக்கியமானது!",
    metaphorCategory5: "பொன் நிலத்தில் விதை 🌰 — ஒரு சிறந்த மாற்றத்திற்குத் தயாராகிறீர்கள். ஆதரவு உங்களைச் சுற்றி உள்ளது!",

    encouragementCategory1: "உங்கள் அர்ப்பணிப்பு பிரகாசமாக ஒளிர்கிறது. உங்கள் பயணத்தால் மற்றவர்களுக்கு ஊக்கமளியுங்கள்!",
    encouragementCategory2: "நீங்கள் தினமும் அற்புதம் செய்கிறீர்கள். உங்கள் நிலையான வேகம் உங்களை உயர்த்தும்!",
    encouragementCategory3: "ஒவ்வொரு வகுப்பும் வளர ஒரு வாய்ப்பு. உங்களிடம் சிறந்த ஆற்றல் உள்ளது!",
    encouragementCategory4: "முன்னேற்றத்திற்கு பொறுமை தேவை, ஆனால் வழிகாட்டிகள் எப்போதும் உங்களுடன் உள்ளனர். உங்களால் முடியும்!",
    encouragementCategory5: "ஒவ்வொரு சவாலும் ஒரு புதிய மாற்றத்தின் தொடக்கம். உங்கள் ஆசிரியர்களைத் தொடர்பு கொள்ளுங்கள், நாங்கள் உங்களுடன் இருக்கிறோம்!",

    cgpaLabel: "தற்போதைய CGPA",
    predictedCgpaLabel: "கணிக்கப்பட்ட CGPA (Random Forest)",
    overallAttendanceLabel: "மொத்த வருகை",
    batchRankLabel: "வரிசை நிலை",
    riskLevelLabel: "கல்விப் பயண நிலை",
    lowRisk: "மிகச்சிறந்த நிலை",
    moderateRisk: "சீரான முன்னேற்றம்",
    highRisk: "வழிகாட்டல் தேவை",
    criticalRisk: "சிறப்பு ஆதரவு தேவை",

    classPerformanceOverview: "வகுப்பு கல்வி நிலை மேலோட்டம்",
    rfModelSummary: "பைதான் ரேண்டம் ஃபாரஸ்ட் ML மாதிரியின் நுண்ணறிவு",
    studentRoster: "மாணவர் பட்டியல்",
    logInterventionBtn: "ஆசிரியர் ஆதரவு பதிவைச் சேர்க்கவும்",
    shapTitle: "SHAP விளக்கக்கூடிய காரணிகள்",

    coimbatoreHelplinesTitle: "கோயம்புத்தூர் மற்றும் தமிழ்நாடு அவசர உதவி எண்கள்",
    coimbatoreHelplinesSub: "கோவை மற்றும் தமிழ்நாடு அதிகாரப்பூர்வ அவசர மற்றும் ஆலோசனை தொடர்புகள்.",
    emergencyCategory: "மாவட்ட அவசரநிலை மற்றும் மாணவர் நலன்",
    mentalHealthCategory: "டெலி-மானஸ் மற்றும் மனநல ஆலோசனை",
    academicCategory: "அண்ணா பல்கலைக்கழகம் கோவை மையம்",
    medicalCategory: "கோவை மருத்துவக் கல்லூரி மருத்துவமனை",

    whatIfTitle: "மதிப்பெண் மற்றும் வருகை கணிப்பான்",
    whatIfSub: "வருகை மற்றும் வினாடி வினா இலக்குகளை மாற்றி ரேண்டம் ஃபாரஸ்ட் கணிப்புகளைப் பார்க்கவும்.",
    runSimulationBtn: "கணிப்பைக் கணக்கிடு",
    predictedOutcome: "கணிக்கப்பட்ட முடிவு",

    toastLangChanged: "மொழி தமிழாக மாற்றப்பட்டது",
    toastThemeToggled: "வண்ண முறை மாற்றப்பட்டது",
    toastInterventionSaved: "ஆசிரியர் ஆதரவு பதிவு தரவுத்தளத்தில் சேமிக்கப்பட்டது!",
    toastSimulationComplete: "ரேண்டம் ஃபாரஸ்ட் கணிப்பு வெற்றிகரமாக முடிந்தது!",
    toastStudentSelected: "மாணவர் சுயவிவரம் ஏற்றப்பட்டது",
    smartAdviceTitle: "பயன்பாட்டு குறிப்பு",
    smartAdviceText: "மேல் மெனுவில் மொழியை மாற்றலாம். ரேண்டம் ஃபாரஸ்ட் கணிப்புகளைப் பார்க்க 'மதிப்பெண் மாதிரி' என்பதைக் கிளிக் செய்யவும்!"
  },

  fr: {
    appName: "EduStream Analytique",
    appSubName: "University Helper for Teachers and Students.",
    tagline: "Trajectoire Étudiante sur 4 Ans en Temps Réel et Analyseur IA Explicable",
    teacherPortal: "Portail Enseignant",
    studentView: "Espace Étudiant",
    searchPlaceholder: "Rechercher par nom, matricule ou filière...",
    helplinesBtn: "Assistance Coimbatore",
    logoutBtn: "Déconnexion",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    selectLanguage: "Langue",

    overviewTab: "Vue d'ensemble",
    atRiskTab: "Interventions Précoces",
    whatIfTab: "Simulateur de Notes",
    analyticsTab: "Facteurs XAI SHAP",
    studentDashboardTab: "Mon Parcours Académique",

    studentStatusTitle: "Votre Parcours Personnel d'Apprentissage",
    metaphorCategory1: "Navigateur d'Étoiles 🌌 — En plein envol avec un élan académique exceptionnel !",
    metaphorCategory2: "Voyageur Régulier 🚀 — En route constante vers l'excellence académique !",
    metaphorCategory3: "Phénix en Ascension 🌿 — Rassemblez vos forces pour votre prochain succès !",
    metaphorCategory4: "Alpiniste Courageux 🧗 — Un pas à la fois vers le sommet, chaque effort compte !",
    metaphorCategory5: "Graine en Terre Fertile 🌰 — Préparation d'une belle éclosion. Le soutien vous entoure !",

    encouragementCategory1: "Votre dévouement rayonne. Continuez d'inspirer vos camarades par votre parcours !",
    encouragementCategory2: "Vous faites des progrès impressionnants chaque jour. Votre rythme régulier vous mène loin !",
    encouragementCategory3: "Chaque cours est une opportunité de grandir. Vous avez un grand potentiel !",
    encouragementCategory4: "Le chemin vers le sommet demande de la patience, mais nous sommes là pour vous guider. Courage !",
    encouragementCategory5: "Chaque défi est le début d'un renouveau. Contactez vos mentors, nous sommes à vos côtés !",

    cgpaLabel: "CGPA Actuelle",
    predictedCgpaLabel: "CGPA Prédite (Random Forest)",
    overallAttendanceLabel: "Présence Globale",
    batchRankLabel: "Rang dans la Promo",
    riskLevelLabel: "Statut de la Trajectoire",
    lowRisk: "Excellente Situation",
    moderateRisk: "Progression Régulière",
    highRisk: "Accompagnement Conseillé",
    criticalRisk: "Soutien Prioritaire",

    classPerformanceOverview: "Aperçu de la Trajectoire Académique de la Classe",
    rfModelSummary: "Analyse du Modèle Python Random Forest",
    studentRoster: "Registre des Étudiants",
    logInterventionBtn: "Enregistrer un Soutien Pédagogique",
    shapTitle: "Analyse des Facteurs Explicables SHAP",

    coimbatoreHelplinesTitle: "Lignes d'Urgence Coimbatore & Tamil Nadu",
    coimbatoreHelplinesSub: "Contacts d'urgence et d'assistance vérifiés à Coimbatore, Inde.",
    emergencyCategory: "Urgence Préfecture & Bien-être Étudiant",
    mentalHealthCategory: "Soutien Psychologique & Tele-MANAS",
    academicCategory: "Université Anna Coimbatore & Cellule Pédagogique",
    medicalCategory: "Hôpital Médical de Coimbatore & Certificats",

    whatIfTitle: "Simulateur Interactif de Trajectoire de Notes",
    whatIfSub: "Ajustez la présence et les examens pour voir les prédictions du modèle Random Forest.",
    runSimulationBtn: "Calculer la Trajectoire",
    predictedOutcome: "Résultat de la Prédiction",

    toastLangChanged: "Langue changée en Français",
    toastThemeToggled: "Thème d'affichage mis à jour",
    toastInterventionSaved: "Intervention enregistrée dans la base de données !",
    toastSimulationComplete: "Simulation Random Forest calculée avec succès !",
    toastStudentSelected: "Profil étudiant chargé",
    smartAdviceTitle: "Conseil d'Utilisation",
    smartAdviceText: "Changez de langue dans le menu supérieur. Utilisez le simulateur pour tester les prédictions Random Forest !"
  },

  it: {
    appName: "EduStream Analytics",
    appSubName: "University Helper for Teachers and Students",
    tagline: "Traiettoria Accademica 4 Anni in Tempo Reale e Analizzatore XAI",
    teacherPortal: "Portale Docenti",
    studentView: "Area Studente",
    searchPlaceholder: "Cerca studente per nome, matricola o corso...",
    helplinesBtn: "Numeri Utili Coimbatore",
    logoutBtn: "Esci",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",
    selectLanguage: "Lingua",

    overviewTab: "Panoramica",
    atRiskTab: "Interventi Precoci",
    whatIfTab: "Simulatore Voti",
    analyticsTab: "Fattori XAI SHAP",
    studentDashboardTab: "Il Mio Percorso",

    studentStatusTitle: "Il Tuo Percorso Personale di Apprendimento",
    metaphorCategory1: "Navigatore delle Stelle 🌌 — In volo con un ritmo accademico straordinario!",
    metaphorCategory2: "Viaggiatore Costante 🚀 — In rotta verso l'eccellenza accademica!",
    metaphorCategory3: "Fenice in Ascesa 🌿 — Raccogli forze e concentrazione per la tua prossima svolta!",
    metaphorCategory4: "Scalatore di Montagna 🧗 — Un passo alla volta verso l'alto, ogni piccolo sforzo conta!",
    metaphorCategory5: "Seme in Terra Fertile 🌰 — Ti stai preparando per un grande germoglio. Il nostro supporto è con te!",

    encouragementCategory1: "La tua dedizione risplende. Continua a ispirare chi ti sta intorno con il tuo bellissimo percorso!",
    encouragementCategory2: "Stai facendo progressi fantastici ogni giorno. Il tuo ritmo costante ti porterà lontano!",
    encouragementCategory3: "Ogni lezione è un'opportunità per sbocciare. Hai un grande potenziale da esprimere!",
    encouragementCategory4: "La salita richiede pazienza, ma non sei mai solo: siamo al tuo fianco a ogni passo. Forza!",
    encouragementCategory5: "Ogni sfida è l'inizio di una grande rinascita. Contatta i tuoi mentori, siamo qui per te!",

    cgpaLabel: "Media CGPA Attuale",
    predictedCgpaLabel: "CGPA Prevista (Random Forest)",
    overallAttendanceLabel: "Presenza Complessiva",
    batchRankLabel: "Posizione nel Corso",
    riskLevelLabel: "Stato della Traiettoria",
    lowRisk: "Posizione Eccellente",
    moderateRisk: "Progresso Costante",
    highRisk: "Richiede Supporto",
    criticalRisk: "Assistenza Prioritaria",

    classPerformanceOverview: "Panoramica della Traiettoria della Classe",
    rfModelSummary: "Analisi del Modello Python Random Forest",
    studentRoster: "Registro degli Studenti",
    logInterventionBtn: "Registra Supporto Docente",
    shapTitle: "Fattori Spiegabili SHAP",

    coimbatoreHelplinesTitle: "Numeri Utili e Emergenze Coimbatore & Tamil Nadu",
    coimbatoreHelplinesSub: "Contatti ufficiali di emergenza e supporto psicologico vicino a Coimbatore, India.",
    emergencyCategory: "Emergenze Distretto & Tutela Studenti",
    mentalHealthCategory: "Tele-MANAS e Supporto Psicologico",
    academicCategory: "Anna University Coimbatore e Segreteria",
    medicalCategory: "Ospedale Medico Coimbatore e Giustificativi",

    whatIfTitle: "Simulatore Interattivo Voti e Traiettoria",
    whatIfSub: "Modifica frequenza ed esami per vedere le previsioni del modello Random Forest in tempo reale.",
    runSimulationBtn: "Calcola Traiettoria",
    predictedOutcome: "Risultato Previsione ML",

    toastLangChanged: "Lingua impostata su Italiano",
    toastThemeToggled: "Modalità tema aggiornata",
    toastInterventionSaved: "Intervento docente salvato nel database!",
    toastSimulationComplete: "Simulazione Random Forest completata con successo!",
    toastStudentSelected: "Profilo studente caricato",
    smartAdviceTitle: "Consiglio d'Uso",
    smartAdviceText: "Cambia lingua nel menu in alto. Usa il 'Simulatore Voti' per testare le previsioni Random Forest!"
  }
};
