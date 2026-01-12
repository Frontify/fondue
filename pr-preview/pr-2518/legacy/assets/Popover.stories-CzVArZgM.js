import{r as a,j as e}from"./iframe-D_BOSi7z.js";import{B as j}from"./Button-C4MmvNvx.js";import{C as T}from"./Container-wBHGQ_EY.js";import{P as c}from"./Popover-DOqdzZVg.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-xQH9byf_.js";import{I as P}from"./IconIcon-B0CrwNM1.js";import"./preload-helper-D9dL-qgt.js";import"./useButton-DYuGFIG_.js";import"./useFocusable-PX_TjPkN.js";import"./useFocusRing-3FNqU6ul.js";import"./useEffectEvent-CC_qXDJd.js";import"./chain-BCugQ9l9.js";import"./index-D-wBK1Ng.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BEOERL60.js";import"./borderStyle-D9jrV09G.js";import"./input-D8gYQp8j.js";import"./DialogBody-9rO_vFOY.js";import"./dialog-D9O7a7Fm.js";import"./Divider-B8ud-vsx.js";import"./Dropdown-Br8fivGJ.js";import"./FocusScope-uWXJwkLD.js";import"./useOverlayTriggerState-BjgsoR16.js";import"./useControlledState-edCwLap7.js";import"./useMenuTrigger-kwJADy-_.js";import"./useLabels-5DLMGvEt.js";import"./useLocalizedStringFormatter-Dl3iXdBr.js";import"./context-OJGXQKbu.js";import"./VisuallyHidden-BRbrFR-P.js";import"./helper-Bp7JDzWt.js";import"./keyboard-BOx3Eis0.js";import"./SelectionManager-DzBiEzjS.js";import"./useField-CL0EjCjO.js";import"./useFormValidationState-CKHn6c8R.js";import"./usePopper-CWJKvBxE.js";import"./index-C8RUnOp5.js";import"./MenuItem-r3ehSA8w.js";import"./IconCaretRight-CfLspMN-.js";import"./IconCheckMark-DdBrvFtV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CyHsgIab.js";import"./Trigger-DA871_2-.js";import"./IconCaretDown-36ngw1UT.js";import"./IconCaretDown16-Co6QTjBw.js";import"./IconCross-ByijIFm9.js";import"./IconTrashBin16-q9e-rIJ9.js";import"./IconTrashBin24-CFl-qnHA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cg-A3hzO.js";import"./Portal-CoV8HD0d.js";import"./useMemoizedId-C_W2q-Ms.js";import"./FormControl-Dtgtea_0.js";import"./InputLabel-CtdBwKXa.js";import"./TooltipIcon-C4hpdbpH.js";import"./LegacyTooltip-wq0qLjqe.js";import"./useLink-JLbnaYkl.js";import"./IconExclamationMarkCircle24-BuQiGPe5.js";import"./IconQuestionMarkCircle-BhtGQ5mm.js";import"./Switch-CQ93vPgz.js";import"./TabItem-l5qSmNdO.js";import"./TextInput-ywF1gWpG.js";import"./Tooltip-BW6m7Y-x.js";import"./useClickOutside-DWNA6lpA.js";import"./Tree-CKJD2kKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BJ7X_RsB.js";import"./IconIcon16-B0vWrUBW.js";import"./IconIcon24-ChE4rgOw.js";const Je={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
