import{r as s,j as t}from"./iframe-DFjLVhbc.js";import{a as l}from"./Box-CpuKb_TY.js";import{B as d}from"./Button-XPgNJcu_.js";import{D as u}from"./DialogBody-tGpfYhcG.js";import{D as g}from"./DialogFooter-DCaDHBO_.js";import{D as f}from"./DialogHeader-D_B1IAul.js";import{P as m}from"./Popover-R1jq9awi.js";import{I as x}from"./IconIcon-33TVbUTG.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Ds6ipySY.js";import"./Divider-Bea9uO5x.js";import"./FormControl-BoBhULsz.js";import"./InputLabel-BDWyhbvK.js";import"./TooltipIcon-DTnfUr_M.js";import"./LegacyTooltip-D7yTMei4.js";import"./useLink-Cj49D8lr.js";import"./useFocusable-BrJEXGTh.js";import"./useFocusRing-Dpj3h8BM.js";import"./useEffectEvent-Byy-55H1.js";import"./chain-COto9jE3.js";import"./index-D-7FLlQT.js";import"./usePopper-DH9GtlFm.js";import"./index-BPkFHB1-.js";import"./Portal-DLwQmRYf.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DJOVjcIP.js";import"./IconCheckMark-CSMVTQE3.js";import"./IconExclamationMarkCircle24-CwIO_fii.js";import"./IconExclamationMarkTriangle-BpenX5rI.js";import"./IconExclamationMarkTriangle24-D7R2hUNj.js";import"./IconQuestionMarkCircle-B2h9uWzx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CLUE5Hbx.js";import"./Switch-CLu4a2nk.js";import"./TabItem-DHCjxNWQ.js";import"./elements-BOYmskOL.js";import"./TextInput-C3rHRFW3.js";import"./IconCross-CnsGMava.js";import"./Tooltip-CEen6IZc.js";import"./useClickOutside-Ckm3YLJn.js";import"./EnablePortalWrapper-D2ZUqfE9.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Dm__3i5r.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D4BWKnIt.js";import"./Flex-DCqu042M.js";import"./IconIcon16-DA05yYeS.js";import"./IconIcon24-Bn1hTiTn.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
