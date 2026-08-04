import React from 'react';
export function Badge({children,variant='outline',style}){
const v={
outline:{border:'1px solid var(--border-gold)',color:'var(--forest)',background:'transparent'},
solid:{border:'1px solid var(--forest)',color:'var(--ivory)',background:'var(--forest)'},
dark:{border:'1px solid var(--border-gold)',color:'var(--gold)',background:'transparent'},
tint:{border:'1px solid transparent',color:'var(--forest)',background:'var(--mist)'}};
return <span style={{fontFamily:'var(--font-body)',fontWeight:500,fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',padding:'7px 14px',borderRadius:'var(--radius-pill)',display:'inline-block',...v[variant],...style}}>{children}</span>;
}
