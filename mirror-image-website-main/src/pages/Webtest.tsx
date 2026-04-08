import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileSearch, CheckCircle2, AlertCircle, X, Leaf, Zap } from "lucide-react";
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

const Webtest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (PNG, JPG).",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Model server error');
      
      const data = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis Complete",
        description: `Result: ${data.class}`,
      });
    } catch (error) {
       toast({
        title: "Analysis Failed",
        description: "Could not connect to the inference engine. Make sure the server is running.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="pt-24 px-6 md:px-12 pb-12 max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30"
          >
            <FileSearch className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Leaf Prediction AI</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a clear photo of a mango leaf to detect diseases and get instant recommendations from our trained DL model.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Upload Section */}
          <section className="space-y-6">
            <div 
              className={`relative border-2 border-dashed rounded-3xl p-8 transition-all duration-300 flex flex-col items-center justify-center min-h-[400px] ${
                preview ? 'border-primary/50 bg-primary/5' : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <AnimatePresence mode="wait">
                {!preview ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to upload</p>
                    <input 
                      type="file" 
                      onChange={onFileChange} 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                    />
                    <button className="bg-white/10 px-6 py-2 rounded-full text-xs font-semibold hover:bg-white/20 transition-all">
                      Choose Image
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full h-full"
                  >
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                    <button 
                      onClick={clearFile}
                      className="absolute top-4 right-4 p-2 bg-black/60 rounded-full hover:bg-black transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              disabled={!file || isAnalyzing}
              onClick={analyzeImage}
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                !file || isAnalyzing 
                ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                : 'bg-primary text-primary-foreground hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ANALYZING SAMPLE...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  START PREDICTION
                </>
              )}
            </button>
          </section>

          {/* Result Section */}
          <section className="bg-white/5 border border-white/10 rounded-3xl p-8 min-h-[400px] flex flex-col">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Analysis Results
            </h2>

            {!result && !isAnalyzing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                <Leaf className="w-16 h-16 mb-4" />
                <p className="text-sm">Upload and start prediction to see results here.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex-1 space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-3">
                    <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
                    <div className="h-2 bg-white/5 rounded-full w-full animate-pulse" />
                  </div>
                ))}
              </div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div>
                  <div className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Classification</div>
                  <div className="text-3xl font-bold">{result.class}</div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold">Confidence Level</span>
                    <span className="text-primary font-bold">{result.confidence}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Detailed Diagnosis
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{result.details}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">Recommended Action</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{result.recommendation}</p>
                  </div>
                </div>

                <button 
                  onClick={clearFile}
                  className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors"
                >
                  SCAN ANOTHER LEAF
                </button>
              </motion.div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Webtest;
