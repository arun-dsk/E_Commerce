import ProductInfo from "@/Components/ProductInfo/ProductInfo";

interface PageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({
  params,
}: PageProps) => {
  return (
    <ProductInfo id={params.id} />
  );
};

export default ProductPage;
