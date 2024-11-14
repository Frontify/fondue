import{j as e}from"./jsx-runtime-Nms4Y4qS.js";import{r as w}from"./index-BwDkhjyp.js";import{b as L,d as F}from"./fondue-icons332-iG2pYX5H.js";import{B as R}from"./Button-BD32N3dP.js";import{F as T}from"./Flex-DCHQJD5L.js";import{T as D}from"./TextInput-BMORzYJH.js";import{a as f}from"./Checkbox-BC616o3h.js";import"./_commonjsHelpers-BosuxZz1.js";import"./styleUtilities-CZDH020m.js";import"./focusStyle-IgMhxCMT.js";import"./propsToCssVariables-BE5Q_-YS.js";import"./index-BtCsUTRM.js";import"./index-CS4BWtGh.js";import"./index-BSNoMcJN.js";import"./index-DOnKqARA.js";import"./index-DGaPG0k3.js";import"./index-BgCrdp81.js";import"./index-kUwV4muI.js";import"./index-C1SWbrhG.js";const v="_table_3osd5_2",I="_header_3osd5_10",q="_row_3osd5_15",O="_headerCell_3osd5_24",P="_body_3osd5_43",W="_cell_3osd5_54",M="_rowCell_3osd5_60",m={table:v,header:I,row:q,headerCell:O,body:P,cell:W,rowCell:M},J=({children:a})=>e.jsx("table",{className:m.table,children:a}),$=({children:a})=>e.jsx("thead",{className:m.header,children:a}),G=({onClick:a,style:t,children:c})=>e.jsx("th",{className:m.headerCell,onClick:a,style:t,children:c}),K=({stickyFirstColumn:a,children:t})=>e.jsx("tbody",{className:m.body,"data-sticky-first-column":a,children:t}),Q=({selected:a=!1,children:t})=>e.jsx("tr",{"data-selected":a,className:m.row,children:t}),U=({children:a})=>e.jsx("td",{className:m.rowCell,children:a}),l={Root:J,Header:$,HeaderCell:G,Body:K,Row:Q,RowCell:U},ue={component:l.Root,subcomponents:{"Table.Header":l.Header,"Table.HeaderCell":l.HeaderCell,"Table.Body":l.Body,"Table.Row":l.Row,"Table.RowCell":l.RowCell},tags:["autodocs"],parameters:{status:{type:"released"}},args:{}},g=[{key:"firstName",label:"First name"},{key:"lastName",label:"Last name"},{key:"age",label:"Age"},{key:"actions",label:"Actions"}],d=[{id:"1",firstName:"Dave",lastName:"McDaveman",age:42},{id:"2",firstName:"John",lastName:"Doe",age:23},{id:"3",firstName:"Chris",lastName:"Christman",age:35},{id:"4",firstName:"Tod",lastName:"Hunter",age:12}],z=[e.jsx(R,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(L,{size:"16"})},"edit"),e.jsx(R,{size:"small",aspect:"square",emphasis:"weak",variant:"danger",children:e.jsx(F,{size:"16"})},"delete")],u={render:({...a})=>e.jsxs(l.Root,{...a,children:[e.jsx(l.Header,{children:e.jsx(l.Row,{children:g.map(t=>e.jsx(l.HeaderCell,{children:t.label},t.key))})}),e.jsx(l.Body,{children:d.map(t=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:t.firstName}),e.jsx(l.RowCell,{children:t.lastName}),e.jsx(l.RowCell,{children:t.age}),e.jsx(l.RowCell,{children:e.jsx(T,{gap:".5rem",children:z})})]},t.id))})]})},C={render:()=>{const[a,t]=w.useState(""),[c,x]=w.useState("all"),[n,p]=w.useState({column:null,direction:null}),o=w.useMemo(()=>{let s=[...d];return a&&(s=s.filter(r=>r.firstName.toLowerCase().includes(a.toLowerCase())||r.lastName.toLowerCase().includes(a.toLowerCase()))),c!=="all"&&(s=s.filter(r=>c==="young"?r.age<30:r.age>=30)),n.column&&n.direction&&s.sort((r,S)=>{const h=n.column;return r[h]<S[h]?n.direction==="asc"?-1:1:r[h]>S[h]?n.direction==="asc"?1:-1:0}),s},[a,c,n]),i=s=>{p(r=>({column:s,direction:r.column===s&&r.direction==="asc"?"desc":"asc"}))};return e.jsxs(T,{direction:"column",gap:"1rem",children:[e.jsx(T,{gap:"1rem",children:e.jsx(D,{placeholder:"Search...",value:a,onChange:s=>t(s.target.value)})}),e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsx(l.Row,{children:g.map(({key:s,label:r})=>e.jsxs(l.HeaderCell,{onClick:()=>s!=="actions"&&i(s),style:{cursor:s!=="actions"?"pointer":"default",position:"relative"},children:[r,n.column===s&&e.jsx("span",{style:{marginLeft:"4px"},children:n.direction==="asc"?"↑":"↓"})]},s))})}),e.jsx(l.Body,{children:o.map(s=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:s.firstName}),e.jsx(l.RowCell,{children:s.lastName}),e.jsx(l.RowCell,{children:s.age}),e.jsx(l.RowCell,{children:e.jsx(T,{gap:".5rem",children:z})})]},s.id))})]})]})}},b={render:()=>{const[a,t]=w.useState(new Set),c=()=>{a.size===d.length?t(new Set):t(new Set(d.map(o=>o.id)))},x=o=>{const i=new Set(a);i.has(o)?i.delete(o):i.add(o),t(i)},n=a.size===d.length,p=a.size>0&&a.size<d.length;return e.jsxs(l.Root,{children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(f,{value:p?"indeterminate":n,onChange:c})}),g.map(({key:o,label:i})=>e.jsx(l.HeaderCell,{children:i},o))]})}),e.jsx(l.Body,{children:d.map(o=>e.jsxs(l.Row,{selected:a.has(o.id),children:[e.jsx(l.RowCell,{children:e.jsx(f,{value:a.has(o.id),onChange:()=>x(o.id)})}),e.jsx(l.RowCell,{children:o.firstName}),e.jsx(l.RowCell,{children:o.lastName}),e.jsx(l.RowCell,{children:o.age}),e.jsx(l.RowCell,{children:e.jsxs(T,{gap:".5rem",children:[e.jsx(R,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(L,{size:"16"})}),e.jsx(R,{size:"small",aspect:"square",emphasis:"weak",variant:"danger",children:e.jsx(F,{size:"16"})})]})})]},o.id))})]})}};var j,y,A;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    {TABLE_HEADERS.map(header => <Table.HeaderCell key={header.key}>{header.label}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(row => <Table.Row key={row.id}>
                        <Table.RowCell>{row.firstName}</Table.RowCell>
                        <Table.RowCell>{row.lastName}</Table.RowCell>
                        <Table.RowCell>{row.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(A=(y=u.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var _,k,B;C.parameters={...C.parameters,docs:{...(_=C.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    const [sortConfig, setSortConfig] = useState<SortConfig>({
      column: null,
      direction: null
    });
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];
      if (searchTerm) {
        result = result.filter(row => row.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || row.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (ageFilter !== 'all') {
        result = result.filter(row => ageFilter === 'young' ? row.age < 30 : row.age >= 30);
      }
      if (sortConfig.column && sortConfig.direction) {
        result.sort((a, b) => {
          const key = sortConfig.column as keyof TableRow;
          if (a[key] < b[key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      return result;
    }, [searchTerm, ageFilter, sortConfig]);
    const handleSort = (column: string) => {
      setSortConfig(current => ({
        column,
        direction: current.column === column && current.direction === 'asc' ? 'desc' : 'asc'
      }));
    };
    return <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </Flex>

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {TABLE_HEADERS.map(({
              key,
              label
            }) => <Table.HeaderCell key={key} onClick={() => key !== 'actions' && handleSort(key)} style={{
              cursor: key !== 'actions' ? 'pointer' : 'default',
              position: 'relative'
            }}>
                                    {label}
                                    {sortConfig.column === key && <span style={{
                marginLeft: '4px'
              }}>
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>}
                                </Table.HeaderCell>)}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map(row => <Table.Row key={row.id}>
                                <Table.RowCell>{row.firstName}</Table.RowCell>
                                <Table.RowCell>{row.lastName}</Table.RowCell>
                                <Table.RowCell>{row.age}</Table.RowCell>
                                <Table.RowCell>
                                    <Flex gap=".5rem">{TABLE_ACTIONS}</Flex>
                                </Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </Flex>;
  }
}`,...(B=(k=C.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var N,H,E;b.parameters={...b.parameters,docs:{...(N=b.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const handleSelectAll = () => {
      if (selectedRows.size === TABLE_DATA.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(TABLE_DATA.map(row => row.id)));
      }
    };
    const handleSelectRow = (id: string) => {
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
                    {TABLE_DATA.map(row => <Table.Row key={row.id} selected={selectedRows.has(row.id)}>
                            <Table.RowCell>
                                <Checkbox value={selectedRows.has(row.id)} onChange={() => handleSelectRow(row.id)} />
                            </Table.RowCell>
                            <Table.RowCell>{row.firstName}</Table.RowCell>
                            <Table.RowCell>{row.lastName}</Table.RowCell>
                            <Table.RowCell>{row.age}</Table.RowCell>
                            <Table.RowCell>
                                <Flex gap=".5rem">
                                    <Button size="small" aspect="square" emphasis="weak">
                                        <IconPen size="16" />
                                    </Button>
                                    <Button size="small" aspect="square" emphasis="weak" variant="danger">
                                        <IconTrashBin size="16" />
                                    </Button>
                                </Flex>
                            </Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(E=(H=b.parameters)==null?void 0:H.docs)==null?void 0:E.source}}};const Ce=["Default","WithSearchFilterSort","WithSelection"];export{u as Default,C as WithSearchFilterSort,b as WithSelection,Ce as __namedExportsOrder,ue as default};
