export function BlogArticleContent({ blocks }) {
  return (
    <div className="space-y-6 text-base leading-8 text-slate-700 sm:text-lg">
      {blocks.map((block) => {
        if (block.type === "header") {
          if (block.level >= 3) {
            return (
              <h3
                key={block.id}
                className="text-2xl font-black tracking-tight text-slate-950"
              >
                {block.text}
              </h3>
            );
          }

          return (
            <h2
              key={block.id}
              className="text-3xl font-black tracking-tight text-slate-950"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          const ListTag = block.style === "ordered" ? "ol" : "ul";

          return (
            <ListTag
              key={block.id}
              className={`space-y-3 pl-6 ${
                block.style === "ordered" ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item, index) => (
                <li key={`${block.id}-${index}`}>{item}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={block.id}
              className="rounded-[1.75rem] border border-cyan-100 bg-cyan-50 px-6 py-5 text-lg font-medium italic text-slate-800"
            >
              <p>{block.text}</p>
              {block.caption && (
                <footer className="mt-3 text-sm font-semibold not-italic text-cyan-700">
                  {block.caption}
                </footer>
              )}
            </blockquote>
          );
        }

        return <p key={block.id}>{block.text}</p>;
      })}
    </div>
  );
}
