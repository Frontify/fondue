import{r as a,j as e}from"./iframe-BTc0KMXu.js";import{B as j}from"./Button-4v4SY4EE.js";import{C as T}from"./Container-BpV_KYt5.js";import{P as c}from"./Popover-bEGunAeo.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle--6YVzded.js";import{I as P}from"./IconIcon-Dw9EMtHb.js";import"./preload-helper-DyHTrhc7.js";import"./useButton-Byswzb6B.js";import"./useFocusable-BVaAWhEn.js";import"./useFocusRing-Eh4zIRvV.js";import"./useLayoutEffect-Bhzdz1pW.js";import"./chain-_H33-WwR.js";import"./index-BCmaXsFD.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DCpDn0fb.js";import"./borderStyle-D9jrV09G.js";import"./input-D2GxCp2g.js";import"./Checkbox-CFXFhtyK.js";import"./useFormValidationState-C8mLtM0B.js";import"./useControlledState-yMhDR9az.js";import"./InputLabel-R2OQSMdq.js";import"./TooltipIcon-C_bcpkU6.js";import"./LegacyTooltip-0-B2Yxn7.js";import"./useLink-BF3wb2Hj.js";import"./usePopper-B_jEVmaR.js";import"./index-CrCKdNAz.js";import"./Portal-Dz4APVce.js";import"./useMemoizedId-C1ZtptnH.js";import"./IconCheckMark-CP9wktNS.js";import"./IconExclamationMarkCircle24-BCcu29DI.js";import"./IconQuestionMarkCircle-BJhajIiR.js";import"./IconMinus-lFm3XErM.js";import"./Divider-C8c4gguy.js";import"./Dropdown-DIRAFP45.js";import"./FocusScope-Hd9memky.js";import"./useOverlayTriggerState-D6_wqmHJ.js";import"./useMenuTrigger-CiIT_dfL.js";import"./useLabels-702ZkEtX.js";import"./useLocalizedStringFormatter-Dv9VvTFf.js";import"./context-D3baERfd.js";import"./VisuallyHidden-CgDuI4Wj.js";import"./helper-U7aLmhzN.js";import"./keyboard-BJYrNJXw.js";import"./SelectionManager-Cv8KeFy1.js";import"./useField-CKfh6VT1.js";import"./MenuItem-TWTNz5L6.js";import"./IconCaretRight-oI_MBEQP.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DNgo8LFv.js";import"./Trigger-B84DjInz.js";import"./IconCaretDown-CbkGi4X7.js";import"./IconCaretDown16-f1XXOg7-.js";import"./IconCross-DyMKw9aw.js";import"./IconTrashBin16-BDBRvQHf.js";import"./IconTrashBin24-B019_xFM.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cxj4rGm4.js";import"./FormControl-D5_MeXnd.js";import"./Switch-BU4fLFX4.js";import"./TabItem-DympXqX9.js";import"./TextInput-6Iwkf2b4.js";import"./Tooltip-CarU3Bj3.js";import"./useClickOutside-DpkMaEyb.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Ch8oFjlR.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DEGneVxR.js";import"./IconIcon16-CWgD9UmR.js";import"./IconIcon24-CZTr_nGm.js";const Ke={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Qe=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Qe as __namedExportsOrder,Ke as default};
