/**
 * Overlay component that adds a semi-transparent black overlay to an element.
 * The overlay's opacity changes to 50% when the parent element is hovered.
 * 
 * @returns {JSX.Element} The rendered overlay component
 */
export const Overlay = () => {
    return (
      <div className="opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
    );
  };
  