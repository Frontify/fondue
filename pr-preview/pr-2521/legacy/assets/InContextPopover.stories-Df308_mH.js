import{r as s,j as t}from"./iframe-CL4XzcfN.js";import{a as l}from"./Box-CPkZ0Foc.js";import{B as d}from"./Button-B2WhYWSE.js";import{D as u}from"./DialogBody-BItyui8s.js";import{D as g}from"./DialogFooter-BrFyFQ_A.js";import{D as f}from"./DialogHeader-DYri9h9c.js";import{P as n}from"./Popover-x4_YHNO2.js";import{I as x}from"./IconIcon-CIPjPibu.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cak8rQy8.js";import"./Divider-eJQCJdBZ.js";import"./FormControl-D-90hYhQ.js";import"./InputLabel-B7sQ-f05.js";import"./TooltipIcon-E7z4sWyP.js";import"./LegacyTooltip-BN5iCPhr.js";import"./useLink-C2YfOpA_.js";import"./useFocusable-CY-GtsB5.js";import"./useFocusRing-9VMAwhrL.js";import"./useEffectEvent-B5uQLMLN.js";import"./chain-BCKv6zua.js";import"./index-DCNIDGPM.js";import"./usePopper-ZhCn5hnC.js";import"./index-BrEYTrmJ.js";import"./Portal-D3tzxN0W.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-fmdEObL2.js";import"./IconCheckMark-BOsC3Xif.js";import"./IconExclamationMarkCircle24-D01_0b62.js";import"./IconExclamationMarkTriangle-CPT_x5S0.js";import"./IconExclamationMarkTriangle24-DrZXW3E9.js";import"./IconQuestionMarkCircle-Dk2S2WTJ.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CrBeja9n.js";import"./Switch-08S77oE1.js";import"./TabItem-CfP1DOBO.js";import"./elements-BOYmskOL.js";import"./TextInput-BLLvDYtY.js";import"./IconCross-BqlufAS4.js";import"./Tooltip-4WfNLUKb.js";import"./useClickOutside-Q0mrUBRo.js";import"./EnablePortalWrapper-pOou7TEd.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DbU3jWxL.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-vt9YbX4T.js";import"./IconCaretDown-BZMebnUj.js";import"./IconCaretDown16-BBp6Oz2P.js";import"./IconTrashBin16-f8MytoxN.js";import"./IconTrashBin24-BNSYBA-x.js";import"./useButton-COiAR59-.js";import"./Flex-BvTZVyor.js";import"./IconIcon16-DA9DY_xe.js";import"./IconIcon24-088uIbMM.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const It=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,It as __namedExportsOrder,jt as default};
