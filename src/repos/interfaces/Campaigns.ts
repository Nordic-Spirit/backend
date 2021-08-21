export interface CampaignProps {
  campaignId: number;
  campaignName: string;
  endsAt: Date;
  discountPercentage: number;
}

export interface CampaignDiscount {
  productId: number;
  discountPercentage: number;
}
