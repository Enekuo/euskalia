import React from "react";

export const translations = {
 
                                    // =========================
                                    // =========================
                                    //        FREE ACCOUNT
                                    // ========================= 
                                    // =========================
  // =========================
  //        FREE HEADER
  // =========================
    header: {
    tools:     { ES: "Herramientas",  EUS: "Tresnak",        EN: "Tools",        FR: "Outils" },
    resources: { ES: "Recursos",      EUS: "Baliabideak",    EN: "Resources",    FR: "Ressources" },
    pricing:   { ES: "Precios",       EUS: "Prezioak",       EN: "Pricing",      FR: "Tarifs" },
    signIn:    { ES: "Iniciar sesión",EUS: "Hasi saioa",     EN: "Sign in",      FR: "Connexion" },
    startFree: { ES: "Crear cuenta",  EUS: "Sortu kontua",  EN: "Create account",FR: "Créer un compte" },
  },

  toolsMenu: {
    translatorTitle:    { ES: "Traductor",         EUS: "Itzultzailea",        EN: "Translator",        FR: "Traducteur" },
    translatorSubtitle: { ES: "Euskera ↔ Español", EUS: "Euskara ↔ Gaztelania",EN: "Basque ↔ Spanish", FR: "Basque ↔ Espagnol" },
    summaryTitle:       { ES: "Resumidor",         EUS: "Laburtzailea",        EN: "Summarizer",        FR: "Résumé IA" },
    summarySubtitle:    { ES: "Resúmenes con IA",  EUS: "Laburpenak IA-rekin",  EN: "AI summaries",     FR: "Résumés par IA" },
  },

  resourcesMenu: {
    support:     { ES: "Soporte",     EUS: "Laguntza",      EN: "Support",      FR: "Support" }, 
    aiChat:      { ES: "Chat de IA",  EUS: "IA txata",     EN: "AI Chat",      FR: "Chat IA" },
    suggestions: { ES: "Sugerencias", EUS: "Iradokizunak", EN: "Suggestions",  FR: "Suggestions" },
  },

  // =========================
  //       FREE TRADUCTOR
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

    /* === NUEVAS CLAVES para los botones/tooltip del Hero === */
    listen:     { ES: "Escuchar",     EUS: "Entzun",       EN: "Listen",        FR: "Écouter" },
    copy:       { ES: "Copiar",       EUS: "Kopiatu",     EN: "Copy",          FR: "Copier" },
    copied:     { ES: "Copiado",      EUS: "Kopiatuta",   EN: "Copied",        FR: "Copié" },
    pdf:        { ES: "PDF",          EUS: "PDF",         EN: "PDF",           FR: "PDF" },
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
  
summary: {
  output_language_es: {
    ES: "Español",
    EUS: "Gaztelania",
    EN: "Spanish",
    FR: "Espagnol",
  },

  output_language_eus: {
    ES: "Euskera",
    EUS: "Euskara",
    EN: "Basque",
    FR: "Basque",
  },

  output_language_en: {
    ES: "Inglés",
    EUS: "Ingelesa",
    EN: "English",
    FR: "Anglais",
  },

  output_language_fr: {
    ES: "Francés",
    EUS: "Frantsesa",
    EN: "French",
    FR: "Français",
  },
},


  // =========================
  //   FREE SUMMARY RESUMIDOR
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

    /* === NUEVAS CLAVES: aviso límite plan gratis === */
    limit_title:   { ES: "Has alcanzado el límite del plan Gratis", EUS: "Doako planaren muga gainditu duzu", EN: "You have reached the Free plan limit", FR: "Vous avez atteint la limite du plan gratuit" },
    limit_cta:     { ES: "Probar plan Premium", EUS: "Premium plana probatu", EN: "Try Premium plan", FR: "Essayer le plan Premium" },
    limit_dismiss: { ES: "Seguir con plan Gratis", EUS: "Jarraitu doako planarekin", EN: "Continue with Free plan", FR: "Continuer avec le plan gratuit" },
    limit_note:    { ES: "Límite actual: 12.000 caracteres por petición.", EUS: "Uneko muga: 12.000 karaktere eskaerako.", EN: "Current limit: 12,000 characters per request.", FR: "Limite actuelle : 12 000 caractères par requête." },

    /* === NUEVAS CLAVES: aviso de función premium (prompt) === */
    premium_prompt_title: {
      ES: "Función disponible en el plan Premium",
      EUS: "Funtzioa hau Premium planean bakarrik",
      EN: "Feature available in the Premium plan",
      FR: "Fonction disponible avec le plan Premium"
    },
    premium_prompt_body: {
      ES: "El botón «Generar» usa un prompt: una instrucción para ajustar el resumen a tu gusto (tono, puntos clave, foco…). En el plan Gratis puedes pegar texto y generar el resumen normal. Para usar prompts avanzados, prueba el plan Premium.",
      EUS: "«Sortu» botoiak prompt bat erabiltzen du: laburpena zure nahien arabera doitzen duen jarraibidea (tonoa, gakoak, fokua…). Plan Doanean testua itsatsi eta ohiko laburpena sor dezakezu. Prompt aurreratuak erabiltzeko, probatu Premium plana.",
      EN: "The “Generate” button uses a prompt: an instruction to tailor the summary to your needs (tone, key points, focus…). On the Free plan you can paste text and generate a standard summary. To use advanced prompts, try the Premium plan.",
      FR: "Le bouton « Générer » utilise un prompt : une instruction pour adapter le résumé à tes besoins (ton, points clés, focus…). Avec le plan gratuit, tu peux coller du texte et générer un résumé standard. Pour utiliser des prompts avancés, essaie le plan Premium."
    },
    premium_prompt_cta: {
      ES: "Probar plan Premium",
      EUS: "Premium plana probatu",
      EN: "Try Premium plan",
      FR: "Essayer le plan Premium"
    },
    premium_prompt_close: {
      ES: "Entendido",
      EUS: "Ulertuta",
      EN: "Got it",
      FR: "Compris"
    },

    /* === NUEVAS CLAVES: aviso de contenido desactualizado === */
    outdated_notice: { ES: "El texto ha cambiado. Actualiza el resumen.", EUS: "Testua aldatu da. Eguneratu laburpena.", EN: "The text has changed. Update the summary.", FR: "Le texte a changé. Mets à jour le résumé." },
    outdated_update: { ES: "Actualizar", EUS: "Eguneratu", EN: "Update", FR: "Mettre à jour" },
    outdated_close:  { ES: "Ocultar aviso", EUS: "Abisua ezkutatu", EN: "Hide notice", FR: "Masquer l’avertissement" },
  },




  
  // =========================
  //        COOKIES BANNER 
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
  //        SOPORTE
  // =========================
  
  support_title:        { ES: "Soporte", EUS: "Laguntza", EN: "Support", FR: "Support" },
  support_subtitle:     { ES: "¿Necesitas ayuda? Estamos aquí para ayudarte.", EUS: "Laguntza behar duzu? Hemen gaude laguntzeko.", EN: "Need help? We’re here to help you.", FR: "Besoin d’aide ? Nous sommes là pour vous aider." },
  support_kicker:       { ES: "¿Cómo podemos ayudarte?", EUS: "Nola lagun diezazukegu?", EN: "How can we help you?", FR: "Comment pouvons-nous vous aider ?" },
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
      EUS: "Zurekin harremanetan jartzeko bakarrik erabiliko dugu.",
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
  //        CHAT IA 
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
  assistant_placeholder: {
    ES: "Pregunta lo que quieras",
    EUS: "Edozer galde dezakezu",
    EN: "Ask anything",
    FR: "Posez votre question",
  },
  assistant_send: {
    ES: "Enviar",
    EUS: "Bidali",
    EN: "Send",
    FR: "Envoyer",
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
    EUS: "Euskara egunerokoan erabiltzeko",
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
    EUS: "Euskalia testuak prozesatzeko plataforma bat da, adimen artifizialean oinarritua. Testuen eta edukien ingurunean tresna desberdinekin lan egin nahi duen edonorentzat da, ikasleentzat, langileentzat... Euskal herritarrei eta euskararekin lan egin behar dutenei laguntzera bideratuta dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfazea sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
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
    ES: "El idioma principal de Euskalia es el euskera. Toda la plataforma está diseñada para utilizar el euskera en relación con el inglés, el español y el francés.",
    EUS: "Hizkuntza nagusia euskara da. Plataforma osoa euskararekin lotuta erabiltzeko diseinatuta dago, ingelesa, gaztelania eta frantsesa tarteko direla.",
    EN: "Euskalia’s main language is Basque. The entire platform is designed to use Basque in relation to English, Spanish and French.",
    FR: "La langue principale d’Euskalia est le basque. Toute la plateforme est conçue pour utiliser le basque en relation avec l’anglais, l’espagnol et le français.",
  },

  // 4
  faq_item4_question: {
    ES: "📝 ¿Cuál es la diferencia entre traducir y resumir?",
    EUS: "📝 Zein da itzultze eta laburtzearen arteko aldea?",
    EN: "📝 What’s the difference between translating and summarizing?",
    FR: "📝 Quelle est la différence entre traduire et résumer ?",
  },
  faq_item4_answer: {
    ES: "Traducir mantiene la longitud y estructura del texto original, pero lo convierte a otro idioma.\n\nResumir reduce el contenido a las ideas esenciales, manteniendo el idioma seleccionado.",
    EUS: "Itzultzeak jatorrizko testuaren luzera eta egitura mantentzen ditu, baina beste hizkuntza batera eramaten du.\n\nLaburtzeak edukia murrizten du eta ideia nagusiak uzten ditu, aukeratutako hizkuntza errespetatuz.",
    EN: "Translating keeps the original length and structure, but converts it to another language.\n\nSummarizing reduces the content to the essential ideas, keeping the selected language.",
    FR: "Traduire conserve la longueur et la structure du texte original, mais le convertit dans une autre langue.\n\nRésumer réduit le contenu aux idées essentielles, tout en conservant la langue choisie.",
  },

  // 5
  faq_item5_question: {
    ES: "📏 ¿Hay límites de caracteres o tamaño de archivo?",
    EUS: "📏 Ba al dago karaktere edo fitxategi-tamainaren mugarik?",
    EN: "📏 Are there character or file size limits?",
    FR: "📏 Y a-t-il des limites de caractères ou de taille de fichier ?",
  },
  faq_item5_answer: {
    ES: "Sí, existen límites de caracteres para garantizar un uso estable del servicio. Actualmente, el límite es de 12.000 caracteres por operación, tanto para texto introducido manualmente como para contenido obtenido a partir de archivos o enlaces..\n\nSi tu contenido es muy largo, recomendamos dividirlo en partes.",
    EUS: "Bai, karaktere-muga bat dago zerbitzuaren erabilera egonkorra bermatzeko. Une honetan, gehienezko muga 12.000 karaktere da eragiketa bakoitzeko, bai eskuz idatzitako testuentzat bai fitxategietatik edo esteketatik ateratako edukientzat.\n\nEdukia oso luzea bada, zatika bidaltzea gomendatzen dugu.",
    EN: "Yes. There are character limits to ensure stable use of the service. Currently, the limit is 12,000 characters per operation, both for manually entered text and for content obtained from files or links..\n\nIf your content is very long, we recommend splitting it into parts.",
    FR: "Oui. Il existe des limites de caractères pour garantir une utilisation stable du service. Actuellement, la limite est de 12 000 caractères par opération, aussi bien pour le texte saisi manuellement que pour le contenu obtenu à partir de fichiers ou de liens..\n\nSi votre contenu est très long, nous vous recommandons de le diviser en plusieurs parties.",
  },

  // 6
  faq_item6_question: {
    ES: "🔐 ¿Son seguras mis traducciones?",
    EUS: "🔐 Seguruak al dira nire itzulpenak?",
    EN: "🔐 Are my translations safe?",
    FR: "🔐 Mes traductions sont-elles sécurisées ?",
  },
  faq_item6_answer: {
    ES: "Tus textos solo se usan para generar el resultado solicitado y no se almacenan para fines externos.",
    EUS: "Zure testuak soilik eskatutako emaitzak sortzeko erabiltzen dira, eta ez dira kanpoko helburuetarako gordetzen.",
    EN: "Your texts are only used to generate the requested result and are not stored for external purposes.",
    FR: "Vos textes sont uniquement utilisés pour générer le résultat demandé et ne sont pas stockés à des fins externes.",
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
    ES: "💬 ¿Cómo puedo dar mi opinión?",
    EUS: "💬 Nola bidal dezaket nire iritzia?",
    EN: "💬 How can I share my feedback?",
    FR: "💬 Comment puis-je donner mon avis ?",
  },
  faq_item10_answer: {
    ES: "Puedes escribirnos para sugerencias o mejoras a:\neuskaliaweb@gmail.com",
    EUS: "Iradokizunak edo hobekuntzak bidali hona:\neuskaliaweb@gmail.com",
    EN: "You can email us suggestions or improvements at:\neuskaliaweb@gmail.com",
    FR: "Vous pouvez nous écrire pour des suggestions ou des améliorations à :\neuskaliaweb@gmail.com",
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
    EUS: "Euskalia testuak prozesatzeko plataforma bat da, adimen artifizialean oinarritua. Testuen eta edukien ingurunean tresna desberdinekin lan egin nahi duen edonorentzat da, ikasleentzat, langileentzat... Euskal herritarrei eta euskararekin lan egin behar dutenei laguntzera bideratuta dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfazea sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
    EN: "Euskalia is an AI-based platform for text processing. It is aimed at anyone who wants to work with different tools in the world of texts and content: students, workers... It is designed to help Basque citizens and anyone who needs to work with Basque.\n\nEuskalia is centered around Basque as its main language. Both translation and the rest of the tools always work in relation to Basque, using other languages such as Spanish, English or French only to convert content to Basque or from Basque, depending on the user’s needs.\n\nEuskalia stands out for a clear design and a user experience built to work with texts without friction. The interface is simple, direct and accessible, allowing you to focus on the content from the very first moment, without distractions or complex settings.",
    FR: "Euskalia est une plateforme de traitement de textes basée sur l’IA. Elle s’adresse à toute personne souhaitant utiliser différents outils dans l’univers des textes et des contenus : étudiants, travailleurs... Elle vise à aider les citoyens basques et toute personne qui doit travailler avec le basque.\n\nEuskalia est centrée sur le basque comme langue principale. La traduction comme les autres outils fonctionnent toujours en lien avec le basque, en utilisant d’autres langues comme l’espagnol, l’anglais ou le français uniquement pour convertir le contenu vers le basque ou depuis le basque, selon les besoins.\n\nEuskalia se distingue par un design clair et une expérience pensée pour travailler avec des textes sans friction. L’interface est simple, directe et accessible, ce qui permet de se concentrer sur le contenu dès le premier instant, sans distractions ni réglages complexes.",

  },

  eusFooterAboutTitle2: { ES: "¿Cómo funciona?", EUS: "Nola funtzionatzen du?", EN: "How does it work?", FR: "Comment ça marche ?" },
  eusFooterAboutContent2: {
    ES:  "Solo tienes que pegar un texto, subir un documento o indicar una URL. Euskalia extrae el contenido y te permite elegir qué hacer con él: traducir, resumir, corregir, parafrasear, humanizar o analizar si hay indicios de IA. Ajustas el nivel o estilo si lo necesitas y obtienes un resultado listo para copiar, descargar o guardar en biblioteca.",
    EUS: "Testua itsatsi, dokumentua igo edo URL bat jarri besterik ez duzu egin behar. Edukiarekin zer egin nahi duzun aukeratzen uzten dizu: itzuli, laburtu, zuzendu, parafraseatu, humanizatu edo IA zantzuak aztertu. Behar izanez gero maila edo estiloa doitu, eta emaitza kopiatu, deskargatu edo liburutegian gordetzeko prest izango duzu.",
    EN:  "You just need to paste text, upload a document or provide a URL. Euskalia extracts the content and lets you choose what to do with it: translate, summarize, correct, paraphrase, humanize or analyze whether there are AI signals. Adjust the level or style if needed and get a result ready to copy, download or save to your library.",
    FR: "Il vous suffit de coller un texte, de téléverser un document ou d’indiquer une URL. Euskalia extrait le contenu et vous permet de choisir quoi en faire : traduire, résumer, corriger, paraphraser, humaniser ou analyser la présence d’indices d’IA. Vous ajustez le niveau ou le style si besoin et obtenez un résultat prêt à copier, télécharger ou enregistrer dans la bibliothèque.",
  },
  eusFooterAboutTitle3: { ES: "Herramientas Plan Pro", EUS: " Pro planeko tresnak", EN: "Pro Plan tools", FR: "Outils du plan Pro" },
  eusFooterAboutContent3: { 
    ES: 
    "1- Traductor: traduce palabras, frases o textos completos al instante entre euskera y otros idiomas, manteniendo el contexto y la naturalidad.\n" +
    "2- Resumidor: reduce textos largos a versiones claras y estructuradas, extrayendo la información más relevante.\n" +
    "3- Corrector: detecta y corrige errores gramaticales, ortográficos y de estilo en textos en euskera.\n" +
    "4- Parafraseador: reescribe textos con otras palabras sin cambiar el significado, adaptándolos a distintos contextos.\n" +
    "5- Humanizador: mejora la fluidez y naturalidad del texto para que suene más humano y menos artificial.\n" +
    "6- Detector de IA: analiza textos para identificar posibles indicios de contenido generado por inteligencia artificial.",
    EUS: 
    "1- Itzultzailea: hitzak, esaldiak edo testu osoak berehala itzultzen ditu euskararen eta beste hizkuntzen artean, testuingurua eta naturaltasuna errespetatuz.\n" +
    "2- Laburtzailea: testu luzeak bertsio argi eta egituratuetan laburtzen ditu, informazio garrantzitsuena ateratzeko.\n" +
    "3- Zuzentzailea: euskarazko testuetan akats gramatikalak, ortografikoak eta estilozkoak zuzentzen ditu.\n" +
    "4- Parafraseatzailea: testuak beste modu batean berridazten ditu, esanahia aldatu gabe, testuinguru desberdinetara egokitzeko.\n" +
    "5- Humanizatzailea: testuen jariakortasuna eta naturaltasuna hobetzen ditu, gizatiarragoak izan daitezen.\n" +
    "6- IA detektagailua: testuak aztertzen ditu adimen artifizialak sortutako edukiaren zantzuak identifikatzeko.",
    EN:
    "1- Translator: instantly translates words, sentences or full texts between Basque and other languages, keeping context and naturalness.\n" +
    "2- Summarizer: reduces long texts into clear, structured versions, extracting the most relevant information.\n" +
    "3- Corrector: detects and fixes grammar, spelling and style issues in Basque texts.\n" +
    "4- Paraphraser: rewrites texts with different wording without changing the meaning, adapting them to different contexts.\n" +
    "5- Humanizer: improves fluency and naturalness so the text sounds more human and less artificial.\n" +
    "6- AI Detector: analyzes texts to identify possible signs of AI-generated content.",
    FR:
    "1- Traducteur : traduit instantanément des mots, des phrases ou des textes entiers entre le basque et d’autres langues, en conservant le contexte et la naturalité.\n" +
    "2- Résumeur : réduit de longs textes en versions claires et structurées, en extrayant l’information la plus pertinente.\n" +
    "3- Correcteur : détecte et corrige les erreurs de grammaire, d’orthographe et de style dans les textes en basque.\n" +
    "4- Paraphraseur : reformule les textes avec d’autres mots sans changer le sens, en les adaptant à différents contextes.\n" +
    "5- Humaniseur : améliore la fluidité et la naturalité pour que le texte paraisse plus humain et moins artificiel.\n" +
    "6- Détecteur d’IA : analyse les textes pour identifier d’éventuels indices de contenu généré par IA.",
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





  //=========================
  //       CREAR CUENTA
  // =========================
  
  registerPage_title: {
  ES: "Crea tu cuenta",
  EUS: "Sortu zure kontua",
  EN: "Create your account",
  FR: "Créez votre compte",
},

registerPage_google: {
  ES: "Registrarte con Google",
  EUS: "Erregistratu Google-rekin",
  EN: "Continue with Google",
  FR: "Continuer avec Google",
},

registerPage_microsoft: {
  ES: "Registrarte con Microsoft",
  EUS: "Erregistratu Microsoft-ekin",
  EN: "Continue with Microsoft",
  FR: "Continuer avec Microsoft",
},

registerPage_termsPrefix: {
  ES: "Al continuar, aceptas nuestros",
  EUS: "Jarraitzeko, gure",
  EN: "By continuing, you agree to our",
  FR: "En continuant, vous acceptez nos",
},

registerPage_terms: {
  ES: "Términos",
  EUS: "Baldintzak",
  EN: "Terms",
  FR: "Conditions",
},

registerPage_and: {
  ES: "y",
  EUS: "eta",
  EN: "and",
  FR: "et",
},

registerPage_privacy: {
  ES: "Política de Privacidad",
  EUS: "Pribatutasun-politika",
  EN: "Privacy Policy",
  FR: "Politique de confidentialité",
},

registerPage_haveAccount: {
  ES: "¿Ya tienes cuenta?",
  EUS: "Baduzu konturik?",
  EN: "Already have an account?",
  FR: "Vous avez déjà un compte ?",
},

registerPage_login: {
  ES: "Iniciar sesión",
  EUS: "Hasi saioa",
  EN: "Sign in",
  FR: "Se connecter",
},
registerPage_title: {
  ES: "Crea tu cuenta",
  EUS: "Sortu zure kontua",
  EN: "Create your account",
  FR: "Créez votre compte",
},

registerPage_google: {
  ES: "Registrarte con Google",
  EUS: "Erregistratu Google-rekin",
  EN: "Continue with Google",
  FR: "Continuer avec Google",
},

registerPage_google_loading: {
  ES: "Conectando...",
  EUS: "Konektatzen...",
  EN: "Connecting...",
  FR: "Connexion...",
},

registerPage_microsoft: {
  ES: "Registrarte con Microsoft",
  EUS: "Erregistratu Microsoft-ekin",
  EN: "Continue with Microsoft",
  FR: "Continuer avec Microsoft",
},

registerPage_microsoft_soon: {
  ES: "Próximamente",
  EUS: "Laster",
  EN: "Coming soon",
  FR: "Bientôt disponible",
},

registerPage_error_google: {
  ES: "No se pudo iniciar sesión con Google. Inténtalo de nuevo mas tarde.",
  EUS: "Ezin izan da Google-rekin saioa hasi. Saiatu berriro geroago.",
  EN: "Could not sign in with Google. Please try again later.",
  FR: "Impossible de se connecter avec Google. Essaye plus tard.",
},

registerPage_termsPrefix: {
  ES: "Al continuar, aceptas nuestros",
  EUS: "Jarraituz gero, gure",
  EN: "By continuing, you agree to our",
  FR: "En continuant, vous acceptez nos",
},

registerPage_terms: {
  ES: "Términos",
  EUS: "Baldintzak",
  EN: "Terms",
  FR: "Conditions",
},

registerPage_and: {
  ES: "y",
  EUS: "eta",
  EN: "and",
  FR: "et",
},

registerPage_privacy: {
  ES: "Política de Privacidad",
  EUS: "Pribatutasun Politika",
  EN: "Privacy Policy",
  FR: "Politique de confidentialité",
},

registerPage_haveAccount: {
  ES: "¿Ya tienes cuenta?",
  EUS: "Baduzu kontua?",
  EN: "Already have an account?",
  FR: "Vous avez déjà un compte ?",
},

registerPage_login: {
  ES: "Iniciar sesión",
  EUS: "Hasi saioa",
  EN: "Sign in",
  FR: "Se connecter",
},     



  // =========================
  //      INICIAR SESION
  // =========================

  authPage: {
    pageTitle:              { ES: "Iniciar sesión",                       EUS: "Saioa hasi", EN: "Sign in", FR: "Se connecter" },
    pageDescription:        { ES: "Accede a tu cuenta para seguir usando Euskalia.", EUS: "Sartu zure kontura Euskalia erabiltzen jarraitzeko.", EN: "Access your account to keep using Euskalia.", FR: "Accédez à votre compte pour continuer à utiliser Euskalia." },

    welcome:                { ES: "BIENVENIDO",                  EUS: "ONGI ETORRI", EN: "WELCOME", FR: "BIENVENUE" },
    continueWithGoogle:     { ES: "Continuar con Google",                 EUS: "Jarraitu Google-rekin", EN: "Continue with Google", FR: "Continuer avec Google" },
    or:                     { ES: "o",                                    EUS: "edo", EN: "or", FR: "ou" },
   
   continueWithMicrosoft: {
    ES: "Continuar con Microsoft",
    EUS: "Jarraitu Microsoft-ekin",
    EN: "Continue with Microsoft",
    FR: "Continuer avec Microsoft",
  }, 
    emailOrUserPlaceholder: { ES: "Introduce tu correo o nombre de usuario", EUS: "Idatzi zure posta edo erabiltzaile-izena", EN: "Enter your email or username", FR: "Saisissez votre email ou nom d’utilisateur" },
    signInButton:           { ES: "Continuar",                            EUS: "Jarraitu", EN: "Continue", FR: "Continuer" },

    emailRequiredError:     { ES: "Por favor, introduce tu correo electrónico.", EUS: "Mesedez, idatzi zure posta elektronikoa.", EN: "Please enter your email address.", FR: "Veuillez saisir votre adresse email." },
    emailInvalidError:      { ES: "El formato del correo no es válido.",  EUS: "Posta elektronikoaren formatua ez da baliozkoa.", EN: "The email format is not valid.", FR: "Le format de l’email n’est pas valide." },
    passwordRequiredError:  { ES: "Por favor, introduce tu contraseña.",  EUS: "Mesedez, idatzi zure pasahitza.", EN: "Please enter your password.", FR: "Veuillez saisir votre mot de passe." },

    legalText: {
      prefix:  { ES: "Al continuar, aceptas nuestros", EUS: "Jarraitzearen bidez, gure", EN: "By continuing, you agree to our", FR: "En continuant, vous acceptez nos" },
      terms:   { ES: "Términos",                        EUS: "Baldintzak", EN: "Terms", FR: "Conditions" },
      and:     { ES: "y",                               EUS: "eta", EN: "and", FR: "et" },
      privacy: { ES: "Política de Privacidad",         EUS: "Pribatutasun-politika", EN: "Privacy Policy", FR: "Politique de confidentialité" },
    },

    noAccount: { ES: "¿No tienes cuenta?", EUS: "Ez duzu konturik?", EN: "Don’t have an account?", FR: "Vous n’avez pas de compte ?" },
    signUp:    { ES: "Regístrate",         EUS: "Erregistratu", EN: "Sign up", FR: "S’inscrire" },
  },




  // =========================
  //       PRICING PAGE
  // =========================
   
    pricing: {
  title: {
    ES: "Elige tu plan",
    EUS: "Aukeratu zure plana",
    EN: "Choose your plan",
    FR: "Choisissez votre offre",
  },
  subtitle: {
    ES: "Empieza con el Plan Pro y pasa a Premium+ cuando necesites más potencia y menos límites.",
    EUS: "Hasi Pro planarekin eta pasa Premium+ planera potentzia eta muga gutxiago behar dituzunean.",
    EN: "Start with the Pro Plan and move to Premium+ when you need more power and fewer limits.",
    FR: "Commencez avec l’offre Pro et passez à Premium+ quand vous aurez besoin de plus de puissance et de moins de limites.",
  },

  pro_name: {
    ES: "Plan Pro",
    EUS: "Plan Pro",
    EN: "Pro Plan",
    FR: "Offre Pro",
  },
  premium_name: {
    ES: "Plan Premium+",
    EUS: "Plan Premium+",
    EN: "Premium+ Plan",
    FR: "Offre Premium+",
  },

  perMonth: {
    ES: "/ mes",
    EUS: "/ hilean",
    EN: "/ month",
    FR: "/ mois",
  },

  pro_cta: {
    ES: "Elegir Pro",
    EUS: "Aukeratu Pro",
    EN: "Choose Pro",
    FR: "Choisir Pro",
  },
  premium_cta_soon: {
    ES: "Próximamente",
    EUS: "Laster eskuragarri",
    EN: "Coming soon",
    FR: "Bientôt disponible",
  },

  badge_popular: {
    ES: "Más popular",
    EUS: "Ezagunena",
    EN: "Most popular",
    FR: "Le plus populaire",
  },
  badge_soon: {
    ES: "Próximamente",
    EUS: "Laster",
    EN: "Coming soon",
    FR: "Bientôt",
  },

  features: {
    // ===== PLAN PRO – TUS FRASES =====

    pro1: {
      ES: "Límites más amplios: 5.000 caracteres por petición para el traductor.",
      EUS: "Muga zabalagoak: 5.000 karaktere eskaera bakoitzeko itzultzailearentzat.",
      EN: "Higher limits: 5,000 characters per request for the translator.",
      FR: "Limites plus élevés : 5 000 caractères par requête pour le traducteur.",
    },
    pro2: {
      ES: "Límites más amplios: 12.000 caracteres por petición para el resumidor.",
      EUS: "Muga zabalagoak: 12.000 karaktere eskaera bakoitzeko laburtzailearentzat.",
      EN: "Higher limits: 12,000 characters per request for the summarizer.",
      FR: "Limites plus élevés : 12 000 caractères par requête pour le résumeur.",
    },
    pro3: {
      ES: "Límite diario: 150.000 caracteres al día.",
      EUS: "Eguneko muga: 150.000 karaktere eguneko.",
      EN: "Daily limit: 150,000 characters per day.",
      FR: "Limite quotidienne : 150 000 caractères par jour.",
    },
    pro4: {
      ES: "Acceso a las 6 herramientas (hasta 12.000 caracteres por petición).",
      EUS: "6 tresnetarako sarbidea (gehienez 12.000 karaktere eskaera bakoitzeko).",
      EN: "Access to the 6 tools (up to 12,000 characters per request).",
      FR: "Accès aux 6 outils (jusqu’à 12 000 caractères par requête).",
    },
    pro5: {
      ES: "Mejor calidad de API para un uso más fiable de la inteligencia artificial.",
      EUS: "API kalitate hobea, adimen artifiziala fidagarriago erabiltzeko.",
      EN: "Higher-quality API for more reliable AI usage.",
      FR: "API de meilleure qualité pour une utilisation plus fiable de l’intelligence artificielle.",
    },
    pro6: {
      ES: "Cuenta propia con diferentes modos y biblioteca inteligente con más opciones.",
      EUS: "Kontu propioa, hainbat modurekin, eta liburutegi adimentsua aukera gehiagorekin.",
      EN: "Personal account with different modes and a smart library with more options.",
      FR: "Compte personnel avec différents modes et une bibliothèque intelligente avec plus d’options.",
    },

    // ===== PLAN PREMIUM+ 

    premium1: {
    ES: "Límites de caracteres casi ilimitados.",
    EUS: "Karaktere-kopurua ia mugarik gabe",
    EN: "Almost unlimited character limits.",
    FR: "Limites de caractères presque illimitées.",
  },
  premium2: {
    ES: "Herramientas premium añadidas.",
    EUS: "Premium tresnak gehituta.",
    EN: "Additional premium tools.",
    FR: "Outils premium ajoutés.",
  },
  premium3: {
    ES: "Prompts activos integrados en las herramientas.",
    EUS: "Prompt-ak aktibatuta tresnetan.",
    EN: "Active prompts integrated into the tools.",
    FR: "Prompts actifs intégrés aux outils.",
  },
  premium4: {
    ES: "Chat de IA + asistente personal.",
    EUS: "IA txata + laguntzaile pertsonala.",
    EN: "AI chat + personal assistant.",
    FR: "Chat IA + assistant personnel.",
  },
  premium5: {
    ES: "Prioridad en la cola y velocidad máxima, incluso en horas punta.",
    EUS: "Lehentasuna ilaran eta abiadura maximoa, puntako orduetan ere.",
    EN: "Priority in the queue and maximum speed, even at peak hours.",
    FR: "Priorité dans la file et vitesse maximale, même aux heures de pointe.",
    },
    premium6: {
    ES: "",
    EUS: "",
    EN: "",
    FR: "",
    },
  },
},







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

// AVISO LEGAL //
legal_notice_title: {
  ES: "Aviso Legal",
  EUS: "Lege-oharra",
  EN: "Legal Notice",
  FR: "Mentions légales",
},

legal_notice_last_update: {
  ES: "Última actualización: [__________]",
  EUS: "Azken eguneratzea: [__________]",
  EN: "Last update: [__________]",
  FR: "Dernière mise à jour : [__________]",
},

legal_notice_section1_title: {
  ES: "1. Información general",
  EUS: "1. Informazio orokorra",
  EN: "1. General information",
  FR: "1. Informations générales",
},

legal_notice_section1_p1: {
  ES: "De conformidad con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que la entidad responsable de la gestión y funcionamiento de este sitio web es:",
  EUS: "Uztailaren 11ko 34/2002 Legearen 10. artikuluarekin bat etorriz, Informazioaren Gizarteko Zerbitzuei eta Merkataritza Elektronikoari buruzko Legeak (LSSI-CE) xedatutakoa betez, honako hau jakinarazten da: webgune honen kudeaketaz eta funtzionamenduaz arduratzen den erakundea hau da:",
  EN: "In accordance with Article 10 of Spanish Law 34/2002 of 11 July on Information Society Services and Electronic Commerce (LSSI-CE), it is hereby stated that the entity responsible for the management and operation of this website is:",
  FR: "Conformément à l’article 10 de la loi espagnole 34/2002 du 11 juillet relative aux services de la société de l’information et au commerce électronique (LSSI-CE), il est indiqué que l’entité responsable de la gestion et du fonctionnement de ce site web est :",
},

legal_notice_section1_field_name: {
  ES: "Nombre: Euskalia",
  EUS: "Izena: Euskalia",
  EN: "Name: Euskalia",
  FR: "Nom : Euskalia",
},

legal_notice_section1_field_domain: {
  ES: "Dominio: https://euskalia.ai",
  EUS: "Domeinua: https://euskalia.ai",
  EN: "Domain: https://euskalia.ai",
  FR: "Domaine : https://euskalia.ai",
},

legal_notice_section1_field_email: {
  ES: "Email: [__________]",
  EUS: "Emaila: [__________]",
  EN: "Email: [__________]",
  FR: "Email : [__________]",
},

legal_notice_section1_field_activity: {
  ES: "Actividad: Servicios digitales de traducción y resumen basados en Inteligencia Artificial.",
  EUS: "Jarduera: Itzulpen eta laburpen digitalen zerbitzuak, adimen artifizialean oinarrituak.",
  EN: "Activity: Digital translation and summarization services based on Artificial Intelligence.",
  FR: "Activité : Services numériques de traduction et de résumé basés sur l’intelligence artificielle.",
},

legal_notice_section1_p2: {
  ES: "El acceso y uso del sitio web atribuye la condición de usuario, e implica la aceptación plena y sin reservas del presente Aviso Legal y de las condiciones aquí establecidas.",
  EUS: "Webgunera sartzeak eta hura erabiltzeak erabiltzaile izaera ematen du, eta lege-ohar hau eta hemen ezarritako baldintzak osorik eta erreserbarik gabe onartzea dakar.",
  EN: "Access to and use of the website grants the status of user and implies full and unreserved acceptance of this Legal Notice and the terms set out herein.",
  FR: "L’accès et l’utilisation du site confèrent la qualité d’utilisateur et impliquent l’acceptation pleine et entière du présent avis légal et des conditions établies ici.",
},
legal_notice_section2_title: {
  ES: "2. Objeto",
  EUS: "2. Xedea",
  EN: "2. Purpose",
  FR: "2. Objet",
},

legal_notice_section2_p1: {
  ES: "El presente aviso legal regula el uso del sitio web Euskalia, cuyo propósito principal es ofrecer herramientas de traducción y resumen de textos entre euskera, castellano y otros idiomas, apoyadas en inteligencia artificial.",
  EUS: "Lege-ohar honek Euskalia webgunearen erabilera arautzen du. Euskaliaren helburu nagusia da euskararen, gaztelaniaren eta beste hizkuntza batzuen arteko itzulpen eta testu-laburpen tresnak eskaintzea, adimen artifizialaren laguntzarekin.",
  EN: "This legal notice governs the use of the Euskalia website, whose main purpose is to offer AI-assisted tools for translating and summarizing texts between Basque, Spanish and other languages.",
  FR: "Le présent avis légal régit l’utilisation du site web Euskalia, dont l’objectif principal est de proposer des outils de traduction et de résumé de textes entre le basque, l’espagnol et d’autres langues, avec l’appui de l’intelligence artificielle.",
},

legal_notice_section2_p2: {
  ES: "A través de esta plataforma, los usuarios pueden introducir textos, documentos o enlaces para obtener traducciones o resúmenes generados por IA, siempre dentro de los límites de uso establecidos.",
  EUS: "Plataforma honen bidez, erabiltzaileek testuak, dokumentuak edo estekak sar ditzakete IA bidez sortutako itzulpenak edo laburpenak lortzeko, ezarritako erabilera-mugen barruan.",
  EN: "Through this platform, users can enter texts, documents or links to obtain AI-generated translations or summaries, always within the established usage limits.",
  FR: "Grâce à cette plateforme, les utilisateurs peuvent saisir des textes, des documents ou des liens afin d’obtenir des traductions ou des résumés générés par IA, toujours dans le respect des limites d’utilisation établies.",
},

legal_notice_section3_title: {
  ES: "3. Condiciones de uso",
  EUS: "3. Erabilera baldintzak",
  EN: "3. Terms of use",
  FR: "3. Conditions d’utilisation",
},

legal_notice_section3_p1: {
  ES: "El usuario se compromete a:",
  EUS: "Erabiltzaileak honako hauek betetzeko konpromisoa hartzen du:",
  EN: "The user undertakes to:",
  FR: "L’utilisateur s’engage à :",
},

legal_notice_section3_li1: {
  ES: "Hacer un uso adecuado y lícito del sitio web.",
  EUS: "Webgunea behar bezala eta legez erabiltzea.",
  EN: "Make appropriate and lawful use of the website.",
  FR: "Faire un usage approprié et licite du site.",
},

legal_notice_section3_li2: {
  ES: "No utilizar el contenido con fines ilícitos o contrarios a la buena fe.",
  EUS: "Edukia legez kontrako edo fede onaren aurkako helburuetarako ez erabiltzea.",
  EN: "Not use the content for unlawful purposes or in a manner contrary to good faith.",
  FR: "Ne pas utiliser le contenu à des fins illicites ou contraires à la bonne foi.",
},

legal_notice_section3_li3: {
  ES: "No provocar daños en los sistemas de Euskalia ni intentar acceder de forma no autorizada a las áreas restringidas.",
  EUS: "Euskaliaren sistemetan kalterik ez eragitea eta baimenik gabe sarbide mugatuko eremuetara sartzen saiatzea.",
  EN: "Not cause damage to Euskalia’s systems or attempt unauthorized access to restricted areas.",
  FR: "Ne pas causer de dommages aux systèmes d’Euskalia ni tenter d’accéder sans autorisation aux zones restreintes.",
},

legal_notice_section3_li4: {
  ES: "No introducir ni difundir virus informáticos u otros sistemas que puedan causar daños.",
  EUS: "Ez sartzea eta ez zabaltzea kalteak eragin ditzaketen birus informatikoak edo antzeko sistema kaltegarriak.",
  EN: "Not introduce or spread computer viruses or other systems that may cause damage.",
  FR: "Ne pas introduire ni diffuser des virus informatiques ou d’autres systèmes pouvant causer des dommages.",
},

legal_notice_section3_p2: {
  ES: "Euskalia se reserva el derecho de suspender o retirar el acceso a los usuarios que incumplan estas condiciones.",
  EUS: "Euskaliak eskubidea du baldintza hauek betetzen ez dituzten erabiltzaileei sarbidea eteteko edo kentzeko.",
  EN: "Euskalia reserves the right to suspend or withdraw access for users who breach these conditions.",
  FR: "Euskalia se réserve le droit de suspendre ou de retirer l’accès aux utilisateurs qui ne respectent pas ces conditions.",
},

legal_notice_section4_title: {
  ES: "4. Propiedad intelectual e industrial",
  EUS: "4. Jabetza intelektuala eta industriala",
  EN: "4. Intellectual and industrial property",
  FR: "4. Propriété intellectuelle et industrielle",
},

legal_notice_section4_p1: {
  ES: "Todos los elementos que forman el sitio web (diseño, logotipos, textos, imágenes, software, código fuente...) son propiedad de Euskalia o cuentan con las licencias necesarias para su uso.",
  EUS: "Webgunea osatzen duten elementu guztiak (diseinua, logotipoak, testuak, irudiak, softwarea, kodea...) Euskaliaren jabetzakoak dira edo beharrezko lizentziak dituzte.",
  EN: "All elements that make up the website (design, logos, texts, images, software, source code...) are owned by Euskalia or are used under the necessary licenses.",
  FR: "Tous les éléments composant le site (design, logos, textes, images, logiciels, code source...) sont la propriété d’Euskalia ou disposent des licences nécessaires à leur utilisation.",
},

legal_notice_section4_p2: {
  ES: "Queda prohibida la reproducción total o parcial de los contenidos sin autorización expresa y por escrito.",
  EUS: "Debekatuta dago edukiak osorik edo zatika erreproduzitzea, titularraren baimen espresu eta idatzirik gabe.",
  EN: "Total or partial reproduction of the contents is prohibited without express written authorization.",
  FR: "Toute reproduction totale ou partielle des contenus est interdite sans autorisation expresse et écrite.",
},

legal_notice_section4_p3: {
  ES: "El uso de la marca Euskalia y su logotipo queda limitado exclusivamente a fines informativos y no puede utilizarse sin consentimiento previo.",
  EUS: "Euskalia marka eta logotipoaren erabilera helburu informatiboetara mugatzen da soilik, eta ezin da erabili titularraren aldez aurreko baimenik gabe.",
  EN: "Use of the Euskalia trademark and logo is limited exclusively to informational purposes and may not be used without prior consent.",
  FR: "L’utilisation de la marque Euskalia et de son logo est strictement limitée à des fins informatives et ne peut être faite sans consentement préalable.",
},
legal_notice_section5_title: {
  ES: "5. Responsabilidad",
  EUS: "5. Erantzukizuna",
  EN: "5. Liability",
  FR: "5. Responsabilité",
},

legal_notice_section5_p1: {
  ES: "Euskalia no garantiza la disponibilidad continua del sitio ni la ausencia de errores en sus servicios.",
  EUS: "Euskaliak ez du bermatzen webgunearen erabilgarritasun jarraitua ezta bere zerbitzuetan akatsik ez egotea ere.",
  EN: "Euskalia does not guarantee the continuous availability of the website nor the absence of errors in its services.",
  FR: "Euskalia ne garantit ni la disponibilité continue du site ni l’absence d’erreurs dans ses services.",
},

legal_notice_section5_p2: {
  ES: "Los resultados generados por inteligencia artificial pueden contener imprecisiones, por lo que el usuario es responsable de su uso.",
  EUS: "Adimen artifizialak sortutako emaitzek zehaztasun faltak izan ditzakete; beraz, erabiltzailea da haien erabileraren erantzule bakarra.",
  EN: "Results generated by artificial intelligence may contain inaccuracies, so the user is responsible for their use.",
  FR: "Les résultats générés par l’intelligence artificielle peuvent contenir des imprécisions ; l’utilisateur est donc responsable de leur utilisation.",
},

legal_notice_section5_p3: {
  ES: "Euskalia no se hace responsable de los daños derivados del uso indebido de la plataforma.",
  EUS: "Euskalia ez da erantzule izango plataforma desegoki erabiltzetik sortutako kalteen aurrean.",
  EN: "Euskalia is not responsible for damages arising from improper use of the platform.",
  FR: "Euskalia ne saurait être tenue responsable des dommages résultant d’une utilisation inappropriée de la plateforme.",
},

legal_notice_section6_title: {
  ES: "6. Política de enlaces",
  EUS: "6. Esteken politika",
  EN: "6. Links policy",
  FR: "6. Politique de liens",
},

legal_notice_section6_p1: {
  ES: "El sitio web puede contener enlaces a páginas de terceros.",
  EUS: "Webguneak hirugarrenen webguneetarako estekak izan ditzake.",
  EN: "The website may contain links to third-party pages.",
  FR: "Le site web peut contenir des liens vers des pages de tiers.",
},

legal_notice_section6_p2: {
  ES: "Euskalia no controla ni se responsabiliza de los contenidos o políticas de dichos sitios.",
  EUS: "Euskaliak ez ditu kontrolatzen eta ez da erantzule izango hirugarrenen webguneetatik eratorritako edukien edo politikaren aurrean.",
  EN: "Euskalia does not control and is not responsible for the contents or policies of such sites.",
  FR: "Euskalia ne contrôle pas et n’est pas responsable des contenus ou des politiques de ces sites.",
},

legal_notice_section7_title: {
  ES: "7. Protección de datos personales",
  EUS: "7. Datu pertsonalen babesa",
  EN: "7. Personal data protection",
  FR: "7. Protection des données personnelles",
},

legal_notice_section7_p1: {
  ES: "Los datos personales serán tratados conforme a la Política de Privacidad disponible en el sitio web.",
  EUS: "Datu pertsonalak webgunean eskuragarri dagoen Pribatutasun Politikaren arabera tratatuko dira.",
  EN: "Personal data will be processed in accordance with the Privacy Policy available on the website.",
  FR: "Les données personnelles seront traitées conformément à la Politique de confidentialité disponible sur le site.",
},

legal_notice_section8_title: {
  ES: "8. Uso de cookies",
  EUS: "8. Cookieen erabilera",
  EN: "8. Use of cookies",
  FR: "8. Utilisation des cookies",
},

legal_notice_section8_p1: {
  ES: "Este sitio utiliza cookies propias y de terceros con fines técnicos y analíticos.",
  EUS: "Webgune honek berezko eta hirugarrenen cookieak erabiltzen ditu helburu tekniko eta analitikoekin.",
  EN: "This website uses its own and third-party cookies for technical and analytical purposes.",
  FR: "Ce site utilise des cookies propres et de tiers à des fins techniques et analytiques.",
},

legal_notice_section8_p2: {
  ES: "El usuario puede configurar o rechazar las cookies desde el banner o configuración.",
  EUS: "Erabiltzaileak cookieak konfiguratu edo baztertu ditzake banner bidez edo konfigurazio ataletik.",
  EN: "The user can configure or reject cookies from the banner or settings.",
  FR: "L’utilisateur peut configurer ou refuser les cookies via le bandeau ou les paramètres.",
},

legal_notice_section8_p3: {
  ES: "Para más información consulte la Política de Cookies.",
  EUS: "Informazio gehiago lortzeko, kontsultatu Cookieen Politika.",
  EN: "For more information, see the Cookies Policy.",
  FR: "Pour plus d’informations, consultez la Politique de cookies.",
},

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
  ES: "En caso de conflicto, las partes se someten a los Juzgados y Tribunales de [__________].",
  EUS: "Gatazka izanez gero, aldeek [__________]-ko epaitegi eta auzitegien jurisdikzioari men egingo diote.",
  EN: "In the event of a dispute, the parties submit to the Courts and Tribunals of [__________].",
  FR: "En cas de litige, les parties se soumettent aux tribunaux de [__________].",
},

