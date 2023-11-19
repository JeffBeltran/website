import { faSquareQuote } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { buildLink } from "~/utils/helper";

import type { z } from "zod";
import type { SanityRichTextQuoteBlock } from "~/utils/SanitySchemas";

export function RichTextBlockQuote({
  children,
  value,
}: {
  children?: React.ReactNode;
  value?: z.infer<typeof SanityRichTextQuoteBlock>;
}) {
  if (!value) {
    return null;
  }

  const link = buildLink(value.source?.url);

  return (
    <blockquote
      className="border-yellow-300"
      cite={link ? link.href : "Not Available"}
    >
      <p>{value.quote}</p>
      <footer className="flex items-center justify-end not-italic">
        {value.attribution}
        {link && (
          <a
            href={link.href}
            target={link.target}
            rel={link.rel}
            title={value.source?.name || "Unknown Source"}
          >
            <cite className="px-2 font-normal hover:rotate-6">
              <FontAwesomeIcon
                icon={faSquareQuote}
                size="lg"
                className="[--fa-primary-color:#000] [--fa-secondary-color:#fde047] [--fa-secondary-opacity:1]  hover:shadow-lg"
              />
            </cite>
          </a>
        )}
      </footer>
    </blockquote>
  );
}
