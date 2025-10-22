import{r as p,j as e}from"./iframe-DvE_Cfbx.js";import{B as j}from"./Button-D4w0aNJF.js";import{C as T}from"./Container-JfmKwdQ1.js";import{P as c}from"./Popover-oquhKdww.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CtL4mprZ.js";import{I as P}from"./IconJohanna-CaX0CZFj.js";import"./preload-helper-DpV-BRze.js";import"./useButton-Cnlh5iFm.js";import"./useFocusable-YbUi6w36.js";import"./useFocusRing-DzW8Z_47.js";import"./useEffectEvent-BtTn6BuB.js";import"./chain-EXX0zfKx.js";import"./index-C1x3BvL1.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dp80e-XP.js";import"./borderStyle-D9jrV09G.js";import"./input-BbtE7GOK.js";import"./Divider-BWXyH0fd.js";import"./Dropdown-BcR6SuzD.js";import"./FocusScope-CICA33ZM.js";import"./useOverlayTriggerState-VX9MWZa-.js";import"./useControlledState-B4RRmpoX.js";import"./useMenuTrigger-B0K6261F.js";import"./useLabels-B4qGKxij.js";import"./useLocalizedStringFormatter-uH6M_LlD.js";import"./context-CjYtJ2Dh.js";import"./VisuallyHidden-CH37k1zR.js";import"./helper-hQLxgAVw.js";import"./keyboard-Do92NHuN.js";import"./SelectionManager-DmiDq3y6.js";import"./useField-D1PK1BbW.js";import"./useFormValidationState-DTcHrzlU.js";import"./usePopper-0GpztLz0.js";import"./index-CgHmLPyd.js";import"./MenuItem-DjyGJryO.js";import"./IconCaretRight-DG2OLDac.js";import"./IconCheckMark-BnWU-4-4.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B7EbVwIE.js";import"./Trigger-WSkRExH6.js";import"./IconCaretDown-BLKtQPMT.js";import"./IconCaretDown16-tjMVBqmZ.js";import"./IconCross-ILvZHpzK.js";import"./IconTrashBin16-Ye7gwNbF.js";import"./IconTrashBin24-D62Bq0Kp.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-VFf8OAPW.js";import"./Portal-DXJII2sF.js";import"./useMemoizedId-DamS-zza.js";import"./FormControl-DQTGT8Qd.js";import"./InputLabel-CPiknDaM.js";import"./TooltipIcon-BgeNhtJq.js";import"./LegacyTooltip-HylOrONJ.js";import"./useLink-DFHjCfB3.js";import"./IconExclamationMarkCircle24-DG3gLjOd.js";import"./IconQuestionMarkCircle-DyvTHndi.js";import"./Switch-D0uhFjX4.js";import"./TabItem-lY2wl6EQ.js";import"./TextInput-JeIEGuUe.js";import"./Tooltip-CI2uwgUy.js";import"./useClickOutside-BRVMQ9di.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CNHT-QdV.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BeKRmNeI.js";const ze={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
