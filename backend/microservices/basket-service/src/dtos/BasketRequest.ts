// -> This dto for request operations

import { IsNumber, IsString } from "class-validator";

// export interface BasketRequest {
//   userId: string;
//   productId: string;
//   quantity: number;
// }

export class BasketRequest {
  
    @IsString()
  userId: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  constructor(userId: string, productId: string, quantity: number) {
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
  }
  
}
