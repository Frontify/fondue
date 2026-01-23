import{r as p,j as t}from"./iframe-BgclmNi_.js";import{a as l}from"./Box-BVJjrt8A.js";import{B as d}from"./Button-Jh62-Uss.js";import{D as u}from"./DialogBody-Ckmebbf4.js";import{D as g}from"./DialogFooter-D8JzKsQa.js";import{D as f}from"./DialogHeader-DZ7wR2eP.js";import{P as n}from"./Popover-CGJHY001.js";import{I as x}from"./IconIcon-BPygaErP.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BhenJ9Jt.js";import"./Divider-VQQdNwek.js";import"./Dropdown-Cp5EZUx7.js";import"./useButton-DXvY-MRW.js";import"./useFocusable-DtKQAfqn.js";import"./useFocusRing-DC_lV9ru.js";import"./useEffectEvent-TAw_EjWl.js";import"./chain-Dy5Kpw7j.js";import"./index-u9euIB8F.js";import"./FocusScope-CBd9q2H5.js";import"./useOverlayTriggerState-CIHMJDQp.js";import"./useControlledState-CKTk-GQk.js";import"./useMenuTrigger-idV-rg2K.js";import"./useLabels-AY-KNK8b.js";import"./useLocalizedStringFormatter-CuZbqWk8.js";import"./context-3Mddb9Fq.js";import"./VisuallyHidden-ruA9c2G9.js";import"./helper-OJgaBbqu.js";import"./keyboard-DIao9I3o.js";import"./SelectionManager-CX98pLVM.js";import"./useField-CiKFOMbH.js";import"./useFormValidationState-DwyVTzUy.js";import"./usePopper-DHW2kk9d.js";import"./index-LSGqXRyL.js";import"./MenuItem-3_wVpizr.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DMwnH2Td.js";import"./IconCheckMark-BpvxRbMV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DiKkRkPJ.js";import"./Trigger-DZeP-byj.js";import"./IconCaretDown-DyTKIuZ4.js";import"./IconCaretDown16-DHUVfGTZ.js";import"./IconCross-DUAsfivl.js";import"./IconExclamationMarkTriangle-BmgyKCQw.js";import"./IconExclamationMarkTriangle24-DcKSRA4_.js";import"./IconTrashBin16-DWP8Iw1O.js";import"./IconTrashBin24-c4Eg252N.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DwrtlsaZ.js";import"./Portal-CCWlAhWK.js";import"./useMemoizedId-CkykZqr2.js";import"./FormControl-qgdXJIv8.js";import"./InputLabel-B4u8vZ8Y.js";import"./TooltipIcon-CeN63lwH.js";import"./LegacyTooltip-DwJuubBB.js";import"./useLink-Chx8Vlbe.js";import"./IconExclamationMarkCircle24-CzSbzoG8.js";import"./IconQuestionMarkCircle-12jh82xR.js";import"./Switch-BivgEHUR.js";import"./TabItem-Bz9ynkg7.js";import"./TextInput-rmiPtBno.js";import"./Tooltip-DbQPi6yz.js";import"./useClickOutside-BfvyDHTE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Blm9d-j4.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-C5AXNg6W.js";import"./IconIcon16-Bm2Dc8DY.js";import"./IconIcon24-wHWLFgxs.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