legal_notice_section10_title: {
  ES: "10. Contacto",
  EUS: "10. Harremana",
  EN: "10. Contact",
  FR: "10. Contact",
},

legal_notice_section10_p1: {
  ES: "Para cualquier duda o consulta relacionada con este aviso legal puede contactar con nosotros:",
  EUS: "Lege-ohar honekin lotutako edozein zalantza edo galderatarako, jar zaitez gurekin harremanetan:",
  EN: "For any questions or queries related to this legal notice, you can contact us:",
  FR: "Pour toute question relative au présent avis légal, vous pouvez nous contacter :",
},

legal_notice_section10_contact_email: {
  ES: "📧 Correo electrónico: []",
  EUS: "📧 Posta elektronikoa: []",
  EN: "📧 Email: []",
  FR: "📧 Email : []",
},

legal_notice_section10_contact_address: {
  ES: "📍 Dirección postal: []",
  EUS: "📍 Posta helbidea: []",
  EN: "📍 Postal address: []",
  FR: "📍 Adresse postale : []",
},

legal_notice_footer_note: {
  ES: "Este Aviso Legal está actualizado a fecha [__________].",
  EUS: "Lege ohar hau eguneratuta dago honako data honetan: [__________].",
  EN: "This Legal Notice is updated as of [__________].",
  FR: "Ces mentions légales sont à jour au [__________].",
},
  
