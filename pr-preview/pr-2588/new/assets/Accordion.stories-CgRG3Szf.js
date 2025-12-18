import{r as m,j as e,u as he,R as A,F}from"./iframe-CKvecR3H.js";import{d as Me,c as Ce,h as Ve,i as Je}from"./fondue-icons369-C0NiwhYG.js";import{c as ve}from"./index-bt3jeVon.js";import{c as We}from"./index-BMPaU_De.js";import{c as fe,u as $e}from"./index-DU3OuDr5.js";import{u as G}from"./index-jdh4CRYF.js";import{P as R}from"./index-_tTHjIuf.js";import{P as Ge}from"./index-CdiSaH0a.js";import{u as Ie}from"./index-dVvfrhZq.js";import{u as Ke}from"./index-BH5nS8V3.js";import{B as ne}from"./Badge-B6IcBT4A.js";import"./Box-dN1bW5W6.js";import{B as f}from"./Button-DDqi2_Hn.js";import"./Checkbox-BGMTxZLc.js";import{c as D}from"./ColorPicker-BsZWOrtf.js";import"./Dialog-Dw6APrBp.js";import"./Divider-DsiwKVhq.js";import{h}from"./Dropdown-DDiIgA4b.js";import{F as g}from"./Flyout-au6mwELf.js";import"./Grid-osrlD8FO.js";import"./Heading-41KZ_32h.js";import"./Label-D26BgOkU.js";import"./Link-D70nbSin.js";import"./LoadingBar-D3I3c4Cp.js";import"./LoadingCircle-DzncA-ya.js";import"./Notice-Ct-Is0S-.js";import"./RadioList-Nk-kkp1i.js";import"./ScrollArea-BilX_p60.js";import"./Section-B0WX3j0L.js";import"./SegmentedControl-Cyen8TFt.js";import"./Select-BlRY9Eh6.js";import"./Slider-C2thyeMX.js";import"./SplitButton-BlHVbJki.js";import"./Switch-DFgfcKTS.js";import"./Table-CZ8DcSNG.js";import"./Tag-D4qw-KUm.js";import"./Tabs-gDZum3IF.js";import"./Text-BrUdW7DX.js";import"./TextInput-BdppTeET.js";import"./Textarea-BLK-yLbW.js";import"./Tooltip-cMo-U820.js";import"./preload-helper-SGr33HGO.js";import"./useTranslation-ChnOxDM6.js";import"./index-BLJz618Y.js";import"./component-BGjQecc7.js";import"./index-q2KkOwi-.js";import"./useSyncRefs-Bc8YcF2t.js";import"./domUtilities-DGDVwu3_.js";import"./index-BaBMDQia.js";import"./index-BdQq_4o_.js";import"./useControllableState-v7dlgNpA.js";var L="Collapsible",[Ue,xe]=ve(L),[Ye,K]=Ue(L),ye=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,open:i,defaultOpen:a,disabled:c,onOpenChange:d,...s}=o,[u,p]=G({prop:i,defaultProp:a??!1,onChange:d,caller:L});return e.jsx(Ye,{scope:n,disabled:c,contentId:Ie(),open:u,onOpenToggle:m.useCallback(()=>p(C=>!C),[p]),children:e.jsx(R.div,{"data-state":Y(u),"data-disabled":c?"":void 0,...s,ref:r})})});ye.displayName=L;var je="CollapsibleTrigger",be=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,...i}=o,a=K(je,n);return e.jsx(R.button,{type:"button","aria-controls":a.contentId,"aria-expanded":a.open||!1,"data-state":Y(a.open),"data-disabled":a.disabled?"":void 0,disabled:a.disabled,...i,ref:r,onClick:fe(o.onClick,a.onOpenToggle)})});be.displayName=je;var U="CollapsibleContent",we=m.forwardRef((o,r)=>{const{forceMount:n,...i}=o,a=K(U,o.__scopeCollapsible);return e.jsx(Ge,{present:n||a.open,children:({present:c})=>e.jsx(Qe,{...i,ref:r,present:c})})});we.displayName=U;var Qe=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,present:i,children:a,...c}=o,d=K(U,n),[s,u]=m.useState(i),p=m.useRef(null),C=he(r,p),v=m.useRef(0),T=v.current,b=m.useRef(0),_=b.current,w=d.open||s,k=m.useRef(w),H=m.useRef(void 0);return m.useEffect(()=>{const l=requestAnimationFrame(()=>k.current=!1);return()=>cancelAnimationFrame(l)},[]),$e(()=>{const l=p.current;if(l){H.current=H.current||{transitionDuration:l.style.transitionDuration,animationName:l.style.animationName},l.style.transitionDuration="0s",l.style.animationName="none";const S=l.getBoundingClientRect();v.current=S.height,b.current=S.width,k.current||(l.style.transitionDuration=H.current.transitionDuration,l.style.animationName=H.current.animationName),u(i)}},[d.open,i]),e.jsx(R.div,{"data-state":Y(d.open),"data-disabled":d.disabled?"":void 0,id:d.contentId,hidden:!w,...c,ref:C,style:{"--radix-collapsible-content-height":T?`${T}px`:void 0,"--radix-collapsible-content-width":_?`${_}px`:void 0,...o.style},children:w&&a})});function Y(o){return o?"open":"closed"}var Xe=ye,Ze=be,eo=we,I="Accordion",oo=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[Q,to,no]=We(I),[N]=ve(I,[no,xe]),X=xe(),ke=A.forwardRef((o,r)=>{const{type:n,...i}=o,a=i,c=i;return e.jsx(Q.Provider,{scope:o.__scopeAccordion,children:n==="multiple"?e.jsx(co,{...c,ref:r}):e.jsx(ao,{...a,ref:r})})});ke.displayName=I;var[He,ro]=N(I),[Te,io]=N(I,{collapsible:!1}),ao=A.forwardRef((o,r)=>{const{value:n,defaultValue:i,onValueChange:a=()=>{},collapsible:c=!1,...d}=o,[s,u]=G({prop:n,defaultProp:i??"",onChange:a,caller:I});return e.jsx(He,{scope:o.__scopeAccordion,value:A.useMemo(()=>s?[s]:[],[s]),onItemOpen:u,onItemClose:A.useCallback(()=>c&&u(""),[c,u]),children:e.jsx(Te,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(Se,{...d,ref:r})})})}),co=A.forwardRef((o,r)=>{const{value:n,defaultValue:i,onValueChange:a=()=>{},...c}=o,[d,s]=G({prop:n,defaultProp:i??[],onChange:a,caller:I}),u=A.useCallback(C=>s((v=[])=>[...v,C]),[s]),p=A.useCallback(C=>s((v=[])=>v.filter(T=>T!==C)),[s]);return e.jsx(He,{scope:o.__scopeAccordion,value:d,onItemOpen:u,onItemClose:p,children:e.jsx(Te,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(Se,{...c,ref:r})})})}),[so,q]=N(I),Se=A.forwardRef((o,r)=>{const{__scopeAccordion:n,disabled:i,dir:a,orientation:c="vertical",...d}=o,s=A.useRef(null),u=he(s,r),p=to(n),v=Ke(a)==="ltr",T=fe(o.onKeyDown,b=>{var oe;if(!oo.includes(b.key))return;const _=b.target,w=p().filter(W=>{var te;return!((te=W.ref.current)!=null&&te.disabled)}),k=w.findIndex(W=>W.ref.current===_),H=w.length;if(k===-1)return;b.preventDefault();let l=k;const S=0,M=H-1,V=()=>{l=k+1,l>M&&(l=S)},J=()=>{l=k-1,l<S&&(l=M)};switch(b.key){case"Home":l=S;break;case"End":l=M;break;case"ArrowRight":c==="horizontal"&&(v?V():J());break;case"ArrowDown":c==="vertical"&&V();break;case"ArrowLeft":c==="horizontal"&&(v?J():V());break;case"ArrowUp":c==="vertical"&&J();break}const Oe=l%H;(oe=w[Oe].ref.current)==null||oe.focus()});return e.jsx(so,{scope:n,disabled:i,direction:a,orientation:c,children:e.jsx(Q.Slot,{scope:n,children:e.jsx(R.div,{...d,"data-orientation":c,ref:u,onKeyDown:i?void 0:T})})})}),B="AccordionItem",[lo,Z]=N(B),Re=A.forwardRef((o,r)=>{const{__scopeAccordion:n,value:i,...a}=o,c=q(B,n),d=ro(B,n),s=X(n),u=Ie(),p=i&&d.value.includes(i)||!1,C=c.disabled||o.disabled;return e.jsx(lo,{scope:n,open:p,disabled:C,triggerId:u,children:e.jsx(Xe,{"data-orientation":c.orientation,"data-state":Ne(p),...s,...a,ref:r,disabled:C,open:p,onOpenChange:v=>{v?d.onItemOpen(i):d.onItemClose(i)}})})});Re.displayName=B;var _e="AccordionHeader",De=A.forwardRef((o,r)=>{const{__scopeAccordion:n,...i}=o,a=q(I,n),c=Z(_e,n);return e.jsx(R.h3,{"data-orientation":a.orientation,"data-state":Ne(c.open),"data-disabled":c.disabled?"":void 0,...i,ref:r})});De.displayName=_e;var $="AccordionTrigger",Fe=A.forwardRef((o,r)=>{const{__scopeAccordion:n,...i}=o,a=q(I,n),c=Z($,n),d=io($,n),s=X(n);return e.jsx(Q.ItemSlot,{scope:n,children:e.jsx(Ze,{"aria-disabled":c.open&&!d.collapsible||void 0,"data-orientation":a.orientation,id:c.triggerId,...s,...i,ref:r})})});Fe.displayName=$;var Be="AccordionContent",Le=A.forwardRef((o,r)=>{const{__scopeAccordion:n,...i}=o,a=q(I,n),c=Z(Be,n),d=X(n);return e.jsx(eo,{role:"region","aria-labelledby":c.triggerId,"data-orientation":a.orientation,...d,...i,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});Le.displayName=Be;function Ne(o){return o?"open":"closed"}var mo=ke,uo=Re,po=De,go=Fe,Ao=Le;const ho="_root_vsckf_2",Co="_accordionItem_vsckf_23",vo="_accordionTrigger_vsckf_29",fo="_accordionHeader_vsckf_34",Io="_accordionSlot_vsckf_42",xo="_accordionCaret_vsckf_70",yo="_accordionTriggerContent_vsckf_78",jo="_accordionContent_vsckf_83",bo="_accordionContentText_vsckf_112",x={root:ho,accordionItem:Co,accordionTrigger:vo,accordionHeader:fo,accordionSlot:Io,accordionCaret:xo,accordionTriggerContent:yo,accordionContent:jo,accordionContentText:bo},P=({"data-test-id":o="fondue-accordion",border:r=!0,children:n,defaultValue:i,disabled:a,value:c,padding:d="large",onValueChange:s})=>e.jsx(mo,{className:x.root,"data-test-id":o,defaultValue:i,disabled:a,type:"multiple",value:c,"data-border":r,"data-accordion-padding":d,onValueChange:s,children:n});P.displayName="Accordion.Root";const E=({"data-test-id":o="fondue-accordion-item",children:r,disabled:n,value:i})=>e.jsx(uo,{className:x.accordionItem,value:i,onPointerDown:a=>{a.currentTarget.dataset.showFocusRing="false"},onBlur:a=>{a.currentTarget.dataset.showFocusRing="true"},disabled:n,"data-test-id":o,children:r});E.displayName="Accordion.Item";const z=({"data-test-id":o="fondue-accordion-header",asChild:r,onClick:n,children:i})=>{const{slots:a,triggerContent:c}=m.useMemo(()=>m.Children.toArray(i).reduce((d,s)=>(m.isValidElement(s)&&s.type===qe?d.slots.push(s):d.triggerContent.push(s),d),{slots:[],triggerContent:[]}),[i]);return e.jsxs(po,{asChild:r,className:x.accordionHeader,onClick:n,children:[e.jsxs(go,{className:x.accordionTrigger,"data-test-id":o,children:[e.jsx("div",{className:x.accordionTriggerContent,children:c}),e.jsx(Me,{className:x.accordionCaret,size:"16"})]}),a]})};z.displayName="Accordion.Header";const O=({"data-test-id":o="collapsible-wrap",children:r,divider:n=!1,onClick:i,padding:a})=>e.jsx(Ao,{className:x.accordionContent,onClick:i,"data-test-id":o,"data-item-padding":a,"data-item-divider":n,children:e.jsx("div",{className:x.accordionContentText,"data-test-id":`inner-${o}`,children:r})});O.displayName="Accordion.Content";const ee=({children:o,name:r,"data-test-id":n="fondue-accordion-slot"},i)=>e.jsx("div",{"data-name":r,className:x.accordionSlot,"data-test-id":n,ref:i,children:o});ee.displayName="Accordion.Slot";const qe=m.forwardRef(ee),t={Root:P,Item:E,Header:z,Content:O,Slot:qe};P.__docgenInfo={description:"",methods:[],displayName:"Accordion.Root",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion'",computed:!1}},border:{required:!1,tsType:{name:"boolean"},description:`Show or hide the top and bottom border
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion component. This should contain the `Accordion.Item` components"},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The value of the items whose contents are expanded when the accordion is initially rendered.\nUse `defaultValue` if you do not need to control the state of an accordion."},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether or not an accordion is disabled from user interaction."},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The controlled stateful value of the accordion items whose contents are expanded."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the header.
@default 'large'`,defaultValue:{value:"'large'",computed:!1}},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"value"}],return:{name:"void"}}},description:"Callback function that is called when the value of the accordion changes."}}};E.__docgenInfo={description:"",methods:[],displayName:"Accordion.Item",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-item'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components"},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether or not an accordion item is disabled from user interaction.

@default false`},value:{required:!0,tsType:{name:"string"},description:"A string value for the accordion item. All items within an accordion should use a unique value."}}};z.__docgenInfo={description:"",methods:[],displayName:"Accordion.Header",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-header'",computed:!1}},asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default false`},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for this item."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion header."}}};O.__docgenInfo={description:"",methods:[],displayName:"Accordion.Content",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion content. This contains the main content."},divider:{required:!1,tsType:{name:"boolean"},description:"Adds a divider line between the header and the content.",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for the content."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the content.
@default 'large'`}}};ee.__docgenInfo={description:"",methods:[],displayName:"Accordion.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"literal",value:"'action'"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-slot'",computed:!1}}}};const{action:Pe}=__STORYBOOK_MODULE_ACTIONS__,yt={title:"Components/Accordion",component:P,tags:["autodocs"],subcomponents:{"Accordion.Item":E,"Accordion.Header":z,"Accordion.Content":O},parameters:{status:{type:"released"}},args:{}},Ee=()=>{const[o,r]=m.useState(!0);return e.jsxs(g.Root,{open:o,onOpenChange:r,children:[e.jsx(g.Trigger,{children:e.jsx(D.Input,{"aria-label":"Color Picker",currentColor:{alpha:.8,blue:50,green:100,red:230},onClear:function(){}})}),e.jsxs(g.Content,{maxWidth:"600px",children:[e.jsx(g.Body,{children:e.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:e.jsxs(D.Root,{defaultFormat:"RGBA",currentColor:{alpha:.8,blue:50,green:100,red:230},onColorChange:function(){},children:[e.jsx(D.Values,{}),e.jsx(D.Gradient,{})]})})}),e.jsxs(g.Footer,{children:[e.jsx(f,{emphasis:"default",onPress:function(){},children:"Cancel"}),e.jsx(f,{onPress:function(){},children:"Save"})]})]})]})},ze=()=>{const[o,r]=m.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(f,{onPress:()=>r(!o),children:"Toggle Content"})]})},y={args:{},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(F,{gap:2,align:"center",children:[e.jsx(Ce,{size:"20"}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(f,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(f,{children:"Trigger"})}),e.jsxs(h.Content,{children:[e.jsx(h.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(h.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(h.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(g.Root,{children:[e.jsx(g.Trigger,{children:e.jsx(f,{children:"Trigger"})}),e.jsx(g.Content,{children:e.jsx(g.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(Ee,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Pe("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(ze,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-8",children:[e.jsxs(t.Header,{children:["Item with badge",e.jsx(t.Slot,{children:e.jsxs(F,{gap:2,children:[e.jsx(ne,{children:"42 entries"}),e.jsx(ne,{emphasis:"strong",variant:"highlight",children:"very pretty"})]})}),e.jsx(t.Slot,{name:"action",children:e.jsxs(F,{gap:1,children:[e.jsx(f,{size:"small",emphasis:"weak",aspect:"square",children:e.jsx(Ve,{size:16})}),e.jsx(f,{size:"small",emphasis:"weak",aspect:"square",children:e.jsx(Je,{size:16})})]})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})},j={args:{padding:"small"},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(F,{gap:2,align:"center",children:[e.jsx(Ce,{size:"20"}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(f,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(f,{children:"Trigger"})}),e.jsxs(h.Content,{children:[e.jsx(h.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(h.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(h.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(g.Root,{children:[e.jsx(g.Trigger,{children:e.jsx(f,{children:"Trigger"})}),e.jsx(g.Content,{children:e.jsx(g.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(Ee,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Pe("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(ze,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})};var re,ie,ae;y.parameters={...y.parameters,docs:{...(re=y.parameters)==null?void 0:re.docs,source:{code:`const Default = () => {
  return (
    <Accordion.Root>
      <Accordion.Item value="accordion-test-0">
        <Accordion.Header>
          <Flex gap={2} align="center">
            <IconIcon size="20" />
            Item with icon
          </Flex>
        </Accordion.Header>
        <Accordion.Content divider>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-1">
        <Accordion.Header>
          With action slot
          <Accordion.Slot name="action">
            <Button size="small" emphasis="default">
              Click Me
            </Button>
          </Accordion.Slot>
        </Accordion.Header>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-2">
        <Accordion.Header>Item with dropdown child</Accordion.Header>
        <Accordion.Content>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
              <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
              <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-3">
        <Accordion.Header>Item with flyout child</Accordion.Header>
        <Accordion.Content>
          <Flyout.Root>
            <Flyout.Trigger>
              <Button>Trigger</Button>
            </Flyout.Trigger>
            <Flyout.Content>
              <Flyout.Body>Hello!</Flyout.Body>
            </Flyout.Content>
          </Flyout.Root>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-4">
        <Accordion.Header>Item with color picker flyout</Accordion.Header>
        <Accordion.Content>
          <ColorFlyOut />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-5">
        <Accordion.Header onClick={() => action("click")}>
          Empty item with an onClick callback
        </Accordion.Header>
        <Accordion.Content />
      </Accordion.Item>
      <Accordion.Item value="accordion-test-6">
        <Accordion.Header>Item with resizable content</Accordion.Header>
        <Accordion.Content>
          <ResizableContent />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-7">
        <Accordion.Header>Item without padding</Accordion.Header>
        <Accordion.Content padding="none">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-8">
        <Accordion.Header>
          Item with badge
          <Accordion.Slot>
            <Flex gap={2}>
              <Badge>42 entries</Badge>
              <Badge emphasis="strong" variant="highlight">
                very pretty
              </Badge>
            </Flex>
          </Accordion.Slot>
          <Accordion.Slot name="action">
            <Flex gap={1}>
              <Button size="small" emphasis="weak" aspect="square">
                <IconPen size={16} />
              </Button>
              <Button size="small" emphasis="weak" aspect="square">
                <IconTrashBin size={16} />
              </Button>
            </Flex>
          </Accordion.Slot>
        </Accordion.Header>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
`,...(ae=(ie=y.parameters)==null?void 0:ie.docs)==null?void 0:ae.source}}};var ce,de,se;j.parameters={...j.parameters,docs:{...(ce=j.parameters)==null?void 0:ce.docs,source:{code:`const WithSmallPadding = () => {
  return (
    <Accordion.Root padding="small">
      <Accordion.Item value="accordion-test-0">
        <Accordion.Header>
          <Flex gap={2} align="center">
            <IconIcon size="20" />
            Item with icon
          </Flex>
        </Accordion.Header>
        <Accordion.Content divider>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-1">
        <Accordion.Header>
          With action slot
          <Accordion.Slot name="action">
            <Button size="small" emphasis="default">
              Click Me
            </Button>
          </Accordion.Slot>
        </Accordion.Header>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-2">
        <Accordion.Header>Item with dropdown child</Accordion.Header>
        <Accordion.Content>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button>Trigger</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
              <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
              <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-3">
        <Accordion.Header>Item with flyout child</Accordion.Header>
        <Accordion.Content>
          <Flyout.Root>
            <Flyout.Trigger>
              <Button>Trigger</Button>
            </Flyout.Trigger>
            <Flyout.Content>
              <Flyout.Body>Hello!</Flyout.Body>
            </Flyout.Content>
          </Flyout.Root>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-4">
        <Accordion.Header>Item with color picker flyout</Accordion.Header>
        <Accordion.Content>
          <ColorFlyOut />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-5">
        <Accordion.Header onClick={() => action("click")}>
          Empty item with an onClick callback
        </Accordion.Header>
        <Accordion.Content />
      </Accordion.Item>
      <Accordion.Item value="accordion-test-6">
        <Accordion.Header>Item with resizable content</Accordion.Header>
        <Accordion.Content>
          <ResizableContent />
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-test-7">
        <Accordion.Header>Item without padding</Accordion.Header>
        <Accordion.Content padding="none">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
`,...(se=(de=j.parameters)==null?void 0:de.docs)==null?void 0:se.source}}};var le,me,ue;y.parameters={...y.parameters,docs:{...(le=y.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {},
  render: args => {
    return <Accordion.Root {...args}>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Flex gap={2} align="center">
                            <IconIcon size="20" />
                            Item with icon
                        </Flex>
                    </Accordion.Header>
                    <Accordion.Content divider>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-1">
                    <Accordion.Header>
                        With action slot
                        <Accordion.Slot name="action">
                            <Button size="small" emphasis="default">
                                Click Me
                            </Button>
                        </Accordion.Slot>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-2">
                    <Accordion.Header>Item with dropdown child</Accordion.Header>
                    <Accordion.Content>
                        <Dropdown.Root>
                            <Dropdown.Trigger>
                                <Button>Trigger</Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
                            </Dropdown.Content>
                        </Dropdown.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-3">
                    <Accordion.Header>Item with flyout child</Accordion.Header>
                    <Accordion.Content>
                        <Flyout.Root>
                            <Flyout.Trigger>
                                <Button>Trigger</Button>
                            </Flyout.Trigger>
                            <Flyout.Content>
                                <Flyout.Body>Hello!</Flyout.Body>
                            </Flyout.Content>
                        </Flyout.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-4">
                    <Accordion.Header>Item with color picker flyout</Accordion.Header>
                    <Accordion.Content>
                        <ColorFlyOut />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-5">
                    <Accordion.Header onClick={() => action('click')}>
                        Empty item with an onClick callback
                    </Accordion.Header>
                    <Accordion.Content />
                </Accordion.Item>

                <Accordion.Item value="accordion-test-6">
                    <Accordion.Header>Item with resizable content</Accordion.Header>
                    <Accordion.Content>
                        <ResizableContent />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-7">
                    <Accordion.Header>Item without padding</Accordion.Header>
                    <Accordion.Content padding="none">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-8">
                    <Accordion.Header>
                        Item with badge
                        <Accordion.Slot>
                            <Flex gap={2}>
                                <Badge>42 entries</Badge>
                                <Badge emphasis="strong" variant="highlight">
                                    very pretty
                                </Badge>
                            </Flex>
                        </Accordion.Slot>
                        <Accordion.Slot name="action">
                            <Flex gap={1}>
                                <Button size="small" emphasis="weak" aspect="square">
                                    <IconPen size={16} />
                                </Button>
                                <Button size="small" emphasis="weak" aspect="square">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Accordion.Slot>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>;
  }
}`,...(ue=(me=y.parameters)==null?void 0:me.docs)==null?void 0:ue.source}}};var pe,ge,Ae;j.parameters={...j.parameters,docs:{...(pe=j.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  args: {
    padding: 'small'
  },
  render: args => {
    return <Accordion.Root {...args}>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Flex gap={2} align="center">
                            <IconIcon size="20" />
                            Item with icon
                        </Flex>
                    </Accordion.Header>
                    <Accordion.Content divider>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-1">
                    <Accordion.Header>
                        With action slot
                        <Accordion.Slot name="action">
                            <Button size="small" emphasis="default">
                                Click Me
                            </Button>
                        </Accordion.Slot>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-2">
                    <Accordion.Header>Item with dropdown child</Accordion.Header>
                    <Accordion.Content>
                        <Dropdown.Root>
                            <Dropdown.Trigger>
                                <Button>Trigger</Button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Item onSelect={function Js() {}}>Item 1</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 2</Dropdown.Item>
                                <Dropdown.Item onSelect={function Js() {}}>Item 3</Dropdown.Item>
                            </Dropdown.Content>
                        </Dropdown.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-3">
                    <Accordion.Header>Item with flyout child</Accordion.Header>
                    <Accordion.Content>
                        <Flyout.Root>
                            <Flyout.Trigger>
                                <Button>Trigger</Button>
                            </Flyout.Trigger>
                            <Flyout.Content>
                                <Flyout.Body>Hello!</Flyout.Body>
                            </Flyout.Content>
                        </Flyout.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-4">
                    <Accordion.Header>Item with color picker flyout</Accordion.Header>
                    <Accordion.Content>
                        <ColorFlyOut />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-5">
                    <Accordion.Header onClick={() => action('click')}>
                        Empty item with an onClick callback
                    </Accordion.Header>
                    <Accordion.Content />
                </Accordion.Item>

                <Accordion.Item value="accordion-test-6">
                    <Accordion.Header>Item with resizable content</Accordion.Header>
                    <Accordion.Content>
                        <ResizableContent />
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-7">
                    <Accordion.Header>Item without padding</Accordion.Header>
                    <Accordion.Content padding="none">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>;
  }
}`,...(Ae=(ge=j.parameters)==null?void 0:ge.docs)==null?void 0:Ae.source}}};const jt=["Default","WithSmallPadding"];export{y as Default,j as WithSmallPadding,jt as __namedExportsOrder,yt as default};
