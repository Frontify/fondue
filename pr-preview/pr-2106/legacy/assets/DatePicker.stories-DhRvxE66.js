import{j as e}from"./jsx-runtime-BvI67ttx.js";import{r as c}from"./index-BEEaWAwe.js";import{B as H,a as M,b as A}from"./Badge--6E11NGb.js";import{c as w}from"./Button-ljOzJNbm.js";import{F as g}from"./FormControl-B09RM8pa.js";import{S as K}from"./SegmentedControls-Btv1r2cE.js";import{D as m,s as f,a as U,I as _}from"./DatePicker-izT89GeD.js";import{V as z}from"./validation-CJXPAjNB.js";import"./_commonjsHelpers-BosuxZz1.js";import"./IconCross-B3GiP1Si.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./colors-cqDZVL9s.js";import"./useButton-CGbfYaYu.js";import"./useFocusable-DySem7st.js";import"./useFocusRing-BuOUPy6p.js";import"./SSRProvider-4hSGecE0.js";import"./chain-Ck9CKbau.js";import"./InputLabel-BUzvczwB.js";import"./TooltipIcon-DeJsuRhr.js";import"./LegacyTooltip-BC90iaVE.js";import"./useLink-CGrBbYMo.js";import"./usePopper-CHIbWn6Y.js";import"./index-CJX6plO5.js";import"./index-CfyPTyT-.js";import"./Portal-BFAtGiKe.js";import"./useMemoizedId-P52koD2W.js";import"./IconCheckMark-CEVoSHhf.js";import"./IconExclamationMarkCircle24-BbewMLoq.js";import"./IconExclamationMarkTriangle-BoexdZ5m.js";import"./IconExclamationMarkTriangle24-DY2uQ5A6.js";import"./IconQuestionMarkCircle-DJ6cviju.js";import"./useFormValidationState-Cm7EQ7so.js";import"./FocusScope-CqItlJEB.js";import"./useField-Dc7XGbIY.js";import"./useLabels-D_OVlzwR.js";import"./context-DXnD6xbD.js";import"./VisuallyHidden-DdU2rIcI.js";import"./useControlledState-C1JYnvfk.js";import"./motion-B4glEiOI.js";import"./floating-ui.dom-DHnpsDOD.js";import"./IconCaretRight-CmZkFCOs.js";import"./TextInput-DrA2OM1M.js";import"./LoadingCircle-CLFuk3gJ.js";import"./IconCaretDown-DO73XlJq.js";import"./IconCaretDown16-D1ph0gFc.js";import"./IconCaretUp-BvbE1tIT.js";const Ke={title:"Components/DatePicker",component:m,tags:["autodocs"],args:{dateFormat:"MMM dd, yyyy"},argTypes:{validation:{options:Object.values(z),control:{type:"select"}}}},h=a=>{const[o,t]=c.useState();return e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:o,onChange:s=>t(s)})},V=a=>{const[o,t]=c.useState();return e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-flex-row tw-justify-between",children:[e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(g,{children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:o,onChange:s=>t(s)})})}),e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(g,{children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:o,onChange:s=>t(s)})})})]}),e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(g,{children:e.jsx(K,{activeItemId:"a",items:[{id:"a",value:"abc"},{id:"b",value:"def"},{id:"c",value:"ghi"}],onChange:()=>{}})})})]})},n=h.bind({});n.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};n.storyName="Date Picker";const l=h.bind({});l.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,customHeader:e.jsxs("div",{className:"tw-flex tw-gap-2 tw-grow",children:[e.jsx(w,{hugWidth:!1,children:"30d"}),e.jsx(w,{hugWidth:!1,children:"90d"}),e.jsx(w,{hugWidth:!1,children:"365d"})]})};l.storyName="Date Picker with custom header";const i=h.bind({});i.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,minDate:f(new Date,5),maxDate:U(new Date,5)};const d=V.bind({});d.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};const x={day:"numeric",month:"short",year:"numeric"},q=()=>{const[a,o]=c.useState(f(new Date,40)),[t,s]=c.useState(new Date),E=r=>{if(!r)return;const[u,W]=r;o(u),s(W)},D=c.useRef(null);return e.jsx(m,{value:t,startDate:a,endDate:t,onChange:E,onOpen:()=>{var r;(r=D.current)==null||r.setPreSelection(new Date)},onClose:()=>console.log("close"),onBlur:()=>console.log("blur"),minDate:f(new Date,40),maxDate:new Date,variant:"range",ref:D,onKeyDown:r=>{var u;r.code==="Tab"&&r.shiftKey&&((u=D.current)==null||u.setOpen(!1))},preventOpenOnFocus:!0,customTrigger:e.jsxs("button",{className:"tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2",children:[e.jsx(_,{}),"Date:",e.jsxs(H,{style:M.Progress,emphasis:A.Strong,size:"small",children:[new Intl.DateTimeFormat("en-US",x).format(a||new Date)," -"," ",new Intl.DateTimeFormat("en-US",x).format(t||new Date)]})]}),hasPopperArrow:!1,children:a&&t&&e.jsxs("div",{children:[e.jsx("div",{className:"tw-border-t tw-w-full tw-border-solid tw-border-line"}),e.jsx("div",{className:"tw-p-2",children:e.jsx("button",{className:`tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium`,children:"Reset"})})]})})},p=q.bind({});var v,b,S;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(S=(b=n.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var C,P,y;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(y=(P=l.parameters)==null?void 0:P.docs)==null?void 0:y.source}}};var k,j,N;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />;
}`,...(N=(j=i.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var O,F,R;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`(args: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  return <div className="tw-flex tw-flex-col">
            <div className="tw-flex tw-flex-row tw-justify-between">
                <div className="tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3">
                    <FormControl>
                        <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />
                    </FormControl>
                </div>
                <div className="tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3">
                    <FormControl>
                        <DatePicker {...args} variant="single" startDate={null} endDate={null} value={selectedDate as Date} onChange={date => setSelectedDate(date)} />
                    </FormControl>
                </div>
            </div>
            <div className="tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3">
                <FormControl>
                    <SegmentedControls activeItemId="a" items={[{
          id: 'a',
          value: 'abc'
        }, {
          id: 'b',
          value: 'def'
        }, {
          id: 'c',
          value: 'ghi'
        }]} onChange={() => {}} />
                </FormControl>
            </div>
        </div>;
}`,...(R=(F=d.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var I,T,B;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [startDate, setStartDate] = useState<Date | null>(subDays(new Date(), 40));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const onChange = (dates: [Date | null, Date | null] | null) => {
    if (!dates) {
      return;
    }
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const datePickerRef = useRef<ReactDatePickerRef>(null);
  return <DatePicker value={endDate} startDate={startDate} endDate={endDate} onChange={onChange} onOpen={() => {
    (datePickerRef.current as any)?.setPreSelection(new Date());
  }} onClose={() => console.log('close')} onBlur={() => console.log('blur')} minDate={subDays(new Date(), 40)} maxDate={new Date()} variant="range" ref={datePickerRef} onKeyDown={e => {
    if (e.code === 'Tab' && e.shiftKey) {
      datePickerRef.current?.setOpen(false);
    }
  }} preventOpenOnFocus customTrigger={<button className="tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2">
                    <IconCalendar16 />
                    Date:
                    <Badge style={BadgeStyle.Progress} emphasis={BadgeEmphasis.Strong} size="small">
                        {new Intl.DateTimeFormat('en-US', formatOptions).format(startDate || new Date())} -{' '}
                        {new Intl.DateTimeFormat('en-US', formatOptions).format(endDate || new Date())}
                    </Badge>
                </button>} hasPopperArrow={false}>
            {startDate && endDate && <div>
                    <div className="tw-border-t tw-w-full tw-border-solid tw-border-line" />
                    <div className="tw-p-2">
                        <button className="tw-bg-button-background tw-border-button-border tw-w-full
                                   hover:tw-bg-button-background-hover tw-rounded
                                   active:tw-bg-button-background-pressed tw-px-4 tw-h-9 tw-text-body-medium">
                            Reset
                        </button>
                    </div>
                </div>}
        </DatePicker>;
}`,...(B=(T=p.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};const Ue=["Default","DatePickerWithCustomHeader","DatePickerWithMinAndMaxDates","InsideFormControlAndOverSegmentedControls","DateRange"];export{l as DatePickerWithCustomHeader,i as DatePickerWithMinAndMaxDates,p as DateRange,n as Default,d as InsideFormControlAndOverSegmentedControls,Ue as __namedExportsOrder,Ke as default};
