// SCREEN 1: Landing / Home
// Converted from the Stitch export. Changes made from the raw HTML:
//   - class -> className
//   - inline style="..." strings -> style={{ ... }} objects
//   - self-closing tags (img, br) get the trailing slash
//   - the wax-seal button's onClick is wired to onSummon (was href="#")

export default function Potion({ onSummon, onNavigate, streak, onOpenModal, username, onLogout, onGoToLogin }) {
  return (
    <div className="parchment-bg text-on-background font-body-lg min-h-screen relative overflow-hidden flex flex-col justify-center">
      <nav className="relative z-50 w-full px-margin-mobile md:px-margin-desktop py-6 flex items-center justify-between border-b border-[#4a2e1b]/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="font-display-lg text-2xl text-[#4a2e1b] font-bold tracking-wider md:text-5xl">Life's Potion</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-label-caps tracking-widest text-sm text-[#4a2e1b] text-body-lg">
          <button type="button" className="hover:text-[#4a2e1b] transition-colors bg-transparent" onClick={() => onNavigate('grimoire')}>My Grimoire</button>
          <button type="button" className="hover:text-[#4a2e1b] transition-colors bg-transparent" onClick={() => onNavigate('archives')}>Archives</button>
          <button type="button" className="hover:text-[#4a2e1b] transition-colors bg-transparent" onClick={() => onNavigate('suggestion')}>Apothecary</button>
          {username ? (
            <button type="button" className="hover:text-[#4a2e1b] transition-colors bg-transparent" onClick={onLogout}>
              {username} · Log Out
            </button>
          ) : (
            <button type="button" className="hover:text-[#4a2e1b] transition-colors bg-transparent" onClick={onGoToLogin}>
              Log In
            </button>
          )}
        </div>
        <button className="md:hidden text-[#4a2e1b]">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </nav>

      {/* Paper Grain & Burnt Edges Overlay */}
      <div className="absolute inset-0 z-0 burnt-edges"></div>
      <div className="absolute inset-0 z-0 paper-grain"></div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full px-margin-mobile md:px-margin-desktop py-gutter">
        <div className="flex flex-col items-center max-w-xl mx-auto text-center space-y-12 relative">
          <div className="absolute -left-32 top-10 w-64 h-64 opacity-85 float-delayed z-0 drop-shadow-lg">
            <div
              className="absolute top-2 left-1/2 w-10 h-3 bg-[#e0d6c1] -translate-x-1/2 rotate-[-5deg] opacity-80 shadow-sm z-10"
              style={{ border: '1px solid rgba(0,0,0,0.1)' }}
            ></div>
            <svg viewBox="0 0 200 200" className="w-full h-full rotate-[-8deg] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="notePaper" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f7ecd0" />
                  <stop offset="100%" stopColor="#e8d5a8" />
                </linearGradient>
              </defs>
              <rect x="28" y="16" width="144" height="166" rx="3" fill="url(#notePaper)" stroke="#8b6b3f" strokeWidth="2" />
              <rect x="28" y="16" width="144" height="166" rx="3" fill="none" stroke="#c5a05e" strokeWidth="0.75" opacity="0.5" transform="translate(4,4) scale(0.96)" />
              {/* Handwritten-style scribble lines, varied lengths for realism */}
              <path d="M42 48 C 60 46, 90 50, 110 47" stroke="#6b4a2b" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
              <path d="M42 66 C 65 64, 100 68, 148 65" stroke="#6b4a2b" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
              <path d="M42 84 C 58 82, 85 86, 130 83" stroke="#6b4a2b" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
              <path d="M42 102 C 70 100, 95 104, 142 101" stroke="#6b4a2b" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
              <path d="M42 120 C 55 118, 75 122, 108 119" stroke="#6b4a2b" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
              {/* A small sketched vial doodle in the corner */}
              <path d="M138 130 L146 130 L149 150 C 149 158, 135 158, 135 150 Z" fill="none" stroke="#8b6b3f" strokeWidth="1.5" opacity="0.6" />
              <path d="M140 148 C 142 152, 144 152, 144 148" fill="#a8631f" opacity="0.5" />
              {/* Underline flourish */}
              <path d="M50 158 C 75 150, 100 165, 130 154" stroke="#6b4a2b" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute -right-40 bottom-10 w-80 h-80 opacity-70 float-slow z-0">
            <svg viewBox="0 0 200 200" className="w-full h-full rotate-[12deg] drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="sageLeaf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#93a875" />
                  <stop offset="100%" stopColor="#5f7247" />
                </linearGradient>
              </defs>
              {/* Stem */}
              <path d="M100 190 L100 60" stroke="#4f5f3a" strokeWidth="3" opacity="0.7" strokeLinecap="round" />
              {/* Leaf pairs, layered largest to smallest going up */}
              {[
                { y: 175, w: 40, h: 22 },
                { y: 150, w: 36, h: 20 },
                { y: 126, w: 32, h: 18 },
                { y: 102, w: 26, h: 15 },
                { y: 80, w: 20, h: 12 },
              ].map((leaf, i) => (
                <g key={i}>
                  <path
                    d={`M100 ${leaf.y} C ${100 - leaf.w} ${leaf.y - leaf.h / 2}, ${100 - leaf.w} ${leaf.y + leaf.h / 2}, 100 ${leaf.y}`}
                    fill="url(#sageLeaf)"
                    opacity="0.85"
                  />
                  <path
                    d={`M100 ${leaf.y} C ${100 + leaf.w} ${leaf.y - leaf.h / 2}, ${100 + leaf.w} ${leaf.y + leaf.h / 2}, 100 ${leaf.y}`}
                    fill="url(#sageLeaf)"
                    opacity="0.85"
                  />
                  <line x1={100 - leaf.w + 4} y1={leaf.y} x2={100 + leaf.w - 4} y2={leaf.y} stroke="#4f5f3a" strokeWidth="0.75" opacity="0.4" />
                </g>
              ))}
              <circle cx="100" cy="58" r="4" fill="#5f7247" opacity="0.8" />
            </svg>
          </div>

          {/* Sparkles & Dust */}
          <div className="absolute -top-10 left-10 w-2 h-2 rounded-full bg-tertiary-fixed blur-[2px] animate-[twinkle_12s_infinite]"></div>
          <div className="absolute top-1/4 right-0 w-3 h-3 rounded-full bg-[#ffea99] blur-[3px] animate-[twinkle_15s_infinite] float-delayed"></div>
          <div className="absolute bottom-1/4 left-0 w-1.5 h-1.5 rounded-full bg-white blur-[2px] animate-[twinkle_10s_infinite] float-slow z-30"></div>
          <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-tertiary-fixed blur-[2px] animate-[twinkle_14s_infinite]"></div>

          <h1 className="font-display-lg text-display-lg-mobile md:text-5xl text-[#4a2e1b] glow-text tracking-wide z-20">
            Life's Potion
          </h1>
          {streak > 0 && (
            <p className="font-label-caps text-label-caps text-[#8a6825] tracking-widest uppercase z-20">
              🔥 {streak} day{streak === 1 ? '' : 's'} in a row
            </p>
          )}
          <p className="font-body-lg text-[#5c4033] italic max-w-md mx-auto opacity-90 z-20">
            Where ancient wisdom meets the modern soul. Seek your essence, brew your truth, and discover the magic written in the stars.
          </p>

          <div className="relative w-80 h-96 md:w-[28rem] md:h-[32rem] float-animation z-20 flex items-center justify-center">
            <div
              className="absolute -left-12 top-16 w-28 h-36 bg-[#f1e4c3] rotate-[-20deg] shadow-xl border border-[#c2a878]/50 p-3 z-0 font-quote-main text-sm text-[#4a2e1b] opacity-85"
              style={{ boxShadow: 'inset 0 0 15px rgba(92,64,51,0.2)' }}
            >
              <p className="opacity-70 leading-tight">3 drops of<br />moon dew...</p>
            </div>

            <div
              className="absolute -right-10 bottom-24 w-24 h-28 bg-[#e8dcb8] rotate-[25deg] shadow-lg border border-[#c2a878]/50 p-2 z-0 font-quote-main text-xs text-[#4a2e1b] opacity-80"
              style={{ boxShadow: 'inset 0 0 10px rgba(92,64,51,0.3)' }}
            >
              <p className="opacity-70">Stir well.</p>
            </div>

            <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-64 h-12 bg-[#2c1a0e]/40 blur-2xl rounded-full z-10"></div>

            <div className="w-full h-full blend-mask z-20 flex items-center justify-center">
              <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="potionLiquid" x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0%" stopColor="#f0c25f" />
                    <stop offset="45%" stopColor="#d4922e" />
                    <stop offset="100%" stopColor="#8a4f14" />
                  </linearGradient>
                  <radialGradient id="liquidGlow" cx="35%" cy="25%" r="70%">
                    <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="0.2">
                    <stop offset="0%" stopColor="#fff8ea" stopOpacity="0.5" />
                    <stop offset="45%" stopColor="#c9b183" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#7a5c34" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="corkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8a6238" />
                    <stop offset="100%" stopColor="#5c3f22" />
                  </linearGradient>
                  <radialGradient id="vignette" cx="50%" cy="40%" r="60%">
                    <stop offset="60%" stopColor="#000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
                  </radialGradient>
                </defs>

                {/* Soft ambient shadow beneath the bottle, inside the art itself */}
                <ellipse cx="100" cy="280" rx="55" ry="10" fill="#2c1a0e" opacity="0.25" />

                {/* Cork + wax drip */}
                <path d="M84 6 L116 6 L120 16 L80 16 Z" fill="url(#corkGrad)" />
                <rect x="84" y="16" width="32" height="24" rx="3" fill="url(#corkGrad)" stroke="#3f2a15" strokeWidth="1" />
                <path d="M82 38 C 82 46, 90 50, 100 50 C 110 50, 118 46, 118 38 L114 40 C 112 45, 105 47, 100 47 C 95 47, 88 45, 86 40 Z" fill="#7a1f1f" opacity="0.85" />

                {/* Bottle neck */}
                <path d="M87 40 L113 40 L120 82 L80 82 Z" fill="url(#glassBody)" stroke="#5c4326" strokeWidth="2.5" />

                {/* Bottle body — rounder, more apothecary-flask silhouette */}
                <path
                  d="M80 82
                     C 54 108, 30 132, 26 172
                     C 21 222, 48 268, 100 280
                     C 152 268, 179 222, 174 172
                     C 170 132, 146 108, 120 82 Z"
                  fill="url(#glassBody)"
                  stroke="#5c4326"
                  strokeWidth="3"
                />

                {/* Liquid fill, with its own gentle meniscus curve */}
                <path
                  d="M32 175
                     C 28 218, 52 258, 100 268
                     C 148 258, 172 218, 168 175
                     C 155 182, 130 187, 100 187
                     C 70 187, 45 182, 32 175 Z"
                  fill="url(#potionLiquid)"
                />
                <path
                  d="M32 175
                     C 28 218, 52 258, 100 268
                     C 148 258, 172 218, 168 175
                     C 155 182, 130 187, 100 187
                     C 70 187, 45 182, 32 175 Z"
                  fill="url(#liquidGlow)"
                />

                {/* Rising bubbles */}
                <circle cx="85" cy="240" r="3.5" fill="#ffe6a0" opacity="0.75" />
                <circle cx="118" cy="255" r="2.5" fill="#ffe6a0" opacity="0.65" />
                <circle cx="100" cy="215" r="2" fill="#ffe6a0" opacity="0.55" />
                <circle cx="70" cy="205" r="1.8" fill="#ffe6a0" opacity="0.5" />

                {/* Label, slightly curved wax-sealed parchment */}
                <ellipse cx="100" cy="205" rx="38" ry="24" fill="#f4e9cd" opacity="0.95" stroke="#8b6b3f" strokeWidth="1.5" />
                <ellipse cx="100" cy="205" rx="33" ry="19" fill="none" stroke="#c5a05e" strokeWidth="0.75" opacity="0.6" />
                <text x="100" y="201" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fill="#4a2e1b" fontStyle="italic">Life's</text>
                <text x="100" y="213" textAnchor="middle" fontFamily="Georgia, serif" fontSize="10" fill="#4a2e1b" fontStyle="italic">Potion</text>

                {/* Glass highlight streaks */}
                <path d="M48 120 C 38 150, 34 185, 42 220" stroke="#fff" strokeWidth="5" opacity="0.3" fill="none" strokeLinecap="round" />
                <path d="M60 100 C 52 115, 48 130, 50 145" stroke="#fff" strokeWidth="2.5" opacity="0.25" fill="none" strokeLinecap="round" />

                {/* Overall vignette to unify tones */}
                <rect x="0" y="0" width="200" height="300" fill="url(#vignette)" />
              </svg>
            </div>
          </div>

          {/* Wax Seal Button — this is the real "click the potion" trigger */}
          <button
            onClick={onSummon}
            className="group relative inline-flex items-center justify-center w-40 h-40 bg-[#b55c52] text-[#ffdad6] font-label-caps text-label-caps shadow-2xl hover:shadow-[0_0_40px_rgba(181,92,82,0.7)] transition-all duration-500 ease-out hover:scale-105 z-30 border-[6px] border-[#8a3830]/80 overflow-hidden"
            style={{ borderRadius: '46% 54% 42% 58% / 55% 45% 58% 42%' }}
          >
            <span
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/50 pointer-events-none"
              style={{ borderRadius: 'inherit' }}
            ></span>
            <div
              className="absolute inset-3 border-2 border-[#ffdad6]/30 opacity-40"
              style={{ borderRadius: '51% 49% 53% 47% / 48% 54% 45% 52%' }}
            ></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-overlay"></div>
            <span className="relative z-10 text-center tracking-[0.2em] px-6 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
              Drink to Begin
            </span>
          </button>
        </div>

        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#2c1a0e]/50 to-transparent pointer-events-none z-0"></div>
      </main>

      <footer className="relative z-50 w-full px-margin-mobile md:px-margin-desktop py-8 border-t border-[#4a2e1b]/10 bg-white/5 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-label-caps text-xs tracking-widest text-[#4a2e1b] font-bold text-sm">© 1894 Life's Potion Apothecary</p>
          <div className="flex flex-wrap justify-center gap-6 font-label-caps text-[10px] tracking-widest text-sm text-[#4a2e1b]">
            <button type="button" className="hover:text-[#4a2e1b] transition-colors text-xs text-[#4a2e1b] font-bold bg-transparent" onClick={() => onOpenModal('oath')}>The Alchemist's Oath</button>
            <button type="button" className="hover:text-[#4a2e1b] transition-colors text-xs text-[#4a2e1b] font-bold bg-transparent" onClick={() => onOpenModal('recipes')}>Secret Recipes</button>
            <button type="button" className="hover:text-[#4a2e1b] transition-colors text-xs text-[#4a2e1b] font-bold bg-transparent" onClick={() => onOpenModal('terms')}>Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
