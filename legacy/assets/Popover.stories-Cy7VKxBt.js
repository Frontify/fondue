import{r as a,j as e}from"./iframe-DkBc9txZ.js";import{B as j}from"./Button-CO2dRSe2.js";import{C as T}from"./Container-B5c-1t11.js";import{P as c}from"./Popover-DEOuHWod.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BDu2EkUA.js";import{I as P}from"./IconIcon-CV2_x2Ph.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-DpKAKOzx.js";import"./useFocusable-BkPz2jUo.js";import"./useFocusRing-DazNlEEP.js";import"./useEffectEvent-B9lMGAVd.js";import"./chain-Be7-UthQ.js";import"./index-DSZ_OKsr.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CmNyqXgd.js";import"./borderStyle-D9jrV09G.js";import"./input-w7lscfqM.js";import"./Checkbox-CuQYuj9-.js";import"./useFormValidationState-DTmP4RQz.js";import"./useControlledState-CWqFmmNz.js";import"./InputLabel-x-WELsow.js";import"./TooltipIcon-BtFtTPVp.js";import"./LegacyTooltip-CfKdtC00.js";import"./useLink-B7rNEif8.js";import"./usePopper-Cn4Ax5DO.js";import"./index-C24wWQAx.js";import"./Portal-DCpeslNE.js";import"./useMemoizedId-DjTqBnJN.js";import"./IconCheckMark-Dmyak26j.js";import"./IconExclamationMarkCircle24-CRkd1lO2.js";import"./IconQuestionMarkCircle-vxY1VTd3.js";import"./IconMinus-CW5B4C6e.js";import"./DialogBody-BiDc-cx5.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BSNrebzZ.js";import"./Dropdown-Do1A28SM.js";import"./FocusScope-DFJXPtU-.js";import"./useOverlayTriggerState-CmTBHLo0.js";import"./useMenuTrigger-BN2mPx_D.js";import"./useLabels-IKbUOGnT.js";import"./useLocalizedStringFormatter-zYZl6qgC.js";import"./context-Bb45Js7W.js";import"./VisuallyHidden-Cc5ewCOX.js";import"./helper-BLtDcDe_.js";import"./keyboard-DyvKqn9z.js";import"./SelectionManager-CBBiz3LB.js";import"./useField-CSLWV9TO.js";import"./MenuItem-CDFlAASW.js";import"./IconCaretRight-rraPIaSH.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C5xsuSHO.js";import"./Trigger--YwYyZTv.js";import"./IconCaretDown-DpHCI3Yp.js";import"./IconCaretDown16-CkRNjSvj.js";import"./IconCross-hWz69XN8.js";import"./IconTrashBin16-44Dxj7Qi.js";import"./IconTrashBin24-BirpV8NM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bv8VBBeP.js";import"./FormControl-Dx4hg5c5.js";import"./Switch-BjfC3wlh.js";import"./TabItem-CPPHbQUq.js";import"./TextInput-DgpCjNGw.js";import"./Tooltip-BX2vtUCh.js";import"./useClickOutside-hjwC7AMP.js";import"./Tree-DvA5RdH9.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-KxDFIeOs.js";import"./IconIcon16-CJ1x6Fbr.js";import"./IconIcon24-C6paqj5F.js";const Qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ue=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ue as __namedExportsOrder,Qe as default};
