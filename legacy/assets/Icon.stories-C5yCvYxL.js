        {Object.values(IconEnum).filter(iconName => iconName.includes((args?.size || '16').replace('Size', '')) || !['12', '16', '20', '24', '32'].some(item => iconName.includes(item))).map(iconName => {
    const Icon = AllIcons[\`Icon\${iconName}\`];
    return <li key={iconName} className="tw-flex tw-flex-col tw-items-center tw-text-violet-80 dark:tw-text-white">
                        <Icon {...args} />
                        {iconName}
                    </li>;
  })}
    </ul>`,...(G2=(W2=s.parameters)==null?void 0:W2.docs)==null?void 0:G2.source}}};const J00=["Icon"];export{s as Icon,J00 as __namedExportsOrder,Q00 as default};