import{r as p,j as t}from"./iframe-ggc05qp5.js";import{a as l}from"./Box-BpSuB_gv.js";import{B as d}from"./Button-CCY2toq0.js";import{D as u}from"./DialogBody-BZzJ_mys.js";import{D as g}from"./DialogFooter-tTfcY1yX.js";import{D as f}from"./DialogHeader-vsrwQMvN.js";import{P as n}from"./Popover-DZCaEP_z.js";import{I as x}from"./IconIcon-CAiHJIjd.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-MEkF5shV.js";import"./Divider-CoERhSuw.js";import"./Dropdown-CIxnL_ee.js";import"./useButton-ChNz3TLR.js";import"./useFocusable-NG717gvg.js";import"./useFocusRing-ClbPovyK.js";import"./useEffectEvent-TMNpvARu.js";import"./chain-dhKHu04B.js";import"./index-IV9VHTlK.js";import"./FocusScope-D9wOCa0s.js";import"./useOverlayTriggerState-BJ1qhrKO.js";import"./useControlledState-ykz0Rnfd.js";import"./useMenuTrigger-DpVn8X_E.js";import"./useLabels-BJDRUN-n.js";import"./useLocalizedStringFormatter-CKti8yL1.js";import"./context-BJnIPN4y.js";import"./VisuallyHidden-CLxKSwTK.js";import"./helper-BAjx2dyn.js";import"./keyboard-BeorW_Hq.js";import"./SelectionManager-BgHaICas.js";import"./useField-w-TvaOu_.js";import"./useFormValidationState-HmZu6JVu.js";import"./usePopper-BlHz01pa.js";import"./index-Bn025ITx.js";import"./MenuItem-BbNksaEj.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-DEkBsEC9.js";import"./IconCheckMark-B5O2hbzH.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-DezT8zwL.js";import"./Trigger-x6X4PO3H.js";import"./IconCaretDown-BnU7RbiA.js";import"./IconCaretDown16-CtPRSIn5.js";import"./IconCross-CUTgcpeg.js";import"./IconExclamationMarkTriangle-bsquF2_C.js";import"./IconExclamationMarkTriangle24-Db5_YIYF.js";import"./IconTrashBin16--VXJ7hVf.js";import"./IconTrashBin24-CpCFRkQE.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-Bs-6SVfL.js";import"./Portal-Bc7Myuvb.js";import"./useMemoizedId-Bc83Oy8u.js";import"./FormControl-XMXivdja.js";import"./InputLabel-BbwthhXI.js";import"./TooltipIcon-DvQt9lcI.js";import"./LegacyTooltip-DXwI5ThW.js";import"./useLink-BzKQhfIP.js";import"./IconExclamationMarkCircle24-BOb3PsaO.js";import"./IconQuestionMarkCircle-CmkyKBhr.js";import"./Switch-CB9EEJT-.js";import"./TabItem-DAOe0Mbq.js";import"./TextInput-4ALtVpG0.js";import"./Tooltip-Cb2lYsA2.js";import"./useClickOutside-5Nput7Ah.js";import"./dialog-D9O7a7Fm.js";import"./Tree-BOR5MZeE.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-B-kbzNir.js";import"./IconIcon16-Btrp1hmx.js";import"./IconIcon24-uujTmcnN.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
