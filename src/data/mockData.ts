export interface Tool {
  id: string;
  name: string;
  siteName: string;
  tagline: string;
  description: string;
  categories: { primary: string; secondary: string }[];
  rating: number;
  reviewCount: number;
  screenshots: string[];
  icon?: string;
  websiteUrl: string;
  githubUrl?: string;
  languages: string[];
  alternativeTo: string[];
  featured?: boolean;
}

export interface Category {
  name: string;
  subcategories: string[];
  icon: string;
}

export const categories: Category[] = [
  {
    name: "Design",
    icon: "🎨",
    subcategories: ["Image Editor", "Image Resizer", "Image Converter", "Background Remover", "Image Compressor", "Color Picker", "SVG Editor"],
  },
  {
    name: "Development",
    icon: "💻",
    subcategories: ["JSON Formatter", "JSON Validator", "XML Formatter", "Code Beautifier", "Regex Tester", "Base64 Encoder", "CSS Generator"],
  },
  {
    name: "Productivity",
    icon: "📋",
    subcategories: ["Note Taking", "Todo List", "Pomodoro Timer", "Kanban Board", "Habit Tracker"],
  },
  {
    name: "Writing",
    icon: "✍️",
    subcategories: ["Markdown Editor", "Text Diff", "Word Counter", "Grammar Checker", "Text to Speech"],
  },
  {
    name: "Calculator",
    icon: "🔢",
    subcategories: ["Scientific Calculator", "Unit Converter", "Percentage Calculator", "Date Calculator", "Loan Calculator"],
  },
  {
    name: "File Tool",
    icon: "📁",
    subcategories: ["PDF Editor", "File Converter", "ZIP Tool", "CSV Viewer", "QR Code Generator"],
  },
];

export const tools: Tool[] = [
  {
    id: "squoosh",
    name: "Squoosh",
    siteName: "squoosh.app",
    tagline: "Make images smaller using best-in-class codecs, right in your browser.",
    description: "Squoosh is a powerful image compression web app that supports multiple codecs including MozJPEG, WebP, AVIF, and more. Everything runs locally in your browser — no data is uploaded to any server. Compare original and compressed versions side-by-side with an interactive slider. Supports batch processing and offers fine-grained control over compression settings for each codec.",
    categories: [{ primary: "Design", secondary: "Image Compressor" }],
    rating: 4.8,
    reviewCount: 342,
    screenshots: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://squoosh.app",
    githubUrl: "https://github.com/GoogleChromeLabs/squoosh",
    languages: ["English"],
    alternativeTo: ["TinyPNG", "ImageOptim"],
    featured: true,
  },
  {
    id: "photopea",
    name: "Photopea",
    siteName: "photopea.com",
    tagline: "A free online photo editor that works like Photoshop, right in your browser.",
    description: "Photopea is a free online editor supporting PSD, XCF, Sketch, XD and CDR formats. It works entirely in the browser with no installation required. Supports layers, masks, smart objects, blend modes, text, vector tools and more. Compatible with Photoshop file formats and keyboard shortcuts.",
    categories: [{ primary: "Design", secondary: "Image Editor" }],
    rating: 4.7,
    reviewCount: 891,
    screenshots: [
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://www.photopea.com",
    languages: ["English", "Korean", "Japanese", "Chinese", "Spanish", "French", "German"],
    alternativeTo: ["Photoshop", "GIMP"],
    featured: true,
  },
  {
    id: "jsoncrack",
    name: "JSON Crack",
    siteName: "jsoncrack.com",
    tagline: "Visualize JSON data into interactive graphs.",
    description: "JSON Crack is a tool that generates graph diagrams from JSON objects. It helps you understand complex nested JSON structures by visualizing them as interactive node graphs. All processing happens in the browser. Supports JSON, YAML, XML, and TOML formats.",
    categories: [{ primary: "Development", secondary: "JSON Formatter" }],
    rating: 4.6,
    reviewCount: 215,
    screenshots: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://jsoncrack.com",
    githubUrl: "https://github.com/AykutSarac/jsoncrack.com",
    languages: ["English"],
    alternativeTo: ["JSON Editor Online"],
    featured: true,
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    siteName: "excalidraw.com",
    tagline: "Virtual whiteboard for sketching hand-drawn like diagrams.",
    description: "Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel. It runs entirely in the browser and supports real-time collaboration. Export your drawings as PNG, SVG or save as .excalidraw files.",
    categories: [
      { primary: "Design", secondary: "SVG Editor" },
      { primary: "Productivity", secondary: "Note Taking" },
    ],
    rating: 4.9,
    reviewCount: 567,
    screenshots: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://excalidraw.com",
    githubUrl: "https://github.com/excalidraw/excalidraw",
    languages: ["English", "Korean", "Japanese", "Chinese", "Spanish", "French"],
    alternativeTo: ["Miro", "Draw.io"],
    featured: true,
  },
  {
    id: "remove-bg-local",
    name: "BackgroundCut",
    siteName: "backgroundcut.app",
    tagline: "Remove image backgrounds instantly, 100% in your browser.",
    description: "BackgroundCut uses AI models running directly in your browser via WebAssembly to remove backgrounds from images. No data leaves your device. Supports batch processing and fine-tune with manual brush tools.",
    categories: [{ primary: "Design", secondary: "Background Remover" }],
    rating: 4.3,
    reviewCount: 89,
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://backgroundcut.app",
    languages: ["English"],
    alternativeTo: ["remove.bg"],
  },
  {
    id: "regex101",
    name: "Regex101",
    siteName: "regex101.com",
    tagline: "Build, test, and debug regular expressions online.",
    description: "Regex101 is an online regex editor and debugger. It supports multiple flavors including PCRE, JavaScript, Python, and Go. Features real-time matching, explanation of each token, a quick reference sidebar, and the ability to save and share expressions.",
    categories: [{ primary: "Development", secondary: "Regex Tester" }],
    rating: 4.9,
    reviewCount: 1203,
    screenshots: [
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://regex101.com",
    languages: ["English"],
    alternativeTo: ["RegExr"],
  },
  {
    id: "stackedit",
    name: "StackEdit",
    siteName: "stackedit.io",
    tagline: "In-browser Markdown editor with live preview and sync.",
    description: "StackEdit is a full-featured, open-source Markdown editor based on PageDown. It provides live HTML preview, smart layout, scroll sync, and supports LaTeX math expressions. Works offline and syncs with Google Drive, Dropbox, and GitHub.",
    categories: [{ primary: "Writing", secondary: "Markdown Editor" }],
    rating: 4.4,
    reviewCount: 178,
    screenshots: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://stackedit.io",
    githubUrl: "https://github.com/benweet/stackedit",
    languages: ["English"],
    alternativeTo: ["Typora", "Notion"],
  },
  {
    id: "qrcode-monkey",
    name: "QRCode Monkey",
    siteName: "qrcode-monkey.com",
    tagline: "Create custom QR codes with logo, colors and shapes for free.",
    description: "QRCode Monkey lets you generate custom QR codes with colors, shapes, and logos directly in the browser. High resolution PNG and vector SVG downloads. No account needed and no limits.",
    categories: [{ primary: "File Tool", secondary: "QR Code Generator" }],
    rating: 4.5,
    reviewCount: 320,
    screenshots: [
      "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=800&h=500&fit=crop",
    ],
    websiteUrl: "https://www.qrcode-monkey.com",
    languages: ["English", "German", "Spanish", "French"],
    alternativeTo: ["QR Code Generator"],
  },
];
