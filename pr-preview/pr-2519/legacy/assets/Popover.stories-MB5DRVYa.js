import{r as a,j as e}from"./iframe-ZBzxbArn.js";import{B as j}from"./Button-BDszXWF0.js";import{C as T}from"./Container-BHBhaEFl.js";import{P as c}from"./Popover-CMvELKZQ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-vqSG40-8.js";import{I as P}from"./IconIcon-DZ1beHTx.js";import"./preload-helper-MprHWY6w.js";import"./useButton-i2vqacWa.js";import"./useFocusable-CPEvtC5T.js";import"./useFocusRing-BHpblf3W.js";import"./useEffectEvent-47HRTxvC.js";import"./chain-DAcxjXHC.js";import"./index-DbMVle2u.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BPqSCkPF.js";import"./borderStyle-D9jrV09G.js";import"./input-BzYoFFy5.js";import"./Divider-D9FhI6gu.js";import"./Dropdown-D6nN_xEs.js";import"./FocusScope-C4btTEqJ.js";import"./useOverlayTriggerState-2YbKRCVD.js";import"./useControlledState-C_9hrWzg.js";import"./useMenuTrigger-C7dQt0oA.js";import"./useLabels-C7dgcpc6.js";import"./useLocalizedStringFormatter-Bknzc5NA.js";import"./context-BVdZCpgd.js";import"./VisuallyHidden-VDRSVgn1.js";import"./helper-CleliKad.js";import"./keyboard-BdQ3GXnL.js";import"./SelectionManager-CO89k0Lp.js";import"./useField-BjLftB08.js";import"./useFormValidationState-LLEBpEZb.js";import"./usePopper-BRbvfqPp.js";import"./index-9u2jQVh5.js";import"./MenuItem-BeGU14ZQ.js";import"./IconCaretRight-B0NvaRgO.js";import"./IconCheckMark-CBm-qzwJ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CZUeI1Yx.js";import"./Trigger-C1CC5bMu.js";import"./IconCaretDown-SrDnbT9o.js";import"./IconCaretDown16-DuU1x2NN.js";import"./IconCross-DBdrJD8S.js";import"./IconTrashBin16-B73vZS1U.js";import"./IconTrashBin24-CEMMDIFd.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-z4dkC-j5.js";import"./Portal-C4FDx-2h.js";import"./useMemoizedId-Bd15RR4S.js";import"./FormControl-C7egNDZd.js";import"./InputLabel-DGt8GQku.js";import"./TooltipIcon-x4xHrbRJ.js";import"./LegacyTooltip-DSvGStx4.js";import"./useLink-Cp_DjxIu.js";import"./IconExclamationMarkCircle24--uZcXafv.js";import"./IconQuestionMarkCircle-qbD80NFS.js";import"./Switch-IjpeXAgT.js";import"./TabItem-BxymVC9K.js";import"./TextInput-DMUjBzmq.js";import"./Tooltip-B8A3rhwm.js";import"./useClickOutside-CLqSf55U.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bz3mC0DX.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-eemjMsXD.js";import"./IconIcon16-DBeDrwzf.js";import"./IconIcon24-CF83sLeV.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
