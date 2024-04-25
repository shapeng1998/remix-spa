import { throttle } from 'lodash-es';
import { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const WORDS = ['lorem'];

const HighlightContainer = ({
  children,
  words,
}: PropsWithChildren<{ words: string[] }>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState<string | null>(null);

  const showPopover = currentWord !== null;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const allTextNodes = getAllTextNodes(ref.current);
    const ranges = createRangesFromTextNodesAndWords(allTextNodes, words);
    const wordsHighlight = new Highlight(...ranges);
    CSS.highlights.set('highlight-words', wordsHighlight);

    let hoveringRange: HoveringRange | undefined;

    const handleMouseMove = throttle((e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      for (const range of ranges) {
        const { x, y, width, height } = range.getBoundingClientRect();
        const isHovering =
          mouseX > x && mouseY > y && mouseX - x < width && mouseY - y < height;

        if (!isHovering) {
          continue;
        }

        if (hoveringRange && hoveringRange.range === range) {
          if (!hoveringRange.hasSurroundingSpanElement) {
            hoveringRange.surroundSpanElement();
            setCurrentWord('hello');
          }
          return;
        }

        if (hoveringRange) {
          hoveringRange.removeSurroundingSpanElement();
          setCurrentWord(null);
        }

        hoveringRange = new HoveringRange(range);
        hoveringRange.surroundSpanElement();
        setCurrentWord('hello');
        return;
      }

      if (hoveringRange) {
        hoveringRange.removeSurroundingSpanElement();
        setCurrentWord(null);
      }
    }, 300);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      CSS.highlights.clear();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [words]);

  return (
    <>
      <div ref={ref}>{children}</div>
      {showPopover &&
        createPortal(
          <div className="absolute flex items-center justify-center bg-white shadow-sm">
            hello world
          </div>,
          document.body,
        )}
    </>
  );
};

const getAllTextNodes = (root: HTMLElement) => {
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const allTextNodes: Node[] = [];
  let currentNode = treeWalker.nextNode();
  while (currentNode) {
    allTextNodes.push(currentNode);
    currentNode = treeWalker.nextNode();
  }
  return allTextNodes;
};

const createRangesFromTextNodesAndWords = (
  textNodes: Node[],
  words: string[],
) => {
  const ranges = words
    .map((word) => {
      return textNodes.map((el) => {
        const text = el.textContent?.toLowerCase() as string;

        const indices = [];
        let startPos = 0;
        while (startPos < text.length) {
          const index = text.indexOf(word, startPos);
          if (index === -1) break;
          indices.push(index);
          startPos = index + word.length;
        }

        return indices.map((index) => {
          const range = new Range();
          range.setStart(el, index);
          range.setEnd(el, index + word.length);

          return range;
        });
      });
    })
    .flat(2);

  return ranges;
};

class HoveringRange {
  private _range: Range;
  private _surroundingSpanElement: HTMLSpanElement | undefined;
  private _hasSurroundingSpanElement = false;

  constructor(range: Range) {
    this._range = range;
  }

  surroundSpanElement() {
    this._surroundingSpanElement = document.createElement('span');
    this._surroundingSpanElement.style.color = 'blue';
    this._surroundingSpanElement.style.cursor = 'pointer';
    this._range.surroundContents(this._surroundingSpanElement);
    this._hasSurroundingSpanElement = true;
  }

  removeSurroundingSpanElement() {
    if (!this._surroundingSpanElement) {
      return;
    }

    this._surroundingSpanElement.style.removeProperty('color');
    this._surroundingSpanElement.style.removeProperty('cursor');
    this._hasSurroundingSpanElement = false;
  }

  get range() {
    return this._range;
  }

  get hasSurroundingSpanElement() {
    return this._hasSurroundingSpanElement;
  }

  get content() {
    return this._range.toString();
  }
}

const HighlightWordsPage = () => {
  return (
    <HighlightContainer words={WORDS}>
      <BlogPost />
    </HighlightContainer>
  );
};

const BlogPost = () => {
  return (
    <article className="space-y-3 p-2">
      <h1 className="text-lg font-bold">Custom header</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ad
        nisi doloribus deserunt eveniet animi exercitationem suscipit soluta
        eius doloremque blanditiis odit, assumenda repellat ipsum accusantium
        harum voluptatum. Dolores, dicta.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, explicabo.
        Tempore suscipit sunt sapiente totam ratione beatae porro! Perspiciatis
        amet ex ipsum sit facilis suscipit iusto, saepe tempore cupiditate
        possimus.
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, minima!
        Quidem, officia repellat, adipisci magni fuga cum, quae incidunt rem
        nostrum veniam voluptatibus? Enim rerum voluptatibus quos odit natus
        quasi.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
        nesciunt provident, fuga dolor deserunt, dolorem eveniet ex tempora unde
        blanditiis impedit iure culpa commodi aliquam voluptate inventore
        officiis ullam enim.
      </p>
    </article>
  );
};

export default HighlightWordsPage;
