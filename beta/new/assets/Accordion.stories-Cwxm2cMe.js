import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as m,R as g}from"./index-ClcD9ViR.js";import{u as Ee,c as de}from"./fondue-icons351-C23tm6Bo.js";import{a as se}from"./index-B-lxVbXh.js";/* empty css               */import{c as le}from"./index-CWz5EflU.js";import{c as qe}from"./index-BGR1G_Sj.js";import{P as H,u as me}from"./index-CBtKeiPJ.js";import{c as ue,u as Fe}from"./index-DulyF36n.js";import{u as W}from"./index-BZQsQlpo.js";import{P as Le}from"./index-Bs6rH-UG.js";import{u as pe}from"./index-CIy7yXJr.js";import{u as Me}from"./index-CZKF78Oq.js";import"./Badge-DnbZAK0g.js";import"./Box-9IBoxxbD.js";import{B as I}from"./Button-CGg8-Lq8.js";import"./Checkbox-ClsU0ets.js";import{c as k}from"./ColorPicker-BcQqZaof.js";import"./Dialog-DreHJ3-V.js";import"./Divider-DlfPNyii.js";import{h as f}from"./Dropdown-DOWjh9BP.js";import{F as he}from"./Flex-CjzBXb8-.js";import{F as h}from"./Flyout-qMhqSP_B.js";import"./Grid-CTGKcXvc.js";import"./Heading-D3MJ0Ueq.js";import"./Label-B9CXg2P0.js";import"./LoadingBar-D-vfqhFh.js";import"./LoadingCircle-C0VoU-pr.js";import"./ScrollArea-B3fZyJ9e.js";import"./Section-BUxCrVEw.js";import"./SegmentedControl-CtFMNJgW.js";import"./Select-7wYmFdsn.js";import"./Slider-DaKPomo9.js";import"./Switch-DJ7sVYCq.js";import"./Table-B0Fhh8vL.js";import"./Tabs-DH_IcwzN.js";import"./Text-NaGTlxFC.js";import"./TextInput-Cs8OLhxm.js";import"./Textarea-CB4ukPe9.js";import"./ThemeProvider-DcTs8Rid.js";import"./Tooltip-C2QhV86n.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./index-BUMxx5F6.js";import"./index-kkVLZR_L.js";import"./propsToCssVariables-DuhnUZvM.js";import"./styleUtilities-DuypqGtU.js";import"./index-EJIvojdF.js";import"./focusStyle-IgMhxCMT.js";import"./index-njbIkLCy.js";import"./index-sY83p_TZ.js";import"./index-BdDBj5DZ.js";import"./index-d1aIWhAn.js";import"./component-DLDfifq7.js";import"./index-_NeKjYbh.js";import"./useSyncRefs-DL7P6UVA.js";import"./domUtilities-DGDVwu3_.js";import"./index-usydoS_W.js";import"./index-C-T_dsxJ.js";import"./index-h-DwvohY.js";import"./index-b08ZXYV2.js";import"./index-DnYNFiHl.js";import"./index-1nMC8E2R.js";import"./index-BdQq_4o_.js";import"./index-801zCodQ.js";import"./useControllableState-D84sIWhr.js";import"./downshift.esm-CTRHEG6P.js";import"./index-DsVqspfc.js";import"./index-D2b4USwH.js";import"./index-DQrvFS0J.js";import"./index-Dep3Wf5h.js";var P="Collapsible",[Be,ge]=le(P),[Oe,G]=Be(P),fe=m.forwardRef((o,n)=>{const{__scopeCollapsible:r,open:i,defaultOpen:a,disabled:c,onOpenChange:d,...s}=o,[u,p]=W({prop:i,defaultProp:a??!1,onChange:d,caller:P});return e.jsx(Oe,{scope:r,disabled:c,contentId:pe(),open:u,onOpenToggle:m.useCallback(()=>p(A=>!A),[p]),children:e.jsx(H.div,{"data-state":U(u),"data-disabled":c?"":void 0,...s,ref:n})})});fe.displayName=P;var Ae="CollapsibleTrigger",Ce=m.forwardRef((o,n)=>{const{__scopeCollapsible:r,...i}=o,a=G(Ae,r);return e.jsx(H.button,{type:"button","aria-controls":a.contentId,"aria-expanded":a.open||!1,"data-state":U(a.open),"data-disabled":a.disabled?"":void 0,disabled:a.disabled,...i,ref:n,onClick:ue(o.onClick,a.onOpenToggle)})});Ce.displayName=Ae;var K="CollapsibleContent",xe=m.forwardRef((o,n)=>{const{forceMount:r,...i}=o,a=G(K,o.__scopeCollapsible);return e.jsx(Le,{present:r||a.open,children:({present:c})=>e.jsx(ze,{...i,ref:n,present:c})})});xe.displayName=K;var ze=m.forwardRef((o,n)=>{const{__scopeCollapsible:r,present:i,children:a,...c}=o,d=G(K,r),[s,u]=m.useState(i),p=m.useRef(null),A=me(n,p),C=m.useRef(0),T=C.current,j=m.useRef(0),_=j.current,y=d.open||s,b=m.useRef(y),w=m.useRef(void 0);return m.useEffect(()=>{const l=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(l)},[]),Fe(()=>{const l=p.current;if(l){w.current=w.current||{transitionDuration:l.style.transitionDuration,animationName:l.style.animationName},l.style.transitionDuration="0s",l.style.animationName="none";const R=l.getBoundingClientRect();C.current=R.height,j.current=R.width,b.current||(l.style.transitionDuration=w.current.transitionDuration,l.style.animationName=w.current.animationName),u(i)}},[d.open,i]),e.jsx(H.div,{"data-state":U(d.open),"data-disabled":d.disabled?"":void 0,id:d.contentId,hidden:!y,...c,ref:A,style:{"--radix-collapsible-content-height":T?`${T}px`:void 0,"--radix-collapsible-content-width":_?`${_}px`:void 0,...o.style},children:y&&a})});function U(o){return o?"open":"closed"}var Ve=fe,Je=Ce,$e=xe,x="Accordion",We=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[Y,Ge,Ke]=qe(x),[E,Dt]=le(x,[Ke,ge]),Q=ge(),ve=g.forwardRef((o,n)=>{const{type:r,...i}=o,a=i,c=i;return e.jsx(Y.Provider,{scope:o.__scopeAccordion,children:r==="multiple"?e.jsx(Xe,{...c,ref:n}):e.jsx(Qe,{...a,ref:n})})});ve.displayName=x;var[Ie,Ue]=E(x),[je,Ye]=E(x,{collapsible:!1}),Qe=g.forwardRef((o,n)=>{const{value:r,defaultValue:i,onValueChange:a=()=>{},collapsible:c=!1,...d}=o,[s,u]=W({prop:r,defaultProp:i??"",onChange:a,caller:x});return e.jsx(Ie,{scope:o.__scopeAccordion,value:g.useMemo(()=>s?[s]:[],[s]),onItemOpen:u,onItemClose:g.useCallback(()=>c&&u(""),[c,u]),children:e.jsx(je,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(ye,{...d,ref:n})})})}),Xe=g.forwardRef((o,n)=>{const{value:r,defaultValue:i,onValueChange:a=()=>{},...c}=o,[d,s]=W({prop:r,defaultProp:i??[],onChange:a,caller:x}),u=g.useCallback(A=>s((C=[])=>[...C,A]),[s]),p=g.useCallback(A=>s((C=[])=>C.filter(T=>T!==A)),[s]);return e.jsx(Ie,{scope:o.__scopeAccordion,value:d,onItemOpen:u,onItemClose:p,children:e.jsx(je,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(ye,{...c,ref:n})})})}),[Ze,q]=E(x),ye=g.forwardRef((o,n)=>{const{__scopeAccordion:r,disabled:i,dir:a,orientation:c="vertical",...d}=o,s=g.useRef(null),u=me(s,n),p=Ge(r),C=Me(a)==="ltr",T=ue(o.onKeyDown,j=>{var ee;if(!We.includes(j.key))return;const _=j.target,y=p().filter(J=>{var oe;return!((oe=J.ref.current)!=null&&oe.disabled)}),b=y.findIndex(J=>J.ref.current===_),w=y.length;if(b===-1)return;j.preventDefault();let l=b;const R=0,O=w-1,z=()=>{l=b+1,l>O&&(l=R)},V=()=>{l=b-1,l<R&&(l=O)};switch(j.key){case"Home":l=R;break;case"End":l=O;break;case"ArrowRight":c==="horizontal"&&(C?z():V());break;case"ArrowDown":c==="vertical"&&z();break;case"ArrowLeft":c==="horizontal"&&(C?V():z());break;case"ArrowUp":c==="vertical"&&V();break}const Pe=l%w;(ee=y[Pe].ref.current)==null||ee.focus()});return e.jsx(Ze,{scope:r,disabled:i,direction:a,orientation:c,children:e.jsx(Y.Slot,{scope:r,children:e.jsx(H.div,{...d,"data-orientation":c,ref:u,onKeyDown:i?void 0:T})})})}),D="AccordionItem",[eo,X]=E(D),be=g.forwardRef((o,n)=>{const{__scopeAccordion:r,value:i,...a}=o,c=q(D,r),d=Ue(D,r),s=Q(r),u=pe(),p=i&&d.value.includes(i)||!1,A=c.disabled||o.disabled;return e.jsx(eo,{scope:r,open:p,disabled:A,triggerId:u,children:e.jsx(Ve,{"data-orientation":c.orientation,"data-state":ke(p),...s,...a,ref:n,disabled:A,open:p,onOpenChange:C=>{C?d.onItemOpen(i):d.onItemClose(i)}})})});be.displayName=D;var we="AccordionHeader",Te=g.forwardRef((o,n)=>{const{__scopeAccordion:r,...i}=o,a=q(x,r),c=X(we,r);return e.jsx(H.h3,{"data-orientation":a.orientation,"data-state":ke(c.open),"data-disabled":c.disabled?"":void 0,...i,ref:n})});Te.displayName=we;var $="AccordionTrigger",Re=g.forwardRef((o,n)=>{const{__scopeAccordion:r,...i}=o,a=q(x,r),c=X($,r),d=Ye($,r),s=Q(r);return e.jsx(Y.ItemSlot,{scope:r,children:e.jsx(Je,{"aria-disabled":c.open&&!d.collapsible||void 0,"data-orientation":a.orientation,id:c.triggerId,...s,...i,ref:n})})});Re.displayName=$;var He="AccordionContent",_e=g.forwardRef((o,n)=>{const{__scopeAccordion:r,...i}=o,a=q(x,r),c=X(He,r),d=Q(r);return e.jsx($e,{role:"region","aria-labelledby":c.triggerId,"data-orientation":a.orientation,...d,...i,ref:n,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});_e.displayName=He;function ke(o){return o?"open":"closed"}var oo=ve,to=be,ro=Te,no=Re,io=_e;const ao="_root_1g3zr_2",co="_accordionItem_1g3zr_23",so="_accordionTrigger_1g3zr_29",lo="_accordionHeader_1g3zr_34",mo="_accordionSlot_1g3zr_41",uo="_accordionCaret_1g3zr_67",po="_accordionTriggerContent_1g3zr_75",ho="_accordionContent_1g3zr_80",go="_accordionContentText_1g3zr_109",v={root:ao,accordionItem:co,accordionTrigger:so,accordionHeader:lo,accordionSlot:mo,accordionCaret:uo,accordionTriggerContent:po,accordionContent:ho,accordionContentText:go},F=({"data-test-id":o="fondue-accordion",border:n=!0,children:r,defaultValue:i,disabled:a,value:c,padding:d="large"})=>e.jsx(oo,{className:v.root,"data-test-id":o,defaultValue:i,disabled:a,type:"multiple",value:c,"data-border":n,"data-accordion-padding":d,children:r});F.displayName="Accordion.Root";const L=({"data-test-id":o="fondue-accordion-item",children:n,disabled:r,value:i})=>e.jsx(to,{className:v.accordionItem,value:i,onPointerDown:a=>{a.currentTarget.dataset.showFocusRing="false"},onBlur:a=>{a.currentTarget.dataset.showFocusRing="true"},disabled:r,"data-test-id":o,children:n});L.displayName="Accordion.Item";const M=({"data-test-id":o="fondue-accordion-header",asChild:n,onClick:r,children:i})=>{const{slots:a,triggerContent:c}=m.useMemo(()=>m.Children.toArray(i).reduce((d,s)=>(m.isValidElement(s)&&s.type===Se?d.slots.push(s):d.triggerContent.push(s),d),{slots:[],triggerContent:[]}),[i]);return e.jsxs(ro,{asChild:n,className:v.accordionHeader,onClick:r,children:[e.jsxs(no,{className:v.accordionTrigger,"data-test-id":o,children:[e.jsx("div",{className:v.accordionTriggerContent,children:c}),e.jsx(Ee,{className:v.accordionCaret,size:"16"})]}),a]})};M.displayName="Accordion.Header";const B=({"data-test-id":o="collapsible-wrap",children:n,divider:r=!1,onClick:i,padding:a="large"})=>e.jsx(io,{className:v.accordionContent,onClick:i,"data-test-id":o,"data-item-padding":a,"data-item-divider":r,children:e.jsx("div",{className:v.accordionContentText,"data-test-id":`inner-${o}`,children:n})});B.displayName="Accordion.Content";const Z=({children:o,name:n,"data-test-id":r="fondue-accordion-slot"},i)=>e.jsx("div",{"data-name":n,className:v.accordionSlot,"data-test-id":r,ref:i,children:o});Z.displayName="Accordion.Slot";const Se=m.forwardRef(Z),t={Root:F,Item:L,Header:M,Content:B,Slot:Se};F.__docgenInfo={description:"",methods:[],displayName:"Accordion.Root",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion'",computed:!1}},border:{required:!1,tsType:{name:"boolean"},description:`Show or hide the top and bottom border
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion component. This should contain the `Accordion.Item` components"},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The value of the items whose contents are expanded when the accordion is initially rendered.\nUse `defaultValue` if you do not need to control the state of an accordion."},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether or not an accordion is disabled from user interaction."},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The controlled stateful value of the accordion items whose contents are expanded."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the header.
@default 'large'`,defaultValue:{value:"'large'",computed:!1}}}};L.__docgenInfo={description:"",methods:[],displayName:"Accordion.Item",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-item'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components"},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether or not an accordion item is disabled from user interaction.

@default false`},value:{required:!0,tsType:{name:"string"},description:"A string value for the accordion item. All items within an accordion should use a unique value."}}};M.__docgenInfo={description:"",methods:[],displayName:"Accordion.Header",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-header'",computed:!1}},asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default false`},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for this item."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion header."}}};B.__docgenInfo={description:"",methods:[],displayName:"Accordion.Content",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion content. This contains the main content."},divider:{required:!1,tsType:{name:"boolean"},description:"Adds a divider line between the header and the content.",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for the content."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the content.
@default 'large'`,defaultValue:{value:"'large'",computed:!1}}}};Z.__docgenInfo={description:"",methods:[],displayName:"Accordion.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"literal",value:"'action'"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-slot'",computed:!1}}}};const Pt={title:"Components/Accordion",component:F,tags:["autodocs"],subcomponents:{"Accordion.Item":L,"Accordion.Header":M,"Accordion.Content":B},parameters:{status:{type:"released"}},args:{}},Ne=()=>{const[o,n]=m.useState(!0);return e.jsxs(h.Root,{open:o,onOpenChange:n,children:[e.jsx(h.Trigger,{children:e.jsx(k.Input,{"aria-label":"Color Picker",currentColor:{alpha:.8,blue:50,green:100,red:230},onClear:function(){}})}),e.jsxs(h.Content,{maxWidth:"600px",children:[e.jsx(h.Body,{children:e.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:e.jsxs(k.Root,{defaultFormat:"RGBA",currentColor:{alpha:.8,blue:50,green:100,red:230},onColorChange:function(){},children:[e.jsx(k.Values,{}),e.jsx(k.Gradient,{})]})})}),e.jsxs(h.Footer,{children:[e.jsx(I,{emphasis:"default",onPress:function(){},children:"Cancel"}),e.jsx(I,{onPress:function(){},children:"Save"})]})]})]})},De=()=>{const[o,n]=m.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(I,{onPress:()=>n(!o),children:"Toggle Content"})]})},S={args:{},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(he,{gap:2,align:"center",children:[e.jsx(de,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(I,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(Ne,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>se("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})},N={args:{padding:"small"},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(he,{gap:2,align:"center",children:[e.jsx(de,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(I,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(Ne,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>se("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})};var te,re,ne;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {},
  render: args => {
    return <Accordion.Root {...args}>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Flex gap={2} align="center">
                            <IconIcon />
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
}`,...(ne=(re=S.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var ie,ae,ce;N.parameters={...N.parameters,docs:{...(ie=N.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    padding: 'small'
  },
  render: args => {
    return <Accordion.Root {...args}>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Flex gap={2} align="center">
                            <IconIcon />
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
}`,...(ce=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:ce.source}}};const Et=["Default","WithSmallPadding"];export{S as Default,N as WithSmallPadding,Et as __namedExportsOrder,Pt as default};
