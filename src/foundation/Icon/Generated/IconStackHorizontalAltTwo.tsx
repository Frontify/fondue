import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconStackHorizontalAltTwo12 from './IconStackHorizontalAltTwo12';
import IconStackHorizontalAltTwo16 from './IconStackHorizontalAltTwo16';
import IconStackHorizontalAltTwo20 from './IconStackHorizontalAltTwo20';
import IconStackHorizontalAltTwo24 from './IconStackHorizontalAltTwo24';
import IconStackHorizontalAltTwo32 from './IconStackHorizontalAltTwo32';

const IconStackHorizontalAltTwo = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconStackHorizontalAltTwo12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconStackHorizontalAltTwo16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconStackHorizontalAltTwo20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconStackHorizontalAltTwo24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconStackHorizontalAltTwo32 {...props} />}
        </span>
    );
};

const MemoizedIconStackHorizontalAltTwo = memo(IconStackHorizontalAltTwo);
MemoizedIconStackHorizontalAltTwo.displayName = 'FondueIconStackHorizontalAltTwo';

export default MemoizedIconStackHorizontalAltTwo;
