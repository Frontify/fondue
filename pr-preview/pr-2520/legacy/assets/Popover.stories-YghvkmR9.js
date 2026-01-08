import{r as a,j as e}from"./iframe-r6J4ePyW.js";import{B as j}from"./Button-B1yAmkes.js";import{C as T}from"./Container-DDoosGkA.js";import{P as c}from"./Popover-B0wgGp7E.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CtnaEOu6.js";import{I as P}from"./IconIcon-CJHR9eFk.js";import"./preload-helper-OAyExbmo.js";import"./useButton-B1zHGReO.js";import"./useFocusable-DCJrmwZe.js";import"./useFocusRing-CxZt1wZ_.js";import"./useEffectEvent-BKHWtOuK.js";import"./chain-DWwlhufM.js";import"./index-DanPgCzI.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Bl-FmnYQ.js";import"./borderStyle-D9jrV09G.js";import"./input-DeNj_XFe.js";import"./Divider-BkI3pdWZ.js";import"./Dropdown-BDyipOjR.js";import"./FocusScope-0mMA6Wdy.js";import"./useOverlayTriggerState-CkLymXkQ.js";import"./useControlledState-D9rO8aDp.js";import"./useMenuTrigger-DKdAqa2m.js";import"./useLabels-TKPvOifT.js";import"./useLocalizedStringFormatter-VxTtgFts.js";import"./context-C9814rFJ.js";import"./VisuallyHidden-Cl-7enWq.js";import"./helper-CLSoKP_a.js";import"./keyboard-COdlhFeM.js";import"./SelectionManager-2PtmdLez.js";import"./useField-EqXWDY-0.js";import"./useFormValidationState-Bgh-X1l9.js";import"./usePopper-oL3B2z11.js";import"./index-ArdyNbxO.js";import"./MenuItem-BGnHswsU.js";import"./IconCaretRight-YrwioAi6.js";import"./IconCheckMark-yRS16sIs.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BneBwhpl.js";import"./Trigger-CC_tcFMw.js";import"./IconCaretDown-C-fPzg7E.js";import"./IconCaretDown16-B5FxHLj0.js";import"./IconCross-DWPjQDuq.js";import"./IconTrashBin16-DCfYG6TI.js";import"./IconTrashBin24-BO36GBxN.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwP_sxyp.js";import"./Portal-MZ_7L158.js";import"./useMemoizedId-B7Oc4OmJ.js";import"./FormControl-ByUUpRZ0.js";import"./InputLabel-DV9eTz9u.js";import"./TooltipIcon-KPPSDsV-.js";import"./LegacyTooltip-b55Gn0bP.js";import"./useLink-DQCZr1gq.js";import"./IconExclamationMarkCircle24-Cpf4UxZa.js";import"./IconQuestionMarkCircle-DxJ2lW_A.js";import"./Switch-CmcbY307.js";import"./TabItem-Bxfpf6zV.js";import"./TextInput-BqIyJtSt.js";import"./Tooltip-C4hf8uVA.js";import"./useClickOutside-BIYYl7xv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Dy5asAZ1.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-ktM439Z_.js";import"./IconIcon16-B1v-vDDR.js";import"./IconIcon24-Vghd6_GC.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
