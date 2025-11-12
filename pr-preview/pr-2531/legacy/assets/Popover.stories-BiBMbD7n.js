import{r as a,j as e}from"./iframe-Ca9WJIBK.js";import{B as j}from"./Button-CnOLOGK7.js";import{C as T}from"./Container-D-u0RaMS.js";import{P as c}from"./Popover-7hjoyPnF.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BCskP2qp.js";import{I as P}from"./IconIcon-DctGtOsl.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-DGBDNgU7.js";import"./useFocusable-C1WoQs-T.js";import"./useFocusRing-BwzAH-2K.js";import"./useEffectEvent-TJiFP2g3.js";import"./chain-DCPzrEZQ.js";import"./index-AbzjxHSH.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dta85FAJ.js";import"./borderStyle-D9jrV09G.js";import"./input-B1Xmeo9G.js";import"./Divider-D1tYVdE9.js";import"./Dropdown-CkCoivmc.js";import"./FocusScope-DoucVTHl.js";import"./useOverlayTriggerState-BV7PYFwU.js";import"./useControlledState-C-yCLtZN.js";import"./useMenuTrigger-Dx5nPd21.js";import"./useLabels-BBWLrE9G.js";import"./useLocalizedStringFormatter-DZZ7LkGX.js";import"./context-kYclt6ZX.js";import"./VisuallyHidden-b7OoCiMy.js";import"./helper-CAD_TrKY.js";import"./keyboard-DwOn7Ntm.js";import"./SelectionManager-BIr7me4z.js";import"./useField-BYBys9YO.js";import"./useFormValidationState-BQNefewE.js";import"./usePopper-C-NlHTyQ.js";import"./index-CLqlsjva.js";import"./MenuItem-BgaffJtb.js";import"./IconCaretRight-DZKZlpE5.js";import"./IconCheckMark-B1Dc5Kb6.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C-qJOuWM.js";import"./Trigger-CYFVkHmt.js";import"./IconCaretDown-D3MkWkTR.js";import"./IconCaretDown16-BIMtKl3v.js";import"./IconCross-uBKIpJqx.js";import"./IconTrashBin16-DV1rZlFw.js";import"./IconTrashBin24-D9wzOXUb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNW_gR7-.js";import"./Portal-DbhhpfdV.js";import"./useMemoizedId-BdBpCiYz.js";import"./FormControl-CLGX9lEQ.js";import"./InputLabel-CTPaTyPc.js";import"./TooltipIcon-PcHhlBO6.js";import"./LegacyTooltip-ChRLGsLt.js";import"./useLink-CZOSwZKD.js";import"./IconExclamationMarkCircle24-pgWUzkh2.js";import"./IconQuestionMarkCircle-DJaiFUzl.js";import"./Switch-eh5BQsSO.js";import"./TabItem-C6Tvfmip.js";import"./TextInput-CSthRERT.js";import"./Tooltip-Cs9uAo5f.js";import"./useClickOutside-CVpI9hLY.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bt4aPzUc.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-De1sJXh2.js";import"./IconIcon16-C6rippnO.js";import"./IconIcon24-CH8fXaOj.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
