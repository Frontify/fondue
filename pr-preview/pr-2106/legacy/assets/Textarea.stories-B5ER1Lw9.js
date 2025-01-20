import{j as t}from"./jsx-runtime-BvI67ttx.js";import{r as m}from"./index-BEEaWAwe.js";import{B as se}from"./Box-CO2lKc8E.js";import{c as Ce}from"./TextInput-DrA2OM1M.js";import{I as Ve}from"./IconNook16-HhuTFTlu.js";import{I as Te}from"./IconQuestionMark16-DAVO2kAy.js";import{V as r,a as Ee}from"./validation-CJXPAjNB.js";import{$ as Ie}from"./useFocusRing-BuOUPy6p.js";import{i as Se}from"./react-textarea-autosize.browser.esm-DT8tSDoV.js";import{u as Fe}from"./useMemoizedId-P52koD2W.js";import{F as Ae}from"./focusStyle-CBFElZiz.js";import{a as i,I as ze,b as je,G as ke}from"./input-92Tvgqoy.js";import{m as B}from"./merge-DI-veSMP.js";import{u as De}from"./Button-ljOzJNbm.js";import{F as Be}from"./FormField-x2UU44ZC.js";import"./_commonjsHelpers-BosuxZz1.js";import"./borderStyle-D9jrV09G.js";import"./LoadingCircle-CLFuk3gJ.js";import"./IconCheckMark-CEVoSHhf.js";import"./IconSize-BcCrF_mi.js";import"./IconCross-B3GiP1Si.js";import"./IconExclamationMarkTriangle-BoexdZ5m.js";import"./IconExclamationMarkTriangle24-DY2uQ5A6.js";import"./LegacyTooltip-BC90iaVE.js";import"./useLink-CGrBbYMo.js";import"./useFocusable-DySem7st.js";import"./chain-Ck9CKbau.js";import"./SSRProvider-4hSGecE0.js";import"./usePopper-CHIbWn6Y.js";import"./index-CJX6plO5.js";import"./index-CfyPTyT-.js";import"./Portal-BFAtGiKe.js";import"./IconExclamationMarkCircle24-BbewMLoq.js";import"./Divider-BeD6tjm6.js";import"./FormControl-B09RM8pa.js";import"./InputLabel-BUzvczwB.js";import"./TooltipIcon-DeJsuRhr.js";import"./IconQuestionMarkCircle-DJ6cviju.js";import"./SegmentedControls-Btv1r2cE.js";import"./useFormValidationState-Cm7EQ7so.js";import"./FocusScope-CqItlJEB.js";import"./useField-Dc7XGbIY.js";import"./useLabels-D_OVlzwR.js";import"./context-DXnD6xbD.js";import"./VisuallyHidden-DdU2rIcI.js";import"./useControlledState-C1JYnvfk.js";import"./motion-B4glEiOI.js";import"./Switch-DqoPz_HL.js";import"./TabItem-CrQZ7sux.js";import"./elements-BOYmskOL.js";import"./Tooltip-Cke8RYXd.js";import"./useClickOutside-CKZcS6rn.js";import"./EnablePortalWrapper-CBs6EJfs.js";import"./dialog-Dre1eVQK.js";import"./Tree-DPjJ38dQ.js";import"./immer-DpFkcGey.js";import"./Trigger-DM6leiPg.js";import"./IconCaretDown-DO73XlJq.js";import"./IconCaretDown16-D1ph0gFc.js";import"./IconTrashBin16-CVizQs9b.js";import"./IconTrashBin24-D97dm6YN.js";import"./useButton-CGbfYaYu.js";const T=({autocomplete:p,autosize:a=!1,clearable:o=!1,decorator:s,defaultValue:I,disabled:c=!1,extraActions:l=void 0,focusOnMount:y=!1,hugWidth:S,id:F,minRows:A,maxRows:oe,placeholder:ie,readOnly:z,resizable:le=!1,required:de,selectable:me=!1,status:d=r.Default,value:b,onBlur:ce,onChange:j,onEnterPressed:N,onKeyDown:k,onFocus:O,"data-test-id":g="fondue-textarea",...pe})=>{const fe=a?Se:"textarea",n=De(null),D=c||z,{isFocusVisible:ye,focusProps:be}=Ie({isTextInput:!0,within:!0}),M=()=>{if(n.current){const{value:e}=n.current;j==null||j(e)}},ge=e=>{var u;N&&e.key==="Enter"?N((u=n.current)==null?void 0:u.value):k==null||k(e)},he=()=>{n.current&&(n.current.value="",M())};m.useEffect(()=>{var e;y&&((e=n.current)==null||e.focus())},[y,n]),m.useEffect(()=>{var u;const e=b!==((u=n.current)==null?void 0:u.value);n.current&&b&&!e&&(n.current.value=b)},[b,n]);const xe={minRows:A,maxRows:oe},ve=()=>{let e=1;const u=l?l.length:0;switch(!0){case(u>0&&o&&d!==r.Default):return e=u+4.5,`${e}rem`;case(u>0&&(o||d!==r.Default)):return e=u+3,`${e}rem`;case u>0:return e+=u*1.5,`${e}rem`;case(o&&d!==r.Default):return"3.5rem";case(d!==r.Default||o):return"2.5rem";default:return e}},we=()=>!D&&le?"tw-resize-y":"tw-resize-none";return t.jsxs("div",{className:"tw-relative",children:[s?t.jsx("div",{className:B(["tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10",c?i.disabled:"",z?i.readOnly:""]),"data-test-id":`${g}-decorator`,children:s}):null,t.jsx("span",{...be,children:t.jsx(fe,{...a?xe:{rows:A},autoComplete:p?"on":"off",disabled:c,id:Fe(F),readOnly:z,ref:n,required:de,defaultValue:I,value:b,placeholder:ie,onBlur:ce,onChange:M,onClick:()=>{var e;return(e=n.current)==null?void 0:e.focus()},onFocus:e=>{me&&e.target.select(),O&&O(e)},onKeyDown:ge,"data-test-id":g,className:B([S?"":i.width,A?"":i.height,i.disabled,i.readOnly,i.element,i.base,i.focus,i.hover,ye&&Ae,d!==r.Default&&Ee[d],s?"tw-pl-[2rem]":"",we()]),style:{paddingRight:ve()},...pe})}),t.jsxs("span",{className:B(["tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto",a?"tw-pr-2":"tw-pr-5"]),children:[t.jsx(ze,{clearable:o,disabled:D,callbacks:{clearable:he},dataTestId:g}),l?t.jsx(je,{actions:l,disabled:D,dataTestId:g}):null,d?ke(d,g):null]})]})};T.displayName="FondueTextarea";T.__docgenInfo={description:"",methods:[],displayName:"FondueTextarea",props:{autosize:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},focusOnMount:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},resizable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},selectable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},defaultValue:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onEnterPressed:{required:!1,tsType:{name:"signature",type:"function",raw:"(value?: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onKeyDown:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: KeyboardEvent<HTMLTextAreaElement>) => void",signature:{arguments:[{type:{name:"KeyboardEvent",elements:[{name:"HTMLTextAreaElement"}],raw:"KeyboardEvent<HTMLTextAreaElement>"},name:"event"}],return:{name:"void"}}},description:""},clearable:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},extraActions:{defaultValue:{value:"undefined",computed:!0},required:!1},status:{defaultValue:{value:"Validation.Default",computed:!0},required:!1},"data-test-id":{defaultValue:{value:"'fondue-textarea'",computed:!1},required:!1}}};const ue=[{icon:t.jsx(Ce,{}),title:"Save to Clipboard",callback:()=>{alert("Mock Copied to Clipboard")}},{icon:t.jsx(Te,{}),title:"Help Desk",callback:()=>alert("Here to Help")}],Ht={title:"Components/Textarea",component:T,tags:["autodocs"],argTypes:{autosize:{type:"boolean",description:"If `true`, component rendered is a auto sizing Textarea",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},autocomplete:{type:"boolean",description:"If `true`, Textarea will have `autoComplete` functionality",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},clearable:{type:"boolean",description:"Render `clear` button to clear input on click",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},decorator:{description:"A `ReactElement` that will be rendered at the start of the `Textarea`",table:{type:{summary:"ReactElement | undefined"},defaultValue:{summary:void 0}}},defaultValue:{type:"string",description:"Initial value",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},value:{type:"string",description:"Value set by parent",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},disabled:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},extraActions:{description:"Collection of extra actions the input can preform",table:{type:{summary:"ExtraAction[] | undefined"},defaultValue:{summary:void 0}}},focusOnMount:{type:"boolean",description:"If `true`, Textarea will be focused on mount",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},minRows:{type:"number",description:"If `autosize` is false, this is used as `rows` property for default textarea",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},maxRows:{type:"number",defaultValue:void 0,description:"If `autosize` is false, this property is ignored",table:{type:{summary:"number | undefined"},defaultValue:{summary:void 0}}},placeholder:{type:"string",description:"Placeholder text",table:{type:{summary:"string | undefined"},defaultValue:{summary:void 0}}},readOnly:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},resizable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},selectable:{type:"boolean",table:{type:{summary:"boolean | undefined"},defaultValue:{summary:!1}}},status:{control:{type:"select"},options:Object.values(r),defaultValue:r.Default,description:"The current `Validation` status of the input and will trigger the corresponding `icon` to be appended to the `Textarea`",table:{type:{summary:"Validation | undefined"},defaultValue:{summary:"Validation.Default"}}},onChange:{action:"onChange",type:"function",description:"Callback function to return current value on the `Textarea`",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onEnterPressed:{action:"onEnterPressed",description:"Callback function to return current value on the `Textarea` when `enter` key id pressed",type:"function",table:{type:{summary:"((value: string) => void) | undefined"},defaultValue:{summary:void 0}}},onKeyDown:{action:"onKeyDown",description:"Callback function that is called on every `keydown` event",type:"function",table:{type:{summary:"((event: KeyboardEvent<HTMLTextAreaElement>) => void) | undefined"},defaultValue:{summary:void 0}}},onBlur:{action:"onBlur",description:"Callback function that is called when `Textarea` is unfocused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}},onFocus:{action:"onFocus",description:"Callback function that is called when `Textarea` is focused",type:"function",table:{type:{summary:"((event: FocusEvent<HTMLTextAreaElement, Element>) => void) | undefined"},defaultValue:{summary:void 0}}}},args:{autosize:!1,autocomplete:!1,clearable:!1,disabled:!1,focusOnMount:!1,readOnly:!1,resizable:!1,selectable:!1,status:r.Default}},f=p=>{const{value:a}=p,[o,s]=m.useState(a??void 0);return m.useEffect(()=>{a&&s(a)},[a,s]),t.jsx(se,{className:"tw-w-[80%] tw-ml-auto tw-mr-auto",children:t.jsx(T,{...p,onChange:s,value:o})})},E=f.bind({}),h=f.bind({});h.args={autosize:!0,decorator:t.jsx(Ve,{})};const x=f.bind({});x.args={defaultValue:"I am some initialized texts to start the input."};const v=f.bind({});v.args={extraActions:ue,placeholder:"Enter some long form text here",clearable:!0};const w=f.bind({});w.args={extraActions:ue,placeholder:"Enter some long form text here",clearable:!0,autosize:!0};const C=f.bind({});C.args={focusOnMount:!0};const V=p=>{const[a,o]=m.useState(void 0),[s,I]=m.useState(void 0),c=160,l=s?s.length:0,y=m.useCallback(()=>{l===0?o(void 0):l>c?o(r.Error):(!a||a===r.Error)&&o(r.Success)},[l,a]),S=F=>{I(F)};return m.useEffect(()=>{y()},[s,y]),t.jsx(se,{className:"tw-w-[80%] tw-ml-auto tw-mr-auto",children:t.jsx(Be,{label:{text:"Label from the FormField",secondaryLabel:`${l}/${c}`},error:a===r.Error,errorText:`Text can not be more than ${c} long.`,helperText:"Please enter a short description of your favorite Fondue component",children:t.jsx(T,{...p,onChange:S,value:s,status:a,autosize:!0})})})};V.__docgenInfo={description:"",methods:[],displayName:"WithFormFieldCombination"};var q,$,W;E.parameters={...E.parameters,docs:{...(q=E.parameters)==null?void 0:q.docs,source:{originalSource:`args => {
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
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
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
  return <Box className="tw-w-[80%] tw-ml-auto tw-mr-auto">
            <Textarea {...args} onChange={setInput} value={input} />
        </Box>;
}`,...(K=(_=x.parameters)==null?void 0:_.docs)==null?void 0:K.source}}};var G,Q,U;v.parameters={...v.parameters,docs:{...(G=v.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
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
}`,...(U=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var Y,J,X;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`args => {
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
}`,...(re=(ne=V.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const Pt=["Default","WithDecoratorAndAutosize","WithDefaultText","WithExtraActions","WithExtraActionsAndAutosize","WithFocusOnMount","WithFormFieldCombination"];export{E as Default,h as WithDecoratorAndAutosize,x as WithDefaultText,v as WithExtraActions,w as WithExtraActionsAndAutosize,C as WithFocusOnMount,V as WithFormFieldCombination,Pt as __namedExportsOrder,Ht as default};
