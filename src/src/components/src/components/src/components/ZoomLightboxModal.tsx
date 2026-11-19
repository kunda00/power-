import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { HeroInfrastructureDiagram, ServiceSchematic } from './EngineeringDiagrams';
import type { ServiceMeta, TranslatedService } from '../data/companyContent';

interface ZoomLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'hero' | 'service';
  heroTitle?: string;
  heroCaption?: string;
  service?: TranslatedService;
  serviceMeta?: ServiceMeta;
  originalTermLabel: string;
}

export function ZoomLightboxModal({
  isOpen,
  onClose,
  mode,
  heroTitle,
  heroCaption,
  service,
  serviceMeta,
  originalTermLabel,
}: ZoomLightboxModalProps) {
  const [zoomPercent, setZoomPercent] = useState(125);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomPercent((z) => Math.min(300, z + 25));
  const handleZoomOut = () => setZoomPercent((z) => Math.max(75, z - 25));
  const handleReset = () => setZoomPercent(100);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Zoom Engineering Blueprint"
    >
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-slate-200 bg-slate-50">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
              {mode === 'hero' ? heroTitle : service?.title}
            </h3>
            {mode === 'service' && serviceMeta ? (
              <p className="text-xs text-slate-600 truncate">
                {originalTermLabel}: <span className="font-medium text-slate-900">{serviceMeta.originalTerm}</span>
              </p>
            ) : heroCaption ? (
              <p className="text-xs text-slate-600 truncate">{heroCaption}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleZoomOut}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="min-w-[54px] text-center font-mono text-xs font-semibold tabular-nums text-slate-900">
              {zoomPercent}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] px-3 flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">100%</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close zoom viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Zoomable Viewport */}
        <div className="flex-1 overflow-auto bg-engineering-grid p-4 sm:p-8">
          <div
            className="mx-auto transition-transform duration-150 origin-top-left"
            style={{
              width: `${zoomPercent}%`,
              minWidth: '100%',
            }}
          >
            <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-5 shadow-sm">
              {mode === 'hero' ? (
                <HeroInfrastructureDiagram />
              ) : (
                <ServiceSchematic serviceId={service?.id || 'rcc'} />
              )}
            </div>
          </div>
        </div>

        {/* Service Details Footer inside Zoom Modal */}
        {mode === 'service' && service ? (
          <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-700 space-y-2 max-h-44 overflow-y-auto">
            <p className="font-medium text-slate-900">{service.summary}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
              {service.technicalSpecs.map((spec, idx) => (
                <li key={idx} className="bg-white border border-slate-200 rounded-lg px-3 py-2">
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
