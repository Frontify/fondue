import{r as c,j as t}from"./iframe-CKvh_O0D.js";import{a as k}from"./Box-Bfory6cf.js";import{B as i,b as n,a}from"./Button-C2B9rqLH.js";import{D as I}from"./DialogBody-7xXFTt9J.js";import{D as O}from"./DialogFooter-DidKW84U.js";import{D as E}from"./DialogHeader-BPyFKHiM.js";import{D as b}from"./Divider-mufvFv86.js";import{D as T}from"./Dropdown-CPbWnA-0.js";import{F as y}from"./Flex-C2sZZQMQ.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-CjgOV1Cg.js";import{I as d}from"./InlineDialog-CoqZIz-P.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-CxFeC-BG.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CViJ3JP4.js";import"./FormControl-CmMNdVj4.js";import"./InputLabel-gaO2QM9P.js";import"./TooltipIcon-D9wLxXID.js";import"./LegacyTooltip-aEVj6mIy.js";import"./useLink-D_nDgrmH.js";import"./useFocusable-C0mdWk7R.js";import"./useFocusRing-CBTQVLy0.js";import"./useEffectEvent-CbVxX_XK.js";import"./chain-CcI5vAr_.js";import"./index-DHSVcppD.js";import"./usePopper-Dz_SvH7g.js";import"./index-BJoPCn4P.js";import"./Portal-ez0oPfI-.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-C453b7r0.js";import"./IconCheckMark-DMsQ3-wK.js";import"./IconExclamationMarkCircle24-gDVV5B14.js";import"./IconExclamationMarkTriangle-Dd_dKphU.js";import"./IconExclamationMarkTriangle24-n2eJ-XD1.js";import"./IconQuestionMarkCircle-CF79Z1QF.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-DiILCuZN.js";import"./Switch-2JBly8xe.js";import"./TabItem-5XegVS-b.js";import"./elements-BOYmskOL.js";import"./TextInput-BhbBs923.js";import"./IconCross-DrDCoobM.js";import"./Tooltip-BjN0odZj.js";import"./useClickOutside-DlLHr1kC.js";import"./EnablePortalWrapper-XJKT6JWc.js";import"./Tree-CbQ4TP0E.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-LGbyUbV3.js";import"./IconCaretDown-Cr3wBnJm.js";import"./IconCaretDown16-CfoA2FQZ.js";import"./IconTrashBin16-pZ31K1mo.js";import"./IconTrashBin24-BDdD3j9U.js";import"./useButton-Bbg4ad6K.js";import"./FocusScope-CQg80hXd.js";import"./useOverlayTriggerState-CknhEQMP.js";import"./useControlledState-CIA4IA63.js";import"./useMenuTrigger-BAEQTnGh.js";import"./useLabels-BCrWsk4V.js";import"./useLocalizedStringFormatter-DeHJgg1U.js";import"./context-BosoE12j.js";import"./VisuallyHidden-BzEipy3-.js";import"./helper-GG2NGB0V.js";import"./keyboard-BIA0lP83.js";import"./SelectionManager-BoVhxDIz.js";import"./useField-Bwvs7Edx.js";import"./useFormValidationState-BCl_3oLM.js";import"./MenuItem-DxZUjkeg.js";import"./IconCaretRight-Dxpknvsu.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Qt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
