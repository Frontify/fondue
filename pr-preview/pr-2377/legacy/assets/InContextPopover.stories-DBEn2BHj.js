import{j as t}from"./jsx-runtime-DF2Pcvd1.js";import{r as a}from"./index-B2-qRKKC.js";import{a as l}from"./Box-CxEb8Ow3.js";import{c as d}from"./Button-Bcb8OG2m.js";import{D as u}from"./DialogBody-B4WXGxMQ.js";import{D as g}from"./DialogFooter-CS7eybUD.js";import{D as f}from"./DialogHeader-BQhBj-Wj.js";import{P as m}from"./Popover-BEf3EFW5.js";import{I as x}from"./IconJohanna-iR26Notd.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-DtwONwlm.js";import"./Divider-DRaE_xlp.js";import"./FormControl-XK9-5-i9.js";import"./InputLabel-BAEKxd0H.js";import"./TooltipIcon-BBsADSdT.js";import"./LegacyTooltip-g2LRsVyt.js";import"./useLink-CzmlOd4E.js";import"./useFocusable-ChjCOJSh.js";import"./useFocusRing-BL9DkcEN.js";import"./useEffectEvent-BOE4tD14.js";import"./chain-z5L_5vtA.js";import"./index-CFX93qP1.js";import"./usePopper-jmXS5rjc.js";import"./index-DlnOb27V.js";import"./Portal-CuQPhhwF.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BB39KVn8.js";import"./IconCheckMark-Db5JnUcj.js";import"./IconExclamationMarkCircle24-DMv0ETG3.js";import"./IconExclamationMarkTriangle-BrhtYKnY.js";import"./IconExclamationMarkTriangle24-DvJpj6jb.js";import"./IconQuestionMarkCircle-DkhS77IB.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-DyxURJrK.js";import"./Switch-BP-kUzDf.js";import"./TabItem-B3Gc2cXC.js";import"./elements-BOYmskOL.js";import"./TextInput-DrrHZgj2.js";import"./IconCross-DWAMoEGy.js";import"./Tooltip-CvIGIuBz.js";import"./useClickOutside-ChWTKoTa.js";import"./EnablePortalWrapper-C3Ay3AqL.js";import"./dialog-Dre1eVQK.js";import"./Tree-Cvlmb_rl.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BrS_O84a.js";import"./Flex-DK0gyZIt.js";const gt={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,n,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
