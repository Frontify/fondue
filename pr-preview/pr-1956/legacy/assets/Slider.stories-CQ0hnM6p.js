import{j as n}from"./jsx-runtime-Nms4Y4qS.js";import{r as s}from"./index-BwDkhjyp.js";import{T as pe,a as fe}from"./TextInput-BJ6WSDaF.js";import{u as me}from"./useMemoizedId-EtHZ7Sxa.js";import{d as we}from"./debounce-BfOZbKMa.js";import{m as w}from"./merge-DI-veSMP.js";import{V as O}from"./validation-C9S5KgfE.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./LoadingCircle-CZrma5le.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconSize-BcCrF_mi.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./IconExclamationMarkTriangle-CRTWkDyu.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";import"./focusStyle-CBFElZiz.js";import"./LegacyTooltip-BoEBGEhI.js";import"./useLink-DorAuuFQ.js";import"./useFocusable-CAGu0lKI.js";import"./chain-D5h1pgIF.js";import"./usePopper-ByXn8U-3.js";import"./index-BxibOwXx.js";import"./index-CfyPTyT-.js";import"./Button-CYWlMQhW.js";import"./useButton-DofEV6SJ.js";import"./Portal-By7XnO0v.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";const A=(g,x,E)=>Math.max(x,Math.min(g,E)),ge=0,be=100,ye=1,he=5,ve="Slider text input",xe=3,B=["ArrowUp","ArrowRight"],W=["ArrowDown","ArrowLeft"],X=["Home","End"],_=({id:g,label:x,value:E,min:r=ge,max:i=be,showMinMax:U=!1,step:p=ye,stepMultiplier:Z=he,valueSuffix:o="",onError:k,onChange:j,"aria-label":q=ve,disabled:t=!1,"data-test-id":S="fondue-slider"})=>{const[u,b]=s.useState(),[c,T]=s.useState(""),[m,N]=s.useState(),[D,I]=s.useState(),[l,ee]=s.useState(null),[te,$]=s.useState(!1),[C,V]=s.useState(!1),P=me(g),re=e=>{T(`${e.replace(o,"")}${o}`)},f=s.useCallback(({clientX:e,rawValue:a})=>{if(!l)return;const d=i-r,le=l.getBoundingClientRect().x,ue=l.clientWidth;let L;if(e!==void 0)L=(e-le)/ue;else{L=((a??r)-r)/d,I(A(L,0,1)*100);return}const ce=A(L,0,1),de=d/p,F=A(Math.round(ce*de)*p+r,r,i);I((F-r)/d*100),T(`${F}${o}`)},[l,i,r,p,o]),y=s.useMemo(()=>l?we(e=>{t||f({clientX:e.clientX??e.touches[0].clientX})},xe):()=>{},[f,l,t]),M=s.useCallback(()=>{l&&(V(!1),window.removeEventListener("mousemove",y),window.removeEventListener("touchmove",y),window.removeEventListener("mouseup",M))},[l,y]),R=e=>{!l||t||(V(!0),f({clientX:e.clientX??e.touches[0].clientX}),window.addEventListener("mousemove",y),window.addEventListener("touchmove",y),window.addEventListener("mouseup",M))},oe=e=>{if(![...B,...W,...X].includes(e.key)||u===void 0||t)return;e.preventDefault();let a=0,d=0;W.includes(e.key)?a=-p:B.includes(e.key)&&(a=p),X.includes(e.key)?d=e.key==="Home"?r:i:(a*=e.shiftKey?Z:1,d=A(Math.floor(u/p)*p+a,r,i)),b(d),T(`${d}${o}`)},ae=()=>{t||$(!0)},se=()=>{t||$(!1)},ne=()=>{t||V(!0)},ie=()=>{t||V(!1)};return s.useEffect(()=>{if(!l)return;if(r>i){N("MinMax");return}const e=E??r;b(e),T(`${e}${o}`),f({rawValue:e})},[l,f,r,i,E,o]),s.useEffect(()=>{if(!c)return;const e=c.replace(o,""),a=+e;if(Number.isNaN(a)||!e){b(void 0),N("ValueNaN");return}if(a<r||a>i){b(void 0),N("ValueOutOfRange");return}N(void 0),b(a)},[c,o,r,i]),s.useEffect(()=>{if(m||u===void 0||!c)return;const a=+c.replace(o,"");Number.isNaN(a)||u!==a||(f({rawValue:u}),t||j({raw:u,withSuffix:c.replace(o,"")+o}))},[u,c,o,m,j,f,t]),s.useEffect(()=>{m&&k&&k(m)},[m,k]),n.jsxs("div",{className:"tw-flex tw-flex-col","data-test-id":S,id:P,children:[n.jsx("label",{htmlFor:P,className:w([!x&&"tw-hidden",t&&"tw-text-text-disabled"]),"data-test-id":`${S}-label`,children:x}),n.jsx("div",{className:"tw-flex",children:n.jsxs("div",{className:w(["tw-flex-1 tw-flex tw-items-center"]),children:[U&&n.jsxs("div",{className:w(["tw-mr-3",t&&"tw-text-text-disabled"]),children:[r,o]}),n.jsxs("button",{ref:ee,"data-test-id":`${S}-interactive`,className:"tw-flex-1 tw-relative tw-h-full tw-cursor-pointer disabled:tw-cursor-default tw-outline-none",onMouseOver:ae,onMouseOut:se,onFocus:ne,onBlur:ie,onMouseDown:R,onMouseUp:M,onTouchStart:R,onTouchEnd:M,onKeyDown:oe,disabled:t,children:[n.jsx("span",{className:"tw-absolute tw-block tw-top-1/2 tw--translate-y-1/2 tw-w-full tw-h-1 tw-rounded-sm tw-bg-box-neutral tw-flex-1"}),D!==void 0&&n.jsx("span",{role:"slider","aria-valuenow":u,"aria-valuemin":r,"aria-valuemax":i,"aria-label":q,"data-test-id":`${S}-track`,className:w(["tw-absolute tw-block tw-top-1/2 tw--translate-y-1/2 tw-origin-left tw-w-full tw-h-1  tw-rounded-sm tw-bg-box-neutral-strong tw-flex-1",t&&"tw-bg-box-neutral"]),style:{width:`${D}%`}}),n.jsx("span",{className:w(["tw-absolute tw-block tw-top-1/2 tw--translate-y-1/2 tw--translate-x-1/2 tw-w-5 tw-h-5","after:tw-absolute after:tw-block after:tw-top-1/2 after:tw-left-1/2 after:tw--translate-y-1/2 after:tw--translate-x-1/2 after:tw-w-5 after:tw-h-5 after:tw-bg-base after:tw-rounded-full after:tw-border after:tw-border-line-strong",te&&!C&&"after:tw-shadow",C&&"after:tw-border-line-xx-strong before:tw-content-[''] before:tw-opacity-25 before:tw-top-1/2 before:tw--translate-y-1/2 before:tw--translate-x-1/2 before:tw-left-1/2 before:tw-block before:tw-rounded-full before:tw-absolute before:tw-z-0 before:tw-w-9 before:tw-h-9 before:tw-bg-box-neutral-strong",t&&"after:tw-bg-box-neutral after:tw-border-line-weak"]),style:{left:`${D}%`}})]}),U&&n.jsxs("div",{className:w(["tw-ml-3",t&&"tw-text-text-disabled"]),children:[i,o]}),n.jsx("div",{className:"tw-w-16 tw-ml-3",children:n.jsx(pe,{id:`${P}-text-input`,value:c,placeholder:q,type:fe.Text,validation:m?O.Error:O.Default,onChange:re,disabled:t})})]})})]})};_.displayName="FondueSlider";_.__docgenInfo={description:"@deprecated Use `Slider` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#slider the migration guide}.",methods:[],displayName:"FondueSlider",props:{id:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"number"},description:""},min:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},showMinMax:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},step:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},stepMultiplier:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},onError:{required:!1,tsType:{name:"signature",type:"function",raw:"(errorCode: SliderError) => void",signature:{arguments:[{type:{name:"SliderError"},name:"errorCode"}],return:{name:"void"}}},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: SliderValue) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    raw: number;
    withSuffix: string;
}`,signature:{properties:[{key:"raw",value:{name:"number",required:!0}},{key:"withSuffix",value:{name:"string",required:!0}}]}},name:"value"}],return:{name:"void"}}},description:""},valueSuffix:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-slider'",computed:!1}},"aria-label":{defaultValue:{value:"'Slider text input'",computed:!1},required:!1}}};const et={title:"Components/Slider",component:_,tags:["autodocs"],argTypes:{id:{type:"string"},value:{type:"number"},min:{type:"number"},max:{type:"number"},step:{type:"number"},stepMultiplier:{type:"number"},label:{type:"string"},"aria-label":{type:"string"},valueSuffix:{type:"string"},showMinMax:{type:"boolean"},disabled:{type:"boolean"},onChange:{action:"Value change"},onError:{action:"Slider error"}},args:{min:0,max:100,stepMultiplier:5}},Q=g=>n.jsx(_,{...g}),h=Q.bind({});h.args={min:0,max:100,value:30,step:1,valueSuffix:"%","aria-label":"Percentage slider"};const v=Q.bind({});v.args={value:20,"aria-label":"Percentage slider",disabled:!0};var K,z,Y;h.parameters={...h.parameters,docs:{...(K=h.parameters)==null?void 0:K.docs,source:{originalSource:`(args: SliderProps) => {
  return <Slider {...args} />;
}`,...(Y=(z=h.parameters)==null?void 0:z.docs)==null?void 0:Y.source}}};var G,H,J;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`(args: SliderProps) => {
  return <Slider {...args} />;
}`,...(J=(H=v.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};const tt=["BasicUsage","DisabledState"];export{h as BasicUsage,v as DisabledState,tt as __namedExportsOrder,et as default};