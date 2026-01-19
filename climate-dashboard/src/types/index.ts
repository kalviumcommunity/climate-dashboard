export interface WeatherStation {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: Date;
}

export interface SensorReading {
  id: string;
  stationId: string;
  temperature: number;
  humidity: number;
  airQuality: number;
  rainfall: number;
  recordedAt: Date;
}

export interface SensorAlert {
  id: string;
  stationId: string;
  type: 'temperature' | 'rainfall' | 'airQuality';
  threshold: number;
  currentValue: number;
  status: 'active' | 'resolved' | 'acknowledged';
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'operator';
  createdAt: Date;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FilterParams {
  stationId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  type?: string;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
