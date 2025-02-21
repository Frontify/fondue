import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as a}from"./index-ClcD9ViR.js";import{a as l}from"./Box-YZVm4tCZ.js";import{c as d}from"./Button-Dq_bWxV2.js";import{D as u}from"./DialogBody-CKaSimJT.js";import{D as g}from"./DialogFooter-C_eVmds5.js";import{D as f}from"./DialogHeader-CzWUWJod.js";import{P as m}from"./Popover-PFRAq1pu.js";import{I as x}from"./IconJohanna-SvJ9aa_T.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-Bns_dUDU.js";import"./Divider-BRU6Vhb1.js";import"./FormControl-DxAY9VXE.js";import"./InputLabel-CDzbyvKS.js";import"./TooltipIcon-D7kHQ8sO.js";import"./LegacyTooltip-DZi8o8cC.js";import"./useLink-BjF4lkum.js";import"./useFocusable-CZi8_B22.js";import"./useFocusRing-B9BQthcQ.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-B69fAeb4.js";import"./usePopper-6IkYpIP_.js";import"./index-BrlJLjep.js";import"./index-DlnOb27V.js";import"./Portal-CFnKnrEz.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-DU5NJZZj.js";import"./IconCheckMark-DDrIoLdu.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-N4gckcbl.js";import"./Switch-ZUgkv5mB.js";import"./TabItem-7zIDIg2o.js";import"./elements-BOYmskOL.js";import"./TextInput-DlGYTQhf.js";import"./IconCross-BVasaH61.js";import"./Tooltip-Do-cnin-.js";import"./useClickOutside-BcVMXM8r.js";import"./EnablePortalWrapper-NFMuvtML.js";import"./dialog-Dre1eVQK.js";import"./Tree-ChjucXEu.js";import"./immer-DBm1MMjE.js";import"./useButton-DEkuJNpl.js";import"./Flex-kceU5XpO.js";const gt={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const ft=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,ft as __namedExportsOrder,gt as default};
