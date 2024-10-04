import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r as s}from"./index-BwDkhjyp.js";import{j as pe,c as D}from"./fondue-icons331-CXtkQtTl.js";import{a as fe}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as $,c as U}from"./index-DOnKqARA.js";import{c as ne,R as ge,I as he}from"./index-ImmjAmjo.js";import{u as xe,P as L}from"./index-Brw_kfkv.js";import{u as ve}from"./index-C8IlRUt1.js";import{u as qe}from"./index-DGaPG0k3.js";import{u as Ce}from"./index-DduqEaLY.js";import{u as je}from"./useControllableState-Bxhgt0vK.js";import{B as Re}from"./Button-Bmc9bttI.js";import{h as q}from"./Dropdown-DALX4iHj.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./index-BCwfsm-V.js";import"./index-BWD2N0gV.js";import"./index-DxjWwZXO.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-9q6yCIGA.js";import"./index-kUwV4muI.js";import"./usePreventDropdownOverflow-hl17Ppn0.js";import"./index-BwIM2_zL.js";function Se(n,e=[]){let o=[];function i(m,u){const c=s.createContext(u),d=o.length;o=[...o,u];const l=b=>{var W;const{scope:p,children:f,...h}=b,x=((W=p==null?void 0:p[n])==null?void 0:W[d])||c,g=s.useMemo(()=>h,Object.values(h));return t.jsx(x.Provider,{value:g,children:f})};l.displayName=m+"Provider";function T(b,p){var x;const f=((x=p==null?void 0:p[n])==null?void 0:x[d])||c,h=s.useContext(f);if(h)return h;if(u!==void 0)return u;throw new Error(`\`${b}\` must be used within \`${m}\``)}return[l,T]}const r=()=>{const m=o.map(u=>s.createContext(u));return function(c){const d=(c==null?void 0:c[n])||m;return s.useMemo(()=>({[`__scope${n}`]:{...c,[n]:d}}),[c,d])}};return r.scopeName=n,[i,Ne(r,...e)]}function Ne(...n){const e=n[0];if(n.length===1)return e;const o=()=>{const i=n.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(m){const u=i.reduce((c,{useScope:d,scopeName:l})=>{const b=d(m)[`__scope${l}`];return{...c,...b}},{});return s.useMemo(()=>({[`__scope${e.scopeName}`]:u}),[u])}};return o.scopeName=e.scopeName,o}function ye(n,e){return s.useReducer((o,i)=>e[o][i]??o,n)}var ie=n=>{const{present:e,children:o}=n,i=Ae(e),r=typeof o=="function"?o({present:i.isPresent}):s.Children.only(o),m=xe(i.ref,Le(r));return typeof o=="function"||i.isPresent?s.cloneElement(r,{ref:m}):null};ie.displayName="Presence";function Ae(n){const[e,o]=s.useState(),i=s.useRef({}),r=s.useRef(n),m=s.useRef("none"),u=n?"mounted":"unmounted",[c,d]=ye(u,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return s.useEffect(()=>{const l=C(i.current);m.current=c==="mounted"?l:"none"},[c]),$(()=>{const l=i.current,T=r.current;if(T!==n){const p=m.current,f=C(l);n?d("MOUNT"):f==="none"||(l==null?void 0:l.display)==="none"?d("UNMOUNT"):d(T&&p!==f?"ANIMATION_OUT":"UNMOUNT"),r.current=n}},[n,d]),$(()=>{if(e){let l;const T=e.ownerDocument.defaultView??window,b=f=>{const x=C(i.current).includes(f.animationName);if(f.target===e&&x&&(d("ANIMATION_END"),!r.current)){const g=e.style.animationFillMode;e.style.animationFillMode="forwards",l=T.setTimeout(()=>{e.style.animationFillMode==="forwards"&&(e.style.animationFillMode=g)})}},p=f=>{f.target===e&&(m.current=C(i.current))};return e.addEventListener("animationstart",p),e.addEventListener("animationcancel",b),e.addEventListener("animationend",b),()=>{T.clearTimeout(l),e.removeEventListener("animationstart",p),e.removeEventListener("animationcancel",b),e.removeEventListener("animationend",b)}}else d("ANIMATION_END")},[e,d]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:s.useCallback(l=>{l&&(i.current=getComputedStyle(l)),o(l)},[])}}function C(n){return(n==null?void 0:n.animationName)||"none"}function Le(n){var i,r;let e=(i=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:i.get,o=e&&"isReactWarning"in e&&e.isReactWarning;return o?n.ref:(e=(r=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:r.get,o=e&&"isReactWarning"in e&&e.isReactWarning,o?n.props.ref:n.props.ref||n.ref)}var M="Tabs",[_e,Tt]=Se(M,[ne]),oe=ne(),[we,F]=_e(M),ae=s.forwardRef((n,e)=>{const{__scopeTabs:o,value:i,onValueChange:r,defaultValue:m,orientation:u="horizontal",dir:c,activationMode:d="automatic",...l}=n,T=ve(c),[b,p]=qe({prop:i,onChange:r,defaultProp:m});return t.jsx(we,{scope:o,baseId:Ce(),value:b,onValueChange:p,orientation:u,dir:T,activationMode:d,children:t.jsx(L.div,{dir:T,"data-orientation":u,...l,ref:e})})});ae.displayName=M;var se="TabsList",re=s.forwardRef((n,e)=>{const{__scopeTabs:o,loop:i=!0,...r}=n,m=F(se,o),u=oe(o);return t.jsx(ge,{asChild:!0,...u,orientation:m.orientation,dir:m.dir,loop:i,children:t.jsx(L.div,{role:"tablist","aria-orientation":m.orientation,...r,ref:e})})});re.displayName=se;var de="TabsTrigger",ce=s.forwardRef((n,e)=>{const{__scopeTabs:o,value:i,disabled:r=!1,...m}=n,u=F(de,o),c=oe(o),d=me(u.baseId,i),l=be(u.baseId,i),T=i===u.value;return t.jsx(he,{asChild:!0,...c,focusable:!r,active:T,children:t.jsx(L.button,{type:"button",role:"tab","aria-selected":T,"aria-controls":l,"data-state":T?"active":"inactive","data-disabled":r?"":void 0,disabled:r,id:d,...m,ref:e,onMouseDown:U(n.onMouseDown,b=>{!r&&b.button===0&&b.ctrlKey===!1?u.onValueChange(i):b.preventDefault()}),onKeyDown:U(n.onKeyDown,b=>{[" ","Enter"].includes(b.key)&&u.onValueChange(i)}),onFocus:U(n.onFocus,()=>{const b=u.activationMode!=="manual";!T&&!r&&b&&u.onValueChange(i)})})})});ce.displayName=de;var ue="TabsContent",le=s.forwardRef((n,e)=>{const{__scopeTabs:o,value:i,forceMount:r,children:m,...u}=n,c=F(ue,o),d=me(c.baseId,i),l=be(c.baseId,i),T=i===c.value,b=s.useRef(T);return s.useEffect(()=>{const p=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(p)},[]),t.jsx(ie,{present:r||T,children:({present:p})=>t.jsx(L.div,{"data-state":T?"active":"inactive","data-orientation":c.orientation,role:"tabpanel","aria-labelledby":d,hidden:!p,id:l,tabIndex:0,...u,ref:e,style:{...n.style,animationDuration:b.current?"0s":void 0},children:p&&m})})});le.displayName=ue;function me(n,e){return`${n}-trigger-${e}`}function be(n,e){return`${n}-content-${e}`}var Ie=ae,Ue=re,Me=ce,Fe=le;const Oe=(n,e)=>n.filter(o=>{var r;const i=(r=o.ref)==null?void 0:r.current;return i?i.offsetLeft+i.offsetWidth>(e==null?void 0:e.scrollLeft)+e.offsetWidth||i.offsetLeft-e.scrollLeft<0:!1}),j=(n,e,o)=>{const i=o.current;if(!n||!e)return;const r=(n==null?void 0:n.scrollLeft)>(e==null?void 0:e.offsetLeft),m=(e==null?void 0:e.offsetLeft)+(e==null?void 0:e.offsetWidth)>(n==null?void 0:n.offsetWidth);r?(n.offsetWidth>e.offsetWidth+e.offsetLeft?i.style.left=`${e.offsetLeft}px`:i.style.left=`${n.offsetWidth-e.offsetWidth}px`,i.style.width=`${e==null?void 0:e.offsetWidth}px`):m?(i.style.left=`${n.clientWidth-e.offsetWidth}px`,i.style.width=`${e.offsetWidth}px`):(i.style.left=`${e.offsetLeft}px`,i.style.width=`${e.offsetWidth}px`)},Pe=({activeTab:n})=>{const e=s.useRef(null),o=s.useRef(null),[i,r]=s.useState([]),[m,u]=s.useState([]);return s.useEffect(()=>{var l;const c=(l=e.current)==null?void 0:l.querySelector('[data-state="active"]'),d=e.current;c instanceof HTMLButtonElement&&d instanceof HTMLDivElement&&(j(d,c,o),c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"end"}))},[n,o]),s.useLayoutEffect(()=>{var l,T;const c=(l=e.current)==null?void 0:l.querySelector('[data-state="active"]'),d=e.current;if(d instanceof HTMLDivElement&&c instanceof HTMLButtonElement){j(d,c,o);const b=new MutationObserver(()=>{c.scrollIntoView({behavior:"instant",block:"nearest",inline:"end"}),j(d,c,o)});d.parentNode&&b.observe(d.parentNode,{childList:!0});const p=new IntersectionObserver(()=>{u(Oe(i,d)),j(d,c,o)},{root:d,threshold:1});for(const f of i)(T=f.ref)!=null&&T.current&&p.observe(f.ref.current);return()=>{p.disconnect(),b.disconnect()}}},[i,e,o]),{triggerListRef:e,activeIndicatorRef:o,triggersOutOfView:m,triggers:i,addTrigger:c=>{r(d=>[...d,c])}}},We="_root_gfrd2_5",De="_triggerList_gfrd2_12",$e="_triggerListWrapper_gfrd2_26",Ve="_trigger_gfrd2_12",ke="_content_gfrd2_75",ze="_activeIndicator_gfrd2_79",v={root:We,triggerList:De,triggerListWrapper:$e,trigger:Ve,content:ke,activeIndicator:ze},O=s.createContext({value:"",disabled:!1}),Te=s.createContext({addTrigger:()=>{}}),_=({children:n,activeTab:e,defaultActiveTab:o,onActiveTabChange:i,size:r="medium",...m},u)=>{var x;const[c,d]=je({prop:e,defaultProp:o,onChange:i}),l=s.useCallback(g=>{d(g)},[d]),{triggerListRef:T,activeIndicatorRef:b,triggers:p,triggersOutOfView:f,addTrigger:h}=Pe({activeTab:c});return t.jsx(Te.Provider,{value:{addTrigger:h},children:t.jsxs(Ie,{ref:u,className:v.root,onValueChange:l,value:c??((x=p[0])==null?void 0:x.value),...m,children:[t.jsxs("div",{className:v.triggerListWrapper,children:[t.jsx(Ue,{ref:T,"data-size":r,className:v.triggerList,children:p.map(g=>t.jsx(Me,{value:g.value,disabled:g.disabled,className:v.trigger,ref:g.ref,children:g.element},g.value))}),t.jsxs(q.Root,{children:[f.length>0&&t.jsx(q.Trigger,{"data-test-id":"overflow-items-dropdown-trigger",children:t.jsx(Re,{emphasis:"default",aspect:"square",size:"small",children:t.jsx(pe,{size:16})})}),t.jsx(q.Content,{align:"end","data-test-id":"overflow-items-dropdown-content",children:f.map(g=>s.createElement(q.Item,{...g.props,disabled:g.disabled,onSelect:()=>l(g.value),key:g.value},g.element))})]}),t.jsx("span",{"data-test-id":"active-tab-indicator",ref:b,className:v.activeIndicator})]}),n]})})};_.displayName="Tabs.Root";const w=({children:n,value:e,disabled:o})=>t.jsx(O.Provider,{value:{value:e,disabled:o},children:n});w.displayName="Tabs.Tab";const P=({children:n,...e},o)=>{const{value:i,disabled:r}=s.useContext(O),{addTrigger:m}=s.useContext(Te),u=s.useRef(null);return s.useEffect(()=>{m({ref:u||o,value:i??"",disabled:r,props:e,element:n})},[]),null};P.displayName="Tabs.Trigger";const I=({children:n,...e},o)=>{const{value:i}=s.useContext(O);return t.jsx(Fe,{ref:o,...e,className:v.content,value:i??"",children:n})};I.displayName="Tabs.Content";const a={Root:s.forwardRef(_),Tab:s.forwardRef(w),Trigger:s.forwardRef(P),Content:s.forwardRef(I)};_.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultActiveTab:{required:!1,tsType:{name:"string"},description:`The default active tab
Used for uncontrolled components`},activeTab:{required:!1,tsType:{name:"string"},description:"The controlled value of the active tab"},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'large'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The height of the tabs
@default 'medium'`,defaultValue:{value:"'medium'",computed:!1}},onActiveTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the active tab changes"}}};w.__docgenInfo={description:"",methods:[],displayName:"Tabs.Tab",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const pt={title:"Components/Tabs",component:_,subcomponents:{"Tabs.Tab":w,"Tabs.Trigger":P,"Tabs.Content":I},tags:["autodocs"],parameters:{status:{type:"released"}},args:{onActiveTabChange:fe("onActiveTabChange")}},R={render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:"First Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},S={args:{defaultActiveTab:"second"},render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:"First Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},N={args:{defaultActiveTab:"second"},render:n=>{const[e,o]=s.useState("second");return t.jsxs(a.Root,{...n,activeTab:e,onActiveTabChange:o,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:"First Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})}},y={render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:t.jsx("span",{children:"First Tab"})}),t.jsx(a.Content,{children:"First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),t.jsxs(a.Tab,{value:"second",disabled:!0,children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",disabled:!0,children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},A={render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsxs(a.Trigger,{children:[t.jsx(D,{size:20}),"First Tab"]}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsxs(a.Trigger,{children:["Second Tab",t.jsx(D,{size:20})]}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",disabled:!0,children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})};var V,k,z;R.parameters={...R.parameters,docs:{...(V=R.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(z=(k=R.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,G,H;S.parameters={...S.parameters,docs:{...(B=S.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(H=(G=S.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var K,J,Q;N.parameters={...N.parameters,docs:{...(K=N.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(Q=(J=N.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;y.parameters={...y.parameters,docs:{...(X=y.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var E,ee,te;A.parameters={...A.parameters,docs:{...(E=A.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(te=(ee=A.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const ft=["Default","WithDefaultActiveTab","ExternallyControlled","DisabledTabs","WithDecorator"];export{R as Default,y as DisabledTabs,N as ExternallyControlled,A as WithDecorator,S as WithDefaultActiveTab,ft as __namedExportsOrder,pt as default};
