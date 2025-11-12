import{r as p,j as t}from"./iframe-Ca9WJIBK.js";import{a as l}from"./Box-Dta85FAJ.js";import{B as d}from"./Button-CnOLOGK7.js";import{D as u}from"./DialogBody-Cn-5q-Kk.js";import{D as g}from"./DialogFooter-FNOeiotz.js";import{D as f}from"./DialogHeader-CZTlBK9O.js";import{P as n}from"./Popover-7hjoyPnF.js";import{I as x}from"./IconIcon-DctGtOsl.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B1Xmeo9G.js";import"./Divider-D1tYVdE9.js";import"./Dropdown-CkCoivmc.js";import"./useButton-DGBDNgU7.js";import"./useFocusable-C1WoQs-T.js";import"./useFocusRing-BwzAH-2K.js";import"./useEffectEvent-TJiFP2g3.js";import"./chain-DCPzrEZQ.js";import"./index-AbzjxHSH.js";import"./FocusScope-DoucVTHl.js";import"./useOverlayTriggerState-BV7PYFwU.js";import"./useControlledState-C-yCLtZN.js";import"./useMenuTrigger-Dx5nPd21.js";import"./useLabels-BBWLrE9G.js";import"./useLocalizedStringFormatter-DZZ7LkGX.js";import"./context-kYclt6ZX.js";import"./VisuallyHidden-b7OoCiMy.js";import"./helper-CAD_TrKY.js";import"./keyboard-DwOn7Ntm.js";import"./SelectionManager-BIr7me4z.js";import"./useField-BYBys9YO.js";import"./useFormValidationState-BQNefewE.js";import"./usePopper-C-NlHTyQ.js";import"./index-CLqlsjva.js";import"./MenuItem-BgaffJtb.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DZKZlpE5.js";import"./IconCheckMark-B1Dc5Kb6.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-C-qJOuWM.js";import"./Trigger-CYFVkHmt.js";import"./IconCaretDown-D3MkWkTR.js";import"./IconCaretDown16-BIMtKl3v.js";import"./IconCross-uBKIpJqx.js";import"./IconExclamationMarkTriangle-BCskP2qp.js";import"./IconExclamationMarkTriangle24-De1sJXh2.js";import"./IconTrashBin16-DV1rZlFw.js";import"./IconTrashBin24-D9wzOXUb.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CNW_gR7-.js";import"./Portal-DbhhpfdV.js";import"./useMemoizedId-BdBpCiYz.js";import"./FormControl-CLGX9lEQ.js";import"./InputLabel-CTPaTyPc.js";import"./TooltipIcon-PcHhlBO6.js";import"./LegacyTooltip-ChRLGsLt.js";import"./useLink-CZOSwZKD.js";import"./IconExclamationMarkCircle24-pgWUzkh2.js";import"./IconQuestionMarkCircle-DJaiFUzl.js";import"./Switch-eh5BQsSO.js";import"./TabItem-C6Tvfmip.js";import"./TextInput-CSthRERT.js";import"./Tooltip-Cs9uAo5f.js";import"./useClickOutside-CVpI9hLY.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bt4aPzUc.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BavOXq8K.js";import"./IconIcon16-C6rippnO.js";import"./IconIcon24-CH8fXaOj.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
