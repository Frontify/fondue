import{r as p,j as e}from"./iframe-BYgk9eGi.js";import{B as j}from"./Button-BFRQ7uMU.js";import{C as T}from"./Container-DnABtEK_.js";import{P as c}from"./Popover-BAE0Vf2m.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BZIhdvAU.js";import{I as P}from"./IconIcon-Cxo3Py9G.js";import"./preload-helper-C4wRLVzE.js";import"./useButton-aMrX7lQB.js";import"./useFocusable-DWkWAuuj.js";import"./useFocusRing-B9FX5t9d.js";import"./useEffectEvent-C0BQ6d8E.js";import"./chain-DewOEu23.js";import"./index-JL1iOob4.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CHcpe9rj.js";import"./borderStyle-D9jrV09G.js";import"./input-CHp1aGuG.js";import"./Divider-t83pYnJu.js";import"./Dropdown-55K6xzNt.js";import"./FocusScope-CLV--g8F.js";import"./useOverlayTriggerState-B1KvkfS4.js";import"./useControlledState-WuYbSOBR.js";import"./useMenuTrigger-DtAliMr4.js";import"./useLabels-DNjgnGlH.js";import"./useLocalizedStringFormatter-D3YJL1Sl.js";import"./context-DhZg-eiB.js";import"./VisuallyHidden-Cxyhrmyz.js";import"./helper-DwPYLC8Q.js";import"./keyboard-DUIElv65.js";import"./SelectionManager-ihQjKTL6.js";import"./useField-tEdRTGkN.js";import"./useFormValidationState-CCcBhnXp.js";import"./usePopper-Bjy0ueTZ.js";import"./index-DF7w3mCS.js";import"./MenuItem-DsRkCZfU.js";import"./IconCaretRight-ZPWSrGDF.js";import"./IconCheckMark-C86ecLPI.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DFHIC5me.js";import"./Trigger-CXI_k5eO.js";import"./IconCaretDown-DJft5W7d.js";import"./IconCaretDown16-DFWIPfbf.js";import"./IconCross-CHQ9kAFF.js";import"./IconTrashBin16-DKWtSmRV.js";import"./IconTrashBin24-C-V8KFup.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BnAgViow.js";import"./Portal-DSR4zoF2.js";import"./useMemoizedId-DTXcstyd.js";import"./FormControl-Rgqig6QS.js";import"./InputLabel-BzgpUWCY.js";import"./TooltipIcon-KrhHCJfq.js";import"./LegacyTooltip-DepAC3Bc.js";import"./useLink-YF0z-YX4.js";import"./IconExclamationMarkCircle24-vzChveiq.js";import"./IconQuestionMarkCircle-DNg9QlGt.js";import"./TabItem-Crjs_qi7.js";import"./TextInput-hOyDqsAD.js";import"./Tooltip-BymIuUo6.js";import"./useClickOutside-DqRgZ3e-.js";import"./dialog-D9O7a7Fm.js";import"./Tree-l_6RWbbv.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-orZPE0b5.js";import"./IconIcon16-CEOPLr-r.js";import"./IconIcon24-DHbgf2rn.js";const Ye={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const qe=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,qe as __namedExportsOrder,Ye as default};
