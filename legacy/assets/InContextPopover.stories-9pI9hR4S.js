import{r as a,j as t}from"./iframe-BJib8Kll.js";import{a as l}from"./Box-DEVfhOUF.js";import{B as d}from"./Button-1lSncydy.js";import{D as u}from"./DialogBody-Sw307Mg4.js";import{D as g}from"./DialogFooter-C_wA7ziy.js";import{D as f}from"./DialogHeader-B1zbAF7R.js";import{P as n}from"./Popover-BZ6iNXRt.js";import{I as x}from"./IconJohanna-CYQCgcAu.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B7KnxX7n.js";import"./Divider-B1iAKB8Z.js";import"./FormControl-CubYqxhr.js";import"./InputLabel-DDaH5jGP.js";import"./TooltipIcon-CWpv0SCw.js";import"./LegacyTooltip-DQtshncE.js";import"./useLink-DaZJF4JL.js";import"./useFocusable-BZ2M2-hT.js";import"./useFocusRing-Dx5cesQf.js";import"./useEffectEvent-Dk3j2lU0.js";import"./chain-6ySw-mAZ.js";import"./index-BrcoO-my.js";import"./usePopper-Bqaw92iD.js";import"./index-8-HEQlSN.js";import"./Portal-DopE8pYV.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BmAS-enA.js";import"./IconCheckMark-Cnljcyn_.js";import"./IconExclamationMarkCircle24-DctE9zvr.js";import"./IconExclamationMarkTriangle-Cmjf0-06.js";import"./IconExclamationMarkTriangle24-C5nxH8VW.js";import"./IconQuestionMarkCircle-CEKlnl82.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-uDZgv9aU.js";import"./Switch-VckIayUz.js";import"./TabItem-BRr3HurZ.js";import"./elements-BOYmskOL.js";import"./TextInput-B-ufwcW8.js";import"./IconCross-BduquNop.js";import"./Tooltip-fUDznyft.js";import"./useClickOutside-CSJpZRoz.js";import"./EnablePortalWrapper-DA7RYv-Z.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BVbPRgfb.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BjHlmN8o.js";import"./IconCaretDown-DragTtrg.js";import"./IconCaretDown16-CKZGjeXl.js";import"./IconTrashBin16-C7Mvs-24.js";import"./IconTrashBin24-DSKkA_eN.js";import"./useButton-nrvqgNmX.js";import"./Flex-BmNc3aFq.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
