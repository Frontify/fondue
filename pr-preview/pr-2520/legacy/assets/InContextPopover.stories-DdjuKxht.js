import{r as s,j as t}from"./iframe-DFc2imB-.js";import{a as l}from"./Box-Dd9GlYDk.js";import{B as d}from"./Button-g2quZO2d.js";import{D as u}from"./DialogBody-DMu9icvu.js";import{D as g}from"./DialogFooter-Bs57YzaZ.js";import{D as f}from"./DialogHeader-CgMxGZ_C.js";import{P as n}from"./Popover-HZ0yC_k9.js";import{I as x}from"./IconIcon-B1Z_dJg0.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CyGRG5jR.js";import"./Divider-Bg-xcAi5.js";import"./FormControl-sYlaWQNH.js";import"./InputLabel-Dd39__5S.js";import"./TooltipIcon-DbV1_Tvp.js";import"./LegacyTooltip-BDvNvRjx.js";import"./useLink-5MLEhbgn.js";import"./useFocusable-DlUYsHvp.js";import"./useFocusRing-CmgQp483.js";import"./useEffectEvent-Dxdtj8T7.js";import"./chain-C5FS3PJJ.js";import"./index-D-B6EC3j.js";import"./usePopper-0wPWSdt6.js";import"./index-BOFl1R0b.js";import"./Portal-DGF67CzQ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DsFXR7AU.js";import"./IconCheckMark-BHFp-usV.js";import"./IconExclamationMarkCircle24-DMdBV0gH.js";import"./IconExclamationMarkTriangle-qVF5EOfJ.js";import"./IconExclamationMarkTriangle24-1PLxekLQ.js";import"./IconQuestionMarkCircle-DZCKWrTp.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DTIN7Jfc.js";import"./Switch-dNob1Rjk.js";import"./TabItem-BFJPyz6m.js";import"./elements-BOYmskOL.js";import"./TextInput-CjCTWfrx.js";import"./IconCross-BWVlwyGb.js";import"./Tooltip-C6vmTJVO.js";import"./useClickOutside-XBnvbXF2.js";import"./EnablePortalWrapper-qioJtyLy.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D1HFVKmr.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BLbKe9pf.js";import"./IconCaretDown-vTPsccpO.js";import"./IconCaretDown16-C1HVvLUj.js";import"./IconTrashBin16-8K3QGeIn.js";import"./IconTrashBin24-CUFBmwQa.js";import"./useButton-DpLox9tK.js";import"./Flex-BGgaC5nB.js";import"./IconIcon16-CeCV_Fcy.js";import"./IconIcon24-CJ1rPJTt.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
