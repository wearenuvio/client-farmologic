import React from 'react';
export function GoldRule({width=64,align='left',style}){
return <div style={{width,borderTop:'1px solid var(--gold)',margin:align==='center'?'0 auto':0,...style}}></div>;
}
