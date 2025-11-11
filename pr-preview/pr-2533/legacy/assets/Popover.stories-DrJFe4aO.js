import{r as p,j as e}from"./iframe-CqMYqlgR.js";import{B as j}from"./Button-CYHT2AMY.js";import{C as T}from"./Container-k7vkFaCY.js";import{P as c}from"./Popover-CmetYuMO.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{a as y}from"./IconExclamationMarkTriangle-3XRG4Ouh.js";import{I as P}from"./IconIcon-gNljK24O.js";import"./preload-helper-BrHt6s3f.js";import"./useButton-vGfdsb0j.js";import"./useFocusable-BZgzPKtn.js";import"./useFocusRing-CLIn77jc.js";import"./useEffectEvent-D05mPwwN.js";import"./chain-B9Eo87tn.js";import"./index-Cy9q-1wD.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-Ch_WJ4aJ.js";import"./merge-DI-veSMP.js";import"./Box-Dbyzt1Zk.js";import"./borderStyle-D9jrV09G.js";import"./input-EhKZN_1O.js";import"./Divider-Z6m92kut.js";import"./FormControl-DylzNNc3.js";import"./InputLabel-CS1iO4pu.js";import"./TooltipIcon-Z0eJr2D6.js";import"./LegacyTooltip-Co0qD5RC.js";import"./useLink-D7Pri6Nz.js";import"./usePopper-BK18999i.js";import"./index-Bjym0GCp.js";import"./Portal-BsHqlhbb.js";import"./useMemoizedId-DAyKmQUl.js";import"./IconCheckMark-BAMG8MDz.js";import"./IconExclamationMarkCircle24-ChMlYYeR.js";import"./IconQuestionMarkCircle-BxAoOfIQ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DxO-53u-.js";import"./Switch-BVW5p_vz.js";import"./TabItem-Dey0TnTM.js";import"./elements-BOYmskOL.js";import"./TextInput-B2n_17-q.js";import"./IconCross-Csh70OY3.js";import"./Tooltip-CZgfioZM.js";import"./useClickOutside-DLthHa0m.js";import"./EnablePortalWrapper-D8D0Lbv4.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CxepOoim.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BqpM5goS.js";import"./IconCaretDown-CJIKu6X8.js";import"./IconCaretDown16-hlAzjhEC.js";import"./IconTrashBin16-DbBfC4Gf.js";import"./IconTrashBin24-Dqge_01c.js";import"./IconExclamationMarkTriangle24-DSIS2BTO.js";import"./IconIcon16-BR33IxhP.js";import"./IconIcon24-CMuTYtJx.js";const Be={title:"Experimental/Popover",component:c,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{offset:[0,8],flip:!0,placement:"bottom-start"},argTypes:{...S,"data-test-id":{type:"string"},role:{type:"string"},zIndex:{table:{disable:!0}},theme:{options:["light","dark"],control:{type:"select"},defaultValue:"light"},withArrow:{control:{type:"boolean"},defaultValue:!1}}},l=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(j,{icon:e.jsx(P,{}),onClick:()=>t(!a),ref:n,children:"Trigger"}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},k=m=>{const[a,t]=p.useState(!1),n=p.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsxs("button",{type:"button",ref:n,className:"tw-flex tw-items-center",onMouseEnter:()=>t(!0),onFocus:()=>t(!0),onMouseLeave:()=>t(!1),onBlur:()=>t(!1),children:[e.jsx("span",{className:"tw-mr-1",children:"Information"})," ",e.jsx(y,{})]}),e.jsx(c,{...m,anchor:n,open:a,handleClose:()=>t(!1),children:e.jsx(T,{padding:8,children:e.jsx("p",{children:"Some Content"})})})]})},r=l.bind({});r.args={};const o=k.bind({});o.args={};const s=l.bind({});s.args={theme:"dark"};const i=l.bind({});i.args={theme:"dark",withArrow:!0,offset:[0,12]};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
