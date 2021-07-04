import ComponentFileBuilderResponse from "./ComponentFileBuilderResponse";

export default (): ComponentFileBuilderResponse => ({
    content: `/* (c) Copyright Frontify Ltd., all rights reserved. */

.fooBar {
    color: red;
}
`,
    extension: `.module.css`,
});
