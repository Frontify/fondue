import{r as a,j as t}from"./iframe-Cks-88o9.js";import{a as l}from"./Box-1UW_NsGi.js";import{B as d}from"./Button-ClCmf8ZI.js";import{D as u}from"./DialogBody-wYGE2R0x.js";import{D as g}from"./DialogFooter-DaKmWktT.js";import{D as f}from"./DialogHeader-Ddk14kOV.js";import{P as n}from"./Popover-CO8wQ9u-.js";import{I as x}from"./IconJohanna-so9rgTeC.js";import"./preload-helper-BS1Me9kX.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DIuiqrw5.js";import"./Divider-CPkkJw_R.js";import"./FormControl-B2bdOsd0.js";import"./InputLabel-5kdhQYss.js";import"./TooltipIcon-CX0b9Nxb.js";import"./LegacyTooltip-C10DHC2b.js";import"./useLink-Db0Jt4Nh.js";import"./useFocusable--YoiO9-c.js";import"./useFocusRing-C8sWiUJU.js";import"./useEffectEvent-BNt5WSZx.js";import"./chain-G5L2sgB7.js";import"./index-DXRHM0Sb.js";import"./usePopper-Cw61W2iS.js";import"./index-CvMdUDL4.js";import"./Portal-CV9zbekH.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DSfyrAAv.js";import"./IconCheckMark-B9_W7TeU.js";import"./IconExclamationMarkCircle24-C5vamhQ8.js";import"./IconExclamationMarkTriangle-CTHAx25K.js";import"./IconExclamationMarkTriangle24-IChHUEXC.js";import"./IconQuestionMarkCircle-BCDm9YVu.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BlIMHkes.js";import"./Switch-CPBk9WyI.js";import"./TabItem-BnYCC53m.js";import"./elements-BOYmskOL.js";import"./TextInput-CuOGGe-A.js";import"./IconCross-DNFb4cXo.js";import"./Tooltip-lLMJ1PDW.js";import"./useClickOutside-CTH-fcNf.js";import"./EnablePortalWrapper-wmCyif0j.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BhLzcEWd.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DGA3CEK-.js";import"./IconCaretDown-CvOY0KLx.js";import"./IconCaretDown16-E7bTcOAW.js";import"./IconTrashBin16-DMwF5qVw.js";import"./IconTrashBin24-DP3RhvPI.js";import"./useButton-CcsgOnqy.js";import"./Flex-DoFvAdvM.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
