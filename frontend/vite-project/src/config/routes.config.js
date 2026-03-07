export const ROUTES = {
  HOME: "/",
  TOOLS: "/tools",
  TOOL: "/tools/:toolId",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ACCOUNT: "/account",
  STORAGE: "/storage",
};

export const NAV_LINKS = [
  { label: "Tools",        href: "/tools"    },
  { label: "Compress PDF", href: "/tools/compress"  },
  { label: "Convert PDF",  href: "/tools?cat=Convert+to+PDF" },
  { label: "Edit PDF",     href: "/tools?cat=Edit"  },
  { label: "Sign PDF",     href: "/tools/sign"      },
];

export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP];
export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.ACCOUNT, ROUTES.STORAGE];
