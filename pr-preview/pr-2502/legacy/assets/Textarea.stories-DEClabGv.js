import{r as m,j as a}from"./iframe-MoBs3oke.js";import{a as se}from"./Box-BBpNHmR5.js";import{c as Te}from"./TextInput-Yo756f2e.js";import{I as Ce}from"./IconNook16-NKI9jeCA.js";import{I as Ve}from"./IconQuestionMark16-BIGaRgJ9.js";import{v as Ee,V as s}from"./validation-C9S5KgfE.js";import{$ as Ie}from"./useFocusRing-2zpbRi_h.js";import{i as Se}from"./react-textarea-autosize.browser.esm-DEbVsQRJ.js";import{u as Fe}from"./useMemoizedId-IOJoatZ5.js";import{a as Ae}from"./focusStyle-Ch_WJ4aJ.js";import{I as i,G as ze,a as je,b as ke}from"./input-Vnz1g2HA.js";import{m as B}from"./merge-DI-veSMP.js";import{u as De}from"./Button-CHSQ5G04.js";import{F as Be}from"./FormField-BuDiHaeO.js";import"./preload-helper-B933Jwna.js";import"./borderStyle-D9jrV09G.js";import"./LoadingCircle-CeR8qJR0.js";import"./IconCheckMark-Dq94ZI-W.js";import"./IconSize-BcCrF_mi.js";import"./IconCross-Drpj3pyS.js";import"./IconExclamationMarkTriangle-Q8ertc4w.js";import"./IconExclamationMarkTriangle24-B9dRqTTK.js";import"./LegacyTooltip--XkvheMY.js";import"./useLink-BCZ4_2_m.js";import"./useFocusable-CXK0fL0G.js";import"./chain-bxVqvEcS.js";import"./useEffectEvent-B10gOIRQ.js";import"./index-XNeqmIYg.js";import"./usePopper-BG1lwv8D.js";import"./index-DaGbxSuI.js";import"./Portal-DqGP2ziF.js";import"./IconExclamationMarkCircle24-sI7DpcuD.js";import"./DialogBody-B9R5tIxS.js";import"./dialog-D9O7a7Fm.js";import"./Divider-BiSgeS5Z.js";import"./Dropdown-BZzjCJXd.js";import"./useButton-C5tY8d-2.js";import"./FocusScope-AHMkJDTf.js";import"./useOverlayTriggerState-CBCaqV4y.js";import"./useControlledState-BMEIdEBn.js";import"./useMenuTrigger-Cfg04eQV.js";import"./useLabels-DVbtlKZe.js";import"./useLocalizedStringFormatter-CkHgGyi4.js";import"./context-DuKYVhKu.js";import"./VisuallyHidden-DQNXk2fv.js";import"./helper-BqzIPBnA.js";import"./keyboard-Bh-3d-67.js";import"./SelectionManager-BeylGFv3.js";import"./useField-URXo4TDX.js";import"./useFormValidationState-iA7Vh-Q-.js";import"./MenuItem-DHR5LbTg.js";import"./IconCaretRight-BNCvjaUk.js";import"./elements-BOYmskOL.js";import"./Trigger-CtQV1a50.js";import"./IconCaretDown-KuloZ5wo.js";import"./IconCaretDown16-Bd0YWETo.js";import"./IconTrashBin16-DW5TDvsW.js";import"./IconTrashBin24-M6xuWU20.js";import"./EnablePortalWrapper-qB3CI-P9.js";import"./FormControl-CesNQFPy.js";import"./InputLabel-CXvfWDQS.js";import"./TooltipIcon-Dt5djrIf.js";import"./IconQuestionMarkCircle-Bm_G3GHX.js";import"./Switch-B69oNbL0.js";import"./TabItem-BL2HOdhs.js";import"./Tooltip-B25CwDsd.js";import"./useClickOutside-XWlSsuBV.js";import"./Tree-C4Hqtk5X.js";import"./_Uint8Array-CwPxMkg2.js";const V=({autocomplete:p,autosize:n=!1,clearable:u=!1,decorator:o,defaultValue:I,disabled:c=!1,extraActions:l=void 0,focusOnMount:y=!1,hugWidth:S,id:F,minRows:A,maxRows:ue,placeholder:ie,readOnly:z,resizable:le=!1,required:de,selectable:me=!1,status:d=s.Default,value:v,onBlur:ce,onChange:j,onEnterPressed:N,onKeyDown:k,onFocus:O,"data-test-id":b="fondue-textarea",...pe})=>{const fe=n?Se:"textarea",r=De(null),D=c||z,{isFocusVisible:ye,focusProps:ve}=Ie({isTextInput:!0,within:!0}),M=()=>{if(r.current){const{value:e}=r.current;j==null||j(e)}},be=e=>{var t;N&&e.key==="Enter"?N((t=r.current)==null?void 0:t.value):k==null||k(e)},he=()=>{r.current&&(r.current.value="",M())};m.useEffect(()=>{if(y){const e=setTimeout(()=>{var t;(t=r.current)==null||t.focus()},0);return()=>clearTimeout(e)}},[y,r]),m.useEffect(()=>{var t;const e=v!==((t=r.current)==null?void 0:t.value);r.current&&v&&!e&&(r.current.value=v)},[v,r]);const xe={minRows:A,maxRows:ue},ge=()=>{let e=1;const t=l?l.length:0;switch(!0){case(t>0&&u&&d!==s.Default):return e=t+4.5,`${e}rem`;case(t>0&&(u||d!==s.Default)):return e=t+3,`${e}rem`;case t>0:return e+=t*1.5,`${e}rem`;case(u&&d!==s.Default):return"3.5rem";case(d!==s.Default||u):return"2.5rem";default:return e}},we=()=>!D&&le?"tw-resize-y":"tw-resize-none";return a.jsxs("div",{className:"tw-relative",children:[o?a.jsx("div",{className:B(["tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10",c?i.disabled:"",z?i.readOnly:""]),"data-test-id":`${b}-decorator`,children:o}):null,a.jsx("span",{...ve,children:a.jsx(fe,{...n?xe:{rows:A},autoComplete:p?"on":"off",disabled:c,id:Fe(F),readOnly:z,ref:r,required:de,defaultValue:I,value:v,placeholder:ie,onBlur:ce,onChange:M,onClick:()=>{var e;return(e=r.current)==null?void 0:e.focus()},onFocus:e=>{me&&e.target.select(),O&&O(e)},onKeyDown:be,"data-test-id":b,className:B([S?"":i.width,A?"":i.height,i.disabled,i.readOnly,i.element,i.base,i.focus,i.hover,ye&&Ae,d!==s.Default&&Ee[d],o?"tw-pl-[2rem]":"",we()]),style:{paddingRight:ge()},...pe})}),a.jsxs("span",{className:B(["tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto",n?"tw-pr-2":"tw-pr-5"]),children:[a.jsx(je,{clearable:u,disabled:D,callbacks:{clearable:he},dataTestId:b}),l?a.jsx(ke,{actions:l,disabled:D,dataTestId:b}):null,d?ze(d,b):null]})]})};V.displayName="FondueTextarea";V.__docgenInfo={description:"@deprecated Please use updated Textarea component from `@frontify/fondue/components` instead.",methods:[],displayName:"FondueTextarea",props:{autosize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEnterPressed:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"KeyboardEvent",elements:[{name:"HTMLTextAreaElement"}],raw:"KeyboardEvent<HTMLTextAreaElement>"},name:"event"}],return:{name:"void"}}},description:""},clearable:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},extraActions:{defaultValue:{value:"undefined",computed:!0},required:!1},status:{defaultValue:{value:"Validation.Default",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-textarea'",computed:!1},required:!1}}};const oe=[{icon:a.jsx(Te,{}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:a.jsx(Ve,{}),title:"Help Desk",callback:()=>alert("Here to Help")}],Yt={title:"Components/Textarea",component:V,tags:["autodocs"],argTypes:{autosize:{type:"boolean",description:"If `true`, component rendered is a auto sizing Textarea",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},autocomplete:{type:"boolean",description:"If `true`, Textarea will have `autoComplete` functionality",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},clearable:{type:"boolean",description:"Render `clear` button to clear input on click",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},decorator:{description:"A `ReactElement` that will be rendered at the start of the `Textarea`",table:{type:{summary:"ReactElement | undefined"},defaultValue:{summary:void 0}}},defaultValue:{type:"string",description:"Initial value",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},value:{type:"string",description:"Value set by parent",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},disabled:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},extraActions:{description:"Collection of extra actions the input can preform",table:{type:{summary:"ExtraAction[] | undefined"},defaultValue:{summary:void 0}}},focusOnMount:{type:"boolean",description:"If `true`, Textarea will be focused on mount",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},minRows:{type:"number",description:"If `autosize` is false, this is used as `rows` property for default textarea",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},maxRows:{type:"number",defaultValue:void 0,description:"If `autosize` is false, this property is ignored",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},placeholder:{type:"string",description:"Placeholder text",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},readOnly:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},resizable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},selectable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},status:{control:{type:"select"},options:Object.values(s),defaultValue:s.Default,description:"The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`",table:{type:{summary:"Validation | undefined"},defaultValue:{summary:"Validation.Default"}}},onChange:{action:"onChange",type:"function",description:"Callback function to return current value on the `Textarea`",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onEnterPressed:{action:"onEnterPressed",description:"Callback function to return current value on the `Textarea` when `enter` key id pressed",type:"function",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onKeyDown:{action:"onKeyDown",description:"Callback function that is called on every `keydown` event",type:"function",table:{type:{summary:"((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined"},defaultValue:{summary:void 0}}},onBlur:{action:"onBlur",description:"Callback function that is called when `Textarea` is unfocused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}},onFocus:{action:"onFocus",description:"Callback function that is called when `Textarea` is focused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}}},args:{autosize:!1,autocomplete:!1,clearable:!1,disabled:!1,focusOnMount:!1,readOnly:!1,resizable:!1,selectable:!1,status:s.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Textarea component](/docs/current_components-textarea--documentation) instead."}}}},f=p=>{const{value:n}=p,[u,o]=m.useState(n??void 0);return m.useEffect(()=>{n&&o(n)},[n,o]),a.jsx(se,{className:"tw-w-4/5 tw-ml-auto tw-mr-auto",children:a.jsx(V,{...p,onChange:o,value:u})})},E=f.bind({}),h=f.bind({});h.args={autosize:!0,decorator:a.jsx(Ce,{})};const x=f.bind({});x.args={defaultValue:"I am some initialized texts to start the input."};const g=f.bind({});g.args={extraActions:oe,placeholder:"Enter some long form text here",clearable:!0};const w=f.bind({});w.args={extraActions:oe,placeholder:"Enter some long form text here",clearable:!0,autosize:!0};const T=f.bind({});T.args={focusOnMount:!0};const C=p=>{const[n,u]=m.useState(void 0),[o,I]=m.useState(void 0),c=160,l=o?o.length:0,y=m.useCallback(()=>{l===0?u(void 0):l>c?u(s.Error):(!n||n===s.Error)&&u(s.Success)},[l,n]),S=F=>{I(F)};return m.useEffect(()=>{y()},[o,y]),a.jsx(se,{className:"tw-w-4/5 tw-ml-auto tw-mr-auto",children:a.jsx(Be,{label:{text:"Label from the FormField",secondaryLabel:`${l}/${c}`},error:n===s.Error,errorText:`Text can not be more than ${c} long.`,helperText:"Please enter a short description of your favorite Fondue component",children:a.jsx(V,{...p,onChange:S,value:o,status:n,autosize:!0})})})};C.__docgenInfo={description:"",methods:[],displayName:"WithFormFieldCombination"};var q,$,W;E.parameters={...E.parameters,docs:{...(q=E.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(W=($=E.parameters)==null?void 0:$.docs)==null?void 0:W.source}}};var L,R,H;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(H=(R=h.parameters)==null?void 0:R.docs)==null?void 0:H.source}}};var P,_,K;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(K=(_=x.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var G,Q,U;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(U=(Q=g.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Y,J,X;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(X=(J=w.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var Z,ee,te;T.parameters={...T.parameters,docs:{...(Z=T.parameters)==null?void 0:Z.docs,source:{originalSource:`args => {
  const {
    value
  } = args;
  const [input, setInput] = useState<string | undefined>(value ?? undefined);
  useEffect(() => {
    if (value) {
      setInput(value);
    }
  }, [value, setInput]);
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(te=(ee=T.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,ne,re;C.parameters={...C.parameters,docs:{...(ae=C.parameters)==null?void 0:ae.docs,source:{originalSource:`args => {
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
  return <Box className="tw-w-4/5 tw-ml-auto tw-mr-auto">
            <FormField label={{
      text: 'Label from the FormField',
      secondaryLabel: \`\${currentChars}/\${maxChars}\`
    }} error={currentStatus === Validation.Error} errorText={\`Text can not be more than \${maxChars} long.\`} helperText="Please enter a short description of your favorite Fondue component">
                <Textarea {...args} onChange={handleOnChange} value={input} status={currentStatus} autosize />
            </FormField>
        </Box>;
}`,...(re=(ne=C.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const Jt=["Default","WithDecoratorAndAutosize","WithDefaultText","WithExtraActions","WithExtraActionsAndAutosize","WithFocusOnMount","WithFormFieldCombination"];export{E as Default,h as WithDecoratorAndAutosize,x as WithDefaultText,g as WithExtraActions,w as WithExtraActionsAndAutosize,T as WithFocusOnMount,C as WithFormFieldCombination,Jt as __namedExportsOrder,Yt as default};
