/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RichTextEditor } from '../RichTextEditor';
import { Position } from '../EditorPositioningWrapper';
import { BoldPlugin, ItalicPlugin, LinkPlugin, PluginComposer, UnorderedListPlugin } from '../Plugins';
import { insertTextAndOpenToolbar } from './fixtures/RichTextEditor';

const RICH_TEXT_EDITOR = '[data-test-id=rich-text-editor]';
const TOOLBAR_FLOATING = '[data-test-id=toolbar-floating]';
const TOOLBAR_BOTTOM = '[data-test-id=toolbar-bottom]';
const TOOLBAR_TOP = '[data-test-id=toolbar-top]';
const TOOLBAR_GROUP_0 = '[data-test-id=toolbar-group-0]';
const TOOLBAR_GROUP_1 = '[data-test-id=toolbar-group-1]';
const TOOLBAR_GROUP_2 = '[data-test-id=toolbar-group-2]';
const TOOLBAR_GROUP_3 = '[data-test-id=toolbar-group-3]';

const RichTextWithToolbarPositioning = ({ position }: { position?: Position }) => (
    <RichTextEditor position={position} />
);

describe('Toolbar', () => {
    it('should render with fixed top toolbar', () => {
        cy.mount(<RichTextWithToolbarPositioning position={Position.TOP} />);

        cy.get(RICH_TEXT_EDITOR).should('be.visible');
        cy.get(TOOLBAR_TOP).should('be.visible');
    });

    it('should render with fixed bottom toolbar', () => {
        cy.mount(<RichTextWithToolbarPositioning position={Position.BOTTOM} />);

        cy.get(RICH_TEXT_EDITOR).should('be.visible');
        cy.get(TOOLBAR_BOTTOM).should('be.visible');
    });

    it('should display toolbar when selecting inserted text', () => {
        cy.mount(<RichTextEditor />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
    });

    it('renders a toolbar with custom controls', () => {
        const plugins = new PluginComposer();
        plugins
            .setPlugin([new LinkPlugin()])
            .setPlugin([new BoldPlugin(), new ItalicPlugin()])
            .setPlugin([new UnorderedListPlugin()]);
        cy.mount(<RichTextEditor plugins={plugins} />);

        insertTextAndOpenToolbar();
        cy.get(TOOLBAR_FLOATING).should('be.visible');
        cy.get(TOOLBAR_GROUP_0).find('[data-testid=ToolbarButton]').should('have.length', 1);
        cy.get(TOOLBAR_GROUP_1).find('[data-testid=ToolbarButton]').should('have.length', 2);
        cy.get(TOOLBAR_GROUP_2).find('[data-testid=ToolbarButton]').should('have.length', 1);
        cy.get(TOOLBAR_GROUP_3).should('not.exist');
    });
});
