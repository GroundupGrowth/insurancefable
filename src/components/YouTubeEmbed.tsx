/* Responsive 16:9 YouTube embed matching the live site's video iframes. */

export default function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}?rel=0`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className="block w-full aspect-video rounded-2xl border-0"
    />
  );
}
