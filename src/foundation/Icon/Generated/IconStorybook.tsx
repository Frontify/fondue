import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconStorybook12 from './IconStorybook12';
import IconStorybook16 from './IconStorybook16';
import IconStorybook20 from './IconStorybook20';
import IconStorybook24 from './IconStorybook24';
import IconStorybook32 from './IconStorybook32';

const IconStorybook = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconStorybook12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconStorybook16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconStorybook20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconStorybook24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconStorybook32 {...props} />}
        </span>
    );
};

const MemoizedIconStorybook = memo(IconStorybook);
MemoizedIconStorybook.displayName = 'FondueIconStorybook';

export default MemoizedIconStorybook;
