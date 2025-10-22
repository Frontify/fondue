import{r as a,j as t}from"./iframe-C2ar3Utf.js";import{a as l}from"./Box-VWJ-v-24.js";import{B as d}from"./Button-DsLyXgPb.js";import{D as u}from"./DialogBody-t875PlcR.js";import{D as g}from"./DialogFooter-CN0U5mk5.js";import{D as f}from"./DialogHeader-DxqHHTw2.js";import{P as n}from"./Popover-D8AiCB8q.js";import{I as x}from"./IconJohanna-Eq4XiOhf.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D7aUtB79.js";import"./Divider-C7Hb8dmo.js";import"./FormControl-mzx8vPaY.js";import"./InputLabel-BPPPgPsK.js";import"./TooltipIcon-CCFeAwAU.js";import"./LegacyTooltip-BQLH6NNZ.js";import"./useLink-30c0The6.js";import"./useFocusable-B1lF6NHK.js";import"./useFocusRing-ckjGDaB9.js";import"./useEffectEvent-HUb76GIf.js";import"./chain-B8CRNRIy.js";import"./index-60xSEIfD.js";import"./usePopper-CEndrzxl.js";import"./index-DrND0Ud_.js";import"./Portal-vcMJoXCl.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DysWXBo7.js";import"./IconCheckMark-DT6ELjh0.js";import"./IconExclamationMarkCircle24-C5-ZFPp4.js";import"./IconExclamationMarkTriangle-DUVfJ7Ey.js";import"./IconExclamationMarkTriangle24-DdJA7dHC.js";import"./IconQuestionMarkCircle-Dmvn_Cz2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DBAs6Vfq.js";import"./Switch-BFMtvzGB.js";import"./TabItem-BbaK2t1b.js";import"./elements-BOYmskOL.js";import"./TextInput-4DApBXSu.js";import"./IconCross-BJLzEk4o.js";import"./Tooltip-mJNIvbyO.js";import"./useClickOutside-C56zEwiR.js";import"./EnablePortalWrapper-D2WWcRo-.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DHvKrt7v.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D-XxAhYv.js";import"./IconCaretDown-cvqhZz-x.js";import"./IconCaretDown16-GiF-mGuT.js";import"./IconTrashBin16-C1hGhQPA.js";import"./IconTrashBin24-T3d59XsQ.js";import"./useButton-DzmDR489.js";import"./Flex-BAYA73IJ.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const Ct=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Ct as __namedExportsOrder,Bt as default};
