import { C, CAT_COLORS } from "../utils/constants";
import Badge from "./Badge";
import ProgressBar from "./ProgressBar";
import QRBlock from "./QRBlock";

export default function EventDetail({ event, isReg, doReg, doUnreg, setPage, qrOpen, setQrOpen }) {
  const reg  = isReg(event.id);
  const full = event.registered >= event.maxSeats;
  const cc   = CAT_COLORS[event.category] || CAT_COLORS.Technical;

  return (
    <div style={{ maxWidth:800, margin:"0 auto", padding:"28px 24px" }} className="anim">
      <button className="hov-btn" onClick={() => setPage("home")} style={{ background:C.white, border:`1.5px solid ${C.border}`, color:C.muted, padding:"7px 16px", borderRadius:9, fontSize:13, fontWeight:700, marginBottom:20, cursor:"pointer" }}>← Back to Events</button>

      <div style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:18, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg, ${cc.bg} 0%, ${cc.bg}66 100%)`, padding:"40px 32px", textAlign:"center", borderBottom:`1.5px solid ${C.border}` }}>
          <div style={{ width:80, height:80, borderRadius:20, background:C.white, boxShadow:"0 4px 18px rgba(0,0,0,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:40, margin:"0 auto 16px" }}>{event.image}</div>
          <h1 style={{ fontSize:24, fontWeight:900, marginBottom:10, color:C.text }}>{event.title}</h1>
          <div style={{ display:"flex", justifyContent:"center", gap:8 }}>
            <Badge cat={event.category} />
            {reg && <span style={{ background:"#dcfce7", color:C.green, fontSize:11, fontWeight:800, padding:"3px 12px", borderRadius:99 }}>✅ You're Registered!</span>}
          </div>
        </div>

        <div style={{ padding:"28px 32px" }}>
          {/* Info grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:24 }}>
            {[["📅 Date",event.date],["⏰ Time",event.time],["📍 Venue",event.venue],["🏢 Organizer",event.organizer]].map(([k,v]) => (
              <div key={k} style={{ background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:11, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:C.muted, fontWeight:700, marginBottom:4 }}>{k}</div>
                <div style={{ fontSize:14, fontWeight:800, color:C.text }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom:22 }}>
            <h3 style={{ fontSize:15, fontWeight:800, marginBottom:8 }}>📝 About this Event</h3>
            <p style={{ color:C.muted, lineHeight:1.75, fontSize:14 }}>{event.description}</p>
          </div>

          <div style={{ marginBottom:24 }}>
            <h3 style={{ fontSize:14, fontWeight:800, marginBottom:10 }}>🪑 Seat Availability</h3>
            <ProgressBar val={event.registered} max={event.maxSeats} color={cc.text} />
          </div>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {event.status === "closed"
              ? <div style={{ padding:"11px 24px", background:"#f3f4f6", borderRadius:9, color:C.muted, fontWeight:700, fontSize:14 }}>Registration Closed</div>
              : reg ? <>
                  <button className="hov-btn" onClick={() => setQrOpen(qrOpen === event.id ? null : event.id)} style={{ padding:"11px 22px", background:C.blueLt, border:`1.5px solid ${C.blue}`, borderRadius:9, color:C.blue, fontWeight:800, fontSize:14, cursor:"pointer" }}>
                    📱 {qrOpen === event.id ? "Hide" : "Show"} QR Ticket
                  </button>
                  <button className="hov-btn" onClick={() => doUnreg(event.id)} style={{ padding:"11px 22px", background:"#fef2f2", border:`1.5px solid #fca5a5`, borderRadius:9, color:C.red, fontWeight:800, fontSize:14, cursor:"pointer" }}>
                    Cancel Registration
                  </button>
                </>
              : full
                ? <div style={{ padding:"11px 24px", background:"#fef2f2", borderRadius:9, color:C.red, fontWeight:700, fontSize:14 }}>😔 Sorry, Event is Full!</div>
                : <button className="hov-btn" onClick={() => doReg(event.id)} style={{ padding:"11px 32px", background:C.blue, border:"none", borderRadius:9, color:"#fff", fontWeight:900, fontSize:15, cursor:"pointer", letterSpacing:.3 }}>Register Now →</button>
            }
          </div>

          {qrOpen === event.id && reg && (
            <div style={{ marginTop:22, background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:14, padding:"22px", display:"flex", alignItems:"center", gap:22 }}>
              <QRBlock eventId={event.id} eventTitle={event.title} />
              <div>
                <div style={{ fontWeight:900, fontSize:16, marginBottom:8, color:C.blue }}>🎟️ Your Entry Ticket</div>
                <div style={{ fontSize:13, color:C.muted, lineHeight:2 }}>
                  <b>Event:</b> {event.title}<br />
                  <b>Date:</b> {event.date} at {event.time}<br />
                  <b>Venue:</b> {event.venue}<br />
                  <span style={{ color:C.green, fontWeight:700 }}>Status: ✅ Confirmed</span>
                </div>
                <div style={{ marginTop:8, fontSize:10, color:"#94a3b8", background:C.white, border:`1px solid ${C.border}`, padding:"5px 10px", borderRadius:7, display:"inline-block", fontFamily:"monospace" }}>
                  ID: IIITS-EVT{event.id}-{Date.now().toString(36).toUpperCase()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
