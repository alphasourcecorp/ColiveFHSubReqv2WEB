import { DeliveryAddress } from "./delivery-address";
import { DeliverySchedule } from "./delivery-schedule";
import { DishItem } from "./dish-item";

export class SubscriptionRequest {
    partitionKey: string;
    rowKey: string;
    timestamp: Date;
    eTag: string;
    requestId: string;
    companyName: string;
    subscriberName: string;
    emailId: string;
    phoneNumber: string;
    deliveryAddress: DeliveryAddress;
    fullAddress: string;
    subscriptionDate: Date;
    dishItems: DishItem[];
    dishDetails: string;
    plan: string;
    deliverySchedule: DeliverySchedule[];
    deliveryDetails: string;
    totalOrderValue: number;
    status: string;
}
