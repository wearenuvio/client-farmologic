import React from 'react';
const labelStyle={fontFamily:'var(--font-body)',fontWeight:600,fontSize:11,letterSpacing:'.18em',textTransform:'uppercase',color:'var(--forest)',display:'block',marginBottom:8};
const fieldStyle=(onDark)=>({fontFamily:'var(--font-body)',fontSize:15,padding:'13px 16px',width:'100%',boxSizing:'border-box',borderRadius:'var(--radius-sm)',outline:'none',background:onDark?'rgba(246,244,238,.06)':'#FFFFFF',border:onDark?'1px solid rgba(246,244,238,.25)':'1px solid var(--hairline)',color:onDark?'var(--ivory)':'var(--charcoal)'});
export function Input({label,onDark=false,style,...rest}){
return <label style={{display:'block'}}>{label&&<span style={{...labelStyle,color:onDark?'var(--leaf-light)':'var(--forest)'}}>{label}</span>}
<input style={{...fieldStyle(onDark),...style}} onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor=onDark?'rgba(246,244,238,.25)':'var(--hairline)'} {...rest} /></label>;
}
export function Textarea({label,onDark=false,rows=4,style,...rest}){
return <label style={{display:'block'}}>{label&&<span style={{...labelStyle,color:onDark?'var(--leaf-light)':'var(--forest)'}}>{label}</span>}
<textarea rows={rows} style={{...fieldStyle(onDark),resize:'vertical',...style}} onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor=onDark?'rgba(246,244,238,.25)':'var(--hairline)'} {...rest} /></label>;
}
export function Select({label,options=[],onDark=false,style,...rest}){
return <label style={{display:'block'}}>{label&&<span style={{...labelStyle,color:onDark?'var(--leaf-light)':'var(--forest)'}}>{label}</span>}
<select style={{...fieldStyle(onDark),appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23C8A24A' stroke-width='1.5'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'right 16px center',...style}} {...rest}>
{options.map(o=><option key={o} value={o} style={{color:'var(--charcoal)'}}>{o}</option>)}</select></label>;
}
export function Checkbox({label,onDark=false,style,...rest}){
return <label style={{display:'flex',alignItems:'center',gap:10,fontFamily:'var(--font-body)',fontSize:14,color:onDark?'var(--ivory)':'var(--charcoal)',cursor:'pointer',...style}}>
<input type="checkbox" style={{width:16,height:16,accentColor:'#1E3D2B',margin:0}} {...rest} />{label}</label>;
}
