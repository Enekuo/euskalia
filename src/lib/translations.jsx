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
    tools:     { ES: "Herramientas",  EUS: "Tresnak" },
    resources: { ES: "Recursos",      EUS: "Baliabideak" },
    pricing:   { ES: "Precios",       EUS: "Prezioak" },
    signIn:    { ES: "Iniciar sesión",EUS: "Hasi saioa" },
    startFree: { ES: "Crear cuenta",  EUS: "Sortu kontua" },
  },
  toolsMenu: {
    translatorTitle:    { ES: "Traductor",         EUS: "Itzultzailea" },
    translatorSubtitle: { ES: "Euskera ↔ Español", EUS: "Euskara ↔ Gaztelania" },
    summaryTitle:       { ES: "Resumidor",         EUS: "Laburtzailea" },
    summarySubtitle:    { ES: "Resúmenes con IA",  EUS: "Laburpenak IA-rekin" },
  },

  resourcesMenu: {
    support:     { ES: "Soporte",     EUS: "Laguntza" }, 
    aiChat:      { ES: "Chat de IA",  EUS: "IA txata" },
    suggestions: { ES: "Sugerencias", EUS: "Iradokizunak" },

  },
  // =========================
  //       FREE TRADUCTOR
  // =========================
  translator: {
    left_placeholder:  { ES: "Escribe o pega el texto aquí.", EUS: "Idatzi edo itsatsi testua hemen." },
    right_placeholder: { ES: "Aquí aparecerá la traducción.", EUS: "Hemen agertuko da itzulpena." },

    /* === NUEVAS CLAVES para los botones/tooltip del Hero === */
    listen:     { ES: "Escuchar",          EUS: "Entzun" },
    copy:       { ES: "Copiar",            EUS: "Kopiatu" },
    copied:     { ES: "Copiado",           EUS: "Kopiatuta" },
    pdf:        { ES: "PDF",               EUS: "PDF" },
    clear_left: { ES: "Borrar",            EUS: "Garbitu" },
    dictate:    { ES: "Dictar",            EUS: "Diktatu" },
    listening:  { ES: "Escuchando…",       EUS: "Entzuten…" },
    loading:    { ES: "Traduciendo…",      EUS: "Itzultzen…" },
  },
   save_button_label: {
    ES: "Guardar",
    EUS: "Gorde",
  },
    library_saved_toast: {
    ES: "Guardado en biblioteca",
    EUS: "Liburutegian gordeta",
  },





  // =========================
  //      FREE SUMMARY RESUMIDOR
  // =========================    
  summary: {
    title:                 { ES: "Resumidor", EUS: "Laburtzailea" },
    sources_title:         { ES: "Fuentes", EUS: "Iturriak" },
    sources_tab_text:      { ES: "Texto", EUS: "Testua" },
    sources_tab_document:  { ES: "Documento", EUS: "Dokumentua" },
    sources_tab_url:       { ES: "URL", EUS: "URL" },
    copy:                  { ES: "Copiar", EUS: "Kopiatu"},
    copied:                { ES: "Copiado", EUS: "Kopiatuta"},
    pdf:                   { ES: "PDF", EUS: "PDF" },
    
    
    // Mensajes de ayuda (izquierda/derecha)
    create_help_left: {
      ES:  "Aquí aparecerán tus textos o documentos subidos. Puedes añadir archivos PDF, texto copiado, enlaces web...",
      EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak. Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak...",
    },
    create_help_right: {
      ES:  "Aquí verás el resultado generado por la IA, junto.",
      EUS: "Hemen ikusiko duzu adimen artifizialak sortutako emaitza.",
    },

    // --- Longitud del resumen (nuevas) ---
    length_short:  { ES: "Breve",     EUS: "Laburra" },
    length_medium: { ES: "Medio",     EUS: "Ertaina" },
    length_long:   { ES: "Detallado", EUS: "Zehatza" },

    // --- Selector de idioma (sin Auto) ---
    output_language:     { ES: "Idioma",     EUS: "Hizkuntza", EN: "Language" , FR: "Langue" },
    output_language_eus: { ES: "Euskera",    EUS: "Euskara",   EN: "Basque",    FR: "Basque" },
    output_language_es:  { ES: "Castellano", EUS: "Gaztelania",EN: "Spanish",   FR: "Espagnol" },
    output_language_en:  { ES: "Inglés",     EUS: "Ingelesa",  EN: "English",   FR: "Anglais" },
    output_language_fr:  { ES: "Francés",    EUS: "Frantsesa", EN: "French",    FR: "Français" },
    // Prompt
    generate_from_sources: { ES: "Generar resumen", EUS: "Laburpena sortu" },
    bottom_input_ph: {
      ES:  "Escribe el prompt aqui",
      EUS: "Idatzi zure prompta hemen.",
    },
    generate_with_prompt:  { ES: "Generar", EUS: "Sortu" },

    // Estado de carga
    loading_label: { ES: "Generando el resumen…", EUS: "Laburpena sortzen…" },

    // Texto (pestaña)
    enter_text_here_full: {
      ES: "Escribe o pega tu texto aquí…",
      EUS: "Idatzi edo itsatsi zure testua hemen…"
    },

    ready_message: {
      ES: "Resumen listo · Guardar en tu biblioteca",
      EUS: "Laburpena prest · Gorde zure liburutegian",
    },

    save_button_label: {
      ES: "Guardar",
      EUS: "Gorde",
    },


    // Documento (pestaña)
    choose_file_title: {
      ES: "Elige tu archivo o carpeta",
      EUS: "Aukeratu zure fitxategia edo karpeta."
    },
    accepted_formats: {
      ES: "Formatos admitidos: PDF, DOCX, TXT, MD, imágenes…",
      EUS: "Onartutako formatuak: PDF, DOCX, TXT, MD, irudiak…"
    },
    folder_hint: {
      ES: "Puedes arrastrar varios archivos a la vez.",
      EUS: "Fitxategi bat baino gehiago batera arrasta ditzakezu."
    },

    // URL (pestaña)
    paste_urls_label: {
      ES: "Pegar URLs*",
      EUS: "URLak itsatsi*"
    },
    add_url: {
      ES: "Añadir URLs",
      EUS: "URLak gehitu"
    },
    save_urls: {
      ES: "Guardar",
      EUS: "Gorde"
    },
    cancel: {
      ES: "Cancelar",
      EUS: "Ezeztatu"
    },
    urls_note_visible: {
      ES: "Solo se importará el texto visible del sitio web.",
      EUS: "Webguneko testu ikusgarria bakarrik inportatuko da."
    },
    urls_note_paywalled: {
      ES: "No se admiten artículos de pago.",
      EUS: "Ordainpeko artikuluak ez dira onartzen."
    },
    remove: {
      ES: "Quitar",
      EUS: "Kendu"
    },
    paste_urls_placeholder: {
      ES: "Introduce aquí una o más URLs (separadas por línea)",
      EUS: "Itsatsi hemen URL bat edo gehiago (lerro bakoitzean bat)"
    },



    /* === NUEVAS CLAVES: aviso límite plan gratis === */
    limit_title:   { ES: "Has alcanzado el límite del plan Gratis", EUS: "Doako planaren muga gainditu duzu" },
    limit_cta:     { ES: "Probar plan Premium", EUS: "Premium plana probatu" },
    limit_dismiss: { ES: "Seguir con plan Gratis", EUS: "Jarraitu doako planarekin" },
    limit_note:    { ES: "Límite actual: 12.000 caracteres por petición.", EUS: "Uneko muga: 12.000 karaktere eskaerako." },



    /* === NUEVAS CLAVES: aviso de función premium (prompt) === */
    premium_prompt_title: {
      ES: "Función disponible en el plan Premium",
      EUS: "Funtzioa hau Premium planean bakarrik"
    },
    premium_prompt_body: {
      ES: "El botón «Generar» usa un prompt: una instrucción para ajustar el resumen a tu gusto (tono, puntos clave, foco…). En el plan Gratis puedes pegar texto y generar el resumen normal. Para usar prompts avanzados, prueba el plan Premium.",
      EUS: "«Sortu» botoiak prompt bat erabiltzen du: laburpena zure nahien arabera doitzen duen jarraibidea (tonoa, gakoak, fokua…). Plan Doanean testua itsatsi eta ohiko laburpena sor dezakezu. Prompt aurreratuak erabiltzeko, probatu Premium plana."
    },
    premium_prompt_cta: {
      ES: "Probar plan Premium",
      EUS: "Premium plana probatu"
    },
    premium_prompt_close: {
      ES: "Entendido",
      EUS: "Ulertuta"
    },



    /* === NUEVAS CLAVES: aviso de contenido desactualizado === */
    outdated_notice: { ES: "El texto ha cambiado. Actualiza el resumen.", EUS: "Testua aldatu da. Eguneratu laburpena." },
    outdated_update: { ES: "Actualizar", EUS: "Eguneratu" },
    outdated_close:  { ES: "Ocultar aviso", EUS: "Abisua ezkutatu" },
  },













  /* === Bloque anidado (por si lo usas en otras vistas) === */
  supportPage: {
    title:       { ES: "Soporte", EUS: "Laguntza" },
    subtitle:    { ES: "¿Necesitas ayuda? Estamos aquí para ayudarte.", EUS: "Laguntza behar duzu? Hemen gaude laguntzeko." },
    kicker:      { ES: "¿Cómo podemos ayudarte?", EUS: "Nola lagun diezazukegu?" },
    description: { ES: "Cuéntanos tu consulta y te responderemos lo antes posible.", EUS: "Esaiguzu zure kontsulta eta ahal bezain laster erantzungo dizugu." },
    bubble:      { ES: "¿Tienes dudas? Escríbenos.", EUS: "Zalantzak al dituzu? Idatziguzu." },
    cta:         { ES: "Contactar", EUS: "Harremanetan jarri" },
    form: {
      name_label:          { ES: "Nombre", EUS: "Izena" },
      name_placeholder:    { ES: "Tu nombre", EUS: "Zure izena" },
      email_label:         { ES: "Email", EUS: "Posta elektronikoa" },
      email_placeholder:   { ES: "Tu email", EUS: "Zure posta elektronikoa" },
      subject_label:       { ES: "Asunto", EUS: "Gaia" },
      subject_placeholder: { ES: "¿Sobre qué necesitas ayuda?", EUS: "Zerez behar duzu laguntza?" },
      message_label:       { ES: "Mensaje", EUS: "Mezua" },
      message_placeholder: { ES: "Cuéntanos en qué podemos ayudarte", EUS: "Esaguzu nola lagundu diezazukegun" },
      submit:              { ES: "Enviar", EUS: "Bidali" },
      privacy_hint:        { ES: "Al enviar, aceptas nuestra", EUS: "Bidaltzean, onartzen duzu gure" },
      privacy_link:        { ES: "Política de privacidad", EUS: "Pribatutasun-politika" },
    },
  },





  /* === SOPORTE === */
  support_title:        { ES: "Soporte", EUS: "Laguntza" },
  support_subtitle:     { ES: "¿Necesitas ayuda? Estamos aquí para ayudarte.", EUS: "Laguntza behar duzu? Hemen gaude laguntzeko." },
  support_kicker:       { ES: "¿Cómo podemos ayudarte?", EUS: "Nola lagun diezazukegu?" },
  support_cta:          { ES: "Contactar", EUS: "Harremanetan jarri" },
  support_bubble_text:  { ES: "¿Tienes dudas? Escríbenos.", EUS: "Zalantzak al dituzu? Idatziguzu." },

  support_form_name_label:          { ES: "Nombre", EUS: "Izena" },
  support_form_name_placeholder:    { ES: "Tu nombre", EUS: "Zure izena" },

  support_form_email_label:         { ES: "Email", EUS: "Posta elektronikoa" },
  support_form_email_placeholder:   { ES: "Tu email", EUS: "Zure posta elektronikoa" },

  support_form_subject_label:       { ES: "Asunto", EUS: "Gaia" },
  support_form_subject_placeholder: { ES: "¿Sobre qué necesitas ayuda?", EUS: "Zerez behar duzu laguntza?" },

  support_form_message_label:       { ES: "Mensaje", EUS: "Mezua" },
  support_form_message_placeholder: { ES: "Cuéntanos en qué podemos ayudarte", EUS: "Esaguzu nola lagundu diezazukegun" },

  support_form_submit:              { ES: "Enviar", EUS: "Bidali" },
  support_form_privacy_hint:        { ES: "Al enviar, aceptas nuestra", EUS: "Bidaltzean, onartzen duzu gure" },
  support_form_privacy_link:        { ES: "Política de privacidad", EUS: "Pribatutasun-politika" },


  suggestions: {
  zone_badge: {
    ES: "Zona de ideas y sugerencias de Euskalia",
    EUS: "Euskaliaren ideien eta iradokizunen gunea",
    EN: "Euskalia ideas & suggestions space",
  },

  title: {
    ES: "Ayuda a decidir las próximas mejoras de Euskalia",
    EUS: "Lagundu Euskaliaren hurrengo hobekuntzak erabakitzen",
    EN: "Help decide the next improvements for Euskalia",
  },

  form_description: {
    ES: "¿Qué te gustaría añadir o mejorar en Euskalia? Nuevas herramientas, cambios de diseño, nuevos límites, mejores ideas para aprender… cualquier sugerencia es bienvenida.",
    EUS: "Zer gustatuko litzaizuke Euskalian gehitu edo hobetzea: tresna berriak, diseinu aldaketak, muga berriak, ikasteko ideiak hobeak… edozein iradokizun ongi etorria da.",
    EN: "What would you like to add or improve in Euskalia? New tools, design changes, new limits, better learning ideas… any suggestion is welcome.",
  },

  textarea_label: {
    ES: "Escribe aquí tu sugerencia",
    EUS: "Idatzi hemen zure iradokizuna",
    EN: "Write your suggestion here",
  },

  textarea_placeholder: {
    ES: "Cuéntanos qué herramienta, cambio o mejora te gustaría ver en Euskalia y por qué sería útil para ti u otras personas.",
    EUS: "Esan zein tresna, aldaketa edo hobekuntza gustatuko litzaizukeen Euskalian, eta zergatik izango litzatekeen erabilgarria zuretzat edo besteentzat.",
    EN: "Tell us which tool, change, or improvement you’d like to see in Euskalia and why it would be useful for you or others.",
  },

  email_label: {
    ES: "Correo electrónico (opcional)",
    EUS: "Helbide elektronikoa (aukerakoa)",
    EN: "Email address (optional)",
  },

  email_placeholder: {
    ES: "Solo lo usaremos si necesitamos contactar contigo.",
    EUS: "Zurekin harremanetan jartzeko bakarrik erabiliko dugu.",
    EN: "We’ll only use it if we need to contact you.",
  },

  characters_suffix: {
    ES: "caracteres",
    EUS: "karaktere",
    EN: "characters",
  },

  button_label: {
    ES: "Enviar sugerencia",
    EUS: "Bidali iradokizuna",
    EN: "Send suggestion",
  },

  error_required: {
    ES: "Por favor, escribe una sugerencia.",
    EUS: "Mesedez, idatzi iradokizun bat.",
    EN: "Please write a suggestion.",
  },

  error_min_length: {
    ES: "Por favor, explica un poco más (mínimo 20 caracteres).",
    EUS: "Mesedez, azaldu pixka bat gehiago (gutxienez 20 karaktere).",
    EN: "Please explain a bit more (minimum 20 characters).",
  },

  success_message: {
    ES: "¡Gracias! Hemos recibido tu sugerencia.",
    EUS: "Eskerrik asko! Zure iradokizuna jaso dugu.",
    EN: "Thank you! We’ve received your suggestion.",
  },
},



  // === CHAT IA / ASSISTANT === //
 assistant_title: {
  ES: "¿Cómo puedo ayudarte?",
  EUS: "Nola lagundu dezaket?",
 },
 assistant_new_chat: {
  ES: "Nuevo chat",
  EUS: "Txat berria",
 },
 assistant_placeholder: {
  ES: "Pregunta lo que quieras",
  EUS: "Edozer galde dezakezu",
 },
 assistant_send: {
  ES: "Enviar",
  EUS: "Bidali",
 },








  /* === Aviso de funcionalidad no implementada === */
  not_implemented_title:    { ES: "Esta función no está implementada aún", EUS: "Funtzio hau oraindik ez dago ezarrita" },
  not_implemented_subtitle: { ES: "Puedes solicitarla en tu próximo prompt 🚀", EUS: "Hurrengo prompt-ean eska dezakezu 🚀" },




   


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //        LANDING PAGE
  // =========================

     // BENEFITS SECTION //
    homeBenefits: {
  title: {
    ES: "¿Qué podrás conseguir apoyándote en Euskalia?",
    EUS: "Zer lortu dezakezu Euskaliaren laguntzarekin?",
  },

  benefit1_title: {
    ES: "Ahorra horas de trabajo",
    EUS: "Aurreztu lan-orduak",
  },
  benefit1_desc: {
    ES: "Trabaja con textos largos en segundos. Procesa, mejora y adapta contenido sin leerlo todo ni perder tiempo innecesario.",
    EUS: "Testu luzeekin segundo gutxitan lan egin. Edukia prozesatu, hobetu eta moldatu dena irakurri gabe eta denbora alferrik galdu gabe.",
  },

  benefit2_title: {
    ES: "Experiencia y productividad",
    EUS: "Esperientzia eta produktibitatea",
  },
  benefit2_desc: {
    ES: "Euskalia está pensada para ofrecer la mejor experiencia de uso mientras aumentas tu productividad.",
    EUS: "Euskalia erabiltzaile-esperientzia onena eskaintzeko diseinatuta dago, aldi berean zure produktibitatea handitzeko.",
  },

  benefit3_title: {
    ES: "Accesible para cualquiera",
    EUS: "Edonorentzat eskuragarria",
  },
  benefit3_desc: {
    ES: "Desde estudiantes hasta profesionales. Euskalia se adapta a tu nivel y a tu forma de trabajar.",
    EUS: "Ikasleentzako..., profesionalentzako... Euskalia zure mailara eta lan egiteko modura egokitzen da.",
  },

  benefit4_title: {
    ES: "Fortalece el uso del euskera",
    EUS: "Euskararen erabilera indartzen du",
  },
  benefit4_desc: {
    ES: "Usar, leer y escuchar euskera cada día es la mejor forma de mantenerlo vivo. Euskalia te lo pone fácil.",
    EUS: "Euskara egunero erabiltzea, irakurtzea eta entzutea da bizirik mantentzeko modurik onena. Euskaliak erraz jartzen dizu.",
  },

  benefit5_title: {
    ES: "Fácil de usar, eficaz desde el primer minuto",
    EUS: "Erabilera erraza, lehen minututik eraginkorra",
  },
  benefit5_desc: {
    ES: "Un diseño claro y directo para que te centres en el contenido, no en aprender a usar la herramienta.",
    EUS: "Diseinu argi eta zuzena, edukiari arreta jartzeko eta ez tresna nola erabili ikasteko.",
  },

  benefit6_title: {
    ES: "Sin fricción, sin complicaciones",
    EUS: "Trabarik gabe, konplikaziorik gabe",
  },
  benefit6_desc: {
    ES: "Empieza gratis, sin registros obligatorios ni instalaciones. Entra, usa Euskalia y decide después.",
    EUS: "Hasi doan, derrigorrezko erregistrorik edo instalaziorik gabe. Sartu, erabili Euskalia eta erabaki ondoren.",
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
    EUS: "Euskaliaren ezaugarriak"
  },
  paragraph: {
    ES: "Euskalia es una plataforma diseñada para trabajar con textos en euskera o al euskera de forma inteligente, cómoda y eficiente. Analiza el contenido en profundidad para ayudarte a entenderlo, mejorarlo y adaptarlo según tus necesidades, ya sea para estudiar, trabajar o crear contenido propio. Desde textos cortos hasta documentos completos o enlaces web, Euskalia procesa la información, detecta el contexto real y genera resultados claros, naturales y útiles. Todo el sistema está pensado para reducir esfuerzo, ahorrar tiempo y ofrecer una experiencia fluida tanto en el uso puntual como en un entorno profesional. Euskalia centraliza todas las herramientas en un solo lugar, con un enfoque claro en la productividad y en el uso real del euskera en el día a día.",
    EUS: "Euskalia testuak euskaraz edo euskarara modu adimentsu, eroso eta eraginkorrean lan egitera diseinatutako plataforma bat da. Edukia sakon aztertzen du. Ulertzen, hobetzen eta zure beharren arabera moldatzen laguntzen dizu. Ikasteko, lan egiteko edo edozein motatako edukiak sortzeko. Testu laburretatik hasi eta dokumentu osoetara edo web esteketara arte, Euskaliak informazioa prozesatzen du, testuinguru erreala antzematen du eta emaitza argi, natural eta erabilgarriak sortzen ditu. Sistema osoa ahalegina murrizteko, denbora aurrezteko eta erabilera puntualean zein ingurune profesionalean esperientzia arin eta erosoa eskaintzeko pentsatuta dago. Euskaliak tresna guztiak leku bakarrean biltzen ditu, produktibitatea eta euskararen eguneroko erabilera benetan indartzeko."
  },
  item1_title: {
    ES: "Ahorra tiempo de trabajo",
    EUS: "Lan-denbora aurrezten du",
  },
  item1_desc: {
    ES: "Trabaja más rápido con textos complejos. Euskalia reduce esfuerzo y elimina pasos innecesarios.",
    EUS: "Testu konplexuekin azkarrago lan egin. Euskaliak lana arintzen dizu eta alferrikako pausuak kentzen ditu.",
  },

  item2_title: {
    ES: "Fácil de usar, resultados rápidos",
    EUS: "Erabilera erraza, emaitza azkarrak",
  },
  item2_desc: {
    ES: "No necesitas aprender nada. Entra, usa la plataforma y obtén resultados desde el primer momento.",
    EUS: "Ez da ikasi behar. Sartu, erabili eta lehen momentutik emaitzak lortu.",
  },

  item3_title: {
    ES: "Pensado para cualquiera",
    EUS: "Edonorentzat pentsatua",
  },
  item3_desc: {
    ES: "Desde estudiantes hasta profesionales. Euskalia se adapta a tu ritmo y a tu forma de trabajar.",
    EUS: "Ikasleentzat zein profesionalentzat. Euskaliak zure erritmoari eta beharrari egokitzen zaio.",
  },

  item4_title: {
    ES: "Euskera en el día a día",
    EUS: "Euskara egunerokoan erabiltzeko",
  },
  item4_desc: {
    ES: "Cuando usar euskera es más fácil, se usa más. Euskalia impulsa su uso real cada día.",
    EUS: "Euskara erabiltzea errazagoa denean, gehiago erabiltzen da. Euskaliak eguneroko erabilera sustatzen du.",
  },

  item5_title: {
    ES: "Productividad real",
    EUS: "Benetako produktibitatea",
  },
  item5_desc: {
    ES: "Textos más claros, naturales y útiles. Resultados pensados para aplicarlos en estudios o trabajo.",
    EUS: "Testuak argiagoak, naturalagoak eta erabilgarriagoak. Emaitzak lanean edo ikasketetan aplikatzeko modukoak dira.",
  },

  item6_title: {
    ES: "Empieza sin fricción",
    EUS: "Oztoporik gabe hasteko",
  },
  item6_desc: {
    ES: "Sin instalaciones ni registros obligatorios. Entra, prueba Euskalia y decide después.",
    EUS: "Ez dago instalaziorik ezta derrigorrezko erregistrorik. Sartu, probatu eta gero erabaki.",
  },


  highlight1_title: {
  ES: "🧠 Procesamiento inteligente del contenido",
  EUS: "🧠 Edukien prozesamendu adimenduna",
},
highlight1_desc: {
  ES: "Euskalia comprende cada contenido en su contexto para identificar lo que realmente quiere transmitir. De este modo, trabaja la información de forma coherente y genera resultados adaptados al objetivo del usuario.",
  EUS: "Euskaliak eduki bakoitzaren testuingurua ulertzen du, benetan zer adierazi nahi duen identifikatuz. Horri esker, informazioa modu koherentean lantzen du eta erabiltzailearen helburura egokitutako emaitzak sortzen ditu.",
},
highlight2_title: {
  ES: "🎯 Resultados claros y naturales",
  EUS: "🎯 Emaitza argi eta naturalak",
},
highlight2_desc: {
  ES: "El contenido generado es claro, natural y fácil de entender. Está pensado para un uso real, tanto en el estudio como en el trabajo.",
  EUS: "Sortutako edukiak argiak, naturalak eta erraz ulertzeko modukoak dira. Irakurketa arina eskaintzen dute eta erabilera errealerako prestatuta daude, bai ikasteko edo bai lanerako.",
},
  highlight3_title: {
    ES: "🔒Privacidad garantizada",
    EUS: "🔒Segurtasuna bermatuta",
  },
  highlight3_desc: {
    ES: "El contenido no se almacena de forma permanente. Tus textos, documentos y enlaces se procesan de forma segura y temporal.",
    EUS: "Edukia ez da behin betiko gordetzen. Zure testuak, dokumentuak eta estekak modu seguruan eta aldi baterako prozesatzen dira.",
  },
},




