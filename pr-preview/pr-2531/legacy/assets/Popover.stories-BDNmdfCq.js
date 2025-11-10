import{r as a,j as e}from"./iframe-CfBLd35K.js";import{B as j}from"./Button-BMq1fE2z.js";import{C as T}from"./Container-Cbvd-fTo.js";import{P as c}from"./Popover-CZza1y8q.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BoMnVsxx.js";import{I as P}from"./IconIcon-w-cmo38_.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-HWEtsWO-.js";import"./useFocusable-BcIBCRrh.js";import"./useFocusRing-HQOnF_Kw.js";import"./useEffectEvent-DtYDcY6c.js";import"./chain-pG_FVjze.js";import"./index-Bt8gmfke.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BW40DMyr.js";import"./borderStyle-D9jrV09G.js";import"./input-LRIhm9ZT.js";import"./Divider-CEFbS-0k.js";import"./Dropdown-msJI69H3.js";import"./FocusScope-NaJ6X-7k.js";import"./useOverlayTriggerState-6pXikwCB.js";import"./useControlledState-C9WHfCYO.js";import"./useMenuTrigger-zDXar3N1.js";import"./useLabels-DT9Bb-sB.js";import"./useLocalizedStringFormatter-BvdwTUs4.js";import"./context-CMvj-BfJ.js";import"./VisuallyHidden-CEBIOZFZ.js";import"./helper-DA_iJq6R.js";import"./keyboard-D8xRU-Ay.js";import"./SelectionManager-1koXhfc4.js";import"./useField-DVkUr7OL.js";import"./useFormValidationState-BETjbCr0.js";import"./usePopper-gF1CZnu9.js";import"./index-Deq_MCO1.js";import"./MenuItem-5mcUlOkg.js";import"./IconCaretRight-DMhBk2l8.js";import"./IconCheckMark-C_jUhamR.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTHCP9Mo.js";import"./Trigger-CMbarR76.js";import"./IconCaretDown-BUciQsUp.js";import"./IconCaretDown16-bn1bAJM-.js";import"./IconCross-CVl0uK4o.js";import"./IconTrashBin16-D2jqe9uk.js";import"./IconTrashBin24-CffgCcCE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BEYQ1EgJ.js";import"./Portal-DJoc2mSv.js";import"./useMemoizedId-BANpn3Gk.js";import"./FormControl-Dc2R__I5.js";import"./InputLabel-DJehHiuq.js";import"./TooltipIcon-zj5xDHAE.js";import"./LegacyTooltip-D3XZnxSi.js";import"./useLink-Br-w_ucj.js";import"./IconExclamationMarkCircle24-B8H-ybyW.js";import"./IconQuestionMarkCircle-CtFKirTB.js";import"./Switch-BGmleg8v.js";import"./TabItem-Oa5L5Tkf.js";import"./TextInput-CnhhlBIJ.js";import"./Tooltip-DT6vH3pO.js";import"./useClickOutside-BUIhcMEJ.js";import"./dialog-D9O7a7Fm.js";import"./Tree-jLSMCZKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-kc206Dg0.js";import"./IconIcon16-Bz2n6xnY.js";import"./IconIcon24-B8j4oezz.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
