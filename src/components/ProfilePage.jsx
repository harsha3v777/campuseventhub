import { C } from "../utils/constants";
import Badge from "./Badge";

export default function ProfilePage({ user, regs, events }) {
  const myCount = (regs[user.id] || []).length;
  const myEvents = events.filter(e => (regs[user.id] || []).includes(e.id));

  return (
    <div style={{ maxWidth:620, margin:"0 auto", padding:"28px 24px" }} className="anim">
      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:18, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
        <div style={{ background:`linear-gradient(120deg, ${C.blue} 0%, #3b82f6 100%)`, padding:"40px 32px", textAlign:"center", color:"#fff" }}>
          <div style={{ width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,.2)", border:"3px solid rgba(255,255,255,.5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, fontWeight:900, margin:"0 auto 14px" }}>{user.name[0]}</div>
          <h2 style={{ fontSize:22, fontWeight:900, marginBottom:4 }}>{user.name}</h2>
          <p style={{ opacity:.8, fontSize:13, marginBottom:10 }}>{user.email}</p>
          <span style={{ background:"rgba(255,255,255,.2)", fontSize:12, fontWeight:800, padding:"4px 16px", borderRadius:99, backdropFilter:"blur(6px)" }}>
            {user.role === "admin" ? "👑 Admin" : "🎓 Student"}
          </span>
        </div>

        <div style={{ padding:"24px 28px" }}>
          {user.role !== "admin" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
              {[["🏫 Branch",user.branch||"—"],["📚 Year",user.year||"—"],["🎫 Roll No",user.rollNo||"—"]].map(([k,v]) => (
                <div key={k} style={{ background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:11, padding:"14px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:11, color:C.muted, fontWeight:700, marginBottom:4 }}>{k}</div>
                  <div style={{ fontWeight:900, fontSize:14 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ background:C.blueLt, border:`1.5px solid #bfdbfe`, borderRadius:11, padding:"18px", textAlign:"center" }}>
              <div style={{ fontSize:30, fontWeight:900, color:C.blue }}>{myCount}</div>
              <div style={{ fontSize:12, color:C.blue, fontWeight:700 }}>Events Registered</div>
            </div>
            <div style={{ background:"#dcfce7", border:`1.5px solid #86efac`, borderRadius:11, padding:"18px", textAlign:"center" }}>
              <div style={{ fontSize:30, fontWeight:900, color:C.green }}>{myEvents.filter(e=>e.status==="upcoming").length}</div>
              <div style={{ fontSize:12, color:C.green, fontWeight:700 }}>Upcoming Events</div>
            </div>
          </div>

          {myEvents.length > 0 && (
            <div style={{ marginTop:20 }}>
              <h3 style={{ fontSize:14, fontWeight:800, marginBottom:12 }}>🎟️ Your Upcoming Events</h3>
              {myEvents.filter(e=>e.status==="upcoming").map(ev => (
                <div key={ev.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:10, marginBottom:8 }}>
                  <span style={{ fontSize:20 }}>{ev.image}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:13 }}>{ev.title}</div>
                    <div style={{ fontSize:11, color:C.muted }}>📅 {ev.date} · 📍 {ev.venue}</div>
                  </div>
                  <Badge cat={ev.category} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
