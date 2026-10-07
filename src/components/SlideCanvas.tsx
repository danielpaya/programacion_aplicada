import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  LabelList
} from 'recharts';
import { ArrowRight, Diamond } from 'lucide-react';
import { SlideMeta } from '../data/slidesData';

interface SlideCanvasProps {
  slide: SlideMeta;
  firmName: string;
  isPrint?: boolean;
}

const TREND_DATA = {
  quiebre: [
    { q: 'III-2025', valor: 7.2, meta: 4.0 },
    { q: 'IV-2025', valor: 8.1, meta: 4.0 },
    { q: 'I-2026', valor: 9.0, meta: 4.0 },
    { q: 'II-2026', valor: 9.8, meta: 4.0 }
  ],
  merma: [
    { q: 'III-2025', valor: 5.4, meta: 3.0 },
    { q: 'IV-2025', valor: 6.0, meta: 3.0 },
    { q: 'I-2026', valor: 6.7, meta: 3.0 },
    { q: 'II-2026', valor: 7.3, meta: 3.0 }
  ],
  abandono: [
    { q: 'III-2025', valor: 17, meta: 12 },
    { q: 'IV-2025', valor: 19, meta: 12 },
    { q: 'I-2026', valor: 21, meta: 12 },
    { q: 'II-2026', valor: 23, meta: 12 }
  ],
  fraude: [
    { q: 'III-2025', valor: 0.62, meta: 0.40 },
    { q: 'IV-2025', valor: 0.71, meta: 0.40 },
    { q: 'I-2026', valor: 0.84, meta: 0.40 },
    { q: 'II-2026', valor: 0.95, meta: 0.40 }
  ]
};

const BENEFITS_CHART_DATA = [
  { name: 'Abandono', valor: 66000, label: '66.000 M', metaM12: 'Meta M12: 18 %' },
  { name: 'Quiebre', valor: 29700, label: '29.700 M', metaM12: 'Meta M12: 6,5 %' },
  { name: 'Merma', valor: 15700, label: '15.700 M', metaM12: 'Meta M12: 4,5 %' },
  { name: 'Fraude', valor: 3200, label: '3.200 M', metaM12: 'Meta M12: 0,75 %' }
];

const formatColombianNumber = (val: number, decimals = 1) => {
  return val.toFixed(decimals).replace('.', ',');
};

