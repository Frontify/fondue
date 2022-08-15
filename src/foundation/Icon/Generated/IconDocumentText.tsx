import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocumentText12 from './IconDocumentText12';
import IconDocumentText16 from './IconDocumentText16';
import IconDocumentText20 from './IconDocumentText20';
import IconDocumentText24 from './IconDocumentText24';
import IconDocumentText32 from './IconDocumentText32'

function IconDocumentText(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocumentText12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconDocumentText16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconDocumentText20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconDocumentText24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconDocumentText32 {...props}/>}
        </span>
    );
}

export default memo(IconDocumentText);