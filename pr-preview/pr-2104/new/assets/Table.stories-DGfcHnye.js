import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as T}from"./index-BwDkhjyp.js";import{f as Ce,b as me,g as Re}from"./fondue-icons332-DfgDiIyU.js";import{B as f}from"./Button-BD32N3dP.js";import{a as I}from"./Checkbox-B7b4ddnY.js";import{h as p}from"./Dropdown-DlyGJbOq.js";import{F as h}from"./Flex-DCHQJD5L.js";import{T as W}from"./TextInput-C9Jt2mM5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const pe="_table_94tq3_20",xe="_headerCell_94tq3_34",fe="_rowCell_94tq3_35",ge="_body_94tq3_38",je="_row_94tq3_35",Se="_header_94tq3_34",He="_sortButton_94tq3_98",C={table:pe,headerCell:xe,rowCell:fe,body:ge,row:je,header:Se,sortButton:He},be=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),ye=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),Te=a=>(a==null?void 0:a.querySelector(be))??null,Ae=a=>Array.from(a.querySelectorAll(be)),q=(a,r)=>a.children[r],Ne=(a,r)=>{const n=a.closest("tr");if(!n)return null;const t=Array.from(n.children).indexOf(a);switch(r){case"ArrowUp":{const i=n.previousElementSibling;return i?q(i,t):null}case"ArrowDown":{const i=n.nextElementSibling;return i?q(i,t):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const i=Array.from(n.querySelectorAll("td, th"));return i[r==="Home"?0:i.length-1]}}},he=(a,r)=>{const n=Ne(a,r);return n?Te(n)?n:he(n,r):null},V=(a,r)=>{if(!ye(a.key))return;const n=he(r,a.key);if(!n)return;const t=Te(n);t&&(a.preventDefault(),t.focus())},ke=(a,r,n)=>{var d;const t=Ae(r),i=t.indexOf(n);if(i===-1)return;const s=(i+(a.key==="ArrowLeft"?-1:1)+t.length)%t.length;a.preventDefault(),(d=t[s])==null||d.focus()},Be=a=>{const r=a.target,n=r.closest("td, th"),t=r.closest("table");if(t){if(n&&(a.key==="ArrowUp"||a.key==="ArrowDown")){V(a,n);return}if(a.ctrlKey&&n&&(a.key==="Home"||a.key==="End")){V(a,n);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&ke(a,t,r)}},D=T.forwardRef(({caption:a,striped:r=!1,bordered:n=!0,fullWidth:t=!0,loading:i=!1,children:c,"aria-label":s,"aria-describedby":d},o)=>e.jsx("div",{ref:o,onKeyDown:Be,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:C.table,"data-striped":r,"data-bordered":n,"data-full-width":t,"aria-label":s,"aria-describedby":d,"aria-busy":i,children:[a&&e.jsx("caption",{children:a}),c]})}));D.displayName="Table.Root";const v=T.forwardRef(({children:a,sticky:r=!1,"aria-label":n},t)=>e.jsx("thead",{ref:t,className:C.header,"data-sticky":r,"aria-label":n,children:a}));v.displayName="Table.Header";const _=T.forwardRef(({onSortChange:a,sortable:r,sortDirection:n,align:t="left",truncate:i=!1,sortTranslations:c,width:s,noShrink:d=!1,scope:o="col",children:b},u)=>{const m=T.useId(),x=()=>{if(!r||!a)return;a(n===void 0||n==="descending"?"ascending":"descending")},g=()=>{const R=typeof b=="string"?b:"";return n==="ascending"?((c==null?void 0:c.sortDescending)??"Sort by {column} descending").replace("{column}",R):((c==null?void 0:c.sortAscending)??"Sort by {column} ascending").replace("{column}",R)};return e.jsx("th",{ref:u,className:C.headerCell,style:{width:s,textAlign:t},"data-truncate":i,"data-no-shrink":d,role:"columnheader",scope:o,"aria-sort":n,children:r?e.jsx("button",{id:m,onClick:x,className:C.sortButton,"aria-label":g(),children:b}):b})});_.displayName="Table.HeaderCell";const L=T.forwardRef(({stickyFirstColumn:a,children:r},n)=>e.jsx("tbody",{ref:n,className:C.body,"data-sticky-first-column":a,children:r}));L.displayName="Table.Body";const E=T.forwardRef(({selected:a=!1,disabled:r=!1,onClick:n,children:t,"aria-label":i},c)=>{const s=n!==void 0&&!r,d=o=>{s&&(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),n())};return e.jsx("tr",{ref:c,className:C.row,"data-selected":a,"data-interactive":s,"data-disabled":r,role:s?"button":"row",tabIndex:s?0:void 0,"aria-selected":a,"aria-disabled":r,"aria-label":i,onClick:s?n:void 0,onKeyDown:s?d:void 0,children:t})});E.displayName="Table.Row";const $=T.forwardRef(({children:a,align:r="left",truncate:n=!1,"aria-label":t},i)=>e.jsx("td",{ref:i,className:C.rowCell,style:{textAlign:r},"data-truncate":n,"aria-label":t,children:a}));$.displayName="Table.RowCell";const l={Root:D,Header:v,HeaderCell:_,Body:L,Row:E,RowCell:$};D.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{striped:{defaultValue:{value:"false",computed:!1},required:!1},bordered:{defaultValue:{value:"true",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},loading:{defaultValue:{value:"false",computed:!1},required:!1}}};v.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};_.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1},scope:{defaultValue:{value:"'col'",computed:!1},required:!1}}};L.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};E.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1}}};const nl={component:D,subcomponents:{"Table.Header":v,"Table.HeaderCell":_,"Table.Body":L,"Table.Row":E,"Table.RowCell":$},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},ue=[{key:"firstName",label:"First name"},{key:"lastName",label:"Last name"},{key:"age",label:"Age"},{key:"actions",label:"Actions"}],w=[{id:"1",firstName:"Dave",lastName:"McDaveman",age:42,status:"active",lastLogin:"2024-03-15",role:"Admin"},{id:"2",firstName:"John",lastName:"Doe",age:23,status:"pending",lastLogin:"2024-03-14",role:"User"},{id:"3",firstName:"Chris",lastName:"Christman",age:35,status:"inactive",lastLogin:"2024-03-01",role:"Editor"},{id:"4",firstName:"Tod",lastName:"Hunter",age:12,status:"active",lastLogin:"2024-03-15",role:"Viewer"},{id:"5",firstName:"Alice",lastName:"Johnson",age:28,status:"active",lastLogin:"2024-03-16",role:"Admin"},{id:"6",firstName:"Bob",lastName:"Smith",age:45,status:"inactive",lastLogin:"2024-02-28",role:"Editor"}],F=[e.jsx(f,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(me,{size:"16"})},"edit"),e.jsx(f,{size:"small",aspect:"square",emphasis:"weak",variant:"danger",children:e.jsx(Re,{size:"16"})},"delete")],j={args:{striped:!0,fullWidth:!1,loading:!0,caption:"asdsd",bordered:!0},render:()=>{const a=r=>{console.log(`Row ${r} clicked`)};return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsx(l.Row,{children:ue.map(r=>e.jsx(l.HeaderCell,{children:r.label},r.key))})}),e.jsx(l.Body,{children:w.map(r=>e.jsxs(l.Row,{onClick:()=>a(r.id),"aria-label":`${r.firstName} ${r.lastName}'s details`,children:[e.jsx(l.RowCell,{children:r.firstName}),e.jsx(l.RowCell,{children:r.lastName}),e.jsx(l.RowCell,{children:r.age}),e.jsx(l.RowCell,{children:e.jsx(h,{gap:".5rem",children:F})})]},r.id))})]})}},S={render:()=>{const[a,r]=T.useState(""),[n,t]=T.useState("all"),[i,c]=T.useState({}),s=T.useMemo(()=>{let o=[...w];return a&&(o=o.filter(b=>b.firstName.toLowerCase().includes(a.toLowerCase())||b.lastName.toLowerCase().includes(a.toLowerCase()))),n!=="all"&&(o=o.filter(b=>n==="young"?b.age<30:b.age>=30)),Object.keys(i).length>0&&o.sort((b,u)=>{for(const[m,x]of Object.entries(i)){if(x===void 0)continue;const g=m==="name"?`${b.firstName} ${b.lastName}`:b[m],R=m==="name"?`${u.firstName} ${u.lastName}`:u[m];if(g<R)return x==="ascending"?-1:1;if(g>R)return x==="ascending"?1:-1}return 0}),o},[a,n,i]),d=(o,b)=>{c(u=>({...u,[o]:b}))};return e.jsxs(h,{direction:"column",gap:"1rem",children:[e.jsxs(h,{gap:"1rem",children:[e.jsx(W,{placeholder:"Search...",value:a,onChange:o=>r(o.target.value),children:e.jsx(W.Slot,{children:e.jsx(Ce,{})})}),e.jsxs(p.Root,{children:[e.jsx(p.Trigger,{children:e.jsx(f,{children:"Filter by age"})}),e.jsxs(p.Content,{children:[e.jsx(p.Item,{onSelect:()=>t("all"),children:"All"}),e.jsx(p.Item,{onSelect:()=>t("young"),children:"Young"}),e.jsx(p.Item,{onSelect:()=>t("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortable:!0,sortDirection:i.name,onSortChange:o=>d("name",o),children:"Name"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:i.age,onSortChange:o=>d("age",o),children:"Age"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:i.role,onSortChange:o=>d("role",o),children:"Role"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:s.map(o=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${o.firstName}`),children:[e.jsx(l.RowCell,{children:`${o.firstName} ${o.lastName}`}),e.jsx(l.RowCell,{children:o.age}),e.jsx(l.RowCell,{children:o.role}),e.jsx(l.RowCell,{children:e.jsx(h,{gap:".5rem",children:F})})]},o.id))})]})]})}},H={render:()=>{const[a,r]=T.useState(new Set),n=()=>{a.size===w.length?r(new Set):r(new Set(w.map(s=>s.id)))},t=(s,d)=>{s.stopPropagation();const o=new Set(a);o.has(d)?o.delete(d):o.add(d),r(o)},i=a.size===w.length,c=a.size>0&&a.size<w.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(I,{value:c?"indeterminate":i,onChange:n})}),ue.map(({key:s,label:d})=>e.jsx(l.HeaderCell,{children:d},s))]})}),e.jsx(l.Body,{children:w.map(s=>e.jsxs(l.Row,{selected:a.has(s.id),onClick:()=>console.log(`View details for ${s.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(I,{value:a.has(s.id),onChange:d=>t(d,s.id)})}),e.jsx(l.RowCell,{children:s.firstName}),e.jsx(l.RowCell,{children:s.lastName}),e.jsx(l.RowCell,{children:s.age}),e.jsx(l.RowCell,{children:e.jsx(h,{gap:".5rem",children:F})})]},s.id))})]})}},y={name:"Style Variations",render:()=>e.jsxs(h,{direction:"column",gap:"2rem",children:[e.jsxs(l.Root,{striped:!0,caption:"Striped Table",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Default Borders"}),e.jsx(l.HeaderCell,{children:"Normal Row"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{bordered:!1,caption:"Borderless",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Interactive Rows"}),e.jsx(l.HeaderCell,{children:"No Borders"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{striped:!0,fullWidth:!1,caption:"Compact Width",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Auto Width"}),e.jsx(l.HeaderCell,{children:"With Stripes"})]})}),e.jsx(l.Body,{children:w.slice(0,3).map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]})]})},A={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(h,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.status}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},N={name:"Truncation & Width Control",render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",truncate:!0,noShrink:!0,children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"200px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"30%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{truncate:!0,children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.status}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})},k={name:"Sticky Header & Column",render:()=>e.jsx("div",{style:{height:"400px",width:"800px",overflow:"auto",border:"1px solid #ccc"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{noShrink:!0,children:"ID"}),e.jsx(l.HeaderCell,{width:"200px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Role"}),e.jsx(l.HeaderCell,{width:"150px",children:"Status"}),e.jsx(l.HeaderCell,{width:"150px",children:"Last Login"}),e.jsx(l.HeaderCell,{width:"200px",children:"Actions"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:Array.from({length:20}).map((a,r)=>{var n,t,i,c,s;return e.jsxs(l.Row,{onClick:()=>console.log(`Clicked row ${r+1}`),children:[e.jsx(l.RowCell,{children:r+1}),e.jsx(l.RowCell,{truncate:!0,children:`${(n=w[r%6])==null?void 0:n.firstName} ${(t=w[r%6])==null?void 0:t.lastName}`}),e.jsx(l.RowCell,{children:(i=w[r%6])==null?void 0:i.role}),e.jsx(l.RowCell,{children:(c=w[r%6])==null?void 0:c.status}),e.jsx(l.RowCell,{children:(s=w[r%6])==null?void 0:s.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(h,{gap:"0.5rem",children:[e.jsx(f,{size:"small",children:"Edit"}),e.jsx(f,{size:"small",variant:"danger",children:"Delete"})]})})]},r)})})]})})},B={name:"Row States & Interactions",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"State"}),e.jsx(l.HeaderCell,{children:"Description"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{onClick:()=>console.log("Regular click"),children:[e.jsx(l.RowCell,{children:"Interactive Row"}),e.jsx(l.RowCell,{children:"Default state with hover effect and click handler"})]}),e.jsxs(l.Row,{selected:!0,onClick:()=>console.log("Selected click"),children:[e.jsx(l.RowCell,{children:"Selected Row"}),e.jsx(l.RowCell,{children:"Selected state with interaction"})]}),e.jsxs(l.Row,{disabled:!0,children:[e.jsx(l.RowCell,{children:"Disabled Row"}),e.jsx(l.RowCell,{children:"Non-interactive state"})]}),e.jsxs(l.Row,{selected:!0,disabled:!0,children:[e.jsx(l.RowCell,{children:"Selected & Disabled"}),e.jsx(l.RowCell,{children:"Selected but non-interactive"})]}),e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Non-interactive Row"}),e.jsx(l.RowCell,{children:"No click handler, no hover effect"})]})]})]})};var O,z,M;j.parameters={...j.parameters,docs:{...(O=j.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(M=(z=j.parameters)==null?void 0:z.docs)==null?void 0:M.source}}};var P,K,U;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(U=(K=S.parameters)==null?void 0:K.docs)==null?void 0:U.source}}};var J,Y,G;H.parameters={...H.parameters,docs:{...(J=H.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(G=(Y=H.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var Q,X,Z;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Z=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,le,ae;A.parameters={...A.parameters,docs:{...(ee=A.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(ae=(le=A.parameters)==null?void 0:le.docs)==null?void 0:ae.source}}};var re,ne,oe;N.parameters={...N.parameters,docs:{...(re=N.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(oe=(ne=N.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};var te,se,ie;k.parameters={...k.parameters,docs:{...(te=k.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(ie=(se=k.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,ce,we;B.parameters={...B.parameters,docs:{...(de=B.parameters)==null?void 0:de.docs,source:{originalSource:`{
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
}`,...(we=(ce=B.parameters)==null?void 0:ce.docs)==null?void 0:we.source}}};const ol=["Default","WithSearchFilterSort","WithSelection","TableStyles","CellAlignments","ContentTruncation","ScrollBehavior","RowStates"];export{A as CellAlignments,N as ContentTruncation,j as Default,B as RowStates,k as ScrollBehavior,y as TableStyles,S as WithSearchFilterSort,H as WithSelection,ol as __namedExportsOrder,nl as default};
