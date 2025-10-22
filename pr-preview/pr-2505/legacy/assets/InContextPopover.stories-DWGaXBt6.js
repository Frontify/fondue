import{r as a,j as t}from"./iframe-CArh3U2R.js";import{a as l}from"./Box-hq_c_9Ms.js";import{B as d}from"./Button-ChMCF2L2.js";import{D as u}from"./DialogBody-CH4V0kTU.js";import{D as g}from"./DialogFooter-De-CN6zO.js";import{D as f}from"./DialogHeader-DQsVx0Ql.js";import{P as n}from"./Popover-BfSK4c5W.js";import{I as x}from"./IconJohanna-GdLeg_Va.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CjSqb4ET.js";import"./Divider-DKzzOKDP.js";import"./FormControl-DEHlUEia.js";import"./InputLabel-DD8443rL.js";import"./TooltipIcon-BZzSYTtM.js";import"./LegacyTooltip-KCzikuHf.js";import"./useLink-CLCUz5KQ.js";import"./useFocusable-BQQ-aorh.js";import"./useFocusRing-Dk1gKGXm.js";import"./useEffectEvent-YMJ2RRp9.js";import"./chain-XO24dopb.js";import"./index-NcOw1q2c.js";import"./usePopper-u01rWO-b.js";import"./index-qy9vPm5y.js";import"./Portal-BcBrSEu7.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DWWCqZzw.js";import"./IconCheckMark-fZKVZSXZ.js";import"./IconExclamationMarkCircle24-B8MY2-G8.js";import"./IconExclamationMarkTriangle-CpHRnvpz.js";import"./IconExclamationMarkTriangle24-CVz-ZF86.js";import"./IconQuestionMarkCircle-DibesPc_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B3caMxJh.js";import"./Switch-gCrpPFBl.js";import"./TabItem-DL2KRk5d.js";import"./elements-BOYmskOL.js";import"./TextInput-B5eKkgOy.js";import"./IconCross-Bn4Yb7Uk.js";import"./Tooltip-CnAhvCkF.js";import"./useClickOutside-A3QcY4xE.js";import"./EnablePortalWrapper-FQwpj0I2.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CKZ5ErBL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B-R3TvPg.js";import"./IconCaretDown-COXRRCVT.js";import"./IconCaretDown16-BMJgRViX.js";import"./IconTrashBin16-tWHvn42_.js";import"./IconTrashBin24-C1q5nmsK.js";import"./useButton-D6AuNLTw.js";import"./Flex-Dt7uVEU-.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
