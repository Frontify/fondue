import{r as a,j as e}from"./iframe-DHhHn_Xd.js";import{B as j}from"./Button-twCtatvA.js";import{C as T}from"./Container-DBfPYSMM.js";import{P as c}from"./Popover-CqcPPZfq.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BOUPVeYb.js";import{I as P}from"./IconIcon-RSB4Bo_6.js";import"./preload-helper-DI9Pv0v-.js";import"./useButton-Ba6bJoqp.js";import"./useFocusable-CXMGbqTn.js";import"./useFocusRing-DmIFv9Ke.js";import"./useEffectEvent-C_rtojrN.js";import"./chain-BYrUscth.js";import"./index-JgQzKZqR.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-MgqszGR_.js";import"./borderStyle-D9jrV09G.js";import"./input-DTjDp1yX.js";import"./Divider-CWxjOnot.js";import"./Dropdown-D-MqyGOZ.js";import"./FocusScope-jD0jHaDs.js";import"./useOverlayTriggerState--lHa6GRX.js";import"./useControlledState-C5QBV-5N.js";import"./useMenuTrigger-Ba2LFcNw.js";import"./useLabels-DZu6LvK2.js";import"./useLocalizedStringFormatter-CnwYXU_D.js";import"./context-D98oYbyU.js";import"./VisuallyHidden-ChNuZUmx.js";import"./helper-96siw9_E.js";import"./keyboard-DN0A5UFX.js";import"./SelectionManager-BmeslHph.js";import"./useField-C1Hy9AZ6.js";import"./useFormValidationState-DFbP1eAN.js";import"./usePopper-k8-xH0Mb.js";import"./index-Dxw9FBAV.js";import"./MenuItem-DNXPOJNM.js";import"./IconCaretRight-CLwpUh1P.js";import"./IconCheckMark-BVSctc7O.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CfwzJ-WV.js";import"./Trigger-CBI5WoJV.js";import"./IconCaretDown-ibszVH90.js";import"./IconCaretDown16-CrKcLaqR.js";import"./IconCross-BNiwUk40.js";import"./IconTrashBin16-onKoxhQU.js";import"./IconTrashBin24-CyaeCWRk.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CASadrCE.js";import"./Portal-B16H0Alf.js";import"./useMemoizedId-BUaa68Zx.js";import"./FormControl-B0f2ybAX.js";import"./InputLabel-ChSoeug1.js";import"./TooltipIcon-CTskAz0a.js";import"./LegacyTooltip-B5e2tBdw.js";import"./useLink-B5wz_Dbi.js";import"./IconExclamationMarkCircle24-SHVZolFQ.js";import"./IconQuestionMarkCircle-CuCpXsjy.js";import"./Switch-b4QCHyCj.js";import"./TabItem-B1-ZGQ2E.js";import"./TextInput-DsDId-ew.js";import"./Tooltip-CYknrnEg.js";import"./useClickOutside-BMR6voSv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B-qAXyrm.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BgB_bcU3.js";import"./IconIcon16-CYLT6J1w.js";import"./IconIcon24-Amavt8cU.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
