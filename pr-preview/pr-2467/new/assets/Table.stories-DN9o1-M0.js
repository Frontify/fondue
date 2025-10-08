import{j as e}from"./jsx-runtime-BYYWji4R.js";import{r as b}from"./index-ClcD9ViR.js";import{b as Le,d as Be,r as De,n as Fe}from"./fondue-icons352-BBEDZbgo.js";import{B}from"./Button-iQhkEP3o.js";import{a as F}from"./Checkbox-B7EwceAu.js";import{h as w}from"./Dropdown--wvauiBp.js";import{F as D}from"./Flex-BQUHScux.js";import{S as k}from"./Switch-BtXhaboh.js";import{T as I}from"./TextInput-CmGguwuZ.js";import{T as ke,a as Ie,b as Ee,c as _e,d as ze,e as Oe,f as l}from"./Table-meDDHFLK.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./styleUtilities-Byf6Fdv2.js";import"./focusStyle-IgMhxCMT.js";import"./index-Q_VQqEV0.js";import"./index-CWz5EflU.js";import"./index-DulyF36n.js";import"./index-BZQsQlpo.js";import"./index-sY83p_TZ.js";import"./index-BezEZHzC.js";import"./index-CMmqAaFT.js";import"./index-BUMxx5F6.js";import"./index-DVmTVPLY.js";import"./index-CZKF78Oq.js";import"./index-JHbJ-wYR.js";import"./component-CwHimZIW.js";import"./index-CisXfU_o.js";import"./ThemeProvider-DDjiMsZ4.js";import"./propsToCssVariables-DuhnUZvM.js";import"./useSyncRefs-DL7P6UVA.js";import"./domUtilities-DGDVwu3_.js";import"./Box-DbLh-rE3.js";import"./LoadingCircle-BOPZyYIZ.js";const Rl={component:Oe,subcomponents:{"Table.Header":ze,"Table.HeaderCell":_e,"Table.Body":Ee,"Table.Row":Ie,"Table.RowCell":ke},tags:["autodocs"],parameters:{status:{type:"released"}},args:{"aria-label":"User Management Table"},argTypes:{layout:{control:{type:"select",options:["auto","fixed"]},defaultValue:"auto"}}},t=[{id:1,firstName:"Chris",lastName:"Glasser",name:"Chris Glasser",age:32,role:"Senior Developer",email:"c.a.glasser@outlook.com",invited:"Rhonda Rhodes",lastSeen:"Oct 23, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:2,firstName:"David",lastName:"Elson",name:"David Elson",age:28,role:"Product Manager",email:"david29@gmail.com",invited:"Rodger Struck",lastSeen:"Oct 21, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:3,firstName:"Eddie",lastName:"Lake",name:"Eddie Lake",age:35,role:"UX Designer",email:"eddie_lake@gmail.com",invited:"Frances Swann",lastSeen:"Nov 11, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:4,firstName:"James",lastName:"Hall",name:"James Hall",age:41,role:"Technical Lead",email:"james_hall@gmail.com",invited:"Alex Buckmaster",lastSeen:"Nov 12, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0},{id:5,firstName:"Jerry",lastName:"Helfer",name:"Jerry Helfer",age:39,role:"Frontend Developer",email:"jerry73@aol.com",invited:"Bradley Lawlor",lastSeen:"Nov 1, 2024",initialLogin:"SSO",lastLogin:"SSO",twoFa:!0}],C={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Admin"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"}),e.jsx(l.HeaderCell,{children:"Analytics access"}),e.jsx(l.HeaderCell,{children:"Actions"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:e.jsx(k,{size:"small","aria-label":"Admin"})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"}),e.jsx(l.RowCell,{children:e.jsx(k,{size:"small","aria-label":"Analytics"})}),e.jsx(l.RowCell,{children:e.jsxs(D,{gap:"0.25rem",children:[e.jsx(B,{size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Le,{size:16})}),e.jsx(B,{variant:"danger",size:"small",aspect:"square",emphasis:"weak",children:e.jsx(Be,{size:16})})]})})]},a.email))})]})},h={render:({...r})=>e.jsxs(l.Root,{...r,fontSize:"small",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},x={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},R={render:({...r})=>e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs("tr",{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Name"}),e.jsx(l.HeaderCell,{children:"Role"}),e.jsx(l.HeaderCell,{children:"Last Seen"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:a.name}),e.jsx(l.RowCell,{children:a.role}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.id))})]})},j={render:({...r})=>{const[a,i]=b.useState(null),[o,d]=b.useState(),m=[...t].sort((n,s)=>{if(!a||!o)return 0;const c=n[a],T=s[a];return o==="ascending"?c>T?1:-1:c<T?1:-1});return e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{sortDirection:a==="name"?o:void 0,onSortChange:n=>{i("name"),d(n)},children:"Name"}),e.jsx(l.HeaderCell,{truncate:!0,sortDirection:a==="invited"?o:void 0,onSortChange:n=>{i("invited"),d(n)},state:"loading",loadingStateAriaLabel:"Loading Data",children:"Invited by"}),e.jsx(l.HeaderCell,{sortDirection:a==="lastSeen"?o:void 0,onSortChange:n=>{i("lastSeen"),d(n)},children:"Last seen"})]})}),e.jsx(l.Body,{children:m.map(n=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:n.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:n.email})]})})}),e.jsx(l.RowCell,{truncate:!0,children:n.invited}),e.jsx(l.RowCell,{children:n.lastSeen})]},n.email))})]})}},u={render:({...r})=>e.jsxs(l.Root,{...r,sticky:"head",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"250px",children:"Name"}),e.jsx(l.HeaderCell,{width:"150px",children:"Invited by"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last seen"}),e.jsx(l.HeaderCell,{width:"120px",children:"Initial login"}),e.jsx(l.HeaderCell,{width:"120px",children:"Last login"}),e.jsx(l.HeaderCell,{width:"80px",children:"2FA"})]})}),e.jsx(l.Body,{children:[...t,...t,...t,...t,...t,...t].map((a,i)=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},`${a.email}-${i}`))})]})},p={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,sticky:"col",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},g={parameters:{viewport:{viewports:{mobile:{name:"Mobile",styles:{width:"320px",height:"600px"}}},defaultViewport:"mobile"}},render:({...r})=>e.jsxs(l.Root,{...r,sticky:"both",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Initial login"}),e.jsx(l.HeaderCell,{children:"Last login"}),e.jsx(l.HeaderCell,{children:"2FA"})]})}),e.jsx(l.Body,{children:[...t,...t,...t].map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:a.initialLogin}),e.jsx(l.RowCell,{children:a.lastLogin}),e.jsx(l.RowCell,{children:a.twoFa?"Yes":"No"})]},a.email))})]})},H={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"}),e.jsx(l.HeaderCell,{children:"Action"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen}),e.jsx(l.RowCell,{children:e.jsx(B,{onPress:()=>alert("Button pressed — this does NOT trigger row click"),children:e.jsx("span",{children:"Press me"})})})]},a.email))})]})},v={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:t.map((a,i)=>e.jsxs(l.Row,{onClick:()=>alert(`Clicked on ${a.name}`),disabled:i%3===0,children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},S={render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Caption,{children:"User Management Dashboard"}),e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{children:"Last seen"})]})}),e.jsx(l.Body,{children:t.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:e.jsx("div",{className:"tw-flex tw-items-center tw-gap-2",children:e.jsxs("div",{children:[e.jsx("div",{className:"tw-font-medium",children:a.name}),e.jsx("div",{className:"tw-text-sm tw-text-gray-500",children:a.email})]})})}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{children:a.lastSeen})]},a.email))})]})},y={render:({...r})=>e.jsx("div",{style:{width:"500px"},children:e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{truncate:!0,children:"Name"}),e.jsx(l.HeaderCell,{children:"Invited by"}),e.jsx(l.HeaderCell,{truncate:!0,children:"Last seen"})]})}),e.jsx(l.Body,{children:t.slice(0,5).map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{truncate:!0,children:a.name}),e.jsx(l.RowCell,{children:a.invited}),e.jsx(l.RowCell,{truncate:!0,children:a.lastSeen})]},a.email))})]})})},A={render:({...r})=>{const[a,i]=b.useState(""),[o,d]=b.useState("all"),m=b.useMemo(()=>{let n=[...t];return a&&(n=n.filter(s=>s.firstName.toLowerCase().includes(a.toLowerCase())||s.lastName.toLowerCase().includes(a.toLowerCase()))),o!=="all"&&(n=n.filter(s=>o==="young"?s.age<30:s.age>=30)),n},[a,o]);return e.jsxs(D,{direction:"column",gap:"1rem",children:[e.jsxs(D,{gap:"1rem",children:[e.jsx(I,{placeholder:"Search...",value:a,onChange:n=>i(n.target.value),children:e.jsx(I.Slot,{children:e.jsx(De,{size:"16"})})}),e.jsxs(w.Root,{children:[e.jsx(w.Trigger,{children:e.jsxs(B,{emphasis:"default",children:[e.jsx(Fe,{size:"16"}),"Filter by age"]})}),e.jsxs(w.Content,{children:[e.jsx(w.Item,{onSelect:()=>d("all"),children:"All"}),e.jsx(w.Item,{onSelect:()=>d("young"),children:"Young"}),e.jsx(w.Item,{onSelect:()=>d("old"),children:"Old"})]})]})]}),e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"}),e.jsx(l.HeaderCell,{children:"Role"})]})}),e.jsx(l.Body,{children:m.map(n=>e.jsxs(l.Row,{onClick:()=>console.log(`View details for ${n.firstName}`),children:[e.jsx(l.RowCell,{children:n.name}),e.jsx(l.RowCell,{children:n.age}),e.jsx(l.RowCell,{children:n.role})]},n.id))})]})]})}},f={render:({...r})=>{const[a,i]=b.useState(()=>new Set),o=()=>{a.size===t.length?i(new Set):i(new Set(t.map(s=>s.id)))},d=(s,c)=>{s.stopPropagation();const T=new Set(a);T.has(c)?T.delete(c):T.add(c),i(T)},m=a.size===t.length,n=a.size>0&&a.size<t.length;return e.jsxs(l.Root,{...r,"aria-multiselectable":!0,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:e.jsx(F,{value:n?"indeterminate":m,onChange:o})}),e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Age"})]})}),e.jsx(l.Body,{children:t.map(s=>e.jsxs(l.Row,{selected:a.has(s.id),onClick:()=>console.log(`View details for ${s.firstName}`),children:[e.jsx(l.RowCell,{children:e.jsx(F,{value:a.has(s.id),onChange:c=>d(c,s.id)})}),e.jsx(l.RowCell,{children:s.name}),e.jsx(l.RowCell,{children:s.age})]},s.id))})]})}},N={name:"Cell Alignment Options",render:({...r})=>e.jsxs(l.Root,{...r,children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{align:"left",children:"Left Header"}),e.jsx(l.HeaderCell,{align:"center",children:"Centered Header"}),e.jsx(l.HeaderCell,{align:"right",children:"Right Header"}),e.jsx(l.HeaderCell,{align:"left",children:"Mixed Alignment"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{align:"left",children:a.firstName}),e.jsx(l.RowCell,{align:"center",children:a.role}),e.jsx(l.RowCell,{align:"right",children:a.age}),e.jsx(l.RowCell,{children:e.jsxs(D,{justify:"space-between",align:"center",children:[e.jsx("span",{children:a.invited}),e.jsx("span",{children:a.lastLogin})]})})]},a.id))})]})},L={render:({...r})=>e.jsx("div",{style:{width:"800px"},children:e.jsxs(l.Root,{...r,layout:"fixed",children:[e.jsx(l.Header,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{width:"100px",children:"Fixed Width & No Shrink"}),e.jsx(l.HeaderCell,{width:"100px",truncate:!0,children:"Truncated Very Long Header Title That Should Be Cut Off"}),e.jsx(l.HeaderCell,{width:"50%",children:"Percentage Width"}),e.jsx(l.HeaderCell,{children:"Auto Width"})]})}),e.jsx(l.Body,{children:t.map(a=>e.jsxs(l.Row,{children:[e.jsx(l.RowCell,{children:"Fixed Width Content"}),e.jsx(l.RowCell,{truncate:!0,children:`${a.firstName} ${a.lastName} - ${a.role} - ${a.lastLogin}`}),e.jsx(l.RowCell,{children:"Normal Cell"}),e.jsx(l.RowCell,{children:"Auto Width Content"})]},a.id))})]})})};var E,_,z;C.parameters={...C.parameters,docs:{...(E=C.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Admin</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                    <Table.HeaderCell>Analytics access</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Admin" />
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        <Table.RowCell>
                            <Switch size="small" aria-label="Analytics" />
                        </Table.RowCell>

                        <Table.RowCell>
                            <Flex gap="0.25rem">
                                <Button size="small" aspect="square" emphasis="weak">
                                    <IconPen size={16} />
                                </Button>
                                <Button variant="danger" size="small" aspect="square" emphasis="weak">
                                    <IconTrashBin size={16} />
                                </Button>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(z=(_=C.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var O,$,V;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} fontSize="small">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(V=($=h.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};var W,M,P;x.parameters={...x.parameters,docs:{...(W=x.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(P=(M=x.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var Y,U,q;R.parameters={...R.parameters,docs:{...(Y=R.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} layout="fixed">
            <Table.Header>
                <tr>
                    <Table.HeaderCell width="100px">Name</Table.HeaderCell>
                    <Table.HeaderCell>Role</Table.HeaderCell>
                    <Table.HeaderCell>Last Seen</Table.HeaderCell>
                </tr>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell>{user.name}</Table.RowCell>
                        <Table.RowCell>{user.role}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(q=(U=R.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var J,G,X;j.parameters={...j.parameters,docs:{...(J=j.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>();
    const sortedUsers = [...TABLE_DATA].sort((a, b) => {
      if (!sortField || !sortDirection) {
        return 0;
      }
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      if (sortDirection === 'ascending') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    return <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell sortDirection={sortField === 'name' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('name');
            setSortDirection(direction);
          }}>
                            Name
                        </Table.HeaderCell>
                        <Table.HeaderCell truncate sortDirection={sortField === 'invited' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('invited');
            setSortDirection(direction);
          }} state="loading" loadingStateAriaLabel="Loading Data">
                            Invited by
                        </Table.HeaderCell>
                        <Table.HeaderCell sortDirection={sortField === 'lastSeen' ? sortDirection : undefined} onSortChange={direction => {
            setSortField('lastSeen');
            setSortDirection(direction);
          }}>
                            Last seen
                        </Table.HeaderCell>
                        {/* Other columns without sorting */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sortedUsers.map(user => <Table.Row key={user.email}>
                            <Table.RowCell>
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell truncate>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(X=(G=j.parameters)==null?void 0:G.docs)==null?void 0:X.source}}};var K,Q,Z;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args} sticky="head">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width="250px">Name</Table.HeaderCell>
                    <Table.HeaderCell width="150px">Invited by</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last seen</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Initial login</Table.HeaderCell>
                    <Table.HeaderCell width="120px">Last login</Table.HeaderCell>
                    <Table.HeaderCell width="80px">2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map((user, index) => <Table.Row key={\`\${user.email}-\${index}\`}>
                            <Table.RowCell>
                                <div className="tw-flex tw-items-center tw-gap-2">
                                    <div>
                                        <div className="tw-font-medium">{user.name}</div>
                                        <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                            </Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell>{user.lastSeen}</Table.RowCell>
                            <Table.RowCell>{user.initialLogin}</Table.RowCell>
                            <Table.RowCell>{user.lastLogin}</Table.RowCell>
                            <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                        </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Z=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,le,ae;p.parameters={...p.parameters,docs:{...(ee=p.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args} sticky="col">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ae=(le=p.parameters)==null?void 0:le.docs)==null?void 0:ae.source}}};var re,ne,te;g.parameters={...g.parameters,docs:{...(re=g.parameters)==null?void 0:re.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '600px'
          }
        }
      },
      defaultViewport: 'mobile'
    }
  },
  render: ({
    ...args
  }) => <Table.Root {...args} sticky="both">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Initial login</Table.HeaderCell>
                    <Table.HeaderCell>Last login</Table.HeaderCell>
                    <Table.HeaderCell>2FA</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {[...TABLE_DATA, ...TABLE_DATA, ...TABLE_DATA].map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>{user.initialLogin}</Table.RowCell>
                        <Table.RowCell>{user.lastLogin}</Table.RowCell>
                        <Table.RowCell>{user.twoFa ? 'Yes' : 'No'}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(te=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var se,ie,oe;H.parameters={...H.parameters,docs:{...(se=H.parameters)==null?void 0:se.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                        <Table.RowCell>
                            <Button onPress={() => alert('Button pressed — this does NOT trigger row click')}>
                                <span>Press me</span>
                            </Button>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(oe=(ie=H.parameters)==null?void 0:ie.docs)==null?void 0:oe.source}}};var de,ce,Te;v.parameters={...v.parameters,docs:{...(de=v.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map((user, index) => <Table.Row key={user.email} onClick={() => alert(\`Clicked on \${user.name}\`)} disabled={index % 3 === 0}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(Te=(ce=v.parameters)==null?void 0:ce.docs)==null?void 0:Te.source}}};var we,be,me;S.parameters={...S.parameters,docs:{...(we=S.parameters)==null?void 0:we.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Caption>User Management Dashboard</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Invited by</Table.HeaderCell>
                    <Table.HeaderCell>Last seen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.slice(0, 5).map(user => <Table.Row key={user.email}>
                        <Table.RowCell>
                            <div className="tw-flex tw-items-center tw-gap-2">
                                <div>
                                    <div className="tw-font-medium">{user.name}</div>
                                    <div className="tw-text-sm tw-text-gray-500">{user.email}</div>
                                </div>
                            </div>
                        </Table.RowCell>
                        <Table.RowCell>{user.invited}</Table.RowCell>
                        <Table.RowCell>{user.lastSeen}</Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(me=(be=S.parameters)==null?void 0:be.docs)==null?void 0:me.source}}};var Ce,he,xe;y.parameters={...y.parameters,docs:{...(Ce=y.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '500px'
  }}>
            <Table.Root {...args}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell truncate>Name</Table.HeaderCell>
                        <Table.HeaderCell>Invited by</Table.HeaderCell>
                        <Table.HeaderCell truncate>Last seen</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.slice(0, 5).map(user => <Table.Row key={user.email}>
                            <Table.RowCell truncate>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.invited}</Table.RowCell>
                            <Table.RowCell truncate>{user.lastSeen}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(xe=(he=y.parameters)==null?void 0:he.docs)==null?void 0:xe.source}}};var Re,je,ue;A.parameters={...A.parameters,docs:{...(Re=A.parameters)==null?void 0:Re.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [ageFilter, setAgeFilter] = useState<'all' | 'young' | 'old'>('all');
    const filteredAndSortedData = useMemo(() => {
      let result = [...TABLE_DATA];
      if (searchTerm) {
        result = result.filter(user => user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
      }
      if (ageFilter !== 'all') {
        result = result.filter(user => ageFilter === 'young' ? user.age < 30 : user.age >= 30);
      }
      return result;
    }, [searchTerm, ageFilter]);
    return <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                    <TextInput placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}>
                        <TextInput.Slot>
                            <IconMagnifier size="16" />
                        </TextInput.Slot>
                    </TextInput>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            <Button emphasis="default">
                                <IconFunnel size="16" />
                                Filter by age
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item onSelect={() => setAgeFilter('all')}>All</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('young')}>Young</Dropdown.Item>
                            <Dropdown.Item onSelect={() => setAgeFilter('old')}>Old</Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </Flex>

                <Table.Root {...args}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {filteredAndSortedData.map(user => <Table.Row key={user.id} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
                                <Table.RowCell>{user.name}</Table.RowCell>
                                <Table.RowCell>{user.age}</Table.RowCell>
                                <Table.RowCell>{user.role}</Table.RowCell>
                            </Table.Row>)}
                    </Table.Body>
                </Table.Root>
            </Flex>;
  }
}`,...(ue=(je=A.parameters)==null?void 0:je.docs)==null?void 0:ue.source}}};var pe,ge,He;f.parameters={...f.parameters,docs:{...(pe=f.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(() => new Set());
    const handleSelectAll = () => {
      if (selectedRows.size === TABLE_DATA.length) {
        setSelectedRows(new Set());
      } else {
        setSelectedRows(new Set(TABLE_DATA.map(user => user.id)));
      }
    };
    const handleSelectRow = (event: FormEvent<HTMLButtonElement>, id: number) => {
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
    return <Table.Root {...args} aria-multiselectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Checkbox value={isPartiallySelected ? 'indeterminate' : isAllSelected} onChange={handleSelectAll} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(user => <Table.Row key={user.id} selected={selectedRows.has(user.id)} onClick={() => console.log(\`View details for \${user.firstName}\`)}>
                            <Table.RowCell>
                                <Checkbox value={selectedRows.has(user.id)} onChange={event => handleSelectRow(event, user.id)} />
                            </Table.RowCell>
                            <Table.RowCell>{user.name}</Table.RowCell>
                            <Table.RowCell>{user.age}</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>;
  }
}`,...(He=(ge=f.parameters)==null?void 0:ge.docs)==null?void 0:He.source}}};var ve,Se,ye;N.parameters={...N.parameters,docs:{...(ve=N.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  name: 'Cell Alignment Options',
  render: ({
    ...args
  }) => <Table.Root {...args}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell align="left">Left Header</Table.HeaderCell>
                    <Table.HeaderCell align="center">Centered Header</Table.HeaderCell>
                    <Table.HeaderCell align="right">Right Header</Table.HeaderCell>
                    <Table.HeaderCell align="left">Mixed Alignment</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {TABLE_DATA.map(user => <Table.Row key={user.id}>
                        <Table.RowCell align="left">{user.firstName}</Table.RowCell>
                        <Table.RowCell align="center">{user.role}</Table.RowCell>
                        <Table.RowCell align="right">{user.age}</Table.RowCell>
                        <Table.RowCell>
                            <Flex justify="space-between" align="center">
                                <span>{user.invited}</span>
                                <span>{user.lastLogin}</span>
                            </Flex>
                        </Table.RowCell>
                    </Table.Row>)}
            </Table.Body>
        </Table.Root>
}`,...(ye=(Se=N.parameters)==null?void 0:Se.docs)==null?void 0:ye.source}}};var Ae,fe,Ne;L.parameters={...L.parameters,docs:{...(Ae=L.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  render: ({
    ...args
  }) => <div style={{
    width: '800px'
  }}>
            <Table.Root {...args} layout="fixed">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width="100px">Fixed Width & No Shrink</Table.HeaderCell>
                        <Table.HeaderCell width="100px" truncate>
                            Truncated Very Long Header Title That Should Be Cut Off
                        </Table.HeaderCell>
                        <Table.HeaderCell width="50%">Percentage Width</Table.HeaderCell>
                        <Table.HeaderCell>Auto Width</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {TABLE_DATA.map(user => <Table.Row key={user.id}>
                            <Table.RowCell>Fixed Width Content</Table.RowCell>
                            <Table.RowCell truncate>
                                {\`\${user.firstName} \${user.lastName} - \${user.role} - \${user.lastLogin}\`}
                            </Table.RowCell>
                            <Table.RowCell>Normal Cell</Table.RowCell>
                            <Table.RowCell>Auto Width Content</Table.RowCell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
}`,...(Ne=(fe=L.parameters)==null?void 0:fe.docs)==null?void 0:Ne.source}}};const jl=["Basic","SmallText","AutoLayout","FixedLayout","Sortable","StickyHead","StickyFirstColumn","StickyHeadAndCol","Interactive","Disabled","WithCaption","TruncatedContent","WithSearchAndFilters","WithSelection","CellAlignments","WidthControl"];export{x as AutoLayout,C as Basic,N as CellAlignments,v as Disabled,R as FixedLayout,H as Interactive,h as SmallText,j as Sortable,p as StickyFirstColumn,u as StickyHead,g as StickyHeadAndCol,y as TruncatedContent,L as WidthControl,S as WithCaption,A as WithSearchAndFilters,f as WithSelection,jl as __namedExportsOrder,Rl as default};
