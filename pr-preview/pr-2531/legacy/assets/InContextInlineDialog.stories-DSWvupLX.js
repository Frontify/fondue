import{r as c,j as t}from"./iframe-Bx9GVrJZ.js";import{a as k}from"./Box-CMjufgGn.js";import{B as i,b as n,a}from"./Button-Da3Gx_ir.js";import{D as I}from"./DialogBody-D_hU0Nj0.js";import{D as O}from"./DialogFooter-CBaQVBvJ.js";import{D as E}from"./DialogHeader-D8fV2m5h.js";import{D as b}from"./Divider-DkiqWb8u.js";import{D as T}from"./Dropdown-uCdqZBwA.js";import{F as y}from"./Flex-D2lYMPxP.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DAB7CA5A.js";import{I as d}from"./InlineDialog-BMXn38jF.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CIGcvm77.js";import"./Checkbox-sW9wnNG2.js";import"./useFocusable-Dn-i4bwA.js";import"./useFocusRing-C_gjdnsv.js";import"./useEffectEvent-B5LtIWRy.js";import"./chain-C8kX9J9x.js";import"./index-C-gYs3Hr.js";import"./useFormValidationState-lVOleaOT.js";import"./useControlledState-BucMWiPd.js";import"./InputLabel-Oiy5y5vo.js";import"./TooltipIcon-_olP1H5z.js";import"./LegacyTooltip-CFgqf3d2.js";import"./useLink-A_GFgEa6.js";import"./usePopper-BsRWJAOy.js";import"./index-B_AR-7Zm.js";import"./Portal-C-f1HJei.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-GZQJvteq.js";import"./IconCheckMark-DAJ8cKO8.js";import"./IconExclamationMarkCircle24-CG5Ngt4w.js";import"./IconExclamationMarkTriangle-BaN9k6Ci.js";import"./IconExclamationMarkTriangle24-DsN51Y9L.js";import"./IconQuestionMarkCircle-wL1ZuTv1.js";import"./IconMinus-QL3DQ7_H.js";import"./FormControl-BXkKBcHn.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-BUBQ-nVM.js";import"./Switch-DZKRmo2d.js";import"./TabItem-CP7LJa8L.js";import"./elements-BOYmskOL.js";import"./TextInput-CEItFKq9.js";import"./IconCross-yaftdHV6.js";import"./Tooltip-CDtgP5s8.js";import"./useClickOutside-BSKSo8Jy.js";import"./EnablePortalWrapper-DGsp_PpL.js";import"./Tree-DIr1AUUe.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-CNpMaSFH.js";import"./IconCaretDown-ojAjKLdu.js";import"./IconCaretDown16-CZX7ke6L.js";import"./IconTrashBin16-BjKSA6mw.js";import"./IconTrashBin24-B_YShVa4.js";import"./useButton-1VD-WXX-.js";import"./FocusScope-BWhix_t8.js";import"./useOverlayTriggerState-CNPfYaKC.js";import"./useMenuTrigger-Dq-KTEQX.js";import"./useLabels-CxNtTZQy.js";import"./useLocalizedStringFormatter-B0X-g_J7.js";import"./context-CVGDgHuw.js";import"./VisuallyHidden-BuG4UE6u.js";import"./helper-DImH7bvT.js";import"./keyboard-BDlz2Gq6.js";import"./SelectionManager-Cqcjm5ME.js";import"./useField-CX812b-c.js";import"./MenuItem-DhmRC9QT.js";import"./IconCaretRight-D1M-LicO.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const $t=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,$t as __namedExportsOrder,Zt as default};
