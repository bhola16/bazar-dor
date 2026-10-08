import CategoryProducts from "@/components/CategoryProducts";

export const instant = false;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  return <CategoryProducts category={category} />;
};

export default CategoryPage;
