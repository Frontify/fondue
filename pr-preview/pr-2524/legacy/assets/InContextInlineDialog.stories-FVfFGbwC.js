import{r as c,j as t}from"./iframe-CMpkON89.js";import{a as k}from"./Box-g_fvXqx6.js";import{B as i,b as n,a}from"./Button-DBQd5wjc.js";import{D as I}from"./DialogBody-BUjD0nOH.js";import{D as O}from"./DialogFooter-BOZYtJ8a.js";import{D as E}from"./DialogHeader-BCBxZJk0.js";import{D as b}from"./Divider-BKkgUAbC.js";import{D as T}from"./Dropdown-Br7QWcN7.js";import{F as y}from"./Flex-u0Tbc0FJ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-cTigVx2E.js";import{I as d}from"./InlineDialog-ZOYQeZrJ.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-B3whO8fc.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DWk1JnjE.js";import"./FormControl-BcgCajyc.js";import"./InputLabel-hjiDARke.js";import"./TooltipIcon-VB0vu51_.js";import"./LegacyTooltip-COl642PU.js";import"./useLink-BukK8isd.js";import"./useFocusable-HnrZsKbR.js";import"./useFocusRing-DIEOJSVz.js";import"./useEffectEvent-4-XY5svK.js";import"./chain-BCNQpcpO.js";import"./index-B9LBdfw3.js";import"./usePopper-P6sL91Sq.js";import"./index-Ckuc5XOc.js";import"./Portal-5x1gUpXv.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-BQ7TLkNl.js";import"./IconCheckMark-B_wXSDGe.js";import"./IconExclamationMarkCircle24-B5rNnrJ5.js";import"./IconExclamationMarkTriangle-Jy0sbFD7.js";import"./IconExclamationMarkTriangle24-C4ujeA1c.js";import"./IconQuestionMarkCircle-tH6uHRs_.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-QlXdVjZL.js";import"./Switch-DRlDhOgo.js";import"./TabItem-D6DFutG5.js";import"./elements-BOYmskOL.js";import"./TextInput-DqAlllq3.js";import"./IconCross-qTsAaCLg.js";import"./Tooltip-BUYOplGK.js";import"./useClickOutside-B_5vnK3p.js";import"./EnablePortalWrapper-BPlcZ-uN.js";import"./Tree-BCJT0uuz.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-D7jn93Yi.js";import"./IconCaretDown-2ULPbKV-.js";import"./IconCaretDown16-DPkMkxHs.js";import"./IconTrashBin16-Cn-rAnRV.js";import"./IconTrashBin24-rcV-ZyH-.js";import"./useButton-CNY16gNn.js";import"./FocusScope-CcjEdDSb.js";import"./useOverlayTriggerState-CcqACZmt.js";import"./useControlledState-BhHWOXNz.js";import"./useMenuTrigger-D953qpOP.js";import"./useLabels-kgeBiTWy.js";import"./useLocalizedStringFormatter-DheNUO0b.js";import"./context-Xsolzl5Q.js";import"./VisuallyHidden-BZa1eoZ4.js";import"./helper-DcoYCISW.js";import"./keyboard-CgxRfcKW.js";import"./SelectionManager-Bf7OtNCb.js";import"./useField-CXWP_rW8.js";import"./useFormValidationState-B6XHSZcK.js";import"./MenuItem-Ccgnjj_l.js";import"./IconCaretRight-B7QGx-cK.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
}`,...(D=(C=p.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};const Xt=["WithNoFocusableContent","InContextWithDialogHeaderAndDialogFooter"];export{p as InContextWithDialogHeaderAndDialogFooter,m as WithNoFocusableContent,Xt as __namedExportsOrder,Qt as default};
