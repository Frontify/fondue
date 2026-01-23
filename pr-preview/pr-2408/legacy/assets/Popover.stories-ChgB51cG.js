import{r as a,j as e}from"./iframe-BMoEVkia.js";import{B as j}from"./Button-CMxzLdN7.js";import{C as T}from"./Container-BsSHSqw5.js";import{P as c}from"./Popover-BXBx0d8d.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BT5YClV6.js";import{I as P}from"./IconIcon-CSh3-jGx.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-xnxPy2XF.js";import"./useFocusable-Cp2GeeMz.js";import"./useFocusRing-C73RBflu.js";import"./useLayoutEffect-rRRXELWE.js";import"./chain-DdvpU25y.js";import"./index-FARF4T7D.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Ck0wkAr4.js";import"./borderStyle-D9jrV09G.js";import"./input-DnJps9Th.js";import"./Divider-ogvYhdWC.js";import"./Dropdown-h-_P0JcJ.js";import"./FocusScope-BWWCni5r.js";import"./useOverlayTriggerState-BscwV0_k.js";import"./useControlledState-DLOCLdQG.js";import"./useMenuTrigger-BjJQY40i.js";import"./useLabels-C6e4wMf2.js";import"./useLocalizedStringFormatter-BIB_5D2d.js";import"./context-M0dbH2oo.js";import"./VisuallyHidden-g2kmG1TR.js";import"./helper-C8VoCvyE.js";import"./keyboard-BKPY6eUK.js";import"./SelectionManager-CpptwNa1.js";import"./useField-CPaAlSWD.js";import"./useFormValidationState-DLDuLEaJ.js";import"./usePopper-C5V21KjV.js";import"./index-64kaxFay.js";import"./MenuItem-CwVw2b8z.js";import"./IconCaretRight-D9ce8Ep2.js";import"./IconCheckMark-D7Vq66o9.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-3kSH1pYv.js";import"./Trigger-qElrFG2x.js";import"./IconCaretDown-CYC5SuWc.js";import"./IconCaretDown16-DYRPZHz8.js";import"./IconCross-r6CCOpp8.js";import"./IconTrashBin16-BuG0O87O.js";import"./IconTrashBin24-Mt8xpYuL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CubsVp9j.js";import"./Portal-mlOdlOHj.js";import"./useMemoizedId-CMP0SDkl.js";import"./FormControl-Dldgd06i.js";import"./InputLabel-jBmbu52z.js";import"./TooltipIcon-CSWY0EL4.js";import"./LegacyTooltip-wjZJe6RC.js";import"./useLink-C7m8Sslo.js";import"./IconExclamationMarkCircle24-DwIlh9zC.js";import"./IconQuestionMarkCircle-CLss9Dli.js";import"./Switch-BxoXzsTj.js";import"./TabItem-DfMYK3dV.js";import"./TextInput-BNVRlzHU.js";import"./Tooltip-CDntw8rD.js";import"./useClickOutside-DvH66BFI.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Dua2iz_i.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-8EVQOO01.js";import"./IconIcon16-CBFc7K1s.js";import"./IconIcon24-Bg5pNJ11.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
