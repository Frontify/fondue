/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { ContentState, convertToRaw } from "draft-js";
import React from "react";
import { RichTextEditor as RichTextEditorComponent, RichTextEditorProps } from "./RichTextEditor";

export default {
    title: "Components/Rich Text Editor",
    component: RichTextEditorComponent,
    args: {
        placeholder: "Some placeholder",
        readonly: false,
    },
    argTypes: {
        onTextChange: { action: "onTextChange" },
    },
} as Meta;

export const RichTextEditor: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <>
        <RichTextEditorComponent {...args} />
    </>
);

export const WithReadonlyState: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent
        {...args}
        value={convertToRaw(ContentState.createFromText("This is some text that you can not edit"))}
    />
);
WithReadonlyState.args = {
    readonly: true,
};

export const RichTextWithHTML: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent
        {...args}
        value={{
            content:
                '<h4><strong>Export docker binaries</strong></h4><p>In your Bash or Bash-like shell config file (e.g. <strong>~/.bashrc</strong> or <strong>~/.zshrc</strong>), add the following at the end:</p><p><code>export PATH&#61;&#34;$PATH:$HOME/frontify/docker/bin&#34;</code></p><p><br class="softbreak" /></p><p>In case you did not clone the repositories in your home directory, you&#039;ll need to update the export command accordingly.</p><p>For example, if you saved the repos in <code>~/dev/code/frontify/</code> , the export should look like this <code>export PATH&#61;&#34;$PATH:$HOME/dev/code/frontify/docker/bin&#34;</code></p><p><br class="softbreak" /></p><h4>Trust development SSL certificate</h4><p>You&#039;ll find the certificate in <code>frontify/docker/private/local_ca.pem</code></p><p>Double click the file, and add it in the login keychain. After adding it, right click on it, press &#34;Get Info&#34; and make sure it&#039;s always trusted.</p><p><br class="softbreak" /></p><p><strong>\u203c\ufe0f You will now need to restart your computer to get the root certificate applied system wide.</strong></p>',
        }}
    />
);

export const RichTextWithHTMLLinks: Story<RichTextEditorProps> = (args: RichTextEditorProps) => (
    <RichTextEditorComponent
        {...args}
        value={{
            content:
                '<p>We have a few prerequisite for the host machine:</p><ul><li><a href="https://git-scm.com/downloads" class="link" data-tooltip-link-label="undefined" target="_blank">Git</a> (installed and <a href="https://weare.frontify.com/document/42#/guidelines/commit-signing" class="link" data-tooltip-link-label="undefined" target="_blank">configured</a>)</li><li><a href="https://nodejs.org/en/download/current/" class="link" data-tooltip-link-label="undefined" target="_blank">Node.js / npm</a> (you can also install Node.js with <a href="https://github.com/tj/n" class="link" data-tooltip-link-label="undefined" target="_blank">n</a> or <a href="https://github.com/nvm-sh/nvm" class="link" data-tooltip-link-label="undefined" target="_blank">nvm</a>)</li><li><a href="https://formulae.brew.sh/formula/php" class="link" data-tooltip-link-label="undefined" target="_blank">PHP</a></li><li><a href="https://getcomposer.org/download/" class="link" data-tooltip-link-label="undefined" target="_blank">Composer</a></li><li><a href="https://www.docker.com/products/docker-desktop" class="link" data-tooltip-link-label="undefined" target="_blank">Docker for Desktop</a> ()</li><li><a href="https://app.blissfully.com/ticket?template&#61;dd005773-30e9-5b2e-ae87-91eb2d3d230f" class="link" data-tooltip-link-label="undefined" target="_blank">AWS credentials</a> (Access to: &#34;AWS&#34;)</li></ul>',
        }}
    />
);
