import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as i}from"./index-BwDkhjyp.js";import{B as v}from"./Box-Dwzg5HQc.js";import{c as q,b as S}from"./Button-wjaYzy_L.js";import{D as A}from"./DialogBody-BGcfsRcP.js";import{D as R}from"./DialogFooter-DXpBm1_5.js";import{D as M}from"./DialogHeader-cp63xPSe.js";import{F as E}from"./Flex-B-nAAy1z.js";import{I as W}from"./InlineDialog-DAZcziId.js";import{L as z,T as U,a as X}from"./LegacyTooltip-CeSOe7DY.js";import{b as _}from"./MenuItem-DJQXtueh.js";import{T as L}from"./TabItem-DYJEWVSF.js";import{T as J,a as G}from"./Tabs-DGbmDjeL.js";import{T as K}from"./TextInput-mTB7rRLS.js";import{T as Q}from"./Tooltip-BlJs8OXG.js";import{I as V}from"./IconCaretDown-DH0KSiPA.js";import{I as Y}from"./IconCaretUp-ePKedyL5.js";import{I as Z}from"./IconMagnifier-Ci2HqmJG.js";import{I as $}from"./IconSize-BcCrF_mi.js";import{T as ee}from"./Text-BU2xdpZ1.js";import{D as h}from"./Dialog-CnYZwt9Z.js";import{M as d}from"./dialog-Dre1eVQK.js";import"./_commonjsHelpers-BosuxZz1.js";import"./borderStyle-D9jrV09G.js";import"./merge-DI-veSMP.js";import"./focusStyle-CBFElZiz.js";import"./input-D1uPSr_4.js";import"./Divider-DCi-HcbY.js";import"./FormControl-DsuLRZqT.js";import"./InputLabel-DJ14L3aI.js";import"./TooltipIcon-QAXgIjy1.js";import"./IconQuestionMarkCircle-Buo6J1lY.js";import"./validation-CJXPAjNB.js";import"./LoadingCircle-CZrma5le.js";import"./SegmentedControls-BSWtFswn.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./useFocusable-ClqOF1PM.js";import"./chain-CSFqNvhK.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./FocusScope-CryrrNNO.js";import"./useField-CqwgNQmU.js";import"./useLabels-Bp6d37Qr.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-BDm5AEDr.js";import"./useControlledState-C0C-dzuH.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./motion-C48bHxkn.js";import"./Switch-DB4MDbrr.js";import"./Tree-Bf4elNA2.js";import"./index-CS4BWtGh.js";import"./immer-DBm1MMjE.js";import"./index-CfyPTyT-.js";import"./Trigger-DIiMo1j3.js";import"./IconCross-rmHxPLkJ.js";import"./IconExclamationMarkTriangle-DSMv5KKP.js";import"./IconExclamationMarkTriangle24-NdDZZD89.js";import"./IconTrashBin16-g_sB0yBJ.js";import"./IconTrashBin24-DyoUj1kc.js";import"./IconCheckMark-CuwFbSck.js";import"./useButton-B0CVDvll.js";import"./useLink-BrkukSAv.js";import"./usePopper-C28Vz6Qz.js";import"./Portal-BBACcjoK.js";import"./IconExclamationMarkCircle24-Vs83y98-.js";import"./IconCaretRight-BS4vVtQJ.js";import"./elements-BOYmskOL.js";import"./Badge-cOwk6zfa.js";import"./colors-cqDZVL9s.js";import"./IconDotsHorizontal-CTlRGpTH.js";import"./useClickOutside-CKV3CrvD.js";import"./EnablePortalWrapper-B_d3Ldct.js";import"./IconCaretDown16-mzuMIk3a.js";import"./IconMagnifier16-BvRIIy5m.js";import"./records-DFIz8BfL.js";const Tt={title:"Experimental/Dialog/In Context",component:h,tags:["autodocs"],args:{modality:d.Modal,strategy:"absolute",minWidth:600,maxWidth:0,autoHeight:!1,maxHeight:"auto",minHeight:200,darkUnderlay:!1,verticalAlignment:"centered"},argTypes:{enablePortal:{control:{type:"boolean"}},modality:{options:Object.values(d),control:{type:"select"}},strategy:{options:["absolute","fixed"],control:{type:"radio"}},"data-test-id":{type:"string"},role:{type:"string"},darkUnderlay:{type:"boolean"},autoHeight:{type:"boolean"},verticalAlignment:{options:["top","centered"],control:{type:"radio"}},zIndex:{table:{disable:!0}},isDetached:{table:{disable:!0}}}},te=u=>{const[n,o]=i.useState(!1),[g,p]=i.useState("1"),s=i.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx(q,{ref:s,onClick:()=>o(!n),children:"Dialog trigger"}),e.jsxs(h,{...u,anchor:s,open:n,handleClose:()=>o(!1),children:[e.jsx(M,{title:"Heading",padding:"comfortable",onClose:()=>o(!1),separator:!1}),e.jsx(A,{children:e.jsxs(J,{activeItemId:g,paddingX:G.None,onChange:a=>p(a),children:[e.jsx(L,{id:"1",label:"Tab 1",children:e.jsx("p",{className:"tw-p-6",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."})}),e.jsx(L,{id:"2",label:"Tab 2",children:e.jsxs(v,{className:"tw-p-6",children:[e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."}),e.jsx("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit."})]})})]})}),e.jsx(R,{actionButtons:[{children:"Cancel",emphasis:S.Default,onClick:()=>o(!1)},{children:"Confirm",onClick:()=>o(!1)}]})]})]})},m=[{code:"en",label:"English"},{code:"de",label:"German"},{code:"fr",label:"French"},{code:"es",label:"Spanish"}],ie=u=>{const[n,o]=i.useState(!1),[g,p]=i.useState(m),[s,a]=i.useState(!1),[b,x]=i.useState(null),[N,I]=i.useState(""),w=i.useRef(null),C=i.useRef(null),F=i.useCallback(()=>s?e.jsx(Y,{}):e.jsx(V,{}),[s]),f=()=>{o(!1),I(""),x(null),p(m)},H=t=>{x(m.find(c=>c.code===t)??null),a(!1)},P=t=>{I(t),p(m.filter(c=>c.label.toLowerCase().includes(t.toLowerCase())||c.code.toLowerCase().includes(t.toLowerCase())))},O=i.useCallback(({label:t})=>e.jsx("div",{className:"tw-flex tw-flex-row tw-w-full",children:e.jsx(ee,{color:"x-weak",children:t})}),[]);return e.jsxs("div",{className:"tw-inline-flex",children:[e.jsx(z,{content:"Triggering button",position:U.Right,enablePortal:!0,hoverDelay:50,enterDelay:300,triggerElement:e.jsx(q,{ref:w,onClick:()=>o(!n),children:"Dialog Trigger"}),withArrow:!0}),e.jsxs(h,{...u,anchor:w,open:n,handleClose:f,children:[e.jsx(M,{onClose:()=>o(!1),padding:"comfortable",title:"Dialog content header"}),e.jsx(A,{children:e.jsxs(v,{className:"tw-p-10",children:[e.jsxs(E,{justify:"start",alignContent:"center",children:[e.jsx(Q,{content:"Just some Information",children:e.jsx(X,{})}),e.jsx("p",{children:"Information"})]}),e.jsxs("button",{onClick:()=>a(!0),ref:C,className:"tw-text-ellipsis tw-flex tw-items-center tw-h-9 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-bg-white dark:tw-bg-transparent tw-border-solid focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20 tw-justify-between tw-gap-x-3 tw-w-full",children:[b?e.jsx(O,{label:b.label}):e.jsx("span",{children:e.jsx("span",{children:"Select option"})}),e.jsx(F,{})]}),e.jsx(W,{anchor:C,open:s,flip:!0,handleClose:()=>a(!1),maxWidth:600,minHeight:0,minWidth:0,width:"100%",autoHeight:!0,modality:d.NonModal,offset:[0,8],placement:"bottom-start",enablePortal:!1,children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-w-[486px] tw-px-4 tw-py-2",children:e.jsx(K,{focusOnMount:!0,decorator:e.jsx(Z,{size:$.Size16}),id:"name",placeholder:"Search",value:N,onChange:t=>P(t)})}),s&&g.map(t=>e.jsx(_,{onClick:()=>H(t.code),children:e.jsx(O,{label:t.label})},t.code))]})})]})}),e.jsx(R,{actionButtons:[{children:"Cancel",emphasis:S.Default,onClick:f},{children:"Confirm",onClick:f}]})]})]})},r=te.bind({});r.args={verticalAlignment:"top"};const l=ie.bind({});l.args={modality:d.Modal,darkUnderlay:!0};var T,D,j;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState('1');
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return <>
            <Button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
                Dialog trigger
            </Button>

            <Dialog {...args} anchor={triggerRef} open={isOpen} handleClose={() => setIsOpen(false)}>
                <DialogHeader title="Heading" padding="comfortable" onClose={() => setIsOpen(false)} separator={false} />
                <DialogBody>
                    <Tabs activeItemId={activeItemId} paddingX={TabsPaddingX.None} onChange={value => setActiveItemId(value)}>
                        <TabItem id="1" label="Tab 1">
                            <p className="tw-p-6">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam quibusdam
                                reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi suscipit.
                            </p>
                        </TabItem>

                        <TabItem id="2" label="Tab 2">
                            <Box className="tw-p-6">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium magni pariatur
                                    possimus praesentium! Blanditiis cupiditate distinctio dolore facere numquam
                                    quibusdam reiciendis suscipit. Aperiam impedit nobis rem! Ab consequatur sequi
                                    suscipit.
                                </p>
                            </Box>
                        </TabItem>
                    </Tabs>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Cancel',
        emphasis: ButtonEmphasis.Default,
        onClick: () => setIsOpen(false)
      }, {
        children: 'Confirm',
        onClick: () => setIsOpen(false)
      }]}></DialogFooter>
            </Dialog>
        </>;
}`,...(j=(D=r.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var y,B,k;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptionList, setFilteredOptionList] = useState<OptionListItem[]>(optionList);
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [optionItemChosen, setOptionItemChosen] = useState<Nullable<OptionListItem>>(null);
  const [inputPhrase, setInputPhrase] = useState('');
  const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const inlineDialogTriggerRef = useRef<HTMLButtonElement | null>(null);
  const RenderButtonIcon = useCallback(() => isOptionListOpen ? <IconCaretUp /> : <IconCaretDown />, [isOptionListOpen]);
  const handleClose = () => {
    setIsOpen(false);
    setInputPhrase('');
    setOptionItemChosen(null);
    setFilteredOptionList(optionList);
  };
  const chooseOption = (code: string) => {
    setOptionItemChosen(optionList.find(option => option.code === code) ?? null);
    setIsOptionListOpen(false);
  };
  const handleInput = (value: string) => {
    setInputPhrase(value);
    setFilteredOptionList(optionList.filter(option => option.label.toLowerCase().includes(value.toLowerCase()) || option.code.toLowerCase().includes(value.toLowerCase())));
  };
  const SelectField = useCallback(({
    label
  }: {
    label?: string;
  }) => <div className="tw-flex tw-flex-row tw-w-full">
                <Text color="x-weak">{label}</Text>
            </div>, []);
  return <div className="tw-inline-flex">
            <LegacyTooltip content="Triggering button" position={TooltipPosition.Right} enablePortal hoverDelay={50} enterDelay={300} triggerElement={<Button ref={dialogTriggerRef} onClick={() => setIsOpen(!isOpen)}>
                        Dialog Trigger
                    </Button>} withArrow />
            <Dialog {...args} anchor={dialogTriggerRef} open={isOpen} handleClose={handleClose}>
                <DialogHeader onClose={() => setIsOpen(false)} padding="comfortable" title="Dialog content header" />
                <DialogBody>
                    <Box className="tw-p-10">
                        <Flex justify="start" alignContent="center">
                            <Tooltip content="Just some Information">
                                <IconExclamationMarkCircle16 />
                            </Tooltip>
                            <p>Information</p>
                        </Flex>
                        <button onClick={() => setIsOptionListOpen(true)} ref={inlineDialogTriggerRef} className="tw-text-ellipsis tw-flex tw-items-center tw-h-9 tw-px-3 tw-border tw-transition tw-rounded tw-text-s tw-font-sans tw-bg-white dark:tw-bg-transparent tw-border-solid focus-within:tw-border-black-90 hover:tw-border-black-90 tw-border-black-20 tw-justify-between tw-gap-x-3 tw-w-full">
                            {optionItemChosen ? <SelectField label={optionItemChosen.label} /> : <span>
                                    <span>Select option</span>
                                </span>}
                            <RenderButtonIcon />
                        </button>
                        <InlineDialog anchor={inlineDialogTriggerRef} open={isOptionListOpen} flip handleClose={() => setIsOptionListOpen(false)} maxWidth={600} minHeight={0} minWidth={0} width="100%" autoHeight modality={Modality.NonModal} offset={[0, 8]} placement="bottom-start" enablePortal={false}>
                            <div>
                                <div className="tw-w-[486px] tw-px-4 tw-py-2">
                                    <TextInput focusOnMount={true} decorator={<IconMagnifier size={IconSize.Size16} />} id="name" placeholder="Search" value={inputPhrase} onChange={value => handleInput(value)} />
                                </div>

                                {isOptionListOpen && filteredOptionList.map(option => <MenuItem key={option.code} onClick={() => chooseOption(option.code)}>
                                            <SelectField label={option.label} />
                                        </MenuItem>)}
                            </div>
                        </InlineDialog>
                    </Box>
                </DialogBody>
                <DialogFooter actionButtons={[{
        children: 'Cancel',
        emphasis: ButtonEmphasis.Default,
        onClick: handleClose
      }, {
        children: 'Confirm',
        onClick: handleClose
      }]} />
            </Dialog>
        </div>;
}`,...(k=(B=l.parameters)==null?void 0:B.docs)==null?void 0:k.source}}};const Dt=["WithTabsAndTopAlignment","WithInlineDialogInside"];export{l as WithInlineDialogInside,r as WithTabsAndTopAlignment,Dt as __namedExportsOrder,Tt as default};
