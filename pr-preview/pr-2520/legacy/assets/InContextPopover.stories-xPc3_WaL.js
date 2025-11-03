import{r as s,j as t}from"./iframe-BowQ0jGp.js";import{a as l}from"./Box-QK0CIj8u.js";import{B as d}from"./Button-CQGJo0QK.js";import{D as u}from"./DialogBody-Df5dUt9F.js";import{D as g}from"./DialogFooter-EsJUdeJr.js";import{D as f}from"./DialogHeader-CSUBX5lb.js";import{P as n}from"./Popover-BwR6K0JA.js";import{I as x}from"./IconIcon-Dn7pCgMN.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DyKukZy3.js";import"./Divider-00pqZOjK.js";import"./FormControl-CflmXIz4.js";import"./InputLabel-DllKOG0h.js";import"./TooltipIcon-CU4pLt43.js";import"./LegacyTooltip-LzbcpUw0.js";import"./useLink-C5ddy1rS.js";import"./useFocusable-ChtcloIq.js";import"./useFocusRing-COxpplxr.js";import"./useEffectEvent-BRx6deDQ.js";import"./chain-DM-r0UYe.js";import"./index-CDvlvMGo.js";import"./usePopper-Bt4hz7Iy.js";import"./index-BCy-ay0x.js";import"./Portal-m3fdG8m8.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BX9aPyll.js";import"./IconCheckMark-D_qMZotA.js";import"./IconExclamationMarkCircle24-DYHkGOoQ.js";import"./IconExclamationMarkTriangle-CbweDmlD.js";import"./IconExclamationMarkTriangle24-BhIGoSmM.js";import"./IconQuestionMarkCircle-DEuMgKKd.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-CQr4f1rm.js";import"./Switch-B6RpDB7x.js";import"./TabItem-CV0BDJs8.js";import"./elements-BOYmskOL.js";import"./TextInput-USKfn8MZ.js";import"./IconCross-Ba779HJ8.js";import"./Tooltip-BvyEFu8R.js";import"./useClickOutside-DfZ0EkqO.js";import"./EnablePortalWrapper-BJ1exqVv.js";import"./dialog-D9O7a7Fm.js";import"./Tree-xd6uRlkH.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-ByV3oOXU.js";import"./IconCaretDown-ClkUrooK.js";import"./IconCaretDown16-LO6U1dMl.js";import"./IconTrashBin16-CkmI3Ywn.js";import"./IconTrashBin24-BQoqNjfq.js";import"./useButton-CldgbS-1.js";import"./Flex-BhhtHni7.js";import"./IconIcon16-Da4vkcbg.js";import"./IconIcon24-D_X2opA8.js";const jt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
