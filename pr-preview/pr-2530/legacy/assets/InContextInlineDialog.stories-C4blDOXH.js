import{r as c,j as t}from"./iframe-BdlO2EbJ.js";import{a as k}from"./Box-PNqRXq3f.js";import{B as i,b as n,a}from"./Button-DrCLLHbF.js";import{D as I}from"./DialogBody-BPee-FyX.js";import{D as O}from"./DialogFooter-BD3ZTSdM.js";import{D as E}from"./DialogHeader-Dv0sldOh.js";import{D as b}from"./Divider-DL-_Vp22.js";import{D as T}from"./Dropdown-BZpXZbjc.js";import{F as y}from"./Flex-DGa_--O7.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BRt2KQjw.js";import{I as d}from"./InlineDialog-HY0DwfBm.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-C4wRLVzE.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-BGrf8GP1.js";import"./Checkbox-CUrMU77A.js";import"./useFocusable-C9dO2yQb.js";import"./useFocusRing-CyFP-Ki5.js";import"./useEffectEvent-C4rtv_rM.js";import"./chain-Dr1u59fH.js";import"./index-D1owJmOw.js";import"./useFormValidationState-ClvA_9AG.js";import"./useControlledState-Cidb8_Ea.js";import"./InputLabel-qiUeEwIk.js";import"./TooltipIcon-CwSo9wJU.js";import"./LegacyTooltip-V-9pWW6E.js";import"./useLink-QJzHBGx-.js";import"./usePopper-DQ00lXwF.js";import"./index-CoFonh66.js";import"./Portal-DZ632Ubj.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CzqpaSN6.js";import"./IconCheckMark-BvJX2csI.js";import"./IconExclamationMarkCircle24-CM3yyMwo.js";import"./IconExclamationMarkTriangle-CPGFYlgY.js";import"./IconExclamationMarkTriangle24-DgKid-_h.js";import"./IconQuestionMarkCircle-hugfPsLI.js";import"./IconMinus-BkS0bI79.js";import"./FormControl-CP7C6AlW.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-D7T_AO83.js";import"./Switch-xVaig9Wk.js";import"./TabItem-khfS1F87.js";import"./elements-BOYmskOL.js";import"./TextInput-DSr8HXc2.js";import"./IconCross-DGcLLMy8.js";import"./Tooltip-Bnq_n-aZ.js";import"./useClickOutside-yq4SUIaF.js";import"./EnablePortalWrapper-DEoZMs_t.js";import"./Tree-C8j84pWN.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DO0Xv1tR.js";import"./IconCaretDown-CPKMJ-tL.js";import"./IconCaretDown16-D6lzkurX.js";import"./IconTrashBin16-CO3SH7GZ.js";import"./IconTrashBin24-Dz78mqQO.js";import"./useButton-CG8bxHRW.js";import"./FocusScope-VwSi9rcC.js";import"./useOverlayTriggerState-ByX_-AoL.js";import"./useMenuTrigger-CAJeYsYW.js";import"./useLabels-Y1KS1nPR.js";import"./useLocalizedStringFormatter-hIxkRCEu.js";import"./context-kBQTsdoA.js";import"./VisuallyHidden-D9YqXu5-.js";import"./helper-pFYePz-q.js";import"./keyboard-Dm1zpteP.js";import"./SelectionManager-CDq-OZdL.js";import"./useField-WZJ25ZCp.js";import"./MenuItem-2d57nVSl.js";import"./IconCaretRight-D16XPZiE.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
