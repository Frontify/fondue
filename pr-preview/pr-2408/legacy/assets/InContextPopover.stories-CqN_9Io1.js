import{r as s,j as t}from"./iframe-a7WslOQu.js";import{a as l}from"./Box-B4ArSx2T.js";import{B as d}from"./Button-Dtrv8XCd.js";import{D as u}from"./DialogBody-BAM8husB.js";import{D as g}from"./DialogFooter-D6-Be7cB.js";import{D as f}from"./DialogHeader-7a9zeQFU.js";import{P as m}from"./Popover-Zc-xnPyr.js";import{I as x}from"./IconIcon-Dr7tB5vz.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-p2o5I04Y.js";import"./Divider-BSeUtVmc.js";import"./FormControl-mosS9VJ8.js";import"./InputLabel-CX4PTXEL.js";import"./TooltipIcon-vPN4jXOd.js";import"./LegacyTooltip-D7WbcWjf.js";import"./useLink-CKXoXPie.js";import"./useFocusable-CVLtKeEK.js";import"./useFocusRing-BsKtOWIg.js";import"./useLayoutEffect-BSvyou2-.js";import"./chain-D_hLnw2Y.js";import"./index-DveCA8QO.js";import"./usePopper-DC4mMBi2.js";import"./index-CgZkkAzJ.js";import"./Portal-DVDn18Ze.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CHuQFIPb.js";import"./IconCheckMark-BAxYou-z.js";import"./IconExclamationMarkCircle24-CEyW54Cy.js";import"./IconExclamationMarkTriangle-DO0xbDzJ.js";import"./IconExclamationMarkTriangle24-DDnsUeoa.js";import"./IconQuestionMarkCircle-B8crfUXz.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-C_zkTnDZ.js";import"./Switch-N7gvfehH.js";import"./TabItem-BfSLCPbW.js";import"./elements-BOYmskOL.js";import"./TextInput-wAQd4tEv.js";import"./IconCross-bxooVkc0.js";import"./Tooltip-Bp0Luloz.js";import"./useClickOutside-DiPuqPle.js";import"./EnablePortalWrapper-e5As7i-G.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CbUACvEy.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-DyYnusnA.js";import"./Flex-Bt20qAfF.js";import"./IconIcon16-DBWa-cCB.js";import"./IconIcon24-CeazxONB.js";const ft={title:"Experimental/Popover/In Context",Component:m,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,o]=s.useState(!1),r=s.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>o(!i),ref:r,children:"Trigger"}),t.jsx(m,{...c,anchor:r,open:i,handleClose:()=>o(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>o(!1)}]})]})})]})},e=h.bind({});e.args={};var a,p,n;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
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
