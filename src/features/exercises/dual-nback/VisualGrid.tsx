import { motion } from 'framer-motion';

interface VisualGridProps {
  position: number | null;
}

export default function VisualGrid({ position }: VisualGridProps) {
  const gridSize = 3;
  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-3 p-6 bg-background rounded-lg">
        {cells.map((cell) => (
          <div
            key={cell}
            className="relative w-20 h-20 rounded-lg border-2 border-gray-700"
          >
            {position === cell && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-primary rounded-lg flex items-center justify-center"
              >
                <div className="w-12 h-12 bg-white rounded-full" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
