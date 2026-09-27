import { Menu, X } from 'lucide-react';
import type { TabKey } from '@/types';
import { TAB_KEYS, TAB_LABELS } from '@/types';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-charcoal-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-[300px] max-w-[80vw] bg-charcoal-800 text-white flex flex-col shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
          <h2 className="font-serif text-base font-semibold tracking-wider text-gold-400">
            SELECT PAGE
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-white transition-colors hover:text-gold-400"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {TAB_KEYS.map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  onSelectTab(key);
                  onClose();
                }}
                className={`flex items-center justify-between rounded-[10px] px-5 py-3.5 text-[15px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gold-400 text-charcoal-800 font-bold shadow-gold'
                    : 'text-charcoal-100 hover:bg-gold-400/12 hover:text-white'
                }`}
              >
                <span>{TAB_LABELS[key]}</span>
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isActive ? 'bg-charcoal-800' : 'bg-gold-400'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 px-6 py-5">
          <div className="flex items-center gap-2 text-xs text-charcoal-200">
            <Menu size={14} className="text-gold-400" />
            <span className="tracking-wide">Category Analytics</span>
          </div>
        </div>
      </aside>
    </>
  );
}