// Cómo funciona Euskalia
homeHowItWorks: {
  title: {
    ES: "¿Cómo funciona Euskalia?",
    EUS: "Nola funtzionatzen du Euskaliak?",
  },

  intro: {
    ES: "Euskalia es una plataforma basada en inteligencia artificial para el procesamiento de textos. El usuario introduce contenido mediante texto, documentos o enlaces web, y el sistema analiza automáticamente la información para identificar su estructura, contexto y significado. A partir de este análisis, el contenido se adapta al objetivo solicitado manteniendo la coherencia y el sentido original, sin necesidad de intervención manual ni configuraciones técnicas.",
    EUS: "Euskalia adimen artifizialean oinarritutako testu-prozesamendurako plataforma bat da. Erabiltzaileak edukia sartzen du testu, dokumentu edo web-esteken bidez, eta sistemak informazioa automatikoki aztertzen du egitura, testuingurua eta esanahia identifikatzeko. Analisi horretatik abiatuta, edukia eskatutako helburura egokitzen da, jatorrizko koherentzia eta esanahia mantenduz, eskuzko esku-hartzerik edo konfigurazio teknikorik gabe.",
  },

  offers_title: {
    ES: "🔎 ¿Qué hace exactamente Euskalia?",
    EUS: "🔎 Zer egiten du zehazki Euskaliak?",
  },

  offers_item1: {
    ES: "Analiza automáticamente la estructura y el contexto del contenido introducido.",
    EUS: "Sartutako edukiaren egitura eta testuingurua automatikoki aztertzen ditu.",
  },

  offers_item2: {
    ES: "Procesa información procedente de textos, documentos o URLs de forma unificada.",
    EUS: "Testu, dokumentu edo URLetatik datorren informazioa modu bateratuan prozesatzen du.",
  },

  offers_item3: {
    ES: "Aplica transformaciones manteniendo el significado principal del contenido.",
    EUS: "Edukiaren esanahi nagusia mantenduz moldaketak aplikatzen ditu.",
  },

  offers_item4: {
    ES: "Reorganiza la información de manera clara, coherente y estructurada.",
    EUS: "Informazioa modu argi, koherente eta egituratuan berrantolatzen du.",
  },

  offers_item5: {
    ES: "Ejecuta los procesos en tiempo real o en pocos segundos, incluso con textos largos.",
    EUS: "Prozesuak denbora errealean edo segundo gutxitan sortzen ditu, baita testu luzeekin ere.",
  },

  offers_item6: {
    ES: "Funciona sin configuraciones avanzadas y responde directamente a las acciones del usuario.",
    EUS: "Konfigurazio aurreraturik gabe funtzionatzen du eta erabiltzailearen ekintzei zuzenean erantzuten die.",
  },
},




 // ===================== FAQ SECTION ===================== //

  euskalia_what_is_title: {
    ES: "¿Qué es Euskalia?",
    EUS: "Zer da Euskalia?",
  },
  euskalia_what_is_text: {
    ES: "Euskalia es una plataforma de inteligencia artificial diseñada para trabajadores, estudiantes y cualquier persona que necesite traducir o resumir contenido de forma rápida y sencilla, centrada en el público vasco y en ayudar a cualquiera que necesite trabajar con el euskera. Su objetivo es ayudarte a entender y producir contenido en menos tiempo, sin perder calidad, y permitiéndote usar el euskera en tu día a día sin barreras.",
    EUS: "Euskalia adimen artifizialeko plataforma bat da, langileei, ikasleei eta edukiak modu azkar eta erraz batean itzuli edo laburtu behar dituen edonori zuzendua, euskal herritarrei eta euskararekin lan egin behar duen edonori laguntzera bideratua. Helburua edukiak denbora gutxiagoan ulertzen eta sortzen laguntzea da, kalitatea galdu gabe eta euskara egunerokoan oztoporik gabe erabiltzeko aukera emanez.",
  },

  euskalia_goal_title: {
    ES: "Objetivo de Euskalia",
    EUS: "Euskaliaren helburua",
  },
  euskalia_goal_text: {
    ES: "El objetivo de Euskalia es impulsar el euskera en el ámbito digital, garantizando que las personas que viven, trabajan o estudian en nuestro entorno puedan usarlo como un idioma moderno, completo y plenamente funcional. Buscamos evitar la desinformación, las barreras tecnológicas y los problemas derivados de la falta de herramientas en euskera, ofreciendo soluciones de IA que permitan trabajar, aprender y comunicarse sin limitaciones lingüísticas.",
    EUS: "Euskaliaren helburua euskara eremu digitalean indartzea da, gure inguruan bizi, lan edo ikasten duten pertsonek hizkuntza moderno, oso eta guztiz funtzional gisa erabili ahal izan dezaten. Desinformazioa, oztopo teknologikoak eta euskarazko tresna faltak sortzen dituzten arazoak saihestu nahi ditugu, hizkuntza-mugarik gabe lan, ikasi eta komunikatzeko aukera emango duten AA soluzioak eskainiz.",
  },





  // =========================
  //       FAQ SECTION
  // =========================

  faq_title: {
    ES: "Preguntas frecuentes",
    EUS: "Ohiko galderak",
  },
  faq_subtitle: {
    ES: "Aquí respondemos las dudas más comunes de nuestros usuarios. Esta sección se actualiza constantemente para ayudarte mejor.",
    EUS: "Hemen gure erabiltzaileen ohiko zalantzak erantzuten ditugu. Atal hau etengabe eguneratzen da zuretzat hobe laguntzeko.",
  
  },

  // 1 — ¿Qué es Euskalia?
  faq_item1_question: {
    ES: "🧠 ¿Qué es Euskalia?",
    EUS: "🧠 Zer da Euskalia?",
  },
  faq_item1_answer: {
    ES: "Euskalia es una plataforma de inteligencia artificial diseñada para trabajadores, estudiantes y cualquier persona que necesite traducir o resumir contenido de forma rápida y sencilla. Está centrada en el público vasco o en cualquiera que necesite trabajar con el euskera.\n\nEuskalia está centrada en el euskera como idioma principal. Tanto la traducción como el resto de herramientas funcionan siempre en relación al euskera, utilizando otros idiomas como castellano, inglés o francés únicamente para convertir el contenido hacia el euskera o desde el euskera, según las necesidades.\n\nEuskalia se caracteriza por un diseño claro y una experiencia de uso pensada para trabajar con textos sin fricciones. La interfaz es sencilla, directa y accesible, lo que permite centrarse en el contenido desde el primer momento, sin distracciones ni configuraciones complejas.",
    EUS: "Euskalia adimen artifizialeko plataforma bat da, langileei, ikasleei eta edukiak modu azkar eta erraz batean itzuli edo laburtu behar dituen edonori zuzendua. Euskal herritarrei eta euskararekin lan egin behar duen edonori laguntzera bideratua dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfazea sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
  },

  // 2 — Objetivo de Euskalia
  faq_item2_question: {
    ES: "🎯 Objetivo de Euskalia",
    EUS: "🎯 Euskaliaren helburua",
  },
  faq_item2_answer: {
    ES: "El objetivo de Euskalia es impulsar el euskera en el ámbito digital, garantizando que las personas que viven, trabajan o estudian en nuestro entorno puedan usarlo como un idioma moderno, completo y plenamente funcional.\n\nBuscamos evitar la desinformación, las barreras tecnológicas y los problemas derivados de la falta de herramientas en euskera, ofreciendo soluciones de IA que permitan trabajar, aprender y comunicarse sin limitaciones lingüísticas.",
    EUS: "Euskaliaren helburua euskara eremu digitalean indartzea da, gure inguruan bizi, lan edo ikasten duten pertsonek hizkuntza moderno, oso eta guztiz funtzional gisa erabili ahal izan dezaten.\n\nDesinformazioa, oztopo teknologikoak eta euskarazko tresna faltak sortzen dituzten arazoak saihestu nahi ditugu, hizkuntza-mugarik gabe lan, ikasi eta komunikatzeko aukera emango duten IA soluzioak eskainiz.",
  },

  // 3
  faq_item3_question: {
    ES: "🌍 ¿Qué idiomas soporta Euskalia?",
    EUS: "🌍 Zein hizkuntza onartzen ditu Euskaliak?",
  },
  faq_item3_answer: {
    ES: "El idioma principal de Euskalia es el euskera. Toda la plataforma está diseñada para utilizar el euskera en relación con el inglés, el español y el francés.",
    EUS: "Hizkuntza nagusia euskara da. Plataforma osoa euskararekin lotuta erabiltzeko diseinatuta dago, ingelesa, gaztelania eta frantsesa tarteko direla.",
  },

  // 4
  faq_item4_question: {
    ES: "📝 ¿Cuál es la diferencia entre traducir y resumir?",
    EUS: "📝 Zein da itzultze eta laburtzearen arteko aldea?",
  },
  faq_item4_answer: {
    ES: "Traducir mantiene la longitud y estructura del texto original, pero lo convierte a otro idioma.\n\nResumir reduce el contenido a las ideas esenciales, manteniendo el idioma seleccionado.",
    EUS: "Itzultzeak jatorrizko testuaren luzera eta egitura mantentzen ditu, baina beste hizkuntza batera eramaten du.\n\nLaburtzeak edukia murrizten du eta ideia nagusiak uzten ditu, aukeratutako hizkuntza errespetatuz.",
  },

  // 5
  faq_item5_question: {
    ES: "📏 ¿Hay límites de caracteres o tamaño de archivo?",
    EUS: "📏 Ba al dago karaktere edo fitxategi-tamainaren mugarik?",
  },
  faq_item5_answer: {
    ES: "Sí, existen límites de caracteres para garantizar un uso estable del servicio. Actualmente, el límite es de 12.000 caracteres por operación, tanto para texto introducido manualmente como para contenido obtenido a partir de archivos o enlaces..\n\nSi tu contenido es muy largo, recomendamos dividirlo en partes.",
    EUS: "Bai, karaktere-muga bat dago zerbitzuaren erabilera egonkorra bermatzeko. Une honetan, gehienezko muga 12.000 karaktere da eragiketa bakoitzeko, bai eskuz idatzitako testuentzat bai fitxategietatik edo esteketatik ateratako edukientzat.\n\nEdukia oso luzea bada, zatika bidaltzea gomendatzen dugu.",
  },

  // 6
  faq_item6_question: {
    ES: "🔐 ¿Son seguras mis traducciones?",
    EUS: "🔐 Seguruak al dira nire itzulpenak?",
  },
  faq_item6_answer: {
    ES: "Tus textos solo se usan para generar el resultado solicitado y no se almacenan para fines externos.",
    EUS: "Zure testuak soilik eskatutako emaitzak sortzeko erabiltzen dira, eta ez dira kanpoko helburuetarako gordetzen.",
  },

  // 7
  faq_item7_question: {
  ES: "💼 ¿Qué opciones ofrece Euskalia?",
  EUS: "💼 Zein aukera eskaintzen ditu Euskaliak?",
},
faq_item7_answer: {
  ES: "Euskalia ofrece dos opciones: una versión gratuita sin registro para usar el traductor y el resumidor, y una cuenta de pago para quienes necesitan más capacidad y una experiencia completa. En el futuro se añadirán nuevas funciones y planes avanzados.",
  EUS: "Euskaliak bi aukera eskaintzen ditu: erregistro gabe doako bertsioa, itzultzailea eta laburtzailea erabiltzeko; eta kontu ordaindua, gaitasun handiagoa eta esperientzia osoa behar dutenentzat. Etorkizunean funtzio eta plan aurreratuak gehituko dira.",
},
  // 10
  faq_item10_question: {
    ES: "💬 ¿Cómo puedo dar mi opinión?",
    EUS: "💬 Nola bidal dezaket nire iritzia?",
  },
  faq_item10_answer: {
    ES: "Puedes escribirnos para sugerencias o mejoras a:\neuskaliaweb@gmail.com",
    EUS: "Iradokizunak edo hobekuntzak bidali hona:\neuskaliaweb@gmail.com",
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //            CTA
  // =========================
  cta: {
    title: {
      ES: "✨ Lleva tu experiencia Euskalia al siguiente nivel",
      EUS: "✨ Eraman Euskaliako esperientzia hurrengo mailara",
    },
    subtitle: {
      ES: "Guarda tus textos, elimina los anuncios y disfruta sin límites.",
      EUS: "Gorde zure testuak, kendu iragarkiak eta gozatu mugarik gabe.",
    },
    button: {
      ES: "🚀 Empieza sin límites",
      EUS: "🚀 Hasi mugarik gabe",
    },
  },

 // =========================
  //        FOOTER
  // =========================
  eusFooterColumnAboutTitle:   { ES: "Sobre Euskalia",            EUS: "Euskaliari buruz" },
  eusFooterColumnLegalTitle:   { ES: "Legal",                     EUS: "Legeak" },
  eusFooterColumnContactTitle: { ES: "Contacto y Comunidad",      EUS: "Kontaktua eta Komunitatea" },
  eusFooterLanguageTitle:      { ES: "Idioma",                    EUS: "Hizkuntza" },
  eusFooterPlansButton:        { ES: "Planes",                    EUS: "Planak" },
  eusFooterRights:             { ES: "Todos los derechos reservados", EUS: "Eskubide guztiak erreserbatuta" },
  eusFooterCookies:            { ES: "Cookies",                   EUS: "Cookieak" },
  eusFooterContactEmailValue:  { ES: "euskaliaweb@gmail.com",      EUS: "euskaliaweb@gmail.com" },
  eusFooterLanguageLabel:      { ES: "Idioma",                    EUS: "Hizkuntza" },


  /* ==== SOBRE EUSKALIA ==== */
  eusFooterAboutTitle1: { ES: "¿Qué es Euskalia?", EUS: "Zer da Euskalia?" },
  eusFooterAboutContent1: {
    ES: "Euskalia es una plataforma de inteligencia artificial diseñada para trabajadores, estudiantes y cualquier persona que necesite traducir o resumir contenido de forma rápida y sencilla. Está centrada en el público vasco o en cualquiera que necesite trabajar con el euskera.\n\nEuskalia está centrada en el euskera como idioma principal. Tanto la traducción como el resto de herramientas funcionan siempre en relación al euskera, utilizando otros idiomas como castellano, inglés o francés únicamente para convertir el contenido hacia el euskera o desde el euskera, según las necesidades.\n\nEuskalia se caracteriza por un diseño claro y una experiencia de uso pensada para trabajar con textos sin fricciones. La interfaz es sencilla, directa y accesible, lo que permite centrarse en el contenido desde el primer momento, sin distracciones ni configuraciones complejas.",
    EUS: "Euskalia adimen artifizialeko plataforma bat da, langileei, ikasleei eta edukiak modu azkar eta erraz batean itzuli edo laburtu behar dituen edonori zuzendua. Euskal herritarrei eta euskararekin lan egin behar duen edonori laguntzera bideratua dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfazea sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",

  },

  eusFooterAboutTitle2: { ES: "¿Cómo funciona?", EUS: "Nola funtzionatzen du?" },
  eusFooterAboutContent2: {
    ES:  "Solo tienes que pegar un texto, subir un documento o indicar una URL. Euskalia extrae el contenido y te permite elegir qué hacer con él: traducir, resumir, corregir, parafrasear, humanizar o analizar si hay indicios de IA. Ajustas el nivel o estilo si lo necesitas y obtienes un resultado listo para copiar, descargar o guardar en biblioteca.",
    EUS: "Testua itsatsi, dokumentua igo edo URL bat jarri besterik ez duzu egin behar. Edukiarekin zer egin nahi duzun aukeratzen uzten dizu: itzuli, laburtu, zuzendu, parafraseatu, humanizatu edo IA zantzuak aztertu. Behar izanez gero maila edo estiloa doitu, eta emaitza kopiatu, deskargatu edo liburutegian gordetzeko prest izango duzu."
  },
  eusFooterAboutTitle3: { ES: "Herramientas Plan Pro", EUS: " Pro planeko tresnak" },
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
  },

  eusFooterAboutTitle4: { ES: "Resumidor", EUS: "Laburtzailea" },
  eusFooterAboutContent4: {
    ES:  "Convierte cualquier texto, documento o enlace en un resumen claro y directo en cuestión de segundos. La IA analiza el contenido, identifica las ideas principales y genera una versión breve que conserva la esencia del original. Perfecto para estudiantes, profesionales o cualquier persona que necesite entender un texto sin leerlo completo.",
    EUS: "Testua, dokumentua edo esteka oro segundo gutxitan laburpen argi eta zuzen batean bihurtzen du. Adimen artifizialak edukia aztertzen du, ideia nagusiak identifikatzen ditu eta jatorrizkoaren esentzia gordetzen duen bertsio laburra sortzen du. Ikasleentzat, profesionalentzat edo testu oso bat irakurri gabe ulertu nahi duen edonorentzat da baliagarria."
  },

  eusFooterAboutTitle5: { ES: "Planes", EUS: "Planak" },
  eusFooterAboutContent5: {
    ES:  "Euskalia ofrece un plan gratuito con acceso a las funciones básicas, traductor y resumidor. Los planes de pago amplían estas capacidades con herramientas avanzadas, mayores límites de uso y funciones pensadas para un trabajo más intensivo, manteniendo siempre la misma experiencia simple y directa.",
    EUS: "Euskaliak doako plana eskaintzen du oinarrizko funtzioekin, itzultzailea eta laburtzailea. Ordainpeko planek aukera horiek zabaltzen dituzte, tresna aurreratuak, erabilera-muga handiagoak eta lan intentsiborako pentsatutako funtzioak gehituz, betiere erabilera-esperientzia sinple eta zuzena mantenduz."
  },

  eusFooterAboutTitle6: { ES: "Idiomas", EUS: "Hizkuntzak" },
  eusFooterAboutContent6: {
    ES:  "Euskalia funciona actualmente con cuatro idiomas principales: Euskera (EU), Castellano (ES), Inglés (GB) y Francés (FR). Puedes traducir o resumir en cualquiera de las combinaciones entre ellos. Aunque el enfoque principal es el uso y la comprensión del euskera, Euskalia está pensada para que el idioma conviva con naturalidad junto al español, el inglés y el francés.",
    EUS: "Euskalia gaur egun lau hizkuntza nagusirekin dabil: euskara (EUS), gaztelania (ES), ingelesa (GB) eta frantsesa (FR). Itzulpenak eta laburpenak haien arteko edozein konbinaziotan egin daitezke, nahiz eta helburu nagusia euskara erabiltzea eta ulertzea sustatzea izan. Euskalia euskara espainierarekin, ingelesarekin eta frantsesarekin modu naturalean bizikidetzan aritzeko pentsatuta dago."
  },

  eusFooterLegalTitle1: { ES: "Aviso legal",                EUS: "Lege-oharra" },
  eusFooterLegalTitle2: { ES: "Política de privacidad",     EUS: "Pribatutasun politika" },
  eusFooterLegalTitle3: { ES: "Términos y condiciones",     EUS: "Baldintzak eta erabilera" },
  eusFooterLegalTitle4: { ES: "Uso de APIs de IA",          EUS: "Adimen Artifizialeko API en erabilera" },
  eusFooterLegalTitle5: { ES: "Política de cookies",        EUS: "Cookie politika" },





  //=========================
  //       CREAR CUENTA
  // =========================
  
  registerPage_title: {
  ES: "Crea tu cuenta",
  EUS: "Sortu zure kontua",
},

