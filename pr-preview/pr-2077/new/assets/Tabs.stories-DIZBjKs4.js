import{j as t}from"./jsx-runtime-Nms4Y4qS.js";import{r}from"./index-BwDkhjyp.js";import{j as pe,c as D}from"./fondue-icons331-CXtkQtTl.js";import{a as fe}from"./chunk-454WOBUV-CM0pFb8Z.js";import{a as $,c as U}from"./index-DOnKqARA.js";import{c as ne,R as ge,I as he}from"./index-ImmjAmjo.js";import{u as xe,P as L}from"./index-Brw_kfkv.js";import{u as ve}from"./index-C8IlRUt1.js";import{u as qe}from"./index-DGaPG0k3.js";import{u as Ce}from"./index-DduqEaLY.js";import{u as je}from"./useControllableState-Bxhgt0vK.js";import{B as Re}from"./Button-Bmc9bttI.js";import{h as q}from"./Dropdown-CyS00lBz.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./index-BCwfsm-V.js";import"./index-BWD2N0gV.js";import"./index-DxjWwZXO.js";import"./styleUtilities-BnElyh0X.js";import"./focusStyle-IgMhxCMT.js";import"./index-9q6yCIGA.js";import"./index-kUwV4muI.js";import"./usePreventDropdownOverflow-hl17Ppn0.js";import"./index-BwIM2_zL.js";function Se(n,e=[]){let i=[];function o(l,u){const c=r.createContext(u),d=i.length;i=[...i,u];const m=b=>{var W;const{scope:p,children:f,...h}=b,x=((W=p==null?void 0:p[n])==null?void 0:W[d])||c,g=r.useMemo(()=>h,Object.values(h));return t.jsx(x.Provider,{value:g,children:f})};m.displayName=l+"Provider";function T(b,p){var x;const f=((x=p==null?void 0:p[n])==null?void 0:x[d])||c,h=r.useContext(f);if(h)return h;if(u!==void 0)return u;throw new Error(`\`${b}\` must be used within \`${l}\``)}return[m,T]}const s=()=>{const l=i.map(u=>r.createContext(u));return function(c){const d=(c==null?void 0:c[n])||l;return r.useMemo(()=>({[`__scope${n}`]:{...c,[n]:d}}),[c,d])}};return s.scopeName=n,[o,Ne(s,...e)]}function Ne(...n){const e=n[0];if(n.length===1)return e;const i=()=>{const o=n.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(l){const u=o.reduce((c,{useScope:d,scopeName:m})=>{const b=d(l)[`__scope${m}`];return{...c,...b}},{});return r.useMemo(()=>({[`__scope${e.scopeName}`]:u}),[u])}};return i.scopeName=e.scopeName,i}function ye(n,e){return r.useReducer((i,o)=>e[i][o]??i,n)}var ie=n=>{const{present:e,children:i}=n,o=Ae(e),s=typeof i=="function"?i({present:o.isPresent}):r.Children.only(i),l=xe(o.ref,Le(s));return typeof i=="function"||o.isPresent?r.cloneElement(s,{ref:l}):null};ie.displayName="Presence";function Ae(n){const[e,i]=r.useState(),o=r.useRef({}),s=r.useRef(n),l=r.useRef("none"),u=n?"mounted":"unmounted",[c,d]=ye(u,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const m=C(o.current);l.current=c==="mounted"?m:"none"},[c]),$(()=>{const m=o.current,T=s.current;if(T!==n){const p=l.current,f=C(m);n?d("MOUNT"):f==="none"||(m==null?void 0:m.display)==="none"?d("UNMOUNT"):d(T&&p!==f?"ANIMATION_OUT":"UNMOUNT"),s.current=n}},[n,d]),$(()=>{if(e){let m;const T=e.ownerDocument.defaultView??window,b=f=>{const x=C(o.current).includes(f.animationName);if(f.target===e&&x&&(d("ANIMATION_END"),!s.current)){const g=e.style.animationFillMode;e.style.animationFillMode="forwards",m=T.setTimeout(()=>{e.style.animationFillMode==="forwards"&&(e.style.animationFillMode=g)})}},p=f=>{f.target===e&&(l.current=C(o.current))};return e.addEventListener("animationstart",p),e.addEventListener("animationcancel",b),e.addEventListener("animationend",b),()=>{T.clearTimeout(m),e.removeEventListener("animationstart",p),e.removeEventListener("animationcancel",b),e.removeEventListener("animationend",b)}}else d("ANIMATION_END")},[e,d]),{isPresent:["mounted","unmountSuspended"].includes(c),ref:r.useCallback(m=>{m&&(o.current=getComputedStyle(m)),i(m)},[])}}function C(n){return(n==null?void 0:n.animationName)||"none"}function Le(n){var o,s;let e=(o=Object.getOwnPropertyDescriptor(n.props,"ref"))==null?void 0:o.get,i=e&&"isReactWarning"in e&&e.isReactWarning;return i?n.ref:(e=(s=Object.getOwnPropertyDescriptor(n,"ref"))==null?void 0:s.get,i=e&&"isReactWarning"in e&&e.isReactWarning,i?n.props.ref:n.props.ref||n.ref)}var M="Tabs",[we,Tt]=Se(M,[ne]),oe=ne(),[_e,F]=we(M),ae=r.forwardRef((n,e)=>{const{__scopeTabs:i,value:o,onValueChange:s,defaultValue:l,orientation:u="horizontal",dir:c,activationMode:d="automatic",...m}=n,T=ve(c),[b,p]=qe({prop:o,onChange:s,defaultProp:l});return t.jsx(_e,{scope:i,baseId:Ce(),value:b,onValueChange:p,orientation:u,dir:T,activationMode:d,children:t.jsx(L.div,{dir:T,"data-orientation":u,...m,ref:e})})});ae.displayName=M;var se="TabsList",re=r.forwardRef((n,e)=>{const{__scopeTabs:i,loop:o=!0,...s}=n,l=F(se,i),u=oe(i);return t.jsx(ge,{asChild:!0,...u,orientation:l.orientation,dir:l.dir,loop:o,children:t.jsx(L.div,{role:"tablist","aria-orientation":l.orientation,...s,ref:e})})});re.displayName=se;var de="TabsTrigger",ce=r.forwardRef((n,e)=>{const{__scopeTabs:i,value:o,disabled:s=!1,...l}=n,u=F(de,i),c=oe(i),d=me(u.baseId,o),m=be(u.baseId,o),T=o===u.value;return t.jsx(he,{asChild:!0,...c,focusable:!s,active:T,children:t.jsx(L.button,{type:"button",role:"tab","aria-selected":T,"aria-controls":m,"data-state":T?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:d,...l,ref:e,onMouseDown:U(n.onMouseDown,b=>{!s&&b.button===0&&b.ctrlKey===!1?u.onValueChange(o):b.preventDefault()}),onKeyDown:U(n.onKeyDown,b=>{[" ","Enter"].includes(b.key)&&u.onValueChange(o)}),onFocus:U(n.onFocus,()=>{const b=u.activationMode!=="manual";!T&&!s&&b&&u.onValueChange(o)})})})});ce.displayName=de;var ue="TabsContent",le=r.forwardRef((n,e)=>{const{__scopeTabs:i,value:o,forceMount:s,children:l,...u}=n,c=F(ue,i),d=me(c.baseId,o),m=be(c.baseId,o),T=o===c.value,b=r.useRef(T);return r.useEffect(()=>{const p=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(p)},[]),t.jsx(ie,{present:s||T,children:({present:p})=>t.jsx(L.div,{"data-state":T?"active":"inactive","data-orientation":c.orientation,role:"tabpanel","aria-labelledby":d,hidden:!p,id:m,tabIndex:0,...u,ref:e,style:{...n.style,animationDuration:b.current?"0s":void 0},children:p&&l})})});le.displayName=ue;function me(n,e){return`${n}-trigger-${e}`}function be(n,e){return`${n}-content-${e}`}var Ie=ae,Ue=re,Me=ce,Fe=le;const Oe=(n,e)=>{var o;const i=[];if(e)for(const s of n){const l=(o=s.ref)==null?void 0:o.current;l&&(l.offsetLeft+l.offsetWidth>(e==null?void 0:e.scrollLeft)+e.offsetWidth||l.offsetLeft-e.scrollLeft<0)&&i.push({value:s.value,disabled:s.disabled,element:r.cloneElement(s.element,{ref:null})})}return i},j=(n,e,i)=>{const o=i.current;if(!n||!e)return;const s=(n==null?void 0:n.scrollLeft)>(e==null?void 0:e.offsetLeft),l=(e==null?void 0:e.offsetLeft)+(e==null?void 0:e.offsetWidth)>(n==null?void 0:n.offsetWidth);s?(n.offsetWidth>e.offsetWidth+e.offsetLeft?o.style.left=`${e.offsetLeft}px`:o.style.left=`${n.offsetWidth-e.offsetWidth}px`,o.style.width=`${e==null?void 0:e.offsetWidth}px`):l?(o.style.left=`${n.clientWidth-e.offsetWidth}px`,o.style.width=`${e.offsetWidth}px`):(o.style.left=`${e.offsetLeft}px`,o.style.width=`${e.offsetWidth}px`)},Pe=({activeTab:n})=>{const e=r.useRef(null),i=r.useRef(null),[o,s]=r.useState([]),[l,u]=r.useState([]);return r.useEffect(()=>{var m;const c=(m=e.current)==null?void 0:m.querySelector('[data-state="active"]'),d=e.current;c instanceof HTMLButtonElement&&d instanceof HTMLDivElement&&(j(d,c,i),c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"end"}))},[n,i]),r.useLayoutEffect(()=>{var m,T;const c=(m=e.current)==null?void 0:m.querySelector('[data-state="active"]'),d=e.current;if(d instanceof HTMLDivElement&&c instanceof HTMLButtonElement){j(d,c,i);const b=new MutationObserver(()=>{c.scrollIntoView({behavior:"instant",block:"nearest",inline:"end"}),j(d,c,i)});d.parentNode&&b.observe(d.parentNode,{childList:!0});const p=new IntersectionObserver(()=>{u(Oe(o,d)),j(d,c,i)},{root:d,threshold:1});for(const f of o)(T=f.ref)!=null&&T.current&&p.observe(f.ref.current);return()=>{p.disconnect(),b.disconnect()}}},[o,e,i]),{triggerListRef:e,activeIndicatorRef:i,triggersOutOfView:l,triggers:o,addTrigger:c=>{s(d=>[...d,c])}}},We="_root_gfrd2_5",De="_triggerList_gfrd2_12",$e="_triggerListWrapper_gfrd2_26",Ve="_trigger_gfrd2_12",ze="_content_gfrd2_75",ke="_activeIndicator_gfrd2_79",v={root:We,triggerList:De,triggerListWrapper:$e,trigger:Ve,content:ze,activeIndicator:ke},O=r.createContext({value:"",disabled:!1}),Te=r.createContext({addTrigger:()=>{}}),w=({children:n,activeTab:e,defaultActiveTab:i,onActiveTabChange:o,size:s="medium",...l},u)=>{var x;const[c,d]=je({prop:e,defaultProp:i,onChange:o}),m=r.useCallback(g=>{d(g)},[d]),{triggerListRef:T,activeIndicatorRef:b,triggers:p,triggersOutOfView:f,addTrigger:h}=Pe({activeTab:c});return t.jsx(Te.Provider,{value:{addTrigger:h},children:t.jsxs(Ie,{ref:u,className:v.root,onValueChange:m,value:c??((x=p[0])==null?void 0:x.value),...l,children:[t.jsxs("div",{className:v.triggerListWrapper,children:[t.jsx(Ue,{ref:T,"data-size":s,className:v.triggerList,children:p.map(g=>t.jsx(Me,{value:g.value,disabled:g.disabled,className:v.trigger,asChild:!0,children:g.element},g.value))}),t.jsxs(q.Root,{children:[f.length>0&&t.jsx(q.Trigger,{"data-test-id":"overflow-items-dropdown-trigger",children:t.jsx(Re,{emphasis:"default",aspect:"square",size:"small",children:t.jsx(pe,{size:16})})}),t.jsx(q.Content,{align:"end","data-test-id":"overflow-items-dropdown-content",children:f.map(g=>t.jsx(q.Item,{disabled:g.disabled,onSelect:()=>m(g.value),children:g.element},g.value))})]}),t.jsx("span",{"data-test-id":"active-tab-indicator",ref:b,className:v.activeIndicator})]}),n]})})};w.displayName="Tabs.Root";const _=({children:n,value:e,disabled:i})=>t.jsx(O.Provider,{value:{value:e,disabled:i},children:n});_.displayName="Tabs.Tab";const P=({children:n,...e},i)=>{const{value:o,disabled:s}=r.useContext(O),{addTrigger:l}=r.useContext(Te),u=r.useRef(null);return r.useEffect(()=>{l({ref:u||i,value:o??"",disabled:s,element:t.jsx("button",{ref:u||i,...e,children:n})})},[l,n,s,u,i,o,e]),null};P.displayName="Tabs.Trigger";const I=({children:n,...e},i)=>{const{value:o}=r.useContext(O);return t.jsx(Fe,{ref:i,...e,className:v.content,value:o??"",children:n})};I.displayName="Tabs.Content";const a={Root:r.forwardRef(w),Tab:r.forwardRef(_),Trigger:r.forwardRef(P),Content:r.forwardRef(I)};w.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultActiveTab:{required:!1,tsType:{name:"string"},description:`The default active tab
Used for uncontrolled components`},activeTab:{required:!1,tsType:{name:"string"},description:"The controlled value of the active tab"},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'large'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The height of the tabs
@default 'medium'`,defaultValue:{value:"'medium'",computed:!1}},onActiveTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the active tab changes"}}};_.__docgenInfo={description:"",methods:[],displayName:"Tabs.Tab",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};I.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const pt={title:"Components/Tabs",component:w,subcomponents:{"Tabs.Tab":_,"Tabs.Trigger":P,"Tabs.Content":I},tags:["autodocs"],parameters:{status:{type:"released"}},args:{onActiveTabChange:fe("onActiveTabChange")}},R={render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:"First Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},S={args:{defaultActiveTab:"second"},render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:"First Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},N={args:{defaultActiveTab:"second"},render:n=>{const[e,i]=r.useState("second");return t.jsxs(a.Root,{...n,activeTab:e,onActiveTabChange:i,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:"First Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})}},y={render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsx(a.Trigger,{children:t.jsx("span",{children:"First Tab"})}),t.jsx(a.Content,{children:"First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),t.jsxs(a.Tab,{value:"second",disabled:!0,children:[t.jsx(a.Trigger,{children:"Second Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",disabled:!0,children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},A={render:n=>t.jsxs(a.Root,{...n,children:[t.jsxs(a.Tab,{value:"first",children:[t.jsxs(a.Trigger,{children:[t.jsx(D,{size:20}),"First Tab"]}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"second",children:[t.jsxs(a.Trigger,{children:["Second Tab",t.jsx(D,{size:20})]}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),t.jsxs(a.Tab,{value:"third",disabled:!0,children:[t.jsx(a.Trigger,{children:"Third Tab"}),t.jsxs(a.Content,{children:[t.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})};var V,z,k;R.parameters={...R.parameters,docs:{...(V=R.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(k=(z=R.parameters)==null?void 0:z.docs)==null?void 0:k.source}}};var B,G,H;S.parameters={...S.parameters,docs:{...(B=S.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
