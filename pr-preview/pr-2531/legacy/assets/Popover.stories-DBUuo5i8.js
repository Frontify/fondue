import{r as a,j as e}from"./iframe-B5CPGWPV.js";import{B as j}from"./Button-D9e2ti0d.js";import{C as T}from"./Container-DiWdSUl7.js";import{P as c}from"./Popover-CUEAqnB5.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle--za27hm8.js";import{I as P}from"./IconIcon-BA6Fmiqg.js";import"./preload-helper-CG1F6kIz.js";import"./useButton-Ci7kylBN.js";import"./useFocusable-CuG_iUuX.js";import"./useFocusRing-BOq44Q-m.js";import"./useEffectEvent-kj_h4LSq.js";import"./chain-DAzikNNz.js";import"./index-Db4W4yDE.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CQAU9N4z.js";import"./borderStyle-D9jrV09G.js";import"./input-cq8f4pEG.js";import"./DialogBody-jxTvKrbr.js";import"./dialog-D9O7a7Fm.js";import"./Divider-nZeqTEwz.js";import"./Dropdown-DiOy8JCl.js";import"./FocusScope-rI0yNBIy.js";import"./useOverlayTriggerState-CEKKvGLL.js";import"./useControlledState-CFbRCBAY.js";import"./useMenuTrigger-mcc-gx96.js";import"./useLabels-C5ytOvhJ.js";import"./useLocalizedStringFormatter-CYCob2hJ.js";import"./context-BN_JJ6zS.js";import"./VisuallyHidden-C5e-jIao.js";import"./helper-C7N_jdHD.js";import"./keyboard-By140AL5.js";import"./SelectionManager-BVFt38kS.js";import"./useField-iDswpurd.js";import"./useFormValidationState-CNTCwyf2.js";import"./usePopper-DlxsfNzH.js";import"./index-kPdPfUUG.js";import"./MenuItem-N5vG-vp8.js";import"./IconCaretRight-B_cPjHKU.js";import"./IconCheckMark-BjpJQgeF.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-5aGkx1.js";import"./Trigger-whnxlm3W.js";import"./IconCaretDown-DDnEckGI.js";import"./IconCaretDown16-DwG1LP-s.js";import"./IconCross-a0tvDMLS.js";import"./IconTrashBin16-Bftj6ugn.js";import"./IconTrashBin24-uINMAR_a.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DYKNKpOU.js";import"./Portal-B5vFmI2x.js";import"./useMemoizedId-DWAnoWyi.js";import"./FormControl-DAxuNMHE.js";import"./InputLabel-hKtnQhwW.js";import"./TooltipIcon-CIvg4Gbm.js";import"./LegacyTooltip-BmxFSbs9.js";import"./useLink-CLnF-Dfj.js";import"./IconExclamationMarkCircle24-BeTFDUAL.js";import"./IconQuestionMarkCircle-80bszdCz.js";import"./Switch-DgCW3xLv.js";import"./TabItem-DS5zdxt9.js";import"./TextInput-COvL5FkF.js";import"./Tooltip-DjjyqhJy.js";import"./useClickOutside-BhD2j9dG.js";import"./Tree-Ur0I-Lwp.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-BPBU2M1F.js";import"./IconIcon16-optUTJU9.js";import"./IconIcon24-BGMX8Pec.js";const Je={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ke=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ke as __namedExportsOrder,Je as default};
