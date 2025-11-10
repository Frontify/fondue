import{r as c,j as t}from"./iframe-R47jGcU2.js";import{a as k}from"./Box-DC5CvamZ.js";import{B as i,b as n,a}from"./Button-BLwN7tEv.js";import{D as I}from"./DialogBody-mCr-7ihW.js";import{D as O}from"./DialogFooter-DquXKRFU.js";import{D as E}from"./DialogHeader-BSZ8dH4g.js";import{D as b}from"./Divider-D1MiRRnp.js";import{D as T}from"./Dropdown-C_BQ3jQi.js";import{F as y}from"./Flex-GmbV7jT_.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-W5BoMFzl.js";import{I as d}from"./InlineDialog-BwnI-GV6.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-DI9Pv0v-.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CFRi4VmV.js";import"./FormControl-EVHd6z1O.js";import"./InputLabel-No5zkAWB.js";import"./TooltipIcon-Dh1Mu_SJ.js";import"./LegacyTooltip-D5m2KIjK.js";import"./useLink-DwKnTFug.js";import"./useFocusable-BlwuGGmT.js";import"./useFocusRing-C4oNNCkT.js";import"./useEffectEvent-N1ux8_qW.js";import"./chain-dbTaULHG.js";import"./index-BhkG3d51.js";import"./usePopper-BoiCpFqY.js";import"./index-BIy2nVn3.js";import"./Portal-BulOCuvv.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-Cc1-oElI.js";import"./IconCheckMark-CUgV-iic.js";import"./IconExclamationMarkCircle24-C-iUDFUH.js";import"./IconExclamationMarkTriangle-C3N81EP8.js";import"./IconExclamationMarkTriangle24-AZXAhn85.js";import"./IconQuestionMarkCircle-M3kAC-72.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-B_J1OCy_.js";import"./Switch-B3LyVazJ.js";import"./TabItem-DdZkicNp.js";import"./elements-BOYmskOL.js";import"./TextInput-DIg1KeSv.js";import"./IconCross-SOlFE8Hj.js";import"./Tooltip-CeNr3ylK.js";import"./useClickOutside-CalGrMZE.js";import"./EnablePortalWrapper-BBDLq95U.js";import"./Tree-b868nuVK.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-i9ItSUh1.js";import"./FocusScope-CkprIIdV.js";import"./useOverlayTriggerState-CMK1JXk8.js";import"./useControlledState-D984S0L5.js";import"./useMenuTrigger-DaYprgK2.js";import"./useLabels-HI6OO1iA.js";import"./useLocalizedStringFormatter-CLV5oBe-.js";import"./context-xbkVeErw.js";import"./VisuallyHidden-D7O7KpqT.js";import"./helper-DQkMKXX-.js";import"./keyboard-De1exlbK.js";import"./SelectionManager-Clz5uR60.js";import"./useField-DJC3lPlK.js";import"./useFormValidationState-CiVv5iZO.js";import"./MenuItem-BswyJH0q.js";import"./IconCaretRight-B1j9dGFd.js";import"./Trigger-C-7rqTsO.js";import"./IconCaretDown-CmGhdPy_.js";import"./IconCaretDown16-BA8rO_MN.js";import"./IconTrashBin16-DdDfIaKc.js";import"./IconTrashBin24-CcTyKqxy.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
