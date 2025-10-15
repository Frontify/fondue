import{r as m,j as e,u as de,e as g,F as se}from"./iframe-DY1zO7eg.js";import{u as Ee,c as le}from"./fondue-icons352-yjYoMb5C.js";import{c as me}from"./index-C-HqetDk.js";import{c as qe}from"./index-Bq-cfJsi.js";import{c as ue,u as Le}from"./index-CVlZVU6L.js";import{u as W}from"./index-BnB8fM1m.js";import{P as k}from"./index-HglF0vak.js";import{P as Fe}from"./index-e6oU1IGi.js";import{u as pe}from"./index-p2I38qBo.js";import{u as Oe}from"./index-DQgullbg.js";import"./Badge-Dd2hS9Zd.js";import"./Box-BgIIWmoT.js";import{B as I}from"./Button-DJdfaKcG.js";import"./Checkbox-BvWD2Ae4.js";import{c as R}from"./ColorPicker-CU2YyBKC.js";import"./Dialog-DY4XkUbB.js";import"./Divider-ZAtY_emw.js";import{h as f}from"./Dropdown-597H5JiZ.js";import{F as h}from"./Flyout-02cGraBG.js";import"./Grid-B7SLDMDH.js";import"./Heading-DpIXSvNy.js";import"./Label-DG08-EMw.js";import"./LoadingBar-CF2Ghypk.js";import"./LoadingCircle-CqD8G_ir.js";import"./ScrollArea-CuCScoqf.js";import"./Section-JhqhSgXL.js";import"./SegmentedControl-vES7jnRe.js";import"./Select-OF2Kk7Ox.js";import"./Slider-Cg2ric0v.js";import"./Switch-Mjpm2mAF.js";import"./Table-CTm4Ln4x.js";import"./Tag-Dtu4E_Wr.js";import"./Tabs-DlvvVEof.js";import"./Text-DtgYaXd2.js";import"./TextInput-Db4G6_5U.js";import"./Textarea-BAo5KX4g.js";import"./Tooltip-AZqeYKOm.js";import"./preload-helper-C1FmrZbK.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-BgYdPY6m.js";import"./component-WJr2SkrP.js";import"./index-DSCnimF_.js";import"./useSyncRefs-qdd_gb5D.js";import"./domUtilities-DGDVwu3_.js";import"./index-LZdAgY7O.js";import"./index-BdQq_4o_.js";import"./useControllableState-Gtdxkd5k.js";var P="Collapsible",[Me,he]=me(P),[Be,G]=Me(P),ge=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,open:i,defaultOpen:a,disabled:c,onOpenChange:d,...s}=o,[u,p]=W({prop:i,defaultProp:a??!1,onChange:d,caller:P});return e.jsx(Be,{scope:n,disabled:c,contentId:pe(),open:u,onOpenToggle:m.useCallback(()=>p(A=>!A),[p]),children:e.jsx(k.div,{"data-state":U(u),"data-disabled":c?"":void 0,...s,ref:r})})});ge.displayName=P;var fe="CollapsibleTrigger",Ae=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,...i}=o,a=G(fe,n);return e.jsx(k.button,{type:"button","aria-controls":a.contentId,"aria-expanded":a.open||!1,"data-state":U(a.open),"data-disabled":a.disabled?"":void 0,disabled:a.disabled,...i,ref:r,onClick:ue(o.onClick,a.onOpenToggle)})});Ae.displayName=fe;var K="CollapsibleContent",Ce=m.forwardRef((o,r)=>{const{forceMount:n,...i}=o,a=G(K,o.__scopeCollapsible);return e.jsx(Fe,{present:n||a.open,children:({present:c})=>e.jsx(Ve,{...i,ref:r,present:c})})});Ce.displayName=K;var Ve=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,present:i,children:a,...c}=o,d=G(K,n),[s,u]=m.useState(i),p=m.useRef(null),A=de(r,p),C=m.useRef(0),T=C.current,j=m.useRef(0),H=j.current,y=d.open||s,b=m.useRef(y),w=m.useRef(void 0);return m.useEffect(()=>{const l=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(l)},[]),Le(()=>{const l=p.current;if(l){w.current=w.current||{transitionDuration:l.style.transitionDuration,animationName:l.style.animationName},l.style.transitionDuration="0s",l.style.animationName="none";const _=l.getBoundingClientRect();C.current=_.height,j.current=_.width,b.current||(l.style.transitionDuration=w.current.transitionDuration,l.style.animationName=w.current.animationName),u(i)}},[d.open,i]),e.jsx(k.div,{"data-state":U(d.open),"data-disabled":d.disabled?"":void 0,id:d.contentId,hidden:!y,...c,ref:A,style:{"--radix-collapsible-content-height":T?`${T}px`:void 0,"--radix-collapsible-content-width":H?`${H}px`:void 0,...o.style},children:y&&a})});function U(o){return o?"open":"closed"}var ze=ge,Je=Ae,$e=Ce,v="Accordion",We=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[Y,Ge,Ke]=qe(v),[E]=me(v,[Ke,he]),Q=he(),ve=g.forwardRef((o,r)=>{const{type:n,...i}=o,a=i,c=i;return e.jsx(Y.Provider,{scope:o.__scopeAccordion,children:n==="multiple"?e.jsx(Xe,{...c,ref:r}):e.jsx(Qe,{...a,ref:r})})});ve.displayName=v;var[xe,Ue]=E(v),[Ie,Ye]=E(v,{collapsible:!1}),Qe=g.forwardRef((o,r)=>{const{value:n,defaultValue:i,onValueChange:a=()=>{},collapsible:c=!1,...d}=o,[s,u]=W({prop:n,defaultProp:i??"",onChange:a,caller:v});return e.jsx(xe,{scope:o.__scopeAccordion,value:g.useMemo(()=>s?[s]:[],[s]),onItemOpen:u,onItemClose:g.useCallback(()=>c&&u(""),[c,u]),children:e.jsx(Ie,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(je,{...d,ref:r})})})}),Xe=g.forwardRef((o,r)=>{const{value:n,defaultValue:i,onValueChange:a=()=>{},...c}=o,[d,s]=W({prop:n,defaultProp:i??[],onChange:a,caller:v}),u=g.useCallback(A=>s((C=[])=>[...C,A]),[s]),p=g.useCallback(A=>s((C=[])=>C.filter(T=>T!==A)),[s]);return e.jsx(xe,{scope:o.__scopeAccordion,value:d,onItemOpen:u,onItemClose:p,children:e.jsx(Ie,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(je,{...c,ref:r})})})}),[Ze,q]=E(v),je=g.forwardRef((o,r)=>{const{__scopeAccordion:n,disabled:i,dir:a,orientation:c="vertical",...d}=o,s=g.useRef(null),u=de(s,r),p=Ge(n),C=Oe(a)==="ltr",T=ue(o.onKeyDown,j=>{var ee;if(!We.includes(j.key))return;const H=j.target,y=p().filter(J=>{var oe;return!((oe=J.ref.current)!=null&&oe.disabled)}),b=y.findIndex(J=>J.ref.current===H),w=y.length;if(b===-1)return;j.preventDefault();let l=b;const _=0,B=w-1,V=()=>{l=b+1,l>B&&(l=_)},z=()=>{l=b-1,l<_&&(l=B)};switch(j.key){case"Home":l=_;break;case"End":l=B;break;case"ArrowRight":c==="horizontal"&&(C?V():z());break;case"ArrowDown":c==="vertical"&&V();break;case"ArrowLeft":c==="horizontal"&&(C?z():V());break;case"ArrowUp":c==="vertical"&&z();break}const Pe=l%w;(ee=y[Pe].ref.current)==null||ee.focus()});return e.jsx(Ze,{scope:n,disabled:i,direction:a,orientation:c,children:e.jsx(Y.Slot,{scope:n,children:e.jsx(k.div,{...d,"data-orientation":c,ref:u,onKeyDown:i?void 0:T})})})}),D="AccordionItem",[eo,X]=E(D),ye=g.forwardRef((o,r)=>{const{__scopeAccordion:n,value:i,...a}=o,c=q(D,n),d=Ue(D,n),s=Q(n),u=pe(),p=i&&d.value.includes(i)||!1,A=c.disabled||o.disabled;return e.jsx(eo,{scope:n,open:p,disabled:A,triggerId:u,children:e.jsx(ze,{"data-orientation":c.orientation,"data-state":He(p),...s,...a,ref:r,disabled:A,open:p,onOpenChange:C=>{C?d.onItemOpen(i):d.onItemClose(i)}})})});ye.displayName=D;var be="AccordionHeader",we=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...i}=o,a=q(v,n),c=X(be,n);return e.jsx(k.h3,{"data-orientation":a.orientation,"data-state":He(c.open),"data-disabled":c.disabled?"":void 0,...i,ref:r})});we.displayName=be;var $="AccordionTrigger",Te=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...i}=o,a=q(v,n),c=X($,n),d=Ye($,n),s=Q(n);return e.jsx(Y.ItemSlot,{scope:n,children:e.jsx(Je,{"aria-disabled":c.open&&!d.collapsible||void 0,"data-orientation":a.orientation,id:c.triggerId,...s,...i,ref:r})})});Te.displayName=$;var _e="AccordionContent",ke=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...i}=o,a=q(v,n),c=X(_e,n),d=Q(n);return e.jsx($e,{role:"region","aria-labelledby":c.triggerId,"data-orientation":a.orientation,...d,...i,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});ke.displayName=_e;function He(o){return o?"open":"closed"}var oo=ve,to=ye,no=we,ro=Te,io=ke;const ao="_root_eybkh_2",co="_accordionItem_eybkh_23",so="_accordionTrigger_eybkh_29",lo="_accordionHeader_eybkh_34",mo="_accordionSlot_eybkh_41",uo="_accordionCaret_eybkh_66",po="_accordionTriggerContent_eybkh_74",ho="_accordionContent_eybkh_79",go="_accordionContentText_eybkh_108",x={root:ao,accordionItem:co,accordionTrigger:so,accordionHeader:lo,accordionSlot:mo,accordionCaret:uo,accordionTriggerContent:po,accordionContent:ho,accordionContentText:go},L=({"data-test-id":o="fondue-accordion",border:r=!0,children:n,defaultValue:i,disabled:a,value:c,padding:d="large",onValueChange:s})=>e.jsx(oo,{className:x.root,"data-test-id":o,defaultValue:i,disabled:a,type:"multiple",value:c,"data-border":r,"data-accordion-padding":d,onValueChange:s,children:n});L.displayName="Accordion.Root";const F=({"data-test-id":o="fondue-accordion-item",children:r,disabled:n,value:i})=>e.jsx(to,{className:x.accordionItem,value:i,onPointerDown:a=>{a.currentTarget.dataset.showFocusRing="false"},onBlur:a=>{a.currentTarget.dataset.showFocusRing="true"},disabled:n,"data-test-id":o,children:r});F.displayName="Accordion.Item";const O=({"data-test-id":o="fondue-accordion-header",asChild:r,onClick:n,children:i})=>{const{slots:a,triggerContent:c}=m.useMemo(()=>m.Children.toArray(i).reduce((d,s)=>(m.isValidElement(s)&&s.type===Re?d.slots.push(s):d.triggerContent.push(s),d),{slots:[],triggerContent:[]}),[i]);return e.jsxs(no,{asChild:r,className:x.accordionHeader,onClick:n,children:[e.jsxs(ro,{className:x.accordionTrigger,"data-test-id":o,children:[e.jsx("div",{className:x.accordionTriggerContent,children:c}),e.jsx(Ee,{className:x.accordionCaret,size:"16"})]}),a]})};O.displayName="Accordion.Header";const M=({"data-test-id":o="collapsible-wrap",children:r,divider:n=!1,onClick:i,padding:a})=>e.jsx(io,{className:x.accordionContent,onClick:i,"data-test-id":o,"data-item-padding":a,"data-item-divider":n,children:e.jsx("div",{className:x.accordionContentText,"data-test-id":`inner-${o}`,children:r})});M.displayName="Accordion.Content";const Z=({children:o,name:r,"data-test-id":n="fondue-accordion-slot"},i)=>e.jsx("div",{"data-name":r,className:x.accordionSlot,"data-test-id":n,ref:i,children:o});Z.displayName="Accordion.Slot";const Re=m.forwardRef(Z),t={Root:L,Item:F,Header:O,Content:M,Slot:Re};L.__docgenInfo={description:"",methods:[],displayName:"Accordion.Root",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion'",computed:!1}},border:{required:!1,tsType:{name:"boolean"},description:`Show or hide the top and bottom border
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion component. This should contain the `Accordion.Item` components"},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The value of the items whose contents are expanded when the accordion is initially rendered.\nUse `defaultValue` if you do not need to control the state of an accordion."},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether or not an accordion is disabled from user interaction."},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The controlled stateful value of the accordion items whose contents are expanded."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the header.
@default 'large'`,defaultValue:{value:"'large'",computed:!1}},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"value"}],return:{name:"void"}}},description:"Callback function that is called when the value of the accordion changes."}}};F.__docgenInfo={description:"",methods:[],displayName:"Accordion.Item",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-item'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components"},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether or not an accordion item is disabled from user interaction.

@default false`},value:{required:!0,tsType:{name:"string"},description:"A string value for the accordion item. All items within an accordion should use a unique value."}}};O.__docgenInfo={description:"",methods:[],displayName:"Accordion.Header",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-header'",computed:!1}},asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default false`},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for this item."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion header."}}};M.__docgenInfo={description:"",methods:[],displayName:"Accordion.Content",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion content. This contains the main content."},divider:{required:!1,tsType:{name:"boolean"},description:"Adds a divider line between the header and the content.",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for the content."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the content.
@default 'large'`}}};Z.__docgenInfo={description:"",methods:[],displayName:"Accordion.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"literal",value:"'action'"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-slot'",computed:!1}}}};const{action:Se}=__STORYBOOK_MODULE_ACTIONS__,lt={component:L,tags:["autodocs"],subcomponents:{"Accordion.Item":F,"Accordion.Header":O,"Accordion.Content":M},parameters:{status:{type:"released"}},args:{}},Ne=()=>{const[o,r]=m.useState(!0);return e.jsxs(h.Root,{open:o,onOpenChange:r,children:[e.jsx(h.Trigger,{children:e.jsx(R.Input,{"aria-label":"Color Picker",currentColor:{alpha:.8,blue:50,green:100,red:230},onClear:function(){}})}),e.jsxs(h.Content,{maxWidth:"600px",children:[e.jsx(h.Body,{children:e.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:e.jsxs(R.Root,{defaultFormat:"RGBA",currentColor:{alpha:.8,blue:50,green:100,red:230},onColorChange:function(){},children:[e.jsx(R.Values,{}),e.jsx(R.Gradient,{})]})})}),e.jsxs(h.Footer,{children:[e.jsx(I,{emphasis:"default",onPress:function(){},children:"Cancel"}),e.jsx(I,{onPress:function(){},children:"Save"})]})]})]})},De=()=>{const[o,r]=m.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(I,{onPress:()=>r(!o),children:"Toggle Content"})]})},S={args:{},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(se,{gap:2,align:"center",children:[e.jsx(le,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(I,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(Ne,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Se("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})},N={args:{padding:"small"},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(se,{gap:2,align:"center",children:[e.jsx(le,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(I,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(I,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(Ne,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Se("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})};var te,ne,re;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(re=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var ie,ae,ce;N.parameters={...N.parameters,docs:{...(ie=N.parameters)==null?void 0:ie.docs,source:{originalSource:`{
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
}`,...(ce=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:ce.source}}};const mt=["Default","WithSmallPadding"];export{S as Default,N as WithSmallPadding,mt as __namedExportsOrder,lt as default};
