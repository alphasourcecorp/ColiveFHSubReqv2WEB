import { MenuItemSummaryInfo } from "./menu-item-summary-info";

export class SubscriptionRequestSummary {
    menuItemSummaries: MenuItemSummaryInfo[];
    deliveryFee: number;
    packagingCharges: number;
    deliveryPlan: string;
    deliveryDate: string;
    deliveryTime: string;
    subtotal: number;
    total: number;
    tax: number;
}
