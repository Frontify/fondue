import{r as a,j as t}from"./iframe-DlqR6AYe.js";import{a as l}from"./Box-DKnxTYww.js";import{B as d}from"./Button-Ce6Hz3tz.js";import{D as u}from"./DialogBody-BeWCwiYC.js";import{D as g}from"./DialogFooter-C5GTIbQv.js";import{D as f}from"./DialogHeader-CtyDskbI.js";import{P as n}from"./Popover-B-oFvrrA.js";import{I as x}from"./IconJohanna-I2MzV9w0.js";import"./preload-helper-D7hvLZ4Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-2OGw98db.js";import"./Divider-B7g1bR7y.js";import"./FormControl-BdohVY5q.js";import"./InputLabel-Cs_DuCbH.js";import"./TooltipIcon-BdNiXIys.js";import"./LegacyTooltip-CU1H6lDZ.js";import"./useLink-qhltQ58f.js";import"./useFocusable-DA7pXR9i.js";import"./useFocusRing-DNtrobjq.js";import"./useEffectEvent-Dj1B-YfH.js";import"./chain-DXNJaT1s.js";import"./index-DYFFyKj-.js";import"./usePopper-rFQeOltH.js";import"./index-UZCdOU-e.js";import"./Portal-ZI8jxOqw.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-GoCZIqhn.js";import"./IconCheckMark-lzA40FAd.js";import"./IconExclamationMarkCircle24-BMMgRLQy.js";import"./IconExclamationMarkTriangle-BK2u7XiP.js";import"./IconExclamationMarkTriangle24-BdCxa8EH.js";import"./IconQuestionMarkCircle-BSBlB7G2.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-Do-r--xq.js";import"./Switch-DnCWV2qR.js";import"./TabItem-BTsErnky.js";import"./elements-BOYmskOL.js";import"./TextInput-CiBvIeoH.js";import"./IconCross-BXwDlxZD.js";import"./Tooltip-oHgrzAvE.js";import"./useClickOutside-CzmOeMxQ.js";import"./EnablePortalWrapper-DqLc8zPE.js";import"./dialog-D9O7a7Fm.js";import"./Tree-C3Uam2K8.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DJRyMBNI.js";import"./IconCaretDown-RbfFbgKr.js";import"./IconCaretDown16-B_xt-Z8A.js";import"./IconTrashBin16-J7sGGzjj.js";import"./IconTrashBin24-Bh2zCWt_.js";import"./useButton-BO4vCvKH.js";import"./Flex-ByD-ISAs.js";const Bt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=a.useState(!1),r=a.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var s,p,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
