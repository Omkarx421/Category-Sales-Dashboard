import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, BarChart3 } from 'lucide-react';
import type { DashboardData, TabKey } from '@/types';
import { TAB_KEYS, TAB_LABELS } from '@/types';
import { fetchMonths, fetchData } from '@/api';
import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';
import DashboardView from '@/components/DashboardView';
import { DashboardSkeleton } from '@/components/Skeletons';

type StatusKind = 'idle' | 'loading' | 'ready' | 'error';

interface StatusState {
  kind: StatusKind;
  message: string;
}

export default function App() {
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isMonthsLoading, setIsMonthsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('Savoury');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>({
    kind: 'idle',
    message: 'Select a month and click Load.',
  });

  /* Fetch months on mount */
  useEffect(() => {
    (async () => {
      try {
        setStatus({ kind: 'loading', message: 'Loading available periods…' });
        const res = await fetchMonths();
        if (!res.success) throw new Error(res.error || 'Failed to load options');
        setMonths(res.months);
        if (res.months.length > 0) setSelectedMonth(res.months[0]);
        setStatus({ kind: 'idle', message: 'Ready to load data.' });
      } catch (err) {
        setStatus({
          kind: 'error',
          message: `Failed to fetch months: ${err instanceof Error ? err.message : String(err)}`,
        });
      } finally {
        setIsMonthsLoading(false);
      }
    })();
  }, []);

  /* Load data */
  const handleLoad = useCallback(async () => {
    if (!selectedMonth) {
      setStatus({ kind: 'error', message: 'Please select a valid period.' });
      return;
    }
    setIsLoading(true);
    setStatus({ kind: 'loading', message: `Fetching insights for ${selectedMonth}…` });
    try {
      const res = await fetchData(selectedMonth);
      if (!res.success) throw new Error(res.error || 'Execution failed');
      setData(res);
      setStatus({ kind: 'ready', message: `Updated report for ${selectedMonth}.` });
    } catch (err) {
      setStatus({
        kind: 'error',
        message: `Error loading report: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  const activeData = data?.categories[activeTab] ?? null;

  return (
    <div className="min-h-screen bg-cream">
      <TopBar
        months={months}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        onLoad={handleLoad}
        isLoading={isLoading}
        isMonthsLoading={isMonthsLoading}
        onMenuOpen={() => setSidebarOpen(true)}
      />

      {/* Sub-header */}
      <div className="flex flex-col items-start justify-between gap-2 border-b border-charcoal-100 bg-white px-6 py-3.5 md:flex-row md:items-center md:px-8">
        <div className="flex items-center gap-2 text-base font-bold text-charcoal-800">
          <span className="inline-block h-2 w-2 rounded-full bg-gold-400" />
          {TAB_LABELS[activeTab]}
        </div>
        <div
          className={`flex items-center gap-2 text-[13px] font-medium ${
            status.kind === 'error' ? 'font-semibold text-burgundy' : 'text-charcoal-400'
          }`}
        >
          {status.kind === 'error' && <AlertCircle size={14} />}
          {status.message}
        </div>
      </div>

      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <main className="mx-auto max-w-[1400px] px-6 py-8 md:px-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : data ? (
          <DashboardView tabKey={activeTab} data={activeData} month={data.month} />
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-charcoal-100 bg-white p-12 text-center">
            <div>
              <BarChart3 size={48} className="mx-auto mb-4 text-charcoal-200" />
              <p className="text-sm font-medium text-charcoal-400">
                Click "Load Data" to fetch insights.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

