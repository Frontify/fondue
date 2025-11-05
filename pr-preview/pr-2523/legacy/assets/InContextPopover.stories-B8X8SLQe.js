import{r as s,j as t}from"./iframe-DPRBJ5Qg.js";import{a as l}from"./Box-DsQ8GRqr.js";import{B as d}from"./Button-IuUjxokW.js";import{D as u}from"./DialogBody-BUcVOAXW.js";import{D as g}from"./DialogFooter-Div2vewy.js";import{D as f}from"./DialogHeader-BIW9W5PC.js";import{P as n}from"./Popover-B1HysAbs.js";import{I as x}from"./IconIcon-Be8qJiWw.js";import"./preload-helper-DuVWtNEG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Dt18Tw5W.js";import"./Checkbox-BKmiJK_B.js";import"./useFocusable-DKvvMmRO.js";import"./useFocusRing-B6arhbyw.js";import"./useEffectEvent-BwxOOVcC.js";import"./chain-BgKcRe8x.js";import"./index-Bj6WzqIE.js";import"./useFormValidationState-D2KMc6vr.js";import"./useControlledState-CWoR01mQ.js";import"./InputLabel-Bdk_cdx2.js";import"./TooltipIcon-Cyyr7b5a.js";import"./LegacyTooltip-CRLNNlT6.js";import"./useLink-DZQQcpzx.js";import"./usePopper-BNoVGNL_.js";import"./index-LfTGALDi.js";import"./Portal-D5MJmr8l.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CijxVOQa.js";import"./IconCheckMark-BZ7o3ynj.js";import"./IconExclamationMarkCircle24-Bp1yl0E2.js";import"./IconExclamationMarkTriangle-BcdDPU1z.js";import"./IconExclamationMarkTriangle24-CjI5zqAF.js";import"./IconQuestionMarkCircle-C0GcLQTC.js";import"./IconMinus-CGzil4rt.js";import"./Divider-CwuaR7Ij.js";import"./FormControl-C70XPd0o.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BkptVitq.js";import"./Switch-DDNvQKpv.js";import"./TabItem-CojwcqMz.js";import"./elements-BOYmskOL.js";import"./TextInput-B46JoAHb.js";import"./IconCross-oUizg1TI.js";import"./Tooltip-CkEMlWgN.js";import"./useClickOutside-DjMq5qtV.js";import"./EnablePortalWrapper-BQdW5VMb.js";import"./dialog-D9O7a7Fm.js";import"./Tree-7M4K1sUp.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BC5AK8iF.js";import"./IconCaretDown-C3VJjq6F.js";import"./IconCaretDown16-DUI6oM7I.js";import"./IconTrashBin16-BFeyR-yx.js";import"./IconTrashBin24-BntiU_ti.js";import"./useButton-CLoXWK9R.js";import"./Flex-Dk1zNQEi.js";import"./IconIcon16-Csx_5aDB.js";import"./IconIcon24-CztCPZlm.js";const vt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
