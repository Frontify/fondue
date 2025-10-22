import{r as p,j as e}from"./iframe-H4EIHqlx.js";import{B as j}from"./Button-CXaEniIA.js";import{C as T}from"./Container-DuA8Qtuz.js";import{P as c}from"./Popover-BEmoG2TY.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-K99hKmWz.js";import{I as P}from"./IconJohanna-B30UxU1C.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-mGVAuZHj.js";import"./useFocusable-DTCa4SqE.js";import"./useFocusRing-BgUd5BR7.js";import"./useEffectEvent-C_IQxYhx.js";import"./chain-DQvBJnse.js";import"./index-DlrjtBmU.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CeL6hrg8.js";import"./borderStyle-D9jrV09G.js";import"./input-DFiASiDy.js";import"./DialogBody-DhEbP-Iq.js";import"./dialog-D9O7a7Fm.js";import"./Divider-zfqb8AiO.js";import"./Dropdown-D9la7LTr.js";import"./FocusScope-qW6Sf1bq.js";import"./useOverlayTriggerState-D-nAPxky.js";import"./useControlledState-BwCEOs4d.js";import"./useMenuTrigger-2a9WK_4Y.js";import"./useLabels-FTiAqVtv.js";import"./useLocalizedStringFormatter-A6H_epb7.js";import"./context-pc1t5AW0.js";import"./VisuallyHidden-BxoBsTUN.js";import"./helper-BLUOy31a.js";import"./keyboard-Bgy3IRLV.js";import"./SelectionManager-CzbgPH4w.js";import"./useField-CEvqkjOx.js";import"./useFormValidationState-CMOyU9tG.js";import"./usePopper-BDBm9nqb.js";import"./index-DsgG594b.js";import"./MenuItem-Dabj5Jcl.js";import"./IconCaretRight-DSSd_h10.js";import"./IconCheckMark-CHxLPHD4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-cqNAwJed.js";import"./Trigger-EEtgFzPe.js";import"./IconCaretDown-D2PohoYe.js";import"./IconCaretDown16-CI4FxQbC.js";import"./IconCross-CxjY-Hqb.js";import"./IconTrashBin16-DnTUTGRm.js";import"./IconTrashBin24-cmiN-QmN.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DYlU6loR.js";import"./Portal-CW7VmUKg.js";import"./useMemoizedId-UwiqPoY6.js";import"./FormControl-Cc6HWobq.js";import"./InputLabel-Dn-dwoK-.js";import"./TooltipIcon-BIasiFqw.js";import"./LegacyTooltip-CjQ6vgqx.js";import"./useLink-d86eSztZ.js";import"./IconExclamationMarkCircle24-CzbbaGxH.js";import"./IconQuestionMarkCircle-DGOXOD6s.js";import"./Switch-CVeASn2J.js";import"./TabItem-D2N0FtOf.js";import"./TextInput-D6FRwz5L.js";import"./Tooltip-m5iD4_xo.js";import"./useClickOutside-BTiX37Ac.js";import"./Tree-CwejBv94.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-ChMo0sGD.js";const Ge={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(O=(h=o.parameters)==null?void 0:h.docs)==null?void 0:O.source}}};var w,x,C;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(C=(x=s.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var I,v,R;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Container padding={8}>
                    <p>Some Content</p>
                </Container>
            </Popover>
        </div>;
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ye=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ye as __namedExportsOrder,Ge as default};
