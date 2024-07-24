import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as p}from"./index-BwDkhjyp.js";import{B as j}from"./Button-CYWlMQhW.js";import{C as T}from"./Container-CulbioFr.js";import{P as c}from"./Popover-Dda271VY.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as P}from"./IconExclamationMarkTriangle-CRTWkDyu.js";import{I as k}from"./IconJohanna-bTcd8FnJ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useButton-DofEV6SJ.js";import"./useFocusable-CAGu0lKI.js";import"./useFocusRing-4Vnvtzpc.js";import"./SSRProvider-CYXx33DY.js";import"./chain-D5h1pgIF.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Box-o3LxFJyF.js";import"./borderStyle-D9jrV09G.js";import"./input-BObDRFXO.js";import"./Divider-DCi-HcbY.js";import"./FormControl-BknBj4zB.js";import"./InputLabel-3Blx3uwT.js";import"./TooltipIcon-PlSsTjyA.js";import"./LegacyTooltip-DXE5SqpV.js";import"./useLink-DorAuuFQ.js";import"./usePopper-DPXU-o95.js";import"./index-DxjWwZXO.js";import"./index-CfyPTyT-.js";import"./Portal-0C9N3MSP.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-CLvJH1sB.js";import"./IconExclamationMarkCircle-Cob4vb5T.js";import"./IconExclamationMarkCircle24-DpwtNT9z.js";import"./IconQuestionMarkCircle-C_agVHg1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-D3WaRgzO.js";import"./useFormValidationState-Vs0Uifwm.js";import"./FocusScope-DYM0gkGr.js";import"./useField-BhCfq6jD.js";import"./useLabels-DH9bA-v0.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-YFPGrsWM.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./Switch-xU4d-oj4.js";import"./TabItem-DYJEWVSF.js";import"./elements-BOYmskOL.js";import"./TextInput-CTUXZk8A.js";import"./IconEyeOff-Dzh4tjis.js";import"./IconCross-Bt-I3opn.js";import"./Tooltip-CP_K22RC.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-DvpkRq0I.js";import"./dialog-Dre1eVQK.js";import"./Tree-CD_Yi6Qs.js";import"./immer-DBm1MMjE.js";import"./IconGrabHandle12-IS3l0vsO.js";import"./Trigger-BkAUJNF7.js";import"./IconCaretDown-Cxrx1sF_.js";import"./IconCaretDown16-BGp5IVAI.js";import"./IconTrashBin-Bl46mt1V.js";import"./IconTrashBin16-qlTE457i.js";import"./IconTrashBin24-CvdAkIgz.js";import"./IconExclamationMarkTriangle24-GqPjgFpk.js";const Ve={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(k,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},y=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(P,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=y.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
            <button ref={triggerRef} className="tw-flex tw-items-center" onMouseEnter={() => setIsOpen(true)} onFocus={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} onBlur={() => setIsOpen(false)}>
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const We=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,We as __namedExportsOrder,Ve as default};
