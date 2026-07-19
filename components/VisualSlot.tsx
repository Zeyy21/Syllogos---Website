/**
 * Placeholder for a real product screenshot that doesn't exist yet.
 * Marked with a subtle dashed frame so it's clearly a slot.
 */
export default function VisualSlot({
  label = "Screenshot placeholder",
  ratio = "aspect-[16/10]",
  className = "",
}: {
  label?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden rounded-[1.25rem] acrylic ${className}`}
    >
      <div className="absolute inset-2.5 rounded-[0.85rem] border border-dashed border-[rgb(var(--border)/0.16)]" />
      <div className="relative flex h-full w-full items-center justify-center p-6">
        <span className="text-center text-[0.72rem] font-medium uppercase tracking-[0.14em] text-text-tertiary">
          {label}
        </span>
      </div>
    </div>
  );
}
