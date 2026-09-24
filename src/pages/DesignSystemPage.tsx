import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  COLOR_PALETTES,
  TYPE_SCALE,
  SPACING_TOKENS,
  BORDER_RADIUS,
  ELEVATION_TOKENS
} from "@/design-system/tokens"
import {
  Button,
  Badge,
  StickyNote,
  LampToggle,
  HorizonToggle,
  NatureToggle,
  RockerToggle,
  ApertureToggle
} from "@/design-system/components"
import { Check, Copy, Sparkles, BookOpen, Layers, Type, Move, Sliders } from "lucide-react"

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<"principles" | "tokens" | "components" | "patterns" | "voice">("principles")
  const [isDarkPreview, setIsDarkPreview] = useState(false)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedToken(label)
    setTimeout(() => setCopiedToken(null), 1500)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkPreview ? "dark bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"}`}>
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono text-xs font-bold">
              DS
            </span>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Eyimofe Design System</h1>
              <p className="text-xs text-neutral-500 font-mono">v1.0 · 8pt Grid Architecture · WCAG AAA</p>
            </div>
          </div>

          {/* Quick Preview Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-neutral-500 hidden sm:inline">Inspect Theme:</span>
            <ApertureToggle isDark={isDarkPreview} onToggle={() => setIsDarkPreview(!isDarkPreview)} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "principles", label: "1. Design Principles", icon: BookOpen },
            { id: "tokens", label: "2. Design Tokens", icon: Layers },
            { id: "components", label: "3. Component Library", icon: Sliders },
            { id: "patterns", label: "4. UX Patterns", icon: Move },
            { id: "voice", label: "5. Voice & Guidelines", icon: Type }
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-10 pb-32">
        {/* 1. DESIGN PRINCIPLES */}
        {activeTab === "principles" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <h2 className="text-2xl font-bold tracking-tight">Design Principles</h2>
              <p className="text-sm text-neutral-500 mt-1">The philosophy behind decisions — the &quot;why&quot; that guides tradeoffs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Notebook Over Productivity Dashboard",
                  desc: "The interface should feel tactile, grounded, and human—resembling a clean architect's notebook rather than an analytics dashboard."
                },
                {
                  title: "Clarity Over Cleverness",
                  desc: "Every control must have honest affordances and transparent states. We never bury navigation behind nested gestures or nebulous icons."
                },
                {
                  title: "Strict 8pt Spatial Rhythm",
                  desc: "Structure emerges from disciplined spacing and typography rhythm, not a chaotic grid of cards nested inside cards."
                },
                {
                  title: "Physics-Based Deceleration",
                  desc: "Motion must ease like physical mass and settle naturally. Strictly no rubbery bouncing or spring overshooting past its mark."
                },
                {
                  title: "Commitment to Hue & High Contrast",
                  desc: "Every palette clears WCAG AA/AAA. We celebrate deep monochromatic grayscale, oceanic navy, and alpine forest greens—never purple SaaS gradients."
                },
                {
                  title: "One Primary Action Per Screen",
                  desc: "Minimize user friction. Keep forms tight, common actions obvious, and destructive actions secondary."
                }
              ].map((p, idx) => (
                <div key={idx} className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
                  <span className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-600 uppercase">
                    Principle 0{idx + 1}
                  </span>
                  <h3 className="text-base font-semibold mt-1 mb-2">{p.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 2. DESIGN TOKENS */}
        {activeTab === "tokens" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            {/* Color Palettes */}
            <section className="space-y-4">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <h3 className="text-xl font-bold tracking-tight">1. Color System</h3>
                <p className="text-sm text-neutral-500">
                  Grayscale MVP baseline plus Navy fanatic, Forest green, Studio, and Swiss iron palettes (both light & dark).
                </p>
              </div>

              <div className="space-y-8">
                {Object.entries(COLOR_PALETTES).map(([key, pal]) => {
                  const mode = isDarkPreview ? pal.dark : pal.light
                  return (
                    <div key={key} className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                      <div className="flex items-baseline justify-between mb-2">
                        <h4 className="text-base font-semibold">{pal.name}</h4>
                        <span className="text-xs font-mono text-neutral-500 uppercase">{key}</span>
                      </div>
                      <p className="text-xs text-neutral-500 mb-4">{pal.description}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {Object.entries(mode).map(([role, hex]) => (
                          <div
                            key={role}
                            onClick={() => copyToClipboard(hex, `${key}-${role}`)}
                            className="group cursor-pointer p-2 rounded-xs border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
                          >
                            <div
                              className="w-full h-10 rounded-xs mb-2 border border-black/10 shadow-inner flex items-center justify-center"
                              style={{ backgroundColor: hex }}
                            >
                              {copiedToken === `${key}-${role}` && (
                                <Check className="w-4 h-4 text-white drop-shadow-md" />
                              )}
                            </div>
                            <p className="text-[11px] font-mono font-medium truncate">{role}</p>
                            <p className="text-[10px] font-mono text-neutral-400 uppercase">{hex}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Typography Scale */}
            <section className="space-y-4">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <h3 className="text-xl font-bold tracking-tight">2. Typography Scale</h3>
                <p className="text-sm text-neutral-500">
                  Disciplined scale prioritizing scannability and reading comfort over decorative flourishes.
                </p>
              </div>

              <div className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
                {Object.entries(TYPE_SCALE).map(([name, scale]) => (
                  <div key={name} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-4">
                    <div className="w-48 shrink-0">
                      <span className="font-mono text-xs font-bold uppercase">{name}</span>
                      <p className="text-[11px] font-mono text-neutral-400">
                        {scale.size} / {scale.lineHeight} ({scale.weight})
                      </p>
                    </div>
                    <div className="flex-1 overflow-hidden" style={{ fontSize: scale.size, lineHeight: scale.lineHeight, fontWeight: scale.weight }}>
                      Leading products from 0 to 1 with deliberate craft.
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8pt Spacing Grid */}
            <section className="space-y-4">
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <h3 className="text-xl font-bold tracking-tight">3. 8pt Spacing Grid Tokens</h3>
                <p className="text-sm text-neutral-500">All padding, margins, gaps, and heights follow strict 8pt increments.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {Object.entries(SPACING_TOKENS).map(([step, val]) => (
                  <div key={step} className="p-3 rounded-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col items-center">
                    <div
                      className="bg-neutral-900 dark:bg-neutral-100 mb-2 rounded-xs"
                      style={{ width: val === "0px" ? "2px" : val, height: "16px" }}
                    />
                    <span className="text-xs font-mono font-bold">space-{step}</span>
                    <span className="text-[11px] font-mono text-neutral-400">{val}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* 3. COMPONENT LIBRARY */}
        {activeTab === "components" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h2 className="text-2xl font-bold tracking-tight">Component Library</h2>
              <p className="text-sm text-neutral-500 mt-1">
                Defined states (default, hover, active, disabled) and creative theme toggles.
              </p>
            </div>

            {/* Buttons Matrix */}
            <section className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
              <h3 className="text-base font-semibold">Buttons & Interactive States</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="accent">Navy Accent</Button>
                <Button variant="forest">Forest Green</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </section>

            {/* Badges Matrix */}
            <section className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
              <h3 className="text-base font-semibold">Badges & Tags</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Grayscale Default</Badge>
                <Badge variant="navy">Product Strategy</Badge>
                <Badge variant="forest">FastAPI & Python</Badge>
                <Badge variant="yellow">Sprint Backlog</Badge>
                <Badge variant="impact" dot dotColor="#10B981">+38% Conversion Boost</Badge>
                <Badge variant="outline">TypeScript</Badge>
              </div>
            </section>

            {/* Creative Theme Toggles Showcase */}
            <section className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
              <div>
                <h3 className="text-base font-semibold">Creative Theme Toggles (5 Directions)</h3>
                <p className="text-xs text-neutral-500">
                  Each direction features a custom interactive theme mechanism matching its vibe.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center p-6 rounded-md bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500">1. Pull Desk Lamp</span>
                  <LampToggle isDark={isDarkPreview} onToggle={() => setIsDarkPreview(!isDarkPreview)} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500">2. Oceanic Horizon</span>
                  <HorizonToggle isDark={isDarkPreview} onToggle={() => setIsDarkPreview(!isDarkPreview)} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500">3. Nature Sunset/Lake</span>
                  <NatureToggle isDark={isDarkPreview} onToggle={() => setIsDarkPreview(!isDarkPreview)} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500">4. Industrial Rocker</span>
                  <RockerToggle isDark={isDarkPreview} onToggle={() => setIsDarkPreview(!isDarkPreview)} />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-neutral-500">5. Camera Aperture</span>
                  <ApertureToggle isDark={isDarkPreview} onToggle={() => setIsDarkPreview(!isDarkPreview)} />
                </div>
              </div>
            </section>

            {/* PM Sticky Notes */}
            <section className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-4">
              <div>
                <h3 className="text-base font-semibold">Tactile Sticky Notes (Draggable & Editable)</h3>
                <p className="text-xs text-neutral-500">Designed for PM review comments, roadmap annotations, and thought logs.</p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                <StickyNote
                  initialText="Hypothesis: Streamlined single-screen recipe bookmarking will triple 7-day retention."
                  author="Eyimofe (PM Spec)"
                  color="yellow"
                  isDraggable={false}
                />
                <StickyNote
                  initialText="Shipped Tsems MVP with offline SQLite syncing in 6 weeks."
                  author="Sprint Retrospective"
                  color="mint"
                  isDraggable={false}
                />
                <StickyNote
                  initialText="Reminder: Never ship purple gradients or glossy 3D SaaS blobs."
                  author="Design System Guardrail"
                  color="peach"
                  isDraggable={false}
                />
              </div>
            </section>
          </motion.div>
        )}

        {/* 4. UX PATTERNS */}
        {activeTab === "patterns" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h2 className="text-2xl font-bold tracking-tight">UX Patterns & Interaction Rules</h2>
              <p className="text-sm text-neutral-500 mt-1">Standard ways of handling common situations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                <h3 className="font-semibold text-base">Lists Over Complex Card Grids</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Prefer vertical scannable list rows over multi-nested cards. Lists are faster to scan, easier to extend, and respect vertical reading flow.
                </p>
              </div>

              <div className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                <h3 className="font-semibold text-base">In-Place Expansion vs. Modals</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Keep context intact. When a user explores a project or case study, expand accordion drawers in-line rather than throwing a jarring full-screen modal.
                </p>
              </div>

              <div className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                <h3 className="font-semibold text-base">Honest Empty States</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Empty states should encourage direct action without robotic placeholders. Always provide a clear next step.
                </p>
              </div>

              <div className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
                <h3 className="font-semibold text-base">Mobile-First Breakpoints</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  All interfaces scale gracefully from 360px portrait phones up to 4K ultrawide monitors without horizontal layout shifting.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. VOICE & CONTENT */}
        {activeTab === "voice" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h2 className="text-2xl font-bold tracking-tight">Content & Voice Guidelines</h2>
              <p className="text-sm text-neutral-500 mt-1">Tone of voice, terminology, and microcopy principles.</p>
            </div>

            <div className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
              <div>
                <h3 className="text-base font-semibold mb-2">Brand Attributes</h3>
                <div className="flex flex-wrap gap-2">
                  {["Friendly", "Relaxed", "Encouraging", "Personal", "Clean", "Simple", "Fast", "Slightly Playful (Never Childish)"].map((attr) => (
                    <span key={attr} className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold">Copy Comparison Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xs bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-300">
                    <span className="font-bold block mb-1">❌ AVOID (Robotic / SaaS Cliché):</span>
                    &quot;Welcome to my platform! Leveraging synergistic product-led growth to revolutionize 0-to-1 paradigms.&quot;
                  </div>
                  <div className="p-4 rounded-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-300">
                    <span className="font-bold block mb-1">✓ PREFER (Eyimofe Voice):</span>
                    &quot;Product Manager who codes for fun. I take ambiguous problems and turn them into crisp software people actually enjoy using.&quot;
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