registerPage_google: {
  ES: "Registrarte con Google",
  EUS: "Erregistratu Google-rekin",
},

registerPage_microsoft: {
  ES: "Registrarte con Microsoft",
  EUS: "Erregistratu Microsoft-ekin",
},

registerPage_termsPrefix: {
  ES: "Al continuar, aceptas nuestros",
  EUS: "Jarraitzeko, gure",
},

registerPage_terms: {
  ES: "Términos",
  EUS: "Baldintzak",
},

registerPage_and: {
  ES: "y",
  EUS: "eta",
},

registerPage_privacy: {
  ES: "Política de Privacidad",
  EUS: "Pribatutasun-politika",
},

registerPage_haveAccount: {
  ES: "¿Ya tienes cuenta?",
  EUS: "Baduzu konturik?",
},

registerPage_login: {
  ES: "Iniciar sesión",
  EUS: "Hasi saioa",
},
     



  // =========================
  //      INICIAR SESION
  // =========================

  authPage: {
    pageTitle:              { ES: "Iniciar sesión",                       EUS: "Saioa hasi" },
    pageDescription:        { ES: "Accede a tu cuenta para seguir usando Euskalia.", EUS: "Sartu zure kontura Euskalia erabiltzen jarraitzeko." },

    welcome:                { ES: "BIENVENIDO",                  EUS: "ONGI ETORRI" },
    continueWithGoogle:     { ES: "Continuar con Google",                 EUS: "Jarraitu Google-rekin" },
    or:                     { ES: "o",                                    EUS: "edo" },
   
   continueWithMicrosoft: {
    ES: "Continuar con Microsoft",
    EUS: "Jarraitu Microsoft-ekin",
  }, 
    emailOrUserPlaceholder: { ES: "Introduce tu correo o nombre de usuario", EUS: "Idatzi zure posta edo erabiltzaile-izena" },
    signInButton:           { ES: "Continuar",                            EUS: "Jarraitu" },

    emailRequiredError:     { ES: "Por favor, introduce tu correo electrónico.", EUS: "Mesedez, idatzi zure posta elektronikoa." },
    emailInvalidError:      { ES: "El formato del correo no es válido.",  EUS: "Posta elektronikoaren formatua ez da baliozkoa." },
    passwordRequiredError:  { ES: "Por favor, introduce tu contraseña.",  EUS: "Mesedez, idatzi zure pasahitza." },

    legalText: {
      prefix:  { ES: "Al continuar, aceptas nuestros", EUS: "Jarraitzearen bidez, gure" },
      terms:   { ES: "Términos",                        EUS: "Baldintzak" },
      and:     { ES: "y",                               EUS: "eta" },
      privacy: { ES: "Política de Privacidad",         EUS: "Pribatutasun-politika" },
    },

    noAccount: { ES: "¿No tienes cuenta?", EUS: "Ez duzu konturik?" },
    signUp:    { ES: "Regístrate",         EUS: "Erregistratu" },
  },




  // =========================
  //       PRICING PAGE
  // =========================
   
    pricing: {
  title: {
    ES: "Elige tu plan",
    EUS: "Aukeratu zure plana",
  },
  subtitle: {
    ES: "Empieza con el Plan Pro y pasa a Premium+ cuando necesites más potencia y menos límites.",
    EUS: "Hasi Pro planarekin eta pasa Premium+ planera potentzia eta muga gutxiago behar dituzunean.",
  },

  pro_name: {
    ES: "Plan Pro",
    EUS: "Plan Pro",
  },
  premium_name: {
    ES: "Plan Premium+",
    EUS: "Plan Premium+",
  },

  perMonth: {
    ES: "/ mes",
    EUS: "/ hilean",
  },

  pro_cta: {
    ES: "Elegir Pro",
    EUS: "Aukeratu Pro",
  },
  premium_cta_soon: {
    ES: "Próximamente",
    EUS: "Laster eskuragarri",
  },

  badge_popular: {
    ES: "Más popular",
    EUS: "Ezagunena",
  },
  badge_soon: {
    ES: "Próximamente",
    EUS: "Laster",
  },

  features: {
    // ===== PLAN PRO – TUS FRASES =====

    pro1: {
      ES: "Límites más amplios: 5.000 caracteres por petición para el traductor.",
      EUS: "Muga zabalagoak: 5.000 karaktere eskaera bakoitzeko itzultzailearentzat.",
      EN: "Higher limits: 5,000 characters per request for the translator.",
    },
    pro2: {
      ES: "Límites más amplios: 12.000 caracteres por petición para el resumidor.",
      EUS: "Muga zabalagoak: 12.000 karaktere eskaera bakoitzeko laburtzailearentzat.",
      EN: "Higher limits: 12,000 characters per request for the summarizer.",
    },
    pro3: {
      ES: "Límite diario: 150.000 caracteres al día.",
      EUS: "Eguneko muga: 150.000 karaktere eguneko.",
      EN: "Daily limit: 150,000 characters per day.",
    },
    pro4: {
      ES: "Acceso a las 6 herramientas (hasta 12.000 caracteres por petición).",
      EUS: "6 tresnetarako sarbidea (gehienez 12.000 karaktere eskaera bakoitzeko).",
      EN: "Access to the 6 tools (up to 12,000 characters per request).",
    },
    pro5: {
      ES: "Mejor calidad de API para un uso más fiable de la inteligencia artificial.",
      EUS: "API kalitate hobea, adimen artifiziala fidagarriago erabiltzeko.",
      EN: "Higher-quality API for more reliable AI usage.",
    },
    pro6: {
      ES: "Cuenta propia con diferentes modos y biblioteca inteligente con más opciones.",
      EUS: "Kontu propioa, hainbat modurekin, eta liburutegi adimentsua aukera gehiagorekin.",
      EN: "Personal account with different modes and a smart library with more options.",
    },

    // ===== PLAN PREMIUM+ 

    premium1: {
    ES: "Límites de caracteres casi ilimitados.",
    EUS: "Karaktere-kopurua ia mugarik gabe",
  },
  premium2: {
    ES: "Herramientas premium añadidas.",
    EUS: "Premium tresnak gehituta.",
  },
  premium3: {
    ES: "Prompts activos integrados en las herramientas.",
    EUS: "Prompt-ak aktibatuta tresnetan.",
  },
  premium4: {
    ES: "Chat de IA + asistente personal.",
    EUS: "IA txata + laguntzaile pertsonala.",
  },
  premium5: {
    ES: "Prioridad en la cola y velocidad máxima, incluso en horas punta.",
    EUS: "Lehentasuna ilaran eta abiadura maximoa, puntako orduetan ere.",
    },
    premium6: {
    ES: "",
    EUS: "",
    },
  },
},







  // Toast genérico usado en el Footer (iconos sociales, etc.)
  eusToastFeatureNotImplementedTitle: {
    ES: "🚧 Funcionalidad no implementada",
    EUS: "🚧 Funtzionaltasuna ez dago erabilgarri oraindik"
  },
  eusToastFeatureNotImplementedDescription: {
    ES: "Esta función aún no está implementada. ¡Pídela en tu próximo mensaje! 🚀",
    EUS: "Funtzio hau oraindik ez dago martxan. Eskatu hurrengo mezua bidaltzean! 🚀"
  },




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //        LEGAL 
  // =========================

