import{r as a,j as e}from"./iframe-DeHAHo2O.js";import{B as j}from"./Button-XeATRVB6.js";import{C as T}from"./Container-Bmctj4BW.js";import{P as c}from"./Popover-nCiGgN8s.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CuplyEgY.js";import{I as P}from"./IconIcon-BLbkrLUw.js";import"./preload-helper-1L8wWKLL.js";import"./useButton-DMcNng1z.js";import"./useFocusable-Cx6UClPu.js";import"./useFocusRing-mB5qeJ04.js";import"./useEffectEvent-z6oLVS9-.js";import"./chain-BUVmghN3.js";import"./index-r0OKhC8Q.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CYxxidOu.js";import"./borderStyle-D9jrV09G.js";import"./input-DbTBvo6h.js";import"./Divider-AunlJTwo.js";import"./Dropdown-CPWczZou.js";import"./FocusScope-BdlMD4Yu.js";import"./useOverlayTriggerState-CvsjBNiZ.js";import"./useControlledState-Br1r4vIG.js";import"./useMenuTrigger-B6jxNwcP.js";import"./useLabels-BkYzxx14.js";import"./useLocalizedStringFormatter-BRbC8G8c.js";import"./context-hGU2fCsi.js";import"./VisuallyHidden-B7YsmtVf.js";import"./helper-Cf03TuNF.js";import"./keyboard-Dn8uKP3f.js";import"./SelectionManager-DH1yA4vK.js";import"./useField-CvLglrIT.js";import"./useFormValidationState-QO7fvPwD.js";import"./usePopper-dhPiNd2g.js";import"./index-DHbYGvEM.js";import"./MenuItem-Bmc9YqKf.js";import"./IconCaretRight-BATNqyD1.js";import"./IconCheckMark-HBwhNn3e.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C72EU5gX.js";import"./Trigger-DyuqwTZt.js";import"./IconCaretDown-B5WDuPoQ.js";import"./IconCaretDown16-Rghdt45D.js";import"./IconCross-nsGTd93L.js";import"./IconTrashBin16-UcKIhf9C.js";import"./IconTrashBin24-BsnN7OSn.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DUTWRUSV.js";import"./Portal-8lp-5d0y.js";import"./useMemoizedId-B7oc4VDX.js";import"./FormControl-hi5Ik-iU.js";import"./InputLabel-CV2tUH8t.js";import"./TooltipIcon-VUEuyZak.js";import"./LegacyTooltip-6IXUBNNu.js";import"./useLink-CnAHkscR.js";import"./IconExclamationMarkCircle24-C37jI8Jz.js";import"./IconQuestionMarkCircle-Cdp-yedE.js";import"./Switch-BZRO7Ing.js";import"./TabItem-DKyhZ-ff.js";import"./TextInput-BVn6BAjb.js";import"./Tooltip-0UlcUHze.js";import"./useClickOutside-CKkB_vX5.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D_8Bk90C.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-kfeUPeJ-.js";import"./IconIcon16-CcHE2ZLm.js";import"./IconIcon24-BLfDtBMf.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
