
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpStatus = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500 | 502 | 503;

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  status: HttpStatus;
}

export interface ApiError {
  message: string;
  code?: string;
  status: HttpStatus;
  details?: Record<string, unknown>;
}

