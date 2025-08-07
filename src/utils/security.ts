export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .replace(/script/gi, '')
    .replace(/['"]/g, '')
    .replace(/--/g, '')
    .replace(/;/g, '')
    .replace(/\\/g, '')
    .trim();
}

export function sanitizeNumber(input: string): number {
  const cleaned = input.replace(/[^\d.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}