import{r as p,j as e}from"./iframe-D7sy4xpx.js";import{B as j}from"./Button-DEB8PLLZ.js";import{C as T}from"./Container-B9qx-ARw.js";import{P as c}from"./Popover-D7rVN-5I.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BfrYu7jT.js";import{I as P}from"./IconJohanna-DKArDACk.js";import"./preload-helper-D5qcpbyD.js";import"./useButton-BzdN_3XI.js";import"./useFocusable-b3_Iq_aJ.js";import"./useFocusRing-WiOBaN36.js";import"./useEffectEvent-DlN4b1VG.js";import"./chain-BymMFmeJ.js";import"./index-DwQQnJlT.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-S-zoCEGs.js";import"./borderStyle-D9jrV09G.js";import"./input-4t-GCPBE.js";import"./DialogBody-BBgUIDr9.js";import"./dialog-D9O7a7Fm.js";import"./Divider-SPqxn73n.js";import"./Dropdown-Bu55er1w.js";import"./FocusScope-i-5CSdu1.js";import"./useOverlayTriggerState-BcGtZFB6.js";import"./useControlledState-DwGGjx3X.js";import"./useMenuTrigger-Dvlm422P.js";import"./useLabels-Blyommyn.js";import"./useLocalizedStringFormatter-DvaMBSMR.js";import"./context-B61iDk61.js";import"./VisuallyHidden-CeceVG54.js";import"./helper-ChSewBYb.js";import"./keyboard-BoxrP_Gl.js";import"./SelectionManager-vVt0pswu.js";import"./useField-B01EU0XD.js";import"./useFormValidationState-D9XgnKSN.js";import"./usePopper-CJvB9LLR.js";import"./index-3l7JjlNh.js";import"./MenuItem-CvdFQWLC.js";import"./IconCaretRight-grzHKMpF.js";import"./IconCheckMark-CIqMCS41.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BQ0evsM9.js";import"./Trigger-DJDqn6_h.js";import"./IconCaretDown-BcvnAaV6.js";import"./IconCaretDown16-C1emQBb_.js";import"./IconCross-drLq2WNq.js";import"./IconTrashBin16-CZgyFd-i.js";import"./IconTrashBin24-D7P9aEXw.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-fTgbhwPV.js";import"./Portal-B_6AOlsI.js";import"./useMemoizedId-CwwPF4gy.js";import"./FormControl-D5oAbp8P.js";import"./InputLabel-CYvYAlW9.js";import"./TooltipIcon-BGEDG3-W.js";import"./LegacyTooltip-cn45ntVE.js";import"./useLink-CL4VGZfG.js";import"./IconExclamationMarkCircle24-D5O0dO8v.js";import"./IconQuestionMarkCircle-C2ycqPAW.js";import"./Switch-DPWAfSEu.js";import"./TabItem-Chmjtcut.js";import"./TextInput-Bx10SaWy.js";import"./Tooltip-Bg8kSzf3.js";import"./useClickOutside-OCCiafFp.js";import"./Tree-CCvSBT-2.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-CUOt1Yz_.js";const Ge={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ye=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ye as __namedExportsOrder,Ge as default};
