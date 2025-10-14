import{r as p,j as e}from"./iframe-DQZoCshs.js";import{B as j}from"./Button-ytMoA_uz.js";import{C as T}from"./Container-rzE_T86E.js";import{P as c}from"./Popover-14XzoXHD.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CBiEK6F-.js";import{I as P}from"./IconJohanna-37GjpJRx.js";import"./preload-helper-ClJkntjM.js";import"./useButton-CsNnQIPX.js";import"./useFocusable-BBQoLTeh.js";import"./useFocusRing-DzC-uLC_.js";import"./useEffectEvent-CGYJKY5S.js";import"./chain-BuRxycqd.js";import"./index-B8qXirP9.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BDl1uIVb.js";import"./borderStyle-D9jrV09G.js";import"./input-z8GwYBpE.js";import"./Checkbox-C4MvX6Ye.js";import"./useFormValidationState-DbKGDjYr.js";import"./useControlledState-CtyZ7QgW.js";import"./InputLabel-Dzdxn41b.js";import"./TooltipIcon-C7r6FNKp.js";import"./LegacyTooltip-CDAdmYGm.js";import"./useLink-LUVwUCH7.js";import"./usePopper-DszYhXja.js";import"./index-3IyLkK9K.js";import"./Portal-BKobMvb1.js";import"./useMemoizedId-D0yBRadr.js";import"./IconCheckMark-CjcfOY3h.js";import"./IconExclamationMarkCircle24-YH8jJSgF.js";import"./IconQuestionMarkCircle-DwleYyem.js";import"./IconMinus-CfoqbIj7.js";import"./Divider-D7lSDPcQ.js";import"./Dropdown-CqY_CMr7.js";import"./FocusScope-DH9wDV-9.js";import"./useOverlayTriggerState-C6YZ0OW1.js";import"./useMenuTrigger-OXhk5r7d.js";import"./useLabels-CxTsjsBe.js";import"./useLocalizedStringFormatter-IWxdoe4l.js";import"./context-CP3_KLJu.js";import"./VisuallyHidden-qmSAPGWI.js";import"./helper-DVQH8vyC.js";import"./keyboard-QJqQzFc3.js";import"./SelectionManager-DwoBoMb8.js";import"./useField-Bk-U2Zzd.js";import"./MenuItem-Dw3WqHed.js";import"./IconCaretRight-Ez1SMPuo.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BvV7T1zK.js";import"./Trigger-C9FqWfj_.js";import"./IconCaretDown-0NTUtVqi.js";import"./IconCaretDown16-jWrqagMd.js";import"./IconCross-BUNknNaW.js";import"./IconTrashBin16-D30EDo3n.js";import"./IconTrashBin24-C2S7T8fv.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B7pwOcwp.js";import"./FormControl-Nwry38Le.js";import"./Switch-BG7E8pTO.js";import"./TabItem-AjV6Ylio.js";import"./TextInput-BtZ3-Qgd.js";import"./Tooltip-ClLcCziU.js";import"./useClickOutside-BW83cRIA.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BdFovfk1.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DjctIpBj.js";const Ye={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
