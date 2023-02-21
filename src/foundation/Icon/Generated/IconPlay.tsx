import React, { ReactElement, memo } from 'react';
import { GeneratedIconProps } from '@foundation/Icon/IconProps';
import { IconSize } from '@foundation/Icon/IconSize';

import IconPlay12Filled from './IconPlay12Filled';
import IconPlay12 from './IconPlay12';
import IconPlay16Filled from './IconPlay16Filled';
import IconPlay16 from './IconPlay16';
import IconPlay20Filled from './IconPlay20Filled';
import IconPlay20 from './IconPlay20';
import IconPlay24Filled from './IconPlay24Filled';
import IconPlay24 from './IconPlay24';
import IconPlay32Filled from './IconPlay32Filled';
import IconPlay32 from './IconPlay32';

const IconPlay = (props: GeneratedIconProps): ReactElement<GeneratedIconProps> => {
    const size = props.size || IconSize.Size16;
    return (
        <span>
            {size === IconSize.Size12 && props.filled && <IconPlay12Filled {...props} />}
            {size === IconSize.Size12 && !props.filled && <IconPlay12 {...props} />}
            {size === IconSize.Size16 && props.filled && <IconPlay16Filled {...props} />}
            {size === IconSize.Size16 && !props.filled && <IconPlay16 {...props} />}
            {size === IconSize.Size20 && props.filled && <IconPlay20Filled {...props} />}
            {size === IconSize.Size20 && !props.filled && <IconPlay20 {...props} />}
            {size === IconSize.Size24 && props.filled && <IconPlay24Filled {...props} />}
            {size === IconSize.Size24 && !props.filled && <IconPlay24 {...props} />}
            {size === IconSize.Size32 && props.filled && <IconPlay32Filled {...props} />}
            {size === IconSize.Size32 && !props.filled && <IconPlay32 {...props} />}
        </span>
    );
};

const MemoizedIconPlay = memo(IconPlay);
MemoizedIconPlay.displayName = 'FondueIconPlay';

export default MemoizedIconPlay;
