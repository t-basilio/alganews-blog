import ReactMarkdown, { Components } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import gfm from "remark-gfm";

const components: Components = {
  code(props) {

    const { children, className, ref, ...rest } = props;
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={match[1]}
        style={tomorrowNightBlue}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code {...rest} className={className}>
        {children}
      </code>
    );
  },
};

interface MarkdownProps {
  children: string;
}

export default function Markdown(props: MarkdownProps) {
  return (
    <ReactMarkdown
      className={"MarkdownRenderer"}
      remarkPlugins={[gfm]}
      components={components}
    >
      {props.children}
    </ReactMarkdown>
  );
}
