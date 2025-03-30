<?php

// Создать заглушку "No Image"
$width = 800;
$height = 600;
$image = imagecreatetruecolor($width, $height);
$background = imagecolorallocate($image, 248, 249, 250); // #f8f9fa
$textColor = imagecolorallocate($image, 33, 37, 41); // #212529

// Заливаем фон
imagefilledrectangle($image, 0, 0, $width, $height, $background);

// Добавляем текст
$text = 'No Image';
$font = 5; // Встроенный шрифт
$textWidth = imagefontwidth($font) * strlen($text);
$textHeight = imagefontheight($font);
$x = ($width - $textWidth) / 2;
$y = ($height - $textHeight) / 2;
imagestring($image, $font, $x, $y, $text, $textColor);

// Сохраняем изображение
imagejpeg($image, 'no-image.jpg', 90);

// Создаем второе изображение - placeholder.jpg
$image2 = imagecreatetruecolor($width, $height);
$background2 = imagecolorallocate($image2, 240, 240, 240); // светло-серый
$textColor2 = imagecolorallocate($image2, 100, 100, 100); // темно-серый

// Заливаем фон
imagefilledrectangle($image2, 0, 0, $width, $height, $background2);

// Добавляем текст
$text2 = 'Placeholder';
$textWidth2 = imagefontwidth($font) * strlen($text2);
$x2 = ($width - $textWidth2) / 2;
$y2 = ($height - $textHeight) / 2;
imagestring($image2, $font, $x2, $y2, $text2, $textColor2);

// Сохраняем изображение
imagejpeg($image2, 'placeholder.jpg', 90);

echo "Placeholder images generated successfully!";

// Освобождаем память
imagedestroy($image);
imagedestroy($image2);
