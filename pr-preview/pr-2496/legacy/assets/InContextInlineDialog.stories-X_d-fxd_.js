import{r as c,j as t}from"./iframe-DI3FmvMg.js";import{a as k}from"./Box-BzvOCXyp.js";import{B as i,b as n,a}from"./Button-81HPhAZq.js";import{D as I}from"./DialogBody-RgxVECr_.js";import{D as O}from"./DialogFooter-DvzQOVAq.js";import{D as E}from"./DialogHeader-DOZPaoRR.js";import{D as b}from"./Divider-Bts2jKlC.js";import{D as T}from"./Dropdown-Dvj_d9Nt.js";import{F as y}from"./Flex-D43PR0Qh.js";import{P as S}from"./constantStories-DEfmjXOT.js";import{I as w}from"./IconDotsVertical16-BXqIdFcU.js";import{I as d}from"./InlineDialog-CvrmGlfE.js";import{M as x}from"./dialog-D9O7a7Fm.js";import"./preload-helper-D2dEV7R8.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-Ch_WJ4aJ.js";import"./input-CCyWXpuB.js";import"./Checkbox-D44al-eW.js";import"./useFocusable-CDu369YP.js";import"./useFocusRing-DYIZffxr.js";import"./useEffectEvent-BH88ISlG.js";import"./chain-BslaglIs.js";import"./index-BM8UhHH_.js";import"./useFormValidationState-Cld0AnK4.js";import"./useControlledState-BiOOwxHx.js";import"./InputLabel-Cg4r-In2.js";import"./TooltipIcon-xRvsiuV-.js";import"./LegacyTooltip-_ICJCfzv.js";import"./useLink-UjFHOFNi.js";import"./usePopper--KY0_hMj.js";import"./index-CXZaHicV.js";import"./Portal-BFDMwOGS.js";import"./IconSize-BcCrF_mi.js";import"./useMemoizedId-CkMIAu3W.js";import"./IconCheckMark-B7kLsSyY.js";import"./IconExclamationMarkCircle24-D4tF03zx.js";import"./IconExclamationMarkTriangle-DIy9MoLo.js";import"./IconExclamationMarkTriangle24-CEjgCUBS.js";import"./IconQuestionMarkCircle-DSdNDavw.js";import"./IconMinus-BVHXyRcm.js";import"./FormControl-5EUEioxo.js";import"./validation-C9S5KgfE.js";import"./LoadingCircle-mnpTZaSB.js";import"./Switch-zWc6Snnf.js";import"./TabItem-CImVNYIL.js";import"./elements-BOYmskOL.js";import"./TextInput-CbSujYQZ.js";import"./IconCross-zXwZw5XO.js";import"./Tooltip-D8RjORwC.js";import"./useClickOutside-B67-0z1Q.js";import"./EnablePortalWrapper-CJRjb42v.js";import"./Tree-4JOtMfCe.js";import"./_Uint8Array-CwPxMkg2.js";import"./useButton-BbxjUP_K.js";import"./FocusScope-C1m5l3e0.js";import"./useOverlayTriggerState-DODiVQDU.js";import"./useMenuTrigger-ffLGp00v.js";import"./useLabels-BxWS0UcL.js";import"./useLocalizedStringFormatter--MnVfld8.js";import"./context-BqltTJBl.js";import"./VisuallyHidden-DIGLDGTy.js";import"./helper-Dmt6oJnd.js";import"./keyboard-DKrOuDO8.js";import"./SelectionManager-C4qB5YQ6.js";import"./useField-CXlZh9cC.js";import"./MenuItem-B3oQ8NBJ.js";import"./IconCaretRight-Cnjf463B.js";import"./Trigger-DxWASr5H.js";import"./IconCaretDown-D8Q90axM.js";import"./IconCaretDown16-DnKeo0fq.js";import"./IconTrashBin16-k6iK24Cb.js";import"./IconTrashBin24-CT3rUXQo.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,Zt={title:"Experimental/InlineDialog/In Context",component:d,tags:["autodocs"],parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Flyout component](/docs/current_components-flyout--documentation) instead."}}},args:{placement:"bottom-start",modality:x.Modal,offset:[0,8],flip:!0,width:360,minWidth:360,maxWidth:360,autoHeight:!1,maxHeight:"auto",minHeight:0,roundedCorners:!0,strategy:"absolute",enablePortal:!1},argTypes:{...S,modality:{options:Object.values(x),control:{type:"select"}},"data-test-id":{type:"string"},role:{type:"string"},autoHeight:{type:"boolean"},roundedCorners:{type:"boolean"},zIndex:{table:{disable:!0}}}},e=()=>t.jsx("p",{className:"tw-my-2 tw-text-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugiat hic incidunt, inventore odio praesentium qui quisquam! Dignissimos nemo quisquam unde voluptatem. Animi ea iusto numquam odio omnis. Dicta, voluptatum."}),R=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs(y,{justify:"start",children:[t.jsx(i,{onClick:s("onClick"),style:n.Default,children:"Button"}),t.jsx(i,{onClick:s("onClick"),style:n.Danger,children:"Button"}),t.jsx(i,{ref:r,emphasis:a.Default,icon:t.jsx(w,{}),onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsx(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:t.jsx(I,{children:t.jsx(k,{className:"tw-p-4",children:t.jsx(e,{})})})}),t.jsx(i,{onClick:s("onClick"),style:n.Loud,children:"Button"})]})},F=u=>{const[l,o]=c.useState(!1),r=c.useRef(null);return t.jsxs("div",{children:[t.jsxs(y,{justify:"end",children:[t.jsx(i,{onClick:s("onClick"),emphasis:a.Default,style:n.Default,children:"Button"}),t.jsx(i,{ref:r,onClick:()=>o(!l),children:"InlineDialog Trigger"}),t.jsxs(d,{...u,anchor:r,open:l,handleClose:()=>o(!1),children:[t.jsx(E,{title:"Collaborator Settings",padding:"compact",onClose:()=>o(!1)}),t.jsx(I,{children:t.jsxs("div",{className:"tw-p-2 tw-text-text",children:[t.jsx(T,{enablePortal:!1,onChange:j=>console.log(j),activeItemId:"1",menuBlocks:[{id:"block1",menuItems:[{id:"1",title:"Item 1"},{id:"2",title:"Item 2"},{id:"3",title:"Item 3"},{id:"4",title:"Item 4"},{id:"5",title:"Item 5"}]}]}),t.jsx("p",{className:"tw-flex tw-items-center tw-my-2",children:"Label 2"}),t.jsx(e,{}),t.jsx(e,{})]})}),t.jsx(O,{actionButtons:[{children:"Cancel",emphasis:a.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]}),t.jsx(i,{onClick:s("onClick"),emphasis:a.Strong,style:n.Loud,children:"Button"})]}),t.jsx(b,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(e,{}),t.jsx(i,{emphasis:a.Default,style:n.Default,onClick:s("onClick"),children:"Button"})]})},m=R.bind({}),p=F.bind({});var g,f,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
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
