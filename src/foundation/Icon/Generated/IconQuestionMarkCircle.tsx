import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconQuestionMarkCircle12 from './IconQuestionMarkCircle12';
import IconQuestionMarkCircle16 from './IconQuestionMarkCircle16';
import IconQuestionMarkCircle20 from './IconQuestionMarkCircle20';
import IconQuestionMarkCircle24 from './IconQuestionMarkCircle24';
import IconQuestionMarkCircle32 from './IconQuestionMarkCircle32';

const IconQuestionMarkCircle = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconQuestionMarkCircle12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconQuestionMarkCircle16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconQuestionMarkCircle20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconQuestionMarkCircle24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconQuestionMarkCircle32 {...props} />}
        </span>
    );
};

const MemoizedIconQuestionMarkCircle = memo(IconQuestionMarkCircle);
MemoizedIconQuestionMarkCircle.displayName = 'FondueIconQuestionMarkCircle';

export default MemoizedIconQuestionMarkCircle;
