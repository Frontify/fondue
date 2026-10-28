/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const PACKAGE_NAME = '@frontify/fondue-rich-text-editor';

export const BUMPS = ['patch', 'minor', 'major'] as const;

export type Bump = (typeof BUMPS)[number];

export type PreRelease = { mode: 'pre' };

export type ReleaseInputs = {
    packageVersion: string;
    changesetDir: string;
    packageName?: string;
};

const semverBase = (version: string) => version.split('-')[0] ?? version;

/** `version` raised by `bump`, on its semver base only. */
export const bumped = (version: string, bump: Bump) => {
    const [major = 0, minor = 0, patch = 0] = semverBase(version).split('.').map(Number);
    if (bump === 'major') {
        return `${major + 1}.0.0`;
    }

    if (bump === 'minor') {
        return `${major}.${minor + 1}.0`;
    }

    return `${major}.${minor}.${patch + 1}`;
};

const readChangesetBumps = (changesetDir: string): { packageName: string; bump: Bump }[] => {
    if (!existsSync(changesetDir)) {
        return [];
    }

    const changesets: { packageName: string; bump: Bump }[] = [];
    for (const name of readdirSync(changesetDir)) {
        if (!name.endsWith('.md') || name === 'README.md') {
            continue;
        }

        const frontmatter = /^---\n([\s\S]*?)\n---/.exec(readFileSync(join(changesetDir, name), 'utf8'))?.[1] ?? '';
        for (const line of frontmatter.split('\n')) {
            const match = /^["']?([^"':]+)["']?\s*:\s*(\w+)\s*$/.exec(line.trim());
            if (match?.[1] !== undefined && match[2] !== undefined && BUMPS.includes(match[2] as Bump)) {
                changesets.push({ packageName: match[1], bump: match[2] as Bump });
            }
        }
    }

    return changesets;
};

/** The version these explicit changeset bumps release, else the package version when none name the package. */
export const nextReleaseVersionFromChangesets = (
    packageVersion: string,
    changesets: { packageName: string; bump: Bump }[],
    packageName = PACKAGE_NAME,
): string => {
    let strongest = -1;
    for (const entry of changesets) {
        if (entry.packageName === packageName) {
            strongest = Math.max(strongest, BUMPS.indexOf(entry.bump));
        }
    }

    const kind = BUMPS[strongest];
    if (kind === undefined) {
        return packageVersion;
    }

    return bumped(packageVersion, kind);
};

/** The version the pending changesets release, else the package version when none name the package. */
export const nextReleaseVersion = (inputs: ReleaseInputs): string =>
    nextReleaseVersionFromChangesets(
        inputs.packageVersion,
        readChangesetBumps(inputs.changesetDir),
        inputs.packageName,
    );

/** Changesets pre mode from `pre.json` when present. */
export const readPreRelease = (changesetDir: string): PreRelease | undefined => {
    const path = join(changesetDir, 'pre.json');
    if (!existsSync(path)) {
        return undefined;
    }

    const { mode } = JSON.parse(readFileSync(path, 'utf8')) as { mode?: string };
    if (mode === 'pre') {
        return { mode: 'pre' };
    }

    return undefined;
};

/** The qualification record file version for a release, which pre mode maps to its stable base. */
export const qualificationRecordVersion = (releaseVersion: string, pre: PreRelease | undefined): string => {
    if (pre?.mode === 'pre' && releaseVersion.includes('-')) {
        return semverBase(releaseVersion);
    }

    return releaseVersion;
};

/** Whether a release must already hold its qualification record before it publishes. */
export const mustHoldQualificationRecord = (releaseVersion: string): boolean => semverBase(releaseVersion) === '1.0.0';
