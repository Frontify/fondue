import{r as p,j as e}from"./iframe-loALxrwA.js";import{B as j}from"./Button-xxPrQzX3.js";import{C as T}from"./Container-BAeFU7KR.js";import{P as c}from"./Popover-Brh53ZKX.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-B8PE083H.js";import{I as P}from"./IconJohanna-Bo2W3CBu.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-CIYJdvKD.js";import"./useFocusable-gZZJckaE.js";import"./useFocusRing-KMhl1UJS.js";import"./useEffectEvent-4xwT3IDe.js";import"./chain-DPfOkws3.js";import"./index-Dxja0Wkm.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Vv0xqBGm.js";import"./borderStyle-D9jrV09G.js";import"./input-CpAKlech.js";import"./Checkbox-DHrS9Tqv.js";import"./useFormValidationState-Be-B2n0Z.js";import"./useControlledState-DLXBMBYE.js";import"./InputLabel-CtseXcks.js";import"./TooltipIcon-CMqqw_pw.js";import"./LegacyTooltip-Cor5DXUh.js";import"./useLink-C5uGPnj2.js";import"./usePopper-c8iwtMtM.js";import"./index-D5EgzJqU.js";import"./Portal-BOzxa9wa.js";import"./useMemoizedId-Dz0xJZ2i.js";import"./IconCheckMark-B_q4DDrQ.js";import"./IconExclamationMarkCircle24-EhlvbpVM.js";import"./IconQuestionMarkCircle-Car0cXyI.js";import"./IconMinus-OykVdnIk.js";import"./DialogBody-YPshOcvZ.js";import"./dialog-D9O7a7Fm.js";import"./Divider-DLnR9heJ.js";import"./Dropdown-CaaOnjf9.js";import"./FocusScope-G2sE9zlO.js";import"./useOverlayTriggerState-am9Ln9_3.js";import"./useMenuTrigger-Chk3MCxN.js";import"./useLabels-bdaQqbJL.js";import"./useLocalizedStringFormatter-BJknxX9O.js";import"./context-BO2wI_GH.js";import"./VisuallyHidden-BnxHhjaw.js";import"./helper-PKiWzScp.js";import"./keyboard-BryKsZUz.js";import"./SelectionManager-BoAOKyeU.js";import"./useField-DibquiUW.js";import"./MenuItem-CmE5NgSO.js";import"./IconCaretRight-Dhoo0xjN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B9uL4gHk.js";import"./Trigger-2VLOT0SV.js";import"./IconCaretDown-CAMMwaLk.js";import"./IconCaretDown16-C9Kzqhea.js";import"./IconCross-CrFfhLsy.js";import"./IconTrashBin16-B3StqCVf.js";import"./IconTrashBin24-BoRbGsWA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BXnrvz9y.js";import"./FormControl-CrObdnG3.js";import"./Switch-DsaiqYEb.js";import"./TabItem-DKfp7mkL.js";import"./TextInput-BjAQOjJb.js";import"./Tooltip-L0Un9H0w.js";import"./useClickOutside-B8frtDHS.js";import"./Tree-B5AxJst3.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-qoBG5I0z.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ke=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ke as __namedExportsOrder,qe as default};
