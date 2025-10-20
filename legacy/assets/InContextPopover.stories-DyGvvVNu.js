import{r as p,j as t}from"./iframe-rp4tXvK6.js";import{a as l}from"./Box-2dTAdpb8.js";import{B as d}from"./Button-K5oMp-8A.js";import{D as u}from"./DialogBody-_tZt2ntx.js";import{D as g}from"./DialogFooter-C0tUgm8x.js";import{D as f}from"./DialogHeader-CiTF_Fom.js";import{P as n}from"./Popover-vB1xDEQ2.js";import{I as x}from"./IconJohanna-DvP2DKcr.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BhBf-420.js";import"./Divider-BqYvBMoL.js";import"./Dropdown-CxVEn7Ee.js";import"./useButton-Br0F6n1W.js";import"./useFocusable-BXSsLKfC.js";import"./useFocusRing-CWvOmuKZ.js";import"./useEffectEvent-B0iZo-5j.js";import"./chain-4_YXu52x.js";import"./index-BiHInXmF.js";import"./FocusScope-DS4FnLeH.js";import"./useOverlayTriggerState-BEZ2lrWP.js";import"./useControlledState-CX_cH9Ot.js";import"./useMenuTrigger-AUhvJe9v.js";import"./useLabels-CK5UeFmu.js";import"./useLocalizedStringFormatter-CJs-_R01.js";import"./context-Bt6ZMdHa.js";import"./VisuallyHidden-wRfshC6s.js";import"./helper-DAqcxCSd.js";import"./keyboard-Dl2NWKmf.js";import"./SelectionManager-BL4wQlQg.js";import"./useField-CvqfyaBW.js";import"./useFormValidationState-BWKkO5l0.js";import"./usePopper-D4FJxQQU.js";import"./index-BYPbgCc9.js";import"./MenuItem-DrfZk6bm.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-C06zx3vP.js";import"./IconCheckMark-BGU497N_.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-jwtl8KLB.js";import"./Trigger-B0mWSjy0.js";import"./IconCaretDown-2pKBTVXl.js";import"./IconCaretDown16-0TQW92SM.js";import"./IconCross-BdcwsUq9.js";import"./IconExclamationMarkTriangle-DiSrNeKR.js";import"./IconExclamationMarkTriangle24-wUfSIYbA.js";import"./IconTrashBin16-7vreT6af.js";import"./IconTrashBin24-DBiRwG0M.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DCsum9UA.js";import"./Portal-C6lyvz6z.js";import"./useMemoizedId-Crrjl7nt.js";import"./FormControl-DJASPagM.js";import"./InputLabel-CFfHIgFB.js";import"./TooltipIcon-BQzsb3pk.js";import"./LegacyTooltip-DSvPmMNC.js";import"./useLink-B7X21rmN.js";import"./IconExclamationMarkCircle24-XfyTkQV4.js";import"./IconQuestionMarkCircle-xJoVN4sY.js";import"./Switch-CCAjHMbz.js";import"./TabItem-lQw6FqM2.js";import"./TextInput-CrXCZLZg.js";import"./Tooltip-BofyqpBt.js";import"./useClickOutside-XwQX8AXH.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DUNDCnFz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BU3ndr-r.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
