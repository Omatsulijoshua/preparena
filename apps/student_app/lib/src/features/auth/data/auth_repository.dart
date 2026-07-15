import 'package:dio/dio.dart';
import '../../../core/api/api_client.dart';
import '../../../core/storage/secure_storage.dart';

class AuthRepository {
  final Dio _dio = ApiClient().dio;
  final SecureStorageService _storage = SecureStorageService();

  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
  }) async {
    final response = await _dio.post('/auth/register', data: {
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'authProvider': 'EMAIL',
    });
    final data = response.data['data'];
    await _storage.saveToken(data['accessToken']);
    await _storage.saveRefreshToken(data['refreshToken']);
    await _storage.saveUserData(data['user']);
    return data;
  }

  Future<Map<String, dynamic>> login({
    String? email,
    String? phone,
    required String password,
  }) async {
    final response = await _dio.post('/auth/login', data: {
      if (email != null) 'email': email,
      if (phone != null) 'phone': phone,
      'password': password,
    });
    final data = response.data['data'];
    await _storage.saveToken(data['accessToken']);
    await _storage.saveRefreshToken(data['refreshToken']);
    await _storage.saveUserData(data['user']);
    return data;
  }

  Future<void> logout() async {
    try {
      await _dio.post('/auth/logout');
    } catch (_) {}
    await _storage.clearAll();
  }

  Future<bool> isLoggedIn() async {
    final token = await _storage.getToken();
    return token != null;
  }
}
