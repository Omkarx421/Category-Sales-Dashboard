import { useEffect, useState } from 'react';
import { TrendingUp, Award, BarChart3 } from 'lucide-react';
import type { CategoryData, TabKey } from '@/types';
import { TAB_LABELS } from '@/types';
import { fmtINR } from '@/utils';
import CategoryCard from '@/components/CategoryCard';

interface DashboardViewProps {
  tabKey: TabKey;
  data: CategoryData | null;
  month: string;
}

export default function DashboardView({ tabKey, data, month }: DashboardViewProps) {
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    setAnimateBars(false);
    const timer = setTimeout(() => setAnimateBars(true), 100);
    return () => clearTimeout(timer);
  }, [data, tabKey]);

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-charcoal-100 bg-white p-12 text-center">
        <div>
          <BarChart3 size={48} className="mx-auto mb-4 text-charcoal-200" />
          <p className="text-sm font-medium text-charcoal-400">
            No records found for "{TAB_LABELS[tabKey]}" in {month}.
          </p>
        </div>
      </div>
    );
  }

  const maxCatRevenue = Math.max(...data.categories.map((c) => c.revenue), 1);

  return (
    <div className="animate-fade-in">
      {/* Metrics + Chart */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        {/* Headline cards */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-charcoal-800 to-charcoal-700 p-6 shadow-md transition-all hover:shadow-lg animate-fade-in-up">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp size={14} className="text-gold-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-gold-200">
                Total Category Revenue
              </span>
            </div>
            <div className="font-serif text-3xl font-bold text-gold-400">
              {fmtINR(data.total)}
            </div>
          </div>

          <div
            className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-gold-400/40 animate-fade-in-up"
            style={{ animationDelay: '80ms', opacity: 0 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <Award size={14} className="text-gold-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400">
                Top Performing Item
              </span>
            </div>
            <div className="text-lg font-bold text-charcoal-800">
              {data.topProduct.name || '—'}
            </div>
            <div className="mt-1 text-sm font-semibold text-gold-600">
              {fmtINR(data.topProduct.revenue)}
            </div>
          </div>
        </div>

        {/* Bar chart card */}
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: '120ms', opacity: 0 }}>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-charcoal-800">
            Sub-Category Breakdown
          </h3>
          <div className="flex flex-col gap-3">
            {data.categories.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-[13px]"
              >
                <div className="w-40 truncate font-semibold text-charcoal-800">
                  {c.category}
                </div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gold-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-200 to-gold-400 transition-all duration-700 ease-out"
                    style={{
                      width: animateBars
                        ? `${(c.revenue / maxCatRevenue * 100).toFixed(1)}%`
                        : '0%',
                      transitionDelay: `${i * 60}ms`,
                    }}
                  />
                </div>
                <div className="w-[90px] text-right font-semibold text-charcoal-400">
                  {fmtINR(c.revenue)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid of category cards */}
      <div className="columns-1 gap-6 lg:columns-2 xl:columns-3">
        {data.categories.map((cat, i) => (
          <CategoryCard key={i} subCategory={cat} index={i} />
        ))}
      </div>
    </div>
  );
}
