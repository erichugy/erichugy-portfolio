import { type CapturedRequest } from "./types";

const REDACTED_VALUE = "[REDACTED]";

const SENSITIVE_KEYWORDS = [
  "apikey",
  "cookie",
  "credential",
  "jwt",
  "oidc",
  "password",
  "secret",
  "session",
  "signature",
  "token",
] as const;

const INLINE_SECRET_PATTERNS = [
  /\b(Bearer|Basic)\s+[A-Za-z0-9\-._~+/]+=*/gi,
  /((?:^|[?&;, ])(?:access[_-]?token|refresh[_-]?token|id[_-]?token|token|sig|signature|api[_-]?key|client[_-]?secret)=)([^&;, ]+)/gi,
  /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9._-]+\.[A-Za-z0-9._-]+\b/g,
];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeKey(key: string): string {
  return key.trim().toLowerCase();
}

function isSensitiveKey(key: string): boolean {
  const normalized = normalizeKey(key);
  const compacted = normalized.replaceAll(/[^a-z0-9]/g, "");

  if (
    normalized === "authorization"
    || normalized === "proxy-authorization"
    || normalized === "cookie"
    || normalized === "set-cookie"
  ) {
    return true;
  }

  return SENSITIVE_KEYWORDS.some((keyword) => compacted.includes(keyword));
}

function maybeParseJson(value: string): unknown {
  const trimmed = value.trim();
  if (
    !(trimmed.startsWith("{") && trimmed.endsWith("}"))
    && !(trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    return null;
  }

  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return null;
  }
}

function redactString(value: string): string {
  const parsed = maybeParseJson(value);
  if (parsed !== null) {
    return JSON.stringify(redactUnknown(parsed));
  }

  let redacted = value;

  redacted = redacted.replaceAll(
    INLINE_SECRET_PATTERNS[0],
    (_match, scheme: string) => `${scheme} ${REDACTED_VALUE}`,
  );
  redacted = redacted.replaceAll(
    INLINE_SECRET_PATTERNS[1],
    (_match, prefix: string) => `${prefix}${REDACTED_VALUE}`,
  );
  redacted = redacted.replaceAll(INLINE_SECRET_PATTERNS[2], REDACTED_VALUE);

  return redacted;
}

export function redactUnknown(value: unknown): unknown {
  if (typeof value === "string") {
    return redactString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => redactUnknown(item));
  }

  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [
        key,
        isSensitiveKey(key) ? REDACTED_VALUE : redactUnknown(entryValue),
      ]),
    );
  }

  return value;
}

export function redactStringRecord(
  record: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      isSensitiveKey(key) ? REDACTED_VALUE : redactString(value),
    ]),
  );
}

export function redactCapturedRequest(
  request: CapturedRequest,
): CapturedRequest {
  return {
    ...request,
    query: redactStringRecord(request.query),
    headers: redactStringRecord(request.headers),
    body: redactUnknown(request.body),
  };
}
