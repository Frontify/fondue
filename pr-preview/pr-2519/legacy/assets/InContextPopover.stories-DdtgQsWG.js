import{r as p,j as t}from"./iframe-B0eONuky.js";import{a as l}from"./Box-Bx-HGFN9.js";import{B as d}from"./Button-BlGIO2tE.js";import{D as u}from"./DialogBody-BxtrDcqk.js";import{D as g}from"./DialogFooter-DiNJOedn.js";import{D as f}from"./DialogHeader-CIXvVNL7.js";import{P as n}from"./Popover-CVopVUla.js";import{I as x}from"./IconIcon-D3PJDy2i.js";import"./preload-helper-MprHWY6w.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CH-sbZx6.js";import"./Divider-Ctv_3Wyq.js";import"./Dropdown-BfzPlYYt.js";import"./useButton-5FbdIYcR.js";import"./useFocusable-bBkjSLpf.js";import"./useFocusRing-DE6ZkWyf.js";import"./useEffectEvent-2_Uk2eyz.js";import"./chain-V8glzwK0.js";import"./index-DVbrmjAE.js";import"./FocusScope-CyQyhzxw.js";import"./useOverlayTriggerState-lO9KGur7.js";import"./useControlledState-BVDDe9gl.js";import"./useMenuTrigger-DoHZFNAI.js";import"./useLabels-DLn4iTZj.js";import"./useLocalizedStringFormatter-D45KdaND.js";import"./context-BiMFL_PP.js";import"./VisuallyHidden-CpTHZVNZ.js";import"./helper-4xrQ1och.js";import"./keyboard-DpUZzzD5.js";import"./SelectionManager-DZOcDTAx.js";import"./useField-D1_sbYus.js";import"./useFormValidationState-CiR8hia_.js";import"./usePopper-CSmw89St.js";import"./index-Cq0fKC_P.js";import"./MenuItem-DOiZqrOT.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-CVZt_dym.js";import"./IconCheckMark-Do5BaNJh.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CuP6zKKO.js";import"./Trigger-BkTp6a6g.js";import"./IconCaretDown-DGfG4Bhv.js";import"./IconCaretDown16-K9H94xLN.js";import"./IconCross-DKzK2egq.js";import"./IconExclamationMarkTriangle-E9iCfFGJ.js";import"./IconExclamationMarkTriangle24-BgvkgKew.js";import"./IconTrashBin16-B3PCevQV.js";import"./IconTrashBin24-j-bA0P1z.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-CWbGt64c.js";import"./Portal-D_InDcfX.js";import"./useMemoizedId-B3YhzS_A.js";import"./FormControl-BHe39TIa.js";import"./InputLabel-ZriXx0s-.js";import"./TooltipIcon-iXKlKXAf.js";import"./LegacyTooltip-B7q53XOK.js";import"./useLink-B03_KRRE.js";import"./IconExclamationMarkCircle24-DhRVyq7-.js";import"./IconQuestionMarkCircle-R6W4K534.js";import"./Switch-OeDDwXU2.js";import"./TabItem-76GLqhix.js";import"./TextInput-Gv7lpT9-.js";import"./Tooltip-Dwst5rQ3.js";import"./useClickOutside-BBDKVLV6.js";import"./dialog-D9O7a7Fm.js";import"./Tree-D-Zdn97c.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-B2ibypED.js";import"./IconIcon16-Ba_Pu6iK.js";import"./IconIcon24-BaZ0imhr.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
