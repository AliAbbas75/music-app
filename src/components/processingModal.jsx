
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  "Preparing remix session…",
  "Analyzing track structure…",
  "Separating vocals and instruments…",
  "Creating beat layers…",
  "Mixing and optimizing audio…",
  "Finalizing your track…",
];

const ProcessingModal = ({ completed }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // 🔹 Fake progress while remixing
  useEffect(() => {
    if (completed) return; // stop when done
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 95 ? prev : prev + Math.random() * 3));
    }, 1000);
    return () => clearInterval(interval);
  }, [completed]);

  // 🔹 Step rotation
  useEffect(() => {
    if (completed) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 17000);
    return () => clearInterval(interval);
  }, [completed]);

  // 🔹 Redirect when completed
  useEffect(() => {
    if (completed) {
      setProgress(100);
      const timer = setTimeout(() => navigate("/saved"), 2000);
      return () => clearTimeout(timer);
    }
  }, [completed, navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm text-center"
      >
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
              <motion.p
                key={steps[currentStep]}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-sm font-medium text-gray-700"
              >
                {steps[currentStep]}
              </motion.p>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
                <motion.div
                  className="bg-blue-500 h-2"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Please keep this tab open — remixing takes a few minutes.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-gray-800">
                Remix Ready!
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Redirecting to your saved projects...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProcessingModal;
