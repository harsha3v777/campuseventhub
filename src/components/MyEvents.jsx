import { C, CAT_COLORS } from "../utils/constants";
import Badge from "./Badge";

export default function MyEvents({ user, events, regs, isReg, doUnreg, setSelEvent, setPage, setQrOpen }) {
  const myIds    = regs[user.id] || [];
  const myEvents = events.filter(e => myIds.includes(e.id));

  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"28px 24px" }} className="anim">
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:24, fontWeight:900 }}>📋 My Registered Events</h1>
        <p style={{ color:C.muted, fontSize:14, marginTop:4 }}>You've registered for <b>{myEvents.length}</b> event(s)</p>
      </div>

      {myEvents.length === 0
        ? <div style={{ textAlign:"center", padding:"70px 20px", color:C.muted, background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16 }}>
            <div style={{ fontSize:56 }}>📭</div>
            <h3 style={{ margin:"12px 0 6px" }}>No events yet!</h3>
            <p style={{ fontSize:13 }}>Go explore and register for something fun!</p>
            <button className="hov-btn" onClick={() => setPage("home")} style={{ marginTop:16, padding:"10px 24px", background:C.blue, border:"none", borderRadius:9, color:"#fff", fontWeight:800, fontSize:14, cursor:"pointer" }}>Browse Events →</button>
          </div>
        : <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {myEvents.map(ev => {
              const cc = CAT_COLORS[ev.category] || CAT_COLORS.Technical;
              return (
                <div key={ev.id} className="hov-card" style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"18px 20px", display:"flex", gap:16, alignItems:"center", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
                  <div style={{ width:60, height:60, borderRadius:14, background:cc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{ev.image}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                      <span style={{ fontWeight:800, fontSize:15 }}>{ev.title}</span>
                      <Badge cat={ev.category} />
                    </div>
                    <div style={{ fontSize:12, color:C.muted }}>📅 {ev.date} &nbsp;·&nbsp; ⏰ {ev.time} &nbsp;·&nbsp; 📍 {ev.venue}</div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="hov-btn" onClick={() => { setSelEvent(ev); setQrOpen(ev.id); setPage("detail"); }} style={{ padding:"7px 13px", background:C.blueLt, border:`1.5px solid ${C.blue}`, borderRadius:8, color:C.blue, fontWeight:800, fontSize:12, cursor:"pointer" }}>📱 QR</button>
                    <button className="hov-btn" onClick={() => { setSelEvent(ev); setPage("detail"); }} style={{ padding:"7px 13px", background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:8, color:C.muted, fontWeight:700, fontSize:12, cursor:"pointer" }}>Details</button>
                    <button className="hov-btn" onClick={() => doUnreg(ev.id)} style={{ padding:"7px 13px", background:"#fef2f2", border:`1.5px solid #fca5a5`, borderRadius:8, color:C.red, fontWeight:700, fontSize:12, cursor:"pointer" }}>Cancel</button>
                  </div>
                </div>
              );
            })}
          </div>
      }
    </div>
  );
}
