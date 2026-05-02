import { useState } from "react";
import { C } from "./utils/constants";
import { SEED_EVENTS, SEED_USERS } from "./data/seedData";

import Toast        from "./components/Toast";
import Navbar       from "./components/Navbar";
import AuthPage     from "./components/AuthPage";
import StudentHome  from "./components/StudentHome";
import EventDetail  from "./components/EventDetail";
import MyEvents     from "./components/MyEvents";
import ProfilePage  from "./components/ProfilePage";
import AdminDash    from "./components/AdminDash";

export default function App() {
  const [page, setPage]         = useState("login");
  const [user, setUser]         = useState(null);
  const [events, setEvents]     = useState(SEED_EVENTS);
  const [users, setUsers]       = useState(SEED_USERS);
  const [regs, setRegs]         = useState({ 2: [1, 3] });
  const [selEvent, setSelEvent] = useState(null);
  const [toast, setToast]       = useState(null);
  const [qrOpen, setQrOpen]     = useState(null);

  const toast$ = (msg, type = "success") => setToast({ msg, type });
  const isReg  = (eid) => (regs[user?.id] || []).includes(eid);

  const doRegister = (eid) => {
    setRegs(p => ({ ...p, [user.id]: [...(p[user.id] || []), eid] }));
    setEvents(p => p.map(e => e.id === eid ? { ...e, registered: e.registered + 1 } : e));
    toast$("✅ Registered successfully! See you there!", "success");
  };
  const doUnregister = (eid) => {
    setRegs(p => ({ ...p, [user.id]: (p[user.id] || []).filter(id => id !== eid) }));
    setEvents(p => p.map(e => e.id === eid ? { ...e, registered: e.registered - 1 } : e));
    toast$("Cancelled registration.", "info");
  };
  const logout = () => { setUser(null); setPage("login"); toast$("Logged out. Come back soon! 👋", "info"); };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Nunito', 'Segoe UI', sans-serif", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:#f0f4ff; }
        ::-webkit-scrollbar-thumb { background:#bfcfe8; border-radius:4px; }
        @keyframes popUp { from { transform:translateY(12px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        @keyframes fadeSlide { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        .hov-card { transition:box-shadow .2s,transform .2s; }
        .hov-card:hover { box-shadow:0 8px 28px rgba(26,86,219,.13); transform:translateY(-3px); }
        .hov-btn { transition:opacity .15s, transform .12s; cursor:pointer; }
        .hov-btn:hover { opacity:.88; }
        .hov-btn:active { transform:scale(.96); }
        input,select,textarea { outline:none; font-family:'Nunito',sans-serif; }
        .pill { border-radius:99px; }
        .anim { animation: fadeSlide .35s ease; }
      `}</style>

      {!user
        ? <AuthPage users={users} setUsers={setUsers} setUser={setUser} setPage={setPage} toast$={toast$} />
        : <>
            <Navbar user={user} page={page} setPage={setPage} logout={logout} />
            <div style={{ paddingTop:64 }}>
              {page === "home"    && user.role === "student" && <StudentHome user={user} events={events} isReg={isReg} setSelEvent={setSelEvent} setPage={setPage} regs={regs} />}
              {page === "detail"  && selEvent && <EventDetail event={selEvent} isReg={isReg} doReg={doRegister} doUnreg={doUnregister} setPage={setPage} qrOpen={qrOpen} setQrOpen={setQrOpen} />}
              {page === "myevts"  && <MyEvents user={user} events={events} regs={regs} isReg={isReg} doUnreg={doUnregister} setSelEvent={setSelEvent} setPage={setPage} setQrOpen={setQrOpen} />}
              {page === "profile" && <ProfilePage user={user} regs={regs} events={events} />}
              {page === "admin"   && user.role === "admin" && <AdminDash events={events} setEvents={setEvents} users={users} regs={regs} toast$={toast$} />}
            </div>
          </>
      }

      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
