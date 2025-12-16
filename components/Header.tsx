import React from 'react';
import { Briefcase, Video } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">招商引资文案生成器</h1>
              <p className="text-xs text-gray-500 font-medium">InvestFlow AI • 短视频爆款助手</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
               <Briefcase className="w-3 h-3 mr-1" />
               专业版
             </span>
          </div>
        </div>
      </div>
    </header>
  );
};