import{r as a,j as t}from"./iframe-BgYojI_W.js";import{a as l}from"./Box-BYPsPXhj.js";import{B as d}from"./Button-BY43IOw2.js";import{D as u}from"./DialogBody-C-jKznGi.js";import{D as g}from"./DialogFooter-CYwQivbn.js";import{D as f}from"./DialogHeader-CC4VPHaK.js";import{P as m}from"./Popover-DhOSlTtW.js";import{I as x}from"./IconJohanna-CFuOfkyQ.js";import"./preload-helper-D2dEV7R8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cs8fv1qz.js";import"./Divider-CDy9eqK6.js";import"./FormControl-B4bo9qwF.js";import"./InputLabel-DVV4hrtx.js";import"./TooltipIcon-CmvJf6ug.js";import"./LegacyTooltip-DblPyA6F.js";import"./useLink-BnSQ2pha.js";import"./useFocusable-BriU369z.js";import"./useFocusRing-S1vUz9A3.js";import"./useEffectEvent-CjtgopOr.js";import"./chain-CLjZ0rZo.js";import"./index-CW7dYZLD.js";import"./usePopper-C2LFeOXI.js";import"./index-DJQ3JVVA.js";import"./Portal-VEfQ3NaP.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DElFU63U.js";import"./IconCheckMark-D8XnL3-x.js";import"./IconExclamationMarkCircle24-7FcJBMVN.js";import"./IconExclamationMarkTriangle-vM5NM8pJ.js";import"./IconExclamationMarkTriangle24-ChN_MsIm.js";import"./IconQuestionMarkCircle-CmPTeuhb.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-yP6bM4mM.js";import"./Switch-BUBn1H02.js";import"./TabItem-ti1_PO_n.js";import"./elements-BOYmskOL.js";import"./TextInput-DQyO_ikN.js";import"./IconCross-BSCCmRlT.js";import"./Tooltip-BAsK2xdZ.js";import"./useClickOutside-Cx9dWJ8X.js";import"./EnablePortalWrapper-DIXXfq5B.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CMaAuYs0.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BDmytRL6.js";import"./Flex-CV28Rxpp.js";const ut={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
