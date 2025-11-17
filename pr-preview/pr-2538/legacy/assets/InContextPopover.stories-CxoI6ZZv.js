import{r as s,j as t}from"./iframe-z7mE2Wk_.js";import{a as l}from"./Box-JEXyJSu8.js";import{B as d}from"./Button-nqKSQe0n.js";import{D as u}from"./DialogBody-BD4KMmLT.js";import{D as g}from"./DialogFooter-BZo5Gn1L.js";import{D as f}from"./DialogHeader-B1APGUSe.js";import{P as n}from"./Popover-DrNY1pRr.js";import{I as x}from"./IconIcon-PmhneWnw.js";import"./preload-helper-B3RP-zrM.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BAgdxmuY.js";import"./Checkbox-DH9o4iuo.js";import"./useFocusable-CaNXLyLQ.js";import"./useFocusRing-TSBrnVkt.js";import"./useEffectEvent-Cy9gGdjO.js";import"./chain-C9UJi1qp.js";import"./index-DiQlz7gC.js";import"./useFormValidationState-w5JfW8iw.js";import"./useControlledState-CXveQydd.js";import"./InputLabel-B34_xZ8L.js";import"./TooltipIcon-C4CPZgz5.js";import"./LegacyTooltip-BATB0pek.js";import"./useLink-DNHzOnAf.js";import"./usePopper-CDC_Gl3n.js";import"./index-C-oZNt1w.js";import"./Portal-DwhL2L_d.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DVY2tdmo.js";import"./IconCheckMark-ComK8mHi.js";import"./IconExclamationMarkCircle24-BjQv_f7p.js";import"./IconExclamationMarkTriangle-DlKNdBTi.js";import"./IconExclamationMarkTriangle24-Dw8gX6Sm.js";import"./IconQuestionMarkCircle-DtUT4oXr.js";import"./IconMinus-BzGXdu_h.js";import"./Divider-BTvRs36V.js";import"./FormControl-By6vHcJx.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Dd8ddVox.js";import"./Switch-DHjdejSs.js";import"./TabItem-Cba-h8s6.js";import"./elements-BOYmskOL.js";import"./TextInput-DhxGzDyZ.js";import"./IconCross-ZEasPdrE.js";import"./Tooltip-CVsxlovO.js";import"./useClickOutside-Rl9D5ZyQ.js";import"./EnablePortalWrapper-V6D5L0ak.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BGJTm5QH.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-B9610hLg.js";import"./Flex-oaKFE7By.js";import"./IconIcon16-TQwPlyR4.js";import"./IconIcon24-CVoc58WA.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
