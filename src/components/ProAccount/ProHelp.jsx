import React, { useState } from "react";
import { useTranslation } from "@/lib/translations";
import { Search, ChevronDown, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProHelp() {
  const { t } = useTranslation();
  const tr = (key, fallback) => t(key) || fallback;

  const [activeSection, setActiveSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState({}); // { [sectionId]: { [itemKey]: bool } }

  const sections = [
    {
      id: "getting_started",
      titleKey: "proHelp.section_getting_started_title",
      items: [
        {
          titleKey: "proHelp.section_getting_started_q1_title",
          bodyKey: "proHelp.section_getting_started_q1_body",
        },
        {
          titleKey: "proHelp.section_getting_started_q2_title",
          bodyKey: "proHelp.section_getting_started_q2_body",
        },
        {
          titleKey: "proHelp.section_getting_started_q3_title",
          bodyKey: "proHelp.section_getting_started_q3_body",
        },
      ],
    },
    {
      id: "translator",
      titleKey: "proHelp.section_translator_title",
      items: [
        {
          titleKey: "proHelp.section_1",
          bodyKey: "proHelp.section_11",
        },
        {
          titleKey: "proHelp.section_2",
          bodyKey: "proHelp.section_22",
        },
        {
          titleKey: "proHelp.section_3",
          bodyKey: "proHelp.section_33",
        },
      ],
    },
    {
      id: "paraphraser",
      titleKey: "proHelp.section_paraphraser_title",
      items: [
        {
          titleKey: "proHelp.section_4",
          bodyKey: "proHelp.section_44",
        },
        {
          titleKey: "proHelp.section_5",
          bodyKey: "proHelp.section_55",
        },
        {
          titleKey: "proHelp.section_6",
          bodyKey: "proHelp.section_66",
        },
      ],
    },
    {
      id: "billing",
      titleKey: "proHelp.section_billing_title",
      items: [
        {
          titleKey: "proHelp.section_billing_q1_title",
          bodyKey: "proHelp.section_billing_q1_body",
        },
        {
          titleKey: "proHelp.section_billing_q2_title",
          bodyKey: "proHelp.section_billing_q2_body",
        },
        {
          titleKey: "proHelp.section_billing_q3_title",
          bodyKey: "proHelp.section_billing_q3_body",
        },
      ],
    },
    {
      id: "problems",
      titleKey: "proHelp.section_problems_title",
      items: [
        {
          titleKey: "proHelp.section_problems_q1_title",
          bodyKey: "proHelp.section_problems_q1_body",
        },
        {
          titleKey: "proHelp.section_problems_q2_title",
          bodyKey: "proHelp.section_problems_q2_body",
        },
        {
          titleKey: "proHelp.section_problems_q3_title",
          bodyKey: "proHelp.section_problems_q3_body",
        },
      ],
    },
  ];

  const handleToggle = (id) => {
    setActiveSection((current) => (current === id ? null : id));
  };

  const handleToggleItem = (sectionId, itemKey) => {
    setOpenItems((prev) => {
      const sectionItems = prev[sectionId] || {};
      return {
        ...prev,
        [sectionId]: {
          ...sectionItems,
          [itemKey]: !sectionItems[itemKey],
        },
      };
    });
  };

  // === LÓGICA DE BÚSQUEDA ===
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const isSearching = normalizedQuery !== "";

  const sectionsWithContent = sections
    .map((section) => {
      const sectionTitle = tr(section.titleKey, "");
      const itemsWithContent = section.items.map((item) => {
        const title = tr(item.titleKey, "");
        const body = tr(item.bodyKey, "");
        return { ...item, title, body };
      });

      const filteredItems = !isSearching
        ? itemsWithContent
        : itemsWithContent.filter((item) => {
            const titleMatch = item.title
              .toLowerCase()
              .includes(normalizedQuery);
            const bodyMatch = item.body
              .toLowerCase()
              .includes(normalizedQuery);
            const sectionMatch = sectionTitle
              .toLowerCase()
              .includes(normalizedQuery);
            return titleMatch || bodyMatch || sectionMatch;
          });

      return {
        ...section,
        title: sectionTitle,
        itemsRendered: filteredItems,
      };
    })
    .filter((section) =>
      !isSearching ? true : section.itemsRendered.length > 0
    );

  return (
    <div className="flex-1 bg-[#F4F7FF] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-12">
        {/* HEADER */}
        <header className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold text-slate-900">
            {tr("proHelp.title", "")}
          </h1>
        </header>

        {/* BUSCADOR */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                className="w-full rounded-full border border-slate-200 bg-white shadow-sm px-11 py-3 text-sm md:text-base outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder={tr("proHelp.search_placeholder", "")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* SECCIONES */}
        <div className="space-y-3">
          {sectionsWithContent.map((section) => {
            const isOpen = isSearching ? true : activeSection === section.id;

            return (
              <div
                key={section.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(section.id)}
                  className="w-full flex items-center justify-between px-5 py-4 md:px-6 md:py-5 text-left"
                >
                  <span className="text-sm md:text-base font-semibold text-slate-900">
                    {section.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && section.itemsRendered.length > 0 && (
                  <div className="px-5 pb-5 pt-1 md:px-6 border-t border-slate-100">
                    <div className="space-y-4 text-sm md:text-[15px] text-slate-700">
                      {section.itemsRendered.map((item) => {
                        const itemIsOpen =
                          isSearching ||
                          openItems[section.id]?.[item.titleKey];

                        return (
                          <div key={item.titleKey}>
                            {/* TÍTULO PEQUEÑO (CLICKABLE) */}
                            <button
                              type="button"
                              onClick={() =>
                                !isSearching &&
                                handleToggleItem(section.id, item.titleKey)
                              }
                              className="w-full text-left font-semibold mb-1 text-slate-900 hover:text-sky-700 transition-colors"
                            >
                              {item.title}
                            </button>

                            {/* FRASE / CUERPO */}
                            {itemIsOpen && (
                              <p className="text-slate-600 whitespace-pre-line">
                                {item.body}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BLOQUE FINAL CON MASCOTA, BOCADILLO Y BOTÓN */}
        <div className="mt-12 flex justify-start">
          <div className="flex flex-col w-full max-w-4xl">
            {/* FILA: MASCOTA + BOCADILLO */}
            <div className="flex items-start gap-2">
              {/* MASCOTA */}
              <div className="w-44 h-44 md:w-56 md:h-56 flex-shrink-6">
                <img
                  src="/olondo-mascota2.png"
                  alt={tr("proHelp.support_mascot_alt", "")}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* BOCADILLO + BOTÓN DEBAJO */}
              <div className="relative max-w-lg mt-10 -ml-4 flex flex-col items-start">
                <div className="bg-white border border-slate-200 shadow-sm rounded-3xl px-6 py-4">
                  <p className="text-sm md:text-base text-slate-800">
                    {tr("proHelp.support_bubble_text", "")}
                  </p>
                </div>

                {/* COLITA DEL BOCADILLO */}
                <div className="absolute -left-3 top-[25%] -translate-y-1/2">
                  <div className="w-0 h-0 border-y-[12px] border-y-transparent border-r-[16px] border-r-slate-200"></div>
                  <div className="absolute left-[2px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[11px] border-y-transparent border-r-[15px] border-r-white"></div>
                </div>

                {/* BOTÓN SOPORTE – ESTÉTICA NUEVA */}
                <Link
                  to="/cuenta-pro/soporte"
                  className="
                    mt-4
                    self-center
                    inline-flex items-center justify-center
                    gap-2
                    rounded-full px-6 py-2.5
                    text-sm md:text-[15px] font-semibold
                    text-white
                    bg-gradient-to-r from-[#2563EB] to-[#06B6D4]
                    shadow-md
                    hover:brightness-110
                    active:scale-[0.98]
                    transition-all
                  "
                >
                  <Send className="w-4 h-4" />
                  {tr("proHelp.support_button_label", "")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
