import{j as o}from"./jsx-runtime-DH9XN8A8.js";import{r as l}from"./index-v7USjxUg.js";import{c as b}from"./Button-BfBJpGQT.js";import{D as x}from"./DialogBody-DEPe4cXP.js";import{D as I}from"./DialogFooter-CGR_1fcQ.js";import{I as A}from"./IconJohanna-DzUZhYZQ.js";import{D as O}from"./Dialog-BrzoTUBM.js";import{M as r}from"./dialog-Dre1eVQK.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./useButton-B6orroTH.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./Box--0KL_KPr.js";import"./borderStyle-D9jrV09G.js";import"./input-Dx1NWL6n.js";import"./Checkbox-C8fDjqts.js";import"./useFormValidationState-BKAFCnHb.js";import"./useControlledState-BSgwHaZM.js";import"./InputLabel-CAkTbk9Q.js";import"./TooltipIcon-DWdr_hgc.js";import"./LegacyTooltip-BReeJmjq.js";import"./useLink-C2PgwcjG.js";import"./usePopper-BO8FF5JQ.js";import"./index-voQlCD4e.js";import"./index-DlnOb27V.js";import"./Portal-BMcVKwlx.js";import"./useMemoizedId-Cl5PI4eu.js";import"./IconCheckMark-CMS57PRn.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconExclamationMarkTriangle-CTTfs2nR.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconQuestionMarkCircle-DT_LrHkX.js";import"./IconMinus-DtF84-GK.js";import"./Divider-BI8G7m_S.js";import"./Dropdown-B7FwpEmp.js";import"./FocusScope-Drcq722v.js";import"./useOverlayTriggerState-C3ap9Qkt.js";import"./useMenuTrigger-dROe67R1.js";import"./useLabels-v-oj2KeZ.js";import"./useLocalizedStringFormatter-BEKlpfz7.js";import"./context-BFA77VTM.js";import"./VisuallyHidden-CBFC6H_6.js";import"./helper-B_Vetl89.js";import"./isScrollable-BSEN4xi5.js";import"./SelectionManager-BD4p7d3N.js";import"./useField-Cf7VimOC.js";import"./MenuItem-n3bavbk_.js";import"./IconCaretRight-bL6MdAvD.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CnEko-RI.js";import"./Trigger-BvTVBjbf.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCross-LL1GOU_p.js";import"./IconTrashBin16-Db8fv2tm.js";import"./IconTrashBin24-Dz-kV-1n.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-DzTSSIqA.js";import"./FormControl-DeLflFlr.js";import"./Switch-CibQ61jG.js";import"./TabItem-BOEZCaC7.js";import"./TextInput-NLH6WSWe.js";import"./Tooltip-PCAYiURV.js";import"./useClickOutside-nHRsWOx2.js";import"./Tree-CzP7ikJo.js";import"./immer-DpFkcGey.js";import"./Flex-BsqkRsR0.js";const zo={title:"Experimental/Dialog",component:O,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Dialog](/docs/current_components-dialog--documentation) component instead."}}},args:{modality:r.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(r),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},a=B=>{const[n,s]=l.useState(!1),p=l.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx(b,{icon:o.jsx(A,{}),ref:p,onClick:()=>s(!n),children:"Dialog Trigger"}),o.jsxs(O,{...B,anchor:p,open:n,handleClose:()=>s(!1),children:[o.jsx(x,{padding:"spacious",children:o.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis perspiciatis quis tempora temporibus voluptates?"})}),o.jsx(I,{actionButtons:[{children:"Close",onClick:()=>s(!1)}]})]})]})},e=a.bind({});e.args={modality:r.NonModal};const t=a.bind({});t.args={modality:r.Modal};const i=a.bind({});i.args={modality:r.BlockingModal,darkUnderlay:!0};var m,c,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,g,f;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var D,h,y;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button icon={<IconJohanna />} ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog Trigger
            </Button>
            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody padding="spacious">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad illum impedit iure numquam
                        praesentium vel. Distinctio perferendis, suscipit! Dolor doloremque et ex, modi nobis officiis
                        perspiciatis quis tempora temporibus voluptates?
                    </p>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Close',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(y=(h=i.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const Po=["AsANonModal","AsAModal","AsABlockingModalWithDarkUnderlay"];export{i as AsABlockingModalWithDarkUnderlay,t as AsAModal,e as AsANonModal,Po as __namedExportsOrder,zo as default};
