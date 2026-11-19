import React from 'react';
import type { ServiceId } from '../data/companyContent';

export function HeroInfrastructureDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 380"
      className={`w-full h-auto select-none ${className}`}
      role="img"
      aria-label="Civil and Earthwork Engineering Elevation Blueprint"
    >
      <defs>
        <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#cbd5e1" strokeWidth="0.6" strokeOpacity="0.6" />
        </pattern>
        <pattern id="soil-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#92400e" strokeWidth="1" strokeOpacity="0.28" />
        </pattern>
        <pattern id="concrete-hatch" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1" fill="#334155" fillOpacity="0.4" />
          <polygon points="11,3 14,9 8,9" fill="none" stroke="#334155" strokeWidth="0.8" strokeOpacity="0.4" />
        </pattern>
      </defs>

      {/* Canvas */}
      <rect width="640" height="380" fill="#f8fafc" rx="10" />
      <rect width="640" height="380" fill="url(#bp-grid)" rx="10" />

      {/* Title Block */}
      <rect x="20" y="18" width="600" height="34" fill="#0f172a" rx="4" />
      <text x="34" y="39" fill="#f8fafc" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono, monospace">
        POWER RUDRA KUNDA · INTEGRATED CIVIL &amp; EARTHWORK SECTION
      </text>
      <text x="606" y="39" textAnchor="end" fill="#fbbf24" fontSize="10" fontFamily="JetBrains Mono, monospace">
        UDYAM-HR-06-0096289
      </text>

      {/* Original Ground Level & Embankment */}
      <path
        d="M 28 240 L 140 240 L 205 142 L 435 142 L 500 240 L 612 240 L 612 315 L 28 315 Z"
        fill="url(#soil-hatch)"
        stroke="#78350f"
        strokeWidth="1.5"
      />

      {/* Road Formation / PCC + RCC Top Crust */}
      <rect x="205" y="128" width="230" height="14" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
      <rect x="205" y="120" width="230" height="8" fill="#64748b" stroke="#0f172a" strokeWidth="1.5" />

      {/* RCC Box Culvert Centered in Embankment */}
      <rect x="255" y="170" width="130" height="92" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2.5" />
      <rect x="255" y="170" width="130" height="92" fill="url(#concrete-hatch)" />
      {/* Inner Hydraulic Box Opening */}
      <polygon
        points="273,186 367,186 367,246 273,246"
        fill="#ffffff"
        stroke="#0f172a"
        strokeWidth="2"
      />
      {/* Haunches */}
      <polygon points="273,186 286,186 273,199" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
      <polygon points="367,186 354,186 367,199" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
      <polygon points="273,246 286,246 273,233" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
      <polygon points="367,246 354,246 367,233" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
      {/* Culvert Water Line */}
      <path d="M 274 228 Q 297 224 320 228 T 366 228 L 366 245 L 274 245 Z" fill="#0284c7" fillOpacity="0.2" />
      <line x1="274" y1="228" x2="366" y2="228" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* PCC Leveling Bed under Box Culvert */}
      <rect x="245" y="262" width="150" height="14" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.5" />

      {/* Left Toe Wall */}
      <polygon points="118,240 144,240 144,275 110,275 110,254" fill="#64748b" stroke="#0f172a" strokeWidth="1.8" />
      {/* Right Toe Wall */}
      <polygon points="496,240 522,240 530,254 530,275 496,275" fill="#64748b" stroke="#0f172a" strokeWidth="1.8" />

      {/* Sub Drain Left & Right */}
      <rect x="74" y="242" width="28" height="32" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.4" strokeDasharray="3 2" />
      <circle cx="88" cy="260" r="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
      <rect x="538" y="242" width="28" height="32" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.4" strokeDasharray="3 2" />
      <circle cx="552" cy="260" r="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />

      {/* Callout Leader Lines & Labels */}
      {/* PCC / RCC Deck */}
      <line x1="320" y1="120" x2="320" y2="86" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="320" cy="120" r="3" fill="#d97706" />
      <rect x="240" y="66" width="160" height="22" rx="3" fill="#ffffff" stroke="#cbd5e1" />
      <text x="320" y="81" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        RCC &amp; PCC FORMATION
      </text>

      {/* Raw Soil Dressing Slope */}
      <line x1="172" y1="190" x2="105" y2="122" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="172" cy="190" r="3" fill="#d97706" />
      <rect x="28" y="98" width="154" height="24" rx="3" fill="#ffffff" stroke="#cbd5e1" />
      <text x="105" y="114" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        कच्ची मिट्टी की ड्रेसिंग (1.5:1)
      </text>

      {/* Soil Cutting Right */}
      <line x1="468" y1="190" x2="532" y2="122" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="468" cy="190" r="3" fill="#d97706" />
      <rect x="456" y="98" width="156" height="24" rx="3" fill="#ffffff" stroke="#cbd5e1" />
      <text x="534" y="114" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        SOIL CUTTING &amp; GRADE
      </text>

      {/* Sub Drain Callout */}
      <line x1="88" y1="274" x2="88" y2="338" stroke="#0284c7" strokeWidth="1.5" />
      <text x="88" y="354" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        SUB DRAIN
      </text>

      {/* Toe Wall Callout */}
      <line x1="130" y1="275" x2="178" y2="338" stroke="#0f172a" strokeWidth="1.2" />
      <text x="182" y="354" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        TOE WALL
      </text>

      {/* Culvert Box Callout */}
      <line x1="320" y1="276" x2="320" y2="338" stroke="#0f172a" strokeWidth="1.5" />
      <text x="320" y="354" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        RCC CULVERT BOX + PCC BED
      </text>

      {/* Toe Wall + Sub Drain Right */}
      <line x1="516" y1="275" x2="516" y2="338" stroke="#0f172a" strokeWidth="1.2" />
      <text x="516" y="354" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
        TOE WALL &amp; FILTER
      </text>
    </svg>
  );
}

