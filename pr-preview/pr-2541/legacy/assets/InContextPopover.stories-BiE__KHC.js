import{r as s,j as t}from"./iframe-LEv1GSvY.js";import{a as l}from"./Box-CBJfGyR5.js";import{B as d}from"./Button-DUwtZbrH.js";import{D as u}from"./DialogBody-CkD4RstN.js";import{D as g}from"./DialogFooter-Dxco5bgG.js";import{D as f}from"./DialogHeader-D7hccRaS.js";import{P as n}from"./Popover-CVqLcDDz.js";import{I as x}from"./IconIcon-QWYlbl83.js";import"./preload-helper-DlITqhEh.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-B4VXuL7P.js";import"./Checkbox-BGN2gp-7.js";import"./useFocusable-stfJeIpU.js";import"./useFocusRing-CmQWnBCR.js";import"./useEffectEvent-g570qV22.js";import"./chain-BYYKUROJ.js";import"./index-w8RZ3Xa7.js";import"./useFormValidationState-OkvhBaTv.js";import"./useControlledState-B2DC-eKR.js";import"./InputLabel-DxuW7zDn.js";import"./TooltipIcon-CV8X81_I.js";import"./LegacyTooltip-o5Kd4SF7.js";import"./useLink-saIWG3I9.js";import"./usePopper-C2pndz_I.js";import"./index-CgWYneLo.js";import"./Portal-Bl2R-8KJ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-YPBy6EbL.js";import"./IconCheckMark-DuN6dQH8.js";import"./IconExclamationMarkCircle24-jUU22MCT.js";import"./IconExclamationMarkTriangle-BcYnUjX4.js";import"./IconExclamationMarkTriangle24-DU65-zzt.js";import"./IconQuestionMarkCircle-BRsB91tC.js";import"./IconMinus-BOXaew8y.js";import"./FormControl-CNZZySl_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BwNxSYA8.js";import"./Switch-RSq4JAMI.js";import"./TabItem-DHWxiMih.js";import"./elements-BOYmskOL.js";import"./TextInput-CW45iaTr.js";import"./IconCross-DVGcdwIR.js";import"./Tooltip-C5O3PABQ.js";import"./useClickOutside-C4Y6OvTA.js";import"./EnablePortalWrapper-DvmytOZ7.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BtUxV5Iu.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-B6ThISim.js";import"./IconCaretDown-Bq-EReh4.js";import"./IconCaretDown16-DcQxwk-i.js";import"./IconTrashBin16-xy03U9Qa.js";import"./IconTrashBin24-Dx0UE5Kn.js";import"./useButton-Cr6sqSYQ.js";import"./Flex-BqwQk2wH.js";import"./IconIcon16-H1gL3hnN.js";import"./IconIcon24-BmDnYPhf.js";const Dt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var p,a,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
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
}`,...(m=(a=o.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const vt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,vt as __namedExportsOrder,Dt as default};
