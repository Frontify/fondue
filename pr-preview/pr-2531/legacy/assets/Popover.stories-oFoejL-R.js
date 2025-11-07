import{r as a,j as e}from"./iframe-BoDZ-62Y.js";import{B as j}from"./Button-XdttJYYW.js";import{C as T}from"./Container-BRGzvqqZ.js";import{P as c}from"./Popover-C3c7rYnF.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-BjTSrBRl.js";import{I as P}from"./IconIcon-aNRBFDMG.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-BOiM2RrI.js";import"./useFocusable-IrRukKaY.js";import"./useFocusRing-C82xZb5f.js";import"./useEffectEvent-CL3fZGDF.js";import"./chain-CtJGAl97.js";import"./index-DniVUvLY.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-dpqcsXit.js";import"./borderStyle-D9jrV09G.js";import"./input-DM6-sKQT.js";import"./Divider-CDbGDUMW.js";import"./Dropdown-C89E-ui-.js";import"./FocusScope-BJM6DygL.js";import"./useOverlayTriggerState--76nwOyg.js";import"./useControlledState-D4E8YFD2.js";import"./useMenuTrigger-DfanVkFJ.js";import"./useLabels-Bn-zGoDP.js";import"./useLocalizedStringFormatter-BzyNpVuE.js";import"./context-BI_iBaQx.js";import"./VisuallyHidden-wNCK1ErZ.js";import"./helper-CVvlIGp8.js";import"./keyboard-DpnoosrG.js";import"./SelectionManager-CDCBW3Mu.js";import"./useField-BdBRqYcV.js";import"./useFormValidationState-BUePSdx-.js";import"./usePopper-fX-V3a5j.js";import"./index-Dy7Jj2P1.js";import"./MenuItem-BdhJiMlc.js";import"./IconCaretRight-D2TbKBqd.js";import"./IconCheckMark-Bhtr2HMb.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-Dcgk16SJ.js";import"./Trigger-DeSIG4eM.js";import"./IconCaretDown-tlfhZzfs.js";import"./IconCaretDown16-Dfz3_L5B.js";import"./IconCross-CFotdVXc.js";import"./IconTrashBin16-Cx4-ceNO.js";import"./IconTrashBin24-gvulk-5K.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B-SFKPCM.js";import"./Portal-Cd-p_RwN.js";import"./useMemoizedId-DSzFtEMc.js";import"./FormControl-DkAU8isK.js";import"./InputLabel-RHUqZBiI.js";import"./TooltipIcon-BCLIHycj.js";import"./LegacyTooltip-DnSpI6bL.js";import"./useLink-ntWqaK50.js";import"./IconExclamationMarkCircle24-DwluY09Y.js";import"./IconQuestionMarkCircle-DGkGHnN8.js";import"./Switch-C8qfsnGD.js";import"./TabItem-BNybx-7f.js";import"./TextInput-C4npCLQz.js";import"./Tooltip-Bmh9kEw6.js";import"./useClickOutside-BnjlGsM0.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C1AwpO8S.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-C8IyBX4S.js";import"./IconIcon16-DA4M9EdO.js";import"./IconIcon24-DRZ3ZEpR.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
