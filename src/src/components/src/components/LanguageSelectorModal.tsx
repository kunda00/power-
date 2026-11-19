import React, { useMemo, useState } from 'react';
import { Globe, Search, Check, X, Loader2 } from 'lucide-react';
import { WORLD_LANGUAGES } from '../data/companyContent';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLangKey: string;
  currentLangName: string;
  isTranslating: boolean;
  translationError: string | null;
  onSelectLanguage: (langKey: string, displayName: string) => void;
  titleLabel: string;
  noteLabel: string;
}

export function LanguageSelectorModal({
  isOpen,
  onClose,
  currentLangKey,
  currentLangName,
  isTranslating,
  translationError,
  onSelectLanguage,
  titleLabel,
  noteLabel,
}: LanguageSelectorModalProps) {
  const [search, setSearch] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');

  const filteredLanguages = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return WORLD_LANGUAGES;
    return WORLD_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(q) ||
        lang.nativeName.toLowerCase().includes(q) ||
        lang.region.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q)
    );
  }, [search]);

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customLanguage.trim();
    if (!cleaned || isTranslating) return;
    onSelectLanguage(cleaned.toLowerCase(), cleaned);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
    >
      <div className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 max-h-[88vh] flex flex-col overflow-hidden">
        {/* Drag handle on mobile */}
        <div className="sm:hidden w-10 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <Globe className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 id="lang-modal-title" className="text-lg font-semibold text-slate-900 truncate">
              {titleLabel}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close language selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Original Content Preservation Notice */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
          {noteLabel} · Current: <span className="font-semibold text-slate-900">{currentLangName}</span>
        </div>

        {/* Search + Custom World Language Input */}
        <div className="p-4 border-b border-slate-200 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Hindi, English, Arabic, Spanish, Tamil, Japanese..."
              className="w-full min-h-[44px] pl-10 pr-4 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customLanguage}
              onChange={(e) => setCustomLanguage(e.target.value)}
              placeholder="Or type any world language (e.g. Marathi, Kazakh, Zulu)..."
              className="flex-1 min-h-[44px] px-3.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!customLanguage.trim() || isTranslating}
              className="min-h-[44px] px-4 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 whitespace-nowrap shrink-0 flex items-center gap-2 transition-colors"
            >
              {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Translate
            </button>
          </form>

          {translationError ? (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {translationError}
            </div>
          ) : null}
        </div>

        {/* Languages Grid */}
        <div className="p-4 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredLanguages.map((lang) => {
            const isActive =
              currentLangKey.toLowerCase() === lang.code.toLowerCase() ||
              currentLangKey.toLowerCase() === lang.name.toLowerCase();
            return (
              <button
                key={lang.code}
                type="button"
                disabled={isTranslating}
                onClick={() => onSelectLanguage(lang.code, lang.name)}
                className={`min-h-[52px] px-4 py-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors ${
                  isActive
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-900 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{lang.nativeName}</div>
                  <div className={`text-xs truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {lang.name} · {lang.region}
                  </div>
                </div>
                {isTranslating && isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                ) : isActive ? (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                ) : null}
              </button>
            );
          })}
          {filteredLanguages.length === 0 ? (
            <div className="col-span-full py-6 text-center text-sm text-slate-500">
              No preset language matched &ldquo;{search}&rdquo;. Enter it in the box above to translate dynamically.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
