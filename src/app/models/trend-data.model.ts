export interface TrendSeries {
    value: number;
    details: { name: string; category: string }[];
}
  
export interface TrendData {
    dates: string[];
    series: {
        inicial: TrendSeries[];
        pendiente: TrendSeries[];
        completado: TrendSeries[];
}
}
  