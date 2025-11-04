import{r as s,j as t}from"./iframe-BqgOTfwa.js";import{a as l}from"./Box-BDWMTTN4.js";import{B as d}from"./Button-BE7kNGjk.js";import{D as u}from"./DialogBody-D3RZ5IfK.js";import{D as g}from"./DialogFooter-Dai_GQEE.js";import{D as f}from"./DialogHeader-BU73OP7W.js";import{P as n}from"./Popover-DhAVbry5.js";import{I as x}from"./IconIcon-BFzR9J_P.js";import"./preload-helper-r7mqpNn-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CRNl3O04.js";import"./Checkbox-Bn_tbAZe.js";import"./useFocusable-D_4hoYqL.js";import"./useFocusRing-BweZAzx4.js";import"./useEffectEvent-B4X5HiKo.js";import"./chain-HAlYixg1.js";import"./index-CgrGmFqi.js";import"./useFormValidationState-GvX1cGDD.js";import"./useControlledState-BmMT9pIN.js";import"./InputLabel-CCR5wAUJ.js";import"./TooltipIcon-BCy_DpZQ.js";import"./LegacyTooltip-DGO3TtJt.js";import"./useLink-BejGtILL.js";import"./usePopper-DiPlZxVo.js";import"./index-BejIcTrN.js";import"./Portal-7bvFvlVR.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DSuw5pzl.js";import"./IconCheckMark-SXJwau5u.js";import"./IconExclamationMarkCircle24-C3Etd_Ph.js";import"./IconExclamationMarkTriangle-B4aOvOZA.js";import"./IconExclamationMarkTriangle24-C4r90FB-.js";import"./IconQuestionMarkCircle-BwHtgLG2.js";import"./IconMinus-DZ7Ym5FW.js";import"./Divider-ou8Ao54H.js";import"./FormControl-Cv6gSYRT.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CHfWx2NW.js";import"./Switch-Ctc9Ldob.js";import"./TabItem-CDoIZtFM.js";import"./elements-BOYmskOL.js";import"./TextInput-D2KMctZF.js";import"./IconCross-LmDg0cVc.js";import"./Tooltip-C17Dgr0A.js";import"./useClickOutside-CKB_0vJi.js";import"./EnablePortalWrapper-DgaBvMrd.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B03gbqXm.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BpBUB3rp.js";import"./Flex-Cx1csBRa.js";import"./IconIcon16-C9Ezy4N1.js";import"./IconIcon24-BQuZjitM.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconIcon />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
                Trigger
            </Button>
            <Popover {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <Box className="tw-w-[400px]">
                    <DialogHeader title="Title" padding="compact"></DialogHeader>
                    <DialogBody padding="compact">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae
                            quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod
                            ullam. Beatae deserunt eum quibusdam ratione.
                        </p>
                    </DialogBody>
                    <DialogFooter padding="compact" actionButtons={[{
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </Box>
            </Popover>
        </div>;
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
