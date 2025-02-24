import{j as e}from"./jsx-runtime-DH9XN8A8.js";import{a as ce}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{r as a}from"./index-v7USjxUg.js";import{A as ae,a as se,E as le,b as he}from"./example-assets-DzTYMeJQ.js";import{c as g}from"./Button-BfBJpGQT.js";import{C as me}from"./ColorPickerFlyout-QC-uL-W-.js";import{E as pe}from"./example-palettes-Av3VljFw.js";import{D as ue}from"./DatePicker-CpAIknRu.js";import{D as Ae}from"./Dropdown-Dao21ydm.js";import{F as N}from"./FormControl-DeLflFlr.js";import{a as ve}from"./ScrollWrapper-BQzUEppe.js";import{S as F}from"./SegmentedControls-DCWkCWQT.js";import{S as be}from"./Switch-CibQ61jG.js";import{T as ee,b as Ce}from"./TextInput-DncHZpfW.js";import{I as E}from"./IconIcon-Czev5ZcQ.js";import{I as Ie,a as xe,b as fe}from"./IconTextAlignmentRight-BObZ6d7y.js";import{I as D}from"./IconSize-BcCrF_mi.js";import{L as we}from"./LegacyStack-BwMr4Mzm.js";import{m as k}from"./merge-DI-veSMP.js";import{$ as L}from"./chain-C8AhrK0W.js";import{b as te}from"./useFocusable-BRFkliNn.js";import{$ as ge}from"./useButton-B6orroTH.js";import{$ as je,a as ye,b as Se}from"./helper-B_Vetl89.js";import{$ as ke}from"./useFocusRing-CP9UJNUw.js";import{$ as Te}from"./ActionMenu-5_j2MR3z.js";import{C as De}from"./CollapsibleWrap-TmreFT1X.js";import{c as Ne}from"./focusStyle-CBFElZiz.js";import{A as Ee}from"./AccordionHeader-DuhxFgHp.js";import{A as Pe}from"./AccordionHeaderIcon-szD-urbb.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useMemoizedId-Cl5PI4eu.js";import"./FocusScope-Drcq722v.js";import"./useEffectEvent-BaECT7_f.js";import"./useMenuTrigger-dROe67R1.js";import"./useLabels-v-oj2KeZ.js";import"./useLocalizedStringFormatter-BEKlpfz7.js";import"./context-BFA77VTM.js";import"./VisuallyHidden-CBFC6H_6.js";import"./useOverlayTriggerState-C3ap9Qkt.js";import"./useControlledState-BSgwHaZM.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCaretRight-bL6MdAvD.js";import"./IconMusicNote-BPgbyY7E.js";import"./index-BYX5Ewl3.js";import"./motion-EixWmitH.js";import"./MenuItem-n3bavbk_.js";import"./IconCheckMark-CMS57PRn.js";import"./elements-BOYmskOL.js";import"./IconCross-LL1GOU_p.js";import"./Flyout-CKjJMoue.js";import"./getVerticalPositioning-g5jPDJsn.js";import"./useDialog-CD34IraE.js";import"./index-voQlCD4e.js";import"./Badge-BnAKN3ul.js";import"./colors-cqDZVL9s.js";import"./FieldsetHeader-DGl8SO0Z.js";import"./IconMinus-DtF84-GK.js";import"./IconPlus-C0FgY_tz.js";import"./IconPlus16-C4i4a16H.js";import"./Trigger-BvTVBjbf.js";import"./IconExclamationMarkTriangle-CTTfs2nR.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconTrashBin16-Db8fv2tm.js";import"./IconTrashBin24-Dz-kV-1n.js";import"./validation-CJXPAjNB.js";import"./IconMagnifier-IbqfyN5J.js";import"./IconMagnifier16-NT0A-8JK.js";import"./floating-ui.react-dom-BxmKaMZw.js";import"./IconCaretUp-Uk6-a0cF.js";import"./useField-Cf7VimOC.js";import"./useFormValidationState-BKAFCnHb.js";import"./SelectionManager-BD4p7d3N.js";import"./usePopper-BO8FF5JQ.js";import"./index-DlnOb27V.js";import"./LoadingCircle-BSQayp2F.js";import"./EnablePortalWrapper-DzTSSIqA.js";import"./Portal-BMcVKwlx.js";import"./InputLabel-CAkTbk9Q.js";import"./TooltipIcon-DWdr_hgc.js";import"./LegacyTooltip-BReeJmjq.js";import"./useLink-C2PgwcjG.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconQuestionMarkCircle-DT_LrHkX.js";import"./IconIcon16-KBXYRe7H.js";import"./IconIcon24-HjPMrfFS.js";import"./IconTextAlignmentRight16-ic_sWk2s.js";import"./isScrollable-BSEN4xi5.js";function Fe(o,i,r){let{item:d}=o,s=L(),n=L(),l=i.disabledKeys.has(d.key),{itemProps:h}=ye({selectionManager:i.selectionManager,key:d.key,ref:r}),{buttonProps:p}=ge(te(h,{id:s,elementType:"button",isDisabled:l,onPress:()=>i.toggleKey(d.key)}),r),m=i.expandedKeys.has(d.key);return{buttonProps:{...p,"aria-expanded":m,"aria-controls":m?n:void 0},regionProps:{id:n,role:"region","aria-labelledby":s}}}function Le(o,i,r){let{listProps:d}=je({...o,...i,allowsTabNavigation:!0,disallowTypeAhead:!0,ref:r});return{accordionProps:{...d,tabIndex:void 0}}}const $e="fondue-accordion",oe="fondue-accordion-item",ze=({item:o,state:i,header:r,padding:d=!0,divider:s=!1,headerComponent:n=Ee,"data-test-id":l=oe})=>{var A,x;const{active:h,...p}=r,m=a.useRef(null),{buttonProps:v,regionProps:I}=Fe({item:o},i,m),u=i.expandedKeys.has(o.key),{isFocusVisible:P,focusProps:T}=ke();return e.jsxs("div",{className:k([P?`${Ne} tw-relative tw-rounded`:"",s&&"tw-divide-y tw-divide-black-10"]),children:[e.jsx("button",{...te(v,T),"data-test-id":l,ref:m,onClick:b=>{r.onClick&&r.onClick(),v.onClick&&v.onClick(b)},onKeyUp:b=>{r.onClick&&b.key==="Enter"&&r.onClick(),v.onKeyUp&&v.onKeyUp(b)},className:"tw-w-full focus-visible:tw-outline-none",children:e.jsx(n,{isOpen:u,...p})}),e.jsx(De,{isOpen:u,preventInitialAnimation:h,children:e.jsx("div",{...I,className:k([d&&"tw-px-8 tw-pb-6","tw-mt-2"]),children:(x=(A=o.props).children)==null?void 0:x.call(A)})})]},o.key)},_e=o=>{const i=a.Children.map(o,(d,s)=>{const{header:n,children:l}=d.props;return e.jsx(Se,{textValue:n.children,children:l?()=>l:null},s)}),r=i.map(d=>d.key).filter((d,s)=>{var n,l;return d&&!!((l=(n=o[s])==null?void 0:n.props.header)!=null&&l.active)})||[];return{children:i,defaultExpandedKeys:r}},Re=({children:o})=>a.Children.toArray(o).reduce((i,r)=>a.isValidElement(r)&&!r.props.header?(console.warn("Use `AccordionItem` as children of `Accordion` and set the `header` prop accordingly."),i):(a.isValidElement(r)&&i.push(r),i),[]),c=({children:o})=>e.jsx(e.Fragment,{children:o});c.displayName="FondueAccordionItem";const We=o=>{var r,d,s;const i=a.Children.toArray(o);return((s=(d=(r=i[i.length-1])==null?void 0:r.props)==null?void 0:d.header)==null?void 0:s.active)===!0},C=o=>{const{divider:i=!0,border:r=!0,"data-test-id":d=$e}=o,s=Re(o),n=_e(s),l=a.useRef(null),h=Te(n),p=a.useRef({firstRender:!0,childLength:a.Children.toArray(o.children).length}),m=a.Children.toArray(o.children).length;a.useEffect(()=>{We(o.children)&&!p.current.firstRender&&a.Children.toArray(o.children).length>p.current.childLength&&h.toggleKey(n.defaultExpandedKeys[n.defaultExpandedKeys.length-1]),p.current={firstRender:!1,childLength:a.Children.toArray(o.children).length}},[n.defaultExpandedKeys,m,o.children,h]);const{accordionProps:{onMouseDown:v,onKeyDown:I,...u}}=Le({...n,disallowTypeAhead:!0},h,l),T={...u,onKeyDown:A=>{const x=A.target.dataset.key,b=h.selectionManager.focusedKey===x;x&&b&&(I==null||I(A))}};return e.jsx("div",{...T,ref:l,"data-test-id":d,className:k([i&&"tw-divide-y tw-divide-black-10",r&&"tw-border-t tw-border-b tw-border-black-10"]),children:[...h.collection].map((A,x)=>{const{header:b,padding:ie,headerComponent:re,divider:de,"data-test-id":ne=oe}=s[x].props;return e.jsx(ze,{item:A,state:h,divider:de,header:b,padding:ie,headerComponent:re,"data-test-id":ne},A.key)})})};C.displayName="FondueAccordion";c.__docgenInfo={description:"",methods:[],displayName:"FondueAccordionItem",props:{header:{required:!0,tsType:{name:"intersection",raw:"Omit<AccordionHeaderProps, 'isOpen'> & { active?: boolean; onClick?: () => void }",elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[{key:"decorator",value:{name:"ReactNode",required:!1}},{key:"children",value:{name:"string",required:!0}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"isOpen",value:{name:"boolean",required:!0}},{key:"data-test-id",value:{name:"string",required:!1}}]}},name:"props"}],return:{name:"ReactElement"}}},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};C.__docgenInfo={description:"@deprecated Please use updated Accordion component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#accordion the migration guide}.",methods:[],displayName:"FondueAccordion",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},divider:{required:!1,tsType:{name:"boolean"},description:""},border:{required:!1,tsType:{name:"boolean"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:""}}};const wo={title:"Components/Accordion",component:C,tags:["autodocs"],parameters:{status:{type:"deprecated"}}},f=()=>{const[o,i]=a.useState(!0),[r,d]=a.useState(""),[s,n]=a.useState(),[l,h]=a.useState({red:0,green:146,blue:120}),[p,m]=a.useState(null),[v,I]=a.useState();return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with decorator, type Accordion and a FormControl child",decorator:e.jsx(E,{}),active:!0},divider:!0,children:e.jsx(N,{label:{children:"Width",htmlFor:"width",tooltip:{content:"Width of the future"}},extra:"Some extra text.",helper:{text:"This input should always equal to 42."},children:e.jsx(ee,{value:r,onChange:d})})}),e.jsx(c,{header:{children:"Item with plain text child",active:!0},children:"bar"}),e.jsx(c,{header:{children:"Item with dropdown child"},children:e.jsx(Ae,{onChange:u=>n(u),activeItemId:s,menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]})}),e.jsx(c,{header:{children:"Item with datepicker child"},children:e.jsx(ve,{children:e.jsx(ue,{variant:"single",startDate:null,endDate:null,value:v,onChange:u=>I(u)})})}),e.jsx(c,{header:{children:"Item with assetinput"},children:e.jsx(ae,{size:se.Large,assets:[le[0]],actions:he})}),e.jsx(c,{header:{children:"Item with color picker flyout"},children:e.jsx(me,{disabled:!1,currentColor:l,onClick:()=>m(l),onClose:()=>h(p),onSelect:u=>h(u),palettes:pe})}),e.jsx(c,{header:{children:"Empty item with an onClick callback",onClick:ce("click")}}),e.jsxs(c,{header:{children:"Item with resizable content"},children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(g,{onClick:()=>i(!o),children:"Toggle Content"})]}),e.jsx(c,{header:{children:"Item without padding"},padding:!1,children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})})]})},$=({isOpen:o,children:i})=>e.jsxs("div",{className:k(["tw-px-6 tw-py-4 tw-bg-black-5 tw-flex tw-justify-between tw-font-bold tw-items-center",o?"tw-text-black":"tw-text-black-60"]),children:[i,e.jsx(Pe,{isOpen:o,size:"small"})]}),t=({children:o})=>e.jsx("code",{className:"tw-bg-black-5 tw-rounded tw-px-2 tw-text-box-negative-strong tw-text-s",children:o}),z=({rows:o})=>e.jsxs("table",{className:"tw-table-fixed tw-border tw-border-black-10 tw-my-4",children:[e.jsx("thead",{className:"tw-bg-black-5",children:e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Property"}),e.jsx("th",{className:"tw-p-3 tw-w-[10%]",children:"Type"}),e.jsx("th",{className:"tw-p-3",children:"Description"})]})}),e.jsx("tbody",{children:o.map(([i,r,d])=>e.jsxs("tr",{className:"tw-p-3 tw-border-b tw-border-b-black-10",children:[e.jsx("td",{className:"tw-p-3 tw-font-bold",children:i}),e.jsx("td",{className:"tw-p-3",children:e.jsx(t,{children:r})}),e.jsx("td",{className:"tw-p-3",children:d})]},i==null?void 0:i.toString()))})]}),j=()=>e.jsxs(C,{children:[e.jsx(c,{header:{children:"Item with a custom headerComponent prop",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:$,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["For maximum flexibility, you can create your own ",e.jsx(t,{children:"headerComponent"})," to pass to the ",e.jsx(t,{children:"Accordion Item"}),"."]}),e.jsxs("p",{children:["Import the ",e.jsx(t,{children:"AccordionHeaderProps"})," type to assist in building it to be typesafe."]}),e.jsxs("p",{children:["The properties that are available in the ",e.jsx(t,{children:"headerComponent"})," are as follows:"]}),e.jsx(z,{rows:[["isOpen","boolean",e.jsxs(e.Fragment,{children:["The state of the ",e.jsx(t,{children:"AccordionItem"})," this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]})],["children","string",e.jsxs(e.Fragment,{children:["The children property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]})],["disabled","boolean",e.jsxs(e.Fragment,{children:["The disabled property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]})],["decorator","ReactNode",e.jsxs(e.Fragment,{children:["The decorator icon property that is passed in via the ",e.jsx(t,{children:"header"})," prop to the ",e.jsx(t,{children:"AccordionItem"}),"."]})]]}),e.jsxs("p",{children:["The ",e.jsx(t,{children:"AccordionHeaderIcon"})," is also available for consumption inside of the",e.jsx(t,{children:"headerComponent"}),". The properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"})," are listed below."]})]})}),e.jsx(c,{header:{children:"AccordionHeaderIcon Details",decorator:e.jsx(E,{}),active:!0},divider:!0,padding:!1,headerComponent:$,children:e.jsxs("div",{className:"tw-p-5",children:[e.jsxs("p",{children:["The following table contains properties that are consumed by the ",e.jsx(t,{children:"AccordionHeaderIcon"}),"."]}),e.jsx(z,{rows:[["isOpen","boolean",e.jsxs(e.Fragment,{children:["Modifies/Animates the component based on the state of the ",e.jsx(t,{children:"AccordionItem"}),"  this ",e.jsx(t,{children:"headerComponent"}),"belongs to."]})],["disabled","boolean","Displays the component with disabled styles."],["size","AccordionHeaderIconSize","Determines the size of the component (small | medium | large)."]]})]})})]}),y=o=>{const i=[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},1),e.jsx(c,{header:{children:"AccordionItem Divider",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})},2),e.jsx(c,{header:{children:"Additional Info",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})},3)],r=m=>e.jsx(c,{header:{children:"I Should be open",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},m),d=e.jsx(c,{header:{children:"I should be closed",active:!1},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},10),s=e.jsx(c,{header:{children:"I should also be closed"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})},22),[n,l]=a.useState(i),[h,p]=a.useState(5);return e.jsxs(e.Fragment,{children:[e.jsx(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:n.map(m=>m)}),e.jsxs(we,{padding:"xs",spacing:"xs",children:[e.jsx(g,{onClick:()=>{p(h+1),l([...n,r(h)])},children:"Add Element active"}),e.jsx(g,{onClick:()=>l([...n,d]),children:"Add Element inactive"}),e.jsx(g,{onClick:()=>l([...n,s]),children:"Add Element without active prop"}),e.jsx(g,{onClick:()=>l([...n.slice(0,n.length-1)]),children:"Remove an Element from the Accordion"})]})]})},w=o=>e.jsxs(C,{divider:o["Accordion Divider"],border:o["Accordion Border"],children:[e.jsx(c,{header:{children:"Accordion Divider & Border",active:!0},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"Accordion"})," will add a divider between the children of the ",e.jsx(t,{children:"Accordion"}),", whereas the ",e.jsx(t,{children:"border"})," prop will add a top and bottom border to the entire ",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"AccordionItem Divider"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Settings the ",e.jsx(t,{children:"divider"})," prop on the ",e.jsx(t,{children:"AccordionItem"})," will add a divider between the header and content of the ",e.jsx(t,{children:"AccordionItem"})," when it is open.",e.jsx(t,{children:"Accordion"}),"."]})}),e.jsx(c,{header:{children:"Additional Info"},divider:o["Item Divider"],children:e.jsxs("div",{className:"tw-p-6",children:["Play around with the settings below to see the difference between these three properties. The ",e.jsx(t,{children:"Accordion"})," Ccomponent has the ",e.jsx(t,{children:"divider"})," and ",e.jsx(t,{children:"border"})," set to true by default, whereas the ",e.jsx(t,{children:"AccordionItem"})," has the divider set to false by default."]})})]});w.args={"Accordion Divider":!0,"Accordion Border":!0,"Item Divider":!1};const S=()=>{const[o,i]=a.useState("1"),[r,d]=a.useState(!1),[s,n]=a.useState("l");return e.jsxs(C,{children:[e.jsx(c,{header:{children:"Layout"},children:e.jsx(N,{label:{children:"Spacing",htmlFor:"spacing"},extra:e.jsx(be,{label:"advanced",mode:r?"on":"off",size:"small",onChange:()=>d(!r)}),helper:{text:"Defines the spacing between elements."},children:e.jsx("div",{className:"flex items-center h-11 relative",children:r?e.jsx("div",{className:"w-full",children:e.jsx(ee,{id:"spacing",decorator:"px",type:Ce.Number})}):e.jsx(F,{id:"spacing",onChange:i,activeItemId:o,items:[{id:"1",value:"S"},{id:"2",value:"M"},{id:"3",value:"L"}]})})})}),e.jsx(c,{header:{children:"Alignment"},children:e.jsx(N,{label:{children:"Text",htmlFor:"text-alignment"},children:e.jsx(F,{onChange:n,activeItemId:s,items:[{id:"l",icon:e.jsx(Ie,{size:D.Size16}),ariaLabel:"Text Align Left"},{id:"c",icon:e.jsx(xe,{size:D.Size16}),ariaLabel:"Text Align Center"},{id:"r",icon:e.jsx(fe,{size:D.Size16}),ariaLabel:"Text Align Right"}]})})})]})};f.__docgenInfo={description:"### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead.",methods:[],displayName:"WithDifferentAccordionItems"};j.__docgenInfo={description:"",methods:[],displayName:"WithCustomAccordionHeaderComponent"};y.__docgenInfo={description:"",methods:[],displayName:"WithAccordionItemAddition"};w.__docgenInfo={description:"",methods:[],displayName:"WithDividers"};S.__docgenInfo={description:"",methods:[],displayName:"WithAdvancedFormControls"};var _,R,W,q,O;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
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
}`,...(W=(R=f.parameters)==null?void 0:R.docs)==null?void 0:W.source},description:{story:"### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead.",...(O=(q=f.parameters)==null?void 0:q.docs)==null?void 0:O.description}}};var H,K,B;j.parameters={...j.parameters,docs:{...(H=j.parameters)==null?void 0:H.docs,source:{originalSource:`() => <AccordionComponent>
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
                <PropsTable rows={[['isOpen', 'boolean', <>
                                The state of the <Code>AccordionItem</Code> this <Code>headerComponent</Code>
                                belongs to.
                            </>], ['children', 'string', <>
                                The children property that is passed in via the <Code>header</Code> prop to the&nbsp;
                                <Code>AccordionItem</Code>.
                            </>], ['disabled', 'boolean', <>
                                The disabled property that is passed in via the <Code>header</Code> prop to the&nbsp;
                                <Code>AccordionItem</Code>.
                            </>], ['decorator', 'ReactNode', <>
                                The decorator icon property that is passed in via the <Code>header</Code> prop to
                                the&nbsp;
                                <Code>AccordionItem</Code>.
                            </>]]} />
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
                <PropsTable rows={[['isOpen', 'boolean', <>
                                Modifies/Animates the component based on the state of the <Code>AccordionItem</Code>
                                &nbsp; this <Code>headerComponent</Code>
                                belongs to.
                            </>], ['disabled', 'boolean', 'Displays the component with disabled styles.'], ['size', 'AccordionHeaderIconSize', 'Determines the size of the component (small | medium | large).']]} />
            </div>
        </AccordionItem>
    </AccordionComponent>`,...(B=(K=j.parameters)==null?void 0:K.docs)==null?void 0:B.source}}};var M,U,V;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
  return <>
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
        </>;
}`,...(V=(U=y.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var G,X,Y;w.parameters={...w.parameters,docs:{...(G=w.parameters)==null?void 0:G.docs,source:{originalSource:`args => <AccordionComponent divider={args['Accordion Divider']} border={args['Accordion Border']}>
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
    </AccordionComponent>`,...(Y=(X=w.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var J,Q,Z;S.parameters={...S.parameters,docs:{...(J=S.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const [spacing, setSpacing] = useState('1');
  const [showAdvancedSpacing, setShowAdvancedSpacing] = useState(false);
  const [alignment, setAlignmnent] = useState('l');
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
                    <SegmentedControls onChange={setAlignmnent} activeItemId={alignment} items={[{
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
}`,...(Z=(Q=S.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};const go=["WithDifferentAccordionItems","WithCustomAccordionHeaderComponent","WithAccordionItemAddition","WithDividers","WithAdvancedFormControls"];export{y as WithAccordionItemAddition,S as WithAdvancedFormControls,j as WithCustomAccordionHeaderComponent,f as WithDifferentAccordionItems,w as WithDividers,go as __namedExportsOrder,wo as default};
