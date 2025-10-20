import{r as p,j as e}from"./iframe-rp4tXvK6.js";import{B as j}from"./Button-K5oMp-8A.js";import{C as T}from"./Container-BEatHDCd.js";import{P as c}from"./Popover-vB1xDEQ2.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DiSrNeKR.js";import{I as P}from"./IconJohanna-DvP2DKcr.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-Br0F6n1W.js";import"./useFocusable-BXSsLKfC.js";import"./useFocusRing-CWvOmuKZ.js";import"./useEffectEvent-B0iZo-5j.js";import"./chain-4_YXu52x.js";import"./index-BiHInXmF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-2dTAdpb8.js";import"./borderStyle-D9jrV09G.js";import"./input-BhBf-420.js";import"./Divider-BqYvBMoL.js";import"./Dropdown-CxVEn7Ee.js";import"./FocusScope-DS4FnLeH.js";import"./useOverlayTriggerState-BEZ2lrWP.js";import"./useControlledState-CX_cH9Ot.js";import"./useMenuTrigger-AUhvJe9v.js";import"./useLabels-CK5UeFmu.js";import"./useLocalizedStringFormatter-CJs-_R01.js";import"./context-Bt6ZMdHa.js";import"./VisuallyHidden-wRfshC6s.js";import"./helper-DAqcxCSd.js";import"./keyboard-Dl2NWKmf.js";import"./SelectionManager-BL4wQlQg.js";import"./useField-CvqfyaBW.js";import"./useFormValidationState-BWKkO5l0.js";import"./usePopper-D4FJxQQU.js";import"./index-BYPbgCc9.js";import"./MenuItem-DrfZk6bm.js";import"./IconCaretRight-C06zx3vP.js";import"./IconCheckMark-BGU497N_.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-jwtl8KLB.js";import"./Trigger-B0mWSjy0.js";import"./IconCaretDown-2pKBTVXl.js";import"./IconCaretDown16-0TQW92SM.js";import"./IconCross-BdcwsUq9.js";import"./IconTrashBin16-7vreT6af.js";import"./IconTrashBin24-DBiRwG0M.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DCsum9UA.js";import"./Portal-C6lyvz6z.js";import"./useMemoizedId-Crrjl7nt.js";import"./FormControl-DJASPagM.js";import"./InputLabel-CFfHIgFB.js";import"./TooltipIcon-BQzsb3pk.js";import"./LegacyTooltip-DSvPmMNC.js";import"./useLink-B7X21rmN.js";import"./IconExclamationMarkCircle24-XfyTkQV4.js";import"./IconQuestionMarkCircle-xJoVN4sY.js";import"./Switch-CCAjHMbz.js";import"./TabItem-lQw6FqM2.js";import"./TextInput-CrXCZLZg.js";import"./Tooltip-BofyqpBt.js";import"./useClickOutside-XwQX8AXH.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DUNDCnFz.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-wUfSIYbA.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ge=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ge as __namedExportsOrder,ze as default};
