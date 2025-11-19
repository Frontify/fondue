import{r as s,j as t}from"./iframe-Ds9IMhb6.js";import{a as l}from"./Box-B0v2MRNq.js";import{B as d}from"./Button-BASIVCcz.js";import{D as u}from"./DialogBody-C0c7VB0s.js";import{D as g}from"./DialogFooter-CQ8WMTWJ.js";import{D as f}from"./DialogHeader-DdbWZFJA.js";import{P as n}from"./Popover-CR4Z0w8n.js";import{I as x}from"./IconIcon-C4zcrEKy.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CalKl9qM.js";import"./Divider-DYMumj1e.js";import"./FormControl-DHiX-8lC.js";import"./InputLabel-CG_x41Lf.js";import"./TooltipIcon-C7oA45JJ.js";import"./LegacyTooltip-K6lqF8Bg.js";import"./useLink-BIpXN3r8.js";import"./useFocusable-Crh9H-7K.js";import"./useFocusRing-CpG7AF--.js";import"./useEffectEvent-CJU-o3Qm.js";import"./chain-DWVcZIeQ.js";import"./index-BqXe3Gsu.js";import"./usePopper-Cs2K1CXq.js";import"./index-ClV62Q6j.js";import"./Portal-BpH4kl6h.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DnDcwT1c.js";import"./IconCheckMark-BtqqHMEX.js";import"./IconExclamationMarkCircle24-BjLZ5MlW.js";import"./IconExclamationMarkTriangle-Dv90DL5w.js";import"./IconExclamationMarkTriangle24-Df7MDtbn.js";import"./IconQuestionMarkCircle-D0ouWdEP.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BItzcn91.js";import"./Switch-CPfPnGr9.js";import"./TabItem-Bw84JuLD.js";import"./elements-BOYmskOL.js";import"./TextInput-V38gFzK_.js";import"./IconCross-ClkgebXT.js";import"./Tooltip-DrBcmzff.js";import"./useClickOutside-C_ddJaKo.js";import"./EnablePortalWrapper-P8zZ-6N7.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B2odbYzh.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-XCWmAnmr.js";import"./IconCaretDown-BnYD03A6.js";import"./IconCaretDown16-DaCEkwMs.js";import"./IconTrashBin16-BP62SAVJ.js";import"./IconTrashBin24-DfWPHqTJ.js";import"./useButton-DGFpkWKE.js";import"./Flex-DWL9dBlW.js";import"./IconIcon16-B3htElBq.js";import"./IconIcon24-BPrZ2y-w.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const It=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,It as __namedExportsOrder,jt as default};
