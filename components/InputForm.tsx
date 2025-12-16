import React, { useState } from 'react';
import { ScriptRequest, ToneType, ScriptDuration } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: ScriptRequest) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ScriptRequest>({
    brandName: '',
    industry: '',
    targetAudience: '',
    uniqueSellingPoint: '',
    offer: '',
    tone: ToneType.PROFESSIONAL,
    duration: ScriptDuration.MEDIUM,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-indigo-600 rounded-full"></span>
        项目配置
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5 flex-1 overflow-y-auto custom-scrollbar pr-2">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">品牌/项目名称</label>
            <input
              type="text"
              name="brandName"
              required
              placeholder="例如：茶颜悦色 / 智能洗车"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
              value={formData.brandName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属行业</label>
            <input
              type="text"
              name="industry"
              required
              placeholder="例如：餐饮连锁 / 新能源"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">目标人群 (想招募谁?)</label>
          <input
            type="text"
            name="targetAudience"
            required
            placeholder="例如：想要副业的宝妈 / 手里有闲钱的实体老板"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">核心优势 (USP)</label>
          <textarea
            name="uniqueSellingPoint"
            required
            rows={3}
            placeholder="例如：无需大厨，3天回本，总部全程流量扶持..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-none"
            value={formData.uniqueSellingPoint}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">招商政策/福利</label>
          <textarea
            name="offer"
            rows={2}
            placeholder="例如：前50名免加盟费，送装修补贴..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm resize-none"
            value={formData.offer}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">文案风格</label>
            <select
              name="tone"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm bg-white"
              value={formData.tone}
              onChange={handleChange}
            >
              {Object.values(ToneType).map((tone) => (
                <option key={tone} value={tone}>{tone}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">预估时长</label>
            <select
              name="duration"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm bg-white"
              value={formData.duration}
              onChange={handleChange}
            >
              {Object.values(ScriptDuration).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-semibold transition-all shadow-md
              ${isLoading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                正在撰写爆款文案...
              </>
            ) : (
              <>
                <Sparkles className="-ml-1 mr-2 h-5 w-5" />
                立即生成文案
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};