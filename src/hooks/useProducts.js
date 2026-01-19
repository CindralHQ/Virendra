import { useProductContext } from "../context/ProductContext.jsx";

const useProducts = () => {
  return useProductContext();
};

export default useProducts;
