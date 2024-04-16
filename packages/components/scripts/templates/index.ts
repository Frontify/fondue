/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as componentVisualTests from './__tests__/component.ct';
import * as componentFunctionalTests from './__tests__/component.test';
import * as component from './component';
import * as componentStories from './component.stories';
import * as componentStyles from './styles/componentStyles';

export default [
    component.Setup,
    componentStories.Setup,
    componentFunctionalTests.Setup,
    componentVisualTests.Setup,
    componentStyles.Setup,
];
