import React from 'react';
export function SpecReadout({items=[],onDark=true,style}){
const lbl=onDark?'var(--leaf-light)':'var(--olive)';
const val=onDark?'var(--ivory)':'var(--forest)';
return <div style={{display:'flex',gap:'var(--space-6)',fontFamily:'var(--font-body)',fontVariantNumeric:'tabular-nums',flexWrap:'wrap',...style}}>
{items.map((it,i)=><div key={i}>
<div style={{fontSize:10,letterSpacing:'.25em',color:lbl,fontWeight:600}}>{it.label}</div>
<div style={{fontSize:20,fontWeight:500,color:val,marginTop:4,letterSpacing:'.04em'}}>{it.value}</div>
</div>)}
</div>;
}
export function Stat({value,unit,label,onDark=true,style}){
return <div style={{fontFamily:'var(--font-body)',...style}}>
<div style={{fontFamily:'var(--font-display)',fontSize:52,lineHeight:1,color:onDark?'var(--ivory)':'var(--forest)'}}>{value}{unit&&<span style={{fontSize:28}}>{unit}</span>}</div>
<div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',marginTop:8,color:onDark?'var(--text-on-dark-muted)':'var(--text-muted)'}}>{label}</div>
</div>;
}
