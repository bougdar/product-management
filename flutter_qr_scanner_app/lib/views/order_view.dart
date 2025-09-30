import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

import '../controllers/order_controller.dart';

class OrderView extends StatelessWidget {
  final OrderController controller = Get.find<OrderController>();

  final List<String> orderTypes = [
    "in delivery",
    "delivered",
    "pending",
    "return broken",
    "return scam"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Scan QR for Order")),
      body: Column(
        children: [
          Expanded(
            flex: 2,
            child: MobileScanner(
              onDetect: (barcodeCapture) {
                final String? code = barcodeCapture.barcodes.first.rawValue;
                if (code != null) {
                  controller.fetchOrder(code);
                }
              },
            ),
          ),

          Expanded(
            flex: 3,
            child: Obx(() {
              if (controller.isLoading.value) {
                return const Center(child: CircularProgressIndicator());
              }
              if (controller.order.value == null) {
                return const Center(child: Text("Scan a QR to see order details"));
              }

              final order = controller.order.value!;
              final product = order.product;

              return SingleChildScrollView(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Customer: ${order.customerName}", style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    Text("Quantity Ordered: ${order.quantity}"),
                    Text("Order Type: ${order.type}"),
                    const SizedBox(height: 20),

                    if (product != null) ...[
                      Text("Product Info", style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                      const SizedBox(height: 8),
                      Text("Name: ${product['name']}"),
                      Text("Category: ${product['category']}"),
                      Text("Price: \$${product['price']}"),
                      Text("Place: ${product['place']}"),
                    ],

                    const SizedBox(height: 20),

                    DropdownButton<String>(
                      value: order.type,
                      items: orderTypes
                          .map((type) => DropdownMenuItem(value: type, child: Text(type)))
                          .toList(),
                      onChanged: (newType) {
                        if (newType != null) {
                          controller.updateOrderType(order.id, newType);
                        }
                      },
                    )
                  ],
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}
