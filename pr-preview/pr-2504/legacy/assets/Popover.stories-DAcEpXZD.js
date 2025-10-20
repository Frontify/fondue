import{r as p,j as e}from"./iframe-O_XuH54Q.js";import{B as j}from"./Button-B58Ioqyx.js";import{C as T}from"./Container-ouOrwclH.js";import{P as c}from"./Popover-UIkH9ACG.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-B1eeTH9v.js";import{I as P}from"./IconJohanna-ClzdPHoK.js";import"./preload-helper-OKB6Z3Tn.js";import"./useButton-C8BySKAQ.js";import"./useFocusable-C0fuhW15.js";import"./useFocusRing-Bqot2-Rk.js";import"./useEffectEvent-DACClfwZ.js";import"./chain-C6q0R5T-.js";import"./index-BVb_rcK3.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-p9n4chOp.js";import"./borderStyle-D9jrV09G.js";import"./input-hHIqtYHh.js";import"./Divider-yYtBfNCG.js";import"./Dropdown-CisXlk34.js";import"./FocusScope-3do7GGAS.js";import"./useOverlayTriggerState-kzEfGejS.js";import"./useControlledState-B6qV4UF7.js";import"./useMenuTrigger-BkxjOV5I.js";import"./useLabels-vi5D6r2t.js";import"./useLocalizedStringFormatter-Xd96at2a.js";import"./context-CYxI3e2S.js";import"./VisuallyHidden-TL1dlXLg.js";import"./helper-B92HrXNX.js";import"./keyboard-Bkql7voq.js";import"./SelectionManager-BnFpMhKG.js";import"./useField-B-7APjb3.js";import"./useFormValidationState-C1mqDRzs.js";import"./usePopper-CVWvsVB1.js";import"./index-BLmxJglX.js";import"./MenuItem-BvAIyVQb.js";import"./IconCaretRight-7Y9Pbj0u.js";import"./IconCheckMark-BeCL8EEQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B4E3yWjH.js";import"./Trigger-Bdyc308T.js";import"./IconCaretDown-CeAN14oY.js";import"./IconCaretDown16-CXHhXr84.js";import"./IconCross-iTiFWRH5.js";import"./IconTrashBin16-BE79xRak.js";import"./IconTrashBin24-BjrrNMTQ.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNQxf1Z5.js";import"./Portal-C3Khk6dG.js";import"./useMemoizedId-BWUvvHPY.js";import"./FormControl-BzAndHoF.js";import"./InputLabel-J904gGNu.js";import"./TooltipIcon-BBkgYmHu.js";import"./LegacyTooltip-DF0yijww.js";import"./useLink-DIfoGhG2.js";import"./IconExclamationMarkCircle24-BJXQgdBn.js";import"./IconQuestionMarkCircle-D3VJ3tCq.js";import"./Switch-CZzOpnJT.js";import"./TabItem-DGj8BxC4.js";import"./TextInput-D-u9u7p0.js";import"./Tooltip-Ck3jaqE5.js";import"./useClickOutside-BlXnLcs9.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DTx26U4T.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-ClNbD2R3.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ge=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ge as __namedExportsOrder,ze as default};
