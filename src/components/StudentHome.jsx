import { useState } from "react";
import { C, CAT_COLORS } from "../utils/constants";
import EventCard from "./EventCard";

export default function StudentHome({ user, events, isReg, setSelEvent, setPage, regs }) {
  const [cat, setCat]     = useState("All");
  const [search, setSrch] = useState("");
  const myCount = (regs[user.id] || []).length;
  const cats = ["All","Technical","Cultural","Workshop","Seminar","Sports","Creative"];

  const filtered = events.filter(e =>
    (cat === "All" || e.category === cat) &&
    (e.title.toLowerCase().includes(search.toLowerCase()) || e.organizer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }} className="anim">
      {/* Welcome banner */}
      <div style={{ background:`linear-gradient(120deg, ${C.blue} 0%, #3b82f6 60%, ${C.orange} 100%)`, borderRadius:18, padding:"28px 32px", marginBottom:28, color:"#fff", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-30, top:-30, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,.07)" }} />
        <div style={{ position:"absolute", right:80, bottom:-40, width:140, height:140, borderRadius:"50%", background:"rgba(249,115,22,.2)" }} />
        <div style={{ position:"relative", zIndex:1 }}>
          <p style={{ opacity:.85, fontSize:13, fontWeight:600, marginBottom:4 }}>👋 Welcome back,</p>
          <h1 style={{ fontSize:28, fontWeight:900, marginBottom:4 }}>{user.name} 🎉</h1>
          <p style={{ opacity:.8, fontSize:13 }}>{user.branch} · {user.year} Year · {user.rollNo || "IIIT Sonepat"}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
        {[
          { icon:"📅", label:"Total Events", val:events.length, accent:C.blue, bg:C.blueLt },
          { icon:"✅", label:"Registered", val:myCount, accent:C.green, bg:"#dcfce7" },
          { icon:"🔥", label:"Upcoming", val:events.filter(e=>e.status==="upcoming").length, accent:C.orange, bg:"#fff4ed" },
          { icon:"🏆", label:"Completed", val:events.filter(e=>e.status==="closed").length, accent:C.purple, bg:"#f3e8ff" },
        ].map(s => (
          <div key={s.label} className="hov-card" style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"18px 20px", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
            <div style={{ width:42, height:42, borderRadius:11, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontSize:28, fontWeight:900, color:s.accent }}>{s.val}</div>
            <div style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, flexWrap:"wrap" }}>
        <div style={{ position:"relative", flex:1, minWidth:200 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15 }}>🔍</span>
          <input value={search} onChange={e => setSrch(e.target.value)} placeholder="Search events, clubs..." style={{ width:"100%", paddingLeft:36, paddingRight:12, paddingTop:9, paddingBottom:9, border:`1.5px solid ${C.border}`, borderRadius:9, fontSize:13, color:C.text, background:C.white }} />
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {cats.map(c => {
            const col = CAT_COLORS[c] || { bg:C.blueLt, text:C.blue };
            return (
              <button key={c} onClick={() => setCat(c)} className="hov-btn" style={{ padding:"7px 15px", borderRadius:99, border:`1.5px solid ${cat === c ? col.text : C.border}`, background: cat === c ? col.bg : C.white, color: cat === c ? col.text : C.muted, fontSize:12, fontWeight: cat === c ? 800 : 600, cursor:"pointer" }}>{c}</button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:18 }}>
        {filtered.map(ev => (
          <EventCard key={ev.id} ev={ev} isReg={isReg(ev.id)} onClick={() => { setSelEvent(ev); setPage("detail"); }} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:"60px 20px", color:C.muted }}>
          <div style={{ fontSize:56 }}>🤷</div>
          <h3 style={{ marginTop:10 }}>No events found!</h3>
          <p style={{ fontSize:13 }}>Try a different category or search term.</p>
        </div>
      )}
    </div>
  );
}
