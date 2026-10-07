/**
 * Zero-dependency classnames combiner
 */
export type ClassValue = string | number | boolean | undefined | null;

export function cx(...values: ClassValue[]): string {
  return values
    .filter((val): val is string | number => typeof val === "string" ? val.trim().length > 0 : typeof val === "number")
    .map(String)
    .join(" ");
}