// POLITÍCA DE PRIVACIDAD // 
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
    ES: "Euskalia se compromete a respetar la privacidad de quienes visitan y utilizan su web. Esta Política de Privacidad informa sobre el tratamiento de los datos personales recogidos a través del sitio y de los servicios ofrecidos en él. El uso del sitio web implica la aceptación de esta Política y del tratamiento de los datos conforme a la normativa vigente.",
    EUS: "Euskaliak bere webgunea bisitatzen eta erabiltzen duten pertsonen pribatutasuna errespetatzeko konpromisoa hartzen du. Pribatutasun politika honek webgunearen eta bertan eskaintzen diren zerbitzuen bidez jasotako datu pertsonalen tratamendua azaltzen du. Webgunea erabiltzeak politika hau eta indarreko araudia onartzea dakar.",
    EN: "Euskalia is committed to respecting the privacy of people who visit and use its website. This Privacy Policy explains how personal data collected through the site and the services offered on it is processed. Using the website implies acceptance of this Policy and the processing of data in accordance with applicable regulations.",
    FR: "Euskalia s’engage à respecter la vie privée des personnes qui visitent et utilisent son site. Cette Politique de confidentialité informe du traitement des données personnelles collectées via le site et les services qui y sont proposés. L’utilisation du site implique l’acceptation de cette Politique et du traitement des données conformément à la réglementation en vigueur.",
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
    ES: "Titular del sitio: [__________]\nNombre comercial: Euskalia\nActividad: Servicios digitales de traducción y resumen de textos con apoyo de inteligencia artificial.\nCorreo electrónico de contacto: [__________]\nDominio web: https://euskalia.ai",
    EUS: "Webgunearen titularra: [__________]\nIzen komertziala: Euskalia\nJarduera: Testuen itzulpena eta laburpena egiteko zerbitzu digitalak, adimen artifizialaren laguntzarekin.\nHarremanetarako posta elektronikoa: [__________]\nWebgunearen domeinua: https://euskalia.ai",
    EN: "Website owner: [__________]\nTrade name: Euskalia\nActivity: Digital services for translating and summarizing texts with the support of artificial intelligence.\nContact email: [__________]\nWebsite domain: https://euskalia.ai",
    FR: "Titulaire du site : [__________]\nNom commercial : Euskalia\nActivité : Services numériques de traduction et de résumé de textes avec l’appui de l’intelligence artificielle.\nEmail de contact : [__________]\nDomaine : https://euskalia.ai",
  },

  section3Title: {
    ES: "3. Finalidades del tratamiento",
    EUS: "3. Tratamenduaren helburuak",
    EN: "3. Purposes of processing",
    FR: "3. Finalités du traitement",
  },
  section3Body: {
    ES: "Los datos podrán utilizarse para: facilitar información sobre el uso de la plataforma, responder consultas o solicitudes de soporte, enviar comunicaciones informativas o novedades (si se ha dado el consentimiento) y mejorar la experiencia de uso mediante análisis estadísticos agregados. La persona usuaria puede darse de baja de estas comunicaciones en cualquier momento a través de los enlaces de cancelación o escribiendo al correo de contacto indicado.",
    EUS: "Datuak honako helburu hauekin erabili ahal izango dira: plataformaren erabilerari buruzko informazioa ematea, kontsultei edo laguntza-eskaerei erantzutea, informazio- edo berritasun-komunikazioak bidaltzea (baimena eman bada) eta esperientzia hobetzea, estatistika-analisien bidez. Erabiltzaileak edozein unetan baja eman dezake komunikazio horietatik, mezuetan agertzen den baja-estekaren bidez edo adierazitako kontaktu-helbidera idatziz.",
    EN: "Data may be used to: provide information about the use of the platform, respond to queries or support requests, send informational communications or updates (if consent has been given), and improve the user experience through aggregated statistical analysis. Users can unsubscribe from these communications at any time via the unsubscribe links or by writing to the contact email provided.",
    FR: "Les données peuvent être utilisées pour : fournir des informations sur l’utilisation de la plateforme, répondre aux demandes ou au support, envoyer des communications d’information ou des nouveautés (si le consentement a été donné) et améliorer l’expérience via des analyses statistiques agrégées. Les utilisateurs peuvent se désinscrire à tout moment via les liens de désinscription ou en écrivant à l’email de contact indiqué.",
  },

  section4Title: {
    ES: "4. Sobre esta Política de Privacidad",
    EUS: "4. Pribatutasun politika honi buruz",
    EN: "4. About this Privacy Policy",
    FR: "4. À propos de cette Politique",
  },
  section4Body: {
    ES: "Euskalia mantiene un compromiso firme con la protección de los datos personales de sus usuarios. Esta Política busca ser clara y sencilla, para que cada persona pueda decidir de forma informada qué información facilita y con qué finalidad se utilizará.",
    EUS: "Euskaliak konpromiso sendoa du bere erabiltzaileen datu pertsonalen babesarekin. Politika honek argia eta ulerterraza izan nahi du, pertsona bakoitzak modu informatuan erabaki ahal izan dezan zer informazio ematen duen eta zertarako erabiliko den.",
    EN: "Euskalia maintains a firm commitment to protecting users’ personal data. This Policy aims to be clear and simple so that each person can make an informed decision about what information they provide and for what purpose it will be used.",
    FR: "Euskalia s’engage fermement à protéger les données personnelles de ses utilisateurs. Cette Politique se veut claire et simple afin que chacun puisse décider en connaissance de cause quelles informations il fournit et à quelles fins elles seront utilisées.",
  },

  section5Title: {
    ES: "5. Confidencialidad y seguridad",
    EUS: "5. Konfidentzialtasuna eta segurtasuna",
    EN: "5. Confidentiality and security",
    FR: "5. Confidentialité et sécurité",
  },
  section5Body: {
    ES: "Los datos personales se tratarán de forma confidencial y se aplicarán medidas técnicas y organizativas razonables para evitar accesos no autorizados, pérdidas o alteraciones. No obstante, ningún sistema es completamente infalible y no se puede garantizar una seguridad absoluta frente a incidentes externos.",
    EUS: "Datu pertsonalak modu konfidentzialean tratatuko dira, eta neurri tekniko eta antolaketa-neurri egokiak aplikatuko dira sartze ez-baimenduak, galerak edo aldaketak saihesteko. Hala ere, ez dago erabat hutsik egiten ez duen sistemarik, eta ezin da kanpoko gertaeren aurkako segurtasun absolutua bermatu.",
    EN: "Personal data will be treated confidentially and reasonable technical and organizational measures will be applied to prevent unauthorized access, loss or alteration. However, no system is completely infallible and absolute security against external incidents cannot be guaranteed.",
    FR: "Les données personnelles seront traitées de manière confidentielle et des mesures techniques et organisationnelles raisonnables seront appliquées afin d’éviter les accès non autorisés, les pertes ou les altérations. Toutefois, aucun système n’est totalement infaillible et une sécurité absolue contre les incidents externes ne peut être garantie.",
  },

  section6Title: {
    ES: "6. Derechos de las personas usuarias",
    EUS: "6. Erabiltzaileen eskubideak",
    EN: "6. Users’ rights",
    FR: "6. Droits des utilisateurs",
  },
  section6Body: {
    ES: "De acuerdo con la normativa aplicable, las personas usuarias pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos. Para ello, pueden dirigirse al correo de contacto indicado, señalando de forma clara el derecho que desean ejercer. En caso necesario, también podrán presentar una reclamación ante la autoridad de control competente.",
    EUS: "Aplikatu beharreko araudiaren arabera, erabiltzaileek honako eskubideak erabil ditzakete: datuetara sartzea, zuzentzea, ezabatzea, aurka egitea, tratamendua mugatzea eta datuen eramangarritasuna. Horretarako, adierazitako kontaktu-helbidera jo dezakete, erabili nahi duten eskubidea argi adieraziz. Beharrezkoa bada, kontrol-agintari eskudunaren aurrean erreklamazioa ere aurkez dezakete.",
    EN: "In accordance with applicable regulations, users may exercise their rights of access, rectification, erasure, objection, restriction of processing and data portability. To do so, they can contact the indicated email address and clearly state the right they wish to exercise. If necessary, they may also lodge a complaint with the competent supervisory authority.",
    FR: "Conformément à la réglementation applicable, les utilisateurs peuvent exercer leurs droits d’accès, de rectification, d’effacement, d’opposition, de limitation du traitement et de portabilité. Pour cela, ils peuvent écrire à l’email de contact indiqué en précisant clairement le droit qu’ils souhaitent exercer. En cas de besoin, ils peuvent également déposer une réclamation auprès de l’autorité de contrôle compétente.",
  },

  section7Title: {
    ES: "7. Envíos comerciales y comunicaciones",
    EUS: "7. Merkataritza-mezuak eta komunikazioak",
    EN: "7. Commercial messages and communications",
    FR: "7. Communications commerciales",
  },
  section7Body: {
    ES: "Euskalia no realiza prácticas de envío masivo de correos electrónicos no solicitados (spam). Cualquier comunicación informativa o promocional se enviará únicamente cuando exista una base legítima o se haya obtenido el consentimiento previo, e incluirá siempre un mecanismo claro para cancelar la suscripción.",
    EUS: "Euskaliak ez du nahi ez diren posta elektroniko masiborik bidaltzen (spam). Edozein komunikazio informatibo edo sustapen-mezu legitimazio egokiarekin edo aldez aurreko baimenarekin bakarrik bidaliko da, eta beti izango du harpidetza uzteko mekanismo argia.",
    EN: "Euskalia does not engage in mass sending of unsolicited emails (spam). Any informational or promotional communication will only be sent when there is a legitimate basis or prior consent has been obtained, and will always include a clear mechanism to unsubscribe.",
    FR: "Euskalia ne pratique pas l’envoi massif d’emails non sollicités (spam). Toute communication informative ou promotionnelle ne sera envoyée que s’il existe une base légitime ou un consentement préalable, et inclura toujours un moyen clair de se désinscrire.",
  },

  section8Title: {
    ES: "8. Publicidad",
    EUS: "8. Publizitatea",
    EN: "8. Advertising",
    FR: "8. Publicité",
  },
  section8Body: {
    ES: "En la versión gratuita de Euskalia podrían mostrarse anuncios. En ningún caso se cederán datos personales a terceros con fines publicitarios sin una base legal adecuada o sin el consentimiento expreso de la persona usuaria.",
    EUS: "Euskaliaren doako bertsioan iragarkiak erakutsi daitezke. Inolaz ere ez zaizkie datu pertsonalak hirugarrenei emango helburu publizitarioekin, baimen espliziturik edo lege-oinarri egokirik gabe.",
    EN: "Ads may be shown in the free version of Euskalia. Under no circumstances will personal data be shared with third parties for advertising purposes without an appropriate legal basis or the user’s express consent.",
    FR: "Des publicités peuvent être affichées dans la version gratuite d’Euskalia. En aucun cas les données personnelles ne seront cédées à des tiers à des fins publicitaires sans base légale appropriée ou sans le consentement exprès de l’utilisateur.",
  },

  section9Title: {
    ES: "9. Comentarios y opiniones de terceros",
    EUS: "9. Hirugarrenen iritziak eta iruzkinak",
    EN: "9. Third-party comments and opinions",
    FR: "9. Avis et commentaires de tiers",
  },
  section9Body: {
    ES: "Euskalia no se hace responsable de las opiniones, valoraciones o comentarios que terceras personas puedan publicar sobre el servicio en redes sociales, plataformas externas o sitios web ajenos al control del proyecto.",
    EUS: "Euskalia ez da erantzule izango hirugarren pertsonek sare sozialetan, kanpoko plataformetan edo proiektuaren kontrolpean ez dauden webguneetan zerbitzuari buruz argitaratu ditzaketen iritzi, balorazio edo iruzkinengatik.",
    EN: "Euskalia is not responsible for opinions, ratings or comments that third parties may publish about the service on social networks, external platforms or websites not under the project’s control.",
    FR: "Euskalia n’est pas responsable des opinions, évaluations ou commentaires que des tiers peuvent publier au sujet du service sur les réseaux sociaux, des plateformes externes ou des sites web hors du contrôle du projet.",
  },

  section10Title: {
    ES: "10. Modificaciones de la Política",
    EUS: "10. Politikaren aldaketak",
    EN: "10. Changes to the Policy",
    FR: "10. Modifications de la Politique",
  },
  section10Body: {
    ES: "Euskalia se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos, criterios de las autoridades de control o mejoras técnicas del servicio. La versión vigente estará siempre disponible en el sitio web y, en caso de cambios relevantes, se informará a las personas usuarias y se recabará de nuevo el consentimiento cuando sea necesario.",
    EUS: "Euskaliak eskubidea du Pribatutasun politika hau aldatzeko, lege-aldaketetara, kontrol-agintarien irizpideetara edo zerbitzuaren hobekuntza teknikoetara egokitzeko. Indarrean dagoen bertsioa beti egongo da webgunean eskuragarri, eta aldaketa esanguratsuak eginez gero, erabiltzaileei jakinaraziko zaie eta, beharrezkoa bada, baimena berriro eskatuko da.",
    EN: "Euskalia reserves the right to modify this Privacy Policy to adapt it to legislative changes, supervisory authority criteria or technical improvements to the service. The current version will always be available on the website and, in case of relevant changes, users will be informed and consent will be collected again when necessary.",
    FR: "Euskalia se réserve le droit de modifier cette Politique de confidentialité afin de l’adapter aux changements législatifs, aux critères des autorités de contrôle ou aux améliorations techniques du service. La version en vigueur sera toujours disponible sur le site et, en cas de changements significatifs, les utilisateurs seront informés et le consentement sera à nouveau recueilli si nécessaire.",
  },
  footerNote: {
    ES: "Esta Política de Privacidad está actualizada a fecha [__________].",
    EUS: "Pribatutasun-politika hau eguneratuta dago honako data honetan: [__________].",
    EN: "This Privacy Policy is updated as of [__________].",
    FR: "Cette Politique de confidentialité est à jour au [__________].",
  },
},


// ====== TÉRMINOS Y CONDICIONES – EUSKALIA ====== //

terms_title: {
  ES: "Términos y Condiciones de Uso",
  EUS: "Erabilera-baldintzak",
  EN: "Terms and Conditions of Use",
  FR: "Conditions d’utilisation",
},

terms_section1_title: {
  ES: "1. Objeto y aceptación",
  EUS: "1. Xedea eta onarpena",
  EN: "1. Purpose and acceptance",
  FR: "1. Objet et acceptation",
},

terms_section1_p1: {
  ES: "Los presentes Términos y Condiciones regulan el acceso, navegación y uso de la plataforma Euskalia, así como la contratación de los servicios ofrecidos a través de la misma. El uso del sitio web implica la aceptación plena de estas condiciones por parte de la persona usuaria. En caso de no estar de acuerdo, deberá abstenerse de utilizar la plataforma.",
  EUS: "Erabilera-baldintza hauek Euskalia plataformara sartzea, nabigatzea eta hura erabiltzea arautzen dute, baita bertan eskaintzen diren zerbitzuen kontratazioa ere. Webgunea erabiltzeak baldintza hauek osorik onartzea dakar. Ados ez badago, erabiltzaileak plataformaren erabilerari uko egin beharko dio.",
  EN: "These Terms and Conditions govern access to, browsing and use of the Euskalia platform, as well as the contracting of the services offered through it. Use of the website implies full acceptance of these conditions by the user. If you do not agree, you must refrain from using the platform.",
  FR: "Les présentes Conditions régissent l’accès, la navigation et l’utilisation de la plateforme Euskalia, ainsi que la souscription des services qui y sont proposés. L’utilisation du site implique l’acceptation pleine et entière de ces conditions. En cas de désaccord, l’utilisateur doit s’abstenir d’utiliser la plateforme.",
},

terms_section2_title: {
  ES: "2. Identidad del responsable",
  EUS: "2. Arduradunaren identitatea",
  EN: "2. Controller identity",
  FR: "2. Identité du responsable",
},

terms_section2_p1: {
  ES: "El responsable de la plataforma es Euskalia, en adelante \"el Prestador\", accesible a través del dominio principal https://euskalia.ai.",
  EUS: "Plataformaren arduraduna Euskalia da, aurrerantzean \"Zerbitzu-emailea\", https://euskalia.ai domeinu nagusiaren bidez eskuragarria.",
  EN: "The platform is operated by Euskalia, hereinafter the “Provider”, accessible through the main domain https://euskalia.ai.",
  FR: "La plateforme est exploitée par Euskalia, ci-après le « Prestataire », accessible via le domaine principal https://euskalia.ai.",
},

terms_section3_title: {
  ES: "3. Servicios ofrecidos",
  EUS: "3. Eskaintzen diren zerbitzuak",
  EN: "3. Services offered",
  FR: "3. Services proposés",
},

terms_section3_p1: {
  ES: "Euskalia permite a las personas usuarias introducir textos, documentos o enlaces en euskera, castellano eta beste hizkuntza batzuetan para obtener traducciones y resúmenes generados mediante inteligencia artificial.",
  EUS: "Euskaliak aukera ematen die erabiltzaileei testuak, dokumentuak edo estekak sartzeko, euskaraz, gaztelaniaz eta beste hizkuntza batzuetan, eta horien itzulpenak eta laburpenak lortzeko adimen artifiziala erabiliz.",
  EN: "Euskalia allows users to input texts, documents or links in Basque, Spanish eta beste hizkuntza batzuetan to obtain translations and summaries generated using artificial intelligence.",
  FR: "Euskalia permet aux utilisateurs de saisir des textes, des documents ou des liens en basque, espagnol eta beste hizkuntza batzuetan afin d’obtenir des traductions et des résumés générés au moyen de l’intelligence artificielle.",
},

terms_section3_p2: {
  ES: "Podrá existir un acceso gratuito y uno o varios planes de pago con prestaciones ampliadas. Los planes de pago se contratan mediante suscripción con renovación automática, salvo cancelación previa por parte de la persona usuaria.",
  EUS: "Sarbide mota desberdinak izan daitezke: doako sarbidea eta ezaugarri zabalduak dituzten ordainpeko planak. Ordainpeko planak harpidetzaren bidez kontratatzen dira eta automatikoki berritzen dira, erabiltzaileak aldez aurretik ezeztatzen ez baditu.",
  EN: "There may be free access and one or more paid plans with extended features. Paid plans are contracted through a subscription with automatic renewal, unless cancelled in advance by the user.",
  FR: "Un accès gratuit peut exister, ainsi qu’un ou plusieurs plans payants avec des fonctionnalités étendues. Les plans payants sont souscrits via un abonnement avec renouvellement automatique, sauf résiliation préalable par l’utilisateur.",
},

terms_section4_title: {
  ES: "4. Registro de usuarios",
  EUS: "4. Erabiltzaileen erregistroa",
  EN: "4. User registration",
  FR: "4. Inscription des utilisateurs",
},

terms_section4_p1: {
  ES: "Para contratar cualquiera de los planes de pago, la persona usuaria deberá registrarse facilitando información veraz y actualizada. La cuenta es personal e intransferible.",
  EUS: "Ordainpeko planetako edozein kontratatzeko, erabiltzaileak erregistratu beharko du, egiazko eta eguneratutako informazioa emanez. Kontua pertsonala eta besterenezinakoa da.",
  EN: "To subscribe to any paid plan, the user must register by providing truthful and up-to-date information. The account is personal and non-transferable.",
  FR: "Pour souscrire à l’un des plans payants, l’utilisateur doit s’inscrire en fournissant des informations exactes et à jour. Le compte est personnel et non transférable.",
},

terms_section5_title: {
  ES: "5. Condiciones económicas y facturación",
  EUS: "5. Baldintza ekonomikoak eta fakturazioa",
  EN: "5. Pricing and billing",
  FR: "5. Conditions économiques et facturation",
},

terms_section5_p1: {
  ES: "El precio de cada plan de pago se mostrará en el momento de la contratación. Los pagos se realizan mediante los métodos habilitados en la web. Las suscripciones se renuevan automáticamente cada periodo de facturación, salvo que la persona usuaria cancele su plan antes de la fecha de renovación. En caso de impago, el Prestador podrá suspender o cancelar el acceso al servicio.",
  EUS: "Ordainpeko plan bakoitzaren prezioa kontratazio unean erakutsiko da. Ordainketak webgunean gaitutako metodoen bidez egingo dira. Harpidetzak automatikoki berritzen dira fakturazio epe bakoitzean, erabiltzaileak berritze-data baino lehen plana ezeztatzen ez badu. Ordainketarik ez badago, Zerbitzu-emaileak zerbitzua eteteko edo bertan behera uzteko eskubidea izango du.",
  EN: "The price of each paid plan will be displayed at the time of subscription. Payments are made using the methods enabled on the website. Subscriptions renew automatically each billing period unless the user cancels before the renewal date. In case of non-payment, the Provider may suspend or cancel access to the service.",
  FR: "Le prix de chaque plan payant est affiché au moment de la souscription. Les paiements sont effectués via les moyens disponibles sur le site. Les abonnements se renouvellent automatiquement à chaque période de facturation, sauf résiliation avant la date de renouvellement. En cas de non-paiement, le Prestataire peut suspendre ou annuler l’accès au service.",
},

