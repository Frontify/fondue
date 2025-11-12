import{r as a,j as e}from"./iframe-Bi_jfSnd.js";import{A as de,a as ne,E as ce,b as ae}from"./example-assets-Cip7TUw8.js";import{B as f}from"./Button-B0gf8XMR.js";import{C as se}from"./ColorPickerFlyout-qV9YSo9D.js";import{E as le}from"./example-palettes-DKbkJud0.js";import{D as he}from"./DatePicker-DMjUonEw.js";import{D as me}from"./Dropdown-CCvFu3K9.js";import{F as N}from"./FormControl-CupTHtjN.js";import{S as pe}from"./ScrollWrapper-BuBB4J3i.js";import{S as L}from"./SegmentedControls-B97s6uKD.js";import{S as ue}from"./Switch-CuFp48yf.js";import{T as Q,a as Ae}from"./TextInput-BYV0thMr.js";import{I as E}from"./IconIcon-CmUgOF70.js";import{I as be,a as ve,b as Ce}from"./IconTextAlignmentRight-C1XI-gYu.js";import{I as D}from"./IconSize-BcCrF_mi.js";import{L as Ie}from"./LegacyStack-DAzN_Tdp.js";import{m as k}from"./merge-DI-veSMP.js";import{$}from"./chain-CTs3wXrO.js";import{$ as Z}from"./useFocusable-BHWiTFLM.js";import{$ as xe}from"./useButton-QBPONJkz.js";import{$ as we,a as fe,b as ge}from"./helper-BGGyZPLj.js";import{$ as ye}from"./useFocusRing-CQP_YSAQ.js";import{$ as je}from"./ActionMenu-DVs3Z5mA.js";import{C as Se}from"./CollapsibleWrap-nh5WslVE.js";import{F as ke}from"./focusStyle-Ch_WJ4aJ.js";import{A as Te}from"./AccordionHeader-TkVhMzZg.js";import{A as De}from"./AccordionHeaderIcon-zfd6Reov.js";import"./preload-helper-CG1F6kIz.js";import"./useMemoizedId-mCaU_17l.js";import"./FocusScope-CpCoYzyo.js";import"./useEffectEvent-zHRh56A3.js";import"./useMenuTrigger-7dG_N6_K.js";import"./useLabels-DiC72Roz.js";import"./useLocalizedStringFormatter-D1dmmpfx.js";import"./context-C7MNOtJr.js";import"./VisuallyHidden-CoslJWhW.js";import"./useOverlayTriggerState-DSAU5ewh.js";import"./useControlledState-BgciVEFz.js";import"./IconCaretDown-DXMwG5TD.js";import"./IconCaretDown16-BBuXEcPp.js";import"./IconCaretRight-FNKrK0VN.js";import"./IconMusicNote-_VuJffQZ.js";import"./index-BK2IGtcZ.js";import"./proxy-BjcD1NSW.js";import"./MenuItem-Khlt57Pw.js";import"./IconCheckMark-BD9LKDAE.js";import"./elements-BOYmskOL.js";import"./IconCross-B6ER-0OV.js";import"./Flyout-nwDVlGVV.js";import"./getVerticalPositioning-Bdpvu71J.js";import"./useDialog-GrfEL2ec.js";import"./index-Cl_29qdh.js";import"./Badge-BXpisw3D.js";import"./colors-cqDZVL9s.js";import"./FieldsetHeader-BjtvvOer.js";import"./IconMinus-BfcrP6eh.js";import"./IconPlus-CuTQQRan.js";import"./IconPlus16-BfwPo5oX.js";import"./Trigger-CFSxr8Ij.js";import"./IconExclamationMarkTriangle-BeXKyi0N.js";import"./IconExclamationMarkTriangle24-DbV4sldj.js";import"./IconTrashBin16-C0EoEvme.js";import"./IconTrashBin24-DzuIAFcI.js";import"./validation-C9S5KgfE.js";import"./IconMagnifier-DCwZeOL5.js";import"./IconMagnifier16-BfeX03lh.js";import"./index-DUc5u9ob.js";import"./floating-ui.dom-BeV4s8NL.js";import"./IconCaretUp-C8cJti-X.js";import"./useField-CHYrgMmA.js";import"./useFormValidationState-BWEIozTf.js";import"./SelectionManager-BFxNZJT_.js";import"./usePopper-hPvozz_f.js";import"./index-D7izUPt0.js";import"./LoadingCircle-DeLs2a81.js";import"./EnablePortalWrapper-DT0NwmAe.js";import"./Portal-BK2M_YVZ.js";import"./InputLabel-DiFtr5lq.js";import"./TooltipIcon-BREcT8uO.js";import"./LegacyTooltip-CmBmbwCT.js";import"./useLink-BDIhzraw.js";import"./IconExclamationMarkCircle24-DHU_uxqb.js";import"./IconQuestionMarkCircle-CuPjajkp.js";import"./IconIcon16-DWFc_9T8.js";import"./IconIcon24-DMrPVXpa.js";import"./IconTextAlignmentRight16-DJGdtzOU.js";import"./keyboard-C-NXuvu4.js";function Ne(o,r,i){let{item:d}=o,s=$(),n=$(),l=r.disabledKeys.has(d.key),{itemProps:h}=fe({selectionManager:r.selectionManager,key:d.key,ref:i}),{buttonProps:p}=xe(Z(h,{id:s,elementType:"button",isDisabled:l,onPress:()=>r.toggleKey(d.key)}),i),m=r.expandedKeys.has(d.key);return{buttonProps:{...p,"aria-expanded":m,"aria-controls":m?n:void 0},regionProps:{id:n,role:"region","aria-labelledby":s}}}function Ee(o,r,i){let{listProps:d}=we({...o,...r,allowsTabNavigation:!0,disallowTypeAhead:!0,ref:i});return{accordionProps:{...d,tabIndex:void 0}}}const Pe="fondue-accordion",ee="fondue-accordion-item",Le=({item:o,state:r,header:i,padding:d=!0,divider:s=!1,headerComponent:n=Te,"data-test-id":l=ee})=>{var A,x;const{active:h,...p}=i,m=a.useRef(null),{buttonProps:b,regionProps:I}=Ne({item:o},r,m),u=r.expandedKeys.has(o.key),{isFocusVisible:P,focusProps:T}=ye();return e.jsxs("div",{className:k([P?`${ke} tw-relative tw-rounded`:"",s&&"tw-divide-y tw-divide-black-10"]),children:[e.jsx("button",{type:"button",...Z(b,T),"data-test-id":l,ref:m,onClick:v=>{i.onClick&&i.onClick(),b.onClick&&b.onClick(v)},onKeyUp:v=>{i.onClick&&v.key==="Enter"&&i.onClick(),b.onKeyUp&&b.onKeyUp(v)},className:"tw-w-full focus-visible:tw-outline-none",children:e.jsx(n,{isOpen:u,...p})}),e.jsx(Se,{isOpen:u,preventInitialAnimation:h,children:e.jsx("div",{...I,className:k([d&&"tw-px-8 tw-pb-6","tw-mt-2"]),children:(x=(A=o.props).children)==null?void 0:x.call(A)})})]},o.key)},$e=o=>{const r=a.Children.map(o,(d,s)=>{const{header:n,children:l}=d.props;return e.jsx(ge,{textValue:n.children,children:l?()=>l:null},s)}),i=r.map(d=>d.key).filter((d,s)=>{var n,l;return d&&!!((l=(n=o[s])==null?void 0:n.props.header)!=null&&l.active)})||[];return{children:r,defaultExpandedKeys:i}},Fe=({children:o})=>a.Children.toArray(o).reduce((r,i)=>a.isValidElement(i)&&!i.props.header?(console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly."),r):(a.isValidElement(i)&&r.push(i),r),[]),c=({children:o})=>e.jsx(e.Fragment,{children:o});c.displayName="FondueAccordionItem";const _e=o=>{var i,d,s;const r=a.Children.toArray(o);return((s=(d=(i=r[r.length-1])==null?void 0:i.props)==null?void 0:d.header)==null?void 0:s.active)===!0},C=o=>{const{divider:r=!0,border:i=!0,"data-test-id":d=Pe}=o,s=Fe(o),n=$e(s),l=a.useRef(null),h=je(n),p=a.useRef({firstRender:!0,childLength:a.Children.toArray(o.children).length}),m=a.Children.toArray(o.children).length;a.useEffect(()=>{_e(o.children)&&!p.current.firstRender&&a.Children.toArray(o.children).length>p.current.childLength&&h.toggleKey(n.defaultExpandedKeys[n.defaultExpandedKeys.length-1]),p.current={firstRender:!1,childLength:a.Children.toArray(o.children).length}},[n.defaultExpandedKeys,m,o.children,h]);const{accordionProps:{onMouseDown:b,onKeyDown:I,...u}}=Ee({...n,disallowTypeAhead:!0},h,l),T={...u,onKeyDown:A=>{const x=A.target.dataset.key,v=h.selectionManager.focusedKey===x;x&&v&&(I==null||I(A))}};return e.jsx("div",{...T,ref:l,"data-test-id":d,className:k([r&&"tw-divide-y tw-divide-black-10",i&&"tw-border-t tw-border-b tw-border-black-10"]),children:[...h.collection].map((A,x)=>{const{header:v,padding:te,headerComponent:oe,divider:ie,"data-test-id":re=ee}=s[x].props;return e.jsx(Le,{item:A,state:h,divider:ie,header:v,padding:te,headerComponent:oe,"data-test-id":re},A.key)})})};C.displayName="FondueAccordion";c.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordionItem",props:{header:{required:!0,tsType:{name:"intersection",raw:"Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void }",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"decorator",value:{name:"ReactNode",required:!1}},{key:"children",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"isOpen",value:{name:"boolean",required:!0}},{key:"data-test-id",value:{name:"string",required:!1}}]}},name:"props"}],return:{name:"ReactElement"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};C.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordion",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},divider:{required:!1,tsType:{name:"boolean"},description:""},border:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};const{action:ze}=__STORYBOOK_MODULE_ACTIONS__,Co={title:"Components/Accordion",component:C,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead."}}}},g=()=>{const[o,r]=a.useState(!0),[i,d]=a.useState(""),[s,n]=a.useState(),[l,h]=a.useState({red:0,green:146,blue:120}),[p,m]=a.useState(null),[b,I]=a.useState();return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with decorator, type Accordion and a FormControl child",decorator:e.jsx(E,{}),active:!0},divider:!0,children:e.jsx(N,{label:{children:"Width",htmlFor:"width",tooltip:{content:"Width of the future"}},extra:"Some extra text.",helper:{text:"This input should always equal to 42."},children:e.jsx(Q,{value:i,onChange:d})})}),e.jsx(c,{header:{children:"Item with plain text child",active:!0},children:"bar"}),e.jsx(c,{header:{children:"Item with dropdown child"},children:e.jsx(me,{onChange:u=>n(u),activeItemId:s,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]})}),e.jsx(c,{header:{children:"Item with datepicker child"},children:e.jsx(pe,{children:e.jsx(he,{variant:"single",startDate:null,endDate:null,value:b,onChange:u=>I(u)})})}),e.jsx(c,{header:{children:"Item with assetinput"},children:e.jsx(de,{size:ae.Large,assets:[ce[0]],actions:ne})}),e.jsx(c,{header:{children:"Item with color picker flyout"},children:e.jsx(se,{disabled:!1,currentColor:l,onClick:()=>m(l),onClose:()=>h(p),onSelect:u=>h(u),palettes:le})}),e.jsx(c,{header:{children:"Empty item with an onClick callback",onClick:ze("click")}}),e.jsxs(c,{header:{children:"Item with resizable content"},children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(f,{onClick:()=>r(!o),children:"Toggle Content"})]}),e.jsx(c,{header:{children:"Item without padding"},padding:!1,children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})})]})},F=({isOpen:o,children:r})=>e.jsxs("div",{className:k(["tw-px-6 tw-py-4 tw-bg-black-5 tw-flex tw-justify-between tw-font-bold tw-items-center",o?"tw-text-black":"tw-text-black-60"]),children:[r,e.jsx(De,{isOpen:o,size:"small"})]}),t=({children:o})=>e.jsx("code",{className:"tw-bg-black-5 tw-rounded tw-px-2 tw-text-box-negative-strong tw-text-s",children:o}),_=({rows:o})=>e.jsxs("table",{className:"tw-table-fixed tw-border tw-border-black-10 tw-my-4",children:[e.jsx("thead",{className:"tw-bg-black-5",children:e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Property"}),e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Type"}),e.jsx("th",{className:"tw-p-3",children:"Description"})]})}),e.jsx("tbody",{children:o.map(([r,i,d],s)=>e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("td",{className:"tw-p-3 tw-font-bold",children:r}),e.jsx("td",{className:"tw-p-3",children:e.jsx(t,{children:i})}),e.jsx("td",{className:"tw-p-3",children:d})]},`row-${s}`))})]}),y=()=>e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with a custom headerComponent prop",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:F,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["For maximum flexibility, you can create your own ",e.jsx(t,{children:"headerComponent"})," to pass to the ",e.jsx(t,{children:"Accordion Item"}),"."]}),e.jsxs("p",{children:["Import the ",e.jsx(t,{children:"AccordionHeaderProps"})," type to assist in building it to be typesafe."]}),e.jsxs("p",{children:["The properties that are available in the ",e.jsx(t,{children:"headerComponent"})," are as follows:"]}),e.jsx(_,{rows:[["isOpen","boolean",e.jsxs("span",{children:["The state of the ",e.jsx(t,{children:"AccordionItem"})," this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]},"row-isopen-desc")],["children","string",e.jsxs("span",{children:["The children property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-children-desc")],["disabled","boolean",e.jsxs("span",{children:["The disabled property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-disabled-desc")],["decorator","ReactNode",e.jsxs("span",{children:["The decorator icon property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]},"row-decorator-desc")]]}),e.jsxs("p",{children:["The ",e.jsx(t,{children:"AccordionHeaderIcon"})," is also available for consumption inside of the",e.jsx(t,{children:"headerComponent"}),". The properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"})," are listed below."]})]})}),e.jsx(c,{header:{children:"AccordionHeaderIcon Details",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:F,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["The following table contains properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"}),"."]}),e.jsx(_,{rows:[["isOpen","boolean",e.jsxs("span",{children:["Modifies/Animates the component based on the state of the ",e.jsx(t,{children:"AccordionItem"}),"  this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]},"icon-isopen-desc")],["disabled","boolean","Displays the component with disabled styles."],["size","AccordionHeaderIconSize","Determines the size of the component (small | medium | large)."]]})]})})]}),j=o=>{const r=[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},1),e.jsx(c,{header:{children:"AccordionItem Divider",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})},2),e.jsx(c,{header:{children:"Additional Info",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})},3)],i=m=>e.jsx(c,{header:{children:"I Should be open",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},m),d=e.jsx(c,{header:{children:"I should be closed",active:!1},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},10),s=e.jsx(c,{header:{children:"I should also be closed"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},22),[n,l]=a.useState(r),[h,p]=a.useState(5);return e.jsxs("span",{children:[e.jsx(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:n.map(m=>m)}),e.jsxs(Ie,{padding:"xs",spacing:"xs",children:[e.jsx(f,{onClick:()=>{p(h+1),l([...n,i(h)])},children:"Add Element active"}),e.jsx(f,{onClick:()=>l([...n,d]),children:"Add Element inactive"}),e.jsx(f,{onClick:()=>l([...n,s]),children:"Add Element without active prop"}),e.jsx(f,{onClick:()=>l([...n.slice(0,n.length-1)]),children:"Remove an Element from the Accordion"})]})]})},w=o=>e.jsxs(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"AccordionItem Divider"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"Additional Info"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})})]});w.args={"Accordion Divider":!0,"Accordion Border":!0,"Item Divider":!1};const S=()=>{const[o,r]=a.useState("1"),[i,d]=a.useState(!1),[s,n]=a.useState("l");return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Layout"},children:e.jsx(N,{label:{children:"Spacing",htmlFor:"spacing"},extra:e.jsx(ue,{label:"advanced",mode:i?"on":"off",size:"small",onChange:()=>d(!i)}),helper:{text:"Defines the spacing between elements."},children:e.jsx("div",{className:"flex items-center h-11 relative",children:i?e.jsx("div",{className:"w-full",children:e.jsx(Q,{id:"spacing",decorator:"px",type:Ae.Number})}):e.jsx(L,{id:"spacing",onChange:r,activeItemId:o,items:[{id:"1",value:"S"},{id:"2",value:"M"},{id:"3",value:"L"}]})})})}),e.jsx(c,{header:{children:"Alignment"},children:e.jsx(N,{label:{children:"Text",htmlFor:"text-alignment"},children:e.jsx(L,{onChange:n,activeItemId:s,items:[{id:"l",icon:e.jsx(be,{size:D.Size16}),ariaLabel:"Text Align Left"},{id:"c",icon:e.jsx(ve,{size:D.Size16}),ariaLabel:"Text Align Center"},{id:"r",icon:e.jsx(Ce,{size:D.Size16}),ariaLabel:"Text Align Right"}]})})})]})};g.__docgenInfo={description:"",methods:[],displayName:"WithDifferentAccordionItems"};y.__docgenInfo={description:"",methods:[],displayName:"WithCustomAccordionHeaderComponent"};j.__docgenInfo={description:"",methods:[],displayName:"WithAccordionItemAddition"};w.__docgenInfo={description:"",methods:[],displayName:"WithDividers"};S.__docgenInfo={description:"",methods:[],displayName:"WithAdvancedFormControls"};var z,O,R;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
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
}`,...(J=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:J.source}}};const Io=["WithDifferentAccordionItems","WithCustomAccordionHeaderComponent","WithAccordionItemAddition","WithDividers","WithAdvancedFormControls"];export{j as WithAccordionItemAddition,S as WithAdvancedFormControls,y as WithCustomAccordionHeaderComponent,g as WithDifferentAccordionItems,w as WithDividers,Io as __namedExportsOrder,Co as default};
