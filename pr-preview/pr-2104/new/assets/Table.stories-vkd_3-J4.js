import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as u}from"./index-BwDkhjyp.js";import{f as we,b as be,g as he}from"./fondue-icons332-DfgDiIyU.js";import{B as g}from"./Button-BD32N3dP.js";import{a as L}from"./Checkbox-B7b4ddnY.js";import{h as m}from"./Dropdown-DlyGJbOq.js";import{F as h}from"./Flex-DCHQJD5L.js";import{T as E}from"./TextInput-C9Jt2mM5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const Ce="_tableWrapper_xe9z9_20",Te="_table_xe9z9_20",Re="_headerCell_xe9z9_45",me="_rowCell_xe9z9_46",ue="_body_xe9z9_49",xe="_row_xe9z9_46",ge="_header_xe9z9_45",pe="_sortButton_xe9z9_96",T={tableWrapper:Ce,table:Te,headerCell:Re,rowCell:me,body:ue,row:xe,header:ge,sortButton:pe},se=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),je=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),ie=a=>(a==null?void 0:a.querySelector(se))??null,fe=a=>Array.from(a.querySelectorAll(se)),_=(a,n)=>a.children[n],Se=(a,n)=>{const o=a.closest("tr");if(!o)return null;const s=Array.from(o.children).indexOf(a);switch(n){case"ArrowUp":{const r=o.previousElementSibling;return r?_(r,s):null}case"ArrowDown":{const r=o.nextElementSibling;return r?_(r,s):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const r=Array.from(o.querySelectorAll("td, th"));return r[n==="Home"?0:r.length-1]}}},de=(a,n)=>{const o=Se(a,n);return o?ie(o)?o:de(o,n):null},$=(a,n)=>{if(!je(a.key))return;const o=de(n,a.key);if(!o)return;const s=ie(o);s&&(a.preventDefault(),s.focus())},He=(a,n,o)=>{var t;const s=fe(n),r=s.indexOf(o);if(r===-1)return;const d=(r+(a.key==="ArrowLeft"?-1:1)+s.length)%s.length;a.preventDefault(),(t=s[d])==null||t.focus()},Ae=a=>{const n=a.target,o=n.closest("td, th"),s=n.closest("table");if(s){if(o&&(a.key==="ArrowUp"||a.key==="ArrowDown")){$(a,o);return}if(a.ctrlKey&&o&&(a.key==="Home"||a.key==="End")){$(a,o);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&He(a,s,n)}},ye=({children:a,caption:n,striped:o=!1,bordered:s=!0,fullWidth:r=!0,loading:c=!1,"aria-label":d,"aria-describedby":t})=>e.jsx("div",{onKeyDown:Ae,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:T.table,"data-striped":o,"data-bordered":s,"data-full-width":r,"aria-label":d,"aria-describedby":t,"aria-busy":c,children:[n&&e.jsx("caption",{children:n}),a]})}),ke=({children:a,sticky:n=!1,"aria-label":o})=>e.jsx("thead",{className:T.header,"data-sticky":n,"aria-label":o,children:a}),Ne=({onSortChange:a,style:n,children:o,sortable:s,sortDirection:r,align:c="left",truncate:d=!1,sortTranslations:t,width:i,noShrink:b=!1,scope:C="col",...R})=>{const x=u.useId(),p=()=>{if(!s||!a)return;a(r===void 0||r==="descending"?"ascending":"descending")},j=()=>{const f=typeof o=="string"?o:"";return r==="ascending"?((t==null?void 0:t.sortDescending)??"Sort by {column} descending").replace("{column}",f):r==="descending"?((t==null?void 0:t.removeSort)??"Remove sort from {column}").replace("{column}",f):((t==null?void 0:t.sortAscending)??"Sort by {column} ascending").replace("{column}",f)};return e.jsx("th",{className:T.headerCell,style:{...n,width:i,textAlign:c},"data-truncate":d,"data-no-shrink":b,role:"columnheader",scope:C,"aria-sort":r,...R,children:s?e.jsx("button",{id:x,onClick:p,className:T.sortButton,"aria-label":j(),children:o}):o})},Be=({stickyFirstColumn:a,children:n})=>e.jsx("tbody",{className:T.body,"data-sticky-first-column":a,children:n}),De=({selected:a=!1,disabled:n=!1,onClick:o,children:s,"aria-label":r})=>{const c=o!==void 0&&!n,d=t=>{c&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),o())};return e.jsx("tr",{className:T.row,"data-selected":a,"data-interactive":c,"data-disabled":n,role:c?"button":"row",tabIndex:c?0:void 0,"aria-selected":a,"aria-disabled":n,"aria-label":r,onClick:c?o:void 0,onKeyDown:c?d:void 0,children:s})},ve=({children:a,align:n="left",truncate:o=!1,"aria-label":s})=>e.jsx("td",{className:T.rowCell,style:{textAlign:n},"data-truncate":o,"aria-label":s,children:a}),l={Root:ye,Header:ke,HeaderCell:Ne,Body:Be,Row:De,RowCell:ve},tl={component:l.Root,subcomponents:{"Table.Header":l.Header,"Table.HeaderCell":l.HeaderCell,"Table.Body":l.Body,"Table.Row":l.Row,"Table.RowCell":l.RowCell},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},ce=[{key:"firstName",label:"First name"},{key:"lastName",label:"Last name"},{key:"age",label:"Age"},{key:"actions",label:"Actions"}],w=[{id:"1",firstName:"Dave",lastName:"McDaveman",age:42,status:"active",lastLogin:"2024-03-15",role:"Admin"},{id:"2",firstName:"John",lastName:"Doe",age:23,status:"pending",lastLogin:"2024-03-14",role:"User"},{id:"3",firstName:"Chris",lastName:"Christman",age:35,status:"inactive",lastLogin:"2024-03-01",role:"Editor"},{id:"4",firstName:"Tod",lastName:"Hunter",age:12,status:"active",lastLogin:"2024-03-15",role:"Viewer"},{id:"5",firstName:"Alice",lastName:"Johnson",age:28,status:"active",lastLogin:"2024-03-16",role:"Admin"},{id:"6",firstName:"Bob",lastName:"Smith",age:45,status:"inactive",lastLogin:"2024-02-28",role:"Editor"}],v=[e.jsx(g,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(be,{size:"16"})},"edit"),e.jsx(g,{size:"small",aspect:"square",emphasis:"weak",variant:"danger",children:e.jsx(he,{size:"16"})},"delete")],S={render:()=>{const a=n=>{console.log(`Row ${n} clicked`)};return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsx(l.Row,{children:ce.map(n=>e.jsx(l.HeaderCell,{children:n.label},n.key))})}),e.jsx(l.Body,{children:w.map(n=>e.jsxs(l.Row,{onClick:()=>a(n.id),"aria-label":`${n.firstName} ${n.lastName}'s details`,children:[e.jsx(l.RowCell,{children:n.firstName}),e.jsx(l.RowCell,{children:n.lastName}),e.jsx(l.RowCell,{children:n.age}),e.jsx(l.RowCell,{children:e.jsx(h,{gap:".5rem",children:v})})]},n.id))})]})}},H={render:()=>{const[a,n]=u.useState(""),[o,s]=u.useState("all"),[r,c]=u.useState({}),d=u.useMemo(()=>{let i=[...w];return a&&(i=i.filter(b=>b.firstName.toLowerCase().includes(a.toLowerCase())||b.lastName.toLowerCase().includes(a.toLowerCase()))),o!=="all"&&(i=i.filter(b=>o==="young"?b.age<30:b.age>=30)),Object.keys(r).length>0&&i.sort((b,C)=>{for(const[R,x]of Object.entries(r)){if(x===void 0)continue;const p=R==="name"?`${b.firstName} ${b.lastName}`:b[R],j=R==="name"?`${C.firstName} ${C.lastName}`:C[R];if(p<j)return x==="ascending"?-1:1;if(p>j)return x==="ascending"?1:-1}return 0}),i},[a,o,r]),t=(i,b)=>{c(C=>({...C,[i]:b}))};return e.jsxs(h,{direction:"column",gap:"1rem",children:[e.jsxs(h,{gap:"1rem",children:[e.jsx(E,{placeholder:"Search...",value:a,onChange:i=>n(i.target.value),children:e.jsx(E.Slot,{children:e.jsx(we,{})})}),e.jsxs(m.Root,{children:[e.jsx(m.Trigger,{children:e.jsx(g,{children:"Filter by age"})}),e.jsxs(m.Content,{children:[e.jsx(m.Item,{onSelect:()=>s("all"),children:"All"}),e.jsx(m.Item,{onSelect:()=>s("young"),children:"Young"}),e.jsx(m.Item,{onSelect:()=>s("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortable:!0,sortDirection:r.name,onSortChange:i=>t("name",i),children:"Name"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:r.age,onSortChange:i=>t("age",i),children:"Age"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:r.role,onSortChange:i=>t("role",i),children:"Role"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:d.map(i=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:`${i.firstName} ${i.lastName}`}),e.jsx(l.RowCell,{children:i.age}),e.jsx(l.RowCell,{children:i.role}),e.jsx(l.RowCell,{children:e.jsx(h,{gap:".5rem",children:v})})]},i.id))})]})]})}},A={render:()=>{const[a,n]=u.useState(new Set),o=()=>{a.size===w.length?n(new Set):n(new Set(w.map(d=>d.id)))},s=(d,t)=>{d.stopPropagation();const i=new Set(a);i.has(t)?i.delete(t):i.add(t),n(i)},r=a.size===w.length,c=a.size>0&&a.size<w.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(L,{value:c?"indeterminate":r,onChange:o})}),ce.map(({key:d,label:t})=>e.jsx(l.HeaderCell,{children:t},d))]})}),e.jsx(l.Body,{children:w.map(d=>e.jsxs(l.Row,{selected:a.has(d.id),onClick:()=>console.log(`View details for ${d.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(L,{value:a.has(d.id),onChange:t=>s(t,d.id)})}),e.jsx(l.RowCell,{children:d.firstName}),e.jsx(l.RowCell,{children:d.lastName}),e.jsx(l.RowCell,{children:d.age}),e.jsx(l.RowCell,{children:e.jsx(h,{gap:".5rem",children:v})})]},d.id))})]})}},y={name:"Style Variations",render:()=>e.jsxs(h,{direction:"column",gap:"2rem",children:[e.jsxs(l.Root,{striped:!0,caption:"Striped Table",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Default Borders"}),e.jsx(l.HeaderCell,{children:"Normal Row"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{bordered:!1,caption:"Borderless",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Interactive Rows"}),e.jsx(l.HeaderCell,{children:"No Borders"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{striped:!0,fullWidth:!1,caption:"Compact Width",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Auto Width"}),e.jsx(l.HeaderCell,{children:"With Stripes"})]})}),e.jsx(l.Body,{children:w.slice(0,3).map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]})]})},k={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(h,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.status}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},N={name:"Truncation & Width Control",render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",truncate:!0,noShrink:!0,children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"200px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"30%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:w.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{truncate:!0,children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.status}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})},B={name:"Sticky Header & Column",render:()=>e.jsx("div",{style:{height:"400px",width:"800px",overflow:"auto",border:"1px solid #ccc"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{noShrink:!0,children:"ID"}),e.jsx(l.HeaderCell,{width:"200px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Role"}),e.jsx(l.HeaderCell,{width:"150px",children:"Status"}),e.jsx(l.HeaderCell,{width:"150px",children:"Last Login"}),e.jsx(l.HeaderCell,{width:"200px",children:"Actions"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:Array.from({length:20}).map((a,n)=>{var o,s,r,c,d;return e.jsxs(l.Row,{onClick:()=>console.log(`Clicked row ${n+1}`),children:[e.jsx(l.RowCell,{children:n+1}),e.jsx(l.RowCell,{truncate:!0,children:`${(o=w[n%6])==null?void 0:o.firstName} ${(s=w[n%6])==null?void 0:s.lastName}`}),e.jsx(l.RowCell,{children:(r=w[n%6])==null?void 0:r.role}),e.jsx(l.RowCell,{children:(c=w[n%6])==null?void 0:c.status}),e.jsx(l.RowCell,{children:(d=w[n%6])==null?void 0:d.lastLogin}),e.jsx(l.RowCell,{children:e.jsx("div",{onClick:t=>t.stopPropagation(),children:e.jsxs(h,{gap:"0.5rem",children:[e.jsx(g,{size:"small",children:"Edit"}),e.jsx(g,{size:"small",variant:"danger",children:"Delete"})]})})})]},n)})})]})})},D={name:"Row States & Interactions",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"State"}),e.jsx(l.HeaderCell,{children:"Description"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{onClick:()=>console.log("Regular click"),children:[e.jsx(l.RowCell,{children:"Interactive Row"}),e.jsx(l.RowCell,{children:"Default state with hover effect and click handler"})]}),e.jsxs(l.Row,{selected:!0,onClick:()=>console.log("Selected click"),children:[e.jsx(l.RowCell,{children:"Selected Row"}),e.jsx(l.RowCell,{children:"Selected state with interaction"})]}),e.jsxs(l.Row,{disabled:!0,children:[e.jsx(l.RowCell,{children:"Disabled Row"}),e.jsx(l.RowCell,{children:"Non-interactive state"})]}),e.jsxs(l.Row,{selected:!0,disabled:!0,children:[e.jsx(l.RowCell,{children:"Selected & Disabled"}),e.jsx(l.RowCell,{children:"Selected but non-interactive"})]}),e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Non-interactive Row"}),e.jsx(l.RowCell,{children:"No click handler, no hover effect"})]})]})]})};var F,I,W;S.parameters={...S.parameters,docs:{...(F=S.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(W=(I=S.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var z,O,P;H.parameters={...H.parameters,docs:{...(z=H.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(P=(O=H.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var V,M,K;A.parameters={...A.parameters,docs:{...(V=A.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(K=(M=A.parameters)==null?void 0:M.docs)==null?void 0:K.source}}};var q,U,J;y.parameters={...y.parameters,docs:{...(q=y.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(J=(U=y.parameters)==null?void 0:U.docs)==null?void 0:J.source}}};var Y,G,Q;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
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
}`,...(Q=(G=k.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var X,Z,ee;N.parameters={...N.parameters,docs:{...(X=N.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(ee=(Z=N.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var le,ae,ne;B.parameters={...B.parameters,docs:{...(le=B.parameters)==null?void 0:le.docs,source:{originalSource:`{
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
                                <div onClick={e => e.stopPropagation()}>
                                    <Flex gap="0.5rem">
                                        <Button size="small">Edit</Button>
                                        <Button size="small" variant="danger">
                                            Delete
                                        </Button>
                                    </Flex>
                                </div>
                            </Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(ne=(ae=B.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var oe,re,te;D.parameters={...D.parameters,docs:{...(oe=D.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
}`,...(te=(re=D.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};const sl=["Default","WithSearchFilterSort","WithSelection","TableStyles","CellAlignments","ContentTruncation","ScrollBehavior","RowStates"];export{k as CellAlignments,N as ContentTruncation,S as Default,D as RowStates,B as ScrollBehavior,y as TableStyles,H as WithSearchFilterSort,A as WithSelection,sl as __namedExportsOrder,tl as default};
