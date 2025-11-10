import{r as a,j as e}from"./iframe-C8H_7DY9.js";import{B as j}from"./Button-DVNUWGG3.js";import{C as T}from"./Container-CGddEgn_.js";import{P as c}from"./Popover-C7Q3pQ1j.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CS0LP3d9.js";import{I as P}from"./IconIcon-iGJQ7amK.js";import"./preload-helper-DXpIkoC8.js";import"./useButton-t9MXzejI.js";import"./useFocusable-8qbfmW5v.js";import"./useFocusRing-CJxA-gpa.js";import"./useEffectEvent-VMJO_dOH.js";import"./chain-BXb1kVuv.js";import"./index-DZCJL87_.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BO92NLkH.js";import"./borderStyle-D9jrV09G.js";import"./input-Czrebvap.js";import"./Divider-BpmF_J73.js";import"./Dropdown-DfNjV_ZV.js";import"./FocusScope-C1bX1n8D.js";import"./useOverlayTriggerState-DC6hQTLJ.js";import"./useControlledState-C2cdbZxy.js";import"./useMenuTrigger-BjcfuX5m.js";import"./useLabels-72emSVl1.js";import"./useLocalizedStringFormatter-cm118eAR.js";import"./context-BTMC7ivx.js";import"./VisuallyHidden-BoBFLgJk.js";import"./helper-CmB9xjw3.js";import"./keyboard-BenEYFGr.js";import"./SelectionManager-COazW9mI.js";import"./useField-DaD3Atg1.js";import"./useFormValidationState-DpfiB6vy.js";import"./usePopper-vtl3bzbL.js";import"./index-C3FFT934.js";import"./MenuItem-B0WXsgJ8.js";import"./IconCaretRight-DOUKjwPz.js";import"./IconCheckMark-B_lKELEt.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BdlCAikA.js";import"./Trigger-C--yUzlG.js";import"./IconCaretDown-CTppYQfl.js";import"./IconCaretDown16-B77Q68v1.js";import"./IconCross-CiHpCsD-.js";import"./IconTrashBin16-B9SVOy9U.js";import"./IconTrashBin24-v7uaG4hB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Civee1Xz.js";import"./Portal-CTZNYkGv.js";import"./useMemoizedId-DVcqOGKj.js";import"./FormControl-M1v2DF3z.js";import"./InputLabel-CBDugHuf.js";import"./TooltipIcon-Mqj9Z8ia.js";import"./LegacyTooltip-B_h0nf2a.js";import"./useLink-s7baPPKW.js";import"./IconExclamationMarkCircle24-Ca9Amb8y.js";import"./IconQuestionMarkCircle-BXeztdNR.js";import"./Switch-DNNxcjn1.js";import"./TabItem-CUf-Qhvj.js";import"./TextInput-Cqo3PLSF.js";import"./Tooltip-BP3Y9Y1a.js";import"./useClickOutside-C6oP5oUz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DUasgvv9.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DG07jT0q.js";import"./IconIcon16-BVUNeovq.js";import"./IconIcon24-Bq4bkSOT.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
