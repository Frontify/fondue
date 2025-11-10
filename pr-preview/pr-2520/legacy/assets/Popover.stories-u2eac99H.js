import{r as a,j as e}from"./iframe-BIfcB0X2.js";import{B as j}from"./Button-91rj7uoX.js";import{C as T}from"./Container-CsrDAVBz.js";import{P as c}from"./Popover-CejOPXTD.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BRPLl85B.js";import{I as P}from"./IconIcon-Br86oMen.js";import"./preload-helper-OAyExbmo.js";import"./useButton-CNkmC7oi.js";import"./useFocusable-C-Xc2xVU.js";import"./useFocusRing-DHqNp4Q2.js";import"./useEffectEvent-CMLs76Ad.js";import"./chain-CHiwi0M-.js";import"./index-7Pi3A3mt.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-elrIA08Y.js";import"./borderStyle-D9jrV09G.js";import"./input-DcJA_M-3.js";import"./DialogBody-CQ96piVe.js";import"./dialog-D9O7a7Fm.js";import"./Divider-CkgHySjX.js";import"./Dropdown-C1a2GcpH.js";import"./FocusScope-D7jXQngg.js";import"./useOverlayTriggerState-BhO5QHIL.js";import"./useControlledState-SEwrKaho.js";import"./useMenuTrigger-BD6skHKO.js";import"./useLabels-CMk8Wm_k.js";import"./useLocalizedStringFormatter-UOmZs1KX.js";import"./context-CHUpiE9N.js";import"./VisuallyHidden-CS9EO2FH.js";import"./helper-CBHI6ZXE.js";import"./keyboard-SS7VUtrh.js";import"./SelectionManager-BB2Ad0T1.js";import"./useField-B0yrenGR.js";import"./useFormValidationState-CEWVO4VP.js";import"./usePopper-BkMdSZz_.js";import"./index-CLa14mTA.js";import"./MenuItem-CFu7WrwK.js";import"./IconCaretRight-DQxktYqx.js";import"./IconCheckMark-oDrSz9RN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CGKGcPF-.js";import"./Trigger-CLH_zzC8.js";import"./IconCaretDown-ZGyRgcq_.js";import"./IconCaretDown16-CSzlluEg.js";import"./IconCross-Dd61QjlE.js";import"./IconTrashBin16-Cy88ODv0.js";import"./IconTrashBin24-DzKpy64m.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-MtFHkrDy.js";import"./Portal-DO3N8iZr.js";import"./useMemoizedId-xtDXxhrd.js";import"./FormControl-DEm4sFJ8.js";import"./InputLabel-DkmK5SvI.js";import"./TooltipIcon-CIj69YaR.js";import"./LegacyTooltip-DyWCUoLz.js";import"./useLink-DAFaRtwo.js";import"./IconExclamationMarkCircle24-De_lyuU4.js";import"./IconQuestionMarkCircle-24RFih0R.js";import"./Switch-CLXJPlE5.js";import"./TabItem-BYBKEXeI.js";import"./TextInput-o6gUNCmh.js";import"./Tooltip-C3lyOxpW.js";import"./useClickOutside-cvpeTtw3.js";import"./Tree-CmHyBzYA.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-CWq69Q4w.js";import"./IconIcon16-wm0nAQfe.js";import"./IconIcon24-DRqKBAxx.js";const Je={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ke=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ke as __namedExportsOrder,Je as default};
