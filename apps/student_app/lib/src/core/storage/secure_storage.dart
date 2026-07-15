import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  Future<void> saveToken(String token) async => _storage.write(key: 'access_token', value: token);
  Future<void> saveRefreshToken(String token) async => _storage.write(key: 'refresh_token', value: token);
  Future<String?> getToken() async => _storage.read(key: 'access_token');
  Future<String?> getRefreshToken() async => _storage.read(key: 'refresh_token');

  Future<void> saveUserData(Map<String, dynamic> user) async {
    await _storage.write(key: 'user_data', value: user.toString());
  }

  Future<void> clearAll() async => _storage.deleteAll();
}
