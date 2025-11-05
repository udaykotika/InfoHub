export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}
export interface CurrencyData {
  amount: number;
  from: string;
  to: string;
  converted: number;
  rate: number;
}
export interface Quote {
  text: string;
  author: string;
}
export type TabType = 'weather' | 'currency' | 'quotes';