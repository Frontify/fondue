import{j as e}from"./jsx-runtime-DF2Pcvd1.js";import{r as p}from"./index-B2-qRKKC.js";import{c as j}from"./Button-DoFA_mR5.js";import{C as T}from"./Container-CIvWQma5.js";import{P as c}from"./Popover-DT6yK9yu.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as y}from"./IconExclamationMarkTriangle-BrhtYKnY.js";import{I as P}from"./IconJohanna-iR26Notd.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useButton-Z8es05E6.js";import"./useFocusable-DCA70-1P.js";import"./useFocusRing-T6RsE8HB.js";import"./useEffectEvent-Bx4XsOxK.js";import"./chain-DrsK4odg.js";import"./index-CFX93qP1.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-BtNTXUM4.js";import"./merge-DI-veSMP.js";import"./Box-k395mu2x.js";import"./borderStyle-D9jrV09G.js";import"./input-CeGPAb6o.js";import"./Divider-DRaE_xlp.js";import"./FormControl-B8TbJ5rk.js";import"./InputLabel-WEPdRWrP.js";import"./TooltipIcon-CY0t6Z-W.js";import"./LegacyTooltip-BNHnu4B-.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./Portal-CuQPhhwF.js";import"./useMemoizedId-BB39KVn8.js";import"./IconCheckMark-Db5JnUcj.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-DyxURJrK.js";import"./Switch-apMPr6mO.js";import"./TabItem-B3Gc2cXC.js";import"./elements-BOYmskOL.js";import"./TextInput-D-QE4MGv.js";import"./IconCross-Bq7BKjxu.js";import"./Tooltip-zb4ozB6j.js";import"./useClickOutside-ChWTKoTa.js";import"./EnablePortalWrapper-C3Ay3AqL.js";import"./dialog-Dre1eVQK.js";import"./Tree-DPGsNpw7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DH3ouR-2.js";import"./IconCaretDown-CAp4CI-i.js";import"./IconCaretDown16-CINgO7jA.js";import"./IconTrashBin16-DHeQSCR9.js";import"./IconTrashBin24-D7tnFyiH.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";const Pe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,h,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <button type="button" ref={triggerRef} className="tw-flex tw-items-center" onMouseEnter={() => setIsOpen(true)} onFocus={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} onBlur={() => setIsOpen(false)}>
                <span className="tw-mr-1">Information</span> <IconExclamationMarkTriangle16 />
            </button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(O=(h=o.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};var w,x,C;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var I,v,R;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const ke=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,ke as __namedExportsOrder,Pe as default};
