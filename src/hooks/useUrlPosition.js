import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // to use the global state in any component
  const [searchparams] = useSearchParams();
  const lat = searchparams.get("lat");
  const lng = searchparams.get("lng");

  return [lat, lng];
}
