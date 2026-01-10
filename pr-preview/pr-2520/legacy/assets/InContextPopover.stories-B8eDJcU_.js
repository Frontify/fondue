import{r as s,j as t}from"./iframe-COvncgO8.js";import{a as l}from"./Box-BwOPakxs.js";import{B as d}from"./Button-7pOf9H--.js";import{D as u}from"./DialogBody-DCc4Yg2g.js";import{D as g}from"./DialogFooter-BH0Mk1la.js";import{D as f}from"./DialogHeader-DUMSHr3t.js";import{P as n}from"./Popover-DnxTfpnh.js";import{I as x}from"./IconIcon-7k64Xj5J.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C92NR_zh.js";import"./Divider-B85E6BvU.js";import"./FormControl-Bcd_9nmE.js";import"./InputLabel-BPiuuLrA.js";import"./TooltipIcon-C6_vdaPT.js";import"./LegacyTooltip-BcTupzmJ.js";import"./useLink-DrjZu1ud.js";import"./useFocusable-BV7VyjKo.js";import"./useFocusRing-DHBJ7h9x.js";import"./useEffectEvent-RLoKViUZ.js";import"./chain-DvDQn_Hh.js";import"./index-D5tmHRvZ.js";import"./usePopper-C0vzrNCW.js";import"./index-D04KY_3R.js";import"./Portal-DOHoR6KG.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cems80lu.js";import"./IconCheckMark-L790ChEG.js";import"./IconExclamationMarkCircle24-Bg_mSOzO.js";import"./IconExclamationMarkTriangle-DqIxU97e.js";import"./IconExclamationMarkTriangle24-B0fnSC44.js";import"./IconQuestionMarkCircle-KoRPplup.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-nRIrLITl.js";import"./Switch-D-l-1H6w.js";import"./TabItem-iNPvDiQg.js";import"./elements-BOYmskOL.js";import"./TextInput-ypSq6TIC.js";import"./IconCross-cn5_I5If.js";import"./Tooltip-zYGI04Zs.js";import"./useClickOutside-CtDVvtrj.js";import"./EnablePortalWrapper-plu6Olsn.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DjGuGY46.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DPgQ6UJZ.js";import"./IconCaretDown-BFIauR7G.js";import"./IconCaretDown16-B-Ffgwac.js";import"./IconTrashBin16-DN3hi3Xr.js";import"./IconTrashBin24-BhMFm0Uf.js";import"./useButton-ZzZ0x7gO.js";import"./Flex-DwnqaRjb.js";import"./IconIcon16-CgHZmwF_.js";import"./IconIcon24-5ibfR3Hu.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
