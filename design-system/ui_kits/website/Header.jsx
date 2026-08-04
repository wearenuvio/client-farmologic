const {Button}=window.FarmologicDesignSystem_069f79;
function SiteHeader({onCta}){
const link={fontFamily:'var(--font-body)',fontSize:12,letterSpacing:'.14em',fontWeight:500,color:'var(--forest)',textDecoration:'none',textTransform:'uppercase'};
const go=id=>e=>{e.preventDefault();const el=document.getElementById(id);if(el)window.scrollTo({top:el.offsetTop-64,behavior:'smooth'})};
return <header style={{position:'sticky',top:0,zIndex:50,background:'rgba(246,244,238,.92)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--hairline)'}}>
<div style={{maxWidth:1200,margin:'0 auto',padding:'0 32px',height:76,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
<a href="#top" onClick={go('top')} style={{display:'flex',alignItems:'center'}}><img src="../../assets/logo-full.png" alt="Farmologic — Nature. Science. Wellness." style={{height:64}}/></a>
<nav style={{display:'flex',gap:36,alignItems:'center'}}>
<a style={link} href="#standard" onClick={go('standard')}>The Standard</a>
<a style={link} href="#cordyceps" onClick={go('cordyceps')}>Cordyceps</a>
<a style={link} href="#learn" onClick={go('learn')}>Learn</a>
<a style={link} href="#about" onClick={go('about')}>About</a>
<Button variant="gold" size="sm" onClick={onCta}>Request a Sample</Button>
</nav>
</div>
</header>;
}
function SiteFooter(){
const col={fontFamily:'var(--font-body)',fontSize:13,color:'var(--text-on-dark-muted)',lineHeight:2,display:'flex',flexDirection:'column'};
const h={fontSize:10,letterSpacing:'.28em',color:'var(--leaf-light)',fontWeight:600,marginBottom:10,fontFamily:'var(--font-body)'};
const a={color:'var(--text-on-dark-muted)',textDecoration:'none'};
return <footer style={{background:'var(--forest-deep)',padding:'64px 32px 40px'}}>
<div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:48}}>
<div><div style={{background:'var(--ivory)',display:'inline-block',padding:'10px 18px',borderRadius:2}}><img src="../../assets/logo-full.png" alt="Farmologic" style={{height:88,display:'block'}}/></div>
<p style={{fontFamily:'var(--font-body)',fontSize:13,color:'var(--text-on-dark-muted)',maxWidth:300,lineHeight:1.7,marginTop:18}}>Harnessing nature through science to create premium wellness solutions for a better tomorrow.</p></div>
<div style={col}><span style={h}>SITE</span><a style={a} href="#standard">The Standard</a><a style={a} href="#cordyceps">Cordyceps</a><a style={a} href="#learn">Learn</a><a style={a} href="#about">About</a></div>
<div style={col}><span style={h}>TRADE</span><a style={a} href="#enquiry">Bulk enquiry</a><a style={a} href="#enquiry">Request COA</a><a style={a} href="#enquiry">Reserve allocation</a></div>
<div style={col}><span style={h}>COMPANY</span><span>Bengaluru, India</span><a style={a} href="mailto:hello@farmologic.com">hello@farmologic.com</a><span>FSSAI & AYUSH · on request</span></div>
</div>
<div style={{maxWidth:1200,margin:'40px auto 0',paddingTop:20,borderTop:'1px solid var(--border-hairline-on-dark)',display:'flex',justifyContent:'space-between',fontFamily:'var(--font-body)',fontSize:11,letterSpacing:'.12em',color:'rgba(246,244,238,.4)'}}>
<span>© 2026 FARMOLOGIC</span><span>NATURE. SCIENCE. WELLNESS.</span>
</div>
</footer>;
}
Object.assign(window,{SiteHeader,SiteFooter});
