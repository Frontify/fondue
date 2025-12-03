import{r as a,j as e}from"./iframe-C_GHvEZT.js";import{B as j}from"./Button-CQIP-Mg7.js";import{C as T}from"./Container-COsAx09v.js";import{P as c}from"./Popover-XnIH5Hxc.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-yZZexPcC.js";import{I as P}from"./IconIcon-CJF9oIkb.js";import"./preload-helper-OAyExbmo.js";import"./useButton-C7l_P4Iy.js";import"./useFocusable-C2iFP6iC.js";import"./useFocusRing-CJnEQ5am.js";import"./useEffectEvent-DAjv-Jen.js";import"./chain-6Jk1-UC4.js";import"./index-QJjDQ7Xf.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Cip11ddf.js";import"./borderStyle-D9jrV09G.js";import"./input-DWfECB1-.js";import"./Divider-yIGg7oPq.js";import"./Dropdown-D_WKyz9W.js";import"./FocusScope-B7wUO5Zj.js";import"./useOverlayTriggerState-Cp0OKtOG.js";import"./useControlledState-PjtM5WBE.js";import"./useMenuTrigger-Dcmx8nxf.js";import"./useLabels-CwKCfnBg.js";import"./useLocalizedStringFormatter-CPtoQqLu.js";import"./context-CWf9WvL2.js";import"./VisuallyHidden-Mw1FRbj3.js";import"./helper-kkuNsIZ9.js";import"./keyboard-BhRelnxJ.js";import"./SelectionManager-g-kljnEN.js";import"./useField-Bor0JvY9.js";import"./useFormValidationState-BbZ2eqzz.js";import"./usePopper-m4Bd7R8k.js";import"./index-CO1OXd26.js";import"./MenuItem-B91LYjLU.js";import"./IconCaretRight-Bcj82g9d.js";import"./IconCheckMark-BAqkuMY0.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DOm0I8Jz.js";import"./Trigger-BlSq6oYu.js";import"./IconCaretDown-CNstUptU.js";import"./IconCaretDown16-Dj8XnOCu.js";import"./IconCross-BC056rW2.js";import"./IconTrashBin16-C5OpDg77.js";import"./IconTrashBin24-BfqsuaLi.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-dLxVMZI8.js";import"./Portal-DtuayT2h.js";import"./useMemoizedId-q3VnK7Ir.js";import"./FormControl-DcjwG3O_.js";import"./InputLabel-CefsbhdV.js";import"./TooltipIcon-Vxr-uYi6.js";import"./LegacyTooltip-RHdatcnr.js";import"./useLink-CS0k3SZc.js";import"./IconExclamationMarkCircle24-yNkh65l8.js";import"./IconQuestionMarkCircle-CBe0CFaE.js";import"./Switch-B_kakr_h.js";import"./TabItem-Dd-JX1VM.js";import"./TextInput-Cf5p4-Xc.js";import"./Tooltip-CvP4Pgth.js";import"./useClickOutside-BcxbmJP1.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D-LlCZ9K.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-D9T-eMHY.js";import"./IconIcon16-BbJwZtGO.js";import"./IconIcon24-Dn_YClL_.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
