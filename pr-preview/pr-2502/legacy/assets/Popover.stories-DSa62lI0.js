import{r as p,j as e}from"./iframe-CfLhI7P0.js";import{B as j}from"./Button-BoqHsuHZ.js";import{C as T}from"./Container-Big5zPeK.js";import{P as c}from"./Popover-PDH05BQd.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DumzWRNf.js";import{I as P}from"./IconJohanna-BRQtt3J1.js";import"./preload-helper-B933Jwna.js";import"./useButton-CafHKOqV.js";import"./useFocusable-DqnO4tDK.js";import"./useFocusRing-c6u9Vcjk.js";import"./useEffectEvent-DgjNhOdj.js";import"./chain-C2bpwpa8.js";import"./index-CNTxu6fp.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-C_ryCKA4.js";import"./borderStyle-D9jrV09G.js";import"./input-BglkpoJb.js";import"./Divider-Ks3wbiQC.js";import"./Dropdown-CVUPTM-k.js";import"./FocusScope-Ci5ycIsU.js";import"./useOverlayTriggerState-CFYEaNmX.js";import"./useControlledState-CikZhwQf.js";import"./useMenuTrigger-Ddxx7kXJ.js";import"./useLabels-C5VNH8gT.js";import"./useLocalizedStringFormatter-BY0SNe9w.js";import"./context-CFy5Jnbr.js";import"./VisuallyHidden-BrtBoVFd.js";import"./helper-D-lWvwnP.js";import"./keyboard-BcVSFiEu.js";import"./SelectionManager-B5h8l_Gt.js";import"./useField-pWbNefD1.js";import"./useFormValidationState-Dii868hQ.js";import"./usePopper-BDJCEm0e.js";import"./index-BXHlWwjT.js";import"./MenuItem-CDWDwpry.js";import"./IconCaretRight-BbFToOJp.js";import"./IconCheckMark-Bvx1Okuv.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DTujLDLf.js";import"./Trigger-P2NWPnIL.js";import"./IconCaretDown-ip8hOLG9.js";import"./IconCaretDown16-0kUT5ueY.js";import"./IconCross-VvQFK0HB.js";import"./IconTrashBin16-Vihvm3Ba.js";import"./IconTrashBin24-Do203-AB.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BAwlIUsk.js";import"./Portal-Bzui0qVf.js";import"./useMemoizedId-DO6EWKyA.js";import"./FormControl-2ECwXhan.js";import"./InputLabel-x_7jnmE7.js";import"./TooltipIcon-Dzp2Dow-.js";import"./LegacyTooltip-69ja691T.js";import"./useLink-tlq5fiSd.js";import"./IconExclamationMarkCircle24-BD4txlzy.js";import"./IconQuestionMarkCircle-CWL1qffP.js";import"./Switch-D28II4BQ.js";import"./TabItem-CchQBcbM.js";import"./TextInput-CSebAqb7.js";import"./Tooltip-BcZ9yLZa.js";import"./useClickOutside-eWoCMSRP.js";import"./dialog-D9O7a7Fm.js";import"./Tree-6av9Ag9R.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BQCI9tlF.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
