import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Folder, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "@/lib/translations";
import { useLibraryDocs, addLibraryDoc } from "@/proLibraryStore";
import { useLibraryFolders, addFolder } from "@/proLibraryFoldersStore";

export default function ProLibrary() {
  const { t } = useTranslation();
  const tr = (k, f) => t(k) || f;

  const navigate = useNavigate();

  // ===== STORE BIBLIOTECA (traducciones / resúmenes / correcciones / nuevas) =====
  const { docs, renameDoc, deleteDoc } = useLibraryDocs();

  // ===== STORE CARPETAS =====
  const { folders } = useLibraryFolders();

  // ===== Filtros =====
  // all | text | summary | corrections | paraphraser | humanizer | folders
  const [type, setType] = useState("all");

  const createAction = useMemo(() => {
    switch (type) {
      case "text":
        return {
          label: tr("library_create_text", "Crear texto"),
          href: "/cuenta-pro/traductor",
        };
      case "summary":
        return {
          label: tr("library_create_summary", "Crear resumen"),
          href: "/cuenta-pro/resumen",
        };
      case "corrections":
        return {
          label: tr("library_create_correction", "Crear corrección"),
          href: "/cuenta-pro/corrector",
        };

      // ===== NUEVAS =====
      case "paraphraser":
        return {
          label: tr("library_create_paraphrase", "Crear parafraseo"),
          href: "/cuenta-pro/parafraseador",
        };
      case "humanizer":
        return {
          label: tr("library_create_humanizer", "Crear humanizado"),
          href: "/cuenta-pro/humanizador",
        };

      case "folders":
        return {
          label: tr("library_create_folder", "Crear carpeta"),
          href: "#",
        };
      case "all":
      default:
        return {
          label: tr("library_create_new", "Crear nuevo"),
          href: "/cuenta-pro/traductor",
        };
    }
  }, [type, tr]);

  // ===== Crear plantilla (para que se vean y funcionen ya) =====
  const createDocAndOpen = (kind, titleFallback) => {
    const id = addLibraryDoc({
      kind,
      title: titleFallback,
      content: "",
    });
    navigate(`/cuenta-pro/biblioteca/${id}`);
  };

  const handleCreateTemplate = () => {
    if (type === "folders") {
      openFolderModal();
      return;
    }

    if (type === "text") {
      createDocAndOpen(
        "translation",
        tr("library_new_translation_title", "Nueva traducción")
      );
      return;
    }

    if (type === "summary") {
      createDocAndOpen(
        "summary",
        tr("library_new_summary_title", "Nuevo resumen")
      );
      return;
    }

    if (type === "corrections") {
      createDocAndOpen(
        "corrector",
        tr("library_new_corrector_title", "Nueva corrección")
      );
      return;
    }

    if (type === "paraphraser") {
      createDocAndOpen(
        "paraphraser",
        tr("library_new_paraphraser_title", "Nuevo parafraseo")
      );
      return;
    }

    if (type === "humanizer") {
      createDocAndOpen(
        "humanizer",
        tr("library_new_humanizer_title", "Nuevo humanizado")
      );
      return;
    }

    // all → por defecto traducción
    createDocAndOpen(
      "translation",
      tr("library_new_translation_title", "Nueva traducción")
    );
  };

  // ===== Menú contextual por documento =====
  const [menuOpenFor, setMenuOpenFor] = useState(null); // id
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!menuOpenFor) return;
      if (menuRef.current?.contains(e.target)) return;
      if (menuBtnRef.current?.contains(e.target)) return;
      setMenuOpenFor(null);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpenFor]);

  // ===== Modal editar título =====
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editingDocId, setEditingDocId] = useState(null);

  const openEditModal = (doc) => {
    setEditingDocId(doc.id);
    setEditTitle(doc.title || "");
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingDocId(null);
    setEditTitle("");
  };
  const saveEditTitle = () => {
    const title = editTitle.trim();
    if (!title || !editingDocId) return;
    renameDoc(editingDocId, title);
    closeEditModal();
  };

  const handleDeleteDoc = (docId) => {
    deleteDoc(docId);
    setMenuOpenFor(null);
  };

  // ===== Carpetas: estado solo para el modal / selección =====
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedDocIds, setSelectedDocIds] = useState([]);
  const [viewFolderId, setViewFolderId] = useState(null); // carpeta abierta

  const openFolderModal = () => {
    setFolderName("");
    setSelectedDocIds([]);
    setFolderModalOpen(true);
  };
  const closeFolderModal = () => {
    setFolderModalOpen(false);
    setSelectedDocIds([]);
  };
  const saveFolder = () => {
    const name = folderName.trim();
    if (!name) return;
    addFolder({ name, docIds: selectedDocIds });
    setFolderModalOpen(false);
    setSelectedDocIds([]);
  };

  // ========= Helpers visuales =========
  const svgToDataUri = (svg) => {
    const cleaned = svg
      .replace(/\n/g, "")
      .replace(/\t/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(cleaned)}`;
  };

  // ✅ Normaliza kinds antiguos para que SIEMPRE se pinten con la plantilla nueva
  const normalizeKind = (kind) => {
    const k = String(kind || "").toLowerCase().trim();

    // translation
    if (k === "translation" || k === "traductor" || k === "translator") return "translation";

    // summary
    if (k === "summary" || k === "resumen" || k === "laburpena") return "summary";

    // corrector
    if (k === "corrector" || k === "corrections" || k === "correction") return "corrector";

    // paraphraser (soporta antiguas)
    if (
      k === "paraphraser" ||
      k === "paraphrase" ||
      k === "parafraseador" ||
      k === "parafraseo" ||
      k === "paraphrasing"
    ) {
      return "paraphraser";
    }

    // humanizer
    if (k === "humanizer" || k === "humanize" || k === "humanizador") return "humanizer";

    return k || "translation";
  };

  const getDocVisual = (doc) => {
    // translation | summary | corrector | paraphraser | humanizer
    const kind = normalizeKind(doc?.kind);

    if (kind === "translation") {
      return {
        bg: "#FFF7E0",
        border: "#FFE2A8",
        iconSrc: "/Library1.png",
        labelPrefix: tr("library_prefix_translation", "Itzulpena:"),
        iconSize: 60,
      };
    }

    if (kind === "summary") {
      return {
        bg: "#EAF3FF",
        border: "#D9E7FF",
        iconSrc: "/Library2.jpg",
        labelPrefix: tr("library_prefix_summary", "Laburpena:"),
        iconSize: 56,
      };
    }

    if (kind === "corrector") {
      return {
        bg: "#E6F9EE",
        border: "#C6EED9",
        iconSrc: "/Library3.png",
        labelPrefix: tr("library_prefix_corrector", "Zuzenketa:"),
        iconSize: 80,
      };
    }

    if (kind === "paraphraser") {
      return {
        bg: "#FFF3E6",
        border: "#FFD8B8",
        iconSrc: "/Library4.png",
        labelPrefix: tr("library_prefix_paraphraser", "Parafraseoa:"),
        iconSize: 56,
      };
    }

    // humanizer
    const iconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <rect x="0" y="0" width="96" height="96" rx="20" fill="#DCFCE7"/>
        <path d="M48 22c-10.5 0-19 8.5-19 19v8c0 6 3.7 11.4 9.4 13.7V74c0 3.3 2.7 6 6 6h7.2c3.3 0 6-2.7 6-6V62.7C63.3 60.4 67 55 67 49v-8c0-10.5-8.5-19-19-19z"
          fill="none" stroke="#16A34A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M41 44c-2.8 0-5 2.2-5 5v1c-1.8.6-3 2.3-3 4.2 0 2.5 2 4.5 4.5 4.5"
          fill="none" stroke="#16A34A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M55 44c2.8 0 5 2.2 5 5v1c1.8.6 3 2.3 3 4.2 0 2.5-2 4.5-4.5 4.5"
          fill="none" stroke="#16A34A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M48 40v24" fill="none" stroke="#16A34A" stroke-width="5" stroke-linecap="round"/>
      </svg>
    `;
    return {
      bg: "#F0FDF4",
      border: "#CFF5DB",
      iconSrc: "/Library5.png",
      labelPrefix: tr("library_prefix_humanizer", "Humanizatua:"),
      iconSize: 56,
    };
  };

  const formatDateLabel = (doc) => {
    if (doc.createdAtLabel) return doc.createdAtLabel;
    if (doc.createdAt) {
      try {
        return new Date(doc.createdAt)
          .toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
          .replace(".", "");
      } catch {
        return "";
      }
    }
    return "";
  };

  // ===== Datos carpeta abierta =====
  const currentFolder =
    type === "folders" && viewFolderId
      ? folders.find((f) => f.id === viewFolderId)
      : null;

  const folderDocs =
    currentFolder && currentFolder.docIds && currentFolder.docIds.length
      ? docs.filter((d) => currentFolder.docIds.includes(d.id))
      : [];

  // ===== Render =====
  return (
    <>
      <section className="w-full bg-[#F4F8FF] pt-4 pb-16">
        <div className="mx-auto w-full px-6">
          {/* CUADRO DE LAS TARJETAS EN BLANCO */}
          <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-8">
            {/* Filtros arriba */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                {[
                  { id: "all", label: tr("library_filter_all", "Todos") },
                  { id: "text", label: tr("library_filter_texts", "Textos") },
                  {
                    id: "summary",
                    label: tr("library_filter_summaries", "Resúmenes"),
                  },
                  {
                    id: "corrections",
                    label: tr("library_filter_corrections", "Zuzenketak"),
                  },
                  {
                    id: "paraphraser",
                    label: tr("library_filter_paraphrases", "Parafraseos"),
                  },
                  {
                    id: "humanizer",
                    label: tr("library_filter_humanizer", "Humanizador"),
                  },
                  {
                    id: "folders",
                    label: tr("library_filter_folders", "Mis carpetas"),
                  },
                ].map(({ id, label }) => {
                  const active = type === id;

                  const btnBase =
                    "group relative overflow-hidden rounded-full text-sm px-4 py-2 transition-colors duration-150 hover:shadow-sm";
                  const textCls = active
                    ? "relative z-10 text-[#1A73E8]"
                    : "relative z-10 text-slate-700 group-hover:text-slate-900";
                  const bgBase =
                    "absolute inset-0 rounded-full scale-100 transition-transform duration-150 will-change-transform";
                  const bgCls = active
                    ? `${bgBase} bg-[#E8F0FE] group-hover:scale-[1.08] group-hover:bg-[#E3EEFF]`
                    : `${bgBase} bg-transparent group-hover:bg-[#F5F7FA] group-hover:scale-[1.08]`;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setType(id);
                        setViewFolderId(null);
                      }}
                      className={btnBase}
                      aria-pressed={active}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <span className={bgCls} aria-hidden="true" />
                      <span className={textCls}>{label}</span>
                    </button>
                  );
                })}
              </div>

              {type === "folders" && (
                <button
                  onClick={openFolderModal}
                  className="ml-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  {tr("library_create_folder", "Crear carpeta")}
                </button>
              )}
            </div>

            {/* ===== TARJETAS NORMALES ===== */}
            {(type === "all" ||
              type === "text" ||
              type === "summary" ||
              type === "corrections" ||
              type === "paraphraser" ||
              type === "humanizer") && (
              <div className="flex flex-wrap gap-[38px]">
                {/* Crear nuevo */}
                <button
                  type="button"
                  onClick={handleCreateTemplate}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
                  style={{ width: 280, height: 196, borderRadius: 16 }}
                >
                  <div className="h-full w-full flex flex-col items-center justify-center">
                    <div
                      className="flex items-center justify-center rounded-full bg-indigo-50"
                      style={{ width: 70, height: 70 }}
                    >
                      <Plus
                        className="text-indigo-600"
                        style={{ width: 21, height: 21 }}
                      />
                    </div>
                    <span className="mt-4 text-[20px] leading-6 text-slate-900">
                      {createAction.label}
                    </span>
                  </div>
                </button>

                {/* Tarjetas documento */}
                {docs
                  .filter((doc) => {
                    const k = normalizeKind(doc.kind);
                    if (type === "text") return k === "translation";
                    if (type === "summary") return k === "summary";
                    if (type === "corrections") return k === "corrector";
                    if (type === "paraphraser") return k === "paraphraser";
                    if (type === "humanizer") return k === "humanizer";
                    return true;
                  })
                  .map((doc) => {
                    const nk = normalizeKind(doc.kind);
                    const { bg, border, iconSrc, labelPrefix, iconSize } =
                      getDocVisual({ kind: nk });
                    const dateLabel = formatDateLabel(doc);

                    return (
                      <div
                        key={doc.id}
                        className="relative shadow-sm hover:shadow-md transition cursor-pointer"
                        style={{
                          width: 280,
                          height: 196,
                          borderRadius: 16,
                          backgroundColor: bg,
                          border: `1px solid ${border}`,
                        }}
                        onClick={() => navigate(`/cuenta-pro/biblioteca/${doc.id}`)}
                      >
                        {/* Menú (3 puntos) */}
                        <button
                          ref={menuBtnRef}
                          aria-label="Opciones"
                          className="absolute top-3 right-3 h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-white/60"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpenFor((prev) =>
                              prev === doc.id ? null : doc.id
                            );
                          }}
                          type="button"
                        >
                          <MoreVertical className="w-5 h-5 text-slate-600" />
                        </button>

                        {menuOpenFor === doc.id && (
                          <div
                            ref={menuRef}
                            className="absolute z-10 top-1/2 -translate-y-1/2 left-[calc(100%-100px)] w-[220px] rounded-xl border border-slate-200 bg-white shadow-lg py-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="w-full flex items-center gap-3 px-3 py-2 text-slate-800 hover:bg-slate-50"
                              onClick={() => {
                                openEditModal(doc);
                              }}
                            >
                              <Pencil className="w-5 h-5 text-slate-600" />
                              <span>
                                {tr("library_doc_edit_title", "Editar título")}
                              </span>
                            </button>
                            <button
                              className="w-full flex items-center gap-3 px-3 py-2 text-slate-800 hover:bg-slate-50"
                              onClick={() => handleDeleteDoc(doc.id)}
                            >
                              <Trash2 className="w-5 h-5 text-slate-600" />
                              <span>
                                {tr("library_doc_delete", "Eliminar documento")}
                              </span>
                            </button>
                          </div>
                        )}

                        {/* Contenido tarjeta */}
                        {nk === "paraphraser" ? (
                          <div className="h-full w-full px-5 pt-2 pb-6 flex flex-col">
                            <div className="h-[96px] w-full flex items-center justify-start">
                              <img
                                src={iconSrc}
                                alt=""
                                className="block select-none w-[90px] h-[90px] object-contain -ml-4"
                                draggable={false}
                              />
                            </div>
                            <h3
                              className="-mt-4 text-[18px] leading-[24px] pr-4"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              <span className="font-semibold text-slate-900">
                                {labelPrefix}
                              </span>{" "}
                              <span className="font-normal text-slate-700">
                                {doc.title || tr("library_untitled", "Sin título")}
                              </span>
                            </h3>
                            {dateLabel && (
                              <p className="mt-auto text-[14px] leading-[20px] text-slate-700">
                                {dateLabel}
                              </p>
                            )}
                          </div>
                        ) : nk === "humanizer" ? (
                          <div className="h-full w-full px-5 pt-7 pb-6 flex flex-col">
                            <img
                              src={iconSrc}
                              alt=""
                              width={100}
                              height={100}
                              className="block select-none -mt-2 -mb-4 -ml-6"
                              draggable={false}
                            />
                            <h3
                              className="mt-5 text-[18px] leading-[24px] pr-4"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              <span className="font-semibold text-slate-900">
                                {labelPrefix}
                              </span>{" "}
                              <span className="font-normal text-slate-700">
                                {doc.title || tr("library_untitled", "Sin título")}
                              </span>
                            </h3>
                            {dateLabel && (
                              <p className="mt-auto text-[14px] leading-[20px] text-slate-700">
                                {dateLabel}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="h-full w-full px-5 pt-8 pb-6 flex flex-col">
                            <img
                              src={iconSrc}
                              alt=""
                              width={iconSize || 40}
                              height={iconSize || 40}
                              className={`block select-none ${
                                nk === "corrector" ? "-mt-1 -ml-3" : "-mt-2 -mb-4"
                              }`}
                            />
                            <h3
                              className={`${
                                nk === "corrector"
                                  ? "mt-3"
                                  : nk === "translation"
                                  ? "mt-6"
                                  : nk === "summary"
                                  ? "mt-7"
                                  : nk === "humanizer"
                                  ? "mt-2"
                                  : "mt-8"
                              } text-[18px] leading-[24px] pr-4`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              <span className="font-semibold text-slate-900">
                                {labelPrefix}
                              </span>{" "}
                              <span className="font-normal text-slate-700">
                                {doc.title || tr("library_untitled", "Sin título")}
                              </span>
                            </h3>
                            {dateLabel && (
                              <p className="mt-auto text-[14px] leading-[20px] text-slate-700">
                                {dateLabel}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* ===== MIS CARPETAS ===== */}
            {type === "folders" && (
              <>
                {/* Vista carpeta abierta */}
                {currentFolder && (
                  <>
                    <div className="mb-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setViewFolderId(null)}
                        className="text-sm text-sky-700 hover:text-sky-900"
                      >
                        ← {tr("folder_back", "Volver a mis carpetas")}
                      </button>
                      <span className="text-sm text-slate-500">/</span>
                      <span className="text-base font-semibold text-slate-900 truncate">
                        {currentFolder.name}
                      </span>
                    </div>

                    {folderDocs.length === 0 ? (
                      <p className="text-sm text-slate-500">
                        {tr(
                          "folder_empty",
                          "Esta carpeta todavía no tiene documentos."
                        )}
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-[38px]">
                        {folderDocs.map((doc) => {
                          const nk = normalizeKind(doc.kind);
                          const { bg, border, iconSrc, labelPrefix } =
                            getDocVisual({ kind: nk });
                          const dateLabel = formatDateLabel(doc);

                          return (
                            <div
                              key={doc.id}
                              className="relative shadow-sm hover:shadow-md transition cursor-pointer"
                              style={{
                                width: 280,
                                height: 196,
                                borderRadius: 16,
                                backgroundColor: bg,
                                border: `1px solid ${border}`,
                              }}
                              onClick={() =>
                                navigate(`/cuenta-pro/biblioteca/${doc.id}`)
                              }
                            >
                              <div className="h-full w-full px-5 pt-8 pb-6 flex flex-col">
                                <img
                                  src={iconSrc}
                                  alt=""
                                  width={40}
                                  height={40}
                                  className="block select-none"
                                />
                                <h3
                                  className="mt-6 text-[18px] leading-[24px] pr-4"
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  <span className="font-semibold text-slate-900">
                                    {labelPrefix}
                                  </span>{" "}
                                  <span className="font-normal text-slate-700">
                                    {doc.title ||
                                      tr("library_untitled", "Sin título")}
                                  </span>
                                </h3>
                                {dateLabel && (
                                  <p className="mt-auto text-[14px] leading-[20px] text-slate-700">
                                    {dateLabel}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}

                {/* Lista vertical de carpetas */}
                {!currentFolder && (
                  <div className="flex flex-col gap-3 w-full max-w-xl">
                    {folders.length === 0 && (
                      <div className="rounded-xl border border-dashed border-slate-300 p-6 text-slate-500">
                        {tr(
                          "library_no_folders",
                          "Aún no tienes carpetas. Crea la primera."
                        )}
                      </div>
                    )}

                    {folders.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setViewFolderId(f.id)}
                        className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm hover:shadow-md hover:border-sky-200 transition text-left"
                      >
                        <div className="flex items-center gap-2 text-slate-700">
                          <Folder className="w-5 h-5 text-sky-500" />
                          <span className="font-medium truncate">{f.name}</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          {new Date(f.createdAt).toLocaleString()}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* MODAL Crear carpeta */}
      {isFolderModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/45"
            onClick={closeFolderModal}
          />
          <div className="relative w-full max-w-lg bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_80px_rgba(2,6,23,0.22)]">
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-[18px] leading-6 font-semibold text-slate-900">
                {tr("folder_modal_title", "Crear nueva carpeta")}
              </h3>
              <button
                onClick={closeFolderModal}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
                aria-label={tr("close", "Cerrar")}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-5">
              <label className="block text-sm font_medium text-slate-700 mb-1">
                {tr("folder_modal_label", "Nombre de la carpeta")}
              </label>
              <input
                autoFocus
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder={tr("folder_modal_placeholder", "Ponle un nombre…")}
                className="w-full rounded-[10px] border border-slate-300 bg-white px-3 py-2 text-[14px] leading-[22px] outline-none focus:ring-2 focus:ring-sky-500"
              />

              <div className="mt-4">
                <p className="text-xs font-medium text-slate-600 mb-2">
                  {tr(
                    "folder_modal_select_docs",
                    "Elige qué documentos quieres guardar en esta carpeta"
                  )}
                </p>
                <div className="max-h-64 overflow-y-auto space-y-2 rounded-[12px] border border-slate-200 bg-slate-50/60 px-1.5 py-2">
                  {docs.length === 0 ? (
                    <p className="px-3 py-2 text-xs text-slate-500">
                      {tr(
                        "folder_modal_no_docs",
                        "Todavía no tienes documentos guardados en tu biblioteca."
                      )}
                    </p>
                  ) : (
                    docs.map((doc) => {
                      const nk = normalizeKind(doc.kind);
                      const { labelPrefix } = getDocVisual({ kind: nk });
                      const dateLabel = formatDateLabel(doc);
                      const checked = selectedDocIds.includes(doc.id);

                      return (
                        <label
                          key={doc.id}
                          className="flex items-center justify_between gap-3 rounded-lg bg-white px-3 py-2 text-[13px] leading-[18px] text-slate-800 shadow-sm hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="truncate">
                              <span className="font-semibold">{labelPrefix}</span>{" "}
                              <span className="font-normal">
                                {doc.title || tr("library_untitled", "Sin título")}
                              </span>
                            </span>
                            {dateLabel && (
                              <span className="text-[11px] text-slate-500 mt-0.5">
                                {dateLabel}
                              </span>
                            )}
                          </div>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-sky-600"
                            checked={checked}
                            onChange={() => {
                              setSelectedDocIds((prev) =>
                                prev.includes(doc.id)
                                  ? prev.filter((id) => id !== doc.id)
                                  : [...prev, doc.id]
                              );
                            }}
                          />
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 flex items-center justify-end gap-3">
              <button
                onClick={closeFolderModal}
                className="px-4 py-2 text-[14px] font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
              >
                {tr("folder_modal_cancel", "Cancelar")}
              </button>
              <button
                onClick={saveFolder}
                disabled={!folderName.trim()}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {tr("folder_modal_save", "Guardar")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL Editar título del documento */}
      {editModalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/45" onClick={closeEditModal} />
          <div className="relative w_full max-w-md bg-white rounded-[18px] border border-slate-200 shadow-[0_24px_80px_rgba(2,6,23,0.22)]">
            <div className="px-6 pt-5 pb-3 flex items-center justify-between">
              <h3 className="text-[18px] leading-6 font-semibold text-slate-900">
                {tr("library_doc_edit_title", "Editar título")}
              </h3>
              <button
                onClick={closeEditModal}
                className="h-8 w-8 inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
                aria-label={tr("close", "Cerrar")}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {tr("library_doc_title_label", "Título")}
              </label>
              <input
                autoFocus
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder={tr("library_doc_title_placeholder", "Escribe un título")}
                className="w-full rounded-[10px] border border-slate-300 bg-white px-3 py-2 text-[14px] leading-[22px] outline-none focus:ring-2 focus:ring-sky-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEditTitle();
                }}
              />
            </div>
            <div className="px-6 pb-6 flex items-center justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-[14px] font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 shadow_sm"
              >
                {tr("cancel", "Cancelar")}
              </button>
              <button
                onClick={saveEditTitle}
                disabled={!editTitle.trim()}
                className="px-4 py-2 text-[14px] font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow_sm"
              >
                {tr("save", "Guardar")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
