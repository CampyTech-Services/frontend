const articleDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const articleDateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function createLocalDate(value) {
  if (value instanceof Date) {
    return value;
  }

  if (!value) {
    return new Date();
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatArticleDate(value) {
  const date = createLocalDate(value);
  const hasTime = typeof value === "string" && /T\d{2}:\d{2}/.test(value);
  return (hasTime ? articleDateTimeFormatter : articleDateFormatter).format(
    date,
  );
}

export function formatFullDate(value = new Date()) {
  return fullDateFormatter.format(value);
}

export function formatViews(value) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(value >= 10_000 ? 0 : 1).replace(".0", "")}K`;
  }

  return `${value}`;
}
