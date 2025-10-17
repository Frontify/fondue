import{r as a,j as t}from"./iframe-C7qgvnLT.js";import{a as l}from"./Box-C-gowCTp.js";import{B as d}from"./Button-DIP-05BK.js";import{D as u}from"./DialogBody-B48JSZ9u.js";import{D as g}from"./DialogFooter-DSZH9ePe.js";import{D as f}from"./DialogHeader-DGJU1ipm.js";import{P as m}from"./Popover-BIiXI6d2.js";import{I as x}from"./IconJohanna-C67aoeN8.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D0abC8j7.js";import"./Checkbox-CWu2LneF.js";import"./useFocusable-CnN_ZxTp.js";import"./useFocusRing-ruVidjCk.js";import"./useEffectEvent-DrDM7H6C.js";import"./chain-T2cQnJ1g.js";import"./index-DctR5yPS.js";import"./useFormValidationState-DPXeRUoI.js";import"./useControlledState-7XsNrzHb.js";import"./InputLabel-CCwwbZtd.js";import"./TooltipIcon-BrZxZiQo.js";import"./LegacyTooltip-BAkmaqHw.js";import"./useLink-C0bVM8hx.js";import"./usePopper-ZfvWTzRi.js";import"./index-BDs77OgO.js";import"./Portal-CaYwSItc.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DEW6DLvp.js";import"./IconCheckMark-CgWGsbgX.js";import"./IconExclamationMarkCircle24-CkOatguF.js";import"./IconExclamationMarkTriangle-Bhhpa-fO.js";import"./IconExclamationMarkTriangle24-DIoh2jOr.js";import"./IconQuestionMarkCircle-Dh8clI19.js";import"./IconMinus-C1mJOu0u.js";import"./Divider-D9e93dBx.js";import"./FormControl-CHNKbetT.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BFXC5BKk.js";import"./Switch-7AoD3PlT.js";import"./TabItem-miXSmjfc.js";import"./elements-BOYmskOL.js";import"./TextInput-CGbZopza.js";import"./IconCross-Bh5k4Glw.js";import"./Tooltip-D5xtMJRc.js";import"./useClickOutside-fEpXeDHb.js";import"./EnablePortalWrapper-gKNJ-13l.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CgF_-bhG.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-D3Um7fi_.js";import"./Flex-CYuaVuw_.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const Bt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Bt as __namedExportsOrder,ht as default};
