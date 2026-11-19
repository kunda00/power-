import React, { useEffect, useMemo, useState } from 'react';
import {
  Globe,
  ZoomIn,
  FileText,
  Phone,
  Mail,
  Eye,
  Share2,
  Check,
  Loader2,
  Building2,
  Layers,
  Send,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import {
  ENGLISH_CONTENT,
  HINDI_CONTENT,
  IMMUTABLE_COMPANY_INFO,
  SERVICE_METADATA,
  WORLD_LANGUAGES,
  type LocalizedContent,
  type ServiceCategory,
  type ServiceMeta,
  type TranslatedService,
} from './data/companyContent';
import { HeroInfrastructureDiagram, ServiceSchematic } from './components/EngineeringDiagrams';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { ZoomLightboxModal } from './components/ZoomLightboxModal';
import { BrochureViewer } from './components/BrochureViewer';

const STORAGE_PREFIX = 'prk_translation_v1_';

export default function App() {
  // Parse initial URL parameters (?view=recipient&lang=hi)
  const initialParams = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      isRecipient: params.get('view') === 'recipient',
      isLocked: params.get('locked') === '1',
      lang: params.get('lang') || 'en',
    };
  }, []);

  const [langKey, setLangKey] = useState<string>(initialParams.lang);
  const [content, setContent] = useState<LocalizedContent>(() =>
    initialParams.lang === 'hi' ? HINDI_CONTENT : ENGLISH_CONTENT
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const [isRecipientView, setIsRecipientView] = useState<boolean>(initialParams.isRecipient);
  const [showOriginalInline, setShowOriginalInline] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const [activeFilter, setActiveFilter] = useState<'all' | ServiceCategory>('all');
  const [activeMobileTab, setActiveMobileTab] = useState<'overview' | 'services' | 'brochure' | 'contact'>('overview');

  // Zoom Lightbox state
  const [zoomState, setZoomState] = useState<{
    isOpen: boolean;
    mode: 'hero' | 'service';
    service?: TranslatedService;
    serviceMeta?: ServiceMeta;
  }>({
    isOpen: false,
    mode: 'hero',
  });

  // Draft Inquiry Form state (in standard non-read-only view)
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryWork, setInquiryWork] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquiryValidationError, setInquiryValidationError] = useState<string | null>(null);

  const syncUrlParams = (nextLang: string, nextRecipient: boolean) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', nextLang);
      if (nextRecipient) {
        url.searchParams.set('view', 'recipient');
      } else {
        url.searchParams.delete('view');
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignore history API restrictions
    }
  };

  const loadLanguage = async (targetKey: string, displayName: string) => {
    const normalized = targetKey.trim().toLowerCase();
    setTranslationError(null);

    if (normalized === 'en' || normalized === 'english') {
      setLangKey('en');
      setContent(ENGLISH_CONTENT);
      syncUrlParams('en', isRecipientView);
      setIsLangModalOpen(false);
      return;
    }

    if (normalized === 'hi' || normalized === 'hindi' || normalized === 'हिन्दी') {
      setLangKey('hi');
      setContent(HINDI_CONTENT);
      syncUrlParams('hi', isRecipientView);
      setIsLangModalOpen(false);
      return;
    }

    // Check browser localStorage cache first
    try {
      const cachedRaw = localStorage.getItem(`${STORAGE_PREFIX}${normalized}`);
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw) as LocalizedContent;
        if (parsed && parsed.services && parsed.hero) {
          setLangKey(normalized);
          setContent(parsed);
          syncUrlParams(normalized, isRecipientView);
          setIsLangModalOpen(false);
          return;
        }
      }
    } catch {
      // Ignore storage access errors
    }

    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLanguage: displayName || targetKey,
          sourceContent: ENGLISH_CONTENT,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Translation request failed.');
      }

      const translated = data.translation as LocalizedContent;
      setLangKey(normalized);
      setContent(translated);
      syncUrlParams(normalized, isRecipientView);
      setIsLangModalOpen(false);

      try {
        localStorage.setItem(`${STORAGE_PREFIX}${normalized}`, JSON.stringify(translated));
      } catch {
        // Ignore storage quota issues
      }
    } catch (err) {
      setTranslationError(
        err instanceof Error ? err.message : 'Unable to translate into the selected language.'
      );
    } finally {
      setIsTranslating(false);
    }
  };

  // Load initial URL world language if not en/hi
  useEffect(() => {
    if (initialParams.lang !== 'en' && initialParams.lang !== 'hi') {
      void loadLanguage(initialParams.lang, initialParams.lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync HTML dir attribute for RTL world languages
  useEffect(() => {
    document.documentElement.dir = content.isRtl ? 'rtl' : 'ltr';
  }, [content.isRtl]);

  const handleToggleRecipientView = (next: boolean) => {
    setIsRecipientView(next);
    syncUrlParams(langKey, next);
  };

  const handleDropdownLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__more__') {
      setIsLangModalOpen(true);
      return;
    }
    const preset = WORLD_LANGUAGES.find((l) => l.code === val);
    void loadLanguage(val, preset ? preset.name : val);
  };

  const handleCopyRecipientLink = async () => {
    const url = new URL(window.location.href);
    if (url.hostname.startsWith('ais-dev-')) {
      url.hostname = url.hostname.replace(/^ais-dev-/, 'ais-pre-');
    }
    url.searchParams.set('view', 'recipient');
    url.searchParams.set('lang', langKey);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  const filteredServices = useMemo(() => {
    return SERVICE_METADATA.filter((meta) =>
      activeFilter === 'all' ? true : meta.category === activeFilter
    );
  }, [activeFilter]);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) {
      setInquiryValidationError('Please provide your name and contact number.');
      return;
    }
    setInquiryValidationError(null);
    const subject = encodeURIComponent(
      `Project Inquiry: ${inquiryWork.trim() || 'Civil & Earthwork Services'} — ${inquiryName.trim()}`
    );
    const body = encodeURIComponent(
      `To: ${IMMUTABLE_COMPANY_INFO.fullDisplayName}\n` +
        `From: ${inquiryName.trim()}\n` +
        `Phone: ${inquiryPhone.trim()}\n` +
        `Work Scope: ${inquiryWork.trim() || 'General Civil & Earthwork'}\n\n` +
        `Details:\n${inquiryMsg.trim()}`
    );
    window.location.href = `${IMMUTABLE_COMPANY_INFO.mailtoHref}?subject=${subject}&body=${body}`;
  };

  const scrollToSection = (
    id: 'overview' | 'services' | 'brochure' | 'contact'
  ) => {
    setActiveMobileTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0">
      {/* TOP BAR CONTRACT: 3 clean zones separated by gap-8 */}
      <header className="no-print sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line brand wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('overview');
            }}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            {IMMUTABLE_COMPANY_INFO.shortHeaderMark}
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#overview"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {content.nav.overview}
            </a>
            <a
              href="#services"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {content.nav.services}
            </a>
            <a
              href="#brochure"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {content.nav.brochure}
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {content.nav.contact}
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('brochure')}
              className="min-h-[40px] px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors"
            >
              {content.nav.viewBrochure}
            </button>
          </div>
        </div>
      </header>

      {/* WORKSPACE CONTROL BAR (Non-sticky to preserve mobile 15% cap) */}
      <div className="no-print bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Language Controls: Hindi | English | World Language Dropdown + Search Modal */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mr-1">
              <Globe className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{content.controls.languageLabel}:</span>
            </span>

            {/* Quick Hindi / English Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                disabled={isTranslating}
                onClick={() => void loadLanguage('hi', 'Hindi')}
                className={`min-h-[44px] px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  langKey === 'hi'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                हिन्दी (Hindi)
              </button>
              <button
                type="button"
                disabled={isTranslating}
                onClick={() => void loadLanguage('en', 'English')}
                className={`min-h-[44px] px-3.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  langKey === 'en'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                English
              </button>
            </div>

            {/* Clear Native World Languages Dropdown */}
            <div className="relative">
              <select
                aria-label={content.controls.allWorldLanguages}
                disabled={isTranslating}
                value={
                  WORLD_LANGUAGES.some((l) => l.code === langKey) ? langKey : '__custom__'
                }
                onChange={handleDropdownLanguageChange}
                className="min-h-[44px] pl-3.5 pr-9 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
              >
                {!WORLD_LANGUAGES.some((l) => l.code === langKey) ? (
                  <option value="__custom__">{content.languageNativeName}</option>
                ) : null}
                <optgroup label="Primary Languages">
                  <option value="hi">हिन्दी — Hindi</option>
                  <option value="en">English</option>
                </optgroup>
                <optgroup label="Indian & South Asian Languages">
                  {WORLD_LANGUAGES.filter(
                    (l) =>
                      l.code !== 'hi' &&
                      l.code !== 'en' &&
                      (l.region === 'India' || l.region === 'South Asia')
                  ).map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} — {lang.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="All World Languages">
                  {WORLD_LANGUAGES.filter(
                    (l) =>
                      l.code !== 'hi' &&
                      l.code !== 'en' &&
                      l.region !== 'India' &&
                      l.region !== 'South Asia'
                  ).map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} — {lang.name}
                    </option>
                  ))}
                </optgroup>
                <option value="__more__">Search / Type Any Other World Language...</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Searchable All World Languages Modal Button */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              {isTranslating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-amber-600" />
              )}
              <span>{content.controls.allWorldLanguages}</span>
            </button>
          </div>

          {/* Recipient View, Original Reference Toggle & Share Link Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowOriginalInline((v) => !v)}
              className={`min-h-[44px] px-3.5 rounded-xl border text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                showOriginalInline
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {content.controls.keepOriginalInline}
            </button>

            {!isRecipientView ? (
              <>
                <button
                  type="button"
                  onClick={() => handleToggleRecipientView(true)}
                  className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-800 flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
                >
                  <Eye className="w-4 h-4 text-amber-600" />
                  {content.controls.recipientView}
                </button>
                <button
                  type="button"
                  onClick={handleCopyRecipientLink}
                  className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-800 flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4 text-slate-600" />
                  )}
                  <span>
                    {copiedLink
                      ? content.controls.linkCopied
                      : `${content.controls.copyShareLink} (${content.languageNativeName})`}
                  </span>
                </button>
              </>
            ) : !initialParams.isLocked ? (
              <button
                type="button"
                onClick={() => handleToggleRecipientView(false)}
                className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-800 whitespace-nowrap shrink-0 transition-colors"
              >
                {content.controls.exitRecipientView}
              </button>
            ) : null}
          </div>
        </div>

        {/* Inline Translation Progress or Error Feedback */}
        {isTranslating ? (
          <div className="border-t border-slate-200 bg-amber-50/70 px-4 sm:px-6 py-2">
            <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-amber-900">
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
              <span>Translating view &amp; brochure while keeping original references intact...</span>
            </div>
          </div>
        ) : translationError ? (
          <div className="border-t border-red-200 bg-red-50 px-4 sm:px-6 py-2">
            <div className="max-w-7xl mx-auto text-xs font-medium text-red-700">
              {translationError}
            </div>
          </div>
        ) : null}
      </div>

      {/* READ-ONLY RECIPIENT MODE BANNER */}
      {isRecipientView ? (
        <div className="no-print bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-start sm:items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <div className="text-sm font-semibold text-white">
                  {content.controls.recipientBannerTitle}
                </div>
                <p className="text-xs text-slate-300">
                  {content.controls.recipientBannerSubtitle}
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-amber-300 shrink-0 tabular-nums">
              {IMMUTABLE_COMPANY_INFO.udyamRegistration}
            </div>
          </div>
        </div>
      ) : null}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-14 sm:space-y-20">
        {/* SECTION 1: HERO & CREDENTIAL STRIP */}
        <section id="overview" className="no-print space-y-8 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-white 
