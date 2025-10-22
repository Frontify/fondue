import{r as p,j as e}from"./iframe-CHTDhBOw.js";import{B as j}from"./Button-BGdoAku5.js";import{C as T}from"./Container-B5GYVFUv.js";import{P as c}from"./Popover-BgfI2Jqu.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-mlvDeGrH.js";import{I as P}from"./IconJohanna-CHc-af32.js";import"./preload-helper-DpV-BRze.js";import"./useButton-DQwwQNDs.js";import"./useFocusable-wUQP4iRG.js";import"./useFocusRing-B9ljnzvU.js";import"./useEffectEvent-C_zZUYtw.js";import"./chain-gGRwirEw.js";import"./index-NZpU9fsB.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CBPJusEs.js";import"./borderStyle-D9jrV09G.js";import"./input-djRa9qHK.js";import"./Divider-CIYdp59O.js";import"./Dropdown-jHV7NTSi.js";import"./FocusScope-CbrJ0X92.js";import"./useOverlayTriggerState-ChnurNZW.js";import"./useControlledState-Dyp77OM5.js";import"./useMenuTrigger-grTO5Qe1.js";import"./useLabels-IJBk5yiI.js";import"./useLocalizedStringFormatter-BQCdTs0l.js";import"./context-BiY5BK-o.js";import"./VisuallyHidden-BCHw-yIg.js";import"./helper-B9AmTkD4.js";import"./keyboard-Db7mZRua.js";import"./SelectionManager-CfehHhqG.js";import"./useField-yVlFEyW7.js";import"./useFormValidationState-B2zh8KVN.js";import"./usePopper-C5FqElHn.js";import"./index-B1BGL-gG.js";import"./MenuItem-Uj9s8-V9.js";import"./IconCaretRight-B_wMabco.js";import"./IconCheckMark-CQY-3-zS.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CH8flQ6d.js";import"./Trigger-Bl0mFWY9.js";import"./IconCaretDown-B2SIJpLO.js";import"./IconCaretDown16-Cz4JQCqT.js";import"./IconCross-DWeuQ1JS.js";import"./IconTrashBin16-P9BnFBNa.js";import"./IconTrashBin24-BtqjXLr0.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BLiyXpiv.js";import"./Portal-nIPd8MLx.js";import"./useMemoizedId-BEUTTPGp.js";import"./FormControl-BzDjNNoV.js";import"./InputLabel-QcPAW579.js";import"./TooltipIcon-D1bgs6mY.js";import"./LegacyTooltip-uEHKcS05.js";import"./useLink-C1eg4OUw.js";import"./IconExclamationMarkCircle24-DIy9V4jm.js";import"./IconQuestionMarkCircle-DSmq-Pjo.js";import"./Switch-Bn7c7Gvc.js";import"./TabItem-BUF1jYrI.js";import"./TextInput-CWHjYK3t.js";import"./Tooltip-izQuXX3x.js";import"./useClickOutside-TKpqzDgM.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CQXnKAKI.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-C2n0SPiZ.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
