import { Menu, ChevronDown, Loader2 } from 'lucide-react';

interface TopBarProps {
  months: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onLoad: () => void;
  isLoading: boolean;
  isMonthsLoading: boolean;
  onMenuOpen: () => void;
}

export default function TopBar({
  months,
  selectedMonth,
  onMonthChange,
  onLoad,
  isLoading,
  isMonthsLoading,
  onMenuOpen,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-charcoal-800 px-6 py-4 text-white shadow-lg md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-400/40 transition-colors hover:border-gold-400 hover:bg-gold-400/10"
          aria-label="Open navigation menu"
        >
          <Menu size={20} className="text-gold-400" />
        </button>
        <h1 className="font-serif text-xl font-semibold uppercase tracking-[0.12em] text-white">
           <span className="text-gold-400">Category Sales Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            disabled={isMonthsLoading}
            className="cursor-pointer appearance-none rounded-[10px] border border-gold-400/30 bg-charcoal-700 px-4 py-2.5 pr-10 text-sm font-medium text-white transition-all focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/20 disabled:opacity-50"
          >
            {isMonthsLoading && <option value="">Loading months…</option>}
            {!isMonthsLoading && months.length === 0 && (
              <option value="">No periods available</option>
            )}
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold-400"
          />
        </div>

        <button
          onClick={onLoad}
          disabled={isLoading || !selectedMonth}
          className="flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-gold-300 to-gold-400 px-6 py-2.5 text-sm font-bold text-charcoal-800 shadow-gold transition-all hover:-translate-y-px hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Loading…</span>
            </>
          ) : (
            <span>Load Data</span>
          )}
        </button>
      </div>
    </header>
  );
}
