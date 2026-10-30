export type FashionProduct = {
  id: string;
  title: string;
  tag: string;
  colors: [string, string];
  cta: string;
  price: string;
  description?: string;
};

export type CosmeticProduct = {
  id: string;
  name: string;
  type: string;
  emoji: string;
  action: string;
  price: string;
  description?: string;
};

export type MedicalItem = {
  id: string;
  icon: string;
  name: string;
  sub: string;
  description: string;
  price: string;
};
