import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconArrowTopToBottom12 from './IconArrowTopToBottom12';
import IconArrowTopToBottom16 from './IconArrowTopToBottom16';
import IconArrowTopToBottom20 from './IconArrowTopToBottom20';
import IconArrowTopToBottom24 from './IconArrowTopToBottom24';
import IconArrowTopToBottom32 from './IconArrowTopToBottom32';

const IconArrowTopToBottom = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconArrowTopToBottom12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconArrowTopToBottom16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconArrowTopToBottom20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconArrowTopToBottom24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconArrowTopToBottom32 {...props} />}
        </span>
    );
};
IconArrowTopToBottom.displayName = 'FondueIconArrowTopToBottom';

export default memo(IconArrowTopToBottom);
