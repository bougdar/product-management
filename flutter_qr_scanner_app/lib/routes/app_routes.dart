import 'package:get/get.dart';
import '../views/order_view.dart';
import '../bindings/order_binding.dart';

class AppRoutes {
  static const order = '/order';

  static final routes = [
    GetPage(
      name: order,
      page: () => OrderView(),
      binding: OrderBinding(),
    ),
  ];
}
