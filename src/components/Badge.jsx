import { CAT_COLORS } from "../utils/constants";

export default function Badge({ cat }) {
  const c = CAT_COLORS[cat] || CAT_COLORS.Technical;
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display:"inline-flex", alignItems:"center", gap:4 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:c.dot, display:"inline-block" }} />
      {cat}
    </span>
  );
}
