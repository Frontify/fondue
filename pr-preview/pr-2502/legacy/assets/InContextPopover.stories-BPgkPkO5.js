import{r as a,j as t}from"./iframe-DRxQCg9a.js";import{a as l}from"./Box-C34Bg7KU.js";import{B as d}from"./Button-CIxnSoQq.js";import{D as u}from"./DialogBody-BnySyq76.js";import{D as g}from"./DialogFooter-BSCYUJVr.js";import{D as f}from"./DialogHeader-BOvWGvm-.js";import{P as m}from"./Popover-BgwQh9cU.js";import{I as x}from"./IconJohanna-dLntP1S7.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-AJfke0WY.js";import"./Checkbox-CMyJRR04.js";import"./useFocusable-8O9dnkeU.js";import"./useFocusRing-CDuBllxv.js";import"./useEffectEvent-C11MyYjR.js";import"./chain-DLnWFCho.js";import"./index-C2BXy0YL.js";import"./useFormValidationState-lbdngbA6.js";import"./useControlledState-cCHdfjOT.js";import"./InputLabel-BC_NRBMK.js";import"./TooltipIcon-B9nnve_b.js";import"./LegacyTooltip-D7uYac6s.js";import"./useLink-CpQXiALR.js";import"./usePopper-BOynIysI.js";import"./index-CM4_PlpL.js";import"./Portal--C5krueF.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BmgNnHm6.js";import"./IconCheckMark-xBz8T-9Q.js";import"./IconExclamationMarkCircle24-RPPdBWQ5.js";import"./IconExclamationMarkTriangle-DQQrK4m0.js";import"./IconExclamationMarkTriangle24-DQmQMI4I.js";import"./IconQuestionMarkCircle-DRX44Jra.js";import"./IconMinus-BI2n4BJc.js";import"./Divider-DTXwmr9D.js";import"./FormControl-CXqM3mKO.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DkrT1Noy.js";import"./Switch-BdTgVx8w.js";import"./TabItem-Ch9xLX9r.js";import"./elements-BOYmskOL.js";import"./TextInput-BWQ3LRqh.js";import"./IconCross-CCD_lv3H.js";import"./Tooltip-D34PNnLI.js";import"./useClickOutside-BdAbYC8d.js";import"./EnablePortalWrapper-CxFCl6rm.js";import"./dialog-D9O7a7Fm.js";import"./Tree-bcpaaWBP.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CaY_ggp1.js";import"./Flex-XMgziU2o.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
