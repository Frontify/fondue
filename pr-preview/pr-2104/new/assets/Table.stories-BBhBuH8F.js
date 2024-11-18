import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as u}from"./index-BwDkhjyp.js";import{f as me,b as Ce,g as Re}from"./fondue-icons332-DfgDiIyU.js";import{B as x}from"./Button-BD32N3dP.js";import{a as I}from"./Checkbox-B7b4ddnY.js";import{h as C}from"./Dropdown-DlyGJbOq.js";import{F as T}from"./Flex-DCHQJD5L.js";import{T as W}from"./TextInput-C9Jt2mM5.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";import"./index-B0lKOUy8.js";import"./index-BnOD_KYf.js";import"./index-C8IlRUt1.js";import"./index-CAR1Fn1S.js";import"./usePreventDropdownOverflow-DisCSAPV.js";import"./index-DduqEaLY.js";import"./index-BudAUfSk.js";import"./propsToCssVariables-BE5Q_-YS.js";const pe="_table_94tq3_20",xe="_headerCell_94tq3_34",fe="_rowCell_94tq3_35",ge="_body_94tq3_38",je="_row_94tq3_35",Se="_header_94tq3_34",He="_sortButton_94tq3_98",h={table:pe,headerCell:xe,rowCell:fe,body:ge,row:je,header:Se,sortButton:He},be=["button","[href]","input","select","textarea",'[tabindex]:not([tabindex="-1"])'].join(", "),Ae=a=>["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End"].includes(a),ue=a=>(a==null?void 0:a.querySelector(be))??null,ye=a=>Array.from(a.querySelectorAll(be)),q=(a,n)=>a.children[n],Ne=(a,n)=>{const o=a.closest("tr");if(!o)return null;const s=Array.from(o.children).indexOf(a);switch(n){case"ArrowUp":{const r=o.previousElementSibling;return r?q(r,s):null}case"ArrowDown":{const r=o.nextElementSibling;return r?q(r,s):null}case"ArrowLeft":return a.previousElementSibling;case"ArrowRight":return a.nextElementSibling;case"Home":case"End":{const r=Array.from(o.querySelectorAll("td, th"));return r[n==="Home"?0:r.length-1]}}},Te=(a,n)=>{const o=Ne(a,n);return o?ue(o)?o:Te(o,n):null},V=(a,n)=>{if(!Ae(a.key))return;const o=Te(n,a.key);if(!o)return;const s=ue(o);s&&(a.preventDefault(),s.focus())},ke=(a,n,o)=>{var d;const s=ye(n),r=s.indexOf(o);if(r===-1)return;const i=(r+(a.key==="ArrowLeft"?-1:1)+s.length)%s.length;a.preventDefault(),(d=s[i])==null||d.focus()},Be=a=>{const n=a.target,o=n.closest("td, th"),s=n.closest("table");if(s){if(o&&(a.key==="ArrowUp"||a.key==="ArrowDown")){V(a,o);return}if(a.ctrlKey&&o&&(a.key==="Home"||a.key==="End")){V(a,o);return}(a.key==="ArrowLeft"||a.key==="ArrowRight")&&ke(a,s,n)}},v=u.forwardRef(({caption:a,striped:n=!1,bordered:o=!0,fullWidth:s=!0,loading:r=!1,children:c,"aria-label":i,"aria-describedby":d},t)=>e.jsx("div",{ref:t,onKeyDown:Be,role:"grid",tabIndex:-1,children:e.jsxs("table",{className:h.table,"data-striped":n,"data-bordered":o,"data-full-width":s,"aria-label":i,"aria-describedby":d,"aria-busy":r,children:[a&&e.jsx("caption",{children:a}),c]})}));v.displayName="Table.Root";const D=u.forwardRef(({children:a,sticky:n=!1,"aria-label":o},s)=>e.jsx("thead",{ref:s,className:h.header,"data-sticky":n,"aria-label":o,children:a}));D.displayName="Table.Header";const _=u.forwardRef(({onSortChange:a,sortable:n,sortDirection:o,align:s="left",truncate:r=!1,sortTranslations:c,width:i,noShrink:d=!1,scope:t="col",children:w},f)=>{const R=u.useId(),p=()=>{if(!n||!a)return;a(o===void 0||o==="descending"?"ascending":"descending")},g=()=>{const m=typeof w=="string"?w:"";return o==="ascending"?((c==null?void 0:c.sortDescending)??"Sort by {column} descending").replace("{column}",m):((c==null?void 0:c.sortAscending)??"Sort by {column} ascending").replace("{column}",m)};return e.jsx("th",{ref:f,className:h.headerCell,style:{width:i,textAlign:s},"data-truncate":r,"data-no-shrink":d,role:"columnheader",scope:t,"aria-sort":o,children:n?e.jsx("button",{id:R,onClick:p,className:h.sortButton,"aria-label":g(),children:w}):w})});_.displayName="Table.HeaderCell";const L=u.forwardRef(({stickyFirstColumn:a,children:n},o)=>e.jsx("tbody",{ref:o,className:h.body,"data-sticky-first-column":a,children:n}));L.displayName="Table.Body";const E=u.forwardRef(({selected:a=!1,disabled:n=!1,onClick:o,children:s,"aria-label":r},c)=>{const i=o!==void 0&&!n,d=t=>{i&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),o())};return e.jsx("tr",{ref:c,className:h.row,"data-selected":a,"data-interactive":i,"data-disabled":n,role:i?"button":"row",tabIndex:i?0:void 0,"aria-selected":a,"aria-disabled":n,"aria-label":r,onClick:i?o:void 0,onKeyDown:i?d:void 0,children:s})});E.displayName="Table.Row";const $=u.forwardRef(({children:a,align:n="left",truncate:o=!1,"aria-label":s},r)=>e.jsx("td",{ref:r,className:h.rowCell,style:{textAlign:n},"data-truncate":o,"aria-label":s,children:a}));$.displayName="Table.RowCell";const l={Root:v,Header:D,HeaderCell:_,Body:L,Row:E,RowCell:$};v.__docgenInfo={description:"",methods:[],displayName:"Table.Root",props:{striped:{defaultValue:{value:"false",computed:!1},required:!1},bordered:{defaultValue:{value:"true",computed:!1},required:!1},fullWidth:{defaultValue:{value:"true",computed:!1},required:!1},loading:{defaultValue:{value:"false",computed:!1},required:!1}}};D.__docgenInfo={description:"",methods:[],displayName:"Table.Header",props:{sticky:{defaultValue:{value:"false",computed:!1},required:!1}}};_.__docgenInfo={description:"",methods:[],displayName:"Table.HeaderCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1},noShrink:{defaultValue:{value:"false",computed:!1},required:!1},scope:{defaultValue:{value:"'col'",computed:!1},required:!1}}};L.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};E.__docgenInfo={description:"",methods:[],displayName:"Table.Row",props:{selected:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};$.__docgenInfo={description:"",methods:[],displayName:"Table.RowCell",props:{align:{defaultValue:{value:"'left'",computed:!1},required:!1},truncate:{defaultValue:{value:"false",computed:!1},required:!1}}};const ol={component:v,subcomponents:{"Table.Header":D,"Table.HeaderCell":_,"Table.Body":L,"Table.Row":E,"Table.RowCell":$},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},he=[{key:"firstName",label:"First name"},{key:"lastName",label:"Last name"},{key:"age",label:"Age"},{key:"actions",label:"Actions"}],b=[{id:"1",firstName:"Dave",lastName:"McDaveman",age:42,status:"active",lastLogin:"2024-03-15",role:"Admin"},{id:"2",firstName:"John",lastName:"Doe",age:23,status:"pending",lastLogin:"2024-03-14",role:"User"},{id:"3",firstName:"Chris",lastName:"Christman",age:35,status:"inactive",lastLogin:"2024-03-01",role:"Editor"},{id:"4",firstName:"Tod",lastName:"Hunter",age:12,status:"active",lastLogin:"2024-03-15",role:"Viewer"},{id:"5",firstName:"Alice",lastName:"Johnson",age:28,status:"active",lastLogin:"2024-03-16",role:"Admin"},{id:"6",firstName:"Bob",lastName:"Smith",age:45,status:"inactive",lastLogin:"2024-02-28",role:"Editor"}],F=[e.jsx(x,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Ce,{size:"16"})},"edit"),e.jsx(x,{size:"small",aspect:"square",emphasis:"weak",variant:"danger",children:e.jsx(Re,{size:"16"})},"delete")],j={args:{striped:!0,fullWidth:!1,loading:!0,caption:"asdsd",bordered:!0},render:()=>{const a=n=>{console.log(`Row ${n} clicked`)};return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsx(l.Row,{children:he.map(n=>e.jsx(l.HeaderCell,{children:n.label},n.key))})}),e.jsx(l.Body,{children:b.map(n=>e.jsxs(l.Row,{onClick:()=>a(n.id),"aria-label":`${n.firstName} ${n.lastName}'s details`,children:[e.jsx(l.RowCell,{children:n.firstName}),e.jsx(l.RowCell,{children:n.lastName}),e.jsx(l.RowCell,{children:n.age}),e.jsx(l.RowCell,{children:e.jsx(T,{gap:".5rem",children:F})})]},n.id))})]})}},S={render:()=>{const[a,n]=u.useState(""),[o,s]=u.useState("all"),[r,c]=u.useState(null),i=u.useMemo(()=>{let t=[...b];if(a&&(t=t.filter(w=>w.firstName.toLowerCase().includes(a.toLowerCase())||w.lastName.toLowerCase().includes(a.toLowerCase()))),o!=="all"&&(t=t.filter(w=>o==="young"?w.age<30:w.age>=30)),r){const{column:w,direction:f}=r;t.sort((R,p)=>{const g=w==="name"?`${R.firstName} ${R.lastName}`:R[w],m=w==="name"?`${p.firstName} ${p.lastName}`:p[w];return g<m?f==="ascending"?-1:1:g>m?f==="ascending"?1:-1:0})}return t},[a,o,r]),d=(t,w)=>{c({column:t,direction:w})};return e.jsxs(T,{direction:"column",gap:"1rem",children:[e.jsxs(T,{gap:"1rem",children:[e.jsx(W,{placeholder:"Search...",value:a,onChange:t=>n(t.target.value),children:e.jsx(W.Slot,{children:e.jsx(me,{})})}),e.jsxs(C.Root,{children:[e.jsx(C.Trigger,{children:e.jsx(x,{children:"Filter by age"})}),e.jsxs(C.Content,{children:[e.jsx(C.Item,{onSelect:()=>s("all"),children:"All"}),e.jsx(C.Item,{onSelect:()=>s("young"),children:"Young"}),e.jsx(C.Item,{onSelect:()=>s("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortable:!0,sortDirection:(r==null?void 0:r.column)==="name"?r.direction:void 0,onSortChange:t=>d("name",t),children:"Name"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:(r==null?void 0:r.column)==="age"?r.direction:void 0,onSortChange:t=>d("age",t),children:"Age"}),e.jsx(l.HeaderCell,{sortable:!0,sortDirection:(r==null?void 0:r.column)==="role"?r.direction:void 0,onSortChange:t=>d("role",t),children:"Role"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:i.map(t=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${t.firstName}`),children:[e.jsx(l.RowCell,{children:`${t.firstName} ${t.lastName}`}),e.jsx(l.RowCell,{children:t.age}),e.jsx(l.RowCell,{children:t.role}),e.jsx(l.RowCell,{children:e.jsx(T,{gap:".5rem",children:F})})]},t.id))})]})]})}},H={render:()=>{const[a,n]=u.useState(new Set),o=()=>{a.size===b.length?n(new Set):n(new Set(b.map(i=>i.id)))},s=(i,d)=>{i.stopPropagation();const t=new Set(a);t.has(d)?t.delete(d):t.add(d),n(t)},r=a.size===b.length,c=a.size>0&&a.size<b.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(I,{value:c?"indeterminate":r,onChange:o})}),he.map(({key:i,label:d})=>e.jsx(l.HeaderCell,{children:d},i))]})}),e.jsx(l.Body,{children:b.map(i=>e.jsxs(l.Row,{selected:a.has(i.id),onClick:()=>console.log(`View details for ${i.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(I,{value:a.has(i.id),onChange:d=>s(d,i.id)})}),e.jsx(l.RowCell,{children:i.firstName}),e.jsx(l.RowCell,{children:i.lastName}),e.jsx(l.RowCell,{children:i.age}),e.jsx(l.RowCell,{children:e.jsx(T,{gap:".5rem",children:F})})]},i.id))})]})}},A={name:"Style Variations",render:()=>e.jsxs(T,{direction:"column",gap:"2rem",children:[e.jsxs(l.Root,{striped:!0,caption:"Striped Table",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Default Borders"}),e.jsx(l.HeaderCell,{children:"Normal Row"})]})}),e.jsx(l.Body,{children:b.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{bordered:!1,caption:"Borderless",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Interactive Rows"}),e.jsx(l.HeaderCell,{children:"No Borders"})]})}),e.jsx(l.Body,{children:b.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]}),e.jsxs(l.Root,{striped:!0,fullWidth:!1,caption:"Compact Width",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Auto Width"}),e.jsx(l.HeaderCell,{children:"With Stripes"})]})}),e.jsx(l.Body,{children:b.slice(0,3).map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}`),children:[e.jsx(l.RowCell,{children:a.firstName}),e.jsx(l.RowCell,{children:a.role})]},a.id))})]})]})},y={name:"Cell Alignment Options",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:b.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(T,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.status}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},N={name:"Truncation & Width Control",render:()=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",truncate:!0,noShrink:!0,children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"200px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"30%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:b.map(a=>e.jsxs(l.Row,{onClick:()=>console.log(`Clicked ${a.firstName}'s row`),children:[e.jsx(l.RowCell,{truncate:!0,children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.status}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})},k={name:"Sticky Header & Column",render:()=>e.jsx("div",{style:{height:"400px",width:"800px",overflow:"auto",border:"1px solid #ccc"},children:e.jsxs(l.Root,{children:[e.jsx(l.Header,{sticky:!0,children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{noShrink:!0,children:"ID"}),e.jsx(l.HeaderCell,{width:"200px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Role"}),e.jsx(l.HeaderCell,{width:"150px",children:"Status"}),e.jsx(l.HeaderCell,{width:"150px",children:"Last Login"}),e.jsx(l.HeaderCell,{width:"200px",children:"Actions"})]})}),e.jsx(l.Body,{stickyFirstColumn:!0,children:Array.from({length:20}).map((a,n)=>{var o,s,r,c,i;return e.jsxs(l.Row,{onClick:()=>console.log(`Clicked row ${n+1}`),children:[e.jsx(l.RowCell,{children:n+1}),e.jsx(l.RowCell,{truncate:!0,children:`${(o=b[n%6])==null?void 0:o.firstName} ${(s=b[n%6])==null?void 0:s.lastName}`}),e.jsx(l.RowCell,{children:(r=b[n%6])==null?void 0:r.role}),e.jsx(l.RowCell,{children:(c=b[n%6])==null?void 0:c.status}),e.jsx(l.RowCell,{children:(i=b[n%6])==null?void 0:i.lastLogin}),e.jsx(l.RowCell,{children:e.jsxs(T,{gap:"0.5rem",children:[e.jsx(x,{size:"small",children:"Edit"}),e.jsx(x,{size:"small",variant:"danger",children:"Delete"})]})})]},n)})})]})})},B={name:"Row States & Interactions",render:()=>e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"State"}),e.jsx(l.HeaderCell,{children:"Description"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{onClick:()=>console.log("Regular click"),children:[e.jsx(l.RowCell,{children:"Interactive Row"}),e.jsx(l.RowCell,{children:"Default state with hover effect and click handler"})]}),e.jsxs(l.Row,{selected:!0,onClick:()=>console.log("Selected click"),children:[e.jsx(l.RowCell,{children:"Selected Row"}),e.jsx(l.RowCell,{children:"Selected state with interaction"})]}),e.jsxs(l.Row,{disabled:!0,children:[e.jsx(l.RowCell,{children:"Disabled Row"}),e.jsx(l.RowCell,{children:"Non-interactive state"})]}),e.jsxs(l.Row,{selected:!0,disabled:!0,children:[e.jsx(l.RowCell,{children:"Selected & Disabled"}),e.jsx(l.RowCell,{children:"Selected but non-interactive"})]}),e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Non-interactive Row"}),e.jsx(l.RowCell,{children:"No click handler, no hover effect"})]})]})]})};var z,O,M;j.parameters={...j.parameters,docs:{...(z=j.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(M=(O=j.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var P,K,U;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    // Changed to track only the active sort column and direction
    const [activeSort, setActiveSort] = useState<{
      column: string;
      direction: SortDirection;
    } | null>(null);
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];

      // Apply search filter
      if (searchTerm) {
        result = result.filter(row => row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || row.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      // Apply age filter
      if (ageFilter !== 'all') {
        result = result.filter(row => ageFilter === 'young' ? row.age < 30 : row.age >= 30);
      }

      // Apply sort if active
      if (activeSort) {
        const {
          column,
          direction
        } = activeSort;
        result.sort((a, b) => {
          const valueA = column === 'name' ? \`\${a.firstName} \${a.lastName}\` : a[column as keyof TableRow];
          const valueB = column === 'name' ? \`\${b.firstName} \${b.lastName}\` : b[column as keyof TableRow];
          if (valueA < valueB) {
            return direction === 'ascending' ? -1 : 1;
          }
          if (valueA > valueB) {
            return direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return result;
    }, [searchTerm, ageFilter, activeSort]);
    const handleSortChange = (column: string, direction: SortDirection) => {
      setActiveSort({
        column,
        direction
      });
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
                            <Table.HeaderCell sortable sortDirection={activeSort?.column === 'name' ? activeSort.direction : undefined} onSortChange={direction => handleSortChange('name', direction)}>
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sortable sortDirection={activeSort?.column === 'age' ? activeSort.direction : undefined} onSortChange={direction => handleSortChange('age', direction)}>
                                Age
                            </Table.HeaderCell>
                            <Table.HeaderCell sortable sortDirection={activeSort?.column === 'role' ? activeSort.direction : undefined} onSortChange={direction => handleSortChange('role', direction)}>
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
}`,...(G=(Y=H.parameters)==null?void 0:Y.docs)==null?void 0:G.source}}};var Q,X,Z;A.parameters={...A.parameters,docs:{...(Q=A.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(Z=(X=A.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,le,ae;y.parameters={...y.parameters,docs:{...(ee=y.parameters)==null?void 0:ee.docs,source:{originalSource:`{
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
}`,...(ae=(le=y.parameters)==null?void 0:le.docs)==null?void 0:ae.source}}};var ne,oe,re;N.parameters={...N.parameters,docs:{...(ne=N.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(re=(oe=N.parameters)==null?void 0:oe.docs)==null?void 0:re.source}}};var te,se,ie;k.parameters={...k.parameters,docs:{...(te=k.parameters)==null?void 0:te.docs,source:{originalSource:`{
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
}`,...(we=(ce=B.parameters)==null?void 0:ce.docs)==null?void 0:we.source}}};const rl=["Default","WithSearchFilterSort","WithSelection","TableStyles","CellAlignments","ContentTruncation","ScrollBehavior","RowStates"];export{y as CellAlignments,N as ContentTruncation,j as Default,B as RowStates,k as ScrollBehavior,A as TableStyles,S as WithSearchFilterSort,H as WithSelection,rl as __namedExportsOrder,ol as default};
