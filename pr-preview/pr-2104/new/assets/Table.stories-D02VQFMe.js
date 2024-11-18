import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as R}from"./index-BwDkhjyp.js";import{f as Te,b as Ce,g as pe}from"./fondue-icons332-DfgDiIyU.js";import{B as g}from"./Button-BD32N3dP.js";import{a as I}from"./Checkbox-B7b4ddnY.js";import{h as p}from"./Dropdown-DlyGJbOq.js";import{F as w}from"./Flex-DCHQJD5L.js";import{T as W}from"./TextInput-C9Jt2mM5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Re="_tableWrapper_xe9z9_20",fe="_table_xe9z9_20",ge="_headerCell_xe9z9_45",xe="_rowCell_xe9z9_46",ye="_body_xe9z9_49",je="_row_xe9z9_46",Se="_header_xe9z9_45",He="_sortButton_xe9z9_96",m={tableWrapper:Re,table:fe,headerCell:ge,rowCell:xe,body:ye,row:je,header:Se,sortButton:He},he=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),Ae=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),we=a=>(a==null?void 0:a.querySelector(he))??null,Ne=a=>Array.from(a.querySelectorAll(he)),q=(a,n)=>a.children[n],ke=(a,n)=>{const t=a.closest("tr");if(!t)return null;const r=Array.from(t.children).indexOf(a);switch(n){case"ArrowUp":{const s=t.previousElementSibling;return s?q(s,r):null}case"ArrowDown":{const s=t.nextElementSibling;return s?q(s,r):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const s=Array.from(t.querySelectorAll("td, th"));return s[n==="Home"?0:s.length-1]}}},be=(a,n)=>{const t=ke(a,n);return t?we(t)?t:be(t,n):null},z=(a,n)=>{if(!Ae(a.key))return;const t=be(n,a.key);if(!t)return;const r=we(t);r&&(a.preventDefault(),r.focus())},ve=(a,n,t)=>{var c;const r=Ne(n),s=r.indexOf(t);if(s===-1)return;const i=(s+(a.key==="ArrowLeft"?-1:1)+r.length)%r.length;a.preventDefault(),(c=r[i])==null||c.focus()},Be=a=>{const n=a.target,t=n.closest("td, th"),r=n.closest("table");if(r){if(t&&(a.key==="ArrowUp"||a.key==="ArrowDown")){z(a,t);return}if(a.ctrlKey&&t&&(a.key==="Home"||a.key==="End")){z(a,t);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&ve(a,r,n)}},v=({caption:a,striped:n=!1,bordered:t=!0,fullWidth:r=!0,loading:s=!1,children:d,"aria-label":i,"aria-describedby":c})=>e.jsx("div",{onKeyDown:Be,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:m.table,"data-striped":n,"data-bordered":t,"data-full-width":r,"aria-label":i,"aria-describedby":c,"aria-busy":s,children:[a&&e.jsx("caption",{children:a}),d]})}),B=({children:a,sticky:n=!1,"aria-label":t})=>e.jsx("thead",{className:m.header,"data-sticky":n,"aria-label":t,children:a}),D=({onSortChange:a,sortable:n,sortDirection:t,align:r="left",truncate:s=!1,sortTranslations:d,width:i,noShrink:c=!1,scope:o="col",children:h})=>{const b=R.useId(),T=()=>{if(!n||!a)return;a(t===void 0||t==="descending"?"ascending":"descending")},f=()=>{const C=typeof h=="string"?h:"";return t==="ascending"?((d==null?void 0:d.sortDescending)??"Sort by {column} descending").replace("{column}",C):((d==null?void 0:d.sortAscending)??"Sort by {column} ascending").replace("{column}",C)};return e.jsx("th",{className:m.headerCell,style:{width:i,textAlign:r},"data-truncate":s,"data-no-shrink":c,role:"columnheader",scope:o,"aria-sort":t,children:n?e.jsx("button",{id:b,onClick:T,className:m.sortButton,"aria-label":f(),children:h}):h})},_=({stickyFirstColumn:a,children:n})=>e.jsx("tbody",{className:m.body,"data-sticky-first-column":a,children:n}),L=({selected:a=!1,disabled:n=!1,onClick:t,children:r,"aria-label":s})=>{const d=t!==void 0&&!n,i=c=>{d&&(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),t())};return e.jsx("tr",{className:m.row,"data-selected":a,"data-interactive":d,"data-disabled":n,role:d?"button":"row",tabIndex:d?0:void 0,"aria-selected":a,"aria-disabled":n,"aria-label":s,onClick:d?t:void 0,onKeyDown:d?i:void 0,children:r})},E=({children:a,align:n="left",truncate:t=!1,"aria-label":r})=>e.jsx("td",{className:m.rowCell,style:{textAlign:n},"data-truncate":t,"aria-label":r,children:a}),l={Root:v,Header:B,HeaderCell:D,Body:_,Row:L,RowCell:E};v.__docgenInfo={description:"",methods:[],displayName:"TableRoot",props:{caption:{required:!1,tsType:{name:"string"},description:"Optional caption text for the table that appears above it"},striped:{required:!1,tsType:{name:"boolean"},description:`Whether to add zebra striping to rows
@default false`,defaultValue:{value:"false",computed:!1}},bordered:{required:!1,tsType:{name:"boolean"},description:`Whether to add borders between rows and columns
@default true`,defaultValue:{value:"true",computed:!1}},fullWidth:{required:!1,tsType:{name:"boolean"},description:`Whether to make the table take full width of its container
@default true`,defaultValue:{value:"true",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:`Whether the table is in a loading state
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""},"aria-describedby":{required:!1,tsType:{name:"string"},description:""}}};B.__docgenInfo={description:"",methods:[],displayName:"TableHeader",props:{sticky:{required:!1,tsType:{name:"boolean"},description:`Whether header should stick to the top when scrolling
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""}}};D.__docgenInfo={description:"",methods:[],displayName:"TableHeaderCell",props:{onSortChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(direction: SortDirection) => void",signature:{arguments:[{type:{name:"union",raw:"'ascending' | 'descending' | 'other' | undefined",elements:[{name:"literal",value:"'ascending'"},{name:"literal",value:"'descending'"},{name:"literal",value:"'other'"},{name:"undefined"}]},name:"direction"}],return:{name:"void"}}},description:`Handler called when the sort direction changes
@param direction - The new sort direction`},sortable:{required:!1,tsType:{name:"boolean"},description:`Whether the column is sortable
@default false`},sortDirection:{required:!1,tsType:{name:"union",raw:"'ascending' | 'descending' | 'other' | undefined",elements:[{name:"literal",value:"'ascending'"},{name:"literal",value:"'descending'"},{name:"literal",value:"'other'"},{name:"undefined"}]},description:"Current sort direction of the column"},align:{required:!1,tsType:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}]},description:`Horizontal alignment of the content
@default 'left'`,defaultValue:{value:"'left'",computed:!1}},truncate:{required:!1,tsType:{name:"boolean"},description:`Whether to truncate content with ellipsis when it overflows
@default false`,defaultValue:{value:"false",computed:!1}},sortTranslations:{required:!1,tsType:{name:"signature",type:"object",raw:`{
    sortAscending?: string;
    sortDescending?: string;
}`,signature:{properties:[{key:"sortAscending",value:{name:"string",required:!1}},{key:"sortDescending",value:{name:"string",required:!1}}]}},description:`Label for asceding/descending sort. Variables: {column} - column name
@default "Sort by {column} ascending/descending"`},width:{required:!1,tsType:{name:"string"},description:"Width of the column (any valid CSS width)"},noShrink:{required:!1,tsType:{name:"boolean"},description:`Whether the column should have a minimum width
@default false`,defaultValue:{value:"false",computed:!1}},scope:{required:!1,tsType:{name:"union",raw:"'col' | 'row'",elements:[{name:"literal",value:"'col'"},{name:"literal",value:"'row'"}]},description:`Scope of the header cell (column or row)
@default 'col'`,defaultValue:{value:"'col'",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};_.__docgenInfo={description:"",methods:[],displayName:"TableBody",props:{stickyFirstColumn:{required:!1,tsType:{name:"boolean"},description:`Whether the first column should stick to the viewport when scrolling horizontally
@default false`},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};L.__docgenInfo={description:"",methods:[],displayName:"TableRow",props:{selected:{required:!1,tsType:{name:"boolean"},description:`Whether the row is in a selected state
@default false`,defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:`Whether to disable interactions for this row
@default false`,defaultValue:{value:"false",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Handler called when the row is clicked or activated via keyboard
If provided, the row will be hoverable and interactive`},children:{required:!0,tsType:{name:"ReactNode"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""}}};E.__docgenInfo={description:"",methods:[],displayName:"TableRowCell",props:{align:{required:!1,tsType:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}]},description:`Horizontal alignment of the content
@default 'left'`,defaultValue:{value:"'left'",computed:!1}},truncate:{required:!1,tsType:{name:"boolean"},description:`Whether to truncate content with ellipsis when it overflows
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},"aria-label":{required:!1,tsType:{name:"string"},description:""}}};const rl={component:v,subcomponents:{"Table.Header":B,"Table.HeaderCell":D,"Table.Body":_,"Table.Row":L,"Table.RowCell":E},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},me=[{key:"firstName",label:"First name"},{key:"lastName",label:"Last name"},{key:"age",label:"Age"},{key:"actions",label:"Actions"}],u=[{id:"1",firstName:"Dave",lastName:"McDaveman",age:42,status:"active",lastLogin:"2024-03-15",role:"Admin"},{id:"2",firstName:"John",lastName:"Doe",age:23,status:"pending",lastLogin:"2024-03-14",role:"User"},{id:"3",firstName:"Chris",lastName:"Christman",age:35,status:"inactive",lastLogin:"2024-03-01",role:"Editor"},{id:"4",firstName:"Tod",lastName:"Hunter",age:12,status:"active",lastLogin:"2024-03-15",role:"Viewer"},{id:"5",firstName:"Alice",lastName:"Johnson",age:28,status:"active",lastLogin:"2024-03-16",role:"Admin"},{id:"6",firstName:"Bob",lastName:"Smith",age:45,status:"inactive",lastLogin:"2024-02-28",role:"Editor"}],$=[e.jsx(g,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ce,{size:"16"})},"edit"),e.jsx(g,{size:"small",aspect:"square",emphasis:"weak",variant:"danger",children:e.jsx(pe,{size:"16"})},"delete")],x={args:{striped:!0,fullWidth:!1,loading:!0,caption:"asdsd",bordered:!0},render:()=>{const a=n=>{console.log(`Row ${n} clicked`)};return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsx(l.Row,{children:me.map(n=>e.jsx(l.HeaderCell,{children:n.label},n.key))})}),e.jsx(l.Body,{children:u.map(n=>e.jsxs(l.Row,{onClick:()=>a(n.id),"aria-label":`${n.firstName} ${n.lastName}'s details`,children:[e.jsx(l.RowCell,{children:n.firstName}),e.jsx(l.RowCell,{children:n.lastName}),e.jsx(l.RowCell,{children:n.age}),e.jsx(l.RowCell,{children:e.jsx(w,{gap:".5rem",children:$})})]},n.id))})]})}},y={render:()=>{const[a,n]=R.useState(""),[t,r]=R.useState("all"),[s,d]=R.useState({}),i=R.useMemo(()=>{let o=[...u];return a&&(o=o.filter(h=>h.firstName.toLowerCase().includes(a.toLowerCase())||h.lastName.toLowerCase().includes(a.toLowerCase()))),t!=="all"&&(o=o.filter(h=>t==="young"?h.age<30:h.age>=30)),Object.keys(s).length>0&&o.sort((h,b)=>{for(const[T,f]of Object.entries(s)){if(f===void 0)continue;const C=T==="name"?`${h.firstName} ${h.lastName}`:h[T],F=T==="name"?`${b.firstName} ${b.lastName}`:b[T];if(C<F)return f==="ascending"?-1:1;if(C>F)return f==="ascending"?1:-1}return 0}),o},[a,t,s]),c=(o,h)=>{d(b=>({...b,[o]:h}))};return e.jsxs(w,{direction:"column",gap:"1rem",children:[e.jsxs(w,{gap:"1rem",children:[e.jsx(W,{placeholder:"Search...",value:a,onChange:o=>n(o.target.value),children:e.jsx(W.Slot,{children:e.jsx(Te,{})})}),e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(g,{children:"Filter by age"})}),e.jsxs(p.Content,{children:[e.jsx(p.Item,{onSelect:()=>r("all"),children:"All"}),e.jsx(p.Item,{onSelect:()=>r("young"),children:"Young"}),e.jsx(p.Item,{onSelect:()=>r("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortable:!0,sortDirection:s.name,onSortChange:o=>c("name",o),children:"Name"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:s.age,onSortChange:o=>c("age",o),children:"Age"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:s.role,onSortChange:o=>c("role",o),children:"Role"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:i.map(o=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${o.firstName}`),children:[e.jsx(l.RowCell,{children:`${o.firstName} ${o.lastName}`}),e.jsx(l.RowCell,{children:o.age}),e.jsx(l.RowCell,{children:o.role}),e.jsx(l.RowCell,{children:e.jsx(w,{gap:".5rem",children:$})})]},o.id))})]})]})}},j={render:()=>{const[a,n]=R.useState(new Set),t=()=>{a.size===u.length?n(new Set):n(new Set(u.map(i=>i.id)))},r=(i,c)=>{i.stopPropagation();const o=new Set(a);o.has(c)?o.delete(c):o.add(c),n(o)},s=a.size===u.length,d=a.size>0&&a.size<u.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(I,{value:d?"indeterminate":s,onChange:t})}),me.map(({key:i,label:c})=>e.jsx(l.HeaderCell,{children:c},i))]})}),e.jsx(l.Body,{children:u.map(i=>e.jsxs(l.Row,{selected:a.has(i.id),onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(I,{value:a.has(i.id),onChange:c=>r(c,i.id)})}),e.jsx(l.RowCell,{children:i.firstName}),e.jsx(l.RowCell,{children:i.lastName}),e.jsx(l.RowCell,{children:i.age}),e.jsx(l.RowCell,{children:e.jsx(w,{gap:".5rem",children:$})})]},i.id))})]})}},S={name:"Style Variations",render:()=>e.jsxs(w,{direction:"column",gap:"2rem",children:[e.jsxs(l.Root,{striped:!0,caption:"Striped Table",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Default Borders"}),e.jsx(l.HeaderCell,{children:"Normal Row"})]})}),e.jsx(l.Body,{children:u.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{bordered:!1,caption:"Borderless",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Interactive Rows"}),e.jsx(l.HeaderCell,{children:"No Borders"})]})}),e.jsx(l.Body,{children:u.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{striped:!0,fullWidth:!1,caption:"Compact Width",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Auto Width"}),e.jsx(l.HeaderCell,{children:"With Stripes"})]})}),e.jsx(l.Body,{children:u.slice(0,3).map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]})]})},H={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:u.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(w,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.status}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},A={name:"Truncation & Width Control",render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",truncate:!0,noShrink:!0,children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"200px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"30%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:u.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{truncate:!0,children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.status}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})},N={name:"Sticky Header & Column",render:()=>e.jsx("div",{style:{height:"400px",width:"800px",overflow:"auto",border:"1px solid #ccc"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{noShrink:!0,children:"ID"}),e.jsx(l.HeaderCell,{width:"200px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Role"}),e.jsx(l.HeaderCell,{width:"150px",children:"Status"}),e.jsx(l.HeaderCell,{width:"150px",children:"Last Login"}),e.jsx(l.HeaderCell,{width:"200px",children:"Actions"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:Array.from({length:20}).map((a,n)=>{var t,r,s,d,i;return e.jsxs(l.Row,{onClick:()=>console.log(`Clicked row ${n+1}`),children:[e.jsx(l.RowCell,{children:n+1}),e.jsx(l.RowCell,{truncate:!0,children:`${(t=u[n%6])==null?void 0:t.firstName} ${(r=u[n%6])==null?void 0:r.lastName}`}),e.jsx(l.RowCell,{children:(s=u[n%6])==null?void 0:s.role}),e.jsx(l.RowCell,{children:(d=u[n%6])==null?void 0:d.status}),e.jsx(l.RowCell,{children:(i=u[n%6])==null?void 0:i.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(w,{gap:"0.5rem",children:[e.jsx(g,{size:"small",children:"Edit"}),e.jsx(g,{size:"small",variant:"danger",children:"Delete"})]})})]},n)})})]})})},k={name:"Row States & Interactions",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"State"}),e.jsx(l.HeaderCell,{children:"Description"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{onClick:()=>console.log("Regular click"),children:[e.jsx(l.RowCell,{children:"Interactive Row"}),e.jsx(l.RowCell,{children:"Default state with hover effect and click handler"})]}),e.jsxs(l.Row,{selected:!0,onClick:()=>console.log("Selected click"),children:[e.jsx(l.RowCell,{children:"Selected Row"}),e.jsx(l.RowCell,{children:"Selected state with interaction"})]}),e.jsxs(l.Row,{disabled:!0,children:[e.jsx(l.RowCell,{children:"Disabled Row"}),e.jsx(l.RowCell,{children:"Non-interactive state"})]}),e.jsxs(l.Row,{selected:!0,disabled:!0,children:[e.jsx(l.RowCell,{children:"Selected & Disabled"}),e.jsx(l.RowCell,{children:"Selected but non-interactive"})]}),e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Non-interactive Row"}),e.jsx(l.RowCell,{children:"No click handler, no hover effect"})]})]})]})};var V,O,M;x.parameters={...x.parameters,docs:{...(V=x.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    striped: true,
    fullWidth: false,
    loading: true,
    caption: 'asdsd',
    bordered: true
  },
  render: () => {
    const handleRowClick = (id: string) => {
      console.log(\`Row \${id} clicked\`);
    };
    return <Table.Root>
                <Table.Header>
                    <Table.Row>
                        {TABLE_HEADERS.map(header => <Table.HeaderCell key={header.key}>{header.label}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(row => <Table.Row key={row.id} onClick={() => handleRowClick(row.id)} aria-label={\`\${row.firstName} \${row.lastName}'s details\`}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.lastName}</Table.RowCell>
                            <Table.RowCell>{row.age}</Table.RowCell>
                            <Table.RowCell>
                                <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                            </Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(M=(O=x.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var P,K,U;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    const [sortStates, setSortStates] = useState<Record<string, SortDirection>>({});
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];
      if (searchTerm) {
        result = result.filter(row => row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || row.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (ageFilter !== 'all') {
        result = result.filter(row => ageFilter === 'young' ? row.age < 30 : row.age >= 30);
      }
      if (Object.keys(sortStates).length > 0) {
        result.sort((a, b) => {
          for (const [key, direction] of Object.entries(sortStates)) {
            if (direction === undefined) {
              continue;
            }
            const valueA = key === 'name' ? \`\${a.firstName} \${a.lastName}\` : a[key as keyof TableRow];
            const valueB = key === 'name' ? \`\${b.firstName} \${b.lastName}\` : b[key as keyof TableRow];
            if (valueA < valueB) {
              return direction === 'ascending' ? -1 : 1;
            }
            if (valueA > valueB) {
              return direction === 'ascending' ? 1 : -1;
            }
          }
          return 0;
        });
      }
      return result;
    }, [searchTerm, ageFilter, sortStates]);
    const handleSortChange = (column: string, direction: SortDirection) => {
      setSortStates(prev => ({
        ...prev,
        [column]: direction
      }));
    };
    return <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
                        <TextInput.Slot>
                            <IconMagnifier />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button>Filter by age</Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sortable sortDirection={sortStates.name} onSortChange={direction => handleSortChange('name', direction)}>
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sortable sortDirection={sortStates.age} onSortChange={direction => handleSortChange('age', direction)}>
                                Age
                            </Table.HeaderCell>
                            <Table.HeaderCell sortable sortDirection={sortStates.role} onSortChange={direction => handleSortChange('role', direction)}>
                                Role
                            </Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map(row => <Table.Row key={row.id} onClick={() => console.log(\`View details for \${row.firstName}\`)}>
                                <Table.RowCell>{\`\${row.firstName} \${row.lastName}\`}</Table.RowCell>
                                <Table.RowCell>{row.age}</Table.RowCell>
                                <Table.RowCell>{row.role}</Table.RowCell>
                                <Table.RowCell>
                                    <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                                </Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </Flex>;
  }
}`,...(U=(K=y.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var J,Y,G;j.parameters={...j.parameters,docs:{...(J=j.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const handleSelectAll = () => {
      if (selectedRows.size === TABLE_DATA.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(TABLE_DATA.map(row => row.id)));
      }
    };
    const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: string) => {
      event.stopPropagation();
      const newSelection = new Set(selectedRows);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      setSelectedRows(newSelection);
    };
    const isAllSelected = selectedRows.size === TABLE_DATA.length;
    const isPartiallySelected = selectedRows.size > 0 && selectedRows.size < TABLE_DATA.length;
    return <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox value={isPartiallySelected ? 'indeterminate' : isAllSelected} onChange={handleSelectAll} />
                        </Table.HeaderCell>
                        {TABLE_HEADERS.map(({
            key,
            label
          }) => <Table.HeaderCell key={key}>{label}</Table.HeaderCell>)}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(row => <Table.Row key={row.id} selected={selectedRows.has(row.id)} onClick={() => console.log(\`View details for \${row.firstName}\`)}>
                            <Table.RowCell>
                                <Checkbox value={selectedRows.has(row.id)} onChange={event => handleSelectRow(event, row.id)} />
                            </Table.RowCell>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.lastName}</Table.RowCell>
                            <Table.RowCell>{row.age}</Table.RowCell>
                            <Table.RowCell>
                                <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                            </Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(G=(Y=j.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var Q,X,Z;S.parameters={...S.parameters,docs:{...(Q=S.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  name: 'Style Variations',
  render: () => <Flex direction="column" gap="2rem">
            <Table.Root striped caption="Striped Table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Default Borders</Table.HeaderCell>
                        <Table.HeaderCell>Normal Row</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(row => <Table.Row key={row.id} onClick={() => console.log(\`Clicked \${row.firstName}\`)}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.role}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>

            <Table.Root bordered={false} caption="Borderless">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Interactive Rows</Table.HeaderCell>
                        <Table.HeaderCell>No Borders</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(row => <Table.Row key={row.id} onClick={() => console.log(\`Clicked \${row.firstName}\`)}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.role}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>

            <Table.Root striped fullWidth={false} caption="Compact Width">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                        <Table.HeaderCell>With Stripes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.slice(0, 3).map(row => <Table.Row key={row.id} onClick={() => console.log(\`Clicked \${row.firstName}\`)}>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.role}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </Flex>
}`,...(Z=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,le,ae;H.parameters={...H.parameters,docs:{...(ee=H.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  name: 'Cell Alignment Options',
  render: () => <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
                    <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
                    <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
                    <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(row => <Table.Row key={row.id} onClick={() => console.log(\`Clicked \${row.firstName}'s row\`)}>
                        <Table.RowCell align="left">{row.firstName}</Table.RowCell>
                        <Table.RowCell align="center">{row.role}</Table.RowCell>
                        <Table.RowCell align="right">{row.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex justify="space-between" align="center">
                                <span>{row.status}</span>
                                <span>{row.lastLogin}</span>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ae=(le=H.parameters)==null?void 0:le.docs)==null?void 0:ae.source}}};var ne,te,re;A.parameters={...A.parameters,docs:{...(ne=A.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  name: 'Truncation & Width Control',
  render: () => <div style={{
    width: '800px'
  }}>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px" truncate noShrink>
                            Fixed Width & No Shrink
                        </Table.HeaderCell>
                        <Table.HeaderCell width="200px" truncate>
                            Truncated Very Long Header Title That Should Be Cut Off
                        </Table.HeaderCell>
                        <Table.HeaderCell width="30%">Percentage Width</Table.HeaderCell>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(row => <Table.Row key={row.id} onClick={() => console.log(\`Clicked \${row.firstName}'s row\`)}>
                            <Table.RowCell truncate>Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate>
                                {\`\${row.firstName} \${row.lastName} - \${row.role} - \${row.status}\`}
                            </Table.RowCell>
                            <Table.RowCell>Normal Cell</Table.RowCell>
                            <Table.RowCell>Auto Width Content</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(re=(te=A.parameters)==null?void 0:te.docs)==null?void 0:re.source}}};var oe,se,ie;N.parameters={...N.parameters,docs:{...(oe=N.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  name: 'Sticky Header & Column',
  render: () => <div style={{
    height: '400px',
    width: '800px',
    overflow: 'auto',
    border: '1px solid #ccc'
  }}>
            <Table.Root>
                <Table.Header sticky>
                    <Table.Row>
                        <Table.HeaderCell noShrink>ID</Table.HeaderCell>
                        <Table.HeaderCell width="200px">Name</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Role</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Status</Table.HeaderCell>
                        <Table.HeaderCell width="150px">Last Login</Table.HeaderCell>
                        <Table.HeaderCell width="200px">Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body stickyFirstColumn>
                    {Array.from({
          length: 20
        }).map((_, index) => <Table.Row key={index} onClick={() => console.log(\`Clicked row \${index + 1}\`)}>
                            <Table.RowCell>{index + 1}</Table.RowCell>
                            <Table.RowCell truncate>
                                {\`\${TABLE_DATA[index % 6]?.firstName} \${TABLE_DATA[index % 6]?.lastName}\`}
                            </Table.RowCell>
                            <Table.RowCell>{TABLE_DATA[index % 6]?.role}</Table.RowCell>
                            <Table.RowCell>{TABLE_DATA[index % 6]?.status}</Table.RowCell>
                            <Table.RowCell>{TABLE_DATA[index % 6]?.lastLogin}</Table.RowCell>
                            <Table.RowCell>
                                <Flex gap="0.5rem">
                                    <Button size="small">Edit</Button>
                                    <Button size="small" variant="danger">
                                        Delete
                                    </Button>
                                </Flex>
                            </Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(ie=(se=N.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,ce,ue;k.parameters={...k.parameters,docs:{...(de=k.parameters)==null?void 0:de.docs,source:{originalSource:`{
  name: 'Row States & Interactions',
  render: () => <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>State</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row onClick={() => console.log('Regular click')}>
                    <Table.RowCell>Interactive Row</Table.RowCell>
                    <Table.RowCell>Default state with hover effect and click handler</Table.RowCell>
                </Table.Row>
                <Table.Row selected onClick={() => console.log('Selected click')}>
                    <Table.RowCell>Selected Row</Table.RowCell>
                    <Table.RowCell>Selected state with interaction</Table.RowCell>
                </Table.Row>
                <Table.Row disabled>
                    <Table.RowCell>Disabled Row</Table.RowCell>
                    <Table.RowCell>Non-interactive state</Table.RowCell>
                </Table.Row>
                <Table.Row selected disabled>
                    <Table.RowCell>Selected & Disabled</Table.RowCell>
                    <Table.RowCell>Selected but non-interactive</Table.RowCell>
                </Table.Row>
                <Table.Row>
                    <Table.RowCell>Non-interactive Row</Table.RowCell>
                    <Table.RowCell>No click handler, no hover effect</Table.RowCell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
}`,...(ue=(ce=k.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};const ol=["Default","WithSearchFilterSort","WithSelection","TableStyles","CellAlignments","ContentTruncation","ScrollBehavior","RowStates"];export{H as CellAlignments,A as ContentTruncation,x as Default,k as RowStates,N as ScrollBehavior,S as TableStyles,y as WithSearchFilterSort,j as WithSelection,ol as __namedExportsOrder,rl as default};
