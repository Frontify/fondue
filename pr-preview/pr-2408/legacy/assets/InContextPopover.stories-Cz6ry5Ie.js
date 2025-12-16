import{r as s,j as t}from"./iframe-Q6jTPbLu.js";import{a as l}from"./Box-BJSu5SV3.js";import{B as d}from"./Button-CK-0jm-C.js";import{D as u}from"./DialogBody-0sGXINtE.js";import{D as g}from"./DialogFooter-DMa4Oaea.js";import{D as f}from"./DialogHeader-C6Wk1zHQ.js";import{P as n}from"./Popover-BmeW2FlA.js";import{I as x}from"./IconIcon-BSU2CbT8.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-1raJZ-xI.js";import"./Divider-BwTOAMmu.js";import"./FormControl-PPjaZDSu.js";import"./InputLabel-Bqv2ZOBd.js";import"./TooltipIcon-D8XYh8tq.js";import"./LegacyTooltip-edHqjb7F.js";import"./useLink-C0jFhwJL.js";import"./useFocusable-Bv1KETgF.js";import"./useFocusRing-ChZ7shwC.js";import"./useLayoutEffect-CNGvG9Li.js";import"./chain-D9i0b07P.js";import"./index-C3qdTENE.js";import"./usePopper-D0IvXwgq.js";import"./index-B_OV6jDq.js";import"./Portal-DGOkUD5q.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-D9m5X-XB.js";import"./IconCheckMark-BQPA_Lho.js";import"./IconExclamationMarkCircle24-C6q9is1t.js";import"./IconExclamationMarkTriangle-CZfbuqKq.js";import"./IconExclamationMarkTriangle24-Cp-w0gDF.js";import"./IconQuestionMarkCircle-CJVcjX5Q.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C_EOa6kY.js";import"./Switch-k4f5W-NZ.js";import"./TabItem-BhlexmJ-.js";import"./elements-BOYmskOL.js";import"./TextInput-CwyY6sY7.js";import"./IconCross-BxuvMGBH.js";import"./Tooltip-B7-3W8SP.js";import"./useClickOutside-CZkbGKKq.js";import"./EnablePortalWrapper-BHV4bVIK.js";import"./dialog-D9O7a7Fm.js";import"./Tree-IIyLPOat.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BbZOgNk9.js";import"./IconCaretDown-DsNf3Zor.js";import"./IconCaretDown16-D78HUM7o.js";import"./IconTrashBin16-BiIehmNq.js";import"./IconTrashBin24-BOIO6HBX.js";import"./useButton-CadPs_no.js";import"./Flex-CSpCxlr1.js";import"./IconIcon16-amPD6ViC.js";import"./IconIcon24-Cg8McK6Y.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
