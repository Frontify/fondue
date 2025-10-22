import{r as a,j as t}from"./iframe-DeWR3bCY.js";import{a as l}from"./Box-C24z_FHg.js";import{B as d}from"./Button-BLweziEU.js";import{D as u}from"./DialogBody-Bxq-KBQ8.js";import{D as g}from"./DialogFooter-G-2haZD1.js";import{D as f}from"./DialogHeader-mRIyp-nM.js";import{P as n}from"./Popover-tjYEn_E0.js";import{I as x}from"./IconJohanna-elPT8dqu.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CW1mzVUI.js";import"./Divider-CelkCIk-.js";import"./FormControl-MukbM0aI.js";import"./InputLabel-h8LqjAy_.js";import"./TooltipIcon-BYyV3rYt.js";import"./LegacyTooltip-D44E3v73.js";import"./useLink-BOrznN4e.js";import"./useFocusable-B__8DITY.js";import"./useFocusRing-DDmCmTBg.js";import"./useEffectEvent-ZViW6iRT.js";import"./chain-CphVvTE2.js";import"./index-DJft0qVE.js";import"./usePopper-CE9IDH84.js";import"./index-BpjCltCh.js";import"./Portal-zj59SWKM.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Dn8dI9Es.js";import"./IconCheckMark-CXzdR80S.js";import"./IconExclamationMarkCircle24-i1KiRCfY.js";import"./IconExclamationMarkTriangle-B_pFvKyE.js";import"./IconExclamationMarkTriangle24-W3C7A4ds.js";import"./IconQuestionMarkCircle-ClsWoaJ8.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D_DR5JcS.js";import"./Switch-C09w1jFf.js";import"./TabItem-BmwuxtVx.js";import"./elements-BOYmskOL.js";import"./TextInput-OgjAFddC.js";import"./IconCross-DzJAACQt.js";import"./Tooltip-DYBnp2KT.js";import"./useClickOutside-8mz09EUm.js";import"./EnablePortalWrapper-BnKNRUvW.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B2KJq71l.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CN_JTlBu.js";import"./IconCaretDown-D5f-fXwU.js";import"./IconCaretDown16-O9eJ0HMS.js";import"./IconTrashBin16-Hx2dZQ9J.js";import"./IconTrashBin24-hE8LGw7s.js";import"./useButton-BZC89rr_.js";import"./Flex-BbfQ6fYv.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
