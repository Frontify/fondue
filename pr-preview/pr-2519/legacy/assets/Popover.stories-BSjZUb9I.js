import{r as a,j as e}from"./iframe-CVRB9xG5.js";import{B as j}from"./Button-DRuLCDDt.js";import{C as T}from"./Container-BHzBt31y.js";import{P as c}from"./Popover-DyDEKW9E.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CDVeuzB2.js";import{I as P}from"./IconIcon-CVDNdNrf.js";import"./preload-helper-MprHWY6w.js";import"./useButton-BKijJ8Ox.js";import"./useFocusable-K9LUaTpT.js";import"./useFocusRing-CIR8l5qb.js";import"./useEffectEvent-D4McFjJW.js";import"./chain-CmopQXAK.js";import"./index-C6YV3ckd.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-DJoc6VJd.js";import"./borderStyle-D9jrV09G.js";import"./input-DIG8XJhi.js";import"./Divider-COlvtABj.js";import"./Dropdown-BZ-q_Yo7.js";import"./FocusScope-tItaIZX5.js";import"./useOverlayTriggerState-GQW_x-1C.js";import"./useControlledState-Bj_ZyrJ6.js";import"./useMenuTrigger-DXxV6CNV.js";import"./useLabels-SLuP_5C7.js";import"./useLocalizedStringFormatter-CXhFz9Uz.js";import"./context-DA4el76b.js";import"./VisuallyHidden-BFQqEv8e.js";import"./helper-DhtKJs8K.js";import"./keyboard-BKGhVC1E.js";import"./SelectionManager-C7n6sNA4.js";import"./useField-DQHpHPfW.js";import"./useFormValidationState-Cf_zmRn5.js";import"./usePopper-BPdQg_1a.js";import"./index-Dm3ZYyOZ.js";import"./MenuItem-nXi4WjEb.js";import"./IconCaretRight-zxwIR15_.js";import"./IconCheckMark-D8jA0-uN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D2yuAP7u.js";import"./Trigger-CsKuBAxO.js";import"./IconCaretDown-Dk5eGzJF.js";import"./IconCaretDown16-D-_xQ8kJ.js";import"./IconCross-DXx1uM3O.js";import"./IconTrashBin16-BDkWhi4I.js";import"./IconTrashBin24-BLra6c_I.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CVWQx04t.js";import"./Portal-C9aGMHWR.js";import"./useMemoizedId-DZ_GWwWH.js";import"./FormControl-CQTEks-w.js";import"./InputLabel-DYgwFPIk.js";import"./TooltipIcon-CSS_ITO5.js";import"./LegacyTooltip-bqc1XdDN.js";import"./useLink-Bi6OJ7FT.js";import"./IconExclamationMarkCircle24-DEAcLkxP.js";import"./IconQuestionMarkCircle-pq_7Xd4U.js";import"./Switch-qFvrWM4M.js";import"./TabItem-D5Bmdvm6.js";import"./TextInput-D688XE6y.js";import"./Tooltip-Q8dstYik.js";import"./useClickOutside-CH4jqpXL.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BhxCNV8P.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-CzJn6JJ4.js";import"./IconIcon16-DpNto2vM.js";import"./IconIcon24-BDr-p4NH.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
