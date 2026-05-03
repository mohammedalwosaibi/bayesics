import katex from "katex";

type Props = {
  tex: string;
  className?: string;
};

export function Tex({ tex, className }: Props) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    output: "html",
  });
  return (
    <span
      className={className ? `inline-katex ${className}` : "inline-katex"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function TexBlock({ tex, className }: Props) {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: true,
    output: "html",
  });
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
