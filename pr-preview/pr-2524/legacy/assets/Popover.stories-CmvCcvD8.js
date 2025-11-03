import{r as a,j as e}from"./iframe-DHJNyQxo.js";import{B as j}from"./Button-Bz5l9fFw.js";import{C as T}from"./Container-D0-cD-HU.js";import{P as c}from"./Popover-BQWQWqqQ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D-qwnL_a.js";import{I as P}from"./IconIcon-BNQ-ve5p.js";import"./preload-helper-B3whO8fc.js";import"./useButton-DwubD-XP.js";import"./useFocusable-D5HdRnEL.js";import"./useFocusRing-DhzU2rzG.js";import"./useEffectEvent-DYQItPuc.js";import"./chain-B5RY7uR0.js";import"./index-BxGX3BcV.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C_iYJlA_.js";import"./borderStyle-D9jrV09G.js";import"./input-D_k0C73b.js";import"./Divider-BXeSGeKm.js";import"./Dropdown-d5_LYKcZ.js";import"./FocusScope-DX9B5RKj.js";import"./useOverlayTriggerState-BEkkRvA4.js";import"./useControlledState-DUIHJl1j.js";import"./useMenuTrigger-CjE0IAFF.js";import"./useLabels-CfNjFPp8.js";import"./useLocalizedStringFormatter-D1oZF1Ci.js";import"./context-BlFbVras.js";import"./VisuallyHidden-JaYy16_u.js";import"./helper-DQGEWuSf.js";import"./keyboard-C3lyFOtL.js";import"./SelectionManager-Br4fKZAs.js";import"./useField-54V9F_KU.js";import"./useFormValidationState-j_DXGcLe.js";import"./usePopper-CVebcDly.js";import"./index-BO7U6kLL.js";import"./MenuItem-BNKaaE7-.js";import"./IconCaretRight-C3fT22HC.js";import"./IconCheckMark-C0I6DwCb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DlwenYNP.js";import"./Trigger-DvjgR99v.js";import"./IconCaretDown-Dn1fGRBq.js";import"./IconCaretDown16-Bt3L5TZm.js";import"./IconCross-CeLFj-Tn.js";import"./IconTrashBin16-BgOvfRku.js";import"./IconTrashBin24-Ba6vzsX_.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DIZ4PN6h.js";import"./Portal-BBTX_6xk.js";import"./useMemoizedId-BjgiKJF8.js";import"./FormControl-D_wxmtI1.js";import"./InputLabel-BC2n9p1e.js";import"./TooltipIcon-sv_lbCi_.js";import"./LegacyTooltip-2VrwoOLQ.js";import"./useLink-C3wnjwwv.js";import"./IconExclamationMarkCircle24-GljXm9kR.js";import"./IconQuestionMarkCircle-C1-1BR4o.js";import"./Switch-fnjkMqwf.js";import"./TabItem-Czu4RU1S.js";import"./TextInput-DVwsuleh.js";import"./Tooltip-o6mjVQnL.js";import"./useClickOutside-CvOBOSKF.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D0c1EG9_.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-Bcm1eOQj.js";import"./IconIcon16-1P5WiTce.js";import"./IconIcon24-BS-upCXW.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
