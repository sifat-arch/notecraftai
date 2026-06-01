import { useState } from "react";

function FlashcardComponent({ card }: { card: { q: string; a: string } }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-24 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateX(180deg)]" : ""}`}
      >
        {/* সামনের পার্ট (প্রশ্ন) */}
        <div className="absolute inset-0 bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm [backface-visibility:hidden]">
          <p className="text-sm font-semibold text-slate-800 pr-4">
            <span className="text-indigo-600 font-bold">Q:</span> {card.q}
          </p>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full whitespace-nowrap">
            Click to Reveal
          </span>
        </div>

        {/* পেছনের পার্ট (উত্তর) */}
        <div className="absolute inset-0 bg-indigo-600 border border-indigo-700 rounded-xl p-4 flex items-center text-white [transform:rotateX(180deg)] [backface-visibility:hidden] shadow-inner">
          <p className="text-sm font-medium">
            <span className="text-yellow-300 font-bold">A:</span> {card.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FlashcardComponent;
