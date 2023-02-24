import { useSearchParams } from "react-router-dom";

export const useCustomSearchParams = (params) => {
  const [search, setSearch] = useSearchParams(params);
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
};
