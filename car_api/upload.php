<?php
require_once 'config.php';

// Завантаження файлів
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['type'] ?? ''; // 'image' або 'model'

    if (!$type || !in_array($type, ['image', 'model'])) {
        echo json_encode(['error' => 'Неправильний тип файлу']);
        exit;
    }

    if (!isset($_FILES['file'])) {
        echo json_encode(['error' => 'Файл не знайдено']);
        exit;
    }

    $file = $_FILES['file'];
    $fileName = time() . '_' . basename($file['name']);
    $targetDir = 'uploads/' . ($type === 'image' ? 'images/' : 'models/');
    $targetPath = $targetDir . $fileName;

    // Перевірка типу файлу
    $allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $allowedModelTypes = ['model/gltf-binary', 'model/gltf+json', 'application/octet-stream'];

    if ($type === 'image' && !in_array($file['type'], $allowedImageTypes)) {
        echo json_encode(['error' => 'Неприпустимий тип зображення']);
        exit;
    }

    if ($type === 'model' && !in_array($file['type'], $allowedModelTypes) && !strpos($file['name'], '.glb') && !strpos($file['name'], '.gltf')) {
        echo json_encode(['error' => 'Неприпустимий тип 3D-моделі']);
        exit;
    }

    // Переміщення файлу
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode([
            'success' => true,
            'file_path' => $targetPath,
            'file_name' => $fileName
        ]);
    } else {
        echo json_encode(['error' => 'Помилка завантаження файлу']);
    }
}
?>