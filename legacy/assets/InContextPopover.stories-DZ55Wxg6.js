import{r as s,j as t}from"./iframe-DdaLCHUc.js";import{a as l}from"./Box-BFCedUo5.js";import{B as d}from"./Button-LQA4uMwY.js";import{D as u}from"./DialogBody-ONCgGSkp.js";import{D as g}from"./DialogFooter-imcbYCcn.js";import{D as f}from"./DialogHeader-XJUe2SHV.js";import{P as n}from"./Popover-D2vtYZBL.js";import{I as x}from"./IconIcon-Ds7Nhjc6.js";import"./preload-helper-C1FmrZbK.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BTvObkQJ.js";import"./Divider-DZ9Cfqen.js";import"./FormControl-CHRTTuNI.js";import"./InputLabel-I-Kx411H.js";import"./TooltipIcon-BBJxAxVm.js";import"./LegacyTooltip-CWWhuk7B.js";import"./useLink-BhUBEIbu.js";import"./useFocusable-BPi_GpYy.js";import"./useFocusRing-BESbWJEl.js";import"./useEffectEvent-DnDWDQ4U.js";import"./chain-Co2ZCjzx.js";import"./index-Dhfdg7c1.js";import"./usePopper-CAX7HgVD.js";import"./index-f274srjI.js";import"./Portal-CatAU8tQ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-EL9RDzas.js";import"./IconCheckMark-B6cjw87y.js";import"./IconExclamationMarkCircle24-IdAoixjq.js";import"./IconExclamationMarkTriangle-CUyNWLG-.js";import"./IconExclamationMarkTriangle24-CJPJDCYb.js";import"./IconQuestionMarkCircle-Cjl-gH89.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BrQtTbTR.js";import"./Switch-C0M_j64v.js";import"./TabItem-DTNaj8IU.js";import"./elements-BOYmskOL.js";import"./TextInput-CFNM7wtv.js";import"./IconCross-BpQu1AjW.js";import"./Tooltip-9hW2Bipn.js";import"./useClickOutside-Cf3DqbZp.js";import"./EnablePortalWrapper-C2XFGCCp.js";import"./dialog-D9O7a7Fm.js";import"./Tree-B6hM_JfH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-BAK9aW7H.js";import"./IconCaretDown-Se4sU9sK.js";import"./IconCaretDown16--0HwDEW5.js";import"./IconTrashBin16-Ch1evd52.js";import"./IconTrashBin24-B9NG3wmX.js";import"./useButton-oy6tav4j.js";import"./Flex-DB337FYq.js";import"./IconIcon16-RmIEQMvQ.js";import"./IconIcon24-BENNQsQ9.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const It=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,It as __namedExportsOrder,jt as default};
