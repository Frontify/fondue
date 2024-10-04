import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r}from"./index-BwDkhjyp.js";import{j as pe,c as D}from"./fondue-icons331-CXtkQtTl.js";import{a as fe}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as $,c as U}from"./index-DOnKqARA.js";import{c as ne,R as ge,I as ve}from"./index-ImmjAmjo.js";import{u as he,P as _}from"./index-Brw_kfkv.js";import{u as xe}from"./index-C8IlRUt1.js";import{u as qe}from"./index-DGaPG0k3.js";import{u as Ce}from"./index-DduqEaLY.js";import{u as je}from"./useControllableState-Bxhgt0vK.js";import{B as Se}from"./Button-Bmc9bttI.js";import{h as q}from"./Dropdown-DALX4iHj.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./index-BCwfsm-V.js";import"./index-BWD2N0gV.js";import"./index-DxjWwZXO.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-9q6yCIGA.js";import"./index-kUwV4muI.js";import"./usePreventDropdownOverflow-hl17Ppn0.js";import"./index-BwIM2_zL.js";function Re(t,i=[]){let o=[];function n(l,c){const s=r.createContext(c),u=o.length;o=[...o,c];const m=b=>{var W;const{scope:p,children:g,...v}=b,h=((W=p==null?void 0:p[t])==null?void 0:W[u])||s,f=r.useMemo(()=>v,Object.values(v));return e.jsx(h.Provider,{value:f,children:g})};m.displayName=l+"Provider";function T(b,p){var h;const g=((h=p==null?void 0:p[t])==null?void 0:h[u])||s,v=r.useContext(g);if(v)return v;if(c!==void 0)return c;throw new Error(`\`${b}\` must be used within \`${l}\``)}return[m,T]}const d=()=>{const l=o.map(c=>r.createContext(c));return function(s){const u=(s==null?void 0:s[t])||l;return r.useMemo(()=>({[`__scope${t}`]:{...s,[t]:u}}),[s,u])}};return d.scopeName=t,[n,Ne(d,...i)]}function Ne(...t){const i=t[0];if(t.length===1)return i;const o=()=>{const n=t.map(d=>({useScope:d(),scopeName:d.scopeName}));return function(l){const c=n.reduce((s,{useScope:u,scopeName:m})=>{const b=u(l)[`__scope${m}`];return{...s,...b}},{});return r.useMemo(()=>({[`__scope${i.scopeName}`]:c}),[c])}};return o.scopeName=i.scopeName,o}function ye(t,i){return r.useReducer((o,n)=>i[o][n]??o,t)}var ie=t=>{const{present:i,children:o}=t,n=Ae(i),d=typeof o=="function"?o({present:n.isPresent}):r.Children.only(o),l=he(n.ref,_e(d));return typeof o=="function"||n.isPresent?r.cloneElement(d,{ref:l}):null};ie.displayName="Presence";function Ae(t){const[i,o]=r.useState(),n=r.useRef({}),d=r.useRef(t),l=r.useRef("none"),c=t?"mounted":"unmounted",[s,u]=ye(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const m=C(n.current);l.current=s==="mounted"?m:"none"},[s]),$(()=>{const m=n.current,T=d.current;if(T!==t){const p=l.current,g=C(m);t?u("MOUNT"):g==="none"||(m==null?void 0:m.display)==="none"?u("UNMOUNT"):u(T&&p!==g?"ANIMATION_OUT":"UNMOUNT"),d.current=t}},[t,u]),$(()=>{if(i){let m;const T=i.ownerDocument.defaultView??window,b=g=>{const h=C(n.current).includes(g.animationName);if(g.target===i&&h&&(u("ANIMATION_END"),!d.current)){const f=i.style.animationFillMode;i.style.animationFillMode="forwards",m=T.setTimeout(()=>{i.style.animationFillMode==="forwards"&&(i.style.animationFillMode=f)})}},p=g=>{g.target===i&&(l.current=C(n.current))};return i.addEventListener("animationstart",p),i.addEventListener("animationcancel",b),i.addEventListener("animationend",b),()=>{T.clearTimeout(m),i.removeEventListener("animationstart",p),i.removeEventListener("animationcancel",b),i.removeEventListener("animationend",b)}}else u("ANIMATION_END")},[i,u]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:r.useCallback(m=>{m&&(n.current=getComputedStyle(m)),o(m)},[])}}function C(t){return(t==null?void 0:t.animationName)||"none"}function _e(t){var n,d;let i=(n=Object.getOwnPropertyDescriptor(t.props,"ref"))==null?void 0:n.get,o=i&&"isReactWarning"in i&&i.isReactWarning;return o?t.ref:(i=(d=Object.getOwnPropertyDescriptor(t,"ref"))==null?void 0:d.get,o=i&&"isReactWarning"in i&&i.isReactWarning,o?t.props.ref:t.props.ref||t.ref)}var M="Tabs",[we,Tt]=Re(M,[ne]),oe=ne(),[Ie,F]=we(M),ae=r.forwardRef((t,i)=>{const{__scopeTabs:o,value:n,onValueChange:d,defaultValue:l,orientation:c="horizontal",dir:s,activationMode:u="automatic",...m}=t,T=xe(s),[b,p]=qe({prop:n,onChange:d,defaultProp:l});return e.jsx(Ie,{scope:o,baseId:Ce(),value:b,onValueChange:p,orientation:c,dir:T,activationMode:u,children:e.jsx(_.div,{dir:T,"data-orientation":c,...m,ref:i})})});ae.displayName=M;var se="TabsList",re=r.forwardRef((t,i)=>{const{__scopeTabs:o,loop:n=!0,...d}=t,l=F(se,o),c=oe(o);return e.jsx(ge,{asChild:!0,...c,orientation:l.orientation,dir:l.dir,loop:n,children:e.jsx(_.div,{role:"tablist","aria-orientation":l.orientation,...d,ref:i})})});re.displayName=se;var de="TabsTrigger",ce=r.forwardRef((t,i)=>{const{__scopeTabs:o,value:n,disabled:d=!1,...l}=t,c=F(de,o),s=oe(o),u=me(c.baseId,n),m=be(c.baseId,n),T=n===c.value;return e.jsx(ve,{asChild:!0,...s,focusable:!d,active:T,children:e.jsx(_.button,{type:"button",role:"tab","aria-selected":T,"aria-controls":m,"data-state":T?"active":"inactive","data-disabled":d?"":void 0,disabled:d,id:u,...l,ref:i,onMouseDown:U(t.onMouseDown,b=>{!d&&b.button===0&&b.ctrlKey===!1?c.onValueChange(n):b.preventDefault()}),onKeyDown:U(t.onKeyDown,b=>{[" ","Enter"].includes(b.key)&&c.onValueChange(n)}),onFocus:U(t.onFocus,()=>{const b=c.activationMode!=="manual";!T&&!d&&b&&c.onValueChange(n)})})})});ce.displayName=de;var ue="TabsContent",le=r.forwardRef((t,i)=>{const{__scopeTabs:o,value:n,forceMount:d,children:l,...c}=t,s=F(ue,o),u=me(s.baseId,n),m=be(s.baseId,n),T=n===s.value,b=r.useRef(T);return r.useEffect(()=>{const p=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(p)},[]),e.jsx(ie,{present:d||T,children:({present:p})=>e.jsx(_.div,{"data-state":T?"active":"inactive","data-orientation":s.orientation,role:"tabpanel","aria-labelledby":u,hidden:!p,id:m,tabIndex:0,...c,ref:i,style:{...t.style,animationDuration:b.current?"0s":void 0},children:p&&l})})});le.displayName=ue;function me(t,i){return`${t}-trigger-${i}`}function be(t,i){return`${t}-content-${i}`}var Le=ae,Ue=re,Me=ce,Fe=le;const Oe=(t,i)=>t.filter(o=>{var d;const n=(d=o.ref)==null?void 0:d.current;return n?n.offsetLeft+n.offsetWidth>(i==null?void 0:i.scrollLeft)+i.offsetWidth||n.offsetLeft-i.scrollLeft<0:!1}),j=(t,i)=>{const o=i.current,n=t==null?void 0:t.querySelector('[data-state="active"]');if(!t||!(n instanceof HTMLButtonElement)||!(o instanceof HTMLSpanElement))return;const d=(t==null?void 0:t.scrollLeft)>(n==null?void 0:n.offsetLeft),l=(n==null?void 0:n.offsetLeft)+(n==null?void 0:n.offsetWidth)>(t==null?void 0:t.offsetWidth);d?(t.offsetWidth>n.offsetWidth+n.offsetLeft?o.style.left=`${n.offsetLeft}px`:o.style.left=`${t.offsetWidth-n.offsetWidth}px`,o.style.width=`${n==null?void 0:n.offsetWidth}px`):l?(o.style.left=`${t.clientWidth-n.offsetWidth}px`,o.style.width=`${n.offsetWidth}px`):(o.style.left=`${n.offsetLeft}px`,o.style.width=`${n.offsetWidth}px`)},Pe=({activeTab:t})=>{const i=r.useRef(null),o=r.useRef(null),[n,d]=r.useState([]),[l,c]=r.useState([]);return r.useEffect(()=>{const s=i.current,u=s==null?void 0:s.querySelector('[data-state="active"]');u instanceof HTMLButtonElement&&s instanceof HTMLDivElement&&(j(s,o),u.scrollIntoView({behavior:"smooth",block:"nearest",inline:"end"}))},[t,o]),r.useLayoutEffect(()=>{var m;const s=i.current,u=s==null?void 0:s.querySelector('[data-state="active"]');if(s instanceof HTMLDivElement&&u instanceof HTMLButtonElement){j(s,o);const T=new MutationObserver(()=>{u.scrollIntoView({behavior:"instant",block:"nearest",inline:"end"}),j(s,o)});s.parentNode&&T.observe(s.parentNode,{childList:!0});const b=new IntersectionObserver(()=>{c(Oe(n,s)),j(s,o)},{root:s,threshold:1});for(const p of n)(m=p.ref)!=null&&m.current&&b.observe(p.ref.current);return()=>{b.disconnect(),T.disconnect()}}},[n,i,o]),{triggerListRef:i,activeIndicatorRef:o,triggersOutOfView:l,triggers:n,addTrigger:s=>{d(u=>[...u,s])}}},We="_root_gfrd2_5",De="_triggerList_gfrd2_12",$e="_triggerListWrapper_gfrd2_26",Ve="_trigger_gfrd2_12",Ee="_content_gfrd2_75",ke="_activeIndicator_gfrd2_79",x={root:We,triggerList:De,triggerListWrapper:$e,trigger:Ve,content:Ee,activeIndicator:ke},O=r.createContext({value:"",disabled:!1}),Te=r.createContext({addTrigger:()=>{}}),w=({children:t,activeTab:i,defaultActiveTab:o,onActiveTabChange:n,size:d="medium",...l},c)=>{var h;const[s,u]=je({prop:i,defaultProp:o,onChange:n}),m=r.useCallback(f=>{u(f)},[u]),{triggerListRef:T,activeIndicatorRef:b,triggers:p,triggersOutOfView:g,addTrigger:v}=Pe({activeTab:s});return e.jsx(Te.Provider,{value:{addTrigger:v},children:e.jsxs(Le,{ref:c,className:x.root,onValueChange:m,value:s??((h=p[0])==null?void 0:h.value),...l,children:[e.jsxs("div",{className:x.triggerListWrapper,children:[e.jsx(Ue,{ref:T,"data-size":d,className:x.triggerList,children:p.map(f=>e.jsx(Me,{value:f.value,disabled:f.disabled,className:x.trigger,ref:f.ref,children:f.element},f.value))}),e.jsxs(q.Root,{children:[g.length>0&&e.jsx(q.Trigger,{"data-test-id":"overflow-items-dropdown-trigger",children:e.jsx(Se,{emphasis:"default",aspect:"square",size:"small",children:e.jsx(pe,{size:16})})}),e.jsx(q.Content,{align:"end","data-test-id":"overflow-items-dropdown-content",children:g.map(f=>r.createElement(q.Item,{...f.props,disabled:f.disabled,onSelect:()=>m(f.value),key:f.value},f.element))})]}),e.jsx("span",{"data-test-id":"active-tab-indicator",ref:b,className:x.activeIndicator})]}),t]})})};w.displayName="Tabs.Root";const I=({children:t,value:i,disabled:o})=>e.jsx(O.Provider,{value:{value:i,disabled:o},children:t});I.displayName="Tabs.Tab";const P=({children:t,...i},o)=>{const{value:n,disabled:d}=r.useContext(O),{addTrigger:l}=r.useContext(Te),c=r.useRef(null);return r.useEffect(()=>{l({ref:c||o,value:n??"",disabled:d,props:i,element:t})},[]),null};P.displayName="Tabs.Trigger";const L=({children:t,...i},o)=>{const{value:n}=r.useContext(O);return e.jsx(Fe,{ref:o,...i,className:x.content,value:n??"",children:t})};L.displayName="Tabs.Content";const a={Root:r.forwardRef(w),Tab:r.forwardRef(I),Trigger:r.forwardRef(P),Content:r.forwardRef(L)};w.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultActiveTab:{required:!1,tsType:{name:"string"},description:`The default active tab
Used for uncontrolled components`},activeTab:{required:!1,tsType:{name:"string"},description:"The controlled value of the active tab"},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'large'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The height of the tabs
@default 'medium'`,defaultValue:{value:"'medium'",computed:!1}},onActiveTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the active tab changes"}}};I.__docgenInfo={description:"",methods:[],displayName:"Tabs.Tab",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};L.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const pt={title:"Components/Tabs",component:w,subcomponents:{"Tabs.Tab":I,"Tabs.Trigger":P,"Tabs.Content":L},tags:["autodocs"],parameters:{status:{type:"released"}},args:{onActiveTabChange:fe("onActiveTabChange")}},S={render:t=>e.jsxs(a.Root,{...t,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},R={args:{defaultActiveTab:"second"},render:t=>e.jsxs(a.Root,{...t,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},N={args:{defaultActiveTab:"second"},render:t=>{const[i,o]=r.useState("second");return e.jsxs(a.Root,{...t,activeTab:i,onActiveTabChange:o,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})}},y={render:t=>e.jsxs(a.Root,{...t,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:e.jsx("span",{children:"First Tab"})}),e.jsx(a.Content,{children:"First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),e.jsxs(a.Tab,{value:"second",disabled:!0,children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",disabled:!0,children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},A={render:t=>e.jsxs(a.Root,{...t,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsxs(a.Trigger,{children:[e.jsx(D,{size:20}),"First Tab"]}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsxs(a.Trigger,{children:["Second Tab",e.jsx(D,{size:20})]}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",disabled:!0,children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})};var V,E,k;S.parameters={...S.parameters,docs:{...(V=S.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(k=(E=S.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};var z,B,H;R.parameters={...R.parameters,docs:{...(z=R.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(H=(B=R.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var G,K,J;N.parameters={...N.parameters,docs:{...(G=N.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(J=(K=N.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var Q,X,Y;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Y=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,ee,te;A.parameters={...A.parameters,docs:{...(Z=A.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(te=(ee=A.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};const ft=["Default","WithDefaultActiveTab","ExternallyControlled","DisabledTabs","WithDecorator"];export{S as Default,y as DisabledTabs,N as ExternallyControlled,A as WithDecorator,R as WithDefaultActiveTab,ft as __namedExportsOrder,pt as default};
