import React,{useState} from 'react';
export function Button({variant='primary',size='md',children,style,...rest}){
const [hov,setHov]=useState(false),[act,setAct]=useState(false);
const pad=size==='sm'?'10px 20px':size==='lg'?'18px 40px':'14px 32px';
const fs=size==='sm'?11:12;
const base={fontFamily:'var(--font-body)',fontWeight:600,fontSize:fs,letterSpacing:'.18em',textTransform:'uppercase',padding:pad,border:'1px solid transparent',borderRadius:'var(--radius-sm)',cursor:'pointer',transition:'all var(--dur-fast) var(--ease-out)',transform:act?'translateY(1px)':hov?'translateY(-1px)':'none',display:'inline-block'};
const variants={
primary:{background:hov?'#26492F':'var(--forest)',color:'var(--ivory)'},
gold:{background:hov?'#D4B05C':'var(--gold)',color:'var(--forest)'},
outline:{background:hov?'var(--mist)':'transparent',color:'var(--forest)',borderColor:'var(--forest)'},
'outline-dark':{background:hov?'rgba(246,244,238,.08)':'transparent',color:'var(--ivory)',borderColor:'rgba(246,244,238,.4)'},
ghost:{background:'transparent',color:'var(--forest)',textDecoration:hov?'underline':'none',textUnderlineOffset:6,padding:'6px 2px'}};
return <button style={{...base,...variants[variant],...style}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setAct(false)}} onMouseDown={()=>setAct(true)} onMouseUp={()=>setAct(false)} {...rest}>{children}</button>;
}
