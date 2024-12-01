import { motion } from "motion/react";
import Button from "./common/Button";

// Animation Variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const Modal = ({ children, removeModal }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      removeModal();
    }
  };

  return (
    <section
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="p-4 md:px-8 md:py-6 mx-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg max-w-[500px]"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Modal;
