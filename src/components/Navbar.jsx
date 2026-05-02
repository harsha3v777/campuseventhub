import { C } from "../utils/constants";

export default function Navbar({ user, page, setPage, logout }) {
  const links = user.role === "admin"
    ? [["admin","🛠️ Admin"],["profile","👤 Profile"]]
    : [["home","🏠 Home"],["myevts","📋 My Events"],["profile","👤 Me"]];

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:C.white, borderBottom:`2px solid ${C.blue}`, boxShadow:"0 2px 12px rgba(26,86,219,.08)", height:64, display:"flex", alignItems:"center", padding:"0 28px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"flex", alignItems:"center", gap:12 }}>
        {/* Logo */}
        <div onClick={() => setPage(user.role === "admin" ? "admin" : "home")} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", flex:1 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🎓</div>
          <div>
            <div style={{ fontWeight:900, fontSize:16, color:C.blue, lineHeight:1 }}>EventHub</div>
            <div style={{ fontSize:9, color:C.muted, fontWeight:600, letterSpacing:1 }}>IIIT SONEPAT</div>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
          {links.map(([p, label]) => (
            <button key={p} onClick={() => setPage(p)} className="hov-btn" style={{ padding:"6px 14px", borderRadius:8, border:"none", background: page === p ? C.blueLt : "transparent", color: page === p ? C.blue : C.muted, fontWeight: page === p ? 800 : 600, fontSize:13, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}>
              {label}
            </button>
          ))}
        </div>

        {/* User chip */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, background:C.soft, border:`1.5px solid ${C.border}`, borderRadius:99, padding:"4px 14px 4px 6px" }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background: user.role === "admin" ? C.purple : C.blue, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>{user.name[0]}</div>
            <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{user.name.split(" ")[0]}</span>
            {user.role === "admin" && <span style={{ background:"#f3e8ff", color:C.purple, fontSize:9, fontWeight:800, padding:"2px 7px", borderRadius:99 }}>ADMIN</span>}
          </div>
          <button className="hov-btn" onClick={logout} style={{ padding:"6px 14px", borderRadius:8, border:`1.5px solid #fca5a5`, background:"#fef2f2", color:C.red, fontSize:12, fontWeight:800, cursor:"pointer" }}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
