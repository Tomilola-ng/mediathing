import type { Conversion } from "@/lib/conversions";

interface ConversionArticleProps {
  conversion: Conversion;
}

export function ConversionArticle({ conversion }: ConversionArticleProps) {
  // Simple markdown-like rendering for the article content
  const renderArticle = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let listItems: string[] = [];
    let listKey = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`} className="text-muted-foreground mb-4">
            {currentParagraph.join(" ")}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${listKey++}`} className="list-disc list-inside space-y-2 mb-4 ml-4 text-muted-foreground">
            {listItems.map((item, idx) => (
              <li key={idx} className="ml-2">
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushParagraph();
        flushList();
        const heading = trimmed.substring(3);
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-8 mb-4">
            {heading}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph();
        flushList();
        const heading = trimmed.substring(4);
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold mt-6 mb-3">
            {heading}
          </h3>
        );
      } else if (trimmed.startsWith("- ")) {
        flushParagraph();
        const item = trimmed.substring(2);
        listItems.push(item);
      } else if (trimmed === "") {
        flushParagraph();
        flushList();
      } else {
        flushList();
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph();
    flushList();

    return elements;
  };

  return (
    <article className="prose prose-sm max-w-none mt-12">
      <div className="space-y-4">{renderArticle(conversion.article)}</div>

      {conversion.benefits.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
            {conversion.benefits.map((benefit, index) => (
              <li key={index} className="ml-2">
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}

      {conversion.useCases.length > 0 && (
        <section className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
            {conversion.useCases.map((useCase, index) => (
              <li key={index} className="ml-2">
                {useCase}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
