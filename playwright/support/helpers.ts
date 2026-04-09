export function generateOrderCode() {
    const prefix = 'VLO'

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomPart = ''

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        randomPart += chars[randomIndex]
    }

    return `${prefix}-${randomPart}`
}
export function generateCpf(): string {
  const mod = (dividendo: number, divisor: number) => Math.round(dividendo - Math.floor(dividendo / divisor) * divisor);
  const rnd = (n: number) => Math.round(Math.random() * n);

  const n = 9;
  const n1 = rnd(n);
  const n2 = rnd(n);
  const n3 = rnd(n);
  const n4 = rnd(n);
  const n5 = rnd(n);
  const n6 = rnd(n);
  const n7 = rnd(n);
  const n8 = rnd(n);
  const n9 = rnd(n);

  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}
