import{j as t}from"./jsx-runtime-DF2Pcvd1.js";import{r as p}from"./index-B2-qRKKC.js";import{a as l}from"./Box-CiJnQuk2.js";import{c as d}from"./Button-CjHS5b55.js";import{D as u}from"./DialogBody-B4WXGxMQ.js";import{D as g}from"./DialogFooter-Zn7C2lPP.js";import{D as f}from"./DialogHeader-Cb2nkVdL.js";import{P as n}from"./Popover-DT6yK9yu.js";import{I as x}from"./IconJohanna-iR26Notd.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-Ek6qhYVk.js";import"./Dropdown-fBi4kE1i.js";import"./useButton-BUDKKhDc.js";import"./useFocusable-BhTWlbU3.js";import"./useFocusRing-BMciCUIT.js";import"./useEffectEvent-BOE4tD14.js";import"./chain-z5L_5vtA.js";import"./index-CFX93qP1.js";import"./FocusScope-DT2GjNsa.js";import"./useOverlayTriggerState-BfOTLlRX.js";import"./useControlledState-CmdEzstM.js";import"./useMenuTrigger-Cnk5hR4X.js";import"./useLabels-BhN0CJHD.js";import"./useLocalizedStringFormatter-BbKkG-z0.js";import"./context-CzRDNd1J.js";import"./VisuallyHidden-CSXgoFxA.js";import"./helper-6IMk_DMN.js";import"./keyboard-APSnmnkX.js";import"./SelectionManager-CwM1DjHu.js";import"./useField-DylV0oUP.js";import"./useFormValidationState-4uoa2oRi.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./MenuItem-DrSZ0BqJ.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DMA6RW71.js";import"./IconCheckMark-Db5JnUcj.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DyxURJrK.js";import"./Trigger-DTIt2Pgi.js";import"./IconCaretDown-CAp4CI-i.js";import"./IconCaretDown16-CINgO7jA.js";import"./IconCross-Bq7BKjxu.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconTrashBin16-DHeQSCR9.js";import"./IconTrashBin24-D7tnFyiH.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-C3Ay3AqL.js";import"./Portal-CuQPhhwF.js";import"./useMemoizedId-BB39KVn8.js";import"./FormControl-c6DumdNZ.js";import"./InputLabel-DNMKamdH.js";import"./TooltipIcon-DRyj0HgG.js";import"./LegacyTooltip-CW5KkIFs.js";import"./useLink-DeOHfGp7.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./Switch-D2onKxMW.js";import"./TabItem-B3Gc2cXC.js";import"./TextInput-Dfdw9yY3.js";import"./Tooltip-zb4ozB6j.js";import"./useClickOutside-ChWTKoTa.js";import"./dialog-Dre1eVQK.js";import"./Tree-DPGsNpw7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-049ThOW6.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
