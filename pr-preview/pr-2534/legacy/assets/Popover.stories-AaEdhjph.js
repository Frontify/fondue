import{r as a,j as e}from"./iframe-Dop3IDiS.js";import{B as j}from"./Button-DBFFngUD.js";import{C as T}from"./Container-AVpRH8eC.js";import{P as c}from"./Popover-BBFGq0e5.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-DZFMnctp.js";import{I as P}from"./IconIcon-DUaB1bdt.js";import"./preload-helper-CzFIvh1I.js";import"./useButton-BkX0UrSk.js";import"./useFocusable-ost1gxwP.js";import"./useFocusRing-u7jjRRvk.js";import"./useEffectEvent-C5lQF6xi.js";import"./chain-s-vxePMy.js";import"./index-DYLYfGFR.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-T4pmJ4KH.js";import"./borderStyle-D9jrV09G.js";import"./input-CgoVI71q.js";import"./Divider-B4MHY3rQ.js";import"./Dropdown-eZjtnnjy.js";import"./FocusScope-BH5f1-TV.js";import"./useOverlayTriggerState-D5AsxkAE.js";import"./useControlledState-uMLg98wm.js";import"./useMenuTrigger-BpW2lNjN.js";import"./useLabels-BgQM7QFU.js";import"./useLocalizedStringFormatter-xLeRq2LB.js";import"./context-DERHc0he.js";import"./VisuallyHidden-Cei7HWYu.js";import"./helper-JND9wNMV.js";import"./keyboard-DMTlnSnK.js";import"./SelectionManager-Cn74Dtdj.js";import"./useField-oqj2rvon.js";import"./useFormValidationState-Cin_oTyS.js";import"./usePopper-BD0mTu8l.js";import"./index-CXPmKk8W.js";import"./MenuItem-s-obpngf.js";import"./IconCaretRight-D2Rtr0KV.js";import"./IconCheckMark-Dhl-b2SF.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B3Zg05Fy.js";import"./Trigger-CA-Hq4qa.js";import"./IconCaretDown-Dvk9pgzM.js";import"./IconCaretDown16-3Y1aj8fs.js";import"./IconCross-Cz7N8XdK.js";import"./IconTrashBin16-C164mae4.js";import"./IconTrashBin24-CnFwDSEk.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DLUUtCUV.js";import"./Portal-BhsN2SWV.js";import"./useMemoizedId-CK82Czxw.js";import"./FormControl-ATQXj-oa.js";import"./InputLabel-CPQH0GLI.js";import"./TooltipIcon-DzDbmsKM.js";import"./LegacyTooltip-D3fSEQnN.js";import"./useLink-CisGfgTX.js";import"./IconExclamationMarkCircle24-D-HK2Dcv.js";import"./IconQuestionMarkCircle-CQv2x_S2.js";import"./Switch-CneOamPf.js";import"./TabItem-DC0rUs02.js";import"./TextInput-DKt6IUeX.js";import"./Tooltip-Bm5tt8SV.js";import"./useClickOutside-BporPNZz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BT1220bP.js";import"./_Uint8Array-CwPxMkg2.js";import"./IconExclamationMarkTriangle24-X1JrCahO.js";import"./IconIcon16-nbFgdsuz.js";import"./IconIcon24-Cxj7Z8Fv.js";const qe={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!p),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[p,t]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:p,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
