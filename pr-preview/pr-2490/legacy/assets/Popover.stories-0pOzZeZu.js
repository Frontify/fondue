import{r as p,j as e}from"./iframe-De5WdDij.js";import{B as j}from"./Button-09EX6ZTM.js";import{C as T}from"./Container-Bv1FJokB.js";import{P as c}from"./Popover-CKf1Rrls.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-D7c6olcW.js";import{I as P}from"./IconJohanna-G-raZXPE.js";import"./preload-helper-ClJkntjM.js";import"./useButton-wWrMugoC.js";import"./useFocusable-BRaVtCgU.js";import"./useFocusRing-CDNuK9Yy.js";import"./useEffectEvent-Oo8ltylB.js";import"./chain-uDd9vtXp.js";import"./index-OktaPfof.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bs5EGgiC.js";import"./borderStyle-D9jrV09G.js";import"./input-DF23E4C5.js";import"./Divider-B_5cdPy3.js";import"./Dropdown-ChyJAipO.js";import"./FocusScope-Fc_hKNYU.js";import"./useOverlayTriggerState-B9SrujZh.js";import"./useControlledState-Dc1RW1nq.js";import"./useMenuTrigger-CCLXEo6s.js";import"./useLabels-Buo-DWDy.js";import"./useLocalizedStringFormatter-CSBD8Wrw.js";import"./context-IzgTfYKF.js";import"./VisuallyHidden-a9fblbuF.js";import"./helper-BnolPM_n.js";import"./keyboard-Db0PXyBP.js";import"./SelectionManager-Cbaox9XQ.js";import"./useField-ClQqDpYA.js";import"./useFormValidationState-Dvh7J7d5.js";import"./usePopper-CPSdMAYJ.js";import"./index-BMpwRIf4.js";import"./MenuItem-CB3827LO.js";import"./IconCaretRight-CZbFa_6C.js";import"./IconCheckMark-Dwl8F3NX.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Gd4Agliv.js";import"./Trigger-D24NGVoU.js";import"./IconCaretDown-qTkkGzu1.js";import"./IconCaretDown16-B-zdzFN4.js";import"./IconCross-BPIha1Ld.js";import"./IconTrashBin16-CJnKFFEA.js";import"./IconTrashBin24-Ok3Wr0xL.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CR6SPP09.js";import"./Portal-Gz9-g2Z0.js";import"./useMemoizedId-C_RAM1u5.js";import"./FormControl-BVqhXDip.js";import"./InputLabel-BIycgYsu.js";import"./TooltipIcon-CkQrSsNW.js";import"./LegacyTooltip-k6QBDt5j.js";import"./useLink-Dlv3Y4nM.js";import"./IconExclamationMarkCircle24-Y07_rCrq.js";import"./IconQuestionMarkCircle-CwIRfAjS.js";import"./Switch-DDaCN14y.js";import"./TabItem-CZyEI5Y9.js";import"./TextInput-D-oGAlNq.js";import"./Tooltip-DDutmWKf.js";import"./useClickOutside-DTMqyjhj.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CawA_3wD.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DIV8Z7-v.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
