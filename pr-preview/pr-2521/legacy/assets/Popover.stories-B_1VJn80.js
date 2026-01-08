import{r as a,j as e}from"./iframe-B1NH0d8E.js";import{B as j}from"./Button-CjOUnz39.js";import{C as T}from"./Container-CkyREG9d.js";import{P as c}from"./Popover-BxnqJ1Z3.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BR7mnz4z.js";import{I as P}from"./IconIcon-DLdYtT1Q.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-CXaNqm_z.js";import"./useFocusable-DP6unWF8.js";import"./useFocusRing-rvuW17v-.js";import"./useEffectEvent-Cuuo5Go7.js";import"./chain-CDNEhT9V.js";import"./index-NnVgL01k.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C-xSTCCc.js";import"./borderStyle-D9jrV09G.js";import"./input-DG65ErTG.js";import"./DialogBody-CYckLbUx.js";import"./dialog-D9O7a7Fm.js";import"./Divider-Bvi631jR.js";import"./Dropdown-CRsrFL1r.js";import"./FocusScope-CSl_sW_4.js";import"./useOverlayTriggerState-EK37ykhd.js";import"./useControlledState-VV8iETpF.js";import"./useMenuTrigger-CLvR65IU.js";import"./useLabels-D6M7Y-Ad.js";import"./useLocalizedStringFormatter-B_wUy5H5.js";import"./context-DkQ0DKut.js";import"./VisuallyHidden-Dc2v8xjK.js";import"./helper-BAqNwAfB.js";import"./keyboard-Cfnwcw1j.js";import"./SelectionManager-CGSidPqj.js";import"./useField-Ck-FbqVi.js";import"./useFormValidationState-BS6Czv8J.js";import"./usePopper-jtv-PNE8.js";import"./index-C7tiHcAr.js";import"./MenuItem-B5L2unfa.js";import"./IconCaretRight-D43a9Ky7.js";import"./IconCheckMark-Az9s2S0p.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DgTICg-p.js";import"./Trigger-0BTyAmbE.js";import"./IconCaretDown-BKOjvZBQ.js";import"./IconCaretDown16-CgcPEXOJ.js";import"./IconCross-CS9vqEH5.js";import"./IconTrashBin16-DLhMgjk_.js";import"./IconTrashBin24-OmLsHuw5.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BaBU1IWY.js";import"./Portal-CySXwQ73.js";import"./useMemoizedId-B10bANt6.js";import"./FormControl-DKa4d7cu.js";import"./InputLabel-DK0GeTMZ.js";import"./TooltipIcon-CaQbfCOt.js";import"./LegacyTooltip-DWKf2bEz.js";import"./useLink-DGFVcWby.js";import"./IconExclamationMarkCircle24-Bbl11HkU.js";import"./IconQuestionMarkCircle-DdcULYxs.js";import"./Switch-Zpluh7dE.js";import"./TabItem-CZOwDr0W.js";import"./TextInput-CwXX9Bla.js";import"./Tooltip-CULISYh2.js";import"./useClickOutside-CqVgQgGM.js";import"./Tree-BpEz_X_Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DoKVx44R.js";import"./IconIcon16-C17HQfvi.js";import"./IconIcon24-C0nl7tvE.js";const Je={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
