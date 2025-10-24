import{r as s,j as t}from"./iframe-Bsxk6cFR.js";import{a as l}from"./Box-CCkANUHJ.js";import{B as d}from"./Button-Bp7GppKu.js";import{D as u}from"./DialogBody-CkO5lmuG.js";import{D as g}from"./DialogFooter-BdecRScm.js";import{D as f}from"./DialogHeader-DRx_ctaD.js";import{P as n}from"./Popover-CVUNG0rC.js";import{I as x}from"./IconIcon-B9gpRzA2.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dw_EdkPH.js";import"./Checkbox-BZwiv_WY.js";import"./useFocusable-BzHoFin2.js";import"./useFocusRing-stKtxXd4.js";import"./useEffectEvent-Bi8UaLd9.js";import"./chain-C8mx6lyL.js";import"./index-CaU0m7r7.js";import"./useFormValidationState-BLrnd7ld.js";import"./useControlledState-C7l0FGCg.js";import"./InputLabel-DFZphzdn.js";import"./TooltipIcon-imUCQ7xK.js";import"./LegacyTooltip-UFmzY47G.js";import"./useLink-BZBpEwDw.js";import"./usePopper-DrP5WGJT.js";import"./index-x6daeC6L.js";import"./Portal-Jhq17_f2.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-yiCK1tQN.js";import"./IconCheckMark-CF046Ot1.js";import"./IconExclamationMarkCircle24-DgeP_4Kk.js";import"./IconExclamationMarkTriangle-BHIGzko0.js";import"./IconExclamationMarkTriangle24-DxnwpWP-.js";import"./IconQuestionMarkCircle-Dbadrprg.js";import"./IconMinus-CgWE7n9K.js";import"./Divider-_FiKFIWq.js";import"./FormControl-D2B1jMMZ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-COaoHo8J.js";import"./Switch-CpOkLbaK.js";import"./TabItem-B5j8Fpzo.js";import"./elements-BOYmskOL.js";import"./TextInput-BZxVMLa_.js";import"./IconCross-YZVLliuR.js";import"./Tooltip-CREdPvYj.js";import"./useClickOutside-CCWwx1e_.js";import"./EnablePortalWrapper-B2Fripgl.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BDR2fBSn.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-Dw7Jadw_.js";import"./Flex-Cz1dCkuq.js";import"./IconIcon16-BSgfTCoH.js";import"./IconIcon24-BBWqIh2D.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
