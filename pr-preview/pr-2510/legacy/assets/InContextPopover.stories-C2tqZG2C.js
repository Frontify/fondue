import{r as a,j as t}from"./iframe-DxfotSS9.js";import{a as l}from"./Box-C7GOpf5o.js";import{B as d}from"./Button-CMmxZlIG.js";import{D as u}from"./DialogBody-BF9CMRjl.js";import{D as g}from"./DialogFooter-7MjiNu3j.js";import{D as f}from"./DialogHeader-zByIH-D5.js";import{P as m}from"./Popover-s_GgLBSv.js";import{I as x}from"./IconJohanna-DNk0o6yy.js";import"./preload-helper-qBSLZfTS.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-vYE7nqub.js";import"./Divider-CYjlWnZw.js";import"./FormControl-mFXaAePr.js";import"./InputLabel-yMo-9wjq.js";import"./TooltipIcon-DRNfXv40.js";import"./LegacyTooltip-BRORIEgS.js";import"./useLink-D_fwx5cq.js";import"./useFocusable-BqelGtsA.js";import"./useFocusRing-Cl2cI3Lp.js";import"./useEffectEvent-D8_6AnRF.js";import"./chain-DM-najzk.js";import"./index-DpBu0Yu5.js";import"./usePopper-k_Qq_7j_.js";import"./index-GOXnEJ6I.js";import"./Portal-BqvWEzGw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DPND1Hj9.js";import"./IconCheckMark-CRZ1v2hw.js";import"./IconExclamationMarkCircle24-BUygXcvA.js";import"./IconExclamationMarkTriangle-DWC4GrnU.js";import"./IconExclamationMarkTriangle24-BQSC-xnV.js";import"./IconQuestionMarkCircle-B2qDKiRV.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C8Sn9wYM.js";import"./Switch-CoQEYtyM.js";import"./TabItem-B1nt7sRl.js";import"./elements-BOYmskOL.js";import"./TextInput-Dt9oyCFy.js";import"./IconCross-C-EMmBjd.js";import"./Tooltip-BXvhTdAr.js";import"./useClickOutside-BbMxOwiV.js";import"./EnablePortalWrapper-DtYYhlB2.js";import"./dialog-D9O7a7Fm.js";import"./Tree-ChEZSjl9.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-To_o5pjp.js";import"./Flex-DXRGZQZX.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
