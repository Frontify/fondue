import{r as c,j as t}from"./iframe-B-q0oBkh.js";import{a as k}from"./Box-B6ajFjst.js";import{B as i,b as n,a}from"./Button-CUXzs74B.js";import{D as I}from"./DialogBody-D7KGA2cQ.js";import{D as O}from"./DialogFooter-CyhT6qzj.js";import{D as E}from"./DialogHeader-DQ09RWVN.js";import{D as b}from"./Divider-BtOd8K_b.js";import{D as T}from"./Dropdown-BnI_HdVs.js";import{F as y}from"./Flex-wDtOQWIm.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BSwVeInK.js";import{I as d}from"./InlineDialog-CAdvcU2F.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D9dL-qgt.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-DgPHAQnb.js";import"./FormControl-EVd0GMXM.js";import"./InputLabel-Ds6m3OQf.js";import"./TooltipIcon-znRkNOWf.js";import"./LegacyTooltip-GsuFHRhK.js";import"./useLink-Bqpar8Vm.js";import"./useFocusable-BSpUZ_4G.js";import"./useFocusRing-5Z9WpVa3.js";import"./useEffectEvent-BzoPRF65.js";import"./chain-DMsQz2xd.js";import"./index-Dq2UqDDK.js";import"./usePopper-B8sjEdfE.js";import"./index-DQ2RiE9g.js";import"./Portal-Cv8KVjcJ.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CFv7aZ-I.js";import"./IconCheckMark-DciqofqL.js";import"./IconExclamationMarkCircle24-C4zkAZtx.js";import"./IconExclamationMarkTriangle-HKCYNKsD.js";import"./IconExclamationMarkTriangle24-B5pptuGe.js";import"./IconQuestionMarkCircle-B2xB2obw.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DYERqMAJ.js";import"./Switch-qImyrjyA.js";import"./TabItem-B_l3Iv6U.js";import"./elements-BOYmskOL.js";import"./TextInput-N29rlDxa.js";import"./IconCross-BiMLgWR5.js";import"./Tooltip-BT28b76C.js";import"./useClickOutside-B3144WjB.js";import"./EnablePortalWrapper-aXafSB7H.js";import"./Tree-IOl0-CIB.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BxNNoRoc.js";import"./FocusScope-N6yYRQs6.js";import"./useOverlayTriggerState-Cj-slszd.js";import"./useControlledState-oDvNyEHo.js";import"./useMenuTrigger-DJ9wrAQH.js";import"./useLabels-SPzgNaaN.js";import"./useLocalizedStringFormatter-CvzFr93-.js";import"./context-Cyo6w6Hx.js";import"./VisuallyHidden-DyaYdif_.js";import"./helper-BteyX24t.js";import"./keyboard-DEe2GdBR.js";import"./SelectionManager-w8TbAxAj.js";import"./useField-C7G_IfVM.js";import"./useFormValidationState-Drc9lQjx.js";import"./MenuItem-BMhUsSxl.js";import"./IconCaretRight-BctmRMa6.js";import"./Trigger-CRpyFe7s.js";import"./IconCaretDown-FBs0m0xB.js";import"./IconCaretDown16-bCd7KRJs.js";import"./IconTrashBin16-Ben3ypPa.js";import"./IconTrashBin24-DxVvTmi_.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
