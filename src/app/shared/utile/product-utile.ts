export class ProductUtile {

  /**
   * cette methode permet de calculer le prix d'un produit en promotion (pour produit non promo on return le prix initial)
   * @param discount pourcentage de reduction appliquer sur prix de produit
   * @param price prix de produit (prix et quantité)
   */
  static getDiscountPrice(discount: number | undefined, price: number) {
    if (discount === undefined) {
      return price;
    } else {
      const dicountPrice = price * (1 - discount / 100);
      return Number((dicountPrice).toFixed(2));
    }
  }
}
