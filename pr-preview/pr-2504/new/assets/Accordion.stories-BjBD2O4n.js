import{r as m,j as e,u as le,e as g,F as D}from"./iframe-CQJ8XSnZ.js";import{u as Le,c as me,b as Fe,d as Ee}from"./fondue-icons352-BQjaqQHS.js";import{c as ue}from"./index-DtHOxPYq.js";import{c as Be}from"./index-COtIVobG.js";import{c as pe,u as Oe}from"./index-7Z3nfqOZ.js";import{u as G}from"./index-DkAQ7pac.js";import{P as _}from"./index-BNCn4XcK.js";import{P as Me}from"./index-BMB7pUY6.js";import{u as he}from"./index-BKGX_7iQ.js";import{u as ze}from"./index-CJAZa48L.js";import{B as ne}from"./Badge-CepEsFX9.js";import"./Box-D3S1Xju8.js";import{B as x}from"./Button-DPidsj0y.js";import"./Checkbox-EE6QNj26.js";import{c as R}from"./ColorPicker-BerRoGWd.js";import"./Dialog-kGOu1RFd.js";import"./Divider-Ct0epNcD.js";import{h as f}from"./Dropdown-CHAIjPk3.js";import{F as h}from"./Flyout-BmnoBRjo.js";import"./Grid-C-qaIDOC.js";import"./Heading-DgJ8riq6.js";import"./Label-yqZS42of.js";import"./LoadingBar-CoNVsY67.js";import"./LoadingCircle-BCjonPol.js";import"./ScrollArea-DO3abKF1.js";import"./Section-BBxn7d-3.js";import"./SegmentedControl-BVOV43g7.js";import"./Select-CrDFzTYD.js";import"./Slider-DlHBrr88.js";import"./Switch-DZdQrGAB.js";import"./Table-8D0NCejf.js";import"./Tag-DsiSmPHi.js";import"./Tabs-_FoEtWRo.js";import"./Text-BqKFT6bL.js";import"./TextInput-CTMifKC3.js";import"./Textarea-lLCk7eb8.js";import"./Tooltip-XN76lVbT.js";import"./preload-helper-Fce_ioCt.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-BnIk7aNZ.js";import"./component-D-s9N-5s.js";import"./index-D30tjATH.js";import"./useSyncRefs-vi22BM0e.js";import"./domUtilities-DGDVwu3_.js";import"./index-C0pyG4Zx.js";import"./index-BdQq_4o_.js";import"./useControllableState-CsUeC5Bu.js";var P="Collapsible",[Ve,ge]=ue(P),[Je,K]=Ve(P),fe=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,open:a,defaultOpen:i,disabled:c,onOpenChange:s,...d}=o,[u,p]=G({prop:a,defaultProp:i??!1,onChange:s,caller:P});return e.jsx(Je,{scope:n,disabled:c,contentId:he(),open:u,onOpenToggle:m.useCallback(()=>p(A=>!A),[p]),children:e.jsx(_.div,{"data-state":Y(u),"data-disabled":c?"":void 0,...d,ref:r})})});fe.displayName=P;var Ae="CollapsibleTrigger",Ce=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,...a}=o,i=K(Ae,n);return e.jsx(_.button,{type:"button","aria-controls":i.contentId,"aria-expanded":i.open||!1,"data-state":Y(i.open),"data-disabled":i.disabled?"":void 0,disabled:i.disabled,...a,ref:r,onClick:pe(o.onClick,i.onOpenToggle)})});Ce.displayName=Ae;var U="CollapsibleContent",xe=m.forwardRef((o,r)=>{const{forceMount:n,...a}=o,i=K(U,o.__scopeCollapsible);return e.jsx(Me,{present:n||i.open,children:({present:c})=>e.jsx($e,{...a,ref:r,present:c})})});xe.displayName=U;var $e=m.forwardRef((o,r)=>{const{__scopeCollapsible:n,present:a,children:i,...c}=o,s=K(U,n),[d,u]=m.useState(a),p=m.useRef(null),A=le(r,p),C=m.useRef(0),k=C.current,j=m.useRef(0),H=j.current,y=s.open||d,b=m.useRef(y),w=m.useRef(void 0);return m.useEffect(()=>{const l=requestAnimationFrame(()=>b.current=!1);return()=>cancelAnimationFrame(l)},[]),Oe(()=>{const l=p.current;if(l){w.current=w.current||{transitionDuration:l.style.transitionDuration,animationName:l.style.animationName},l.style.transitionDuration="0s",l.style.animationName="none";const T=l.getBoundingClientRect();C.current=T.height,j.current=T.width,b.current||(l.style.transitionDuration=w.current.transitionDuration,l.style.animationName=w.current.animationName),u(a)}},[s.open,a]),e.jsx(_.div,{"data-state":Y(s.open),"data-disabled":s.disabled?"":void 0,id:s.contentId,hidden:!y,...c,ref:A,style:{"--radix-collapsible-content-height":k?`${k}px`:void 0,"--radix-collapsible-content-width":H?`${H}px`:void 0,...o.style},children:y&&i})});function Y(o){return o?"open":"closed"}var We=fe,Ge=Ce,Ke=xe,v="Accordion",Ue=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[Q,Ye,Qe]=Be(v),[L]=ue(v,[Qe,ge]),X=ge(),ve=g.forwardRef((o,r)=>{const{type:n,...a}=o,i=a,c=a;return e.jsx(Q.Provider,{scope:o.__scopeAccordion,children:n==="multiple"?e.jsx(oo,{...c,ref:r}):e.jsx(eo,{...i,ref:r})})});ve.displayName=v;var[Ie,Xe]=L(v),[je,Ze]=L(v,{collapsible:!1}),eo=g.forwardRef((o,r)=>{const{value:n,defaultValue:a,onValueChange:i=()=>{},collapsible:c=!1,...s}=o,[d,u]=G({prop:n,defaultProp:a??"",onChange:i,caller:v});return e.jsx(Ie,{scope:o.__scopeAccordion,value:g.useMemo(()=>d?[d]:[],[d]),onItemOpen:u,onItemClose:g.useCallback(()=>c&&u(""),[c,u]),children:e.jsx(je,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(ye,{...s,ref:r})})})}),oo=g.forwardRef((o,r)=>{const{value:n,defaultValue:a,onValueChange:i=()=>{},...c}=o,[s,d]=G({prop:n,defaultProp:a??[],onChange:i,caller:v}),u=g.useCallback(A=>d((C=[])=>[...C,A]),[d]),p=g.useCallback(A=>d((C=[])=>C.filter(k=>k!==A)),[d]);return e.jsx(Ie,{scope:o.__scopeAccordion,value:s,onItemOpen:u,onItemClose:p,children:e.jsx(je,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(ye,{...c,ref:r})})})}),[to,F]=L(v),ye=g.forwardRef((o,r)=>{const{__scopeAccordion:n,disabled:a,dir:i,orientation:c="vertical",...s}=o,d=g.useRef(null),u=le(d,r),p=Ye(n),C=ze(i)==="ltr",k=pe(o.onKeyDown,j=>{var oe;if(!Ue.includes(j.key))return;const H=j.target,y=p().filter($=>{var te;return!((te=$.ref.current)!=null&&te.disabled)}),b=y.findIndex($=>$.ref.current===H),w=y.length;if(b===-1)return;j.preventDefault();let l=b;const T=0,z=w-1,V=()=>{l=b+1,l>z&&(l=T)},J=()=>{l=b-1,l<T&&(l=z)};switch(j.key){case"Home":l=T;break;case"End":l=z;break;case"ArrowRight":c==="horizontal"&&(C?V():J());break;case"ArrowDown":c==="vertical"&&V();break;case"ArrowLeft":c==="horizontal"&&(C?J():V());break;case"ArrowUp":c==="vertical"&&J();break}const Pe=l%w;(oe=y[Pe].ref.current)==null||oe.focus()});return e.jsx(to,{scope:n,disabled:a,direction:i,orientation:c,children:e.jsx(Q.Slot,{scope:n,children:e.jsx(_.div,{...s,"data-orientation":c,ref:u,onKeyDown:a?void 0:k})})})}),q="AccordionItem",[no,Z]=L(q),be=g.forwardRef((o,r)=>{const{__scopeAccordion:n,value:a,...i}=o,c=F(q,n),s=Xe(q,n),d=X(n),u=he(),p=a&&s.value.includes(a)||!1,A=c.disabled||o.disabled;return e.jsx(no,{scope:n,open:p,disabled:A,triggerId:u,children:e.jsx(We,{"data-orientation":c.orientation,"data-state":Re(p),...d,...i,ref:r,disabled:A,open:p,onOpenChange:C=>{C?s.onItemOpen(a):s.onItemClose(a)}})})});be.displayName=q;var we="AccordionHeader",ke=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...a}=o,i=F(v,n),c=Z(we,n);return e.jsx(_.h3,{"data-orientation":i.orientation,"data-state":Re(c.open),"data-disabled":c.disabled?"":void 0,...a,ref:r})});ke.displayName=we;var W="AccordionTrigger",Te=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...a}=o,i=F(v,n),c=Z(W,n),s=Ze(W,n),d=X(n);return e.jsx(Q.ItemSlot,{scope:n,children:e.jsx(Ge,{"aria-disabled":c.open&&!s.collapsible||void 0,"data-orientation":i.orientation,id:c.triggerId,...d,...a,ref:r})})});Te.displayName=W;var _e="AccordionContent",He=g.forwardRef((o,r)=>{const{__scopeAccordion:n,...a}=o,i=F(v,n),c=Z(_e,n),s=X(n);return e.jsx(Ke,{role:"region","aria-labelledby":c.triggerId,"data-orientation":i.orientation,...s,...a,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});He.displayName=_e;function Re(o){return o?"open":"closed"}var ro=ve,ao=be,io=ke,co=Te,so=He;const lo="_root_eybkh_2",mo="_accordionItem_eybkh_23",uo="_accordionTrigger_eybkh_29",po="_accordionHeader_eybkh_34",ho="_accordionSlot_eybkh_41",go="_accordionCaret_eybkh_66",fo="_accordionTriggerContent_eybkh_74",Ao="_accordionContent_eybkh_79",Co="_accordionContentText_eybkh_108",I={root:lo,accordionItem:mo,accordionTrigger:uo,accordionHeader:po,accordionSlot:ho,accordionCaret:go,accordionTriggerContent:fo,accordionContent:Ao,accordionContentText:Co},E=({"data-test-id":o="fondue-accordion",border:r=!0,children:n,defaultValue:a,disabled:i,value:c,padding:s="large",onValueChange:d})=>e.jsx(ro,{className:I.root,"data-test-id":o,defaultValue:a,disabled:i,type:"multiple",value:c,"data-border":r,"data-accordion-padding":s,onValueChange:d,children:n});E.displayName="Accordion.Root";const B=({"data-test-id":o="fondue-accordion-item",children:r,disabled:n,value:a})=>e.jsx(ao,{className:I.accordionItem,value:a,onPointerDown:i=>{i.currentTarget.dataset.showFocusRing="false"},onBlur:i=>{i.currentTarget.dataset.showFocusRing="true"},disabled:n,"data-test-id":o,children:r});B.displayName="Accordion.Item";const O=({"data-test-id":o="fondue-accordion-header",asChild:r,onClick:n,children:a})=>{const{slots:i,triggerContent:c}=m.useMemo(()=>m.Children.toArray(a).reduce((s,d)=>(m.isValidElement(d)&&d.type===Se?s.slots.push(d):s.triggerContent.push(d),s),{slots:[],triggerContent:[]}),[a]);return e.jsxs(io,{asChild:r,className:I.accordionHeader,onClick:n,children:[e.jsxs(co,{className:I.accordionTrigger,"data-test-id":o,children:[e.jsx("div",{className:I.accordionTriggerContent,children:c}),e.jsx(Le,{className:I.accordionCaret,size:"16"})]}),i]})};O.displayName="Accordion.Header";const M=({"data-test-id":o="collapsible-wrap",children:r,divider:n=!1,onClick:a,padding:i})=>e.jsx(so,{className:I.accordionContent,onClick:a,"data-test-id":o,"data-item-padding":i,"data-item-divider":n,children:e.jsx("div",{className:I.accordionContentText,"data-test-id":`inner-${o}`,children:r})});M.displayName="Accordion.Content";const ee=({children:o,name:r,"data-test-id":n="fondue-accordion-slot"},a)=>e.jsx("div",{"data-name":r,className:I.accordionSlot,"data-test-id":n,ref:a,children:o});ee.displayName="Accordion.Slot";const Se=m.forwardRef(ee),t={Root:E,Item:B,Header:O,Content:M,Slot:Se};E.__docgenInfo={description:"",methods:[],displayName:"Accordion.Root",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion'",computed:!1}},border:{required:!1,tsType:{name:"boolean"},description:`Show or hide the top and bottom border
@default true`,defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion component. This should contain the `Accordion.Item` components"},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The value of the items whose contents are expanded when the accordion is initially rendered.\nUse `defaultValue` if you do not need to control the state of an accordion."},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether or not an accordion is disabled from user interaction."},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"The controlled stateful value of the accordion items whose contents are expanded."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the header.
@default 'large'`,defaultValue:{value:"'large'",computed:!1}},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"value"}],return:{name:"void"}}},description:"Callback function that is called when the value of the accordion changes."}}};B.__docgenInfo={description:"",methods:[],displayName:"Accordion.Item",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-item'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion item. This should contain the `Accordion.Header` and `Accordion.Content` components"},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether or not an accordion item is disabled from user interaction.

@default false`},value:{required:!0,tsType:{name:"string"},description:"A string value for the accordion item. All items within an accordion should use a unique value."}}};O.__docgenInfo={description:"",methods:[],displayName:"Accordion.Header",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-header'",computed:!1}},asChild:{required:!1,tsType:{name:"boolean"},description:`Change the default rendered element for the one passed as a child, merging their props and behavior.
@default false`},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for this item."},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion header."}}};M.__docgenInfo={description:"",methods:[],displayName:"Accordion.Content",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:"Children of the Accordion content. This contains the main content."},divider:{required:!1,tsType:{name:"boolean"},description:"Adds a divider line between the header and the content.",defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:"Click callback for the content."},padding:{required:!1,tsType:{name:"union",raw:"'none' | 'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:`Controls if we show paddings around the content.
@default 'large'`}}};ee.__docgenInfo={description:"",methods:[],displayName:"Accordion.Slot",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},name:{required:!1,tsType:{name:"literal",value:"'action'"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-slot'",computed:!1}}}};const{action:Ne}=__STORYBOOK_MODULE_ACTIONS__,pt={component:E,tags:["autodocs"],subcomponents:{"Accordion.Item":B,"Accordion.Header":O,"Accordion.Content":M},parameters:{status:{type:"released"}},args:{}},De=()=>{const[o,r]=m.useState(!0);return e.jsxs(h.Root,{open:o,onOpenChange:r,children:[e.jsx(h.Trigger,{children:e.jsx(R.Input,{"aria-label":"Color Picker",currentColor:{alpha:.8,blue:50,green:100,red:230},onClear:function(){}})}),e.jsxs(h.Content,{maxWidth:"600px",children:[e.jsx(h.Body,{children:e.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:e.jsxs(R.Root,{defaultFormat:"RGBA",currentColor:{alpha:.8,blue:50,green:100,red:230},onColorChange:function(){},children:[e.jsx(R.Values,{}),e.jsx(R.Gradient,{})]})})}),e.jsxs(h.Footer,{children:[e.jsx(x,{emphasis:"default",onPress:function(){},children:"Cancel"}),e.jsx(x,{onPress:function(){},children:"Save"})]})]})]})},qe=()=>{const[o,r]=m.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:o?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(x,{onPress:()=>r(!o),children:"Toggle Content"})]})},S={args:{},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(D,{gap:2,align:"center",children:[e.jsx(me,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(x,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(x,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(x,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Ne("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(qe,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-8",children:[e.jsxs(t.Header,{children:[e.jsxs(D,{gap:2,children:["Item with badge",e.jsx(ne,{children:"42 entries"}),e.jsx(ne,{emphasis:"strong",variant:"highlight",children:"very pretty"})]}),e.jsx(t.Slot,{name:"action",children:e.jsxs(D,{gap:2,children:[e.jsx(x,{size:"small",emphasis:"weak",aspect:"square",children:e.jsx(Fe,{size:16})}),e.jsx(x,{size:"small",emphasis:"weak",aspect:"square",children:e.jsx(Ee,{size:16})})]})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})},N={args:{padding:"small"},render:o=>e.jsxs(t.Root,{...o,children:[e.jsxs(t.Item,{value:"accordion-test-0",children:[e.jsx(t.Header,{children:e.jsxs(D,{gap:2,align:"center",children:[e.jsx(me,{}),"Item with icon"]})}),e.jsx(t.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-1",children:[e.jsxs(t.Header,{children:["With action slot",e.jsx(t.Slot,{name:"action",children:e.jsx(x,{size:"small",emphasis:"default",children:"Click Me"})})]}),e.jsx(t.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(t.Item,{value:"accordion-test-2",children:[e.jsx(t.Header,{children:"Item with dropdown child"}),e.jsx(t.Content,{children:e.jsxs(f.Root,{children:[e.jsx(f.Trigger,{children:e.jsx(x,{children:"Trigger"})}),e.jsxs(f.Content,{children:[e.jsx(f.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(f.Item,{onSelect:function(){},children:"Item 3"})]})]})})]}),e.jsxs(t.Item,{value:"accordion-test-3",children:[e.jsx(t.Header,{children:"Item with flyout child"}),e.jsx(t.Content,{children:e.jsxs(h.Root,{children:[e.jsx(h.Trigger,{children:e.jsx(x,{children:"Trigger"})}),e.jsx(h.Content,{children:e.jsx(h.Body,{children:"Hello!"})})]})})]}),e.jsxs(t.Item,{value:"accordion-test-4",children:[e.jsx(t.Header,{children:"Item with color picker flyout"}),e.jsx(t.Content,{children:e.jsx(De,{})})]}),e.jsxs(t.Item,{value:"accordion-test-5",children:[e.jsx(t.Header,{onClick:()=>Ne("click"),children:"Empty item with an onClick callback"}),e.jsx(t.Content,{})]}),e.jsxs(t.Item,{value:"accordion-test-6",children:[e.jsx(t.Header,{children:"Item with resizable content"}),e.jsx(t.Content,{children:e.jsx(qe,{})})]}),e.jsxs(t.Item,{value:"accordion-test-7",children:[e.jsx(t.Header,{children:"Item without padding"}),e.jsx(t.Content,{padding:"none",children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})};var re,ae,ie;S.parameters={...S.parameters,docs:{...(re=S.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
                        <Flex gap={2}>
                            Item with badge
                            <Badge>42 entries</Badge>
                            <Badge emphasis="strong" variant="highlight">
                                very pretty
                            </Badge>
                        </Flex>
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
}`,...(ie=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};var ce,se,de;N.parameters={...N.parameters,docs:{...(ce=N.parameters)==null?void 0:ce.docs,source:{originalSource:`{
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
}`,...(de=(se=N.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};const ht=["Default","WithSmallPadding"];export{S as Default,N as WithSmallPadding,ht as __namedExportsOrder,pt as default};
