/* Styles */
import "./Frame.css";
/* Animation */
import { motion } from "framer-motion";
export default function Frame(props) {
  return (
    <div className="frame-container">
      <motion.div
        className="frame"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.0 }}
      >
        {props.children}
      </motion.div>
    </div>
  );
}
