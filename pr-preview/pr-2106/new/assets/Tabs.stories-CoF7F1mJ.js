import{j as e}from"./jsx-runtime-BvI67ttx.js";import{r}from"./index-BEEaWAwe.js";import{f as we,c as z}from"./fondue-icons348-B-f5GiGz.js";import{a as Ae}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{c as W}from"./index-0ATwCc6h.js";import{c as We}from"./index-C-sPhGY9.js";import{c as qe,R as Ne,I as Pe}from"./index-DmVeIqx8.js";import{P as De}from"./index-Dmgi06lZ.js";import{P as _}from"./index-MJItr2zu.js";import{u as Me}from"./index-CrYLdEgy.js";import{u as Oe}from"./index-COt05XGC.js";import{u as Ve}from"./index-CiGoKWYq.js";import{u as $e}from"./useControllableState-DwHvu97v.js";import{B as ze}from"./Button-Cg-ELRLi.js";import{h}from"./Dropdown-CzGceDnE.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CtRu48qb.js";import"./index-DKR_hWqx.js";import"./index-inNNsB9i.js";import"./index-CJX6plO5.js";import"./styleUtilities-B-n3-6Ow.js";import"./focusStyle-IgMhxCMT.js";import"./index-k5I1OPLU.js";import"./index-C0eIB1ad.js";import"./Combination-BW6ghCKU.js";var N="Tabs",[ke,yi]=We(N,[qe]),ve=qe(),[Be,P]=ke(N),fe=r.forwardRef((t,n)=>{const{__scopeTabs:o,value:a,onValueChange:d,defaultValue:u,orientation:c="horizontal",dir:s,activationMode:b="automatic",...p}=t,l=Me(s),[m,g]=Oe({prop:a,onChange:d,defaultProp:u});return e.jsx(Be,{scope:o,baseId:Ve(),value:m,onValueChange:g,orientation:c,dir:l,activationMode:b,children:e.jsx(_.div,{dir:l,"data-orientation":c,...p,ref:n})})});fe.displayName=N;var Ce="TabsList",je=r.forwardRef((t,n)=>{const{__scopeTabs:o,loop:a=!0,...d}=t,u=P(Ce,o),c=ve(o);return e.jsx(Ne,{asChild:!0,...c,orientation:u.orientation,dir:u.dir,loop:a,children:e.jsx(_.div,{role:"tablist","aria-orientation":u.orientation,...d,ref:n})})});je.displayName=Ce;var Se="TabsTrigger",Le=r.forwardRef((t,n)=>{const{__scopeTabs:o,value:a,disabled:d=!1,...u}=t,c=P(Se,o),s=ve(o),b=ye(c.baseId,a),p=Fe(c.baseId,a),l=a===c.value;return e.jsx(Pe,{asChild:!0,...s,focusable:!d,active:l,children:e.jsx(_.button,{type:"button",role:"tab","aria-selected":l,"aria-controls":p,"data-state":l?"active":"inactive","data-disabled":d?"":void 0,disabled:d,id:b,...u,ref:n,onMouseDown:W(t.onMouseDown,m=>{!d&&m.button===0&&m.ctrlKey===!1?c.onValueChange(a):m.preventDefault()}),onKeyDown:W(t.onKeyDown,m=>{[" ","Enter"].includes(m.key)&&c.onValueChange(a)}),onFocus:W(t.onFocus,()=>{const m=c.activationMode!=="manual";!l&&!d&&m&&c.onValueChange(a)})})})});Le.displayName=Se;var Re="TabsContent",Ue=r.forwardRef((t,n)=>{const{__scopeTabs:o,value:a,forceMount:d,children:u,...c}=t,s=P(Re,o),b=ye(s.baseId,a),p=Fe(s.baseId,a),l=a===s.value,m=r.useRef(l);return r.useEffect(()=>{const g=requestAnimationFrame(()=>m.current=!1);return()=>cancelAnimationFrame(g)},[]),e.jsx(De,{present:d||l,children:({present:g})=>e.jsx(_.div,{"data-state":l?"active":"inactive","data-orientation":s.orientation,role:"tabpanel","aria-labelledby":b,hidden:!g,id:p,tabIndex:0,...c,ref:n,style:{...t.style,animationDuration:m.current?"0s":void 0},children:g&&u})})});Ue.displayName=Re;function ye(t,n){return`${t}-trigger-${n}`}function Fe(t,n){return`${t}-content-${n}`}var He=fe,Ge=je,Ke=Le,Je=Ue;const Qe=(t,n)=>t.filter(o=>{var d;const a=(d=o.ref)==null?void 0:d.current;return a?a.offsetLeft+a.offsetWidth>(n==null?void 0:n.scrollLeft)+n.offsetWidth||a.offsetLeft-n.scrollLeft<0:!1}),q=(t,n)=>{const o=n.current,a=t==null?void 0:t.querySelector('[data-state="active"]');if(!t||!(a instanceof HTMLButtonElement)||!(o instanceof HTMLSpanElement))return;const d=(t==null?void 0:t.scrollLeft)>(a==null?void 0:a.offsetLeft),u=(a==null?void 0:a.offsetLeft)+(a==null?void 0:a.offsetWidth)>(t==null?void 0:t.offsetWidth);d?(t.offsetWidth>a.offsetWidth+a.offsetLeft?o.style.left=`${a.offsetLeft}px`:o.style.left=`${t.offsetWidth-a.offsetWidth}px`,o.style.width=`${a==null?void 0:a.offsetWidth}px`):u?(o.style.left=`${t.clientWidth-a.offsetWidth}px`,o.style.width=`${a.offsetWidth}px`):(o.style.left=`${a.offsetLeft}px`,o.style.width=`${a.offsetWidth}px`)},Xe=({activeTab:t})=>{const n=r.useRef(null),o=r.useRef(null),[a,d]=r.useState([]),[u,c]=r.useState([]);return r.useEffect(()=>{const s=n.current,b=s==null?void 0:s.querySelector('[data-state="active"]');b instanceof HTMLButtonElement&&s instanceof HTMLDivElement&&(q(s,o),b.scrollIntoView({behavior:"smooth",block:"nearest",inline:"end"}))},[t,o]),r.useLayoutEffect(()=>{var p;const s=n.current,b=s==null?void 0:s.querySelector('[data-state="active"]');if(s instanceof HTMLDivElement&&b instanceof HTMLButtonElement){q(s,o);const l=new MutationObserver(()=>{b.scrollIntoView({behavior:"instant",block:"nearest",inline:"end"}),q(s,o)});s.parentNode&&l.observe(s.parentNode,{childList:!0});const m=new IntersectionObserver(()=>{c(Qe(a,s)),q(s,o)},{root:s,threshold:1});for(const g of a)(p=g.ref)!=null&&p.current&&m.observe(g.ref.current);return()=>{m.disconnect(),l.disconnect()}}},[a,n,o]),{triggerListRef:n,activeIndicatorRef:o,triggersOutOfView:u,triggers:a,addTrigger:s=>{d(b=>[...b,s])}}},Ye="_root_1msyd_5",Ze="_triggerList_1msyd_14",Ee="_triggerListWrapper_1msyd_28",ei="_trigger_1msyd_14",ii="_content_1msyd_78",ti="_activeIndicator_1msyd_91",x={root:Ye,triggerList:Ze,triggerListWrapper:Ee,trigger:ei,content:ii,activeIndicator:ti},D=r.createContext({value:"",disabled:!1}),_e=r.createContext({addTrigger:()=>{}}),I=({padding:t="compact",activeTab:n,defaultActiveTab:o,size:a="medium",onActiveTabChange:d,children:u,...c},s)=>{var $;const[b,p]=$e({prop:n,defaultProp:o,onChange:d}),l=r.useCallback(T=>{p(T)},[p]),{triggerListRef:m,activeIndicatorRef:g,triggers:O,triggersOutOfView:V,addTrigger:Ie}=Xe({activeTab:b});return e.jsx(_e.Provider,{value:{addTrigger:Ie},children:e.jsxs(He,{ref:s,className:x.root,onValueChange:l,value:b??(($=O[0])==null?void 0:$.value),"data-tabs-content-padding":t,...c,children:[e.jsxs("div",{className:x.triggerListWrapper,children:[e.jsx(Ge,{ref:m,"data-size":a,className:x.triggerList,children:O.map(T=>r.createElement(Ke,{...T.props,key:T.value,value:T.value,disabled:T.disabled,className:x.trigger,ref:T.ref},T.element))}),e.jsxs(h.Root,{children:[V.length>0&&e.jsx(h.Trigger,{"data-test-id":"overflow-items-dropdown-trigger",children:e.jsx(ze,{emphasis:"default",aspect:"square",size:"small",children:e.jsx(we,{size:16})})}),e.jsx(h.Content,{align:"end","data-test-id":"overflow-items-dropdown-content",children:V.map(T=>r.createElement(h.Item,{...T.props,disabled:T.disabled,onSelect:()=>l(T.value),key:T.value},T.element))})]}),e.jsx("span",{"data-test-id":"active-tab-indicator",ref:g,className:x.activeIndicator})]}),u]})})};I.displayName="Tabs.Root";const w=({children:t,value:n,disabled:o})=>e.jsx(D.Provider,{value:{value:n,disabled:o},children:t});w.displayName="Tabs.Tab";const M=({children:t,...n},o)=>{const{value:a,disabled:d}=r.useContext(D),{addTrigger:u}=r.useContext(_e),c=r.useRef(null);return r.useEffect(()=>{u({ref:c||o,value:a??"",disabled:d,props:n,element:t})},[]),null};M.displayName="Tabs.Trigger";const A=({children:t,...n},o)=>{const{value:a}=r.useContext(D);return e.jsx(Je,{ref:o,...n,className:x.content,value:a??"",children:t})};A.displayName="Tabs.Content";const i={Root:r.forwardRef(I),Tab:r.forwardRef(w),Trigger:r.forwardRef(M),Content:r.forwardRef(A)};I.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'tight' | 'compact' | 'comfortable' | 'spacious'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'tight'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'comfortable'"},{name:"literal",value:"'spacious'"}]},description:`Define the padding of the dialog
@default "compact"`,defaultValue:{value:"'compact'",computed:!1}},defaultActiveTab:{required:!1,tsType:{name:"string"},description:`The default active tab
Used for uncontrolled components`},activeTab:{required:!1,tsType:{name:"string"},description:"The controlled value of the active tab"},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'large'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The height of the tabs
@default 'medium'`,defaultValue:{value:"'medium'",computed:!1}},onActiveTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the active tab changes"}}};w.__docgenInfo={description:"",methods:[],displayName:"Tabs.Tab",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};A.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const Fi={title:"Components/Tabs",component:I,subcomponents:{"Tabs.Tab":w,"Tabs.Trigger":M,"Tabs.Content":A},tags:["autodocs"],parameters:{status:{type:"released"}},args:{onActiveTabChange:Ae("onActiveTabChange")}},v={render:t=>e.jsxs(i.Root,{...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},f={args:{defaultActiveTab:"second"},render:t=>e.jsxs(i.Root,{...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},C={args:{defaultActiveTab:"second"},render:t=>{const[n,o]=r.useState("second");return e.jsxs(i.Root,{...t,activeTab:n,onActiveTabChange:o,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})}},j={render:t=>e.jsxs(i.Root,{...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:e.jsx("span",{children:"First Tab"})}),e.jsx(i.Content,{children:"First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),e.jsxs(i.Tab,{value:"second",disabled:!0,children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",disabled:!0,children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},S={render:t=>e.jsxs(i.Root,{...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsxs(i.Trigger,{children:[e.jsx(z,{size:20}),"First Tab"]}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsxs(i.Trigger,{children:["Second Tab",e.jsx(z,{size:20})]}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",disabled:!0,children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},L={args:{padding:"comfortable"},render:t=>e.jsxs(i.Root,{padding:"none",...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},R={render:t=>e.jsxs(i.Root,{padding:"tight",...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},U={render:t=>e.jsxs(i.Root,{padding:"compact",...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},y={render:t=>e.jsxs(i.Root,{padding:"comfortable",...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},F={render:t=>e.jsxs(i.Root,{padding:"spacious",...t,children:[e.jsxs(i.Tab,{value:"first",children:[e.jsx(i.Trigger,{children:"First Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"second",children:[e.jsx(i.Trigger,{children:"Second Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(i.Tab,{value:"third",children:[e.jsx(i.Trigger,{children:"Third Tab"}),e.jsxs(i.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})};var k,B,H;v.parameters={...v.parameters,docs:{...(k=v.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(H=(B=v.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var G,K,J;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(J=(K=f.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var Q,X,Y;C.parameters={...C.parameters,docs:{...(Q=C.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Y=(X=C.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,E,ee;j.parameters={...j.parameters,docs:{...(Z=j.parameters)==null?void 0:Z.docs,source:{originalSource:`{
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
}`,...(ee=(E=j.parameters)==null?void 0:E.docs)==null?void 0:ee.source}}};var ie,te,ae;S.parameters={...S.parameters,docs:{...(ie=S.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(ae=(te=S.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var oe,ne,se;L.parameters={...L.parameters,docs:{...(oe=L.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    padding: 'comfortable'
  },
  render: args => <Tabs.Root padding="none" {...args}>
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
}`,...(se=(ne=L.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var re,de,ce;R.parameters={...R.parameters,docs:{...(re=R.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: args => <Tabs.Root padding="tight" {...args}>
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
}`,...(ce=(de=R.parameters)==null?void 0:de.docs)==null?void 0:ce.source}}};var ue,le,me;U.parameters={...U.parameters,docs:{...(ue=U.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: args => <Tabs.Root padding="compact" {...args}>
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
}`,...(me=(le=U.parameters)==null?void 0:le.docs)==null?void 0:me.source}}};var be,Te,pe;y.parameters={...y.parameters,docs:{...(be=y.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: args => <Tabs.Root padding="comfortable" {...args}>
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
}`,...(pe=(Te=y.parameters)==null?void 0:Te.docs)==null?void 0:pe.source}}};var ge,xe,he;F.parameters={...F.parameters,docs:{...(ge=F.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: args => <Tabs.Root padding="spacious" {...args}>
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
}`,...(he=(xe=F.parameters)==null?void 0:xe.docs)==null?void 0:he.source}}};const _i=["Default","WithDefaultActiveTab","ExternallyControlled","DisabledTabs","WithDecorator","WithNoPadding","WithTightPadding","WithCompactPadding","WithComfortablePadding","WithSpaciousPadding"];export{v as Default,j as DisabledTabs,C as ExternallyControlled,y as WithComfortablePadding,U as WithCompactPadding,S as WithDecorator,f as WithDefaultActiveTab,L as WithNoPadding,F as WithSpaciousPadding,R as WithTightPadding,_i as __namedExportsOrder,Fi as default};
