import{r as p,j as t}from"./iframe-BP2CU-yP.js";import{a as l}from"./Box-Bx5CnSCJ.js";import{B as d}from"./Button-C-3Fa5Ls.js";import{D as u}from"./DialogBody-_qCFDSeV.js";import{D as g}from"./DialogFooter-BK1PViyK.js";import{D as f}from"./DialogHeader-BW4qeVPX.js";import{P as n}from"./Popover-B-50mcnA.js";import{I as x}from"./IconIcon-CdHmM92a.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-9GwPWngM.js";import"./Divider-B3SmHgDa.js";import"./Dropdown-gYzsCQLW.js";import"./useButton-aYYMNIxJ.js";import"./useFocusable-C5q4NZDS.js";import"./useFocusRing-BnboNt0j.js";import"./useEffectEvent-CGuTipkA.js";import"./chain-BiXvkzln.js";import"./index-BoRfSx69.js";import"./FocusScope-BetiZtbM.js";import"./useOverlayTriggerState-u4FxR0RE.js";import"./useControlledState-DPXhSBgu.js";import"./useMenuTrigger-ByCru9Le.js";import"./useLabels-bw4KyvQk.js";import"./useLocalizedStringFormatter-Bedmu0Pg.js";import"./context-YRYeag35.js";import"./VisuallyHidden-Butslc9_.js";import"./helper-D4MzQWk9.js";import"./keyboard-BMlXCcse.js";import"./SelectionManager-CbmN7u3I.js";import"./useField-Di0nDpYX.js";import"./useFormValidationState-DhiC4loc.js";import"./usePopper-BLQqXuyD.js";import"./index-Cge92rrD.js";import"./MenuItem-DhLMTqse.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DGX_KZOu.js";import"./IconCheckMark-B_3zbcIN.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-FgiKMPQ3.js";import"./Trigger-DtjfxI7P.js";import"./IconCaretDown-BNVzBaFD.js";import"./IconCaretDown16-B3ctgNCO.js";import"./IconCross-cMp8LwNs.js";import"./IconExclamationMarkTriangle-CVr7CKTF.js";import"./IconExclamationMarkTriangle24-B0qCF7zC.js";import"./IconTrashBin16-CaF7wq5n.js";import"./IconTrashBin24-D3L5wCAo.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BGgbsw9K.js";import"./Portal-tSMg1HjP.js";import"./useMemoizedId-DtVVAJB2.js";import"./FormControl-BKtuxNIa.js";import"./InputLabel-BiKWvlC6.js";import"./TooltipIcon-MAdJASIs.js";import"./LegacyTooltip-hCfehiCo.js";import"./useLink-05sd-Mp9.js";import"./IconExclamationMarkCircle24-Y9Ak_ctV.js";import"./IconQuestionMarkCircle-v2eSKpOk.js";import"./Switch-ToBiHmVz.js";import"./TabItem-Df3HGQzI.js";import"./TextInput-wkuu5ZKt.js";import"./Tooltip-BWNlMJfu.js";import"./useClickOutside-C79_q4GG.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BjALeDwV.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-0YbZ4O5a.js";import"./IconIcon16-COOgjphp.js";import"./IconIcon24-E2COea6K.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
