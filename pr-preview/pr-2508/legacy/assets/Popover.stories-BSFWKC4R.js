import{r as p,j as e}from"./iframe-G9JT5kV6.js";import{B as j}from"./Button-Bab7Gocy.js";import{C as T}from"./Container-B4llDD3v.js";import{P as c}from"./Popover-D-OM7FjU.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DVD-it4x.js";import{I as P}from"./IconJohanna-C4neRtvt.js";import"./preload-helper-BT-T7auE.js";import"./useButton-DRJTCrJS.js";import"./useFocusable-_OrUWNR5.js";import"./useFocusRing-nqJc486L.js";import"./useEffectEvent-BtkyKS4G.js";import"./chain-Dq4AkA76.js";import"./index-ixDem6kg.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BXjR2_Z3.js";import"./borderStyle-D9jrV09G.js";import"./input-CyIEBhYg.js";import"./Divider-BphgxLdT.js";import"./Dropdown-DKBYnEUG.js";import"./FocusScope-BQmzPqxS.js";import"./useOverlayTriggerState-CMU_LIfs.js";import"./useControlledState-Cj5gkz49.js";import"./useMenuTrigger-BlRHj5bV.js";import"./useLabels-KuIW6JFx.js";import"./useLocalizedStringFormatter-M66PnT3E.js";import"./context-D-Ee0elB.js";import"./VisuallyHidden-e-4RAJYE.js";import"./helper-C4FDoqim.js";import"./keyboard-BKMGdIrx.js";import"./SelectionManager-BxHqVy6b.js";import"./useField-B7g4wq1Y.js";import"./useFormValidationState-CYiU8C3p.js";import"./usePopper-CO8wOoTT.js";import"./index-BIhVL1ld.js";import"./MenuItem-DdrQgOb6.js";import"./IconCaretRight-1JdDjgKO.js";import"./IconCheckMark-BSYvEIzf.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BnxRTcOc.js";import"./Trigger-B8TaoXJF.js";import"./IconCaretDown-CrHZrdXv.js";import"./IconCaretDown16-DcFtQQYB.js";import"./IconCross-Bqxox6ZH.js";import"./IconTrashBin16-C34r7-hb.js";import"./IconTrashBin24-D6DR5WcG.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-u-oEUjA8.js";import"./Portal-BaI4ybdx.js";import"./useMemoizedId-TQZvyQJc.js";import"./FormControl-Cp0g-HlA.js";import"./InputLabel-TK4YHNFL.js";import"./TooltipIcon-D4kwX34e.js";import"./LegacyTooltip-Dp6OP9ku.js";import"./useLink-CXoGfmc2.js";import"./IconExclamationMarkCircle24-Yrdvbpyd.js";import"./IconQuestionMarkCircle-COwcdCLG.js";import"./Switch-DK-d02t4.js";import"./TabItem-BJhUeMKX.js";import"./TextInput-CZsf1API.js";import"./Tooltip-CTni-LrV.js";import"./useClickOutside-Riqja6k4.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CEaSpKgj.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DCgtctLG.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
