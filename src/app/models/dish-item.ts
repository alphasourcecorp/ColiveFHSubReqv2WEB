export interface DishItem {
    dishItemName: string;
    dishImageUrl:string;
    description: string;
    cost: number;
    noOfUnits: number;
    taxValue: number;
    packingCharges: number;
    deliveryCharges: number;
    isDishRequired:boolean;
}
