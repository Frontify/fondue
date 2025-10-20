import{r as a,j as e}from"./iframe-BZNqkfAJ.js";import{a as l}from"./Box-BPavLjub.js";import{B as d}from"./Button-DPdntTPA.js";import{D as u}from"./DialogBody-CRxBFY71.js";import{D as g}from"./DialogFooter-C415-kMf.js";import{D as f}from"./DialogHeader-BxcKz5Tl.js";import{P as m}from"./Popover-DWBxlQVa.js";import{I as x}from"./IconJohanna-BQ7EJzav.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-71nhGtBl.js";import"./FormControl-Fm8ji9--.js";import"./InputLabel-VnXyqqtb.js";import"./TooltipIcon-B4fgfgXq.js";import"./LegacyTooltip-BMPA2y4M.js";import"./useLink-BV60aH2t.js";import"./useFocusable-Cbb67iIG.js";import"./useFocusRing-CQ3DSYMp.js";import"./useEffectEvent-rvbS5oZD.js";import"./chain-DYaMBwaU.js";import"./index-CwejX9uB.js";import"./usePopper-RQB8ULWN.js";import"./index-CfLIqIuw.js";import"./Portal-ClW_Qzmp.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DhdJoYsE.js";import"./IconCheckMark-DHJw-dqm.js";import"./IconExclamationMarkCircle24-C_PyDBL-.js";import"./IconExclamationMarkTriangle-BmGuHDO2.js";import"./IconExclamationMarkTriangle24-B3UsieTF.js";import"./IconQuestionMarkCircle-Rvx5Hlp1.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DAKrD1ew.js";import"./Switch-B2TDQsp5.js";import"./TabItem-BgZOvlvz.js";import"./elements-BOYmskOL.js";import"./TextInput-DX08Yz5d.js";import"./IconCross-B1GSSqi0.js";import"./Tooltip-C2wVThcL.js";import"./useClickOutside-wbm9sBa4.js";import"./EnablePortalWrapper-mkrX-ke8.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ad17tz2O.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-6CMglOI-.js";import"./Flex-DWfl2uPm.js";const de={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(d,{icon:e.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),e.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:e.jsxs(l,{className:"tw-w-[400px]",children:[e.jsx(f,{title:"Title",padding:"compact"}),e.jsx(u,{padding:"compact",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),e.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},t=h.bind({});t.args={};var s,n,p;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
