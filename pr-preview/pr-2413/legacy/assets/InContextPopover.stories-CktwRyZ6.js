import{r as s,j as t}from"./iframe-R47jGcU2.js";import{a as l}from"./Box-DC5CvamZ.js";import{B as d}from"./Button-BLwN7tEv.js";import{D as u}from"./DialogBody-mCr-7ihW.js";import{D as g}from"./DialogFooter-DquXKRFU.js";import{D as f}from"./DialogHeader-BSZ8dH4g.js";import{P as m}from"./Popover-Bs_PEMqJ.js";import{I as x}from"./IconIcon-Cka5JKjD.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CFRi4VmV.js";import"./Divider-D1MiRRnp.js";import"./FormControl-EVHd6z1O.js";import"./InputLabel-No5zkAWB.js";import"./TooltipIcon-Dh1Mu_SJ.js";import"./LegacyTooltip-D5m2KIjK.js";import"./useLink-DwKnTFug.js";import"./useFocusable-BlwuGGmT.js";import"./useFocusRing-C4oNNCkT.js";import"./useEffectEvent-N1ux8_qW.js";import"./chain-dbTaULHG.js";import"./index-BhkG3d51.js";import"./usePopper-BoiCpFqY.js";import"./index-BIy2nVn3.js";import"./Portal-BulOCuvv.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cc1-oElI.js";import"./IconCheckMark-CUgV-iic.js";import"./IconExclamationMarkCircle24-C-iUDFUH.js";import"./IconExclamationMarkTriangle-C3N81EP8.js";import"./IconExclamationMarkTriangle24-AZXAhn85.js";import"./IconQuestionMarkCircle-M3kAC-72.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B_J1OCy_.js";import"./Switch-B3LyVazJ.js";import"./TabItem-DdZkicNp.js";import"./elements-BOYmskOL.js";import"./TextInput-DIg1KeSv.js";import"./IconCross-SOlFE8Hj.js";import"./Tooltip-CeNr3ylK.js";import"./useClickOutside-CalGrMZE.js";import"./EnablePortalWrapper-BBDLq95U.js";import"./dialog-D9O7a7Fm.js";import"./Tree-b868nuVK.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-i9ItSUh1.js";import"./Flex-GmbV7jT_.js";import"./IconIcon16-Cj6EKqpw.js";import"./IconIcon24-CXhTDI5f.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
