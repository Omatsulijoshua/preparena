import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiClient {
  static const String baseUrl = 'http://localhost:4000/api/v1';
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;

  late final Dio dio;
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  ApiClient._internal() {
    dio = Dio(BaseOptions(
      baseUrl: baseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json'},
    ));

    dio.interceptors.add(AuthInterceptor(dio, _storage));
    dio.interceptors.add(LogInterceptor(requestBody: true, responseBody: true));
  }
}

class AuthInterceptor extends Interceptor {
  final Dio dio;
  final FlutterSecureStorage storage;

  AuthInterceptor(this.dio, this.storage);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await storage.read(key: 'access_token');
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      try {
        final refreshToken = await storage.read(key: 'refresh_token');
        if (refreshToken != null) {
          final response = await dio.post('/auth/refresh', data: {'refreshToken': refreshToken});
          final newToken = response.data['data']['accessToken'];
          await storage.write(key: 'access_token', value: newToken);

          final retryOptions = err.requestOptions;
          retryOptions.headers['Authorization'] = 'Bearer $newToken';
          final retryResponse = await dio.fetch(retryOptions);
          return handler.resolve(retryResponse);
        }
      } catch {
        await storage.deleteAll();
      }
    }
    handler.next(err);
  }
}
