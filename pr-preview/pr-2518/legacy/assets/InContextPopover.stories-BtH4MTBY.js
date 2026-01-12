import{r as p,j as t}from"./iframe-D_BOSi7z.js";import{a as l}from"./Box-BEOERL60.js";import{B as d}from"./Button-C4MmvNvx.js";import{D as u}from"./DialogBody-9rO_vFOY.js";import{D as g}from"./DialogFooter-BYVI3vue.js";import{D as f}from"./DialogHeader-CPOXSxK7.js";import{P as n}from"./Popover-DOqdzZVg.js";import{I as x}from"./IconIcon-B0CrwNM1.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-D8gYQp8j.js";import"./Divider-B8ud-vsx.js";import"./Dropdown-Br8fivGJ.js";import"./useButton-DYuGFIG_.js";import"./useFocusable-PX_TjPkN.js";import"./useFocusRing-3FNqU6ul.js";import"./useEffectEvent-CC_qXDJd.js";import"./chain-BCugQ9l9.js";import"./index-D-wBK1Ng.js";import"./FocusScope-uWXJwkLD.js";import"./useOverlayTriggerState-BjgsoR16.js";import"./useControlledState-edCwLap7.js";import"./useMenuTrigger-kwJADy-_.js";import"./useLabels-5DLMGvEt.js";import"./useLocalizedStringFormatter-Dl3iXdBr.js";import"./context-OJGXQKbu.js";import"./VisuallyHidden-BRbrFR-P.js";import"./helper-Bp7JDzWt.js";import"./keyboard-BOx3Eis0.js";import"./SelectionManager-DzBiEzjS.js";import"./useField-CL0EjCjO.js";import"./useFormValidationState-CKHn6c8R.js";import"./usePopper-CWJKvBxE.js";import"./index-C8RUnOp5.js";import"./MenuItem-r3ehSA8w.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CfLspMN-.js";import"./IconCheckMark-DdBrvFtV.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CyHsgIab.js";import"./Trigger-DA871_2-.js";import"./IconCaretDown-36ngw1UT.js";import"./IconCaretDown16-Co6QTjBw.js";import"./IconCross-ByijIFm9.js";import"./IconExclamationMarkTriangle-xQH9byf_.js";import"./IconExclamationMarkTriangle24-BJ7X_RsB.js";import"./IconTrashBin16-q9e-rIJ9.js";import"./IconTrashBin24-CFl-qnHA.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Cg-A3hzO.js";import"./Portal-CoV8HD0d.js";import"./useMemoizedId-C_W2q-Ms.js";import"./FormControl-Dtgtea_0.js";import"./InputLabel-CtdBwKXa.js";import"./TooltipIcon-C4hpdbpH.js";import"./LegacyTooltip-wq0qLjqe.js";import"./useLink-JLbnaYkl.js";import"./IconExclamationMarkCircle24-BuQiGPe5.js";import"./IconQuestionMarkCircle-BhtGQ5mm.js";import"./Switch-CQ93vPgz.js";import"./TabItem-l5qSmNdO.js";import"./TextInput-ywF1gWpG.js";import"./Tooltip-BW6m7Y-x.js";import"./useClickOutside-DWNA6lpA.js";import"./dialog-D9O7a7Fm.js";import"./Tree-CKJD2kKA.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-BsQyatxB.js";import"./IconIcon16-B0vWrUBW.js";import"./IconIcon24-ChE4rgOw.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(a=(s=o.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const Lt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Lt as __namedExportsOrder,Nt as default};
