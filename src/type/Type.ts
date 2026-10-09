export interface INavlinks {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  category: string;
}

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface IProductDetails extends IProduct {
  markets?: IMarket[];
}