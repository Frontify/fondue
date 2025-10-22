import{r as a,j as e}from"./iframe-Bu4L2X3M.js";import{a as l}from"./Box-CSDxvMm9.js";import{B as d}from"./Button-CyFEToUK.js";import{D as u}from"./DialogBody-BxY_XNaP.js";import{D as g}from"./DialogFooter-Dh2pVdvc.js";import{D as f}from"./DialogHeader-BqgGJfDC.js";import{P as m}from"./Popover-bdouYiHD.js";import{I as x}from"./IconJohanna-oQphgxwH.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-1AavS4ZE.js";import"./FormControl-iAdgQXpo.js";import"./InputLabel-BLuVDc3f.js";import"./TooltipIcon-C1M-L0PR.js";import"./LegacyTooltip-924BhB3-.js";import"./useLink-Ci2dsncg.js";import"./useFocusable-DJPYQSY0.js";import"./useFocusRing-aRsYH049.js";import"./useEffectEvent-C9QX9RtM.js";import"./chain-DLXw64Hn.js";import"./index-CuYoSRMf.js";import"./usePopper-Bxnjv0x2.js";import"./index-ySyf93fl.js";import"./Portal-DY8zyLgs.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CDrFaSch.js";import"./IconCheckMark-CnJazdmc.js";import"./IconExclamationMarkCircle24-BToFQ0YX.js";import"./IconExclamationMarkTriangle-CxjqNEF_.js";import"./IconExclamationMarkTriangle24-0DeCRmP4.js";import"./IconQuestionMarkCircle-39pzYv0I.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-jiKMXLbT.js";import"./Switch-CP12zqzJ.js";import"./TabItem-CHtXGS_h.js";import"./elements-BOYmskOL.js";import"./TextInput-CpW1bEzb.js";import"./IconCross-PUc59xfq.js";import"./Tooltip-CLY_Kj2A.js";import"./useClickOutside-Bisz_apJ.js";import"./EnablePortalWrapper-DqVteU1y.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bh5YYnBO.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-uCdTDTpK.js";import"./Flex-D9F8JO4H.js";const de={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(d,{icon:e.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),e.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:e.jsxs(l,{className:"tw-w-[400px]",children:[e.jsx(f,{title:"Title",padding:"compact"}),e.jsx(u,{padding:"compact",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),e.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},t=h.bind({});t.args={};var s,n,p;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=t.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const ue=["WithHeaderAndFooter"];export{t as WithHeaderAndFooter,ue as __namedExportsOrder,de as default};
