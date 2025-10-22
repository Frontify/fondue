import{r as m,j as e,u as le,e as g,F as H}from"./iframe-Crd0Iw1U.js";import{u as Fe,c as me,b as Le,d as Ee}from"./fondue-icons352-3Ny0_u_0.js";import{c as ue}from"./index-nskLmShm.js";import{c as Be}from"./index-bSj6FILC.js";import{c as pe,u as Oe}from"./index-Cay9oHRR.js";import{u as G}from"./index-5hdy7IR-.js";import{P as k}from"./index-DKZT5f2_.js";import{P as Me}from"./index-BrZpo6Ay.js";import{u as he}from"./index-i5UthzU_.js";import{u as ze}from"./index-DsbH6UBf.js";import{B as ne}from"./Badge-BeFHYP8M.js";import"./Box-bikLUQdD.js";import{B as C}from"./Button-C_kp8rMp.js";import"./Checkbox-BlLUmuJY.js";import{c as S}from"./ColorPicker-D7Md0FsM.js";import"./Dialog-D2-nJskK.js";import"./Divider-ChVLp3nn.js";import{h as f}from"./Dropdown-C6lnSGDA.js";import{F as h}from"./Flyout-Dm8dU1Q2.js";import"./Grid-CIHyYc6C.js";import"./Heading-gOfOV9ea.js";import"./Label-DDLLA-mi.js";import"./LoadingBar-DS-qJ_Fv.js";import"./LoadingCircle-Dra2ilKw.js";import"./ScrollArea-C5TW9rcS.js";import"./Section-B_csMeC6.js";import"./SegmentedControl-DHEREwgN.js";import"./Select-BZFAE-aD.js";import"./Slider-B97wv4qJ.js";import"./Switch-CFBjfOno.js";import"./Table-eLTpvhOD.js";import"./Tag-DXZ4oQz4.js";import"./Tabs-CLv2cTyT.js";import"./Text--khzKyKN.js";import"./TextInput-lskjNUDH.js";import"./Textarea-BmmgVMrM.js";import"./Tooltip-CIRa9sdW.js";import"./preload-helper-BrZLIG29.js";import"./useTranslation-DvezmRGg.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-Cc4J2B9g.js";import"./component-ampEiPvO.js";import"./index-CHqo6_Rw.js";import"./useSyncRefs-CS_EsjG4.js";import"./domUtilities-DGDVwu3_.js";import"./index-C6lHR2pM.js";import"./index-BdQq_4o_.js";import"./useControllableState-DKiVkNKf.js";var P="Collapsible",[Ve,ge]=ue(P),[Je,K]=Ve(P),fe=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,open:a,defaultOpen:i,disabled:c,onOpenChange:s,...d}=o,[u,p]=G({prop:a,defaultProp:i??!1,onChange:s,caller:P});return e.jsx(Je,{scope:n,disabled:c,contentId:he(),open:u,onOpenToggle:m.useCallback(()=>p(x=>!x),[p]),children:e.jsx(k.div,{"data-state":Y(u),"data-disabled":c?"":void 0,...d,ref:r})})});fe.displayName=P;var xe="CollapsibleTrigger",Ae=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,...a}=o,i=K(xe,n);return e.jsx(k.button,{type:"button","aria-controls":i.contentId,"aria-expanded":i.open||!1,"data-state":Y(i.open),"data-disabled":i.disabled?"":void 0,disabled:i.disabled,...a,ref:r,onClick:pe(o.onClick,i.onOpenToggle)})});Ae.displayName=xe;var U="CollapsibleContent",Ce=m.forwardRef((o,r)=>{const{forceMount:n,...a}=o,i=K(U,o.__scopeCollapsible);return e.jsx(Me,{present:n||i.open,children:({present:c})=>e.jsx($e,{...a,ref:r,present:c})})});Ce.displayName=U;var $e=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,present:a,children:i,...c}=o,s=K(U,n),[d,u]=m.useState(a),p=m.useRef(null),x=le(r,p),A=m.useRef(0),T=A.current,j=m.useRef(0),R=j.current,y=s.open||d,b=m.useRef(y),w=m.useRef(void 0);return m.useEffect(()=>{const l=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(l)},[]),Oe(()=>{const l=p.current;if(l){w.current=w.current||{transitionDuration:l.style.transitionDuration,animationName:l.style.animationName},l.style.transitionDuration="0s",l.style.animationName="none";const _=l.getBoundingClientRect();A.current=_.height,j.current=_.width,b.current||(l.style.transitionDuration=w.current.transitionDuration,l.style.animationName=w.current.animationName),u(a)}},[s.open,a]),e.jsx(k.div,{"data-state":Y(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!y,...c,ref:x,style:{"--radix-collapsible-content-height":T?`${T}px`:void 0,"--radix-collapsible-content-width":R?`${R}px`:void 0,...o.style},children:y&&i})});function Y(o){return o?"open":"closed"}var We=fe,Ge=Ae,Ke=Ce,v="Accordion",Ue=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[Q,Ye,Qe]=Be(v),[F]=ue(v,[Qe,ge]),X=ge(),ve=g.forwardRef((o,r)=>{const{type:n,...a}=o,i=a,c=a;return e.jsx(Q.Provider,{scope:o.__scopeAccordion,children:n==="multiple"?e.jsx(oo,{...c,ref:r}):e.jsx(eo,{...i,ref:r})})});ve.displayName=v;var[Ie,Xe]=F(v),[je,Ze]=F(v,{collapsible:!1}),eo=g.forwardRef((o,r)=>{const{value:n,defaultValue:a,onValueChange:i=()=>{},collapsible:c=!1,...s}=o,[d,u]=G({prop:n,defaultProp:a??"",onChange:i,caller:v});return e.jsx(Ie,{scope:o.__scopeAccordion,value:g.useMemo(()=>d?[d]:[],[d]),onItemOpen:u,onItemClose:g.useCallback(()=>c&&u(""),[c,u]),children:e.jsx(je,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(ye,{...s,ref:r})})})}),oo=g.forwardRef((o,r)=>{const{value:n,defaultValue:a,onValueChange:i=()=>{},...c}=o,[s,d]=G({prop:n,defaultProp:a??[],onChange:i,caller:v}),u=g.useCallback(x=>d((A=[])=>[...A,x]),[d]),p=g.useCallback(x=>d((A=[])=>A.filter(T=>T!==x)),[d]);return e.jsx(Ie,{scope:o.__scopeAccordion,value:s,onItemOpen:u,onItemClose:p,children:e.jsx(je,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(ye,{...c,ref:r})})})}),[to,L]=F(v),ye=g.forwardRef((o,r)=>{const{__scopeAccordion:n,disabled:a,dir:i,orientation:c="vertical",...s}=o,d=g.useRef(null),u=le(d,r),p=Ye(n),A=ze(i)==="ltr",T=pe(o.onKeyDown,j=>{var oe;if(!Ue.includes(j.key))return;const R=j.target,y=p().filter($=>{var te;return!((te=$.ref.current)!=null&&te.disabled)}),b=y.findIndex($=>$.ref.current===R),w=y.length;if(b===-1)return;j.preventDefault();let l=b;const _=0,z=w-1,V=()=>{l=b+1,l>z&&(l=_)},J=()=>{l=b-1,l<_&&(l=z)};switch(j.key){case"Home":l=_;break;case"End":l=z;break;case"ArrowRight":c==="horizontal"&&(A?V():J());break;case"ArrowDown":c==="vertical"&&V();break;case"ArrowLeft":c==="horizontal"&&(A?J():V());break;case"ArrowUp":c==="vertical"&&J();break}const Pe=l%w;(oe=y[Pe].ref.current)==null||oe.focus()});return e.jsx(to,{scope:n,disabled:a,direction:i,orientation:c,children:e.jsx(Q.Slot,{scope:n,children:e.jsx(k.div,{...s,"data-orientation":c,ref:u,onKeyDown:a?void 0:T})})})}),q="AccordionItem",[no,Z]=F(q),be=g.forwardRef((o,r)=>{const{__scopeAccordion:n,value:a,...i}=o,c=L(q,n),s=Xe(q,n),d=X(n),u=he(),p=a&&s.value.includes(a)||!1,x=c.disabled||o.disabled;return e.jsx(no,{scope:n,open:p,disabled:x,triggerId:u,children:e.jsx(We,{"data-orientation":c.orientation,"data-state":Re(p),...d,...i,ref:r,disabled:x,open:p,onOpenChange:A=>{A?s.onItemOpen(a):s.onItemClose(a)}})})});be.displayName=q;var we="AccordionHeader",Te=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...a}=o,i=L(v,n),c=Z(we,n);return e.jsx(k.h3,{"data-orientation":i.orientation,"data-state":Re(c.open),"data-disabled":c.disabled?"":void 0,...a,ref:r})});Te.displayName=we;var W="AccordionTrigger",_e=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...a}=o,i=L(v,n),c=Z(W,n),s=Ze(W,n),d=X(n);return e.jsx(Q.ItemSlot,{scope:n,children:e.jsx(Ge,{"aria-disabled":c.open&&!s.collapsible||void 0,"data-orientation":i.orientation,id:c.triggerId,...d,...a,ref:r})})});_e.displayName=W;var He="AccordionContent",ke=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...a}=o,i=L(v,n),c=Z(He,n),s=X(n);return e.jsx(Ke,{role:"region","aria-labelledby":c.triggerId,"data-orientation":i.orientation,...s,...a,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});ke.displayName=He;function Re(o){return o?"open":"closed"}var ro=ve,ao=be,io=Te,co=_e,so=ke;const lo="_root_px2wh_2",mo="_accordionItem_px2wh_23",uo="_accordionTrigger_px2wh_29",po="_accordionHeader_px2wh_34",ho="_accordionSlot_px2wh_42",go="_accordionCaret_px2wh_69",fo="_accordionTriggerContent_px2wh_77",xo="_accordionContent_px2wh_82",Ao="_accordionContentText_px2wh_111",I={root:lo,accordionItem:mo,accordionTrigger:uo,accordionHeader:po,accordionSlot:ho,accordionCaret:go,accordionTriggerContent:fo,accordionContent:xo,accordionContentText:Ao},E=({"data-test-id":o="fondue-accordion",border:r=!0,children:n,defaultValue:a,disabled:i,value:c,padding:s="large",onValueChange:d})=>e.jsx(ro,{className:I.root,"data-test-id":o,defaultValue:a,disabled:i,type:"multiple",value:c,"data-border":r,"data-accordion-padding":s,onValueChange:d,children:n});E.displayName="Accordion.Root";const B=({"data-test-id":o="fondue-accordion-item",children:r,disabled:n,value:a})=>e.jsx(ao,{className:I.accordionItem,value:a,onPointerDown:i=>{i.currentTarget.dataset.showFocusRing="false"},onBlur:i=>{i.currentTarget.dataset.showFocusRing="true"},disabled:n,"data-test-id":o,children:r});B.displayName="Accordion.Item";const O=({"data-test-id":o="fondue-accordion-header",asChild:r,onClick:n,children:a})=>{const{slots:i,triggerContent:c}=m.useMemo(()=>m.Children.toArray(a).reduce((s,d)=>(m.isValidElement(d)&&d.type===Se?s.slots.push(d):s.triggerContent.push(d),s),{slots:[],triggerContent:[]}),[a]);return e.jsxs(io,{asChild:r,className:I.accordionHeader,onClick:n,children:[e.jsxs(co,{className:I.accordionTrigger,"data-test-id":o,children:[e.jsx("div",{className:I.accordionTriggerContent,children:c}),e.jsx(Fe,{className:I.accordionCaret,size:"16"})]}),i]})};O.displayName="Accordion.Header";const M=({"data-test-id":o="collapsible-wrap",children:r,divider:n=!1,onClick:a,padding:i})=>e.jsx(so,{className:I.accordionContent,onClick:a,"data-test-id":o,"data-item-padding":i,"data-item-divider":n,children:e.jsx("div",{className:I.accordionContentText,"data-test-id":`inner-${o}`,children:r})});M.displayName="Accordion.Content";const ee=({children:o,name:r,"data-test-id":n="fondue-accordion-slot"},a)=>e.jsx("div",{"data-name":r,className:I.accordionSlot,"data-test-id":n,ref:a,children:o});ee.displayName="Accordion.Slot";const Se=m.forwardRef(ee),t={Root:E,Item:B,Header:O,Content:M,Slot:Se};E.__docgenInfo={description:"",methods:[],displayName:"Accordion.Root",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion'",computed:!1}},border:{required:!1,tsType:{name:"boolean"},description:`Show or hide the top and bottom border
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion component. This should contain the `Accordion.Item` components"},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The value of the items whose contents are expanded when the accordion is initially rendered.\nUse `defaultValue` if you do not need to control the state of an accordion."},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether or not an accordion is disabled from user interaction."},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The controlled stateful value of the accordion items whose contents are expanded."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the header.
@default 'large'`,defaultValue:{value:"'large'",computed:!1}},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"value"}],return:{name:"void"}}},description:"Callback function that is called when the value of the accordion changes."}}};B.__docgenInfo={description:"",methods:[],displayName:"Accordion.Item",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-item'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components"},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether or not an accordion item is disabled from user interaction.

@default false`},value:{required:!0,tsType:{name:"string"},description:"A string value for the accordion item. All items within an accordion should use a unique value."}}};O.__docgenInfo={description:"",methods:[],displayName:"Accordion.Header",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-header'",computed:!1}},asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default false`},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for this item."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion header."}}};M.__docgenInfo={description:"",methods:[],displayName:"Accordion.Content",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion content. This contains the main content."},divider:{required:!1,tsType:{name:"boolean"},description:"Adds a divider line between the header and the content.",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for the content."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the content.
@default 'large'`}}};ee.__docgenInfo={description:"",methods:[],displayName:"Accordion.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"literal",value:"'action'"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-slot'",computed:!1}}}};const{action:Ne}=__STORYBOOK_MODULE_ACTIONS__,ht={component:E,tags:["autodocs"],subcomponents:{"Accordion.Item":B,"Accordion.Header":O,"Accordion.Content":M},parameters:{status:{type:"released"}},args:{}},De=()=>{const[o,r]=m.useState(!0);return e.jsxs(h.Root,{open:o,onOpenChange:r,children:[e.jsx(h.Trigger,{children:e.jsx(S.Input,{"aria-label":"Color Picker",currentColor:{alpha:.8,blue:50,green:100,red:230},onClear:function(){}})}),e.jsxs(h.Content,{maxWidth:"600px",children:[e.jsx(h.Body,{children:e.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:e.jsxs(S.Root,{defaultFormat:"RGBA",currentColor:{alpha:.8,blue:50,green:100,red:230},onColorChange:function(){},children:[e.jsx(S.Values,{}),e.jsx(S.Gradient,{})]})})}),e.jsxs(h.Footer,{children:[e.jsx(C,{emphasis:"default",onPress:function(){},children:"Cancel"}),e.jsx(C,{onPress:function(){},children:"Save"})]})]})]})},qe=()=>{const[o,r]=m.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(C,{onPress:()=>r(!o),children:"Toggle Content"})]})},N={args:{},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(H,{gap:2,align:"center",children:[e.jsx(me,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(C,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Ne("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(qe,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-8",children:[e.jsxs(t.Header,{children:[e.jsx(H,{gap:2,children:"Item with badge"}),e.jsx(t.Slot,{children:e.jsxs(H,{gap:2,children:[e.jsx(ne,{children:"42 entries"}),e.jsx(ne,{emphasis:"strong",variant:"highlight",children:"very pretty"})]})}),e.jsx(t.Slot,{name:"action",children:e.jsxs(H,{gap:2,children:[e.jsx(C,{size:"small",emphasis:"weak",aspect:"square",children:e.jsx(Le,{size:16})}),e.jsx(C,{size:"small",emphasis:"weak",aspect:"square",children:e.jsx(Ee,{size:16})})]})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})},D={args:{padding:"small"},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(H,{gap:2,align:"center",children:[e.jsx(me,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(C,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(C,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Ne("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(qe,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})};var re,ae,ie;N.parameters={...N.parameters,docs:{...(re=N.parameters)==null?void 0:re.docs,source:{originalSource:`{
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

                <Accordion.Item value="accordion-test-8">
                    <Accordion.Header>
                        <Flex gap={2}>Item with badge</Flex>
                        <Accordion.Slot>
                            <Flex gap={2}>
                                <Badge>42 entries</Badge>
                                <Badge emphasis="strong" variant="highlight">
                                    very pretty
                                </Badge>
                            </Flex>
                        </Accordion.Slot>
                        <Accordion.Slot name="action">
                            <Flex gap={2}>
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
}`,...(ie=(ae=N.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ce,se,de;D.parameters={...D.parameters,docs:{...(ce=D.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(de=(se=D.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};const gt=["Default","WithSmallPadding"];export{N as Default,D as WithSmallPadding,gt as __namedExportsOrder,ht as default};
