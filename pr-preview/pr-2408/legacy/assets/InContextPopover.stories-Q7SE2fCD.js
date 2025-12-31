import{r as s,j as t}from"./iframe-BVCiIt_t.js";import{a as l}from"./Box-B8WP0Ll0.js";import{B as d}from"./Button-C23qQnfc.js";import{D as u}from"./DialogBody-CDTqcWYz.js";import{D as g}from"./DialogFooter-BNpejcfy.js";import{D as f}from"./DialogHeader-zFArNJV0.js";import{P as n}from"./Popover-BNAKCdbk.js";import{I as x}from"./IconIcon-t-uR3_JK.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CaV8J06j.js";import"./LoadingCircle-Cs9YxQlv.js";import"./Switch-Cnh0WjU1.js";import"./useFocusRing-D74H9_qf.js";import"./useLayoutEffect-CwCMcuvP.js";import"./InputLabel-BVMNaspY.js";import"./TooltipIcon-Lhfh0jX1.js";import"./LegacyTooltip-NJgv0_Qv.js";import"./useLink-CznZ_uny.js";import"./useFocusable-C88n4aJ_.js";import"./chain-tCQxUvER.js";import"./index-CccrmGpf.js";import"./usePopper-BH-iCTlG.js";import"./index-CluciJqc.js";import"./Portal-DheNPhD-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-4XHrKXhm.js";import"./IconCheckMark-Cs3aici6.js";import"./IconExclamationMarkCircle24-CWUAsl74.js";import"./IconExclamationMarkTriangle-ruAcaiBi.js";import"./IconExclamationMarkTriangle24-BdTerdKL.js";import"./IconQuestionMarkCircle-xnzuMREY.js";import"./TabItem-QFEwn2kZ.js";import"./elements-BOYmskOL.js";import"./TextInput-dv1l60LF.js";import"./IconCross-DSKFWT9e.js";import"./validation-C9S5KgfE.js";import"./Tooltip-CqViX1me.js";import"./useClickOutside-CCnHaqrB.js";import"./EnablePortalWrapper-u8CpEIO3.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BIBRBKD6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DP6aJ5z1.js";import"./IconCaretDown-QWbLgCl6.js";import"./IconCaretDown16-8cPQgRO0.js";import"./IconTrashBin16-Ck9Z5JMZ.js";import"./IconTrashBin24-CDDUjHMv.js";import"./useButton-BKkHFZe5.js";import"./Flex-wQZ1lO1w.js";import"./IconIcon16-DeiHQ1ET.js";import"./IconIcon24-DOdggOFv.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,m;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const Ct=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Ct as __namedExportsOrder,Bt as default};
