import{r as a,j as e}from"./iframe-ahMwwdsf.js";import{B as j}from"./Button-w0YMQI20.js";import{C as T}from"./Container-ZKyYQZgp.js";import{P as c}from"./Popover-TnmneEEu.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BZvUO_9Q.js";import{I as P}from"./IconIcon-BnybImGF.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-DLhm0yas.js";import"./useFocusable-Ch_wBML2.js";import"./useFocusRing-DaQclxv6.js";import"./useEffectEvent-Bed0HKrm.js";import"./chain-C53qR8mF.js";import"./index-B6RK_iYZ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C8LnBuXA.js";import"./borderStyle-D9jrV09G.js";import"./input--7aMGOFq.js";import"./Divider-DpgHFPV1.js";import"./Dropdown-svNldc3Q.js";import"./FocusScope-Bzv2WeXp.js";import"./useOverlayTriggerState-Bu5TuFq8.js";import"./useControlledState-DNYTr6ro.js";import"./useMenuTrigger-B0mf0h1D.js";import"./useLabels-Dts9_kB5.js";import"./useLocalizedStringFormatter-B3uWwqsq.js";import"./context-Cwx5vL9r.js";import"./VisuallyHidden-DUEyq-Cs.js";import"./helper-DY0o5nBN.js";import"./keyboard-CXAxgyJA.js";import"./SelectionManager-Cf_3T95Q.js";import"./useField-B-F_ybfn.js";import"./useFormValidationState-9z_gHNgo.js";import"./usePopper-CDxDTjFc.js";import"./index-CVrNqSrl.js";import"./MenuItem-BeGq7gvA.js";import"./IconCaretRight-YmhPr-ED.js";import"./IconCheckMark-CJeheIoj.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CpxXuuZu.js";import"./Trigger-Bg-sKnk_.js";import"./IconCaretDown-BWkY7x9m.js";import"./IconCaretDown16-BCuUFWC8.js";import"./IconCross-DtgV0uoe.js";import"./IconTrashBin16-BvirWvL2.js";import"./IconTrashBin24-Dyp1RBtU.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwU3w8We.js";import"./Portal-DKS8nUwW.js";import"./useMemoizedId-CZOTONQe.js";import"./FormControl-Cz8QE23N.js";import"./InputLabel-RKPNgSoW.js";import"./TooltipIcon-9SG9vwuW.js";import"./LegacyTooltip-8C24OgCi.js";import"./useLink-BQDoW3mf.js";import"./IconExclamationMarkCircle24-BSoLODou.js";import"./IconQuestionMarkCircle-DwcKSdMS.js";import"./Switch-wdnbPpFm.js";import"./TabItem-D5LwT7_5.js";import"./TextInput-Dz32-b9A.js";import"./Tooltip-BU8jlWYN.js";import"./useClickOutside-J1ExsWnc.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DHmt4Idc.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-CrA51qy3.js";import"./IconIcon16-Bv3E9ZmX.js";import"./IconIcon24-CRCY95mk.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
