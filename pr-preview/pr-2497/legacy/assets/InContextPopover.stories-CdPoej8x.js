import{r as a,j as t}from"./iframe-Djhyb1Nw.js";import{a as l}from"./Box-D0XRmwDf.js";import{B as d}from"./Button-ssJq5wZ5.js";import{D as u}from"./DialogBody-Je0Y8JTH.js";import{D as g}from"./DialogFooter-CGDMeLlV.js";import{D as f}from"./DialogHeader-BfU3BVmK.js";import{P as m}from"./Popover-BgTf0iI4.js";import{I as x}from"./IconJohanna-CmX4herf.js";import"./preload-helper-ByQXrLpA.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BNuxpfmZ.js";import"./Checkbox-BPt_nkZF.js";import"./useFocusable-RQra_wsh.js";import"./useFocusRing-BK8gfdmv.js";import"./useEffectEvent-D8GnYFw3.js";import"./chain-BBFq5J0-.js";import"./index-Dck4b_ZY.js";import"./useFormValidationState-CHKEXlxK.js";import"./useControlledState-tL2x730j.js";import"./InputLabel-QFI6GSyz.js";import"./TooltipIcon-CEv9sFhn.js";import"./LegacyTooltip-Cb5X18lM.js";import"./useLink-CfY98U_U.js";import"./usePopper-ziJ2hQm4.js";import"./index-GoQApQif.js";import"./Portal-WVq5P5Ln.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D3WKz3gH.js";import"./IconCheckMark-DpPTXnBy.js";import"./IconExclamationMarkCircle24-B4LDGZRs.js";import"./IconExclamationMarkTriangle-CqCA4URp.js";import"./IconExclamationMarkTriangle24-zRe49Xao.js";import"./IconQuestionMarkCircle-BwedOQ2z.js";import"./IconMinus-D0YRjLJo.js";import"./FormControl-BEIfgU3P.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CvhdSucE.js";import"./TabItem-CUq7VJzt.js";import"./elements-BOYmskOL.js";import"./TextInput-Dxto4TCR.js";import"./IconCross-BKTNGjjx.js";import"./Tooltip-DJCDDg4Z.js";import"./useClickOutside-CauG5xuz.js";import"./EnablePortalWrapper-D4jAT6wB.js";import"./dialog-D9O7a7Fm.js";import"./Tree-g_pCSlp0.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-B99H2_Qx.js";import"./Flex-DU7NyJpQ.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
