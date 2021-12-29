import { useEffect } from "react";

export default function useClickOutside(ref, setIsShow) {
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);
}
