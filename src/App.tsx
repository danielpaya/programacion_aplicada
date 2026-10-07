import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Printer,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Clock,
  CheckCircle2,
  Eye,
  LayoutGrid,
  Maximize,
  Minimize,
  X
} from 'lucide-react';
import {
  SLIDES_DATA,
  TOTAL_PRESENTATION_SECONDS,
  formatSecondsToMMSS
} from './data/slidesData';
import { SlideCanvas } from './components/SlideCanvas';

// Design width of the slide canvas; full-screen mode scales from this size
const SLIDE_DESIGN_WIDTH = 1160;
const SLIDE_DESIGN_HEIGHT = (SLIDE_DESIGN_WIDTH * 9) / 16;

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [firmName, setFirmName] = useState<string>('[Nombre de la firma]');
  const [isEditingFirm, setIsEditingFirm] = useState<boolean>(false);

  // Cumulative stopwatch state (in seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Full deck print preview state (ensures Recharts SVGs measure & render at 100% width before window.print())
  const [isPrintView, setIsPrintView] = useState<boolean>(false);

  // Full-screen presentation mode
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fullscreenScale, setFullscreenScale] = useState<number>(1);

  const currentSlide = SLIDES_DATA[currentIndex];
  const totalSlides = SLIDES_DATA.length; // 18

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleNotes = useCallback(() => {
    setShowNotes((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    setIsPrintView(false);
    setIsFullscreen((prev) => !prev);
  }, []);

  // Request browser full screen once the overlay is mounted
  useEffect(() => {
    if (!isFullscreen || document.fullscreenElement) return;
    fullscreenRef.current?.requestFullscreen().catch(() => {
      // Browser refused (e.g. inside an iframe): keep the overlay as a fallback
    });
  }, [isFullscreen]);

  // Sync state when the user leaves full screen with Esc
  useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  // Scale the slide to fit the screen while keeping 16:9
  useEffect(() => {
    if (!isFullscreen) return;
    const updateScale = () => {
      setFullscreenScale(
        Math.min(
          window.innerWidth / SLIDE_DESIGN_WIDTH,
          window.innerHeight / SLIDE_DESIGN_HEIGHT
        )
      );
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isFullscreen]);

  // Keyboard navigation: ArrowLeft, ArrowRight, "N" for speaker notes, "F" for full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (isFullscreen && e.key === ' ')) {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        toggleNotes();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentIndex(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, toggleNotes, toggleFullscreen, isFullscreen, totalSlides]);

  // Stopwatch interval
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isTimerRunning]);

  // Export PDF handler: switches to full 18-slide view so Recharts charts mount with full dimensions, then prints
  const handleExportPDF = () => {
    setIsPrintView(true);
    window.setTimeout(() => {
      window.print();
    }, 300);
  };

  // Calculate timing comparison vs planned cumulative time up to current slide
  const plannedStartOfSlide =
    currentIndex === 0 ? 0 : SLIDES_DATA[currentIndex - 1].cumulativeSeconds;
  const plannedEndOfSlide = currentSlide.cumulativeSeconds;

  const getPacingStatus = () => {
    if (elapsedSeconds === 0 && !isTimerRunning) {
      return {
        label: 'Listo para iniciar (Meta total: 15:00)',
        colorClass: 'text-[#263238]/70'
      };
    }
    if (elapsedSeconds > TOTAL_PRESENTATION_SECONDS) {
      const over = elapsedSeconds - TOTAL_PRESENTATION_SECONDS;
      return {
        label: `+${formatSecondsToMMSS(over)} sobre los 15:00`,
        colorClass: 'text-[#E53935] font-semibold'
      };
    }
    if (elapsedSeconds > plannedEndOfSlide + 15) {
      const behind = elapsedSeconds - plannedEndOfSlide;
      return {
        label: `Retraso de +${behind} s frente a esta diapositiva`,
        colorClass: 'text-[#E53935] font-semibold'
      };
    }
    if (elapsedSeconds < plannedStartOfSlide - 15) {
      const ahead = plannedStartOfSlide - elapsedSeconds;
      return {
        label: `Adelantado ${ahead} s respecto al guion`,
        colorClass: 'text-[#2E7D32] font-semibold'
      };
    }
    return {
      label: 'En tiempo con el guion de 15 min',
      colorClass: 'text-[#2E7D32] font-semibold'
    };
  };

  const pacing = getPacingStatus();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F4] text-[#263238]">
      {/* ====================================================================
       * TOP CONTROL BAR (Hidden when printing)
       * ==================================================================== */}
      <header className="no-print bg-white border-b border-[#263238]/10 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shrink-0">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm sm:text-base font-bold tracking-tight text-[#2E7D32] whitespace-nowrap">
            Mercados La Pradera · LP-2026-01
          </span>
        </div>

        {/* Zone 2: Slide quick-jump & Firm Name customization */}
        <div className="hidden md:flex items-center gap-3">
          <select
            aria-label="Seleccionar diapositiva"
            value={currentIndex}
            onChange={(e) => {
              setCurrentIndex(Number(e.target.value));
              if (isPrintView) setIsPrintView(false);
            }}
            className="text-xs font-medium bg-[#F4F6F4] border border-[#263238]/15 rounded-md px-2.5 py-1.5 text-[#263238] focus:outline-none focus:border-[#2E7D32]"
          >
            {SLIDES_DATA.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.id}. {s.sectionTag ? `[${s.sectionTag}] ` : ''}
                {s.shortTitle} ({s.durationLabel})
              </option>
            ))}
          </select>

          {isEditingFirm ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setIsEditingFirm(false);
                }}
                placeholder="Nombre de la firma consultora"
                className="text-xs bg-white border border-[#2E7D32] rounded px-2 py-1 text-[#263238] w-48 focus:outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setIsEditingFirm(false)}
                className="text-xs font-medium px-2 py-1 rounded bg-[#2E7D32] text-white hover:bg-[#2E7D32]/90 whitespace-nowrap"
              >
                Guardar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingFirm(true)}
              className="text-xs text-[#263238]/70 hover:text-[#2E7D32] transition-colors whitespace-nowrap"
              title="Personalizar el nombre de la firma en la portada"
            >
              Firma: <strong className="text-[#263238]">{firmName}</strong>
            </button>
          )}
        </div>

        {/* Zone 3: Primary Controls (Slide Counter, Notes toggle, Export PDF) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Navigation & Counter "n / 18" */}
          <div className="flex items-center bg-[#F4F6F4] border border-[#263238]/15 rounded-md p-0.5">
            <button
              type="button"
              onClick={() => {
                if (isPrintView) setIsPrintView(false);
                goToPrev();
              }}
              disabled={currentIndex === 0 && !isPrintView}
              aria-label="Diapositiva anterior"
              className="p-1.5 rounded hover:bg-white disabled:opacity-35 text-[#263238] transition-colors"
              title="Anterior (Flecha izquierda)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span
              className="px-3 text-xs sm:text-sm font-mono font-bold tabular-nums text-[#263238] whitespace-nowrap"
              aria-live="polite"
            >
              {currentSlide.id} / {totalSlides}
            </span>
            <button
              type="button"
              onClick={() => {
                if (isPrintView) setIsPrintView(false);
                goToNext();
              }}
              disabled={currentIndex === totalSlides - 1 && !isPrintView}
              aria-label="Diapositiva siguiente"
              className="p-1.5 rounded hover:bg-white disabled:opacity-35 text-[#263238] transition-colors"
              title="Siguiente (Flecha derecha)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Speaker Notes ("N") */}
          <button
            type="button"
            onClick={toggleNotes}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap border ${
              showNotes
                ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]/30'
                : 'bg-white text-[#263238] border-[#263238]/20 hover:bg-[#F4F6F4]'
            }`}
            title="Mostrar u ocultar notas del orador (Tecla N)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notas (N)</span>
          </button>

          {/* Full-screen presentation ("F") */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap border bg-white text-[#263238] border-[#263238]/20 hover:bg-[#F4F6F4] cursor-pointer"
            title="Presentar en pantalla completa (Tecla F · Esc para salir)"
          >
            <Maximize className="w-3.5 h-3.5" />
            <span>Pantalla completa (F)</span>
          </button>

          {/* Toggle All-Slides View / Single Slide View */}
          {isPrintView && (
            <button
              type="button"
              onClick={() => setIsPrintView(false)}
              className="px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 bg-white text-[#263238] border border-[#263238]/20 hover:bg-[#F4F6F4] whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Vista 1 a 1</span>
            </button>
          )}

          {/* Exportar PDF button */}
          <button
            type="button"
            onClick={handleExportPDF}
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#2E7D32] text-white hover:bg-[#256628] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="Imprimir las 18 diapositivas en formato horizontal (1 por página)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </header>

      {/* ====================================================================
       * SINGLE SLIDE INTERACTIVE PRESENTATION VIEW
       * ==================================================================== */}
      {!isPrintView && (
        <main className="no-print flex-1 flex flex-col justify-between min-h-0 px-4 sm:px-8 py-3">
          {/* 16:9 Slide Container centered in viewport */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="w-full max-w-[1160px] mx-auto">
              <SlideCanvas slide={currentSlide} firmName={firmName} />
            </div>
          </div>

          {/* Bottom Navigation Bar when Notes are hidden */}
          {!showNotes && (
            <div className="max-w-[1160px] w-full mx-auto mt-2 pt-2 flex items-center justify-between text-xs text-[#263238]/70">
              <div className="flex items-center gap-3">
                <span>
                  Use las flechas <strong>←</strong> <strong>→</strong> para navegar
                </span>
                <span>·</span>
                <button
                  type="button"
                  onClick={toggleNotes}
                  className="text-[#2E7D32] font-semibold hover:underline"
                >
                  Presione "N" para mostrar las notas del orador y el cronómetro
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums">
                <span>
                  Tiempo sugerido: <strong>{currentSlide.durationLabel}</strong>
                </span>
                <span>·</span>
                <span>
                  Acumulado meta: <strong>{currentSlide.cumulativeLabel} / 15:00</strong>
                </span>
              </div>
            </div>
          )}

          {/* ================================================================
           * SPEAKER NOTES LOWER PANEL (Toggled with "N" key)
           * ================================================================ */}
          {showNotes && (
            <section
              aria-label="Notas del orador y cronómetro"
              className="max-w-[1160px] w-full mx-auto mt-3 bg-white border border-[#263238]/15 rounded-lg p-4 shadow-xs shrink-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Left 8 cols: Spoken script in first-person plural */}
                <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#263238]/10 pb-3 lg:pb-0 lg:pr-5">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2E7D32]">
                      <span>NOTAS DEL ORADOR (GUION HABLADO · 1.ª PERSONA PLURAL)</span>
                      <span>·</span>
                      <span>DIAPOSITIVA {currentSlide.id} / 18</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleNotes}
                      className="text-[11px] text-[#263238]/60 hover:text-[#263238]"
                    >
                      Ocultar (Tecla N)
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#263238] leading-relaxed">
                    "{currentSlide.speakerNotes}"
                  </p>

                  {currentSlide.speakerKeyHighlight && (
                    <div className="mt-2 text-xs font-medium text-[#2E7D32] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Mensaje clave: {currentSlide.speakerKeyHighlight}</span>
                    </div>
                  )}
                </div>

                {/* Right 4 cols: Suggested slide time & Cumulative Stopwatch */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-[#E8F5E9] rounded-md px-3 py-2 border border-[#2E7D32]/20">
                      <div className="text-[10px] font-mono font-semibold text-[#2E7D32]">
                        TIEMPO SUGERIDO DIAP.
                      </div>
                      <div className="text-base font-bold font-mono tabular-nums text-[#263238] mt-0.5">
                        {currentSlide.durationLabel}
                      </div>
                    </div>

                    <div className="bg-[#E8F5E9] rounded-md px-3 py-2 border border-[#2E7D32]/20">
                      <div className="text-[10px] font-mono font-semibold text-[#2E7D32]">
                        META ACUMULADA (15M)
                      </div>
                      <div className="text-base font-bold font-mono tabular-nums text-[#263238] mt-0.5">
                        {currentSlide.cumulativeLabel}{' '}
                        <span className="text-xs font-normal text-[#263238]/70">
                          / 15:00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Cumulative Stopwatch */}
                  <div className="bg-[#F4F6F4] rounded-md px-3 py-2 border border-[#263238]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#2E7D32]" />
                      <div>
                        <div className="text-[10px] font-mono font-semibold text-[#263238]/70">
                          CRONÓMETRO ACUMULADO
                        </div>
                        <div
                          className={`text-lg font-extrabold font-mono tabular-nums leading-tight ${
                            elapsedSeconds > TOTAL_PRESENTATION_SECONDS
                              ? 'text-[#E53935]'
                              : 'text-[#263238]'
                          }`}
                        >
                          {formatSecondsToMMSS(elapsedSeconds)}{' '}
                          <span className="text-xs font-normal text-[#263238]/60">
                            / 15:00
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsTimerRunning((r) => !r)}
                        className={`px-2.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                          isTimerRunning
                            ? 'bg-[#E53935] text-white'
                            : 'bg-[#2E7D32] text-white hover:bg-[#256628]'
                        }`}
                      >
                        {isTimerRunning ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pausar</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Iniciar</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTimerRunning(false);
                          setElapsedSeconds(0);
                        }}
                        className="p-1.5 rounded bg-white border border-[#263238]/20 text-[#263238] hover:bg-[#E8F5E9] transition-colors cursor-pointer"
                        title="Reiniciar cronómetro"
                        aria-label="Reiniciar cronómetro"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className={`text-[11px] ${pacing.colorClass}`}>
                    {pacing.label}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )}

      {/* ====================================================================
       * FULL-SCREEN PRESENTATION MODE (click advances, controls on hover)
       * ==================================================================== */}
      {isFullscreen && (
        <div
          ref={fullscreenRef}
          className="no-print group fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          onClick={goToNext}
        >
          <div
            className="shrink-0"
            style={{
              width: SLIDE_DESIGN_WIDTH * fullscreenScale,
              height: SLIDE_DESIGN_HEIGHT * fullscreenScale
            }}
          >
            <div
              style={{
                width: SLIDE_DESIGN_WIDTH,
                transform: `scale(${fullscreenScale})`,
                transformOrigin: 'top left'
              }}
            >
              <SlideCanvas slide={currentSlide} firmName={firmName} />
            </div>
          </div>

          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#263238]/85 text-white rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goToPrev}
              disabled={currentIndex === 0}
              aria-label="Diapositiva anterior"
              className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-35 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-bold tabular-nums">
              {currentSlide.id} / {totalSlides}
            </span>
            <button
              type="button"
              onClick={goToNext}
              disabled={currentIndex === totalSlides - 1}
              aria-label="Diapositiva siguiente"
              className="p-1.5 rounded-full hover:bg-white/15 disabled:opacity-35 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-white/25 mx-1" />
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Salir de pantalla completa"
              title="Salir (Esc)"
              className="p-1.5 rounded-full hover:bg-white/15 cursor-pointer"
            >
              {document.fullscreenElement ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
       * PRINT / ALL-SLIDES DECK (Visible when printing OR in PDF preview mode)
       * ==================================================================== */}
      <div className={isPrintView ? 'block w-full' : 'hidden print-only-deck'}>
        {/* Non-printing banner when in Print Preview Mode */}
        {isPrintView && (
          <div className="no-print bg-[#E8F5E9] border-b border-[#2E7D32]/30 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#263238]">
              <LayoutGrid className="w-4 h-4 text-[#2E7D32]" />
              <span>
                <strong>Vista de exportación PDF (18 diapositivas en horizontal 16:9):</strong>{' '}
                Seleccione <em>"Guardar como PDF"</em> y orientación <em>"Horizontal / Landscape"</em> en el diálogo de impresión.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded bg-[#2E7D32] text-white text-xs font-semibold hover:bg-[#256628] cursor-pointer"
              >
                Imprimir / Guardar PDF ahora
              </button>
              <button
                type="button"
                onClick={() => setIsPrintView(false)}
                className="px-3 py-1.5 rounded bg-white border border-[#263238]/20 text-[#263238] text-xs font-semibold hover:bg-[#F4F6F4] cursor-pointer"
              >
                Volver a presentación (1 a 1)
              </button>
            </div>
          </div>
        )}

        <div className={isPrintView ? 'max-w-[1160px] mx-auto py-6 space-y-8 print:max-w-none print:p-0 print:space-y-0' : ''}>
          {SLIDES_DATA.map((slide) => (
            <div key={slide.id} className="print-slide-page">
              <SlideCanvas slide={slide} firmName={firmName} isPrint={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
