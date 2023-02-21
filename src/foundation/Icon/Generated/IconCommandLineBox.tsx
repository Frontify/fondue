import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconCommandLineBox12 from './IconCommandLineBox12';
import IconCommandLineBox16 from './IconCommandLineBox16';
import IconCommandLineBox20 from './IconCommandLineBox20';
import IconCommandLineBox24 from './IconCommandLineBox24';
import IconCommandLineBox32 from './IconCommandLineBox32';

const IconCommandLineBox = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconCommandLineBox12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconCommandLineBox16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconCommandLineBox20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconCommandLineBox24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconCommandLineBox32 {...props} />}
        </span>
    );
};

const MemoizedIconCommandLineBox = memo(IconCommandLineBox);
MemoizedIconCommandLineBox.displayName = 'FondueIconCommandLineBox';

export default MemoizedIconCommandLineBox;
