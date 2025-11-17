import{r as a,j as e}from"./iframe-Cu7WuWmt.js";import{A as de,a as ne,E as ce,b as ae}from"./example-assets-BqjSNuuj.js";import{B as f}from"./Button-iqyAJLb9.js";import{C as se}from"./ColorPickerFlyout-JuMraOtW.js";import{E as le}from"./example-palettes-CQ8Ul2HH.js";import{D as he}from"./DatePicker-BknAUR1t.js";import{D as me}from"./Dropdown-oQ91655a.js";import{F as N}from"./FormControl-GrN_fxmf.js";import{S as pe}from"./ScrollWrapper-BTEntgnk.js";import{S as L}from"./SegmentedControls-ByDFsoCn.js";import{S as ue}from"./Switch-BpmVGn4w.js";import{T as Q,a as Ae}from"./TextInput-C3a9epXA.js";import{I as E}from"./IconIcon-BLEdCS9y.js";import{I as be,a as ve,b as Ce}from"./IconTextAlignmentRight-BPMue9Mj.js";import{I as D}from"./IconSize-BcCrF_mi.js";import{L as Ie}from"./LegacyStack-BngdxpnH.js";import{m as k}from"./merge-DI-veSMP.js";import{$}from"./chain-DzPdYz3A.js";import{$ as Z}from"./useFocusable-Dx3aTy-6.js";import{$ as xe}from"./useButton-DRD0Om0b.js";import{$ as we,a as fe,b as ge}from"./helper-Bal00lz1.js";import{$ as ye}from"./useFocusRing-By5YZPuN.js";import{$ as je}from"./ActionMenu-BirchgC7.js";import{C as Se}from"./CollapsibleWrap-BiwC9gC_.js";import{F as ke}from"./focusStyle-Ch_WJ4aJ.js";import{A as Te}from"./AccordionHeader-MgLQimBf.js";import{A as De}from"./AccordionHeaderIcon-C3c6GAe4.js";import"./preload-helper-C1FmrZbK.js";import"./useMemoizedId-5bIc_pH3.js";import"./FocusScope-Ddhvfobb.js";import"./useEffectEvent-D61kxaXb.js";import"./useMenuTrigger-CFYgkl3S.js";import"./useLabels-BzAbWYxL.js";import"./useLocalizedStringFormatter-B7vVTZq5.js";import"./context-ZowIr7m8.js";import"./VisuallyHidden-DsMM3GKm.js";import"./useOverlayTriggerState-DUSXGHsh.js";import"./useControlledState-ISnwDbNV.js";import"./IconCaretDown-BEvA4OcA.js";import"./IconCaretDown16-BpQbqlUF.js";import"./IconCaretRight-BFgojaj0.js";import"./IconMusicNote-D2-h0Luk.js";import"./index-DA0eoqU7.js";import"./proxy-kfoev_V2.js";import"./MenuItem-BYWNcy-q.js";import"./IconCheckMark-6i_Ww4Aa.js";import"./elements-BOYmskOL.js";import"./IconCross-DDYOrz4a.js";import"./Flyout-DMxDNGHN.js";import"./getVerticalPositioning-Bdpvu71J.js";import"./useDialog-DhYkl78l.js";import"./index-CWak45N9.js";import"./Badge-CWT6OD9V.js";import"./colors-cqDZVL9s.js";import"./FieldsetHeader-EqCXrpnT.js";import"./IconMinus-Ck1207Uf.js";import"./IconMinus16-BmuASio_.js";import"./IconPlus-D3clpgfO.js";import"./IconPlus16-B4d9hgV4.js";import"./Trigger-BarhUeFG.js";import"./IconExclamationMarkTriangle-stB7IQOj.js";import"./IconExclamationMarkTriangle24-Dh72OkiN.js";import"./IconTrashBin16-DOh5s1Me.js";import"./IconTrashBin24-ygXzWHBB.js";import"./validation-C9S5KgfE.js";import"./IconMagnifier-8Mp26qUM.js";import"./IconMagnifier16-D8KjrM9k.js";import"./index-KeY30p2e.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretUp-C930_pus.js";import"./useField-Cm8-iFj1.js";import"./useFormValidationState-BkJxFG34.js";import"./SelectionManager-CEFOK3ge.js";import"./usePopper-CZ7pUJoz.js";import"./index-Cx3HzQ1K.js";import"./LoadingCircle-B5YFgW2W.js";import"./EnablePortalWrapper-DhbwTJ6L.js";import"./Portal-BQEszYo9.js";import"./InputLabel-BxT6vyyG.js";import"./TooltipIcon-CrevF7Ie.js";import"./LegacyTooltip-CP9ttZ3h.js";import"./useLink-DDzjwbY0.js";import"./IconExclamationMarkCircle24-DPWEIETt.js";import"./IconQuestionMarkCircle-B7PdEY9c.js";import"./IconIcon16-B5cdSmdP.js";import"./IconIcon24-AUfcC-O1.js";import"./IconTextAlignmentRight16-BUMLatRP.js";import"./keyboard-DcEuDQEs.js";function Ne(o,r,i){let{item:d}=o,s=$(),n=$(),l=r.disabledKeys.has(d.key),{itemProps:h}=fe({selectionManager:r.selectionManager,key:d.key,ref:i}),{buttonProps:p}=xe(Z(h,{id:s,elementType:"button",isDisabled:l,onPress:()=>r.toggleKey(d.key)}),i),m=r.expandedKeys.has(d.key);return{buttonProps:{...p,"aria-expanded":m,"aria-controls":m?n:void 0},regionProps:{id:n,role:"region","aria-labelledby":s}}}function Ee(o,r,i){let{listProps:d}=we({...o,...r,allowsTabNavigation:!0,disallowTypeAhead:!0,ref:i});return{accordionProps:{...d,tabIndex:void 0}}}const Pe="fondue-accordion",ee="fondue-accordion-item",Le=({item:o,state:r,header:i,padding:d=!0,divider:s=!1,headerComponent:n=Te,"data-test-id":l=ee})=>{var A,x;const{active:h,...p}=i,m=a.useRef(null),{buttonProps:b,regionProps:I}=Ne({item:o},r,m),u=r.expandedKeys.has(o.key),{isFocusVisible:P,focusProps:T}=ye();return e.jsxs("div",{className:k([P?`${ke} tw-relative tw-rounded`:"",s&&"tw-divide-y tw-divide-black-10"]),children:[e.jsx("button",{type:"button",...Z(b,T),"data-test-id":l,ref:m,onClick:v=>{i.onClick&&i.onClick(),b.onClick&&b.onClick(v)},onKeyUp:v=>{i.onClick&&v.key==="Enter"&&i.onClick(),b.onKeyUp&&b.onKeyUp(v)},className:"tw-w-full focus-visible:tw-outline-none",children:e.jsx(n,{isOpen:u,...p})}),e.jsx(Se,{isOpen:u,preventInitialAnimation:h,children:e.jsx("div",{...I,className:k([d&&"tw-px-8 tw-pb-6","tw-mt-2"]),children:(x=(A=o.props).children)==null?void 0:x.call(A)})})]},o.key)},$e=o=>{const r=a.Children.map(o,(d,s)=>{const{header:n,children:l}=d.props;return e.jsx(ge,{textValue:n.children,children:l?()=>l:null},s)}),i=r.map(d=>d.key).filter((d,s)=>{var n,l;return d&&!!((l=(n=o[s])==null?void 0:n.props.header)!=null&&l.active)})||[];return{children:r,defaultExpandedKeys:i}},Fe=({children:o})=>a.Children.toArray(o).reduce((r,i)=>a.isValidElement(i)&&!i.props.header?(console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly."),r):(a.isValidElement(i)&&r.push(i),r),[]),c=({children:o})=>e.jsx(e.Fragment,{children:o});c.displayName="FondueAccordionItem";const _e=o=>{var i,d,s;const r=a.Children.toArray(o);return((s=(d=(i=r[r.length-1])==null?void 0:i.props)==null?void 0:d.header)==null?void 0:s.active)===!0},C=o=>{const{divider:r=!0,border:i=!0,"data-test-id":d=Pe}=o,s=Fe(o),n=$e(s),l=a.useRef(null),h=je(n),p=a.useRef({firstRender:!0,childLength:a.Children.toArray(o.children).length}),m=a.Children.toArray(o.children).length;a.useEffect(()=>{_e(o.children)&&!p.current.firstRender&&a.Children.toArray(o.children).length>p.current.childLength&&h.toggleKey(n.defaultExpandedKeys[n.defaultExpandedKeys.length-1]),p.current={firstRender:!1,childLength:a.Children.toArray(o.children).length}},[n.defaultExpandedKeys,m,o.children,h]);const{accordionProps:{onMouseDown:b,onKeyDown:I,...u}}=Ee({...n,disallowTypeAhead:!0},h,l),T={...u,onKeyDown:A=>{const x=A.target.dataset.key,v=h.selectionManager.focusedKey===x;x&&v&&(I==null||I(A))}};return e.jsx("div",{...T,ref:l,"data-test-id":d,className:k([r&&"tw-divide-y tw-divide-black-10",i&&"tw-border-t tw-border-b tw-border-black-10"]),children:[...h.collection].map((A,x)=>{const{header:v,padding:te,headerComponent:oe,divider:ie,"data-test-id":re=ee}=s[x].props;return e.jsx(Le,{item:A,state:h,divider:ie,header:v,padding:te,headerComponent:oe,"data-test-id":re},A.key)})})};C.displayName="FondueAccordion";c.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordionItem",props:{header:{required:!0,tsType:{name:"intersection",raw:"Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void }",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
