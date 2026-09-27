import type { SubCategory } from '@/types';
import { fmtINR, heatColor } from '@/utils';

interface CategoryCardProps {
  subCategory: SubCategory;
  index: number;
}

export default function CategoryCard({ subCategory, index }: CategoryCardProps) {
  const revs = subCategory.items.map((it) => it.revenue);
  const minRev = Math.min(...revs);
  const maxRev = Math.max(...revs);

  return (
    <div
      className="break-inside-avoid mb-6 overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-gold-400/40 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 bg-charcoal-800 px-5 py-3.5">
        <h3 className="truncate text-sm font-bold tracking-wide text-gold-400">
          {subCategory.category}
        </h3>
        <span className="flex-shrink-0 whitespace-nowrap rounded-full border border-gold-400/40 bg-gold-400/20 px-3 py-1 text-[13px] font-bold text-white">
          {fmtINR(subCategory.revenue)}
        </span>
      </div>

      {/* Table */}
      <div className="max-h-[420px] overflow-y-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="sticky top-0">
              <th className="bg-cream px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-charcoal-400">
                Item Name
              </th>
              <th className="bg-cream px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-charcoal-400">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {subCategory.items.map((it, i) => {
              const ratio = maxRev === minRev ? 1 : (it.revenue - minRev) / (maxRev - minRev);
              const { bg, fg } = heatColor(ratio);
              return (
                <tr
                  key={i}
                  className="border-b border-charcoal-100 transition-colors last:border-none hover:bg-gold-50/50"
                >
                  <td className="px-5 py-3 font-medium text-charcoal-800">
                    {it.name}
                  </td>
                  <td
                    className="px-5 py-3 text-right font-semibold"
                    style={{ background: bg, color: fg }}
                  >
                    {fmtINR(it.revenue)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
