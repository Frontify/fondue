import{r as a,j as e}from"./iframe-B6Fsh8wO.js";import{B as j}from"./Button-CTeWu5QI.js";import{C as T}from"./Container-BpZKYJOM.js";import{P as c}from"./Popover-CP4106qQ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-C2uJYOwY.js";import{I as P}from"./IconIcon-X4VK5Uiq.js";import"./preload-helper-C7xgB0v-.js";import"./useButton-C_YFdV8A.js";import"./useFocusable-CeOvDitS.js";import"./useFocusRing-Bdrp9XdB.js";import"./useEffectEvent-Dl59sVm-.js";import"./chain-C6B0p970.js";import"./index-CoZ5L15w.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DZIHhLpx.js";import"./borderStyle-D9jrV09G.js";import"./input-SgIqKYa5.js";import"./Divider-Bnk8qrLs.js";import"./Dropdown-BEGPwQIj.js";import"./FocusScope-ClH7KjZa.js";import"./useOverlayTriggerState-1mg1A1KF.js";import"./useControlledState-CJn3VMU_.js";import"./useMenuTrigger-BYllBfWO.js";import"./useLabels-zcWK2wri.js";import"./useLocalizedStringFormatter-CQaq9hql.js";import"./context-CsJ_YUC1.js";import"./VisuallyHidden-DG9XBPVM.js";import"./helper-BJlGUtn-.js";import"./keyboard-Cw3s1FpC.js";import"./SelectionManager-Bua5579K.js";import"./useField-CSBdA6n2.js";import"./useFormValidationState-cJc_Go-N.js";import"./usePopper-B0nz0Esg.js";import"./index-Bx1oau7k.js";import"./MenuItem-CradgR82.js";import"./IconCaretRight-DpO6Gkbq.js";import"./IconCheckMark-DssBFA02.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BbWdkKq5.js";import"./Trigger-CFa4fkib.js";import"./IconCaretDown-B5NftqOx.js";import"./IconCaretDown16-a2jOArLI.js";import"./IconCross-CoWtkC50.js";import"./IconTrashBin16-BvngYm6R.js";import"./IconTrashBin24-Coai0v3x.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BvIBe2v_.js";import"./Portal-ig7PMOYe.js";import"./useMemoizedId-DHoNY-YT.js";import"./FormControl-CZcnzlmK.js";import"./InputLabel-C3itSB6h.js";import"./TooltipIcon-BseKfH2P.js";import"./LegacyTooltip-DclvBP1X.js";import"./useLink-Dk33Rpfs.js";import"./IconExclamationMarkCircle24-xFA6TqE-.js";import"./IconQuestionMarkCircle-sp7lPGqD.js";import"./Switch-DUWVxLi-.js";import"./TabItem-1rwAvsm2.js";import"./TextInput-B_U6EtAR.js";import"./Tooltip-DWGrBfIB.js";import"./useClickOutside-BAGN5dDk.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Cyx_z67h.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DDo1kmbH.js";import"./IconIcon16-C5UnHEsZ.js";import"./IconIcon24-CCm8Wx90.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
