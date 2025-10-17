import{r as p,j as t}from"./iframe-Dwin3FxO.js";import{a as l}from"./Box-5evlgCsF.js";import{B as d}from"./Button-CKXsKGD5.js";import{D as u}from"./DialogBody-CN62-oJm.js";import{D as g}from"./DialogFooter-BQBu-tuk.js";import{D as f}from"./DialogHeader-5ijAwC54.js";import{P as n}from"./Popover-B9lKEP9T.js";import{I as x}from"./IconJohanna-CXkHf4Hi.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DhnSYn5V.js";import"./Divider-CnWbkUKS.js";import"./Dropdown-BLAewou2.js";import"./useButton-BsJegSmH.js";import"./useFocusable-Bp8A_yXF.js";import"./useFocusRing-swznnzXG.js";import"./useEffectEvent-wdw4_BRC.js";import"./chain-E9lX77Gb.js";import"./index-DwYNVFcV.js";import"./FocusScope-COYiORyc.js";import"./useOverlayTriggerState-j0_YX7gm.js";import"./useControlledState-DKB5d8dN.js";import"./useMenuTrigger-CD-zpV_a.js";import"./useLabels-CVQ6RD4-.js";import"./useLocalizedStringFormatter-BAPTT49-.js";import"./context-DhWXtlDh.js";import"./VisuallyHidden-cIiiicO7.js";import"./helper-U6xaHnL7.js";import"./keyboard-DPiKC0x7.js";import"./SelectionManager-CBp81lVo.js";import"./useField-CpSRl-SE.js";import"./useFormValidationState-O_fivc1L.js";import"./usePopper-CbLYfQYR.js";import"./index-34xpJy1M.js";import"./MenuItem-DIpMfICd.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CT3w72s4.js";import"./IconCheckMark-CXLrFdWg.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DQ0PFIKz.js";import"./Trigger-DmtSg97z.js";import"./IconCaretDown-c7zt4LK7.js";import"./IconCaretDown16-DAiMAZVx.js";import"./IconCross-FdRJPnO5.js";import"./IconExclamationMarkTriangle-CNcDSymw.js";import"./IconExclamationMarkTriangle24-CFbJhFlF.js";import"./IconTrashBin16-BaS-aF7j.js";import"./IconTrashBin24-BjzpaZgm.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CLgVQhB2.js";import"./Portal-D5DnNNiN.js";import"./useMemoizedId-FdiXK2xp.js";import"./FormControl-CEdaMpG2.js";import"./InputLabel-D8rWOiLZ.js";import"./TooltipIcon-CnJNzBIg.js";import"./LegacyTooltip-fg58BgYe.js";import"./useLink-CHtPM4PO.js";import"./IconExclamationMarkCircle24-u83y5adM.js";import"./IconQuestionMarkCircle-2K-v2_hs.js";import"./Switch-CfJBzjml.js";import"./TabItem-Bsqu01ha.js";import"./TextInput-BwMR_4UK.js";import"./Tooltip-DwJLBt2z.js";import"./useClickOutside-DykVKKPP.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DBkTkPOc.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BgwdmUgj.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
