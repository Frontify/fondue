import{r as a,j as e}from"./iframe-SquABeg9.js";import{B as j}from"./Button-bhuDGfA_.js";import{C as T}from"./Container-9f9-X7tU.js";import{P as c}from"./Popover-BNRjWzB4.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CsYvi7vh.js";import{I as P}from"./IconIcon-C6KdYx6G.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-CIEkMiEW.js";import"./useFocusable-DSYH9RGK.js";import"./useFocusRing-BNK5FnXw.js";import"./useEffectEvent-I7gaBWEc.js";import"./chain-DWdr7d2C.js";import"./index-B6kSvp4Y.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DUDHtOFb.js";import"./borderStyle-D9jrV09G.js";import"./input-IHYNAO0Y.js";import"./Divider-BZjJAXxX.js";import"./Dropdown-loYZguqP.js";import"./FocusScope-BNpOWlK1.js";import"./useOverlayTriggerState-TQABtVAH.js";import"./useControlledState-CKOYWGYS.js";import"./useMenuTrigger-DnkaOMKE.js";import"./useLabels-C2pOqwIg.js";import"./useLocalizedStringFormatter-9I6FMkHq.js";import"./context-DonO3nJ8.js";import"./VisuallyHidden-B0vXfdTD.js";import"./helper-CeKBxdXa.js";import"./keyboard-DlKDWBwh.js";import"./SelectionManager-CyzKPpQE.js";import"./useField-IHSvhna4.js";import"./useFormValidationState-DSSo4usY.js";import"./usePopper-D1AGYINs.js";import"./index-DDB6fytH.js";import"./MenuItem-BwhCH_fz.js";import"./IconCaretRight-BUVD6u9U.js";import"./IconCheckMark-66M7SP9V.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DJUiJZHt.js";import"./Trigger-CeaegHCh.js";import"./IconCaretDown-0LGKf1hU.js";import"./IconCaretDown16-i3yW0a_h.js";import"./IconCross-Cti5Whzf.js";import"./IconTrashBin16-D4ch4T_K.js";import"./IconTrashBin24-DvkTTty9.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DB6ILfFA.js";import"./Portal-jeo8LuUZ.js";import"./useMemoizedId-ClOqGxXF.js";import"./FormControl-CHlMP_eN.js";import"./InputLabel-f3Z9IsXu.js";import"./TooltipIcon-BeNX6opp.js";import"./LegacyTooltip-kSW3trmM.js";import"./useLink-BZ12yVmf.js";import"./IconExclamationMarkCircle24-DFTnLpMP.js";import"./IconQuestionMarkCircle-BlPUz1KK.js";import"./Switch-BlNXVOTN.js";import"./TabItem-DRZ9YnlT.js";import"./TextInput-D54uz858.js";import"./Tooltip-B0voCar7.js";import"./useClickOutside-C9lEFXjz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CIOoVjhp.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-B0l4j4Hn.js";import"./IconIcon16-Cl1UB5lb.js";import"./IconIcon24-lzPlbpt9.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
