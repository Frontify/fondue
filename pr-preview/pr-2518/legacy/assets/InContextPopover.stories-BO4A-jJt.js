import{r as p,j as t}from"./iframe-mBD-AuCT.js";import{a as l}from"./Box-BmI01P-O.js";import{B as d}from"./Button-BhPspr2O.js";import{D as u}from"./DialogBody-D1ptLicA.js";import{D as g}from"./DialogFooter-B4S3dFZj.js";import{D as f}from"./DialogHeader-aPYon8vd.js";import{P as n}from"./Popover-DTAwXr3H.js";import{I as x}from"./IconIcon-BQilQbOa.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BJtwRwWl.js";import"./Divider-CyNv4tUv.js";import"./Dropdown-Dq0Ms9-1.js";import"./useButton-D-Nbc6Na.js";import"./useFocusable-DXmFQ-Hx.js";import"./useFocusRing-DuRzJrJR.js";import"./useEffectEvent-pe2_FiFR.js";import"./chain-B6Y7B1-O.js";import"./index-Cyjkes1y.js";import"./FocusScope-DgjzWB0B.js";import"./useOverlayTriggerState-BctEXfHz.js";import"./useControlledState-B6GpZLHS.js";import"./useMenuTrigger-Mq8ScBc7.js";import"./useLabels-DRYwn0g6.js";import"./useLocalizedStringFormatter-D_i_jBZw.js";import"./context-Mh9QfmU1.js";import"./VisuallyHidden-D9_wafRX.js";import"./helper-BGLeyA6q.js";import"./keyboard-BA3Msqld.js";import"./SelectionManager-DjjzU2Tj.js";import"./useField-r5ZYFHZL.js";import"./useFormValidationState-B9L8KDiQ.js";import"./usePopper-aEWF7LpH.js";import"./index-ChPYWZnj.js";import"./MenuItem-BE2QCwDa.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-xD5iAQ8R.js";import"./IconCheckMark-BSe8qHmE.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-B-gv9Ve-.js";import"./Trigger-uuT5TkZo.js";import"./IconCaretDown-BD4Dl5od.js";import"./IconCaretDown16-Dyqz2sdD.js";import"./IconCross-CQTF90o9.js";import"./IconExclamationMarkTriangle-DqpgRJRQ.js";import"./IconExclamationMarkTriangle24-CGGNSbqG.js";import"./IconTrashBin16-BVuGxt0P.js";import"./IconTrashBin24-CxLpERYY.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-DkNopmNx.js";import"./Portal-_yzzHhGt.js";import"./useMemoizedId-DEI-3hVY.js";import"./FormControl-BkzR22vN.js";import"./InputLabel-BKReFpg8.js";import"./TooltipIcon--SsjAZ56.js";import"./LegacyTooltip-CQ9s119n.js";import"./useLink-CUJ7p1SF.js";import"./IconExclamationMarkCircle24-CbROWlL7.js";import"./IconQuestionMarkCircle-D5gNDsEa.js";import"./Switch-CZc7I_c8.js";import"./TabItem-Ct4qjJJe.js";import"./TextInput-D5geOiLQ.js";import"./Tooltip-CipzHdYy.js";import"./useClickOutside-CHNIQSRo.js";import"./dialog-D9O7a7Fm.js";import"./Tree-3-D_6k8Z.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-D3XzNAVa.js";import"./IconIcon16-BwW-QYHf.js";import"./IconIcon24-DhYxU4i8.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
