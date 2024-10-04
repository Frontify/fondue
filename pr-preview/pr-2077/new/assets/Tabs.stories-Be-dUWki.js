import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r}from"./index-BwDkhjyp.js";import{j as pe,c as D}from"./fondue-icons331-CXtkQtTl.js";import{a as ge}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as E,c as U}from"./index-DOnKqARA.js";import{c as ne,R as fe,I as ve}from"./index-ImmjAmjo.js";import{u as he,P as L}from"./index-Brw_kfkv.js";import{u as xe}from"./index-C8IlRUt1.js";import{u as qe}from"./index-DGaPG0k3.js";import{u as Ce}from"./index-DduqEaLY.js";import{B as je}from"./Button-Bmc9bttI.js";import{h as x}from"./Dropdown-CyS00lBz.js";import{u as Se}from"./useControllableState-Bxhgt0vK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./index-BCwfsm-V.js";import"./index-BWD2N0gV.js";import"./index-DxjWwZXO.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-9q6yCIGA.js";import"./index-kUwV4muI.js";import"./usePreventDropdownOverflow-hl17Ppn0.js";import"./index-BwIM2_zL.js";function Ne(i,n=[]){let t=[];function o(l,d){const c=r.createContext(d),u=t.length;t=[...t,d];const b=m=>{var W;const{scope:p,children:f,...v}=m,g=((W=p==null?void 0:p[i])==null?void 0:W[u])||c,I=r.useMemo(()=>v,Object.values(v));return e.jsx(g.Provider,{value:I,children:f})};b.displayName=l+"Provider";function T(m,p){var g;const f=((g=p==null?void 0:p[i])==null?void 0:g[u])||c,v=r.useContext(f);if(v)return v;if(d!==void 0)return d;throw new Error(`\`${m}\` must be used within \`${l}\``)}return[b,T]}const s=()=>{const l=t.map(d=>r.createContext(d));return function(c){const u=(c==null?void 0:c[i])||l;return r.useMemo(()=>({[`__scope${i}`]:{...c,[i]:u}}),[c,u])}};return s.scopeName=i,[o,Re(s,...n)]}function Re(...i){const n=i[0];if(i.length===1)return n;const t=()=>{const o=i.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(l){const d=o.reduce((c,{useScope:u,scopeName:b})=>{const m=u(l)[`__scope${b}`];return{...c,...m}},{});return r.useMemo(()=>({[`__scope${n.scopeName}`]:d}),[d])}};return t.scopeName=n.scopeName,t}function ye(i,n){return r.useReducer((t,o)=>n[t][o]??t,i)}var ie=i=>{const{present:n,children:t}=i,o=Le(n),s=typeof t=="function"?t({present:o.isPresent}):r.Children.only(t),l=he(o.ref,Ae(s));return typeof t=="function"||o.isPresent?r.cloneElement(s,{ref:l}):null};ie.displayName="Presence";function Le(i){const[n,t]=r.useState(),o=r.useRef({}),s=r.useRef(i),l=r.useRef("none"),d=i?"mounted":"unmounted",[c,u]=ye(d,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const b=q(o.current);l.current=c==="mounted"?b:"none"},[c]),E(()=>{const b=o.current,T=s.current;if(T!==i){const p=l.current,f=q(b);i?u("MOUNT"):f==="none"||(b==null?void 0:b.display)==="none"?u("UNMOUNT"):u(T&&p!==f?"ANIMATION_OUT":"UNMOUNT"),s.current=i}},[i,u]),E(()=>{if(n){let b;const T=n.ownerDocument.defaultView??window,m=f=>{const g=q(o.current).includes(f.animationName);if(f.target===n&&g&&(u("ANIMATION_END"),!s.current)){const I=n.style.animationFillMode;n.style.animationFillMode="forwards",b=T.setTimeout(()=>{n.style.animationFillMode==="forwards"&&(n.style.animationFillMode=I)})}},p=f=>{f.target===n&&(l.current=q(o.current))};return n.addEventListener("animationstart",p),n.addEventListener("animationcancel",m),n.addEventListener("animationend",m),()=>{T.clearTimeout(b),n.removeEventListener("animationstart",p),n.removeEventListener("animationcancel",m),n.removeEventListener("animationend",m)}}else u("ANIMATION_END")},[n,u]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:r.useCallback(b=>{b&&(o.current=getComputedStyle(b)),t(b)},[])}}function q(i){return(i==null?void 0:i.animationName)||"none"}function Ae(i){var o,s;let n=(o=Object.getOwnPropertyDescriptor(i.props,"ref"))==null?void 0:o.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?i.ref:(n=(s=Object.getOwnPropertyDescriptor(i,"ref"))==null?void 0:s.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?i.props.ref:i.props.ref||i.ref)}var F="Tabs",[we,Tt]=Ne(F,[ne]),oe=ne(),[_e,O]=we(F),ae=r.forwardRef((i,n)=>{const{__scopeTabs:t,value:o,onValueChange:s,defaultValue:l,orientation:d="horizontal",dir:c,activationMode:u="automatic",...b}=i,T=xe(c),[m,p]=qe({prop:o,onChange:s,defaultProp:l});return e.jsx(_e,{scope:t,baseId:Ce(),value:m,onValueChange:p,orientation:d,dir:T,activationMode:u,children:e.jsx(L.div,{dir:T,"data-orientation":d,...b,ref:n})})});ae.displayName=F;var se="TabsList",re=r.forwardRef((i,n)=>{const{__scopeTabs:t,loop:o=!0,...s}=i,l=O(se,t),d=oe(t);return e.jsx(fe,{asChild:!0,...d,orientation:l.orientation,dir:l.dir,loop:o,children:e.jsx(L.div,{role:"tablist","aria-orientation":l.orientation,...s,ref:n})})});re.displayName=se;var de="TabsTrigger",ce=r.forwardRef((i,n)=>{const{__scopeTabs:t,value:o,disabled:s=!1,...l}=i,d=O(de,t),c=oe(t),u=me(d.baseId,o),b=be(d.baseId,o),T=o===d.value;return e.jsx(ve,{asChild:!0,...c,focusable:!s,active:T,children:e.jsx(L.button,{type:"button",role:"tab","aria-selected":T,"aria-controls":b,"data-state":T?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:u,...l,ref:n,onMouseDown:U(i.onMouseDown,m=>{!s&&m.button===0&&m.ctrlKey===!1?d.onValueChange(o):m.preventDefault()}),onKeyDown:U(i.onKeyDown,m=>{[" ","Enter"].includes(m.key)&&d.onValueChange(o)}),onFocus:U(i.onFocus,()=>{const m=d.activationMode!=="manual";!T&&!s&&m&&d.onValueChange(o)})})})});ce.displayName=de;var ue="TabsContent",le=r.forwardRef((i,n)=>{const{__scopeTabs:t,value:o,forceMount:s,children:l,...d}=i,c=O(ue,t),u=me(c.baseId,o),b=be(c.baseId,o),T=o===c.value,m=r.useRef(T);return r.useEffect(()=>{const p=requestAnimationFrame(()=>m.current=!1);return()=>cancelAnimationFrame(p)},[]),e.jsx(ie,{present:s||T,children:({present:p})=>e.jsx(L.div,{"data-state":T?"active":"inactive","data-orientation":c.orientation,role:"tabpanel","aria-labelledby":u,hidden:!p,id:b,tabIndex:0,...d,ref:n,style:{...i.style,animationDuration:m.current?"0s":void 0},children:p&&l})})});le.displayName=ue;function me(i,n){return`${i}-trigger-${n}`}function be(i,n){return`${i}-content-${n}`}var Ie=ae,Ue=re,Fe=ce,Oe=le;const Me=(i,n)=>{var o;const t=[];if(n)for(const s of i){const l=(o=s.ref)==null?void 0:o.current;l&&(l.offsetLeft+l.offsetWidth>(n==null?void 0:n.scrollLeft)+n.offsetWidth||l.offsetLeft-n.scrollLeft<0)&&t.push({value:s.value,disabled:s.disabled,element:r.cloneElement(s.element,{ref:null})})}return t},C=(i,n)=>{var c;const t=(c=i.current)==null?void 0:c.querySelector('[data-state="active"]'),o=i.current,s=n.current;if(!o||!t)return;const l=(o==null?void 0:o.scrollLeft)>(t==null?void 0:t.offsetLeft),d=(t==null?void 0:t.offsetLeft)+(t==null?void 0:t.offsetWidth)>(o==null?void 0:o.offsetWidth);l?(o.offsetWidth>t.offsetWidth+t.offsetLeft?s.style.left=`${t.offsetLeft}px`:s.style.left=`${o.offsetWidth-t.offsetWidth}px`,s.style.width=`${t==null?void 0:t.offsetWidth}px`):d?(s.style.left=`${o.clientWidth-t.offsetWidth}px`,s.style.width=`${t.offsetWidth}px`):(s.style.left=`${t.offsetLeft}px`,s.style.width=`${t.offsetWidth}px`)},Pe=({activeTab:i})=>{const n=r.useRef(null),t=r.useRef(null),[o,s]=r.useState([]),[l,d]=r.useState([]);return r.useEffect(()=>{var u;const c=(u=n.current)==null?void 0:u.querySelector('[data-state="active"]');c&&(C(n,t),c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"end"}))},[i,t]),r.useLayoutEffect(()=>{var m,p;const c=(m=n.current)==null?void 0:m.querySelector('[data-state="active"]'),u=n.current;c&&C(n,t);const b=new IntersectionObserver(()=>{d(Me(o,u)),C(n,t)},{root:u,threshold:1});for(const f of o)(p=f.ref)!=null&&p.current&&b.observe(f.ref.current);const T=new MutationObserver(()=>{c.scrollIntoView({behavior:"instant",block:"nearest",inline:"end"}),C(n,t)});return u.parentNode&&T.observe(u.parentNode,{childList:!0}),()=>{b.disconnect(),T.disconnect()}},[o,n,t]),{triggerListRef:n,activeIndicatorRef:t,triggersOutOfView:l,triggers:o,addTrigger:c=>{s(u=>[...u,c])}}},We="_root_gfrd2_5",De="_triggerList_gfrd2_12",Ee="_triggerListWrapper_gfrd2_26",$e="_trigger_gfrd2_12",Ve="_content_gfrd2_75",ze="_activeIndicator_gfrd2_79",h={root:We,triggerList:De,triggerListWrapper:Ee,trigger:$e,content:Ve,activeIndicator:ze},M=r.createContext({value:"",disabled:!1}),Te=r.createContext({addTrigger:()=>{}}),A=({children:i,activeTab:n,defaultActiveTab:t,onActiveTabChange:o,size:s="default",...l},d)=>{var v;const[c,u]=Se({prop:n,defaultProp:t,onChange:o}),{triggerListRef:b,activeIndicatorRef:T,triggers:m,triggersOutOfView:p,addTrigger:f}=Pe({activeTab:c});return e.jsx(Te.Provider,{value:{addTrigger:f},children:e.jsxs(Ie,{ref:d,className:h.root,onValueChange:g=>{g&&u(g)},value:c??((v=m[0])==null?void 0:v.value),...l,children:[e.jsxs("div",{className:h.triggerListWrapper,children:[e.jsx(Ue,{ref:b,"data-size":s,className:h.triggerList,children:m.map(g=>e.jsx(Fe,{value:g.value,disabled:g.disabled,className:h.trigger,asChild:!0,children:g.element},g.value))}),e.jsxs(x.Root,{children:[p.length>0&&e.jsx(x.Trigger,{"data-test-id":"overflow-items-dropdown-trigger",children:e.jsx(je,{emphasis:"default",aspect:"square",size:"small",children:e.jsx(pe,{size:16})})}),e.jsx(x.Content,{align:"end","data-test-id":"overflow-items-dropdown-content",children:p.map(g=>e.jsx(x.Item,{disabled:g.disabled,onSelect:()=>{u(g.value)},children:g.element},g.value))})]}),e.jsx("span",{"data-test-id":"active-tab-indicator",ref:T,className:h.activeIndicator})]}),i]})})};A.displayName="Tabs.Root";const w=({children:i,value:n,disabled:t})=>e.jsx(M.Provider,{value:{value:n,disabled:!!t},children:i});w.displayName="Tabs.Tab";const P=({children:i,...n},t)=>{const{value:o,disabled:s}=r.useContext(M),{addTrigger:l}=r.useContext(Te),d=r.useRef(null);return r.useEffect(()=>{l({ref:d||t,value:o||"",disabled:s,element:e.jsx("button",{ref:d||t,...n,"data-bla":"ttt",children:i})})},[]),null};P.displayName="Tabs.Trigger";const _=({children:i,...n},t)=>{const{value:o}=r.useContext(M);return e.jsx(Oe,{ref:t,...n,className:h.content,value:o||"",children:i})};_.displayName="Tabs.Content";const a={Root:r.forwardRef(A),Tab:r.forwardRef(w),Trigger:r.forwardRef(P),Content:r.forwardRef(_)};A.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultActiveTab:{required:!1,tsType:{name:"string"},description:`The default active tab
Used for uncontrolled components`},activeTab:{required:!1,tsType:{name:"string"},description:"The controlled value of the active tab"},size:{required:!1,tsType:{name:"union",raw:"'default' | 'large'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'large'"}]},description:"The height of the tabs",defaultValue:{value:"'default'",computed:!1}},onActiveTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the active tab changes"}}};w.__docgenInfo={description:"",methods:[],displayName:"Tabs.Tab",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};_.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const pt={title:"Components/Tabs",component:A,subcomponents:{"Tabs.Tab":w,"Tabs.Trigger":P,"Tabs.Content":_},tags:["autodocs"],parameters:{status:{type:"released"}},args:{onActiveTabChange:ge("onActiveTabChange")}},j={render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},S={args:{defaultActiveTab:"second"},render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},N={args:{defaultActiveTab:"second"},render:i=>{const[n,t]=r.useState("second");return e.jsxs(a.Root,{...i,activeTab:n,onActiveTabChange:t,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})}},R={render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:e.jsx("span",{children:"First Tab"})}),e.jsx(a.Content,{children:"First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),e.jsxs(a.Tab,{value:"second",disabled:!0,children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",disabled:!0,children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},y={render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsxs(a.Trigger,{children:[e.jsx(D,{size:20}),"First Tab"]}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsxs(a.Trigger,{children:["Second Tab",e.jsx(D,{size:20})]}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",disabled:!0,children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})};var $,V,z;j.parameters={...j.parameters,docs:{...($=j.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>First Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>First Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger>Second Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
}`,...(z=(V=j.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var k,G,B;S.parameters={...S.parameters,docs:{...(k=S.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    defaultActiveTab: 'second'
  },
  render: args => <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>First Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>First Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger>Second Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third">
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
}`,...(B=(G=S.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var K,H,J;N.parameters={...N.parameters,docs:{...(K=N.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    defaultActiveTab: 'second'
  },
  render: args => {
    const [activeTab, setActiveTab] = useState('second');
    return <Tabs.Root {...args} activeTab={activeTab} onActiveTabChange={setActiveTab}>
                <Tabs.Tab value="first">
                    <Tabs.Trigger>First Tab</Tabs.Trigger>
                    <Tabs.Content>
                        <b>First Content</b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Tabs.Content>
                </Tabs.Tab>
                <Tabs.Tab value="second">
                    <Tabs.Trigger>Second Tab</Tabs.Trigger>
                    <Tabs.Content>
                        <b>Second Content</b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Tabs.Content>
                </Tabs.Tab>
                <Tabs.Tab value="third">
                    <Tabs.Trigger>Third Tab</Tabs.Trigger>
                    <Tabs.Content>
                        <b>Third Content</b>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </Tabs.Content>
                </Tabs.Tab>
            </Tabs.Root>;
  }
}`,...(J=(H=N.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Q,X,Y;R.parameters={...R.parameters,docs:{...(Q=R.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: args => <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>
                    <span>First Tab</span>
                </Tabs.Trigger>
                <Tabs.Content>
                    First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second" disabled>
                <Tabs.Trigger>Second Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third" disabled>
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
}`,...(Y=(X=R.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;y.parameters={...y.parameters,docs:{...(Z=y.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => <Tabs.Root {...args}>
            <Tabs.Tab value="first">
                <Tabs.Trigger>
                    <IconIcon size={20} />
                    First Tab
                </Tabs.Trigger>
                <Tabs.Content>
                    <b>First Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="second">
                <Tabs.Trigger>
                    Second Tab
                    <IconIcon size={20} />
                </Tabs.Trigger>
                <Tabs.Content>
                    <b>Second Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
            <Tabs.Tab value="third" disabled>
                <Tabs.Trigger>Third Tab</Tabs.Trigger>
                <Tabs.Content>
                    <b>Third Content</b>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                </Tabs.Content>
            </Tabs.Tab>
        </Tabs.Root>
}`,...(te=(ee=y.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const gt=["Default","WithDefaultActiveTab","ExternallyControlled","DisabledTabs","WithDecorator"];export{j as Default,R as DisabledTabs,N as ExternallyControlled,y as WithDecorator,S as WithDefaultActiveTab,gt as __namedExportsOrder,pt as default};
