import{r as p,j as e}from"./iframe-l0QJhPg2.js";import{B as j}from"./Button-bwErzbwC.js";import{C as T}from"./Container-BG89xeP9.js";import{P as c}from"./Popover-B9CURUv6.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-Nr6Rxbk7.js";import{I as P}from"./IconJohanna-UumLA4kA.js";import"./preload-helper-ClJkntjM.js";import"./useButton-DY3u421-.js";import"./useFocusable-OCbG4bop.js";import"./useFocusRing-Cv6Nj6VU.js";import"./useEffectEvent-DMOUn1MU.js";import"./chain-CS3UA_VO.js";import"./index-CUNTRpeU.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-rArBOmaZ.js";import"./borderStyle-D9jrV09G.js";import"./input-C_t1bFpZ.js";import"./Divider-D2OinX-0.js";import"./Dropdown-BFRzZKjk.js";import"./FocusScope-DB4a0Ubn.js";import"./useOverlayTriggerState-BouXr8l_.js";import"./useControlledState-CFG4g-bA.js";import"./useMenuTrigger-j2cq4B_t.js";import"./useLabels-BzA1nbJ-.js";import"./useLocalizedStringFormatter-D02eeuhF.js";import"./context-B3YZuPJb.js";import"./VisuallyHidden-CJhS9cmL.js";import"./helper-Wu38vShE.js";import"./keyboard-ez5hRGkN.js";import"./SelectionManager-CDz5YniA.js";import"./useField-_Cuy7iFx.js";import"./useFormValidationState-CDJkVAlX.js";import"./usePopper-UT0i-yBc.js";import"./index-edjICtv5.js";import"./MenuItem-CAezuxY7.js";import"./IconCaretRight-Ba8KjB_6.js";import"./IconCheckMark-D4b_H2JN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DesUOSVB.js";import"./Trigger-02mmuDpd.js";import"./IconCaretDown-BMue8eiT.js";import"./IconCaretDown16-Bud0Jo04.js";import"./IconCross-BRRJjj88.js";import"./IconTrashBin16-CeWPQHON.js";import"./IconTrashBin24-CD9xSS0e.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CHPePV9p.js";import"./Portal-DKISOlQg.js";import"./useMemoizedId-CyO3ygRy.js";import"./FormControl-D9Em5ido.js";import"./InputLabel-COep5cVX.js";import"./TooltipIcon-CX2TaqAO.js";import"./LegacyTooltip-pxPHnLbr.js";import"./useLink-DUbBK_PD.js";import"./IconExclamationMarkCircle24-B0QU41eT.js";import"./IconQuestionMarkCircle-BmOYm7Ho.js";import"./Switch-rQee5_3y.js";import"./TabItem-CQI1G430.js";import"./TextInput-C6EBdYM3.js";import"./Tooltip-D-je5WhZ.js";import"./useClickOutside-C-rSVhlD.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CXm-0_tJ.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BppZ2KTU.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
