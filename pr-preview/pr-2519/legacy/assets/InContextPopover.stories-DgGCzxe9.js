import{r as p,j as t}from"./iframe-ZBzxbArn.js";import{a as l}from"./Box-BPqSCkPF.js";import{B as d}from"./Button-BDszXWF0.js";import{D as u}from"./DialogBody-Bqi0vF0v.js";import{D as g}from"./DialogFooter-61LDevJ3.js";import{D as f}from"./DialogHeader-B7NGeZvj.js";import{P as n}from"./Popover-CMvELKZQ.js";import{I as x}from"./IconIcon-DZ1beHTx.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BzYoFFy5.js";import"./Divider-D9FhI6gu.js";import"./Dropdown-D6nN_xEs.js";import"./useButton-i2vqacWa.js";import"./useFocusable-CPEvtC5T.js";import"./useFocusRing-BHpblf3W.js";import"./useEffectEvent-47HRTxvC.js";import"./chain-DAcxjXHC.js";import"./index-DbMVle2u.js";import"./FocusScope-C4btTEqJ.js";import"./useOverlayTriggerState-2YbKRCVD.js";import"./useControlledState-C_9hrWzg.js";import"./useMenuTrigger-C7dQt0oA.js";import"./useLabels-C7dgcpc6.js";import"./useLocalizedStringFormatter-Bknzc5NA.js";import"./context-BVdZCpgd.js";import"./VisuallyHidden-VDRSVgn1.js";import"./helper-CleliKad.js";import"./keyboard-BdQ3GXnL.js";import"./SelectionManager-CO89k0Lp.js";import"./useField-BjLftB08.js";import"./useFormValidationState-LLEBpEZb.js";import"./usePopper-BRbvfqPp.js";import"./index-9u2jQVh5.js";import"./MenuItem-BeGU14ZQ.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-B0NvaRgO.js";import"./IconCheckMark-CBm-qzwJ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CZUeI1Yx.js";import"./Trigger-C1CC5bMu.js";import"./IconCaretDown-SrDnbT9o.js";import"./IconCaretDown16-DuU1x2NN.js";import"./IconCross-DBdrJD8S.js";import"./IconExclamationMarkTriangle-vqSG40-8.js";import"./IconExclamationMarkTriangle24-eemjMsXD.js";import"./IconTrashBin16-B73vZS1U.js";import"./IconTrashBin24-CEMMDIFd.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-z4dkC-j5.js";import"./Portal-C4FDx-2h.js";import"./useMemoizedId-Bd15RR4S.js";import"./FormControl-C7egNDZd.js";import"./InputLabel-DGt8GQku.js";import"./TooltipIcon-x4xHrbRJ.js";import"./LegacyTooltip-DSvGStx4.js";import"./useLink-Cp_DjxIu.js";import"./IconExclamationMarkCircle24--uZcXafv.js";import"./IconQuestionMarkCircle-qbD80NFS.js";import"./Switch-IjpeXAgT.js";import"./TabItem-BxymVC9K.js";import"./TextInput-DMUjBzmq.js";import"./Tooltip-B8A3rhwm.js";import"./useClickOutside-CLqSf55U.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Bz3mC0DX.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-Baa8O_x_.js";import"./IconIcon16-DBeDrwzf.js";import"./IconIcon24-CF83sLeV.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
