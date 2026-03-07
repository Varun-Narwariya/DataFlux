export const TOOL_CATEGORIES = [
  "All",
  "Organize",
  "Optimize",
  "Convert to PDF",
  "Convert from PDF",
  "Edit",
  "Security",
];

export const TOOLS = [
  // Organize
  { id: "merge",       label: "Merge PDF",       emoji: "🔗", accent: "red",    cat: "Organize",        desc: "Combine multiple PDFs into one file",     route: "/tools/merge",         accept: ".pdf",                     multiple: true  },
  { id: "split",       label: "Split PDF",        emoji: "✂️", accent: "red",    cat: "Organize",        desc: "Separate one PDF into multiple files",    route: "/tools/split",         accept: ".pdf",                     multiple: false },
  { id: "remove",      label: "Remove Pages",     emoji: "🗑️", accent: "red",    cat: "Organize",        desc: "Delete pages from your PDF",              route: "/tools/remove-pages",  accept: ".pdf",                     multiple: false },
  { id: "extract",     label: "Extract Pages",    emoji: "📤", accent: "red",    cat: "Organize",        desc: "Extract selected pages from a PDF",       route: "/tools/extract-pages", accept: ".pdf",                     multiple: false },
  { id: "organize",    label: "Organize PDF",     emoji: "📋", accent: "red",    cat: "Organize",        desc: "Sort, reorder and delete PDF pages",      route: "/tools/organize",      accept: ".pdf",                     multiple: false },

  // Optimize
  { id: "compress",    label: "Compress PDF",     emoji: "🗜️", accent: "orange", cat: "Optimize",        desc: "Reduce PDF file size",                    route: "/tools/compress",      accept: ".pdf",                     multiple: false },
  { id: "repair",      label: "Repair PDF",       emoji: "🔧", accent: "orange", cat: "Optimize",        desc: "Fix a damaged or corrupted PDF",          route: "/tools/repair",        accept: ".pdf",                     multiple: false },
  { id: "ocr",         label: "OCR PDF",          emoji: "🔍", accent: "orange", cat: "Optimize",        desc: "Make scanned PDFs searchable",            route: "/tools/ocr",           accept: ".pdf",                     multiple: false },

  // Convert to PDF
  { id: "jpg-to-pdf",  label: "JPG to PDF",       emoji: "🖼️", accent: "blue",   cat: "Convert to PDF",  desc: "Convert JPG images to PDF",               route: "/tools/jpg-to-pdf",    accept: ".jpg,.jpeg,.png,.webp",    multiple: true  },
  { id: "word-to-pdf", label: "Word to PDF",      emoji: "📝", accent: "blue",   cat: "Convert to PDF",  desc: "Convert Word documents to PDF",           route: "/tools/word-to-pdf",   accept: ".doc,.docx",               multiple: false },
  { id: "ppt-to-pdf",  label: "PPT to PDF",       emoji: "📊", accent: "blue",   cat: "Convert to PDF",  desc: "Convert PowerPoint slides to PDF",        route: "/tools/ppt-to-pdf",    accept: ".ppt,.pptx",               multiple: false },
  { id: "excel-to-pdf",label: "Excel to PDF",     emoji: "📈", accent: "blue",   cat: "Convert to PDF",  desc: "Convert Excel spreadsheets to PDF",       route: "/tools/excel-to-pdf",  accept: ".xls,.xlsx",               multiple: false },
  { id: "html-to-pdf", label: "HTML to PDF",      emoji: "🌐", accent: "blue",   cat: "Convert to PDF",  desc: "Convert web pages to PDF",                route: "/tools/html-to-pdf",   accept: ".html,.htm",               multiple: false },

  // Convert from PDF
  { id: "pdf-to-jpg",  label: "PDF to JPG",       emoji: "🖼️", accent: "green",  cat: "Convert from PDF",desc: "Convert PDF pages to JPG images",         route: "/tools/pdf-to-jpg",    accept: ".pdf",                     multiple: false },
  { id: "pdf-to-word", label: "PDF to Word",      emoji: "📝", accent: "green",  cat: "Convert from PDF",desc: "Convert PDF to editable Word document",   route: "/tools/pdf-to-word",   accept: ".pdf",                     multiple: false },
  { id: "pdf-to-ppt",  label: "PDF to PPT",       emoji: "📊", accent: "green",  cat: "Convert from PDF",desc: "Convert PDF to PowerPoint presentation",  route: "/tools/pdf-to-ppt",    accept: ".pdf",                     multiple: false },
  { id: "pdf-to-excel",label: "PDF to Excel",     emoji: "📈", accent: "green",  cat: "Convert from PDF",desc: "Convert PDF tables to Excel spreadsheet", route: "/tools/pdf-to-excel",  accept: ".pdf",                     multiple: false },
  { id: "pdf-to-pdfa", label: "PDF to PDF/A",     emoji: "📁", accent: "green",  cat: "Convert from PDF",desc: "Convert PDF for long-term archiving",     route: "/tools/pdf-to-pdfa",   accept: ".pdf",                     multiple: false },

  // Edit
  { id: "rotate",      label: "Rotate PDF",       emoji: "🔄", accent: "purple", cat: "Edit",            desc: "Rotate PDF pages with ease",              route: "/tools/rotate",        accept: ".pdf",                     multiple: false },
  { id: "watermark",   label: "Watermark PDF",    emoji: "💧", accent: "purple", cat: "Edit",            desc: "Add watermark text or image to PDF",      route: "/tools/watermark",     accept: ".pdf",                     multiple: false },
  { id: "page-numbers",label: "Page Numbers",     emoji: "🔢", accent: "purple", cat: "Edit",            desc: "Add page numbers to your PDF",            route: "/tools/page-numbers",  accept: ".pdf",                     multiple: false },
  { id: "edit-pdf",    label: "Edit PDF",         emoji: "✏️", accent: "purple", cat: "Edit",            desc: "Edit text and images in your PDF",        route: "/tools/edit",          accept: ".pdf",                     multiple: false },

  // Security
  { id: "protect",     label: "Protect PDF",      emoji: "🔒", accent: "rose",   cat: "Security",        desc: "Password protect your PDF file",          route: "/tools/protect",       accept: ".pdf",                     multiple: false },
  { id: "unlock",      label: "Unlock PDF",       emoji: "🔓", accent: "rose",   cat: "Security",        desc: "Remove PDF password protection",          route: "/tools/unlock",        accept: ".pdf",                     multiple: false },
  { id: "sign",        label: "Sign PDF",         emoji: "✍️", accent: "rose",   cat: "Security",        desc: "Digitally sign your PDF documents",       route: "/tools/sign",          accept: ".pdf",                     multiple: false },
  { id: "redact",      label: "Redact PDF",       emoji: "⬛", accent: "rose",   cat: "Security",        desc: "Permanently hide sensitive PDF content",  route: "/tools/redact",        accept: ".pdf",                     multiple: false },
];

