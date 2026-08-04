import React from 'react';
export function CTABand({headline='Reserve your allocation from the first harvest.',sub='First cultivation begins September 2026. The first grow is genuinely limited.',cta='Request a Sample',onCta,style}){
return <div style={{background:'var(--gradient-dark)',padding:'72px 32px',textAlign:'center',fontFamily:'var(--font-body)',position:'relative',...style}}>
<div style={{position:'absolute',inset:16,border:'1px solid var(--border-gold)',pointerEvents:'none',opacity:.6}}></div>
<div style={{fontSize:11,letterSpacing:'.32em',color:'var(--leaf-light)',fontWeight:600}}>FIRST HARVEST · DECEMBER 2026</div>
<div style={{fontFamily:'var(--font-display)',fontSize:'clamp(28px,4vw,44px)',fontWeight:600,color:'var(--ivory)',maxWidth:640,margin:'16px auto 0',lineHeight:1.15}}>{headline}</div>
<div style={{width:64,borderTop:'1px solid var(--gold)',margin:'20px auto'}}></div>
<p style={{fontSize:15,color:'var(--text-on-dark-muted)',maxWidth:480,margin:'0 auto 28px',lineHeight:1.65}}>{sub}</p>
<button onClick={onCta} style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:12,letterSpacing:'.18em',textTransform:'uppercase',padding:'16px 40px',background:'var(--gold)',color:'var(--forest)',border:'none',borderRadius:'var(--radius-sm)',cursor:'pointer'}}>{cta}</button>
</div>;
}
