import{r as a,j as e}from"./iframe-Syg1N3Dt.js";import{B as j}from"./Button-BFs_n6MT.js";import{C as T}from"./Container-JJ6BdOIH.js";import{P as c}from"./Popover-Y4qSLRCI.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DJ78vW8L.js";import{I as P}from"./IconIcon-DCZWogsb.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-3D8uMnpX.js";import"./useFocusable-DzcY2h-6.js";import"./useFocusRing-CNnJjRGa.js";import"./useEffectEvent-_xfm6Ewt.js";import"./chain-_zCgTghY.js";import"./index-zygbjzbv.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CaWE6VsJ.js";import"./borderStyle-D9jrV09G.js";import"./input-BrLvrPMg.js";import"./Divider-CzVOQ1Js.js";import"./Dropdown-FbW3XryH.js";import"./FocusScope-BnipxogD.js";import"./useOverlayTriggerState-B9wdWD5W.js";import"./useControlledState-DY5nY8Wt.js";import"./useMenuTrigger-nOoY-5UA.js";import"./useLabels-B3d7_WnD.js";import"./useLocalizedStringFormatter-Dm55UTSr.js";import"./context-BwIwx3bW.js";import"./VisuallyHidden-b3B-snrg.js";import"./helper-kDDgvgzp.js";import"./keyboard-qlZGpQI7.js";import"./SelectionManager-CvY-fpmx.js";import"./useField-DLq7O62T.js";import"./useFormValidationState-D0MtgxJw.js";import"./usePopper-B30N6m7R.js";import"./index-DCKuEH0C.js";import"./MenuItem-vWr4hvv2.js";import"./IconCaretRight-BYNbkOLO.js";import"./IconCheckMark-DYOFifCV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Bk8CKUnf.js";import"./Trigger-8K1Z5TCZ.js";import"./IconCaretDown-BM9A8thm.js";import"./IconCaretDown16-CJ0CPWki.js";import"./IconCross-BYLKbJOe.js";import"./IconTrashBin16-B-os8M5m.js";import"./IconTrashBin24-B7qkH7Me.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BPSk3zeA.js";import"./Portal-Bs2LRsId.js";import"./useMemoizedId-C9g_fFO8.js";import"./FormControl-hBMNzJT5.js";import"./InputLabel-BiMasARO.js";import"./TooltipIcon-DfPc9HBh.js";import"./LegacyTooltip-BEqX41nh.js";import"./useLink-wNWEYCfF.js";import"./IconExclamationMarkCircle24-Dn7AMifS.js";import"./IconQuestionMarkCircle-CuSuBHcI.js";import"./Switch-cBzas6OX.js";import"./TabItem-D-04gcC8.js";import"./TextInput-C_NhoOs1.js";import"./Tooltip-JU-TLIRP.js";import"./useClickOutside-ChN67Rl1.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C_Tw8-89.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-B2npFYMD.js";import"./IconIcon16-BARz5uTQ.js";import"./IconIcon24-GwEmUqGW.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
