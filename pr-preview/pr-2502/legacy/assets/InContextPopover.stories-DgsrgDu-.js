import{r as a,j as t}from"./iframe-CLWR3nUG.js";import{a as l}from"./Box-DwNuBeM8.js";import{B as d}from"./Button-BXJ3LDeK.js";import{D as u}from"./DialogBody-C6oKKznT.js";import{D as g}from"./DialogFooter-7NCxnim2.js";import{D as f}from"./DialogHeader-Cp56xm8i.js";import{P as m}from"./Popover-BsaHGIcL.js";import{I as x}from"./IconJohanna-166uepjK.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-cej4Nzn4.js";import"./Checkbox-C_BnGEqa.js";import"./useFocusable-DqLL_9nB.js";import"./useFocusRing-BSAt-4Vk.js";import"./useEffectEvent-CAs0gB5n.js";import"./chain-BXOE_HCM.js";import"./index-B_9kxJ6p.js";import"./useFormValidationState-DsxgvnBE.js";import"./useControlledState-Bgj_pg2k.js";import"./InputLabel-Cqx25nUO.js";import"./TooltipIcon-4N5NOwNP.js";import"./LegacyTooltip-BxpYtXmg.js";import"./useLink-PH1jH_sQ.js";import"./usePopper-BaDtouo_.js";import"./index-D3ZbXnsu.js";import"./Portal-BdiWRCVg.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-nabCRXrC.js";import"./IconCheckMark-Dpv-CvL4.js";import"./IconExclamationMarkCircle24-ClOhu_Ri.js";import"./IconExclamationMarkTriangle-znDU4MK2.js";import"./IconExclamationMarkTriangle24-zD4-cjbh.js";import"./IconQuestionMarkCircle-C0WF9A0R.js";import"./IconMinus-VNqTPRc-.js";import"./Divider-_9r1eMvR.js";import"./FormControl-DLFZlT_c.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTZpP-I5.js";import"./Switch-DpryGfG2.js";import"./TabItem-Buh8QC_x.js";import"./elements-BOYmskOL.js";import"./TextInput-G_lGNFDI.js";import"./IconCross-XzksfC__.js";import"./Tooltip-DiNOHaH5.js";import"./useClickOutside-CwgrC7Jz.js";import"./EnablePortalWrapper-D2eOtS_g.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CBjgRRIE.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton--zqKr1UY.js";import"./Flex-DvFAWHP-.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div className="tw-h-32 tw-flex tw-justify-center tw-items-center">
            <Button icon={<IconJohanna />} onClick={() => setIsOpen(!isOpen)} ref={triggerRef}>
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const Bt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Bt as __namedExportsOrder,ht as default};
