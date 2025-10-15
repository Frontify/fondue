import{r as a,j as t}from"./iframe-3oRiCOMA.js";import{a as l}from"./Box-Wa1UQ0kp.js";import{B as d}from"./Button-tdRQVd-X.js";import{D as u}from"./DialogBody-BiH_w6pO.js";import{D as g}from"./DialogFooter-BZLB0M-L.js";import{D as f}from"./DialogHeader-i0RXmYNg.js";import{P as m}from"./Popover-6hUlwOKr.js";import{I as x}from"./IconJohanna-BIfsjK45.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D35Y1tmr.js";import"./Divider-Cnt1kd6B.js";import"./FormControl-D5ROYw35.js";import"./InputLabel-3kkok3gm.js";import"./TooltipIcon-omkkg6r0.js";import"./LegacyTooltip-EwG9IAuw.js";import"./useLink-CbszE7S7.js";import"./useFocusable-Bi7WFdCU.js";import"./useFocusRing-B4Z8FlBA.js";import"./useEffectEvent-1oya5x99.js";import"./chain-CYmkXS4K.js";import"./index-De9cKHpm.js";import"./usePopper-BXvVajWh.js";import"./index-BUsYKrk-.js";import"./Portal-4490uK6y.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CEssXdIF.js";import"./IconCheckMark-B5_KFKnC.js";import"./IconExclamationMarkCircle24-DWw8SKlA.js";import"./IconExclamationMarkTriangle-V3TN4WUG.js";import"./IconExclamationMarkTriangle24-DlSHM1ML.js";import"./IconQuestionMarkCircle-BboJpMia.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-sfA4f1QE.js";import"./Switch-lhnOq77z.js";import"./TabItem-1GwxOQva.js";import"./elements-BOYmskOL.js";import"./TextInput-ryaHYkqR.js";import"./IconCross-xF-pgupn.js";import"./Tooltip-BmPQFROf.js";import"./useClickOutside-BGEBPv8D.js";import"./EnablePortalWrapper-BG-bQ8ru.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D1HDb2zV.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-C27_pHVF.js";import"./Flex-Bf2rMtX9.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
