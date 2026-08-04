import React,{useState} from 'react';
export function ProductCard({name,form,benefits=[],spec,image,packColor='var(--forest)',onEnquire,style}){
const [hov,setHov]=useState(false);
return <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:'var(--surface-card)',border:'1px solid var(--hairline)',borderRadius:'var(--radius-sm)',boxShadow:hov?'var(--shadow-lift)':'var(--shadow-card)',transform:hov?'translateY(-3px)':'none',transition:'all var(--dur-fast) var(--ease-out)',overflow:'hidden',fontFamily:'var(--font-body)',...style}}>
<div style={{background:packColor,height:180,display:'flex',alignItems:'center',justifyContent:'center'}}>
{image?<img src={image} alt={name} style={{maxHeight:'80%',maxWidth:'80%',objectFit:'contain'}}/>:
<div style={{textAlign:'center',color:'var(--ivory)'}}><div style={{fontFamily:'var(--font-display)',fontSize:44,lineHeight:1}}>F</div><div style={{fontSize:9,letterSpacing:'.3em',marginTop:6,opacity:.8}}>FARMOLOGIC</div></div>}
</div>
<div style={{padding:'20px 22px 22px'}}>
<div style={{fontFamily:'var(--font-display)',fontSize:24,fontWeight:600,color:'var(--forest)'}}>{name}</div>
{benefits.length>0&&<div style={{fontSize:10,letterSpacing:'.16em',color:'var(--olive)',fontWeight:600,marginTop:6}}>{benefits.join(' | ')}</div>}
<div style={{width:40,borderTop:'1px solid var(--gold)',margin:'12px 0'}}></div>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:12,color:'var(--text-muted)'}}>
<span>{form}{spec?` · ${spec}`:''}</span>
<button onClick={onEnquire} style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:10,letterSpacing:'.18em',background:'none',border:'none',color:'var(--forest)',cursor:'pointer',textDecoration:hov?'underline':'none',textUnderlineOffset:4,padding:0}}>PRICE ON REQUEST →</button>
</div>
</div>
</div>;
}
