export interface CampaignProps {
  campaignId: number;
  campaignName: string;
  endsAt: Date;
  discountPercentage: number;
}

export interface ProductDiscount {
  productId: number;
  discountPercentage: number;
}
