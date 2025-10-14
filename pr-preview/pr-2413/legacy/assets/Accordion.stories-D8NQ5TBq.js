import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{a as de}from"./index-B-lxVbXh.js";import{r as a}from"./index-B2-qRKKC.js";import{a as ne,b as ce,E as ae,A as se}from"./example-assets-C6dsUx7j.js";import{c as f}from"./Button-BmAjlSjh.js";import{C as le}from"./ColorPickerFlyout-Lm7cPjF3.js";import{E as he}from"./example-palettes-BWPYasVp.js";import{D as me}from"./DatePicker-CW9EiAzp.js";import{c as pe}from"./Dropdown-BKWMhStX.js";import{F as N}from"./FormControl-CpIf7xLv.js";import{a as ue}from"./ScrollWrapper-DzW8ABe3.js";import{S as L}from"./SegmentedControls-CmgoAaXC.js";import{S as Ae}from"./Switch-DT9CB_3v.js";import{T as Q,b as be}from"./TextInput-Cmw7ItpA.js";import{I as E}from"./IconIcon-BnIZz21f.js";import{I as ve,a as Ce,b as Ie}from"./IconTextAlignmentRight-kNqDmE8S.js";import{I as D}from"./IconSize-BcCrF_mi.js";import{L as xe}from"./LegacyStack-Cd_4gAnP.js";import{m as k}from"./merge-DI-veSMP.js";import{$}from"./chain-z5L_5vtA.js";import{b as Z}from"./useFocusable-vWFmc0ol.js";import{$ as we}from"./useButton-DRAnt-J8.js";import{$ as fe,a as ge,b as ye}from"./helper-DS277MSd.js";import{$ as je}from"./useFocusRing-BMciCUIT.js";import{$ as Se}from"./ActionMenu-CReMm0fz.js";import{C as ke}from"./CollapsibleWrap-Cd33lJ2x.js";import{c as Te}from"./focusStyle-BtNTXUM4.js";import{A as De}from"./AccordionHeader-CDWiAYOQ.js";import{A as Ne}from"./AccordionHeaderIcon-DhYpzaGl.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useMemoizedId-BB39KVn8.js";import"./FocusScope-BWgBfqGF.js";import"./useEffectEvent-BOE4tD14.js";import"./useMenuTrigger-BD_B392b.js";import"./useLabels-BhN0CJHD.js";import"./useLocalizedStringFormatter-BbKkG-z0.js";import"./context-CzRDNd1J.js";import"./VisuallyHidden-DFCzzUtt.js";import"./useOverlayTriggerState-BgjoQp14.js";import"./useControlledState-CmdEzstM.js";import"./IconCaretDown-CAp4CI-i.js";import"./IconCaretDown16-CINgO7jA.js";import"./IconCaretRight-DMA6RW71.js";import"./IconMusicNote-BvSzniF8.js";import"./index-C8Y7mxzH.js";import"./proxy-B63y3FxE.js";import"./MenuItem-DrSZ0BqJ.js";import"./IconCheckMark-Db5JnUcj.js";import"./elements-BOYmskOL.js";import"./IconCross-Bq7BKjxu.js";import"./Flyout-DFcZjSgR.js";import"./getVerticalPositioning-Bdpvu71J.js";import"./useDialog-CIZ0-wxX.js";import"./index-CFX93qP1.js";import"./Badge-BmJvcpMl.js";import"./colors-cqDZVL9s.js";import"./FieldsetHeader-BJ6BmJet.js";import"./IconMinus-DJt4iUyt.js";import"./IconPlus-tBL-i4Ty.js";import"./IconPlus16-D2kONyKV.js";import"./Trigger-DTIt2Pgi.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconTrashBin16-DHeQSCR9.js";import"./IconTrashBin24-D7tnFyiH.js";import"./validation-CJXPAjNB.js";import"./IconMagnifier-7rctpR_z.js";import"./IconMagnifier16-DEM6G4cO.js";import"./index-CUvMEafb.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretUp-UZkBSE-H.js";import"./useField-BIaAlQiq.js";import"./useFormValidationState-4uoa2oRi.js";import"./SelectionManager-CwM1DjHu.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./LoadingCircle-DyxURJrK.js";import"./EnablePortalWrapper-C3Ay3AqL.js";import"./Portal-CuQPhhwF.js";import"./InputLabel-CgKjtmMv.js";import"./TooltipIcon-61BfzcjI.js";import"./LegacyTooltip-Dj-UlGk6.js";import"./useLink-CpWX27sf.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./IconIcon16-CMDvX-CB.js";import"./IconIcon24-Cbk6AYQl.js";import"./IconTextAlignmentRight16-oV2kD7R1.js";import"./keyboard-APSnmnkX.js";function Ee(o,i,r){let{item:d}=o,s=$(),n=$(),l=i.disabledKeys.has(d.key),{itemProps:h}=ge({selectionManager:i.selectionManager,key:d.key,ref:r}),{buttonProps:p}=we(Z(h,{id:s,elementType:"button",isDisabled:l,onPress:()=>i.toggleKey(d.key)}),r),m=i.expandedKeys.has(d.key);return{buttonProps:{...p,"aria-expanded":m,"aria-controls":m?n:void 0},regionProps:{id:n,role:"region","aria-labelledby":s}}}function Pe(o,i,r){let{listProps:d}=fe({...o,...i,allowsTabNavigation:!0,disallowTypeAhead:!0,ref:r});return{accordionProps:{...d,tabIndex:void 0}}}const Le="fondue-accordion",ee="fondue-accordion-item",$e=({item:o,state:i,header:r,padding:d=!0,divider:s=!1,headerComponent:n=De,"data-test-id":l=ee})=>{var A,x;const{active:h,...p}=r,m=a.useRef(null),{buttonProps:b,regionProps:I}=Ee({item:o},i,m),u=i.expandedKeys.has(o.key),{isFocusVisible:P,focusProps:T}=je();return e.jsxs("div",{className:k([P?`${Te} tw-relative tw-rounded`:"",s&&"tw-divide-y tw-divide-black-10"]),children:[e.jsx("button",{type:"button",...Z(b,T),"data-test-id":l,ref:m,onClick:v=>{r.onClick&&r.onClick(),b.onClick&&b.onClick(v)},onKeyUp:v=>{r.onClick&&v.key==="Enter"&&r.onClick(),b.onKeyUp&&b.onKeyUp(v)},className:"tw-w-full focus-visible:tw-outline-none",children:e.jsx(n,{isOpen:u,...p})}),e.jsx(ke,{isOpen:u,preventInitialAnimation:h,children:e.jsx("div",{...I,className:k([d&&"tw-px-8 tw-pb-6","tw-mt-2"]),children:(x=(A=o.props).children)==null?void 0:x.call(A)})})]},o.key)},Fe=o=>{const i=a.Children.map(o,(d,s)=>{const{header:n,children:l}=d.props;return e.jsx(ye,{textValue:n.children,children:l?()=>l:null},s)}),r=i.map(d=>d.key).filter((d,s)=>{var n,l;return d&&!!((l=(n=o[s])==null?void 0:n.props.header)!=null&&l.active)})||[];return{children:i,defaultExpandedKeys:r}},ze=({children:o})=>a.Children.toArray(o).reduce((i,r)=>a.isValidElement(r)&&!r.props.header?(console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly."),i):(a.isValidElement(r)&&i.push(r),i),[]),c=({children:o})=>e.jsx(e.Fragment,{children:o});c.displayName="FondueAccordionItem";const Re=o=>{var r,d,s;const i=a.Children.toArray(o);return((s=(d=(r=i[i.length-1])==null?void 0:r.props)==null?void 0:d.header)==null?void 0:s.active)===!0},C=o=>{const{divider:i=!0,border:r=!0,"data-test-id":d=Le}=o,s=ze(o),n=Fe(s),l=a.useRef(null),h=Se(n),p=a.useRef({firstRender:!0,childLength:a.Children.toArray(o.children).length}),m=a.Children.toArray(o.children).length;a.useEffect(()=>{Re(o.children)&&!p.current.firstRender&&a.Children.toArray(o.children).length>p.current.childLength&&h.toggleKey(n.defaultExpandedKeys[n.defaultExpandedKeys.length-1]),p.current={firstRender:!1,childLength:a.Children.toArray(o.children).length}},[n.defaultExpandedKeys,m,o.children,h]);const{accordionProps:{onMouseDown:b,onKeyDown:I,...u}}=Pe({...n,disallowTypeAhead:!0},h,l),T={...u,onKeyDown:A=>{const x=A.target.dataset.key,v=h.selectionManager.focusedKey===x;x&&v&&(I==null||I(A))}};return e.jsx("div",{...T,ref:l,"data-test-id":d,className:k([i&&"tw-divide-y tw-divide-black-10",r&&"tw-border-t tw-border-b tw-border-black-10"]),children:[...h.collection].map((A,x)=>{const{header:v,padding:te,headerComponent:oe,divider:re,"data-test-id":ie=ee}=s[x].props;return e.jsx($e,{item:A,state:h,divider:re,header:v,padding:te,headerComponent:oe,"data-test-id":ie},A.key)})})};C.displayName="FondueAccordion";c.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordionItem",props:{header:{required:!0,tsType:{name:"intersection",raw:"Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void }",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"decorator",value:{name:"ReactNode",required:!1}},{key:"children",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"isOpen",value:{name:"boolean",required:!0}},{key:"data-test-id",value:{name:"string",required:!1}}]}},name:"props"}],return:{name:"ReactElement"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};C.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordion",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},divider:{required:!1,tsType:{name:"boolean"},description:""},border:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};const wo={title:"Components/Accordion",component:C,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead."}}}},g=()=>{const[o,i]=a.useState(!0),[r,d]=a.useState(""),[s,n]=a.useState(),[l,h]=a.useState({red:0,green:146,blue:120}),[p,m]=a.useState(null),[b,I]=a.useState();return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with decorator, type Accordion and a FormControl child",decorator:e.jsx(E,{}),active:!0},divider:!0,children:e.jsx(N,{label:{children:"Width",htmlFor:"width",tooltip:{content:"Width of the future"}},extra:"Some extra text.",helper:{text:"This input should always equal to 42."},children:e.jsx(Q,{value:r,onChange:d})})}),e.jsx(c,{header:{children:"Item with plain text child",active:!0},children:"bar"}),e.jsx(c,{header:{children:"Item with dropdown child"},children:e.jsx(pe,{onChange:u=>n(u),activeItemId:s,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]})}),e.jsx(c,{header:{children:"Item with datepicker child"},children:e.jsx(ue,{children:e.jsx(me,{variant:"single",startDate:null,endDate:null,value:b,onChange:u=>I(u)})})}),e.jsx(c,{header:{children:"Item with assetinput"},children:e.jsx(ne,{size:se.Large,assets:[ae[0]],actions:ce})}),e.jsx(c,{header:{children:"Item with color picker flyout"},children:e.jsx(le,{disabled:!1,currentColor:l,onClick:()=>m(l),onClose:()=>h(p),onSelect:u=>h(u),palettes:he})}),e.jsx(c,{header:{children:"Empty item with an onClick callback",onClick:de("click")}}),e.jsxs(c,{header:{children:"Item with resizable content"},children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(f,{onClick:()=>i(!o),children:"Toggle Content"})]}),e.jsx(c,{header:{children:"Item without padding"},padding:!1,children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})})]})},F=({isOpen:o,children:i})=>e.jsxs("div",{className:k(["tw-px-6 tw-py-4 tw-bg-black-5 tw-flex tw-justify-between tw-font-bold tw-items-center",o?"tw-text-black":"tw-text-black-60"]),children:[i,e.jsx(Ne,{isOpen:o,size:"small"})]}),t=({children:o})=>e.jsx("code",{className:"tw-bg-black-5 tw-rounded tw-px-2 tw-text-box-negative-strong tw-text-s",children:o}),z=({rows:o})=>e.jsxs("table",{className:"tw-table-fixed tw-border tw-border-black-10 tw-my-4",children:[e.jsx("thead",{className:"tw-bg-black-5",children:e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Property"}),e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Type"}),e.jsx("th",{className:"tw-p-3",children:"Description"})]})}),e.jsx("tbody",{children:o.map(([i,r,d],s)=>e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("td",{className:"tw-p-3 tw-font-bold",children:i}),e.jsx("td",{className:"tw-p-3",children:e.jsx(t,{children:r})}),e.jsx("td",{className:"tw-p-3",children:d})]},`row-${s}`))})]}),y=()=>e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with a custom headerComponent prop",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:F,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["For maximum flexibility, you can create your own ",e.jsx(t,{children:"headerComponent"})," to pass to the ",e.jsx(t,{children:"Accordion Item"}),"."]}),e.jsxs("p",{children:["Import the ",e.jsx(t,{children:"AccordionHeaderProps"})," type to assist in building it to be typesafe."]}),e.jsxs("p",{children:["The properties that are available in the ",e.jsx(t,{children:"headerComponent"})," are as follows:"]}),e.jsx(z,{rows:[["isOpen","boolean",e.jsxs("span",{children:["The state of the ",e.jsx(t,{children:"AccordionItem"})," this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]},"row-isopen-desc")],["children","string",e.jsxs("span",{children:["The children property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-children-desc")],["disabled","boolean",e.jsxs("span",{children:["The disabled property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-disabled-desc")],["decorator","ReactNode",e.jsxs("span",{children:["The decorator icon property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-decorator-desc")]]}),e.jsxs("p",{children:["The ",e.jsx(t,{children:"AccordionHeaderIcon"})," is also available for consumption inside of the",e.jsx(t,{children:"headerComponent"}),". The properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"})," are listed below."]})]})}),e.jsx(c,{header:{children:"AccordionHeaderIcon Details",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:F,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["The following table contains properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"}),"."]}),e.jsx(z,{rows:[["isOpen","boolean",e.jsxs("span",{children:["Modifies/Animates the component based on the state of the ",e.jsx(t,{children:"AccordionItem"}),"  this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]},"icon-isopen-desc")],["disabled","boolean","Displays the component with disabled styles."],["size","AccordionHeaderIconSize","Determines the size of the component (small | medium | large)."]]})]})})]}),j=o=>{const i=[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},1),e.jsx(c,{header:{children:"AccordionItem Divider",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})},2),e.jsx(c,{header:{children:"Additional Info",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})},3)],r=m=>e.jsx(c,{header:{children:"I Should be open",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},m),d=e.jsx(c,{header:{children:"I should be closed",active:!1},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},10),s=e.jsx(c,{header:{children:"I should also be closed"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},22),[n,l]=a.useState(i),[h,p]=a.useState(5);return e.jsxs("span",{children:[e.jsx(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:n.map(m=>m)}),e.jsxs(xe,{padding:"xs",spacing:"xs",children:[e.jsx(f,{onClick:()=>{p(h+1),l([...n,r(h)])},children:"Add Element active"}),e.jsx(f,{onClick:()=>l([...n,d]),children:"Add Element inactive"}),e.jsx(f,{onClick:()=>l([...n,s]),children:"Add Element without active prop"}),e.jsx(f,{onClick:()=>l([...n.slice(0,n.length-1)]),children:"Remove an Element from the Accordion"})]})]})},w=o=>e.jsxs(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"AccordionItem Divider"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"Additional Info"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})})]});w.args={"Accordion Divider":!0,"Accordion Border":!0,"Item Divider":!1};const S=()=>{const[o,i]=a.useState("1"),[r,d]=a.useState(!1),[s,n]=a.useState("l");return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Layout"},children:e.jsx(N,{label:{children:"Spacing",htmlFor:"spacing"},extra:e.jsx(Ae,{label:"advanced",mode:r?"on":"off",size:"small",onChange:()=>d(!r)}),helper:{text:"Defines the spacing between elements."},children:e.jsx("div",{className:"flex items-center h-11 relative",children:r?e.jsx("div",{className:"w-full",children:e.jsx(Q,{id:"spacing",decorator:"px",type:be.Number})}):e.jsx(L,{id:"spacing",onChange:i,activeItemId:o,items:[{id:"1",value:"S"},{id:"2",value:"M"},{id:"3",value:"L"}]})})})}),e.jsx(c,{header:{children:"Alignment"},children:e.jsx(N,{label:{children:"Text",htmlFor:"text-alignment"},children:e.jsx(L,{onChange:n,activeItemId:s,items:[{id:"l",icon:e.jsx(ve,{size:D.Size16}),ariaLabel:"Text Align Left"},{id:"c",icon:e.jsx(Ce,{size:D.Size16}),ariaLabel:"Text Align Center"},{id:"r",icon:e.jsx(Ie,{size:D.Size16}),ariaLabel:"Text Align Right"}]})})})]})};g.__docgenInfo={description:"",methods:[],displayName:"WithDifferentAccordionItems"};y.__docgenInfo={description:"",methods:[],displayName:"WithCustomAccordionHeaderComponent"};j.__docgenInfo={description:"",methods:[],displayName:"WithAccordionItemAddition"};w.__docgenInfo={description:"",methods:[],displayName:"WithDividers"};S.__docgenInfo={description:"",methods:[],displayName:"WithAdvancedFormControls"};var R,_,W;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`() => {
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
}`,...(W=(_=g.parameters)==null?void 0:_.docs)==null?void 0:W.source}}};var q,O,H;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`() => <AccordionComponent>
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
    </AccordionComponent>`,...(H=(O=y.parameters)==null?void 0:O.docs)==null?void 0:H.source}}};var K,B,M;j.parameters={...j.parameters,docs:{...(K=j.parameters)==null?void 0:K.docs,source:{originalSource:`args => {
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
}`,...(M=(B=j.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var G,U,V;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`args => <AccordionComponent divider={args['Accordion Divider']} border={args['Accordion Border']}>
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
}`,...(J=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};const fo=["WithDifferentAccordionItems","WithCustomAccordionHeaderComponent","WithAccordionItemAddition","WithDividers","WithAdvancedFormControls"];export{j as WithAccordionItemAddition,S as WithAdvancedFormControls,y as WithCustomAccordionHeaderComponent,g as WithDifferentAccordionItems,w as WithDividers,fo as __namedExportsOrder,wo as default};
