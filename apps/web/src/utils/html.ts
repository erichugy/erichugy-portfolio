export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const JSON_TOKEN_RE =
  /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

export function syntaxHighlightJson(obj: unknown): string {
  const json = JSON.stringify(obj, null, 2);
  if (json === undefined) {
    return escapeHtml(String(obj));
  }
  // Run regex on raw JSON so quoted strings still match, then escape each segment
  return json.replace(JSON_TOKEN_RE, (match) => {
    let cls = "rb-json-number";
    if (match.startsWith('"')) {
      cls = match.endsWith(":") ? "rb-json-key" : "rb-json-string";
    } else if (/true|false/.test(match)) {
      cls = "rb-json-boolean";
    } else if (match === "null") {
      cls = "rb-json-null";
    }
    return `<span class="${cls}">${escapeHtml(match)}</span>`;
  });
}
