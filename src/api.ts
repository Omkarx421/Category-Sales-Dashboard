import type { DashboardData, MonthsResponse } from '@/types';

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxxY_o33-8-CFWt6z6luz1LCDhkJCWF3g0N2TNEKzYJERukt9KzYOamn2c1DXj6nIfp/exec';

  

export async function fetchMonths(): Promise<MonthsResponse> {
  const res = await fetch(`${APPS_SCRIPT_URL}?action=getMonths`);
  return (await res.json()) as MonthsResponse;
}

export async function fetchData(month: string): Promise<DashboardData> {
  const res = await fetch(
    `${APPS_SCRIPT_URL}?action=loadData&month=${encodeURIComponent(month)}`
  );
  return (await res.json()) as DashboardData;
}
