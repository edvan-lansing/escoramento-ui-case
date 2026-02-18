import Box from "@mui/material/Box";
import { useLocale, useTranslations } from "next-intl";
import ProductsGrid from "./ProductsGrid";
import ProductCategory from "./ProductCategory";
import PromoCard from "./PromoCard";
import FeaturedPromoCard from "./FeaturedPromoCard";
import ResourcesCard from "./ResourcesCard";
import SearchBar from "./SearchBar";
import SectionHeader from "./SectionHeader";
import type { Product, PromoBlock } from "./types";
import theme from "../../../styles/theme";

type ProductsSectionProps = {
  title?: string;
  subtitle?: string;
  products?: Product[];
};

export default function ProductsSection({
  title,
  subtitle,
  products,
}: ProductsSectionProps) {
  const t = useTranslations("Products");
  const locale = useLocale();
  const baseUrl = `https://escoramento.com/${locale}`;

  const resolvedTitle = title ?? t("sectionTitle");
  const resolvedSubtitle = subtitle ?? t("sectionSubtitle");
  const resolvedProducts = products ?? [];

  const priceFromMonth = (price: string) => t("priceFromMonth", { price });

  const sheetPiles: Product[] = [
    {
      imageSrc: "/sheetPiles/U750.webp",
      imageAlt: t("sheetPiles.u750.imageAlt"),
      title: t("sheetPiles.u750.title"),
      description: t("sheetPiles.u750.description"),
      priceFrom: priceFromMonth("R$ 297,00"),
      ctaLabel: t("viewPrices"),
      href: `${baseUrl}/shop/rent/?product_type=estacas-prancha`,
    },
    {
      imageSrc: "/sheetPiles/U800.webp",
      imageAlt: t("sheetPiles.u800.imageAlt"),
      title: t("sheetPiles.u800.title"),
      description: t("sheetPiles.u800.description"),
      priceFrom: priceFromMonth("R$ 530,00"),
      ctaLabel: t("viewPrices"),
      href: `${baseUrl}/shop/rent/?product_type=estacas-prancha`,
    },
    {
      imageSrc: "/sheetPiles/U600.webp",
      imageAlt: t("sheetPiles.u600.imageAlt"),
      title: t("sheetPiles.u600.title"),
      description: t("sheetPiles.u600.description"),
      priceFrom: priceFromMonth("R$ 156,00"),
      ctaLabel: t("viewPrices"),
      href: `${baseUrl}/shop/rent/?product_type=estacas-prancha`,
    },
  ];

  const trenchShielding: Product[] = [
    {
      imageSrc: "/trenchShielding/blindagensLeves.webp",
      imageAlt: t("trenchShielding.light.imageAlt"),
      title: t("trenchShielding.light.title"),
      description: t("trenchShielding.light.description"),
      priceFrom: priceFromMonth("R$ 2.100,00"),
      ctaLabel: t("viewPrices"),
      href: `${baseUrl}/shop/rent/?product_type=blindagens-de-vala`,
    },
    {
      imageSrc: "/trenchShielding/blindagensPesadas.webp",
      imageAlt: t("trenchShielding.heavy.imageAlt"),
      title: t("trenchShielding.heavy.title"),
      description: t("trenchShielding.heavy.description"),
      priceFrom: priceFromMonth("R$ 3.200,00"),
      ctaLabel: t("viewPrices"),
      href: `${baseUrl}/shop/rent/?product_type=blindagens-de-vala`,
    },
    {
      imageSrc: "/trenchShielding/extensoresDeProfundidade.webp",
      imageAlt: t("trenchShielding.depthExtenders.imageAlt"),
      title: t("trenchShielding.depthExtenders.title"),
      description: t("trenchShielding.depthExtenders.description"),
      priceFrom: priceFromMonth("R$ 1.600,00"),
      ctaLabel: t("viewPrices"),
      href: `${baseUrl}/shop/rent/?product_type=blindagens-de-vala`,
    },
  ];

  const materialTecnicoBlock: PromoBlock = {
    id: "technical",
    title: t("promo.technical.title"),
    label: t("promo.technical.label"),
    cardTitle: t("promo.technical.cardTitle"),
    description: t("promo.technical.description"),
    ctaLabel: t("accessContent"),
    href: `${baseUrl}/catalogs/`,
    imageSrc: "/materialTecnico.webp",
    imageAlt: t("promo.technical.imageAlt"),
  };

  const recursosBlock: PromoBlock = {
    id: "resources",
    title: t("promo.resources.title"),
    subtitle: t("promo.resources.subtitle"),
    label: t("promo.resources.label"),
    cardTitle: t("promo.resources.cardTitle"),
    description: t("promo.resources.description"),
    ctaLabel: t("accessContent"),
    href: "https://blog.escoramento.com/",
    imageSrc: "/recursos.webp",
    imageAlt: t("promo.resources.imageAlt"),
  };

  const featuredPromoBlocks: PromoBlock[] = [
    {
      id: "schedule",
      title: t("featured.schedule.title"),
      label: t("featured.schedule.label"),
      cardTitle: t("featured.schedule.cardTitle"),
      description: t("featured.schedule.description"),
      ctaLabel: t("featured.schedule.ctaLabel"),
      href: `${baseUrl}/schedule/`,
      imageSrc: "/agendamento.webp",
      imageAlt: t("featured.schedule.imageAlt"),
    },
    {
      id: "credit",
      title: t("featured.credit.title"),
      label: t("featured.credit.label"),
      cardTitle: t("featured.credit.cardTitle"),
      description: t("featured.credit.description"),
      ctaLabel: t("featured.credit.ctaLabel"),
      href: `${baseUrl}/app/?tab=credit-analysis`,
      imageSrc: "/credito.webp",
      imageAlt: t("featured.credit.imageAlt"),
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        backgroundColor: theme.colors.surface,
        pb: "64px",
        pt: "24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          px: theme.layout.containerPadding,
          "@media (min-width:1080px)": {
            maxWidth: "1200px",
            mx: "auto",
          },
        }}
      >
        <SearchBar />
        <SectionHeader title={resolvedTitle} subtitle={resolvedSubtitle} />

        {resolvedProducts.length ? (
          <ProductsGrid products={resolvedProducts} />
        ) : (
          <Box sx={{ display: "grid" }}>
            <ProductCategory title={t("categories.sheetPiles")} products={sheetPiles} />
            <ProductCategory title={t("categories.trenchShielding")} products={trenchShielding} />
          </Box>
        )}

        <Box sx={{ mt: { xs: "44px", md: "56px" }, display: "grid", gap: "26px" }}>
          <PromoCard block={materialTecnicoBlock} />
          <ResourcesCard block={recursosBlock} />

          {featuredPromoBlocks.map((block) => (
            <FeaturedPromoCard key={block.id} block={block} />
          ))}
        </Box>
      </Box>
    </Box>
  );

}

