import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r}from"./index-BwDkhjyp.js";import{g as le,c as D}from"./fondue-icons331-DLB-AwW3.js";import{a as me}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{c as I}from"./index-DOnKqARA.js";import{c as be}from"./index-BSNoMcJN.js";import{c as Z,R as Te,I as pe}from"./index-BudAUfSk.js";import{P as ge}from"./index-C1SWbrhG.js";import{P as y}from"./index-BtCsUTRM.js";import{u as fe}from"./index-C8IlRUt1.js";import{u as ve}from"./index-DGaPG0k3.js";import{u as he}from"./index-DduqEaLY.js";import{u as xe}from"./useControllableState-Bxhgt0vK.js";import{B as qe}from"./Button-B0cJfyV2.js";import{h as v}from"./Dropdown-zThFKg9C.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-CQkTLCs1.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-CS4BWtGh.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-CAR1Fn1S.js";import"./index-kUwV4muI.js";import"./usePreventDropdownOverflow-DisCSAPV.js";var w="Tabs",[Ce,rt]=be(w,[Z]),E=Z(),[je,A]=Ce(w),ee=r.forwardRef((i,n)=>{const{__scopeTabs:o,value:t,onValueChange:d,defaultValue:u,orientation:c="horizontal",dir:s,activationMode:m="automatic",...g}=i,b=fe(s),[l,p]=ve({prop:t,onChange:d,defaultProp:u});return e.jsx(je,{scope:o,baseId:he(),value:l,onValueChange:p,orientation:c,dir:b,activationMode:m,children:e.jsx(y.div,{dir:b,"data-orientation":c,...g,ref:n})})});ee.displayName=w;var te="TabsList",ie=r.forwardRef((i,n)=>{const{__scopeTabs:o,loop:t=!0,...d}=i,u=A(te,o),c=E(o);return e.jsx(Te,{asChild:!0,...c,orientation:u.orientation,dir:u.dir,loop:t,children:e.jsx(y.div,{role:"tablist","aria-orientation":u.orientation,...d,ref:n})})});ie.displayName=te;var ae="TabsTrigger",oe=r.forwardRef((i,n)=>{const{__scopeTabs:o,value:t,disabled:d=!1,...u}=i,c=A(ae,o),s=E(o),m=re(c.baseId,t),g=de(c.baseId,t),b=t===c.value;return e.jsx(pe,{asChild:!0,...s,focusable:!d,active:b,children:e.jsx(y.button,{type:"button",role:"tab","aria-selected":b,"aria-controls":g,"data-state":b?"active":"inactive","data-disabled":d?"":void 0,disabled:d,id:m,...u,ref:n,onMouseDown:I(i.onMouseDown,l=>{!d&&l.button===0&&l.ctrlKey===!1?c.onValueChange(t):l.preventDefault()}),onKeyDown:I(i.onKeyDown,l=>{[" ","Enter"].includes(l.key)&&c.onValueChange(t)}),onFocus:I(i.onFocus,()=>{const l=c.activationMode!=="manual";!b&&!d&&l&&c.onValueChange(t)})})})});oe.displayName=ae;var ne="TabsContent",se=r.forwardRef((i,n)=>{const{__scopeTabs:o,value:t,forceMount:d,children:u,...c}=i,s=A(ne,o),m=re(s.baseId,t),g=de(s.baseId,t),b=t===s.value,l=r.useRef(b);return r.useEffect(()=>{const p=requestAnimationFrame(()=>l.current=!1);return()=>cancelAnimationFrame(p)},[]),e.jsx(ge,{present:d||b,children:({present:p})=>e.jsx(y.div,{"data-state":b?"active":"inactive","data-orientation":s.orientation,role:"tabpanel","aria-labelledby":m,hidden:!p,id:g,tabIndex:0,...c,ref:n,style:{...i.style,animationDuration:l.current?"0s":void 0},children:p&&u})})});se.displayName=ne;function re(i,n){return`${i}-trigger-${n}`}function de(i,n){return`${i}-content-${n}`}var Re=ee,ye=ie,Se=oe,Le=se;const _e=(i,n)=>i.filter(o=>{var d;const t=(d=o.ref)==null?void 0:d.current;return t?t.offsetLeft+t.offsetWidth>(n==null?void 0:n.scrollLeft)+n.offsetWidth||t.offsetLeft-n.scrollLeft<0:!1}),h=(i,n)=>{const o=n.current,t=i==null?void 0:i.querySelector('[data-state="active"]');if(!i||!(t instanceof HTMLButtonElement)||!(o instanceof HTMLSpanElement))return;const d=(i==null?void 0:i.scrollLeft)>(t==null?void 0:t.offsetLeft),u=(t==null?void 0:t.offsetLeft)+(t==null?void 0:t.offsetWidth)>(i==null?void 0:i.offsetWidth);d?(i.offsetWidth>t.offsetWidth+t.offsetLeft?o.style.left=`${t.offsetLeft}px`:o.style.left=`${i.offsetWidth-t.offsetWidth}px`,o.style.width=`${t==null?void 0:t.offsetWidth}px`):u?(o.style.left=`${i.clientWidth-t.offsetWidth}px`,o.style.width=`${t.offsetWidth}px`):(o.style.left=`${t.offsetLeft}px`,o.style.width=`${t.offsetWidth}px`)},Ie=({activeTab:i})=>{const n=r.useRef(null),o=r.useRef(null),[t,d]=r.useState([]),[u,c]=r.useState([]);return r.useEffect(()=>{const s=n.current,m=s==null?void 0:s.querySelector('[data-state="active"]');m instanceof HTMLButtonElement&&s instanceof HTMLDivElement&&(h(s,o),m.scrollIntoView({behavior:"smooth",block:"nearest",inline:"end"}))},[i,o]),r.useLayoutEffect(()=>{var g;const s=n.current,m=s==null?void 0:s.querySelector('[data-state="active"]');if(s instanceof HTMLDivElement&&m instanceof HTMLButtonElement){h(s,o);const b=new MutationObserver(()=>{m.scrollIntoView({behavior:"instant",block:"nearest",inline:"end"}),h(s,o)});s.parentNode&&b.observe(s.parentNode,{childList:!0});const l=new IntersectionObserver(()=>{c(_e(t,s)),h(s,o)},{root:s,threshold:1});for(const p of t)(g=p.ref)!=null&&g.current&&l.observe(p.ref.current);return()=>{l.disconnect(),b.disconnect()}}},[t,n,o]),{triggerListRef:n,activeIndicatorRef:o,triggersOutOfView:u,triggers:t,addTrigger:s=>{d(m=>[...m,s])}}},we="_root_17u01_5",Ae="_triggerList_17u01_13",Fe="_triggerListWrapper_17u01_27",Ue="_trigger_17u01_13",Ne="_content_17u01_76",We="_activeIndicator_17u01_80",f={root:we,triggerList:Ae,triggerListWrapper:Fe,trigger:Ue,content:Ne,activeIndicator:We},F=r.createContext({value:"",disabled:!1}),ce=r.createContext({addTrigger:()=>{}}),S=({children:i,activeTab:n,defaultActiveTab:o,onActiveTabChange:t,size:d="medium",...u},c)=>{var W;const[s,m]=xe({prop:n,defaultProp:o,onChange:t}),g=r.useCallback(T=>{m(T)},[m]),{triggerListRef:b,activeIndicatorRef:l,triggers:p,triggersOutOfView:N,addTrigger:ue}=Ie({activeTab:s});return e.jsx(ce.Provider,{value:{addTrigger:ue},children:e.jsxs(Re,{ref:c,className:f.root,onValueChange:g,value:s??((W=p[0])==null?void 0:W.value),...u,children:[e.jsxs("div",{className:f.triggerListWrapper,children:[e.jsx(ye,{ref:b,"data-size":d,className:f.triggerList,children:p.map(T=>r.createElement(Se,{...T.props,key:T.value,value:T.value,disabled:T.disabled,className:f.trigger,ref:T.ref},T.element))}),e.jsxs(v.Root,{children:[N.length>0&&e.jsx(v.Trigger,{"data-test-id":"overflow-items-dropdown-trigger",children:e.jsx(qe,{emphasis:"default",aspect:"square",size:"small",children:e.jsx(le,{size:16})})}),e.jsx(v.Content,{align:"end","data-test-id":"overflow-items-dropdown-content",children:N.map(T=>r.createElement(v.Item,{...T.props,disabled:T.disabled,onSelect:()=>g(T.value),key:T.value},T.element))})]}),e.jsx("span",{"data-test-id":"active-tab-indicator",ref:l,className:f.activeIndicator})]}),i]})})};S.displayName="Tabs.Root";const L=({children:i,value:n,disabled:o})=>e.jsx(F.Provider,{value:{value:n,disabled:o},children:i});L.displayName="Tabs.Tab";const U=({children:i,...n},o)=>{const{value:t,disabled:d}=r.useContext(F),{addTrigger:u}=r.useContext(ce),c=r.useRef(null);return r.useEffect(()=>{u({ref:c||o,value:t??"",disabled:d,props:n,element:i})},[]),null};U.displayName="Tabs.Trigger";const _=({children:i,...n},o)=>{const{value:t}=r.useContext(F);return e.jsx(Le,{ref:o,...n,className:f.content,value:t??"",children:i})};_.displayName="Tabs.Content";const a={Root:r.forwardRef(S),Tab:r.forwardRef(L),Trigger:r.forwardRef(U),Content:r.forwardRef(_)};S.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root",props:{id:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},defaultActiveTab:{required:!1,tsType:{name:"string"},description:`The default active tab
Used for uncontrolled components`},activeTab:{required:!1,tsType:{name:"string"},description:"The controlled value of the active tab"},size:{required:!1,tsType:{name:"union",raw:"'medium' | 'large'",elements:[{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`The height of the tabs
@default 'medium'`,defaultValue:{value:"'medium'",computed:!1}},onActiveTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Event handler called when the active tab changes"}}};L.__docgenInfo={description:"",methods:[],displayName:"Tabs.Tab",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};_.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const dt={title:"Components/Tabs",component:S,subcomponents:{"Tabs.Tab":L,"Tabs.Trigger":U,"Tabs.Content":_},tags:["autodocs"],parameters:{status:{type:"released"}},args:{onActiveTabChange:me("onActiveTabChange")}},x={render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},q={args:{defaultActiveTab:"second"},render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},C={args:{defaultActiveTab:"second"},render:i=>{const[n,o]=r.useState("second");return e.jsxs(a.Root,{...i,activeTab:n,onActiveTabChange:o,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:"First Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})}},j={render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsx(a.Trigger,{children:e.jsx("span",{children:"First Tab"})}),e.jsx(a.Content,{children:"First Content Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."})]}),e.jsxs(a.Tab,{value:"second",disabled:!0,children:[e.jsx(a.Trigger,{children:"Second Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",disabled:!0,children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})},R={render:i=>e.jsxs(a.Root,{...i,children:[e.jsxs(a.Tab,{value:"first",children:[e.jsxs(a.Trigger,{children:[e.jsx(D,{size:20}),"First Tab"]}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"First Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"second",children:[e.jsxs(a.Trigger,{children:["Second Tab",e.jsx(D,{size:20})]}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Second Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]}),e.jsxs(a.Tab,{value:"third",disabled:!0,children:[e.jsx(a.Trigger,{children:"Third Tab"}),e.jsxs(a.Content,{children:[e.jsx("b",{children:"Third Content"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."]})]})]})};var M,O,P;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(P=(O=x.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var $,V,z;q.parameters={...q.parameters,docs:{...($=q.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(z=(V=q.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var k,B,H;C.parameters={...C.parameters,docs:{...(k=C.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(H=(B=C.parameters)==null?void 0:B.docs)==null?void 0:H.source}}};var G,K,J;j.parameters={...j.parameters,docs:{...(G=j.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(J=(K=j.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};var Q,X,Y;R.parameters={...R.parameters,docs:{...(Q=R.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Y=(X=R.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const ct=["Default","WithDefaultActiveTab","ExternallyControlled","DisabledTabs","WithDecorator"];export{x as Default,j as DisabledTabs,C as ExternallyControlled,R as WithDecorator,q as WithDefaultActiveTab,ct as __namedExportsOrder,dt as default};