export function ServiceSchematic({
  serviceId,
  className = '',
}: {
  serviceId: ServiceId | string;
  className?: string;
}) {
  switch (serviceId) {
    case 'rcc':
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="RCC Structural Section">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          <path d="M 0 35 H 360 M 0 70 H 360 M 0 105 H 360 M 0 140 H 360 M 0 175 H 360" stroke="#e2e8f0" strokeWidth="0.7" />
          {/* Foundation PCC Base */}
          <rect x="60" y="156" width="240" height="20" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          {/* RCC Footing & Column */}
          <polygon points="75,156 285,156 250,126 205,126 205,34 155,34 155,126 110,126" fill="#94a3b8" fillOpacity="0.35" stroke="#0f172a" strokeWidth="2" />
          {/* Rebar Steel Lines */}
          <line x1="164" y1="40" x2="164" y2="148" stroke="#b45309" strokeWidth="2.5" />
          <line x1="196" y1="40" x2="196" y2="148" stroke="#b45309" strokeWidth="2.5" />
          <line x1="88" y1="146" x2="272" y2="146" stroke="#b45309" strokeWidth="2.5" />
          {[55, 75, 95, 115, 135].map((y) => (
            <line key={y} x1="161" y1={y} x2="199" y2={y} stroke="#0f172a" strokeWidth="1.5" />
          ))}
          <text x="180" y="24" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
            RCC STEEL REBAR &amp; SHUTTERING SECTION
          </text>
          <text x="180" y="196" textAnchor="middle" fill="#475569" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
            PCC SUB-BASE · COVER BLOCK · VIBRATED CONCRETE
          </text>
        </svg>
      );

    case 'pcc':
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="PCC Leveling Course Section">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          {/* Compacted Earth */}
          <rect x="28" y="138" width="304" height="44" fill="#fde68a" fillOpacity="0.45" stroke="#78350f" strokeWidth="1.5" />
          {/* Granular Sub-Base */}
          <rect x="28" y="110" width="304" height="28" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
          {[48, 78, 108, 138, 168, 198, 228, 258, 288, 314].map((x, idx) => (
            <circle key={x} cx={x} cy={idx % 2 === 0 ? 121 : 127} r="4" fill="#94a3b8" />
          ))}
          {/* PCC Blinding Layer */}
          <rect x="28" y="76" width="304" height="34" fill="#cbd5e1" stroke="#0f172a" strokeWidth="2" />
          {/* Level Datum Line */}
          <line x1="20" y1="76" x2="340" y2="76" stroke="#d97706" strokeWidth="1.8" strokeDasharray="6 3" />
          <text x="180" y="56" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
            FINISHED PCC DATUM LEVEL (100–150 MM)
          </text>
          <text x="180" y="97" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
            PLAIN CEMENT CONCRETE BED
          </text>
          <text x="180" y="164" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="600">
            COMPACTED SUBGRADE
          </text>
        </svg>
      );

    case 'sub_drain':
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="Sub Drain Filter Trench Section">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          {/* Soil Matrix */}
          <rect x="24" y="46" width="312" height="140" fill="#fef3c7" fillOpacity="0.4" stroke="#92400e" strokeWidth="1.4" />
          {/* Geotextile Trench Envelope */}
          <rect x="120" y="64" width="120" height="106" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" strokeDasharray="5 3" />
          {/* Graded Gravel Aggregates */}
          {[138, 158, 180, 202, 222].map((x) =>
            [82, 102, 152].map((y) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#94a3b8" stroke="#475569" strokeWidth="0.8" />
            ))
          )}
          {/* Perforated Pipe */}
          <circle cx="180" cy="126" r="20" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
          <circle cx="180" cy="126" r="10" fill="#bae6fd" />
          {/* Seepage Arrows */}
          <path d="M 60 95 L 112 115" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 300 95 L 248 115" stroke="#0284c7" strokeWidth="2" />
          <polygon points="114,116 105,118 109,110" fill="#0284c7" />
          <polygon points="246,116 255,118 251,110" fill="#0284c7" />
          <text x="180" y="34" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
            GEOTEXTILE + GRAVEL FILTER + PERFORATED PIPE
          </text>
          <text x="68" y="176" textAnchor="middle" fill="#0284c7" fontSize="9.5" fontWeight="600">
            PORE WATER
          </text>
          <text x="292" y="176" textAnchor="middle" fill="#0284c7" fontSize="9.5" fontWeight="600">
            SEEPAGE INFLOW
          </text>
        </svg>
      );

    case 'toe_wall':
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="Toe Wall Retaining Section">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          {/* Sloped Embankment */}
          <polygon points="24,48 135,48 212,135 212,182 24,182" fill="#fde68a" fillOpacity="0.45" stroke="#78350f" strokeWidth="1.5" />
          {/* Granular Backfill */}
          <polygon points="184,104 212,104 212,158 184,158" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.2" />
          {/* Stepped Concrete Toe Wall */}
          <polygon points="212,95 244,95 262,158 274,158 274,182 198,182 198,158 212,158" fill="#64748b" stroke="#0f172a" strokeWidth="2.2" />
          {/* Weep Hole */}
          <line x1="205" y1="138" x2="258" y2="144" stroke="#0284c7" strokeWidth="3" />
          {/* Ground Level */}
          <line x1="260" y1="158" x2="340" y2="158" stroke="#0f172a" strokeWidth="1.8" />
          <text x="180" y="28" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
            KEYED TOE WALL · WEEP HOLES · SCOUR PROTECTION
          </text>
          <text x="95" y="128" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="600">
            EMBANKMENT FILL
          </text>
          <text x="302" y="146" textAnchor="middle" fill="#0284c7" fontSize="9" fontWeight="600">
            WEEP DRAIN
          </text>
        </svg>
      );

    case 'culvert_box':
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="RCC Box Culvert Cross Section">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          {/* Road Cushion */}
          <rect x="30" y="34" width="300" height="18" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
          {/* Box Structure */}
          <rect x="85" y="58" width="190" height="112" fill="#94a3b8" fillOpacity="0.4" stroke="#0f172a" strokeWidth="2.5" />
          <rect x="106" y="78" width="148" height="72" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          {/* Haunches */}
          <polygon points="106,78 122,78 106,94" fill="#64748b" />
          <polygon points="254,78 238,78 254,94" fill="#64748b" />
          <polygon points="106,150 122,150 106,134" fill="#64748b" />
          <polygon points="254,150 238,150 254,134" fill="#64748b" />
          {/* Water */}
          <rect x="107" y="120" width="146" height="29" fill="#0284c7" fillOpacity="0.22" />
          {/* PCC Bed */}
          <rect x="72" y="170" width="216" height="14" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
          <text x="180" y="24" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
            RCC BOX CULVERT · HAUNCHED CELL + PCC BED
          </text>
          <text x="180" y="110" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
            HYDRAULIC VENT
          </text>
        </svg>
      );

    case 'mitti_dressing':
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="Raw Soil Dressing Profile">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          {/* Embankment Trapezoid */}
          <polygon points="28,168 102,68 258,68 332,168" fill="#fde68a" fillOpacity="0.55" stroke="#78350f" strokeWidth="2" />
          {/* Layer Compaction Dashed Lines */}
          <line x1="50" y1="138" x2="310" y2="138" stroke="#92400e" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="74" y1="104" x2="286" y2="104" stroke="#92400e" strokeWidth="1" strokeDasharray="4 3" />
          {/* Camber Line */}
          <path d="M 102 68 Q 180 58 258 68" fill="none" stroke="#d97706" strokeWidth="2.5" />
          {/* Slope Angle Indicator */}
          <line x1="28" y1="168" x2="102" y2="168" stroke="#0f172a" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="180" y="32" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="600">
            कच्ची मिट्टी की ड्रेसिंग · CAMBER &amp; 1.5:1 SLOPE
          </text>
          <text x="180" y="90" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="600">
            COMPACTED EARTH LAYERS
          </text>
          <text x="65" y="185" textAnchor="middle" fill="#0f172a" fontSize="9" fontFamily="JetBrains Mono, monospace">
            TRIMMED TOE
          </text>
          <text x="295" y="185" textAnchor="middle" fill="#0f172a" fontSize="9" fontFamily="JetBrains Mono, monospace">
            DRESSED BATTER
          </text>
        </svg>
      );

    case 'soil_cutting':
    default:
      return (
        <svg viewBox="0 0 360 210" className={`w-full h-auto select-none ${className}`} role="img" aria-label="Soil Cutting Bench Section">
          <rect width="360" height="210" fill="#f8fafc" rx="6" />
          {/* Original Ground Profile (Dashed) */}
          <path d="M 24 62 Q 180 48 336 64" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="6 4" />
          {/* Cut Terrain */}
          <polygon points="24,62 68,60 118,148 242,148 292,62 336,64 336,184 24,184" fill="#fde68a" fillOpacity="0.45" stroke="#78350f" strokeWidth="2" />
          {/* Formation Grade Level */}
          <line x1="118" y1="148" x2="242" y2="148" stroke="#0f172a" strokeWidth="3" />
          {/* Excavation Depth Arrows */}
          <line x1="180" y1="56" x2="180" y2="145" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3 3" />
          <polygon points="180,147 175,137 185,137" fill="#0284c7" />
          <text x="180" y="28" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
            OGL TO FORMATION LEVEL (FL) EXCAVATION
          </text>
          <text x="180" y="106" textAnchor="middle" fill="#0284c7" fontSize="9.5" fontWeight="600">
            CUT DEPTH
          </text>
          <text x="180" y="170" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="600">
            GRADED FORMATION BASE
          </text>
        </svg>
      );
  }
}
