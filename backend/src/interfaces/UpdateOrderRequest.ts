export interface UpdateOrderRequest {
    id: string;
    status: string;
    client_id?: string;
    bike_id?: string;
}

