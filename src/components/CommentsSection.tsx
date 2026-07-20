import type { PostComment } from '../lib/blog';

/* Read-only WordPress comment archive under articles. Mirrors what the live
   site shows (name, relative date, threaded replies); no new-comment form —
   the archive is frozen at the 2026-07-10 export. Bodies are rendered as
   plain text (whitespace-pre-line), never as HTML: commenter input is
   untrusted. */

const relativeDate = (iso: string) => {
  const years = (Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000);
  if (years >= 1) {
    const y = Math.floor(years);
    return `${y} year${y === 1 ? '' : 's'} ago`;
  }
  const months = Math.max(1, Math.floor(years * 12));
  return `${months} month${months === 1 ? '' : 's'} ago`;
};

interface CommentNode extends PostComment {
  replies: CommentNode[];
}

const buildTree = (comments: PostComment[]): CommentNode[] => {
  const byId = new Map<number, CommentNode>();
  comments.forEach((comment) => byId.set(comment.id, { ...comment, replies: [] }));
  const roots: CommentNode[] = [];
  byId.forEach((node) => {
    const parent = node.parentId ? byId.get(node.parentId) : undefined;
    if (parent) parent.replies.push(node);
    else roots.push(node);
  });
  return roots;
};

function Comment({ node, depth }: { node: CommentNode; depth: number }) {
  return (
    <li className={depth > 0 ? 'pl-5 md:pl-8 border-l-2 border-black/5' : ''}>
      <div className="py-4">
        <p className="text-[#0D1B3D] font-medium text-sm">
          {node.authorName}
          <span className="text-[#0D1B3D]/40 font-normal ml-2">{relativeDate(node.publishedAt)}</span>
        </p>
        <p className="text-[#0D1B3D]/80 text-[15px] leading-relaxed mt-1.5 whitespace-pre-line">{node.body}</p>
      </div>
      {node.replies.length > 0 && (
        <ul>
          {node.replies.map((reply) => (
            <Comment key={reply.id} node={reply} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentsSection({ comments }: { comments: PostComment[] }) {
  if (comments.length === 0) return null;
  const roots = buildTree(comments);
  return (
    <section className="px-6 pb-24">
      <div className="max-w-[54rem] mx-auto">
        <h2
          className="text-[#0D1B3D] text-2xl md:text-3xl font-medium mb-2"
          style={{ letterSpacing: '-0.02em' }}
        >
          {comments.length} comment{comments.length === 1 ? '' : 's'}
        </h2>
        <p className="text-[#0D1B3D]/50 text-sm mb-6">
          Reader questions and answers from our archive. Comments are closed on this article.
        </p>
        <ul className="bg-white rounded-3xl border border-black/5 px-6 md:px-10 py-2 divide-y divide-black/5">
          {roots.map((root) => (
            <Comment key={root.id} node={root} depth={0} />
          ))}
        </ul>
      </div>
    </section>
  );
}