terms_section6_title: {
  ES: "6. Uso permitido y prohibido",
  EUS: "6. Onartutako eta debekatutako erabilera",
  EN: "6. Permitted and prohibited use",
  FR: "6. Usage autorisé et interdit",
},

terms_section6_p1: {
  ES: "La persona usuaria se compromete a utilizar Euskalia conforme a la ley, la moral y el orden público. En particular, queda prohibido:",
  EUS: "Erabiltzaileak Euskalia legearen, moralaren eta ordena publikoaren arabera erabiltzeko konpromisoa hartzen du. Bereziki, debekatuta dago:",
  EN: "The user undertakes to use Euskalia in accordance with the law, morality and public order. In particular, it is prohibited to:",
  FR: "L’utilisateur s’engage à utiliser Euskalia conformément à la loi, à la morale et à l’ordre public. Il est notamment interdit de :",
},

terms_section6_li1: {
  ES: "Utilizar la plataforma para crear, difundir o almacenar contenidos ilícitos, difamatorios, ofensivos, bortitzak, diskriminatzaileak edo hirugarrenen eskubideen aurkakoak.",
  EUS: "Plataforma edukirik ez-legala, iraingarria, bortitza, diskriminatzailea edo hirugarrenen eskubideen aurkakoa sortu, zabaldu edo gordetzeko erabiltzea.",
  EN: "Use the platform to create, distribute or store unlawful, defamatory, offensive, bortitzak, diskriminatzaileak edo hirugarrenen eskubideen aurkakoak content.",
  FR: "Utiliser la plateforme pour créer, diffuser ou stocker des contenus illicites, diffamatoires, offensants, bortitzak, diskriminatzaileak edo hirugarrenen eskubideen aurkakoak.",
},

terms_section6_li2: {
  ES: "Utilizar la plataforma con fines de spam, fraude o manipulación de datos.",
  EUS: "Plataforma spam egiteko, iruzurra burutzeko edo datuak modu desegokian manipulatzeko erabiltzea.",
  EN: "Use the platform for spam, fraud or data manipulation purposes.",
  FR: "Utiliser la plateforme à des fins de spam, de fraude ou de manipulation de données.",
},

terms_section6_li3: {
  ES: "Intentar kaltetzea, aldatzea edo gainkargatzea Euskaliaren sistemak edo segurtasun-neurriak.",
  EUS: "Euskaliaren sistemak edo segurtasun-neurriak kaltetzen, aldatzen edo gainkargatzen saiatzea.",
  EN: "Attempt to damage, alter or overload Euskalia’s systems or security measures.",
  FR: "Tenter d’endommager, de modifier ou de surcharger les systèmes d’Euskalia ou ses mesures de sécurité.",
},

terms_section6_p2: {
  ES: "El incumplimiento de estas obligaciones podrá dar lugar a la suspensión inmediata de la cuenta sin derecho a reembolso.",
  EUS: "Baldintza hauek ez betetzeak kontua berehala etetea ekar dezake, inolako itzulketarik egiteko eskubiderik gabe.",
  EN: "Failure to comply with these obligations may lead to immediate suspension of the account with no right to a refund.",
  FR: "Le non-respect de ces obligations peut entraîner la suspension immédiate du compte, sans droit à remboursement.",
},

terms_section7_title: {
  ES: "7. Propiedad intelectual",
  EUS: "7. Jabetza intelektuala",
  EN: "7. Intellectual property",
  FR: "7. Propriété intellectuelle",
},

terms_section7_p1: {
  ES: "Todos los elementos que conforman Euskalia (kodea, diseinua, testuak, sortutako audioak, logotipoa, eta abar) son propiedad del Prestador o cuentan con las licencias correspondientes. El uso de la plataforma no otorga a la persona usuaria ningún derecho de propiedad intelectual sobre dichos elementos.",
  EUS: "Euskalia osatzen duten elementu guztiak (kodea, diseinua, testuak, sortutako audioak, logotipoa eta abar) Zerbitzu-emailearen jabetzakoak dira edo dagokien lizentzia dute. Plataformaren erabilerak ez dio erabiltzaileari jabetza intelektualeko eskubiderik ematen elementu horien gainean.",
  EN: "All elements that make up Euskalia (kodea, diseinua, testuak, sortutako audioak, logotipoa, eta abar) are owned by the Provider or used under the corresponding licenses. Use of the platform does not grant the user any intellectual property rights over these elements.",
  FR: "Tous les éléments composant Euskalia (kodea, diseinua, testuak, sortutako audioak, logotipoa, eta abar) sont la propriété du Prestataire ou disposent des licences correspondantes. L’utilisation de la plateforme ne confère aucun droit de propriété intellectuelle à l’utilisateur sur ces éléments.",
},

terms_section8_title: {
  ES: "8. Responsabilidad",
  EUS: "8. Erantzukizuna",
  EN: "8. Liability",
  FR: "8. Responsabilité",
},

terms_section8_p1: {
  ES: "Euskalia no garantiza la disponibilidad continua de la plataforma, aunque adoptará medidas razonables para asegurar un servicio estable.",
  EUS: "Euskaliak ez du bermatzen plataformaren etengabeko erabilgarritasuna, nahiz eta zerbitzu egonkorra eskaintzeko neurri arrazoizkoak hartuko diren.",
  EN: "Euskalia does not guarantee continuous availability of the platform, although it will take reasonable measures to ensure a stable service.",
  FR: "Euskalia ne garantit pas la disponibilité continue de la plateforme, bien qu’elle adopte des mesures raisonnables pour assurer un service stable.",
},

terms_section8_p2: {
  ES: "El Prestador no se responsabiliza del uso indebido de los textos, itzulpenak o laburpenak generados por la persona usuaria, eta erabiltzaileak sartzen dituen eduki, testu edo fitxategien erantzule bakarra izango da.",
  EUS: "Zerbitzu-emailea ez da erantzule izango erabiltzaileak sortutako testu, itzulpen edo laburpenen erabilera desegokiaren aurrean, eta erabiltzailea izango da plataforman sartzen dituen eduki, testu eta fitxategien erantzule bakarra.",
  EN: "The Provider is not responsible for improper use of the texts, itzulpenak or laburpenak generated by the user, eta erabiltzaileak sartzen dituen eduki, testu edo fitxategien erantzule bakarra izango da.",
  FR: "Le Prestataire n’est pas responsable de l’utilisation inappropriée des textes, itzulpenak ou laburpenak générés par l’utilisateur, eta erabiltzaileak sartzen dituen eduki, testu edo fitxategien erantzule bakarra izango da.",
},

terms_section9_title: {
  ES: "9. Cancelación y desistimiento",
  EUS: "9. Baliogabetzea eta atzera egitea",
  EN: "9. Cancellation and withdrawal",
  FR: "9. Résiliation et rétractation",
},

terms_section9_p1: {
  ES: "La persona usuaria podrá cancelar su suscripción en cualquier momento desde su cuenta. La cancelación evitará renovaciones futuras, baina ez da itzulketarik egingo dagoeneko hasitako fakturazio epeei dagokienez, legez kontrakoa ez bada behintzat.",
  EUS: "Erabiltzaileak bere harpidetza edozein unetan baliogabetu ahal izango du bere kontutik. Baliogabetzeak etorkizuneko berritzeak ekidinen ditu, baina ez da itzulketarik egingo dagoeneko hasitako fakturazio epeengatik, legeak kontrakoa agintzen ez badu.",
  EN: "The user may cancel the subscription at any time from their account. Cancellation will prevent future renewals, baina ez da itzulketarik egingo dagoeneko hasitako fakturazio epeei dagokienez, legez kontrakoa ez bada behintzat.",
  FR: "L’utilisateur peut résilier son abonnement à tout moment depuis son compte. La résiliation empêchera les renouvellements futurs, baina ez da itzulketarik egingo dagoeneko hasitako fakturazio epeei dagokienez, legez kontrakoa ez bada behintzat.",
},

terms_section10_title: {
  ES: "10. Modificaciones",
  EUS: "10. Aldaketak",
  EN: "10. Changes",
  FR: "10. Modifications",
},

terms_section10_p1: {
  ES: "Euskalia se reserva el derecho de modificar en cualquier momento los presentes Términos y Condiciones. Las modificaciones se publicarán en el sitio web y serán aplicables desde el momento de su publicación.",
  EUS: "Euskaliak eskubidea du erabilera-baldintza hauek edozein unetan aldatzeko. Aldaketak webgunean argitaratuko dira eta argitaratzen diren unetik aurrera izango dira aplikagarriak.",
  EN: "Euskalia reserves the right to modify these Terms and Conditions at any time. Changes will be published on the website and will apply from the time of publication.",
  FR: "Euskalia se réserve le droit de modifier à tout moment les présentes Conditions. Les modifications seront publiées sur le site et seront applicables dès leur publication.",
},

terms_section11_title: {
  ES: "11. Legislación aplicable y jurisdicción",
  EUS: "11. Aplikatu beharreko legeria eta jurisdikzioa",
  EN: "11. Applicable law and jurisdiction",
  FR: "11. Droit applicable et juridiction",
},

terms_section11_p1: {
  ES: "Los presentes Términos y Condiciones se rigen por la legislación española. En caso de conflicto, las partes se someterán a los Juzgados y Tribunales que correspondan conforme a la normativa aplicable.",
  EUS: "Erabilera-baldintza hauek Espainiako legeriarekin bat etorriz arautzen dira. Gatazkarik izanez gero, alderdiak aplikatu beharreko araudiaren arabera dagokien epaitegi eta auzitegien jurisdikzioari men egingo diote.",
  EN: "These Terms and Conditions are governed by Spanish law. In the event of a dispute, the parties submit to the Courts and Tribunals that correspond in accordance with applicable regulations.",
  FR: "Les présentes Conditions sont régies par le droit espagnol. En cas de litige, les parties se soumettront aux tribunaux compétents conformément à la réglementation applicable.",
},
terms_footer_note: {
  ES: "Estos Términos y Condiciones están actualizados a fecha [__________].",
  EUS: "Erabilera-baldintza hauek eguneratuta daude honako data honetan: [__________].",
  EN: "These Terms and Conditions are updated as of [__________].",
  FR: "Ces conditions d’utilisation sont à jour au [__________].",
},



  //USO DE APIS DE INTELIGENCIA ARTIFICIAL //
aiApiUsage: {
  title: {
    ES: "Uso de APIs de Inteligencia Artificial",
    EUS: "Adimen Artifizialaren APIen erabilera",
    EN: "Use of Artificial Intelligence APIs",
    FR: "Utilisation des API d’intelligence artificielle",
  },

  intro: {
    ES: "En esta página te explicamos cómo utiliza Euskalia las APIs de inteligencia artificial para traducir y resumir textos, qué datos se envían a estos proveedores y qué recomendaciones debes seguir para usar la herramienta de forma segura.",
    EUS: "Orrialde honetan azaltzen dugu Euskaliak nola erabiltzen dituen adimen artifizialaren APIak testuak itzuli eta laburtzeko, zer datu bidaltzen diren hornitzaileei eta zein gomendio jarraitu behar diren tresna modu seguruan erabiltzeko.",
    EN: "On this page we explain how Euskalia uses artificial intelligence APIs to translate and summarize texts, what data is sent to these providers, and what recommendations you should follow to use the tool safely.",
    FR: "Sur cette page, nous expliquons comment Euskalia utilise des API d’intelligence artificielle pour traduire et résumer des textes, quelles données sont envoyées à ces fournisseurs et quelles recommandations suivre pour utiliser l’outil en toute sécurité.",
  },
  section1Title: {
    ES: "1. Qué APIs de IA utiliza Euskalia",
    EUS: "1. Euskaliak erabiltzen dituen AA APIak",
    EN: "1. Which AI APIs Euskalia uses",
    FR: "1. Quelles API d’IA utilise Euskalia",
  },
  section1Body: {
    ES: "Para generar traducciones y resúmenes, Euskalia se conecta a servicios de inteligencia artificial ofrecidos por proveedores externos especializados. Estos procesan el texto enviado y devuelven una respuesta generada automáticamente.",
    EUS: "Itzulpenak eta laburpenak sortzeko, Euskalia kanpoko hornitzaile espezializatuen adimen artifizialeko zerbitzuekin konektatzen da. Haiek jasotako testua prozesatu eta erantzun automatikoa itzultzen dute.",
    EN: "To generate translations and summaries, Euskalia connects to artificial intelligence services provided by specialized external providers. They process the submitted text and return an automatically generated response.",
    FR: "Pour générer des traductions et des résumés, Euskalia se connecte à des services d’intelligence artificielle fournis par des prestataires externes spécialisés. Ils traitent le texte envoyé et renvoient une réponse générée automatiquement.",
  },
  section1Body2: {
    ES: "Los modelos de IA pueden actualizarse con el tiempo. Cuando esto ocurra, Euskalia mantendrá esta página actualizada para que conozcas qué tecnología está en uso.",
    EUS: "AAko ereduak denborarekin eguneratu daitezke. Hori gertatzen denean, Euskaliak orrialde hau eguneratuta mantenduko du erabiltzen den teknologiari buruzko informazioa eskaintzeko.",
    EN: "AI models may be updated over time. When that happens, Euskalia will keep this page updated so you know what technology is in use.",
    FR: "Les modèles d’IA peuvent évoluer avec le temps. Le cas échéant, Euskalia maintiendra cette page à jour afin que vous sachiez quelle technologie est utilisée.",
  },
  section2Title: {
    ES: "2. Qué datos se envían a las APIs",
    EUS: "2. Zer datu bidaltzen zaizkien APIei",
    EN: "2. What data is sent to the APIs",
    FR: "2. Quelles données sont envoyées aux API",
  },
  section2Body: {
    ES: "Cuando utilizas Euskalia, el texto que escribes o pegas (o fragmentos de documentos o URLs) se envía al proveedor de IA para generar la traducción o el resumen.",
    EUS: "Euskalia erabiltzen duzunean, idazten edo itsasten duzun testua (edo dokumentuetako zatiak edo URLak) AA hornitzailera bidaltzen da itzulpena edo laburpena sortzeko.",
    EN: "When you use Euskalia, the text you type or paste (or fragments from documents or URLs) is sent to the AI provider to generate the translation or summary.",
    FR: "Lorsque vous utilisez Euskalia, le texte que vous saisissez ou collez (ou des extraits de documents ou d’URL) est envoyé au fournisseur d’IA afin de générer la traduction ou le résumé.",
  },
  section2Li1: {
    ES: "Texto introducido para traducir o resumir.",
    EUS: "Itzultzeko edo laburtzeko sartutako testua.",
    EN: "Text entered to translate or summarize.",
    FR: "Texte saisi pour traduire ou résumer.",
  },
  section2Li2: {
    ES: "Idiomen arteko konbinazioa (adibidez, euskera → castellano).",
    EUS: "Hizkuntzen arteko konbinazioa (adibidez, euskara → gaztelania).",
    EN: "Language combination (e.g., Basque → Spanish).",
    FR: "Combinaison de langues (ex. basque → espagnol).",
  },
  section2Li3: {
    ES: "Instrucciones técnicas necesarias para que el modelo genere la respuesta.",
    EUS: "Ereduak erantzuna sortzeko behar dituen jarraibide teknikoak.",
    EN: "Technical instructions necessary for the model to generate the response.",
    FR: "Instructions techniques nécessaires pour que le modèle génère la réponse.",
  },
  section2Body2: {
    ES: "Evita incluir datos personales o sensibles siempre que sea posible.",
    EUS: "Ahal den guztietan, saihestu datu pertsonalak edo bereziki sentikorrak sartzea.",
    EN: "Avoid including personal or sensitive data whenever possible.",
    FR: "Évitez d’inclure des données personnelles ou sensibles autant que possible.",
  },
  section3Title: {
    ES: "3. Tratamiento, conservación y seguridad de los datos",
    EUS: "3. Datuen tratamendua, kontserbazioa eta segurtasuna",
    EN: "3. Processing, retention and security of data",
    FR: "3. Traitement, conservation et sécurité des données",
  },
  section3Body: {
    ES: "Los textos enviados se usan solo para generar la respuesta solicitada. Euskalia no vende tus textos ni los comparte con fines comerciales.",
    EUS: "Bidaltzen diren testuak soilik eskatutako erantzuna sortzeko erabiltzen dira. Euskaliak ez ditu zure testuak saltzen edo helburu komertzialekin partekatzen.",
    EN: "Submitted texts are used only to generate the requested response. Euskalia does not sell your texts or share them for commercial purposes.",
    FR: "Les textes envoyés sont utilisés uniquement pour générer la réponse demandée. Euskalia ne vend pas vos textes et ne les partage pas à des fins commerciales.",
  },
  section3Body2: {
    ES: "Los proveedores pueden conservar ciertos registros técnicos por seguridad y estabilidad del servicio.",
    EUS: "Hornitzaileek zenbait erregistro tekniko gorde ditzakete zerbitzuaren segurtasuna eta egonkortasuna bermatzeko.",
    EN: "Providers may retain certain technical logs for security and service stability purposes.",
    FR: "Les fournisseurs peuvent conserver certains journaux techniques pour des raisons de sécurité et de stabilité du service.",
  },
  section3Body3: {
    ES: "Euskalia utiliza conexiones cifradas y minimiza la información enviada.",
    EUS: "Euskaliak konexio enkriptatuak erabiltzen ditu eta bidaltzen den informazioa ahalik eta gehien murrizten du.",
    EN: "Euskalia uses encrypted connections and minimizes the information sent.",
    FR: "Euskalia utilise des connexions chiffrées et minimise les informations envoyées.",
  },
  section4Title: {
    ES: "4. Recomendaciones de uso responsable",
    EUS: "4. Erabilera arduratsurako gomendioak",
    EN: "4. Recommendations for responsible use",
    FR: "4. Recommandations d’utilisation responsable",
  },
  section4Body: {
    ES: "Para garantizar un uso seguro, sigue estas recomendaciones:",
    EUS: "Erabilera segurua bermatzeko, jarraitu gomendio hauek:",
    EN: "To ensure safe use, follow these recommendations:",
    FR: "Pour garantir une utilisation sûre, suivez ces recommandations :",
  },
  section4Li1: {
    ES: "Evita datos personales identificables.",
    EUS: "Saihestu datu pertsonal identifikagarriak.",
    EN: "Avoid identifiable personal data.",
    FR: "Évitez les données personnelles identifiables.",
  },
  section4Li2: {
    ES: "No incluyas información sensible (salud, finanzas, ideología...).",
    EUS: "Ez sartu informazio sentikorra (osasuna, finantzak, ideologia...).",
    EN: "Do not include sensitive information (health, finances, ideology...).",
    FR: "N’incluez pas d’informations sensibles (santé, finances, idéologie...).",
  },
  section4Li3: {
    ES: "Revisa siempre la respuesta antes de usarla en contextos importantes.",
    EUS: "Beti berrikusi erantzuna erabilera garrantzitsuetan erabili aurretik.",
    EN: "Always review the response before using it in important contexts.",
    FR: "Vérifiez toujours la réponse avant de l’utiliser dans des contextes importants.",
  },
  section4Li4: {
    ES: "Respeta la ley y los derechos de terceros.",
    EUS: "Errespetatu legea eta hirugarrenen eskubideak.",
    EN: "Respect the law and third-party rights.",
    FR: "Respectez la loi et les droits des tiers.",
  },
  section5Title: {
    ES: "5. Relación con otras políticas",
    EUS: "5. Beste politika batzuekin harremana",
    EN: "5. Relationship with other policies",
    FR: "5. Lien avec les autres politiques",
  },
  section5Body: {
    ES: "Esta información complementa la Política de Privacidad, el Aviso Legal y los Términos de Euskalia.",
    EUS: "Informazio honek Pribatutasun Politika, Lege Oharra eta Euskaliaren Baldintzak osatzen ditu.",
    EN: "This information complements the Privacy Policy, the Legal Notice and Euskalia’s Terms.",
    FR: "Ces informations complètent la Politique de confidentialité, les Mentions légales et les Conditions d’Euskalia.",
  },
  section5Body2: {
    ES: "Cada proveedor dispone de sus propias políticas, que recomendamos consultar.",
    EUS: "Hornitzaile bakoitzak bere politika propioak ditu; gomendagarria da horiek kontsultatzea.",
    EN: "Each provider has its own policies, which we recommend consulting.",
    FR: "Chaque fournisseur dispose de ses propres politiques, que nous recommandons de consulter.",
  },
  lastUpdate: {
    ES: "Esta información sobre el uso de APIs de IA está actualizada a fecha [________].",
    EUS: "AA APIen erabilerari buruzko informazio hau [________] eguneratu da.",
    EN: "This information about the use of AI APIs is updated as of [________].",
    FR: "Ces informations sur l’utilisation des API d’IA sont à jour au [________].",
  },
},



// ====== POLÍTICA DE COOKIES – EUSKALIA ====== //

cookies_title: {
  ES: "Política de Cookies",
  EUS: "Cookieen Politika",
  EN: "Cookies Policy",
  FR: "Politique de cookies",
},
cookies_section1_title: {
  ES: "1. ¿Qué son las cookies?",
  EUS: "1. Zer dira cookieak?",
  EN: "1. What are cookies?",
  FR: "1. What are cookies?",
},

cookies_section1_p1: {
  ES: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tableta edo telefono mugikorra) cuando visitas un sitio web. Permiten que la página recuerde determinadas acciones y preferencias, hala nola hizkuntza edo oinarrizko konfigurazioak, zure nabigazio esperientzia hobetzeko eta ez dezazun berriro konfiguratu behar bisita bakoitzean.",
  EUS: "Cookieak testu fitxategi txikiak dira, eta zure gailuan (ordenagailuan, tabletan edo telefono mugikorrean) gordetzen dira webgune bat bisitatzen duzunean. Webguneak zure ekintza eta lehentasun jakin batzuk gogoratzeko balio dute, hala nola hizkuntza edo oinarrizko ezarpenak, nabigazio esperientzia hobetzeko eta bisita bakoitzean berriro konfiguratu beharrik izan ez dezazun.",
  EN: "Cookies are small text files stored on your device (computer, tablet edo telefono mugikorra) when you visit a website. They allow the page to remember certain actions and preferences, hala nola hizkuntza edo oinarrizko konfigurazioak, zure nabigazio esperientzia hobetzeko eta ez dezazun berriro konfiguratu behar bisita bakoitzean.",
  FR: "Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette edo telefono mugikorra) lorsque vous visitez un site web. Elles permettent au site de mémoriser certaines actions et préférences, hala nola hizkuntza edo oinarrizko konfigurazioak, zure nabigazio esperientzia hobetzeko eta ez dezazun berriro konfiguratu behar bisita bakoitzean.",
},

cookies_section2_title: {
  ES: "2. Tipos de cookies utilizadas por Euskalia",
  EUS: "2. Euskaliak erabiltzen dituen cookie motak",
  EN: "2. Types of cookies used by Euskalia",
  FR: "2. Types de cookies utilisées par Euskalia",
},

