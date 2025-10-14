import{r as p,j as t}from"./iframe-8Aj-00-r.js";import{a as l}from"./Box-BnsoD87U.js";import{B as d}from"./Button-CG-0nyWt.js";import{D as u}from"./DialogBody-Ddxe0wtY.js";import{D as g}from"./DialogFooter-eHPQohMl.js";import{D as f}from"./DialogHeader-BucXdDCK.js";import{P as n}from"./Popover-okqsk5Fe.js";import{I as x}from"./IconJohanna-DFuBeViJ.js";import"./preload-helper-ClJkntjM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cb-cDZ2G.js";import"./Divider-Cb8yJJpF.js";import"./Dropdown-C-O-Den-.js";import"./useButton-Dojg9qor.js";import"./useFocusable-BwZ_9y-T.js";import"./useFocusRing-qG24ebph.js";import"./useEffectEvent-Cq9opHnK.js";import"./chain-BjqAHd5L.js";import"./index-DCNbMVtB.js";import"./FocusScope-CTjdKyO5.js";import"./useOverlayTriggerState-ChNjsbrI.js";import"./useControlledState-D_xv8YeC.js";import"./useMenuTrigger-B56YI9sB.js";import"./useLabels-CzFGOsdE.js";import"./useLocalizedStringFormatter-B8RupXhl.js";import"./context-DJA_byga.js";import"./VisuallyHidden-pr9n8Eu6.js";import"./helper-CFr4oJ23.js";import"./keyboard-BqGaruCr.js";import"./SelectionManager-BrlFgUVk.js";import"./useField-BLaRcGJ8.js";import"./useFormValidationState-QoNIVx9j.js";import"./usePopper-CXS_WYpq.js";import"./index-Dnw8Dsyi.js";import"./MenuItem-DpQE8dX8.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-Dx4qKvYw.js";import"./IconCheckMark-W08NCNhP.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CiFVWgYB.js";import"./Trigger-Bafp_Ri-.js";import"./IconCaretDown-ByO_B0hy.js";import"./IconCaretDown16-l4VSPtYz.js";import"./IconCross-BxAiCgtg.js";import"./IconExclamationMarkTriangle-CTaWxLT5.js";import"./IconExclamationMarkTriangle24-DBim1kUj.js";import"./IconTrashBin16-DiEpovv2.js";import"./IconTrashBin24-CL9xT_lP.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-doVjENwO.js";import"./Portal-Bz1ny3RM.js";import"./useMemoizedId-CGc7h3BS.js";import"./FormControl-DsARninL.js";import"./InputLabel-DPPpQodA.js";import"./TooltipIcon-Di_0n2EP.js";import"./LegacyTooltip-C9tle7yu.js";import"./useLink-BNAZ-U-L.js";import"./IconExclamationMarkCircle24-wOO7RqI2.js";import"./IconQuestionMarkCircle-DR6B91h_.js";import"./Switch-CG7Fwrxc.js";import"./TabItem-_H69nyMB.js";import"./TextInput-p2yGTJcX.js";import"./Tooltip-Bgz3MuCc.js";import"./useClickOutside-E2Pu4nAj.js";import"./dialog-D9O7a7Fm.js";import"./Tree-LcjhZUHT.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-aA7zU9ix.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
