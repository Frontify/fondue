import{r as s,j as t}from"./iframe-hrVkOCwH.js";import{a as l}from"./Box-BWuKVa5u.js";import{B as d}from"./Button-W5JU2GYF.js";import{D as u}from"./DialogBody-DSM1Gazo.js";import{D as g}from"./DialogFooter-CMI1TMPq.js";import{D as f}from"./DialogHeader-C48NAOxu.js";import{P as n}from"./Popover-CKnA-Dmj.js";import{I as x}from"./IconIcon-DxXGmVAM.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-HM8QN-Dx.js";import"./Checkbox-BPm9Jugo.js";import"./useFocusable-B4p0MNCv.js";import"./useFocusRing-1BNT7VFY.js";import"./useEffectEvent-r0uIPgQg.js";import"./chain--XmeI2qo.js";import"./index-B71KNn4Z.js";import"./useFormValidationState-BwX-GImz.js";import"./useControlledState-71UIMywV.js";import"./InputLabel-DavHylX_.js";import"./TooltipIcon-Cr95l-NA.js";import"./LegacyTooltip-DHrljL_9.js";import"./useLink-DOG0Yu1Y.js";import"./usePopper-J_p-icdG.js";import"./index-CGZABk5_.js";import"./Portal-DTFr9_A2.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-sOEvST2M.js";import"./IconCheckMark-B-YCLBcL.js";import"./IconExclamationMarkCircle24-481k8n6W.js";import"./IconExclamationMarkTriangle-CBe5H8Hw.js";import"./IconExclamationMarkTriangle24-jdOtgNlK.js";import"./IconQuestionMarkCircle-DYtN5BBW.js";import"./IconMinus-D4AubFA7.js";import"./Divider-CFprP-7p.js";import"./FormControl-DVxoqDTe.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B35Oo3EB.js";import"./Switch-imIT-kcW.js";import"./TabItem-aB0k9Fro.js";import"./elements-BOYmskOL.js";import"./TextInput-DmxJRx96.js";import"./IconCross-CC8OVy8K.js";import"./Tooltip-3_-Yc6si.js";import"./useClickOutside-D66VdyW1.js";import"./EnablePortalWrapper-CGVUP28H.js";import"./dialog-D9O7a7Fm.js";import"./Tree-7T50P4iA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-Bgg3h0fg.js";import"./IconCaretDown-COnPOjBQ.js";import"./IconCaretDown16-CwmIioRV.js";import"./IconTrashBin16-BhYglj6k.js";import"./IconTrashBin24-DlsKPU2P.js";import"./useButton-DZD6mn4U.js";import"./Flex-CGTQfS8c.js";import"./IconIcon16-C1S1YwmL.js";import"./IconIcon24-K0lJwgHk.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
