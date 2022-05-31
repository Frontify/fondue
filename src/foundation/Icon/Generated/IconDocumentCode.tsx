import React, { memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocumentCode12 from './IconDocumentCode12';
import IconDocumentCode16 from './IconDocumentCode16';
import IconDocumentCode20 from './IconDocumentCode20';
import IconDocumentCode24 from './IconDocumentCode24';
import IconDocumentCode32 from './IconDocumentCode32'

function IconDocumentCode(props: GeneratedIconProps): React.ReactElement<GeneratedIconProps> {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocumentCode12 {...props}/>}
            {size === IconSize.Size16 && !props.filled && <IconDocumentCode16 {...props}/>}
            {size === IconSize.Size20 && !props.filled && <IconDocumentCode20 {...props}/>}
            {size === IconSize.Size24 && !props.filled && <IconDocumentCode24 {...props}/>}
            {size === IconSize.Size32 && !props.filled && <IconDocumentCode32 {...props}/>}
        </span>
    );
}

const Memo = memo(IconDocumentCode);
export default Memo;