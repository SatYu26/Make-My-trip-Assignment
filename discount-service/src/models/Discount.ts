export interface Discount {
    code: string;
    type: "COUPON" | "CARD";
    value: number; // flat value
    expires_at: string;
    usage_limit: number;
}
