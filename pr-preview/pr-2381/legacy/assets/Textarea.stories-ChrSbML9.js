import{j as t}from"./jsx-runtime-BYYWji4R.js";import{r as m}from"./index-ClcD9ViR.js";import{a as se}from"./Box-C5WhNuuT.js";import{c as Ce}from"./TextInput-DxGfxErH.js";import{I as Ve}from"./IconNook16-DvHvpLJB.js";import{I as Te}from"./IconQuestionMark16-bkA_Afuz.js";import{a as Ee,V as r}from"./validation-CJXPAjNB.js";import{$ as Ie}from"./useFocusRing-CqhiwHAH.js";import{i as Se}from"./react-textarea-autosize.browser.esm-C6BrUbjJ.js";import{u as Fe}from"./useMemoizedId-DU5NJZZj.js";import{F as Ae}from"./focusStyle-BtNTXUM4.js";import{I as i,G as ze,a as je,b as ke}from"./input-DevYctQy.js";import{m as B}from"./merge-DI-veSMP.js";import{u as De}from"./Button-BkcxChke.js";import{F as Be}from"./FormField-3mY_SEgc.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./borderStyle-D9jrV09G.js";import"./LoadingCircle-N4gckcbl.js";import"./IconCheckMark-DDrIoLdu.js";import"./IconSize-BcCrF_mi.js";import"./IconCross-BVasaH61.js";import"./IconExclamationMarkTriangle-DOh84ahI.js";import"./IconExclamationMarkTriangle24-BCoex7hw.js";import"./LegacyTooltip-DwGdpKnT.js";import"./useLink-DLd-zCvm.js";import"./useFocusable-NpJIjJzn.js";import"./chain-zZtnTS2i.js";import"./useEffectEvent-23OTMzEQ.js";import"./index-Cho7bklK.js";import"./usePopper-BHXQC2xD.js";import"./index-DlnOb27V.js";import"./Portal-B3A1C5qZ.js";import"./IconExclamationMarkCircle24-4UiwpX0o.js";import"./Divider-Drwt0P6l.js";import"./FormControl-BkRGxkdF.js";import"./InputLabel-BBoeJyMH.js";import"./TooltipIcon-CBNLwOmC.js";import"./IconQuestionMarkCircle-7EPrDyIp.js";import"./Switch-Cd2vSyfE.js";import"./TabItem-7zIDIg2o.js";import"./elements-BOYmskOL.js";import"./Tooltip-PS__CsyB.js";import"./useClickOutside-BcVMXM8r.js";import"./EnablePortalWrapper-DHpdIRHB.js";import"./dialog-Dre1eVQK.js";import"./Tree-zO-e1FBW.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-DtS_F8DS.js";import"./IconCaretDown-BLgqrlDL.js";import"./IconCaretDown16-Df8Xsbqc.js";import"./IconTrashBin16-DOiZQ5Am.js";import"./IconTrashBin24-10Yg3nt7.js";import"./useButton-CmN_Qqm3.js";import"./VisuallyHidden-BJ4JcGHV.js";const T=({autocomplete:p,autosize:a=!1,clearable:u=!1,decorator:s,defaultValue:I,disabled:c=!1,extraActions:l=void 0,focusOnMount:y=!1,hugWidth:S,id:F,minRows:A,maxRows:ue,placeholder:ie,readOnly:z,resizable:le=!1,required:de,selectable:me=!1,status:d=r.Default,value:v,onBlur:ce,onChange:j,onEnterPressed:N,onKeyDown:k,onFocus:O,"data-test-id":b="fondue-textarea",...pe})=>{const fe=a?Se:"textarea",n=De(null),D=c||z,{isFocusVisible:ye,focusProps:ve}=Ie({isTextInput:!0,within:!0}),M=()=>{if(n.current){const{value:e}=n.current;j==null||j(e)}},be=e=>{var o;N&&e.key==="Enter"?N((o=n.current)==null?void 0:o.value):k==null||k(e)},ge=()=>{n.current&&(n.current.value="",M())};m.useEffect(()=>{var e;y&&((e=n.current)==null||e.focus())},[y,n]),m.useEffect(()=>{var o;const e=v!==((o=n.current)==null?void 0:o.value);n.current&&v&&!e&&(n.current.value=v)},[v,n]);const he={minRows:A,maxRows:ue},xe=()=>{let e=1;const o=l?l.length:0;switch(!0){case(o>0&&u&&d!==r.Default):return e=o+4.5,`${e}rem`;case(o>0&&(u||d!==r.Default)):return e=o+3,`${e}rem`;case o>0:return e+=o*1.5,`${e}rem`;case(u&&d!==r.Default):return"3.5rem";case(d!==r.Default||u):return"2.5rem";default:return e}},we=()=>!D&&le?"tw-resize-y":"tw-resize-none";return t.jsxs("div",{className:"tw-relative",children:[s?t.jsx("div",{className:B(["tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10",c?i.disabled:"",z?i.readOnly:""]),"data-test-id":`${b}-decorator`,children:s}):null,t.jsx("span",{...ve,children:t.jsx(fe,{...a?he:{rows:A},autoComplete:p?"on":"off",disabled:c,id:Fe(F),readOnly:z,ref:n,required:de,defaultValue:I,value:v,placeholder:ie,onBlur:ce,onChange:M,onClick:()=>{var e;return(e=n.current)==null?void 0:e.focus()},onFocus:e=>{me&&e.target.select(),O&&O(e)},onKeyDown:be,"data-test-id":b,className:B([S?"":i.width,A?"":i.height,i.disabled,i.readOnly,i.element,i.base,i.focus,i.hover,ye&&Ae,d!==r.Default&&Ee[d],s?"tw-pl-[2rem]":"",we()]),style:{paddingRight:xe()},...pe})}),t.jsxs("span",{className:B(["tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto",a?"tw-pr-2":"tw-pr-5"]),children:[t.jsx(je,{clearable:u,disabled:D,callbacks:{clearable:ge},dataTestId:b}),l?t.jsx(ke,{actions:l,disabled:D,dataTestId:b}):null,d?ze(d,b):null]})]})};T.displayName="FondueTextarea";T.__docgenInfo={description:"@deprecated",methods:[],displayName:"FondueTextarea",props:{autosize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEnterPressed:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"KeyboardEvent",elements:[{name:"HTMLTextAreaElement"}],raw:"KeyboardEvent<HTMLTextAreaElement>"},name:"event"}],return:{name:"void"}}},description:""},clearable:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},extraActions:{defaultValue:{value:"undefined",computed:!0},required:!1},status:{defaultValue:{value:"Validation.Default",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-textarea'",computed:!1},required:!1}}};const oe=[{icon:t.jsx(Ce,{}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:t.jsx(Te,{}),title:"Help Desk",callback:()=>alert("Here to Help")}],Nt={title:"Components/Textarea",component:T,tags:["autodocs"],argTypes:{autosize:{type:"boolean",description:"If `true`, component rendered is a auto sizing Textarea",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},autocomplete:{type:"boolean",description:"If `true`, Textarea will have `autoComplete` functionality",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},clearable:{type:"boolean",description:"Render `clear` button to clear input on click",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},decorator:{description:"A `ReactElement` that will be rendered at the start of the `Textarea`",table:{type:{summary:"ReactElement | undefined"},defaultValue:{summary:void 0}}},defaultValue:{type:"string",description:"Initial value",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},value:{type:"string",description:"Value set by parent",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},disabled:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},extraActions:{description:"Collection of extra actions the input can preform",table:{type:{summary:"ExtraAction[] | undefined"},defaultValue:{summary:void 0}}},focusOnMount:{type:"boolean",description:"If `true`, Textarea will be focused on mount",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},minRows:{type:"number",description:"If `autosize` is false, this is used as `rows` property for default textarea",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},maxRows:{type:"number",defaultValue:void 0,description:"If `autosize` is false, this property is ignored",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},placeholder:{type:"string",description:"Placeholder text",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},readOnly:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},resizable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},selectable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},status:{control:{type:"select"},options:Object.values(r),defaultValue:r.Default,description:"The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`",table:{type:{summary:"Validation | undefined"},defaultValue:{summary:"Validation.Default"}}},onChange:{action:"onChange",type:"function",description:"Callback function to return current value on the `Textarea`",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onEnterPressed:{action:"onEnterPressed",description:"Callback function to return current value on the `Textarea` when `enter` key id pressed",type:"function",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onKeyDown:{action:"onKeyDown",description:"Callback function that is called on every `keydown` event",type:"function",table:{type:{summary:"((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined"},defaultValue:{summary:void 0}}},onBlur:{action:"onBlur",description:"Callback function that is called when `Textarea` is unfocused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}},onFocus:{action:"onFocus",description:"Callback function that is called when `Textarea` is focused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}}},args:{autosize:!1,autocomplete:!1,clearable:!1,disabled:!1,focusOnMount:!1,readOnly:!1,resizable:!1,selectable:!1,status:r.Default}},f=p=>{const{value:a}=p,[u,s]=m.useState(a??void 0);return m.useEffect(()=>{a&&s(a)},[a,s]),t.jsx(se,{className:"tw-w-[80%] tw-ml-auto tw-mr-auto",children:t.jsx(T,{...p,onChange:s,value:u})})},E=f.bind({}),g=f.bind({});g.args={autosize:!0,decorator:t.jsx(Ve,{})};const h=f.bind({});h.args={defaultValue:"I am some initialized texts to start the input."};const x=f.bind({});x.args={extraActions:oe,placeholder:"Enter some long form text here",clearable:!0};const w=f.bind({});w.args={extraActions:oe,placeholder:"Enter some long form text here",clearable:!0,autosize:!0};const C=f.bind({});C.args={focusOnMount:!0};const V=p=>{const[a,u]=m.useState(void 0),[s,I]=m.useState(void 0),c=160,l=s?s.length:0,y=m.useCallback(()=>{l===0?u(void 0):l>c?u(r.Error):(!a||a===r.Error)&&u(r.Success)},[l,a]),S=F=>{I(F)};return m.useEffect(()=>{y()},[s,y]),t.jsx(se,{className:"tw-w-[80%] tw-ml-auto tw-mr-auto",children:t.jsx(Be,{label:{text:"Label from the FormField",secondaryLabel:`${l}/${c}`},error:a===r.Error,errorText:`Text can not be more than ${c} long.`,helperText:"Please enter a short description of your favorite Fondue component",children:t.jsx(T,{...p,onChange:S,value:s,status:a,autosize:!0})})})};V.__docgenInfo={description:"",methods:[],displayName:"WithFormFieldCombination"};var q,$,W;E.parameters={...E.parameters,docs:{...(q=E.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(W=($=E.parameters)==null?void 0:$.docs)==null?void 0:W.source}}};var L,R,H;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(H=(R=g.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var P,_,K;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(K=(_=h.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var G,Q,U;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(U=(Q=x.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Y,J,X;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(X=(J=w.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,te;C.parameters={...C.parameters,docs:{...(Z=C.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(te=(ee=C.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,ne,re;V.parameters={...V.parameters,docs:{...(ae=V.parameters)==null?void 0:ae.docs,source:{originalSource:`args => {
  const [currentStatus, setCurrentStatus] = useState<Validation | undefined>(undefined);
  const [input, setInput] = useState<string | undefined>(undefined);
  const maxChars = 160;
  const currentChars = input ? input.length : 0;
  const handleValidation = useCallback(() => {
    if (currentChars === 0) {
      setCurrentStatus(undefined);
    } else if (currentChars > maxChars) {
      setCurrentStatus(Validation.Error);
    } else if (!currentStatus || currentStatus === Validation.Error) {
      setCurrentStatus(Validation.Success);
    }
  }, [currentChars, currentStatus]);
  const handleOnChange = (value?: string) => {
    setInput(value);
  };
  useEffect(() => {
    handleValidation();
  }, [input, handleValidation]);
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <FormField label={{
      text: 'Label from the FormField',
      secondaryLabel: \`\${currentChars}/\${maxChars}\`
    }} error={currentStatus === Validation.Error} errorText={\`Text can not be more than \${maxChars} long.\`} helperText="Please enter a short description of your favorite Fondue component">
                <Textarea {...args} onChange={handleOnChange} value={input} status={currentStatus} autosize />
            </FormField>
        </Box>;
}`,...(re=(ne=V.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const Ot=["Default","WithDecoratorAndAutosize","WithDefaultText","WithExtraActions","WithExtraActionsAndAutosize","WithFocusOnMount","WithFormFieldCombination"];export{E as Default,g as WithDecoratorAndAutosize,h as WithDefaultText,x as WithExtraActions,w as WithExtraActionsAndAutosize,C as WithFocusOnMount,V as WithFormFieldCombination,Ot as __namedExportsOrder,Nt as default};
