import{r as s,j as t}from"./iframe-BxkmZ_qS.js";import{a as l}from"./Box-CBIfPAh5.js";import{B as d}from"./Button-B7-zHvnj.js";import{D as u}from"./DialogBody-CYQoVR2Y.js";import{D as g}from"./DialogFooter-CqEXB7uj.js";import{D as f}from"./DialogHeader-D-leWkog.js";import{P as m}from"./Popover-C2daVWWn.js";import{I as x}from"./IconIcon-BQ2LVOtk.js";import"./preload-helper-DGVESE2Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DxWp8C5T.js";import"./Divider-BeD3hYt7.js";import"./FormControl-BVGE11Hg.js";import"./InputLabel-Cy2480Uz.js";import"./TooltipIcon-hzSmRwpv.js";import"./LegacyTooltip-NfvcJwD5.js";import"./useLink-C7JKiGPY.js";import"./useFocusable-CMqYS_wN.js";import"./useFocusRing-3sDfkXlZ.js";import"./useEffectEvent-DC2V05mW.js";import"./chain-CVnaEK-u.js";import"./index-BHLQBrUq.js";import"./usePopper-CfpTIbUB.js";import"./index-B1O1MNq5.js";import"./Portal-C5SODFR_.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BMYZCDTz.js";import"./IconCheckMark-D276Qa_c.js";import"./IconExclamationMarkCircle24-hm6ZOfLp.js";import"./IconExclamationMarkTriangle-C2mrgeE6.js";import"./IconExclamationMarkTriangle24-D7QSRMTV.js";import"./IconQuestionMarkCircle-C_4XNBvy.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BXjrMe8D.js";import"./Switch-BGnM1Fs9.js";import"./TabItem-RUpz2903.js";import"./elements-BOYmskOL.js";import"./TextInput-LXs-tQDI.js";import"./IconCross-Du4TXULc.js";import"./Tooltip-BfikMBee.js";import"./useClickOutside-C5ztWzxe.js";import"./EnablePortalWrapper-DTqQDG5a.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Cv8I9p-L.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DTKD_JJt.js";import"./Flex-B5GlvWVG.js";import"./IconIcon16-Bk4U7Qmk.js";import"./IconIcon24-CZTa-Ary.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