// AVISO LEGAL //
legal_notice_title: {
  ES: "Aviso Legal",
  EUS: "Lege-oharra",
},

legal_notice_last_update: {
  ES: "Última actualización: [__________]",
  EUS: "Azken eguneratzea: [__________]",
},

legal_notice_section1_title: {
  ES: "1. Información general",
  EUS: "1. Informazio orokorra",
},

legal_notice_section1_p1: {
  ES: "De conformidad con el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que la entidad responsable de la gestión y funcionamiento de este sitio web es:",
  EUS: "Uztailaren 11ko 34/2002 Legearen 10. artikuluarekin bat etorriz, Informazioaren Gizarteko Zerbitzuei eta Merkataritza Elektronikoari buruzko Legeak (LSSI-CE) xedatutakoa betez, honako hau jakinarazten da: webgune honen kudeaketaz eta funtzionamenduaz arduratzen den erakundea hau da:",
},

legal_notice_section1_field_name: {
  ES: "Nombre: Euskalia",
  EUS: "Izena: Euskalia",
},

legal_notice_section1_field_domain: {
  ES: "Dominio: https://euskalia.ai",
  EUS: "Domeinua: https://euskalia.ai",
},

legal_notice_section1_field_email: {
  ES: "Email: [__________]",
  EUS: "Emaila: [__________]",
},

legal_notice_section1_field_activity: {
  ES: "Actividad: Servicios digitales de traducción y resumen basados en Inteligencia Artificial.",
  EUS: "Jarduera: Itzulpen eta laburpen digitalen zerbitzuak, adimen artifizialean oinarrituak.",
},

legal_notice_section1_p2: {
  ES: "El acceso y uso del sitio web atribuye la condición de usuario, e implica la aceptación plena y sin reservas del presente Aviso Legal y de las condiciones aquí establecidas.",
  EUS: "Webgunera sartzeak eta hura erabiltzeak erabiltzaile izaera ematen du, eta lege-ohar hau eta hemen ezarritako baldintzak osorik eta erreserbarik gabe onartzea dakar.",
},
legal_notice_section2_title: {
  ES: "2. Objeto",
  EUS: "2. Xedea",
},

legal_notice_section2_p1: {
  ES: "El presente aviso legal regula el uso del sitio web Euskalia, cuyo propósito principal es ofrecer herramientas de traducción y resumen de textos entre euskera, castellano y otros idiomas, apoyadas en inteligencia artificial.",
  EUS: "Lege-ohar honek Euskalia webgunearen erabilera arautzen du. Euskaliaren helburu nagusia da euskararen, gaztelaniaren eta beste hizkuntza batzuen arteko itzulpen eta testu-laburpen tresnak eskaintzea, adimen artifizialaren laguntzarekin.",
},

legal_notice_section2_p2: {
  ES: "A través de esta plataforma, los usuarios pueden introducir textos, documentos o enlaces para obtener traducciones o resúmenes generados por IA, siempre dentro de los límites de uso establecidos.",
  EUS: "Plataforma honen bidez, erabiltzaileek testuak, dokumentuak edo estekak sar ditzakete IA bidez sortutako itzulpenak edo laburpenak lortzeko, ezarritako erabilera-mugen barruan.",
},

legal_notice_section3_title: {
  ES: "3. Condiciones de uso",
  EUS: "3. Erabilera baldintzak",
},

legal_notice_section3_p1: {
  ES: "El usuario se compromete a:",
  EUS: "Erabiltzaileak honako hauek betetzeko konpromisoa hartzen du:",
},

legal_notice_section3_li1: {
  ES: "Hacer un uso adecuado y lícito del sitio web.",
  EUS: "Webgunea behar bezala eta legez erabiltzea.",
},

legal_notice_section3_li2: {
  ES: "No utilizar el contenido con fines ilícitos o contrarios a la buena fe.",
  EUS: "Edukia legez kontrako edo fede onaren aurkako helburuetarako ez erabiltzea.",
},

legal_notice_section3_li3: {
  ES: "No provocar daños en los sistemas de Euskalia ni intentar acceder de forma no autorizada a las áreas restringidas.",
  EUS: "Euskaliaren sistemetan kalterik ez eragitea eta baimenik gabe sarbide mugatuko eremuetara sartzen saiatzea.",
},

legal_notice_section3_li4: {
  ES: "No introducir ni difundir virus informáticos u otros sistemas que puedan causar daños.",
  EUS: "Ez sartzea eta ez zabaltzea kalteak eragin ditzaketen birus informatikoak edo antzeko sistema kaltegarriak.",
},

legal_notice_section3_p2: {
  ES: "Euskalia se reserva el derecho de suspender o retirar el acceso a los usuarios que incumplan estas condiciones.",
  EUS: "Euskaliak eskubidea du baldintza hauek betetzen ez dituzten erabiltzaileei sarbidea eteteko edo kentzeko.",
},

legal_notice_section4_title: {
  ES: "4. Propiedad intelectual e industrial",
  EUS: "4. Jabetza intelektuala eta industriala",
},

legal_notice_section4_p1: {
  ES: "Todos los elementos que forman el sitio web (diseño, logotipos, textos, imágenes, software, código fuente...) son propiedad de Euskalia o cuentan con las licencias necesarias para su uso.",
  EUS: "Webgunea osatzen duten elementu guztiak (diseinua, logotipoak, testuak, irudiak, softwarea, kodea...) Euskaliaren jabetzakoak dira edo beharrezko lizentziak dituzte.",
},

legal_notice_section4_p2: {
  ES: "Queda prohibida la reproducción total o parcial de los contenidos sin autorización expresa y por escrito.",
  EUS: "Debekatuta dago edukiak osorik edo zatika erreproduzitzea, titularraren baimen espresu eta idatzirik gabe.",
},

legal_notice_section4_p3: {
  ES: "El uso de la marca Euskalia y su logotipo queda limitado exclusivamente a fines informativos y no puede utilizarse sin consentimiento previo.",
  EUS: "Euskalia marka eta logotipoaren erabilera helburu informatiboetara mugatzen da soilik, eta ezin da erabili titularraren aldez aurreko baimenik gabe.",
},
legal_notice_section5_title: {
  ES: "5. Responsabilidad",
  EUS: "5. Erantzukizuna",
},

legal_notice_section5_p1: {
  ES: "Euskalia no garantiza la disponibilidad continua del sitio ni la ausencia de errores en sus servicios.",
  EUS: "Euskaliak ez du bermatzen webgunearen erabilgarritasun jarraitua ezta bere zerbitzuetan akatsik ez egotea ere.",
},

legal_notice_section5_p2: {
  ES: "Los resultados generados por inteligencia artificial pueden contener imprecisiones, por lo que el usuario es responsable de su uso.",
  EUS: "Adimen artifizialak sortutako emaitzek zehaztasun faltak izan ditzakete; beraz, erabiltzailea da haien erabileraren erantzule bakarra.",
},

legal_notice_section5_p3: {
  ES: "Euskalia no se hace responsable de los daños derivados del uso indebido de la plataforma.",
  EUS: "Euskalia ez da erantzule izango plataforma desegoki erabiltzetik sortutako kalteen aurrean.",
},

legal_notice_section6_title: {
  ES: "6. Política de enlaces",
  EUS: "6. Esteken politika",
},

legal_notice_section6_p1: {
  ES: "El sitio web puede contener enlaces a páginas de terceros.",
  EUS: "Webguneak hirugarrenen webguneetarako estekak izan ditzake.",
},

legal_notice_section6_p2: {
  ES: "Euskalia no controla ni se responsabiliza de los contenidos o políticas de dichos sitios.",
  EUS: "Euskaliak ez ditu kontrolatzen eta ez da erantzule izango hirugarrenen webguneetatik eratorritako edukien edo politikaren aurrean.",
},

legal_notice_section7_title: {
  ES: "7. Protección de datos personales",
  EUS: "7. Datu pertsonalen babesa",
},

legal_notice_section7_p1: {
  ES: "Los datos personales serán tratados conforme a la Política de Privacidad disponible en el sitio web.",
  EUS: "Datu pertsonalak webgunean eskuragarri dagoen Pribatutasun Politikaren arabera tratatuko dira.",
},

legal_notice_section8_title: {
  ES: "8. Uso de cookies",
  EUS: "8. Cookieen erabilera",
},

legal_notice_section8_p1: {
  ES: "Este sitio utiliza cookies propias y de terceros con fines técnicos y analíticos.",
  EUS: "Webgune honek berezko eta hirugarrenen cookieak erabiltzen ditu helburu tekniko eta analitikoekin.",
},

legal_notice_section8_p2: {
  ES: "El usuario puede configurar o rechazar las cookies desde el banner o configuración.",
  EUS: "Erabiltzaileak cookieak konfiguratu edo baztertu ditzake banner bidez edo konfigurazio ataletik.",
},

legal_notice_section8_p3: {
  ES: "Para más información consulte la Política de Cookies.",
  EUS: "Informazio gehiago lortzeko, kontsultatu Cookieen Politika.",
},

legal_notice_section9_title: {
  ES: "9. Legislación aplicable y jurisdicción",
  EUS: "9. Aplikatu beharreko legeria eta jurisdikzioa",
},

legal_notice_section9_p1: {
  ES: "Las presentes condiciones se rigen por la legislación española.",
  EUS: "Baldintza hauek Espainiako legearen arabera arautzen dira.",
},

legal_notice_section9_p2: {
  ES: "En caso de conflicto, las partes se someten a los Juzgados y Tribunales de [__________].",
  EUS: "Gatazka izanez gero, aldeek [__________]-ko epaitegi eta auzitegien jurisdikzioari men egingo diote.",
},

legal_notice_section10_title: {
  ES: "10. Contacto",
  EUS: "10. Harremana",
},

legal_notice_section10_p1: {
  ES: "Para cualquier duda o consulta relacionada con este aviso legal puede contactar con nosotros:",
  EUS: "Lege-ohar honekin lotutako edozein zalantza edo galderatarako, jar zaitez gurekin harremanetan:",
},

legal_notice_section10_contact_email: {
  ES: "📧 Correo electrónico: []",
  EUS: "📧 Posta elektronikoa: []",
},

legal_notice_section10_contact_address: {
  ES: "📍 Dirección postal: []",
  EUS: "📍 Posta helbidea: []",
},

legal_notice_footer_note: {
  ES: "Este Aviso Legal está actualizado a fecha [__________].",
  EUS: "Lege ohar hau eguneratuta dago honako data honetan: [__________].",
},
  
// POLITÍCA DE PRIVACIDAD // 
privacyPolicy: {
  title: {
    ES: "Política de privacidad",
    EUS: "Pribatutasun politika",
  },
  
  intro: {
    ES: "Esta Política de Privacidad explica cómo se tratan los datos personales en Euskalia y qué derechos tienen las personas usuarias cuando utilizan la plataforma.",
    EUS: "Pribatutasun politika honek azaltzen du Euskalian datu pertsonalak nola tratatzen diren eta erabiltzaileek zer eskubide dituzten plataforma erabiltzen dutenean.",
  },

  section1Title: {
    ES: "1. Ámbito de aplicación",
    EUS: "1. Aplikazio-eremua",
  },
  section1Body: {
    ES: "Euskalia se compromete a respetar la privacidad de quienes visitan y utilizan su web. Esta Política de Privacidad informa sobre el tratamiento de los datos personales recogidos a través del sitio y de los servicios ofrecidos en él. El uso del sitio web implica la aceptación de esta Política y del tratamiento de los datos conforme a la normativa vigente.",
    EUS: "Euskaliak bere webgunea bisitatzen eta erabiltzen duten pertsonen pribatutasuna errespetatzeko konpromisoa hartzen du. Pribatutasun politika honek webgunearen eta bertan eskaintzen diren zerbitzuen bidez jasotako datu pertsonalen tratamendua azaltzen du. Webgunea erabiltzeak politika hau eta indarreko araudia onartzea dakar.",
  },

  section2Title: {
    ES: "2. Responsable del tratamiento de los datos",
    EUS: "2. Datuen tratamenduaren arduraduna",
  },
  section2Body: {
    ES: "Los datos personales facilitados a través de Euskalia se integran en un tratamiento gestionado por el titular del proyecto.",
    EUS: "Euskaliaren bidez emandako datu pertsonalak proiektuaren titularrak kudeatutako tratamendu batean sartzen dira.",
  },
  section2Details: {
    ES: "Titular del sitio: [__________]\nNombre comercial: Euskalia\nActividad: Servicios digitales de traducción y resumen de textos con apoyo de inteligencia artificial.\nCorreo electrónico de contacto: [__________]\nDominio web: https://euskalia.ai",
    EUS: "Webgunearen titularra: [__________]\nIzen komertziala: Euskalia\nJarduera: Testuen itzulpena eta laburpena egiteko zerbitzu digitalak, adimen artifizialaren laguntzarekin.\nHarremanetarako posta elektronikoa: [__________]\nWebgunearen domeinua: https://euskalia.ai",
  },

  section3Title: {
    ES: "3. Finalidades del tratamiento",
    EUS: "3. Tratamenduaren helburuak",
  },
  section3Body: {
    ES: "Los datos podrán utilizarse para: facilitar información sobre el uso de la plataforma, responder consultas o solicitudes de soporte, enviar comunicaciones informativas o novedades (si se ha dado el consentimiento) y mejorar la experiencia de uso mediante análisis estadísticos agregados. La persona usuaria puede darse de baja de estas comunicaciones en cualquier momento a través de los enlaces de cancelación o escribiendo al correo de contacto indicado.",
    EUS: "Datuak honako helburu hauekin erabili ahal izango dira: plataformaren erabilerari buruzko informazioa ematea, kontsultei edo laguntza-eskaerei erantzutea, informazio- edo berritasun-komunikazioak bidaltzea (baimena eman bada) eta esperientzia hobetzea, estatistika-analisien bidez. Erabiltzaileak edozein unetan baja eman dezake komunikazio horietatik, mezuetan agertzen den baja-estekaren bidez edo adierazitako kontaktu-helbidera idatziz.",
  },

  section4Title: {
    ES: "4. Sobre esta Política de Privacidad",
    EUS: "4. Pribatutasun politika honi buruz",
  },
  section4Body: {
    ES: "Euskalia mantiene un compromiso firme con la protección de los datos personales de sus usuarios. Esta Política busca ser clara y sencilla, para que cada persona pueda decidir de forma informada qué información facilita y con qué finalidad se utilizará.",
    EUS: "Euskaliak konpromiso sendoa du bere erabiltzaileen datu pertsonalen babesarekin. Politika honek argia eta ulerterraza izan nahi du, pertsona bakoitzak modu informatuan erabaki ahal izan dezan zer informazio ematen duen eta zertarako erabiliko den.",
  },

  section5Title: {
    ES: "5. Confidencialidad y seguridad",
    EUS: "5. Konfidentzialtasuna eta segurtasuna",
  },
  section5Body: {
    ES: "Los datos personales se tratarán de forma confidencial y se aplicarán medidas técnicas y organizativas razonables para evitar accesos no autorizados, pérdidas o alteraciones. No obstante, ningún sistema es completamente infalible y no se puede garantizar una seguridad absoluta frente a incidentes externos.",
    EUS: "Datu pertsonalak modu konfidentzialean tratatuko dira, eta neurri tekniko eta antolaketa-neurri egokiak aplikatuko dira sartze ez-baimenduak, galerak edo aldaketak saihesteko. Hala ere, ez dago erabat hutsik egiten ez duen sistemarik, eta ezin da kanpoko gertaeren aurkako segurtasun absolutua bermatu.",
  },

  section6Title: {
    ES: "6. Derechos de las personas usuarias",
    EUS: "6. Erabiltzaileen eskubideak",
  },
  section6Body: {
    ES: "De acuerdo con la normativa aplicable, las personas usuarias pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de sus datos. Para ello, pueden dirigirse al correo de contacto indicado, señalando de forma clara el derecho que desean ejercer. En caso necesario, también podrán presentar una reclamación ante la autoridad de control competente.",
    EUS: "Aplikatu beharreko araudiaren arabera, erabiltzaileek honako eskubideak erabil ditzakete: datuetara sartzea, zuzentzea, ezabatzea, aurka egitea, tratamendua mugatzea eta datuen eramangarritasuna. Horretarako, adierazitako kontaktu-helbidera jo dezakete, erabili nahi duten eskubidea argi adieraziz. Beharrezkoa bada, kontrol-agintari eskudunaren aurrean erreklamazioa ere aurkez dezakete.",
  },

  section7Title: {
    ES: "7. Envíos comerciales y comunicaciones",
    EUS: "7. Merkataritza-mezuak eta komunikazioak",
  },
  section7Body: {
    ES: "Euskalia no realiza prácticas de envío masivo de correos electrónicos no solicitados (spam). Cualquier comunicación informativa o promocional se enviará únicamente cuando exista una base legítima o se haya obtenido el consentimiento previo, e incluirá siempre un mecanismo claro para cancelar la suscripción.",
    EUS: "Euskaliak ez du nahi ez diren posta elektroniko masiborik bidaltzen (spam). Edozein komunikazio informatibo edo sustapen-mezu legitimazio egokiarekin edo aldez aurreko baimenarekin bakarrik bidaliko da, eta beti izango du harpidetza uzteko mekanismo argia.",
  },

  section8Title: {
    ES: "8. Publicidad",
    EUS: "8. Publizitatea",
  },
  section8Body: {
    ES: "En la versión gratuita de Euskalia podrían mostrarse anuncios. En ningún caso se cederán datos personales a terceros con fines publicitarios sin una base legal adecuada o sin el consentimiento expreso de la persona usuaria.",
    EUS: "Euskaliaren doako bertsioan iragarkiak erakutsi daitezke. Inolaz ere ez zaizkie datu pertsonalak hirugarrenei emango helburu publizitarioekin, baimen espliziturik edo lege-oinarri egokirik gabe.",
  },

  section9Title: {
    ES: "9. Comentarios y opiniones de terceros",
    EUS: "9. Hirugarrenen iritziak eta iruzkinak",
  },
  section9Body: {
    ES: "Euskalia no se hace responsable de las opiniones, valoraciones o comentarios que terceras personas puedan publicar sobre el servicio en redes sociales, plataformas externas o sitios web ajenos al control del proyecto.",
    EUS: "Euskalia ez da erantzule izango hirugarren pertsonek sare sozialetan, kanpoko plataformetan edo proiektuaren kontrolpean ez dauden webguneetan zerbitzuari buruz argitaratu ditzaketen iritzi, balorazio edo iruzkinengatik.",
  },

  section10Title: {
    ES: "10. Modificaciones de la Política",
    EUS: "10. Politikaren aldaketak",
  },
  section10Body: {
    ES: "Euskalia se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios legislativos, criterios de las autoridades de control o mejoras técnicas del servicio. La versión vigente estará siempre disponible en el sitio web y, en caso de cambios relevantes, se informará a las personas usuarias y se recabará de nuevo el consentimiento cuando sea necesario.",
    EUS: "Euskaliak eskubidea du Pribatutasun politika hau aldatzeko, lege-aldaketetara, kontrol-agintarien irizpideetara edo zerbitzuaren hobekuntza teknikoetara egokitzeko. Indarrean dagoen bertsioa beti egongo da webgunean eskuragarri, eta aldaketa esanguratsuak eginez gero, erabiltzaileei jakinaraziko zaie eta, beharrezkoa bada, baimena berriro eskatuko da.",
  },
  footerNote: {
    ES: "Esta Política de Privacidad está actualizada a fecha [__________].",
    EUS: "Pribatutasun-politika hau eguneratuta dago honako data honetan: [__________].",
  },
},


