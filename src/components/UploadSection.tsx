import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Camera, 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles, 
  X, 
  ArrowRight,
  FileCheck2,
  Home,
  GraduationCap,
  Zap
} from 'lucide-react';
import { SAMPLE_DOCS } from '../data/sampleDocuments.ts';
import { SampleDoc } from '../types.ts';

interface UploadSectionProps {
  onAnalyze: (payload: { text?: string; fileData?: string; mimeType?: string; sampleDoc?: SampleDoc }) => void;
  isLoading: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onAnalyze, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    type: string;
    base64: string;
    previewUrl?: string;
  } | null>(null);
  const [pastedText, setPastedText] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file) return;

    // Check supported types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a supported image (JPG, PNG, WEBP) or PDF document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const sizeKB = (file.size / 1024).toFixed(1);
      const isImg = file.type.startsWith('image/');

      setSelectedFile({
        name: file.name,
        size: `${sizeKB} KB`,
        type: file.type,
        base64,
        previewUrl: isImg ? base64 : undefined,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'upload') {
      if (!selectedFile) return;
      onAnalyze({
        fileData: selectedFile.base64,
        mimeType: selectedFile.type,
      });
    } else {
      if (!pastedText.trim()) return;
      onAnalyze({
        text: pastedText.trim(),
      });
    }
  };

  const handleSampleClick = (sample: SampleDoc) => {
    onAnalyze({
      text: sample.rawText,
      sampleDoc: sample,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Headline */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>India’s Plain-Language Document Decrypter</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Upload any confusing document.
          <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-amber-500">
            Understand it in 30 seconds.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Rental agreements, college fee circulars, utility disconnection threats, or bank notices — get simple breakdowns in English, Hindi, or Marathi with zero legal jargon.
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3.5 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'upload'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload File or Photo</span>
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`flex-1 py-3.5 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 border-b-2 transition ${
              activeTab === 'paste'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/40 dark:bg-indigo-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Document Text</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {activeTab === 'upload' ? (
            <div>
              {!selectedFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
                    dragOver
                      ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40'
                      : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Hidden camera input for mobile photo capture */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center shadow-inner">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                        Drag and drop your document here
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Supports PDF, PNG, JPG, or WEBP (up to 20MB)
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
                      >
                        Browse Files
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          cameraInputRef.current?.click();
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition flex items-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Take a Photo</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Selected File Preview */
                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {selectedFile.previewUrl ? (
                      <img
                        src={selectedFile.previewUrl}
                        alt="Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-300 dark:border-slate-600 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <FileCheck2 className="w-8 h-8" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {selectedFile.size} • {selectedFile.type}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        Ready to analyze
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-2 text-slate-400 hover:text-rose-500 transition rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                      title="Remove file"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white shadow-md flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      <span>Decode Document</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Paste clauses, notice text, or agreement extract:
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste the agreement clauses, university circular, or notice text here..."
                rows={7}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !pastedText.trim()}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 text-white shadow-md flex items-center gap-2 transition disabled:opacity-50"
                >
                  <span>Decode Pasted Text</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Privacy Guarantee */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              <strong>Privacy Guaranteed:</strong> Your document is processed in real-time and never saved to any database.
            </span>
          </div>
        </div>
      </div>

      {/* "Try a Sample" Bar */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Try a Pre-Loaded Sample (1-Click Test)</span>
          </p>
          <span className="text-xs text-slate-400 dark:text-slate-500">No upload needed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_DOCS.map((sample) => {
            const isRental = sample.id === 'rental-mumbai';
            const isCollege = sample.id === 'college-fee-notice';
            return (
              <button
                key={sample.id}
                onClick={() => handleSampleClick(sample)}
                disabled={isLoading}
                className="group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg">
                      {isRental ? '🏠' : isCollege ? '🎓' : '⚡'}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isRental
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          : isCollege
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      }`}
                    >
                      {sample.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {sample.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {sample.category} • Mumbai / Maharashtra jurisdiction
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Evaluate Sample</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
