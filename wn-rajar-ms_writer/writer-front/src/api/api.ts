import { ApiError } from "../errors";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number>;
}

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      );
      url += `?${searchParams.toString()}`;
    }

    const config: RequestInit = {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        // Extraire le message d'erreur du backend
        let errorMessage = "Une erreur est survenue";

        try {
          const errorData: ErrorResponse = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // Si le JSON est invalide, garder le message par défaut
        }

        throw new ApiError(response.status, errorMessage);
      }

      return await response.json();
    } catch (error) {
      // Si c'est déjà une ApiError, la propager
      if (error instanceof ApiError) {
        throw error;
      }

      // Sinon, c'est une erreur réseau ou autre
      console.error("API Error:", error);
      throw error;
    }
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", params });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiService(API_BASE_URL);