export const SlideCanvas: React.FC<SlideCanvasProps> = ({
  slide,
  firmName,
  isPrint = false
}) => {
  return (
    <div
      className={`relative w-full aspect-video bg-white text-[#263238] flex flex-col justify-between overflow-hidden select-text ${
        isPrint
          ? 'print-slide-page p-10'
          : 'rounded-lg border border-[#263238]/10 shadow-sm p-6 sm:p-8 lg:p-11'
      }`}
    >
      {/* Top corporate bar accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#2E7D32]" />

      {/* Slide Header (For slides 2 to 17) */}
      {slide.id !== 1 && slide.id !== 18 && (
        <header className="flex items-start justify-between gap-6 border-b border-[#263238]/10 pb-3.5 shrink-0">
          <div className="flex-1 min-w-0">
            <h1
              className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-[#263238] leading-snug"
              style={{ textWrap: 'balance' }}
            >
              {slide.title}
            </h1>
          </div>

          {slide.sectionTag && (
            <div className="shrink-0 pt-0.5">
              <span className="text-xs sm:text-sm font-medium text-[#2E7D32] tracking-tight">
                {slide.sectionTag}
              </span>
            </div>
          )}
        </header>
      )}

      {/* Slide Body */}
      <div className="flex-1 flex flex-col justify-center min-h-0 py-3">
        {slide.id === 1 && <Slide1Cover firmName={firmName} />}
        {slide.id === 2 && <Slide2ExecutiveSummary />}
        {slide.id === 3 && <Slide3GapTable />}
        {slide.id === 4 && <Slide4QuarterlyTrends />}
        {slide.id === 5 && <Slide5RootCause />}
        {slide.id === 6 && <Slide6OkrAlignment />}
        {slide.id === 7 && <Slide7UseCases />}
        {slide.id === 8 && <Slide8Algorithms />}
        {slide.id === 9 && <Slide9DataRequired />}
        {slide.id === 10 && <Slide10DataPrep />}
        {slide.id === 11 && <Slide11SuccessMetrics />}
        {slide.id === 12 && <Slide12Gantt />}
        {slide.id === 13 && <Slide13Deliverables />}
        {slide.id === 14 && <Slide14BiasEthics />}
        {slide.id === 15 && <Slide15HumanRolePrivacy />}
        {slide.id === 16 && <Slide16ExpectedBenefits />}
        {slide.id === 17 && <Slide17Decision />}
        {slide.id === 18 && <Slide18Questions firmName={firmName} />}
      </div>

      {/* Subtle institutional footer on content slides */}
      {slide.id !== 1 && slide.id !== 18 && (
        <footer className="pt-2 border-t border-[#263238]/10 flex items-center justify-between text-[11px] text-[#263238]/60 shrink-0">
          <span>Mercados La Pradera S.A.S. · Licitación LP-2026-01</span>
          <span className="font-mono tabular-nums">
            Diapositiva {slide.id} / 18
          </span>
        </footer>
      )}
    </div>
  );
};

/* ============================================================================
 * 1. PORTADA (sin etiqueta)
 * ========================================================================== */
const Slide1Cover: React.FC<{ firmName: string }> = ({ firmName }) => (
  <div className="h-full flex flex-col justify-between py-4 sm:py-6">
    <div className="flex items-center justify-between text-xs font-medium text-[#2E7D32] tracking-wide">
      <span>MERCADOS LA PRADERA S.A.S. · JUNTA DIRECTIVA</span>
      <span className="font-mono tabular-nums">LP-2026-01</span>
    </div>

    <div className="my-auto py-6 border-l-4 border-[#2E7D32] pl-6 sm:pl-10">
      <h1
        className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#263238] leading-[1.1]"
        style={{ textWrap: 'balance' }}
      >
        De reaccionar a anticipar
      </h1>
      <p className="mt-4 text-base sm:text-xl lg:text-2xl font-medium text-[#2E7D32] max-w-4xl leading-relaxed">
        Propuesta de aprendizaje supervisado para Mercados La Pradera · Licitación LP-2026-01
      </p>

      {/* Context strip summarizing La Pradera scale */}
      <div className="mt-8 pt-6 border-t border-[#263238]/10 grid grid-cols-4 gap-6 max-w-4xl">
        <div>
          <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-[#263238]">
            48 tiendas
          </div>
          <div className="text-xs text-[#263238]/70 mt-0.5">
            En 6 ciudades de Colombia
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-[#263238]">
            1,6 billones
          </div>
          <div className="text-xs text-[#263238]/70 mt-0.5">
            Ventas anuales (COP)
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-[#263238]">
            1,2 millones
          </div>
          <div className="text-xs text-[#263238]/70 mt-0.5">
            Afiliados Pradera Plus (58 % ventas)
          </div>
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-bold font-mono tabular-nums text-[#2E7D32]">
            4 modelos
          </div>
          <div className="text-xs text-[#263238]/70 mt-0.5">
            Para recuperar la mitad de la brecha en 12 meses
          </div>
        </div>
      </div>
    </div>

    <div className="pt-4 border-t border-[#263238]/15 flex items-center justify-between text-xs sm:text-sm text-[#263238]/80 font-medium">
      <span>
        {firmName} · Programación Aplicada · Universidad de La Sabana · 2026
      </span>
      <span className="font-mono tabular-nums text-xs text-[#263238]/60">
        1 / 18
      </span>
    </div>
  </div>
);

/* ============================================================================
 * 2. [a. Resumen ejecutivo]
 * ========================================================================== */
const Slide2ExecutiveSummary: React.FC = () => {
  const blocks = [
    {
      step: '01',
      label: 'PROBLEMA',
      highlight: '4 trimestres de deterioro',
      body: 'Los 4 KPI críticos empeoraron 4 trimestres seguidos: pedimos mirando hacia atrás y controlamos tarde.',
      isAlert: true
    },
    {
      step: '02',
      label: 'SOLUCIÓN',
      highlight: '4 modelos supervisados',
      body: '1 modelo de regresión (demanda) y 3 de clasificación (merma, abandono, fraude).',
      isAlert: false
    },
    {
      step: '03',
      label: 'BENEFICIO',
      highlight: '≈ 115.000 M COP/año',
      body: 'La mitad de la brecha al mes 12; metas OKR completas entre los meses 18 y 24.',
      isAlert: false
    },
    {
      step: '04',
      label: 'DECISIÓN',
      highlight: 'Aprobar y revisar en M6',
      body: 'Aprobar el programa y aplazar los recortes hasta la revisión del mes 6.',
      isAlert: false
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-4">
      <div className="grid grid-cols-4 gap-4 flex-1 items-stretch">
        {blocks.map((b) => (
          <div
            key={b.label}
            className="bg-[#E8F5E9] rounded-lg p-5 flex flex-col justify-between border border-[#2E7D32]/20"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#2E7D32] font-semibold">
                <span>{b.label}</span>
                <span>{b.step}</span>
              </div>
              <div
                className={`mt-3 text-lg sm:text-xl font-bold tabular-nums leading-snug ${
                  b.isAlert ? 'text-[#E53935]' : 'text-[#2E7D32]'
                }`}
              >
                {b.highlight}
              </div>
              <p className="mt-3 text-sm sm:text-[15px] text-[#263238] leading-relaxed">
                {b.body}
              </p>
            </div>
            <div className="pt-3 border-t border-[#2E7D32]/15 text-[11px] text-[#263238]/70 font-medium">
              {b.label === 'PROBLEMA' && 'Brecha actual: ≈ 230.000 M COP/año'}
              {b.label === 'SOLUCIÓN' && 'Datos propios ya disponibles en casa'}
              {b.label === 'BENEFICIO' && 'Utilidad: ≈ 35.000 M/año · inversión ≈ 5.200 M'}
              {b.label === 'DECISIÓN' && 'Compuerta de control de junta en Mes 6'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#263238]/15 rounded-lg px-5 py-3 flex items-center justify-between text-xs sm:text-sm">
        <span className="font-semibold text-[#263238]">
          Tesis central para la junta:
        </span>
        <span className="text-[#263238]/85">
          Reemplazar los recortes defensivos por anticipación analítica con revisión vinculante en el mes 6.
        </span>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. [b. Diagnóstico] Tabla de brecha 230.000 M
 * ========================================================================== */
const Slide3GapTable: React.FC = () => {
  const rows = [
    {
      kpi: 'Abandono Pradera Plus',
      actual: '23 %',
      meta: '≤ 12 %',
      costo: '145.000 M',
      share: '63 % del costo total'
    },
    {
      kpi: 'Quiebre de inventario',
      actual: '9,8 %',
      meta: '≤ 4,0 %',
      costo: '52.000 M',
      share: '23 % del costo total'
    },
    {
      kpi: 'Merma de perecederos',
      actual: '7,3 %',
      meta: '≤ 3,0 %',
      costo: '24.000 M',
      share: '10 % del costo total'
    },
    {
      kpi: 'Pérdidas por fraude',
      actual: '0,95 %',
      meta: '≤ 0,40 %',
      costo: '8.800 M',
      share: '4 % del costo total'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-4">
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-xs sm:text-sm font-semibold text-[#263238]">
              <th className="py-3 px-5">KPI</th>
              <th className="py-3 px-5 text-right">Actual</th>
              <th className="py-3 px-5 text-right">Meta</th>
              <th className="py-3 px-5 text-right">Costo anual de la brecha</th>
              <th className="py-3 px-5 text-right">Peso relativo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-sm sm:text-base">
            {rows.map((r) => (
              <tr key={r.kpi} className="hover:bg-[#E8F5E9]/35">
                <td className="py-3.5 px-5 font-semibold text-[#263238]">
                  {r.kpi}
                </td>
                <td className="py-3.5 px-5 text-right font-mono tabular-nums font-bold text-[#E53935]">
                  {r.actual}
                </td>
                <td className="py-3.5 px-5 text-right font-mono tabular-nums font-semibold text-[#2E7D32]">
                  {r.meta}
                </td>
                <td className="py-3.5 px-5 text-right font-mono tabular-nums font-bold text-[#E53935]">
                  {r.costo}
                </td>
                <td className="py-3.5 px-5 text-right font-mono tabular-nums text-xs text-[#263238]/70">
                  {r.share}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Highlighted figure */}
      <div className="bg-[#E8F5E9] border-l-4 border-[#E53935] rounded-r-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-[#263238]/70">
            COSTO CONSOLIDADO ANUAL DE LA BRECHA
          </div>
          <div className="mt-1 text-base sm:text-lg lg:text-xl font-bold text-[#263238]">
            <span className="text-[#E53935] font-mono tabular-nums">
              ≈ 230.000 M COP/año
            </span>
            , más que la utilidad operativa de 2024 y del primer semestre de 2026 juntos
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. [b. Diagnóstico] 4 gráficos de línea pequeños con Recharts
 * ========================================================================== */
const Slide4QuarterlyTrends: React.FC = () => {
  const charts = [
    {
      title: 'Quiebre de inventario',
      valuesText: '7,2 % → 8,1 % → 9,0 % → 9,8 %',
      metaText: 'Meta ≤ 4,0 %',
      metaVal: 4.0,
      domain: [0, 11] as [number, number],
      decimals: 1,
      data: TREND_DATA.quiebre
    },
    {
      title: 'Merma de perecederos',
      valuesText: '5,4 % → 6,0 % → 6,7 % → 7,3 %',
      metaText: 'Meta ≤ 3,0 %',
      metaVal: 3.0,
      domain: [0, 9] as [number, number],
      decimals: 1,
      data: TREND_DATA.merma
    },
    {
      title: 'Abandono Pradera Plus',
      valuesText: '17 % → 19 % → 21 % → 23 %',
      metaText: 'Meta ≤ 12 %',
      metaVal: 12,
      domain: [0, 26] as [number, number],
      decimals: 0,
      data: TREND_DATA.abandono
    },
    {
      title: 'Pérdidas por fraude',
      valuesText: '0,62 % → 0,71 % → 0,84 % → 0,95 %',
      metaText: 'Meta ≤ 0,40 %',
      metaVal: 0.4,
      domain: [0, 1.1] as [number, number],
      decimals: 2,
      data: TREND_DATA.fraude
    }
  ];

  return (
    <div className="h-full grid grid-cols-2 grid-rows-2 gap-4">
      {charts.map((c) => (
        <div
          key={c.title}
          className="bg-[#E8F5E9]/60 border border-[#2E7D32]/20 rounded-lg p-3.5 flex flex-col justify-between"
        >
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#263238]">
                {c.title}
              </h3>
              <p className="text-xs font-mono tabular-nums text-[#E53935] font-semibold">
                {c.valuesText}
              </p>
            </div>
            <span className="text-xs font-mono tabular-nums font-semibold text-[#2E7D32]">
              {c.metaText}
            </span>
          </div>

          <div className="flex-1 min-h-[95px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={c.data}
                margin={{ top: 10, right: 16, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#263238" strokeOpacity={0.1} />
                <XAxis
                  dataKey="q"
                  tick={{ fill: '#263238', fontSize: 11 }}
                  axisLine={{ stroke: '#263238', strokeOpacity: 0.2 }}
                />
                <YAxis
                  domain={c.domain}
                  tick={{ fill: '#263238', fontSize: 11 }}
                  tickFormatter={(v) => `${formatColombianNumber(Number(v), c.decimals)}%`}
                  axisLine={{ stroke: '#263238', strokeOpacity: 0.2 }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${formatColombianNumber(Number(value), c.decimals)} %`,
                    'Valor'
                  ]}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#2E7D32',
                    fontSize: '12px',
                    borderRadius: '6px'
                  }}
                />
                <ReferenceLine
                  y={c.metaVal}
                  stroke="#2E7D32"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  label={{
                    value: 'Meta',
                    position: 'insideBottomRight',
                    fill: '#2E7D32',
                    fontSize: 10,
                    fontWeight: 600
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke="#E53935"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#E53935', strokeWidth: 1.5, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================================
 * 5. [b. Diagnóstico] Diagrama de flujo de causa raíz
 * ========================================================================== */
const Slide5RootCause: React.FC = () => (
  <div className="h-full flex flex-col justify-between gap-4">
    {/* Main Flow Diagram */}
    <div className="flex-1 bg-[#E8F5E9]/50 border border-[#2E7D32]/20 rounded-lg p-5 flex items-center justify-between gap-4">
      {/* Root Cause Node */}
      <div className="w-[30%] bg-white border-2 border-[#2E7D32] rounded-lg p-4 shadow-xs">
        <div className="text-xs font-mono font-semibold text-[#2E7D32]">
          CAUSA RAÍZ 1 · PEDIMOS MIRANDO HACIA ATRÁS
        </div>
        <div className="mt-2 text-base sm:text-lg font-bold text-[#263238] leading-snug">
          Pedidos por intuición y por el mismo mes del año pasado
        </div>
        <div className="mt-2 text-xs text-[#263238]/70">
          Sin anticipar quincenas, festivos ni promociones
        </div>
      </div>

      {/* Arrows splitting */}
      <div className="flex flex-col items-center justify-around h-full py-6 text-[#2E7D32] shrink-0">
        <ArrowRight className="w-6 h-6" />
        <ArrowRight className="w-6 h-6" />
      </div>

      {/* Middle Branch: Quiebre & Merma */}
      <div className="w-[31%] flex flex-col justify-between gap-4">
        <div className="bg-white border border-[#263238]/20 rounded-lg p-4">
          <div className="text-xs font-mono font-semibold text-[#E53935]">
            EFECTO EN GÓNDOLA
          </div>
          <div className="mt-1 text-base font-bold text-[#263238]">
            Góndolas vacías{' '}
            <span className="text-[#E53935] font-mono tabular-nums">
              (quiebre 9,8 %)
            </span>
          </div>
          <div className="mt-1 text-xs text-[#263238]/70">
            52.000 M COP/año en ventas perdidas
          </div>
        </div>

        <div className="bg-white border border-[#263238]/20 rounded-lg p-4">
          <div className="text-xs font-mono font-semibold text-[#E53935]">
            EFECTO EN BODEGA
          </div>
          <div className="mt-1 text-base font-bold text-[#263238]">
            Exceso de perecederos que no rotan{' '}
            <span className="text-[#E53935] font-mono tabular-nums">
              (merma 7,3 %)
            </span>
          </div>
          <div className="mt-1 text-xs text-[#263238]/70">
            24.000 M COP/año · agravado por descuentos tardíos e iguales en todas las tiendas
          </div>
        </div>
      </div>

      {/* Arrow from Gondolas vacias to Abandono */}
      <div className="flex flex-col items-center justify-start h-full pt-10 text-[#E53935] shrink-0">
        <ArrowRight className="w-6 h-6" />
      </div>

      {/* Right Branch: Abandono */}
      <div className="w-[31%] flex flex-col justify-start h-full pt-2">
        <div className="bg-[#E8F5E9] border-2 border-[#E53935] rounded-lg p-4">
          <div className="text-xs font-mono font-semibold text-[#E53935]">
            CONSECUENCIA MAYOR (63 % DE LA BRECHA)
          </div>
          <div className="mt-1.5 text-base font-bold text-[#263238] leading-snug">
            Clientes que se van{' '}
            <span className="text-[#E53935] font-mono tabular-nums">
              (abandono 23 %)
            </span>
            , primer motivo según las encuestas de salida
          </div>
          <div className="mt-2 text-xs text-[#263238]/80 font-medium">
            145.000 M COP/año · Reducir Pradera Plus aceleraría esta fuga.
          </div>
        </div>
      </div>
    </div>

    {/* Separate Box for Fraud */}
    <div className="bg-white border-l-4 border-[#2E7D32] border border-[#263238]/15 rounded-r-lg p-4 flex items-center justify-between gap-6">
      <div>
        <span className="text-xs font-mono font-semibold text-[#2E7D32] mr-3">
          CAUSA RAÍZ 2 · CONTROLAMOS TARDE:
        </span>
        <span className="text-sm sm:text-base font-bold text-[#263238]">
          Fraude detectado semanas después{' '}
          <span className="text-[#E53935] font-mono tabular-nums">
            (auditoría manual del 2 %)
          </span>
        </span>
      </div>
      <span className="text-xs font-mono tabular-nums text-[#E53935] font-semibold">
        Pérdidas: 0,95 % (8.800 M COP/año)
      </span>
    </div>
  </div>
);

/* ============================================================================
 * 6. [b. Alineación con los OKR]
 * ========================================================================== */
const Slide6OkrAlignment: React.FC = () => {
  const rows = [
    {
      obj: 'O1 Disponibilidad y frescura',
      kr: 'KR 1.1 Quiebre ≤ 4,0 %',
      cu: 'CU1 Pronóstico de demanda',
      m12: '9,8 % → 6,5 %'
    },
    {
      obj: 'O1 Disponibilidad y frescura',
      kr: 'KR 1.2 Merma ≤ 3,0 %',
      cu: 'CU2 Lotes en riesgo + CU1',
      m12: '7,3 % → 4,5 %'
    },
    {
      obj: 'O2 Lealtad',
      kr: 'KR 2.1 Abandono ≤ 12 %',
      cu: 'CU3 Abandono + CU1 (causa raíz)',
      m12: '23 % → 18 %'
    },
    {
      obj: 'O3 Rentabilidad y confianza',
      kr: 'KR 3.1 Fraude ≤ 0,40 %',
      cu: 'CU4 Fraude',
      m12: '0,95 % → 0,75 %'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-4">
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-xs sm:text-sm font-semibold text-[#263238]">
              <th className="py-3.5 px-5">Objetivo</th>
              <th className="py-3.5 px-5">Resultado clave</th>
              <th className="py-3.5 px-5">Caso de uso que lo ataca</th>
              <th className="py-3.5 px-5 text-right">Meta al mes 12</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-sm sm:text-base">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-[#E8F5E9]/35">
                <td className="py-4 px-5 font-semibold text-[#263238]">
                  {r.obj}
                </td>
                <td className="py-4 px-5 font-mono tabular-nums font-semibold text-[#2E7D32]">
                  {r.kr}
                </td>
                <td className="py-4 px-5 font-bold text-[#263238]">
                  {r.cu}
                </td>
                <td className="py-4 px-5 text-right font-mono tabular-nums font-bold text-[#2E7D32] whitespace-nowrap">
                  {r.m12}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#E8F5E9] rounded-lg px-5 py-3.5 border border-[#2E7D32]/20 flex items-center justify-between text-xs sm:text-sm">
        <span className="font-bold text-[#2E7D32]">
          Efecto multiplicador de CU1:
        </span>
        <span className="text-[#263238]">
          Al acertar la demanda reducimos a la vez el quiebre (KR 1.1), el sobrepedido que genera merma (KR 1.2) y el primer motivo de abandono (KR 2.1). Meta OKR completa: meses 18–24.
        </span>
      </div>
    </div>
  );
};

/* ============================================================================
 * 7. [c. Casos de uso]
 * ========================================================================== */
const Slide7UseCases: React.FC = () => {
  const cards = [
    {
      code: 'CU1 Pronóstico de demanda',
      type: 'REGRESIÓN',
      question: '¿Cuántas unidades pedirán los clientes por tienda y producto en 14 días?',
      why: 'Es una cantidad. Se pronostica demanda, no venta: en un quiebre la venta es cero aunque el cliente sí vino.',
      action: 'Pedido sugerido.'
    },
    {
      code: 'CU2 Lotes en riesgo',
      type: 'CLASIFICACIÓN',
      question: '¿Este lote se vencerá sin venderse en 3 días?',
      why: 'Sí/no, porque la decisión en tienda es binaria: actuar o no sobre el lote.',
      action: 'Descuento, traslado o donación.'
    },
    {
      code: 'CU3 Abandono',
      type: 'CLASIFICACIÓN',
      question: '¿Este afiliado hará cero compras en los próximos 90 días?',
      why: 'El cliente se va o se queda; se actúa antes de que se cumplan los 90 días.',
      action: 'Retención personalizada.'
    },
    {
      code: 'CU4 Fraude',
      type: 'CLASIFICACIÓN',
      question: '¿Este pago o esta devolución es sospechoso?',
      why: 'Sí/no, con casos muy escasos; dos submodelos porque pagos y devoluciones se comportan distinto.',
      action: 'Revisión humana, nunca bloqueo en caja.'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-4">
      <div className="grid grid-cols-4 gap-4 flex-1">
        {cards.map((c) => (
          <div
            key={c.code}
            className="bg-[#E8F5E9] border border-[#2E7D32]/25 rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono font-bold text-[#2E7D32] tracking-wide">
                {c.type}
              </div>
              <h3 className="mt-1 text-base font-bold text-[#263238]">
                {c.code}
              </h3>

              <div className="mt-3 pt-3 border-t border-[#2E7D32]/15">
                <div className="text-[11px] font-semibold text-[#263238]/65">
                  PREGUNTA
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#263238] mt-0.5 leading-snug">
                  {c.question}
                </p>
              </div>

              <div className="mt-3">
                <div className="text-[11px] font-semibold text-[#263238]/65">
                  POR QUÉ
                </div>
                <p className="text-xs sm:text-sm text-[#263238]/90 mt-0.5 leading-snug">
                  {c.why}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#2E7D32]/20 bg-white/80 rounded p-2.5">
              <div className="text-[10px] font-mono font-semibold text-[#2E7D32]">
                ACCIÓN QUE HABILITA
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#263238] mt-0.5">
                {c.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2E7D32] text-white rounded-lg py-2.5 px-5 text-center text-sm sm:text-base font-semibold">
        Si la respuesta es una cantidad → regresión. Si es sí/no → clasificación.
      </div>
    </div>
  );
};

/* ============================================================================
 * 8. [d. Algoritmos]
 * ========================================================================== */
const Slide8Algorithms: React.FC = () => {
  const rows = [
    {
      caso: 'CU1',
      ref: 'Regresión lineal múltiple',
      rec: 'Bosque aleatorio de regresión',
      why: 'Quincena + festivo + promoción no se suman, se potencian; maneja 1,8 M de combinaciones tienda-producto'
    },
    {
      caso: 'CU2',
      ref: 'Regresión logística',
      rec: 'Bosque aleatorio de clasificación',
      why: 'El riesgo se dispara en los últimos días. Con solo 18 meses de datos, si no supera a la logística, queda la logística'
    },
    {
      caso: 'CU3',
      ref: 'Regresión logística',
      rec: 'Bosque aleatorio (quién) + logística (por qué)',
      why: 'El bosque señala quién se va; la logística explica el motivo que mercadeo debe atacar'
    },
    {
      caso: 'CU4',
      ref: 'Regresión logística',
      rec: 'Bosque aleatorio con ponderación de clases',
      why: 'Evita que el modelo aprenda a decir siempre "no es fraude"'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-3">
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-xs sm:text-sm font-semibold text-[#263238]">
              <th className="py-2.5 px-4">Caso</th>
              <th className="py-2.5 px-4">Referencia</th>
              <th className="py-2.5 px-4">Recomendado</th>
              <th className="py-2.5 px-4">Por qué, en lenguaje de negocio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-xs sm:text-sm">
            {rows.map((r) => (
              <tr key={r.caso} className="hover:bg-[#E8F5E9]/35">
                <td className="py-3 px-4 font-mono font-bold text-[#2E7D32]">
                  {r.caso}
                </td>
                <td className="py-3 px-4 text-[#263238]/85">{r.ref}</td>
                <td className="py-3 px-4 font-bold text-[#263238]">{r.rec}</td>
                <td className="py-3 px-4 text-[#263238]">{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] rounded-r-lg py-3 px-5 text-sm sm:text-base font-bold text-[#263238]">
        Bosque aleatorio = consultar a cien administradores expertos en lugar de uno.
      </div>

      <p className="text-xs text-[#263238]/70 font-medium">
        Regla de adopción: el bosque solo reemplaza a la referencia si la supera en meses que no vio. Cada alerta muestra sus 3 razones principales.
        Descartamos vecinos más cercanos (KNN): lento con millones de registros y no muestra razones.
      </p>
    </div>
  );
};

/* ============================================================================
 * 9. [e. Datos requeridos]
 * ========================================================================== */
const Slide9DataRequired: React.FC = () => {
  const cols = [
    {
      code: 'CU1',
      name: 'Pronóstico de demanda',
      items: [
        'Ventas en caja (5 años)',
        'Calendario comercial',
        'Inventario y pedidos: marca los días sin existencias'
      ],
      note: 'Los días con quiebre no se toman como "cero demanda"'
    },
    {
      code: 'CU2',
      name: 'Lotes en riesgo',
      items: [
        'Vencimientos (18 meses)',
        'Registros de merma con los que hoy se mide el KPI',
        'El pronóstico del CU1'
      ],
      note: 'La merma registrada dice qué lotes sí se perdieron'
    },
    {
      code: 'CU3',
      name: 'Abandono Pradera Plus',
      items: [
        'Afiliados Pradera Plus (6 años)',
        'Compras, redenciones y quejas',
        'Quiebres vividos: canasta habitual × días sin existencias'
      ],
      note: 'Cruza lealtad con los faltantes sufridos en tienda'
    },
    {
      code: 'CU4',
      name: 'Detección de fraude',
      items: [
        'Pagos y devoluciones (2 años)',
        'Casos de la auditoría aleatoria (desde M1)',
        'SIN barrio, ubicación ni variables sustitutas'
      ],
      note: 'Candado ético desde el diseño de los datos'
    }
  ];

  return (
    <div className="h-full grid grid-cols-4 gap-4 items-stretch">
      {cols.map((c) => (
        <div
          key={c.code}
          className="bg-[#E8F5E9] border border-[#2E7D32]/20 rounded-lg p-5 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-mono font-bold text-[#2E7D32]">
              {c.code}
            </div>
            <h3 className="mt-1 text-base font-bold text-[#263238]">
              {c.name}
            </h3>

            <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-[#263238]">
              {c.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 leading-snug"
                >
                  <span className="text-[#2E7D32] font-bold">•</span>
                  <span
                    className={
                      item.includes('SIN barrio')
                        ? 'font-bold text-[#2E7D32]'
                        : ''
                    }
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-[#2E7D32]/15 text-[11px] text-[#263238]/75 font-medium">
            {c.note}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================================
 * 10. [e. Plan de preparación]
 * ========================================================================== */
const Slide10DataPrep: React.FC = () => {
  const rows = [
    {
      problema: 'Códigos distintos por ciudad',
      solucion: 'tabla maestra única',
      mes: 'M1'
    },
    {
      problema: 'Sí/No, S/N y 1/0',
      solucion: 'estandarizar a 1/0',
      mes: 'M1'
    },
    {
      problema: '8 % de campos vacíos en inventario',
      solucion: 'promedio de la misma tienda, producto y semana; marcado como estimado',
      mes: 'M1–M2'
    },
    {
      problema: '5 % de afiliados duplicados',
      solucion: 'fusionar por documento y nombre aproximado; casos dudosos a revisión manual',
      mes: 'M1–M2'
    },
    {
      problema: 'Venta en cero cuando hubo quiebre',
      solucion: 'reconstruir la demanda de esos días para no subestimarla',
      mes: 'M1–M2'
    },
    {
      problema: 'Vencimientos a mano en el 40 % de tiendas',
      solucion: 'entrenar con el 60 % digital (verificando ciudades y tamaños) y digitalizar el resto',
      mes: 'M2–M6'
    },
    {
      problema: 'Fraude solo en 12 tiendas auditadas',
      solucion: 'auditoría aleatoria en las 48; el histórico sesgado no se usa para entrenar',
      mes: 'desde M1'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-xs sm:text-sm font-semibold text-[#263238]">
              <th className="py-3 px-5">Problema</th>
              <th className="py-3 px-5">Solución</th>
              <th className="py-3 px-5 text-right">Mes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-xs sm:text-sm">
            {rows.map((r) => (
              <tr key={r.problema} className="hover:bg-[#E8F5E9]/35">
                <td className="py-2.5 px-5 font-semibold text-[#263238]">
                  {r.problema}
                </td>
                <td className="py-2.5 px-5 text-[#263238]">
                  <span className="text-[#2E7D32] font-bold mr-2">→</span>
                  {r.solucion}
                </td>
                <td className="py-2.5 px-5 text-right font-mono tabular-nums font-bold text-[#2E7D32] whitespace-nowrap">
                  {r.mes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
 * 11. [f. Medición del éxito]
 * ========================================================================== */
const Slide11SuccessMetrics: React.FC = () => {
  const rows = [
    {
      caso: 'CU1',
      metrica: 'Error promedio del pronóstico, en unidades (MAE)',
      meta: '25 % menos error que el método actual',
      kpi: 'Quiebre 9,8 → 6,5 %: 8 tiendas piloto vs. 8 tiendas espejo'
    },
    {
      caso: 'CU2',
      metrica: 'Sensibilidad y precisión',
      meta: '≥ 7 de 10 lotes en riesgo detectados; ≥ 5 de 10 alertas acertadas',
      kpi: 'Merma 7,3 → 4,5 % si se rescata la mitad de lo alertado (tiendas con vs. sin alertas)'
    },
    {
      caso: 'CU3',
      metrica: 'Capacidad de ordenar a los clientes por riesgo (AUC)',
      meta: '≥ 0,75: pone primero al que sí se va en 3 de cada 4 comparaciones',
      kpi: 'Abandono 23 → 18 %: grupo contactado vs. grupo de control'
    },
    {
      caso: 'CU4',
      metrica: 'Sensibilidad, precisión y equidad',
      meta: '≥ 6 de 10 fraudes detectados; ≥ 1 de 3 alertas real; falsas alarmas sin diferencia > 2 p. p. entre tiendas',
      kpi: 'Fraude 0,95 → 0,75 % de ventas, medido cada mes'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-3">
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-xs sm:text-sm font-semibold text-[#263238]">
              <th className="py-3 px-4">Caso</th>
              <th className="py-3 px-4">Qué medimos</th>
              <th className="py-3 px-4">Meta del modelo</th>
              <th className="py-3 px-4">Meta KPI al mes 12 y cómo se prueba</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-xs sm:text-sm">
            {rows.map((r) => (
              <tr key={r.caso} className="hover:bg-[#E8F5E9]/35">
                <td className="py-3 px-4 font-mono font-bold text-[#2E7D32]">
                  {r.caso}
                </td>
                <td className="py-3 px-4 font-semibold text-[#263238]">
                  {r.metrica}
                </td>
                <td className="py-3 px-4 font-mono tabular-nums text-[#263238]">
                  {r.meta}
                </td>
                <td className="py-3 px-4 font-medium text-[#263238]">
                  {r.kpi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] rounded-r-lg p-3.5 text-xs sm:text-sm text-[#263238] leading-relaxed">
        <strong>Precisión:</strong> de cada 10 alertas, cuántas eran reales. <strong>Sensibilidad:</strong> de cada 10 casos reales, cuántos detectamos.{' '}
        <strong>Validación:</strong> siempre con meses posteriores a los del entrenamiento.{' '}
        <strong>En fraude no usamos la exactitud:</strong> con menos del 1 % de fraude, un modelo que nunca detecta nada tendría 99 %.
      </div>
    </div>
  );
};

/* ============================================================================
 * 12. [g. Plan de implementación] Gantt M1-M12
 * ========================================================================== */
const Slide12Gantt: React.FC = () => {
  const months = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];

  type PhaseType = 'none' | 'build' | 'pilot' | 'scale' | 'audit';

  const ganttRows: { label: string; cells: PhaseType[] }[] = [
    {
      label: 'Fase 0 Datos',
      cells: ['build', 'build', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none']
    },
    {
      label: 'CU1 Demanda',
      cells: ['none', 'build', 'build', 'pilot', 'pilot', 'pilot', 'scale', 'scale', 'scale', 'scale', 'scale', 'scale']
    },
    {
      label: 'CU2 Merma',
      cells: ['none', 'none', 'build', 'build', 'pilot', 'pilot', 'scale', 'scale', 'scale', 'scale', 'scale', 'scale']
    },
    {
      label: 'CU3 Abandono',
      cells: ['none', 'none', 'none', 'build', 'build', 'build', 'pilot', 'pilot', 'scale', 'scale', 'scale', 'scale']
    },
    {
      label: 'CU4 Fraude',
      cells: ['audit', 'audit', 'audit', 'audit', 'audit', 'build', 'build', 'build', 'pilot', 'pilot', 'scale', 'scale']
    },
    {
      label: 'Transferencia',
      cells: ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'scale', 'scale', 'scale']
    }
  ];

  const getCellStyle = (type: PhaseType) => {
    switch (type) {
      case 'build':
        return 'bg-[#A5D6A7] text-[#263238] font-semibold';
      case 'pilot':
        return 'bg-[#4CAF50] text-white font-semibold';
      case 'scale':
        return 'bg-[#2E7D32] text-white font-semibold';
      case 'audit':
        return 'bg-[#E8F5E9] border-2 border-dashed border-[#2E7D32] text-[#2E7D32] font-semibold';
      default:
        return 'bg-transparent';
    }
  };

  const getCellLabel = (type: PhaseType) => {
    switch (type) {
      case 'build':
        return 'Construir';
      case 'pilot':
        return 'Piloto';
      case 'scale':
        return 'Escala';
      case 'audit':
        return 'Auditoría';
      default:
        return '';
    }
  };

  return (
    <div className="h-full flex flex-col justify-between gap-2.5">
      {/* Top callout box */}
      <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] rounded-r-lg px-4 py-2 text-xs sm:text-sm text-[#263238]">
        <strong>CU1 va primero:</strong> ataca 3 de los 4 KPI y usa los datos más completos (5 años).{' '}
        <strong>Nada escala a las 48 tiendas antes del mes 6.</strong>{' '}
        <strong>El fraude va de último</strong> porque necesita 5 meses de auditoría aleatoria.
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-[#A5D6A7] inline-block" />
            <span>Construcción</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-[#4CAF50] inline-block" />
            <span>Piloto</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-[#2E7D32] inline-block" />
            <span>Escalamiento</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-xs bg-[#E8F5E9] border-2 border-dashed border-[#2E7D32] inline-block" />
            <span>Auditoría aleatoria</span>
          </span>
        </div>
      </div>

      {/* Gantt Grid */}
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-center border-collapse table-fixed">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-[11px] font-mono font-bold text-[#263238]">
              <th className="py-1.5 px-3 text-left w-32">Fase / Modelo</th>
              {months.map((m) => (
                <th
                  key={m}
                  className={`py-1.5 ${
                    m === 'M6' ? 'bg-[#2E7D32] text-white' : ''
                  }`}
                >
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-[11px]">
            {ganttRows.map((row) => (
              <tr key={row.label}>
                <td className="py-2 px-3 text-left font-bold text-[#263238] whitespace-nowrap">
                  {row.label}
                </td>
                {row.cells.map((cell, idx) => (
                  <td
                    key={idx}
                    className={`p-1 border-l border-[#263238]/10 ${
                      idx === 5 ? 'bg-[#E8F5E9]/50' : ''
                    }`}
                  >
                    {cell !== 'none' && (
                      <div
                        className={`w-full py-1 rounded-xs text-[10px] font-mono leading-none ${getCellStyle(
                          cell
                        )}`}
                      >
                        {getCellLabel(cell)}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Diamond Milestones */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-[#263238]/15 rounded-lg px-3.5 py-2 flex items-center gap-2.5 text-xs">
          <Diamond className="w-4 h-4 text-[#2E7D32] fill-[#2E7D32] shrink-0" />
          <div>
            <span className="font-mono font-bold text-[#2E7D32]">Hito M2:</span>{' '}
            <span className="font-semibold text-[#263238]">Datos listos</span>
          </div>
        </div>

        <div className="bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-lg px-3.5 py-2 flex items-center gap-2.5 text-xs">
          <Diamond className="w-4 h-4 text-[#2E7D32] fill-[#2E7D32] shrink-0" />
          <div>
            <span className="font-mono font-bold text-[#2E7D32]">Hito M6:</span>{' '}
            <span className="font-bold text-[#263238]">Junta decide escalar CU1 y CU2</span>
          </div>
        </div>

        <div className="bg-white border border-[#263238]/15 rounded-lg px-3.5 py-2 flex items-center gap-2.5 text-xs">
          <Diamond className="w-4 h-4 text-[#2E7D32] fill-[#2E7D32] shrink-0" />
          <div>
            <span className="font-mono font-bold text-[#2E7D32]">Hito M12:</span>{' '}
            <span className="font-semibold text-[#263238]">Entrega al equipo interno</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 13. [g. Entregables]
 * ========================================================================== */
const Slide13Deliverables: React.FC = () => {
  const rows = [
    {
      fase: '0 Datos',
      entregable: 'tabla maestra, afiliados únicos, política ética de datos',
      compuerta: 'menos de 2 % de errores'
    },
    {
      fase: 'CU1',
      entregable: 'pedido sugerido en 8 tiendas y luego en 48',
      compuerta: '25 % menos error y menos quiebre que las tiendas espejo'
    },
    {
      fase: 'CU2',
      entregable: 'alerta diaria de lotes y regla de descuento/donación',
      compuerta: '7 de 10 lotes detectados y menos merma'
    },
    {
      fase: 'CU3',
      entregable: 'lista semanal de afiliados en riesgo y campañas',
      compuerta: 'AUC ≥ 0,75 y menos abandono que el grupo de control'
    },
    {
      fase: 'CU4',
      entregable: 'bandeja de revisión para auditores',
      compuerta: '6 de 10 fraudes detectados, 1 de 3 alertas real y equidad ≤ 2 p. p.'
    },
    {
      fase: 'Transferencia',
      entregable: 'tablero de KPI y equipo interno capacitado',
      compuerta: 'el equipo reentrena sin apoyo externo'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="border border-[#263238]/15 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E8F5E9] border-b border-[#2E7D32]/20 text-xs sm:text-sm font-semibold text-[#263238]">
              <th className="py-3 px-5">Fase</th>
              <th className="py-3 px-5">Entregable</th>
              <th className="py-3 px-5">Compuerta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263238]/10 text-xs sm:text-sm">
            {rows.map((r) => (
              <tr key={r.fase} className="hover:bg-[#E8F5E9]/35">
                <td className="py-3 px-5 font-mono font-bold text-[#2E7D32]">
                  {r.fase}
                </td>
                <td className="py-3 px-5 text-[#263238] font-medium">
                  {r.entregable}
                </td>
                <td className="py-3 px-5 font-semibold text-[#263238]">
                  {r.compuerta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============================================================================
 * 14. [h. Sesgos y ética]
 * ========================================================================== */
const Slide14BiasEthics: React.FC = () => (
  <div className="h-full grid grid-cols-2 gap-6 items-stretch">
    {/* Left column: El riesgo */}
    <div className="bg-white border-2 border-[#E53935]/40 rounded-lg p-6 flex flex-col justify-between">
      <div>
        <div className="text-xs font-mono font-bold text-[#E53935]">
          EL RIESGO
        </div>
        <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#263238]">
          Sesgo histórico en las tiendas auditadas
        </h3>
        <p className="mt-3 text-sm sm:text-base text-[#263238] leading-relaxed">
          La auditoría se concentró en{' '}
          <strong className="text-[#E53935] font-mono tabular-nums">
            12 tiendas
          </strong>{' '}
          de sectores populares, así que el modelo aprendería que{' '}
          <strong className="text-[#E53935]">"barrio popular = fraude"</strong>.
        </p>
      </div>

      <div className="mt-4 bg-[#E53935]/5 border border-[#E53935]/30 rounded-lg p-4">
        <div className="text-xs font-mono font-bold text-[#E53935]">
          CÍRCULO VICIOSO
        </div>
        <div className="mt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-[#263238]">
          <span>Más alertas</span>
          <ArrowRight className="w-4 h-4 text-[#E53935]" />
          <span>Más auditoría</span>
          <ArrowRight className="w-4 h-4 text-[#E53935]" />
          <span>Más fraude "confirmado" allí</span>
        </div>
      </div>
    </div>

    {/* Right column: Cómo lo corregimos */}
    <div className="bg-[#E8F5E9] border border-[#2E7D32]/30 rounded-lg p-6 flex flex-col justify-between">
      <div>
        <div className="text-xs font-mono font-bold text-[#2E7D32]">
          CÓMO LO CORREGIMOS
        </div>
        <h3 className="mt-2 text-lg sm:text-xl font-bold text-[#263238]">
          Cuatro candados técnicos y de gobierno
        </h3>

        <ol className="mt-4 space-y-3 text-sm sm:text-base text-[#263238]">
          <li className="flex items-start gap-3">
            <span className="font-mono font-bold text-[#2E7D32]">1)</span>
            <span>Auditoría aleatoria en las 48 tiendas; el histórico sesgado no entrena el modelo.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono font-bold text-[#2E7D32]">2)</span>
            <span>Prohibido usar barrio, ubicación o estrato, y se vigilan sustitutos (medio de pago, monto, hora).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono font-bold text-[#2E7D32]">3)</span>
            <span>Prueba mensual: falsas alarmas sin diferencia mayor a 2 p. p. entre tiendas.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono font-bold text-[#2E7D32]">4)</span>
            <span>Con el modelo en operación, al menos 20 % de la auditoría sigue al azar.</span>
          </li>
        </ol>
      </div>

      <div className="pt-3 border-t border-[#2E7D32]/20 text-xs font-semibold text-[#2E7D32]">
        Postura ética: rechazamos restringir devoluciones por barrio.
      </div>
    </div>
  </div>
);

/* ============================================================================
 * 15. [h. Rol humano, privacidad y riesgos]
 * ========================================================================== */
const Slide15HumanRolePrivacy: React.FC = () => {
  const humanRoles = [
    { cu: 'CU1', role: 'el administrador aprueba o ajusta el pedido' },
    { cu: 'CU2', role: 'el administrador elige rebajar, trasladar o donar (solo producto apto)' },
    { cu: 'CU3', role: 'mercadeo define la oferta, con las mismas reglas para todos los segmentos' },
    { cu: 'CU4', role: 'solo un auditor confirma; nunca hay bloqueo en caja' }
  ];

  const risks = [
    {
      risk: 'Desconfianza de los administradores',
      mitigation: 'piloto con voluntarios'
    },
    {
      risk: 'Equipo de analítica de solo 2 personas',
      mitigation: 'reforzar con 3 perfiles y transferir conocimiento'
    },
    {
      risk: 'El modelo pierde precisión',
      mitigation: 'monitoreo y reentrenamiento mensual'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between gap-3">
      {/* Small table: Rol humano */}
      <div className="grid grid-cols-2 gap-3">
        {humanRoles.map((h) => (
          <div
            key={h.cu}
            className="bg-white border border-[#263238]/15 rounded-lg px-4 py-2.5 flex items-center gap-3 text-xs sm:text-sm"
          >
            <span className="font-mono font-bold text-[#2E7D32] shrink-0">
              {h.cu} →
            </span>
            <span className="font-medium text-[#263238]">{h.role}</span>
          </div>
        ))}
      </div>

      {/* Ley 1581 banner */}
      <div className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] rounded-r-lg px-5 py-3 text-xs sm:text-sm font-semibold text-[#263238]">
        Ley 1581 de 2012: solo afiliados con autorización vigente, datos mínimos, códigos en lugar de nombres, acceso restringido y derecho a revocar.
      </div>

      {/* Three project risks with mitigation */}
      <div className="grid grid-cols-3 gap-4">
        {risks.map((item) => (
          <div
            key={item.risk}
            className="bg-white border border-[#263238]/15 rounded-lg p-3.5 flex flex-col justify-between"
          >
            <div>
              <div className="text-[11px] font-mono font-semibold text-[#E53935]">
                RIESGO DEL PROYECTO
              </div>
              <div className="mt-1 text-xs sm:text-sm font-bold text-[#263238]">
                {item.risk}
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-[#263238]/10 text-xs sm:text-sm text-[#2E7D32] font-semibold">
              → {item.mitigation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
 * 16. [i. Beneficios esperados]
 * ========================================================================== */
const Slide16ExpectedBenefits: React.FC = () => (
  <div className="h-full grid grid-cols-12 gap-5 items-stretch">
    {/* Left 7 cols: Horizontal Bar Chart + Total + Metas al mes 12 */}
    <div className="col-span-7 flex flex-col justify-between bg-white border border-[#263238]/15 rounded-lg p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-xs font-mono font-semibold text-[#263238]/70">
            BENEFICIO ANUAL AL MES 12 (MILLONES DE COP)
          </div>
          <div className="text-sm font-bold text-[#263238] mt-0.5">
            Recuperación por indicador
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-[#263238]/70 mr-2">
            Total:
          </span>
          <span className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-[#2E7D32]">
            ≈ 115.000 M
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-[150px] w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={BENEFITS_CHART_DATA}
            margin={{ top: 5, right: 68, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#263238" strokeOpacity={0.1} />
            <XAxis
              type="number"
              domain={[0, 75000]}
              tick={{ fill: '#263238', fontSize: 11 }}
              tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={78}
              tick={{ fill: '#263238', fontSize: 12, fontWeight: 600 }}
            />
            <Tooltip
              formatter={(v) => [`${Number(v).toLocaleString('es-CO')} M COP`, 'Beneficio anual']}
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#2E7D32',
                fontSize: '12px',
                borderRadius: '6px'
              }}
            />
            <Bar dataKey="valor" radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {BENEFITS_CHART_DATA.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#2E7D32' : '#43A047'}
                />
              ))}
              <LabelList
                dataKey="label"
                position="right"
                style={{
                  fill: '#263238',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metas al mes 12 */}
      <div className="pt-2.5 border-t border-[#263238]/10 flex items-center justify-between text-xs font-mono tabular-nums">
        <span className="font-bold text-[#2E7D32]">Metas al mes 12:</span>
        <span>abandono 18 %</span>
        <span>·</span>
        <span>quiebre 6,5 %</span>
        <span>·</span>
        <span>merma 4,5 %</span>
        <span>·</span>
        <span>fraude 0,75 %</span>
      </div>
    </div>

    {/* Right 5 cols: Recuadro de supuestos */}
    <div className="col-span-5 bg-[#E8F5E9] border border-[#2E7D32]/25 rounded-lg p-5 flex flex-col justify-between">
      <div>
        <div className="text-xs font-mono font-bold text-[#2E7D32]">
          SUPUESTOS EXPLÍCITOS
        </div>
        <h3 className="mt-1.5 text-base sm:text-lg font-bold text-[#263238]">
          De ventas recuperadas a utilidad operativa
        </h3>

        <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#263238] leading-snug">
          <li className="flex items-start gap-2">
            <span className="text-[#2E7D32] font-bold">•</span>
            <span>
              Ventas recuperadas (abandono + quiebre) al <strong>25 % de margen bruto</strong> →{' '}
              <span className="font-mono tabular-nums font-bold">23.900 M</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2E7D32] font-bold">•</span>
            <span>
              Merma evitada al <strong>50 % de su valor</strong> (lo rebajado o donado no recupera el precio) →{' '}
              <span className="font-mono tabular-nums font-bold">7.800 M</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2E7D32] font-bold">•</span>
            <span>
              Fraude evitado, ahorro directo →{' '}
              <span className="font-mono tabular-nums font-bold">3.200 M</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#2E7D32] font-bold">•</span>
            <span>
              <strong>Ritmo anual al mes 12</strong>; abandono como tasa trimestral anualizada (Anexo 2). Metas OKR completas: meses 18–24.
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-md p-3 border border-[#2E7D32]/20">
        <div className="text-[11px] font-mono text-[#263238]/70">
          UTILIDAD OPERATIVA ANUAL VS. INVERSIÓN
        </div>
        <div className="mt-1 flex items-baseline justify-between font-mono tabular-nums">
          <span className="text-xs text-[#263238]">Actual: ≈ 30.400 M</span>
          <span className="text-sm font-bold text-[#2E7D32]">
            Impacto M12: +35.000 M
          </span>
        </div>
        <div className="mt-1 flex items-baseline justify-between font-mono tabular-nums">
          <span className="text-xs text-[#263238]">Inversión: ≈ 5.200 M</span>
          <span className="text-xs font-bold text-[#2E7D32]">
            ≈ 6,7 veces lo invertido
          </span>
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================================
 * 17. [a. Decisión]
 * ========================================================================== */
const Slide17Decision: React.FC = () => {
  const decisions = [
    {
      num: '1)',
      title: 'Aprobar el programa de 12 meses, con una inversión estimada de ≈ 5.200 M.',
      detail: 'Inicio inmediato de la Fase 0 (limpieza de datos M1–M2) y construcción del pronóstico de demanda (CU1). Retorno esperado: ≈ 35.000 M/año de utilidad.'
    },
    {
      num: '2)',
      title: 'Aplazar el cierre de 9 tiendas y el recorte de Pradera Plus hasta la revisión del mes 6.',
      detail: 'Evaluar con datos reales del piloto en la compuerta del mes 6 antes de tomar medidas que reduzcan ingresos.'
    },
    {
      num: '3)',
      title: 'Aprobar una política de uso ético de datos: ningún modelo decide solo sobre un cliente.',
      detail: 'Auditoría aleatoria en las 48 tiendas, sin variables de barrio y siempre con decisión humana final.'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center gap-4">
      {decisions.map((d) => (
        <div
          key={d.num}
          className="bg-[#E8F5E9] border-l-4 border-[#2E7D32] rounded-r-lg p-5 flex items-start gap-5"
        >
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#2E7D32] shrink-0">
            {d.num}
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#263238] leading-snug">
              {d.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#263238]/80">
              {d.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ============================================================================
 * 18. PREGUNTAS (sin etiqueta)
 * ========================================================================== */
const Slide18Questions: React.FC<{ firmName: string }> = ({ firmName }) => (
  <div className="h-full flex flex-col justify-between py-6">
    <div className="flex items-center justify-between text-xs font-medium text-[#2E7D32]">
      <span>MERCADOS LA PRADERA S.A.S. · LICITACIÓN LP-2026-01</span>
      <span className="font-mono tabular-nums">SESIÓN DE PREGUNTAS (5 MIN)</span>
    </div>

    <div className="my-auto text-center py-8">
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#263238]">
        Gracias · ¿Preguntas?
      </h1>
      <p className="mt-4 text-base sm:text-lg text-[#2E7D32] font-medium">
        De reaccionar a anticipar · Cuatro modelos supervisados con retorno medible en el mes 6
      </p>

      <div className="mt-10 max-w-3xl mx-auto grid grid-cols-3 gap-4 text-left">
        <div className="bg-[#E8F5E9] rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="text-xs font-mono text-[#2E7D32] font-semibold">
            BRECHA ACTUAL
          </div>
          <div className="mt-1 text-lg font-bold font-mono tabular-nums text-[#E53935]">
            ≈ 230.000 M COP/año
          </div>
        </div>
        <div className="bg-[#E8F5E9] rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="text-xs font-mono text-[#2E7D32] font-semibold">
            RECUPERACIÓN MES 12
          </div>
          <div className="mt-1 text-lg font-bold font-mono tabular-nums text-[#2E7D32]">
            ≈ 115.000 M COP/año
          </div>
        </div>
        <div className="bg-[#E8F5E9] rounded-lg p-4 border border-[#2E7D32]/20">
          <div className="text-xs font-mono text-[#2E7D32] font-semibold">
            HITO DE CONTROL JUNTA
          </div>
          <div className="mt-1 text-lg font-bold font-mono tabular-nums text-[#263238]">
            Mes 6 (Pilotos medidos)
          </div>
        </div>
      </div>
    </div>

    <div className="pt-4 border-t border-[#263238]/15 flex items-center justify-between text-xs text-[#263238]/75">
      <span>
        {firmName} · Programación Aplicada · Universidad de La Sabana · 2026
      </span>
      <span className="font-mono tabular-nums">18 / 18</span>
    </div>
  </div>
);