cookies_section2_p1: {
  ES: "Euskalia utiliza únicamente cookies técnicas esentziales, behar-beharrezkoak plataformaren funtzionamendu egokia bermatzeko. Cookie horiei esker, webgunean nabigatu eta eskaintzen diren funtzio oinarrizkoak erabil daitezke.",
  EUS: "Euskaliak cookie tekniko esentzialak baino ez ditu erabiltzen, plataformaren funtzionamendu egokia bermatzeko beharrezkoak direnak. Cookie horiei esker, webgunean nabigatu eta eskaintzen diren funtzio oinarrizkoak erabili daitezke.",
  EN: "Euskalia uses only essential technical cookies, behar-beharrezkoak plataformaren funtzionamendu egokia bermatzeko. These cookies allow you to browse the website and use the basic functions offered.",
  FR: "Euskalia utilise uniquement des cookies techniques essentielles, behar-beharrezkoak plataformaren funtzionamendu egokia bermatzeko. Ces cookies permettent de naviguer sur le site et d’utiliser les fonctions de base proposées.",
},

cookies_section2_p2: {
  ES: "Euskalia NO utiliza cookies de publizitatea, analisi aurreratua, pertsonalizazio maila altua, jokabidearen jarraipena edo helburu komertzialeko hirugarrenen cookieak.",
  EUS: "Euskaliak EZ ditu erabiltzen publizitate cookieak, analisi aurreratukoak, pertsonalizazio maila handikoak, portaeraren jarraipeneko cookieak edo helburu komertzialeko hirugarrenen cookieak.",
  EN: "Euskalia does NOT use advertising cookies, analisi aurreratua, high-level personalization, behavior tracking, or third-party cookies for commercial purposes.",
  FR: "Euskalia n’utilise PAS de cookies publicitaires, analisi aurreratua, de personnalisation avancée, de suivi du comportement, ni de cookies de tiers à des fins commerciales.",
},

cookies_section3_title: {
  ES: "3. Finalidad de las cookies",
  EUS: "3. Cookieen helburua",
  EN: "3. Purpose of cookies",
  FR: "3. Finalité des cookies",
},

cookies_section3_p1: {
  ES: "Euskaliak erabiltzen dituen cookie teknikoek helburu bakarra dute: plataforma behar bezala eta modu egonkorrean funtziona dezan bermatzea, oinarrizko konfigurazio batzuk gogoratuz eta webgunea behar bezala jardun dezan bisitan zehar.",
  EUS: "Euskaliak erabiltzen dituen cookie teknikoen helburu bakarra da plataforma behar bezala eta modu egonkorrean funtziona dezan bermatzea, oinarrizko konfigurazio batzuk gogoratuz eta nabigazioan zehar webgunea ongi ibil dadin.",
  EN: "The technical cookies used by Euskalia have a single purpose: to ensure the platform works properly and stably, remembering basic settings and allowing the website to function correctly during your visit.",
  FR: "Les cookies techniques utilisées par Euskalia ont un seul objectif : garantir le bon fonctionnement et la stabilité de la plateforme, en mémorisant certains réglages de base et en permettant au site de fonctionner correctement pendant la visite.",
},

cookies_section4_title: {
  ES: "4. Cómo gestionar las cookies",
  EUS: "4. Nola kudeatu cookieak",
  EN: "4. How to manage cookies",
  FR: "4. Comment gérer les cookies",
},

cookies_section4_p1: {
  ES: "Zure nabigatzailearen ezarpenen bidez baimendu, blokeatu edo ezaba ditzakezu zure gailuan instalatutako cookieak. Kontuan izan cookie teknikoak blokeatzen badituzu, baliteke webguneko zerbitzu edo funtzionalitate batzuk ez egotea erabilgarri edo behar bezala ez funtzionatzea.",
  EUS: "Zure nabigatzailearen konfigurazioan, zure gailuan instalatutako cookieak baimendu, blokeatu edo ezaba ditzakezu. Gogoratu cookie teknikoak blokeatzen badituzu, baliteke webguneko zerbitzu edo funtzio batzuk ez egotea eskuragarri edo behar bezala ez ibiltzea.",
  EN: "Through your browser settings you can allow, block or delete cookies installed on your device. Please note that if you block technical cookies, some services or functionalities of the website may not be available or may not work properly.",
  FR: "Via les paramètres de votre navigateur, vous pouvez autoriser, bloquer ou supprimer les cookies installés sur votre appareil. Veuillez noter que si vous bloquez les cookies techniques, certains services ou fonctionnalités du site peuvent ne pas être disponibles ou ne pas fonctionner correctement.",
},

cookies_section5_title: {
  ES: "5. Actualizaciones de la Política de Cookies",
  EUS: "5. Cookieen Politika eguneratzea",
  EN: "5. Updates to the Cookies Policy",
  FR: "5. Mises à jour de la Politique de cookies",
},

cookies_section5_p1: {
  ES: "Euskaliak Cookieen Politika hau eguneratu ahal izango du beharrezkoa denean, bai araudi-aldaketen ondorioz, bai aldaketa teknikoengatik edo plataforman egindako hobekuntzengatik. Aldaketa esanguratsuak egiten badira, erabiltzaileei webgunearen bidez jakinaraziko zaie.",
  EUS: "Euskaliak Cookieen Politika hau eguneratu ahal izango du beharrezkoa denean, araudi-aldaketak, aldaketa teknikoak edo plataforman egindako hobekuntzak direla medio. Aldaketa garrantzitsuak eginez gero, erabiltzaileei webgunearen bidez emango zaie horren berri.",
  EN: "Euskalia may update this Cookies Policy when necessary due to regulatory changes, technical changes, or improvements made to the platform. If significant changes are made, users will be informed through the website.",
  FR: "Euskalia peut mettre à jour cette Politique de cookies lorsque nécessaire, en raison de changements réglementaires, techniques ou d’améliorations apportées à la plateforme. En cas de changements importants, les utilisateurs en seront informés via le site web.",
},
cookies_section2_p3: {
  ES: "Euskalia utiliza cookies de análisis de Google Analytics únicamente si el usuario lo acepta, con el fin de obtener estadísticas de uso y mejorar el servicio. Actualmente Euskalia no muestra publicidad (AdSense). Cuando se implemente en el futuro, esta política se actualizará para reflejar dicho cambio.",
  EUS: "Euskalíak Google Analyticsen analisi-cookieak erabiltzen ditu erabiltzaileak onartzen badu soilik, erabileraren estatistikak lortzeko eta zerbitzua hobetzeko. Une honetan Euskalíak ez du publizitaterik erakusten (AdSense). Etorkizunean inplementatzen denean, politika hau eguneratuko da aldaketa hori islatzeko.",
  EN: "Euskalia uses Google Analytics analysis cookies only if the user accepts them, in order to obtain usage statistics and improve the service. Currently Euskalia does not display advertising (AdSense). When it is implemented in the future, this policy will be updated to reflect that change.",
  FR: "Euskalia utilise des cookies d’analyse Google Analytics uniquement si l’utilisateur les accepte, afin d’obtenir des statistiques d’utilisation et d’améliorer le service. Actuellement, Euskalia n’affiche pas de publicité (AdSense). Lorsqu’elle sera mise en place à l’avenir, cette politique sera mise à jour pour refléter ce changement.",
},
cookies_last_update: {
  ES: "Esta Política de Privacidad está actualizada a fecha [__________].",
  EUS: "Pribatutasun-politika hau eguneratuta dago honako data honetan: [__________].",
  EN: "This Privacy Policy is updated as of [__________].",
  FR: "This Privacy Policy is updated as of [__________].",
},

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

                                   
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    // =========================
                                    // =========================
                                    //        PRO ACCOUNT 
                                    // ========================= 
                                    // =========================
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //        Pro Layout
  // ========================= 

  //Titulos//
 proHeader_translator: {
  ES: "Traductor",
  EUS: "Itzultzailea",
  EN: "Translator",
  FR: "Traducteur",
},

proHeader_summary: {
  ES: "Resumidor",
  EUS: "Laburtzailea",
  EN: "Summary",
  FR: "Résumeur",
},

proHeader_corrector: {
  ES: "Corrector",
  EUS: "Zuzentzailea",
  EN: "Corrector",
  FR: "Correcteur",
},

proHeader_paraphraser: {
  ES: "Parafraseador",
  EUS: "Parafraseatzailea",
  EN: "Paraphraser",
  FR: "Paraphraseur",
},

proHeader_aiDetector: {
  ES: "Detector de IA",
  EUS: "IA detektagailua",
  EN: "AI Detector",
  FR: "Détecteur IA",
},

proHeader_humanizer: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
  EN: "Humanizer",
  FR: "Humaniseur",
},

proSidebar_tools: {
  ES: "Herramientas",
  EUS: "Tresnak",
  EN: "Tools",
  FR: "Outils",
},

proSidebar_translator: {
  ES: "Traductor",
  EUS: "Itzultzailea",
  EN: "Translator",
  FR: "Traducteur",
},

proSidebar_summary: {
  ES: "Resumidor",
  EUS: "Laburtzailea",
  EN: "Summarizer",
  FR: "Résumeur",
},
proSidebar_corrector: {
  ES: "Corrector",
  EUS: "Zuzentzailea",
  EN: "Corrector",
  FR: "Correcteur",
},

proSidebar_library: {
  ES: "Biblioteca",
  EUS: "Liburutegia",
  EN: "Library",
  FR: "Bibliothèque",
},

proSidebar_chat: {
  ES: "Chat con IA",
  EUS: "IArekin txata",
  EN: "AI Chat",
  FR: "Chat IA",
},

proSidebar_suggestions: {
  ES: "Sugerencias",
  EUS: "Iradokizunak",
  EN: "Suggestions",
  FR: "Suggestions",
},

proSidebar_help: {
  ES: "Ayuda",
  EUS: "Laguntza",
  EN: "Help",
  FR: "Aide",
},

proSidebar_settings: {
  ES: "Ajustes",
  EUS: "Ezarpenak",
  EN: "Settings",
  FR: "Paramètres",
},

proSidebar_collapse: {
  ES: "Contraer",
  EUS: "Tolestu",
  EN: "Collapse",
  FR: "Réduire",
},


