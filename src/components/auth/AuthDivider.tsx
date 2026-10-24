// Two lines with the label between them (no background "mask" behind the text,
// so the dotted page background stays intact).
export function AuthDivider({ text = "OR" }: { text?: string }) {
  return (
    <div className="my-5 flex items-center gap-3" role="separator" aria-label={text}>
      <div className="h-px flex-1 bg-line" />
      <span className="text-xs font-medium uppercase tracking-wider text-fg-muted">
        {text}
      </span>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