export const ACCENT_CLASSES = {
  red:    { bg: "bg-red-50",     border: "border-red-100",     icon: "bg-red-100 text-red-600",       badge: "bg-red-100 text-red-700",       btn: "bg-red-600 hover:bg-red-700",       text: "text-red-600",    ring: "focus:ring-red-500"    },
  orange: { bg: "bg-orange-50",  border: "border-orange-100",  icon: "bg-orange-100 text-orange-600", badge: "bg-orange-100 text-orange-700", btn: "bg-orange-500 hover:bg-orange-600", text: "text-orange-600", ring: "focus:ring-orange-500" },
  blue:   { bg: "bg-blue-50",    border: "border-blue-100",    icon: "bg-blue-100 text-blue-600",     badge: "bg-blue-100 text-blue-700",     btn: "bg-blue-600 hover:bg-blue-700",     text: "text-blue-600",   ring: "focus:ring-blue-500"   },
  green:  { bg: "bg-emerald-50", border: "border-emerald-100", icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-100 text-emerald-700", btn: "bg-emerald-600 hover:bg-emerald-700", text: "text-emerald-600", ring: "focus:ring-emerald-500" },
  purple: { bg: "bg-violet-50",  border: "border-violet-100",  icon: "bg-violet-100 text-violet-600", badge: "bg-violet-100 text-violet-700", btn: "bg-violet-600 hover:bg-violet-700", text: "text-violet-600", ring: "focus:ring-violet-500" },
  rose:   { bg: "bg-rose-50",    border: "border-rose-100",    icon: "bg-rose-100 text-rose-600",     badge: "bg-rose-100 text-rose-700",     btn: "bg-rose-600 hover:bg-rose-700",     text: "text-rose-600",   ring: "focus:ring-rose-500"   },
};

export const getToolById = (id) => TOOLS.find((t) => t.id === id);
export const getToolByRoute = (route) => TOOLS.find((t) => t.route === route);
export const getToolsByCategory = (cat) => cat === "All" ? TOOLS : TOOLS.filter((t) => t.cat === cat);
