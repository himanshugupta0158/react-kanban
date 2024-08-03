// High Priority Icon (Inverted V)
const HighPriorityIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30" // increased width
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="red"
    strokeWidth="3" // semi-bold
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 4 L18 20 M12 4 L6 20" /> {/* Inverted V shape */}
  </svg>
);

// Medium Priority Icon (=)
const MediumPriorityIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="orange"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12 H20 M4 16 H20" />
  </svg>
);

// Low Priority Icon (V)
const LowPriorityIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30" // increased width
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="blue" // changed to blue
    strokeWidth="3" // semi-bold
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 4 L12 20 M18 4 L12 20" /> {/* V shape */}
  </svg>
);

export { HighPriorityIcon, MediumPriorityIcon, LowPriorityIcon };