import{r as a,j as t}from"./iframe-Ch78Ys4j.js";import{a as l}from"./Box-DI2qgQ1f.js";import{B as d}from"./Button-CJ-E6FDy.js";import{D as u}from"./DialogBody-Cfg_SFBB.js";import{D as g}from"./DialogFooter-awmxJSM2.js";import{D as f}from"./DialogHeader-ChGXc0cv.js";import{P as m}from"./Popover-BvuE7_KO.js";import{I as x}from"./IconJohanna-D73qj7YN.js";import"./preload-helper-DpV-BRze.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CvFiGty7.js";import"./Checkbox-Cj3qoPT5.js";import"./useFocusable-ytWEYRGQ.js";import"./useFocusRing-CcClLFdl.js";import"./useEffectEvent-DWtcFP9E.js";import"./chain-BnD6cBFi.js";import"./index-Cb3T9Ypw.js";import"./useFormValidationState-D4pgbyp3.js";import"./useControlledState-Cbyphjyq.js";import"./InputLabel-CZbNSCKZ.js";import"./TooltipIcon-DTRJ8dl0.js";import"./LegacyTooltip-CwVRKXKM.js";import"./useLink-D547N7o-.js";import"./usePopper-2ADs5bCn.js";import"./index-C60dcfxb.js";import"./Portal-nlGT-mgI.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CLcZlhLf.js";import"./IconCheckMark-DczX_UZM.js";import"./IconExclamationMarkCircle24-DrrRG8t3.js";import"./IconExclamationMarkTriangle-BKQG68hY.js";import"./IconExclamationMarkTriangle24-DNyNKdTy.js";import"./IconQuestionMarkCircle-CGYAju3B.js";import"./IconMinus-DwjVf266.js";import"./Divider-MoXVJVoD.js";import"./FormControl-Cx6CzJuR.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CReL8v4e.js";import"./Switch-CEkeYPUS.js";import"./TabItem-D3Bm4qVd.js";import"./elements-BOYmskOL.js";import"./TextInput-CQOFwz30.js";import"./IconCross-DLi40BEC.js";import"./Tooltip-Dsmt5tI5.js";import"./useClickOutside-DuV8L-UO.js";import"./EnablePortalWrapper-D8llgk4X.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C4AWO7Hb.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BL_O5FV5.js";import"./Flex-DuwoGuPj.js";const ht={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
