import { GoogleGenAI } from "@google/genai";
import { ScriptRequest, ToneType, ScriptDuration } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateInvestmentScript = async (request: ScriptRequest): Promise<string> => {
  const prompt = `
    你是一位拥有10年经验的短视频招商文案专家，精通抖音/TikTok算法和用户心理。
    请为以下招商项目撰写一个爆款短视频脚本：

    1. **品牌/项目名称**: ${request.brandName}
    2. **所属行业**: ${request.industry}
    3. **目标人群**: ${request.targetAudience}
    4. **核心优势(USP)**: ${request.uniqueSellingPoint}
    5. **招商政策/福利**: ${request.offer}
    6. **视频风格**: ${request.tone}
    7. **预估时长**: ${request.duration}

    **输出要求**:
    - 请使用Markdown格式。
    - 结构必须清晰，包含以下模块：
      - **【黄金3秒开头】**: 必须要有极其吸引人的Hook（悬念、反差、或直击痛点）。
      - **【痛点/现状】**: 描述行业现状或目标客户的焦虑。
      - **【解决方案/优势】**: 介绍项目如何解决问题，展示盈利模式或差异化。
      - **【信任背书】**: 为什么信你？(强调政策、扶持、数据)。
      - **【超级行动指令(CTA)】**: 强力引导留资或私信。
    - 在每一段台词旁，请括号标注【画面建议/镜头语言】。
    - 语言要口语化、短句为主，富有感染力。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8, // Slightly higher for creativity
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "生成失败，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("无法连接到AI服务，请检查网络或API Key。");
  }
};