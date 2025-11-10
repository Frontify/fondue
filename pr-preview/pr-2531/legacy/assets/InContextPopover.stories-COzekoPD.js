import{r as p,j as t}from"./iframe-ahMwwdsf.js";import{a as l}from"./Box-C8LnBuXA.js";import{B as d}from"./Button-w0YMQI20.js";import{D as u}from"./DialogBody-B2GvHwT1.js";import{D as g}from"./DialogFooter-DHRM7dUo.js";import{D as f}from"./DialogHeader-BPp6WKzk.js";import{P as n}from"./Popover-TnmneEEu.js";import{I as x}from"./IconIcon-BnybImGF.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input--7aMGOFq.js";import"./Divider-DpgHFPV1.js";import"./Dropdown-svNldc3Q.js";import"./useButton-DLhm0yas.js";import"./useFocusable-Ch_wBML2.js";import"./useFocusRing-DaQclxv6.js";import"./useEffectEvent-Bed0HKrm.js";import"./chain-C53qR8mF.js";import"./index-B6RK_iYZ.js";import"./FocusScope-Bzv2WeXp.js";import"./useOverlayTriggerState-Bu5TuFq8.js";import"./useControlledState-DNYTr6ro.js";import"./useMenuTrigger-B0mf0h1D.js";import"./useLabels-Dts9_kB5.js";import"./useLocalizedStringFormatter-B3uWwqsq.js";import"./context-Cwx5vL9r.js";import"./VisuallyHidden-DUEyq-Cs.js";import"./helper-DY0o5nBN.js";import"./keyboard-CXAxgyJA.js";import"./SelectionManager-Cf_3T95Q.js";import"./useField-B-F_ybfn.js";import"./useFormValidationState-9z_gHNgo.js";import"./usePopper-CDxDTjFc.js";import"./index-CVrNqSrl.js";import"./MenuItem-BeGq7gvA.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-YmhPr-ED.js";import"./IconCheckMark-CJeheIoj.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CpxXuuZu.js";import"./Trigger-Bg-sKnk_.js";import"./IconCaretDown-BWkY7x9m.js";import"./IconCaretDown16-BCuUFWC8.js";import"./IconCross-DtgV0uoe.js";import"./IconExclamationMarkTriangle-BZvUO_9Q.js";import"./IconExclamationMarkTriangle24-CrA51qy3.js";import"./IconTrashBin16-BvirWvL2.js";import"./IconTrashBin24-Dyp1RBtU.js";import"./validation-C9S5KgfE.js";import"./EnablePortalWrapper-BwU3w8We.js";import"./Portal-DKS8nUwW.js";import"./useMemoizedId-CZOTONQe.js";import"./FormControl-Cz8QE23N.js";import"./InputLabel-RKPNgSoW.js";import"./TooltipIcon-9SG9vwuW.js";import"./LegacyTooltip-8C24OgCi.js";import"./useLink-BQDoW3mf.js";import"./IconExclamationMarkCircle24-BSoLODou.js";import"./IconQuestionMarkCircle-DwcKSdMS.js";import"./Switch-wdnbPpFm.js";import"./TabItem-D5LwT7_5.js";import"./TextInput-Dz32-b9A.js";import"./Tooltip-BU8jlWYN.js";import"./useClickOutside-J1ExsWnc.js";import"./dialog-D9O7a7Fm.js";import"./Tree-DHmt4Idc.js";import"./_Uint8Array-CwPxMkg2.js";import"./Flex-DRJ62vin.js";import"./IconIcon16-Bv3E9ZmX.js";import"./IconIcon24-CRCY95mk.js";const Nt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[e,i]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>i(!e),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:e,handleClose:()=>i(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>i(!1)}]})]})})]})},o=h.bind({});o.args={};var m,s,a;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
