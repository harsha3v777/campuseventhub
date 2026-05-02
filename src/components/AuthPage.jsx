import { useState } from "react";
import { C } from "../utils/constants";

export default function AuthPage({ users, setUsers, setUser, setPage, toast$ }) {
  const [mode, setMode]   = useState("login");
  const [err, setErr]     = useState("");
  const [loading, setLd]  = useState(false);
  const [f, setF]         = useState({ name:"", email:"", password:"", branch:"CSE", year:"1st", rollNo:"" });
  const upd = e => setF({ ...f, [e.target.name]: e.target.value });

  const submit = () => {
    setErr(""); setLd(true);
    setTimeout(() => {
      setLd(false);
      if (mode === "login") {
        const u = users.find(u => u.email === f.email && u.password === f.password);
        if (u) { setUser(u); setPage(u.role === "admin" ? "admin" : "home"); toast$(`Welcome back, ${u.name.split(" ")[0]}! 👋`); }
        else setErr("Wrong email or password. Try the hint below 😅");
      } else {
        if (!f.name || !f.email || !f.password || !f.rollNo) { setErr("Please fill all the fields!"); return; }
        if (users.find(u => u.email === f.email)) { setErr("This email is already registered!"); return; }
        const nu = { id: users.length + 1, ...f, role:"student" };
        setUsers(p => [...p, nu]); setUser(nu); setPage("home");
        toast$(`Account created! Welcome to IIIT-S EventHub 🎉`);
      }
    }, 700);
  };

  const inp = { width:"100%", padding:"10px 14px", border:`1.5px solid ${C.border}`, borderRadius:9, fontSize:14, color:C.text, background:C.white, marginBottom:13 };

  return (
    <div style={{ minHeight:"100vh", display:"flex" }}>
      {/* Left side – branding */}
      <div style={{ flex:1, background:`linear-gradient(145deg, ${C.blue} 0%, ${C.blueDk} 60%, #0a2a7a 100%)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, position:"relative", overflow:"hidden" }}>
        {/* decorative circles */}
        <div style={{ position:"absolute", top:-80, right:-80, width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
        <div style={{ position:"absolute", bottom:-60, left:-60, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,.05)" }} />
        <div style={{ position:"absolute", top:"40%", left:-40, width:150, height:150, borderRadius:"50%", background:"rgba(249,115,22,.12)" }} />

        <div style={{ textAlign:"center", zIndex:1, color:"#fff" }}>
          <div style={{ fontSize:60, marginBottom:12 }}>🎓</div>
          <div style={{ fontSize:11, letterSpacing:3, opacity:.75, marginBottom:6, fontWeight:700 }}>IIIT SONEPAT</div>
          <h1 style={{ fontSize:34, fontWeight:900, marginBottom:6, letterSpacing:-.5 }}>EventHub</h1>
          <p style={{ opacity:.75, fontSize:14, marginBottom:36 }}>Student Event Management Portal</p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, maxWidth:280, margin:"0 auto 32px" }}>
            {[["📅","Events","6+"],["👥","Students","1.2k+"],["🏆","Years","5th"],["⭐","Rating","4.8"]].map(([ic,lb,v]) => (
              <div key={lb} style={{ background:"rgba(255,255,255,.12)", borderRadius:12, padding:"14px 10px", textAlign:"center", backdropFilter:"blur(6px)" }}>
                <div style={{ fontSize:22 }}>{ic}</div>
                <div style={{ fontSize:20, fontWeight:800 }}>{v}</div>
                <div style={{ fontSize:11, opacity:.75 }}>{lb}</div>
              </div>
            ))}
          </div>

          <div style={{ background:"rgba(255,255,255,.1)", borderRadius:10, padding:"12px 16px", fontSize:12, opacity:.85, backdropFilter:"blur(6px)", textAlign:"left" }}>
            <div style={{ fontWeight:700, marginBottom:4 }}>🔑 Quick Login Hints</div>
            <div>Admin: admin@iiitsonepat.ac.in / admin123</div>
            <div>Student: arjun@iiitsonepat.ac.in / student123</div>
          </div>
        </div>
      </div>

      {/* Right side – form */}
      <div style={{ width:420, background:C.white, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:40, boxShadow:"-4px 0 24px rgba(0,0,0,.06)" }}>
        <div style={{ width:"100%", maxWidth:340 }}>
          <img src="https://iiitsonepat.ac.in/wp-content/uploads/2021/07/logo.png" alt="IIIT-S" onError={e => { e.target.style.display = "none"; }} style={{ height:48, marginBottom:20 }} />
          <h2 style={{ fontSize:22, fontWeight:800, marginBottom:2 }}>
            {mode === "login" ? "Sign In 👋" : "Create Account 🚀"}
          </h2>
          <p style={{ color:C.muted, fontSize:13, marginBottom:24 }}>
            {mode === "login" ? "Access your IIIT-S event portal" : "Join the IIIT Sonepat EventHub"}
          </p>

          {mode === "signup" && <input style={inp} name="name" placeholder="Full Name" value={f.name} onChange={upd} />}
          <input style={inp} name="email" placeholder="College Email (@iiitsonepat.ac.in)" value={f.email} onChange={upd} type="email" />
          <input style={inp} name="password" placeholder="Password" value={f.password} onChange={upd} type="password" />
          {mode === "signup" && <>
            <input style={inp} name="rollNo" placeholder="Roll Number (e.g. 22CSE042)" value={f.rollNo} onChange={upd} />
            <div style={{ display:"flex", gap:10, marginBottom:13 }}>
              <select style={{ ...inp, marginBottom:0, flex:1 }} name="branch" value={f.branch} onChange={upd}>
                {["CSE","ECE","ME","CE","EEE","IT"].map(b => <option key={b}>{b}</option>)}
              </select>
              <select style={{ ...inp, marginBottom:0, flex:1 }} name="year" value={f.year} onChange={upd}>
                {["1st","2nd","3rd","4th"].map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </>}

          {err && <div style={{ background:"#fef2f2", border:`1px solid #fca5a5`, borderRadius:8, padding:"9px 13px", color:C.red, fontSize:12, marginBottom:12 }}>{err}</div>}

          <button className="hov-btn" onClick={submit} style={{ width:"100%", padding:11, background: loading ? "#93b4f7" : C.blue, border:"none", borderRadius:9, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", marginBottom:14, letterSpacing:.3 }}>
            {loading ? "⏳ Loading..." : mode === "login" ? "Login to Portal →" : "Create My Account →"}
          </button>

          <div style={{ textAlign:"center", fontSize:13, color:C.muted }}>
            {mode === "login" ? "Don't have an account? " : "Already registered? "}
            <span onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(""); }} style={{ color:C.blue, fontWeight:700, cursor:"pointer" }}>
              {mode === "login" ? "Register here" : "Login"}
            </span>
          </div>

          <div style={{ marginTop:28, padding:"10px 14px", background:C.blueLt, borderRadius:9, fontSize:11, color:C.blue, textAlign:"center", fontWeight:600 }}>
            🏫 IIIT Sonepat — Rajiv Gandhi Education City, Kundli, Haryana
          </div>
        </div>
      </div>
    </div>
  );
}
