import{r as p,j as t}from"./iframe-CfHul4zo.js";import{a as l}from"./Box-DWc3RaMk.js";import{B as d}from"./Button-yVTYwQF-.js";import{D as u}from"./DialogBody-CJA0aClO.js";import{D as g}from"./DialogFooter-BRixvqm2.js";import{D as f}from"./DialogHeader-u0MARdzB.js";import{P as n}from"./Popover-CtIlF9Qe.js";import{I as x}from"./IconIcon-CNXP-982.js";import"./preload-helper-DGVESE2Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BQ3-k5yA.js";import"./Divider-Ct-tQ-h4.js";import"./Dropdown-drSynxKp.js";import"./useButton-Tz8k-_dn.js";import"./useFocusable-DMcslFXz.js";import"./useFocusRing-CMXhC2Tr.js";import"./useEffectEvent-BA6W-niS.js";import"./chain-D01RV-BB.js";import"./index-BQh5Qvqv.js";import"./FocusScope-BU1r3MNk.js";import"./useOverlayTriggerState-fu6QxPju.js";import"./useControlledState-DWLvV7Kk.js";import"./useMenuTrigger-piZx4JdZ.js";import"./useLabels-B2i90Hmc.js";import"./useLocalizedStringFormatter-D-tQgrhX.js";import"./context-CkQAkJT0.js";import"./VisuallyHidden-D-_1MwRP.js";import"./helper-DH7p5BiF.js";import"./keyboard-C3O1P05s.js";import"./SelectionManager-DRJQujp9.js";import"./useField-OuJImVmy.js";import"./useFormValidationState-CpREol_8.js";import"./usePopper-BhC1HryF.js";import"./index-nR_hwZH7.js";import"./MenuItem-D0wc4E1q.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DxGV9b_J.js";import"./IconCheckMark-hTuOn1t1.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DM3UByCT.js";import"./Trigger-BG67Y8TQ.js";import"./IconCaretDown-B2eZL06g.js";import"./IconCaretDown16-Cr2-qVY-.js";import"./IconCross-CZwEoPe9.js";import"./IconExclamationMarkTriangle-C-NbryAn.js";import"./IconExclamationMarkTriangle24-BC2X3acG.js";import"./IconTrashBin16-C3L3dvvP.js";import"./IconTrashBin24-C-K3RNTI.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cxu6-oTj.js";import"./Portal-MV_EP8tM.js";import"./useMemoizedId-mjLZu6N7.js";import"./FormControl-BJwGzdAi.js";import"./InputLabel-NupPFZ6B.js";import"./TooltipIcon-DRxhJRRV.js";import"./LegacyTooltip-CtVbOESt.js";import"./useLink-BnTw1_kr.js";import"./IconExclamationMarkCircle24-WVgUA76S.js";import"./IconQuestionMarkCircle-r1HcYP-T.js";import"./Switch-BeKBv92A.js";import"./TabItem-DIbC2qoD.js";import"./TextInput-D5t55ewG.js";import"./Tooltip-D6op7Snd.js";import"./useClickOutside-CwYTT1XC.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CsfF529C.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BwiP4Ryz.js";import"./IconIcon16-BBQMJ77C.js";import"./IconIcon24-XoN0PcZ_.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
