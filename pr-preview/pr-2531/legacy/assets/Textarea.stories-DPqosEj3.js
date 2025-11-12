import{r as c,j as a}from"./iframe-Dtv_d4MA.js";import{a as se}from"./Box-DCbtbvtw.js";import{F as Te}from"./FormField-C8X2jyqV.js";import{c as Ce}from"./TextInput-BXSd55Uz.js";import{I as Ve}from"./IconNook16-WrV0aX_7.js";import{I as Ee}from"./IconQuestionMark16-S62qKhEB.js";import{v as Ie,V as s}from"./validation-C9S5KgfE.js";import{$ as Se}from"./useFocusRing-2TK22Yzc.js";import{i as Fe}from"./react-textarea-autosize.browser.esm-CZlOOSrQ.js";import{u as Ae}from"./useMemoizedId-EsADRd1i.js";import{a as ze}from"./focusStyle-Ch_WJ4aJ.js";import{I as i,G as je,a as ke,b as De}from"./input-R4YNlsPt.js";import{m as B}from"./merge-DI-veSMP.js";import{u as Be}from"./Button-AhiRq03v.js";import"./preload-helper-CG1F6kIz.js";import"./borderStyle-D9jrV09G.js";import"./VisuallyHidden-Die1uAz3.js";import"./useFocusable-ChmdYu_U.js";import"./chain-BK5lgvFT.js";import"./useEffectEvent-BhMP4fDQ.js";import"./index-QsOm0Z73.js";import"./Tooltip-wXNz05mk.js";import"./useClickOutside-CfIem1tQ.js";import"./usePopper-CXXgD1zG.js";import"./index-DIZXDwSI.js";import"./EnablePortalWrapper-5yA4SmAn.js";import"./Portal-C4NeOveZ.js";import"./elements-BOYmskOL.js";import"./dialog-D9O7a7Fm.js";import"./LoadingCircle-Bh1tzUUj.js";import"./IconCheckMark-CEjGYX8V.js";import"./IconSize-BcCrF_mi.js";import"./IconCross-C7dBWIsm.js";import"./IconExclamationMarkTriangle-DCk5u_fB.js";import"./IconExclamationMarkTriangle24-CNF0uGCC.js";import"./LegacyTooltip-BdDs6s_5.js";import"./useLink-CMU7b8Lj.js";import"./IconExclamationMarkCircle24-B5XLZaDh.js";import"./Divider-CKoslmaP.js";import"./FormControl-CPJhbF1h.js";import"./InputLabel-DP0y05V2.js";import"./TooltipIcon-CZeG-wrX.js";import"./IconQuestionMarkCircle-C9gk7KDs.js";import"./Switch-Dd7mJo-Q.js";import"./TabItem-D7puLzXF.js";import"./Tree-DjhLfOhm.js";import"./_Uint8Array-CwPxMkg2.js";import"./Trigger-AKpq8hpJ.js";import"./IconCaretDown-jzEnFqOW.js";import"./IconCaretDown16-DnTz79r-.js";import"./IconTrashBin16-BHhG90S7.js";import"./IconTrashBin24-BGGW-9GF.js";import"./useButton-CmB1QZWu.js";const V=({autocomplete:p,autosize:n=!1,clearable:u=!1,decorator:o,defaultValue:I,disabled:m=!1,extraActions:l=void 0,focusOnMount:y=!1,hugWidth:S,id:F,minRows:A,maxRows:ue,placeholder:ie,readOnly:z,resizable:le=!1,required:de,selectable:ce=!1,status:d=s.Default,value:v,onBlur:me,onChange:j,onEnterPressed:N,onKeyDown:k,onFocus:O,"data-test-id":b="fondue-textarea",...pe})=>{const fe=n?Fe:"textarea",r=Be(null),D=m||z,{isFocusVisible:ye,focusProps:ve}=Se({isTextInput:!0,within:!0}),M=()=>{if(r.current){const{value:e}=r.current;j==null||j(e)}},be=e=>{var t;N&&e.key==="Enter"?N((t=r.current)==null?void 0:t.value):k==null||k(e)},he=()=>{r.current&&(r.current.value="",M())};c.useEffect(()=>{if(y){const e=setTimeout(()=>{var t;(t=r.current)==null||t.focus()},0);return()=>clearTimeout(e)}},[y,r]),c.useEffect(()=>{var t;const e=v!==((t=r.current)==null?void 0:t.value);r.current&&v&&!e&&(r.current.value=v)},[v,r]);const xe={minRows:A,maxRows:ue},ge=()=>{let e=1;const t=l?l.length:0;switch(!0){case(t>0&&u&&d!==s.Default):return e=t+4.5,`${e}rem`;case(t>0&&(u||d!==s.Default)):return e=t+3,`${e}rem`;case t>0:return e+=t*1.5,`${e}rem`;case(u&&d!==s.Default):return"3.5rem";case(d!==s.Default||u):return"2.5rem";default:return e}},we=()=>!D&&le?"tw-resize-y":"tw-resize-none";return a.jsxs("div",{className:"tw-relative",children:[o?a.jsx("div",{className:B(["tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10",m?i.disabled:"",z?i.readOnly:""]),"data-test-id":`${b}-decorator`,children:o}):null,a.jsx("span",{...ve,children:a.jsx(fe,{...n?xe:{rows:A},autoComplete:p?"on":"off",disabled:m,id:Ae(F),readOnly:z,ref:r,required:de,defaultValue:I,value:v,placeholder:ie,onBlur:me,onChange:M,onClick:()=>{var e;return(e=r.current)==null?void 0:e.focus()},onFocus:e=>{ce&&e.target.select(),O&&O(e)},onKeyDown:be,"data-test-id":b,className:B([S?"":i.width,A?"":i.height,i.disabled,i.readOnly,i.element,i.base,i.focus,i.hover,ye&&ze,d!==s.Default&&Ie[d],o?"tw-pl-[2rem]":"",we()]),style:{paddingRight:ge()},...pe})}),a.jsxs("span",{className:B(["tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto",n?"tw-pr-2":"tw-pr-5"]),children:[a.jsx(ke,{clearable:u,disabled:D,callbacks:{clearable:he},dataTestId:b}),l?a.jsx(De,{actions:l,disabled:D,dataTestId:b}):null,d?je(d,b):null]})]})};V.displayName="FondueTextarea";V.__docgenInfo={description:"@deprecated Please use updated Textarea component from `@frontify/fondue/components` instead.",methods:[],displayName:"FondueTextarea",props:{autosize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEnterPressed:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"KeyboardEvent",elements:[{name:"HTMLTextAreaElement"}],raw:"KeyboardEvent<HTMLTextAreaElement>"},name:"event"}],return:{name:"void"}}},description:""},clearable:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},extraActions:{defaultValue:{value:"undefined",computed:!0},required:!1},status:{defaultValue:{value:"Validation.Default",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-textarea'",computed:!1},required:!1}}};const oe=[{icon:a.jsx(Ce,{}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:a.jsx(Ee,{}),title:"Help Desk",callback:()=>alert("Here to Help")}],Bt={title:"Components/Textarea",component:V,tags:["autodocs"],argTypes:{autosize:{type:"boolean",description:"If `true`, component rendered is a auto sizing Textarea",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},autocomplete:{type:"boolean",description:"If `true`, Textarea will have `autoComplete` functionality",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},clearable:{type:"boolean",description:"Render `clear` button to clear input on click",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},decorator:{description:"A `ReactElement` that will be rendered at the start of the `Textarea`",table:{type:{summary:"ReactElement | undefined"},defaultValue:{summary:void 0}}},defaultValue:{type:"string",description:"Initial value",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},value:{type:"string",description:"Value set by parent",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},disabled:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},extraActions:{description:"Collection of extra actions the input can preform",table:{type:{summary:"ExtraAction[] | undefined"},defaultValue:{summary:void 0}}},focusOnMount:{type:"boolean",description:"If `true`, Textarea will be focused on mount",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},minRows:{type:"number",description:"If `autosize` is false, this is used as `rows` property for default textarea",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},maxRows:{type:"number",defaultValue:void 0,description:"If `autosize` is false, this property is ignored",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},placeholder:{type:"string",description:"Placeholder text",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},readOnly:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},resizable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},selectable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},status:{control:{type:"select"},options:Object.values(s),defaultValue:s.Default,description:"The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`",table:{type:{summary:"Validation | undefined"},defaultValue:{summary:"Validation.Default"}}},onChange:{action:"onChange",type:"function",description:"Callback function to return current value on the `Textarea`",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onEnterPressed:{action:"onEnterPressed",description:"Callback function to return current value on the `Textarea` when `enter` key id pressed",type:"function",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onKeyDown:{action:"onKeyDown",description:"Callback function that is called on every `keydown` event",type:"function",table:{type:{summary:"((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined"},defaultValue:{summary:void 0}}},onBlur:{action:"onBlur",description:"Callback function that is called when `Textarea` is unfocused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}},onFocus:{action:"onFocus",description:"Callback function that is called when `Textarea` is focused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}}},args:{autosize:!1,autocomplete:!1,clearable:!1,disabled:!1,focusOnMount:!1,readOnly:!1,resizable:!1,selectable:!1,status:s.Default},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new Textarea component](/docs/current_components-textarea--documentation) instead."}}}},f=p=>{const{value:n}=p,[u,o]=c.useState(n??void 0);return c.useEffect(()=>{n&&o(n)},[n,o]),a.jsx(se,{className:"tw-w-4/5 tw-ml-auto tw-mr-auto",children:a.jsx(V,{...p,onChange:o,value:u})})},E=f.bind({}),h=f.bind({});h.args={autosize:!0,decorator:a.jsx(Ve,{})};const x=f.bind({});x.args={defaultValue:"I am some initialized texts to start the input."};const g=f.bind({});g.args={extraActions:oe,placeholder:"Enter some long form text here",clearable:!0};const w=f.bind({});w.args={extraActions:oe,placeholder:"Enter some long form text here",clearable:!0,autosize:!0};const T=f.bind({});T.args={focusOnMount:!0};const C=p=>{const[n,u]=c.useState(void 0),[o,I]=c.useState(void 0),m=160,l=o?o.length:0,y=c.useCallback(()=>{l===0?u(void 0):l>m?u(s.Error):(!n||n===s.Error)&&u(s.Success)},[l,n]),S=F=>{I(F)};return c.useEffect(()=>{y()},[o,y]),a.jsx(se,{className:"tw-w-4/5 tw-ml-auto tw-mr-auto",children:a.jsx(Te,{label:{text:"Label from the FormField",secondaryLabel:`${l}/${m}`},error:n===s.Error,errorText:`Text can not be more than ${m} long.`,helperText:"Please enter a short description of your favorite Fondue component",children:a.jsx(V,{...p,onChange:S,value:o,status:n,autosize:!0})})})};C.__docgenInfo={description:"",methods:[],displayName:"WithFormFieldCombination"};var q,$,W;E.parameters={...E.parameters,docs:{...(q=E.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
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
}`,...(re=(ne=C.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const Nt=["Default","WithDecoratorAndAutosize","WithDefaultText","WithExtraActions","WithExtraActionsAndAutosize","WithFocusOnMount","WithFormFieldCombination"];export{E as Default,h as WithDecoratorAndAutosize,x as WithDefaultText,g as WithExtraActions,w as WithExtraActionsAndAutosize,T as WithFocusOnMount,C as WithFormFieldCombination,Nt as __namedExportsOrder,Bt as default};
