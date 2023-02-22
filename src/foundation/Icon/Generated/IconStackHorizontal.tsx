import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconStackHorizontal12 from './IconStackHorizontal12';
import IconStackHorizontal16 from './IconStackHorizontal16';
import IconStackHorizontal20 from './IconStackHorizontal20';
import IconStackHorizontal24 from './IconStackHorizontal24';
import IconStackHorizontal32 from './IconStackHorizontal32';

const IconStackHorizontal = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && !props.filled && <IconStackHorizontal12 {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconStackHorizontal16 {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconStackHorizontal20 {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconStackHorizontal24 {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconStackHorizontal32 {...props} />}
        </span>
    );
};
IconStackHorizontal.displayName = 'FondueIconStackHorizontal';

export default memo(IconStackHorizontal);
