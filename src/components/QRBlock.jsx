export default function QRBlock({ eventId, eventTitle }) {
  // SVG-based deterministic QR-like pattern
  const seed = [...eventTitle].reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xffffff, 0);
  const N = 9;
  const cells = Array.from({ length: N * N }, (_, i) => {
    const r = Math.floor(i / N), col = i % N;
    if ((r < 3 && col < 3) || (r < 3 && col >= N - 3) || (r >= N - 3 && col < 3)) return true;
    return ((seed >> (i % 23)) & 1) === 1;
  });
  const sz = 8;
  return (
    <svg width={N * sz + 16} height={N * sz + 16} style={{ background:"#fff", borderRadius:8, padding:8 }}>
      {cells.map((on, i) => on && (
        <rect key={i} x={(i % N) * sz} y={Math.floor(i / N) * sz} width={sz - 1} height={sz - 1} fill="#1a56db" rx={1} />
      ))}
    </svg>
  );
}
