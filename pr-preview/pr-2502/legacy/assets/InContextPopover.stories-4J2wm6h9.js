import{r as a,j as t}from"./iframe-D_5TuNwx.js";import{a as l}from"./Box-BDyNV5gP.js";import{B as d}from"./Button-BjKHn-lP.js";import{D as u}from"./DialogBody-p2jbPXUW.js";import{D as g}from"./DialogFooter-BiTz67iJ.js";import{D as f}from"./DialogHeader-CeaeYwbC.js";import{P as m}from"./Popover-qSalXe1w.js";import{I as x}from"./IconJohanna-K6SU7Mx9.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cr0Z0-t3.js";import"./Checkbox-BCo6gkSf.js";import"./useFocusable-BzNiBfTe.js";import"./useFocusRing-B3KMbizV.js";import"./useEffectEvent-GoHBr7KM.js";import"./chain-CV2foVe6.js";import"./index-dO3rbIOf.js";import"./useFormValidationState-DY0p0iBe.js";import"./useControlledState-Sq5oX11m.js";import"./InputLabel-BIeISPQ6.js";import"./TooltipIcon-BgwyEQOM.js";import"./LegacyTooltip-BD5siulQ.js";import"./useLink-B-AN_u2l.js";import"./usePopper-DuQU1gy7.js";import"./index-DNWoq7AN.js";import"./Portal-BVeSg7mV.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CYiKP5GT.js";import"./IconCheckMark-hk6yku9m.js";import"./IconExclamationMarkCircle24-w9gKnvCo.js";import"./IconExclamationMarkTriangle-dqjw2tRY.js";import"./IconExclamationMarkTriangle24-BOj0eFqi.js";import"./IconQuestionMarkCircle-DaQpsxq0.js";import"./IconMinus-DwgkD6am.js";import"./Divider-ei9MuWEW.js";import"./FormControl-C0rPqxsR.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BqbImI04.js";import"./Switch-BaImXfie.js";import"./TabItem-0-4KzH_Y.js";import"./elements-BOYmskOL.js";import"./TextInput-TlmumXUy.js";import"./IconCross-BckwQdjd.js";import"./Tooltip-DBOvIGAy.js";import"./useClickOutside-B-M5EXJ-.js";import"./EnablePortalWrapper-koaqxQrZ.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BjEaHnef.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DcDZTOn2.js";import"./Flex-DxBz21DL.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