// ====== TÉRMINOS Y CONDICIONES – EUSKALIA ====== //

terms_title: {
  ES: "Términos y Condiciones de Uso",
  EUS: "Erabilera-baldintzak",
},

terms_section1_title: {
  ES: "1. Objeto y aceptación",
  EUS: "1. Xedea eta onarpena",
},

terms_section1_p1: {
  ES: "Los presentes Términos y Condiciones regulan el acceso, navegación y uso de la plataforma Euskalia, así como la contratación de los servicios ofrecidos a través de la misma. El uso del sitio web implica la aceptación plena de estas condiciones por parte de la persona usuaria. En caso de no estar de acuerdo, deberá abstenerse de utilizar la plataforma.",
  EUS: "Erabilera-baldintza hauek Euskalia plataformara sartzea, nabigatzea eta hura erabiltzea arautzen dute, baita bertan eskaintzen diren zerbitzuen kontratazioa ere. Webgunea erabiltzeak baldintza hauek osorik onartzea dakar. Ados ez badago, erabiltzaileak plataformaren erabilerari uko egin beharko dio.",
},

terms_section2_title: {
  ES: "2. Identidad del responsable",
  EUS: "2. Arduradunaren identitatea",
},

terms_section2_p1: {
  ES: "El responsable de la plataforma es Euskalia, en adelante \"el Prestador\", accesible a través del dominio principal https://euskalia.ai.",
  EUS: "Plataformaren arduraduna Euskalia da, aurrerantzean \"Zerbitzu-emailea\", https://euskalia.ai domeinu nagusiaren bidez eskuragarria.",
},

terms_section3_title: {
  ES: "3. Servicios ofrecidos",
  EUS: "3. Eskaintzen diren zerbitzuak",
},

terms_section3_p1: {
  ES: "Euskalia permite a las personas usuarias introducir textos, documentos o enlaces en euskera, castellano eta beste hizkuntza batzuetan para obtener traducciones y resúmenes generados mediante inteligencia artificial.",
  EUS: "Euskaliak aukera ematen die erabiltzaileei testuak, dokumentuak edo estekak sartzeko, euskaraz, gaztelaniaz eta beste hizkuntza batzuetan, eta horien itzulpenak eta laburpenak lortzeko adimen artifiziala erabiliz.",
},

terms_section3_p2: {
  ES: "Podrá existir un acceso gratuito y uno o varios planes de pago con prestaciones ampliadas. Los planes de pago se contratan mediante suscripción con renovación automática, salvo cancelación previa por parte de la persona usuaria.",
  EUS: "Sarbide mota desberdinak izan daitezke: doako sarbidea eta ezaugarri zabalduak dituzten ordainpeko planak. Ordainpeko planak harpidetzaren bidez kontratatzen dira eta automatikoki berritzen dira, erabiltzaileak aldez aurretik ezeztatzen ez baditu.",
},

terms_section4_title: {
  ES: "4. Registro de usuarios",
  EUS: "4. Erabiltzaileen erregistroa",
},

terms_section4_p1: {
  ES: "Para contratar cualquiera de los planes de pago, la persona usuaria deberá registrarse facilitando información veraz y actualizada. La cuenta es personal e intransferible.",
  EUS: "Ordainpeko planetako edozein kontratatzeko, erabiltzaileak erregistratu beharko du, egiazko eta eguneratutako informazioa emanez. Kontua pertsonala eta besterenezinakoa da.",
},

terms_section5_title: {
  ES: "5. Condiciones económicas y facturación",
  EUS: "5. Baldintza ekonomikoak eta fakturazioa",
},

terms_section5_p1: {
  ES: "El precio de cada plan de pago se mostrará en el momento de la contratación. Los pagos se realizan mediante los métodos habilitados en la web. Las suscripciones se renuevan automáticamente cada periodo de facturación, salvo que la persona usuaria cancele su plan antes de la fecha de renovación. En caso de impago, el Prestador podrá suspender o cancelar el acceso al servicio.",
  EUS: "Ordainpeko plan bakoitzaren prezioa kontratazio unean erakutsiko da. Ordainketak webgunean gaitutako metodoen bidez egingo dira. Harpidetzak automatikoki berritzen dira fakturazio epe bakoitzean, erabiltzaileak berritze-data baino lehen plana ezeztatzen ez badu. Ordainketarik ez badago, Zerbitzu-emaileak zerbitzua eteteko edo bertan behera uzteko eskubidea izango du.",
},

terms_section6_title: {
  ES: "6. Uso permitido y prohibido",
  EUS: "6. Onartutako eta debekatutako erabilera",
},

terms_section6_p1: {
  ES: "La persona usuaria se compromete a utilizar Euskalia conforme a la ley, la moral y el orden público. En particular, queda prohibido:",
  EUS: "Erabiltzaileak Euskalia legearen, moralaren eta ordena publikoaren arabera erabiltzeko konpromisoa hartzen du. Bereziki, debekatuta dago:",
},

terms_section6_li1: {
  ES: "Utilizar la plataforma para crear, difundir o almacenar contenidos ilícitos, difamatorios, ofensivos, bortitzak, diskriminatzaileak edo hirugarrenen eskubideen aurkakoak.",
  EUS: "Plataforma edukirik ez-legala, iraingarria, bortitza, diskriminatzailea edo hirugarrenen eskubideen aurkakoa sortu, zabaldu edo gordetzeko erabiltzea.",
},

terms_section6_li2: {
  ES: "Utilizar la plataforma con fines de spam, fraude o manipulación de datos.",
  EUS: "Plataforma spam egiteko, iruzurra burutzeko edo datuak modu desegokian manipulatzeko erabiltzea.",
},

terms_section6_li3: {
  ES: "Intentar kaltetzea, aldatzea edo gainkargatzea Euskaliaren sistemak edo segurtasun-neurriak.",
  EUS: "Euskaliaren sistemak edo segurtasun-neurriak kaltetzen, aldatzen edo gainkargatzen saiatzea.",
},

terms_section6_p2: {
  ES: "El incumplimiento de estas obligaciones podrá dar lugar a la suspensión inmediata de la cuenta sin derecho a reembolso.",
  EUS: "Baldintza hauek ez betetzeak kontua berehala etetea ekar dezake, inolako itzulketarik egiteko eskubiderik gabe.",
},

terms_section7_title: {
  ES: "7. Propiedad intelectual",
  EUS: "7. Jabetza intelektuala",
},

terms_section7_p1: {
  ES: "Todos los elementos que conforman Euskalia (kodea, diseinua, testuak, sortutako audioak, logotipoa, eta abar) son propiedad del Prestador o cuentan con las licencias correspondientes. El uso de la plataforma no otorga a la persona usuaria ningún derecho de propiedad intelectual sobre dichos elementos.",
  EUS: "Euskalia osatzen duten elementu guztiak (kodea, diseinua, testuak, sortutako audioak, logotipoa eta abar) Zerbitzu-emailearen jabetzakoak dira edo dagokien lizentzia dute. Plataformaren erabilerak ez dio erabiltzaileari jabetza intelektualeko eskubiderik ematen elementu horien gainean.",
},

terms_section8_title: {
  ES: "8. Responsabilidad",
  EUS: "8. Erantzukizuna",
},

terms_section8_p1: {
  ES: "Euskalia no garantiza la disponibilidad continua de la plataforma, aunque adoptará medidas razonables para asegurar un servicio estable.",
  EUS: "Euskaliak ez du bermatzen plataformaren etengabeko erabilgarritasuna, nahiz eta zerbitzu egonkorra eskaintzeko neurri arrazoizkoak hartuko diren.",
},

terms_section8_p2: {
  ES: "El Prestador no se responsabiliza del uso indebido de los textos, itzulpenak o laburpenak generados por la persona usuaria, eta erabiltzaileak sartzen dituen eduki, testu edo fitxategien erantzule bakarra izango da.",
  EUS: "Zerbitzu-emailea ez da erantzule izango erabiltzaileak sortutako testu, itzulpen edo laburpenen erabilera desegokiaren aurrean, eta erabiltzailea izango da plataforman sartzen dituen eduki, testu eta fitxategien erantzule bakarra.",
},

terms_section9_title: {
  ES: "9. Cancelación y desistimiento",
  EUS: "9. Baliogabetzea eta atzera egitea",
},

terms_section9_p1: {
  ES: "La persona usuaria podrá cancelar su suscripción en cualquier momento desde su cuenta. La cancelación evitará renovaciones futuras, baina ez da itzulketarik egingo dagoeneko hasitako fakturazio epeei dagokienez, legez kontrakoa ez bada behintzat.",
  EUS: "Erabiltzaileak bere harpidetza edozein unetan baliogabetu ahal izango du bere kontutik. Baliogabetzeak etorkizuneko berritzeak ekidinen ditu, baina ez da itzulketarik egingo dagoeneko hasitako fakturazio epeengatik, legeak kontrakoa agintzen ez badu.",
},

terms_section10_title: {
  ES: "10. Modificaciones",
  EUS: "10. Aldaketak",
},

terms_section10_p1: {
  ES: "Euskalia se reserva el derecho de modificar en cualquier momento los presentes Términos y Condiciones. Las modificaciones se publicarán en el sitio web y serán aplicables desde el momento de su publicación.",
  EUS: "Euskaliak eskubidea du erabilera-baldintza hauek edozein unetan aldatzeko. Aldaketak webgunean argitaratuko dira eta argitaratzen diren unetik aurrera izango dira aplikagarriak.",
},

terms_section11_title: {
  ES: "11. Legislación aplicable y jurisdicción",
  EUS: "11. Aplikatu beharreko legeria eta jurisdikzioa",
},

terms_section11_p1: {
  ES: "Los presentes Términos y Condiciones se rigen por la legislación española. En caso de conflicto, las partes se someterán a los Juzgados y Tribunales que correspondan conforme a la normativa aplicable.",
  EUS: "Erabilera-baldintza hauek Espainiako legeriarekin bat etorriz arautzen dira. Gatazkarik izanez gero, alderdiak aplikatu beharreko araudiaren arabera dagokien epaitegi eta auzitegien jurisdikzioari men egingo diote.",
},
terms_footer_note: {
  ES: "Estos Términos y Condiciones están actualizados a fecha [__________].",
  EUS: "Erabilera-baldintza hauek eguneratuta daude honako data honetan: [__________].",
},



  //USO DE APIS DE INTELIGENCIA ARTIFICIAL //
