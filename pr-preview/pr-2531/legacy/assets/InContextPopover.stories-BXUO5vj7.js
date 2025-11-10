import{r as s,j as t}from"./iframe-DkUKKt5y.js";import{a as l}from"./Box-Dv17W1WR.js";import{B as d}from"./Button-6JaeM8mU.js";import{D as u}from"./DialogBody-B-iRR9z_.js";import{D as g}from"./DialogFooter--y_4e3c8.js";import{D as f}from"./DialogHeader-Cvqv4YWh.js";import{P as n}from"./Popover-Z3cNWFW1.js";import{I as x}from"./IconIcon-C5JEEbm3.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B9TSbNud.js";import"./Checkbox-DRqnjHKW.js";import"./useFocusable-BnodLyil.js";import"./useFocusRing-BLxiuku7.js";import"./useEffectEvent-Cx-ijvAI.js";import"./chain-CndHG7ua.js";import"./index-5vGpRYJt.js";import"./useFormValidationState-fGaqfeUN.js";import"./useControlledState-LG7onZMS.js";import"./InputLabel-blbM3kcV.js";import"./TooltipIcon-C5OnEtaA.js";import"./LegacyTooltip-D55BXxvs.js";import"./useLink-BIFW9FB1.js";import"./usePopper-D77eUAEW.js";import"./index-CBYJFN7O.js";import"./Portal-BXb_EYja.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D1DXyTps.js";import"./IconCheckMark-B0sjDw5i.js";import"./IconExclamationMarkCircle24-WOKR46An.js";import"./IconExclamationMarkTriangle-DOOWrk9t.js";import"./IconExclamationMarkTriangle24-DcTApZBc.js";import"./IconQuestionMarkCircle-BcldpYoL.js";import"./IconMinus-DDQicYL5.js";import"./Divider-qyYjCJ9L.js";import"./FormControl-BpOPhv4H.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C8tJhyot.js";import"./Switch-CFJ0_dDx.js";import"./TabItem-VZJHOXhL.js";import"./elements-BOYmskOL.js";import"./TextInput-MWeaHY13.js";import"./IconCross-C8gM1v-C.js";import"./Tooltip-Cmm_S9wY.js";import"./useClickOutside-COZiIny8.js";import"./EnablePortalWrapper-4q6q-LSO.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bzlxa0iG.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BAXULSxE.js";import"./IconCaretDown-CkHr4F8u.js";import"./IconCaretDown16-BXjV2vc4.js";import"./IconTrashBin16-BSLG_W8z.js";import"./IconTrashBin24-Ck4Mk32o.js";import"./useButton-CG_fcLKk.js";import"./Flex-Bgt9-KsO.js";import"./IconIcon16-PeN8zDcl.js";import"./IconIcon24-BczRtnsJ.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(a=o.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const qt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,qt as __namedExportsOrder,vt as default};
