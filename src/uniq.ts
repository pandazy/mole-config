export default function uniq(list: string[]): string[] {
  return Array.from(new Set(list));
}