aiApiUsage: {
  title: {
    ES: "Uso de APIs de Inteligencia Artificial",
    EUS: "Adimen Artifizialaren APIen erabilera",
  },

  intro: {
    ES: "En esta página te explicamos cómo utiliza Euskalia las APIs de inteligencia artificial para traducir y resumir textos, qué datos se envían a estos proveedores y qué recomendaciones debes seguir para usar la herramienta de forma segura.",
    EUS: "Orrialde honetan azaltzen dugu Euskaliak nola erabiltzen dituen adimen artifizialaren APIak testuak itzuli eta laburtzeko, zer datu bidaltzen diren hornitzaileei eta zein gomendio jarraitu behar diren tresna modu seguruan erabiltzeko.",
  },
  section1Title: {
    ES: "1. Qué APIs de IA utiliza Euskalia",
    EUS: "1. Euskaliak erabiltzen dituen AA APIak",
  },
  section1Body: {
    ES: "Para generar traducciones y resúmenes, Euskalia se conecta a servicios de inteligencia artificial ofrecidos por proveedores externos especializados. Estos procesan el texto enviado y devuelven una respuesta generada automáticamente.",
    EUS: "Itzulpenak eta laburpenak sortzeko, Euskalia kanpoko hornitzaile espezializatuen adimen artifizialeko zerbitzuekin konektatzen da. Haiek jasotako testua prozesatu eta erantzun automatikoa itzultzen dute.",
  },
  section1Body2: {
    ES: "Los modelos de IA pueden actualizarse con el tiempo. Cuando esto ocurra, Euskalia mantendrá esta página actualizada para que conozcas qué tecnología está en uso.",
    EUS: "AAko ereduak denborarekin eguneratu daitezke. Hori gertatzen denean, Euskaliak orrialde hau eguneratuta mantenduko du erabiltzen den teknologiari buruzko informazioa eskaintzeko.",
  },
  section2Title: {
    ES: "2. Qué datos se envían a las APIs",
    EUS: "2. Zer datu bidaltzen zaizkien APIei",
  },
  section2Body: {
    ES: "Cuando utilizas Euskalia, el texto que escribes o pegas (o fragmentos de documentos o URLs) se envía al proveedor de IA para generar la traducción o el resumen.",
    EUS: "Euskalia erabiltzen duzunean, idazten edo itsasten duzun testua (edo dokumentuetako zatiak edo URLak) AA hornitzailera bidaltzen da itzulpena edo laburpena sortzeko.",
  },
  section2Li1: {
    ES: "Texto introducido para traducir o resumir.",
    EUS: "Itzultzeko edo laburtzeko sartutako testua.",
  },
  section2Li2: {
    ES: "Idiomen arteko konbinazioa (adibidez, euskera → castellano).",
    EUS: "Hizkuntzen arteko konbinazioa (adibidez, euskara → gaztelania).",
  },
  section2Li3: {
    ES: "Instrucciones técnicas necesarias para que el modelo genere la respuesta.",
    EUS: "Ereduak erantzuna sortzeko behar dituen jarraibide teknikoak.",
  },
  section2Body2: {
    ES: "Evita incluir datos personales o sensibles siempre que sea posible.",
    EUS: "Ahal den guztietan, saihestu datu pertsonalak edo bereziki sentikorrak sartzea.",
  },
  section3Title: {
    ES: "3. Tratamiento, conservación y seguridad de los datos",
    EUS: "3. Datuen tratamendua, kontserbazioa eta segurtasuna",
  },
  section3Body: {
    ES: "Los textos enviados se usan solo para generar la respuesta solicitada. Euskalia no vende tus textos ni los comparte con fines comerciales.",
    EUS: "Bidaltzen diren testuak soilik eskatutako erantzuna sortzeko erabiltzen dira. Euskaliak ez ditu zure testuak saltzen edo helburu komertzialekin partekatzen.",
  },
  section3Body2: {
    ES: "Los proveedores pueden conservar ciertos registros técnicos por seguridad y estabilidad del servicio.",
    EUS: "Hornitzaileek zenbait erregistro tekniko gorde ditzakete zerbitzuaren segurtasuna eta egonkortasuna bermatzeko.",
  },
  section3Body3: {
    ES: "Euskalia utiliza conexiones cifradas y minimiza la información enviada.",
    EUS: "Euskaliak konexio enkriptatuak erabiltzen ditu eta bidaltzen den informazioa ahalik eta gehien murrizten du.",
  },
  section4Title: {
    ES: "4. Recomendaciones de uso responsable",
    EUS: "4. Erabilera arduratsurako gomendioak",
  },
  section4Body: {
    ES: "Para garantizar un uso seguro, sigue estas recomendaciones:",
    EUS: "Erabilera segurua bermatzeko, jarraitu gomendio hauek:",
  },
  section4Li1: {
    ES: "Evita datos personales identificables.",
    EUS: "Saihestu datu pertsonal identifikagarriak.",
  },
  section4Li2: {
    ES: "No incluyas información sensible (salud, finanzas, ideología...).",
    EUS: "Ez sartu informazio sentikorra (osasuna, finantzak, ideologia...).",
  },
  section4Li3: {
    ES: "Revisa siempre la respuesta antes de usarla en contextos importantes.",
    EUS: "Beti berrikusi erantzuna erabilera garrantzitsuetan erabili aurretik.",
  },
  section4Li4: {
    ES: "Respeta la ley y los derechos de terceros.",
    EUS: "Errespetatu legea eta hirugarrenen eskubideak.",
  },
  section5Title: {
    ES: "5. Relación con otras políticas",
    EUS: "5. Beste politika batzuekin harremana",
  },
  section5Body: {
    ES: "Esta información complementa la Política de Privacidad, el Aviso Legal y los Términos de Euskalia.",
    EUS: "Informazio honek Pribatutasun Politika, Lege Oharra eta Euskaliaren Baldintzak osatzen ditu.",
  },
  section5Body2: {
    ES: "Cada proveedor dispone de sus propias políticas, que recomendamos consultar.",
    EUS: "Hornitzaile bakoitzak bere politika propioak ditu; gomendagarria da horiek kontsultatzea.",
  },
  lastUpdate: {
    ES: "Esta información sobre el uso de APIs de IA está actualizada a fecha [________].",
    EUS: "AA APIen erabilerari buruzko informazio hau [________] eguneratu da.",
  },
},



// ====== POLÍTICA DE COOKIES – EUSKALIA ====== //

cookies_title: {
  ES: "Política de Cookies",
  EUS: "Cookieen Politika",
},
cookies_section1_title: {
  ES: "1. ¿Qué son las cookies?",
  EUS: "1. Zer dira cookieak?",
},

cookies_section1_p1: {
  ES: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tableta edo telefono mugikorra) cuando visitas un sitio web. Permiten que la página recuerde determinadas acciones y preferencias, hala nola hizkuntza edo oinarrizko konfigurazioak, zure nabigazio esperientzia hobetzeko eta ez dezazun berriro konfiguratu behar bisita bakoitzean.",
  EUS: "Cookieak testu fitxategi txikiak dira, eta zure gailuan (ordenagailuan, tabletan edo telefono mugikorrean) gordetzen dira webgune bat bisitatzen duzunean. Webguneak zure ekintza eta lehentasun jakin batzuk gogoratzeko balio dute, hala nola hizkuntza edo oinarrizko ezarpenak, nabigazio esperientzia hobetzeko eta bisita bakoitzean berriro konfiguratu beharrik izan ez dezazun.",
},

cookies_section2_title: {
  ES: "2. Tipos de cookies utilizadas por Euskalia",
  EUS: "2. Euskaliak erabiltzen dituen cookie motak",
},

cookies_section2_p1: {
  ES: "Euskalia utiliza únicamente cookies técnicas esentziales, behar-beharrezkoak plataformaren funtzionamendu egokia bermatzeko. Cookie horiei esker, webgunean nabigatu eta eskaintzen diren funtzio oinarrizkoak erabil daitezke.",
  EUS: "Euskaliak cookie tekniko esentzialak baino ez ditu erabiltzen, plataformaren funtzionamendu egokia bermatzeko beharrezkoak direnak. Cookie horiei esker, webgunean nabigatu eta eskaintzen diren funtzio oinarrizkoak erabili daitezke.",
},

cookies_section2_p2: {
  ES: "Euskalia NO utiliza cookies de publizitatea, analisi aurreratua, pertsonalizazio maila altua, jokabidearen jarraipena edo helburu komertzialeko hirugarrenen cookieak.",
  EUS: "Euskaliak EZ ditu erabiltzen publizitate cookieak, analisi aurreratukoak, pertsonalizazio maila handikoak, portaeraren jarraipeneko cookieak edo helburu komertzialeko hirugarrenen cookieak.",
},

cookies_section3_title: {
  ES: "3. Finalidad de las cookies",
  EUS: "3. Cookieen helburua",
},

cookies_section3_p1: {
  ES: "Euskaliak erabiltzen dituen cookie teknikoek helburu bakarra dute: plataforma behar bezala eta modu egonkorrean funtziona dezan bermatzea, oinarrizko konfigurazio batzuk gogoratuz eta webgunea behar bezala jardun dezan bisitan zehar.",
  EUS: "Euskaliak erabiltzen dituen cookie teknikoen helburu bakarra da plataforma behar bezala eta modu egonkorrean funtziona dezan bermatzea, oinarrizko konfigurazio batzuk gogoratuz eta nabigazioan zehar webgunea ongi ibil dadin.",
},

cookies_section4_title: {
  ES: "4. Cómo gestionar las cookies",
  EUS: "4. Nola kudeatu cookieak",
},

cookies_section4_p1: {
  ES: "Zure nabigatzailearen ezarpenen bidez baimendu, blokeatu edo ezaba ditzakezu zure gailuan instalatutako cookieak. Kontuan izan cookie teknikoak blokeatzen badituzu, baliteke webguneko zerbitzu edo funtzionalitate batzuk ez egotea erabilgarri edo behar bezala ez funtzionatzea.",
  EUS: "Zure nabigatzailearen konfigurazioan, zure gailuan instalatutako cookieak baimendu, blokeatu edo ezaba ditzakezu. Gogoratu cookie teknikoak blokeatzen badituzu, baliteke webguneko zerbitzu edo funtzio batzuk ez egotea eskuragarri edo behar bezala ez ibiltzea.",
},

cookies_section5_title: {
  ES: "5. Actualizaciones de la Política de Cookies",
  EUS: "5. Cookieen Politika eguneratzea",
},

cookies_section5_p1: {
  ES: "Euskaliak Cookieen Politika hau eguneratu ahal izango du beharrezkoa denean, bai araudi-aldaketen ondorioz, bai aldaketa teknikoengatik edo plataforman egindako hobekuntzengatik. Aldaketa esanguratsuak egiten badira, erabiltzaileei webgunearen bidez jakinaraziko zaie.",
  EUS: "Euskaliak Cookieen Politika hau eguneratu ahal izango du beharrezkoa denean, araudi-aldaketak, aldaketa teknikoak edo plataforman egindako hobekuntzak direla medio. Aldaketa garrantzitsuak eginez gero, erabiltzaileei webgunearen bidez emango zaie horren berri.",
},
cookies_last_update: {
  ES: "Esta Política de Privacidad está actualizada a fecha [__________].",
    EUS: "Pribatutasun-politika hau eguneratuta dago honako data honetan: [__________].",
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
 },

 proHeader_summary: {
  ES: "Resumidor",
  EUS: "Laburtzailea",
  EN: "Summary",
 },

 proHeader_corrector: {
  ES: "Corrector",
  EUS: "Zuzentzailea",
  EN: "Corrector",
 },

 proHeader_paraphraser: {
  ES: "Parafraseador",
  EUS: "Parafraseatzailea",
  EN: "Paraphraser",
 },

 proHeader_aiDetector: {
  ES: "Detector de IA",
  EUS: "IA detektagailua",
  EN: "AI Detector",
 },

 proHeader_humanizer: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
  EN: "Humanizer",
 },
  proSidebar_tools: {
  ES: "Herramientas",
  EUS: "Tresnak",
},

 proSidebar_translator: {
  ES: "Traductor",
  EUS: "Itzultzailea",
},

 proSidebar_summary: {
  ES: "Resumidor",
  EUS: "Laburtzailea", 
 },
 proSidebar_corrector: {
  ES: "Corrector",
  EUS: "Zuzentzailea",
 },

 proSidebar_library: {
  ES: "Biblioteca",
  EUS: "Liburutegia",
 },

 proSidebar_chat: {
  ES: "Chat con IA",
  EUS: "IArekin txata",
 },

 proSidebar_suggestions: {
  ES: "Sugerencias",
  EUS: "Iradokizunak",
 },

 proSidebar_help: {
  ES: "Ayuda",
  EUS: "Laguntza",
 },

 proSidebar_settings: {
  ES: "Ajustes",
  EUS: "Ezarpenak",
 },

 proSidebar_collapse: {
  ES: "Contraer",
  EUS: "Tolestu",
 },


  // =========================
  //        Pro Home
  // ========================= 
  proHome: {
  greeting_prefix: {
    ES: "Hola",
    EUS: "Kaixo",
  },

  title: {
    ES: "Bienvenido a Euskalia Pro",
    EUS: "Ongi etorri Euskalia Prora",
  },

  cardTranslator_title: {
    ES: "Traductor",
    EUS: "Itzultzailea",
  },

  cardTranslator_desc: {
    ES: "Traduce entre euskera, español, inglés y francés con calidad profesional.",
    EUS: "Itzuli euskara, gaztelania, ingelesa eta frantsesa maila profesionalarekin.",
  },

  cardSummary_title: {
    ES: "Resumidor",
    EUS: "Laburtzailea",
  },

  cardSummary_desc: {
    ES: "Sintetiza textos largos en segundos manteniendo claridad y fidelidad.",
    EUS: "Testu luzeak segundo gutxitan laburtzen ditu argitasuna eta zehaztasuna zainduz.",
  },

  cardCorrector_title: {
    ES: "Corrector",
    EUS: "Zuzentzailea",
  },

  cardCorrector_desc: {
    ES: "Revisa tu texto y corrige los errores gramaticales.",
    EUS: "Testua berrikusi eta akats gramatikoak zuzentzen ditu.",
  },
  cardParaphraser_title: {
    ES: "Parafraseador",
    EUS: "Parafrasatzailea",
  },
  cardParaphraser_desc: {
    ES: "",
    EUS: "",
  },
  cardAiDetector_title: {
    ES: "Detector de IA",
    EUS: "IA-detektorea",
  },
  cardAiDetector_desc: {
    ES: "", 
    EUS: "",
  },
  cardHumanizer_title: {
    ES: "Humanizador",
    EUS: "Humanizatzailea",
  },
  cardHumanizer_desc: {
    ES: "",
    EUS: "",
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
  },
  sources_tab_text: {
    ES: "Texto",
    EUS: "Testua",
  },
  sources_tab_document: {
    ES: "Documento",
    EUS: "Dokumentua",
  },
  sources_tab_url: {
    ES: "URL",
    EUS: "URL",
  },
  enter_text_here_full: {
    ES: "Escribe o pega el texto que quieras corregir aquí…",
    EUS: "Idatzi edo itsatsi zuzendu nahi duzun testua hemen…",
  },
  choose_file_title: {
    ES: "Elige tu archivo o carpeta.",
    EUS: "Aukeratu zure fitxategia edo karpeta.",
  },
  accepted_formats: {
    ES: "Formatos admitidos: PDF, DOCX, TXT, MD, imágenes…",
    EUS: "Onartutako formatuak: PDF, DOCX, TXT, MD, irudiak…",
  },
  folder_hint: {
    ES: "Aquí aparecerán los textos o documentos que subas para corregir.",
    EUS: "Hemen agertuko dira zuzendu nahi dituzun testuak edo dokumentuak.",
  },
  paste_urls_label: {
    ES: "Pegar URLs*",
    EUS: "URLak itsatsi*",
  },
  add_url: {
    ES: "Añadir URLs",
    EUS: "URLak gehitu",
  },
  paste_urls_placeholder: {
    ES: "Introduce aquí una o mas URLs (separadas por línea)",
    EUS: "Itsatsi hemen URL bat edo gehiago (lerro bakoitzean bat)",
  },
  save_urls: {
    ES: "Guardar",
    EUS: "Gorde",
  },
  cancel: {
    ES: "Cancelar",
    EUS: "Ezeztatu",
  },
  urls_note_visible: {
    ES: "Solo se importará el texto visible de la página web.",
    EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.",
  },
  urls_note_paywalled: {
    ES: "No se admiten artículos de pago.",
    EUS: "Ordaineko artikuluak ez dira onartzen.",
  },
  create_help_left: {
    ES: "Aquí verás los textos o documentos que subas para corregir. Puedes añadir archivos PDF, texto copiado o enlaces web…",
    EUS: "Hemen agertuko dira zuzendu nahi dituzun testuak edo dokumentuak. Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak…",
  },
  language_es: {
    ES: "Español",
    EUS: "Gaztelania",
  },
  language_eus: {
    ES: "Euskera",
    EUS: "Euskara",
  },
  language_en: {
    ES: "Inglés",
    EUS: "Ingelesa",
  },

  correct_button: {
    ES: "Corregir texto",
    EUS: "Testua zuzendu",
  },
  create_help_right: {
    ES: "Corrección estándar: ortografía, gramática y fluidez básica.",
    EUS: "Zuzenketa estandarra: ortografia, gramatika eta oinarrizko arintasuna.",
  },
  lang_mismatch: {
  ES: "Parece que el texto está en otro idioma distinto al seleccionado. Cambia el idioma del selector o usa el traductor de Euskalia.",
  EUS: "Badirudi testua hautatutako hizkuntzatik desberdina dela. Aldatu goiko hizkuntza-hautatzailea edo erabili Euskaliaren itzultzailea.",
  },
  view_changes: {
    ES: "Ver cambios",
    EUS: "Ikusi aldaketak",
    EN: "View changes",
  },
  hide_changes: {
    ES: "Ocultar cambios",
    EUS: "Aldaketak ezkutatu",
    EN: "Hide changes",
  },
  no_errors_message: {
    ES: "¡Muy bien! No hemos detectado errores.",
    EUS: "Oso ondo! Ez dugu akatsik aurkitu.",
    EN: "Nice job! We didn’t spot any mistakes.",
  },
},
  // =========================
  //        Pro Paraphraser
  // =========================    
  proSidebar_paraphraser: {
  ES: "Parafraseador",
  EUS: "Parafraseatzailea",
},
 proParaphraser_sources_title: {
  ES: "Fuentes",
  EUS: "Iturriak",
},

proParaphraser_tab_text: {
  ES: "Texto",
  EUS: "Testua",
}, 

proParaphraser_tab_document: {
  ES: "Documento",
  EUS: "Dokumentua",
},

proParaphraser_tab_url: {
  ES: "URL",
  EUS: "URLa",
},
proParaphraser_left_title: {
  ES: "Aquí verás los textos o documentos que subas para corregir.",
  EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.",
},
proParaphraser_left_body: {
  ES: "Puedes añadir archivos PDF, texto copiado o enlaces web…",
  EUS: "Gehitu ditzakezu PDF fitxategiak, testu kopiatua, web estekak...",
},
proParaphraser_enter_text_placeholder: {
  ES: "Escribe o pega tu texto aquí…",
  EUS: "Idatzi edo itsatsi hemen zure testua…",
},

