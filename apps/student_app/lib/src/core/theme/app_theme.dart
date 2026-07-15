import 'package:flutter/material.dart';

class AppTheme {
  static const navy50 = Color(0xFFf0f3f9);
  static const navy100 = Color(0xFFd9e0f0);
  static const navy200 = Color(0xFFb3c1e0);
  static const navy300 = Color(0xFF8da2d1);
  static const navy400 = Color(0xFF6683c1);
  static const navy500 = Color(0xFF4064b2);
  static const navy600 = Color(0xFF1a458e);
  static const navy700 = Color(0xFF0f2d6b);
  static const navy800 = Color(0xFF0a1f4a);
  static const navy900 = Color(0xFF05102e);
  static const navy950 = Color(0xFF020815);

  static const gold50 = Color(0xFFfef9e7);
  static const gold100 = Color(0xFFfdf0c4);
  static const gold200 = Color(0xFFfce19d);
  static const gold300 = Color(0xFFfbd275);
  static const gold400 = Color(0xFFf9c34e);
  static const gold500 = Color(0xFFf8b426);
  static const gold600 = Color(0xFFd99a0f);

  static ThemeData get light => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: ColorScheme.light(
      primary: navy600,
      secondary: gold500,
      surface: Colors.white,
      onPrimary: Colors.white,
      onSecondary: navy950,
    ),
    scaffoldBackgroundColor: navy50,
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: navy900,
      elevation: 0,
      centerTitle: true,
    ),
    cardTheme: CardTheme(
      color: Colors.white,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: navy100),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: gold500,
        foregroundColor: navy950,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: Colors.white,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: navy200),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: navy200),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: gold500, width: 2),
      ),
    ),
  );

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    colorScheme: ColorScheme.dark(
      primary: navy400,
      secondary: gold400,
      surface: navy900,
      onPrimary: Colors.white,
      onSecondary: navy950,
    ),
    scaffoldBackgroundColor: navy950,
    appBarTheme: const AppBarTheme(
      backgroundColor: navy900,
      foregroundColor: Colors.white,
      elevation: 0,
      centerTitle: true,
    ),
    cardTheme: CardTheme(
      color: navy800,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: const BorderSide(color: navy700),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: gold500,
        foregroundColor: navy950,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
      ),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: navy800,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: navy600),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: navy600),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
        borderSide: const BorderSide(color: gold500, width: 2),
      ),
    ),
  );
}