// =========================
//        Pro Home
// ========================= 
proHome: {
  greeting_prefix: {
    ES: "Hola",
    EUS: "Kaixo",
    EN: "Hi",
    FR: "Bonjour",
  },

  title: {
    ES: "Bienvenido a Euskalia Pro",
    EUS: "Ongi etorri Euskalia Prora",
    EN: "Welcome to Euskalia Pro",
    FR: "Bienvenue sur Euskalia Pro",
  },

  cardTranslator_title: {
    ES: "Traductor",
    EUS: "Itzultzailea",
    EN: "Translator",
    FR: "Traducteur",
  },

  cardTranslator_desc: {
    ES: "Traduce entre euskera, español, inglés y francés con calidad profesional.",
    EUS: "Itzuli euskara, gaztelania, ingelesa eta frantsesa maila profesionalarekin.",
    EN: "Translate between Basque, Spanish, English and French with professional quality.",
    FR: "Traduisez entre le basque, l’espagnol, l’anglais et le français avec une qualité professionnelle.",
  },

  cardSummary_title: {
    ES: "Resumidor",
    EUS: "Laburtzailea",
    EN: "Summarizer",
    FR: "Résumeur",
  },

  cardSummary_desc: {
    ES: "Sintetiza textos largos en segundos manteniendo claridad y fidelidad.",
    EUS: "Testu luzeak segundo gutxitan laburtzen ditu argitasuna eta zehaztasuna zainduz.",
    EN: "Summarize long texts in seconds while keeping clarity and fidelity.",
    FR: "Résumez de longs textes en quelques secondes tout en gardant clarté et fidélité.",
  },

  cardCorrector_title: {
    ES: "Corrector",
    EUS: "Zuzentzailea",
    EN: "Corrector",
    FR: "Correcteur",
  },

  cardCorrector_desc: {
    ES: "Revisa tu texto y corrige los errores gramaticales.",
    EUS: "Testua berrikusi eta akats gramatikoak zuzentzen ditu.",
    EN: "Review your text and correct grammar mistakes.",
    FR: "Relisez votre texte et corrigez les erreurs grammaticales.",
  },

  cardParaphraser_title: {
    ES: "Parafraseador",
    EUS: "Parafrasatzailea",
    EN: "Paraphraser",
    FR: "Paraphraseur",
  },
  cardParaphraser_desc: {
    ES: "Reescribe tu texto con distintos estilos manteniendo el significado.",
    EUS: "Berridatzi zure testua estilo desberdinetan, esanahia mantenduz.",
    EN: "Rewrite your text in different styles while preserving the meaning.",
    FR: "Réécrivez votre texte avec différents styles tout en conservant le sens.",
  },
  cardAiDetector_title: {
    ES: "Detector de IA",
    EUS: "IA-detektorea",
    EN: "AI detector",
    FR: "Détecteur IA",
  },
  cardAiDetector_desc: {
    ES: "Analiza el texto y estima la probabilidad de que haya sido generado por IA.",
    EUS: "Aztertu testua eta kalkulatu IA-k sortua izateko probabilitatea.",
    EN: "Analyze the text and estimate the probability it was generated by AI.",
    FR: "Analysez le texte et estimez la probabilité qu’il ait été généré par une IA.",
  },
  cardHumanizer_title: {
    ES: "Humanizador",
    EUS: "Humanizatzailea",
    EN: "Humanizer",
    FR: "Humaniseur",
  },
  cardHumanizer_desc: {
    ES: "Haz que tu texto suene más natural, claro y fluido.",
    EUS: "Egin zure testua naturalagoa, argiagoa eta fluidoagoa izan dadin.",
    EN: "Make your text sound more natural, clear and fluent.",
    FR: "Rendez votre texte plus naturel, clair et fluide.",
  },
},

  

  // =========================
  //        Pro TRANSLATOR
  // ========================= 
  proTranslator: {
    // Idiomas (labels)
    output_language_eus: { ES: "Euskera",    EUS: "Euskara",    EN: "Basque",   FR: "Basque" },
    output_language_es:  { ES: "Castellano", EUS: "Gaztelania", EN: "Spanish",  FR: "Espagnol" },
    output_language_en:  { ES: "Inglés",     EUS: "Ingelesa",   EN: "English",  FR: "Anglais" },
    output_language_fr:  { ES: "Francés",    EUS: "Frantsesa",  EN: "French",   FR: "Français" },

    // Tabs
    sources_tab_text:     { ES: "Texto",      EUS: "Testua",      EN: "Text",      FR: "Texte" },
    sources_tab_document: { ES: "Documento",  EUS: "Dokumentua",  EN: "Document",  FR: "Document" },
    sources_tab_url:      { ES: "URL",        EUS: "URL",         EN: "URL",       FR: "URL" },

    // Documentos
    choose_file_title: { ES: "Elige tu archivo o carpeta", EUS: "Aukeratu zure fitxategia edo karpeta", EN: "Choose your file or folder", FR: "Choisis ton fichier ou dossier" },
    accepted_formats:  { ES: "Formatos admitidos",         EUS: "Onartutako formatuak",                 EN: "Accepted formats",           FR: "Formats acceptés" },
    folder_hint:       { ES: "Puedes arrastrar varios archivos.", EUS: "Fitxategi bat baino gehiago arrasta ditzakezu.", EN: "You can drag multiple files.", FR: "Tu peux glisser plusieurs fichiers." },
    remove:            { ES: "Quitar", EUS: "Kendu", EN: "Remove", FR: "Retirer" },

    // URLs
    paste_urls_label:        { ES: "Pegar URLs*",   EUS: "URLak itsatsi*", EN: "Paste URLs*",  FR: "Coller des URLs*" },
    add_url:                 { ES: "Añadir URLs",   EUS: "URLak gehitu",   EN: "Add URLs",     FR: "Ajouter des URLs" },
    save_urls:               { ES: "Guardar",       EUS: "Gorde",          EN: "Save",         FR: "Enregistrer" },
    cancel:                  { ES: "Cancelar",      EUS: "Ezeztatu",       EN: "Cancel",       FR: "Annuler" },
    urls_note_visible:       { ES: "Solo se importará el texto visible del sitio web.", EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.", EN: "Only the visible text from the website will be imported.", FR: "Seul le texte visible du site sera importé." },
    urls_note_paywalled:     { ES: "No se admiten artículos de pago.", EUS: "Ordainpeko artikuluak ez dira onartzen.", EN: "Paywalled articles are not supported.", FR: "Les articles payants ne sont pas pris en charge." },
    paste_urls_placeholder:  { ES: "Introduce URLs separadas por línea", EUS: "Itsatsi URLak lerroka bereizita", EN: "Enter one or more URLs (one per line)", FR: "Saisis une ou plusieurs URLs (une par ligne)" },

    // Guardar
    save_button_label:   { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
    library_saved_toast: { ES: "Guardado en biblioteca", EUS: "Liburutegian gordeta", EN: "Saved to library", FR: "Enregistré dans la bibliothèque" },
  },
  

  // =========================
  //        Pro SUMMARY
  // ========================= 
  proSummary: {
  // Panel izquierdo / fuentes
  sources_title:        { ES: "Fuentes", EUS: "Iturriak", EN: "Sources", FR: "Sources" },
  sources_tab_text:     { ES: "Texto", EUS: "Testua", EN: "Text", FR: "Texte" },
  sources_tab_document: { ES: "Documento", EUS: "Dokumentua", EN: "Document", FR: "Document" },
  sources_tab_url:      { ES: "URL", EUS: "URL", EN: "URL", FR: "URL" },

  enter_text_here_full: { ES: "Escribe o pega tu texto aquí…", EUS: "Idatzi edo itsatsi zure testua hemen…", EN: "Write or paste your text here…", FR: "Écrivez ou collez votre texte ici…" },

  choose_file_title:    { ES: "Elige tu archivo o carpeta", EUS: "Aukeratu zure fitxategia edo karpeta.", EN: "Choose your file or folder", FR: "Choisissez votre fichier ou dossier" },
  accepted_formats:     { ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…", EUS: "Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak…", EN: "You can add PDFs, copied text, web links…", FR: "Vous pouvez ajouter des PDF, du texte copié, des liens web…" },
  folder_hint:          { ES: "Aquí aparecerán tus textos o documentos subidos.", EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.", EN: "Your uploaded texts or documents will appear here.", FR: "Vos textes ou documents importés apparaîtront ici." },

  paste_urls_label:     { ES: "Pegar URLs*", EUS: "URLak itsatsi*", EN: "Paste URLs*", FR: "Coller des URLs*" },
  add_url:              { ES: "Añadir URLs", EUS: "URLak gehitu", EN: "Add URLs", FR: "Ajouter des URLs" },
  save_urls:            { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
  cancel:               { ES: "Cancelar", EUS: "Ezeztatu", EN: "Cancel", FR: "Annuler" },
  urls_note_visible:    { ES: "Solo se importará el texto visible del sitio web.", EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.", EN: "Only visible text from the website will be imported.", FR: "Seul le texte visible du site sera importé." },
  urls_note_paywalled:  { ES: "No se admiten artículos de pago.", EUS: "Ordainpeko artikuluak ez dira onartzen.", EN: "Paywalled articles are not supported.", FR: "Les articles payants ne sont pas pris en charge." },
  remove:               { ES: "Quitar", EUS: "Kendu", EN: "Remove", FR: "Retirer" },
  paste_urls_placeholder:{ ES: "Introduce aquí una o más URLs (separadas por línea)", EUS: "Itsatsi hemen URL bat edo gehiago (lerro bakoitzean bat)", EN: "Paste one or more URLs (one per line)", FR: "Collez une ou plusieurs URLs (une par ligne)" },

  // Ayudas paneles
  create_help_left: {
    ES: "Aquí aparecerán tus textos o documentos subidos. Puedes añadir archivos PDF, texto copiado, enlaces web...",
    EUS:"Hemen agertuko dira igo dituzun testuak edo dokumentuak. Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak...",
    EN: "Your uploaded texts or documents will appear here. You can add PDFs, copied text, web links...",
    FR: "Vos textes ou documents importés apparaîtront ici. Vous pouvez ajouter des PDF, du texte copié, des liens web..."
  },
  create_help_right: {
    ES: "Elige una fuente (texto, documentos o URLs) y pulsa “Generar resumen”.",
    EUS:"Hautatu iturri bat (testua, dokumentuak edo URLak) eta sakatu “Laburpena sortu”.",
    EN: "Choose a source (text, documents or URLs) and click “Generate summary”.",
    FR: "Choisissez une source (texte, documents ou URLs) puis cliquez sur « Générer le résumé »."
  },

  // Longitud
  length_short:  { ES: "Breve", EUS: "Laburra", EN: "Short", FR: "Court" },
  length_medium: { ES: "Medio", EUS: "Ertaina", EN: "Medium", FR: "Moyen" },
  length_long:   { ES: "Detallado", EUS: "Zehatza", EN: "Detailed", FR: "Détaillé" },

  // Idioma salida
  output_language_aria: { ES: "Idioma de salida", EUS: "Irteerako hizkuntza", EN: "Output language", FR: "Langue de sortie" },
  output_language_eus:  { ES: "Euskera", EUS: "Euskara", EN: "Basque", FR: "Basque" },
  output_language_es:   { ES: "Castellano", EUS: "Gaztelania", EN: "Spanish", FR: "Espagnol" },
  output_language_en:   { ES: "Inglés", EUS: "Ingelesa", EN: "English", FR: "Anglais" },
  output_language_fr:   { ES: "Francés", EUS: "Frantsesa", EN: "French", FR: "Français" },

  // Botones / tooltips
  generate_from_sources:{ ES: "Generar resumen", EUS: "Laburpena sortu", EN: "Generate summary", FR: "Générer le résumé" },
  clear_input:          { ES: "Eliminar", EUS: "Ezabatu", EN: "Delete", FR: "Supprimer" },

  copy:                 { ES: "Copiar", EUS: "Kopiatu", EN: "Copy", FR: "Copier" },
  copied:               { ES: "Copiado", EUS: "Kopiatuta", EN: "Copied", FR: "Copié" },
  pdf:                  { ES: "PDF", EUS: "PDF", EN: "PDF", FR: "PDF" },
  pdf_title:            { ES: "Resumen", EUS: "Laburpena", EN: "Summary", FR: "Résumé" },

  // Guardar / toast
  save_button_label:    { ES: "Guardar", EUS: "Gorde", EN: "Save", FR: "Enregistrer" },
  library_saved_toast:  { ES: "Guardado en biblioteca", EUS: "Liburutegian gordeta", EN: "Saved to library", FR: "Enregistré dans la bibliothèque" },

  // Límite
  limit_title:          { ES: "Has alcanzado el límite del plan Gratis", EUS: "Doako planaren muga gainditu duzu", EN: "You’ve reached the Free plan limit", FR: "Vous avez atteint la limite du plan Gratuit" },
  limit_cta:            { ES: "Probar plan Premium", EUS: "Premium plana probatu", EN: "Try Premium plan", FR: "Essayer le plan Premium" },
  limit_dismiss:        { ES: "Seguir con plan Gratis", EUS: "Jarraitu doako planarekin", EN: "Continue with Free plan", FR: "Continuer avec le plan Gratuit" },
  limit_note:           { ES: "Límite actual: 12.000 caracteres por petición.", EUS: "Uneko muga: 12.000 karaktere eskaerako.", EN: "Current limit: 12,000 characters per request.", FR: "Limite actuelle : 12 000 caractères par requête." },

  // Errores
  error_need_input:     { ES: "Añade texto suficiente, URLs o documentos antes de generar el resumen.", EUS: "Gehitu testu nahikoa, URLak edo dokumentuak laburpena sortu aurretik.", EN: "Add enough text, URLs or documents before generating the summary.", FR: "Ajoutez suffisamment de texte, des URLs ou des documents avant de générer le résumé." },
  error_rate_limit:     { ES: "Has alcanzado el límite de peticiones. Inténtalo más tarde o prueba el plan Premium.", EUS: "Eskaeren muga gainditu duzu. Saiatu geroago edo probatu Premium plana.", EN: "You’ve hit the request limit. Try again later or try Premium.", FR: "Vous avez atteint la limite de requêtes. Réessayez plus tard ou essayez Premium." },
  error_no_text:        { ES: "No se recibió texto de la API.", EUS: "Ez da testurik jaso API-tik.", EN: "No text was received from the API.", FR: "Aucun texte n’a été reçu de l’API." },
  error_generic:        { ES: "Error generando el resumen.", EUS: "Errorea laburpena sortzean.", EN: "Error generating the summary.", FR: "Erreur lors de la génération du résumé." },
},
  // =========================
  //        Pro Grammar Corrector
  // ========================= 
  grammar: {
  sources_title: {
    ES: "Fuentes",
    EUS: "Iturriak",
    EN: "Sources",
    FR: "Sources",
  },
  sources_tab_text: {
    ES: "Texto",
    EUS: "Testua",
    EN: "Text",
    FR: "Texte",
  },
  sources_tab_document: {
    ES: "Documento",
    EUS: "Dokumentua",
    EN: "Document",
    FR: "Document",
  },
  sources_tab_url: {
    ES: "URL",
    EUS: "URL",
    EN: "URL",
    FR: "URL",
  },
  enter_text_here_full: {
    ES: "Escribe o pega el texto que quieras corregir aquí…",
    EUS: "Idatzi edo itsatsi zuzendu nahi duzun testua hemen…",
    EN: "Write or paste the text you want to correct here…",
    FR: "Écrivez ou collez ici le texte que vous voulez corriger…",
  },
  choose_file_title: {
    ES: "Elige tu archivo o carpeta.",
    EUS: "Aukeratu zure fitxategia edo karpeta.",
    EN: "Choose your file or folder.",
    FR: "Choisissez votre fichier ou dossier.",
  },
  accepted_formats: {
    ES: "Formatos admitidos: PDF, DOCX, TXT, MD, imágenes…",
    EUS: "Onartutako formatuak: PDF, DOCX, TXT, MD, irudiak…",
    EN: "Supported formats: PDF, DOCX, TXT, MD, images…",
    FR: "Formats acceptés : PDF, DOCX, TXT, MD, images…",
  },
  folder_hint: {
    ES: "Aquí aparecerán los textos o documentos que subas para corregir.",
    EUS: "Hemen agertuko dira zuzendu nahi dituzun testuak edo dokumentuak.",
    EN: "Your uploaded texts or documents will appear here to be corrected.",
    FR: "Vos textes ou documents importés apparaîtront ici pour être corrigés.",
  },
  paste_urls_label: {
    ES: "Pegar URLs*",
    EUS: "URLak itsatsi*",
    EN: "Paste URLs*",
    FR: "Coller des URLs*",
  },
  add_url: {
    ES: "Añadir URLs",
    EUS: "URLak gehitu",
    EN: "Add URLs",
    FR: "Ajouter des URLs",
  },
  paste_urls_placeholder: {
    ES: "Introduce aquí una o mas URLs (separadas por línea)",
    EUS: "Itsatsi hemen URL bat edo gehiago (lerro bakoitzean bat)",
    EN: "Enter one or more URLs here (one per line)",
    FR: "Saisissez une ou plusieurs URLs ici (une par ligne)",
  },
  save_urls: {
    ES: "Guardar",
    EUS: "Gorde",
    EN: "Save",
    FR: "Enregistrer",
  },
  cancel: {
    ES: "Cancelar",
    EUS: "Ezeztatu",
    EN: "Cancel",
    FR: "Annuler",
  },
  urls_note_visible: {
    ES: "Solo se importará el texto visible de la página web.",
    EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.",
    EN: "Only the visible text from the web page will be imported.",
    FR: "Seul le texte visible de la page web sera importé.",
  },
  urls_note_paywalled: {
    ES: "No se admiten artículos de pago.",
    EUS: "Ordaineko artikuluak ez dira onartzen.",
    EN: "Paywalled articles are not supported.",
    FR: "Les articles payants ne sont pas pris en charge.",
  },
  create_help_left: {
    ES: "Aquí verás los textos o documentos que subas para corregir. Puedes añadir archivos PDF, texto copiado o enlaces web…",
    EUS: "Hemen agertuko dira zuzendu nahi dituzun testuak edo dokumentuak. Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak…",
    EN: "Here you’ll see the texts or documents you upload to correct. You can add PDF files, pasted text, or web links…",
    FR: "Ici, vous verrez les textes ou documents que vous importez pour corriger. Vous pouvez ajouter des PDF, du texte collé ou des liens web…",
  },
  language_es: {
    ES: "Español",
    EUS: "Gaztelania",
    EN: "Spanish",
    FR: "Espagnol",
  },
  language_eus: {
    ES: "Euskera",
    EUS: "Euskara",
    EN: "Basque",
    FR: "Basque",
  },
  language_en: {
    ES: "Inglés",
    EUS: "Ingelesa",
    EN: "English",
    FR: "Anglais",
  },

  correct_button: {
    ES: "Corregir texto",
    EUS: "Testua zuzendu",
    EN: "Correct text",
    FR: "Corriger le texte",
  },
  create_help_right: {
    ES: "Corrección estándar: ortografía, gramática y fluidez básica.",
    EUS: "Zuzenketa estandarra: ortografia, gramatika eta oinarrizko arintasuna.",
    EN: "Standard correction: spelling, grammar, and basic fluency.",
    FR: "Correction standard : orthographe, grammaire et fluidité de base.",
  },
  lang_mismatch: {
    ES: "Parece que el texto está en otro idioma distinto al seleccionado. Cambia el idioma del selector o usa el traductor de Euskalia.",
    EUS: "Badirudi testua hautatutako hizkuntzatik desberdina dela. Aldatu goiko hizkuntza-hautatzailea edo erabili Euskaliaren itzultzailea.",
    EN: "It looks like the text is in a different language than the one selected. Change the selector language or use Euskalia’s translator.",
    FR: "Il semble que le texte soit dans une langue différente de celle sélectionnée. Changez la langue du sélecteur ou utilisez le traducteur d’Euskalia.",
  },
  view_changes: {
    ES: "Ver cambios",
    EUS: "Ikusi aldaketak",
    EN: "View changes",
    FR: "Voir les modifications",
  },
  hide_changes: {
    ES: "Ocultar cambios",
    EUS: "Aldaketak ezkutatu",
    EN: "Hide changes",
    FR: "Masquer les modifications",
  },
  no_errors_message: {
    ES: "¡Muy bien! No hemos detectado errores.",
    EUS: "Oso ondo! Ez dugu akatsik aurkitu.",
    EN: "Nice job! We didn’t spot any mistakes.",
    FR: "Bravo ! Nous n’avons détecté aucune erreur.",
  },
},

// =========================
//        Pro Paraphraser
// =========================    
proSidebar_paraphraser: {
  ES: "Parafraseador",
  EUS: "Parafraseatzailea",
  EN: "Paraphraser",
  FR: "Paraphraseur",
},

proParaphraser_sources_title: {
  ES: "Fuentes",
  EUS: "Iturriak",
  EN: "Sources",
  FR: "Sources",
},

proParaphraser_tab_text: {
  ES: "Texto",
  EUS: "Testua",
  EN: "Text",
  FR: "Texte",
}, 

proParaphraser_tab_document: {
  ES: "Documento",
  EUS: "Dokumentua",
  EN: "Document",
  FR: "Document",
},

proParaphraser_tab_url: {
  ES: "URL",
  EUS: "URLa",
  EN: "URL",
  FR: "URL",
},
proParaphraser_left_title: {
  ES: "Aquí verás los textos o documentos que subas para corregir.",
  EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.",
  EN: "Here you’ll see the texts or documents you upload.",
  FR: "Ici, vous verrez les textes ou documents que vous importez.",
},
proParaphraser_left_body: {
  ES: "Puedes añadir archivos PDF, texto copiado o enlaces web…",
  EUS: "Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak...",
  EN: "You can add PDF files, pasted text, or web links…",
  FR: "Vous pouvez ajouter des PDF, du texte collé ou des liens web…",
},
proParaphraser_enter_text_placeholder: {
  ES: "Escribe o pega tu texto aquí…",
  EUS: "Idatzi edo itsatsi hemen zure testua…",
  EN: "Write or paste your text here…",
  FR: "Écrivez ou collez votre texte ici…",
},

proParaphraser_pick_file_title: {
  ES: "Elige tu archivo o carpeta",
  EUS: "Aukeratu zure fitxategia edo karpeta",
  EN: "Choose your file or folder",
  FR: "Choisissez votre fichier ou dossier",
},

proParaphraser_accepted_formats: {
  ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…",
  EUS: "PDF fitxategiak, testu itsatsiak edo web estekak gehitu ditzakezu…",
  EN: "You can add PDF files, pasted text, web links…",
  FR: "Vous pouvez ajouter des PDF, du texte collé, des liens web…",
},

proParaphraser_folder_hint: {
  ES: "Aquí aparecerán tus textos o documentos subidos.",
  EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.",
  EN: "Your uploaded texts or documents will appear here.",
  FR: "Vos textes ou documents importés apparaîtront ici.",
},

proParaphraser_paste_urls_label: {
  ES: "Pegar URLs*",
  EUS: "URLa itsatsi*",
  EN: "Paste URLs*",
  FR: "Coller des URLs*",
},

proParaphraser_add_urls_button: {
  ES: "Añadir URLs",
  EUS: "URLak gehitu",
  EN: "Add URLs",
  FR: "Ajouter des URLs",
},

proParaphraser_save_urls_button: {
  ES: "Guardar",
  EUS: "Gorde",
  EN: "Save",
  FR: "Enregistrer",
},

proParaphraser_cancel_button: {
  ES: "Cancelar",
  EUS: "Utzi",
  EN: "Cancel",
  FR: "Annuler",
},

proParaphraser_urls_note_visible: {
  ES: "Solo se importará el texto visible del sitio web.",
  EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.",
  EN: "Only the visible text from the website will be imported.",
  FR: "Seul le texte visible du site web sera importé.",
},

proParaphraser_urls_note_paywalled: {
  ES: "No se admiten artículos de pago.",
  EUS: "Ordainpeko artikuluak ez dira onartzen.",
  EN: "Paywalled articles are not supported.",
  FR: "Les articles payants ne sont pas pris en charge.",
},

proParaphraser_remove_button: {
  ES: "Quitar",
  EUS: "Kendu",
  EN: "Remove",
  FR: "Retirer",
},

proParaphraser_language_es: {
  ES: "Castellano",
  EUS: "Gaztelania",
  EN: "Spanish",
  FR: "Espagnol",
},

proParaphraser_language_eus: {
  ES: "Euskera",
  EUS: "Euskara",
  EN: "Basque",
  FR: "Basque",
},

proParaphraser_language_en: {
  ES: "Inglés",
  EUS: "Ingelesa",
  EN: "English",
  FR: "Anglais",
},

proParaphraser_output_language_aria: {
  ES: "Idioma de salida",
  EUS: "Irteerako hizkuntza",
  EN: "Output language",
  FR: "Langue de sortie",
},

proParaphraser_generate_button: {
  ES: "Crear parafraseo",
  EUS: "Parafraseoa sortu",
  EN: "Create paraphrase",
  FR: "Créer un paraphrase",
},

proParaphraser_help_right: {
  ES: "Elige entre los botones superiores el estilo de texto que prefieras y crea el parafraseo con tu contenido.",
  EUS: "Aukeratu goiko botoien artean nahi duzun testu-estiloa, eta sortu parafraseoa zure edukiarekin.",
  EN: "Choose your preferred text style using the top buttons and create the paraphrase with your content.",
  FR: "Choisissez le style de texte via les boutons du haut et créez le paraphrase avec votre contenu.",
},

proParaphraser_mode_neutral: {
  ES: "Neutral",
  EUS: "Neutrala",
  EN: "Neutral",
  FR: "Neutre",
},

proParaphraser_mode_informal: {
  ES: "Informal",
  EUS: "Informala",
  EN: "Informal",
  FR: "Informel",
},

proParaphraser_mode_professional: {
  ES: "Profesional",
  EUS: "Profesionala",
  EN: "Professional",
  FR: "Professionnel",
},

proParaphraser_mode_academic: {
  ES: "Académico",
  EUS: "Akademikoa",
  EN: "Academic",
  FR: "Académique",
},

proParaphraser_mode_fluent: {
  ES: "Fluido",
  EUS: "Jariozkoa",
  EN: "Fluent",
  FR: "Fluide",
},

proParaphraser_mode_simplified: {
  ES: "Simplificado",
  EUS: "Sinplifikatua",
  EN: "Simplified",
  FR: "Simplifié",
},

proParaphraser_mode_creative: {
  ES: "Creativo",
  EUS: "Sortzailea",
  EN: "Creative",
  FR: "Créatif",
},

proParaphraser_copy_result_aria: {
  ES: "Copiar resultado",
  EUS: "Emaitza kopiatu",
  EN: "Copy result",
  FR: "Copier le résultat",
},

proParaphraser_delete_input_aria: {
  ES: "Eliminar texto de entrada y resultado",
  EUS: "Sarrerako testua eta emaitza ezabatu",
  EN: "Delete input text and result",
  FR: "Supprimer le texte d’entrée et le résultat",
},

proParaphraser_copy_result_title: {
  ES: "Copiar resultado",
  EUS: "Emaitza kopiatu",
  EN: "Copy result",
  FR: "Copier le résultat",
},

proParaphraser_delete_input_title: {
  ES: "Eliminar texto de entrada y resultado",
  EUS: "Sarrerako testua eta emaitza ezabatu",
  EN: "Delete input text and result",
  FR: "Supprimer le texte d’entrée et le résultat",
},

proParaphraser_clear_text_title: {
  ES: "Borrar texto",
  EUS: "Testua ezabatu",
  EN: "Clear text",
  FR: "Effacer le texte",
},

proParaphraser_clear_text_aria: {
  ES: "Borrar texto",
  EUS: "Testua ezabatu",
  EN: "Clear text",
  FR: "Effacer le texte",
},

proParaphraser_download: {
  ES: "Descargar",
  EUS: "Deskargatu",
  EN: "Download",
  FR: "Télécharger",
},

proParaphraser_copy: {
  ES: "Copiar",
  EUS: "Kopiatu",
  EN: "Copy",
  FR: "Copier",
},

proParaphraser_copied: {
  ES: "Copiado",
  EUS: "Kopiatuta",
  EN: "Copied",
  FR: "Copié",
},

proParaphraser_save_to_library_button: {
  ES: "Guardar",
  EUS: "Gorde",
  EN: "Save",
  FR: "Enregistrer",
},

proParaphraser_saved_to_library: {
  ES: "Guardado en biblioteca",
  EUS: "Liburutegian gordeta",
  EN: "Saved to library",
  FR: "Enregistré dans la bibliothèque",
},

proParaphraser_default_title: {
  ES: "Parafraseo",
  EUS: "Parafraseoa",
  EN: "Paraphrase",
  FR: "Paraphrase",
},

proParaphraser_error_max_chars: {
  ES: "Has superado el límite de caracteres permitido.",
  EUS: "Onartutako karaktere kopurua gainditu duzu.",
  EN: "You have exceeded the allowed character limit.",
  FR: "Vous avez dépassé la limite de caractères autorisée.",
},

proParaphraser_error_need_input: {
  ES: "Añade texto suficiente, URLs o documentos antes de crear el parafraseo.",
  EUS: "Parafraseoa sortu aurretik, gehitu testu nahikoa, URLak edo dokumentuak.",
  EN: "Add enough text, URLs, or documents before creating the paraphrase.",
  FR: "Ajoutez suffisamment de texte, d’URLs ou de documents avant de créer le paraphrase.",
},

proParaphraser_error_rate_limit: {
  ES: "Has alcanzado el límite de peticiones. Inténtalo más tarde.",
  EUS: "Eskaera muga gainditu duzu. Saiatu berriro geroago.",
  EN: "You’ve reached the request limit. Please try again later.",
  FR: "Vous avez atteint la limite de requêtes. Réessayez plus tard.",
},

proParaphraser_error_no_text: {
  ES: "No se recibió texto de la API.",
  EUS: "Ez da testurik jaso API-tik.",
  EN: "No text was received from the API.",
  FR: "Aucun texte n’a été reçu de l’API.",
},

proParaphraser_error_generic: {
  ES: "Error creando el parafraseo.",
  EUS: "Errorea parafraseoa sortzean.",
  EN: "Error creating the paraphrase.",
  FR: "Erreur lors de la création du paraphrase.",
},


 // =========================
  //        Pro Ai Detector
  // =========================    
 proSidebar_aiDetector: {
  ES: "Detector de IA",
  EUS: "IA detektagailua",
  EN: "AI Detector",
  FR: "Détecteur IA",
},
aiDetector_subtitle: {
  ES: "Mantén la autenticidad de tus textos comprobando si podrían contener contenido generado por IA.",
  EUS: "Zure testuen benetakotasuna mantendu, IA bidez sortutako edukia izan dezaketela egiaztatuz.",
  EN: "Keep your texts authentic by checking whether they may contain AI-generated content.",
  FR: "Préservez l’authenticité de vos textes en vérifiant s’ils peuvent contenir du contenu généré par IA.",
},

aiDetector_placeholder: {
  ES: "Escribe o pega aquí el texto que quieres analizar...",
  EUS: "Idatzi edo itsatsi hemen aztertu nahi duzun testua...",
  EN: "Write or paste here the text you want to analyze...",
  FR: "Écrivez ou collez ici le texte que vous voulez analyser...",
},

aiDetector_paste_button: {
  ES: "Pegar texto",
  EUS: "Testua itsatsi",
  EN: "Paste text",
  FR: "Coller le texte",
},

aiDetector_upload_button: {
  ES: "Subir archivo",
  EUS: "Fitxategia igo",
  EN: "Upload file",
  FR: "Importer un fichier",
},

aiDetector_clear_title: {
  ES: "Borrar",
  EUS: "Ezabatu",
  EN: "Clear",
  FR: "Effacer",
},

aiDetector_max_chars: {
  ES: "5000",
  EUS: "5000",
  EN: "5000",
  FR: "5000",
},

aiDetector_button_analyze: {
  ES: "Revisar si hay contenido de IA",
  EUS: "IA edukia dagoen aztertu",
  EN: "Check for AI content",
  FR: "Vérifier le contenu IA",
},

aiDetector_button_reanalyze: {
  ES: "Volver a analizar",
  EUS: "Berriro aztertu",
  EN: "Analyze again",
  FR: "Analyser à nouveau",
},

aiDetector_button_analyzing: {
  ES: "Analizando...",
  EUS: "Aztertzen...",
  EN: "Analyzing...",
  FR: "Analyse...",
},

aiDetector_right_loading_title: {
  ES: "Analizando el texto…",
  EUS: "Testua aztertzen…",
  EN: "Analyzing the text…",
  FR: "Analyse du texte…",
},

aiDetector_right_loading_subtitle: {
  ES: "Esto puede tardar unos segundos",
  EUS: "Segundo batzuk har ditzake",
  EN: "This may take a few seconds",
  FR: "Cela peut prendre quelques secondes",
},

aiDetector_right_percent_subtitle: {
  ES: "del texto podría estar generado por IA",
  EUS: "testuaren zati bat IA bidez sortua izan liteke",
  EN: "of the text could be AI-generated",
  FR: "du texte pourrait être généré par IA",
},

aiDetector_label_ai: {
  ES: "Generado por IA",
  EUS: "IAk sortua",
  EN: "AI-generated",
  FR: "Généré par IA",
},

aiDetector_label_human: {
  ES: "Escrito por humano",
  EUS: "Gizakiak idatzia",
  EN: "Human-written",
  FR: "Écrit par un humain",
},

aiDetector_disclaimer: {
  ES: "Estimación orientativa. Puede no ser 100% precisa.",
  EUS: "Gutxi gorabeherako estimazioa. Baliteke %100 zehatza ez izatea.",
  EN: "Indicative estimate. It may not be 100% accurate.",
  FR: "Estimation indicative. Elle peut ne pas être 100 % précise.",
},

aiDetector_humanize_button: {
  ES: "Humanizar texto IA",
  EUS: "IA testua humanizatu",
  EN: "Humanize AI text",
  FR: "Humaniser le texte IA",
},

aiDetector_error_generic: {
  ES: "No se pudo analizar el texto.",
  EUS: "Ezin izan da testua aztertu.",
  EN: "The text could not be analyzed.",
  FR: "Impossible d’analyser le texte.",
},

aiDetector_error_network: {
  ES: "Error de red. Intenta de nuevo.",
  EUS: "Sareko errorea. Saiatu berriro.",
  EN: "Network error. Try again.",
  FR: "Erreur réseau. Réessayez.",
},


// =========================
//        Pro Humanizer
// =========================    

proSidebar_humanizer: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
  EN: "Humanizer",
  FR: "Humaniseur",
},

proHumanizer_sources: {
  ES: "Fuentes",
  EUS: "Iturriak",
  EN: "Sources",
  FR: "Sources",
},
proHumanizer_tabText: {
  ES: "Texto",
  EUS: "Testua",
  EN: "Text",
  FR: "Texte",
},
proHumanizer_tabDocument: {
  ES: "Documento",
  EUS: "Dokumentua",
  EN: "Document",
  FR: "Document",
},
proHumanizer_tabUrl: {
  ES: "URL",
  EUS: "URL",
  EN: "URL",
  FR: "URL",
},
proHumanizer_enterText: {
  ES: "Escribe o pega tu texto aquí…",
  EUS: "Idatzi edo itsatsi zure testua hemen…",
  EN: "Write or paste your text here…",
  FR: "Écrivez ou collez votre texte ici…",
},

proHumanizer_chooseFileTitle: {
  ES: "Elige tu archivo o carpeta",
  EUS: "Aukeratu zure fitxategia edo karpeta",
  EN: "Choose your file or folder",
  FR: "Choisissez votre fichier ou dossier",
},
proHumanizer_acceptedFormats: {
  ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…",
  EUS: "PDF fitxategiak, kopiatutako testua, web estekak… gehi ditzakezu",
  EN: "You can add PDF files, pasted text, web links…",
  FR: "Vous pouvez ajouter des PDF, du texte collé, des liens web…",
},
proHumanizer_folderHint: {
  ES: "Aquí aparecerán tus textos o documentos subidos.",
  EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.",
  EN: "Your uploaded texts or documents will appear here.",
  FR: "Vos textes ou documents importés apparaîtront ici.",
},

proHumanizer_pasteUrls: {
  ES: "Pegar URLs*",
  EUS: "Itsatsi URLak*",
  EN: "Paste URLs*",
  FR: "Coller des URLs*",
},
proHumanizer_addUrls: {
  ES: "Añadir URLs",
  EUS: "Gehitu URLak",
  EN: "Add URLs",
  FR: "Ajouter des URLs",
},
proHumanizer_save: {
  ES: "Guardar",
  EUS: "Gorde",
  EN: "Save",
  FR: "Enregistrer",
},
proHumanizer_cancel: {
  ES: "Cancelar",
  EUS: "Utzi",
  EN: "Cancel",
  FR: "Annuler",
},
proHumanizer_urlsNoteVisible: {
  ES: "Solo se importará el texto visible del sitio web.",
  EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.",
  EN: "Only the visible text from the website will be imported.",
  FR: "Seul le texte visible du site web sera importé.",
},
proHumanizer_urlsNotePaywalled: {
  ES: "No se admiten artículos de pago.",
  EUS: "Ordainpeko artikuluak ez dira onartzen.",
  EN: "Paywalled articles are not supported.",
  FR: "Les articles payants ne sont pas pris en charge.",
},
proHumanizer_remove: {
  ES: "Quitar",
  EUS: "Kendu",
  EN: "Remove",
  FR: "Retirer",
},

proHumanizer_langES: {
  ES: "Castellano",
  EUS: "Gaztelania",
  EN: "Spanish",
  FR: "Espagnol",
},
proHumanizer_langEUS: {
  ES: "Euskera",
  EUS: "Euskara",
  EN: "Basque",
  FR: "Basque",
},
proHumanizer_langEN: {
  ES: "Inglés",
  EUS: "Ingelesa",
  EN: "English",
  FR: "Anglais",
},

proHumanizer_generate: {
  ES: "Humanizar texto",
  EUS: "Testua humanizatu",
  EN: "Humanize text",
  FR: "Humaniser le texte",
},
proHumanizer_helpRight: {
  ES: 'Selecciona una fuente (texto, documentos o URLs) y pulsa "Humanizar texto".',
  EUS: 'Hautatu iturri bat (testua, dokumentuak edo URLak) eta sakatu "Testua humanizatu".',
  EN: 'Select a source (text, documents or URLs) and click "Humanize text".',
  FR: 'Sélectionnez une source (texte, documents ou URLs) puis cliquez sur "Humaniser le texte".',
},

proHumanizer_saveButton: {
  ES: "Guardar",
  EUS: "Gorde",
  EN: "Save",
  FR: "Enregistrer",
},
proHumanizer_savedToLibrary: {
  ES: "Guardado en biblioteca",
  EUS: "Liburutegian gordeta",
  EN: "Saved to library",
  FR: "Enregistré dans la bibliothèque",
},

proHumanizer_copyResultAria: {
  ES: "Copiar resultado",
  EUS: "Emaitza kopiatu",
  EN: "Copy result",
  FR: "Copier le résultat",
},
proHumanizer_deleteInputAria: {
  ES: "Eliminar texto de entrada y resultado",
  EUS: "Sarrerako testua eta emaitza ezabatu",
  EN: "Delete input text and result",
  FR: "Supprimer le texte d’entrée et le résultat",
},
proHumanizer_copyResultTitle: {
  ES: "Copiar resultado",
  EUS: "Emaitza kopiatu",
  EN: "Copy result",
  FR: "Copier le résultat",
},
proHumanizer_deleteInputTitle: {
  ES: "Eliminar texto de entrada y resultado",
  EUS: "Sarrerako testua eta emaitza ezabatu",
  EN: "Delete input text and result",
  FR: "Supprimer le texte d’entrée et le résultat",
},
proHumanizer_clearLeftTitle: {
  ES: "Borrar texto",
  EUS: "Testua ezabatu",
  EN: "Clear text",
  FR: "Effacer le texte",
},
proHumanizer_clearLeftAria: {
  ES: "Borrar texto",
  EUS: "Testua ezabatu",
  EN: "Clear text",
  FR: "Effacer le texte",
},

proHumanizer_urlTextareaPlaceholder: {
  ES: "Introduce aquí una o más URLs (separadas por línea)",
  EUS: "Sartu hemen URL bat edo gehiago (lerroz banatuta)",
  EN: "Enter one or more URLs here (one per line)",
  FR: "Saisissez une ou plusieurs URLs ici (une par ligne)",
},

proHumanizer_download: {
  ES: "Descargar",
  EUS: "Deskargatu",
  EN: "Download",
  FR: "Télécharger",
},
proHumanizer_copy: {
  ES: "Copiar",
  EUS: "Kopiatu",
  EN: "Copy",
  FR: "Copier",
},
proHumanizer_copied: {
  ES: "Copiado",
  EUS: "Kopiatuta",
  EN: "Copied",
  FR: "Copié",
},

proHumanizer_leftTitle: {
  ES: "Aquí aparecerán tus textos o documentos subidos.",
  EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.",
  EN: "Your uploaded texts or documents will appear here.",
  FR: "Vos textes ou documents importés apparaîtront ici.",
},
proHumanizer_leftBody: {
  ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…",
  EUS: "PDF fitxategiak, kopiatutako testua, web estekak… gehi ditzakezu",
  EN: "You can add PDF files, pasted text, web links…",
  FR: "Vous pouvez ajouter des PDF, du texte collé, des liens web…",
},

proHumanizer_modeBasic: {
  ES: "Básico",
  EUS: "Oinarrizkoa",
  EN: "Basic",
  FR: "Basique",
},
proHumanizer_modeStandard: {
  ES: "Estándar",
  EUS: "Estandarra",
  EN: "Standard",
  FR: "Standard",
},
proHumanizer_modeAdvanced: {
  ES: "Avanzado",
  EUS: "Aurreratua",
  EN: "Advanced",
  FR: "Avancé",
},

proHumanizer_errorMaxChars: {
  ES: "Has superado el límite de caracteres permitido.",
  EUS: "Baimendutako karaktere-muga gainditu duzu.",
  EN: "You have exceeded the allowed character limit.",
  FR: "Vous avez dépassé la limite de caractères autorisée.",
},
proHumanizer_errorNeedInput: {
  ES: "Añade texto suficiente, URLs o documentos antes de humanizar.",
  EUS: "Gehitu testu nahikoa, URLak edo dokumentuak humanizatu aurretik.",
  EN: "Add enough text, URLs, or documents before humanizing.",
  FR: "Ajoutez suffisamment de texte, d’URLs ou de documents avant d’humaniser.",
},
proHumanizer_errorRateLimit: {
  ES: "Has alcanzado el límite de peticiones. Inténtalo más tarde.",
  EUS: "Eskaera-muga lortu duzu. Saiatu berriro geroago.",
  EN: "You’ve reached the request limit. Try again later.",
  FR: "Vous avez atteint la limite de requêtes. Réessayez plus tard.",
},
proHumanizer_errorNoApiText: {
  ES: "No se recibió texto de la API.",
  EUS: "Ez da testurik jaso API-tik.",
  EN: "No text was received from the API.",
  FR: "Aucun texte n’a été reçu de l’API.",
},
proHumanizer_errorGeneric: {
  ES: "Error humanizando el texto.",
  EUS: "Errorea testua humanizatzean.",
  EN: "Error humanizing the text.",
  FR: "Erreur lors de l’humanisation du texte.",
},


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //        Pro library
  // =========================    

  library_filter_all: {
  ES: "Todos",
  EUS: "Denak",
  EN: "All",
  FR: "All",
},
library_filter_texts: {
  ES: "Traducciones",
  EUS: "Itzulpenak",
  EN: "Translations",
  FR: "Traductions",
},
library_filter_summaries: {
  ES: "Resúmenes",
  EUS: "Laburpenak",
  EN: "Summaries",
  FR: "Résumés",
},
library_filter_folders: {
  ES: "Mis carpetas",
  EUS: "Nire karpetak",
  EN: "My folders",
  FR: "Mes dossiers",
},
library_create_new: {
  ES: "Crear nuevo",
  EUS: "Sortu berria",
  EN: "Create new",
  FR: "Créer",
},
library_create_text: {
  ES: "Crear traducción:",
  EUS: "Sortu itzulpena:",
  EN: "Create translation:",
  FR: "Créer une traduction :",
},

library_prefix_summary: {
  ES: "Resumen:",
  EUS: "Laburpena:",
  EN: "Summary:",
  FR: "Résumé :",
},
library_prefix_translation: {
  ES: "Traducción:",
  EUS: "Itzulpena:",
  EN: "Translation:",
  FR: "Traduction :",
},
library_prefix_corrector: {
  ES: "Corrección:",
  EUS: "Zuzenketa:",
  EN: "Correction:",
  FR: "Correction :",
},
library_create_summary: {
  ES: "Crear resumen",
  EUS: "Sortu laburpena",
  EN: "Create summary",
  FR: "Créer un résumé",
},
library_no_folders: {
  ES: "Aún no tienes carpetas. Crea la primera.",
  EUS: "Ez duzu karpetarik oraindik. Sortu lehena.",
  EN: "You don’t have any folders yet. Create the first one.",
  FR: "Vous n’avez pas encore de dossiers. Créez le premier.",
},

library_create_folder: {
  ES: "Crear nueva carpeta",
  EUS: "Karpeta berria sortu",
  EN: "Create new folder",
  FR: "Créer un nouveau dossier",
},

folder_modal_title: {
  ES: "Crear nueva carpeta",
  EUS: "Karpeta berria sortu",
  EN: "Create new folder",
  FR: "Créer un nouveau dossier",
},

folder_modal_label: {
  ES: "Nombre de la carpeta",
  EUS: "Karpetaren izena",
  EN: "Folder name",
  FR: "Nom du dossier",
},

folder_modal_placeholder: {
  ES: "Ponle un nombre…",
  EUS: "Eman izen bat…",
  EN: "Give it a name…",
  FR: "Donnez-lui un nom…",
},

folder_modal_cancel: {
  ES: "Cancelar",
  EUS: "Utzi",
  EN: "Cancel",
  FR: "Annuler",
},

folder_modal_save: {
  ES: "Guardar",
  EUS: "Gorde",
  EN: "Save",
  FR: "Enregistrer",
},
library_doc_edit_title: {
  ES: "Editar documento",
  EUS: "Editatu dokumentua",
  EN: "Edit document",
  FR: "Modifier le document",
},
library_doc_delete: {
  ES: "Eliminar",
  EUS: "Ezabatu",
  EN: "Delete",
  FR: "Supprimer",
},
library_back: {
  ES: "Atras",
  EUS: "Atzera",
  EN: "Back",
  FR: "Retour",
},
folder_back: {
  ES: "Atras",
  EUS: "Atzera",
  EN: "Back",
  FR: "Retour",
},
folder_modal_select_docs: {
  ES: "Elige qué documentos quieres guardar en esta carpeta",
  EUS: "Aukeratu karpeta honetan gorde nahi dituzun dokumentuak",
  EN: "Choose which documents you want to save in this folder",
  FR: "Choisissez quels documents vous voulez enregistrer dans ce dossier",
},
folder_empty: {
  ES: "Carpeta vacía",
  EUS: "Karpeta hutsa",
  EN: "Empty folder",
  FR: "Dossier vide",
},
save_button: {
  ES: "Guardar",
  EUS: "Gorde",
  EN: "Save",
  FR: "Enregistrer",
},
saved_to_library: {
  ES: "Guardado en biblioteca",
  EUS: "Gordeta liburutegian",
  EN: "Saved to library",
  FR: "Enregistré dans la bibliothèque",
},
library_filter_corrections: {
  ES: "Correcciones",
  EUS: "Zuzenketak",
  EN: "Corrections",
  FR: "Corrections",
},
library_create_correction: {
  ES: "Crear corrección",
  EUS: "Sortu zuzenketa",
  EN: "Create correction",
  FR: "Créer une correction",
},
library_filter_paraphrases: {
  ES: "Parafraseos",
  EUS: "Parafraseoak",
  EN: "Paraphrases",
  FR: "Paraphrases",
},
library_create_paraphrase: {
  ES: "Crear parafraseo",
  EUS: "Sortu parafraseoa",
  EN: "Create paraphrase",
  FR: "Créer une paraphrase",
},
library_filter_ai_detector: {
  ES: "Detector IA",
  EUS: "IA aztertzailea",
  EN: "AI detector",
  FR: "Détecteur IA",
},
library_create_ai_detector: {
  ES: "Crear detección IA",
  EUS: "Sortu IA aztertzailea",
  EN: "Create AI detection",
  FR: "Créer une détection IA",
},
library_filter_humanizer: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
  EN: "Humanizer",
  FR: "Humaniseur",
},
library_create_humanizer: {
  ES: "Crear humanizado",
  EUS: "Sortu humanizatua",
  EN: "Create humanized",
  FR: "Créer un texte humanisé",
},
library_prefix_paraphraser: {
  ES: "Parafraseo:",
  EUS: "Parafraseoa:",
  EN: "Paraphrase:",
  FR: "Paraphrase :",
},
library_prefix_humanizer: {
  ES: "Humanizado:",
  EUS: "Humanizatua:",
  EN: "Humanized:",
  FR: "Humanisé :",
},
library_doc_title_label: {
  ES: "Título del documento",
  EUS: "Dokumentuaren izenburua",
  EN: "Document title",
  FR: "Titre du document",
},

library_doc_title_placeholder: {
  ES: "Escribe un título…",
  EUS: "Idatzi izenburu bat…",
  EN: "Write a title…",
  FR: "Écrivez un titre…",
},


// =========================
//        Pro Suggestions
// =========================                          
proSuggestions: {
  zone_badge: {
    ES: "Zona de ideas y sugerencias de Euskalia",
    EUS: "Euskaliaren ideien eta iradokizunen gunea",
    EN: "Euskalia ideas & suggestions zone",
    FR: "Zone d’idées et de suggestions d’Euskalia",
  },

  title: {
    ES: "Ayúdanos a decidir las próximas mejoras de Euskalia",
    EUS: "Lagundu Euskaliaren hurrengo hobekuntzak erabakitzen",
    EN: "Help us decide Euskalia’s next improvements",
    FR: "Aidez-nous à décider des prochaines améliorations d’Euskalia",
  },

  description_part1: {
    ES: "Esta página es para que nos cuentes ",
    EUS: "Orri hau horretarako da: esan diezagukezun ",
    EN: "This page is for you to tell us ",
    FR: "Cette page est faite pour nous dire ",
  },

  description_highlight: {
    ES: "qué te gustaría que añadamos o mejoremos en Euskalia",
    EUS: "Euskalien zer gehitzea edo hobetzea gustatuko litzaizukeen",
    EN: "what you’d like us to add or improve in Euskalia",
    FR: "ce que vous aimeriez que nous ajoutions ou améliorions dans Euskalia",
  },

  description_part2: {
    ES: ": nuevas herramientas, cambios en el diseño, límites, ideas para estudiar mejor, cosas que te molestan… cualquier comentario es bienvenido.",
    EUS: ": tresna berriak, diseinu-aldaketak, mugak, ikasteko hobekuntzak, molestatzen zaizkizun gauzak… edozein iradokizun ongi etorria da.",
    EN: ": new tools, design changes, limits, ideas to study better, things that annoy you… any feedback is welcome.",
    FR: ": nouveaux outils, changements de design, limites, idées pour mieux étudier, choses qui vous gênent… tout commentaire est le bienvenu.",
  },

  form_title: {
    ES: "Enviar una sugerencia",
    EUS: "Bidali iradokizun bat",
    EN: "Send a suggestion",
    FR: "Envoyer une suggestion",
  },

  form_subtitle: {
    ES: "Escríbenos con total libertad. Leemos todas las ideas para decidir las siguientes funciones de Euskalia.",
    EUS: "Idatzi nahi duzuna askatasunez. Jasotzen ditugun ideia guztiak irakurtzen ditugu Euskaliaren hurrengo funtzioak erabakitzeko.",
    EN: "Write to us freely. We read every idea to decide Euskalia’s next features.",
    FR: "Écrivez-nous librement. Nous lisons toutes les idées pour décider des prochaines fonctionnalités d’Euskalia.",
  },

  form_badge: {
    ES: "Tus sugerencias nos ayudan a mejorar cada semana.",
    EUS: "Zure iradokizunek astero laguntzen digute hobetzen.",
    EN: "Your suggestions help us improve every week.",
    FR: "Vos suggestions nous aident à nous améliorer chaque semaine.",
  },

  textarea_label: {
    ES: "Escribe aquí tu sugerencia",
    EUS: "Idatzi hemen zure iradokizuna",
    EN: "Write your suggestion here",
    FR: "Écrivez votre suggestion ici",
  },

  textarea_placeholder: {
    ES: "Cuéntanos qué herramienta, cambio o mejora te gustaría ver en Euskalia, y por qué crees que sería útil para ti o para otras personas.",
    EUS: "Esan zein tresna, aldaketa edo hobekuntza gustatuko litzaizukeen Euskalian, eta zergatik izango litzatekeen erabilgarria zuretzat edo besteentzat.",
    EN: "Tell us what tool, change, or improvement you’d like to see in Euskalia, and why it would be useful for you or others.",
    FR: "Dites-nous quel outil, changement ou amélioration vous aimeriez voir dans Euskalia, et pourquoi cela serait utile pour vous ou pour d’autres.",
  },

  email_label: {
    ES: "Correo electrónico (opcional)",
    EUS: "Helbide elektronikoa (aukerakoa)",
    EN: "Email (optional)",
    FR: "E-mail (optionnel)",
  },

  email_placeholder: {
    ES: "Solo si quieres que podamos contactarte para aclarar algo.",
    EUS: "Zerbait argitzeko zurekin harremanetan jar gaitezen nahi baduzu bakarrik.",
    EN: "Only if you want us to contact you to clarify something.",
    FR: "Uniquement si vous voulez que nous puissions vous contacter pour clarifier quelque chose.",
  },

  characters_suffix: {
    ES: "caracteres",
    EUS: "karaktere",
    EN: "characters",
    FR: "caractères",
  },

  error_required: {
    ES: "Por favor, escribe tu sugerencia antes de enviarla.",
    EUS: "Mesedez, bidali aurretik idatzi zure iradokizuna.",
    EN: "Please write your suggestion before sending it.",
    FR: "Veuillez écrire votre suggestion avant de l’envoyer.",
  },

  error_min_length: {
    ES: "Añade un poco más de detalle para que podamos entender bien tu sugerencia.",
    EUS: "Gehitu xehetasun pixka bat gehiago zure iradokizuna hobeto ulertu dezagun.",
    EN: "Add a bit more detail so we can understand your suggestion clearly.",
    FR: "Ajoutez un peu plus de détails afin que nous puissions bien comprendre votre suggestion.",
  },

  success_message: {
    ES: "Gracias por tu sugerencia. La tendremos en cuenta para las próximas mejoras.",
    EUS: "Eskerrik asko zure iradokizunagatik. Hurrengo hobekuntzetan kontuan hartuko dugu.",
    EN: "Thanks for your suggestion. We’ll consider it for upcoming improvements.",
    FR: "Merci pour votre suggestion. Nous en tiendrons compte pour les prochaines améliorations.",
  },

  button_label: {
    ES: "Enviar sugerencia",
    EUS: "Biali iradokizuna",
    EN: "Send suggestion",
    FR: "Envoyer la suggestion",
  },

  form_description: {
    ES: " qué te gustaría que añadamos o mejoremos en Euskalia: nuevas herramientas, cambios en el diseño, límites, ideas para estudiar mejor, cosas que te molestan… cualquier comentario es bienvenido.",
    EUS: "Zer gustatuko litzaizuke Euskalian gehitu edo hobetzea: tresna berriak, diseinu aldaketak, muga berriak, ikasteko ideiak hobeak... edozein iradokizun ongi etorria da.",
    EN: " what you’d like us to add or improve in Euskalia: new tools, design changes, limits, ideas to study better, things that annoy you… any feedback is welcome.",
    FR: " ce que vous aimeriez que nous ajoutions ou améliorions dans Euskalia : nouveaux outils, changements de design, limites, idées pour mieux étudier, choses qui vous gênent… tout commentaire est le bienvenu.",
  },
},




  // =========================
  //        Pro Help
  // =========================
proHelp: {
  title: {
    ES: "¿En qué podemos ayudarte?",
    EUS: "Nola lagun diezazukegu?",
    EN: "How can we help you?",
    FR: "Comment pouvons-nous vous aider ?",
  },
  search_placeholder: {
    ES: "Describe tu problema o escribe una pregunta",
    EUS: "Deskribatu zure arazoa edo idatzi galdera bat",
    EN: "Describe your issue or ask a question",
    FR: "Décrivez votre problème ou posez une question",
  },
  // SECCIÓN: EMPEZAR A USAR EUSKALIA
  section_getting_started_title: {
    ES: "Empezar a usar Euskalia",
    EUS: "Euskalia erabiltzen hasi",
    EN: "Getting started with Euskalia",
    FR: "Bien démarrer avec Euskalia",
  },

  section_getting_started_q1_title: {
    ES: "¿Qué es Euskalia y para qué sirve?",
    EUS: "Zer da Euskalia eta zertarako balio du?",
    EN: "What is Euskalia and what is it for?",
    FR: "Qu’est-ce que Euskalia et à quoi sert-il ?",
  },
  section_getting_started_q1_body: {
    ES: "Euskalia es una plataforma de inteligencia artificial diseñada para trabajadores, estudiantes y cualquier persona que necesite traducir o resumir contenido de forma rápida y sencilla. Está centrada en el público vasco o en cualquiera que necesite trabajar con el euskera.\n\nEuskalia está centrada en el euskera como idioma principal. Tanto la traducción como el resto de herramientas funcionan siempre en relación al euskera, utilizando otros idiomas como castellano, inglés o francés únicamente para convertir el contenido hacia el euskera o desde el euskera, según las necesidades.\n\nEuskalia se caracteriza por un diseño claro y una experiencia de uso pensada para trabajar con textos sin fricciones. La interfaz es sencilla, directa y accesible, lo que permite centrarse en el contenido desde el primer momento, sin distracciones ni configuraciones complejas.",
    EUS: "Euskalia adimen artifizialeko plataforma bat da, langileei, ikasleei eta edukiak modu azkar eta erraz batean itzuli edo laburtu behar dituen edonori zuzendua. Euskal herritarrei eta euskararekin lan egin behar duen edonori laguntzera bideratua dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfazea sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
    EN: "Euskalia is an AI platform designed for workers, students, and anyone who needs to translate or summarize content quickly and easily. It is focused on the Basque community and anyone who needs to work with Basque.\n\nEuskalia uses Basque as its main language. Both translation and the rest of the tools always work in relation to Basque, using other languages such as Spanish, English, or French only to convert content to or from Basque, depending on the need.\n\nEuskalia stands out for a clear design and a frictionless text-focused experience. The interface is simple, direct, and accessible, so you can focus on the content from the very first moment without distractions or complex settings.",
    FR: "Euskalia est une plateforme d’IA conçue pour les travailleurs, les étudiants et toute personne ayant besoin de traduire ou de résumer du contenu rapidement et simplement. Elle s’adresse au public basque et à toute personne devant travailler avec le basque.\n\nEuskalia est centrée sur le basque comme langue principale. La traduction comme les autres outils fonctionnent toujours en lien avec le basque, en utilisant d’autres langues comme l’espagnol, l’anglais ou le français uniquement pour convertir le contenu vers le basque ou depuis le basque, selon les besoins.\n\nEuskalia se distingue par un design clair et une expérience pensée pour travailler avec des textes sans friction. L’interface est simple, directe et accessible, ce qui permet de se concentrer sur le contenu dès le départ, sans distractions ni réglages complexes.",
  },

  section_getting_started_q2_title: {
    ES: "Primeros pasos: ¿cómo empiezo a usar la web?",
    EUS: "Lehen urratsak: nola hasi webgunea erabiltzen?",
    EN: "First steps: how do I start using the website?",
    FR: "Premiers pas : comment commencer à utiliser le site ?",
  },
  section_getting_started_q2_body: {
    ES: "En la página principal eliges la herramienta que quieras usar. Puedes introducir el contenido pegando texto, subiendo un documento o añadiendo una URL, seleccionar el idioma y generar el resultado al instante. Después, puedes copiar el resultado o guardarlo en tu biblioteca para usarlo más tarde.",
    EUS: "Hasierako orrian erabili nahi duzun tresna aukeratzen duzu. Testua itsatsiz, dokumentu bat igota edo URL bat gehituta edukia sartu dezakezu, hizkuntza hautatu eta emaitza berehala sortu. Ondoren, emaitza kopiatu edo liburutegian gorde dezakezu geroago erabiltzeko.",
    EN: "On the home page, choose the tool you want to use. You can add content by pasting text, uploading a document, or adding a URL, select the language, and generate the result instantly. Then you can copy the result or save it to your library to use later.",
    FR: "Sur la page d’accueil, choisissez l’outil que vous voulez utiliser. Vous pouvez ajouter du contenu en collant un texte, en téléversant un document ou en ajoutant une URL, sélectionner la langue et générer le résultat instantanément. Ensuite, vous pouvez copier le résultat ou l’enregistrer dans votre bibliothèque pour plus tard.",
  },

  section_getting_started_q3_title: {
    ES: "¿Qué idiomas soporta Euskalia?",
    EUS: "Zein hizkuntza onartzen ditu Euskaliak?",
    EN: "Which languages does Euskalia support?",
    FR: "Quelles langues Euskalia prend-il en charge ?",
  },
  section_getting_started_q3_body: {
    ES: "Euskalia funciona con cuatro idiomas: euskera, castellano, inglés y francés. Todas las herramientas están diseñadas para usar siempre el euskera como idioma principal.",
    EUS: "Euskalia lau hizkuntzatan funtzionatzen du: euskaraz, gaztelaniaz, ingelesez eta frantsesez. Tresna guztiak euskara hizkuntza nagusi gisa erabiltzeko diseinatuta daude.",
    EN: "Euskalia works with four languages: Basque, Spanish, English, and French. All tools are designed to always use Basque as the main language.",
    FR: "Euskalia fonctionne avec quatre langues : basque, espagnol, anglais et français. Tous les outils sont conçus pour utiliser le basque comme langue principale.",
  },
  // SECCIÓN: TRADUCTOR
  section_translator_title: {
    ES: "Traductor, resumidor y corrector",
    EUS: "Itzultzailea, laburtzailea eta zuzentzailea",
    EN: "Translator, summarizer and corrector",
    FR: "Traducteur, résumeur et correcteur",
  },

  section_paraphraser_title: {
    ES: "Parafraseador, detector de IA y humanizador",
    EUS: "Parafraseatzailea, IA detektagailua eta humanizatzailea",
    EN: "Paraphraser, AI detector and humanizer",
    FR: "Paraphraseur, détecteur d’IA et humaniseur",
  },

  /* ===== SECCIÓN 1 ===== */
  section_1: {
    ES: "¿Cómo funciona el Traductor?",
    EUS: "Nola funtzionatzen du itzultzaileak?",
    EN: "How does the Translator work?",
    FR: "Comment fonctionne le traducteur ?",
  },
  section_11: {
    ES: "El Traductor de Euskalia permite traducir textos, documentos o páginas web entre distintos idiomas, usando el euskera como eje principal. Solo introduce el contenido, elige el idioma de origen y destino y genera la traducción al instante.",
    EUS: "Euskaliako itzultzaileak testuak, dokumentuak edo webguneak hainbat hizkuntzatan itzultzeko aukera ematen du, euskara ardatz nagusi gisa erabiliz. Edukia sartu, hizkuntzak aukeratu eta berehala sortzen du itzulpena.",
    EN: "Euskalia’s Translator allows you to translate texts, documents, or web pages between different languages, using Basque as the main reference. Just add the content, choose source and target languages, and generate the translation instantly.",
    FR: "Le traducteur d’Euskalia permet de traduire des textes, documents ou pages web entre différentes langues, avec le basque comme langue de référence. Il suffit d’ajouter le contenu, choisir les langues et générer la traduction.",
  },

  /* ===== SECCIÓN 2 ===== */
  section_2: {
    ES: "¿Para qué sirve el Resumidor?",
    EUS: "Zertarako balio du laburtzaileak?",
    EN: "What is the Summarizer for?",
    FR: "À quoi sert le résumeur ?",
  },
  section_22: {
    ES: "El Resumidor transforma textos largos, documentos o artículos en resúmenes claros y concisos. Euskalia identifica las ideas más importantes para que puedas entender el contenido en menos tiempo.",
    EUS: "Laburtzaileak testu luzeak, dokumentuak edo artikuluak laburpen argi eta zehatzetan bihurtzen ditu. Euskaliak ideia garrantzitsuenak identifikatzen ditu denbora aurrezteko eta kalitatezko testu labur bat sortzeko.",
    EN: "The Summarizer turns long texts, documents, or articles into clear and concise summaries. Euskalia extracts the key ideas so you can understand the content faster.",
    FR: "Le résumeur transforme des textes longs, documents ou articles en résumés clairs et concis. Euskalia identifie les idées essentielles pour gagner du temps.",
  },

  /* ===== SECCIÓN 3 ===== */
  section_3: {
    ES: "¿Qué hace el Corrector?",
    EUS: "Zer egiten du zuzentzaileak?",
    EN: "What does the Corrector do?",
    FR: "Que fait le correcteur ?",
  },
  section_33: {
    ES: "El Corrector revisa textos para detectar errores gramaticales, ortográficos y de estilo. Además de corregir fallos, mejora la claridad y coherencia del texto.",
    EUS: "Zuzentzaileak testuak berrikusten ditu akats gramatikalak, ortografikoak eta estilokoak detektatzeko. Ondores testua zuzenduta sortzen du akatzak berrikusteko aukerarekin.",
    EN: "The Corrector reviews texts to detect grammatical, spelling, and style errors, improving clarity and coherence.",
    FR: "Le correcteur analyse les textes pour détecter les fautes grammaticales, orthographiques et de style, et améliore leur clarté.",
  },

  /* ===== SECCIÓN 4 ===== */
  section_4: {
    ES: "¿Para qué sirve el Parafraseador?",
    EUS: "Zertarako balio du parafraseatzaileak?",
    EN: "What is the Paraphraser for?",
    FR: "À quoi sert le paraphraseur ?",
  },
  section_44: {
    ES: "El Parafraseador reescribe un texto manteniendo su significado original, pero usando una redacción y estructura diferentes. Es útil para mejorar la originalidad o adaptar el tono.",
    EUS: "Parafraseatzaileak testu bat berridazten du esanahia mantenduz, baina egitura eta idazkera desberdina erabiliz, erabiltzailearen esanetara.",
    EN: "The Paraphraser rewrites a text while keeping its original meaning, using different wording and structure. It’s useful to improve originality or adapt the tone.",
    FR: "Le paraphraseur réécrit un texte en conservant son sens, avec une formulation et une structure différentes. C’est utile pour améliorer l’originalité ou adapter le ton.",
  },

  /* ===== SECCIÓN 5 ===== */
  section_5: {
    ES: "¿Cómo funciona el Detector de IA?",
    EUS: "Nola funtzionatzen du IA detektagailuak?",
    EN: "How does the AI Detector work?",
    FR: "Comment fonctionne le détecteur d’IA ?",
  },
  section_55: {
    ES: "El Detector de IA analiza un texto y estima la probabilidad de que haya sido generado por inteligencia artificial. Es una ayuda orientativa para contextos académicos o profesionales.",
    EUS: "IA detektagailuak testu bat aztertzen du eta adimen artifizialak sortua izan den probabilitatea kalkulatzen du. Testuinguru akademiko edo profesionaletarako laguntza orientagarri bat da",
    EN: "The AI Detector analyzes a text and estimates the likelihood that it was generated by artificial intelligence. It’s a helpful estimate for academic or professional contexts.",
    FR: "Le détecteur d’IA analyse un texte et estime la probabilité qu’il ait été généré par une intelligence artificielle. C’est une aide indicative pour des contextes académiques ou professionnels.",
  },

  /* ===== SECCIÓN 6 ===== */
  section_6: {
    ES: "¿Qué es el Humanizador?",
    EUS: "Zer da humanizatzailea?",
    EN: "What is the Humanizer?",
    FR: "Qu’est-ce que l’humaniseur ?",
  },
  section_66: {
    ES: "El Humanizador convierte textos generados por IA en un lenguaje más natural y humano, ajustando el tono y la fluidez para que suenen escritos por una persona.",
    EUS: "Humanizatzaileak IA bidez sortutako testuak hizkera naturalago eta gizatiarrago bihurtzen ditu. Tonua eta jarioa doitzeko aukera, erabiltzailearen beharretara.",
    EN: "The Humanizer turns AI-generated text into more natural, human-like language by improving tone and flow so it reads like it was written by a person.",
    FR: "L’humaniseur transforme les textes générés par l’IA en un langage plus naturel et humain, en améliorant le ton et la fluidité pour qu’ils paraissent écrits par une personne.",
  },
  // SECCIÓN: FACTURACIÓN Y PLANES
  section_billing_title: {
    ES: "Cuenta y facturación",
    EUS: "Kontua eta fakturazioa",
    EN: "Account & billing",
    FR: "Compte et facturation",
  },
  section_billing_q1_title: {
    ES: "¿Qué incluye el Plan Pro?",
    EUS: "Zer dauka barne Pro Planak?",
    EN: "What does the Pro Plan include?",
    FR: "Que comprend le forfait Pro ?",
  },
  section_billing_q1_body: {
    ES: "Traducciones y resúmenes más rápidos, límites ampliados, subida de documentos más pesados y funciones exclusivas.",
    EUS: "Itzulpen eta laburpen azkarragoak, muga zabalduak, dokumentu astunagoak igotzeko aukera eta funtzio esklusiboak.",
    EN: "Faster translations and summaries, higher limits, larger document uploads, and exclusive features.",
    FR: "Traductions et résumés plus rapides, limites plus élevées, téléversement de documents plus lourds et fonctionnalités exclusives.",
  },
  section_billing_q2_title: {
    ES: "¿Dónde veo mis recibos?",
    EUS: "Non ikus ditzaket nire ordainagiriak?",
    EN: "Where can I see my receipts?",
    FR: "Où puis-je voir mes reçus ?",
  },
  section_billing_q2_body: {
    ES: "En tu área de Facturación puedes ver tus pagos, historial y gestionar tu suscripción.",
    EUS: "Fakturazio atalean zure ordainketak, historia eta harpidetzaren kudeaketa ikus ditzakezu.",
    EN: "In your Billing area you can see your payments, history, and manage your subscription.",
    FR: "Dans votre espace Facturation, vous pouvez voir vos paiements, l’historique et gérer votre abonnement.",
  },
  section_billing_q3_title: {
    ES: "¿Cómo cambio o cancelo mi plan?",
    EUS: "Nola aldatu edo ezeztatu dezaket nire plana?",
    EN: "How do I change or cancel my plan?",
    FR: "Comment changer ou annuler mon forfait ?",
  },
  section_billing_q3_body: {
    ES: "Puedes cambiar entre planes o cancelar desde el apartado Ajustes → Suscripción.",
    EUS: "Planak aldatu edo ezeztatu ditzakezu Ezarpenak → Harpidetza ataletik.",
    EN: "You can switch plans or cancel from Settings → Subscription.",
    FR: "Vous pouvez changer de forfait ou annuler depuis Paramètres → Abonnement.",
  }, 
  // SECCIÓN: SOLUCIONAR PROBLEMAS
  section_problems_title: {
    ES: "Solucionar problemas",
    EUS: "Arazoak konpontzea",
    EN: "Troubleshooting",
    FR: "Résolution de problèmes",
  },
  section_problems_q1_title: {
    ES: "No puedo subir un PDF",
    EUS: "Ezin dut PDF bat igo",
    EN: "I can’t upload a PDF",
    FR: "Je ne peux pas téléverser un PDF",
  },
  section_problems_q1_body: {
    ES: "Comprueba que el archivo no esté dañado y que no supere el límite del plan actual.",
    EUS: "Egiaztatu fitxategia ez dagoela hondatuta eta uneko planaren mugak ez dituela gainditzen.",
    EN: "Check that the file isn’t corrupted and doesn’t exceed your current plan limit.",
    FR: "Vérifiez que le fichier n’est pas endommagé et qu’il ne dépasse pas la limite de votre forfait.",
  },
  section_problems_q2_title: {
    ES: "La URL no carga o no se puede traducir",
    EUS: "URLa ez da kargatzen edo ezin da itzuli",
    EN: "The URL won’t load or can’t be translated",
    FR: "L’URL ne charge pas ou ne peut pas être traduite",
  },
  section_problems_q2_body: {
    ES: "Algunas páginas pueden bloquear el acceso automático. Intenta copiar y pegar el contenido manualmente.",
    EUS: "Zenbait webgunek sarbide automatikoa blokeatzen dute. Saiatu edukia eskuz kopiatu eta itsasten.",
    EN: "Some sites block automated access. Try copying and pasting the content manually.",
    FR: "Certaines pages bloquent l’accès automatique. Essayez de copier-coller le contenu manuellement.",
  },
  section_problems_q3_title: {
    ES: "Los resultados tardan demasiado",
    EUS: "Emaitzek gehiegi behar dute",
    EN: "Results are taking too long",
    FR: "Les résultats prennent trop de temps",
  },
  section_problems_q3_body: {
    ES: "Puede deberse a tráfico alto o a un documento muy grande. Prueba a reducir el contenido o reintentar unos segundos después.",
    EUS: "Trafiko handia edo dokumentu handiegia izan daiteke arrazoia. Saiatu edukia murrizten edo berriro saiatzen segundo batzuk geroago.",
    EN: "It may be due to high traffic or a very large document. Try reducing the content or retrying a few seconds later.",
    FR: "Cela peut être dû à un trafic élevé ou à un document très volumineux. Essayez de réduire le contenu ou de réessayer quelques secondes plus tard.",
  },
  bottom_support_text: {
    ES: "Si sigues teniendo alguna duda, nuestro equipo está aquí para ayudarte.",
    EUS: "Zalantzak izanez gero, gure taldea hemen dago laguntzeko.",
    EN: "If you still have questions, our team is here to help.",
    FR: "Si vous avez encore des questions, notre équipe est là pour vous aider.",
  },

  bottom_support_cta: {
    ES: "Contactar con soporte",
    EUS: "Jarri harremanetan laguntzarekin",
    EN: "Contact support",
    FR: "Contacter le support",
  },

  bottom_support_mascot_alt: {
    ES: "Mascota de Euskalia ofreciendo ayuda",
    EUS: "Euskaliaren maskota laguntza eskaintzen",
    EN: "Euskalia mascot offering help",
    FR: "Mascotte Euskalia proposant de l’aide",
  },
  support_bubble_text: {
    ES: "Si sigues teniendo alguna duda, nuestro equipo está aquí para ayudarte.",
    EUS: "Zalantzak izanez gero, gure taldea hemen dago laguntzeko.",
    EN: "If you still have questions, our team is here to help.",
    FR: "Si vous avez encore des questions, notre équipe est là pour vous aider.",
  },

  support_button_label: {
    ES: "Contactar con soporte",
    EUS: "Jarri harremanetan",
    EN: "Contact support",
    FR: "Contacter le support",
  },

  support_mascot_alt: {
    ES: "Mascota de Euskalia ofreciendo ayuda",
    EUS: "Euskaliaren maskota laguntza eskaintzen",
    EN: "Euskalia mascot offering help",
    FR: "Mascotte Euskalia proposant de l’aide",
  },

},




// =========================
//        PRO SETTINGS
// ========================= 

settings_title: {
  ES: "Ajustes",
  EUS: "Ezarpenak",
  EN: "Settings",
  FR: "Paramètres",
},
settings_subtitle: {
  ES: "Personaliza tu experiencia en Euskalia.",
  EUS: "Pertsonalizatu zure esperientzia Euskalian.",
  EN: "Customize your experience in Euskalia.",
  FR: "Personnalisez votre expérience sur Euskalia.",
},
//PERFIL
settings_profile_title: {
  ES: "Perfil",
  EUS: "Profila",
  EN: "Profile",
  FR: "Profil",
},
settings_profile_desc: {
  ES: "Información básica para identificar tu cuenta.",
  EUS: "Zure kontua identifikatzeko oinarrizko informazioa.",
  EN: "Basic information to identify your account.",
  FR: "Informations de base pour identifier votre compte.",
},
settings_profile_display_name: {
  ES: "Nombre visible",
  EUS: "Izen ikusgaia",
  EN: "Display name",
  FR: "Nom affiché",
},
settings_profile_email: {
  ES: "Email",
  EUS: "Emaila",
  EN: "Email",
  FR: "E-mail",
},
settings_profile_email_placeholder: {
  ES: "nombre@ejemplo.com",
  EUS: "izena@adierazpena.com",
  EN: "name@example.com",
  FR: "nom@exemple.com",
},
settings_profile_security_hint: {
  ES: "Puedes cambiar tu nombre de perfil aqui.",
  EUS: "Zure profileko izena aldatu dezakezu hemen.",
  EN: "You can change your profile name here.",
  FR: "Vous pouvez modifier le nom de votre profil ici.",
},
settings_manage_plan: {
  ES: "Gestionar plan",
  EUS: "Plana kudeatu",
  EN: "Manage plan",
  FR: "Gérer le forfait",
},
//        APARIENCIA
settings_appearance_title: {
  ES: "Apariencia",
  EUS: "Itxura",
  EN: "Appearance",
  FR: "Apparence",
},
settings_appearance_desc: {
  ES: "Elige cómo se ve la interfaz.",
  EUS: "Aukeratu interfazeak nola ikusten den.",
  EN: "Choose how the interface looks.",
  FR: "Choisissez l’apparence de l’interface.",
},
settings_appearance_theme: {
  ES: "Tema",
  EUS: "Gaia",
  EN: "Theme",
  FR: "Thème",
},
settings_appearance_theme_light: {
  ES: "Claro",
  EUS: "Argia",
  EN: "Light",
  FR: "Clair",
},
settings_appearance_language: {
  ES: "Idioma",
  EUS: "Hizkuntza",
  EN: "Language",
  FR: "Langue",
},
settings_appearance_language_hint: {
  ES: "Cambia el idioma desde aquí.",
  EUS: "Aldatu hizkuntza hemendik.",
  EN: "Change the language here.",
  FR: "Changez la langue ici.",
},
//      NOTIFICACIONES
settings_notifications_title: {
  ES: "Notificaciones",
  EUS: "Jakinarazpenak",
  EN: "Notifications",
  FR: "Notifications",
},
settings_notifications_desc: {
  ES: "Elige qué correos o avisos quieres recibir.",
  EUS: "Aukeratu zein mezu edo abisu jaso nahi dituzun.",
  EN: "Choose which emails or alerts you want to receive.",
  FR: "Choisissez quels e-mails ou alertes vous souhaitez recevoir.",
},

settings_notifications_product: {
  ES: "Novedades de producto",
  EUS: "Produktu-berrikuntzak",
  EN: "Product updates",
  FR: "Nouveautés produit",
},
settings_notifications_product_hint: {
  ES: "Lanzamientos, mejoras y anuncios importantes.",
  EUS: "Kaleratzeak, hobekuntzak eta iragarki garrantzitsuak.",
  EN: "Releases, improvements, and important announcements.",
  FR: "Lancements, améliorations et annonces importantes.",
},

settings_notifications_tips: {
  ES: "Consejos y buenas prácticas",
  EUS: "Aholkuak eta praktika onak",
  EN: "Tips & best practices",
  FR: "Conseils et bonnes pratiques",
},
settings_notifications_tips_hint: {
  ES: "Emails breves para aprovechar mejor Euskalia.",
  EUS: "Email laburrak Euskalia hobeto aprobetxatzeko.",
  EN: "Short emails to help you get more from Euskalia.",
  FR: "De courts e-mails pour mieux profiter d’Euskalia.",
},

settings_notifications_billing: {
  ES: "Facturación",
  EUS: "Fakturazioa",
  EN: "Billing",
  FR: "Facturation",
},
settings_notifications_billing_hint: {
  ES: "Recibos, cambios de plan y recordatorios de pago.",
  EUS: "Ordainagiriak, plan-aldaketak eta ordainketa-oharpenak.",
  EN: "Receipts, plan changes, and payment reminders.",
  FR: "Reçus, changements de forfait et rappels de paiement.",
},
settings_cta_save: {
  ES: "Guardar cambios",
  EUS: "Aldaketak gorde",
  EN: "Save changes",
  FR: "Enregistrer les modifications",
},
settings_saved_ok: { 
  ES: "Configuración guardada.",
  EUS: "Ezarpenak gordeta.",
  EN: "Settings saved.",
  FR: "Paramètres enregistrés."
},
settings_plan_title: {
  ES: "Plan y suscripción",
  EUS: "Plana eta harpidetza",
  EN: "Plan & subscription",
  FR: "Forfait et abonnement",
},
settings_plan_desc: {
  ES: "Tu cuenta seguirá activa aunque canceles la suscripción.",
  EUS: "Zure kontua aktibo jarraituko du harpidetza bertan behera utzita ere.",
  EN: "Your account will stay active even if you cancel your subscription.",
  FR: "Votre compte restera actif même si vous annulez l’abonnement.",
},
settings_plan_row_plan: {
  ES: "Plan",
  EUS: "Plana",
  EN: "Plan",
  FR: "Forfait",
},
settings_plan_status_active: {
  ES: "Activo",
  EUS: "Aktibatuta",
  EN: "Active",
  FR: "Actif",
},
settings_plan_value_pro: {
  ES: "Pro",
  EUS: "Pro",
  EN: "Pro",
  FR: "Pro",
},
settings_plan_row_renews: {
  ES: "Renovación",
  EUS: "Berritzea",
  EN: "Renews",
  FR: "Renouvellement",
},
settings_plan_renews_value: {
  ES: "—",
  EUS: "—",
  EN: "—",
  FR: "—",
},
settings_plan_cancel_btn: {
  ES: "Cancelar suscripción",
  EUS: "Harpidetza bertan behera utzi",
  EN: "Cancel subscription",
  FR: "Annuler l’abonnement",
},
settings_plan_demo_alert: {
  ES: "Esto es una demo. La cancelación aún no está disponible.",
  EUS: "Hau demo bat da. Ezin da oraindik bertan behera utzi.",
  EN: "This is a demo. Cancellation isn't available yet.",
  FR: "Ceci est une démo. L’annulation n’est pas encore disponible.",
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
