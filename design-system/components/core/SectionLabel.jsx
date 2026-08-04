import React from 'react';
export function SectionLabel({children,color='gold',align='left',style}){
const colors={gold:'var(--gold)',forest:'var(--forest)',leaf:'var(--leaf-light)'};
return <div style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:11,letterSpacing:'var(--tracking-label)',textTransform:'uppercase',color:colors[color],textAlign:align,...style}}>{children}</div>;
}
