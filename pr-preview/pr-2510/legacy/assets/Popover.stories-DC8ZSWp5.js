import{r as p,j as e}from"./iframe-n26UMXeS.js";import{B as j}from"./Button-RK0fJt2c.js";import{C as T}from"./Container-BFVhFNiL.js";import{P as c}from"./Popover-RL1CvCeb.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-kgpzAyyM.js";import{I as P}from"./IconJohanna-CVGViRG1.js";import"./preload-helper-qBSLZfTS.js";import"./useButton-gFYOqrhj.js";import"./useFocusable-CWl1t0Px.js";import"./useFocusRing-Dvm4_RjC.js";import"./useEffectEvent-BKR4RLzl.js";import"./chain-DHo8oKbw.js";import"./index-B6EMusBQ.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CdWvo43I.js";import"./borderStyle-D9jrV09G.js";import"./input-D40wT2pM.js";import"./Checkbox-DgsPUbUS.js";import"./useFormValidationState-UAnenpkk.js";import"./useControlledState-Du5HGgPR.js";import"./InputLabel-BS6vm496.js";import"./TooltipIcon-7gRO3xpH.js";import"./LegacyTooltip-B-tp1j-L.js";import"./useLink-DHkrUdNL.js";import"./usePopper-8GJMFvmR.js";import"./index-Ciia9_eN.js";import"./Portal-DP4PWg_F.js";import"./useMemoizedId-DnQ55Zbt.js";import"./IconCheckMark-C9N2YhL0.js";import"./IconExclamationMarkCircle24-C0dnCopv.js";import"./IconQuestionMarkCircle-kllRKVHJ.js";import"./IconMinus-rsdKZ6mT.js";import"./Divider-Ckbmz0M0.js";import"./Dropdown-C_BrfEr1.js";import"./FocusScope-C8Zpguh7.js";import"./useOverlayTriggerState-1nRvvjHV.js";import"./useMenuTrigger-C5MWsixQ.js";import"./useLabels-CgjEQM3v.js";import"./useLocalizedStringFormatter-DSxe_DtD.js";import"./context-B86w2jMQ.js";import"./VisuallyHidden-D2sE3s5e.js";import"./helper-BXkLw819.js";import"./keyboard-rkNmKttm.js";import"./SelectionManager-DJu1uagb.js";import"./useField-0_eqc5fb.js";import"./MenuItem-CBqSMKaJ.js";import"./IconCaretRight-mt3-aM0r.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DvvoBJ3B.js";import"./Trigger-V8qnOHf7.js";import"./IconCaretDown-DzJI7I0k.js";import"./IconCaretDown16-Caxt19fQ.js";import"./IconCross-ORFPx4BQ.js";import"./IconTrashBin16-BPI3V-e4.js";import"./IconTrashBin24-D-7w7tG2.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-PUTSjtV1.js";import"./FormControl-NisUf2Hi.js";import"./Switch-5ZwYZc90.js";import"./TabItem-D3g2R93v.js";import"./TextInput-DBepdhBg.js";import"./Tooltip-Ca2P6eKM.js";import"./useClickOutside-CjWbNyju.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CivgNCAA.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BN0lOkUr.js";const Ye={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const qe=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,qe as __namedExportsOrder,Ye as default};
