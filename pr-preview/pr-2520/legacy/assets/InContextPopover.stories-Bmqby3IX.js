import{r as p,j as t}from"./iframe-BIHtZq1U.js";import{a as l}from"./Box-hobupWpc.js";import{B as d}from"./Button-mGP0pMyC.js";import{D as u}from"./DialogBody-BzBIW2J-.js";import{D as g}from"./DialogFooter-C3h3x-yj.js";import{D as f}from"./DialogHeader-Cx82AP4f.js";import{P as n}from"./Popover-CIK_Jz5b.js";import{I as x}from"./IconIcon-DqCOP5Gm.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dg-p3nwO.js";import"./Divider-cLTm9Yw5.js";import"./Dropdown-B4ISVlBN.js";import"./useButton-DWxqWwpW.js";import"./useFocusable-CCZ_IdsK.js";import"./useFocusRing-Da_21BgF.js";import"./useEffectEvent-B6YEwqBF.js";import"./chain-BJcYIR2n.js";import"./index-BaBp4jCW.js";import"./FocusScope-D3WjdVoV.js";import"./useOverlayTriggerState-BkNFCR_E.js";import"./useControlledState-Ch5mM6EN.js";import"./useMenuTrigger-eQ_6GCii.js";import"./useLabels-CsVTyMz0.js";import"./useLocalizedStringFormatter-DFpdFw8u.js";import"./context-Bs0yD0C5.js";import"./VisuallyHidden-BVpZREPf.js";import"./helper-KKu_vcbg.js";import"./keyboard-BvwPagi2.js";import"./SelectionManager-C4BYkeTT.js";import"./useField-C-jP7PP4.js";import"./useFormValidationState-DX0Jxj92.js";import"./usePopper-CDDU-Abt.js";import"./index-AB-0uad5.js";import"./MenuItem-CGosstT4.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-ktveUp1R.js";import"./IconCheckMark-ByDDCOdk.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-BPnjjCMJ.js";import"./Trigger-Btbv4h_W.js";import"./IconCaretDown-nRwc6BJm.js";import"./IconCaretDown16-BBlgb7KY.js";import"./IconCross-uSSJtr0W.js";import"./IconExclamationMarkTriangle-Eu8lIART.js";import"./IconExclamationMarkTriangle24-DWved3Uv.js";import"./IconTrashBin16-kc1AA4xY.js";import"./IconTrashBin24-DmxFkRQV.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-B0IMxAw1.js";import"./Portal-XQEcDBQ_.js";import"./useMemoizedId-8iqIoAJZ.js";import"./FormControl-CQNf1I9W.js";import"./InputLabel-OzfXMBfp.js";import"./TooltipIcon-t51GQRdv.js";import"./LegacyTooltip-CyQP51yp.js";import"./useLink-BGmSUlDQ.js";import"./IconExclamationMarkCircle24-Dr5MpX5j.js";import"./IconQuestionMarkCircle-CBsONxKB.js";import"./Switch-D9Ul3eWT.js";import"./TabItem-BsMi3ALW.js";import"./TextInput-LNvw8Zy7.js";import"./Tooltip-D5sADaPC.js";import"./useClickOutside-C7K7SNSM.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BNN95NQH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C6MwXcdL.js";import"./IconIcon16-UjgtoySz.js";import"./IconIcon24-Dqxj6QND.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
