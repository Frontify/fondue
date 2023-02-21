import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconTester12 from './IconTester12';
import IconTester16 from './IconTester16';
import IconTester20 from './IconTester20';
import IconTester24 from './IconTester24';
import IconTester32 from './IconTester32';

const IconTester = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconTester12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconTester16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconTester20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconTester24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconTester32 {...props} />}
        </span>
    );
};

const MemoizedIconTester = memo(IconTester);
MemoizedIconTester.displayName = 'FondueIconTester';

export default MemoizedIconTester;
