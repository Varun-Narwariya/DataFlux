const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const IS_MOCK = true; // 👈 flip to false when backend is ready

// ─── MOCK ───────────────────────────────────────────────
const mockClient = {
  post: async (endpoint) => {
    console.log("🟡 Mock POST →", endpoint);
    await new Promise((r) => setTimeout(r, 2000));

    // Auth endpoints return a user + token
    if (endpoint.includes("/auth")) {
      return {
        token: "mock-token-123",
        user: { id: "1", name: "Test User", email: "test@example.com" },
      };
    }

    // Storage endpoints return a file list
    if (endpoint.includes("/storage")) {
      return {
        files: [
          { id: "1", name: "invoice.pdf",  size: 204800,  createdAt: new Date().toISOString() },
          { id: "2", name: "contract.pdf", size: 512000,  createdAt: new Date().toISOString() },
          { id: "3", name: "report.pdf",   size: 1048576, createdAt: new Date().toISOString() },
        ],
      };
    }

    // All tool endpoints return a fake PDF blob
    return new Blob(["fake pdf content"], { type: "application/pdf" });
  },

  get: async (endpoint) => {
    console.log("🟡 Mock GET →", endpoint);
    await new Promise((r) => setTimeout(r, 1000));

    if (endpoint.includes("/auth/me")) {
      return { id: "1", name: "Test User", email: "test@example.com" };
    }

    if (endpoint.includes("/storage")) {
      return {
        files: [
          { id: "1", name: "invoice.pdf",  size: 204800,  createdAt: new Date().toISOString() },
          { id: "2", name: "contract.pdf", size: 512000,  createdAt: new Date().toISOString() },
          { id: "3", name: "report.pdf",   size: 1048576, createdAt: new Date().toISOString() },
        ],
      };
    }

    return {};
  },

  delete: async (endpoint) => {
    console.log("🟡 Mock DELETE →", endpoint);
    await new Promise((r) => setTimeout(r, 500));
    return { success: true };
  },
};

// ─── REAL ────────────────────────────────────────────────
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem("auth_token");
    const config = {
      headers: {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) return response.json();
    return response.blob();
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  post(endpoint, body, options = {}) {
    const isFormData = body instanceof FormData;
    return this.request(endpoint, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }
}

// ─── EXPORT — swap with one line ─────────────────────────
export const apiClient = IS_MOCK ? mockClient : new ApiClient(BASE_URL);