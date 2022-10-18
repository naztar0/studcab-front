export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function utfChar(s: string) {
  return (s.codePointAt(0) || 0) >= 0xD800 ? s[0] + s[1] : s[0].toUpperCase();
}

export function colorChar(s: string, saturation = 50, level = 48) {
  let lt = s[0];
  if (!lt) return '';
  lt = utfChar(lt);
  return `hsl(${((lt.charCodeAt(0) - 65) * 360) / 26}deg, ${saturation}%, ${level}%)`;
}

export function yearToSemester(year: number, prev = false): number {
  return year ? year * 2 - (new Date().getMonth() > 8 ? 1 : 0)
    - (prev && yearToSemester(year) > 1 ? 1 : 0) : 0;
}

export function calculationFormat(s: string) {
  return s.replace(/\*/g, ' × ').replace(/\[/g, '(').replace(/]/g, ')');
}
