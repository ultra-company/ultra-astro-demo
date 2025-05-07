import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button 
      onClick={() => setCount(count + 1)}
      style={{
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '0.25rem',
        backgroundColor: 'var(--sl-color-accent)',
        color: 'var(--sl-color-text-invert)',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      Clicked {count} times
    </button>
  );
}
