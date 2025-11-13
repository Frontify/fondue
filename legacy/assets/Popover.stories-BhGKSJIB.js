import{r as a,j as e}from"./iframe-D5jKmvFy.js";import{B as j}from"./Button-DwCG1rzi.js";import{C as T}from"./Container-DLkhKhAG.js";import{P as c}from"./Popover-Dz3Wc4MT.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D8faLJTj.js";import{I as P}from"./IconIcon-CEFqKicA.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-BSs9oz24.js";import"./useFocusable-BgFDsCFo.js";import"./useFocusRing-CF_DgWy2.js";import"./useEffectEvent-COAqNv_C.js";import"./chain-VjPdPKMz.js";import"./index-DwAO_Mfr.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-B-f6EHAA.js";import"./borderStyle-D9jrV09G.js";import"./input-Cuuz4wSk.js";import"./Divider-Bvj5EVjz.js";import"./Dropdown-DZN4seAd.js";import"./FocusScope-IhAlz2x1.js";import"./useOverlayTriggerState-LoBAR65Z.js";import"./useControlledState-CYZEwJbA.js";import"./useMenuTrigger-CRlHAnCk.js";import"./useLabels-DQCmoryD.js";import"./useLocalizedStringFormatter-BPxuIa14.js";import"./context-C5iXvv9h.js";import"./VisuallyHidden-B4JthJSH.js";import"./helper-DdJ95vwf.js";import"./keyboard-Csc3fxLT.js";import"./SelectionManager-gdH0maxf.js";import"./useField-DVkZvzOP.js";import"./useFormValidationState-ELDSdfTc.js";import"./usePopper-CXMbn7uu.js";import"./index-IIBlqUBL.js";import"./MenuItem-Brj3YH5_.js";import"./IconCaretRight-C-HjVwgN.js";import"./IconCheckMark-QrCV5fbd.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-XxlqpNA4.js";import"./Trigger-CtdnUMm-.js";import"./IconCaretDown-sbJtFOOJ.js";import"./IconCaretDown16-DuiE5sVg.js";import"./IconCross-djj-Oyd4.js";import"./IconTrashBin16-B0HMjzoh.js";import"./IconTrashBin24-BVh-BotE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Czs5h7OA.js";import"./Portal-DWmcDSHy.js";import"./useMemoizedId-DeWUksGg.js";import"./FormControl-BAvj2x9i.js";import"./InputLabel-BSPFWPaA.js";import"./TooltipIcon-D3wuiUby.js";import"./LegacyTooltip-BhAlSmqQ.js";import"./useLink-xpLz3Lhk.js";import"./IconExclamationMarkCircle24-CStJ-czY.js";import"./IconQuestionMarkCircle-CIYpTH4-.js";import"./Switch-D3rvabZF.js";import"./TabItem-CdVFMx15.js";import"./TextInput-BlmxafZW.js";import"./Tooltip-CdBxvI3A.js";import"./useClickOutside-C8l2PBjA.js";import"./dialog-D9O7a7Fm.js";import"./Tree-q0L28dFW.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DA1-FB5D.js";import"./IconIcon16-De5hfWAZ.js";import"./IconIcon24-BUbyEJBH.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
