import{r as p,j as e}from"./iframe-Bc-0m40g.js";import{B as j}from"./Button-0Lc8yrOz.js";import{C as T}from"./Container-CVj7e4Ke.js";import{P as c}from"./Popover-C2cY8r8T.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-C8obBTCZ.js";import{I as P}from"./IconIcon-DhvHcbgC.js";import"./preload-helper-C1FmrZbK.js";import"./useButton-Daacn22Z.js";import"./useFocusable-DKEjpfV8.js";import"./useFocusRing-mXNrc4Vo.js";import"./useEffectEvent-CRNIM4-p.js";import"./chain-ktRrW4jm.js";import"./index-DG7sG-fA.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-BC7f7yDg.js";import"./borderStyle-D9jrV09G.js";import"./input-B3VZ7Rq7.js";import"./DialogBody-Dld9aPJm.js";import"./dialog-D9O7a7Fm.js";import"./Divider-C8NNHF9m.js";import"./FormControl-yndCSK4f.js";import"./InputLabel-DqA6cmfW.js";import"./TooltipIcon-ByM_dO20.js";import"./LegacyTooltip-Cr6rxS0g.js";import"./useLink-C81JbUT1.js";import"./usePopper-DheOg4-1.js";import"./index-DrE0jYhD.js";import"./Portal-CRH4LxLX.js";import"./useMemoizedId-CocKipVj.js";import"./IconCheckMark-kpeWHNNt.js";import"./IconExclamationMarkCircle24-CBgKnXpx.js";import"./IconQuestionMarkCircle-CspliPOa.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B67CcELu.js";import"./Switch-DZKwesw6.js";import"./TabItem-uAN6v55f.js";import"./elements-BOYmskOL.js";import"./TextInput-C8zS8WB7.js";import"./IconCross-DAh3-6yo.js";import"./Tooltip-D65DgYPV.js";import"./useClickOutside-Dj6mOh2i.js";import"./EnablePortalWrapper-D9n8VH5a.js";import"./Tree-D2CWTejl.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B_jNvcmv.js";import"./IconCaretDown-CaxFsv5M.js";import"./IconCaretDown16-DzyXh8nV.js";import"./IconTrashBin16-DR3D71pr.js";import"./IconTrashBin24-DzVxuYG2.js";import"./IconExclamationMarkTriangle24-CHQeZCaQ.js";import"./IconIcon16-LjUHwAuI.js";import"./IconIcon24-K9dZptf_.js";const be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:r,children:"Trigger"}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),r=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:r,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:r,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},n=l.bind({});n.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
}`,...(R=(v=i.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};const Ee=["TriggeredOnClick","TriggeredOnHover","DarkTheme","WithArrowAndDarkTheme"];export{s as DarkTheme,n as TriggeredOnClick,o as TriggeredOnHover,i as WithArrowAndDarkTheme,Ee as __namedExportsOrder,be as default};
