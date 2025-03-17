import axios from "axios";
import { useEffect, useState } from "react";
import { TypeCategory } from "../UnauthorisedControls/unauthorizedControl.types";
const useGetCategory = (artworkId: string) => {
  const [category, setCategory] = useState<TypeCategory[] | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/category/${artworkId}`);
        const categoryList = response.data._embedded.genes;

        const refinedCategoryList = categoryList.map((categoryDetails: any) => {
          return {
            id: categoryDetails?.id,
            title: categoryDetails?.name,
            image: categoryDetails?._links?.thumbnail?.href,
          };
        });

        setCategory(refinedCategoryList);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [artworkId]);

  return { category, loading };
};
export default useGetCategory;
