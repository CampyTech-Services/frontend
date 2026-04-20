function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightedText({ text = "", query, markClassName = "" }) {
  const normalizedQuery = query?.trim();

  if (!normalizedQuery || normalizedQuery.length < 2) {
    return text;
  }

  const pattern = new RegExp(`(${escapeRegExp(normalizedQuery)})`, "ig");
  const parts = text.split(pattern);
  const normalizedMatch = normalizedQuery.toLowerCase();

  return parts.map((part, index) => {
    const key = `${part}-${index}`;

    if (part.toLowerCase() === normalizedMatch) {
      return (
        <mark
          key={key}
          className={`rounded-md bg-amber-200/80 px-1 py-0 text-current ${markClassName}`.trim()}
        >
          {part}
        </mark>
      );
    }

    return <span key={key}>{part}</span>;
  });
}
