import{r as c,j as t}from"./iframe-C_GHvEZT.js";import{a as k}from"./Box-Cip11ddf.js";import{B as i,b as n,a}from"./Button-CQIP-Mg7.js";import{D as I}from"./DialogBody-Ddab9o3Q.js";import{D as O}from"./DialogFooter-BKNDwWdx.js";import{D as E}from"./DialogHeader-BGO12afH.js";import{D as b}from"./Divider-yIGg7oPq.js";import{D as T}from"./Dropdown-D_WKyz9W.js";import{F as y}from"./Flex-CHThfdJ0.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-DYwjwok8.js";import{I as d}from"./InlineDialog-Qo68t2Hv.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-OAyExbmo.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DWfECB1-.js";import"./FormControl-DcjwG3O_.js";import"./InputLabel-CefsbhdV.js";import"./TooltipIcon-Vxr-uYi6.js";import"./LegacyTooltip-RHdatcnr.js";import"./useLink-CS0k3SZc.js";import"./useFocusable-C2iFP6iC.js";import"./useFocusRing-CJnEQ5am.js";import"./useEffectEvent-DAjv-Jen.js";import"./chain-6Jk1-UC4.js";import"./index-QJjDQ7Xf.js";import"./usePopper-m4Bd7R8k.js";import"./index-CO1OXd26.js";import"./Portal-DtuayT2h.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-q3VnK7Ir.js";import"./IconCheckMark-BAqkuMY0.js";import"./IconExclamationMarkCircle24-yNkh65l8.js";import"./IconExclamationMarkTriangle-yZZexPcC.js";import"./IconExclamationMarkTriangle24-D9T-eMHY.js";import"./IconQuestionMarkCircle-CBe0CFaE.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DOm0I8Jz.js";import"./Switch-B_kakr_h.js";import"./TabItem-Dd-JX1VM.js";import"./elements-BOYmskOL.js";import"./TextInput-Cf5p4-Xc.js";import"./IconCross-BC056rW2.js";import"./Tooltip-CvP4Pgth.js";import"./useClickOutside-BcxbmJP1.js";import"./EnablePortalWrapper-dLxVMZI8.js";import"./Tree-D-LlCZ9K.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-C7l_P4Iy.js";import"./FocusScope-B7wUO5Zj.js";import"./useOverlayTriggerState-Cp0OKtOG.js";import"./useControlledState-PjtM5WBE.js";import"./useMenuTrigger-Dcmx8nxf.js";import"./useLabels-CwKCfnBg.js";import"./useLocalizedStringFormatter-CPtoQqLu.js";import"./context-CWf9WvL2.js";import"./VisuallyHidden-Mw1FRbj3.js";import"./helper-kkuNsIZ9.js";import"./keyboard-BhRelnxJ.js";import"./SelectionManager-g-kljnEN.js";import"./useField-Bor0JvY9.js";import"./useFormValidationState-BbZ2eqzz.js";import"./MenuItem-B91LYjLU.js";import"./IconCaretRight-Bcj82g9d.js";import"./Trigger-BlSq6oYu.js";import"./IconCaretDown-CNstUptU.js";import"./IconCaretDown16-Dj8XnOCu.js";import"./IconTrashBin16-C5OpDg77.js";import"./IconTrashBin24-BfqsuaLi.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
