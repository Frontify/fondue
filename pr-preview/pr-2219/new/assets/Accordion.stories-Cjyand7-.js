import{j as e}from"./jsx-runtime-BSxFkHFN.js";import{r as d,e as p}from"./index-i66itsuO.js";import{q as _e,c as Ne}from"./fondue-icons348-g6CPHV6m.js";import{a as Pe}from"./chunk-D5ZWXAHU-DlerbUHg.js";/* empty css               */import"./Box-DVv5YIW_.js";import{B as S}from"./Button-B_5YezNO.js";import"./Checkbox-CzBTIath.js";import{c as D}from"./ColorPicker-DmP5gbk1.js";import"./Dialog-BVMnEljE.js";import"./Divider-DRz3jNOA.js";import{h as _}from"./Dropdown-Xr0XmF1B.js";import"./Flex-qurznK3Z.js";import{F as T}from"./Flyout-vxy6SqRy.js";import"./Grid-v4ePEr-t.js";import"./Heading-Dxlzvdof.js";import"./Label-CuL99xi1.js";import"./LoadingBar-CeG04zm5.js";import"./LoadingCircle-C1R00fQU.js";import"./ScrollArea-CAHWO9nS.js";import"./Section-DUy1JF06.js";import"./SegmentedControl-ittdl744.js";import"./Select-BkUF3gLJ.js";import"./Slider-DWGa2XPH.js";import"./Switch-BnWwtHaG.js";import"./Table-D2QYwWS5.js";import"./Tabs-BBub4UgQ.js";import"./Text-D5d4NpEW.js";import"./TextInput-BlU4KsbK.js";import"./ThemeProvider-nZnSZuXa.js";import"./Tooltip-DJM_t4lA.js";import{c as K}from"./index-BwxsjnLo.js";import{c as Se,u as k}from"./index-C7Xses_O.js";import{c as de,a as Ee}from"./index-BNYVQE02.js";import{u as Y}from"./index-P4w4wmP2.js";import"./index-BQPO3JLn.js";import{P as De}from"./index-cPkRJAzz.js";import{u as le}from"./index-CIFYclHn.js";import{u as He}from"./index-DLXHbKnz.js";import{c as N}from"./styleUtilities-rhQWLmVU.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./v4-CtRu48qb.js";import"./propsToCssVariables-DVyyXmoh.js";import"./focusStyle-IgMhxCMT.js";import"./index-Dh_oXSn4.js";import"./index-BVL3yOfb.js";import"./index-C9TK974O.js";import"./Combination-BQ0A-8sA.js";import"./useSyncRefs-DKJtHqhc.js";import"./domUtilities-DGDVwu3_.js";import"./index-Cao5XaZ_.js";import"./index--HnUjAPS.js";import"./index-Nz8TJpHF.js";import"./index-BdQq_4o_.js";import"./useControllableState-BeU1Rl3I.js";var O=d.forwardRef((o,r)=>{const{children:t,...n}=o,i=d.Children.toArray(t),c=i.find(Oe);if(c){const a=c.props.children,u=i.map(m=>m===c?d.Children.count(a)>1?d.Children.only(null):d.isValidElement(a)?a.props.children:null:m);return e.jsx(z,{...n,ref:r,children:d.isValidElement(a)?d.cloneElement(a,void 0,u):null})}return e.jsx(z,{...n,ref:r,children:t})});O.displayName="Slot";var z=d.forwardRef((o,r)=>{const{children:t,...n}=o;if(d.isValidElement(t)){const i=qe(t),c=Me(n,t.props);return t.type!==d.Fragment&&(c.ref=r?Se(r,i):i),d.cloneElement(t,c)}return d.Children.count(t)>1?d.Children.only(null):null});z.displayName="SlotClone";var ke=({children:o})=>e.jsx(e.Fragment,{children:o});function Oe(o){return d.isValidElement(o)&&o.type===ke}function Me(o,r){const t={...r};for(const n in r){const i=o[n],c=r[n];/^on[A-Z]/.test(n)?i&&c?t[n]=(...u)=>{c(...u),i(...u)}:i&&(t[n]=i):n==="style"?t[n]={...i,...c}:n==="className"&&(t[n]=[i,c].filter(Boolean).join(" "))}return{...o,...t}}function qe(o){var n,i;let r=(n=Object.getOwnPropertyDescriptor(o.props,"ref"))==null?void 0:n.get,t=r&&"isReactWarning"in r&&r.isReactWarning;return t?o.ref:(r=(i=Object.getOwnPropertyDescriptor(o,"ref"))==null?void 0:i.get,t=r&&"isReactWarning"in r&&r.isReactWarning,t?o.props.ref:o.props.ref||o.ref)}function Fe(o){const r=o+"CollectionProvider",[t,n]=K(r),[i,c]=t(r,{collectionRef:{current:null},itemMap:new Map}),a=h=>{const{scope:x,children:y}=h,g=p.useRef(null),C=p.useRef(new Map).current;return e.jsx(i,{scope:x,itemMap:C,collectionRef:g,children:y})};a.displayName=r;const u=o+"CollectionSlot",m=p.forwardRef((h,x)=>{const{scope:y,children:g}=h,C=c(u,y),l=k(x,C.collectionRef);return e.jsx(O,{ref:l,children:g})});m.displayName=u;const f=o+"CollectionItemSlot",A="data-radix-collection-item",v=p.forwardRef((h,x)=>{const{scope:y,children:g,...C}=h,l=p.useRef(null),I=k(x,l),R=c(f,y);return p.useEffect(()=>(R.itemMap.set(l,{ref:l,...C}),()=>void R.itemMap.delete(l))),e.jsx(O,{[A]:"",ref:I,children:g})});v.displayName=f;function w(h){const x=c(o+"CollectionConsumer",h);return p.useCallback(()=>{const g=x.collectionRef.current;if(!g)return[];const C=Array.from(g.querySelectorAll(`[${A}]`));return Array.from(x.itemMap.values()).sort((R,P)=>C.indexOf(R.ref.current)-C.indexOf(P.ref.current))},[x.collectionRef,x.itemMap])}return[{Provider:a,Slot:m,ItemSlot:v},w,n]}var Le=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],E=Le.reduce((o,r)=>{const t=d.forwardRef((n,i)=>{const{asChild:c,...a}=n,u=c?O:r;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),e.jsx(u,{...a,ref:i})});return t.displayName=`Primitive.${r}`,{...o,[r]:t}},{}),Z="Collapsible",[Be,ue]=K(Z),[Ve,Q]=Be(Z),me=d.forwardRef((o,r)=>{const{__scopeCollapsible:t,open:n,defaultOpen:i,disabled:c,onOpenChange:a,...u}=o,[m=!1,f]=Y({prop:n,defaultProp:i,onChange:a});return e.jsx(Ve,{scope:t,disabled:c,contentId:le(),open:m,onOpenToggle:d.useCallback(()=>f(A=>!A),[f]),children:e.jsx(E.div,{"data-state":ee(m),"data-disabled":c?"":void 0,...u,ref:r})})});me.displayName=Z;var pe="CollapsibleTrigger",fe=d.forwardRef((o,r)=>{const{__scopeCollapsible:t,...n}=o,i=Q(pe,t);return e.jsx(E.button,{type:"button","aria-controls":i.contentId,"aria-expanded":i.open||!1,"data-state":ee(i.open),"data-disabled":i.disabled?"":void 0,disabled:i.disabled,...n,ref:r,onClick:de(o.onClick,i.onOpenToggle)})});fe.displayName=pe;var X="CollapsibleContent",ge=d.forwardRef((o,r)=>{const{forceMount:t,...n}=o,i=Q(X,o.__scopeCollapsible);return e.jsx(De,{present:t||i.open,children:({present:c})=>e.jsx($e,{...n,ref:r,present:c})})});ge.displayName=X;var $e=d.forwardRef((o,r)=>{const{__scopeCollapsible:t,present:n,children:i,...c}=o,a=Q(X,t),[u,m]=d.useState(n),f=d.useRef(null),A=k(r,f),v=d.useRef(0),w=v.current,h=d.useRef(0),x=h.current,y=a.open||u,g=d.useRef(y),C=d.useRef(void 0);return d.useEffect(()=>{const l=requestAnimationFrame(()=>g.current=!1);return()=>cancelAnimationFrame(l)},[]),Ee(()=>{const l=f.current;if(l){C.current=C.current||{transitionDuration:l.style.transitionDuration,animationName:l.style.animationName},l.style.transitionDuration="0s",l.style.animationName="none";const I=l.getBoundingClientRect();v.current=I.height,h.current=I.width,g.current||(l.style.transitionDuration=C.current.transitionDuration,l.style.animationName=C.current.animationName),m(n)}},[a.open,n]),e.jsx(E.div,{"data-state":ee(a.open),"data-disabled":a.disabled?"":void 0,id:a.contentId,hidden:!y,...c,ref:A,style:{"--radix-collapsible-content-height":w?`${w}px`:void 0,"--radix-collapsible-content-width":x?`${x}px`:void 0,...o.style},children:y&&i})});function ee(o){return o?"open":"closed"}var Ge=me,We=fe,Je=ge,j="Accordion",ze=["Home","End","ArrowDown","ArrowUp","ArrowLeft","ArrowRight"],[oe,Ue,Ke]=Fe(j),[q,At]=K(j,[Ke,ue]),te=ue(),Ce=p.forwardRef((o,r)=>{const{type:t,...n}=o,i=n,c=n;return e.jsx(oe.Provider,{scope:o.__scopeAccordion,children:t==="multiple"?e.jsx(Xe,{...c,ref:r}):e.jsx(Qe,{...i,ref:r})})});Ce.displayName=j;var[he,Ye]=q(j),[xe,Ze]=q(j,{collapsible:!1}),Qe=p.forwardRef((o,r)=>{const{value:t,defaultValue:n,onValueChange:i=()=>{},collapsible:c=!1,...a}=o,[u,m]=Y({prop:t,defaultProp:n,onChange:i});return e.jsx(he,{scope:o.__scopeAccordion,value:u?[u]:[],onItemOpen:m,onItemClose:p.useCallback(()=>c&&m(""),[c,m]),children:e.jsx(xe,{scope:o.__scopeAccordion,collapsible:c,children:e.jsx(Ae,{...a,ref:r})})})}),Xe=p.forwardRef((o,r)=>{const{value:t,defaultValue:n,onValueChange:i=()=>{},...c}=o,[a=[],u]=Y({prop:t,defaultProp:n,onChange:i}),m=p.useCallback(A=>u((v=[])=>[...v,A]),[u]),f=p.useCallback(A=>u((v=[])=>v.filter(w=>w!==A)),[u]);return e.jsx(he,{scope:o.__scopeAccordion,value:a,onItemOpen:m,onItemClose:f,children:e.jsx(xe,{scope:o.__scopeAccordion,collapsible:!0,children:e.jsx(Ae,{...c,ref:r})})})}),[eo,F]=q(j),Ae=p.forwardRef((o,r)=>{const{__scopeAccordion:t,disabled:n,dir:i,orientation:c="vertical",...a}=o,u=p.useRef(null),m=k(u,r),f=Ue(t),v=He(i)==="ltr",w=de(o.onKeyDown,h=>{var ne;if(!ze.includes(h.key))return;const x=h.target,y=f().filter(J=>{var ie;return!((ie=J.ref.current)!=null&&ie.disabled)}),g=y.findIndex(J=>J.ref.current===x),C=y.length;if(g===-1)return;h.preventDefault();let l=g;const I=0,R=C-1,P=()=>{l=g+1,l>R&&(l=I)},W=()=>{l=g-1,l<I&&(l=R)};switch(h.key){case"Home":l=I;break;case"End":l=R;break;case"ArrowRight":c==="horizontal"&&(v?P():W());break;case"ArrowDown":c==="vertical"&&P();break;case"ArrowLeft":c==="horizontal"&&(v?W():P());break;case"ArrowUp":c==="vertical"&&W();break}const Re=l%C;(ne=y[Re].ref.current)==null||ne.focus()});return e.jsx(eo,{scope:t,disabled:n,direction:i,orientation:c,children:e.jsx(oe.Slot,{scope:t,children:e.jsx(E.div,{...a,"data-orientation":c,ref:m,onKeyDown:n?void 0:w})})})}),M="AccordionItem",[oo,re]=q(M),ve=p.forwardRef((o,r)=>{const{__scopeAccordion:t,value:n,...i}=o,c=F(M,t),a=Ye(M,t),u=te(t),m=le(),f=n&&a.value.includes(n)||!1,A=c.disabled||o.disabled;return e.jsx(oo,{scope:t,open:f,disabled:A,triggerId:m,children:e.jsx(Ge,{"data-orientation":c.orientation,"data-state":we(f),...u,...i,ref:r,disabled:A,open:f,onOpenChange:v=>{v?a.onItemOpen(n):a.onItemClose(n)}})})});ve.displayName=M;var ye="AccordionHeader",Ie=p.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,i=F(j,t),c=re(ye,t);return e.jsx(E.h3,{"data-orientation":i.orientation,"data-state":we(c.open),"data-disabled":c.disabled?"":void 0,...n,ref:r})});Ie.displayName=ye;var U="AccordionTrigger",Te=p.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,i=F(j,t),c=re(U,t),a=Ze(U,t),u=te(t);return e.jsx(oe.ItemSlot,{scope:t,children:e.jsx(We,{"aria-disabled":c.open&&!a.collapsible||void 0,"data-orientation":i.orientation,id:c.triggerId,...u,...n,ref:r})})});Te.displayName=U;var be="AccordionContent",je=p.forwardRef((o,r)=>{const{__scopeAccordion:t,...n}=o,i=F(j,t),c=re(be,t),a=te(t);return e.jsx(Je,{role:"region","aria-labelledby":c.triggerId,"data-orientation":i.orientation,...a,...n,ref:r,style:{"--radix-accordion-content-height":"var(--radix-collapsible-content-height)","--radix-accordion-content-width":"var(--radix-collapsible-content-width)",...o.style}})});je.displayName=be;function we(o){return o?"open":"closed"}var to=Ce,ro=ve,no=Ie,io=Te,co=je;const ao="_rootBorder_1iv74_1",so="_accordionItem_1iv74_6",lo="_accordionTrigger_1iv74_12",uo="_accordionCaret_1iv74_29",mo="_accordionContent_1iv74_33",po="_accordionContentText_1iv74_39",fo="_accordionContentTextNoPadding_1iv74_44",go="_accordionContentTextDivider_1iv74_48",Co="_slideDown_1iv74_1",ho="_slideUp_1iv74_1",b={rootBorder:ao,accordionItem:so,accordionTrigger:lo,accordionCaret:uo,accordionContent:mo,accordionContentText:po,accordionContentTextNoPadding:fo,accordionContentTextDivider:go,slideDown:Co,slideUp:ho},L=({"data-test-id":o="fondue-accordion",border:r=!0,children:t,className:n,defaultValue:i,disabled:c,value:a})=>e.jsx(to,{className:N([b.root,r&&b.rootBorder,n]),"data-test-id":o,defaultValue:i,disabled:c,type:"multiple",value:a,children:t});L.displayName="Accordion.Root";const B=({"data-test-id":o="fondue-accordion-item",children:r,className:t,disabled:n,onClick:i,value:c})=>e.jsx(ro,{className:N([b.accordionItem,t]),value:c,onPointerDown:a=>{a.currentTarget.dataset.showFocusRing="false"},onBlur:a=>{a.currentTarget.dataset.showFocusRing="true"},onClick:i,disabled:n,"data-test-id":o,children:r});B.displayName="Accordion.Item";const V=({children:o,className:r})=>e.jsx(no,{className:N([r]),children:o});V.displayName="Accordion.Header";const $=({"data-test-id":o="fondue-accordion-trigger",children:r,className:t})=>e.jsxs(io,{className:N([b.accordionTrigger,t]),"data-test-id":o,children:[r,e.jsx(_e,{className:b.accordionCaret,size:"16"})]});$.displayName="Accordion.Trigger";const G=({"data-test-id":o="collapsible-wrap",children:r,className:t,divider:n,onClick:i,padding:c=!0})=>e.jsx(co,{className:N([b.accordionContent,t]),onClick:i,"data-test-id":o,children:e.jsx("div",{className:N([b.accordionContentText,!c&&b.accordionContentTextNoPadding,n&&b.accordionContentTextDivider]),"data-test-id":`inner-${o}`,children:r})});G.displayName="Accordion.Content";const s={Root:L,Item:B,Header:V,Trigger:$,Content:G};L.__docgenInfo={description:"",methods:[],displayName:"Accordion.Root",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion'",computed:!1}},border:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""}}};B.__docgenInfo={description:"",methods:[],displayName:"Accordion.Item",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-item'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:""},value:{required:!0,tsType:{name:"string"},description:""}}};V.__docgenInfo={description:"",methods:[],displayName:"Accordion.Header",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};$.__docgenInfo={description:"",methods:[],displayName:"Accordion.Trigger",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'fondue-accordion-trigger'",computed:!1}}}};G.__docgenInfo={description:"",methods:[],displayName:"Accordion.Content",props:{"data-test-id":{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'collapsible-wrap'",computed:!1}},children:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},divider:{required:!1,tsType:{name:"boolean"},description:""},onClick:{required:!1,tsType:{name:"MouseEventHandler",elements:[{name:"HTMLDivElement"}],raw:"MouseEventHandler<HTMLDivElement>"},description:""},padding:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const vt={component:L,tags:["autodocs"],subcomponents:{"Accordion.Item":B,"Accordion.Header":V,"Accordion.Trigger":$,"Accordion.Content":G},parameters:{status:{type:"in_progress"}},args:{}},H={args:{},render:()=>{const[o,r]=d.useState(!0),[t,n]=d.useState(!0);return e.jsxs(s.Root,{children:[e.jsxs(s.Item,{value:"accordion-test-0",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:e.jsxs("div",{className:"tw-flex tw-gap-2",children:[e.jsx(Ne,{}),"Item with icon"]})})}),e.jsx(s.Content,{divider:!0,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(s.Item,{value:"accordion-test-1",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Item with plain text child"})}),e.jsx(s.Content,{children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]}),e.jsxs(s.Item,{value:"accordion-test-2",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Item with dropdown child"})}),e.jsxs(s.Content,{children:[e.jsxs(_.Root,{children:[e.jsx(_.Trigger,{children:e.jsx(S,{children:"Trigger"})}),e.jsxs(_.Content,{children:[e.jsx(_.Item,{onSelect:function(){},children:"Item 1"}),e.jsx(_.Item,{onSelect:function(){},children:"Item 2"}),e.jsx(_.Item,{onSelect:function(){},children:"Item 3"})]})]})," "]})]}),e.jsxs(s.Item,{value:"accordion-test-3",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Item with flyout child"})}),e.jsx(s.Content,{children:e.jsxs(T.Root,{children:[e.jsx(T.Trigger,{children:e.jsx(S,{children:"Trigger"})}),e.jsx(T.Content,{children:e.jsx(T.Body,{children:"Hello!"})})]})})]}),e.jsxs(s.Item,{value:"accordion-test-4",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Item with color picker flyout"})}),e.jsx(s.Content,{children:e.jsxs(T.Root,{open:o,onOpenChange:r,children:[e.jsx(T.Trigger,{children:e.jsx(D.Input,{"aria-label":"Color Picker",currentColor:{alpha:.8,blue:50,green:100,red:230},onClear:function(){}})}),e.jsxs(T.Content,{maxWidth:"600px",children:[e.jsx(T.Body,{children:e.jsx("div",{className:"tw-p-2 md:tw-w-[450px]",children:e.jsxs(D.Root,{defaultFormat:"RGBA",currentColor:{alpha:.8,blue:50,green:100,red:230},onColorChange:function(){},children:[e.jsx(D.Values,{}),e.jsx(D.Gradient,{})]})})}),e.jsxs(T.Footer,{children:[e.jsx(S,{emphasis:"default",onPress:function(){},children:"Cancel"}),e.jsx(S,{onPress:function(){},children:"Save"})]})]})]})})]}),e.jsxs(s.Item,{value:"accordion-test-5",onClick:()=>Pe("click"),children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Empty item with an onClick callback"})}),e.jsx(s.Content,{})]}),e.jsxs(s.Item,{value:"accordion-test-6",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Item with resizable content"})}),e.jsxs(s.Content,{children:[e.jsx("div",{className:t?"":"tw-hidden",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}),e.jsx(S,{onPress:()=>n(!t),children:"Toggle Content"})]})]}),e.jsxs(s.Item,{value:"accordion-test-7",children:[e.jsx(s.Header,{children:e.jsx(s.Trigger,{children:"Item without padding"})}),e.jsx(s.Content,{padding:!1,children:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."})]})]})}};var ce,ae,se;H.parameters={...H.parameters,docs:{...(ce=H.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  args: {},
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showContent, setShowContent] = useState(true);
    return <Accordion.Root>
                <Accordion.Item value="accordion-test-0">
                    <Accordion.Header>
                        <Accordion.Trigger>
                            <div className="tw-flex tw-gap-2">
                                <IconIcon />
                                Item with icon
                            </div>
                        </Accordion.Trigger>
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
                        <Accordion.Trigger>Item with plain text child</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-2">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with dropdown child</Accordion.Trigger>
                    </Accordion.Header>
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
                        </Dropdown.Root>{' '}
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-3">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with flyout child</Accordion.Trigger>
                    </Accordion.Header>
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
                    <Accordion.Header>
                        <Accordion.Trigger>Item with color picker flyout</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Flyout.Root open={isOpen} onOpenChange={setIsOpen}>
                            <Flyout.Trigger>
                                <ColorPicker.Input aria-label="Color Picker" currentColor={{
                alpha: 0.8,
                blue: 50,
                green: 100,
                red: 230
              }} onClear={function () {}} />
                            </Flyout.Trigger>
                            <Flyout.Content maxWidth="600px">
                                <Flyout.Body>
                                    <div className="tw-p-2 md:tw-w-[450px]">
                                        <ColorPicker.Root defaultFormat="RGBA" currentColor={{
                    alpha: 0.8,
                    blue: 50,
                    green: 100,
                    red: 230
                  }} onColorChange={function () {}}>
                                            <ColorPicker.Values />
                                            <ColorPicker.Gradient />
                                        </ColorPicker.Root>
                                    </div>
                                </Flyout.Body>
                                <Flyout.Footer>
                                    <Button emphasis="default" onPress={function () {}}>
                                        Cancel
                                    </Button>
                                    <Button onPress={function () {}}>Save</Button>
                                </Flyout.Footer>
                            </Flyout.Content>
                        </Flyout.Root>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-5" onClick={() => action('click')}>
                    <Accordion.Header>
                        <Accordion.Trigger>Empty item with an onClick callback</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content />
                </Accordion.Item>

                <Accordion.Item value="accordion-test-6">
                    <Accordion.Header>
                        <Accordion.Trigger>Item with resizable content</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                        <div className={!showContent ? 'tw-hidden' : ''}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                        <Button onPress={() => setShowContent(!showContent)}>Toggle Content</Button>
                    </Accordion.Content>
                </Accordion.Item>

                <Accordion.Item value="accordion-test-7">
                    <Accordion.Header>
                        <Accordion.Trigger>Item without padding</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content padding={false}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>;
  }
}`,...(se=(ae=H.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};const yt=["Default"];export{H as Default,yt as __namedExportsOrder,vt as default};
