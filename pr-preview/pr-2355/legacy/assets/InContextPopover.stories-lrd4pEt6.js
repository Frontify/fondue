import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as a}from"./index-ClcD9ViR.js";import{a as l}from"./Box-BbIDEstp.js";import{c as d}from"./Button-BkcxChke.js";import{D as u}from"./DialogBody-CKaSimJT.js";import{D as g}from"./DialogFooter-Bo7yOwtu.js";import{D as f}from"./DialogHeader-D2Ae5tNJ.js";import{P as m}from"./Popover-DVY-VJq2.js";import{I as x}from"./IconJohanna-SvJ9aa_T.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-BtNTXUM4.js";import"./input-Bbe4DJvU.js";import"./LoadingCircle-N4gckcbl.js";import"./IconCheckMark16-BSi_kkf1.js";import"./IconCross16-BshCNAKj.js";import"./IconExclamationMarkTriangle16-DGaIrm4W.js";import"./IconEyeOff16-C861zzFg.js";import"./generateRandomId-Dxm0_E-2.js";import"./validation-CJXPAjNB.js";import"./useButton-CmN_Qqm3.js";import"./useFocusable-NpJIjJzn.js";import"./useFocusRing-CqhiwHAH.js";import"./useEffectEvent-23OTMzEQ.js";import"./chain-zZtnTS2i.js";import"./index-Cho7bklK.js";import"./IconSize-BcCrF_mi.js";import"./dialog-Dre1eVQK.js";import"./Flex-B1OyPNq4.js";import"./useMobileDetection-0Drfqsdw.js";import"./IconCross-U1qlrHTt.js";import"./Overlay-kasLSSZn.js";import"./overlayStyle-EzcPN3Xj.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./EnablePortalWrapper-CTxa5i7Z.js";import"./Portal-B3A1C5qZ.js";import"./useClickOutside-BcVMXM8r.js";import"./useDropdownAutoHeight-D5oOQk5u.js";import"./elements-BOYmskOL.js";import"./useMemoizedId-BicaxHcO.js";const se={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return e.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[e.jsx(d,{icon:e.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),e.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:e.jsxs(l,{className:"tw-w-[400px]",children:[e.jsx(f,{title:"Title",padding:"compact"}),e.jsx(u,{padding:"compact",children:e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),e.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},t=h.bind({});t.args={};var s,n,p;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
}`,...(p=(n=t.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};const ne=["WithHeaderAndFooter"];export{t as WithHeaderAndFooter,ne as __namedExportsOrder,se as default};
