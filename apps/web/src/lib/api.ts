export class ApiError extends Error {
	constructor(
		public status: number,
		public statusText: string,
		message?: string,
	) {
		super(message || `API Error: ${status} ${statusText}`);
		this.name = "ApiError";
	}
}

class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string = "/api") {
		this.baseUrl = baseUrl;
	}

	async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "GET",
			...options,
		});

		if (!response.ok) {
			throw new ApiError(
				response.status,
				response.statusText,
				`Failed to fetch ${endpoint}`,
			);
		}

		return response.json();
	}

	async post<T>(
		endpoint: string,
		data: unknown,
		options?: RequestInit,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				...options?.headers,
			},
			body: JSON.stringify(data),
			...options,
		});

		if (!response.ok) {
			throw new ApiError(
				response.status,
				response.statusText,
				`Failed to post to ${endpoint}`,
			);
		}

		return response.json();
	}

	async put<T>(
		endpoint: string,
		data: unknown,
		options?: RequestInit,
	): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				...options?.headers,
			},
			body: JSON.stringify(data),
			...options,
		});

		if (!response.ok) {
			throw new ApiError(
				response.status,
				response.statusText,
				`failed to update ${endpoint}`,
			);
		}

		return response.json();
	}

	async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method: "DELETE",
			...options,
		});

		if (!response.ok) {
			throw new ApiError(
				response.status,
				response.statusText,
				`failed to delete ${endpoint}`,
			);
		}

		return response.json();
	}
}

export const api = new ApiClient();
export { ApiClient };
