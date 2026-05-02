import { C } from "../utils/constants";

export default function ProgressBar({ val, max, color = C.blue }) {
  const pct = Math.min(100, Math.round((val / max) * 100));
  const barColor = pct >= 90 ? C.red : pct >= 70 ? C.orange : color;
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:C.muted, marginBottom:4 }}>
        <span>{val}/{max} seats</span>
        <span style={{ color: barColor, fontWeight:600 }}>{pct}%</span>
      </div>
      <div style={{ height:6, background:"#e2e8f0", borderRadius:99, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", background: barColor, borderRadius:99, transition:"width .6s ease" }} />
      </div>
    </div>
  );
}
