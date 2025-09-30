class Order {
  final String id;
  final String customerName;
  final int quantity;
  final String type;
  final Map<String, dynamic>? product;

  Order({
    required this.id,
    required this.customerName,
    required this.quantity,
    required this.type,
    this.product,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['_id'],
      customerName: json['customerName'],
      quantity: json['quantity'] ?? 0,
      type: json['type'] ?? 'in delivery',
      product: json['product'] is Map<String, dynamic> ? json['product'] : null,
    );
  }
}