proParaphraser_pick_file_title: {
  ES: "Elige tu archivo o carpeta",
  EUS: "Aukeratu zure fitxategia edo karpeta",
},

proParaphraser_accepted_formats: {
  ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…",
  EUS: "PDF fitxategiak, testu itsatsiak edo web estekak gehitu ditzakezu…",
},

proParaphraser_folder_hint: {
  ES: "Aquí aparecerán tus textos o documentos subidos.",
  EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak.",
},

proParaphraser_paste_urls_label: {
  ES: "Pegar URLs*",
  EUS: "URLa itsatsi*",
},

proParaphraser_add_urls_button: {
  ES: "Añadir URLs",
  EUS: "URLak gehitu",
},

proParaphraser_save_urls_button: {
  ES: "Guardar",
  EUS: "Gorde",
},

proParaphraser_cancel_button: {
  ES: "Cancelar",
  EUS: "Utzi",
},

proParaphraser_urls_note_visible: {
  ES: "Solo se importará el texto visible del sitio web.",
  EUS: "Webguneko testu ikusgarria bakarrik inportatuko da.",
},

proParaphraser_urls_note_paywalled: {
  ES: "No se admiten artículos de pago.",
  EUS: "Ordainpeko artikuluak ez dira onartzen.",
},

proParaphraser_remove_button: {
  ES: "Quitar",
  EUS: "Kendu",
},

proParaphraser_language_es: {
  ES: "Castellano",
  EUS: "Gaztelania",
},

proParaphraser_language_eus: {
  ES: "Euskera",
  EUS: "Euskara",
},

proParaphraser_language_en: {
  ES: "Inglés",
  EUS: "Ingelesa",
},

proParaphraser_output_language_aria: {
  ES: "Idioma de salida",
  EUS: "Irteerako hizkuntza",
},

proParaphraser_generate_button: {
  ES: "Crear parafraseo",
  EUS: "Parafraseoa sortu",
},

proParaphraser_help_right: {
  ES: "Elige entre los botones superiores el estilo de texto que prefieras y crea el parafraseo con tu contenido.",
  EUS: "Aukeratu goiko botoien artean nahi duzun testu-estiloa, eta sortu parafraseoa zure edukiarekin.",
},

proParaphraser_mode_neutral: {
  ES: "Neutral",
  EUS: "Neutrala",
},

proParaphraser_mode_informal: {
  ES: "Informal",
  EUS: "Informala",
},

proParaphraser_mode_professional: {
  ES: "Profesional",
  EUS: "Profesionala",
},

proParaphraser_mode_academic: {
  ES: "Académico",
  EUS: "Akademikoa",
},

proParaphraser_mode_fluent: {
  ES: "Fluido",
  EUS: "Jariozkoa",
},

proParaphraser_mode_simplified: {
  ES: "Simplificado",
  EUS: "Sinplifikatua",
},

proParaphraser_mode_creative: {
  ES: "Creativo",
  EUS: "Sortzailea",
},

proParaphraser_copy_result_aria: {
  ES: "Copiar resultado",
  EUS: "Emaitza kopiatu",
},

proParaphraser_delete_input_aria: {
  ES: "Eliminar texto de entrada y resultado",
  EUS: "Sarrerako testua eta emaitza ezabatu",
},

proParaphraser_copy_result_title: {
  ES: "Copiar resultado",
  EUS: "Emaitza kopiatu",
},

proParaphraser_delete_input_title: {
  ES: "Eliminar texto de entrada y resultado",
  EUS: "Sarrerako testua eta emaitza ezabatu",
},

proParaphraser_clear_text_title: {
  ES: "Borrar texto",
  EUS: "Testua ezabatu",
},

proParaphraser_clear_text_aria: {
  ES: "Borrar texto",
  EUS: "Testua ezabatu",
},

proParaphraser_download: {
  ES: "Descargar",
  EUS: "Deskargatu",
},

proParaphraser_copy: {
  ES: "Copiar",
  EUS: "Kopiatu",
},

proParaphraser_copied: {
  ES: "Copiado",
  EUS: "Kopiatuta",
},

proParaphraser_save_to_library_button: {
  ES: "Guardar",
  EUS: "Gorde",
},

proParaphraser_saved_to_library: {
  ES: "Guardado en biblioteca",
  EUS: "Liburutegian gordeta",
},

proParaphraser_default_title: {
  ES: "Parafraseo",
  EUS: "Parafraseoa",
},

proParaphraser_error_max_chars: {
  ES: "Has superado el límite de caracteres permitido.",
  EUS: "Onartutako karaktere kopurua gainditu duzu.",
},

proParaphraser_error_need_input: {
  ES: "Añade texto suficiente, URLs o documentos antes de crear el parafraseo.",
  EUS: "Parafraseoa sortu aurretik, gehitu testu nahikoa, URLak edo dokumentuak.",
},

proParaphraser_error_rate_limit: {
  ES: "Has alcanzado el límite de peticiones. Inténtalo más tarde.",
  EUS: "Eskaera muga gainditu duzu. Saiatu berriro geroago.",
},

proParaphraser_error_no_text: {
  ES: "No se recibió texto de la API.",
  EUS: "Ez da testurik jaso API-tik.",
},

proParaphraser_error_generic: {
  ES: "Error creando el parafraseo.",
  EUS: "Errorea parafraseoa sortzean.",
},

 // =========================
  //        Pro Ai Detector
  // =========================    
 proSidebar_aiDetector: {
  ES: "Detector de IA",
  EUS: "IA detektagailua",
},
aiDetector_subtitle: {
  ES: "Mantén la autenticidad de tus textos comprobando si podrían contener contenido generado por IA.",
  EUS: "Zure testuen benetakotasuna mantendu, IA bidez sortutako edukia izan dezaketela egiaztatuz.",
},

aiDetector_placeholder: {
  ES: "Escribe o pega aquí el texto que quieres analizar...",
  EUS: "Idatzi edo itsatsi hemen aztertu nahi duzun testua...",
},

aiDetector_paste_button: {
  ES: "Pegar texto",
  EUS: "Testua itsatsi",
},

aiDetector_upload_button: {
  ES: "Subir archivo",
  EUS: "Fitxategia igo",
},

aiDetector_clear_title: {
  ES: "Borrar",
  EUS: "Ezabatu",
},

aiDetector_max_chars: {
  ES: "5000",
  EUS: "5000",
},

aiDetector_button_analyze: {
  ES: "Revisar si hay contenido de IA",
  EUS: "IA edukia dagoen aztertu",
},

aiDetector_button_reanalyze: {
  ES: "Volver a analizar",
  EUS: "Berriro aztertu",
},

aiDetector_button_analyzing: {
  ES: "Analizando...",
  EUS: "Aztertzen...",
},

aiDetector_right_loading_title: {
  ES: "Analizando el texto…",
  EUS: "Testua aztertzen…",
},

aiDetector_right_loading_subtitle: {
  ES: "Esto puede tardar unos segundos",
  EUS: "Segundo batzuk har ditzake",
},

aiDetector_right_percent_subtitle: {
  ES: "del texto podría estar generado por IA",
  EUS: "testuaren zati bat IA bidez sortua izan liteke",
},

aiDetector_label_ai: {
  ES: "Generado por IA",
  EUS: "IAk sortua",
},

aiDetector_label_human: {
  ES: "Escrito por humano",
  EUS: "Gizakiak idatzia",
},

aiDetector_disclaimer: {
  ES: "Estimación orientativa. Puede no ser 100% precisa.",
  EUS: "Gutxi gorabeherako estimazioa. Baliteke %100 zehatza ez izatea.",
},

aiDetector_humanize_button: {
  ES: "Humanizar texto IA",
  EUS: "IA testua humanizatu",
},

aiDetector_error_generic: {
  ES: "No se pudo analizar el texto.",
  EUS: "Ezin izan da testua aztertu.",
},

aiDetector_error_network: {
  ES: "Error de red. Intenta de nuevo.",
  EUS: "Sareko errorea. Saiatu berriro.",
},

  // =========================
  //        Pro Humanizer
  // =========================    
 
  proSidebar_humanizer: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
},
proHumanizer_sources: { ES: "Fuentes", EUS: "Iturriak" },
proHumanizer_tabText: { ES: "Texto", EUS: "Testua" },
proHumanizer_tabDocument: { ES: "Documento", EUS: "Dokumentua" },
proHumanizer_tabUrl: { ES: "URL", EUS: "URL" },
proHumanizer_enterText: { ES: "Escribe o pega tu texto aquí…", EUS: "Idatzi edo itsatsi zure testua hemen…" },

