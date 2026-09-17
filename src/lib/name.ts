/** First word of the About full name (e.g. Hero greeting). */
export function getDisplayFirstName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) return "Developer";
  return trimmed.split(/\s+/)[0] ?? trimmed;
}

/** URL/file-safe slug from the About name. */
export function getNameSlug(fullName: string) {
  return getDisplayFirstName(fullName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}
