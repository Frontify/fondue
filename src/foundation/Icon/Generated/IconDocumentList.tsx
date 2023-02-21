import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconDocumentList12 from './IconDocumentList12';
import IconDocumentList16 from './IconDocumentList16';
import IconDocumentList20 from './IconDocumentList20';
import IconDocumentList24 from './IconDocumentList24';
import IconDocumentList32 from './IconDocumentList32';

const IconDocumentList = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconDocumentList12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconDocumentList16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconDocumentList20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconDocumentList24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconDocumentList32 {...props} />}
        </span>
    );
};

const MemoizedIconDocumentList = memo(IconDocumentList);
MemoizedIconDocumentList.displayName = 'FondueIconDocumentList';

export default MemoizedIconDocumentList;
