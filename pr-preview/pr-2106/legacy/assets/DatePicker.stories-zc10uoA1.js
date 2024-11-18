import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as c}from"./index-BwDkhjyp.js";import{b as H,a as M,B as A}from"./Badge-BH4BM2gF.js";import{e as w}from"./Button-2a8yg1iB.js";import{F as g}from"./FormControl-DOcmnppy.js";import{S as K}from"./SegmentedControls-B09tr5m3.js";import{I as U}from"./IconCalendar-DbtuvaGQ.js";import{V as _}from"./validation-C9S5KgfE.js";import{D as m,s as f,a as z}from"./DatePicker-BVXKMp7i.js";import"./_commonjsHelpers-BosuxZz1.js";import"./IconCross-CxP4FPDR.js";import"./IconSize-BcCrF_mi.js";import"./focusStyle-CBFElZiz.js";import"./merge-DI-veSMP.js";import"./colors-cqDZVL9s.js";import"./useButton-B0CVDvll.js";import"./useFocusable-ClqOF1PM.js";import"./useFocusRing-Vzyl7-Lk.js";import"./SSRProvider-CYXx33DY.js";import"./chain-CSFqNvhK.js";import"./InputLabel-CEoY-eW-.js";import"./TooltipIcon-FKMBcYJt.js";import"./LegacyTooltip-BI7N2mWT.js";import"./useLink-BrkukSAv.js";import"./usePopper-DDlDeltW.js";import"./index-CS4BWtGh.js";import"./index-CfyPTyT-.js";import"./Portal-BBACcjoK.js";import"./useMemoizedId-EtHZ7Sxa.js";import"./IconCheckMark-ByVuQE55.js";import"./IconExclamationMarkCircle-DIK3qNWl.js";import"./IconExclamationMarkCircle24-Vs83y98-.js";import"./IconExclamationMarkTriangle-DvvXw1YP.js";import"./IconExclamationMarkTriangle24-NdDZZD89.js";import"./IconQuestionMarkCircle-DpV6l-09.js";import"./useFormValidationState-Bo5Bz1o-.js";import"./FocusScope-CryrrNNO.js";import"./useField-CqwgNQmU.js";import"./useLabels-Bp6d37Qr.js";import"./context-C2PaECDE.js";import"./VisuallyHidden-p15syWYz.js";import"./useControlledState-C0C-dzuH.js";import"./motion-C48bHxkn.js";import"./floating-ui.dom-C4mXwKt4.js";import"./IconCaretRight-CdUgGX0g.js";import"./TextInput-BcH7nD9x.js";import"./LoadingCircle-CZrma5le.js";import"./IconEyeOff-BAmb6qT8.js";import"./IconCaretDown-BFa2RsTm.js";import"./IconCaretDown16-mzuMIk3a.js";import"./IconCaretUp-BGoI66K4.js";const ze={title:"Components/DatePicker",component:m,tags:["autodocs"],args:{dateFormat:"MMM dd, yyyy"},argTypes:{validation:{options:Object.values(_),control:{type:"select"}}}},h=a=>{const[o,t]=c.useState();return e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:o,onChange:s=>t(s)})},V=a=>{const[o,t]=c.useState();return e.jsxs("div",{className:"tw-flex tw-flex-col",children:[e.jsxs("div",{className:"tw-flex tw-flex-row tw-justify-between",children:[e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(g,{children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:o,onChange:s=>t(s)})})}),e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(g,{children:e.jsx(m,{...a,variant:"single",startDate:null,endDate:null,value:o,onChange:s=>t(s)})})})]}),e.jsx("div",{className:"tw-px-5 tw-py-3 tw-flex tw-flex-col tw-gap-3",children:e.jsx(g,{children:e.jsx(K,{activeItemId:"a",items:[{id:"a",value:"abc"},{id:"b",value:"def"},{id:"c",value:"ghi"}],onChange:()=>{}})})})]})},n=h.bind({});n.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};n.storyName="Date Picker";const l=h.bind({});l.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,customHeader:e.jsxs("div",{className:"tw-flex tw-gap-2 tw-grow",children:[e.jsx(w,{hugWidth:!1,children:"30d"}),e.jsx(w,{hugWidth:!1,children:"90d"}),e.jsx(w,{hugWidth:!1,children:"365d"})]})};l.storyName="Date Picker with custom header";const i=h.bind({});i.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0,minDate:f(new Date,5),maxDate:z(new Date,5)};const d=V.bind({});d.args={placeHolder:"Select a date",isClearable:!0,shouldCloseOnSelect:!0};const x={day:"numeric",month:"short",year:"numeric"},q=()=>{const[a,o]=c.useState(f(new Date,40)),[t,s]=c.useState(new Date),E=r=>{if(!r)return;const[u,W]=r;o(u),s(W)},D=c.useRef(null);return e.jsx(m,{value:t,startDate:a,endDate:t,onChange:E,onOpen:()=>{var r;(r=D.current)==null||r.setPreSelection(new Date)},onClose:()=>console.log("close"),onBlur:()=>console.log("blur"),minDate:f(new Date,40),maxDate:new Date,variant:"range",ref:D,onKeyDown:r=>{var u;r.code==="Tab"&&r.shiftKey&&((u=D.current)==null||u.setOpen(!1))},preventOpenOnFocus:!0,customTrigger:e.jsxs("button",{className:"tw-flex tw-items-center hover:tw-bg-box-neutral-hover tw-py-2 tw-px-4 tw-rounded tw-gap-2",children:[e.jsx(U,{}),"Date:",e.jsxs(H,{style:A.Progress,emphasis:M.Strong,size:"small",children:[new Intl.DateTimeFormat("en-US",x).format(a||new Date)," -"," ",new Intl.DateTimeFormat("en-US",x).format(t||new Date)]})]}),hasPopperArrow:!1,children:a&&t&&e.jsxs("div",{children:[e.jsx("div",{className:"tw-border-t tw-w-full tw-border-solid tw-border-line"}),e.jsx("div",{className:"tw-p-2",children:e.jsx("button",{className:`tw-bg-button-background tw-border-button-border tw-w-full
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
}`,...(B=(T=p.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};const Ve=["Default","DatePickerWithCustomHeader","DatePickerWithMinAndMaxDates","InsideFormControlAndOverSegmentedControls","DateRange"];export{l as DatePickerWithCustomHeader,i as DatePickerWithMinAndMaxDates,p as DateRange,n as Default,d as InsideFormControlAndOverSegmentedControls,Ve as __namedExportsOrder,ze as default};
