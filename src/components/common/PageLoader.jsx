import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)] via-slate-900 to-[var(--color-secondary)]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary)]/10 blur-[100px] rounded-full"
        />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated Logo/Icon */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-blue-600 flex items-center justify-center shadow-2xl shadow-[var(--color-primary)]/50">
            <Droplets size={40} className="text-white" />
          </div>
          
          {/* Ripple Effect */}
          <motion.div
            animate={{
              scale: [1, 2, 2],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 rounded-2xl border-4 border-[var(--color-primary)]"
          />
        </motion.div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-4">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl font-bold text-white uppercase tracking-wider"
          >
            Loading
          </motion.h2>

          {/* Animated Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 rounded-full bg-[var(--color-primary)]"
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PageLoader;
