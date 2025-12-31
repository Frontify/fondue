import{r as c,j as t}from"./iframe-BVCiIt_t.js";import{a as k}from"./Box-B8WP0Ll0.js";import{B as i,b as n,a}from"./Button-C23qQnfc.js";import{D as I}from"./DialogBody-CDTqcWYz.js";import{D as O}from"./DialogFooter-BNpejcfy.js";import{D as E}from"./DialogHeader-zFArNJV0.js";import{D as b}from"./Divider-BvWz_8Oj.js";import{D as T}from"./Dropdown-CIl_oNAm.js";import{F as y}from"./Flex-wQZ1lO1w.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BsIH9uCX.js";import{I as d}from"./InlineDialog-BEBn-fDB.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DyHTrhc7.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CaV8J06j.js";import"./LoadingCircle-Cs9YxQlv.js";import"./Switch-Cnh0WjU1.js";import"./useFocusRing-D74H9_qf.js";import"./useLayoutEffect-CwCMcuvP.js";import"./InputLabel-BVMNaspY.js";import"./TooltipIcon-Lhfh0jX1.js";import"./LegacyTooltip-NJgv0_Qv.js";import"./useLink-CznZ_uny.js";import"./useFocusable-C88n4aJ_.js";import"./chain-tCQxUvER.js";import"./index-CccrmGpf.js";import"./usePopper-BH-iCTlG.js";import"./index-CluciJqc.js";import"./Portal-DheNPhD-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-4XHrKXhm.js";import"./IconCheckMark-Cs3aici6.js";import"./IconExclamationMarkCircle24-CWUAsl74.js";import"./IconExclamationMarkTriangle-ruAcaiBi.js";import"./IconExclamationMarkTriangle24-BdTerdKL.js";import"./IconQuestionMarkCircle-xnzuMREY.js";import"./TabItem-QFEwn2kZ.js";import"./elements-BOYmskOL.js";import"./TextInput-dv1l60LF.js";import"./IconCross-DSKFWT9e.js";import"./validation-C9S5KgfE.js";import"./Tooltip-CqViX1me.js";import"./useClickOutside-CCnHaqrB.js";import"./EnablePortalWrapper-u8CpEIO3.js";import"./Tree-BIBRBKD6.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DP6aJ5z1.js";import"./IconCaretDown-QWbLgCl6.js";import"./IconCaretDown16-8cPQgRO0.js";import"./IconTrashBin16-Ck9Z5JMZ.js";import"./IconTrashBin24-CDDUjHMv.js";import"./useButton-BKkHFZe5.js";import"./FocusScope-CCXlHuFS.js";import"./useOverlayTriggerState-CNWrUfp1.js";import"./useControlledState-CVOt8jmd.js";import"./useMenuTrigger-DrZKXyFJ.js";import"./useLabels-DnWgefze.js";import"./useLocalizedStringFormatter-DejTLXpp.js";import"./context-B26f8_Qc.js";import"./VisuallyHidden-DW6fumEm.js";import"./helper-CmtK_1MM.js";import"./keyboard-Cei9n6mb.js";import"./SelectionManager-9ErhIhuW.js";import"./useField-D132iO8Y.js";import"./useFormValidationState-S527CVud.js";import"./MenuItem-jWm1IOiO.js";import"./IconCaretRight-DqtguiUC.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Jt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <Flex justify="start">
            <Button onClick={action('onClick')} style={ButtonStyle.Default}>
                Button
            </Button>
            <Button onClick={action('onClick')} style={ButtonStyle.Danger}>
                Button
            </Button>
            <Button ref={triggerRef} emphasis={ButtonEmphasis.Default} icon={<IconDotsVertical16 />} onClick={() => setIsOpen(!isOpen)}>
                InlineDialog Trigger
            </Button>
            <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogBody>
                    <Box className="tw-p-4">
                        <TextExample />
                    </Box>
                </DialogBody>
            </InlineDialog>
            <Button onClick={action('onClick')} style={ButtonStyle.Loud}>
                Button
            </Button>
        </Flex>;
}`,...(h=(f=m.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,C,D;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <div>
            <Flex justify="end">
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default}>
                    Button
                </Button>
                <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                    InlineDialog Trigger
                </Button>
                <InlineDialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                    <DialogHeader title="Collaborator Settings" padding="compact" onClose={() => setIsOpen(false)} />
                    <DialogBody>
                        <div className="tw-p-2 tw-text-text">
                            <Dropdown enablePortal={false} onChange={id => console.log(id)} activeItemId={'1'} menuBlocks={[{
              id: 'block1',
              menuItems: [{
                id: '1',
                title: 'Item 1'
              }, {
                id: '2',
                title: 'Item 2'
              }, {
                id: '3',
                title: 'Item 3'
              }, {
                id: '4',
                title: 'Item 4'
              }, {
                id: '5',
                title: 'Item 5'
              }]
            }]} />
                            <p className="tw-flex tw-items-center tw-my-2">Label 2</p>

                            <TextExample />
                            <TextExample />
                        </div>
                    </DialogBody>
                    <DialogFooter actionButtons={[{
          children: 'Cancel',
          emphasis: ButtonEmphasis.Default,
          onClick: () => setIsOpen(false)
        }, {
          children: 'Confirm',
          onClick: () => setIsOpen(false)
        }]}></DialogFooter>
                </InlineDialog>
                <Button onClick={action('onClick')} emphasis={ButtonEmphasis.Strong} style={ButtonStyle.Loud}>
                    Button
                </Button>
            </Flex>
            <Divider />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <TextExample />
            <Button emphasis={ButtonEmphasis.Default} style={ButtonStyle.Default} onClick={action('onClick')}>
                Button
            </Button>
        </div>;
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Qt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Qt as __namedExportsOrder,Jt as default};
