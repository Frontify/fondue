import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCodeDocument12 from './IconCodeDocument12';
import IconCodeDocument16 from './IconCodeDocument16';
import IconCodeDocument20 from './IconCodeDocument20';
import IconCodeDocument24 from './IconCodeDocument24';
import IconCodeDocument32 from './IconCodeDocument32';

const IconCodeDocument = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCodeDocument12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCodeDocument16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCodeDocument20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCodeDocument24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCodeDocument32 {...props} />}
        </span>
    );
};

const MemoizedIconCodeDocument = memo(IconCodeDocument);
MemoizedIconCodeDocument.displayName = 'FondueIconCodeDocument';

export default MemoizedIconCodeDocument;
