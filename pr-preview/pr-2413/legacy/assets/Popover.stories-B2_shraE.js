import{r as a,j as e}from"./iframe-Cf1DtGp4.js";import{B as j}from"./Button-DV8NYrEc.js";import{C as T}from"./Container-jUTCAI4g.js";import{P as c}from"./Popover-DqNAGJ72.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BdAg9mdc.js";import{I as P}from"./IconIcon-CnnF20VY.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-BPFx4qvf.js";import"./useFocusable-DqhDsK7J.js";import"./useFocusRing-BM1gWsMD.js";import"./useEffectEvent-C8pfAA-B.js";import"./chain-Cgz6AhiD.js";import"./index-Dxcoy0oM.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CLi9Sorx.js";import"./borderStyle-D9jrV09G.js";import"./input-Di4mRFwf.js";import"./Checkbox-BdqBmlc8.js";import"./useFormValidationState-CbcGlbmg.js";import"./useControlledState-CIBuNwJe.js";import"./InputLabel-CVMQzfx-.js";import"./TooltipIcon-B7NaMUo0.js";import"./LegacyTooltip-HGoAP1-a.js";import"./useLink-Dub5qxjk.js";import"./usePopper-BeHgl84Q.js";import"./index-DfwwFwWl.js";import"./Portal-D2sKroGt.js";import"./useMemoizedId-eqCvB2Ok.js";import"./IconCheckMark-DLBNQ2dt.js";import"./IconExclamationMarkCircle24-DPnvSQ1_.js";import"./IconQuestionMarkCircle-j554Ijqs.js";import"./IconMinus-CMAY-Wk-.js";import"./Dropdown-CkllTkU8.js";import"./FocusScope-Dx-PhQkB.js";import"./useOverlayTriggerState-CcAg6wzo.js";import"./useMenuTrigger-DXv8pO8H.js";import"./useLabels-DDGlcAiH.js";import"./useLocalizedStringFormatter-Cju5TQfy.js";import"./context-B0UoGtkJ.js";import"./VisuallyHidden-lEg9ayc4.js";import"./helper-C4HMwjvL.js";import"./keyboard-CrzQKbg4.js";import"./SelectionManager-s542UXoo.js";import"./useField-C2ixWOTC.js";import"./MenuItem-CAnjtucz.js";import"./IconCaretRight-BMYIQSG4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-8z19RM.js";import"./Trigger-CESC6Aw7.js";import"./IconCaretDown-DHVY6Xwy.js";import"./IconCaretDown16-BJT_Hl8U.js";import"./IconCross-BQIDiVoD.js";import"./IconTrashBin16-CvKHnkSD.js";import"./IconTrashBin24-B3oBTNTM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BZ0oLoB5.js";import"./FormControl-CDVvLYHE.js";import"./Switch-DMGgAkT_.js";import"./TabItem-hU4OjUZo.js";import"./TextInput-BrfMEstF.js";import"./Tooltip-BPrJUiIR.js";import"./useClickOutside-DqmtRtRR.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DZT6B-ry.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-D8-80Zmo.js";import"./IconIcon16-Dm7hjjKm.js";import"./IconIcon24-B5WZ-Ru_.js";const Je={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ke=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ke as __namedExportsOrder,Je as default};
