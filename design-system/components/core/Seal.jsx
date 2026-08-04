import React from 'react';
export function Seal({label='LAB-VERIFIED',sub='THE FARMOLOGIC STANDARD',size=110,onDark=false,style}){
const c=onDark?'var(--gold)':'var(--gold)';
const txt=onDark?'var(--ivory)':'var(--forest)';
return <div style={{width:size,height:size,borderRadius:'50%',border:`1px solid ${c}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,textAlign:'center',position:'relative',fontFamily:'var(--font-body)',...style}}>
<div style={{position:'absolute',inset:5,borderRadius:'50%',border:`1px dotted ${c}`,opacity:.6}}></div>
<div style={{fontFamily:'var(--font-display)',fontSize:size*.3,color:txt,lineHeight:1}}>F</div>
<div style={{fontSize:Math.max(7,size*.065),letterSpacing:'.24em',color:c,fontWeight:600,padding:'0 10px'}}>{label}</div>
{sub&&<div style={{fontSize:Math.max(5,size*.045),letterSpacing:'.2em',color:txt,opacity:.6,padding:'0 12px'}}>{sub}</div>}
</div>;
}
