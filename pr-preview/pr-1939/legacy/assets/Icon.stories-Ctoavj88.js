        {Object.values(IconEnum).filter(iconName => iconName.includes((args?.size || '16').replace('Size', '')) || !['12', '16', '20', '24', '32'].some(item => iconName.includes(item))).map(iconName => {
    const Icon = AllIcons[\`Icon\${iconName}\`];
    return <li key={iconName} className="tw-flex tw-flex-col tw-items-center tw-text-violet-80 dark:tw-text-white">
                        <Icon {...args} />
                        {iconName}
                    </li>;
  })}
    </ul>`,...(V2=(L2=l.parameters)==null?void 0:L2.docs)==null?void 0:V2.source}}};const sY=["Icon"];export{l as Icon,sY as __namedExportsOrder,tY as default};