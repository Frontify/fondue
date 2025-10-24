import{r as p,j as e}from"./iframe-xk1vLOp0.js";import{B as j}from"./Button-BDfk1GAp.js";import{C as T}from"./Container-DlcApUIN.js";import{P as c}from"./Popover-B0tEvzGo.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D1Rp3cke.js";import{I as P}from"./IconJohanna-BgjyQkVb.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DVBleBPx.js";import"./useFocusable-DMpt9YP_.js";import"./useFocusRing-Cd2XRZg0.js";import"./useEffectEvent-BjDNl9OE.js";import"./chain-Ct5H3mE4.js";import"./index-CfHX2Wg2.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-mEuDaPks.js";import"./borderStyle-D9jrV09G.js";import"./input-DQi93OXc.js";import"./Checkbox-BDHm3nmY.js";import"./useFormValidationState-C4HEZm9c.js";import"./useControlledState-sFywO5I-.js";import"./InputLabel-CKCtkZJu.js";import"./TooltipIcon-CjhCXMFE.js";import"./LegacyTooltip-DFmu5-8O.js";import"./useLink-BuoFStRX.js";import"./usePopper-Ja3ynHP-.js";import"./index-v42I2N6P.js";import"./Portal-CcS2aujD.js";import"./useMemoizedId-DNCYjqen.js";import"./IconCheckMark-CZRtbEQD.js";import"./IconExclamationMarkCircle24-D7sTGgkk.js";import"./IconQuestionMarkCircle-BvBztHwq.js";import"./IconMinus-CyK0suNY.js";import"./Divider-c1srpwsu.js";import"./Dropdown-D4CKN3Yl.js";import"./FocusScope-EbRQ0Guv.js";import"./useOverlayTriggerState-D-Z8dNYM.js";import"./useMenuTrigger-DHZu3ZPY.js";import"./useLabels-lxgQttMN.js";import"./useLocalizedStringFormatter-i_SGUCjN.js";import"./context-BZ0Ub6M7.js";import"./VisuallyHidden-CR78Mz5T.js";import"./helper-Cai0qWzg.js";import"./keyboard-yMV5D90t.js";import"./SelectionManager-BOLg2PNO.js";import"./useField-Bu-QY__9.js";import"./MenuItem-fUS3Gbeo.js";import"./IconCaretRight-BbznFg1A.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BJF6o0jm.js";import"./Trigger-BJxh1iXv.js";import"./IconCaretDown-x05uh9Bd.js";import"./IconCaretDown16-Dah412Df.js";import"./IconCross-_hgb6uSI.js";import"./IconTrashBin16-BRdjN3Qb.js";import"./IconTrashBin24-CFcOsdbb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DxmYvQ98.js";import"./FormControl-pa0Ro9Q8.js";import"./Switch-CeWE716z.js";import"./TabItem-D54vmuw7.js";import"./TextInput-Bof6OvPM.js";import"./Tooltip-D0_Z4MgN.js";import"./useClickOutside-WTAjM1BO.js";import"./dialog-D9O7a7Fm.js";import"./Tree-eLoCCjyC.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-Dcd-X1K7.js";const Ye={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const qe=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,qe as __namedExportsOrder,Ye as default};
