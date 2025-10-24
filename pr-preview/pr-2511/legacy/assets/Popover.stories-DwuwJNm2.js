import{r as a,j as e}from"./iframe-DWfSlb0i.js";import{B as j}from"./Button-DfZJCDFK.js";import{C as T}from"./Container-nuMqg3qH.js";import{P as c}from"./Popover-CL1qwc2Q.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BTKn1CzC.js";import{I as P}from"./IconIcon-CQsZulAl.js";import"./preload-helper-sQDyWCwb.js";import"./useButton-kVvP6TUN.js";import"./useFocusable-DOCSmQza.js";import"./useFocusRing-DXr4GaW4.js";import"./useEffectEvent-CI6MWEdz.js";import"./chain-BD6ckHh_.js";import"./index-RS2pu7zh.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B8vdQMYS.js";import"./borderStyle-D9jrV09G.js";import"./input-DJgw3DOR.js";import"./Checkbox-3AnZEutj.js";import"./useFormValidationState-A3yoOfI8.js";import"./useControlledState-DnAESSBa.js";import"./InputLabel-vAeK8DpM.js";import"./TooltipIcon-loeESxcb.js";import"./LegacyTooltip-8KnSS8qw.js";import"./useLink-DD_m4zw3.js";import"./usePopper-DE0FsvRn.js";import"./index-C2E5ku4L.js";import"./Portal--5uNvX5p.js";import"./useMemoizedId-D3p_iY0w.js";import"./IconCheckMark-CWf5DU7H.js";import"./IconExclamationMarkCircle24-CzamvZqc.js";import"./IconQuestionMarkCircle-BhvUbj5E.js";import"./IconMinus-DuFXUXkh.js";import"./Divider-DnBABlP5.js";import"./Dropdown-BHsiTQV7.js";import"./FocusScope-BTNrxNkp.js";import"./useOverlayTriggerState-DWWP11B4.js";import"./useMenuTrigger-Du4Opddv.js";import"./useLabels-CvtAt0UP.js";import"./useLocalizedStringFormatter-C7DvXs9K.js";import"./context-hKhapaoN.js";import"./VisuallyHidden-DZNryNZ3.js";import"./helper-vBDadUUD.js";import"./keyboard-CWtqk4ZZ.js";import"./SelectionManager-zjrIR6Hq.js";import"./useField-Bh5nUEEB.js";import"./MenuItem-CVfzkKbS.js";import"./IconCaretRight-B8cJ3Bt3.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C5zj3N-A.js";import"./Trigger-BpYCVTVr.js";import"./IconCaretDown-CS4fl5qd.js";import"./IconCaretDown16-DXYTdGKY.js";import"./IconCross-BkSH3053.js";import"./IconTrashBin16-C5mIjvXn.js";import"./IconTrashBin24-B9qsB300.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-T0srCoF2.js";import"./FormControl-ny2reeax.js";import"./Switch-D2be-V_f.js";import"./TabItem-C-vbuzzy.js";import"./TextInput-_VQAd_TX.js";import"./Tooltip-jPx8IgnA.js";import"./useClickOutside-C0rCeFHZ.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ClX99oC1.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BF-tkgi1.js";import"./IconIcon16-CxY4vcIz.js";import"./IconIcon24-CwAEmp0G.js";const Ke={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Qe=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Qe as __namedExportsOrder,Ke as default};
