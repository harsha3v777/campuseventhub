import { useEffect } from "react";

export default function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const bg = { success:"#16a34a", error:"#dc2626", info:"#2563eb" }[type] || "#333";
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, background:bg, color:"#fff", padding:"13px 20px", borderRadius:10, fontSize:13, fontWeight:600, boxShadow:"0 4px 20px rgba(0,0,0,0.18)", animation:"popUp .25s ease", maxWidth:320, fontFamily:"'Nunito', sans-serif" }}>
      {msg}
    </div>
  );
}
