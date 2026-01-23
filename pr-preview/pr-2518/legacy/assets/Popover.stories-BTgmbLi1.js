import{r as a,j as e}from"./iframe-EAnBKUwW.js";import{B as j}from"./Button-C4jHKFK9.js";import{C as T}from"./Container-BygtFE47.js";import{P as c}from"./Popover-CnYP8OTZ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CeH_KVhG.js";import{I as P}from"./IconIcon-7uc21ay7.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-41t4cyxA.js";import"./useFocusable-DuI7dfbU.js";import"./useFocusRing-BeQFm_V6.js";import"./useEffectEvent-C1lqxX7E.js";import"./chain-EmpxMCW5.js";import"./index-Dr4nN6b0.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-0XmEUewe.js";import"./borderStyle-D9jrV09G.js";import"./input-DkaDrsIb.js";import"./Divider-gBEEXaWE.js";import"./Dropdown-B1Lt8Byy.js";import"./FocusScope-BJLWHjPu.js";import"./useOverlayTriggerState-B3smdlTO.js";import"./useControlledState-CN3IzYYN.js";import"./useMenuTrigger-DLcyDwsq.js";import"./useLabels-DEWZbhOx.js";import"./useLocalizedStringFormatter-C6X_Q_bB.js";import"./context-2GLmmQTX.js";import"./VisuallyHidden-CzVGMPQV.js";import"./helper-CdIpQeou.js";import"./keyboard-BZ6b5TUF.js";import"./SelectionManager-b5QLYy5C.js";import"./useField-DvYtj8qk.js";import"./useFormValidationState-Dre4cyXl.js";import"./usePopper-CPetpVYB.js";import"./index-qBGALtzT.js";import"./MenuItem-C6Fjlc4C.js";import"./IconCaretRight-DII2jJiv.js";import"./IconCheckMark-CnYP4iYd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D5gsxc0H.js";import"./Trigger-C6t7XVPV.js";import"./IconCaretDown-CEoAVXN2.js";import"./IconCaretDown16-DTXLKGRf.js";import"./IconCross-CQ3qrcPd.js";import"./IconTrashBin16-C38eKVWH.js";import"./IconTrashBin24-hC-tYyNL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-D4qhEscH.js";import"./Portal-BZCteqHW.js";import"./useMemoizedId-C0HR5vRU.js";import"./FormControl-DuADWXuI.js";import"./InputLabel-ChnK1EbS.js";import"./TooltipIcon-BQSnXH9l.js";import"./LegacyTooltip-BJW8lT4k.js";import"./useLink-BYCWLkC0.js";import"./IconExclamationMarkCircle24-B2fHNFvs.js";import"./IconQuestionMarkCircle-C1HsKCLB.js";import"./Switch-D3-ZBx8j.js";import"./TabItem-D5lxDox0.js";import"./TextInput-B06f0icZ.js";import"./Tooltip-mn7uGpA2.js";import"./useClickOutside-BbI0dQrT.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BIAzcwgb.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DKmb3WiR.js";import"./IconIcon16-BBbsSMmW.js";import"./IconIcon24-DULi7rhw.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(g=(d=n.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,h,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(O=(h=o.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};var w,I,x;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(x=(I=s.parameters)==null?void 0:I.docs)==null?void 0:x.source}}};var C,v,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Je=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Je as __namedExportsOrder,qe as default};
