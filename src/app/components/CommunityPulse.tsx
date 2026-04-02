'use client';

import { useEffect, useState } from 'react';

const API_BASE = 'https://api.github.com/repos/openclaw/openclaw';

interface RepoData {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface CommitEntry {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

function formatNum(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return String(n);
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function CommunityPulse() {
  const [repo, setRepo] = useState<RepoData | null>(null);
  const [contributorCount, setContributorCount] = useState<number | null>(null);
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [commits, setCommits] = useState<CommitEntry[] | null>(null);
  const [repoError, setRepoError] = useState(false);
  const [contribError, setContribError] = useState(false);
  const [commitsError, setCommitsError] = useState(false);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(setRepo)
      .catch(() => setRepoError(true));

    fetch(`${API_BASE}/contributors?per_page=1`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        const link = res.headers.get('Link');
        if (link) {
          const match = link.match(/page=(\d+)>;\s*rel="last"/);
          if (match) {
            setContributorCount(parseInt(match[1], 10));
            return;
          }
        }
        return res.json().then((data: unknown[]) => {
          setContributorCount(data.length);
        });
      })
      .catch(() => setRepoError(true));

    fetch(`${API_BASE}/contributors?per_page=12`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(setContributors)
      .catch(() => setContribError(true));

    fetch(`${API_BASE}/commits?per_page=8`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(setCommits)
      .catch(() => setCommitsError(true));
  }, []);

  const statsLoading = !repo && !repoError;
  const contribCountLoading = contributorCount === null && !repoError;

  return (
    <section>
      <div className="repo-stats">
        <div className="stat-cell">
          <div className={`stat-num${statsLoading ? ' shimmer' : ''}`}>
            {repoError ? '—' : repo ? formatNum(repo.stargazers_count) : '\u00A0'}
          </div>
          <div className="stat-label">Stars</div>
        </div>
        <div className="stat-cell">
          <div className={`stat-num${statsLoading ? ' shimmer' : ''}`}>
            {repoError ? '—' : repo ? formatNum(repo.forks_count) : '\u00A0'}
          </div>
          <div className="stat-label">Forks</div>
        </div>
        <div className="stat-cell">
          <div className={`stat-num${statsLoading ? ' shimmer' : ''}`}>
            {repoError ? '—' : repo ? formatNum(repo.open_issues_count) : '\u00A0'}
          </div>
          <div className="stat-label">Open Issues</div>
        </div>
        <div className="stat-cell">
          <div className={`stat-num${contribCountLoading ? ' shimmer' : ''}`}>
            {repoError ? '—' : contributorCount !== null ? formatNum(contributorCount) : '\u00A0'}
          </div>
          <div className="stat-label">Contributors</div>
        </div>
      </div>

      <h3 className="contrib-section-title">Top Contributors</h3>
      {contribError ? (
        <p>Unable to load contributors.</p>
      ) : contributors ? (
        <div className="contrib-grid">
          {contributors.map((c) => (
            <a
              key={c.id}
              href={c.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="contrib-card"
            >
              <img
                className="contrib-avatar"
                src={c.avatar_url}
                alt={c.login}
                loading="lazy"
                width={48}
                height={48}
              />
              <span className="contrib-name">{c.login}</span>
              <span className="contrib-count">{c.contributions} commits</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="contrib-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="contrib-card shimmer" />
          ))}
        </div>
      )}

      <h3 className="contrib-section-title">Recent Commits</h3>
      {commitsError ? (
        <p>Unable to load commits.</p>
      ) : commits ? (
        <div className="commits-list">
          {commits.map((c) => (
            <a
              key={c.sha}
              href={c.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="commit-row"
            >
              <img
                className="commit-avatar"
                src={c.author?.avatar_url ?? ''}
                alt={c.author?.login ?? c.commit.author.name}
                loading="lazy"
                width={32}
                height={32}
              />
              <div className="commit-body">
                <span className="commit-msg">
                  {c.commit.message.split('\n')[0]}
                </span>
                <span className="commit-meta">
                  {c.author?.login ?? c.commit.author.name} &middot;{' '}
                  {timeAgo(c.commit.author.date)}
                </span>
              </div>
              <code className="commit-sha">{c.sha.slice(0, 7)}</code>
            </a>
          ))}
        </div>
      ) : (
        <div className="commits-list">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="commit-row shimmer" />
          ))}
        </div>
      )}

      <div className="pulse-footer">
        <span>Live data from the OpenClaw repository</span>
        <a
          href="https://github.com/openclaw/openclaw"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full repo &rarr;
        </a>
      </div>
    </section>
  );
}
