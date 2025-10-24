import{r as p,j as t}from"./iframe-AUIfQrP4.js";import{a as l}from"./Box-lCOHognj.js";import{B as d}from"./Button-DlFiAFHP.js";import{D as u}from"./DialogBody-DXq3woV3.js";import{D as g}from"./DialogFooter-BGUyCLfk.js";import{D as f}from"./DialogHeader-BMTuBwCj.js";import{P as n}from"./Popover-D63Lb_7G.js";import{I as x}from"./IconJohanna-BMI5SFXD.js";import"./preload-helper-sQDyWCwb.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-C06IVxfj.js";import"./Divider-DRPbvsLK.js";import"./Dropdown-C-r4J8l_.js";import"./useButton-D0wGE8qM.js";import"./useFocusable-CnizbhnP.js";import"./useFocusRing-BoSeZWz5.js";import"./useEffectEvent-Bcoupwh6.js";import"./chain-oFsE9aEj.js";import"./index-BEcmyHTP.js";import"./FocusScope-Ch0sNNKQ.js";import"./useOverlayTriggerState-CuK4f_N_.js";import"./useControlledState-BAllyYje.js";import"./useMenuTrigger-B7Fpswne.js";import"./useLabels--84juFjK.js";import"./useLocalizedStringFormatter-gnsmCImp.js";import"./context-Cy3OkrWF.js";import"./VisuallyHidden-DuFlpOV3.js";import"./helper-5kMBwN-m.js";import"./keyboard-XYTEU8GG.js";import"./SelectionManager-D1hXYaW9.js";import"./useField-CFbP_W3z.js";import"./useFormValidationState-C43Yln6j.js";import"./usePopper-BdKXdpb8.js";import"./index-zrmajsre.js";import"./MenuItem-ChgvnhCc.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-VlGptlRu.js";import"./IconCheckMark-B520aOQQ.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CxtaYhTg.js";import"./Trigger-SlyTZoZ6.js";import"./IconCaretDown-Bj4WZxKG.js";import"./IconCaretDown16-DPOLoDZ8.js";import"./IconCross-qw3ZfYE1.js";import"./IconExclamationMarkTriangle-gBP2crPl.js";import"./IconExclamationMarkTriangle24-LaFkKa3a.js";import"./IconTrashBin16-B-qnlzDI.js";import"./IconTrashBin24-cBVJi1WR.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BKs_Z6VZ.js";import"./Portal-CCtPellx.js";import"./useMemoizedId-Df0mYjrE.js";import"./FormControl-84pwgQ7U.js";import"./InputLabel-BynWe2eY.js";import"./TooltipIcon-Dw_mQpTa.js";import"./LegacyTooltip-DttKv4lK.js";import"./useLink-BENDotdL.js";import"./IconExclamationMarkCircle24-CpDxWh5c.js";import"./IconQuestionMarkCircle-CHVAx3jv.js";import"./Switch-D0kayeZk.js";import"./TabItem-L0p1LsT0.js";import"./TextInput-BnZMKyuu.js";import"./Tooltip-BAyR836C.js";import"./useClickOutside-D7WUOaPV.js";import"./dialog-D9O7a7Fm.js";import"./Tree-Re2vGutZ.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-RMTDUW45.js";const Ft={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const kt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,kt as __namedExportsOrder,Ft as default};
