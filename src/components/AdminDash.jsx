import { useState } from "react";
import { C, CAT_COLORS } from "../utils/constants";
import Badge from "./Badge";

export default function AdminDash({ events, setEvents, users, regs, toast$ }) {
  const [tab, setTab]       = useState("overview");
  const [editEv, setEditEv] = useState(null);
  const [f, setF]           = useState({ title:"", category:"Technical", date:"", time:"10:00 AM", venue:"", description:"", organizer:"CSE Club", maxSeats:100, image:"🎯", tags:"" });
  const upd = e => setF({ ...f, [e.target.name]: e.target.value });

  const save = () => {
    if (!f.title || !f.date || !f.venue || !f.description) { toast$("Fill all required fields!", "error"); return; }
    const ev = { ...f, maxSeats:Number(f.maxSeats), tags:f.tags.split(",").map(t=>t.trim()).filter(Boolean), registered: editEv ? editEv.registered : 0, status:"upcoming", id: editEv ? editEv.id : Date.now() };
    setEvents(p => editEv ? p.map(e => e.id === editEv.id ? ev : e) : [...p, ev]);
    toast$(editEv ? "✅ Event updated!" : "🎉 Event created!", "success");
    setEditEv(null); setTab("events");
    setF({ title:"", category:"Technical", date:"", time:"10:00 AM", venue:"", description:"", organizer:"CSE Club", maxSeats:100, image:"🎯", tags:"" });
  };

  const del = id => { setEvents(p => p.filter(e => e.id !== id)); toast$("🗑️ Event deleted.", "info"); };
  const toggleStatus = id => { setEvents(p => p.map(e => e.id === id ? { ...e, status: e.status === "upcoming" ? "closed" : "upcoming" } : e)); toast$("Status updated!", "info"); };

  const startEdit = ev => { setEditEv(ev); setF({ ...ev, tags: ev.tags.join(", ") }); setTab("form"); };

  const inp = { width:"100%", padding:"10px 13px", border:`1.5px solid ${C.border}`, borderRadius:9, fontSize:13, color:C.text, background:C.white, marginBottom:13 };
  const TABS = [["overview","📊 Overview"],["events","📋 Events"],["form","➕ Create"],["attendees","👥 Attendees"]];

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }} className="anim">
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:900, marginBottom:2 }}>🛠️ Admin Dashboard</h1>
          <p style={{ color:C.muted, fontSize:13 }}>Manage all IIIT Sonepat events from here</p>
        </div>
        <button className="hov-btn" onClick={() => { setEditEv(null); setF({ title:"", category:"Technical", date:"", time:"10:00 AM", venue:"", description:"", organizer:"CSE Club", maxSeats:100, image:"🎯", tags:"" }); setTab("form"); }} style={{ padding:"10px 22px", background:C.blue, border:"none", borderRadius:10, color:"#fff", fontWeight:900, fontSize:14, cursor:"pointer" }}>+ New Event</button>
      </div>

      {/* Tab strip */}
      <div style={{ display:"flex", gap:4, marginBottom:24, background:C.white, padding:4, borderRadius:12, border:`1.5px solid ${C.border}`, width:"fit-content", boxShadow:"0 2px 6px rgba(0,0,0,.04)" }}>
        {TABS.map(([t,label]) => (
          <button key={t} onClick={() => setTab(t)} className="hov-btn" style={{ padding:"7px 18px", borderRadius:9, border:"none", background: tab === t ? C.blue : "transparent", color: tab === t ? "#fff" : C.muted, fontWeight: tab === t ? 800 : 600, fontSize:13, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>{label}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:28 }}>
            {[
              { ic:"📅", lb:"Total Events", val:events.length, accent:C.blue, bg:C.blueLt },
              { ic:"👥", lb:"Total Registrations", val:events.reduce((a,e)=>a+e.registered,0), accent:C.green, bg:"#dcfce7" },
              { ic:"👤", lb:"Students", val:users.filter(u=>u.role==="student").length, accent:C.orange, bg:"#fff4ed" },
              { ic:"✅", lb:"Active Events", val:events.filter(e=>e.status==="upcoming").length, accent:C.purple, bg:"#f3e8ff" },
            ].map(s => (
              <div key={s.lb} className="hov-card" style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"20px", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
                <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:10 }}>{s.ic}</div>
                <div style={{ fontSize:28, fontWeight:900, color:s.accent }}>{s.val}</div>
                <div style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{s.lb}</div>
              </div>
            ))}
          </div>

          <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"22px", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
            <h3 style={{ marginBottom:18, fontSize:15, fontWeight:800 }}>📈 Registration Overview</h3>
            {events.map(ev => {
              const pct = Math.min(100, Math.round((ev.registered / ev.maxSeats) * 100));
              const cc = CAT_COLORS[ev.category] || CAT_COLORS.Technical;
              return (
                <div key={ev.id} style={{ marginBottom:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13 }}>
                      <span>{ev.image}</span>
                      <span style={{ fontWeight:700 }}>{ev.title}</span>
                      <Badge cat={ev.category} />
                    </div>
                    <span style={{ fontSize:12, color:C.muted, fontWeight:600 }}>{ev.registered}/{ev.maxSeats}</span>
                  </div>
                  <div style={{ height:7, background:"#e2e8f0", borderRadius:99 }}>
                    <div style={{ width:`${pct}%`, height:"100%", background:cc.text, borderRadius:99, transition:"width .5s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Events list */}
      {tab === "events" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {events.map(ev => {
            const cc = CAT_COLORS[ev.category] || CAT_COLORS.Technical;
            return (
              <div key={ev.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"16px 20px", display:"flex", gap:16, alignItems:"center", boxShadow:"0 2px 6px rgba(0,0,0,.04)" }}>
                <div style={{ width:56, height:56, borderRadius:14, background:cc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{ev.image}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                    <span style={{ fontWeight:800 }}>{ev.title}</span>
                    <Badge cat={ev.category} />
                    <span style={{ fontSize:10, padding:"2px 9px", borderRadius:99, background: ev.status === "upcoming" ? "#dcfce7" : "#f3f4f6", color: ev.status === "upcoming" ? C.green : C.muted, fontWeight:700 }}>{ev.status}</span>
                  </div>
                  <div style={{ fontSize:12, color:C.muted }}>📅 {ev.date} · 📍 {ev.venue} · 👥 {ev.registered}/{ev.maxSeats} seats</div>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="hov-btn" onClick={() => startEdit(ev)} style={{ padding:"7px 14px", background:C.blueLt, border:`1.5px solid ${C.blue}`, borderRadius:8, color:C.blue, fontWeight:800, fontSize:12, cursor:"pointer" }}>✏️ Edit</button>
                  <button className="hov-btn" onClick={() => toggleStatus(ev.id)} style={{ padding:"7px 14px", background:"#fff4ed", border:`1.5px solid #fed7aa`, borderRadius:8, color:C.orange, fontWeight:800, fontSize:12, cursor:"pointer" }}>
                    {ev.status === "upcoming" ? "🔒 Close" : "🔓 Open"}
                  </button>
                  <button className="hov-btn" onClick={() => del(ev.id)} style={{ padding:"7px 14px", background:"#fef2f2", border:`1.5px solid #fca5a5`, borderRadius:8, color:C.red, fontWeight:800, fontSize:12, cursor:"pointer" }}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit form */}
      {tab === "form" && (
        <div style={{ maxWidth:640 }}>
          <h3 style={{ fontSize:18, fontWeight:900, marginBottom:20 }}>{editEv ? "✏️ Edit Event" : "➕ Create New Event"}</h3>
          <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:16, padding:"26px", boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 14px" }}>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Event Title *</label>
                <input style={inp} name="title" placeholder="e.g. TechFest Hackathon 2025" value={f.title} onChange={upd} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Category</label>
                <select style={inp} name="category" value={f.category} onChange={upd}>
                  {["Technical","Cultural","Workshop","Seminar","Sports","Creative"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Emoji Icon</label>
                <select style={inp} name="image" value={f.image} onChange={upd}>
                  {["💻","🎭","🔌","🚀","🏏","📷","🎯","🎨","📚","🏆","🎵","🌟","⚽","🔬","🎪"].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Date *</label>
                <input style={inp} name="date" type="date" value={f.date} onChange={upd} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Time</label>
                <input style={inp} name="time" placeholder="10:00 AM" value={f.time} onChange={upd} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Venue *</label>
                <input style={inp} name="venue" placeholder="e.g. Main Auditorium, IIIT Sonepat" value={f.venue} onChange={upd} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Organizer</label>
                <input style={inp} name="organizer" placeholder="e.g. CSE Department" value={f.organizer} onChange={upd} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Description *</label>
                <textarea style={{ ...inp, height:90, resize:"vertical" }} name="description" placeholder="Tell students what this event is about..." value={f.description} onChange={upd} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Max Seats</label>
                <input style={inp} name="maxSeats" type="number" min="1" value={f.maxSeats} onChange={upd} />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.muted, display:"block", marginBottom:4 }}>Tags (comma separated)</label>
                <input style={inp} name="tags" placeholder="e.g. Coding, Prize, Certificate" value={f.tags} onChange={upd} />
              </div>
            </div>
            <div style={{ display:"flex", gap:10, marginTop:4 }}>
              <button className="hov-btn" onClick={save} style={{ flex:1, padding:11, background:C.blue, border:"none", borderRadius:9, color:"#fff", fontWeight:900, fontSize:15, cursor:"pointer" }}>
                {editEv ? "💾 Update Event" : "🚀 Create Event"}
              </button>
              {editEv && <button className="hov-btn" onClick={() => { setEditEv(null); setTab("events"); }} style={{ padding:"11px 20px", background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:9, color:C.muted, fontWeight:700, fontSize:14, cursor:"pointer" }}>Cancel</button>}
            </div>
          </div>
        </div>
      )}

      {/* Attendees */}
      {tab === "attendees" && (
        <div>
          <h3 style={{ fontSize:16, fontWeight:900, marginBottom:16 }}>👥 Attendees per Event</h3>
          {events.map(ev => {
            const regStudents = Object.entries(regs).filter(([,ids]) => ids.includes(ev.id)).map(([uid]) => parseInt(uid));
            const cc = CAT_COLORS[ev.category] || CAT_COLORS.Technical;
            return (
              <div key={ev.id} style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"18px 20px", marginBottom:14, boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: regStudents.length ? 14 : 0 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:cc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>{ev.image}</div>
                  <div style={{ flex:1 }}>
                    <span style={{ fontWeight:800 }}>{ev.title}</span>
                    <Badge cat={ev.category} />
                  </div>
                  <span style={{ background:C.blueLt, color:C.blue, fontWeight:800, fontSize:12, padding:"4px 12px", borderRadius:99 }}>{regStudents.length} registered</span>
                </div>
                {regStudents.length > 0
                  ? <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {regStudents.map(uid => {
                        const u = users.find(u => u.id === uid);
                        return u ? (
                          <div key={uid} style={{ background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"8px 13px", fontSize:12 }}>
                            <div style={{ fontWeight:800 }}>{u.name}</div>
                            <div style={{ color:C.muted }}>{u.rollNo || u.email}</div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  : <div style={{ fontSize:12, color:C.muted, fontStyle:"italic" }}>No registrations yet.</div>
                }
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
