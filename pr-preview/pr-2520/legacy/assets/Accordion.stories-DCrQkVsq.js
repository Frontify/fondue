import{r as a,j as e}from"./iframe-BIfcB0X2.js";import{A as de,a as ne,E as ce,b as ae}from"./example-assets-v7S-hZ7N.js";import{B as f}from"./Button-91rj7uoX.js";import{C as se}from"./ColorPickerFlyout-D-wR27Xy.js";import{E as le}from"./example-palettes-CeHTHaWO.js";import{D as he}from"./DatePicker-CQTluYzv.js";import{D as me}from"./Dropdown-C1a2GcpH.js";import{F as N}from"./FormControl-DEm4sFJ8.js";import{S as pe}from"./ScrollWrapper-BPL6dpah.js";import{S as L}from"./SegmentedControls-Df0uFqdS.js";import{S as ue}from"./Switch-CLXJPlE5.js";import{T as Q,a as Ae}from"./TextInput-o6gUNCmh.js";import{I as E}from"./IconIcon-Br86oMen.js";import{I as be,a as ve,b as Ce}from"./IconTextAlignmentRight-CT-kk_7a.js";import{I as D}from"./IconSize-BcCrF_mi.js";import{L as Ie}from"./LegacyStack-B9nRuOmu.js";import{m as k}from"./merge-DI-veSMP.js";import{$}from"./chain-CHiwi0M-.js";import{$ as Z}from"./useFocusable-C-Xc2xVU.js";import{$ as xe}from"./useButton-CNkmC7oi.js";import{$ as we,a as fe,b as ge}from"./helper-CBHI6ZXE.js";import{$ as ye}from"./useFocusRing-DHqNp4Q2.js";import{$ as je}from"./ActionMenu--EG8bteo.js";import{C as Se}from"./CollapsibleWrap-Db8pcSz3.js";import{F as ke}from"./focusStyle-Ch_WJ4aJ.js";import{A as Te}from"./AccordionHeader-DStoIOG9.js";import{A as De}from"./AccordionHeaderIcon-CfIHc-CC.js";import"./preload-helper-OAyExbmo.js";import"./useMemoizedId-xtDXxhrd.js";import"./FocusScope-D7jXQngg.js";import"./useEffectEvent-CMLs76Ad.js";import"./useMenuTrigger-BD6skHKO.js";import"./useLabels-CMk8Wm_k.js";import"./useLocalizedStringFormatter-UOmZs1KX.js";import"./context-CHUpiE9N.js";import"./VisuallyHidden-CS9EO2FH.js";import"./useOverlayTriggerState-BhO5QHIL.js";import"./useControlledState-SEwrKaho.js";import"./IconCaretDown-ZGyRgcq_.js";import"./IconCaretDown16-CSzlluEg.js";import"./IconCaretRight-DQxktYqx.js";import"./IconMusicNote-ocFo-YrV.js";import"./index-COFow3Qu.js";import"./proxy-6VjESirL.js";import"./MenuItem-CFu7WrwK.js";import"./IconCheckMark-oDrSz9RN.js";import"./elements-BOYmskOL.js";import"./IconCross-Dd61QjlE.js";import"./Flyout-BHFxKJbE.js";import"./getVerticalPositioning-Bdpvu71J.js";import"./useDialog-S7A2JLF6.js";import"./index-7Pi3A3mt.js";import"./Badge-CeAibiZr.js";import"./colors-cqDZVL9s.js";import"./FieldsetHeader-FLDsMJNc.js";import"./IconMinus-BqGNNXb1.js";import"./IconMinus16-D9i4Mx_B.js";import"./IconPlus-uYDdSU5f.js";import"./IconPlus16-_5SY2t-G.js";import"./Trigger-CLH_zzC8.js";import"./IconExclamationMarkTriangle-BRPLl85B.js";import"./IconExclamationMarkTriangle24-CWq69Q4w.js";import"./IconTrashBin16-Cy88ODv0.js";import"./IconTrashBin24-DzKpy64m.js";import"./validation-C9S5KgfE.js";import"./IconMagnifier-DeV-AOkF.js";import"./IconMagnifier16-A8gVLJdh.js";import"./index-DcmAotyk.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretUp-lGXw8Lqd.js";import"./useField-B0yrenGR.js";import"./useFormValidationState-CEWVO4VP.js";import"./SelectionManager-BB2Ad0T1.js";import"./usePopper-BkMdSZz_.js";import"./index-CLa14mTA.js";import"./LoadingCircle-CGKGcPF-.js";import"./EnablePortalWrapper-MtFHkrDy.js";import"./Portal-DO3N8iZr.js";import"./InputLabel-DkmK5SvI.js";import"./TooltipIcon-CIj69YaR.js";import"./LegacyTooltip-DyWCUoLz.js";import"./useLink-DAFaRtwo.js";import"./IconExclamationMarkCircle24-De_lyuU4.js";import"./IconQuestionMarkCircle-24RFih0R.js";import"./IconIcon16-wm0nAQfe.js";import"./IconIcon24-DRqKBAxx.js";import"./IconTextAlignmentRight16-B7XgM3SE.js";import"./keyboard-SS7VUtrh.js";function Ne(o,r,i){let{item:d}=o,s=$(),n=$(),l=r.disabledKeys.has(d.key),{itemProps:h}=fe({selectionManager:r.selectionManager,key:d.key,ref:i}),{buttonProps:p}=xe(Z(h,{id:s,elementType:"button",isDisabled:l,onPress:()=>r.toggleKey(d.key)}),i),m=r.expandedKeys.has(d.key);return{buttonProps:{...p,"aria-expanded":m,"aria-controls":m?n:void 0},regionProps:{id:n,role:"region","aria-labelledby":s}}}function Ee(o,r,i){let{listProps:d}=we({...o,...r,allowsTabNavigation:!0,disallowTypeAhead:!0,ref:i});return{accordionProps:{...d,tabIndex:void 0}}}const Pe="fondue-accordion",ee="fondue-accordion-item",Le=({item:o,state:r,header:i,padding:d=!0,divider:s=!1,headerComponent:n=Te,"data-test-id":l=ee})=>{var A,x;const{active:h,...p}=i,m=a.useRef(null),{buttonProps:b,regionProps:I}=Ne({item:o},r,m),u=r.expandedKeys.has(o.key),{isFocusVisible:P,focusProps:T}=ye();return e.jsxs("div",{className:k([P?`${ke} tw-relative tw-rounded`:"",s&&"tw-divide-y tw-divide-black-10"]),children:[e.jsx("button",{type:"button",...Z(b,T),"data-test-id":l,ref:m,onClick:v=>{i.onClick&&i.onClick(),b.onClick&&b.onClick(v)},onKeyUp:v=>{i.onClick&&v.key==="Enter"&&i.onClick(),b.onKeyUp&&b.onKeyUp(v)},className:"tw-w-full focus-visible:tw-outline-none",children:e.jsx(n,{isOpen:u,...p})}),e.jsx(Se,{isOpen:u,preventInitialAnimation:h,children:e.jsx("div",{...I,className:k([d&&"tw-px-8 tw-pb-6","tw-mt-2"]),children:(x=(A=o.props).children)==null?void 0:x.call(A)})})]},o.key)},$e=o=>{const r=a.Children.map(o,(d,s)=>{const{header:n,children:l}=d.props;return e.jsx(ge,{textValue:n.children,children:l?()=>l:null},s)}),i=r.map(d=>d.key).filter((d,s)=>{var n,l;return d&&!!((l=(n=o[s])==null?void 0:n.props.header)!=null&&l.active)})||[];return{children:r,defaultExpandedKeys:i}},Fe=({children:o})=>a.Children.toArray(o).reduce((r,i)=>a.isValidElement(i)&&!i.props.header?(console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly."),r):(a.isValidElement(i)&&r.push(i),r),[]),c=({children:o})=>e.jsx(e.Fragment,{children:o});c.displayName="FondueAccordionItem";const _e=o=>{var i,d,s;const r=a.Children.toArray(o);return((s=(d=(i=r[r.length-1])==null?void 0:i.props)==null?void 0:d.header)==null?void 0:s.active)===!0},C=o=>{const{divider:r=!0,border:i=!0,"data-test-id":d=Pe}=o,s=Fe(o),n=$e(s),l=a.useRef(null),h=je(n),p=a.useRef({firstRender:!0,childLength:a.Children.toArray(o.children).length}),m=a.Children.toArray(o.children).length;a.useEffect(()=>{_e(o.children)&&!p.current.firstRender&&a.Children.toArray(o.children).length>p.current.childLength&&h.toggleKey(n.defaultExpandedKeys[n.defaultExpandedKeys.length-1]),p.current={firstRender:!1,childLength:a.Children.toArray(o.children).length}},[n.defaultExpandedKeys,m,o.children,h]);const{accordionProps:{onMouseDown:b,onKeyDown:I,...u}}=Ee({...n,disallowTypeAhead:!0},h,l),T={...u,onKeyDown:A=>{const x=A.target.dataset.key,v=h.selectionManager.focusedKey===x;x&&v&&(I==null||I(A))}};return e.jsx("div",{...T,ref:l,"data-test-id":d,className:k([r&&"tw-divide-y tw-divide-black-10",i&&"tw-border-t tw-border-b tw-border-black-10"]),children:[...h.collection].map((A,x)=>{const{header:v,padding:te,headerComponent:oe,divider:ie,"data-test-id":re=ee}=s[x].props;return e.jsx(Le,{item:A,state:h,divider:ie,header:v,padding:te,headerComponent:oe,"data-test-id":re},A.key)})})};C.displayName="FondueAccordion";c.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordionItem",props:{header:{required:!0,tsType:{name:"intersection",raw:"Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void }",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
    decorator?: ReactNode;
    children: string;
    disabled?: boolean;
    isOpen: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"decorator",value:{name:"ReactNode",required:!1}},{key:"children",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"isOpen",value:{name:"boolean",required:!0}},{key:"data-test-id",value:{name:"string",required:!1}}]}},{name:"literal",value:"'isOpen'"}],raw:"Omit<AccordionHeaderProps, 'isOpen'>"},{name:"signature",type:"object",raw:"{ active?: boolean; onClick?: () => void }",signature:{properties:[{key:"active",value:{name:"boolean",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}]},description:""},padding:{required:!1,tsType:{name:"boolean"},description:""},divider:{required:!1,tsType:{name:"boolean"},description:""},headerComponent:{required:!1,tsType:{name:"signature",type:"function",raw:"(props: AccordionHeaderProps) => ReactElement",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
    decorator?: ReactNode;
    children: string;
    disabled?: boolean;
    isOpen: boolean;
    'data-test-id'?: string;
}`,signature:{properties:[{key:"decorator",value:{name:"ReactNode",required:!1}},{key:"children",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"isOpen",value:{name:"boolean",required:!0}},{key:"data-test-id",value:{name:"string",required:!1}}]}},name:"props"}],return:{name:"ReactElement"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};C.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordion",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},divider:{required:!1,tsType:{name:"boolean"},description:""},border:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};const{action:ze}=__STORYBOOK_MODULE_ACTIONS__,Io={title:"Components/Accordion",component:C,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead."}}}},g=()=>{const[o,r]=a.useState(!0),[i,d]=a.useState(""),[s,n]=a.useState(),[l,h]=a.useState({red:0,green:146,blue:120}),[p,m]=a.useState(null),[b,I]=a.useState();return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with decorator, type Accordion and a FormControl child",decorator:e.jsx(E,{}),active:!0},divider:!0,children:e.jsx(N,{label:{children:"Width",htmlFor:"width",tooltip:{content:"Width of the future"}},extra:"Some extra text.",helper:{text:"This input should always equal to 42."},children:e.jsx(Q,{value:i,onChange:d})})}),e.jsx(c,{header:{children:"Item with plain text child",active:!0},children:"bar"}),e.jsx(c,{header:{children:"Item with dropdown child"},children:e.jsx(me,{onChange:u=>n(u),activeItemId:s,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]})}),e.jsx(c,{header:{children:"Item with datepicker child"},children:e.jsx(pe,{children:e.jsx(he,{variant:"single",startDate:null,endDate:null,value:b,onChange:u=>I(u)})})}),e.jsx(c,{header:{children:"Item with assetinput"},children:e.jsx(de,{size:ae.Large,assets:[ce[0]],actions:ne})}),e.jsx(c,{header:{children:"Item with color picker flyout"},children:e.jsx(se,{disabled:!1,currentColor:l,onClick:()=>m(l),onClose:()=>h(p),onSelect:u=>h(u),palettes:le})}),e.jsx(c,{header:{children:"Empty item with an onClick callback",onClick:ze("click")}}),e.jsxs(c,{header:{children:"Item with resizable content"},children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(f,{onClick:()=>r(!o),children:"Toggle Content"})]}),e.jsx(c,{header:{children:"Item without padding"},padding:!1,children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})})]})},F=({isOpen:o,children:r})=>e.jsxs("div",{className:k(["tw-px-6 tw-py-4 tw-bg-black-5 tw-flex tw-justify-between tw-font-bold tw-items-center",o?"tw-text-black":"tw-text-black-60"]),children:[r,e.jsx(De,{isOpen:o,size:"small"})]}),t=({children:o})=>e.jsx("code",{className:"tw-bg-black-5 tw-rounded tw-px-2 tw-text-box-negative-strong tw-text-s",children:o}),_=({rows:o})=>e.jsxs("table",{className:"tw-table-fixed tw-border tw-border-black-10 tw-my-4",children:[e.jsx("thead",{className:"tw-bg-black-5",children:e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Property"}),e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Type"}),e.jsx("th",{className:"tw-p-3",children:"Description"})]})}),e.jsx("tbody",{children:o.map(([r,i,d],s)=>e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("td",{className:"tw-p-3 tw-font-bold",children:r}),e.jsx("td",{className:"tw-p-3",children:e.jsx(t,{children:i})}),e.jsx("td",{className:"tw-p-3",children:d})]},`row-${s}`))})]}),y=()=>e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with a custom headerComponent prop",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:F,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["For maximum flexibility, you can create your own ",e.jsx(t,{children:"headerComponent"})," to pass to the ",e.jsx(t,{children:"Accordion Item"}),"."]}),e.jsxs("p",{children:["Import the ",e.jsx(t,{children:"AccordionHeaderProps"})," type to assist in building it to be typesafe."]}),e.jsxs("p",{children:["The properties that are available in the ",e.jsx(t,{children:"headerComponent"})," are as follows:"]}),e.jsx(_,{rows:[["isOpen","boolean",e.jsxs("span",{children:["The state of the ",e.jsx(t,{children:"AccordionItem"})," this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]},"row-isopen-desc")],["children","string",e.jsxs("span",{children:["The children property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-children-desc")],["disabled","boolean",e.jsxs("span",{children:["The disabled property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-disabled-desc")],["decorator","ReactNode",e.jsxs("span",{children:["The decorator icon property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-decorator-desc")]]}),e.jsxs("p",{children:["The ",e.jsx(t,{children:"AccordionHeaderIcon"})," is also available for consumption inside of the",e.jsx(t,{children:"headerComponent"}),". The properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"})," are listed below."]})]})}),e.jsx(c,{header:{children:"AccordionHeaderIcon Details",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:F,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["The following table contains properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"}),"."]}),e.jsx(_,{rows:[["isOpen","boolean",e.jsxs("span",{children:["Modifies/Animates the component based on the state of the ",e.jsx(t,{children:"AccordionItem"}),"  this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]},"icon-isopen-desc")],["disabled","boolean","Displays the component with disabled styles."],["size","AccordionHeaderIconSize","Determines the size of the component (small | medium | large)."]]})]})})]}),j=o=>{const r=[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},1),e.jsx(c,{header:{children:"AccordionItem Divider",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})},2),e.jsx(c,{header:{children:"Additional Info",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})},3)],i=m=>e.jsx(c,{header:{children:"I Should be open",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},m),d=e.jsx(c,{header:{children:"I should be closed",active:!1},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},10),s=e.jsx(c,{header:{children:"I should also be closed"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},22),[n,l]=a.useState(r),[h,p]=a.useState(5);return e.jsxs("span",{children:[e.jsx(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:n.map(m=>m)}),e.jsxs(Ie,{padding:"xs",spacing:"xs",children:[e.jsx(f,{onClick:()=>{p(h+1),l([...n,i(h)])},children:"Add Element active"}),e.jsx(f,{onClick:()=>l([...n,d]),children:"Add Element inactive"}),e.jsx(f,{onClick:()=>l([...n,s]),children:"Add Element without active prop"}),e.jsx(f,{onClick:()=>l([...n.slice(0,n.length-1)]),children:"Remove an Element from the Accordion"})]})]})},w=o=>e.jsxs(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"AccordionItem Divider"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"Additional Info"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})})]});w.args={"Accordion Divider":!0,"Accordion Border":!0,"Item Divider":!1};const S=()=>{const[o,r]=a.useState("1"),[i,d]=a.useState(!1),[s,n]=a.useState("l");return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Layout"},children:e.jsx(N,{label:{children:"Spacing",htmlFor:"spacing"},extra:e.jsx(ue,{label:"advanced",mode:i?"on":"off",size:"small",onChange:()=>d(!i)}),helper:{text:"Defines the spacing between elements."},children:e.jsx("div",{className:"flex items-center h-11 relative",children:i?e.jsx("div",{className:"w-full",children:e.jsx(Q,{id:"spacing",decorator:"px",type:Ae.Number})}):e.jsx(L,{id:"spacing",onChange:r,activeItemId:o,items:[{id:"1",value:"S"},{id:"2",value:"M"},{id:"3",value:"L"}]})})})}),e.jsx(c,{header:{children:"Alignment"},children:e.jsx(N,{label:{children:"Text",htmlFor:"text-alignment"},children:e.jsx(L,{onChange:n,activeItemId:s,items:[{id:"l",icon:e.jsx(be,{size:D.Size16}),ariaLabel:"Text Align Left"},{id:"c",icon:e.jsx(ve,{size:D.Size16}),ariaLabel:"Text Align Center"},{id:"r",icon:e.jsx(Ce,{size:D.Size16}),ariaLabel:"Text Align Right"}]})})})]})};g.__docgenInfo={description:"",methods:[],displayName:"WithDifferentAccordionItems"};y.__docgenInfo={description:"",methods:[],displayName:"WithCustomAccordionHeaderComponent"};j.__docgenInfo={description:"",methods:[],displayName:"WithAccordionItemAddition"};w.__docgenInfo={description:"",methods:[],displayName:"WithDividers"};S.__docgenInfo={description:"",methods:[],displayName:"WithAdvancedFormControls"};var z,O,R;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [showContent, setShowContent] = useState(true);
  const [input, setInput] = useState('');
  const [activeItemId, setActiveItemId] = useState<string | number | undefined>();
  const [temporaryColor, setTemporaryColor] = useState<Color | null>({
    red: 0,
    green: 146,
    blue: 120
  });
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <AccordionComponent>
            <AccordionItem header={{
      children: 'Item with decorator, type Accordion and a FormControl child',
      decorator: <IconIcon />,
      active: true
    }} divider>
                <FormControl label={{
        children: 'Width',
        htmlFor: 'width',
        tooltip: {
          content: 'Width of the future'
        }
      }} extra="Some extra text." helper={{
        text: 'This input should always equal to 42.'
      }}>
                    <TextInput value={input} onChange={setInput} />
                </FormControl>
            </AccordionItem>
            <AccordionItem header={{
      children: 'Item with plain text child',
      active: true
    }}>bar</AccordionItem>
            <AccordionItem header={{
      children: 'Item with dropdown child'
    }}>
                <Dropdown onChange={id => setActiveItemId(id)} activeItemId={activeItemId} menuBlocks={[{
        id: 'block1',
        menuItems: [{
          id: '1',
          title: 'Item 1'
        }, {
          id: '2',
          title: 'Item 2'
        }, {
          id: '3',
          title: 'Item 3'
        }, {
          id: '4',
          title: 'Item 4'
        }, {
          id: '5',
          title: 'Item 5'
        }]
      }]} />
            </AccordionItem>
            <AccordionItem header={{
      children: 'Item with datepicker child'
    }}>
                <ScrollWrapper>
                    <DatePicker variant="single" startDate={null} endDate={null} value={selectedDate} onChange={date => setSelectedDate(date)} />
                </ScrollWrapper>
            </AccordionItem>
            <AccordionItem header={{
      children: 'Item with assetinput'
    }}>
                <AssetInput size={AssetInputSize.Large} assets={[EXAMPLE_IMAGES[0]]} actions={assetInputActions} />
            </AccordionItem>
            <AccordionItem header={{
      children: 'Item with color picker flyout'
    }}>
                <ColorPickerFlyoutComponent disabled={false} currentColor={temporaryColor} onClick={() => setSelectedColor(temporaryColor)} onClose={() => setTemporaryColor(selectedColor)} onSelect={color => setTemporaryColor(color)} palettes={EXAMPLE_PALETTES} />
            </AccordionItem>
            <AccordionItem header={{
      children: 'Empty item with an onClick callback',
      onClick: action('click')
    }} />
            <AccordionItem header={{
      children: 'Item with resizable content'
    }}>
                <div className={!showContent ? 'tw-hidden' : ''}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
                <Button onClick={() => setShowContent(!showContent)}>Toggle Content</Button>
            </AccordionItem>
            <AccordionItem header={{
      children: 'Item without padding'
    }} padding={false}>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
            </AccordionItem>
        </AccordionComponent>;
}`,...(R=(O=g.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var W,q,B;y.parameters={...y.parameters,docs:{...(W=y.parameters)==null?void 0:W.docs,source:{originalSource:`() => <AccordionComponent>
        <AccordionItem header={{
    children: 'Item with a custom headerComponent prop',
    decorator: <IconIcon />,
    active: true
  }} divider padding={false} headerComponent={customHeader}>
            <div className="tw-p-5">
                <p>
                    For maximum flexibility, you can create your own <Code>headerComponent</Code> to pass to the&nbsp;
                    <Code>Accordion Item</Code>.
                </p>
                <p>
                    Import the <Code>AccordionHeaderProps</Code> type to assist in building it to be typesafe.
                </p>
                <p>
                    The properties that are available in the <Code>headerComponent</Code> are as follows:
                </p>
                <PropsTable rows={[['isOpen', 'boolean', <span key="row-isopen-desc">
                                The state of the <Code>AccordionItem</Code> this <Code>headerComponent</Code>
                                belongs to.
                            </span>], ['children', 'string', <span key="row-children-desc">
                                The children property that is passed in via the <Code>header</Code> prop to the&nbsp;
                                <Code>AccordionItem</Code>.
                            </span>], ['disabled', 'boolean', <span key="row-disabled-desc">
                                The disabled property that is passed in via the <Code>header</Code> prop to the&nbsp;
                                <Code>AccordionItem</Code>.
                            </span>], ['decorator', 'ReactNode', <span key="row-decorator-desc">
                                The decorator icon property that is passed in via the <Code>header</Code> prop to
                                the&nbsp;
                                <Code>AccordionItem</Code>.
                            </span>]]} />
                <p>
                    The <Code>AccordionHeaderIcon</Code> is also available for consumption inside of the
                    <Code>headerComponent</Code>. The properties that are consumed by the&nbsp;
                    <Code>AccordionHeaderIcon</Code> are listed below.
                </p>
            </div>
        </AccordionItem>
        <AccordionItem header={{
    children: 'AccordionHeaderIcon Details',
    decorator: <IconIcon />,
    active: true
  }} divider padding={false} headerComponent={customHeader}>
            <div className="tw-p-5">
                <p>
                    The following table contains properties that are consumed by the&nbsp;
                    <Code>AccordionHeaderIcon</Code>.
                </p>
                <PropsTable rows={[['isOpen', 'boolean', <span key="icon-isopen-desc">
                                Modifies/Animates the component based on the state of the <Code>AccordionItem</Code>
                                &nbsp; this <Code>headerComponent</Code>
                                belongs to.
                            </span>], ['disabled', 'boolean', 'Displays the component with disabled styles.'], ['size', 'AccordionHeaderIconSize', 'Determines the size of the component (small | medium | large).']]} />
            </div>
        </AccordionItem>
    </AccordionComponent>`,...(B=(q=y.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};var K,H,M;j.parameters={...j.parameters,docs:{...(K=j.parameters)==null?void 0:K.docs,source:{originalSource:`args => {
  const AccordtionItemsStart = [<AccordionItem key={1} header={{
    children: 'Accordion Divider & Border',
    active: true
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>, <AccordionItem key={2} header={{
    children: 'AccordionItem Divider',
    active: true
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>AccordionItem</Code> will add a divider between the
                header and content of the <Code>AccordionItem</Code> when it is open.
                <Code>Accordion</Code>.
            </div>
        </AccordionItem>, <AccordionItem key={3} header={{
    children: 'Additional Info',
    active: true
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Play around with the settings below to see the difference between these three properties. The&nbsp;
                <Code>Accordion</Code> Ccomponent has the <Code>divider</Code> and <Code>border</Code> set to true by
                default, whereas the&nbsp;
                <Code>AccordionItem</Code> has the divider set to false by default.
            </div>
        </AccordionItem>];
  const newItemOpen = (key: number) => <AccordionItem key={key} header={{
    children: 'I Should be open',
    active: true
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>;
  const inactive = <AccordionItem key={10} header={{
    children: 'I should be closed',
    active: false
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>;
  const elementWithoutActive = <AccordionItem key={22} header={{
    children: 'I should also be closed'
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>;
  const [accordionItem, setAccordionItem] = useState(AccordtionItemsStart);
  const [accordionKey, setAccordionKey] = useState(5);
  return <span>
            <AccordionComponent divider={args['Accordion Divider']} border={args['Accordion Border']}>
                {accordionItem.map(item => item)}
            </AccordionComponent>
            <LegacyStack padding="xs" spacing="xs">
                <Button onClick={() => {
        setAccordionKey(accordionKey + 1);
        setAccordionItem([...accordionItem, newItemOpen(accordionKey)]);
      }}>
                    Add Element active
                </Button>
                <Button onClick={() => setAccordionItem([...accordionItem, inactive])}>Add Element inactive</Button>
                <Button onClick={() => setAccordionItem([...accordionItem, elementWithoutActive])}>
                    Add Element without active prop
                </Button>
                <Button onClick={() => setAccordionItem([...accordionItem.slice(0, accordionItem.length - 1)])}>
                    Remove an Element from the Accordion
                </Button>
            </LegacyStack>
        </span>;
}`,...(M=(H=j.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var G,U,V;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`args => <AccordionComponent divider={args['Accordion Divider']} border={args['Accordion Border']}>
        <AccordionItem header={{
    children: 'Accordion Divider & Border',
    active: true
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>Accordion</Code> will add a divider between the
                children of the <Code>Accordion</Code>, whereas the <Code>border</Code> prop will add a top and bottom
                border to the entire <Code>Accordion</Code>.
            </div>
        </AccordionItem>
        <AccordionItem header={{
    children: 'AccordionItem Divider'
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Settings the <Code>divider</Code> prop on the <Code>AccordionItem</Code> will add a divider between the
                header and content of the <Code>AccordionItem</Code> when it is open.
                <Code>Accordion</Code>.
            </div>
        </AccordionItem>
        <AccordionItem header={{
    children: 'Additional Info'
  }} divider={args['Item Divider']}>
            <div className="tw-p-6">
                Play around with the settings below to see the difference between these three properties. The&nbsp;
                <Code>Accordion</Code> Ccomponent has the <Code>divider</Code> and <Code>border</Code> set to true by
                default, whereas the&nbsp;
                <Code>AccordionItem</Code> has the divider set to false by default.
            </div>
        </AccordionItem>
    </AccordionComponent>`,...(V=(U=w.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var X,Y,J;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [spacing, setSpacing] = useState('1');
  const [showAdvancedSpacing, setShowAdvancedSpacing] = useState(false);
  const [alignment, setAlignment] = useState('l');
  return <AccordionComponent>
            <AccordionItem header={{
      children: 'Layout'
    }}>
                <FormControl label={{
        children: 'Spacing',
        htmlFor: 'spacing'
      }} extra={<Switch label="advanced" mode={showAdvancedSpacing ? 'on' : 'off'} size="small" onChange={() => setShowAdvancedSpacing(!showAdvancedSpacing)} />} helper={{
        text: 'Defines the spacing between elements.'
      }}>
                    <div className="flex items-center h-11 relative">
                        {showAdvancedSpacing ? <div className="w-full">
                                <TextInput id="spacing" decorator="px" type={TextInputType.Number} />
                            </div> : <SegmentedControls id="spacing" onChange={setSpacing} activeItemId={spacing} items={[{
            id: '1',
            value: 'S'
          }, {
            id: '2',
            value: 'M'
          }, {
            id: '3',
            value: 'L'
          }]} />}
                    </div>
                </FormControl>
            </AccordionItem>
            <AccordionItem header={{
      children: 'Alignment'
    }}>
                <FormControl label={{
        children: 'Text',
        htmlFor: 'text-alignment'
      }}>
                    <SegmentedControls onChange={setAlignment} activeItemId={alignment} items={[{
          id: 'l',
          icon: <IconTextAlignmentLeft size={IconSize.Size16} />,
          ariaLabel: 'Text Align Left'
        }, {
          id: 'c',
          icon: <IconTextAlignmentCentre size={IconSize.Size16} />,
          ariaLabel: 'Text Align Center'
        }, {
          id: 'r',
          icon: <IconTextAlignmentRight size={IconSize.Size16} />,
          ariaLabel: 'Text Align Right'
        }]} />
                </FormControl>
            </AccordionItem>
        </AccordionComponent>;
}`,...(J=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};const xo=["WithDifferentAccordionItems","WithCustomAccordionHeaderComponent","WithAccordionItemAddition","WithDividers","WithAdvancedFormControls"];export{j as WithAccordionItemAddition,S as WithAdvancedFormControls,y as WithCustomAccordionHeaderComponent,g as WithDifferentAccordionItems,w as WithDividers,xo as __namedExportsOrder,Io as default};
