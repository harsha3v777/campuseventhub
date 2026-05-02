import { C, CAT_COLORS } from "../utils/constants";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";

export default function EventCard({ ev, isReg, onClick }) {
  const cc = CAT_COLORS[ev.category] || CAT_COLORS.Technical;
  const full = ev.registered >= ev.maxSeats;

  return (
    <div className="hov-card" onClick={onClick} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, overflow:"hidden", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,.05)" }}>
      {/* Top color strip + emoji */}
      <div style={{ background:`linear-gradient(135deg, ${cc.bg} 0%, ${cc.bg}88 100%)`, padding:"22px 20px 18px", display:"flex", alignItems:"center", gap:14, borderBottom:`1.5px solid ${C.border}` }}>
        <div style={{ width:56, height:56, borderRadius:14, background:C.white, boxShadow:"0 2px 10px rgba(0,0,0,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{ev.image}</div>
        <div>
          <Badge cat={ev.category} />
          {isReg && <span style={{ marginLeft:6, fontSize:10, background:"#dcfce7", color:C.green, fontWeight:800, padding:"3px 8px", borderRadius:99 }}>✅ Registered</span>}
          {ev.status === "closed" && <span style={{ marginLeft:6, fontSize:10, background:"#f3f4f6", color:C.muted, fontWeight:700, padding:"3px 8px", borderRadius:99 }}>Closed</span>}
        </div>
      </div>

      <div style={{ padding:"16px 18px" }}>
        <h3 style={{ fontSize:15, fontWeight:800, marginBottom:6, color:C.text, lineHeight:1.3 }}>{ev.title}</h3>
        <p style={{ fontSize:12, color:C.muted, marginBottom:12, lineHeight:1.6 }}>{ev.description.slice(0, 85)}...</p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:12 }}>
          {[["📅",ev.date],["⏰",ev.time],["📍",ev.venue],["🏢",ev.organizer]].map(([ic,val]) => (
            <div key={ic} style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, color:C.muted }}>
              <span>{ic}</span><span style={{ fontWeight:600, color:C.text }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:12 }}>
          <ProgressBar val={ev.registered} max={ev.maxSeats} color={cc.text} />
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
            {ev.tags.slice(0,2).map(t => <span key={t} style={{ fontSize:10, padding:"2px 7px", background:C.soft, border:`1px solid ${C.border}`, borderRadius:99, color:C.muted, fontWeight:600 }}>#{t}</span>)}
          </div>
          <span style={{ fontSize:11, fontWeight:800, color: ev.status === "closed" ? C.muted : isReg ? C.green : full ? C.red : C.blue }}>
            {ev.status === "closed" ? "Closed" : isReg ? "View Ticket →" : full ? "House Full 😔" : "Register →"}
          </span>
        </div>
      </div>
    </div>
  );
}
