export function AuthDivider({ text = "OR" }: { text?: string }) {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-line" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-surface px-3 text-fg-muted font-medium uppercase tracking-wider">
          {text}
        </span>
      </div>
    </div>
  );
}