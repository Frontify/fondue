/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, expectTypeOf, it } from 'vitest';

import { type CommandsOfPart, defineEditorPart, type EditorApi, type EditorControlApi } from '#/bridge/plugin';
import { bold } from '#/features/marksBold/feature';

import { type CommandOutcome } from '../documentApi';
import { pluginCommand, type PluginCommandSpec } from '../editorApi';
import { type CommandArgs, type CommandOptions, type CommandResult } from '../types';

type Rejected<T extends { status: string }> = Extract<T, { status: 'rejected' }>;

describe('the payload type of a plugin command', () => {
    it('reaches the run, enabled, active and refuses callbacks of the spec', () => {
        type Spec = PluginCommandSpec<EditorApi, { text: string }>;

        expectTypeOf<Parameters<Spec['run']>[1]>().toEqualTypeOf<{ text: string }>();
        expectTypeOf<Parameters<NonNullable<Spec['enabled']>>[1]>().toEqualTypeOf<{ text: string }>();
        expectTypeOf<Parameters<NonNullable<Spec['active']>>[1]>().toEqualTypeOf<{ text: string }>();
        expectTypeOf<Parameters<NonNullable<Spec['refuses']>>[1]>().toEqualTypeOf<{ text: string }>();
        expectTypeOf<Parameters<PluginCommandSpec<EditorApi>['run']>[1]>().toBeNever();
    });

    it('is the one pluginCommand takes from its spec', () => {
        expectTypeOf(pluginCommand<EditorApi, { text: string }>)
            .parameter(0)
            .toEqualTypeOf<PluginCommandSpec<EditorApi, { text: string }>>();
        expect(typeof pluginCommand).toBe('function');
    });

    it('is what the callers of execute pass', () => {
        const part = defineEditorPart(bold, {
            commands: {
                'fixture.say': {
                    payload: { fields: { text: { type: 'string' } } },
                    run: (_api: EditorControlApi, payload: { text: string }) => payload.text !== '',
                },
            },
        });
        type Commands = CommandsOfPart<typeof part>;

        expectTypeOf<Commands['fixture.say']>().toEqualTypeOf<{ text: string }>();
        expectTypeOf<CommandArgs<Commands, 'fixture.say'>>().toEqualTypeOf<
            [payload: { text: string }, options?: CommandOptions]
        >();
    });
});

describe('the code of a rejected outcome', () => {
    it('is the rejection union of a command result, not a string', () => {
        expectTypeOf<Rejected<CommandOutcome>['code']>().toEqualTypeOf<Rejected<CommandResult>['code']>();
        expectTypeOf<Rejected<CommandOutcome>['code']>().not.toEqualTypeOf<string>();
        expectTypeOf<'unknown-command'>().toExtend<Rejected<CommandOutcome>['code']>();
        expectTypeOf<'made-up'>().not.toExtend<Rejected<CommandOutcome>['code']>();
    });
});
