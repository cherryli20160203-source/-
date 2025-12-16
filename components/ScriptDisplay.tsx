import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, FileText } from 'lucide-react';

interface ScriptDisplayProps {
  content: string;
}

export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">等待生成</h3>
        <p className="max-w-xs text-sm">请在左侧填写您的招商项目信息，AI将为您定制专属的短视频脚本。</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          生成结果
        </h2>
        <button
          onClick={handleCopy}
          className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${copied 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              已复制
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1.5" />
              复制全文
            </>
          )}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-white">
        <article className="prose prose-sm sm:prose-base prose-indigo max-w-none">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-bold text-indigo-700 mt-6 mb-3" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-gray-900 bg-yellow-100 px-1 rounded" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 text-gray-700" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};