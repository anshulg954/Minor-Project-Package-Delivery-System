import { Time } from "@angular/common";

export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    contact: string;
    otp: string;
}

export interface UserDetails{
    email: string;
    country: string;
    state: string;
    city: string;
    zip: number;
    address: string;
}

export interface OrderDetails{
    email: string;
    type: string;
    length: number;
    breadth: number;
    weight: number;
    picture: string;
    pAddress: string;
    dAddress: string;
    altContact: string;
}

export interface Feedback{
    orderID: string;
    email: string;
    name: string;
    subject: string;
    message: string;
}
