import{r as y,j as t}from"./iframe-ggc05qp5.js";import{I as i}from"./IconIcon-CAiHJIjd.js";import{I as Ie}from"./IconSize-BcCrF_mi.js";import{V as P}from"./validation-C9S5KgfE.js";import{a as T,T as he}from"./TextInput-4ALtVpG0.js";import{F as ve}from"./FormField-slf_Wv36.js";import"./preload-helper-OAyExbmo.js";import"./IconIcon16-Btrp1hmx.js";import"./IconIcon24-uujTmcnN.js";import"./useFocusRing-ClbPovyK.js";import"./useEffectEvent-TMNpvARu.js";import"./LoadingCircle-DezT8zwL.js";import"./merge-DI-veSMP.js";import"./IconCheckMark-B5O2hbzH.js";import"./IconCross-CUTgcpeg.js";import"./IconExclamationMarkTriangle-bsquF2_C.js";import"./IconExclamationMarkTriangle24-Db5_YIYF.js";import"./useMemoizedId-Bc83Oy8u.js";import"./focusStyle-Ch_WJ4aJ.js";import"./LegacyTooltip-DXwI5ThW.js";import"./useLink-BzKQhfIP.js";import"./useFocusable-NG717gvg.js";import"./chain-dhKHu04B.js";import"./index-IV9VHTlK.js";import"./usePopper-BlHz01pa.js";import"./index-Bn025ITx.js";import"./Button-CCY2toq0.js";import"./useButton-ChNz3TLR.js";import"./Portal-Bc7Myuvb.js";import"./IconExclamationMarkCircle24-BOb3PsaO.js";import"./VisuallyHidden-CLxKSwTK.js";import"./Tooltip-Cb2lYsA2.js";import"./useClickOutside-5Nput7Ah.js";import"./EnablePortalWrapper-Bs-6SVfL.js";import"./elements-BOYmskOL.js";import"./dialog-D9O7a7Fm.js";import"./input-MEkF5shV.js";import"./DialogBody-BZzJ_mys.js";import"./Divider-CoERhSuw.js";import"./Dropdown-CIxnL_ee.js";import"./FocusScope-D9wOCa0s.js";import"./useOverlayTriggerState-BJ1qhrKO.js";import"./useControlledState-ykz0Rnfd.js";import"./useMenuTrigger-DpVn8X_E.js";import"./useLabels-BJDRUN-n.js";import"./useLocalizedStringFormatter-CKti8yL1.js";import"./context-BJnIPN4y.js";import"./helper-BAjx2dyn.js";import"./keyboard-BeorW_Hq.js";import"./SelectionManager-BgHaICas.js";import"./useField-w-TvaOu_.js";import"./useFormValidationState-HmZu6JVu.js";import"./MenuItem-BbNksaEj.js";import"./IconCaretRight-DEkBsEC9.js";import"./Trigger-x6X4PO3H.js";import"./IconCaretDown-BnU7RbiA.js";import"./IconCaretDown16-CtPRSIn5.js";import"./IconTrashBin16--VXJ7hVf.js";import"./IconTrashBin24-CpCFRkQE.js";import"./FormControl-XMXivdja.js";import"./InputLabel-BbwthhXI.js";import"./TooltipIcon-DvQt9lcI.js";import"./IconQuestionMarkCircle-CmkyKBhr.js";import"./Switch-CB9EEJT-.js";import"./TabItem-DAOe0Mbq.js";import"./Tree-BOR5MZeE.js";import"./_Uint8Array-CwPxMkg2.js";const{action:F}=__STORYBOOK_MODULE_ACTIONS__,jt={title:"Components/Text Input",component:he,tags:["autodocs"],args:{clearable:!1,disabled:!1,required:!1,autocomplete:!1,readonly:!1,dotted:!1,type:T.Text,validation:P.Default,spellcheck:!0,copyable:!1},argTypes:{validation:{options:Object.values(P),control:{type:"select"}},spellcheck:{options:[void 0,!0,!1],control:{type:"select"}},placeholder:{type:"string"},maxLength:{type:"number"},disabled:{control:{type:"boolean"},defaultValue:!1},readonly:{control:{type:"boolean"},defaultValue:!1},value:{table:{disable:!0}},obfuscated:{table:{disable:!0}},type:{table:{disable:!0}},decorator:{table:{disable:!0}},onInput:{table:{disable:!0},action:"onInput"},onBlur:{table:{disable:!0},action:"onBlur"},onClear:{table:{disable:!0},action:"onClear"},onFocus:{table:{disable:!0},action:"onFocus"}},parameters:{status:{type:"deprecated"},docs:{description:{component:"### This component is deprecated, please use the [new TextInput component](/docs/current_components-text-input--documentation) instead."}}}},e=h=>{const[Fe,S]=y.useState("");return y.useEffect(()=>S(`${h.value??""}`),[h.value]),t.jsx(ve,{disabled:h.disabled,label:{text:"sample"},hiddenLabel:!0,children:t.jsx(he,{...h,value:Fe,onChange:S})})},p=e.bind({});p.argTypes={value:{table:{disable:!1},type:"string"}};const l=e.bind({});l.args={value:"Value text"};const u=e.bind({});u.args={placeholder:"Placeholder text"};const d=e.bind({});d.args={value:"Value text",decorator:t.jsx(i,{size:Ie.Size16})};const c=e.bind({});c.args={maxLength:10};const m=e.bind({});m.args={value:"This a disabled input",disabled:!0};const g=e.bind({});g.args={decorator:"X",placeholder:"Placeholder text"};const v={obfuscated:{control:{type:"boolean"},table:{disable:!1}}},f={type:T.Password,value:"Secret"},r=e.bind({});r.argTypes=v;r.args={...f};const a=e.bind({});a.argTypes=v;a.args={...f,decorator:t.jsx(i,{size:Ie.Size16})};const s=e.bind({});s.argTypes=v;s.args={...f,decorator:"P"};const n=e.bind({});n.argTypes=v;n.args={...f,obfuscated:!1};const o=e.bind({});o.argTypes={value:{table:{disable:!1},type:"number"}};o.args={type:T.Number};const b=e.bind({});b.args={value:"Value text",selectable:!0};const x=e.bind({});x.args={value:"Value text",extraActions:[{title:"Extra action A",onClick:F("extraActionA"),icon:t.jsx(i,{})},{title:"Extra action B",onClick:F("extraActionB"),icon:t.jsx(i,{})}]};const I=e.bind({});I.args={value:"Value text",extraActions:[{title:"First extra action",onClick:F("extraAction1"),icon:t.jsx(i,{}),tooltip:{content:"First extra action tooltip content",withArrow:!0}},{title:"Second extra action",onClick:F("extraAction2"),icon:t.jsx(i,{}),tooltip:{content:"Second extra action tooltip content",withArrow:!0}}]};var C,E,L;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(L=(E=p.parameters)==null?void 0:E.docs)==null?void 0:L.source}}};var W,A,w;l.parameters={...l.parameters,docs:{...(W=l.parameters)==null?void 0:W.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(w=(A=l.parameters)==null?void 0:A.docs)==null?void 0:w.source}}};var $,D,j;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(j=(D=u.parameters)==null?void 0:D.docs)==null?void 0:j.source}}};var V,_,O;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(O=(_=d.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};var k,z,B;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(B=(z=c.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var N,M,R;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(R=(M=m.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var q,K,U;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(U=(K=g.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var X,Y,G;r.parameters={...r.parameters,docs:{...(X=r.parameters)==null?void 0:X.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(G=(Y=r.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var H,J,Q;a.parameters={...a.parameters,docs:{...(H=a.parameters)==null?void 0:H.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(Q=(J=a.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Z,ee,te;s.parameters={...s.parameters,docs:{...(Z=s.parameters)==null?void 0:Z.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(te=(ee=s.parameters)==null?void 0:ee.docs)==null?void 0:te.source}}};var re,ae,se;n.parameters={...n.parameters,docs:{...(re=n.parameters)==null?void 0:re.docs,source:{originalSource:`(args: TextInputStoryProps) => {
  const [input, setInput] = useState('');
  useEffect(() => setInput(\`\${args.value ?? ''}\`), [args.value]);
  return <FormField disabled={args.disabled} label={{
    text: 'sample'
  }} hiddenLabel>
            <TextInput {...args} value={input} onChange={setInput} />
        </FormField>;
}`,...(se=(ae=n.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var ne,oe,ie;o.parameters={...o.parameters,docs:{...(ne=o.parameters)==null?void 0:ne.docs,source:{originalSource:`(args: TextInputStoryProps) => {
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
}`,...(xe=(be=I.parameters)==null?void 0:be.docs)==null?void 0:xe.source}}};const Vt=["Text","Prefilled","WithPlaceholder","WithIconDecorator","WithMaxLength","Disabled","WithCharacterDecorator","Password","PasswordWithIconDecorator","PasswordWithCharacterDecorator","PasswordVisible","TypeNumber","SelectableInput","WithExtraActions","WithExtraActionWithTooltip"];export{m as Disabled,r as Password,n as PasswordVisible,s as PasswordWithCharacterDecorator,a as PasswordWithIconDecorator,l as Prefilled,b as SelectableInput,p as Text,o as TypeNumber,g as WithCharacterDecorator,I as WithExtraActionWithTooltip,x as WithExtraActions,d as WithIconDecorator,c as WithMaxLength,u as WithPlaceholder,Vt as __namedExportsOrder,jt as default};
