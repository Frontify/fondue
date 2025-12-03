import{r as s,j as t}from"./iframe-CKvh_O0D.js";import{a as l}from"./Box-Bfory6cf.js";import{B as d}from"./Button-C2B9rqLH.js";import{D as u}from"./DialogBody-7xXFTt9J.js";import{D as g}from"./DialogFooter-DidKW84U.js";import{D as f}from"./DialogHeader-BPyFKHiM.js";import{P as n}from"./Popover-DutMwCXY.js";import{I as x}from"./IconIcon-CC8oPRqw.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CViJ3JP4.js";import"./Divider-mufvFv86.js";import"./FormControl-CmMNdVj4.js";import"./InputLabel-gaO2QM9P.js";import"./TooltipIcon-D9wLxXID.js";import"./LegacyTooltip-aEVj6mIy.js";import"./useLink-D_nDgrmH.js";import"./useFocusable-C0mdWk7R.js";import"./useFocusRing-CBTQVLy0.js";import"./useEffectEvent-CbVxX_XK.js";import"./chain-CcI5vAr_.js";import"./index-DHSVcppD.js";import"./usePopper-Dz_SvH7g.js";import"./index-BJoPCn4P.js";import"./Portal-ez0oPfI-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C453b7r0.js";import"./IconCheckMark-DMsQ3-wK.js";import"./IconExclamationMarkCircle24-gDVV5B14.js";import"./IconExclamationMarkTriangle-Dd_dKphU.js";import"./IconExclamationMarkTriangle24-n2eJ-XD1.js";import"./IconQuestionMarkCircle-CF79Z1QF.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DiILCuZN.js";import"./Switch-2JBly8xe.js";import"./TabItem-5XegVS-b.js";import"./elements-BOYmskOL.js";import"./TextInput-BhbBs923.js";import"./IconCross-DrDCoobM.js";import"./Tooltip-BjN0odZj.js";import"./useClickOutside-DlLHr1kC.js";import"./EnablePortalWrapper-XJKT6JWc.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CbQ4TP0E.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-LGbyUbV3.js";import"./IconCaretDown-Cr3wBnJm.js";import"./IconCaretDown16-CfoA2FQZ.js";import"./IconTrashBin16-pZ31K1mo.js";import"./IconTrashBin24-BDdD3j9U.js";import"./useButton-Bbg4ad6K.js";import"./Flex-C2sZZQMQ.js";import"./IconIcon16-DumL8Y54.js";import"./IconIcon24-CjqlNnae.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
