import Carousel from "@organisms/Carousel";
import ProductsSection from "@organisms/ProductsSection";
import PageLayout from "@templates/PageLayout";

export default function HomePage() {
  return (
    <PageLayout>
      <Carousel />
      <ProductsSection />
    </PageLayout>
  );
}
