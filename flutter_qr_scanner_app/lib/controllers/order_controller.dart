import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../models/order_model.dart';

class OrderController extends GetxController {
  var order = Rxn<Order>();
  var isLoading = false.obs;

  final baseUrl = "http://192.168.1.16:5000/api/orders";

  Future<void> fetchOrder(String orderId) async {
    try {
      isLoading.value = true;
      final response = await http.get(Uri.parse("$baseUrl/$orderId"));

      if (response.statusCode == 200) {
        order.value = Order.fromJson(json.decode(response.body));
      } else {
        Get.snackbar("Error", "Order not found");
      }
    } catch (e) {
      Get.snackbar("Error", e.toString());
    } finally {
      isLoading.value = false;
    }
  }

  Future<void> updateOrderType(String orderId, String newType) async {
    try {
      isLoading.value = true;
      final response = await http.put(
        Uri.parse("$baseUrl/$orderId"),
        headers: {"Content-Type": "application/json"},
        body: json.encode({"type": newType}),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> jsonData = json.decode(response.body);
        order.value = Order.fromJson(jsonData);
        Get.snackbar("Success", "Order updated to $newType");
      } else {
        Get.snackbar("Error", "Failed to update order");
      }
    } catch (e) {
      Get.snackbar("Error", e.toString());
    } finally {
      isLoading.value = false;
    }
  }
}
