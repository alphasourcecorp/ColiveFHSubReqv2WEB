import { Injectable } from "@angular/core";
import { DeliverySchedule } from "../models/delivery-schedule";
import { DishItem } from "../models/dish-item";
import { MenuItemSummaryInfo } from "../models/menu-item-summary-info";
import { SubscriberInfo } from "../models/subscriber-info";
import { SubscriptionRequest } from "../models/subscription-request";
import { SubscriptionRequestSummary } from "../models/subscription-request-summary";

const INVALID_PARAMETERS = "Invalid Request Parameter(s) Specified for Mapping!";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionRequestMapService {
    public map(subscriptionRequestSummary: SubscriptionRequestSummary,
        subscriberInfo: SubscriberInfo): SubscriptionRequest {
        const validation = subscriptionRequestSummary !== undefined &&
            subscriptionRequestSummary !== null &&
            subscriberInfo !== undefined && subscriberInfo !== null;

        if (!validation)
            throw new Error(INVALID_PARAMETERS);

        const dishItems: DishItem[] = [];

        for (let menuItemSummary of subscriptionRequestSummary.menuItemSummaries) {
            const dishItem: DishItem = {
                cost: menuItemSummary.saleAmount,
                deliveryCharges: 0,
                dishImageUrl:"",
                description: '',
                dishItemName: menuItemSummary.dishName,
                noOfUnits: menuItemSummary.quantity,
                packingCharges: 0,
                taxValue: 0,
                isDishRequired:true,
            };

            dishItems.push(dishItem);
        }

        const deliverySchedule: DeliverySchedule = {
            date: new Date(),
            pointOfContact: subscriberInfo.fullName,
            timeRange: subscriptionRequestSummary.deliveryTime
        };
        const deliverySchedules: DeliverySchedule[] = [
            deliverySchedule
        ];
        const totalOrderValue = 0;

        const subscriptionRequest: SubscriptionRequest = {
            partitionKey: "",
            rowKey: "",
            timestamp: new Date(),
            eTag: "",
            requestId: "",
            companyName: subscriberInfo.companyName,
            subscriberName: subscriberInfo.fullName,
            emailId: subscriberInfo.emailAddress,
            phoneNumber: subscriberInfo.phoneNumber,
            deliveryAddress: {
                addressLine1: subscriberInfo.addressLine1,
                addressLine2: subscriberInfo.addressLine2,
                city: subscriberInfo.city,
                state: subscriberInfo.state,
                country: subscriberInfo.country,
                postalCode: subscriberInfo.zipCode
            },
            fullAddress: "",
            subscriptionDate: new Date(),
            dishItems: dishItems,
            dishDetails: "",
            plan: subscriptionRequestSummary.deliveryPlan,
            deliverySchedule: deliverySchedules,
            deliveryDetails: "",
            totalOrderValue: totalOrderValue,
            status: "REQUESTED"
        };

        return subscriptionRequest;
    }
}
