// Shared modal for the footer links that don't have full screens of their
// own (Alchemist's Oath, Secret Recipes, Terms of Service). Not from a
// Stitch export — a simple overlay styled to match the journal-card look.

const CONTENT = {
  oath: {
    title: "The Alchemist's Oath",
    body: "I promise to seek wisdom in small, quiet moments — in the space between a busy morning and the next task, in the pause before sleep. I promise to return to this apothecary whenever the world feels a little too heavy, and to let its potions remind me that feeling is not the same as drowning. I promise to share what I find here with kindness, never to hoard it, and never to mistake a single quote for the whole of anyone's story — mine included. Above all, I promise to keep brewing, even on the days the shelf looks empty.",
  },
  recipes: {
    title: 'Secret Recipes',
    body: "Every quote in this apothecary is brewed the same quiet way: a measure of hope, a measure of honesty, and just enough silence left between the words for you to pour in your own meaning. Nothing here is meant to hand you an answer — only a starting point, a small push in a kinder direction. Some potions lean sweet, meant for gentler days; others are bitter on purpose, meant to wake something up. Whichever one the potion pours for you, it was mixed with care, and it's yours to keep — save it to your Grimoire, and it'll be waiting for you the next time you need it.",
  },
  terms: {
    title: 'Terms of Service',
    body: "This is a personal project built for learning and for daily use — not a commercial product. Your account is used only to save your favorite quotes and suggestions. Don't submit anything you wouldn't want read by the apothecary (that's me, the site's creator).",
  },
}

export default function InfoModal({ type, onClose }) {
  if (!type || !CONTENT[type]) return null
  const { title, body } = CONTENT[type]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-margin-mobile"
      onClick={onClose}
    >
      <div
        className="journal-card max-w-md w-full p-8 relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4a3f35] opacity-60 hover:opacity-100"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="font-headline-md text-headline-md text-primary mb-4">{title}</h2>
        <p className="font-body-sm text-body-sm text-[#4a3f35] leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
