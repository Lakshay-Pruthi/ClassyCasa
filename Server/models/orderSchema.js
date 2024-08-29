class Order {
  constructor(orderData) {
    const { id, price, rentalTime, address, status } = orderData;
    const date = new Date();
    this.id = id;
    this.rentalTime = rentalTime;
    this.address = address;
    this.status = status;
    this.createdAt = `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`;
    this.updatedAt = this.createdAt;
    this.expectedDelivery = `${
      date.getDate() + 3
    } - ${date.getMonth()} - ${date.getFullYear()}`;
    this.total = ((price / 1000) * rentalTime).toPrecision(5);
  }
}

export default Order;
