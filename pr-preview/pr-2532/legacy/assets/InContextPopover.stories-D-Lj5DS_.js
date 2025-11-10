import{r as s,j as t}from"./iframe-Byq4RgVa.js";import{a as l}from"./Box-Cw0zQjzG.js";import{B as d}from"./Button-BIzAMqFG.js";import{D as u}from"./DialogBody-Cupi0QVA.js";import{D as g}from"./DialogFooter-8T4qx1IX.js";import{D as f}from"./DialogHeader-C156RRg1.js";import{P as n}from"./Popover-DEtpiAph.js";import{I as x}from"./IconIcon-B7eOr2IJ.js";import"./preload-helper-DXpIkoC8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BGtg1dMb.js";import"./Checkbox-B-n8zZ-S.js";import"./useFocusable-CEz2cnMa.js";import"./useFocusRing-1VzCYPXM.js";import"./useEffectEvent-CQqcouob.js";import"./chain-NL_CYzOj.js";import"./index-CTq3ycsr.js";import"./useFormValidationState-Dv2uWviW.js";import"./useControlledState-BlIu1hRZ.js";import"./InputLabel-CrIA_ZUr.js";import"./TooltipIcon-CqfIsxQ1.js";import"./LegacyTooltip-BPixO4E9.js";import"./useLink-CB5zyTe8.js";import"./usePopper-UMr1qiz5.js";import"./index-DZVnwIzI.js";import"./Portal-Cs3GVWse.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DwOUk7Ve.js";import"./IconCheckMark-BTbz00I9.js";import"./IconExclamationMarkCircle24-ffcPYjGw.js";import"./IconExclamationMarkTriangle-D_-jLFh-.js";import"./IconExclamationMarkTriangle24-D32Lmmh1.js";import"./IconQuestionMarkCircle-BUN0gvmv.js";import"./IconMinus-DHtgKNf5.js";import"./Divider-DE8fBejH.js";import"./FormControl-Giah9BCH.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C279Nnsi.js";import"./Switch-ns2yYJAp.js";import"./TabItem-BG0dI_Ab.js";import"./elements-BOYmskOL.js";import"./TextInput-ChxiREjX.js";import"./IconCross-D0b98GpB.js";import"./Tooltip-Dv9NXgiv.js";import"./useClickOutside-CXetdB8E.js";import"./EnablePortalWrapper-DXU3Bq8F.js";import"./dialog-D9O7a7Fm.js";import"./Tree-NI69QXvD.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-CTv9pbma.js";import"./Flex-BxNlrXck.js";import"./IconIcon16-DVhiMCPv.js";import"./IconIcon24-CUNoBgQc.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const jt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,jt as __namedExportsOrder,Ct as default};
