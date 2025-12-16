export enum ToneType {
  PROFESSIONAL = '专业权威',
  PASSIONATE = '热血激情',
  STORYTELLING = '故事感人',
  DIRECT = '简单粗暴',
  CONTROVERSIAL = '制造焦虑/反差'
}

export enum ScriptDuration {
  SHORT = '15-30秒',
  MEDIUM = '30-60秒',
  LONG = '60秒以上'
}

export interface ScriptRequest {
  brandName: string;
  industry: string;
  targetAudience: string;
  uniqueSellingPoint: string; // 核心优势
  offer: string; // 招商政策/优惠
  tone: ToneType;
  duration: ScriptDuration;
}

export interface GeneratedScript {
  title: string;
  hook: string;
  painPoints: string;
  solution: string;
  trustBuilders: string; // 信任背书
  callToAction: string;
  fullMarkdown: string;
}