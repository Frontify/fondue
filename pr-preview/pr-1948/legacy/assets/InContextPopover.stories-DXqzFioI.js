import{j as t}from"./jsx-runtime-DH9XN8A8.js";import{r as p}from"./index-v7USjxUg.js";import{a as l}from"./Box-DwWuiAFQ.js";import{c as d}from"./Button-1V9tmxFq.js";import{D as u}from"./DialogBody-DEPe4cXP.js";import{D as g}from"./DialogFooter-By9gnHQh.js";import{D as f}from"./DialogHeader-uO7sP1lL.js";import{P as n}from"./Popover-BzI_pQn0.js";import{I as x}from"./IconJohanna-DzUZhYZQ.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-DOVkWPF1.js";import"./Divider-DFFu7YC5.js";import"./Dropdown-C9n2N07B.js";import"./useButton-B6orroTH.js";import"./useFocusable-BRFkliNn.js";import"./useFocusRing-CP9UJNUw.js";import"./useEffectEvent-BaECT7_f.js";import"./chain-C8AhrK0W.js";import"./FocusScope-Drcq722v.js";import"./useOverlayTriggerState-C3ap9Qkt.js";import"./useControlledState-BSgwHaZM.js";import"./useMenuTrigger-rF4XU0G9.js";import"./useLabels-v-oj2KeZ.js";import"./useLocalizedStringFormatter-BEKlpfz7.js";import"./context-BFA77VTM.js";import"./VisuallyHidden-CBFC6H_6.js";import"./helper-CZi0UrKh.js";import"./isScrollable-BSEN4xi5.js";import"./index-ATmVgPXl.js";import"./SelectionManager-BD4p7d3N.js";import"./useField-Cf7VimOC.js";import"./useFormValidationState-BKAFCnHb.js";import"./usePopper-BfzTq40m.js";import"./index-DlnOb27V.js";import"./MenuItem-n3bavbk_.js";import"./IconSize-BcCrF_mi.js";import"./IconCaretRight-bL6MdAvD.js";import"./IconCheckMark-CMS57PRn.js";import"./elements-BOYmskOL.js";import"./LoadingCircle-CnEko-RI.js";import"./Trigger-BvTVBjbf.js";import"./IconCaretDown-BxzyP7sS.js";import"./IconCaretDown16-DV8CvCws.js";import"./IconCross-LL1GOU_p.js";import"./IconExclamationMarkTriangle-CTTfs2nR.js";import"./IconExclamationMarkTriangle24-ZUoV6XtQ.js";import"./IconTrashBin16-Db8fv2tm.js";import"./IconTrashBin24-Dz-kV-1n.js";import"./validation-CJXPAjNB.js";import"./EnablePortalWrapper-WVe1xmB1.js";import"./Portal-arVM4yiC.js";import"./useMemoizedId-Cl5PI4eu.js";import"./FormControl-BerFOh3y.js";import"./InputLabel-BjSnxKcM.js";import"./TooltipIcon-BWv5zf6q.js";import"./LegacyTooltip-XV4WT-xy.js";import"./useLink-C2PgwcjG.js";import"./IconExclamationMarkCircle24-CS86ZjBV.js";import"./IconQuestionMarkCircle-DT_LrHkX.js";import"./Switch-CCYII3o3.js";import"./TabItem-BOEZCaC7.js";import"./TextInput-DTRFCL5P.js";import"./Tooltip-wnkDtHBt.js";import"./useClickOutside-nHRsWOx2.js";import"./dialog-Dre1eVQK.js";import"./Tree-CDBSpLSj.js";import"./immer-DpFkcGey.js";import"./Flex-D7eaIs25.js";const kt={title:"Experimental/Popover/In Context",Component:n,tags:["autodocs"],args:{theme:"light"}},h=c=>{const[i,e]=p.useState(!1),r=p.useRef(null);return t.jsxs("div",{className:"tw-h-32 tw-flex tw-justify-center tw-items-center",children:[t.jsx(d,{icon:t.jsx(x,{}),onClick:()=>e(!i),ref:r,children:"Trigger"}),t.jsx(n,{...c,anchor:r,open:i,handleClose:()=>e(!1),children:t.jsxs(l,{className:"tw-w-[400px]",children:[t.jsx(f,{title:"Title",padding:"compact"}),t.jsx(u,{padding:"compact",children:t.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos explicabo iure placeat quae quidem reiciendis sequi, veniam. Cupiditate eos necessitatibus nemo non obcaecati, quod ullam. Beatae deserunt eum quibusdam ratione."})}),t.jsx(g,{padding:"compact",actionButtons:[{children:"Confirm",onClick:()=>e(!1)}]})]})})]})},o=h.bind({});o.args={};var m,a,s;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const Nt=["WithHeaderAndFooter"];export{o as WithHeaderAndFooter,Nt as __namedExportsOrder,kt as default};
