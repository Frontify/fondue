import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconQuestionMark12 from './IconQuestionMark12';
import IconQuestionMark16 from './IconQuestionMark16';
import IconQuestionMark20 from './IconQuestionMark20';
import IconQuestionMark24 from './IconQuestionMark24';
import IconQuestionMark32 from './IconQuestionMark32';

const IconQuestionMark = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconQuestionMark12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconQuestionMark16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconQuestionMark20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconQuestionMark24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconQuestionMark32 {...props} />}
        </span>
    );
};
IconQuestionMark.displayName = 'FondueIconQuestionMark';

export default memo(IconQuestionMark);
