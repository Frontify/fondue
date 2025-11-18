import{r as s,j as t}from"./iframe-CaxuQ4qh.js";import{a as l}from"./Box-B7q0c-6b.js";import{B as d}from"./Button-DoGxjyC-.js";import{D as u}from"./DialogBody-BVCohJCz.js";import{D as g}from"./DialogFooter-IyT7hUli.js";import{D as f}from"./DialogHeader-da_u5Fsx.js";import{P as n}from"./Popover-AD3Idprn.js";import{I as x}from"./IconIcon-CJlaDQKV.js";import"./preload-helper-264tqYC2.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-Cp76Bj7X.js";import"./FormControl-DZDhDyKm.js";import"./InputLabel-eb9j-b-p.js";import"./TooltipIcon-wj8NzLxM.js";import"./LegacyTooltip-BnMK5RSa.js";import"./useLink-VP-M9sCi.js";import"./useFocusable-By9ALESo.js";import"./useFocusRing-CqF8kI1d.js";import"./useEffectEvent-BPzwECnN.js";import"./chain-cJ2GZaRk.js";import"./index-DTvIGFJL.js";import"./usePopper-CgU3XMf8.js";import"./index-BnX7kIwc.js";import"./Portal-B6FJfCm3.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-ChmIg3ud.js";import"./IconCheckMark-D4o5Jrfj.js";import"./IconExclamationMarkCircle24-Bf6seDQ_.js";import"./IconExclamationMarkTriangle-BjK6wxVc.js";import"./IconExclamationMarkTriangle24-6Yrb1EYr.js";import"./IconQuestionMarkCircle-DdBH9cxt.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-OGoTfVco.js";import"./Switch-rdINVdFX.js";import"./TabItem-teBnpxFN.js";import"./elements-BOYmskOL.js";import"./TextInput-CPaVshVD.js";import"./IconCross-CwvMq-ne.js";import"./Tooltip-Cu8PLScD.js";import"./useClickOutside-DMVkVWhr.js";import"./EnablePortalWrapper-D5OZ7r8c.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BNrzop_z.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BUEp9VTW.js";import"./IconCaretDown-Dh1fgFoP.js";import"./IconCaretDown16-C7JmWk0f.js";import"./IconTrashBin16-BCPYOGCK.js";import"./IconTrashBin24-CUr4lQlf.js";import"./useButton-BwcglY2L.js";import"./Flex-zirOKOKF.js";import"./IconIcon16-Czig_-kv.js";import"./IconIcon24-B4H_5Ld8.js";const Ct={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
