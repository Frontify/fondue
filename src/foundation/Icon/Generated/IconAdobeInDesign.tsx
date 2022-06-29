import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconAdobeInDesign12 from './IconAdobeInDesign12';
import IconAdobeInDesign16 from './IconAdobeInDesign16';
import IconAdobeInDesign20 from './IconAdobeInDesign20';
import IconAdobeInDesign24 from './IconAdobeInDesign24';
import IconAdobeInDesign32 from './IconAdobeInDesign32'

function IconAdobeInDesign(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconAdobeInDesign12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconAdobeInDesign16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconAdobeInDesign20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconAdobeInDesign24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconAdobeInDesign32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconAdobeInDesign);
export default Memo;