proHumanizer_chooseFileTitle: { ES: "Elige tu archivo o carpeta", EUS: "Aukeratu zure fitxategia edo karpeta" },
proHumanizer_acceptedFormats: { ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…", EUS: "PDF fitxategiak, kopiatutako testua, web estekak… gehi ditzakezu" },
proHumanizer_folderHint: { ES: "Aquí aparecerán tus textos o documentos subidos.", EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak." },

proHumanizer_pasteUrls: { ES: "Pegar URLs*", EUS: "Itsatsi URLak*" },
proHumanizer_addUrls: { ES: "Añadir URLs", EUS: "Gehitu URLak" },
proHumanizer_save: { ES: "Guardar", EUS: "Gorde" },
proHumanizer_cancel: { ES: "Cancelar", EUS: "Utzi" },
proHumanizer_urlsNoteVisible: { ES: "Solo se importará el texto visible del sitio web.", EUS: "Webguneko testu ikusgarria bakarrik inportatuko da." },
proHumanizer_urlsNotePaywalled: { ES: "No se admiten artículos de pago.", EUS: "Ordainpeko artikuluak ez dira onartzen." },
proHumanizer_remove: { ES: "Quitar", EUS: "Kendu" },

proHumanizer_langES: { ES: "Castellano", EUS: "Gaztelania" },
proHumanizer_langEUS: { ES: "Euskera", EUS: "Euskara" },
proHumanizer_langEN: { ES: "Inglés", EUS: "Ingelesa" },

proHumanizer_generate: { ES: "Humanizar texto", EUS: "Testua humanizatu" },
proHumanizer_helpRight: { ES: 'Selecciona una fuente (texto, documentos o URLs) y pulsa "Humanizar texto".', EUS: 'Hautatu iturri bat (testua, dokumentuak edo URLak) eta sakatu "Testua humanizatu".' },

proHumanizer_saveButton: { ES: "Guardar", EUS: "Gorde" },
proHumanizer_savedToLibrary: { ES: "Guardado en biblioteca", EUS: "Liburutegian gordeta" },

proHumanizer_copyResultAria: { ES: "Copiar resultado", EUS: "Emaitza kopiatu" },
proHumanizer_deleteInputAria: { ES: "Eliminar texto de entrada y resultado", EUS: "Sarrerako testua eta emaitza ezabatu" },
proHumanizer_copyResultTitle: { ES: "Copiar resultado", EUS: "Emaitza kopiatu" },
proHumanizer_deleteInputTitle: { ES: "Eliminar texto de entrada y resultado", EUS: "Sarrerako testua eta emaitza ezabatu" },
proHumanizer_clearLeftTitle: { ES: "Borrar texto", EUS: "Testua ezabatu" },
proHumanizer_clearLeftAria: { ES: "Borrar texto", EUS: "Testua ezabatu" },

proHumanizer_urlTextareaPlaceholder: { ES: "Introduce aquí una o más URLs (separadas por línea)", EUS: "Sartu hemen URL bat edo gehiago (lerroz banatuta)" },

proHumanizer_download: { ES: "Descargar", EUS: "Deskargatu" },
proHumanizer_copy: { ES: "Copiar", EUS: "Kopiatu" },
proHumanizer_copied: { ES: "Copiado", EUS: "Kopiatuta" },

proHumanizer_leftTitle: { ES: "Aquí aparecerán tus textos o documentos subidos.", EUS: "Hemen agertuko dira igo dituzun testuak edo dokumentuak." },
proHumanizer_leftBody: { ES: "Puedes añadir archivos PDF, texto copiado, enlaces web…", EUS: "PDF fitxategiak, kopiatutako testua, web estekak… gehi ditzakezu" },

proHumanizer_modeBasic: { ES: "Básico", EUS: "Oinarrizkoa" },
proHumanizer_modeStandard: { ES: "Estándar", EUS: "Estandarra" },
proHumanizer_modeAdvanced: { ES: "Avanzado", EUS: "Aurreratua" },

proHumanizer_errorMaxChars: { ES: "Has superado el límite de caracteres permitido.", EUS: "Baimendutako karaktere-muga gainditu duzu." },
proHumanizer_errorNeedInput: { ES: "Añade texto suficiente, URLs o documentos antes de humanizar.", EUS: "Gehitu testu nahikoa, URLak edo dokumentuak humanizatu aurretik." },
proHumanizer_errorRateLimit: { ES: "Has alcanzado el límite de peticiones. Inténtalo más tarde.", EUS: "Eskaera-muga lortu duzu. Saiatu berriro geroago." },
proHumanizer_errorNoApiText: { ES: "No se recibió texto de la API.", EUS: "Ez da testurik jaso API-tik." },
proHumanizer_errorGeneric: { ES: "Error humanizando el texto.", EUS: "Errorea testua humanizatzean." },


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // =========================
  //        Pro library
  // =========================    

  library_filter_all: {
  ES: "Todos",
  EUS: "Denak",
},
library_filter_texts: {
  ES: "Traducciones",
  EUS: "Itzulpenak",
},
library_filter_summaries: {
  ES: "Resúmenes",
  EUS: "Laburpenak",
},
library_filter_folders: {
  ES: "Mis carpetas",
  EUS: "Nire karpetak",
},
library_create_new: {
  ES: "Crear nuevo",
  EUS: "Sortu berria",
},
library_create_text: {
  ES: "Crear traducción:",
  EUS: "Sortu itzulpena:",
},

library_prefix_summary: {
  ES: "Resumen:",
  EUS: "Laburpena:", 
},
library_prefix_translation: {
  ES: "Traducción:",
  EUS: "Itzulpena:",
},
library_prefix_corrector: {
  ES: "Corrección:",
  EUS: "Zuzenketa:",
},
library_create_summary: {
  ES: "Crear resumen",
  EUS: "Sortu laburpena",
},
library_no_folders: {
  ES: "Aún no tienes carpetas. Crea la primera.",
  EUS: "Ez duzu karpetarik oraindik. Sortu lehena.",
},

library_create_folder: {
  ES: "Crear nueva carpeta",
  EUS: "Karpeta berria sortu",
},

folder_modal_title: {
  ES: "Crear nueva carpeta",
  EUS: "Karpeta berria sortu",
},

folder_modal_label: {
  ES: "Nombre de la carpeta",
  EUS: "Karpetaren izena",
},

folder_modal_placeholder: {
  ES: "Ponle un nombre…",
  EUS: "Eman izen bat…",
},

folder_modal_cancel: {
  ES: "Cancelar",
  EUS: "Utzi",
},

folder_modal_save: {
  ES: "Guardar",
  EUS: "Gorde",
},
library_doc_edit_title: {
  ES: "Editar documento",
  EUS: "Editatu dokumentua",
},
library_doc_delete: {
  ES: "Eliminar",
  EUS: "Ezabatu",
},
library_back: {
  ES: "Atras",
  EUS: "Atzera",
},
folder_back: {
  ES: "Atras",
  EUS: "Atzera",
},
folder_modal_select_docs: {
  ES: "Elige qué documentos quieres guardar en esta carpeta",
  EUS: "Aukeratu karpeta honetan gorde nahi dituzun dokumentuak",
},
folder_empty: {
  ES: "Carpeta vacía",
  EUS: "Karpeta hutsa",
},
save_button: {
  ES: "Guardar",
  EUS: "Gorde",
},
saved_to_library: {
  ES: "Guardado en biblioteca",
  EUS: "Gordeta liburutegian",
},
library_filter_corrections: {
  ES: "Correcciones",
  EUS: "Zuzenketak",
},
library_create_correction: {
  ES: "Crear corrección",
  EUS: "Sortu zuzenketa",
},
library_filter_paraphrases: {
  ES: "Parafraseos",
  EUS: "Parafraseoak",
},
library_create_paraphrase: {
  ES: "Crear parafraseo",
  EUS: "Sortu parafraseoa",
},
library_filter_ai_detector: {
  ES: "Detector IA",
  EUS: "IA aztertzailea",
},
library_create_ai_detector: {
  ES: "Crear detección IA",
  EUS: "Sortu IA aztertzailea",
},
library_filter_humanizer: {
  ES: "Humanizador",
  EUS: "Humanizatzailea",
},
library_create_humanizer: {
  ES: "Crear humanizado",
  EUS: "Sortu humanizatua",
},
library_prefix_paraphraser: {
  ES: "Parafraseo:",
  EUS: "Parafraseoa:",
},
library_prefix_humanizer: {
  ES: "Humanizado:",
  EUS: "Humanizatua:",
},
library_doc_title_label: {
  ES: "Título del documento",
  EUS: "Dokumentuaren izenburua",
},

library_doc_title_placeholder: {
  ES: "Escribe un título…",
  EUS: "Idatzi izenburu bat…",
},


// =========================
  //        Pro Suggestions
  // =========================                          
  proSuggestions: {
  zone_badge: {
    ES: "Zona de ideas y sugerencias de Euskalia",
    EUS: "Euskaliaren ideien eta iradokizunen gunea",
  },

  title: {
    ES: "Ayúdanos a decidir las próximas mejoras de Euskalia",
    EUS: "Lagundu Euskaliaren hurrengo hobekuntzak erabakitzen",
  },

  description_part1: {
    ES: "Esta página es para que nos cuentes ",
    EUS: "Orri hau horretarako da: esan diezagukezun ",
  },

  description_highlight: {
    ES: "qué te gustaría que añadamos o mejoremos en Euskalia",
    EUS: "Euskalien zer gehitzea edo hobetzea gustatuko litzaizukeen",
  },

  description_part2: {
    ES: ": nuevas herramientas, cambios en el diseño, límites, ideas para estudiar mejor, cosas que te molestan… cualquier comentario es bienvenido.",
    EUS: ": tresna berriak, diseinu-aldaketak, mugak, ikasteko hobekuntzak, molestatzen zaizkizun gauzak… edozein iradokizun ongi etorria da.",
  },

  form_title: {
    ES: "Enviar una sugerencia",
    EUS: "Bidali iradokizun bat",
  },

  form_subtitle: {
    ES: "Escríbenos con total libertad. Leemos todas las ideas para decidir las siguientes funciones de Euskalia.",
    EUS: "Idatzi nahi duzuna askatasunez. Jasotzen ditugun ideia guztiak irakurtzen ditugu Euskaliaren hurrengo funtzioak erabakitzeko.",
  },

  form_badge: {
    ES: "Tus sugerencias nos ayudan a mejorar cada semana.",
    EUS: "Zure iradokizunek astero laguntzen digute hobetzen.",
  },

  textarea_label: {
    ES: "Escribe aquí tu sugerencia",
    EUS: "Idatzi hemen zure iradokizuna",
  },

  textarea_placeholder: {
    ES: "Cuéntanos qué herramienta, cambio o mejora te gustaría ver en Euskalia, y por qué crees que sería útil para ti o para otras personas.",
    EUS: "Esan zein tresna, aldaketa edo hobekuntza gustatuko litzaizukeen Euskalian, eta zergatik izango litzatekeen erabilgarria zuretzat edo besteentzat.",
  },

  email_label: {
    ES: "Correo electrónico (opcional)",
    EUS: "Helbide elektronikoa (aukerakoa)",
  },

  email_placeholder: {
    ES: "Solo si quieres que podamos contactarte para aclarar algo.",
    EUS: "Zerbait argitzeko zurekin harremanetan jar gaitezen nahi baduzu bakarrik.",
  },

  characters_suffix: {
    ES: "caracteres",
    EUS: "karaktere",
  },

  error_required: {
    ES: "Por favor, escribe tu sugerencia antes de enviarla.",
    EUS: "Mesedez, bidali aurretik idatzi zure iradokizuna.",
  },

  error_min_length: {
    ES: "Añade un poco más de detalle para que podamos entender bien tu sugerencia.",
    EUS: "Gehitu xehetasun pixka bat gehiago zure iradokizuna hobeto ulertu dezagun.",
  },

  success_message: {
    ES: "Gracias por tu sugerencia. La tendremos en cuenta para las próximas mejoras.",
    EUS: "Eskerrik asko zure iradokizunagatik. Hurrengo hobekuntzetan kontuan hartuko dugu.",
  },

  button_label: {
    ES: "Enviar sugerencia",
    EUS: "Biali iradokizuna",
  },
  form_description: {
    ES: " qué te gustaría que añadamos o mejoremos en Euskalia: nuevas herramientas, cambios en el diseño, límites, ideas para estudiar mejor, cosas que te molestan… cualquier comentario es bienvenido.",
    EUS: "Zer gustatuko litzaizuke Euskalian gehitu edo hobetzea: tresna berriak, diseinu aldaketak, muga berriak, ikasteko ideiak hobeak... edozein iradokizun ongi etorria da.",
  },
},



  // =========================
  //        Pro Help
  // =========================
proHelp: {
  title: {
    ES: "¿En qué podemos ayudarte?",
    EUS: "Nola lagun diezazukegu?",
  },
  search_placeholder: {
    ES: "Describe tu problema o escribe una pregunta",
    EUS: "Deskribatu zure arazoa edo idatzi galdera bat",
  },
  // SECCIÓN: EMPEZAR A USAR EUSKALIA
  section_getting_started_title: {
    ES: "Empezar a usar Euskalia",
    EUS: "Euskalia erabiltzen hasi",
  },

  section_getting_started_q1_title: {
    ES: "¿Qué es Euskalia y para qué sirve?",
    EUS: "Zer da Euskalia eta zertarako balio du?",
  },
  section_getting_started_q1_body: {
    ES: "Euskalia es una plataforma de inteligencia artificial diseñada para trabajadores, estudiantes y cualquier persona que necesite traducir o resumir contenido de forma rápida y sencilla. Está centrada en el público vasco o en cualquiera que necesite trabajar con el euskera.\n\nEuskalia está centrada en el euskera como idioma principal. Tanto la traducción como el resto de herramientas funcionan siempre en relación al euskera, utilizando otros idiomas como castellano, inglés o francés únicamente para convertir el contenido hacia el euskera o desde el euskera, según las necesidades.\n\nEuskalia se caracteriza por un diseño claro y una experiencia de uso pensada para trabajar con textos sin fricciones. La interfaz es sencilla, directa y accesible, lo que permite centrarse en el contenido desde el primer momento, sin distracciones ni configuraciones complejas.",
    EUS: "Euskalia adimen artifizialeko plataforma bat da, langileei, ikasleei eta edukiak modu azkar eta erraz batean itzuli edo laburtu behar dituen edonori zuzendua. Euskal herritarrei eta euskararekin lan egin behar duen edonori laguntzera bideratua dago.\n\nEuskararekin lotuta lan egiteko pentsatuta dago. Bai itzulpenak bai gainerako tresnek euskararekin lotuta funtzionatzen dute, eta gaztelania, ingelesa edo frantsesa bezalako beste hizkuntzak euskarara edo euskaratik edukia bihurtzeko erabiltzen dira, erabiltzaileen beharren arabera.\n\nEuskalia diseinu argi batek eta testuekin oztoporik gabe lan egiteko pentsatutako erabiltzaile-esperientziak bereizten du. Interfazea sinplea, zuzena eta eskuragarria da, eta horri esker edukiari arreta hasieratik bertatik jarri daiteke, distrakziorik edo konfigurazio ezin ulerturik gabe.",
  },

  section_getting_started_q2_title: {
    ES: "Primeros pasos: ¿cómo empiezo a usar la web?",
    EUS: "Lehen urratsak: nola hasi webgunea erabiltzen?",
  },
  section_getting_started_q2_body: {
    ES: "En la página principal eliges la herramienta que quieras usar. Puedes introducir el contenido pegando texto, subiendo un documento o añadiendo una URL, seleccionar el idioma y generar el resultado al instante. Después, puedes copiar el resultado o guardarlo en tu biblioteca para usarlo más tarde.",
    EUS: "Hasierako orrian erabili nahi duzun tresna aukeratzen duzu. Testua itsatsiz, dokumentu bat igota edo URL bat gehituta edukia sartu dezakezu, hizkuntza hautatu eta emaitza berehala sortu. Ondoren, emaitza kopiatu edo liburutegian gorde dezakezu geroago erabiltzeko.",
  },

  section_getting_started_q3_title: {
    ES: "¿Qué idiomas soporta Euskalia?",
    EUS: "Zein hizkuntza onartzen ditu Euskaliak?",
  },
  section_getting_started_q3_body: {
    ES: "Euskalia funciona con cuatro idiomas: euskera, castellano, inglés y francés. Todas las herramientas están diseñadas para usar siempre el euskera como idioma principal.",
    EUS: "Euskalia lau hizkuntzatan funtzionatzen du: euskaraz, gaztelaniaz, ingelesez eta frantsesez. Tresna guztiak euskara hizkuntza nagusi gisa erabiltzeko diseinatuta daude.",
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
    EN: "The Paraphraser rewrites a text while keeping its original meaning, using different wording and structure.",
    FR: "Le paraphraseur réécrit un texte en conservant son sens, avec une formulation et une structure différentes.",
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
    EN: "The AI Detector analyzes a text and estimates the likelihood that it was generated by artificial intelligence.",
    FR: "Le détecteur d’IA analyse un texte et estime la probabilité qu’il ait été généré par une intelligence artificielle.",
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
    EN: "The Humanizer transforms AI-generated text into more natural, human-like language by improving tone and flow.",
    FR: "L’humaniseur transforme les textes générés par l’IA en un langage plus naturel et humain.",
  },
  // SECCIÓN: FACTURACIÓN Y PLANES
  section_billing_title: {
    ES: "Cuenta y facturación",
    EUS: "Kontua eta fakturazioa",
  },
  section_billing_q1_title: {
    ES: "¿Qué incluye el Plan Pro?",
    EUS: "Zer dauka barne Pro Planak?",
  },
  section_billing_q1_body: {
    ES: "Traducciones y resúmenes más rápidos, límites ampliados, subida de documentos más pesados y funciones exclusivas.",
    EUS: "Itzulpen eta laburpen azkarragoak, muga zabalduak, dokumentu astunagoak igotzeko aukera eta funtzio esklusiboak.",
  },
  section_billing_q2_title: {
    ES: "¿Dónde veo mis recibos?",
    EUS: "Non ikus ditzaket nire ordainagiriak?",
  },
  section_billing_q2_body: {
    ES: "En tu área de Facturación puedes ver tus pagos, historial y gestionar tu suscripción.",
    EUS: "Fakturazio atalean zure ordainketak, historia eta harpidetzaren kudeaketa ikus ditzakezu.",
  },
  section_billing_q3_title: {
    ES: "¿Cómo cambio o cancelo mi plan?",
    EUS: "Nola aldatu edo ezeztatu dezaket nire plana?",
  },
  section_billing_q3_body: {
    ES: "Puedes cambiar entre planes o cancelar desde el apartado Ajustes → Suscripción.",
    EUS: "Planak aldatu edo ezeztatu ditzakezu Ezarpenak → Harpidetza ataletik.",
  }, 
  // SECCIÓN: SOLUCIONAR PROBLEMAS
  section_problems_title: {
    ES: "Solucionar problemas",
    EUS: "Arazoak konpontzea",
  },
  section_problems_q1_title: {
    ES: "No puedo subir un PDF",
    EUS: "Ezin dut PDF bat igo",
  },
  section_problems_q1_body: {
    ES: "Comprueba que el archivo no esté dañado y que no supere el límite del plan actual.",
    EUS: "Egiaztatu fitxategia ez dagoela hondatuta eta uneko planaren mugak ez dituela gainditzen.",
  },
  section_problems_q2_title: {
    ES: "La URL no carga o no se puede traducir",
    EUS: "URLa ez da kargatzen edo ezin da itzuli",
  },
  section_problems_q2_body: {
    ES: "Algunas páginas pueden bloquear el acceso automático. Intenta copiar y pegar el contenido manualmente.",
    EUS: "Zenbait webgunek sarbide automatikoa blokeatzen dute. Saiatu edukia eskuz kopiatu eta itsasten.",
  },
  section_problems_q3_title: {
    ES: "Los resultados tardan demasiado",
    EUS: "Emaitzek gehiegi behar dute",
  },
  section_problems_q3_body: {
    ES: "Puede deberse a tráfico alto o a un documento muy grande. Prueba a reducir el contenido o reintentar unos segundos después.",
    EUS: "Trafiko handia edo dokumentu handiegia izan daiteke arrazoia. Saiatu edukia murrizten edo berriro saiatzen segundo batzuk geroago.",
  },
  bottom_support_text: {
    ES: "Si sigues teniendo alguna duda, nuestro equipo está aquí para ayudarte.",
    EUS: "Zalantzak izanez gero, gure taldea hemen dago laguntzeko.",
  },

  bottom_support_cta: {
    ES: "Contactar con soporte",
    EUS: "Jarri harremanetan laguntzarekin",
  },

  bottom_support_mascot_alt: {
    ES: "Mascota de Euskalia ofreciendo ayuda",
    EUS: "Euskaliaren maskota laguntza eskaintzen",
  },
  support_bubble_text: {
    ES: "Si sigues teniendo alguna duda, nuestro equipo está aquí para ayudarte.",
    EUS: "Zalantzak izanez gero, gure taldea hemen dago laguntzeko.",
  },

  support_button_label: {
    ES: "Contactar con soporte",
    EUS: "Jarri harremanetan",
  },

  support_mascot_alt: {
    ES: "Mascota de Euskalia ofreciendo ayuda",
    EUS: "Euskaliaren maskota laguntza eskaintzen",
  },

},




  // =========================
  //        PRO SETTINGS
  // ========================= 

 settings_title: {
    ES: "Ajustes",
    EUS: "Ezarpenak",
  },
  settings_subtitle: {
    ES: "Personaliza tu experiencia en Olondo.AI.",
    EUS: "Pertsonalizatu zure esperientzia Olondo.AI-n.",
  },
  //PERFIL
  settings_profile_title: {
    ES: "Perfil",
    EUS: "Profila",
  },
  settings_profile_desc: {
    ES: "Información básica para identificar tu cuenta.",
    EUS: "Zure kontua identifikatzeko oinarrizko informazioa.",
  },
  settings_profile_display_name: {
    ES: "Nombre visible",
    EUS: "Izen ikusgaia",
  },
  settings_profile_email: {
    ES: "Email",
    EUS: "Emaila",
  },
  settings_profile_email_placeholder: {
    ES: "nombre@ejemplo.com",
    EUS: "izena@adierazpena.com",
  },
  settings_profile_security_hint: {
    ES: "La edición de contraseña se gestiona desde tu área segura.",
    EUS: "Pasahitzaren aldaketa zure eremu segurutik kudeatzen da.",
  },
  settings_manage_plan: {
    ES: "Gestionar plan",
    EUS: "Plana kudeatu",
  },
  //        APARIENCIA
  settings_appearance_title: {
    ES: "Apariencia",
    EUS: "Itxura",
  },
  settings_appearance_desc: {
    ES: "Elige cómo se ve la interfaz.",
    EUS: "Aukeratu interfazeak nola ikusten den.",
  },
  settings_appearance_theme: {
    ES: "Tema",
    EUS: "Gaia",
  },
  settings_appearance_theme_light: {
    ES: "Claro",
    EUS: "Argia",
  },
  settings_appearance_language: {
    ES: "Idioma",
    EUS: "Hizkuntza",
  },
  settings_appearance_language_hint: {
    ES: "Cambia el idioma desde aquí.",
    EUS: "Aldatu hizkuntza hemendik.",
  },
  //      NOTIFICACIONES
  settings_notifications_title: {
    ES: "Notificaciones",
    EUS: "Jakinarazpenak",
  },
  settings_notifications_desc: {
    ES: "Elige qué correos o avisos quieres recibir.",
    EUS: "Aukeratu zein mezu edo abisu jaso nahi dituzun.",
  },

  settings_notifications_product: {
    ES: "Novedades de producto",
    EUS: "Produktu-berrikuntzak",
  },
  settings_notifications_product_hint: {
    ES: "Lanzamientos, mejoras y anuncios importantes.",
    EUS: "Kaleratzeak, hobekuntzak eta iragarki garrantzitsuak.",
  },

  settings_notifications_tips: {
    ES: "Consejos y buenas prácticas",
    EUS: "Aholkuak eta praktika onak",
  },
  settings_notifications_tips_hint: {
    ES: "Emails breves para aprovechar mejor Olondo.AI.",
    EUS: "Email laburrak Olondo.AI hobeto aprobetxatzeko.",
  },

  settings_notifications_billing: {
    ES: "Facturación",
    EUS: "Fakturazioa",
  },
  settings_notifications_billing_hint: {
    ES: "Recibos, cambios de plan y recordatorios de pago.",
    EUS: "Ordainagiriak, plan-aldaketak eta ordainketa-oharpenak.",
  },
  settings_cta_save: {
    ES: "Guardar cambios",
    EUS: "Aldaketak gorde",
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
