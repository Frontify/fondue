import{r as a,j as e}from"./iframe-C5FCeANG.js";import{B as j}from"./Button-pSl7YIn6.js";import{C as T}from"./Container-9bAPPhdU.js";import{P as c}from"./Popover-D6OddvmN.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BEtRbrcZ.js";import{I as P}from"./IconIcon-B6vCTcIt.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-ZILAtz4G.js";import"./useFocusable-CY4uEMcZ.js";import"./useFocusRing-CSVVjKoO.js";import"./useEffectEvent-Cco2ff7h.js";import"./chain-B9u4QWXy.js";import"./index-DTL76Uzm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CejzEdD9.js";import"./borderStyle-D9jrV09G.js";import"./input-DyKck07G.js";import"./Divider-B3vPtGWV.js";import"./Dropdown-68H7QW5t.js";import"./FocusScope-DUJW4sW9.js";import"./useOverlayTriggerState-CmB7Q7xQ.js";import"./useControlledState-DUJj6fF8.js";import"./useMenuTrigger-B76dE1tY.js";import"./useLabels-C6587Rwv.js";import"./useLocalizedStringFormatter-C6JeEUeQ.js";import"./context-CFHaOxRb.js";import"./VisuallyHidden-DNomqPth.js";import"./helper-Btg6kSDv.js";import"./keyboard-h-whvZ9l.js";import"./SelectionManager-Cypv6ImN.js";import"./useField-CrD9-LIh.js";import"./useFormValidationState-D7UwuQXV.js";import"./usePopper-TsKshzhZ.js";import"./index-DO8gX9nn.js";import"./MenuItem-B7s3STBs.js";import"./IconCaretRight-BxEtnF3E.js";import"./IconCheckMark-DgmsN_BS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DNEFvbJq.js";import"./Trigger-CAWL6COj.js";import"./IconCaretDown-Bo3-wsXi.js";import"./IconCaretDown16-B3Wb7dsU.js";import"./IconCross-PAKP7vlq.js";import"./IconTrashBin16-BBy7j7q_.js";import"./IconTrashBin24-CeM0tTNB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CG8Vi9yo.js";import"./Portal-DYc2VTWX.js";import"./useMemoizedId-BZYsMqio.js";import"./FormControl-D6-pg3ec.js";import"./InputLabel-CFmjz5AS.js";import"./TooltipIcon-PUl9w845.js";import"./LegacyTooltip-BknZ-Vak.js";import"./useLink-BxRMFuuh.js";import"./IconExclamationMarkCircle24-DKp6IBYY.js";import"./IconQuestionMarkCircle-C8O1sgV_.js";import"./Switch-CAYbyrAA.js";import"./TabItem-CQdW0_QP.js";import"./TextInput-BNgbcGER.js";import"./Tooltip-CVpq9eSP.js";import"./useClickOutside-Cpgd9MVc.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DWqfVsyk.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DrttrznJ.js";import"./IconIcon16-DfCtLuTw.js";import"./IconIcon24-E0LUn5Kt.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
