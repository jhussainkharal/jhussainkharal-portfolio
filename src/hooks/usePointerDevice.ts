import { useEffect, useState } from "react";

/** True only for devices with a precise pointer (mouse / trackpad). */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const onChange = () => setFine(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}
