import{j as t}from"./jsx-runtime-BvI67ttx.js";import{a as F}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{r as y}from"./index-BEEaWAwe.js";import{I as i}from"./IconIcon-DMQgkJQa.js";import{I as Ie}from"./IconSize-BcCrF_mi.js";import{V as P}from"./validation-CJXPAjNB.js";import{T as he,b as T}from"./TextInput-DrA2OM1M.js";import{F as fe}from"./FormField-x2UU44ZC.js";import"./v4-CtRu48qb.js";import"./_commonjsHelpers-BosuxZz1.js";import"./IconIcon16-B0_LKJAk.js";import"./IconIcon24-DonKW8BD.js";import"./useFocusRing-BuOUPy6p.js";import"./SSRProvider-4hSGecE0.js";import"./LoadingCircle-CLFuk3gJ.js";import"./merge-DI-veSMP.js";import"./IconCheckMark-CEVoSHhf.js";import"./IconCross-B3GiP1Si.js";import"./IconExclamationMarkTriangle-BoexdZ5m.js";import"./IconExclamationMarkTriangle24-DY2uQ5A6.js";import"./useMemoizedId-P52koD2W.js";import"./focusStyle-CBFElZiz.js";import"./LegacyTooltip-BC90iaVE.js";import"./useLink-CGrBbYMo.js";import"./useFocusable-DySem7st.js";import"./chain-Ck9CKbau.js";import"./usePopper-CHIbWn6Y.js";import"./index-CJX6plO5.js";import"./index-CfyPTyT-.js";import"./Button-ljOzJNbm.js";import"./useButton-CGbfYaYu.js";import"./Portal-BFAtGiKe.js";import"./IconExclamationMarkCircle24-BbewMLoq.js";import"./VisuallyHidden-DdU2rIcI.js";import"./Tooltip-Cke8RYXd.js";import"./useClickOutside-CKZcS6rn.js";import"./EnablePortalWrapper-CBs6EJfs.js";import"./elements-BOYmskOL.js";import"./dialog-Dre1eVQK.js";import"./input-92Tvgqoy.js";import"./Divider-BeD6tjm6.js";import"./FormControl-B09RM8pa.js";import"./InputLabel-BUzvczwB.js";import"./TooltipIcon-DeJsuRhr.js";import"./IconQuestionMarkCircle-DJ6cviju.js";import"./SegmentedControls-Btv1r2cE.js";import"./useFormValidationState-Cm7EQ7so.js";import"./FocusScope-CqItlJEB.js";import"./useField-Dc7XGbIY.js";import"./useLabels-D_OVlzwR.js";import"./context-DXnD6xbD.js";import"./useControlledState-C1JYnvfk.js";import"./motion-B4glEiOI.js";import"./Switch-DqoPz_HL.js";import"./TabItem-CrQZ7sux.js";import"./Tree-DPjJ38dQ.js";import"./immer-DpFkcGey.js";import"./Trigger-DM6leiPg.js";import"./IconCaretDown-DO73XlJq.js";import"./IconCaretDown16-D1ph0gFc.js";import"./IconTrashBin16-CVizQs9b.js";import"./IconTrashBin24-D97dm6YN.js";const Wt={title:"Components/Text Input",component:he,tags:["autodocs"],args:{clearable:!1,disabled:!1,required:!1,autocomplete:!1,readonly:!1,dotted:!1,type:T.Text,validation:P.Default,spellcheck:!0,copyable:!1},argTypes:{validation:{options:Object.values(P),control:{type:"select"}},spellcheck:{options:[void 0,!0,!1],control:{type:"select"}},placeholder:{type:"string"},maxLength:{type:"number"},disabled:{control:{type:"boolean"},defaultValue:!1},readonly:{control:{type:"boolean"},defaultValue:!1},value:{table:{disable:!0}},obfuscated:{table:{disable:!0}},type:{table:{disable:!0}},decorator:{table:{disable:!0}},onInput:{table:{disable:!0},action:"onInput"},onBlur:{table:{disable:!0},action:"onBlur"},onClear:{table:{disable:!0},action:"onClear"},onFocus:{table:{disable:!0},action:"onFocus"}},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new TextInput component](/docs/current_components-text-input--documentation) instead."}}}},e=h=>{const[Fe,S]=y.useState("");return y.useEffect(()=>S(`${h.value??""}`),[h.value]),t.jsx(fe,{disabled:h.disabled,label:{text:"sample"},hiddenLabel:!0,children:t.jsx(he,{...h,value:Fe,onChange:S})})},p=e.bind({});p.argTypes={value:{table:{disable:!1},type:"string"}};const l=e.bind({});l.args={value:"Value text"};const u=e.bind({});u.args={placeholder:"Placeholder text"};const d=e.bind({});d.args={value:"Value text",decorator:t.jsx(i,{size:Ie.Size16})};const c=e.bind({});c.args={maxLength:10};const m=e.bind({});m.args={value:"This a disabled input",disabled:!0};const g=e.bind({});g.args={decorator:"X",placeholder:"Placeholder text"};const f={obfuscated:{control:{type:"boolean"},table:{disable:!1}}},v={type:T.Password,value:"Secret"},a=e.bind({});a.argTypes=f;a.args={...v};const r=e.bind({});r.argTypes=f;r.args={...v,decorator:t.jsx(i,{size:Ie.Size16})};const s=e.bind({});s.argTypes=f;s.args={...v,decorator:"P"};const n=e.bind({});n.argTypes=f;n.args={...v,obfuscated:!1};const o=e.bind({});o.argTypes={value:{table:{disable:!1},type:"number"}};o.args={type:T.Number};const b=e.bind({});b.args={value:"Value text",selectable:!0};const x=e.bind({});x.args={value:"Value text",extraActions:[{title:"Extra action A",onClick:F("extraActionA"),icon:t.jsx(i,{})},{title:"Extra action B",onClick:F("extraActionB"),icon:t.jsx(i,{})}]};const I=e.bind({});I.args={value:"Value text",extraActions:[{title:"First extra action",onClick:F("extraAction1"),icon:t.jsx(i,{}),tooltip:{content:"First extra action tooltip content",withArrow:!0}},{title:"Second extra action",onClick:F("extraAction2"),icon:t.jsx(i,{}),tooltip:{content:"Second extra action tooltip content",withArrow:!0}}]};var C,E,L;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(L=(E=p.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var W,w,A;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(A=(w=l.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var $,j,D;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(D=(j=u.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var V,k,z;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(z=(k=d.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,_,N;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(N=(_=c.parameters)==null?void 0:_.docs)==null?void 0:N.source}}};var M,O,q;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(q=(O=m.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var R,X,G;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(G=(X=g.parameters)==null?void 0:X.docs)==null?void 0:G.source}}};var H,J,K;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(K=(J=a.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,Y;r.parameters={...r.parameters,docs:{...(Q=r.parameters)==null?void 0:Q.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(Y=(U=r.parameters)==null?void 0:U.docs)==null?void 0:Y.source}}};var Z,ee,te;s.parameters={...s.parameters,docs:{...(Z=s.parameters)==null?void 0:Z.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(te=(ee=s.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var ae,re,se;n.parameters={...n.parameters,docs:{...(ae=n.parameters)==null?void 0:ae.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(se=(re=n.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var ne,oe,ie;o.parameters={...o.parameters,docs:{...(ne=o.parameters)==null?void 0:ne.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(ie=(oe=o.parameters)==null?void 0:oe.docs)==null?void 0:ie.source}}};var pe,le,ue;b.parameters={...b.parameters,docs:{...(pe=b.parameters)==null?void 0:pe.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(ue=(le=b.parameters)==null?void 0:le.docs)==null?void 0:ue.source}}};var de,ce,me;x.parameters={...x.parameters,docs:{...(de=x.parameters)==null?void 0:de.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(me=(ce=x.parameters)==null?void 0:ce.docs)==null?void 0:me.source}}};var ge,be,xe;I.parameters={...I.parameters,docs:{...(ge=I.parameters)==null?void 0:ge.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(xe=(be=I.parameters)==null?void 0:be.docs)==null?void 0:xe.source}}};const wt=["Text","Prefilled","WithPlaceholder","WithIconDecorator","WithMaxLength","Disabled","WithCharacterDecorator","Password","PasswordWithIconDecorator","PasswordWithCharacterDecorator","PasswordVisible","TypeNumber","SelectableInput","WithExtraActions","WithExtraActionWithTooltip"];export{m as Disabled,a as Password,n as PasswordVisible,s as PasswordWithCharacterDecorator,r as PasswordWithIconDecorator,l as Prefilled,b as SelectableInput,p as Text,o as TypeNumber,g as WithCharacterDecorator,I as WithExtraActionWithTooltip,x as WithExtraActions,d as WithIconDecorator,c as WithMaxLength,u as WithPlaceholder,wt as __namedExportsOrder,Wt as default};
