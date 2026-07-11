import React from "react";

export const translations = {

// TRANSLATIONS EUSKALIA PUBLIC

  // =========================
  //         HEADER
  // =========================
    header: {
    tools:     { ES: "Herramientas",  EUS: "Tresnak",        EN: "Tools",        FR: "Outils" },
    resources: { ES: "Recursos",      EUS: "Baliabideak",    EN: "Resources",    FR: "Ressources" },
    pricing:   { ES: "Precios",       EUS: "Prezioak",       EN: "Pricing",      FR: "Tarifs" },
    signIn:    { ES: "Iniciar sesión",EUS: "Hasi saioa",     EN: "Sign in",      FR: "Connexion" },
    startFree: { ES: "Crear cuenta",  EUS: "Sortu kontua",   EN: "Create account",FR: "Créer un compte" },
    assistant: { ES: "Asistente de IA", EUS: "IA laguntzailea", EN: "AI Assistant", FR: "Assistant IA" },
    contact:   { ES: "Contacto",      EUS: "Kontaktua",      EN: "Contact",      FR: "Contact" },
    more_information: { ES: "Más información", EUS: "Informazio gehiago", EN: "More information", FR: "Plus d'informations" },
  },

  toolsMenu: {
    translatorTitle:    { ES: "Traductor",         EUS: "Itzultzailea",        EN: "Translator",        FR: "Traducteur" },
    translatorSubtitle: { ES: "Euskera ↔ Español", EUS: "Euskara ↔ Gaztelania",EN: "Basque ↔ Spanish", FR: "Basque ↔ Espagnol" },
    summaryTitle:       { ES: "Resumidor",         EUS: "Laburtzailea",        EN: "Summarizer",        FR: "Résumé IA" },
    summarySubtitle:    { ES: "Resúmenes con IA",  EUS: "Laburpenak IA-rekin",  EN: "AI summaries",     FR: "Résumés par IA" },
    correctorTitle:     { ES: "Corrector", EUS: "Zuzentzailea", EN: "Corrector", FR: "Correcteur" },
    correctorSubtitle:  { ES: "Corrige textos", EUS: "Testuak zuzendu", EN: "Correct texts", FR: "Corrige les textes" },
    paraphraserTitle:   { ES: "Parafraseador", EUS: "Parafraseatzailea", EN: "Paraphraser", FR: "Paraphraseur" },
    paraphraserSubtitle:{ ES: "Reescribe textos con IA", EUS: "Testuak berridatzi IArekin", EN: "Rewrite texts with AI", FR: "Réécrire des textes avec IA" },
    textCreatorTitle: { ES: "Creador de texto", EUS: "Testu sortzailea", EN: "Text creator", FR: "Créateur de texte" },
    textCreatorSubtitle: { ES: "Genera textos con IA", EUS: "Sortu testuak IA-rekin", EN: "Generate texts with AI", FR: "Générez des textes avec IA" },
    emailCreatorTitle: { ES: "Creador de email", EUS: "Email sortzailea", EN: "Email creator", FR: "Créateur d’email" },
    emailCreatorSubtitle: { ES: "Genera emails automáticamente", EUS: "Sortu emailak automatikoki", EN: "Generate emails automatically", FR: "Générez des emails automatiquement" },

  },

  resourcesMenu: {
    support:     { ES: "Soporte",     EUS: "Laguntza",      EN: "Support",      FR: "Support" }, 
    aiChat:      { ES: "Chat de IA",  EUS: "IA txata",     EN: "AI Chat",      FR: "Chat IA" },
    suggestions: { ES: "Sugerencias", EUS: "Iradokizunak", EN: "Suggestions",  FR: "Suggestions" },
  },

  // =========================
  //       TRANSLATOR
  // =========================
  translator: {
    left_placeholder:  {
      ES: "Escribe o pega el texto aquí.",
      EUS: "Idatzi edo itsatsi testua hemen.",
      EN: "Write or paste the text here.",
      FR: "Écris ou colle le texte ici."
    },
    right_placeholder: {
      ES: "Aquí aparecerá la traducción.",
      EUS: "Hemen agertuko da itzulpena.",
      EN: "The translation will appear here.",
      FR: "La traduction apparaîtra ici."
    },
    translate_button: {
    ES: "Traducir",
    EUS: "Itzuli",
    EN: "Translate",
    FR: "Traduire"
   },

  detect_language: {
    ES: "Detectar idioma",
    EUS: "Hizkuntza detektatu",
    EN: "Detect language",
    FR: "Détecter la langue",
  }, 
  detected: {
    ES: "detectado",
    EUS: "detektatua",
    EN: "detected",
    FR: "détecté",
  },
  stop: {
    ES: "detener",
    EUS: "gelditu",
    EN: "stop",
    FR: "arrêter",
  },
  
output_language_eus: { ES: "Euskera", EUS: "Euskara", EN: "Basque", FR: "Basque" },
output_language_es: { ES: "Español", EUS: "Gaztelania", EN: "Spanish", FR: "Espagnol" },
output_language_en: { ES: "Inglés", EUS: "Ingelesa", EN: "English", FR: "Anglais" },
output_language_fr: { ES: "Francés", EUS: "Frantsesa", EN: "French", FR: "Français" },
output_language_de: { ES: "Alemán", EUS: "Alemana", EN: "German", FR: "Allemand" },
output_language_it: { ES: "Italiano", EUS: "Italiera", EN: "Italian", FR: "Italien" },
output_language_pt: { ES: "Portugués", EUS: "Portugesa", EN: "Portuguese", FR: "Portugais" },
output_language_nl: { ES: "Neerlandés", EUS: "Neerlandera", EN: "Dutch", FR: "Néerlandais" },
output_language_zh: { ES: "Chino", EUS: "Txinera", EN: "Chinese", FR: "Chinois" },
output_language_ar: { ES: "Árabe", EUS: "Arabiera", EN: "Arabic", FR: "Arabe" },
output_language_ru: { ES: "Ruso", EUS: "Errusiera", EN: "Russian", FR: "Russe" },
output_language_ja: { ES: "Japonés", EUS: "Japoniera", EN: "Japanese", FR: "Japonais" },
output_language_sv: { ES: "Sueco", EUS: "Suediera", EN: "Swedish", FR: "Suédois" },
output_language_ro: { ES: "Rumano", EUS: "Errumaniera", EN: "Romanian", FR: "Roumain" },
output_language_uk: { ES: "Ucraniano", EUS: "Ukrainera", EN: "Ukrainian", FR: "Ukrainien" },


    /* === NUEVAS CLAVES para los botones/tooltip del Hero === */
    listen:     { ES: "Escuchar",     EUS: "Entzun",      EN: "Listen",        FR: "Écouter" },
    copy:       { ES: "Copiar",       EUS: "Kopiatu",     EN: "Copy",          FR: "Copier" },
    copied:     { ES: "Copiado",      EUS: "Kopiatuta",   EN: "Copied",        FR: "Copié" },
    share:      { ES: "Compartir",    EUS: "Partekatu",   EN: "Share",         FR: "Partager" },
    clear_left: { ES: "Borrar",       EUS: "Garbitu",     EN: "Clear",         FR: "Effacer" },
    dictate:    { ES: "Dictar",       EUS: "Diktatu",     EN: "Dictate",       FR: "Dicter" },
    listening:  { ES: "Escuchando…",  EUS: "Entzuten…",   EN: "Listening…",    FR: "Écoute…" },
    loading:    { ES: "Traduciendo…", EUS: "Itzultzen…",  EN: "Translating…",  FR: "Traduction…" },
  },

  save_button_label: {
    ES: "Guardar",
    EUS: "Gorde",
    EN: "Save",
    FR: "Enregistrer",
  },

  library_saved_toast: {
    ES: "Guardado en biblioteca",
    EUS: "Liburutegian gordeta",
    EN: "Saved to library",
    FR: "Enregistré dans la bibliothèque",
  },
  upgradeBanner_title: { 
  ES: "Has llegado al límite de Euskalia", 
  EUS: "Euskaliako mugara iritsi zara", 
  EN: "You have reached Euskalia's limit", 
  FR: "Vous avez atteint la limite d’Euskalia" 
},

upgradeBanner_subtitle: { 
  ES: "Si necesitas más uso o tienes un caso especial, contáctanos.", 
  EUS: "Erabilera gehiago behar baduzu edo kasu bereziren bat baduzu, jarri gurekin harremanetan.", 
  EN: "If you need more usage or have a special case, contact us.", 
  FR: "Si vous avez besoin de plus d'utilisation ou un cas spécial, contactez-nous." 
},

upgradeBanner_cta: { 
  ES: "Contactar soporte", 
  EUS: "Jarri harremanetan", 
  EN: "Contact support", 
  FR: "Contacter le support" 
},
translator_limit_reached: {
  ES: "Has superado el límite máximo de caracteres del traductor.",
  EUS: "Itzultzailearen gehienezko karaktere-muga gainditu duzu.",
  EN: "You have exceeded the translator's maximum character limit.",
  FR: "Vous avez dépassé la limite maximale de caractères du traducteur.",
  },
translator_daily_limit_reached: {
  ES: "Has superado el límite diario de solicitudes del traductor.",
  EUS: "Itzultzailearen eguneko eskaera-muga gainditu duzu.",
  EN: "You have exceeded the translator’s daily request limit.",
  FR: "Vous avez dépassé la limite quotidienne de requêtes du traducteur.",
},
alternatives_title: { EUS: "Aukera desberdinak:", ES: "Alternativas:", EN: "Alternatives:", FR: "Alternatives:" },

searching_alternatives: { EUS: "Aukera desberdinak bilatzen...", ES: "Buscando alternativas...", EN: "Searching alternatives...", FR: "Recherche d'alternatives..." },


  // =========================
  //       SUMMARIZER
  // =========================    
  summary: {
    title:                { ES: "Resumidor", EUS: "Laburtzailea", EN: "Summarizer", FR: "Résumé IA" },
    sources_title:        { ES: "Fuentes", EUS: "Iturriak", EN: "Sources", FR: "Sources" },
    sources_tab_text:     { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
    sources_tab_document: { ES: "Documento", EUS: "Dokumentua", EN: "Document", FR: "Document" },
    sources_tab_url:      { ES: "URL", EUS: "URL", EN: "URL", FR: "URL" },
    copy:                 { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier"},
    copied:               { ES: "Copiado", EUS: "Kopiatuta", EN: "Copied", FR: "Copié"},
    pdf:                  { ES: "PDF", EUS: "PDF", EN: "PDF", FR: "PDF" },
    clear_input:          { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },
    expand:               { ES: "Ampliar", EUS: "Handitu", EN: "Expand", FR: "Agrandir" },
    close:                { ES: "Cerrar", EUS: "Itxi", EN: "Close", FR: "Fermer" },

    //Texto
     enter_text_here_full:  {
      ES: "Escribe o pega el texto aquí.",
      EUS: "Idatzi edo itsatsi testua hemen.",
      EN: "Write or paste the text here.",
      FR: "Écris ou colle le texte ici."
    },
    // Documentos
    choose_file_title: { ES: "Elige tu archivo o carpeta", EUS: "Aukeratu zure fitxategia edo karpeta", EN: "Choose your file or folder", FR: "Choisis ton fichier ou dossier" },
    accepted_formats:  { ES: "Formatos admitidos: .pdf, .docx, .txt", EUS: "Onartutako formatuak: .pdf, .docx, .txt", EN: "Allowed formats: .pdf, .docx, .txt", FR: "Formats autorisés : .pdf, .docx, .txt"},
    folder_hint:       { ES: "Se permite un solo archivo por resultado.", EUS: "Emaitza bakoitzeko fitxategi bakarra onartzen da.", EN: "Only one file is allowed per result.", FR: "Un seul fichier est autorisé par résultat."},
    remove:            { ES: "Quitar", EUS: "Kendu", EN: "Remove", FR: "Retirer" },

    // URLs
    paste_urls_label:        { ES: "Pegar URLs*",   EUS: "URLak itsatsi*", EN: "Paste URLs*",  FR: "Coller des URLs*" },
    add_url:                 { ES: "Añadir URLs",   EUS: "URLak gehitu",   EN: "Add URLs",     FR: "Ajouter des URLs" },
    save_urls:               { ES: "Guardar",       EUS: "Gorde",          EN: "Save",         FR: "Enregistrer" },
    cancel:                  { ES: "Cancelar",      EUS: "Ezeztatu",       EN: "Cancel",       FR: "Annuler" },
    urls_note_visible:       { ES: "Solo se importará el texto visible del sitio web.", EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.", EN: "Only the visible text from the website will be imported.", FR: "Seul le texte visible du site sera importé." },
    urls_note_paywalled:     { ES: "No se admiten artículos de pago.", EUS: "Ordainpeko artikuluak ez dira onartzen.", EN: "Paywalled articles are not supported.", FR: "Les articles payants ne sont pas pris en charge." },
    paste_urls_placeholder:  { ES: "Introduce URLs separadas por línea", EUS: "Itsatsi URLak lerroka bereizita", EN: "Enter one or more URLs (one per line)", FR: "Saisis une ou plusieurs URLs (une par ligne)" },


    // Mensajes de ayuda (izquierda/derecha)
    create_help_left: {
      ES:  "Aquí aparecerán tus textos o documentos subidos. Puedes añadir archivos PDF, texto copiado, enlaces web...",
      EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak. Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak...",
      EN:  "Your uploaded texts or documents will appear here. You can add PDFs, pasted text, web links...",
      FR:  "Tes textes ou documents importés apparaîtront ici. Tu peux ajouter des PDF, du texte collé, des liens web..."
    },
    create_help_right: {
      ES:  "Aquí verás el resultado generado por la IA, junto.",
      EUS: "Hemen ikusiko duzu adimen artifizialak sortutako emaitza.",
      EN:  "Here you will see the result generated by the AI.",
      FR:  "Ici, tu verras le résultat généré par l’IA."
    },

    // --- Longitud del resumen (nuevas) ---
    length_short:  { ES: "Breve",     EUS: "Laburra",  EN: "Short",     FR: "Court" },
    length_medium: { ES: "Medio",     EUS: "Ertaina",  EN: "Medium",    FR: "Moyen" },
    length_long:   { ES: "Detallado", EUS: "Zehatza",  EN: "Detailed",  FR: "Détaillé" },

    output_language:     { ES: "Idioma",     EUS: "Hizkuntza", EN: "Language" , FR: "Langue" },
    output_language_eus: { ES: "Euskera",    EUS: "Euskara",   EN: "Basque",    FR: "Basque" },
    output_language_es:  { ES: "Castellano", EUS: "Gaztelania",EN: "Spanish",   FR: "Espagnol" },
    output_language_en:  { ES: "Inglés",     EUS: "Ingelesa",  EN: "English",   FR: "Anglais" },
    output_language_fr:  { ES: "Francés",    EUS: "Frantsesa", EN: "French",    FR: "Français" },


    // Prompt
    generate_from_sources: { ES: "Generar resumen", EUS: "Laburpena sortu", EN: "Generate summary", FR: "Générer le résumé" },

    bottom_input_ph: {
      ES:  "Escribe el prompt aqui",
      EUS: "Idatzi zure prompta hemen.",
      EN:  "Write your prompt here",
      FR:  "Écris ton prompt ici"
    },

    generate_with_prompt: { ES: "Generar", EUS: "Sortu", EN: "Generate", FR: "Générer" },

    // Estado de carga
    loading_label: { ES: "Generando el resumen…", EUS: "Laburpena sortzen…", EN: "Generating summary…", FR: "Génération du résumé…" },

    ready_message: {
      ES: "Resumen listo · Guardar en tu biblioteca",
      EUS: "Laburpena prest · Gorde zure liburutegian",
      EN: "Summary ready · Save to your library",
      FR: "Résumé prêt · Enregistrer dans ta bibliothèque"
    },

    save_button_label: {
      ES: "Guardar",
      EUS: "Gorde",
      EN: "Save",
      FR: "Enregistrer"
    },


    /* === NUEVAS CLAVES: aviso de contenido desactualizado === */
    outdated_notice: { ES: "El texto ha cambiado. Actualiza el resumen.", EUS: "Testua aldatu da. Eguneratu laburpena.", EN: "The text has changed. Update the summary.", FR: "Le texte a changé. Mets à jour le résumé." },
    outdated_update: { ES: "Actualizar", EUS: "Eguneratu", EN: "Update", FR: "Mettre à jour" },
    outdated_close:  { ES: "Ocultar aviso", EUS: "Abisua ezkutatu", EN: "Hide notice", FR: "Masquer l’avertissement" },

    /* === NUEVA CLAVE: aviso de mínimo de caracteres === */
    min_chars_hint: {
      ES: "Mínimo {{min}} caracteres",
      EUS: "Gutxienez {{min}} karaktere",
      EN: "Minimum {{min}} characters",
      FR: "Minimum {{min}} caractères",
    },

    error_generic: { ES: "Error generando el resumen.", EUS: "Errorea laburpena sortzean.", EN: "Error generating the summary.", FR: "Erreur lors de la génération du résumé." },
    error_need_input: { ES: "Añade texto suficiente, URLs o documentos antes de generar el resumen.", EUS: "Gehitu testu nahikoa, URLak edo dokumentuak laburpena sortu aurretik.", EN: "Add enough text, URLs or documents before generating the summary.", FR: "Ajoutez du texte, des URLs ou des documents avant de générer le résumé." },
    error_no_api_text: { ES: "No se recibió texto de la API.", EUS: "Ez da testurik jaso APItik.", EN: "No text was received from the API.", FR: "Aucun texte reçu de l’API." },
    only_one_document: { ES: "Solo se admite un documento por resumen.", EUS: "Laburpen bakoitzeko dokumentu bakarra onartzen da.", EN: "Only one document is allowed per summary.", FR: "Un seul document est autorisé par résumé." },
  },
 /* === NUEVAS CLAVES: aviso límite plan gratis === */
  summary_limit_reached: {
  ES: "Has superado el límite máximo de caracteres del resumidor.",
  EUS: "Laburtzailearen gehienezko karaktere-muga gainditu duzu.",
  EN: "You have exceeded the summarizer's maximum character limit.",
  FR: "Vous avez dépassé la limite maximale de caractères du résumeur.",
  },
summary_daily_limit_reached: {
   ES: "Has superado el límite diario de solicitudes del resumidor.",
  EUS: "Laburtzailearen eguneko eskaera-muga gainditu duzu.",
  EN: "You have exceeded the summarizer’s daily request limit.",
  FR: "Vous avez dépassé la limite quotidienne de requêtes du résumeur.",
},
summary_min_chars_required: {
  ES: "El texto debe tener al menos {{min}} caracteres para poder resumirlo. Actualmente tiene {{count}}.",
  EUS: "Testuak gutxienez {{min}} karaktere izan behar ditu laburtu ahal izateko. Momentu honetan {{count}} ditu.",
  EN: "The text must have at least {{min}} characters to be summarized. It currently has {{count}}.",
  FR: "Le texte doit contenir au moins {{min}} caractères pour être résumé. Il en contient actuellement {{count}}.",
},
// =========================
  //       CORRECTOR 
  // =========================
  grammarcorrector: {
  sources_title:        { ES: "Fuentes", EUS: "Iturriak", EN: "Sources", FR: "Sources" },
  sources_tab_text:     { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
  sources_tab_document: { ES: "Documento", EUS: "Dokumentua", EN: "Document", FR: "Document" },
  sources_tab_url:      { ES: "URL", EUS: "URL", EN: "URL", FR: "URL" },
  copy: { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier" },
  copied: { ES: "Copiado", EUS: "Kopiatuta", EN: "Copied", FR: "Copié" },
  clear_input: { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },

  enter_text_here_full: {
    ES: "Escribe o pega aquí el texto que quieres corregir…",
    EUS: "Idatzi edo itsatsi hemen zuzendu nahi duzun testua…",
    EN: "Write or paste the text you want to correct here…",
    FR: "Écris ou colle ici le texte que tu veux corriger…",
  },

  choose_file_title: {
    ES: "Elige tu archivo o carpeta",
    EUS: "Aukeratu zure fitxategia edo karpeta",
    EN: "Choose your file or folder",
    FR: "Choisis ton fichier ou dossier",
  },
 accepted_formats: {
    ES: "Formatos admitidos: .pdf, .docx, .txt",
    EUS: "Onartutako formatuak: .pdf, .docx, .txt",
    EN: "Supported formats: .pdf, .docx, .txt",
    FR: "Formats acceptés : .pdf, .docx, .txt",
  },

  folder_hint: {
    ES: "Se permite un solo archivo por resultado.",
    EUS: "Emaitza bakoitzeko fitxategi bakarra onartzen da.",
    EN: "Only one file is allowed per result.",
    FR: "Un seul fichier est autorisé par résultat.",
  },

  create_help_left: {
    ES: "Aquí aparecerán los textos o documentos que quieras corregir. Puedes pegar texto, subir archivos de texto o añadir URLs.",
    EUS: "Hemen agertuko dira zuzendu nahi dituzun testuak edo dokumentuak. Testua itsatsi, testu-fitxategiak igo edo URLak gehitu ditzakezu.",
    EN: "The texts or documents you want to correct will appear here. You can paste text, upload text files, or add URLs.",
    FR: "Les textes ou documents que tu veux corriger apparaîtront ici. Tu peux coller du texte, importer des fichiers texte ou ajouter des URL.",
  },

  paste_urls_label: { ES: "Pegar URL*", EUS: "Itsatsi URLa*", EN: "Paste URL*", FR: "Coller des URL*" },

  add_url:  { ES: "Añadir URL", EUS: "Gehitu URLa", EN: "Add URL", FR: "Ajouter des URL" },
  save_urls: { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
  cancel:   { ES: "Cancelar", EUS: "Utzi", EN: "Cancel", FR: "Annuler" },

  paste_urls_placeholder: {
    ES: "Introduce aquí una URL para analizar su contenido.",
    EUS: "Sartu hemen URL bat haren edukia aztertzeko.",
    EN: "Enter a URL here to analyze its content.",
    FR: "Entrez une URL ici pour analyser son contenu.",
 },

  urls_note_visible: {
    ES: "Solo se importará el texto visible del sitio web.",
    EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.",
    EN: "Only the visible text from the website will be imported.",
    FR: "Seul le texte visible du site sera importé.",
  },

  urls_note_paywalled: {
    ES: "No se admiten artículos de pago.",
    EUS: "Ordainpeko artikuluak ez dira onartzen.",
    EN: "Paywalled articles are not supported.",
    FR: "Les articles payants ne sont pas pris en charge.",
  },

  remove: { ES: "Quitar", EUS: "Kendu", EN: "Remove", FR: "Retirer" },

  correct_button: { ES: "Corregir texto", EUS: "Zuzendu testua", EN: "Correct text", FR: "Corriger le texte" },

  create_help_right: {
    ES: "Elige la fuente del texto (escribir, subir documento o URL) y pulsa «Corregir texto».",
    EUS: "Aukeratu testuaren iturria (idatzi, dokumentua igo edo URL) eta sakatu «Zuzendu testua».",
    EN: "Choose the text source (type, upload a document, or URL) and click “Correct text”.",
    FR: "Choisis la source du texte (écrire, importer un document ou des URL) puis clique sur « Corriger le texte ».",
  },

  view_changes: { ES: "Ver cambios", EUS: "Ikusi aldaketak", EN: "View changes", FR: "Voir les modifications" },
  hide_changes: { ES: "Ocultar cambios", EUS: "Ezkutatu aldaketak", EN: "Hide changes", FR: "Masquer les modifications" },

  output_language_aria: {
    ES: "Idioma principal del texto",
    EUS: "Testuaren hizkuntza nagusia",
    EN: "Main language of the text",
    FR: "Langue principale du texte",
  },

  clear_input: { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },

  error_too_long: {
    ES: "Has superado el límite máximo de caracteres.",
    EUS: "Gehienezko karaktere-muga gainditu duzu.",
    EN: "You have exceeded the maximum character limit.",
    FR: "Tu as dépassé la limite maximale de caractères.",
  },

  error_need_input: {
    ES: "Añade algo de texto, documentos o URLs antes de pedir la corrección.",
    EUS: "Gehitu testua, dokumentuak edo URLak zuzenketa eskatu aurretik.",
    EN: "Add some text, documents, or URLs before requesting the correction.",
    FR: "Ajoute du texte, des documents ou des URL avant de demander la correction.",
  },

  error_limit: {
    ES: "Has alcanzado el límite gratuito. Vuelve más tarde.",
    EUS: "Doako muga lortu duzu. Saiatu berriro geroago.",
    EN: "You’ve reached the free limit. Try again later.",
    FR: "Tu as atteint la limite gratuite. Réessaie plus tard.",
  },

  error_no_text: {
    ES: "No se recibió texto de la API.",
    EUS: "Ez da testurik jaso API-tik.",
    EN: "No text was received from the API.",
    FR: "Aucun texte n’a été reçu de l’API.",
  },

  error_generic: {
    ES: "Error realizando la corrección.",
    EUS: "Errorea zuzenketa egitean.",
    EN: "Error while performing the correction.",
    FR: "Erreur lors de la correction.",
  },

  no_errors_message: {
    ES: "¡Muy bien! No hemos detectado errores.",
    EUS: "Oso ondo! Ez dugu akatsik aurkitu.",
    EN: "Great! We didn’t detect any errors.",
    FR: "Parfait ! Nous n’avons détecté aucune erreur.",
  },
  pdf: { ES: "PDF", EUS: "PDF", EN: "PDF", FR: "PDF" },
},
  grammarcorrector_daily_limit_reached: {
  ES: "Has superado el límite diario de solicitudes del corrector.",
  EUS: "Zuzentzailearen eguneko eskaera-muga gainditu duzu.",
  EN: "You have exceeded the corrector’s daily request limit.",
  FR: "Vous avez dépassé la limite quotidienne de requêtes du correcteur.",
},

grammarcorrector_limit_reached: {
   ES: "Has superado el límite máximo de caracteres del corrector.",
  EUS: "Zuzentzailearen gehienezko karaktere-muga gainditu duzu.",
  EN: "You have exceeded the corrector's maximum character limit.",
  FR: "Vous avez dépassé la limite maximale de caractères du correcteur.",
},
  // =========================
  //        PARAPHRASER
  // =========================


paraphraser_sources_title: { ES: "Fuentes", EUS: "Iturriak", EN: "Sources", FR: "Sources" },
paraphraser_tab_text: { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
paraphraser_tab_document: { ES: "Documento", EUS: "Dokumentua", EN: "Document", FR: "Document" },
paraphraser_tab_url: { ES: "URL", EUS: "URL", EN: "URL", FR: "URL" },

paraphraser_enter_text_placeholder: { ES: "Escribe o pega tu texto aquí…", EUS: "Idatzi edo itsatsi testua hemen…", EN: "Write or paste your text here…", FR: "Écris ou colle ton texte ici…" },

paraphraser_pick_file_title: { ES: "Elige tu archivo o carpeta", EUS: "Aukeratu zure fitxategia edo karpeta", EN: "Choose your file or folder", FR: "Choisissez votre fichier ou dossier" },
paraphraser_accepted_formats: { ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…", EUS: "PDF fitxategiak, testua edo web estekak gehi ditzakezu…", EN: "You can add PDF files, copied text, web links…", FR: "Vous pouvez ajouter des fichiers PDF, du texte copié, des liens web…" },
paraphraser_folder_hint: { ES: "Aquí aparecerán tus textos o documentos subidos.", EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.", EN: "Your uploaded texts or documents will appear here.", FR: "Vos textes ou documents téléchargés apparaîtront ici." },

paraphraser_paste_urls_label: { ES: "Pegar URLs*", EUS: "URLak itsatsi*", EN: "Paste URLs*", FR: "Coller des URLs*" },
paraphraser_add_urls_button: { ES: "Añadir URLs", EUS: "Gehitu URLak", EN: "Add URLs", FR: "Ajouter des URLs" },
paraphraser_save_urls_button: { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
paraphraser_cancel_button: { ES: "Cancelar", EUS: "Utzi", EN: "Cancel", FR: "Annuler" },
paraphraser_urls_note_visible: { ES: "Solo se importará el texto visible del sitio web.", EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.", EN: "Only visible text from the website will be imported.", FR: "Seul le texte visible du site sera importé." },
paraphraser_urls_note_paywalled: { ES: "No se admiten artículos de pago.", EUS: "Ordainpeko artikuluak ez dira onartzen.", EN: "Paywalled articles are not supported.", FR: "Les articles payants ne sont pas pris en charge." },
paraphraser_remove_button: { ES: "Quitar", EUS: "Kendu", EN: "Remove", FR: "Supprimer" },
paraphraser_copy: { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier" },
paraphraser_copied: { ES: "Copiado", EUS: "Kopiatuta", EN: "Copied", FR: "Copié" },
paraphraser_clear_input: { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },

paraphraser_generate_button: { ES: "Crear parafraseo", EUS: "Sortu parafraseoa", EN: "Generate paraphrase", FR: "Créer une reformulation" },
paraphraser_help_right: { ES: "Selecciona una fuente (texto, documentos o URLs) y pulsa \"Crear parafraseo\".", EUS: "Aukeratu iturri bat (testua, dokumentuak edo URLak) eta sakatu \"Sortu parafraseoa\".", EN: "Select a source (text, documents or URLs) and click \"Generate paraphrase\".", FR: "Sélectionnez une source (texte, documents ou URLs) et cliquez sur \"Créer une reformulation\"." },

paraphraser_left_title: { ES: "Aquí aparecerán tus textos o documentos subidos.", EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.", EN: "Your uploaded texts or documents will appear here.", FR: "Vos textes ou documents téléchargés apparaîtront ici." },
paraphraser_left_body: { ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…", EUS: "PDF fitxategiak, testua edo web estekak gehi ditzakezu…", EN: "You can add PDF files, copied text, web links…", FR: "Vous pouvez ajouter des fichiers PDF, du texte copié, des liens web…" },

paraphraser_mode_neutral: { ES: "Neutral", EUS: "Neutrala", EN: "Neutral", FR: "Neutre" },
paraphraser_mode_formal:  { ES: "Formal",   EUS: "Formala",  EN: "Formal",  FR: "Formel",},
paraphraser_mode_informal: { ES: "Informal", EUS: "Informala", EN: "Informal", FR: "Informel" },
paraphraser_mode_professional: { ES: "Profesional", EUS: "Profesionala", EN: "Professional", FR: "Professionnel" },
paraphraser_mode_academic: { ES: "Académico", EUS: "Akademikoa", EN: "Academic", FR: "Académique" },
paraphraser_mode_fluent: { ES: "Fluido", EUS: "Arina", EN: "Fluent", FR: "Fluide" },
paraphraser_mode_creative: { ES: "Creativo", EUS: "Sortzailea", EN: "Creative", FR: "Créatif" },

paraphraser_copy: { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier" },
paraphraser_copied: { ES: "Copiado", EUS: "Kopiatua", EN: "Copied", FR: "Copié" },
paraphraser_download: { ES: "Descargar", EUS: "Deskargatu", EN: "Download", FR: "Télécharger" },
paraphraser_save_to_library_button: { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
paraphraser_saved_to_library: { ES: "Guardado en biblioteca", EUS: "Liburutegian gordeta", EN: "Saved to library", FR: "Enregistré dans la bibliothèque" },

paraphraser_error_need_input: { ES: "Añade texto suficiente, URLs o documentos antes de crear el parafraseo.", EUS: "Gehitu testu nahikoa, URLak edo dokumentuak parafraseoa sortu aurretik.", EN: "Add enough text, URLs or documents before generating the paraphrase.", FR: "Ajoutez du texte, des URLs ou des documents avant de créer la reformulation." },
paraphraser_error_no_text: { ES: "No se recibió texto de la API.", EUS: "Ez da testurik jaso APItik.", EN: "No text was received from the API.", FR: "Aucun texte reçu de l’API." },
paraphraser_copy_result_aria: { ES: "Copiar resultado", EUS: "Kopiatu emaitza", EN: "Copy result", FR: "Copier le résultat" },
paraphraser_copy_result_title: { ES: "Copiar resultado", EUS: "Kopiatu emaitza", EN: "Copy result", FR: "Copier le résultat" },
paraphraser_delete_input_aria: { ES: "Eliminar texto de entrada y resultado", EUS: "Ezabatu sarrerako testua eta emaitza", EN: "Delete input text and result", FR: "Supprimer le texte source et le résultat" },
paraphraser_delete_input_title: { ES: "Eliminar texto de entrada y resultado", EUS: "Ezabatu sarrerako testua eta emaitza", EN: "Delete input text and result", FR: "Supprimer le texte source et le résultat" },
paraphraser_output_language_aria: { ES: "Idioma de salida", EUS: "Irteerako hizkuntza", EN: "Output language", FR: "Langue de sortie" },
paraphraser_error_generic: { ES: "Error creando el parafraseo.", EUS: "Errorea parafraseoa sortzean.", EN: "Error generating paraphrase.", FR: "Erreur lors de la création de la reformulation." },
paraphraser_error_auth_required: { ES: "Necesitas iniciar sesión para usar Pro.", EUS: "Saioa hasi behar duzu Pro erabiltzeko.", EN: "You need to log in to use Pro.", FR: "Vous devez vous connecter pour utiliser Pro." },
paraphraser_daily_limit_reached: {
   ES: "Has superado el límite diario de solicitudes del parafraseador.",
  EUS: "Parafraseatzailearen eguneko eskaera-muga gainditu duzu.",
  EN: "You have exceeded the paraphraser’s daily request limit.",
  FR: "Vous avez dépassé la limite quotidienne de requêtes du paraphraseur.",
},
paraphraser_limit_reached: {
  ES: "Has superado el límite máximo de caracteres del parafraseador.",
  EUS: "Parafraseatzailearen gehienezko karaktere-muga gainditu duzu.",
  EN: "You have exceeded the paraphraser's maximum character limit.",
  FR: "Vous avez dépassé la limite maximale de caractères du paraphraseur.",
},

  // =========================
  //       TEXT CREATOR
  // =========================
textCreator: {
  textCreatorTitle: { ES: "Creador de texto", EUS: "Testu sortzailea", EN: "Text creator", FR: "Créateur de texte" },
  textCreatorSubtitle: { ES: "Genera textos con IA", EUS: "Sortu testuak IA-rekin", EN: "Generate texts with AI", FR: "Générez des textes avec IA" },
  sources_title: { ES: "Fuentes", EUS: "Iturriak", EN: "Sources", FR: "Sources" },
  title_label: { ES: "Título", EUS: "Izenburua", EN: "Title", FR: "Titre" },
  title_optional: { ES: "Escribe el título (opcional)", EUS: "Idatzi izenburua (aukerakoa)", EN: "Write the title (optional)", FR: "Écrivez le titre (optionnel)" },
  add_paragraph: { ES: "+ Párrafo", EUS: "+ Paragrafoa", EN: "+ Paragraph", FR: "+ Paragraphe" },
  paragraph_ph: { ES: "Escribe el párrafo", EUS: "Idatzi paragrafoa", EN: "Write the paragraph", FR: "Écrivez le paragraphe" },
  remove_paragraph: { ES: "Borrar párrafo", EUS: "Ezabatu paragrafoa", EN: "Delete paragraph", FR: "Supprimer le paragraphe" },
  text_ph: { ES: "Escribe el texto", EUS: "Idatzi testua", EN: "Write the text", FR: "Écrivez le texte" },
  paragraph_label: { ES: "Párrafo", EUS: "Paragrafoa", EN: "Paragraph", FR: "Paragraphe" },
  text_label: { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
  mode_normal: { ES: "Normal", EUS: "Arrunta", EN: "Normal", FR: "Normal" },
  mode_paragraphs: { ES: "Por párrafos", EUS: "Paragrafoz", EN: "By paragraphs", FR: "Par paragraphes" },
  length_label: { ES: "Longitud", EUS: "Luzera", EN: "Length", FR: "Longueur" },
  length_aria: { ES: "Longitud en caracteres", EUS: "Karaktere kopurua", EN: "Length in characters", FR: "Longueur en caractères" },
  length_chars: { ES: "caracteres", EUS: "karaktere", EN: "characters", FR: "caractères" },
  generate_from_sources: { ES: "Generar", EUS: "Sortu", EN: "Generate", FR: "Générer" },
  create_help_right: { ES: "Rellena el contenido y pulsa generar", EUS: "Idatzi edukia eta sakatu sortu", EN: "Fill the content and click generate", FR: "Remplissez le contenu et cliquez sur générer" },
  output_language_eus: { ES: "Euskera", EUS: "Euskara", EN: "Basque", FR: "Basque" },
  output_language_es: { ES: "Español", EUS: "Gaztelania", EN: "Spanish", FR: "Espagnol" },
  output_language_en: { ES: "Inglés", EUS: "Ingelesa", EN: "English", FR: "Anglais" },
  output_language_fr: { ES: "Francés", EUS: "Frantsesa", EN: "French", FR: "Français" },
  save_button_label: { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
  copy: { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier" },
  copied: { ES: "Copiado", EUS: "Kopiatuta", EN: "Copied", FR: "Copié" },
clear_input: { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },
  limit_chars: {
ES: "Has superado el límite máximo de caracteres del creador de texto.",
  EUS: "Testu-sortzailearen gehieneko karaktere-muga gainditu duzu.",
  EN: "You have exceeded the text creator's maximum character limit.",
  FR: "Vous avez dépassé la limite maximale de caractères du créateur de texte.",
},
  limit_daily: {
   ES: "Has superado el límite diario de solicitudes del creador de texto.",
  EUS: "Testu-sortzailearen eguneko eskaera-muga gainditu duzu.",
  EN: "You have exceeded the text creator's daily request limit.",
  FR: "Vous avez dépassé la limite quotidienne de requêtes du créateur de texte.",
},
  error_generic: { ES: "Error generando el texto.", EUS: "Errorea testua sortzean.", EN: "Error generating the text.", FR: "Erreur lors de la génération du texte." },
  error_no_text: { ES: "No se recibió texto de la API.", EUS: "Ez da testurik jaso APItik.", EN: "No text was received from the API.", FR: "Aucun texte reçu de l’API." },
  pdf: { ES: "PDF", EUS: "PDF", EN: "PDF", FR: "PDF" },
  pdf_title: { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
  expand: { ES: "Ampliar", EUS: "Handitu", EN: "Expand", FR: "Agrandir" },
  close: { ES: "Cerrar", EUS: "Itxi", EN: "Close", FR: "Fermer" },
  result_title: { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
  missing_info_title: {
    ES: "No hay información suficiente",
    EUS: "Ez dago informazio nahikorik",
    EN: "There is not enough information",
    FR: "Il n’y a pas assez d’informations",
  },
  missing_info_no: { ES: "Atrás", EUS: "Atzera", EN: "Back", FR: "Retour" },
  missing_info_yes: { ES: "Crear", EUS: "Sortu", EN: "Create", FR: "Créer" },
},

  // =========================
  //       EMAIL CREATOR
  // =========================
emailCreator: {
  emailCreatorTitle: { ES: "Creador de email", EUS: "Email sortzailea", EN: "Email creator", FR: "Créateur d’email" },
  emailCreatorSubtitle: { ES: "Genera emails automáticamente", EUS: "Sortu emailak automatikoki", EN: "Generate emails automatically", FR: "Générez des emails automatiquement" },
  sources_title: { ES: "Fuentes", EUS: "Iturriak", EN: "Sources", FR: "Sources" },
  generate_from_sources: { ES: "Generar email", EUS: "Emaila sortu", EN: "Generate email", FR: "Générer email" },
  create_help_right: { ES: "Rellena la información y genera el email", EUS: "Bete informazioa eta sortu emaila", EN: "Fill the information and generate the email", FR: "Remplissez les informations et générez l’email" },

  output_language_eus: { ES: "Euskera", EUS: "Euskara", EN: "Basque", FR: "Basque" },
  output_language_es: { ES: "Español", EUS: "Gaztelania", EN: "Spanish", FR: "Espagnol" },
  output_language_en: { ES: "Inglés", EUS: "Ingelesa", EN: "English", FR: "Anglais" },
  output_language_fr: { ES: "Francés", EUS: "Frantsesa", EN: "French", FR: "Français" },

  tone_formal: { ES: "Formal", EUS: "Formala", EN: "Formal", FR: "Formel" },
  tone_informal: { ES: "Informal", EUS: "Informala", EN: "Informal", FR: "Informel" },

  copy: { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier" },
  copied: { ES: "Copiado", EUS: "Kopiatuta", EN: "Copied", FR: "Copié" },
clear_input: { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },

  small_1: { ES: "1- Saludo", EUS: "1- Agurra", EN: "1- Greeting", FR: "1- Salutation" },
  small_2: { ES: "2- Introducción", EUS: "2- Sarrera", EN: "2- Introduction", FR: "2- Introduction" },
  big_3: { ES: "3- Párrafo", EUS: "3- Paragrafoa", EN: "3- Paragraph", FR: "3- Paragraphe" },
  final_phrase: { ES: "4- Frase final", EUS: "4- Amaierako esaldia", EN: "4- Final phrase", FR: "4- Phrase finale" },
  small_4: { ES: "5- Despedida", EUS: "5- Agurra", EN: "5- Closing", FR: "5- Clôture" },
  small_5: { ES: "6- Nombre", EUS: "6- Izena", EN: "6- Name", FR: "6- Nom" },
  saludo_ph: { ES: "Escribe el saludo", EUS: "Idatzi agurra", EN: "Write the greeting", FR: "Écrivez le salut" },
  intro_ph: { ES: "Escribe la introducción...", EUS: "Idatzi sarrera...", EN: "Write the introduction...", FR: "Écrivez l’introduction..." },
  paragraph_ph: { ES: "Escribe el párrafo", EUS: "Idatzi paragrafoa", EN: "Write the paragraph", FR: "Écrivez le paragraphe" },
  final_phrase_ph: { ES: "Escribe la frase final...", EUS: "Idatzi amaierako esaldia...", EN: "Write the final sentence...", FR: "Écrivez la phrase finale..." },
  saludo2_ph: { ES: "Escribe el saludo...", EUS: "Idatzi agurra...", EN: "Write the closing...", FR: "Écrivez le salut..." },
  nombre_ph: { ES: "Escribe el nombre...", EUS: "Idatzi izena...", EN: "Write the name...", FR: "Écrivez le nom..." },
  add_paragraph: { ES: "+ Párrafo", EUS: "+ Paragrafoa", EN: "+ Paragraph", FR: "+ Paragraphe" },
  remove_paragraph: { ES: "Eliminar párrafo", EUS: "Paragrafoa ezabatu", EN: "Remove paragraph", FR: "Supprimer le paragraphe" },
  mode_template: { ES: "Plantilla", EUS: "Txantiloia", EN: "Template", FR: "Modèle" },
  mode_creative: { ES: "Creativo", EUS: "Sortzailea", EN: "Creative", FR: "Créatif" },
  creative_label: { ES: "Información", EUS: "Informazioa", EN: "Information", FR: "Informations" },
  creative_ph: { 
  ES: "Escribe aquí toda la información: a quién va dirigido, objetivo, contexto, puntos clave, tono...", 
  EUS: "Idatzi hemen informazio guztia: norentzat den, helburua, testuingurua, puntu nagusiak, tonua...", 
  EN: "Write all the information here: who it is for, objective, context, key points, tone...", 
  FR: "Écrivez ici toutes les informations : à qui c'est destiné, objectif, contexte, points clés, ton..."},
  save_button_label: { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
   missing_info_title: {
    ES: "No hay información suficiente",
    EUS: "Ez dago informazio nahikorik",
    EN: "There is not enough information",
    FR: "Il n’y a pas assez d’informations",
  },

  missing_info_creative_text: {      
    ES: "No hay información suficiente. ¿Deseas continuar? En modo Creativo se completarán los huecos inventando lo necesario de forma coherente.",
    EUS: "Ez dago informazio nahikorik. Jarraitu nahi duzu ? Euskaliak falta den informazioa modu egikian interpretatu eta osatuko du.",
    EN: "There is not enough information. Do you want to continue? In Creative mode, missing gaps will be completed coherently.",
    FR: "Il n’y a pas assez d’informations. Voulez-vous continuer ? En mode Créatif, les éléments manquants seront complétés de manière cohérente.",
  },

  missing_info_template_text: {
    ES: "No hay información suficiente. ¿Deseas continuar? En modo Plantilla solo se creará el email con la información disponible, sin inventar nada.",
    EUS: "Ez dago informazio nahikorik. Jarraitu nahi duzu ? Euskaliak falta den informazioa modu egikian interpretatu eta osatuko du.",
    EN: "There is not enough information. Do you want to continue? In Template mode, the email will only be created using the available information, without inventing anything.",
    FR: "Il n’y a pas assez d’informations. Voulez-vous continuer ? En mode Modèle, l’email sera créé uniquement avec les informations disponibles, sans rien inventer.",
  },
missing_info_no: {
  ES: "Atrás", 
  EUS: "Atzera",
  EN: "Back",
  FR: "Retour",
},

missing_info_yes: {
  ES: "Crear",
  EUS: "Sortu",
  EN: "Create",
  FR: "Créer",
}, 
limit_chars: {
    ES: "Has superado el límite máximo de caracteres del creador de email.",
  EUS: "Email-sortzailearen gehieneko karaktere-muga gainditu duzu.",
  EN: "You have exceeded the email creator's maximum character limit.",
  FR: "Vous avez dépassé la limite maximale de caractères du créateur d’e-mails.",
},
 limit_daily: {
  ES: "Has superado el límite diario de solicitudes del creador de email.",
  EUS: "Email-sortzailearen eguneko eskaera-muga gainditu duzu.",
  EN: "You have exceeded the email creator's daily request limit.",
  FR: "Vous avez dépassé la limite quotidienne de requêtes du créateur d’e-mails.",
},
  error_generic: { ES: "Error generando el email.", EUS: "Errorea emaila sortzean.", EN: "Error generating the email.", FR: "Erreur lors de la génération de l’e-mail." },
  output_language_aria: { ES: "Idioma de salida", EUS: "Irteerako hizkuntza", EN: "Output language", FR: "Langue de sortie" },
  pdf: { ES: "PDF", EUS: "PDF", EN: "PDF", FR: "PDF" },
  pdf_title: { ES: "Email", EUS: "Emaila", EN: "Email", FR: "E-mail" },

  extra_instructions_title: {
    ES: "Contexto (opcional)",
    EUS: "Testuingurua (aukerakoa)",
    EN: "Context (optional)",
    FR: "Contexte (facultatif)",
  },
  extra_instructions_desc: {
    ES: "Añade contexto o instrucciones para un email más concreto: tono, urgencia, detalles a destacar...",
    EUS: "Gehitu testuingurua edo argibideak email zehatzago bat lortzeko: tonua, presa, nabarmendu beharreko xehetasunak...",
    EN: "Add context or instructions for a more specific email: tone, urgency, details to highlight...",
    FR: "Ajoutez du contexte ou des instructions pour un e-mail plus précis : ton, urgence, détails à souligner...",
  },
  extra_instructions_ph: {
    ES: "Escribe aquí el contexto...",
    EUS: "Idatzi hemen testuingurua...",
    EN: "Write the context here...",
    FR: "Écrivez le contexte ici...",
  },
  extra_instructions_aria: {
    ES: "Instrucciones adicionales",
    EUS: "Argibide gehigarriak",
    EN: "Additional instructions",
    FR: "Instructions supplémentaires",
  },

  expand: { ES: "Ampliar", EUS: "Handitu", EN: "Expand", FR: "Agrandir" },
  close: { ES: "Cerrar", EUS: "Itxi", EN: "Close", FR: "Fermer" },
  result_title: { ES: "Email", EUS: "Emaila", EN: "Email", FR: "E-mail" },
},


  
  // =========================
  //      COOKIES BANNER 
  // =========================
  cookies: {
  title: {
    ES: "Este sitio web utiliza cookies",
    EUS: "Webgune honek cookieak erabiltzen ditu",
    EN: "This website uses cookies",
    FR: "Ce site web utilise des cookies",
  },

  desc: {
    ES: "Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y, si lo aceptas, cookies de análisis (Google Analytics) para mejorar Euskalia.",
    EUS: "Webgunearen funtzionamendurako beharrezko cookie teknikoak erabiltzen ditugu eta, onartzen baduzu, analisi-cookieak (Google Analytics) Euskalia hobetzeko.",
    EN: "We use necessary technical cookies for the operation of the site and, if you accept, analytics cookies (Google Analytics) to improve Euskalia.",
    FR: "Nous utilisons des cookies techniques nécessaires au fonctionnement du site et, si vous l’acceptez, des cookies d’analyse (Google Analytics) pour améliorer Euskalia.",
  },

  more: {
    ES: "Más información",
    EUS: "Informazio gehiago",
    EN: "More information",
    FR: "Plus d’informations",
  },

  accept: {
    ES: "Aceptar",
    EUS: "Onartu",
    EN: "Accept",
    FR: "Accepter",
  },

  reject: {
    ES: "Rechazar",
    EUS: "Baztertu",
    EN: "Reject",
    FR: "Refuser",
  },
},



  /* === Bloque anidado (por si lo usas en otras vistas) === */
  supportPage: {
    title:       { ES: "Soporte", EUS: "Laguntza", EN: "Support", FR: "Support" },
    subtitle:    { ES: "¿Necesitas ayuda? Estamos aquí para ayudarte.", EUS: "Laguntza behar duzu? Hemen gaude laguntzeko.", EN: "Need help? We’re here to help you.", FR: "Besoin d’aide ? Nous sommes là pour vous aider." },
    kicker:      { ES: "¿Cómo podemos ayudarte?", EUS: "Nola lagun diezazukegu?", EN: "How can we help you?", FR: "Comment pouvons-nous vous aider ?" },
    description: { ES: "Cuéntanos tu consulta y te responderemos lo antes posible.", EUS: "Esaiguzu zure kontsulta eta ahal bezain laster erantzungo dizugu.", EN: "Tell us your question and we’ll reply as soon as possible.", FR: "Expliquez-nous votre demande et nous vous répondrons dès que possible." },
    bubble:      { ES: "¿Tienes dudas? Escríbenos.", EUS: "Zalantzak al dituzu? Idatziguzu.", EN: "Have questions? Write to us.", FR: "Vous avez des questions ? Écrivez-nous." },
    cta:         { ES: "Contactar", EUS: "Harremanetan jarri", EN: "Contact", FR: "Contacter" },
    form: {
      name_label:          { ES: "Nombre", EUS: "Izena", EN: "Name", FR: "Nom" },
      name_placeholder:    { ES: "Tu nombre", EUS: "Zure izena", EN: "Your name", FR: "Votre nom" },
      email_label:         { ES: "Email", EUS: "Posta elektronikoa", EN: "Email", FR: "Email" },
      email_placeholder:   { ES: "Tu email", EUS: "Zure posta elektronikoa", EN: "Your email", FR: "Votre email" },
      subject_label:       { ES: "Asunto", EUS: "Gaia", EN: "Subject", FR: "Sujet" },
      subject_placeholder: { ES: "¿Sobre qué necesitas ayuda?", EUS: "Zerez behar duzu laguntza?", EN: "What do you need help with?", FR: "Sur quoi avez-vous besoin d’aide ?" },
      message_label:       { ES: "Mensaje", EUS: "Mezua", EN: "Message", FR: "Message" },
      message_placeholder: { ES: "Cuéntanos en qué podemos ayudarte", EUS: "Esaguzu nola lagundu diezazukegun", EN: "Tell us how we can help you", FR: "Dites-nous comment nous pouvons vous aider" },
      submit:              { ES: "Enviar", EUS: "Bidali", EN: "Send", FR: "Envoyer" },
      privacy_hint:        { ES: "Al enviar, aceptas nuestra", EUS: "Bidaltzean, onartzen duzu gure", EN: "By submitting, you accept our", FR: "En envoyant, vous acceptez notre" },
      privacy_link:        { ES: "Política de privacidad", EUS: "Pribatutasun-politika", EN: "Privacy policy", FR: "Politique de confidentialité" },
    },
  },



  // =========================
  //        SUPPORT
  // =========================
  
  support_title:        { ES: "Contacto", EUS: "Kontaktua" , EN: "Contact", FR: "Contact" },
  support_subtitle_bottom:{ ES: "Podéis rellenar el formulario o escribirnos directamente a euskaliaweb@gmail.com", EUS: "Formularioa bete edo zuzenean idatz diezagukezue: euskaliaweb@gmail.com", EN: "You can fill out the form or contact us directly at euskaliaweb@gmail.com", FR: "Vous pouvez remplir le formulaire ou nous écrire directement à euskaliaweb@gmail.com" },
  support_kicker:       { ES: "¿Cómo podemos ayudarte?", EUS: "Nola lagun diezazukegu?", EN: "How can we help you?", FR: "Comment pouvons-nous vous aider ?" },
  support_help_text: { ES: "¿Necesitas ayuda? Estamos aquí para ayudarte.", EUS: "Laguntza behar duzu? Hemen gaude laguntzeko.", EN: "Need help? We're here to help you.", FR: "Besoin d’aide ? Nous sommes là pour vous aider." },
  support_cta:          { ES: "Contactar", EUS: "Harremanetan jarri", EN: "Contact", FR: "Contacter" },
  support_bubble_text:  { ES: "¿Tienes dudas? Escríbenos.", EUS: "Zalantzak al dituzu? Idatziguzu.", EN: "Have questions? Write to us.", FR: "Vous avez des questions ? Écrivez-nous." },

  support_form_name_label:          { ES: "Nombre", EUS: "Izena", EN: "Name", FR: "Nom" },
  support_form_name_placeholder:    { ES: "Tu nombre", EUS: "Zure izena", EN: "Your name", FR: "Votre nom" },

  support_form_email_label:         { ES: "Email", EUS: "Posta elektronikoa", EN: "Email", FR: "Email" },
  support_form_email_placeholder:   { ES: "Tu email", EUS: "Zure posta elektronikoa", EN: "Your email", FR: "Votre email" },

  support_form_subject_label:       { ES: "Asunto", EUS: "Gaia", EN: "Subject", FR: "Sujet" },
  support_form_subject_placeholder: { ES: "¿Sobre qué necesitas ayuda?", EUS: "Zerri buruz behar duzu laguntza?", EN: "What do you need help with?", FR: "Sur quoi avez-vous besoin d’aide ?" },

  support_form_message_label:       { ES: "Mensaje", EUS: "Mezua", EN: "Message", FR: "Message" },
  support_form_message_placeholder: { ES: "Cuéntanos en qué podemos ayudarte", EUS: "Esaguzu nola lagundu diezazukegun", EN: "Tell us how we can help you", FR: "Dites-nous comment nous pouvons vous aider" },

  support_form_submit:              { ES: "Enviar", EUS: "Bidali", EN: "Send", FR: "Envoyer" },
  support_form_privacy_hint:        { ES: "Al enviar, aceptas nuestra", EUS: "Bidaltzean, onartzen duzu gure", EN: "By submitting, you accept our", FR: "En envoyant, vous acceptez notre" },
  support_form_privacy_link:        { ES: "Política de privacidad", EUS: "Pribatutasun-politika", EN: "Privacy policy", FR: "Politique de confidentialité" },

  support_form_sending: {
    ES: "Enviando...",
    EUS: "Bidaltzen...",
    EN: "Sending...",
    FR: "Envoi...",
  },
  support_form_sent: {
    ES: "✅ Enviado",
    EUS: "✅ Bidalia",
    EN: "✅ Sent",
    FR: "✅ Envoyé",
  },
  support_form_error: {
    ES: "❌ Error al enviar",
    EUS: "❌ Errorea bidaltzean",
    EN: "❌ Error sending",
    FR: "❌ Erreur d’envoi",
  },

  // =========================
  //        SUGGENSTIONS
  // =========================
  suggestions: {
    zone_badge: {
      ES: "Zona de ideas y sugerencias de Euskalia",
      EUS: "Euskaliaren ideien eta iradokizunen gunea",
      EN: "Euskalia ideas & suggestions space",
      FR: "Espace d’idées et de suggestions d’Euskalia",
    },

    title: {
      ES: "Ayuda a decidir las próximas mejoras de Euskalia",
      EUS: "Lagundu Euskaliaren hurrengo hobekuntzak erabakitzen",
      EN: "Help decide the next improvements for Euskalia",
      FR: "Aidez à décider des prochaines améliorations d’Euskalia",
    },

    form_description: {
      ES: "¿Qué te gustaría añadir o mejorar en Euskalia? Nuevas herramientas, cambios de diseño, nuevos límites, mejores ideas para aprender… cualquier sugerencia es bienvenida.",
      EUS: "Zer gustatuko litzaizuke Euskalian gehitu edo hobetzea: tresna berriak, diseinu aldaketak, muga berriak, ikasteko ideiak hobeak… edozein iradokizun ongi etorria da.",
      EN: "What would you like to add or improve in Euskalia? New tools, design changes, new limits, better learning ideas… any suggestion is welcome.",
      FR: "Que souhaiteriez-vous ajouter ou améliorer dans Euskalia ? Nouvelles fonctionnalités, changements de design, nouvelles limites, meilleures idées d’apprentissage… toute suggestion est la bienvenue.",
    },

    textarea_label: {
      ES: "Escribe aquí tu sugerencia",
      EUS: "Idatzi hemen zure iradokizuna",
      EN: "Write your suggestion here",
      FR: "Écrivez votre suggestion ici",
    },

    textarea_placeholder: {
      ES: "Cuéntanos qué herramienta, cambio o mejora te gustaría ver en Euskalia y por qué sería útil para ti u otras personas.",
      EUS: "Esan zein tresna, aldaketa edo hobekuntza gustatuko litzaizukeen Euskalian, eta zergatik izango litzatekeen erabilgarria zuretzat edo besteentzat.",
      EN: "Tell us which tool, change, or improvement you’d like to see in Euskalia and why it would be useful for you or others.",
      FR: "Dites-nous quelle fonctionnalité, changement ou amélioration vous aimeriez voir dans Euskalia et pourquoi cela serait utile pour vous ou pour d’autres.",
    },

    email_label: {
      ES: "Correo electrónico (opcional)",
      EUS: "Helbide elektronikoa (aukerakoa)",
      EN: "Email address (optional)",
      FR: "Adresse email (facultatif)",
    },

    email_placeholder: {
      ES: "Solo lo usaremos si necesitamos contactar contigo.",
      EUS: "Zurekin harremanetan jarriko gara behar izanez gero.",
      EN: "We’ll only use it if we need to contact you.",
      FR: "Nous l’utiliserons uniquement si nous devons vous contacter.",
    },

    characters_suffix: {
      ES: "caracteres",
      EUS: "karaktere",
      EN: "characters",
      FR: "caractères",
    },

    button_label: {
      ES: "Enviar sugerencia",
      EUS: "Bidali iradokizuna",
      EN: "Send suggestion",
      FR: "Envoyer la suggestion",
    },

    error_required: {
      ES: "Por favor, escribe una sugerencia.",
      EUS: "Mesedez, idatzi iradokizun bat.",
      EN: "Please write a suggestion.",
      FR: "Veuillez écrire une suggestion.",
    },

    error_min_length: {
      ES: "Por favor, explica un poco más (mínimo 20 caracteres).",
      EUS: "Mesedez, azaldu pixka bat gehiago (gutxienez 20 karaktere).",
      EN: "Please explain a bit more (minimum 20 characters).",
      FR: "Veuillez expliquer un peu plus (minimum 20 caractères).",
    },

    success_message: {
      ES: "¡Gracias! Hemos recibido tu sugerencia.",
      EUS: "Eskerrik asko! Zure iradokizuna jaso dugu.",
      EN: "Thank you! We’ve received your suggestion.",
      FR: "Merci ! Nous avons reçu votre suggestion.",
    },
  },


  // =========================
  //        INFORMATION PAGE
  // =========================

  information_title: {
  ES: "Información sobre Euskalia",
  EUS: "Euskaliari buruzko informazioa",
  EN: "Information about Euskalia",
  FR: "Informations sur Euskalia",
},

information_subtitle: {
  ES: "Euskalia reúne diferentes herramientas diseñadas para trabajar con textos en euskera y otros idiomas. En esta página encontrarás información sobre cada una de ellas, cómo funcionan, en qué situaciones pueden resultar útiles y cómo sacar el máximo partido a cada herramienta.",
  EUS: "Euskaliak euskarazko eta beste hizkuntza batzuetako testuekin lan egiteko diseinatutako hainbat tresna erabiltzen ditu. Orrialde honetan tresna bakoitzari buruzko informazioa aurkituko duzu, nola funtzionatzen duten, zein egoeratan izan daitezkeen erabilgarriak eta tresna bakoitzari ahalik eta etekin handiena nola atera.",
  EN: "Euskalia brings together different tools designed to work with texts in Basque and other languages. On this page you will find information about each of them, how they work, in which situations they may be useful and how to get the most out of each tool.",
  FR: "Euskalia regroupe différents outils conçus pour travailler avec des textes en basque et dans d'autres langues. Sur cette page, vous trouverez des informations sur chacun d'eux, leur fonctionnement, les situations dans lesquelles ils peuvent être utiles et comment tirer le meilleur parti de chaque outil.",
},

information_mockup_text: {
  ES: "Texto",
  EUS: "Testua",
  EN: "Text",
  FR: "Texte",
},

information_mockup_document: {
  ES: "Documento",
  EUS: "Dokumentua",
  EN: "Document",
  FR: "Document",
},

information_mockup_url: {
  ES: "URL",
  EUS: "URL",
  EN: "URL",
  FR: "URL",
},

information_mockup_detect_language: {
  ES: "Detectar idioma",
  EUS: "Hizkuntza detektatu",
  EN: "Detect language",
  FR: "Détecter la langue",
},

information_mockup_basque: {
  ES: "Euskera",
  EUS: "Euskara",
  EN: "Basque",
  FR: "Basque",
},

information_mockup_input_placeholder: {
  ES: "Escribe o pega el texto aquí.",
  EUS: "Idatzi edo itsatsi testua hemen.",
  EN: "Write or paste the text here.",
  FR: "Écrivez ou collez le texte ici.",
},

information_mockup_output_placeholder: {
  ES: "Aquí aparecerá la traducción.",
  EUS: "Hemen agertuko da itzulpena.",
  EN: "The translation will appear here.",
  FR: "La traduction apparaîtra ici.",
},

information_mockup_translate_button: {
  ES: "Traducir",
  EUS: "Itzuli",
  EN: "Translate",
  FR: "Traduire",
},

information_about_title: {
  ES: "¿Qué es Euskalia?",
  EUS: "Zer da Euskalia?",
  EN: "What is Euskalia?",
  FR: "Qu’est-ce que Euskalia ?",
},

information_about_title: {
  ES: "¿Qué es Euskalia?",
  EUS: "Zer da Euskalia?",
  EN: "What is Euskalia?",
  FR: "Qu'est-ce qu'Euskalia ?",
},

information_about_paragraph_1: {
  ES: "Euskalia es una plataforma digital creada con un objetivo claro: contribuir al crecimiento y la presencia del euskera en el entorno tecnológico actual. Nace con la idea de acercar la innovación y la inteligencia artificial a todas las personas que utilizan el euskera, facilitando que puedan trabajar, aprender y comunicarse en su propio idioma dentro del entorno digital.",
  EUS: "Euskalia gaur egungo ingurene teknologikoan euskararen presentzia eta garapena sustatzeko helburuarekin sortutako webgune bat da. Berrikuntza eta adimen artifiziala euskara erabiltzen duten pertsona guztiengana hurbiltzeko sortu da, ingurune digitalean beren hizkuntzan lan egin, ikasi eta komunikatu ahal izan dezaten.",
  EN: "Euskalia is a digital platform created with a clear objective: to contribute to the growth and presence of the Basque language in today's technological environment. It was created to bring innovation and artificial intelligence closer to everyone who uses Basque, helping them work, learn and communicate in their own language within the digital world.",
  FR: "Euskalia est une plateforme numérique créée avec un objectif clair : contribuer à la croissance et à la présence de la langue basque dans l'environnement technologique actuel. Elle est née pour rapprocher l'innovation et l'intelligence artificielle de toutes les personnes qui utilisent le basque, en leur permettant de travailler, d'apprendre et de communiquer dans leur propre langue au sein du monde numérique.",
},

information_about_paragraph_2: {
  ES: "Euskalia nace con la voluntad de construir un ecosistema digital centrado en el euskera, adaptado a las necesidades reales de la comunidad vasca y preparado para evolucionar junto a los avances tecnológicos. Más allá de ofrecer servicios digitales, el proyecto busca reforzar la presencia del euskera en Internet y contribuir a que siga teniendo un papel relevante en la sociedad digital del futuro.",
  EUS: "Euskalia euskaran oinarritutako ekosistema digital bat eraikitzeko asmoz jaio da, euskal komunitatearen benetako beharretara egokitua eta aurrerapen teknologikoekin batera garatzeko prestatua. Zerbitzu digitalak eskaintzeaz harago, proiektuak euskararen presentzia Interneten indartu nahi du, eta etorkizuneko gizarte digitalean leku garrantzitsua izaten jarrai dezan lagundu.",
  EN: "Euskalia was born with the ambition of building a digital ecosystem centered on the Basque language, adapted to the real needs of the Basque community and prepared to evolve alongside technological advances. Beyond offering digital services, the project aims to strengthen the presence of Basque on the Internet and help ensure it continues to play an important role in the digital society of the future.",
  FR: "Euskalia est née avec la volonté de construire un écosystème numérique centré sur la langue basque, adapté aux besoins réels de la communauté basque et prêt à évoluer avec les avancées technologiques. Au-delà de l'offre de services numériques, le projet vise à renforcer la présence du basque sur Internet et à contribuer à ce qu'il conserve un rôle important dans la société numérique de demain.",
},

information_about_paragraph_3: {
  ES: "Nuestra visión es construir un proyecto de referencia para la comunidad vasca, impulsando la innovación lingüística y demostrando que el euskera también puede formar parte activa de los avances tecnológicos del presente y del futuro. Euskalia no busca únicamente ofrecer soluciones digitales, sino contribuir a que el idioma siga creciendo, evolucionando y ocupando el lugar que merece en la era digital.",
  EUS: "Gure ikuspegia euskal komunitatearentzat erreferentziazko proiektu bat eraikitzea da, hizkuntza-berrikuntza sustatuz eta euskarak gaur egungo zein etorkizuneko aurrerapen teknologikoetan ere protagonismoa izan dezakeela erakutsiz. Euskaliaren helburua ez da soilik irtenbide digitalak eskaintzea; euskarak aro digitalean merezi duen lekua izan dezan laguntzea ere bada, hizkuntza hazten, garatzen eta indartzen jarrai dezan.",
  EN: "Our vision is to build a benchmark project for the Basque community, promoting linguistic innovation and demonstrating that the Basque language can also play an active role in the technological advances of today and tomorrow. Euskalia does not seek only to provide digital solutions, but also to help the language continue to grow, evolve and occupy the place it deserves in the digital age.",
  FR: "Notre vision est de construire un projet de référence pour la communauté basque, en favorisant l'innovation linguistique et en démontrant que la langue basque peut également jouer un rôle actif dans les avancées technologiques d'aujourd'hui et de demain. Euskalia ne cherche pas seulement à offrir des solutions numériques, mais aussi à contribuer à ce que la langue continue de grandir, d'évoluer et d'occuper la place qu'elle mérite à l'ère numérique.",
},

information_about_tools: {
  ES: "Estas son las herramientas que ofrece Euskalia:",
  EUS: "Hauek dira Euskaliak eskaintzen dituen tresnak:",
  EN: "These are the tools offered by Euskalia:",
  FR: "Voici les outils proposés par Euskalia :",
},

information_translator_badge: {
  ES: "Euskalia · Traductor",
  EUS: "Euskalia · Itzultzailea",
  EN: "Euskalia · Translator",
  FR: "Euskalia · Traducteur",
},

information_translator_title: {
  ES: "Traductor",
  EUS: "Itzultzailea",
  EN: "Translator",
  FR: "Traducteur",
},

information_translator_point_1_part_1: {
  EUS: "Euskaliako itzultzailea ",
  ES: "El traductor de Euskalia está diseñado principalmente para el público vasco como para extranjeros que necesitan traducir ",
  EN: "The Euskalia translator is designed both for Basque users and for foreigners who need to translate ",
  FR: "Le traducteur d’Euskalia est conçu aussi bien pour le public basque que pour les étrangers ayant besoin de traduire ",
},

information_translator_point_1_highlight_1: {
  EUS: "euskarara edo euskaratik",
  ES: "el euskera",
  EN: "Basque",
  FR: "le basque",
},

information_translator_point_1_part_2: {
  EUS: " itzuli behar duten euskal erabiltzaileentzat zein atzerritarrentzat diseinatuta dago. Euskara eta hautatzailean erabilgarri dauden gainerako hizkuntzen artean itzultzeko aukera ematen du. Emaitza ",
  ES: ". Permite traducir entre el euskera y todos los demás idiomas disponibles en el selector. Dando el resultado de un ",
  EN: ". It allows translation between Basque and all other languages available in the selector. The result aims to provide ",
  FR: ". Il permet de traduire entre le basque et toutes les autres langues disponibles dans le sélecteur. Le résultat vise à fournir un ",
},

information_translator_point_1_highlight_2: {
  EUS: "euskara garbi eta jariozkoa",
  ES: "euskera limpio y fluido",
  EN: "clear and natural Basque",
  FR: "basque clair et fluide",
},

information_translator_point_1_part_3: {
  EUS: " izatea du helburu. ",
  ES: ". ",
  EN: ". ",
  FR: ". ",
},

information_translator_point_1_highlight_3: {
  EUS: "Erabiltzaileek proposatutako edozein hizkuntza",
  ES: "Cualquier idioma sugerido por los usuarios",
  EN: "Any language suggested by users",
  FR: "Toute langue suggérée par les utilisateurs",
},

information_translator_point_1_part_4: {
  EUS: " gehitu ahal izango da arazorik gabe.",
  ES: " se podrá añadir sin ningún problema.",
  EN: " may be added without any problem.",
  FR: " pourra être ajoutée sans aucun problème.",
},

information_translator_point_2_part_1: {
  EUS: "Jatorrizko hizkuntza eskuz hautatzeaz gain, itzultzaileak ",
  ES: "Además de seleccionar manualmente el idioma de origen, el traductor incluye un ",
  EN: "In addition to manually selecting the source language, the translator includes an ",
  FR: "En plus de la sélection manuelle de la langue source, le traducteur inclut un ",
},

information_translator_point_2_highlight_1: {
  EUS: "hizkuntza-detektagailu automatiko",
  ES: "detector automático de idioma",
  EN: "automatic language detector",
  FR: "détecteur automatique de langue",
},

information_translator_point_2_part_2: {
  EUS: " bat dauka. Aukera hau aktibatuta dagoenean, erabiltzaileak edozein hizkuntzatan idatzitako testua sar dezake, eta  ",
  ES: ". Cuando esta opción está activada, el usuario puede introducir texto en cualquier idioma y la herramienta ",
  EN: ". When this option is enabled, users can enter text in any language and the tool will automatically ",
  FR: ". Lorsque cette option est activée, l’utilisateur peut saisir un texte dans n’importe quelle langue et l’outil ",
},

information_translator_point_2_highlight_2: {
  EUS: " tresnak automatikoki detektatuko du",
  ES: "detectará automáticamente",
  EN: "detect",
  FR: "détectera automatiquement",
},

information_translator_point_2_part_3: {
  EUS: " zein hizkuntzatan dagoen itzulpena egin aurretik. Funtzio hau ",
  ES: " el idioma en el que está escrito antes de realizar la traducción. Esta función puede utilizarse incluso con ",
  EN: " the language before performing the translation. This feature can also be used with ",
  FR: " automatiquement la langue avant d’effectuer la traduction. Cette fonction peut également être utilisée avec des ",
},

information_translator_point_2_highlight_3: {
  EUS: "hautatzaileetan agertzen ez diren hizkuntzekin",
  ES: "idiomas que no aparecen en los selectores del traductor",
  EN: "languages that do not appear in the translator selectors",
  FR: "langues qui n’apparaissent pas dans les sélecteurs du traducteur",
},

information_translator_point_2_part_4: {
  EUS: " ere erabili daiteke.",
  ES: ".",
  EN: ".",
  FR: ".",
},

information_translator_point_3_part_1: {
  EUS: "Esaldi laburretan, itzultzaileak ",
  ES: "Para frases cortas, el traductor puede mostrar ",
  EN: "For short sentences, the translator may display ",
  FR: "Pour les phrases courtes, le traducteur peut afficher ",
},

information_translator_point_3_highlight_1: {
  EUS: "itzulpen aukera desberdinak",
  ES: "alternativas de traducción",
  EN: "translation alternatives",
  FR: "des alternatives de traduction",
},

information_translator_point_3_part_2: {
  EUS: " erakutsi ditzake ideia bera adierazteko hainbat modu baliozko daudenean. Funtzio hau ",
  ES: " cuando existen varias formas válidas de expresar la misma idea. Esta función solo aparece cuando la frase es ",
  EN: " when there are several valid ways to express the same idea. This feature only appears when the sentence is ",
  FR: " lorsqu’il existe plusieurs façons valides d’exprimer la même idée. Cette fonction n’apparaît que lorsque la phrase est ",
},

information_translator_point_3_highlight_2: {
  EUS: "esaldi horretarako egokia",
  ES: "adecuada para ello",
  EN: "suitable for it",
  FR: "adaptée à cela",
},

information_translator_point_3_part_3: {
  EUS: " denean eta ",
  ES: " y cuando ",
  EN: " and when ",
  FR: " et lorsqu’il existe ",
},

information_translator_point_3_highlight_3: {
  EUS: "benetan aukera desberdinak erabilgarriak",
  ES: "realmente existen alternativas útiles",
  EN: "genuinely useful alternatives exist",
  FR: "réellement des alternatives utiles",
},

information_translator_point_3_part_4: {
  EUS: " direnean bakarrik agertzen da.",
  ES: ".",
  EN: ".",
  FR: ".",
},

information_translator_mockup_basque_text: {
  ES: "Kaixo, zer moduz?",
  EUS: "Hola, ¿qué tal?",
  EN: "Kaixo, zer moduz?",
  FR: "Kaixo, zer moduz?",
},

information_translator_mockup_spanish_text: {
  ES: "Hola, ¿qué tal?",
  EUS: "Kaixo, zer moduz?",
  EN: "Hello, how are you?",
  FR: "Bonjour, comment ça va ?",
},

information_translator_mockup_completed: {
  ES: "Traducción completada",
  EUS: "Itzulpena osatuta",
  EN: "Translation completed",
  FR: "Traduction terminée",
},
// SUMMARY //
information_summary_title: {
  EUS: "Laburtzailea",
  ES: "Resumidor",
  EN: "Summarizer",
  FR: "Résumeur",
},

information_summary_badge: {
  EUS: "Euskalia · Laburtzailea",
  ES: "Euskalia · Resumidor",
  EN: "Euskalia · Summarizer",
  FR: "Résumeur",
},
information_summary_point_1: {
  EUS: "Euskaliako laburtzaileak testu luzeak, dokumentuak eta web edukiak bertsio laburrago batean bihurtzea ahalbidetzen du. Bere funtzioa eduki baten ideia nagusiak identifikatzea eta modu argiago eta laburragoan aurkeztea da, informazio garrantzitsuena mantenduz.",
  ES: "El resumidor de Euskalia permite convertir textos largos, documentos y contenido web en versiones más breves y fáciles de consultar. Su función es identificar las ideas principales de un contenido y presentarlas de forma más clara y condensada, manteniendo la información más relevante.",
  EN: "Euskalia's summarizer allows long texts, documents and web content to be converted into shorter and easier-to-read versions. Its purpose is to identify the main ideas of a piece of content and present them in a clearer and more concise way while keeping the most relevant information.",
  FR: "Le résumeur d’Euskalia permet de transformer des textes longs, des documents et du contenu web en versions plus courtes et plus faciles à consulter. Sa fonction est d’identifier les idées principales d’un contenu et de les présenter de manière plus claire et plus condensée, tout en conservant les informations les plus importantes.",
},
information_summary_point_2_part_1: {
  EUS: "Hautatutako botoiaren arabera, laburpena ",
  ES: "Dependiendo del botón seleccionado, el resumen puede generarse en formato ",
  EN: "Depending on the selected option, the summary can be generated in ",
  FR: "Selon l’option sélectionnée, le résumé peut être généré sous un format ",
},

information_summary_point_2_highlight: {
  EUS: "laburra, ertaina edo zehatza",
  ES: "breve, medio o detallado",
  EN: "short, medium or detailed",
  FR: "court, moyen ou détaillé",
},

information_summary_point_2_part_2: {
  EUS: " izan daiteke. Emaitzaren luzera ere erabiltzaileak gehitutako iturrietan dagoen informazio kopuruaren araberakoa izango da.",
  ES: ". La longitud del resultado también dependerá de la cantidad de información disponible en las fuentes añadidas por el usuario.",
  EN: ". The length of the result will also depend on the amount of information available in the sources provided by the user.",
  FR: ". La longueur du résultat dépendra également de la quantité d’informations disponible dans les sources ajoutées par l’utilisateur.",
},

information_summary_point_3_part_1: {
  EUS: "Iturriko edukia ",
  ES: "La fuente puede estar escrita en ",
  EN: "The source content can be written in ",
  FR: "Le contenu source peut être rédigé dans ",
},

information_summary_point_3_highlight_1: {
  EUS: "edozein hizkuntzatan",
  ES: "cualquier idioma",
  EN: "any language",
  FR: "n’importe quelle langue",
},

information_summary_point_3_part_2: {
  EUS: " ezarri daiteke. Emaitza beti ",
  ES: ". El resultado se generará siempre en el ",
  EN: ". The result will always be generated in the ",
  FR: ". Le résultat sera toujours généré dans la ",
},

information_summary_point_3_highlight_2: {
  EUS: "hautatutako hizkuntzan",
  ES: "idioma",
  EN: "language",
  FR: "langue",
},

information_summary_point_3_part_3: {
  EUS: " sortzen da, beraz, hizkuntzen arteko edozein konbinazio erabili daiteke.",
  ES: " seleccionado en el selector, por lo que cualquier combinación entre idiomas es posible.",
  EN: " selected in the selector, making any language combination possible.",
  FR: " sélectionnée dans le sélecteur, ce qui permet toutes les combinaisons de langues.",
},

// CORRECTOR //
information_corrector_title: {
  EUS: "Zuzentzailea",
  ES: "Corrector",
  EN: "Corrector",
  FR: "Correcteur",
},

information_corrector_badge: {
  EUS: "Euskalia · Zuzentzailea",
  ES: "Euskalia · Corrector",
  EN: "Corrector",
  FR: "Correcteur",
},

information_corrector_point_1_part_1: {
  EUS: "Zuzentzaileak, ",
  ES: "El corrector revisa ",
  EN: "The corrector reviews ",
  FR: "Le correcteur examine les ",
},

information_corrector_point_1_highlight_1: {
  EUS: "ortografia, gramatika eta idazketa akatsak",
  ES: "errores ortográficos, gramaticales y de escritura",
  EN: "spelling, grammar and writing errors",
  FR: "erreurs orthographiques, grammaticales et rédactionnelles",
},

information_corrector_point_1_part_2: {
  EUS: " zuzentzen ditu, testuaren jatorrizko esanahia aldatu gabe. Bere funtzioa ",
  ES: " sin modificar el significado original del texto. Su función es ",
  EN: " without changing the original meaning of the text. Its purpose is to ",
  FR: " sans modifier le sens original du texte. Son objectif est de ",
},

information_corrector_point_1_highlight_2: {
  EUS: "akatsak detektatu eta zuzentzea",
  ES: "detectar y corregir errores",
  EN: "detect and correct errors",
  FR: "détecter et corriger les erreurs",
},

information_corrector_point_1_part_3: {
  EUS: " da, edukia eta egilearen asmoa mantenduz.",
  ES: ", manteniendo el contenido y la intención del autor.",
  EN: ", while preserving the content and the author's intent.",
  FR: ", tout en conservant le contenu et l’intention de l’auteur.",
},

information_corrector_point_2_part_1: {
  EUS: "Gehitutako testuaren ",
  ES: "El ",
  EN: "The ",
  FR: "La ",
},

information_corrector_point_2_highlight_1: {
  EUS: "hizkuntzak",
  ES: "idioma",
  EN: "language",
  FR: "langue",
},

information_corrector_point_2_part_2: {
  EUS: " bat etorri behar du ",
  ES: " del texto añadido debe coincidir con el ",
  EN: " of the added text must match the ",
  FR: " du texte ajouté doit correspondre à la ",
},

information_corrector_point_2_highlight_2: {
  EUS: "hautatzailean aukeratutako hizkuntzarekin",
  ES: "idioma seleccionado",
  EN: "selected language",
  FR: "langue sélectionnée",
},

information_corrector_point_2_part_3: {
  EUS: ". Edukia beste hizkuntza batean idatzita dagoela detektatzen bada, zuzenketa egin aurretik hautatzailea detektatutako hizkuntzara aldatzeko abisu bat erakutsiko da.",
  ES: " en el selector. Si se detecta que el contenido está escrito en otro idioma, se mostrará un aviso ofreciendo cambiar el selector al idioma detectado antes de realizar la corrección.",
  EN: " in the selector. If the content is detected to be written in another language, a notice will be displayed offering to switch the selector to the detected language before performing the correction.",
  FR: " dans le sélecteur. Si le contenu est détecté comme étant rédigé dans une autre langue, un avertissement proposera de modifier le sélecteur vers la langue détectée avant d’effectuer la correction.",
},

information_corrector_mockup_wrong: {
  EUS: "Ortografia eta gramatika akatsak dituen testua",
  ES: "Texto con errores ortográficos y gramaticales",
  EN: "Text with spelling and grammar mistakes",
  FR: "Texte avec des erreurs orthographiques et grammaticales",
},

information_corrector_mockup_right: {
  EUS: "Akatsik gabeko testu zuzendua",
  ES: "Texto corregido sin errores",
  EN: "Corrected text without errors",
  FR: "Texte corrigé sans erreurs",
},
information_paraphraser_title: {
  ES: "Parafraseador",
  EUS: "Parafraseatzailea",
  EN: "Paraphraser",
  FR: "Paraphraseur",
},
information_paraphraser_badge: {
  EUS: "Euskalia · Parafraseatzailea",
  ES: "Euskalia · Parafraseador",
  EN: "Euskalia · Paraphraser",
  FR: "Euskalia · Paraphraseur",
},

information_paraphraser_mockup_original: {
  EUS: "Jatorrizko testua",
  ES: "Texto original",
  EN: "Original text",
  FR: "Texte original",
},

information_paraphraser_mockup_rewritten: {
  EUS: "Berridatzitako testua",
  ES: "Texto reformulado",
  EN: "Rewritten text",
  FR: "Texte reformulé",
},

information_paraphraser_point_1_part_1: {
  EUS: "Parafraseatzaileak ",
  ES: "El parafraseador permite ",
  EN: "The paraphraser allows you to ",
  FR: "Le reformulateur permet de ",
},

information_paraphraser_point_1_highlight_1: {
  EUS: "testu bat berridaztea",
  ES: "reformular un texto",
  EN: "rephrase a text",
  FR: "reformuler un texte",
},

information_paraphraser_point_1_part_2: {
  EUS: " ahalbidetzen du, bere jatorrizko esanahia mantenduz. Bere funtzioa ideia berdinak beste hitz edo egitura batzuekin adieraztea da. Euskaliak hainbat parafraseo estilo eskaintzen ditu: Neutrala, Formala, Informala, Profesionala, Akademikoa, Arina eta Sortzailea, emaitza testuinguru eta behar desberdinetara egokitzeko.",
  ES: " manteniendo su significado original. Su función es expresar las mismas ideas utilizando palabras o estructuras diferentes. Euskalia ofrece distintos estilos de parafraseo: Neutral, Formal, Informal, Profesional, Académico, Fluido y Creativo, permitiendo adaptar el resultado a diferentes contextos y necesidades.",
  EN: " while preserving its original meaning. Its purpose is to express the same ideas using different words or structures. Euskalia offers several paraphrasing styles: Neutral, Formal, Informal, Professional, Academic, Fluent and Creative.",
  FR: " tout en conservant son sens original. Son objectif est d'exprimer les mêmes idées avec des mots ou des structures différentes.",
},

information_paraphraser_point_2_part_1: {
  EUS: " ",
  ES: "El ",
  EN: "The ",
  FR: "La ",
},

information_paraphraser_point_2_highlight_1: {
  EUS: "Emaitzaren hizkuntza",
  ES: "idioma",
  EN: "language",
  FR: "langue",
},

information_paraphraser_point_2_part_2: {
  EUS: " beti iturburuko testuaren bera izango da. Parafraseatzaileak ",
  ES: " del resultado siempre será el mismo que el del texto añadido en la fuente. El parafraseador ",
  EN: " of the result will always be the same as that of the source text. The paraphraser ",
  FR: " du résultat sera toujours le même que celui du texte source. Le reformulateur ",
},

information_paraphraser_point_2_highlight_2: {
  EUS: "edukia berridazten du",
  ES: "reformula el contenido",
  EN: "rephrases the content",
  FR: "reformule le contenu",
},

information_paraphraser_point_2_part_3: {
  EUS: ", baina ",
  ES: ", pero ",
  EN: ", but ",
  FR: ", mais ",
},

information_paraphraser_point_2_highlight_3: {
  EUS: "ez du itzulpenik egiten",
  ES: "no realiza traducciones",
  EN: "does not perform translations",
  FR: "ne réalise pas de traductions",
},

information_paraphraser_point_2_part_4: {
  EUS: ", ezta ere ",
  ES: " ni cambia el ",
  EN: " nor does it change the ",
  FR: " et ne modifie pas la ",
},

information_paraphraser_point_2_highlight_4: {
  EUS: "jatorrizko hizkuntza",
  ES: "idioma original del texto",
  EN: "original language of the text",
  FR: "langue d'origine du texte",
},

information_paraphraser_point_2_part_5: {
  EUS: " aldatu. Hautatzailean aukeratutako hizkuntzak bat etorri behar du edukiaren hizkuntzarekin. Testua beste hizkuntza batean dagoela detektatzen bada, parafraseatu aurretik hizkuntza aldatzeko aukera emango duen abisu bat erakutsiko da.",
  ES: ". El idioma seleccionado en el selector debe coincidir con el idioma del contenido añadido. Si se detecta que el texto está escrito en otro idioma, se mostrará un aviso ofreciendo cambiar el selector al idioma detectado antes del parafraseo.",
  EN: ". The selected language must match the language of the content provided. If another language is detected, a notice will be displayed before paraphrasing.",
  FR: ". La langue sélectionnée doit correspondre à celle du contenu ajouté. Si une autre langue est détectée, un avertissement sera affiché avant la reformulation.",
},

information_text_creator_title: {
  EUS: "Testu sortzailea",
  ES: "Creador de Texto",
  EN: "Text Creator",
  FR: "Créateur de texte",
},

information_text_creator_badge: {
  EUS: "Euskalia · Testu sortzailea",
  ES: "Euskalia · Creador de Texto",
  EN: "Euskalia · Text Creator",
  FR: "Euskalia · Créateur de texte",
},

information_text_creator_point_1: {
  EUS: "Testu sortzaileak erabiltzaileak emandako informaziotik eduki bat sortzea ahalbidetzen du. Artikuluak, deskribapenak, argitalpenak, informazio testuak eta bestelako eduki motak idazteko erabil daiteke. Gehitutako informazioa nahikoa ez bada, adimen artifizialak jarraitu aurretik testuinguru gehiago behar dela adieraziko duen mezu bat erakutsiko du.",
  ES: "El creador de texto permite generar contenido nuevo a partir de la información proporcionada por el usuario. Puede utilizarse para redactar artículos, descripciones, publicaciones, textos informativos y otros tipos de contenido. Si la información añadida no es suficiente, la inteligencia artificial mostrará un mensaje indicando que se necesita más contexto antes de continuar.",
  EN: "The text creator allows new content to be generated from the information provided by the user. It can be used to write articles, descriptions, posts, informational texts and other types of content. If the added information is not sufficient, the artificial intelligence will display a message indicating that more context is needed before continuing.",
  FR: "Le créateur de texte permet de générer du nouveau contenu à partir des informations fournies par l’utilisateur. Il peut être utilisé pour rédiger des articles, des descriptions, des publications, des textes informatifs et d’autres types de contenu. Si les informations ajoutées ne sont pas suffisantes, l’intelligence artificielle affichera un message indiquant qu’un contexte supplémentaire est nécessaire avant de continuer.",
},

information_text_creator_point_2_highlight_1: {
  EUS: "Luzera",
  ES: "La longitud",
  EN: "Length",
  FR: "La longueur",
},

information_text_creator_point_2_part_1: {
  EUS: " emaitzaren kontrol erabilgarriaren bidez doitu daiteke. Iturburuan informazioa edozein ",
  ES: " del resultado puede ajustarse mediante el control disponible en la herramienta. En la fuente se puede introducir información en cualquier ",
  EN: " of the result can be adjusted using the control available in the tool. Information can be entered in the source in any ",
  FR: " du résultat peut être ajustée grâce au contrôle disponible dans l’outil. Dans la source, il est possible d’introduire des informations dans n’importe quelle ",
},

information_text_creator_point_2_highlight_2: {
  EUS: "hizkuntzatan",
  ES: "idioma",
  EN: "language",
  FR: "langue",
},

information_text_creator_point_2_part_2: {
  EUS: " sar daiteke, eta sortutako testua hautatzailean aukeratutako hizkuntzan egongo da.",
  ES: ", mientras que el texto generado se mostrará en el idioma seleccionado en el selector.",
  EN: ", while the generated text will be displayed in the language selected in the selector.",
  FR: ", tandis que le texte généré s’affichera dans la langue sélectionnée dans le sélecteur.",
},

information_text_creator_point_3_part_1: {
  EUS: "Tresnak bi sortze modu ditu. ",
  ES: "La herramienta dispone de dos modos de creación. En el modo ",
  EN: "The tool has two creation modes. In ",
  FR: "L’outil dispose de deux modes de création. En mode ",
},

information_text_creator_point_3_highlight_1: {
  EUS: "Normala",
  ES: "Normal",
  EN: "Normal",
  FR: "Normal",
},

information_text_creator_point_3_part_2: {
  EUS: " moduan, erabiltzaileak informazioa ematen du eta adimen artifizialak erabakitzen du testua nola egituratu eta garatu. ",
  ES: ", el usuario proporciona la información y la inteligencia artificial decide cómo estructurar y desarrollar el texto. En el modo ",
  EN: " mode, the user provides the information and the artificial intelligence decides how to structure and develop the text. In ",
  FR: ", l’utilisateur fournit les informations et l’intelligence artificielle décide comment structurer et développer le texte. En mode ",
},

information_text_creator_point_3_highlight_2: {
  EUS: "Paragrafoen arabera",
  ES: "Por párrafos",
  EN: "By paragraphs",
  FR: "Par paragraphes",
},

information_text_creator_point_3_part_3: {
  EUS: " moduan, erabiltzaileak kontrol handiagoa du emaitzaren gainean, zenbat paragrafo sortu nahi dituen eta bakoitzak zer eduki edo funtzio izan behar duen adieraz dezakeelako.",
  ES: ", el usuario tiene un mayor control sobre el resultado, pudiendo indicar cuántos párrafos desea generar y qué contenido o función debe tener cada uno de ellos.",
  EN: " mode, the user has greater control over the result and can indicate how many paragraphs they want to generate and what content or purpose each one should have.",
  FR: ", l’utilisateur dispose d’un plus grand contrôle sur le résultat et peut indiquer combien de paragraphes il souhaite générer ainsi que le contenu ou la fonction de chacun.",
},

information_text_creator_tip: {
  EUS: "Garrantzitsua da erabiltzaileak ulertzea zenbat eta informazio, xehetasun eta testuinguru gehiago eman, orduan eta zehatzagoa eta osoagoa izango dela sortutako emaitza.",
  ES: "Es importante que el usuario entienda que cuanto más información, detalles y contexto proporcione, más preciso y completo podrá ser el resultado generado.",
  EN: "It is important for the user to understand that the more information, details and context they provide, the more accurate and complete the generated result can be.",
  FR: "Il est important que l’utilisateur comprenne que plus il fournit d’informations, de détails et de contexte, plus le résultat généré pourra être précis et complet.",
},

information_email_creator_title: {
  EUS: "Email sortzailea",
  ES: "Creador de Email",
  EN: "Email Creator",
  FR: "Créateur d’e-mails",
},

information_email_creator_badge: {
  EUS: "Euskalia · Email sortzailea",
  ES: "Euskalia · Creador de Email",
  EN: "Euskalia · Email Creator",
  FR: "Euskalia · Créateur d’e-mails",
},

information_email_creator_tip: {
  EUS: "Edozein mezu bidali aurretik, sortutako emaitza berrikustea gomendatzen da informazioa zuzena dela egiaztatzeko.",
  ES: "Antes de enviar cualquier correo, se recomienda revisar el resultado generado para comprobar que la información sea la correcta.",
  EN: "Before sending any email, it is recommended to review the generated result to make sure the information is correct.",
  FR: "Avant d’envoyer un e-mail, il est recommandé de vérifier le résultat généré afin de s’assurer que les informations sont correctes.",
},

information_email_creator_point_1_part_1: {
  EUS: "Email sortzaileak erabiltzaileak emandako informaziotik mezu elektronikoak sortzea ahalbidetzen du, informazioa idatzita dagoen ",
  ES: "El creador de email permite generar correos electrónicos a partir de la información proporcionada por el usuario, independientemente del ",
  EN: "The email creator allows emails to be generated from the information provided by the user, regardless of the ",
  FR: "Le créateur d’e-mails permet de générer des e-mails à partir des informations fournies par l’utilisateur, indépendamment de la ",
},

information_email_creator_point_1_highlight_1: {
  EUS: "hizkuntza",
  ES: "idioma",
  EN: "language",
  FR: "langue",
},

information_email_creator_point_1_part_2: {
  EUS: " edozein dela ere. Emaitza hautatzailean aukeratutako hizkuntzan erakutsiko da. Bi idazketa mota ditu: ",
  ES: " en que esté escrita. El resultado se mostrará en el idioma seleccionado en el selector. Dispone de dos estilos de redacción: ",
  EN: " in which it is written. The result will be shown in the language selected in the selector. It offers two writing styles: ",
  FR: " dans laquelle elles sont rédigées. Le résultat s’affichera dans la langue sélectionnée dans le sélecteur. Il propose deux styles de rédaction : ",
},

information_email_creator_point_1_highlight_2: {
  EUS: "Formala",
  ES: "Formal",
  EN: "Formal",
  FR: "Formel",
},

information_email_creator_point_1_part_3: {
  EUS: ", komunikazio profesionaletarako, eta ",
  ES: ", para comunicaciones profesionales, e ",
  EN: ", for professional communications, and ",
  FR: ", pour les communications professionnelles, et ",
},

information_email_creator_point_1_highlight_3: {
  EUS: "Informala",
  ES: "Informal",
  EN: "Informal",
  FR: "Informel",
},

information_email_creator_point_1_part_4: {
  EUS: ", mezu hurbilago eta naturalagoetarako.",
  ES: ", para mensajes más cercanos y naturales.",
  EN: ", for warmer and more natural messages.",
  FR: ", pour des messages plus proches et naturels.",
},

information_email_creator_point_2_part_1: {
  EUS: " ",
  ES: "En modo ",
  EN: "In ",
  FR: "En mode ",
},

information_email_creator_point_2_highlight_1: {
  EUS: "Sortzailea",
  ES: "Creativo",
  EN: "Creative",
  FR: "Créatif",
},

information_email_creator_point_2_part_2: {
  EUS: " moduan, adimen artifizialak mezua modu libreago eta sortzaileagoan garatzen du, eta oso aukera ona izan daiteke nola hasi edo zer idatzi ez dakiten erabiltzaileentzat. ",
  ES: ", la inteligencia artificial desarrolla el correo de forma más libre y creativa, pudiendo ser una muy buena opción para usuarios que tienen bloqueos sobre cómo empezar o qué escribir. En modo ",
  EN: " mode, the artificial intelligence develops the email in a freer and more creative way, making it a very good option for users who are unsure how to start or what to write. In ",
  FR: ", l’intelligence artificielle rédige l’e-mail de manière plus libre et créative, ce qui peut être une très bonne option pour les utilisateurs qui ne savent pas comment commencer ou quoi écrire. En mode ",
},

information_email_creator_point_2_highlight_2: {
  EUS: "Txantiloia",
  ES: "Plantilla",
  EN: "Template",
  FR: "Modèle",
},

information_email_creator_point_2_part_3: {
  EUS: " moduan, erabiltzaileak kontrol handiagoa du edukiaren gainean, paragrafo bakoitzaren informazioa zehaztu ahal duelako.",
  ES: ", el resultado es más literal y el usuario tiene un mayor control sobre el contenido, pudiendo definir la información de cada párrafo.",
  EN: " mode, the result is more literal and the user has greater control over the content by defining the information for each paragraph.",
  FR: ", le résultat est plus littéral et l’utilisateur dispose d’un plus grand contrôle sur le contenu, en pouvant définir les informations de chaque paragraphe.",
},

information_email_creator_point_3_part_1: {
  EUS: "Erabiltzaileak zenbat eta testuinguru, informazio eta xehetasun gehiago eman, orduan eta ",
  ES: "Cuanto más contexto, información y detalles proporcione el usuario, ",
  EN: "The more context, information and details the user provides, the ",
  FR: "Plus l’utilisateur fournit de contexte, d’informations et de détails, plus le résultat généré sera ",
},

information_email_creator_point_3_highlight_1: {
  EUS: "zehatzagoa eta osatuagoa",
  ES: "más preciso y completo",
  EN: "more accurate and complete",
  FR: "précis et complet",
},

information_email_creator_point_3_part_2: {
  EUS: " izango da sortutako emaitza.",
  ES: " será el resultado generado.",
  EN: " the generated result will be.",
  FR: ".",
},

  // =========================
  //        IA CHAT
  // =========================
  
  assistant_title: {
    ES: "¿Cómo puedo ayudarte?",
    EUS: "Nola lagundu dezaket?",
    EN: "How can I help you?",
    FR: "Comment puis-je vous aider ?",
  },
  assistant_new_chat: {
    ES: "Nuevo chat",
    EUS: "Txat berria",
    EN: "New chat",
    FR: "Nouveau chat",
  },
  assistant_emptyTitle: {
  ES: "¿Cómo puedo ayudarte?",
  EUS: "Nola lagundu dezaket?",
  EN: "How can I help you?",
  FR: "Comment puis-je vous aider ?"
},
assistant_emptySubtitle: {
  ES: "Escribe tu petición para empezar",
  EUS: "Idatzi zure eskaera hasteko",
  EN: "Write your request to get started",
  FR: "Écrivez votre demande pour commencer"
},
assistant_placeholder: {
  ES: "Escribe tu mensaje",
  EUS: "Idatzi zure mezua",
  EN: "Write your message",
  FR: "Écrivez votre message"
},
  assistant_placeholder: {
  ES: "Pregunta lo que quieras",
  EUS: "Idatzi hemen zure eskaera",
  EN: "Ask anything",
  FR: "Écrivez votre demande ici",
},
  assistant_send: {
    ES: "Enviar",
    EUS: "Bidali",
    EN: "Send",
    FR: "Envoyer",
  },
assistant_error_daily_limit: {
  ES: "Has alcanzado el límite diario de mensajes para el chat público.",
  EUS: "Txat publikoan eguneroko mezuen mugara iritsi zara.",
  EN: "You have reached the daily message limit for the public chat.",
  FR: "Vous avez atteint la limite quotidienne de messages pour le chat public."
},

assistant_error_char_limit: {
  ES: "El mensaje supera el límite de caracteres permitido para el chat público.",
  EUS: "Mezuak txat publikoarentzat onartutako karaktere muga gainditzen du.",
  EN: "The message exceeds the character limit for the public chat.",
  FR: "Le message dépasse la limite de caractères autorisée pour le chat public."
},

assistant_error_rate_limit: {
  ES: "Estás enviando mensajes demasiado rápido. Inténtalo de nuevo en unos segundos.",
  EUS: "Mezuak azkarregi bidaltzen ari zara. Saiatu berriro segundo batzuk barru.",
  EN: "You are sending messages too quickly. Please try again in a few seconds.",
  FR: "Vous envoyez des messages trop rapidement. Réessayez dans quelques secondes."
},

assistant_error_token_limit: {
  ES: "Has alcanzado el límite diario de uso del chat público.",
  EUS: "Txat publikoaren eguneroko erabilera-mugara iritsi zara.",
  EN: "You have reached the daily usage limit for the public chat.",
  FR: "Vous avez atteint la limite quotidienne d'utilisation du chat public."
},

assistant_error_empty: {
  ES: "No se ha enviado ningún mensaje válido.",
  EUS: "Ez da baliozko mezurik bidali.",
  EN: "No valid message was sent.",
  FR: "Aucun message valide n'a été envoyé."
},

assistant_error_generic: {
  ES: "Ha ocurrido un error al generar la respuesta. Inténtalo de nuevo más tarde.",
  EUS: "Errore bat gertatu da erantzuna sortzerakoan. Saiatu berriro pixka batean.",
  EN: "An error occurred while generating the response. Please try again later.",
  FR: "Une erreur est survenue lors de la génération de la réponse. Veuillez réessayer plus tard."
},


  /* === Aviso de funcionalidad no implementada === */
  not_implemented_title:    { ES: "Esta función no está implementada aún", EUS: "Funtzio hau oraindik ez dago ezarrita", EN: "This feature is not implemented yet", FR: "Cette fonctionnalité n’est pas encore implémentée" },
  not_implemented_subtitle: { ES: "Puedes solicitarla en tu próximo prompt 🚀", EUS: "Hurrengo prompt-ean eska dezakezu 🚀", EN: "You can request it in your next prompt 🚀", FR: "Vous pouvez la demander dans votre prochain prompt 🚀" },




   


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //        LANDING PAGE
  // =========================

     // BENEFITS SECTION //
    homeBenefits: {
  title: {
    ES: "¿Qué podrás conseguir apoyándote en Euskalia?",
    EUS: "Zer lortu dezakezu Euskaliaren laguntzarekin?",
    EN: "What can you achieve with Euskalia?",
    FR: "Que pouvez-vous obtenir grâce à Euskalia ?",
  },

  benefit1_title: {
    ES: "Ahorra horas de trabajo",
    EUS: "Aurreztu lan-orduak",
    EN: "Save hours of work",
    FR: "Gagnez des heures de travail",
  },
  benefit1_desc: {
    ES: "Trabaja con textos largos en segundos. Procesa, mejora y adapta contenido sin leerlo todo ni perder tiempo innecesario.",
    EUS: "Testu luzeekin segundo gutxitan lan egin. Edukia prozesatu, hobetu eta moldatu dena irakurri gabe eta denbora alferrik galdu gabe.",
    EN: "Work with long texts in seconds. Process, improve and adapt content without reading everything or wasting unnecessary time.",
    FR: "Travaillez sur de longs textes en quelques secondes. Traitez, améliorez et adaptez le contenu sans tout lire ni perdre de temps inutilement.",
  },

  benefit2_title: {
    ES: "Experiencia y productividad",
    EUS: "Esperientzia eta produktibitatea",
    EN: "Experience and productivity",
    FR: "Expérience et productivité",
  },
  benefit2_desc: {
    ES: "Euskalia está pensada para ofrecer la mejor experiencia de uso mientras aumentas tu productividad.",
    EUS: "Euskalia erabiltzaile-esperientzia onena eskaintzeko diseinatuta dago, aldi berean zure produktibitatea handitzeko.",
    EN: "Euskalia is designed to offer the best user experience while increasing your productivity.",
    FR: "Euskalia est conçue pour offrir la meilleure expérience d’utilisation tout en augmentant votre productivité.",
  },

  benefit3_title: {
    ES: "Accesible para cualquiera",
    EUS: "Edonorentzat eskuragarria",
    EN: "Accessible to everyone",
    FR: "Accessible à tous",
  },
  benefit3_desc: {
    ES: "Desde estudiantes hasta profesionales. Euskalia se adapta a tu nivel y a tu forma de trabajar.",
    EUS: "Ikasleentzako..., profesionalentzako... Euskalia zure mailara eta lan egiteko modura egokitzen da.",
    EN: "From students to professionals. Euskalia adapts to your level and your way of working.",
    FR: "Des étudiants aux professionnels. Euskalia s’adapte à votre niveau et à votre manière de travailler.",
  },

  benefit4_title: {
    ES: "Fortalece el uso del euskera",
    EUS: "Euskararen erabilera indartzen du",
    EN: "Strengthens the use of Basque",
    FR: "Renforce l’usage du basque",
  },
  benefit4_desc: {
    ES: "Usar, leer y escuchar euskera cada día es la mejor forma de mantenerlo vivo. Euskalia te lo pone fácil.",
    EUS: "Euskara egunero erabiltzea, irakurtzea eta entzutea da bizirik mantentzeko modurik onena. Euskaliak erraz jartzen dizu.",
    EN: "Using, reading and listening to Basque every day is the best way to keep it alive. Euskalia makes it easy.",
    FR: "Utiliser, lire et écouter le basque chaque jour est la meilleure façon de le faire vivre. Euskalia vous facilite la tâche.",
  },

  benefit5_title: {
    ES: "Fácil de usar, eficaz desde el primer minuto",
    EUS: "Erabilera erraza, lehen minututik eraginkorra",
    EN: "Easy to use, effective from the first minute",
    FR: "Facile à utiliser, efficace dès la première minute",
  },
  benefit5_desc: {
    ES: "Un diseño claro y directo para que te centres en el contenido, no en aprender a usar la herramienta.",
    EUS: "Diseinu argi eta zuzena, edukiari arreta jartzeko eta ez tresna nola erabili ikasteko.",
    EN: "A clear and direct design so you can focus on the content, not on learning how to use the tool.",
    FR: "Un design clair et direct pour vous concentrer sur le contenu, pas sur l’apprentissage de l’outil.",
  },

  benefit6_title: {
    ES: "Sin fricción, sin complicaciones",
    EUS: "Trabarik gabe, konplikaziorik gabe",
    EN: "No friction, no complications",
    FR: "Sans friction, sans complications",
  },
  benefit6_desc: {
    ES: "Empieza gratis, sin registros obligatorios ni instalaciones. Entra, usa Euskalia y decide después.",
    EUS: "Hasi doan, derrigorrezko erregistrorik edo instalaziorik gabe. Sartu, erabili Euskalia eta erabaki ondoren.",
    EN: "Start for free, with no mandatory registration or installations. Enter, use Euskalia and decide later.",
    FR: "Commencez gratuitement, sans inscription obligatoire ni installation. Entrez, utilisez Euskalia et décidez ensuite.",
  },
},

// HERRAMIENTAS EUSKALIA
toolsSection_title: {
  ES: "Herramientas de Euskalia",
  EUS: "Euskaliaren tresnak",
  EN: "Euskalia tools",
  FR: "Outils d’Euskalia",
},
toolsSection_cardTranslator_title: {
  ES: "Traductor",
  EUS: "Itzultzailea",
  EN: "Translator",
  FR: "Traducteur",
},
toolsSection_cardTranslator_desc: {
  ES: "Traduce entre euskera, español, inglés y francés con calidad profesional.",
  EUS: "Itzuli euskara, gaztelania, ingelesa eta frantsesa artean kalitate profesionalarekin.",
  EN: "Translate between Basque, Spanish, English and French with professional quality.",
  FR: "Traduisez entre le basque, l’espagnol, l’anglais et le français avec une qualité professionnelle.",
},

toolsSection_cardSummary_title: {
  ES: "Resumidor",
  EUS: "Laburtzailea",
  EN: "Summarizer",
  FR: "Résumeur",
},
toolsSection_cardSummary_desc: {
  ES: "Sintetiza textos largos en segundos manteniendo claridad y fidelidad.",
  EUS: "Laburtu testu luzeak segundo gutxitan, argitasuna eta fideltasuna mantenduz.",
  EN: "Summarize long texts in seconds while keeping clarity and fidelity.",
  FR: "Résumez de longs textes en quelques secondes tout en gardant clarté et fidélité.",
},

toolsSection_cardCorrector_title: {
  ES: "Corrector",
  EUS: "Zuzentzailea",
  EN: "Corrector",
  FR: "Correcteur",
},
toolsSection_cardCorrector_desc: {
  ES: "Mejora tu texto corrigiendo gramática, claridad y fluidez.",
  EUS: "Hobetu zure testua gramatika, argitasuna eta jariakortasuna zuzenduz.",
  EN: "Improve your text by correcting grammar, clarity and fluency.",
  FR: "Améliorez votre texte en corrigeant la grammaire, la clarté et la fluidité.",
},

toolsSection_cardParaphraser_title: {
  ES: "Parafraseador",
  EUS: "Parafrasatzailea",
  EN: "Paraphraser",
  FR: "Paraphraseur",
},
toolsSection_cardParaphraser_desc: {
  ES: "Reescribe tu texto con distintos estilos manteniendo el significado.",
  EUS: "Berridatzi zure testua estilo desberdinetan, esanahia mantenduz.",
  EN: "Rewrite your text in different styles while preserving the meaning.",
  FR: "Réécrivez votre texte avec différents styles tout en conservant le sens.",
},

toolsSection_cardHumanizer_title: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
  EN: "Humanizer",
  FR: "Humaniseur",
},
toolsSection_cardHumanizer_desc: {
  ES: "Haz que tu texto suene más natural, claro y fluido.",
  EUS: "Egin zure testua naturalagoa, argiagoa eta fluidoagoa izan dadin.",
  EN: "Make your text sound more natural, clear and fluent.",
  FR: "Rendez votre texte plus naturel, clair et fluide.",
},

toolsSection_cardAiDetector_title: {
  ES: "Detector IA",
  EUS: "IA-detektorea",
  EN: "AI detector",
  FR: "Détecteur IA",
},
toolsSection_cardAiDetector_desc: {
  ES: "Analiza el texto y estima la probabilidad de que haya sido generado por IA.",
  EUS: "Aztertu testua eta kalkulatu IA-k sortua izateko probabilitatea.",
  EN: "Analyze the text and estimate the probability it was generated by AI.",
  FR: "Analysez le texte et estimez la probabilité qu’il ait été généré par une IA.",
},


// CARACTERÍSTICAS DE EUSKALIA //
  features: {
  title: {
    ES: "Características de Euskalia",
    EUS: "Euskaliaren ezaugarriak",
    EN: "Euskalia features",
    FR: "Caractéristiques d’Euskalia",
  },
  paragraph: {
    ES: "Euskalia es una plataforma diseñada para trabajar con textos en euskera o al euskera de forma inteligente, cómoda y eficiente. Analiza el contenido en profundidad para ayudarte a entenderlo, mejorarlo y adaptarlo según tus necesidades, ya sea para estudiar, trabajar o crear contenido propio. Desde textos cortos hasta documentos completos o enlaces web, Euskalia procesa la información, detecta el contexto real y genera resultados claros, naturales y útiles. Todo el sistema está pensado para reducir esfuerzo, ahorrar tiempo y ofrecer una experiencia fluida tanto en el uso puntual como en un entorno profesional. Euskalia centraliza todas las herramientas en un solo lugar, con un enfoque claro en la productividad y en el uso real del euskera en el día a día.",
    EUS: "Euskalia testuak euskaraz edo euskarara modu adimentsu, eroso eta eraginkorrean lan egitera diseinatutako plataforma bat da. Edukia sakon aztertzen du. Ulertzen, hobetzen eta zure beharren arabera moldatzen laguntzen dizu. Ikasteko, lan egiteko edo edozein motatako edukiak sortzeko. Testu laburretatik hasi eta dokumentu osoetara edo web esteketara arte, Euskaliak informazioa prozesatzen du, testuinguru erreala antzematen du eta emaitza argi, natural eta erabilgarriak sortzen ditu. Sistema osoa ahalegina murrizteko, denbora aurrezteko eta erabilera puntualean zein ingurune profesionalean esperientzia arin eta erosoa eskaintzeko pentsatuta dago. Euskaliak tresna guztiak leku bakarrean biltzen ditu, produktibitatea eta euskararen eguneroko erabilera benetan indartzeko.",
    EN: "Euskalia is a platform designed to work with texts in Basque or into Basque in an intelligent, comfortable and efficient way. It analyzes content in depth to help you understand it, improve it and adapt it to your needs, whether for studying, working or creating your own content. From short texts to full documents or web links, Euskalia processes information, detects the real context and generates clear, natural and useful results. The whole system is built to reduce effort, save time and provide a smooth experience both for occasional use and in a professional environment. Euskalia brings all tools together in one place, with a clear focus on productivity and on real, everyday use of Basque.",
    FR: "Euskalia est une plateforme conçue pour travailler avec des textes en basque ou vers le basque de manière intelligente, confortable et efficace. Elle analyse le contenu en profondeur pour vous aider à le comprendre, l’améliorer et l’adapter à vos besoins, que ce soit pour étudier, travailler ou créer votre propre contenu. Des textes courts aux documents complets ou aux liens web, Euskalia traite l’information, détecte le contexte réel et génère des résultats clairs, naturels et utiles. Tout le système est pensé pour réduire l’effort, gagner du temps et offrir une expérience fluide, aussi bien pour un usage ponctuel que dans un cadre professionnel. Euskalia centralise toutes les outils en un seul endroit, avec un objectif clair : la productivité et l’usage réel du basque au quotidien.",
  },
  item1_title: {
    ES: "Ahorra tiempo de trabajo",
    EUS: "Lan-denbora aurrezten du",
    EN: "Save work time",
    FR: "Gagnez du temps de travail",
  },
  item1_desc: {
    ES: "Trabaja más rápido con textos complejos. Euskalia reduce esfuerzo y elimina pasos innecesarios.",
    EUS: "Testu konplexuekin azkarrago lan egin. Euskaliak lana arintzen dizu eta alferrikako pausuak kentzen ditu.",
    EN: "Work faster with complex texts. Euskalia reduces effort and removes unnecessary steps.",
    FR: "Travaillez plus vite avec des textes complexes. Euskalia réduit l’effort et élimine les étapes inutiles.",
  },

  item2_title: {
    ES: "Fácil de usar, resultados rápidos",
    EUS: "Erabilera erraza, emaitza azkarrak",
    EN: "Easy to use, fast results",
    FR: "Facile à utiliser, résultats rapides",
  },
  item2_desc: {
    ES: "No necesitas aprender nada. Entra, usa la plataforma y obtén resultados desde el primer momento.",
    EUS: "Ez da ikasi behar. Sartu, erabili eta lehen momentutik emaitzak lortu.",
    EN: "You don’t need to learn anything. Jump in, use the platform and get results from the first moment.",
    FR: "Vous n’avez rien à apprendre. Entrez, utilisez la plateforme et obtenez des résultats dès le premier instant.",
  },

  item3_title: {
    ES: "Pensado para cualquiera",
    EUS: "Edonorentzat pentsatua",
    EN: "Made for everyone",
    FR: "Pensé pour tout le monde",
  },
  item3_desc: {
    ES: "Desde estudiantes hasta profesionales. Euskalia se adapta a tu ritmo y a tu forma de trabajar.",
    EUS: "Ikasleentzat zein profesionalentzat. Euskaliak zure erritmoari eta beharrari egokitzen zaio.",
    EN: "From students to professionals. Euskalia adapts to your pace and your way of working.",
    FR: "Des étudiants aux professionnels. Euskalia s’adapte à votre rythme et à votre manière de travailler.",
  },

  item4_title: {
    ES: "Euskera en el día a día",
    EUS: "Euskara egunerokotasunean erabiltzeko",
    EN: "Basque in everyday life",
    FR: "Le basque au quotidien",
  },
  item4_desc: {
    ES: "Cuando usar euskera es más fácil, se usa más. Euskalia impulsa su uso real cada día.",
    EUS: "Euskara erabiltzea errazagoa denean, gehiago erabiltzen da. Euskaliak eguneroko erabilera sustatzen du.",
    EN: "When using Basque is easier, it’s used more. Euskalia boosts real daily usage.",
    FR: "Quand utiliser le basque devient plus simple, on l’utilise davantage. Euskalia encourage son usage réel au quotidien.",
  },

  item5_title: {
    ES: "Productividad real",
    EUS: "Benetako produktibitatea",
    EN: "Real productivity",
    FR: "Productivité réelle",
  },
  item5_desc: {
    ES: "Textos más claros, naturales y útiles. Resultados pensados para aplicarlos en estudios o trabajo.",
    EUS: "Testuak argiagoak, naturalagoak eta erabilgarriagoak. Emaitzak lanean edo ikasketetan aplikatzeko modukoak dira.",
    EN: "Clearer, more natural and useful texts. Results designed to be applied in studies or work.",
    FR: "Des textes plus clairs, naturels et utiles. Des résultats pensés pour être appliqués aux études ou au travail.",
  },

  item6_title: {
    ES: "Empieza sin fricción",
    EUS: "Oztoporik gabe hasteko",
    EN: "Start without friction",
    FR: "Commencez sans friction",
  },
  item6_desc: {
    ES: "Sin instalaciones ni registros obligatorios. Entra, prueba Euskalia y decide después.",
    EUS: "Ez dago instalaziorik ezta derrigorrezko erregistrorik. Sartu, probatu eta gero erabaki.",
    EN: "No installations or mandatory sign-ups. Enter, try Euskalia and decide later.",
    FR: "Aucune installation ni inscription obligatoire. Entrez, essayez Euskalia et décidez ensuite.",
  },


  highlight1_title: {
  ES: "🧠 Procesamiento inteligente del contenido",
  EUS: "🧠 Edukien prozesamendu adimenduna",
  EN: "🧠 Smart content processing",
  FR: "🧠 Traitement intelligent du contenu",
},
highlight1_desc: {
  ES: "Euskalia comprende cada contenido en su contexto para identificar lo que realmente quiere transmitir. De este modo, trabaja la información de forma coherente y genera resultados adaptados al objetivo del usuario.",
  EUS: "Euskaliak eduki bakoitzaren testuingurua ulertzen du, benetan zer adierazi nahi duen identifikatuz. Horri esker, informazioa modu koherentean lantzen du eta erabiltzailearen helburura egokitutako emaitzak sortzen ditu.",
  EN: "Euskalia understands each piece of content in its context to identify what it truly aims to convey. This way, it works with the information coherently and generates results adapted to the user’s goal.",
  FR: "Euskalia comprend chaque contenu dans son contexte afin d’identifier ce qu’il cherche réellement à transmettre. Ainsi, elle traite l’information de manière cohérente et génère des résultats adaptés à l’objectif de l’utilisateur.",
},
highlight2_title: {
  ES: "🎯 Resultados claros y naturales",
  EUS: "🎯 Emaitza argi eta naturalak",
  EN: "🎯 Clear and natural results",
  FR: "🎯 Des résultats clairs et naturels",
},
highlight2_desc: {
  ES: "El contenido generado es claro, natural y fácil de entender. Está pensado para un uso real, tanto en el estudio como en el trabajo.",
  EUS: "Sortutako edukiak argiak, naturalak eta erraz ulertzeko modukoak dira. Irakurketa arina eskaintzen dute eta erabilera errealerako prestatuta daude, bai ikasteko edo bai lanerako.",
  EN: "Generated content is clear, natural and easy to understand. It’s designed for real use, both for studying and for work.",
  FR: "Le contenu généré est clair, naturel et facile à comprendre. Il est pensé pour un usage réel, aussi bien pour les études que pour le travail.",
},
  highlight3_title: {
    ES: "🔒Privacidad garantizada",
    EUS: "🔒Segurtasuna bermatuta",
    EN: "🔒Privacy guaranteed",
    FR: "🔒Confidentialité garantie",
  },
  highlight3_desc: {
    ES: "El contenido no se almacena de forma permanente. Tus textos, documentos y enlaces se procesan de forma segura y temporal.",
    EUS: "Edukia ez da behin betiko gordetzen. Zure testuak, dokumentuak eta estekak modu seguruan eta aldi baterako prozesatzen dira.",
    EN: "Content is not stored permanently. Your texts, documents and links are processed securely and temporarily.",
    FR: "Le contenu n’est pas stocké de manière permanente. Vos textes, documents et liens sont traités de façon sécurisée et temporaire.",
  },
},




// Cómo funciona Euskalia
homeHowItWorks: {
  title: {
    ES: "¿Cómo funciona Euskalia?",
    EUS: "Nola funtzionatzen du Euskaliak?",
    EN: "How does Euskalia work?",
    FR: "Comment fonctionne Euskalia ?",
  },

  intro: {
    ES: "Euskalia es una plataforma basada en inteligencia artificial para el procesamiento de textos. El usuario introduce contenido mediante texto, documentos o enlaces web, y el sistema analiza automáticamente la información para identificar su estructura, contexto y significado. A partir de este análisis, el contenido se adapta al objetivo solicitado manteniendo la coherencia y el sentido original, sin necesidad de intervención manual ni configuraciones técnicas.",
    EUS: "Euskalia adimen artifizialean oinarritutako testu-prozesamendurako plataforma bat da. Erabiltzaileak edukia sartzen du testu, dokumentu edo web-esteken bidez, eta sistemak informazioa automatikoki aztertzen du egitura, testuingurua eta esanahia identifikatzeko. Analisi horretatik abiatuta, edukia eskatutako helburura egokitzen da, jatorrizko koherentzia eta esanahia mantenduz, eskuzko esku-hartzerik edo konfigurazio teknikorik gabe.",
    EN: "Euskalia is an AI-based platform for text processing. The user provides content via text, documents or web links, and the system automatically analyzes the information to identify its structure, context and meaning. From this analysis, the content is adapted to the requested goal while keeping coherence and the original meaning, without manual intervention or technical configurations.",
    FR: "Euskalia est une plateforme de traitement de textes basée sur l’intelligence artificielle. L’utilisateur saisit du contenu via du texte, des documents ou des liens web, et le système analyse automatiquement l’information pour identifier sa structure, son contexte et son sens. À partir de cette analyse, le contenu est adapté à l’objectif demandé en conservant la cohérence et le sens original, sans intervention manuelle ni configuration technique.",
  },

  offers_title: {
    ES: "🔎 ¿Qué hace exactamente Euskalia?",
    EUS: "🔎 Zer egiten du zehazki Euskaliak?",
    EN: "🔎 What does Euskalia do exactly?",
    FR: "🔎 Que fait exactement Euskalia ?",
  },

  offers_item1: {
    ES: "Analiza automáticamente la estructura y el contexto del contenido introducido.",
    EUS: "Sartutako edukiaren egitura eta testuingurua automatikoki aztertzen ditu.",
    EN: "It automatically analyzes the structure and context of the provided content.",
    FR: "Elle analyse automatiquement la structure et le contexte du contenu saisi.",
  },

  offers_item2: {
    ES: "Procesa información procedente de textos, documentos o URLs de forma unificada.",
    EUS: "Testu, dokumentu edo URLetatik datorren informazioa modu bateratuan prozesatzen du.",
    EN: "It processes information from texts, documents or URLs in a unified way.",
    FR: "Elle traite de manière unifiée l’information provenant de textes, documents ou URLs.",
  },

  offers_item3: {
    ES: "Aplica transformaciones manteniendo el significado principal del contenido.",
    EUS: "Edukiaren esanahi nagusia mantenduz moldaketak aplikatzen ditu.",
    EN: "It applies transformations while preserving the main meaning of the content.",
    FR: "Elle applique des transformations tout en conservant le sens principal du contenu.",
  },

  offers_item4: {
    ES: "Reorganiza la información de manera clara, coherente y estructurada.",
    EUS: "Informazioa modu argi, koherente eta egituratuan berrantolatzen du.",
    EN: "It reorganizes the information in a clear, coherent and structured way.",
    FR: "Elle réorganise l’information de manière claire, cohérente et structurée.",
  },

  offers_item5: {
    ES: "Ejecuta los procesos en tiempo real o en pocos segundos, incluso con textos largos.",
    EUS: "Prozesuak denbora errealean edo segundo gutxitan sortzen ditu, baita testu luzeekin ere.",
    EN: "It runs the processes in real time or in a few seconds, even with long texts.",
    FR: "Elle exécute les processus en temps réel ou en quelques secondes, même avec des textes longs.",
  },

  offers_item6: {
    ES: "Funciona sin configuraciones avanzadas y responde directamente a las acciones del usuario.",
    EUS: "Konfigurazio aurreraturik gabe funtzionatzen du eta erabiltzailearen ekintzei zuzenean erantzuten die.",
    EN: "It works without advanced settings and responds directly to user actions.",
    FR: "Elle fonctionne sans réglages avancés et répond directement aux actions de l’utilisateur.",
  },
},




 // ===================== FAQ SECTION ===================== //

  euskalia_what_is_title: {
    ES: "¿Qué es Euskalia?",
    EUS: "Zer da Euskalia?",
    EN: "What is Euskalia?",
    FR: "Qu’est-ce qu’Euskalia ?",
  },
  euskalia_what_is_text: {
    ES: "Euskalia es una plataforma de inteligencia artificial diseñada para trabajadores, estudiantes y cualquier persona que necesite traducir o resumir contenido de forma rápida y sencilla, centrada en el público vasco y en ayudar a cualquiera que necesite trabajar con el euskera. Su objetivo es ayudarte a entender y producir contenido en menos tiempo, sin perder calidad, y permitiéndote usar el euskera en tu día a día sin barreras.",
    EUS: "Euskalia adimen artifizialeko plataforma bat da, langileei, ikasleei eta edukiak modu azkar eta erraz batean itzuli edo laburtu behar dituen edonori zuzendua, euskal herritarrei eta euskararekin lan egin behar duen edonori laguntzera bideratua. Helburua edukiak denbora gutxiagoan ulertzen eta sortzen laguntzea da, kalitatea galdu gabe eta euskara egunerokoan oztoporik gabe erabiltzeko aukera emanez.",
    EN: "Euskalia is an AI platform designed for workers, students and anyone who needs to translate or summarize content quickly and easily. It focuses on the Basque audience and helps anyone who needs to work with Basque. Its goal is to help you understand and produce content in less time, without losing quality, and to let you use Basque in your daily life without barriers.",
    FR: "Euskalia est une plateforme d’IA conçue pour les travailleurs, les étudiants et toute personne ayant besoin de traduire ou de résumer du contenu rapidement et simplement. Elle est centrée sur le public basque et aide toute personne qui doit travailler avec le basque. Son objectif est de vous aider à comprendre et produire du contenu en moins de temps, sans perdre en qualité, et de vous permettre d’utiliser le basque au quotidien sans barrières.",
  },

  euskalia_goal_title: {
    ES: "Objetivo de Euskalia",
    EUS: "Euskaliaren helburua",
    EN: "Euskalia’s goal",
    FR: "Objectif d’Euskalia",
  },
  euskalia_goal_text: {
    ES: "El objetivo de Euskalia es impulsar el euskera en el ámbito digital, garantizando que las personas que viven, trabajan o estudian en nuestro entorno puedan usarlo como un idioma moderno, completo y plenamente funcional. Buscamos evitar la desinformación, las barreras tecnológicas y los problemas derivados de la falta de herramientas en euskera, ofreciendo soluciones de IA que permitan trabajar, aprender y comunicarse sin limitaciones lingüísticas.",
    EUS: "Euskaliaren helburua euskara eremu digitalean indartzea da, gure inguruan bizi, lan edo ikasten duten pertsonek hizkuntza moderno, oso eta guztiz funtzional gisa erabili ahal izan dezaten. Desinformazioa, oztopo teknologikoak eta euskarazko tresna faltak sortzen dituzten arazoak saihestu nahi ditugu, hizkuntza-mugarik gabe lan, ikasi eta komunikatzeko aukera emango duten AA soluzioak eskainiz.",
    EN: "Euskalia’s goal is to strengthen Basque in the digital world, ensuring that people who live, work or study in our environment can use it as a modern, complete and fully functional language. We aim to avoid misinformation, technological barriers and problems caused by the lack of tools in Basque by offering AI solutions that allow people to work, learn and communicate without language limitations.",
    FR: "L’objectif d’Euskalia est de renforcer le basque dans l’univers numérique, en garantissant que les personnes qui vivent, travaillent ou étudient dans notre environnement puissent l’utiliser comme une langue moderne, complète et pleinement fonctionnelle. Nous voulons éviter la désinformation, les barrières technologiques et les problèmes liés au manque d’outils en basque, en proposant des solutions d’IA permettant de travailler, d’apprendre et de communiquer sans limitations linguistiques.",
  },





  // =========================
  //       FAQ SECTION
  // =========================

  faq_title: {
    ES: "Preguntas frecuentes",
    EUS: "Ohiko galderak",
    EN: "Frequently asked questions",
    FR: "Questions fréquentes",
  },
  faq_subtitle: {
    ES: "Aquí respondemos las dudas más comunes de nuestros usuarios. Esta sección se actualiza constantemente para ayudarte mejor.",
    EUS: "Hemen gure erabiltzaileen ohiko zalantzak erantzuten ditugu. Atal hau etengabe eguneratzen da zuretzat hobe laguntzeko.",
    EN: "Here we answer our users’ most common questions. This section is constantly updated to help you better.",
    FR: "Ici, nous répondons aux questions les plus fréquentes de nos utilisateurs. Cette section est mise à jour en continu pour mieux vous aider.",
  
  },

  // 1 — ¿Qué es Euskalia?
  faq_item1_question: {
    ES: "🧠 ¿Qué es Euskalia?",
    EUS: "🧠 Zer da Euskalia?",
    EN: "🧠 What is Euskalia?",
    FR: "🧠 Qu’est-ce qu’Euskalia ?",
  },
  faq_item1_answer: {
    ES: "Euskalia es una plataforma para el procesamiento de textos basada en inteligencia artificial. Está dirigida a cualquier persona que desee trabajar con diferentes herramientas en el entorno de textos y contenidos, a estudiantes, trabajadores... Está orientada a ayudar a los ciudadanos vascos y a aquellos que deben trabajar con el euskera.\n\nEuskalia está centrada en el euskera como idioma principal. Tanto la traducción como el resto de herramientas funcionan siempre en relación al euskera, utilizando otros idiomas como castellano, inglés o francés únicamente para convertir el contenido hacia el euskera o desde el euskera, según las necesidades.\n\nEuskalia se caracteriza por un diseño claro y una experiencia de uso pensada para trabajar con textos sin fricciones. La interfaz es sencilla, directa y accesible, lo que permite centrarse en el contenido desde el primer momento, sin distracciones ni configuraciones complejas.",
    EUS: "Euskalia testuak prozesatzeko plataforma bat da, adimen artifizialean oinarritua. Testuen eta edukien ingurunean tresna desberdinekin lan egin nahi duen edonorentzat da, ikasleentzat, langileentzat... Euskal herritarrei eta euskararekin lan egin behar dutenei laguntzera bideratuta dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfaze sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
    EN: "Euskalia is an AI-based platform for text processing. It’s for anyone who wants to work with different tools in the world of texts and content: students, workers... It is aimed at helping Basque citizens and anyone who needs to work with Basque.\n\nEuskalia is centered around Basque as the main language. Both translation and the rest of the tools always work in relation to Basque, using other languages such as Spanish, English or French only to convert content to Basque or from Basque, depending on the need.\n\nEuskalia stands out for a clear design and a frictionless text-focused user experience. The interface is simple, direct and accessible, so you can focus on the content from the very first moment, without distractions or complex settings.",
    FR: "Euskalia est une plateforme de traitement de textes basée sur l’IA. Elle s’adresse à toute personne souhaitant utiliser différents outils dans l’univers des textes et des contenus : étudiants, travailleurs... Elle vise à aider les citoyens basques et toute personne qui doit travailler avec le basque.\n\nEuskalia est centrée sur le basque comme langue principale. La traduction comme les autres outils fonctionnent toujours en lien avec le basque, en utilisant d’autres langues comme l’espagnol, l’anglais ou le français uniquement pour convertir le contenu vers le basque ou depuis le basque, selon les besoins.\n\nEuskalia se distingue par un design clair et une expérience pensée pour travailler avec des textes sans friction. L’interface est simple, directe et accessible, ce qui permet de se concentrer sur le contenu dès le premier instant, sans distractions ni réglages complexes.",
  },

  // 2 — Objetivo de Euskalia
  faq_item2_question: {
    ES: "🎯 Objetivo de Euskalia",
    EUS: "🎯 Euskaliaren helburua",
    EN: "🎯 Euskalia’s goal",
    FR: "🎯 Objectif d’Euskalia",
  },
  faq_item2_answer: {
    ES: "El objetivo de Euskalia es impulsar el euskera en el ámbito digital, garantizando que las personas que viven, trabajan o estudian en nuestro entorno puedan usarlo como un idioma moderno, completo y plenamente funcional.\n\nBuscamos evitar la desinformación, las barreras tecnológicas y los problemas derivados de la falta de herramientas en euskera, ofreciendo soluciones de IA que permitan trabajar, aprender y comunicarse sin limitaciones lingüísticas.",
    EUS: "Euskaliaren helburua euskara eremu digitalean indartzea da, gure inguruan bizi, lan edo ikasten duten pertsonek hizkuntza moderno, oso eta guztiz funtzional gisa erabili ahal izan dezaten.\n\nDesinformazioa, oztopo teknologikoak eta euskarazko tresna faltak sortzen dituzten arazoak saihestu nahi ditugu, hizkuntza-mugarik gabe lan, ikasi eta komunikatzeko aukera emango duten IA soluzioak eskainiz.",
    EN: "Euskalia’s goal is to strengthen Basque in the digital world, ensuring that people who live, work or study in our environment can use it as a modern, complete and fully functional language.\n\nWe aim to prevent misinformation, technological barriers and problems caused by the lack of tools in Basque, by offering AI solutions that allow people to work, learn and communicate without language limitations.",
    FR: "L’objectif d’Euskalia est de renforcer le basque dans l’univers numérique, en garantissant que les personnes qui vivent, travaillent ou étudient dans notre environnement puissent l’utiliser comme une langue moderne, complète et pleinement fonctionnelle.\n\nNous voulons éviter la désinformation, les barrières technologiques et les problèmes liés au manque d’outils en basque, en proposant des solutions d’IA permettant de travailler, d’apprendre et de communiquer sans limitations linguistiques.",
  },

  // 3
  faq_item3_question: {
    ES: "🌍 ¿Qué idiomas soporta Euskalia?",
    EUS: "🌍 Zein hizkuntza onartzen ditu Euskaliak?",
    EN: "🌍 Which languages does Euskalia support?",
    FR: "🌍 Quelles langues Euskalia prend-elle en charge ?",
  },
faq_item3_answer: {
  ES: "Euskalia es una plataforma centrada en el euskera, pensada tanto para personas vascoparlantes como para usuarios que quieren relacionar el euskera con su propio idioma. La web está disponible en euskera, español, inglés y francés. El traductor permite trabajar entre euskera y múltiples idiomas compatibles, mientras que el resto de herramientas generan los resultados en los 4 idiomas principales de la plataforma. Además, la información que introduce el usuario puede estar escrita en prácticamente cualquier idioma, ya que Euskalia detecta y adapta automáticamente el contenido mediante inteligencia artificial. Si algún usuario desea añadir nuevos idiomas o tiene sugerencias lingüísticas, puede contactar con el equipo de Euskalia, que estará encantado de escuchar propuestas y seguir ampliando la plataforma.",

  EUS: "Euskalia euskaran oinarritutako plataforma bat da, bai euskaldunentzat bai euskara beren hizkuntzarekin lotu nahi duten erabiltzaileentzat sortua dago. Webgunea euskaraz, gaztelaniaz, ingelesez eta frantsesez dago erabilgarri. Itzultzaileak euskara eta beste hainbat hizkuntza bateragarriren artean lan egiteko aukera ematen du, eta gainerako tresnek emaitzak plataformako 4 hizkuntza nagusietan eskaintzen dituzte. Gainera, erabiltzaileak sartzen duen informazioa edozein hizkuntzatan egon daiteke, Euskaliak edukia automatikoki detektatu eta egokitzen baitu adimen artifizialaren bidez. Erabiltzaileren batek hizkuntza gehiago gehitu nahi baditu edo iradokizunen bat egin nahi badu, Euskaliako taldearekin harremanetan jar daiteke; pozik jasoko ditugu proposamen berriak eta plataforma hobetzen jarraituko dugu.",

  EN: "Euskalia is a platform focused on the Basque language, created both for Basque speakers and for people who want to connect Basque with their own language. The website is available in Basque, Spanish, English and French. The translator allows users to work between Basque and multiple compatible languages, while the rest of the tools generate results in the platform’s 4 main languages. In addition, the information entered by users can be written in almost any language, since Euskalia automatically detects and adapts the content using artificial intelligence. If any user would like to add more languages or share suggestions, they can contact the Euskalia team, who will be happy to listen and continue improving the platform.",

  FR: "Euskalia est une plateforme centrée sur la langue basque, pensée aussi bien pour les bascophones que pour les personnes souhaitant relier le basque à leur propre langue. Le site est disponible en basque, espagnol, anglais et français. Le traducteur permet de travailler entre le basque et plusieurs langues compatibles, tandis que les autres outils génèrent les résultats dans les 4 langues principales de la plateforme. De plus, les informations ajoutées par l’utilisateur peuvent être écrites dans presque n’importe quelle langue, car Euskalia détecte et adapte automatiquement le contenu grâce à l’intelligence artificielle. Si un utilisateur souhaite ajouter de nouvelles langues ou proposer des suggestions, il peut contacter l’équipe d’Euskalia, qui sera ravie d’écouter les propositions et de continuer à améliorer la plateforme."
},
  // 4
  faq_item4_question: {
  ES: "🛠️ ¿Qué herramientas incluye Euskalia?",
  EUS: "🛠️ Zer tresna eskaintzen ditu Euskaliak?",
  EN: "🛠️ What tools does Euskalia include?",
  FR: "🛠️ Quels outils propose Euskalia ?",
},
 faq_item4_answer: {
  ES: "Euskalia incluye diferentes herramientas relacionadas con el euskera y la generación de texto con IA. Actualmente puedes utilizar el traductor, resumidor, corrector, parafraseador, creador de texto y creador de emails. Además, Euskalia también cuenta con un asistente de IA pensado para ayudar con dudas, aprendizaje y generación de contenido relacionado con idiomas y textos.",
  EUS: "Euskaliak euskararekin eta IA bidezko testu-sorkuntzarekin lotutako hainbat tresna eskaintzen ditu. Horaingoz itzultzailea, laburtzailea, zuzentzailea, parafraseatzailea, testu-sortzailea eta email-sortzailea erabil ditzakezu. Gainera, Euskaliak hizkuntzei eta testuei lotutako zalantzak argitzeko, ikasteko eta edukia sortzeko pentsatutako IA laguntzaile bat ere badu.",
  EN: "Euskalia includes different tools related to the Basque language and AI-powered text generation. You can currently use the translator, summarizer, corrector, paraphraser, text creator and email creator. In addition, Euskalia also includes an AI assistant designed to help with questions, learning and content generation related to languages and texts.",
  FR: "Euskalia comprend différents outils liés à la langue basque et à la génération de texte avec l’IA. Vous pouvez actuellement utiliser le traducteur, le résumeur, le correcteur, le paraphraseur, le créateur de texte et le créateur d’emails. Euskalia dispose également d’un assistant IA conçu pour aider avec les questions, l’apprentissage et la génération de contenu lié aux langues et aux textes."
},

  // 5
  faq_item5_question: {
  ES: "📏 ¿Las herramientas de Euskalia tienen límites?",
  EUS: "📏 Euskaliako tresnek mugarik al dute?",
  EN: "📏 Do Euskalia’s tools have limits?",
  FR: "📏 Les outils d’Euskalia ont-ils des limites ?",
},
  faq_item5_answer: {
  ES: "Todas las herramientas de Euskalia cuentan con ciertos límites de uso y caracteres para garantizar un funcionamiento rápido, estable y seguro para todos los usuarios. Estos límites ayudan a mantener el rendimiento de la plataforma, evitar abusos y ofrecer una experiencia equilibrada mientras Euskalia sigue creciendo y mejorando.",
  EUS: "Euskaliako tresna guztiek erabilera eta karaktere mugak dituzte erabiltzaile guztientzat funtzionamendu azkar, egonkor eta segurua bermatzeko. Muga hauek beharrezkoak dira plataformaren errendimendua mantentzeko, gehiegizko erabilerak saihesteko eta Euskaliak hazten eta hobetzen jarraitzen duen bitartean esperientzia orekatua eskaintzeko.",
  EN: " All Euskalia tools include certain usage and character limits to ensure fast, stable and secure performance for all users. These limits help maintain the platform’s performance, prevent abuse and provide a balanced experience while Euskalia continues to grow and improve.",
  FR: "Tous les outils d’Euskalia disposent de certaines limites d’utilisation et de caractères afin de garantir un fonctionnement rapide, stable et sécurisé pour tous les utilisateurs. Ces limites permettent de maintenir les performances de la plateforme, d’éviter les abus et d’offrir une expérience équilibrée pendant qu’Euskalia continue de grandir et de s’améliorer."
},
  // 6
  faq_item6_question: {
    ES: "🔐 ¿Son seguras mis traducciones?",
    EUS: "🔐 Seguruak al dira nire itzulpenak?",
    EN: "🔐 Are my translations safe?",
    FR: "🔐 Mes traductions sont-elles sécurisées ?",
  },
  faq_item6_answer: {
  ES: "Euskalia está diseñada para ofrecer una experiencia segura y centrada en el usuario. La información que introduces solo se utiliza para generar el resultado solicitado en cada herramienta y no se comparte con terceros ni se utiliza con fines externos.",
  EUS: "Euskalia erabiltzailearentzako esperientzia segurua eta fidagarria eskaintzeko diseinatuta dago. Sartzen duzun informazioa tresna bakoitzean eskatutako emaitza sortzeko baino ez da erabiltzen, eta ez da hirugarrenekin partekatzen ezta kanpoko helburuetarako erabiltzen.",
  EN: "Euskalia is designed to provide a safe and user-focused experience. The information you enter is only used to generate the requested result within each tool and is not shared with third parties or used for external purposes.",
  FR: "Euskalia est conçue pour offrir une expérience sûre et centrée sur l’utilisateur. Les informations que vous saisissez sont utilisées uniquement pour générer le résultat demandé dans chaque outil et ne sont ni partagées avec des tiers ni utilisées à des fins externes."
},

  // 7
  faq_item7_question: {
  ES: "💼 ¿Qué opciones ofrece Euskalia?",
  EUS: "💼 Zein aukera eskaintzen ditu Euskaliak?",
  EN: "💼 What options does Euskalia offer?",
  FR: "💼 Quelles options propose Euskalia ?",
},
faq_item7_answer: {
  ES: "Euskalia ofrece dos opciones: una versión gratuita sin registro para usar el traductor y el resumidor, y una cuenta de pago para quienes necesitan más capacidad y una experiencia completa. En el futuro se añadirán nuevas funciones y planes avanzados.",
  EUS: "Euskaliak bi aukera eskaintzen ditu: erregistro gabe doako bertsioa, itzultzailea eta laburtzailea erabiltzeko; eta kontu ordaindua, gaitasun handiagoa eta esperientzia osoa behar dutenentzat. Etorkizunean funtzio eta plan aurreratuak gehituko dira.",
  EN: "Euskalia offers two options: a free version with no registration to use the translator and summarizer, and a paid account for those who need more capacity and a complete experience. In the future, new features and advanced plans will be added.",
  FR: "Euskalia propose deux options : une version gratuite sans inscription pour utiliser le traducteur et le résumeur, et un compte payant pour celles et ceux qui ont besoin de plus de capacité et d’une expérience complète. À l’avenir, de nouvelles fonctionnalités et des plans avancés seront ajoutés.",
},
  // 10
  faq_item10_question: {
     ES: "💬 ¿Cómo puedo contactar con Euskalia?",
  EUS: "💬 Nola jarri dezaket harremanetan Euskaliarekin ?",
  EN: "💬 How can I contact Euskalia?",
  FR: "💬 Comment puis-je contacter Euskalia ?",
},
  faq_item10_answer: {
  ES: "Si tienes dudas, puedes contactar desde la página de ayuda. Si quieres proponer nuevos idiomas, mejoras o sugerencias para Euskalia, también puedes hacerlo desde la página de sugerencias o a través del correo de Euskalia. El equipo de Euskalia estará muy contento de ayudaros en todo lo que necesitéis.\n\neuskaliaweb@gmail.com",
  EUS: "Zalantzarik baduzu, laguntza orrialdetik jar zaitezke gurekin harremanetan. Euskaliarentzat hizkuntza berriak, hobekuntzak edo iradokizunak proposatu nahi badituzu, iradokizunen orrialdetik edo Euskaliaren posta elektronikoaren bidez ere egin dezakezu. Euskaliako taldea pozik egongo da behar duzuen edozerrekin laguntzeko.\n\neuskaliaweb@gmail.com",
  EN: "If you have any questions, you can contact us through the help page. If you would like to suggest new languages, improvements or ideas for Euskalia, you can also do so through the suggestions page or by email. The Euskalia team will be very happy to help you with anything you need.\n\neuskaliaweb@gmail.com",
  FR: "Si vous avez des questions, vous pouvez nous contacter depuis la page d’aide. Si vous souhaitez proposer de nouvelles langues, des améliorations ou des suggestions pour Euskalia, vous pouvez également le faire depuis la page de suggestions ou par e-mail. L’équipe d’Euskalia sera ravie de vous aider pour tout ce dont vous avez besoin.\n\neuskaliaweb@gmail.com"
},
    
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //            CTA
  // =========================
  cta: {
    title: {
      ES: "✨ Lleva tu experiencia Euskalia al siguiente nivel",
      EUS: "✨ Eraman Euskaliako esperientzia hurrengo mailara",
      EN: "✨ Take your Euskalia experience to the next level",
      FR: "✨ Passez votre expérience Euskalia au niveau supérieur",
    },
    subtitle: {
      ES: "Guarda tus textos, elimina los anuncios y disfruta sin límites.",
      EUS: "Gorde zure testuak, kendu iragarkiak eta gozatu mugarik gabe.",
      EN: "Save your texts, remove ads and enjoy without limits.",
      FR: "Enregistrez vos textes, supprimez les publicités et profitez sans limites.",
    },
    button: {
      ES: "🚀 Empieza sin límites",
      EUS: "🚀 Hasi mugarik gabe",
      EN: "🚀 Start without limits",
      FR: "🚀 Commencez sans limites",
    },
  },

 // =========================
  //        FOOTER
  // =========================
  eusFooterColumnAboutTitle:   { ES: "Sobre Euskalia",            EUS: "Euskaliari buruz", EN: "About Euskalia", FR: "À propos d’Euskalia" },
  eusFooterColumnLegalTitle:   { ES: "Legal",                     EUS: "Legeak", EN: "Legal", FR: "Mentions légales" },
  eusFooterColumnContactTitle: { ES: "Contacto y Comunidad",      EUS: "Kontaktua eta Komunitatea", EN: "Contact & Community", FR: "Contact et communauté" },
  eusFooterLanguageTitle:      { ES: "Idioma",                    EUS: "Hizkuntza", EN: "Language", FR: "Langue" },
  eusFooterPlansButton:        { ES: "Planes",                    EUS: "Planak", EN: "Plans", FR: "Offres" },
  eusFooterRights:             { ES: "Todos los derechos reservados", EUS: "Eskubide guztiak erreserbatuta", EN: "All rights reserved", FR: "Tous droits réservés" },
  eusFooterCookies:            { ES: "Cookies",                   EUS: "Cookieak", EN: "Cookies", FR: "Cookies" },
  eusFooterContactEmailValue:  { ES: "euskaliaweb@gmail.com",      EUS: "euskaliaweb@gmail.com", EN: "euskaliaweb@gmail.com", FR: "euskaliaweb@gmail.com" },
  eusFooterLanguageLabel:      { ES: "Idioma",                    EUS: "Hizkuntza", EN: "Language", FR: "Langue" },


  /* ==== SOBRE EUSKALIA ==== */
  eusFooterAboutTitle1: { ES: "¿Qué es Euskalia?", EUS: "Zer da Euskalia?", EN: "What is Euskalia?", FR: "Qu’est-ce qu’Euskalia ?" },
  eusFooterAboutContent1: {
    ES: "Euskalia es una plataforma para el procesamiento de textos basada en inteligencia artificial. Está dirigida a cualquier persona que desee trabajar con diferentes herramientas en el entorno de textos y contenidos, a estudiantes, trabajadores... Está orientada a ayudar a los ciudadanos vascos y a aquellos que deben trabajar con el euskera.\n\nEuskalia está centrada en el euskera como idioma principal. Tanto la traducción como el resto de herramientas funcionan siempre en relación al euskera, utilizando otros idiomas como castellano, inglés o francés únicamente para convertir el contenido hacia el euskera o desde el euskera, según las necesidades.\n\nEuskalia se caracteriza por un diseño claro y una experiencia de uso pensada para trabajar con textos sin fricciones. La interfaz es sencilla, directa y accesible, lo que permite centrarse en el contenido desde el primer momento, sin distracciones ni configuraciones complejas.",
    EUS: "Euskalia testuak prozesatzeko plataforma bat da, adimen artifizialean oinarritua. Testuen eta edukien ingurunean tresna desberdinekin lan egin nahi duen edonorentzat da, ikasleentzat, langileentzat... Euskal herritarrei eta euskararekin lan egin behar dutenei laguntzera bideratuta dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfaze sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
    EN: "Euskalia is an AI-based platform for text processing. It is aimed at anyone who wants to work with different tools in the world of texts and content: students, workers... It is designed to help Basque citizens and anyone who needs to work with Basque.\n\nEuskalia is centered around Basque as its main language. Both translation and the rest of the tools always work in relation to Basque, using other languages such as Spanish, English or French only to convert content to Basque or from Basque, depending on the user’s needs.\n\nEuskalia stands out for a clear design and a user experience built to work with texts without friction. The interface is simple, direct and accessible, allowing you to focus on the content from the very first moment, without distractions or complex settings.",
    FR: "Euskalia est une plateforme de traitement de textes basée sur l’IA. Elle s’adresse à toute personne souhaitant utiliser différents outils dans l’univers des textes et des contenus : étudiants, travailleurs... Elle vise à aider les citoyens basques et toute personne qui doit travailler avec le basque.\n\nEuskalia est centrée sur le basque comme langue principale. La traduction comme les autres outils fonctionnent toujours en lien avec le basque, en utilisant d’autres langues comme l’espagnol, l’anglais ou le français uniquement pour convertir le contenu vers le basque ou depuis le basque, selon les besoins.\n\nEuskalia se distingue par un design clair et une expérience pensée pour travailler avec des textes sans friction. L’interface est simple, directe et accessible, ce qui permet de se concentrer sur le contenu dès le premier instant, sans distractions ni réglages complexes.",

  },

  eusFooterAboutTitle2: { ES: "¿Cómo funciona?", EUS: "Nola funtzionatzen du?", EN: "How does it work?", FR: "Comment ça marche ?" },
  eusFooterAboutContent2: {
    ES:  "Solo tienes que pegar un texto, subir un documento o indicar una URL. Euskalia extrae el contenido y te permite elegir qué hacer con él: traducir, resumir, corregir, parafrasear, crear texto o crear email. Ajustas el nivel o estilo si lo necesitas y obtienes un resultado listo para copiar, descargar o guardar en biblioteca.",
    EUS: "Testua itsatsi, dokumentua igo edo URL bat jarri besterik ez duzu egin behar. Euskaliak edukia erauzten du eta harekin zer egin aukeratzeko aukera ematen dizu: itzuli, laburtu, zuzendu, parafraseatu, testua sortu edo emaila sortu. Behar izanez gero maila edo estiloa doitu, eta emaitza kopiatu, deskargatu edo liburutegian gordetzeko prest izango duzu.",
    EN:  "You just need to paste text, upload a document or provide a URL. Euskalia extracts the content and lets you choose what to do with it: translate, summarize, correct, paraphrase, create text or create email. Adjust the level or style if needed and get a result ready to copy, download or save to your library.",
    FR: "Il vous suffit de coller un texte, de téléverser un document ou d’indiquer une URL. Euskalia extrait le contenu et vous permet de choisir quoi en faire : traduire, résumer, corriger, paraphraser, créer du texte ou créer un email. Vous ajustez le niveau ou le style si besoin et obtenez un résultat prêt à copier, télécharger ou enregistrer dans la bibliothèque.",
  },
  eusFooterAboutTitle3: { ES: "Herramientas de Euskalia", EUS: "Euskaliaren tresnak", EN: "Euskalia tools", FR: "Outils d’Euskalia" },
 eusFooterAboutContent3: { 
  ES: 
  "1- Traductor: traduce palabras, frases o textos completos al instante entre euskera y otros idiomas, manteniendo el contexto y la naturalidad.\n" +
  "2- Resumidor: reduce textos largos a versiones claras y estructuradas, extrayendo la información más relevante.\n" +
  "3- Corrector: detecta y corrige errores gramaticales, ortográficos y de estilo en textos en euskera.\n" +
  "4- Parafraseador: reescribe textos con otras palabras sin cambiar el significado, adaptándolos a distintos contextos.\n" +
  "5- Creador de texto: genera textos completos a partir de ideas, instrucciones o temas concretos.\n" +
  "6- Creador de email: redacta correos electrónicos claros, profesionales y adaptados a diferentes situaciones.",
  
  EUS: 
  "1- Itzultzailea: hitzak, esaldiak edo testu osoak berehala itzultzen ditu euskararen eta beste hizkuntzen artean, testuingurua eta naturaltasuna errespetatuz.\n" +
  "2- Laburtzailea: testu luzeak bertsio argi eta egituratuetan laburtzen ditu, informazio garrantzitsuena ateratzeko.\n" +
  "3- Zuzentzailea: euskarazko testuetan akats gramatikalak, ortografikoak eta estilozkoak zuzentzen ditu.\n" +
  "4- Parafraseatzailea: testuak beste modu batean berridazten ditu, esanahia aldatu gabe, testuinguru desberdinetara egokitzeko.\n" +
  "5- Testu sortzailea: ideietatik, jarraibideetatik edo gai zehatzetatik abiatuta testu osoak sortzen ditu.\n" +
  "6- Email sortzailea: egoera desberdinetarako email argi eta profesionalak idazten ditu.",

  EN:
  "1- Translator: instantly translates words, sentences or full texts between Basque and other languages, keeping context and naturalness.\n" +
  "2- Summarizer: reduces long texts into clear, structured versions, extracting the most relevant information.\n" +
  "3- Corrector: detects and fixes grammar, spelling and style issues in Basque texts.\n" +
  "4- Paraphraser: rewrites texts with different wording without changing the meaning, adapting them to different contexts.\n" +
  "5- Text creator: generates complete texts from ideas, instructions or specific topics.\n" +
  "6- Email creator: writes clear and professional emails adapted to different situations.",

  FR:
  "1- Traducteur : traduit instantanément des mots, des phrases ou des textes entiers entre le basque et d’autres langues, en conservant le contexte et la naturalité.\n" +
  "2- Résumeur : réduit de longs textes en versions claires et structurées, en extrayant l’information la plus pertinente.\n" +
  "3- Correcteur : détecte et corrige les erreurs de grammaire, d’orthographe et de style dans les textes en basque.\n" +
  "4- Paraphraseur : reformule les textes avec d’autres mots sans changer le sens, en les adaptant à différents contextes.\n" +
  "5- Créateur de texte : génère des textes complets à partir d’idées, d’instructions ou de sujets spécifiques.\n" +
  "6- Créateur d’emails : rédige des emails clairs et professionnels adaptés à différentes situations.",
},

  eusFooterAboutTitle4: { ES: "Resumidor", EUS: "Laburtzailea", EN: "Summarizer", FR: "Résumeur" },
  eusFooterAboutContent4: {
    ES:  "Convierte cualquier texto, documento o enlace en un resumen claro y directo en cuestión de segundos. La IA analiza el contenido, identifica las ideas principales y genera una versión breve que conserva la esencia del original. Perfecto para estudiantes, profesionales o cualquier persona que necesite entender un texto sin leerlo completo.",
    EUS: "Testua, dokumentua edo esteka oro segundo gutxitan laburpen argi eta zuzen batean bihurtzen du. Adimen artifizialak edukia aztertzen du, ideia nagusiak identifikatzen ditu eta jatorrizkoaren esentzia gordetzen duen bertsio laburra sortzen du. Ikasleentzat, profesionalentzat edo testu oso bat irakurri gabe ulertu nahi duen edonorentzat da baliagarria.",
    EN:  "Turns any text, document or link into a clear, direct summary in seconds. The AI analyzes the content, identifies the main ideas and generates a shorter version that keeps the essence of the original. Perfect for students, professionals or anyone who needs to understand a text without reading it entirely.",
    FR: "Transforme n’importe quel texte, document ou lien en un résumé clair et direct en quelques secondes. L’IA analyse le contenu, identifie les idées principales et génère une version plus courte qui conserve l’essence de l’original. Parfait pour les étudiants, les professionnels ou toute personne qui doit comprendre un texte sans le lire en entier.",
  },

  eusFooterAboutTitle5: { ES: "Planes", EUS: "Planak", EN: "Plans", FR: "Offres" },
  eusFooterAboutContent5: {
    ES:  "Euskalia ofrece un plan gratuito con acceso a las funciones básicas, traductor y resumidor. Los planes de pago amplían estas capacidades con herramientas avanzadas, mayores límites de uso y funciones pensadas para un trabajo más intensivo, manteniendo siempre la misma experiencia simple y directa.",
    EUS: "Euskaliak doako plana eskaintzen du oinarrizko funtzioekin, itzultzailea eta laburtzailea. Ordainpeko planek aukera horiek zabaltzen dituzte, tresna aurreratuak, erabilera-muga handiagoak eta lan intentsiborako pentsatutako funtzioak gehituz, betiere erabilera-esperientzia sinple eta zuzena mantenduz.",
    EN:  "Euskalia offers a free plan with access to the basic features: translator and summarizer. Paid plans expand these capabilities with advanced tools, higher usage limits and features designed for more intensive work, always keeping the same simple and direct experience.",
    FR: "Euskalia propose un plan gratuit donnant accès aux fonctions de base : traducteur et résumeur. Les plans payants élargissent ces capacités avec des outils avancés, des limites d’utilisation plus élevées et des fonctionnalités pensées pour un travail plus intensif, tout en conservant la même expérience simple et directe.",
  },

  eusFooterAboutTitle6: { ES: "Idiomas", EUS: "Hizkuntzak", EN: "Languages", FR: "Langues" },
  eusFooterAboutContent6: {
    ES:  "Euskalia funciona actualmente con cuatro idiomas principales: Euskera (EU), Castellano (ES), Inglés (GB) y Francés (FR). Puedes traducir o resumir en cualquiera de las combinaciones entre ellos. Aunque el enfoque principal es el uso y la comprensión del euskera, Euskalia está pensada para que el idioma conviva con naturalidad junto al español, el inglés y el francés.",
    EUS: "Euskalia gaur egun lau hizkuntza nagusirekin dabil: euskara (EUS), gaztelania (ES), ingelesa (GB) eta frantsesa (FR). Itzulpenak eta laburpenak haien arteko edozein konbinaziotan egin daitezke, nahiz eta helburu nagusia euskara erabiltzea eta ulertzea sustatzea izan. Euskalia euskara espainierarekin, ingelesarekin eta frantsesarekin modu naturalean bizikidetzan aritzeko pentsatuta dago.",
    EN:  "Euskalia currently works with four main languages: Basque (EU), Spanish (ES), English (GB) and French (FR). You can translate or summarize in any combination between them. Although the main focus is using and understanding Basque, Euskalia is designed so the language can naturally coexist alongside Spanish, English and French.",
    FR: "Euskalia fonctionne actuellement avec quatre langues principales : basque (EU), espagnol (ES), anglais (GB) et français (FR). Vous pouvez traduire ou résumer dans n’importe quelle combinaison entre elles. Même si l’objectif principal est l’usage et la compréhension du basque, Euskalia est pensée pour que la langue coexiste naturellement avec l’espagnol, l’anglais et le français.",
  },

  eusFooterLegalTitle1: { ES: "Aviso legal",                EUS: "Lege-oharra", EN: "Legal notice", FR: "Mentions légales" },
  eusFooterLegalTitle2: { ES: "Política de privacidad",     EUS: "Pribatutasun politika", EN: "Privacy Policy", FR: "Politique de confidentialité" },
  eusFooterLegalTitle3: { ES: "Términos y condiciones",     EUS: "Baldintzak eta erabilera", EN: "Terms and conditions", FR: "Conditions d’utilisation" },
  eusFooterLegalTitle4: { ES: "Uso de APIs de IA",          EUS: "Adimen Artifizialeko API en erabilera", EN: "Use of AI APIs", FR: "Utilisation des API d’IA" },
  eusFooterLegalTitle5: { ES: "Política de cookies",        EUS: "Cookie politika", EN: "Cookie Policy", FR: "Politique de cookies" },


  // Toast genérico usado en el Footer (iconos sociales, etc.)
  eusToastFeatureNotImplementedTitle: {
    ES: "🚧 Funcionalidad no implementada",
    EUS: "🚧 Funtzionaltasuna ez dago erabilgarri oraindik",
    EN: "🚧 Feature not implemented",
    FR: "🚧 Fonctionnalité non implémentée",
  },
  eusToastFeatureNotImplementedDescription: {
    ES: "Esta función aún no está implementada. ¡Pídela en tu próximo mensaje! 🚀",
    EUS: "Funtzio hau oraindik ez dago martxan. Eskatu hurrengo mezua bidaltzean! 🚀",
    EN: "This feature isn’t implemented yet. Ask for it in your next message! 🚀",
    FR: "Cette fonctionnalité n’est pas encore implémentée. Demandez-la dans votre prochain message ! 🚀",
  },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                        // =========================
                                        //        LEGAL 
                                        // =========================


/////////////////////////////////////////////////////
////////////////// AVISO LEGAL //////////////////////
/////////////////////////////////////////////////////

legal_notice_title: {
  ES: "Aviso legal",
  EUS: "Lege-oharra",
  EN: "Legal notice",
  FR: "Mentions légales",
},

/* 1. Información general */
legal_notice_section1_title: {
  ES: "1. Información general",
  EUS: "1. Informazio orokorra",
  EN: "1. General information",
  FR: "1. Informations générales",
},
legal_notice_section1_p1: {
  ES: "En cumplimiento de lo dispuesto en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que la entidad responsable de la gestión y funcionamiento de este sitio web es:",
  EUS: "Uztailaren 11ko 34/2002 Legearen 10. artikuluarekin bat etorriz, Informazioaren Gizarteko Zerbitzuei eta Merkataritza Elektronikoari buruzko Legeak (LSSI-CE) xedatutakoa betez, honako hau jakinarazten da: webgune honen kudeaketaz eta funtzionamenduaz arduratzen den arduraduna hau da:",
  EN: "In accordance with Article 10 of Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), we hereby inform you that the entity responsible for the management and operation of this website is:",
  FR: "Conformément à l’article 10 de la loi espagnole 34/2002 du 11 juillet relative aux services de la société de l’information et au commerce électronique (LSSI-CE), il est indiqué que l’entité responsable de la gestion et du fonctionnement de ce site web est :",
},
legal_notice_section1_field_name: {
  ES: "Nombre: Euskalia",
  EUS: "Izena: Euskalia",
  EN: "Name: Euskalia",
  FR: "Nom : Euskalia",
},
legal_notice_section1_field_domain: {
  ES: "Dominio: https://euskaliaweb.com",
  EUS: "Domeinua: https://euskaliaweb.com",
  EN: "Domain: https://euskaliaweb.com",
  FR: "Domaine : https://euskaliaweb.com",
},
legal_notice_section1_field_email: {
  ES: "Email: euskaliaweb@gmail.com",
  EUS: "Emaila: euskaliaweb@gmail.com",
  EN: "Email: euskaliaweb@gmail.com",
  FR: "Email : euskaliaweb@gmail.com",
},
legal_notice_section1_field_activity: {
  ES: "Actividad: servicios digitales de traducción, resumen y asistencia lingüística basados en inteligencia artificial.",
  EUS: "Jarduera: itzulpen, laburpen eta hizkuntza-laguntza digitaleko zerbitzuak, adimen artifizialean oinarrituak.",
  EN: "Activity: digital translation, summarization and language assistance services based on artificial intelligence.",
  FR: "Activité : services numériques de traduction, de résumé et d’assistance linguistique basés sur l’intelligence artificielle.",
},
legal_notice_section1_p2: {
  ES: "El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena y sin reservas del presente aviso legal y de las condiciones aquí recogidas.",
  EUS: "Webgunera sartzeak eta hura erabiltzeak erabiltzaile izaera ematen du, eta lege-ohar hau eta hemen ezarritako baldintzak osorik eta erreserbarik gabe onartzea dakar.",
  EN: "Accessing and using this website grants the status of user and implies full and unreserved acceptance of this legal notice and the conditions set out herein.",
  FR: "L’accès et l’utilisation de ce site confèrent la qualité d’utilisateur et impliquent l’acceptation pleine et entière, sans réserve, des présentes mentions légales et des conditions qui y sont établies.",
},

/* 2. Objeto */
legal_notice_section2_title: {
  ES: "2. Objeto",
  EUS: "2. Xedea",
  EN: "2. Purpose",
  FR: "2. Objet",
},
legal_notice_section2_p1: {
  ES: "El presente aviso legal regula el uso del sitio web Euskalia. Su finalidad principal es ofrecer herramientas de traducción, resumen y apoyo lingüístico entre euskera, castellano y otros idiomas, con ayuda de inteligencia artificial.",
  EUS: "Lege-ohar honek Euskalia webgunearen erabilera arautzen du. Euskaliaren helburu nagusia da euskararen, gaztelaniaren eta beste hizkuntza batzuen arteko itzulpen, laburpen eta hizkuntza-laguntza tresnak eskaintzea, adimen artifizialaren laguntzarekin.",
  EN: "This legal notice governs the use of the Euskalia website. Its main purpose is to provide translation, summarization and language support tools between Basque, Spanish and other languages, with the help of artificial intelligence.",
  FR: "Les présentes mentions légales régissent l’utilisation du site web Euskalia. Son objectif principal est de proposer des outils de traduction, de résumé et d’assistance linguistique entre le basque, l’espagnol et d’autres langues, avec l’aide de l’intelligence artificielle.",
},
legal_notice_section2_p2: {
  ES: "A través de la plataforma, el usuario puede introducir texto, documentos o enlaces para obtener resultados generados por IA, dentro de los límites de uso establecidos. Los resultados tienen carácter informativo y de asistencia, y el usuario es responsable de su uso final.",
  EUS: "Plataformaren bidez, erabiltzaileak testua, dokumentuak edo estekak sar ditzake IA bidez sortutako emaitzak lortzeko, ezarritako erabilera-mugen barruan. Emaitzek informazio- eta laguntza-izaera dute, eta azken erabileraren erantzulea erabiltzailea da.",
  EN: "Through the platform, users may enter text, documents or links to obtain AI-generated outputs, within the established usage limits. The outputs are provided for informational and assistance purposes, and the user is responsible for their final use.",
  FR: "Via la plateforme, l’utilisateur peut saisir du texte, des documents ou des liens afin d’obtenir des résultats générés par IA, dans la limite des conditions d’utilisation établies. Les résultats ont une finalité informative et d’assistance, et l’utilisateur est seul responsable de leur utilisation finale.",
},

/* 3. Condiciones de uso */
legal_notice_section3_title: {
  ES: "3. Condiciones de uso",
  EUS: "3. Erabilera baldintzak",
  EN: "3. Terms of use",
  FR: "3. Conditions d’utilisation",
},
legal_notice_section3_p1: {
  ES: "El usuario se compromete a utilizar el sitio web de forma adecuada y conforme a la ley, la buena fe y el orden público.",
  EUS: "Erabiltzaileak webgunea behar bezala eta legez, fede onez eta ordena publikoarekin bat etorriz erabiltzeko konpromisoa hartzen du.",
  EN: "The user undertakes to use the website properly and in accordance with the law, good faith and public order.",
  FR: "L’utilisateur s’engage à utiliser le site de manière appropriée et conformément à la loi, à la bonne foi et à l’ordre public.",
},
legal_notice_section3_li1: {
  ES: "No utilizar los contenidos con fines ilícitos o contrarios a la buena fe.",
  EUS: "Edukia legez kontrako edo fede onaren aurkako helburuetarako ez erabiltzea.",
  EN: "Not to use the content for unlawful purposes or contrary to good faith.",
  FR: "Ne pas utiliser les contenus à des fins illicites ou contraires à la bonne foi.",
},
legal_notice_section3_li2: {
  ES: "No causar daños en los sistemas de Euskalia ni intentar acceder a áreas restringidas sin autorización.",
  EUS: "Euskaliaren sistemetan kalterik ez eragitea eta baimenik gabe sarbide mugatuko eremuetara sartzen saiatzea.",
  EN: "Not to cause damage to Euskalia’s systems or attempt to access restricted areas without authorization.",
  FR: "Ne pas causer de dommages aux systèmes d’Euskalia ni tenter d’accéder à des zones restreintes sans autorisation.",
},
legal_notice_section3_li3: {
  ES: "No introducir ni difundir virus informáticos o sistemas que puedan causar daños.",
  EUS: "Ez sartzea eta ez zabaltzea kalteak eragin ditzaketen birus informatikoak edo antzeko sistema kaltegarriak.",
  EN: "Not to introduce or spread computer viruses or systems that may cause damage.",
  FR: "Ne pas introduire ni diffuser de virus informatiques ou de systèmes susceptibles de causer des dommages.",
},
legal_notice_section3_li4: {
  ES: "Respetar los derechos de propiedad intelectual e industrial de Euskalia y de terceros.",
  EUS: "Euskalia eta hirugarrenen jabetza intelektual eta industrialeko eskubideak errespetatzea.",
  EN: "To respect Euskalia’s and third parties’ intellectual and industrial property rights.",
  FR: "Respecter les droits de propriété intellectuelle et industrielle d’Euskalia et des tiers.",
},
legal_notice_section3_p2: {
  ES: "Euskalia se reserva el derecho de suspender o retirar el acceso al sitio web a los usuarios que incumplan estas condiciones o realicen un uso indebido del servicio.",
  EUS: "Euskaliak eskubidea du baldintza hauek betetzen ez dituzten erabiltzaileei sarbidea eteteko edo kentzeko, edo zerbitzuaren erabilera desegokia egiten badute.",
  EN: "Euskalia reserves the right to suspend or remove access to the website for users who breach these conditions or misuse the service.",
  FR: "Euskalia se réserve le droit de suspendre ou de retirer l’accès au site aux utilisateurs qui ne respectent pas ces conditions ou qui font un usage abusif du service.",
},

/* 4. Propiedad intelectual */
legal_notice_section4_title: {
  ES: "4. Propiedad intelectual e industrial",
  EUS: "4. Jabetza intelektuala eta industriala",
  EN: "4. Intellectual and industrial property",
  FR: "4. Propriété intellectuelle et industrielle",
},
legal_notice_section4_p1: {
  ES: "Todos los elementos que componen el sitio web (diseño, logotipos, textos, imágenes, software y código) son propiedad de Euskalia o se utilizan con las licencias correspondientes.",
  EUS: "Webgunea osatzen duten elementu guztiak (diseinua, logotipoak, testuak, irudiak, softwarea eta kodea) Euskaliaren jabetzakoak dira edo dagozkien lizentzien bidez erabiltzen dira.",
  EN: "All elements of the website (design, logos, texts, images, software and code) are owned by Euskalia or used under the corresponding licenses.",
  FR: "Tous les éléments composant le site (design, logos, textes, images, logiciels et code) sont la propriété d’Euskalia ou sont utilisés avec les licences correspondantes.",
},
legal_notice_section4_p2: {
  ES: "Queda prohibida la reproducción, distribución o transformación total o parcial de los contenidos sin autorización previa y por escrito del titular.",
  EUS: "Debekatuta dago edukiak osorik edo zatika erreproduzitzea, banatzea edo eraldatzea titularraren aldez aurreko baimen espresu eta idatzirik gabe.",
  EN: "The total or partial reproduction, distribution or transformation of content is prohibited without the prior written authorization of the owner.",
  FR: "Toute reproduction, distribution ou transformation totale ou partielle des contenus est interdite sans l’autorisation préalable et écrite du titulaire.",
},
legal_notice_section4_p3: {
  ES: "El usuario mantiene los derechos sobre los contenidos que introduce en la plataforma. No obstante, el usuario garantiza que dispone de los derechos necesarios para aportar dichos contenidos y que su uso no vulnera derechos de terceros.",
  EUS: "Erabiltzaileak mantentzen ditu plataforman sartzen dituen edukien gaineko eskubideak. Hala ere, erabiltzaileak bermatzen du eduki horiek emateko beharrezko eskubideak dituela eta erabilerak ez dituela hirugarrenen eskubideak urratzen.",
  EN: "The user retains rights over the content they input into the platform. However, the user guarantees they have the necessary rights to provide such content and that its use does not infringe third-party rights.",
  FR: "L’utilisateur conserve les droits sur les contenus qu’il introduit dans la plateforme. Toutefois, il garantit disposer des droits nécessaires pour fournir ces contenus et que leur utilisation ne porte pas atteinte aux droits de tiers.",
},

/* 5. Responsabilidad */
legal_notice_section5_title: {
  ES: "5. Responsabilidad",
  EUS: "5. Erantzukizuna",
  EN: "5. Liability",
  FR: "5. Responsabilité",
},
legal_notice_section5_p1: {
  ES: "Euskalia no garantiza la disponibilidad continua del sitio web ni la ausencia de errores, interrupciones o fallos derivados de causas ajenas o de mantenimiento técnico.",
  EUS: "Euskaliak ez du bermatzen webgunearen erabilgarritasun jarraitua, ezta kanpoko arrazoiengatik edo mantentze-lanengatik sor daitezkeen akats, etenaldi edo hutsegiterik ez egotea ere.",
  EN: "Euskalia does not guarantee continuous availability of the website or the absence of errors, interruptions or failures due to external causes or technical maintenance.",
  FR: "Euskalia ne garantit ni la disponibilité continue du site ni l’absence d’erreurs, d’interruptions ou de dysfonctionnements dus à des causes externes ou à des opérations de maintenance technique.",
},
legal_notice_section5_p2: {
  ES: "Los resultados generados mediante inteligencia artificial pueden contener imprecisiones u omisiones. El usuario es el único responsable de revisar, validar y utilizar dichos resultados.",
  EUS: "Adimen artifizialak sortutako emaitzek zehaztasun faltak edo hutsuneak izan ditzakete. Erabiltzailea da emaitzak berrikusi, balioztatu eta erabiltzeko erantzule bakarra.",
  EN: "Outputs generated through artificial intelligence may contain inaccuracies or omissions. The user is solely responsible for reviewing, validating and using those outputs.",
  FR: "Les résultats générés par l’intelligence artificielle peuvent comporter des imprécisions ou des omissions. L’utilisateur est seul responsable de vérifier, valider et utiliser ces résultats.",
},
legal_notice_section5_p3: {
  ES: "Euskalia no será responsable de los daños o perjuicios derivados del uso indebido de la plataforma o del uso que el usuario haga de los resultados obtenidos.",
  EUS: "Euskalia ez da erantzule izango plataformaren erabilera desegokitik edo lortutako emaitzen erabileratik eratorritako kalte edo galerengatik.",
  EN: "Euskalia shall not be liable for damages arising from misuse of the platform or from the user’s use of the obtained outputs.",
  FR: "Euskalia ne saurait être tenue responsable des dommages résultant d’un usage inapproprié de la plateforme ou de l’utilisation que l’utilisateur fait des résultats obtenus.",
},

/* 6. Política de enlaces */
legal_notice_section6_title: {
  ES: "6. Política de enlaces",
  EUS: "6. Esteken politika",
  EN: "6. Links policy",
  FR: "6. Politique de liens",
},
legal_notice_section6_p1: {
  ES: "El sitio web puede incluir enlaces a páginas de terceros. Estos enlaces se facilitan únicamente con finalidad informativa.",
  EUS: "Webguneak hirugarrenen webguneetarako estekak izan ditzake. Esteka horiek informazio-helburuarekin soilik ematen dira.",
  EN: "The website may include links to third-party pages. Such links are provided for informational purposes only.",
  FR: "Le site peut inclure des liens vers des pages de tiers. Ces liens sont fournis uniquement à titre informatif.",
},
legal_notice_section6_p2: {
  ES: "Euskalia no controla el contenido de dichas páginas y no asume responsabilidad alguna por sus políticas, contenidos o disponibilidad.",
  EUS: "Euskaliak ez ditu orri horien edukia kontrolatzen eta ez du erantzukizunik hartzen haien politika, eduki edo erabilgarritasunaren gainean.",
  EN: "Euskalia does not control the content of those pages and assumes no liability for their policies, content or availability.",
  FR: "Euskalia ne contrôle pas le contenu de ces pages et n’assume aucune responsabilité quant à leurs politiques, contenus ou disponibilité.",
},

/* 7. Protección de datos */
legal_notice_section7_title: {
  ES: "7. Protección de datos personales",
  EUS: "7. Datu pertsonalen babesa",
  EN: "7. Personal data protection",
  FR: "7. Protection des données personnelles",
},
legal_notice_section7_p1: {
  ES: "El tratamiento de los datos personales se realizará conforme a lo establecido en la Política de Privacidad disponible en este sitio web.",
  EUS: "Datu pertsonalen tratamendua webgune honetan eskuragarri dagoen Pribatutasun Politikaren arabera egingo da.",
  EN: "Personal data will be processed in accordance with the Privacy Policy available on this website.",
  FR: "Le traitement des données personnelles sera effectué conformément à la Politique de confidentialité disponible sur ce site.",
},

/* 8. Cookies */
legal_notice_section8_title: {
  ES: "8. Uso de cookies",
  EUS: "8. Cookieen erabilera",
  EN: "8. Use of cookies",
  FR: "8. Utilisation des cookies",
},
legal_notice_section8_p1: {
  ES: "Este sitio web utiliza cookies técnicas necesarias para su funcionamiento y, en su caso, cookies de análisis para comprender el uso del servicio y mejorar la experiencia.",
  EUS: "Webgune honek bere funtzionamendurako beharrezkoak diren cookie teknikoak eta, hala badagokio, analisi-cookieak erabiltzen ditu zerbitzuaren erabilera ulertu eta esperientzia hobetzeko.",
  EN: "This website uses technical cookies necessary for its operation and, where applicable, analytics cookies to understand service usage and improve the experience.",
  FR: "Ce site utilise des cookies techniques nécessaires à son fonctionnement et, le cas échéant, des cookies d’analyse afin de comprendre l’usage du service et d’améliorer l’expérience.",
},
legal_notice_section8_p2: {
  ES: "El usuario puede aceptar o rechazar las cookies no esenciales mediante el banner de consentimiento. En cualquier momento puede modificar su decisión desde la configuración del navegador o según se indique en la Política de Cookies.",
  EUS: "Erabiltzaileak cookie ez-esentzialak onartu edo baztertu ditzake baimen-bannerraren bidez. Edozein unetan bere erabakia aldatu dezake nabigatzailearen ezarpenetatik edo Cookieen Politikan adierazten den moduan.",
  EN: "Users may accept or reject non-essential cookies through the consent banner. They may change their choice at any time via browser settings or as indicated in the Cookies Policy.",
  FR: "L’utilisateur peut accepter ou refuser les cookies non essentiels via le bandeau de consentement. Il peut à tout moment modifier son choix via les paramètres du navigateur ou comme indiqué dans la Politique de cookies.",
},
legal_notice_section8_p3: {
  ES: "Para más información sobre las cookies utilizadas, su finalidad y cómo gestionarlas, consulta la Política de Cookies.",
  EUS: "Cookie erabiliei, haien helburuari eta nola kudeatu jakiteko, kontsultatu Cookieen Politika.",
  EN: "For more information about the cookies used, their purpose and how to manage them, please consult the Cookies Policy.",
  FR: "Pour plus d’informations sur les cookies utilisés, leur finalité et la manière de les gérer, consultez la Politique de cookies.",
},

/* 9. Jurisdicción */
legal_notice_section9_title: {
  ES: "9. Legislación aplicable y jurisdicción",
  EUS: "9. Aplikatu beharreko legeria eta jurisdikzioa",
  EN: "9. Applicable law and jurisdiction",
  FR: "9. Droit applicable et juridiction",
},
legal_notice_section9_p1: {
  ES: "Las presentes condiciones se rigen por la legislación española.",
  EUS: "Baldintza hauek Espainiako legearen arabera arautzen dira.",
  EN: "These terms are governed by Spanish law.",
  FR: "Les présentes conditions sont régies par le droit espagnol.",
},
legal_notice_section9_p2: {
  ES: "En caso de conflicto, las partes se someten a los Juzgados y Tribunales de Donostia, Gipuzkoa, salvo que la normativa aplicable disponga otra cosa.",
  EUS: "Gatazka izanez gero, aldeek Donostia, Gipuzkoa-ko epaitegi eta auzitegien jurisdikzioari men egingo diote, aplikatu beharreko araudiak bestela ezartzen badu izan ezik.",
  EN: "In the event of a dispute, the parties submit to the Courts and Tribunals of Donostia (San Sebastián), Gipuzkoa, unless the applicable regulations provide otherwise.",
  FR: "En cas de litige, les parties se soumettent aux tribunaux de Donostia (Saint-Sébastien), Gipuzkoa, sauf disposition contraire de la réglementation applicable.",
},

/* 10. Contacto */
legal_notice_section10_title: {
  ES: "10. Contacto",
  EUS: "10. Harremana",
  EN: "10. Contact",
  FR: "10. Contact",
},
legal_notice_section10_p1: {
  ES: "Para cualquier duda o consulta relacionada con este aviso legal, puedes contactar con nosotros a través de:",
  EUS: "Lege-ohar honekin lotutako edozein zalantza edo galderatarako, jar zaitez gurekin harremanetan honen bidez:",
  EN: "For any questions related to this legal notice, you can contact us at:",
  FR: "Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter via :",
},
legal_notice_section10_contact_email: {
  ES: "📧 Correo electrónico: euskaliaweb@gmail.com",
  EUS: "📧 Posta elektronikoa: euskaliaweb@gmail.com",
  EN: "📧 Email: euskaliaweb@gmail.com",
  FR: "📧 Email : euskaliaweb@gmail.com",
},

/* Footer */
legal_notice_footer_note: {
  ES: "Este aviso legal está actualizado a fecha: 09-01-2026.",
  EUS: "Lege-ohar hau honako data honetan eguneratua dago: 2026-01-09.",
  EN: "This legal notice was last updated on: 09-01-2026.",
  FR: "Ces mentions légales ont été mises à jour le : 09-01-2026.",
},

////////////////////////////////////////////////////////////////
//////////////////  POLÍTICA DE PRIVACIDAD  ////////////////////
////////////////////////////////////////////////////////////////


privacyPolicy: {
  title: {
    ES: "Política de privacidad",
    EUS: "Pribatutasun politika",
    EN: "Privacy Policy",
    FR: "Politique de confidentialité",
  },
  intro: {
    ES: "Esta Política de Privacidad explica cómo se tratan los datos personales en Euskalia y qué derechos tienen las personas usuarias cuando utilizan la plataforma.",
    EUS: "Pribatutasun politika honek azaltzen du Euskalian datu pertsonalak nola tratatzen diren eta erabiltzaileek zer eskubide dituzten plataforma erabiltzen dutenean.",
    EN: "This Privacy Policy explains how personal data is processed on Euskalia and what rights users have when using the platform.",
    FR: "Cette Politique de confidentialité explique comment les données personnelles sont traitées sur Euskalia et quels droits ont les utilisateurs lorsqu’ils utilisent la plateforme.",
  },

  section1Title: {
    ES: "1. Ámbito de aplicación",
    EUS: "1. Aplikazio-eremua",
    EN: "1. Scope",
    FR: "1. Champ d’application",
  },
  section1Body: {
    ES: "Euskalia se compromete a respetar la privacidad de quienes visitan y utilizan su web. Esta Política de Privacidad informa sobre el tratamiento de los datos personales recogidos a través del sitio y de los servicios ofrecidos. El uso del sitio implica la aceptación de esta Política y del tratamiento de los datos conforme a la normativa vigente.",
    EUS: "Euskaliak bere webgunea bisitatzen eta erabiltzen duten pertsonen pribatutasuna errespetatzeko konpromisoa hartzen du. Pribatutasun politika honek webgunearen eta bertan eskaintzen diren zerbitzuen bidez jasotako datu pertsonalen tratamendua azaltzen du. Webgunea erabiltzeak politika hau eta indarreko araudia onartzea dakar.",
    EN: "Euskalia is committed to respecting the privacy of people who visit and use its website. This Privacy Policy explains how personal data collected through the site and the services offered is processed. Using the website implies acceptance of this Policy and the processing of data in accordance with applicable regulations.",
    FR: "Euskalia s’engage à respecter la vie privée des personnes qui visitent et utilisent son site. Cette Politique de confidentialité informe du traitement des données personnelles collectées via le site et les services proposés. L’utilisation du site implique l’acceptation de cette Politique et du traitement des données conformément à la réglementation en vigueur.",
  },

  section2Title: {
    ES: "2. Responsable del tratamiento de los datos",
    EUS: "2. Datuen tratamenduaren arduraduna",
    EN: "2. Data controller",
    FR: "2. Responsable du traitement",
  },
  section2Body: {
    ES: "Los datos personales facilitados a través de Euskalia se integran en un tratamiento gestionado por el titular del proyecto.",
    EUS: "Euskaliaren bidez emandako datu pertsonalak proiektuaren titularrak kudeatutako tratamendu batean sartzen dira.",
    EN: "The personal data provided through Euskalia is incorporated into a processing activity managed by the project owner.",
    FR: "Les données personnelles fournies via Euskalia sont intégrées à un traitement géré par le titulaire du projet.",
  },
  section2Details: {
    ES: "Titular del sitio: Euskalia (proyecto digital independiente)\nNombre comercial: Euskalia\nActividad: Servicios digitales de traducción, resumen y asistencia lingüística basados en inteligencia artificial.\nCorreo electrónico de contacto: euskaliaweb@gmail.com\nDominio web: https://euskaliaweb.com",
    EUS: "Webgunearen titularra: Euskalia (proiektu digital independentea)\nIzen komertziala: Euskalia\nJarduera: Itzulpen, laburpen eta laguntza linguistikorako zerbitzu digitalak, adimen artifizialean oinarrituak.\nHarremanetarako posta elektronikoa: euskaliaweb@gmail.com\nWebgunearen domeinua: https://euskaliaweb.com",
    EN: "Website owner: Euskalia (independent digital project)\nTrade name: Euskalia\nActivity: Digital services for translation, summarization and language assistance based on artificial intelligence.\nContact email: euskaliaweb@gmail.com\nWebsite domain: https://euskaliaweb.com",
    FR: "Titulaire du site : Euskalia (projet numérique indépendant)\nNom commercial : Euskalia\nActivité : Services numériques de traduction, de résumé et d’assistance linguistique basés sur l’intelligence artificielle.\nEmail de contact : euskaliaweb@gmail.com\nDomaine : https://euskaliaweb.com",
  },

  section3Title: {
    ES: "3. Finalidades del tratamiento",
    EUS: "3. Tratamenduaren helburuak",
    EN: "3. Purposes of processing",
    FR: "3. Finalités du traitement",
  },
  section3Body: {
    ES: "Los datos podrán utilizarse para: facilitar el uso de la plataforma, responder consultas o solicitudes de soporte, enviar comunicaciones informativas o novedades (si se ha dado el consentimiento) y mejorar la experiencia de uso mediante análisis estadísticos agregados. La persona usuaria puede darse de baja de estas comunicaciones en cualquier momento a través de los enlaces de cancelación o escribiendo al correo de contacto indicado.",
    EUS: "Datuak honako helburu hauekin erabili ahal izango dira: plataformaren erabilera erraztea, kontsultei edo laguntza-eskaerei erantzutea, informazio- edo berritasun-komunikazioak bidaltzea (baimena eman bada) eta esperientzia hobetzea estatistika-analisien bidez. Erabiltzaileak edozein unetan baja eman dezake komunikazio horietatik, mezuetan agertzen den baja-estekaren bidez edo adierazitako kontaktu-helbidera idatziz.",
    EN: "Data may be used to: facilitate the use of the platform, respond to queries or support requests, send informational communications or updates (if consent has been given), and improve the user experience through aggregated statistical analysis. Users can unsubscribe at any time via the unsubscribe links or by writing to the contact email provided.",
    FR: "Les données peuvent être utilisées pour : faciliter l’utilisation de la plateforme, répondre aux demandes ou au support, envoyer des communications d’information ou des nouveautés (si le consentement a été donné) et améliorer l’expérience via des analyses statistiques agrégées. Les utilisateurs peuvent se désinscrire à tout moment via les liens de désinscription ou en écrivant à l’email de contact indiqué.",
  },

  // ✅ NUEVO: base legal
  legalBasisTitle: {
    ES: "4. Base legal del tratamiento",
    EUS: "4. Tratamenduaren oinarri juridikoa",
    EN: "4. Legal basis for processing",
    FR: "4. Base légale du traitement",
  },
  legalBasisBody: {
    ES: "El tratamiento de los datos personales se realiza conforme a las siguientes bases legales:\n\n- Consentimiento: cuando el usuario lo otorga, por ejemplo para comunicaciones o cookies no esenciales.\n- Ejecución del servicio: para prestar las funcionalidades solicitadas dentro de la plataforma.\n- Interés legítimo: para seguridad, prevención de abuso y mejora del servicio.\n- Cumplimiento de obligaciones legales: cuando sea aplicable.",
    EUS: "Datu pertsonalen tratamendua honako oinarri juridiko hauen arabera egiten da:\n\n- Baimena: erabiltzaileak ematen duenean, adibidez komunikazioetarako edo funtsezkoak ez diren cookieetarako.\n- Zerbitzuaren gauzatzea: plataforman eskatutako funtzionalitateak eskaintzeko.\n- Interes legitimoa: segurtasunerako, abusua prebenitzeko eta zerbitzua hobetzeko.\n- Legezko betebeharrak betetzea: aplikagarria denean.",
    EN: "Personal data is processed under the following legal bases:\n\n- Consent: when the user provides it, for example for communications or non-essential cookies.\n- Performance of a service: to provide the requested features within the platform.\n- Legitimate interest: for security, abuse prevention and service improvement.\n- Compliance with legal obligations: when applicable.",
    FR: "Les données personnelles sont traitées sur les bases légales suivantes :\n\n- Consentement : lorsque l’utilisateur le donne, par exemple pour les communications ou les cookies non essentiels.\n- Exécution du service : pour fournir les fonctionnalités demandées au sein de la plateforme.\n- Intérêt légitime : pour la sécurité, la prévention des abus et l’amélioration du service.\n- Respect d’obligations légales : lorsque cela s’applique.",
  },

  // ✅ NUEVO: datos tratados
  dataTitle: {
    ES: "5. Datos tratados",
    EUS: "5. Tratatutako datuak",
    EN: "5. Data processed",
    FR: "5. Données traitées",
  },
  dataBody: {
    ES: "Euskalia puede tratar las siguientes categorías de datos:\n\n- Datos de contacto: correo electrónico (si el usuario contacta o se registra).\n- Datos técnicos: dirección IP, navegador, dispositivo, identificadores de sesión y eventos de uso.\n- Contenidos aportados por el usuario: texto/documentos/enlaces que se introduzcan para su procesamiento.\n\nSe recomienda no introducir información sensible. Euskalia no solicita intencionalmente categorías especiales de datos.",
    EUS: "Euskaliak honako datu-kategoria hauek trata ditzake:\n\n- Harremanetarako datuak: posta elektronikoa (erabiltzaileak kontaktatzen badu edo erregistratzen bada).\n- Datu teknikoak: IP helbidea, nabigatzailea, gailua, saio-identifikatzaileak eta erabilera-gertaerak.\n- Erabiltzaileak emandako edukiak: prozesatzeko sartzen den testua/dokumentuak/estekak.\n\nGomendagarria da informazio sentikorra ez sartzea. Euskaliak ez ditu nahita datu berezien kategoriak eskatzen.",
    EN: "Euskalia may process the following categories of data:\n\n- Contact data: email address (if the user contacts or registers).\n- Technical data: IP address, browser, device, session identifiers and usage events.\n- User-provided content: text/documents/links submitted for processing.\n\nIt is recommended not to enter sensitive information. Euskalia does not intentionally request special categories of data.",
    FR: "Euskalia peut traiter les catégories de données suivantes :\n\n- Données de contact : email (si l’utilisateur contacte ou s’inscrit).\n- Données techniques : adresse IP, navigateur, appareil, identifiants de session et événements d’usage.\n- Contenus fournis par l’utilisateur : texte/documents/liens soumis au traitement.\n\nIl est recommandé de ne pas saisir d’informations sensibles. Euskalia ne demande pas intentionnellement de catégories particulières de données.",
  },

  // ✅ NUEVO: conservación
  retentionTitle: {
    ES: "6. Conservación de los datos",
    EUS: "6. Datuen kontserbazioa",
    EN: "6. Data retention",
    FR: "6. Conservation des données",
  },
  retentionBody: {
    ES: "Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y para atender posibles responsabilidades legales.\n\nComo regla general:\n- Consultas/soporte: el tiempo imprescindible para resolver la solicitud.\n- Comunicaciones: hasta que el usuario solicite la baja.\n- Datos técnicos y de medición: según plazos razonables o los definidos por las herramientas utilizadas.\n\nPosteriormente, los datos se eliminarán o anonimizarán cuando sea posible.",
    EUS: "Datuak bildu ziren helburua betetzeko behar den denboran gordeko dira, eta legezko erantzukizunak artatzeko beharrezkoa denean.\n\nOro har:\n- Kontsultak/laguntza: eskaera ebazteko behar den denbora.\n- Komunikazioak: erabiltzaileak baja eskatzen duen arte.\n- Datu teknikoak eta neurketa-datuak: epe arrazoizkoetan edo erabilitako tresnek ezarritako epeen arabera.\n\nOndoren, datuak ezabatu edo anonimizatu egingo dira ahal denean.",
    EN: "Data will be kept for the time necessary to fulfill the purpose for which it was collected and to address possible legal liabilities.\n\nAs a general rule:\n- Queries/support: the time needed to resolve the request.\n- Communications: until the user unsubscribes.\n- Technical/measurement data: for reasonable periods or those defined by the tools used.\n\nAfterwards, data will be deleted or anonymized whenever possible.",
    FR: "Les données seront conservées le temps nécessaire pour atteindre la finalité pour laquelle elles ont été collectées et pour répondre à d’éventuelles responsabilités légales.\n\nEn règle générale :\n- Demandes/support : le temps nécessaire pour résoudre la demande.\n- Communications : jusqu’à la désinscription de l’utilisateur.\n- Données techniques et de mesure : selon des durées raisonnables ou celles définies par les outils utilisés.\n\nEnsuite, les données seront supprimées ou anonymisées lorsque possible.",
  },

  // ✅ NUEVO: destinatarios/terceros
  recipientsTitle: {
    ES: "7. Destinatarios y terceros",
    EUS: "7. Hartzaileak eta hirugarrenak",
    EN: "7. Recipients and third parties",
    FR: "7. Destinataires et tiers",
  },
  recipientsBody: {
    ES: "Euskalia puede apoyarse en proveedores tecnológicos (por ejemplo, alojamiento, analítica o servicios publicitarios) que pueden tratar datos en nombre del responsable como encargados del tratamiento.\n\nEn la versión gratuita pueden mostrarse anuncios y, cuando sea necesario, su uso se gestionará mediante el sistema de consentimiento correspondiente.\n\nEuskalia no vende datos personales.",
    EUS: "Euskaliak hornitzaile teknologikoak erabil ditzake (adibidez, hosting-a, analitika edo publizitate-zerbitzuak), arduradunaren izenean datuak trata ditzaketen tratamendu-arduradun gisa.\n\nDoako bertsioan iragarkiak ager daitezke eta, behar denean, haien erabilera dagokion baimen-sistemaren bidez kudeatuko da.\n\nEuskaliak ez ditu datu pertsonalak saltzen.",
    EN: "Euskalia may rely on technology providers (for example hosting, analytics or advertising services) that may process data on behalf of the controller as data processors.\n\nAds may be shown in the free version and, when required, their use will be managed through the appropriate consent system.\n\nEuskalia does not sell personal data.",
    FR: "Euskalia peut s’appuyer sur des prestataires technologiques (par exemple hébergement, analytique ou services publicitaires) pouvant traiter des données pour le compte du responsable en tant que sous-traitants.\n\nDes publicités peuvent apparaître dans la version gratuite et, lorsque nécessaire, leur utilisation sera gérée via le système de consentement approprié.\n\nEuskalia ne vend pas de données personnelles.",
  },

  // ✅ NUEVO: transferencias internacionales
  intlTransfersTitle: {
    ES: "8. Transferencias internacionales",
    EUS: "8. Nazioarteko transferentziak",
    EN: "8. International transfers",
    FR: "8. Transferts internationaux",
  },
  intlTransfersBody: {
    ES: "Algunos proveedores pueden estar ubicados fuera del Espacio Económico Europeo. En esos casos, se aplicarán garantías adecuadas conforme a la normativa, como cláusulas contractuales tipo u otros mecanismos legalmente reconocidos.",
    EUS: "Hornitzaile batzuk Europako Esparru Ekonomikotik kanpo egon daitezke. Kasu horietan, araudiaren araberako berme egokiak aplikatuko dira, hala nola klausula kontraktual estandarrak edo legez onartutako beste mekanismo batzuk.",
    EN: "Some providers may be located outside the European Economic Area. In such cases, appropriate safeguards will be applied in accordance with the regulations, such as Standard Contractual Clauses or other legally recognized mechanisms.",
    FR: "Certains prestataires peuvent être situés en dehors de l’Espace économique européen. Dans ce cas, des garanties appropriées seront appliquées conformément à la réglementation, telles que les Clauses Contractuelles Types ou d’autres mécanismes légalement reconnus.",
  },

  // (se mantiene, pero ahora en el código se muestra como sección 14)
  section4Title: {
    ES: "14. Sobre esta Política de Privacidad",
    EUS: "14. Pribatutasun politika honi buruz",
    EN: "14. About this Privacy Policy",
    FR: "14. À propos de cette Politique",
  },
  section4Body: {
    ES: "Euskalia mantiene un compromiso firme con la protección de los datos personales de sus usuarios. Esta Política busca ser clara y sencilla, para que cada persona pueda decidir de forma informada qué información facilita y con qué finalidad se utilizará.",
    EUS: "Euskaliak konpromiso sendoa du bere erabiltzaileen datu pertsonalen babesarekin. Politika honek argia eta ulerterraza izan nahi du, pertsona bakoitzak modu informatuan erabaki ahal izan dezan zer informazio ematen duen eta zertarako erabiliko den.",
    EN: "Euskalia maintains a firm commitment to protecting users’ personal data. This Policy aims to be clear and simple so that each person can make an informed decision about what information they provide and for what purpose it will be used.",
    FR: "Euskalia s’engage fermement à protéger les données personnelles de ses utilisateurs. Cette Politique se veut claire et simple afin que chacun puisse décider en connaissance de cause quelles informations il fournit et à quelles fins elles seront utilisées.",
  },

  // (se mantiene, pero ahora en el código se muestra como sección 9)
  section5Title: {
    ES: "9. Confidencialidad y seguridad",
    EUS: "9. Konfidentzialtasuna eta segurtasuna",
    EN: "9. Confidentiality and security",
    FR: "9. Confidentialité et sécurité",
  },
  section5Body: {
    ES: "Los datos personales se tratarán de forma confidencial y se aplicarán medidas técnicas y organizativas razonables para evitar accesos no autorizados, pérdidas o alteraciones. No obstante, ningún sistema es completamente infalible y no se puede garantizar una seguridad absoluta frente a incidentes externos.",
    EUS: "Datu pertsonalak modu konfidentzialean tratatuko dira, eta neurri tekniko eta antolaketa-neurri egokiak aplikatuko dira sartze ez-baimenduak, galerak edo aldaketak saihesteko. Hala ere, ez dago erabat hutsik egiten ez duen sistemarik, eta ezin da kanpoko gertaeren aurkako segurtasun absolutua bermatu.",
    EN: "Personal data will be treated confidentially and reasonable technical and organizational measures will be applied to prevent unauthorized access, loss or alteration. However, no system is completely infallible and absolute security against external incidents cannot be guaranteed.",
    FR: "Les données personnelles seront traitées de manière confidentielle et des mesures techniques et organisationnelles raisonnables seront appliquées afin d’éviter les accès non autorisés, les pertes ou les altérations. Toutefois, aucun système n’est totalement infaillible et une sécurité absolue contre les incidents externes ne peut être garantie.",
  },

  // (se mantiene, pero ahora en el código se muestra como sección 10)
  section6Title: {
    ES: "10. Derechos de las personas usuarias",
    EUS: "10. Erabiltzaileen eskubideak",
    EN: "10. Users’ rights",
    FR: "10. Droits des utilisateurs",
  },
  section6Body: {
    ES: "De acuerdo con la normativa aplicable, las personas usuarias pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos. Para ello, pueden dirigirse al correo de contacto indicado, señalando de forma clara el derecho que desean ejercer. En caso necesario, también podrán presentar una reclamación ante la autoridad de control competente.",
    EUS: "Aplikatu beharreko araudiaren arabera, erabiltzaileek honako eskubideak erabil ditzakete: datuetara sartzea, zuzentzea, ezabatzea, aurka egitea, tratamendua mugatzea eta datuen eramangarritasuna. Horretarako, adierazitako kontaktu-helbidera jo dezakete, erabili nahi duten eskubidea argi adieraziz. Beharrezkoa bada, kontrol-agintari eskudunaren aurrean erreklamazioa ere aurkez dezakete.",
    EN: "In accordance with applicable regulations, users may exercise their rights of access, rectification, erasure, objection, restriction of processing and data portability. To do so, they can contact the indicated email address and clearly state the right they wish to exercise. If necessary, they may also lodge a complaint with the competent supervisory authority.",
    FR: "Conformément à la réglementation applicable, les utilisateurs peuvent exercer leurs droits d’accès, de rectification, d’effacement, d’opposition, de limitation du traitement et de portabilité. Pour cela, ils peuvent écrire à l’email de contact indiqué en précisant clairement le droit qu’ils souhaitent exercer. En cas de besoin, ils peuvent également déposer une réclamation auprès de l’autorité de contrôle compétente.",
  },

  // (se mantiene, pero ahora en el código se muestra como sección 11)
  section7Title: {
    ES: "11. Envíos comerciales y comunicaciones",
    EUS: "11. Merkataritza-mezuak eta komunikazioak",
    EN: "11. Commercial messages and communications",
    FR: "11. Communications commerciales",
  },
  section7Body: {
    ES: "Euskalia no realiza prácticas de envío masivo de correos electrónicos no solicitados (spam). Cualquier comunicación informativa o promocional se enviará únicamente cuando exista una base legítima o se haya obtenido el consentimiento previo, e incluirá siempre un mecanismo claro para cancelar la suscripción.",
    EUS: "Euskaliak ez du nahi ez diren posta elektroniko masiborik bidaltzen (spam). Edozein komunikazio informatibo edo sustapen-mezu legitimazio egokiarekin edo aldez aurreko baimenarekin bakarrik bidaliko da, eta beti izango du harpidetza uzteko mekanismo argia.",
    EN: "Euskalia does not engage in mass sending of unsolicited emails (spam). Any informational or promotional communication will only be sent when there is a legitimate basis or prior consent has been obtained, and will always include a clear mechanism to unsubscribe.",
    FR: "Euskalia ne pratique pas l’envoi massif d’emails non sollicités (spam). Toute communication informative ou promotionnelle ne sera envoyée que s’il existe une base légitime ou un consentement préalable, et inclura toujours un moyen clair de se désinscrire.",
  },

  // (se mantiene, pero en el código ahora es sección 12 y con texto ajustado)
  section8Title: {
    ES: "12. Publicidad",
    EUS: "12. Publizitatea",
    EN: "12. Advertising",
    FR: "12. Publicité",
  },
  section8Body: {
    ES: "En la versión gratuita de Euskalia podrían mostrarse anuncios. El uso de cookies o tecnologías similares con fines publicitarios se gestionará conforme al sistema de consentimiento y a la Política de Cookies, cuando corresponda.",
    EUS: "Euskaliaren doako bertsioan iragarkiak erakutsi daitezke. Publizitate-helburuetarako cookieak edo antzeko teknologiak erabiltzea baimen-sistemaren eta Cookieen Politikaren arabera kudeatuko da, dagokionean.",
    EN: "Ads may be shown in the free version of Euskalia. The use of cookies or similar technologies for advertising purposes will be managed according to the consent system and the Cookies Policy, when applicable.",
    FR: "Des publicités peuvent être affichées dans la version gratuite d’Euskalia. L’utilisation de cookies ou de technologies similaires à des fins publicitaires sera gérée conformément au système de consentement et à la Politique de cookies, lorsque applicable.",
  },

  // (se mantiene, ahora es sección 13)
  section9Title: {
    ES: "13. Comentarios y opiniones de terceros",
    EUS: "13. Hirugarrenen iritziak eta iruzkinak",
    EN: "13. Third-party comments and opinions",
    FR: "13. Avis et commentaires de tiers",
  },
  section9Body: {
    ES: "Euskalia no se hace responsable de las opiniones, valoraciones o comentarios que terceras personas puedan publicar sobre el servicio en redes sociales, plataformas externas o sitios web ajenos al control del proyecto.",
    EUS: "Euskalia ez da erantzule izango hirugarren pertsonek sare sozialetan, kanpoko plataformetan edo proiektuaren kontrolpean ez dauden webguneetan zerbitzuari buruz argitaratu ditzaketen iritzi, balorazio edo iruzkinengatik.",
    EN: "Euskalia is not responsible for opinions, ratings or comments that third parties may publish about the service on social networks, external platforms or websites not under the project’s control.",
    FR: "Euskalia n’est pas responsable des opinions, évaluations ou commentaires que des tiers peuvent publier au sujet du service sur les réseaux sociaux, des plateformes externes ou des sites web hors du contrôle du projet.",
  },

  // (se mantiene, ahora es sección 15)
  section10Title: {
    ES: "15. Modificaciones de la Política",
    EUS: "15. Politikaren aldaketak",
    EN: "15. Changes to the Policy",
    FR: "15. Modifications de la Politique",
  },
  section10Body: {
    ES: "Euskalia se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos, criterios de las autoridades de control o mejoras técnicas del servicio. La versión vigente estará siempre disponible en el sitio web y, en caso de cambios relevantes, se informará a las personas usuarias y se recabará de nuevo el consentimiento cuando sea necesario.",
    EUS: "Euskaliak eskubidea du Pribatutasun politika hau aldatzeko, lege-aldaketetara, kontrol-agintarien irizpideetara edo zerbitzuaren hobekuntza teknikoetara egokitzeko. Indarrean dagoen bertsioa beti egongo da webgunean eskuragarri, eta aldaketa esanguratsuak eginez gero, erabiltzaileei jakinaraziko zaie eta, beharrezkoa bada, baimena berriro eskatuko da.",
    EN: "Euskalia reserves the right to modify this Privacy Policy to adapt it to legislative changes, supervisory authority criteria or technical improvements to the service. The current version will always be available on the website and, in case of relevant changes, users will be informed and consent will be collected again when necessary.",
    FR: "Euskalia se réserve le droit de modifier cette Politique de confidentialité afin de l’adapter aux changements législatifs, aux critères des autorités de contrôle ou aux améliorations techniques du service. La version en vigueur sera toujours disponible sur le site et, en cas de changements significatifs, les utilisateurs seront informés et le consentement sera à nouveau recueilli si nécessaire.",
  },

  footerNote: {
    ES: "Esta Política de Privacidad está actualizada a fecha 09-01-2026.",
    EUS: "Pribatutasun-politika hau honako data honetan eguneratua dago: 2026-01-09.",
    EN: "This Privacy Policy is updated as of 09-01-2026.",
    FR: "Cette Politique de confidentialité est à jour au 09-01-2026.",
  },
},



////////////////////////////////////////////////////////////////
////////////////// TÉRMINOS Y CONDICIONES //////////////////////
////////////////////////////////////////////////////////////////

  /* Título */
  terms_title: {
    ES: "Términos y Condiciones de Uso",
    EUS: "Erabilera Baldintzak",
    EN: "Terms and Conditions of Use",
    FR: "Conditions Générales d’Utilisation",
  },

  /* 1. Objeto y aceptación */
  terms_section1_title: {
    ES: "1. Objeto y aceptación",
    EUS: "1. Xedea eta onarpena",
    EN: "1. Purpose and acceptance",
    FR: "1. Objet et acceptation",
  },
  terms_section1_p1: {
    ES: "Los presentes Términos y Condiciones regulan el acceso, la navegación y el uso de la plataforma Euskalia. El uso del sitio web implica la aceptación plena de estas condiciones por parte de la persona usuaria. Si no estás de acuerdo con ellas, deberás abstenerte de utilizar la plataforma.",
    EUS: "Erabilera Baldintza hauek Euskalia plataformaren sarbidea, nabigazioa eta erabilera arautzen dituzte. Webgunea erabiltzeak baldintza hauek osorik onartzea dakar. Ados ez bazaude, plataformaren erabilerari uko egin beharko diozu.",
    EN: "These Terms and Conditions govern access to, browsing of and use of the Euskalia platform. Use of the website implies full acceptance of these terms by the user. If you do not agree, you must refrain from using the platform.",
    FR: "Les présentes Conditions Générales régissent l’accès, la navigation et l’utilisation de la plateforme Euskalia. L’utilisation du site implique l’acceptation pleine et entière de ces conditions. En cas de désaccord, vous devez vous abstenir d’utiliser la plateforme.",
  },

  /* 2. Identidad del responsable */
  terms_section2_title: {
    ES: "2. Identidad del responsable",
    EUS: "2. Arduradunaren identitatea",
    EN: "2. Identity of the controller",
    FR: "2. Identité du responsable",
  },
  terms_section2_p1: {
    ES: "El responsable de la plataforma es Euskalia (en adelante, el Prestador), accesible a través del dominio principal https://euskalia.ai. Los datos de contacto completos se encuentran disponibles en el Aviso Legal del sitio web.",
    EUS: "Plataformaren arduraduna Euskalia da (aurrerantzean, Zerbitzu-emailea), https://euskalia.ai domeinu nagusiaren bidez eskuragarri. Harremanetarako datu osoak webguneko Lege Oharrean daude.",
    EN: "The platform is operated by Euskalia (hereinafter, the Provider), accessible via the main domain https://euskalia.ai. Full contact details are available in the Legal Notice on the website.",
    FR: "La plateforme est exploitée par Euskalia (ci-après, le Prestataire), accessible via le domaine principal https://euskalia.ai. Les coordonnées complètes figurent dans les Mentions légales du site.",
  },

  /* 3. Servicios ofrecidos */
  terms_section3_title: {
    ES: "3. Servicios ofrecidos",
    EUS: "3. Eskainitako zerbitzuak",
    EN: "3. Services provided",
    FR: "3. Services proposés",
  },
  terms_section3_p1: {
    ES: "Euskalia ofrece una plataforma digital que permite introducir textos, fragmentos de documentos o contenidos obtenidos a partir de enlaces para utilizar herramientas lingüísticas basadas en inteligencia artificial.",
    EUS: "Euskaliak plataforma digital bat eskaintzen du, testuak, dokumentu-zatiak edo esteketatik lortutako edukiak sartzeko aukera ematen duena, adimen artifizialean oinarritutako hizkuntza-tresnak erabiltzeko.",
    EN: "Euskalia offers a digital platform that allows users to enter texts, document excerpts or content obtained from links in order to use language tools based on artificial intelligence.",
    FR: "Euskalia propose une plateforme numérique permettant d’introduire des textes, des extraits de documents ou des contenus issus de liens afin d’utiliser des outils linguistiques basés sur l’intelligence artificielle.",
  },
  terms_section3_p2: {
    ES: "Euskalia podrá ofrecer acceso gratuito y uno o varios planes de pago con funcionalidades ampliadas, cuyas características se indicarán en la web en el momento de la contratación.",
    EUS: "Euskaliak doako sarbidea eta ordainpeko plan bat edo gehiago eskaini ahal izango ditu, funtzionalitate zabalduarekin; horien ezaugarriak kontratazio-unean azalduko dira webgunean.",
    EN: "Euskalia may offer free access as well as one or more paid plans with extended features, whose characteristics will be shown on the website at the time of subscription.",
    FR: "Euskalia peut proposer un accès gratuit ainsi qu’un ou plusieurs plans payants avec des fonctionnalités étendues, dont les caractéristiques seront indiquées sur le site lors de la souscription.",
  },

  /* 4. Registro de usuarios */
  terms_section4_title: {
    ES: "4. Registro de usuarios",
    EUS: "4. Erabiltzaileen erregistroa",
    EN: "4. User registration",
    FR: "4. Inscription des utilisateurs",
  },
  terms_section4_p1: {
    ES: "Para contratar planes de pago, la persona usuaria deberá registrarse proporcionando información veraz y actualizada. La cuenta es personal e intransferible, y la persona usuaria es responsable de las actividades realizadas desde ella.",
    EUS: "Ordainpeko planak kontratatzeko, erabiltzaileak informazio egiazkoa eta eguneratua eman beharko du. Kontua pertsonala eta besterenezina da, eta bertatik egindako jardueren erantzukizuna erabiltzailearena da.",
    EN: "To subscribe to paid plans, users must register by providing accurate and up-to-date information. The account is personal and non-transferable, and users are responsible for activities carried out through it.",
    FR: "Pour souscrire à des plans payants, l’utilisateur doit s’inscrire en fournissant des informations exactes et à jour. Le compte est personnel et non transférable, et l’utilisateur est responsable des activités effectuées depuis celui-ci.",
  },

  /* 5. Condiciones económicas */
  terms_section5_title: {
    ES: "5. Condiciones económicas y facturación",
    EUS: "5. Baldintza ekonomikoak eta fakturazioa",
    EN: "5. Pricing and billing",
    FR: "5. Conditions financières et facturation",
  },
  terms_section5_p1: {
    ES: "El precio de cada plan se mostrará antes de la contratación. Las suscripciones se renuevan automáticamente salvo cancelación previa por parte de la persona usuaria. En caso de impago, Euskalia podrá suspender el acceso al servicio.",
    EUS: "Plan bakoitzaren prezioa kontratazioaren aurretik erakutsiko da. Harpidetzak automatikoki berritzen dira, erabiltzaileak aurrez ezeztatzen ez baditu. Ez-ordaintze kasuan, Euskaliak zerbitzurako sarbidea eten dezake.",
    EN: "The price of each plan will be shown before subscription. Subscriptions renew automatically unless cancelled by the user. In case of non-payment, Euskalia may suspend access to the service.",
    FR: "Le prix de chaque plan sera affiché avant la souscription. Les abonnements sont renouvelés automatiquement sauf résiliation préalable par l’utilisateur. En cas de non-paiement, Euskalia peut suspendre l’accès au service.",
  },

  /* 6. Uso permitido */
  terms_section6_title: {
    ES: "6. Uso permitido y prohibido",
    EUS: "6. Erabilera baimendua eta debekatua",
    EN: "6. Permitted and prohibited use",
    FR: "6. Utilisation autorisée et interdite",
  },
  terms_section6_p1: {
    ES: "La persona usuaria se compromete a utilizar Euskalia conforme a la ley, la buena fe y el orden público. En particular, queda prohibido:",
    EUS: "Erabiltzaileak Euskalia legearekin, fede onarekin eta ordena publikoarekin bat etorriz erabiltzeko konpromisoa hartzen du. Bereziki, debekatuta dago:",
    EN: "Users agree to use Euskalia in accordance with the law, good faith and public order. In particular, the following is prohibited:",
    FR: "L’utilisateur s’engage à utiliser Euskalia conformément à la loi, à la bonne foi et à l’ordre public. En particulier, il est interdit de :",
  },
  terms_section6_li1: {
    ES: "Crear o difundir contenidos ilícitos, ofensivos, violentos o que vulneren derechos de terceros.",
    EUS: "Eduki ilegalak, iraingarriak, bortitzak edo hirugarrenen eskubideak urratzen dituztenak sortzea edo zabaltzea.",
    EN: "Create or distribute unlawful, offensive or harmful content that infringes third-party rights.",
    FR: "Créer ou diffuser des contenus illicites, offensants, violents ou portant atteinte aux droits de tiers.",
  },
  terms_section6_li2: {
    ES: "Utilizar la plataforma con fines de spam, fraude o manipulación de datos.",
    EUS: "Plataforma spam-erako, iruzurrerako edo datuen manipulaziorako erabiltzea.",
    EN: "Use the platform for spam, fraud or data manipulation purposes.",
    FR: "Utiliser la plateforme à des fins de spam, de fraude ou de manipulation de données.",
  },
  terms_section6_li3: {
    ES: "Intentar dañar, alterar o sobrecargar los sistemas o medidas de seguridad de Euskalia.",
    EUS: "Euskaliaren sistemak edo segurtasun-neurriak kaltetzen, aldatzen edo gainkargatzen saiatzea.",
    EN: "Attempt to damage, alter or overload Euskalia’s systems or security measures.",
    FR: "Tenter d’endommager, de modifier ou de surcharger les systèmes ou mesures de sécurité d’Euskalia.",
  },
  terms_section6_p2: {
    ES: "El incumplimiento de estas normas podrá dar lugar a la suspensión o cancelación inmediata de la cuenta, sin derecho a reembolso.",
    EUS: "Arau hauek ez betetzeak kontua berehala etetea edo baliogabetzea ekar dezake, itzulketarako eskubiderik gabe.",
    EN: "Failure to comply with these rules may result in immediate suspension or termination of the account without refund.",
    FR: "Le non-respect de ces règles peut entraîner la suspension ou la résiliation immédiate du compte, sans droit à remboursement.",
  },

  /* 7. Propiedad intelectual */
  terms_section7_title: {
    ES: "7. Propiedad intelectual",
    EUS: "7. Jabetza intelektuala",
    EN: "7. Intellectual property",
    FR: "7. Propriété intellectuelle",
  },
  terms_section7_p1: {
    ES: "Todos los elementos de Euskalia son propiedad del Prestador o cuentan con las licencias correspondientes. El uso de la plataforma no otorga ningún derecho de propiedad intelectual a la persona usuaria.",
    EUS: "Euskaliako elementu guztiak Zerbitzu-emailearen jabetzakoak dira edo dagokien lizentzia dute. Plataformaren erabilerak ez dio erabiltzaileari jabetza intelektualeko eskubiderik ematen.",
    EN: "All elements of Euskalia are owned by the Provider or licensed accordingly. Use of the platform does not grant users any intellectual property rights.",
    FR: "Tous les éléments d’Euskalia sont la propriété du Prestataire ou font l’objet de licences appropriées. L’utilisation de la plateforme ne confère aucun droit de propriété intellectuelle à l’utilisateur.",
  },

  /* 8. Responsabilidad */
  terms_section8_title: {
    ES: "8. Responsabilidad",
    EUS: "8. Erantzukizuna",
    EN: "8. Liability",
    FR: "8. Responsabilité",
  },
  terms_section8_p1: {
    ES: "Euskalia no garantiza la disponibilidad continua del servicio, aunque adoptará medidas razonables para mantener su funcionamiento.",
    EUS: "Euskaliak ez du zerbitzuaren etengabeko erabilgarritasuna bermatzen, baina funtzionamendua mantentzeko neurri arrazoizkoak hartuko ditu.",
    EN: "Euskalia does not guarantee uninterrupted availability of the service, although reasonable measures will be taken to maintain its operation.",
    FR: "Euskalia ne garantit pas une disponibilité continue du service, bien qu’elle prenne des mesures raisonnables pour en assurer le fonctionnement.",
  },
  terms_section8_p2: {
    ES: "Los resultados generados por inteligencia artificial tienen carácter orientativo y la persona usuaria es responsable de su uso final.",
    EUS: "Adimen artifizialak sortutako emaitzek orientazio-izaera dute, eta azken erabileraren erantzukizuna erabiltzailearena da.",
    EN: "Results generated by artificial intelligence are indicative only, and the user is responsible for their final use.",
    FR: "Les résultats générés par l’intelligence artificielle ont un caractère indicatif et l’utilisateur est responsable de leur utilisation finale.",
  },

  /* 9. Cancelación */
  terms_section9_title: {
    ES: "9. Cancelación y desistimiento",
    EUS: "9. Ezeztapena eta atzera egiteko eskubidea",
    EN: "9. Cancellation and withdrawal",
    FR: "9. Résiliation et droit de rétractation",
  },
  terms_section9_p1: {
    ES: "La persona usuaria podrá cancelar su suscripción en cualquier momento. La cancelación evitará futuras renovaciones, manteniéndose el acceso hasta el final del periodo ya abonado, conforme a la normativa vigente.",
    EUS: "Erabiltzaileak edozein unetan ezeztatu ahal izango du harpidetza. Ezeztapenak etorkizuneko berritzeak saihestuko ditu, ordaindutako epea amaitu arte sarbidea mantenduz, indarreko araudiaren arabera.",
    EN: "Users may cancel their subscription at any time. Cancellation prevents future renewals, while access remains available until the end of the paid period, in accordance with applicable law.",
    FR: "L’utilisateur peut résilier son abonnement à tout moment. La résiliation empêche les renouvellements futurs, l’accès restant disponible jusqu’à la fin de la période payée, conformément à la législation applicable.",
  },

  /* 10. Modificaciones */
  terms_section10_title: {
    ES: "10. Modificaciones",
    EUS: "10. Aldaketak",
    EN: "10. Modifications",
    FR: "10. Modifications",
  },
  terms_section10_p1: {
    ES: "Euskalia se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán publicadas en el sitio web.",
    EUS: "Euskaliak Erabilera Baldintza hauek edozein unetan aldatzeko eskubidea gordetzen du. Aldaketak webgunean argitaratuko dira.",
    EN: "Euskalia reserves the right to modify these Terms and Conditions at any time. Any changes will be published on the website.",
    FR: "Euskalia se réserve le droit de modifier ces Conditions Générales à tout moment. Les modifications seront publiées sur le site.",
  },

  /* 11. Legislación */
  terms_section11_title: {
    ES: "11. Legislación aplicable y jurisdicción",
    EUS: "11. Aplikatu beharreko legeria eta jurisdikzioa",
    EN: "11. Applicable law and jurisdiction",
    FR: "11. Droit applicable et juridiction",
  },
  terms_section11_p1: {
    ES: "Los presentes Términos y Condiciones se rigen por la legislación española. En caso de conflicto, las partes se someterán a los Juzgados y Tribunales que correspondan conforme a la normativa aplicable.",
    EUS: "Erabilera Baldintza hauek Espainiako legeria aplikagarriaren mende daude. Gatazka kasuan, alderdiek dagokien epaitegi eta auzitegien menpe jarriko dira.",
    EN: "These Terms and Conditions are governed by Spanish law. In the event of a dispute, the parties shall submit to the competent courts in accordance with applicable regulations.",
    FR: "Les présentes Conditions Générales sont régies par le droit espagnol. En cas de litige, les parties se soumettront aux juridictions compétentes conformément à la réglementation applicable.",
  },

  /* Fecha */
  terms_footer_note: {
    ES: "Estos Términos y Condiciones están actualizados a fecha 09-01-2026.",
    EUS: "Erabilera Baldintza hauek 2026-01-09an eguneratuak daude.",
    EN: "These Terms and Conditions are updated as of 09-01-2026.",
    FR: "Ces Conditions Générales sont à jour au 09-01-2026.",
  },



////////////////////////////////////////////////////////////////
//////////////////   USO DE APIS DE IA   ///////////////////////
////////////////////////////////////////////////////////////////

aiApiUsage: {
  title: {
    ES: "Uso de APIs de Inteligencia Artificial",
    EUS: "Adimen Artifizialeko APIen Erabilera",
    EN: "Use of Artificial Intelligence APIs",
    FR: "Utilisation des APIs d’intelligence artificielle",
  },

  intro: {
    ES: "En esta página explicamos cómo utiliza Euskalia las APIs de inteligencia artificial para ofrecer herramientas lingüísticas basadas en IA, qué datos se envían a estos proveedores y qué recomendaciones debes seguir para usar el servicio de forma segura.",
    EUS: "Orrialde honetan azaltzen dugu Euskaliak nola erabiltzen dituen adimen artifizialeko APIak IA bidezko hizkuntza-tresnak eskaintzeko, zein datu bidaltzen zaizkien hornitzaileei eta zer gomendio jarraitu behar dituzun zerbitzua modu seguruan erabiltzeko.",
    EN: "This page explains how Euskalia uses AI APIs to provide language tools powered by artificial intelligence, what data is sent to providers, and what recommendations you should follow to use the service safely.",
    FR: "Cette page explique comment Euskalia utilise des APIs d’IA pour proposer des outils linguistiques basés sur l’intelligence artificielle, quelles données sont envoyées aux fournisseurs et quelles recommandations suivre pour utiliser le service en toute sécurité.",
  },

  section1Title: {
    ES: "1. Qué APIs de IA utiliza Euskalia",
    EUS: "1. Euskaliak erabiltzen dituen IA APIak",
    EN: "1. Which AI APIs Euskalia uses",
    FR: "1. Quelles APIs d’IA utilise Euskalia",
  },
  section1Body: {
    ES: "Para ofrecer sus funcionalidades (por ejemplo, traducción, resumen, corrección, reformulación y otras herramientas lingüísticas), Euskalia se conecta a servicios de inteligencia artificial ofrecidos por proveedores externos especializados. Estos proveedores procesan el contenido enviado y devuelven una respuesta generada automáticamente, que es la que se muestra en pantalla.",
    EUS: "Bere funtzionalitateak eskaintzeko (adibidez, itzulpena, laburpena, zuzenketa, birformulazioa eta beste hizkuntza-tresna batzuk), Euskalia kanpoko hornitzaile espezializatuek eskaintzen dituzten adimen artifizialeko zerbitzuekin konektatzen da. Hornitzaileek bidalitako edukia prozesatzen dute eta automatikoki sortutako erantzun bat itzultzen dute, pantailan agertzen dena.",
    EN: "To provide its features (for example, translation, summarization, correction, rephrasing and other language tools), Euskalia connects to AI services offered by specialized external providers. These providers process the submitted content and return an automatically generated response that is displayed on screen.",
    FR: "Pour proposer ses fonctionnalités (par exemple traduction, résumé, correction, reformulation et autres outils linguistiques), Euskalia se connecte à des services d’IA fournis par des prestataires externes spécialisés. Ces prestataires traitent le contenu envoyé et renvoient une réponse générée automatiquement, affichée à l’écran.",
  },
  section1Body2: {
    ES: "Los modelos y proveedores de IA pueden cambiar con el tiempo (por ejemplo, nuevas versiones o proveedores). Cuando esto ocurra, Euskalia mantendrá esta página actualizada para que conozcas qué tecnología hay detrás del servicio.",
    EUS: "IA ereduak eta hornitzaileak denborarekin alda daitezke (adibidez, bertsio edo hornitzaile berriak). Hori gertatzen denean, Euskaliak orrialde hau eguneratuta mantenduko du zer teknologiak ematen duen zerbitzua jakin dezazun.",
    EN: "AI models and providers may change over time (for example, new versions or providers). When that happens, Euskalia will keep this page updated so you know what technology is behind the service.",
    FR: "Les modèles et prestataires d’IA peuvent évoluer avec le temps (par exemple nouvelles versions ou fournisseurs). Le cas échéant, Euskalia maintiendra cette page à jour afin que vous sachiez quelle technologie est utilisée.",
  },

  section2Title: {
    ES: "2. Qué datos se envían a las APIs",
    EUS: "2. Zein datu bidaltzen dira APIetara",
    EN: "2. What data is sent to the APIs",
    FR: "2. Quelles données sont envoyées aux APIs",
  },
  section2Body: {
    ES: "Cuando utilizas cualquiera de las herramientas de Euskalia, el contenido que escribes o pegas (texto, fragmentos de documentos o contenidos obtenidos a partir de URLs) puede enviarse a los servidores del proveedor de IA para generar el resultado.",
    EUS: "Euskaliako edozein tresna erabiltzen duzunean, idazten edo itsasten duzun edukia (testua, dokumentu-zatiak edo URLetatik ateratako edukia) IA hornitzailearen zerbitzarietara bidali daiteke emaitza sortzeko.",
    EN: "When you use any Euskalia tool, the content you type or paste (text, document excerpts or content obtained from URLs) may be sent to the AI provider’s servers to generate the result.",
    FR: "Lorsque vous utilisez l’un des outils d’Euskalia, le contenu que vous saisissez ou collez (texte, extraits de documents ou contenu obtenu via des URLs) peut être envoyé aux serveurs du fournisseur d’IA afin de générer le résultat.",
  },
  section2Li1: {
    ES: "Texto introducido por la persona usuaria.",
    EUS: "Erabiltzaileak sartutako testua.",
    EN: "User-provided text.",
    FR: "Texte fourni par l’utilisateur.",
  },
  section2Li2: {
    ES: "Parámetros lingüísticos seleccionados (por ejemplo, idioma de origen y destino o el tipo de herramienta utilizada).",
    EUS: "Hautatutako hizkuntza-parametroak (adibidez, jatorrizko eta helmugako hizkuntza edo erabilitako tresna mota).",
    EN: "Selected language parameters (for example, source/target language or the type of tool used).",
    FR: "Paramètres linguistiques sélectionnés (par exemple langue source/cible ou type d’outil utilisé).",
  },
  section2Li3: {
    ES: "Instrucciones técnicas necesarias para que el modelo genere la respuesta.",
    EUS: "Ereduak erantzuna sortzeko behar dituen jarraibide teknikoak.",
    EN: "Technical instructions needed for the model to generate a response.",
    FR: "Instructions techniques nécessaires pour que le modèle génère la réponse.",
  },
  section2Body2: {
    ES: "Euskalia no necesita conocer tu identidad real para funcionar. Siempre que sea posible, evita incluir nombres completos, direcciones, datos de salud u otra información personal o sensible en los textos que envíes.",
    EUS: "Euskaliak ez du zure benetako identitatea ezagutu behar funtzionatzeko. Ahal den guztietan, saihestu izen-abizenak, helbideak, osasun-datuak edo bestelako informazio pertsonal edo sentikorra bidaltzea.",
    EN: "Euskalia does not need to know your real identity to work. Whenever possible, avoid including full names, addresses, health data or any other personal or sensitive information in the texts you submit.",
    FR: "Euskalia n’a pas besoin de connaître votre identité réelle pour fonctionner. Lorsque c’est possible, évitez d’inclure des noms complets, des adresses, des données de santé ou toute autre information personnelle ou sensible dans les textes envoyés.",
  },

  section3Title: {
    ES: "3. Tratamiento, conservación y seguridad de los datos",
    EUS: "3. Datuen tratamendua, kontserbazioa eta segurtasuna",
    EN: "3. Processing, retention and security",
    FR: "3. Traitement, conservation et sécurité",
  },
  section3Body: {
    ES: "Los contenidos enviados a las APIs se utilizan exclusivamente para generar la respuesta solicitada. Euskalia no vende tus textos ni los comparte con terceros con fines comerciales.",
    EUS: "APIetara bidalitako edukiak eskatutako erantzuna sortzeko baino ez dira erabiltzen. Euskaliak ez ditu zure testuak saltzen eta ez ditu hirugarrenekin partekatzen helburu komertzialekin.",
    EN: "Content sent to the APIs is used solely to generate the requested response. Euskalia does not sell your texts or share them with third parties for commercial purposes.",
    FR: "Les contenus envoyés aux APIs sont utilisés uniquement pour générer la réponse demandée. Euskalia ne vend pas vos textes et ne les partage pas avec des tiers à des fins commerciales.",
  },
  section3Body2: {
    ES: "Los proveedores de IA pueden conservar durante un tiempo limitado ciertos registros técnicos para garantizar la seguridad, prevenir abusos y mejorar la estabilidad del servicio. Cada proveedor define sus plazos de conservación y medidas de seguridad en sus políticas oficiales.",
    EUS: "IA hornitzaileek denbora mugatu batez erregistro tekniko batzuk gorde ditzakete segurtasuna bermatzeko, abusua prebenitzeko eta zerbitzuaren egonkortasuna hobetzeko. Hornitzaile bakoitzak bere kontserbazio-epeak eta segurtasun-neurriak zehazten ditu politika ofizialetan.",
    EN: "AI providers may retain certain technical logs for a limited time to ensure security, prevent abuse and improve service stability. Each provider defines its retention periods and security measures in its official policies.",
    FR: "Les fournisseurs d’IA peuvent conserver pendant une durée limitée certains journaux techniques afin d’assurer la sécurité, prévenir les abus et améliorer la stabilité du service. Chaque fournisseur définit ses durées de conservation et ses mesures de sécurité dans ses politiques officielles.",
  },
  section3Body3: {
    ES: "Euskalia aplica medidas razonables para proteger las comunicaciones con estos proveedores (por ejemplo, usando conexiones cifradas HTTPS) y minimizar la cantidad de datos personales que se envían.",
    EUS: "Euskaliak neurri arrazoizkoak aplikatzen ditu hornitzaile hauekin komunikazioak babesteko (adibidez, HTTPS konexio zifratuak erabiliz) eta bidaltzen diren datu pertsonalen kopurua minimizatzeko.",
    EN: "Euskalia applies reasonable measures to protect communications with these providers (for example, using encrypted HTTPS connections) and to minimize the amount of personal data sent.",
    FR: "Euskalia applique des mesures raisonnables pour protéger les communications avec ces fournisseurs (par exemple via des connexions HTTPS chiffrées) et minimiser la quantité de données personnelles envoyées.",
  },

  section4Title: {
    ES: "4. Recomendaciones de uso responsable",
    EUS: "4. Erabilera arduratsurako gomendioak",
    EN: "4. Responsible use recommendations",
    FR: "4. Recommandations d’utilisation responsable",
  },
  section4Body: {
    ES: "Para usar Euskalia de forma segura y respetuosa con la privacidad, te recomendamos seguir estas pautas:",
    EUS: "Euskalia modu seguruan eta pribatutasuna errespetatuz erabiltzeko, gomendio hauek jarraitzea gomendatzen dugu:",
    EN: "To use Euskalia safely and with respect for privacy, we recommend following these guidelines:",
    FR: "Pour utiliser Euskalia en toute sécurité et dans le respect de la vie privée, nous recommandons de suivre ces conseils :",
  },
  section4Li1: {
    ES: "Evita enviar datos personales identificables (nombres completos, direcciones, teléfonos, etc.) salvo que sea estrictamente necesario.",
    EUS: "Saihestu datu pertsonal identifikagarriak bidaltzea (izen-abizenak, helbideak, telefonoak, etab.), behar-beharrezkoa ez bada.",
    EN: "Avoid sending identifiable personal data (full names, addresses, phone numbers, etc.) unless strictly necessary.",
    FR: "Évitez d’envoyer des données personnelles identifiables (noms complets, adresses, numéros de téléphone, etc.) sauf si cela est strictement nécessaire.",
  },
  section4Li2: {
    ES: "No incluyas información especialmente sensible (salud, ideología, datos financieros, menores de edad, etc.).",
    EUS: "Ez sartu informazio bereziki sentikorra (osasuna, ideologia, finantza-datuak, adingabeak, etab.).",
    EN: "Do not include particularly sensitive information (health, ideology, financial data, minors, etc.).",
    FR: "N’incluez pas d’informations particulièrement sensibles (santé, idéologie, données financières, mineurs, etc.).",
  },
  section4Li3: {
    ES: "Revisa siempre el resultado generado por la IA antes de utilizarlo en contextos importantes (trabajo, estudios, comunicaciones oficiales…).",
    EUS: "Beti berrikusi IA-k sortutako emaitza, testuinguru garrantzitsuetan erabili aurretik (lana, ikasketak, komunikazio ofizialak…).",
    EN: "Always review the AI-generated result before using it in important contexts (work, studies, official communications…).",
    FR: "Vérifiez toujours le résultat généré par l’IA avant de l’utiliser dans des contextes importants (travail, études, communications officielles…).",
  },
  section4Li4: {
    ES: "Utiliza la herramienta respetando la legislación vigente y los derechos de terceros (propiedad intelectual, confidencialidad, etc.).",
    EUS: "Erabili tresna indarreko legeria eta hirugarrenen eskubideak errespetatuz (jabetza intelektuala, konfidentzialtasuna, etab.).",
    EN: "Use the tool in compliance with applicable law and third-party rights (intellectual property, confidentiality, etc.).",
    FR: "Utilisez l’outil dans le respect de la législation en vigueur et des droits des tiers (propriété intellectuelle, confidentialité, etc.).",
  },

  section5Title: {
    ES: "5. Ausencia de decisiones automatizadas",
    EUS: "5. Erabaki automatizaturik ez",
    EN: "5. No automated decision-making",
    FR: "5. Absence de décisions automatisées",
  },
  section5Body: {
    ES: "Las herramientas de inteligencia artificial de Euskalia no realizan decisiones automatizadas con efectos legales ni elaboran perfiles de las personas usuarias. Los resultados tienen carácter asistencial y la persona usuaria mantiene el control sobre su uso.",
    EUS: "Euskaliako adimen artifizialeko tresnek ez dute eragin juridikodun erabaki automatizaturik hartzen eta ez dute erabiltzaileen profilaketarik egiten. Emaitzek laguntza-izaera dute, eta erabiltzaileak bere erabileraren kontrola mantentzen du.",
    EN: "Euskalia’s AI tools do not make automated decisions with legal effects and do not create user profiles. The outputs are assistive, and the user remains in control of how they are used.",
    FR: "Les outils d’IA d’Euskalia ne prennent pas de décisions automatisées ayant des effets juridiques et n’effectuent pas de profilage des utilisateurs. Les résultats sont à titre d’assistance et l’utilisateur garde le contrôle de leur utilisation.",
  },

  section6Title: {
    ES: "6. Relación con la Política de Privacidad y otros documentos",
    EUS: "6. Pribatutasun Politikarekin eta beste dokumentuekin lotura",
    EN: "6. Relationship with other policies",
    FR: "6. Lien avec les autres politiques",
  },
  section6Body: {
    ES: "Esta información sobre el uso de APIs de IA se complementa con la Política de Privacidad, la Política de Cookies, el Aviso Legal y los Términos y Condiciones de Euskalia. En caso de duda, debe interpretarse junto con el resto de documentos legales disponibles en el sitio web.",
    EUS: "IA APIen erabilerari buruzko informazio hau Pribatutasun Politikarekin, Cookieen Politikarekin, Aviso Legalarekin eta Euskaliaren Termino eta Baldintzekin osatzen da. Zalantzarik izanez gero, webgunean dauden gainerako dokumentu legalekin batera interpretatu behar da.",
    EN: "This information about AI API usage complements the Privacy Policy, Cookies Policy, Legal Notice and Terms & Conditions of Euskalia. If in doubt, it should be interpreted together with the other legal documents available on the website.",
    FR: "Ces informations sur l’utilisation des APIs d’IA complètent la Politique de confidentialité, la Politique de cookies, les Mentions légales et les Conditions d’utilisation d’Euskalia. En cas de doute, elles doivent être interprétées conjointement avec les autres documents légaux disponibles sur le site.",
  },
  section6Body2: {
    ES: "Además, cada proveedor de inteligencia artificial cuenta con sus propias políticas de privacidad y términos de servicio, que recomendamos consultar para conocer en detalle cómo tratan la información que procesan.",
    EUS: "Gainera, adimen artifizialeko hornitzaile bakoitzak bere pribatutasun-politikak eta zerbitzu-baldintzak ditu; gomendatzen dugu kontsultatzea, prozesatzen duten informazioa nola tratatzen duten xehetasunez ezagutzeko.",
    EN: "In addition, each AI provider has its own privacy policies and terms of service, which we recommend reviewing to understand how they process information in detail.",
    FR: "De plus, chaque fournisseur d’IA dispose de ses propres politiques de confidentialité et conditions de service, que nous recommandons de consulter pour connaître en détail la manière dont ils traitent les informations.",
  },

  lastUpdate: {
    ES: "Esta información sobre el uso de APIs de IA está actualizada a fecha 09-01-2026.",
    EUS: "IA APIen erabilerari buruzko informazio hau 2026-01-09an eguneratua dago.",
    EN: "This information about the use of AI APIs is updated as of 09-01-2026.",
    FR: "Ces informations sur l’utilisation des APIs d’IA sont à jour 09-01-2026.",
  },
},


////////////////////////////////////////////////////////////////
////////////////// POLÍTICA DE cookies /////////////////////////
////////////////////////////////////////////////////////////////

  cookies_title: {
    ES: "Política de Cookies",
    EUS: "Cookieen Politika",
    EN: "Cookies Policy",
    FR: "Politique de cookies",
  },

  /* 1. ¿Qué son las cookies? */
  cookies_section1_title: {
    ES: "1. ¿Qué son las cookies?",
    EUS: "1. Zer dira cookieak?",
    EN: "1. What are cookies?",
    FR: "1. Que sont les cookies ?",
  },
  cookies_section1_p1: {
    ES: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tableta o teléfono móvil) cuando visitas un sitio web. Permiten recordar información sobre tu navegación, como preferencias o configuraciones básicas, con el fin de mejorar la experiencia de uso.",
    EUS: "Cookieak testu-fitxategi txikiak dira, webgune bat bisitatzen duzunean zure gailuan (ordenagailua, tableta edo telefono mugikorra) gordetzen direnak. Nabigazioari buruzko informazioa gogoratzeko balio dute, hala nola lehentasunak edo oinarrizko ezarpenak, erabiltzailearen esperientzia hobetzeko.",
    EN: "Cookies are small text files stored on your device (computer, tablet or mobile phone) when you visit a website. They allow information about your browsing, such as preferences or basic settings, to be remembered in order to improve the user experience.",
    FR: "Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette ou téléphone mobile) lorsque vous visitez un site web. Elles permettent de mémoriser des informations sur votre navigation, telles que des préférences ou des paramètres de base, afin d’améliorer l’expérience utilisateur.",
  },

  /* 2. Qué cookies utiliza Euskalia */
  cookies_section2_title: {
    ES: "2. Qué cookies utiliza Euskalia",
    EUS: "2. Euskaliak erabiltzen dituen cookieak",
    EN: "2. Cookies used by Euskalia",
    FR: "2. Cookies utilisées par Euskalia",
  },
  cookies_section2_p1: {
    ES: "Euskalia utiliza cookies técnicas necesarias para el correcto funcionamiento del sitio web y para permitir el uso de sus funcionalidades básicas. Estas cookies son esenciales y no requieren consentimiento.",
    EUS: "Euskaliak cookie teknikoak erabiltzen ditu webgunearen funtzionamendu egokia bermatzeko eta oinarrizko funtzionalitateak erabili ahal izateko. Cookie hauek beharrezkoak dira eta ez dute baimenik behar.",
    EN: "Euskalia uses technical cookies that are necessary for the proper functioning of the website and to enable its basic features. These cookies are essential and do not require consent.",
    FR: "Euskalia utilise des cookies techniques nécessaires au bon fonctionnement du site web et à l’utilisation de ses fonctionnalités de base. Ces cookies sont essentielles et ne nécessitent pas de consentement.",
  },
  cookies_section2_p2: {
    ES: "Asimismo, Euskalia puede utilizar cookies de análisis o medición (por ejemplo, Google Analytics) únicamente si la persona usuaria lo acepta, con el fin de obtener estadísticas de uso y mejorar el servicio.",
    EUS: "Era berean, Euskaliak analisi- edo neurketa-cookieak erabil ditzake (adibidez, Google Analytics), erabiltzaileak baimena ematen badu soilik, erabilera-estatistikak lortzeko eta zerbitzua hobetzeko.",
    EN: "Additionally, Euskalia may use analytics or measurement cookies (for example, Google Analytics) only if the user accepts them, in order to obtain usage statistics and improve the service.",
    FR: "De plus, Euskalia peut utiliser des cookies d’analyse ou de mesure (par exemple Google Analytics) uniquement si l’utilisateur y consent, afin d’obtenir des statistiques d’utilisation et d’améliorer le service.",
  },
  cookies_section2_p3: {
    ES: "En la versión gratuita de Euskalia pueden mostrarse anuncios gestionados por terceros, como Google. Estos terceros pueden utilizar cookies o tecnologías similares con fines publicitarios, siempre conforme a la base legal aplicable y, cuando corresponda, al consentimiento del usuario.",
    EUS: "Euskaliaren doako bertsioan hirugarrenek kudeatutako iragarkiak ager daitezke, hala nola Googlek kudeatutakoak. Hirugarren horiek publizitate-helburuetarako cookieak edo antzeko teknologiak erabil ditzakete, aplikagarria den lege-oinarriaren eta, dagokionean, erabiltzailearen baimenaren arabera.",
    EN: "In the free version of Euskalia, ads managed by third parties such as Google may be displayed. These third parties may use cookies or similar technologies for advertising purposes, always in accordance with the applicable legal basis and, when required, the user’s consent.",
    FR: "Dans la version gratuite d’Euskalia, des publicités gérées par des tiers tels que Google peuvent être affichées. Ces tiers peuvent utiliser des cookies ou des technologies similaires à des fins publicitaires, conformément à la base légale applicable et, le cas échéant, au consentement de l’utilisateur.",
  },

  /* 3. Finalidad de las cookies */
  cookies_section3_title: {
    ES: "3. Finalidad de las cookies",
    EUS: "3. Cookieen helburua",
    EN: "3. Purpose of cookies",
    FR: "3. Finalité des cookies",
  },
  cookies_section3_p1: {
    ES: "Las cookies utilizadas en Euskalia tienen como finalidad garantizar el funcionamiento del sitio web, analizar su uso para mejorar el servicio y, en su caso, mostrar publicidad y medir su rendimiento.",
    EUS: "Euskalian erabiltzen diren cookieen helburua da webgunearen funtzionamendua bermatzea, erabilera aztertzea zerbitzua hobetzeko eta, hala badagokio, publizitatea erakustea eta haren errendimendua neurtzea.",
    EN: "Cookies used on Euskalia aim to ensure the proper functioning of the website, analyze its use to improve the service and, where applicable, display advertising and measure its performance.",
    FR: "Les cookies utilisées sur Euskalia ont pour finalité d’assurer le bon fonctionnement du site, d’analyser son utilisation afin d’améliorer le service et, le cas échéant, d’afficher de la publicité et d’en mesurer les performances.",
  },

  /* 4. Consentimiento y gestión */
  cookies_section4_title: {
    ES: "4. Consentimiento y gestión de cookies",
    EUS: "4. Cookieen baimena eta kudeaketa",
    EN: "4. Consent and cookie management",
    FR: "4. Consentement et gestion des cookies",
  },
  cookies_section4_p1: {
    ES: "Al acceder al sitio web, el usuario puede aceptar, rechazar o configurar el uso de cookies no esenciales mediante el sistema de gestión de consentimiento. En cualquier momento podrá modificar su elección a través de las opciones habilitadas en el sitio o desde la configuración de su navegador.",
    EUS: "Webgunean sartzean, erabiltzaileak cookie ez-funtsezkoen erabilera onartu, baztertu edo konfiguratu dezake baimenaren kudeaketa-sistemaren bidez. Edozein unetan aldatu ahal izango du bere aukera webgunean eskuragarri dauden aukeren bidez edo bere nabigatzailearen ezarpenetatik.",
    EN: "When accessing the website, users may accept, reject or configure the use of non-essential cookies through the consent management system. They may change their choice at any time via the options available on the site or through their browser settings.",
    FR: "Lors de l’accès au site, l’utilisateur peut accepter, refuser ou configurer l’utilisation des cookies non essentielles via le système de gestion du consentement. Il peut modifier son choix à tout moment via les options disponibles sur le site ou les paramètres de son navigateur.",
  },

  /* 5. Actualizaciones */
  cookies_section5_title: {
    ES: "5. Actualizaciones de la Política de Cookies",
    EUS: "5. Cookieen Politikaren eguneraketak",
    EN: "5. Updates to the Cookies Policy",
    FR: "5. Mises à jour de la Politique de cookies",
  },
  cookies_section5_p1: {
    ES: "Euskalia podrá actualizar esta Política de Cookies cuando sea necesario para adaptarla a cambios legales, técnicos o de funcionamiento del servicio. La versión vigente estará siempre disponible en el sitio web.",
    EUS: "Euskaliak Cookieen Politika hau eguneratu ahal izango du, lege-, teknika- edo zerbitzuaren funtzionamendu-aldaketetara egokitzeko beharrezkoa denean. Indarrean dagoen bertsioa beti egongo da webgunean eskuragarri.",
    EN: "Euskalia may update this Cookies Policy when necessary to adapt it to legal, technical or service-related changes. The current version will always be available on the website.",
    FR: "Euskalia peut mettre à jour cette Politique de cookies lorsque cela est nécessaire afin de l’adapter aux changements légaux, techniques ou liés au fonctionnement du service. La version en vigueur sera toujours disponible sur le site.",
  },

  cookies_last_update: {
    ES: "Esta Política de Cookies está actualizada a fecha 09-01-2026.",
    EUS: "Cookieen Politika 2026-01-09an eguneratua dago.",
    EN: "This Cookies Policy is updated as of 09-01-2026.",
    FR: "Cette Politique de cookies est à jour au 09-01-2026.",
  },
  
}

/* ====== i18n runtime ====== */
export const SUPPORTED_LANGS = ["ES", "EUS"]; // Si en el selector usas "EN", el sistema hace fallback a ES automáticamente.
export const LanguageContext = React.createContext(null);

export function LanguageProvider({ children, defaultLang = "ES" }) {
  const [language, setLanguage] = React.useState(
    SUPPORTED_LANGS.includes(defaultLang) ? defaultLang : "ES"
  );
  const value = React.useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within a LanguageProvider");

  const getByPath = (obj, path) =>
    path.split(".").reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), obj);

  const t = (key, fallback) => {
    const node = getByPath(translations, key);
    if (node === undefined) return fallback ?? key;
    if (typeof node === "string") return node;
    if (node && typeof node === "object") {
      return node[ctx.language] ?? node.ES ?? node.EUS ?? Object.values(node)[0] ?? (fallback ?? key);
    }
    return fallback ?? key;
  };

  return { ...ctx, t };
}
