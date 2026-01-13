import { motion } from "framer-motion";

interface OnboardingProgressProps {
  progress: number;
}

export const OnboardingProgress = ({ progress }: OnboardingProgressProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-medium text-copper">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-midnight-light rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-copper to-copper-light rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
