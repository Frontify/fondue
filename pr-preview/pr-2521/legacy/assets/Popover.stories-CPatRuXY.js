import{r as p,j as e}from"./iframe-VY73Ap13.js";import{B as j}from"./Button-DELFvd4r.js";import{C as T}from"./Container-BsswIFr6.js";import{P as c}from"./Popover-DGWSQUnE.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DhUkGljA.js";import{I as P}from"./IconIcon-C-oiMHPY.js";import"./preload-helper-CxFeC-BG.js";import"./useButton-CpPLXiL6.js";import"./useFocusable-DGcHobBC.js";import"./useFocusRing-FYXzC7oH.js";import"./useEffectEvent-B9Wa_Khk.js";import"./chain-BpCjk0xr.js";import"./index-D4GOJQ2j.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-CLLqKugf.js";import"./borderStyle-D9jrV09G.js";import"./input-NhFKuIuf.js";import"./Divider-BcAAUxfh.js";import"./FormControl-jg1nLEKB.js";import"./InputLabel-BPpbNn23.js";import"./TooltipIcon-CQs5rkSB.js";import"./LegacyTooltip-XNI--7kK.js";import"./useLink-D6w5pNvA.js";import"./usePopper-D6_OusyC.js";import"./index-DftGEHB6.js";import"./Portal-CdDr4tzA.js";import"./useMemoizedId-BDfUaXHh.js";import"./IconCheckMark-81szwvvv.js";import"./IconExclamationMarkCircle24-BlMDUN5A.js";import"./IconQuestionMarkCircle-De1xUr8F.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BF7iQc4k.js";import"./Switch-Gi54ffVI.js";import"./TabItem-BRHV03C5.js";import"./elements-BOYmskOL.js";import"./TextInput-DkYLuvbX.js";import"./IconCross-UphrbeRF.js";import"./Tooltip-BX0UDRlx.js";import"./useClickOutside-DGbKMmNc.js";import"./EnablePortalWrapper-Cd9JJ5gy.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CT3mRs9P.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-t59T1mpS.js";import"./IconCaretDown-B-lBqeTo.js";import"./IconCaretDown16-BdTk2Dp5.js";import"./IconTrashBin16-ShLh3Fnh.js";import"./IconTrashBin24-IJdl3A2U.js";import"./IconExclamationMarkTriangle24-B9YH9o9Q.js";import"./IconIcon16-DQBV1Lyd.js";import"./IconIcon24-CGmH26RQ.js";const Be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,h,O;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const be=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,r as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,be as __namedExportsOrder,Be as default};
