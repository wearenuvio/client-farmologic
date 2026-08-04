import React,{useState} from 'react';
export function Card({children,goldFrame=false,hover=false,style}){
const [hov,setHov]=useState(false);
return <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:'var(--surface-card)',border:'1px solid var(--hairline)',borderRadius:'var(--radius-sm)',boxShadow:hover&&hov?'var(--shadow-lift)':'var(--shadow-card)',transform:hover&&hov?'translateY(-2px)':'none',transition:'all var(--dur-fast) var(--ease-out)',padding:'var(--space-6)',position:'relative',...style}}>
{goldFrame&&<div style={{position:'absolute',inset:12,border:'1px solid var(--border-gold)',pointerEvents:'none'}}></div>}
{children}</div>;
}
export function GlassCard({children,style}){
return <div style={{background:'var(--glass-bg)',border:'1px solid var(--glass-border)',borderRadius:'var(--radius-md)',backdropFilter:'blur(var(--glass-blur))',WebkitBackdropFilter:'blur(var(--glass-blur))',padding:'var(--space-5)',color:'var(--ivory)',...style}}>{children}</div>;
}
