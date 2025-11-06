import{r as a,j as e}from"./iframe-BdlO2EbJ.js";import{B as j}from"./Button-DrCLLHbF.js";import{C as T}from"./Container-BTeCkFS-.js";import{P as c}from"./Popover-C7B0HHWc.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-CPGFYlgY.js";import{I as P}from"./IconIcon-pGxZhlu5.js";import"./preload-helper-C4wRLVzE.js";import"./useButton-CG8bxHRW.js";import"./useFocusable-C9dO2yQb.js";import"./useFocusRing-CyFP-Ki5.js";import"./useEffectEvent-C4rtv_rM.js";import"./chain-Dr1u59fH.js";import"./index-D1owJmOw.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-PNqRXq3f.js";import"./borderStyle-D9jrV09G.js";import"./input-BGrf8GP1.js";import"./Checkbox-CUrMU77A.js";import"./useFormValidationState-ClvA_9AG.js";import"./useControlledState-Cidb8_Ea.js";import"./InputLabel-qiUeEwIk.js";import"./TooltipIcon-CwSo9wJU.js";import"./LegacyTooltip-V-9pWW6E.js";import"./useLink-QJzHBGx-.js";import"./usePopper-DQ00lXwF.js";import"./index-CoFonh66.js";import"./Portal-DZ632Ubj.js";import"./useMemoizedId-CzqpaSN6.js";import"./IconCheckMark-BvJX2csI.js";import"./IconExclamationMarkCircle24-CM3yyMwo.js";import"./IconQuestionMarkCircle-hugfPsLI.js";import"./IconMinus-BkS0bI79.js";import"./Divider-DL-_Vp22.js";import"./Dropdown-BZpXZbjc.js";import"./FocusScope-VwSi9rcC.js";import"./useOverlayTriggerState-ByX_-AoL.js";import"./useMenuTrigger-CAJeYsYW.js";import"./useLabels-Y1KS1nPR.js";import"./useLocalizedStringFormatter-hIxkRCEu.js";import"./context-kBQTsdoA.js";import"./VisuallyHidden-D9YqXu5-.js";import"./helper-pFYePz-q.js";import"./keyboard-Dm1zpteP.js";import"./SelectionManager-CDq-OZdL.js";import"./useField-WZJ25ZCp.js";import"./MenuItem-2d57nVSl.js";import"./IconCaretRight-D16XPZiE.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-D7T_AO83.js";import"./Trigger-DO0Xv1tR.js";import"./IconCaretDown-CPKMJ-tL.js";import"./IconCaretDown16-D6lzkurX.js";import"./IconCross-DGcLLMy8.js";import"./IconTrashBin16-CO3SH7GZ.js";import"./IconTrashBin24-Dz78mqQO.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DEoZMs_t.js";import"./FormControl-CP7C6AlW.js";import"./Switch-xVaig9Wk.js";import"./TabItem-khfS1F87.js";import"./TextInput-DSr8HXc2.js";import"./Tooltip-Bnq_n-aZ.js";import"./useClickOutside-yq4SUIaF.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C8j84pWN.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-DgKid-_h.js";import"./IconIcon16-C2Sy57f-.js";import"./IconIcon24-B_-ItIhX.js";const Ke={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
