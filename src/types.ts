export interface ItemRow {
  name: string;
  revenue: number;
}

export interface SubCategory {
  category: string;
  revenue: number;
  items: ItemRow[];
}

export interface CategoryData {
  total: number;
  topProduct: { name: string; revenue: number };
  categories: SubCategory[];
}

export interface DashboardData {
  success: boolean;
  month: string;
  categories: Record<string, CategoryData>;
  error?: string;
}

export interface MonthsResponse {
  success: boolean;
  months: string[];
  error?: string;
}

export type TabKey = 'Savoury' | 'Beverages' | 'Dessert';

export const TAB_KEYS: TabKey[] = ['Savoury', 'Beverages', 'Dessert'];

export const TAB_LABELS: Record<TabKey, string> = {
  Savoury: 'Savoury',
  Beverages: 'Beverage',
  Dessert: 'Dessert',
};
