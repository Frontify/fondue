import{r as a,j as t}from"./iframe-Lx3fyMem.js";import{a as l}from"./Box-CckFIKbm.js";import{B as d}from"./Button-BzXDiA4y.js";import{D as u}from"./DialogBody-CU1VL_8m.js";import{D as g}from"./DialogFooter-CSPdsp52.js";import{D as f}from"./DialogHeader-D7XJkFoi.js";import{P as m}from"./Popover-CXlwlHXJ.js";import{I as x}from"./IconJohanna-BDA5auQb.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DMBq_Y--.js";import"./Divider-5D-uJW_F.js";import"./FormControl-DBE_q60t.js";import"./InputLabel-CBUy_XX1.js";import"./TooltipIcon-ps-0n-ya.js";import"./LegacyTooltip-BKLxuPOW.js";import"./useLink-BPyXKjtr.js";import"./useFocusable-BdWoFksO.js";import"./useFocusRing-CiEMWpN8.js";import"./useEffectEvent-CZMgj56A.js";import"./chain-DlM-WH6Z.js";import"./index-B3Qgt-lS.js";import"./usePopper-Bihzf9VH.js";import"./index-DqcmmWsV.js";import"./Portal-DJmtadYa.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DQZ_sCPh.js";import"./IconCheckMark-BqM_w58-.js";import"./IconExclamationMarkCircle24-DDTJ82xZ.js";import"./IconExclamationMarkTriangle-NkEknEiV.js";import"./IconExclamationMarkTriangle24-COrLupZ7.js";import"./IconQuestionMarkCircle-Bivy8uKw.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Djw0rkH-.js";import"./Switch-Dl0K0Py9.js";import"./TabItem-eH3hrYdN.js";import"./elements-BOYmskOL.js";import"./TextInput-BJD_WRwQ.js";import"./IconCross-LM-zbUZv.js";import"./Tooltip-DVGnzGVf.js";import"./useClickOutside-C8wG0eoP.js";import"./EnablePortalWrapper-DK4GCkIj.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bu8EZT-j.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CGHLoVvN.js";import"./Flex-DioJ52A6.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const gt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,gt as __namedExportsOrder,ut as default};
