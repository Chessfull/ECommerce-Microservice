import { inject, injectable } from "inversify";
import { IBasketService } from "../services/IBasketService";
import { BasketRequest } from "../dtos/BasketRequest";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { logger } from "../../config/logger";

@injectable()
export class BasketController {
  private _basketService: IBasketService;

  constructor(@inject("IBasketService") basketService: IBasketService) {
    this._basketService = basketService;
  }

  async getBasket(req: Request, res: Response) {

    const basketId = req.params.id;
    
    try {
      const serviceResult = await this._basketService.getBasket(basketId);

      if (!serviceResult.IsSucceed) {
        return res.status(400).json({ message: serviceResult?.Message });
      }

      return res.status(200).json(serviceResult.Data);
    } catch (error:any) {
      logger.error("[BasketController - getBasket]", error,{ stack: error.stack });
      return res.status(500).json({ message: "Server-side error", error });
    }
  }

  async addToBasket(req: Request, res: Response) {
    // -> Destruct and validate operations from req body and basketrequest dto
    const { userId, productId, quantity } = req.body;
    const basketRequest = new BasketRequest(userId, productId, quantity);

    const errors = await validate(basketRequest);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    try {
      
      const serviceResult = await this._basketService.saveBasket(basketRequest);

      if (!serviceResult.IsSucceed) {
        return res.status(400).json({ message: serviceResult?.Message });
      }

      return res.status(200).json(serviceResult.Data);
    } catch (error:any) {
      logger.error("[BasketController - addToBasket]", error,{ stack: error.stack });
      return res.status(500).json({ message: "Server-side error", error });
    }
  }
}
