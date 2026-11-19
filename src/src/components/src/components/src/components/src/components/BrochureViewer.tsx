import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  Phone,
  Mail,
  MapPin,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import {
  IMMUTABLE_COMPANY_INFO,
  SERVICE_METADATA,
  type LocalizedContent,
} from '../data/companyContent';
import { HeroInfrastructureDiagram, ServiceSchematic } from './EngineeringDiagrams';

interface BrochureViewerProps {
  content: LocalizedContent;
  langKey: string;
  showOriginalInline: boolean;
  onToggleOriginalInline: () => void;
}

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;
const ZOOM_PRESETS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function BrochureViewer({
  content,
  langKey,
  showOriginalInline,
  onToggleOriginalInline,
}: BrochureViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  const [fitToWidth, setFitToWidth] = useState(true);
  const [manualScale, setManualScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(840);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.clientWidth - 24;
        setContainerWidth(Math.max(280, w));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const fitScale = Math.min(1, containerWidth / A4_WIDTH_PX);
  const activeScale = fitToWidth ? fitScale : manualScale;

  const handleZoomOut = () => {
    const current = activeScale;
    const next = Math.max(0.4, Math.round((current - 0.15) * 100) / 100);
    setFitToWidth(false);
    setManualScale(next);
  };

  const handleZoomIn = () => {
    const current = activeScale;
    const next = Math.min(2, Math.round((current + 0.15) * 100) / 100);
    setFitToWidth(false);
    setManualScale(next);
  };

  const handlePresetClick = (preset: number) => {
    setFitToWidth(false);
    setManualScale(preset);
  };

  const handleFitClick = () => {
    setFitToWidth(true);
  };

  const handleDownloadPdf = async () => {
    if (!page1Ref.current || !page2Ref.current || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfError(null);
    setPdfStatus(null);

    try {
      const [img1, img2] = await Promise.all([
        toPng(page1Ref.current, {
          pixelRatio: 2,
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          backgroundColor: '#ffffff',
          cacheBust: true,
        }),
        toPng(page2Ref.current, {
          pixelRatio: 2,
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          backgroundColor: '#ffffff',
          cacheBust: true,
        }),
      ]);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(img1, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.addPage();
      pdf.addImage(img2, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

      const safeLang = langKey.replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
      pdf.save(`POWER-RUDRA-KUNDA-Brochure-${safeLang}.pdf`);
      setPdfStatus('PDF downloaded');
      setTimeout(() => setPdfStatus(null), 3500);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to generate PDF file.';
      setPdfError(`${msg} You can also use Print / Save PDF.`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Interactive Brochure Control Bar */}
      <div className="no-print bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Left: Zoom Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 mr-1">
            {content.brochureSection.zoomLabel}:
          </span>
          <button
            type="button"
            onClick={handleZoomOut}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="Zoom out brochure"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="min-w-[54px] text-center font-mono text-xs font-semibold tabular-nums text-slate-900">
            {Math.round(activeScale * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="Zoom in brochure"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleFitClick}
            className={`min-h-[44px] px-3 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 ${
              fitToWidth
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            {content.brochureSection.fitScreen}
          </button>

          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {ZOOM_PRESETS.map((preset) => {
              const isSelected = !fitToWidth && Math.abs(manualScale - preset) < 0.02;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`min-h-[36px] px-2.5 rounded-lg font-mono text-xs tabular-nums transition-colors ${
                    isSelected
                      ? 'bg-white text-slate-900 font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {Math.round(preset * 100)}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Original Inline Toggle & PDF Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onToggleOriginalInline}
            className={`min-h-[44px] px-3.5 rounded-xl border text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              showOriginalInline
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {content.controls.keepOriginalInline}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-xs font-medium flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors"
          >
            <Printer className="w-4 h-4" />
            {content.brochureSection.printPdf}
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="min-h-[44px] px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors disabled:opacity-60"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isGeneratingPdf
              ? content.brochureSection.downloadingPdf
              : content.brochureSection.downloadPdf}
          </button>
        </div>
      </div>

      {pdfStatus ? (
        <div className="no-print flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{pdfStatus}</span>
        </div>
      ) : null}

      {pdfError ? (
        <div className="no-print px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {pdfError}
        </div>
      ) : null}

      {/* Scrollable Brochure Canvas */}
      <div
        ref={viewportRef}
        className="bg-slate-200/80 border border-slate-300 rounded-2xl p-3 sm:p-6 overflow-auto max-h-[82vh] print:max-h-none print:overflow-visible print:bg-white print:border-0 print:p-0"
      >
        <div className="flex flex-col items-center gap-6 print:gap-0 print-brochure-root">
          {/* PAGE 1 */}
          <div className="w-full flex flex-col items-center print-page-break">
            <div className="no-print text-xs font-medium text-slate-600 mb-2 self-start sm:self-center">
              {content.brochureSection.page1Tag}
            </div>
            <div
              style={{
                width: `${A4_WIDTH_PX * activeScale}px`,
                height: `${A4_HEIGHT_PX * activeScale}px`,
              }}
              className="relative print:!w-auto print:!h-auto"
            >
              <div
                style={{
                  transform: `scale(${activeScale})`,
                  transformOrigin: 'top left',
                  width: `${A4_WIDTH_PX}px`,
                  height: `${A4_HEIGHT_PX}px`,
                }}
                className="print:!transform-none print:!w-full print:!h-auto"
              >
                <div
                  ref={page1Ref}
                  dir={content.isRtl ? 'rtl' : 'ltr'}
                  style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px` }}
                  className="bg-white text-slate-900 shadow-xl border border-slate-300 flex flex-col justify-between p-10 box-border print:shadow-none print:border-0"
                >
                  {/* Top Corporate Masthead */}
                  <div>
                    <div className="bg-slate-900 text-white rounded-xl p-7 flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-4 text-xs font-mono text-amber-400">
                        <span>{IMMUTABLE_COMPANY_INFO.udyamRegistration}</span>
                        <span>HISAR · HARYANA · INDIA</span>
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                        {IMMUTABLE_COMPANY_INFO.officialNameHindi}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-amber-300">
                        <span>({IMMUTABLE_COMPANY_INFO.officialNameEnglish})</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-200">{content.hero.subtitle}</span>
                      </div>
                      {showOriginalInline && langKey !== 'en' ? (
                        <div className="text-xs text-slate-400">
                          {IMMUTABLE_COMPANY_INFO.taglineEnglish}
                        </div>
                      ) : null}
                    </div>

                    {/* Verified Identity Grid (No Bank / No PAN) */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
                          <span>{content.credentials.udyamLabel}</span>
                        </div>
                        <div className="mt-1.5 font-mono text-sm font-bold text-slate-900 tabular-nums">
                          {IMMUTABLE_COMPANY_INFO.udyamRegistration}
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>{content.credentials.mobileLabel}</span>
                        </div>
                        <div className="mt-1.5 font-mono text-sm font-bold text-slate-900 tabular-nums">
                          +91 {IMMUTABLE_COMPANY_INFO.mobile}
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <Mail className="w-3.5 h-3.5 text-amber-600" />
                          <span>{content.credentials.emailLabel}</span>
                        </div>
                        <div className="mt-1.5 font-mono text-xs font-semibold text-slate-900 break-all">
                          {IMMUTABLE_COMPANY_INFO.email}
                        </div>
                      </div>
                    </div>

                    {/* Registered Office Block */}
                    <div className="mt-4 border border-slate-200 rounded-xl p-4 bg-white">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{content.credentials.addressLabel}</span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-slate-900">
                        {content.credentials.addressTranslated}
                      </p>
                      {showOriginalInline ? (
                        <p className="mt-1 text-xs text-slate-600">
                          {IMMUTABLE_COMPANY_INFO.originalAddressHindi}
                        </p>
                      ) : null}
                    </div>

                    {/* Company Profile Overview */}
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-200">
                        {content.brochureSection.companyProfileTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        {content.brochureSection.companyProfileBody}
                      </p>
                    </div>

                    {/* Engineering Elevation Diagram */}
                    <div className="mt-6 border border-slate-200 rounded-xl p-3 bg-slate-50">
                      <HeroInfrastructureDiagram />
                      <p className="mt-2 text-[11px] text-slate-600 text-center">
                        {content.hero.schematicCaption}
                      </p>
                    </div>
                  </div>

                  {/* Page 1 Footer */}
                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">
                      {IMMUTABLE_COMPANY_INFO.fullDisplayName}
                    </span>
                    <span className="font-mono tabular-nums">
                      {IMMUTABLE_COMPANY_INFO.udyamRegistration} · 1 / 2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2 */}
          <div className="w-full flex flex-col items-center">
            <div className="no-print text-xs font-medium text-slate-600 mb-2 self-start sm:self-center">
              {content.brochureSection.page2Tag}
            </div>
            <div
              style={{
                width: `${A4_WIDTH_PX * activeScale}px`,
                height: `${A4_HEIGHT_PX * activeScale}px`,
              }}
              className="relative print:!w-auto print:!h-auto"
            >
              <div
                style={{
                  transform: `scale(${activeScale})`,
                  transformOrigin: 'top left',
                  width: `${A4_WIDTH_PX}px`,
                  height: `${A4_HEIGHT_PX}px`,
                }}
                className="print:!transform-none print:!w-full print:!h-auto"
              >
                <div
                  ref={page2Ref}
                  dir={content.isRtl ? 'rtl' : 'ltr'}
                  style={{ width: `${A4_WIDTH_PX}px`, height: `${A4_HEIGHT_PX}px` }}
                  className="bg-white text-slate-900 shadow-xl border border-slate-300 flex flex-col justify-between p-10 box-border print:shadow-none print:border-0"
                >
                  <div>
                    {/* Page 2 Header */}
                    <div className="flex items-center justify-between pb-3 border-b-2 border-slate-900">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {content.brochureSection.serviceCatalogueTitle}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {IMMUTABLE_COMPANY_INFO.fullDisplayName} · {IMMUTABLE_COMPANY_INFO.taglineEnglish}
                        </p>
                      </div>
                      <div className="text-right font-mono text-xs text-slate-700 tabular-nums">
                        {IMMUTABLE_COMPANY_INFO.udyamRegistration}
                      </div>
                    </div>

                    {/* All 7 Services in Clean Technical Catalogue Rows */}
                    <div className="mt-5 space-y-3">
                      {SERVICE_METADATA.map((meta) => {
                        const svc =
                          content.services.find((s) => s.id === meta.id) || content.services[0];
                        return (
                          <div
                            key={meta.id}
                            className="border border-slate-200 rounded-xl p-3 flex items-center gap-4 bg-slate-50/50"
                          >
                            <div className="w-28 shrink-0 border border-slate-200 rounded-lg bg-white p-1">
                              <ServiceSchematic serviceId={meta.id} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <h4 className="text-sm font-bold text-slate-900 truncate">
                                  {meta.code}. {svc.title}
                                </h4>
                                <span className="text-[11px] font-medium text-amber-700 shrink-0">
                                  {svc.categoryLabel}
                                </span>
                              </div>
                              {showOriginalInline && svc.title !== meta.originalTerm ? (
                                <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                                  {meta.originalTerm}
                                </div>
                              ) : null}
                              <p className="text
