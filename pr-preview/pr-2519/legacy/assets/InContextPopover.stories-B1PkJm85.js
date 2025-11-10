import{r as s,j as t}from"./iframe-1w5b5drG.js";import{a as l}from"./Box-BMI-AcM8.js";import{B as d}from"./Button-D_H8UF7b.js";import{D as u}from"./DialogBody-D8CyylFs.js";import{D as g}from"./DialogFooter-B7hinM1g.js";import{D as f}from"./DialogHeader-BqSKOr3j.js";import{P as m}from"./Popover-rvts8DhC.js";import{I as x}from"./IconIcon-CWs83tki.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DFXnzuNA.js";import"./Divider-CjiGNpf6.js";import"./FormControl-B_VQtm5t.js";import"./InputLabel-CiU3SmE8.js";import"./TooltipIcon-C3lY5emr.js";import"./LegacyTooltip-oj9O6G3o.js";import"./useLink-ClcWfIpo.js";import"./useFocusable-Dr45km50.js";import"./useFocusRing-DDOT5kJe.js";import"./useEffectEvent-BQpHOoQR.js";import"./chain-Cf_beYuI.js";import"./index-CEpYXb9o.js";import"./usePopper-Dqa4JxqS.js";import"./index-DvMfqQUu.js";import"./Portal-B3RRLKFq.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-zPTNyd6V.js";import"./IconCheckMark-B2Bh6Lqc.js";import"./IconExclamationMarkCircle24-caH6uyCc.js";import"./IconExclamationMarkTriangle--dW3kqhY.js";import"./IconExclamationMarkTriangle24-DbkTURfm.js";import"./IconQuestionMarkCircle-Dt8ZbH_I.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BG0ulhM0.js";import"./Switch-B6QiLFa0.js";import"./TabItem-De8jW67s.js";import"./elements-BOYmskOL.js";import"./TextInput-2DhzAo4k.js";import"./IconCross-Do2Sk4Dt.js";import"./Tooltip-BS78mzm3.js";import"./useClickOutside-C4tsWefc.js";import"./EnablePortalWrapper-Bu0N_tHz.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DQC98Pdm.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DjLiG17R.js";import"./Flex-e_p_Aq_A.js";import"./IconIcon16-C1Kfm55r.js";import"./IconIcon24-CGpk3zxq.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(n=(p=e.parameters)==null?void 0:p.docs)==null?void 0:n.source}}};const xt=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,xt as __namedExportsOrder,ft as default};
