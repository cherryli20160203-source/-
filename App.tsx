import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ScriptDisplay } from './components/ScriptDisplay';
import { generateInvestmentScript } from './services/geminiService';
import { ScriptRequest } from './types';

function App() {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: ScriptRequest) => {
    setLoading(true);
    setError(null);
    try {
      const script = await generateInvestmentScript(data);
      setGeneratedContent(script);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生了未知错误');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Error Notification */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] min-h-[600px]">
          {/* Left Panel: Inputs */}
          <div className="lg:col-span-4 h-full">
            <InputForm onSubmit={handleGenerate} isLoading={loading} />
          </div>

          {/* Right Panel: Preview */}
          <div className="lg:col-span-8 h-full">
            <ScriptDisplay content={generatedContent} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} InvestFlow AI. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;