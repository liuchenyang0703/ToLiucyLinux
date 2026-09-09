import{t as e}from"./chunk-GTKDMUJJ-BbgDWR4E.js";import"./chunk-A4ITRWGT-D68_Q8pS.js";import"./chunk-OMTJKCYW-h9gex7xZ.js";import{p as t}from"./chunk-XW6ABFJP-Gxk-Hs9W.js";import{t as n}from"./chunk-4KE642ED-CENyt1YS.js";import{W as r,c as i,p as a,q as o}from"./chunk-63GW7ZVL-Dpgf3lNs.js";import{B as s,D as c,E as l,T as u,U as d,_ as f,g as p,o as m,s as h,t as g}from"./chunk-KXVH62NG-C9X19hRg.js";import"./chunk-THXVA4DE-DbrZB-iv.js";import{a as _,t as v}from"./chunk-EFRVIJHI-BlXzsprb.js";import{o as y}from"./mermaid.esm.min-BRoVUR8i.js";var b=p.pie,x={sections:new Map,showData:!1,config:b},S=x.sections,C=x.showData,w=structuredClone(b),T=e(()=>structuredClone(w),`getConfig`),E=e(()=>{S=new Map,C=x.showData,f()},`clear`),D=e(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);S.has(e)||(S.set(e,t),o.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),O=e(()=>S,`getSections`),k=e(e=>{C=e},`setShowData`),A=e(()=>C,`getShowData`),j={getConfig:T,clear:E,setDiagramTitle:s,getDiagramTitle:l,setAccTitle:h,getAccTitle:u,setAccDescription:m,getAccDescription:g,addSection:D,getSections:O,setShowData:k,getShowData:A},M=e((e,t)=>{n(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),N={parse:e(async e=>{let n=await t(`pie`,e);o.debug(n),M(n,j)},`parse`)},P=e(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),F=e(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return i().value(e=>e.value)(n)},`createPieArcs`),I={parser:N,db:j,renderer:{draw:e((e,t,n,i)=>{o.debug(`rendering pie chart
`+e);let s=i.db,l=d(),u=_(s.getConfig(),l.pie),f=y(t),p=f.append(`g`);p.attr(`transform`,`translate(225,225)`);let{themeVariables:m}=l,[h]=v(m.pieOuterStrokeWidth);h??=2;let g=u.textPosition,b=r().innerRadius(0).outerRadius(185),x=r().innerRadius(185*g).outerRadius(185*g);p.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+h/2).attr(`class`,`pieOuterCircle`);let S=s.getSections(),C=F(S),w=[m.pie1,m.pie2,m.pie3,m.pie4,m.pie5,m.pie6,m.pie7,m.pie8,m.pie9,m.pie10,m.pie11,m.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=a(w);p.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),p.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),p.append(`text`).text(s.getDiagramTitle()).attr(`x`,0).attr(`y`,-200).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=p.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});k.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),k.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>s.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));f.attr(`viewBox`,`0 0 ${A} 450`),c(f,450,A,u.useMaxWidth)},`draw`)},styles:P};export{I as diagram};