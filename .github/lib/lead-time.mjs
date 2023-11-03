/* (c) Copyright Frontify Ltd., all rights reserved. */

export default async function (github, context) {
    const firstCommitDate = await getFirstCommitDate(github, context);
    const readyForReviewDate = await getReviewStartDate(github, context);
    const closeDate = getCloseDate(context);

    const leadTimeSeconds = (closeDate - firstCommitDate) / 1000;
    const reviewTimeSeconds = readyForReviewDate ? (closeDate - readyForReviewDate) / 1000 : 0;

    const comment = formatComment(leadTimeSeconds, reviewTimeSeconds, firstCommitDate, readyForReviewDate, closeDate);

    await writeCommentInPullRequest(github, context, comment);
}

async function getFirstCommitDate(github, context) {
    const commits = await github.rest.pulls.listCommits({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number,
    });

    return parseDate(commits.data[0].commit.author.date);
}

async function getReviewStartDate(github, context) {
    // Pull Request never marked as ready for review, closed as draft
    if (context.payload.pull_request.draft) {
        return null;
    }

    const events = await github.rest.issues.listEvents({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
    });

    const markedAsReady = events.data.find((e) => e.event === 'ready_for_review');

    // Pull Request created as ready from the start
    if (!markedAsReady) {
        return parseDate(context.payload.pull_request.created_at);
    }

    return parseDate(markedAsReady.created_at);
}

function getCloseDate(context) {
    const pullRequest = context.payload.pull_request;
    return parseDate(pullRequest.merged_at ?? pullRequest.closed_at);
}

function parseDate(dateAsString) {
    return dateAsString ? new Date(dateAsString) : null;
}

function formatComment(leadTimeSeconds, reviewTimeSeconds, firstCommitDate, readyForReviewDate, closeDate) {
    const formattedLeadTime = formatDuration(leadTimeSeconds);
    const formattedLeadTimeInHours = formatDurationInHours(leadTimeSeconds);

    const formattedReviewTime = formatDuration(reviewTimeSeconds);
    const formattedReviewTimeInHours = formatDurationInHours(reviewTimeSeconds);

    const formattedFirstCommitDate = formatDate(firstCommitDate);
    const formattedReadyForReviewDate = formatDate(readyForReviewDate);
    const formattedCloseDate = formatDate(closeDate);

    return (
        `Lead time: **${formattedLeadTime}** (${formattedLeadTimeInHours}) from first commit to close.\n` +
        `Review time: ${formattedReviewTime} (${formattedReviewTimeInHours}) from ready for review to close.\n` +
        `\n` +
        `* First commit: ${formattedFirstCommitDate}.\n` +
        `* Ready for review: ${formattedReadyForReviewDate}.\n` +
        `* Closed: ${formattedCloseDate}.`
    );
}

function formatDate(date) {
    return date ? date.toLocaleString('de-CH', { timeZone: 'Europe/Zurich' }) : 'N/A';
}

function formatDuration(seconds) {
    if (seconds === 0) {
        return '0 seconds';
    }

    const duration = {
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor(((seconds % 86400) % 3600) / 60),
        seconds: ((seconds % 86400) % 3600) % 60,
    };

    return Object.entries(duration)
        .filter(([, value]) => value !== 0)
        .map(([key, value]) => `${value} ${key}`)
        .join(', ');
}

function formatDurationInHours(seconds) {
    return seconds === 0 ? '0 total hours' : `${(seconds / 3600).toFixed(2)} total hours`;
}

async function writeCommentInPullRequest(github, context, message) {
    return await github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: message,
    });
}
