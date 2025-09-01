import{j as t}from"./jsx-runtime-DF2Pcvd1.js";import{r as a}from"./index-B2-qRKKC.js";import{a as l}from"./Box-BCAiulFi.js";import{c as d}from"./Button-BhpRDDwF.js";import{D as u}from"./DialogBody-B4WXGxMQ.js";import{D as g}from"./DialogFooter-CUgNqXLj.js";import{D as f}from"./DialogHeader-CUZTmUSe.js";import{P as n}from"./Popover-DT6yK9yu.js";import{I as x}from"./IconJohanna-iR26Notd.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-B2JdGZvm.js";import"./Divider-DRaE_xlp.js";import"./LoadingCircle-DyxURJrK.js";import"./Switch-BAZMdmCV.js";import"./useFocusRing-DYm6KDop.js";import"./useEffectEvent-BOE4tD14.js";import"./InputLabel-b0eYxraM.js";import"./TooltipIcon-m4kEMbWe.js";import"./LegacyTooltip-DIy9iZdG.js";import"./useLink-isS_9sO9.js";import"./useFocusable-CKeIV6w5.js";import"./chain-z5L_5vtA.js";import"./index-CFX93qP1.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./Portal-CuQPhhwF.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BB39KVn8.js";import"./IconCheckMark-Db5JnUcj.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./TabItem-B3Gc2cXC.js";import"./elements-BOYmskOL.js";import"./TextInput-zlbBzSP9.js";import"./IconCross-DWAMoEGy.js";import"./validation-CJXPAjNB.js";import"./Tooltip-zb4ozB6j.js";import"./useClickOutside-ChWTKoTa.js";import"./EnablePortalWrapper-C3Ay3AqL.js";import"./dialog-Dre1eVQK.js";import"./Tree-DPGsNpw7.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CRKR-lVE.js";import"./IconCaretDown-CAp4CI-i.js";import"./IconCaretDown16-CINgO7jA.js";import"./IconTrashBin16-DHeQSCR9.js";import"./IconTrashBin24-D7tnFyiH.js";import"./useButton-CoG0sslk.js";import"./Flex-C0x5F6BZ.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const Ct=["WithHeaderAndFooter"];export{e as WithHeaderAndFooter,Ct as __namedExportsOrder,Bt as default};
