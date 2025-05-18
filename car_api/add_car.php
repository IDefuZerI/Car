<?php
require_once 'config.php';

// Додавання нового автомобіля
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Отримання даних з POST-запиту
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        echo json_encode(['error' => 'Неправильний формат даних']);
        exit;
    }

    try {
        // Початок транзакції
        $conn->beginTransaction();

        // Додавання автомобіля
        $stmt = $conn->prepare("INSERT INTO cars (make, model, year, price, category, description, engine, power, torque, acceleration, top_speed, drivetrain, weight) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['make'],
            $data['model'],
            $data['year'],
            $data['price'],
            $data['category'],
            $data['description'] ?? null,
            $data['engine'] ?? null,
            $data['power'] ?? null,
            $data['torque'] ?? null,
            $data['acceleration'] ?? null,
            $data['top_speed'] ?? null,
            $data['drivetrain'] ?? null,
            $data['weight'] ?? null
        ]);

        $car_id = $conn->lastInsertId();

        // Додавання зображень, якщо вони є
        if (isset($data['images']) && is_array($data['images'])) {
            foreach ($data['images'] as $image) {
                $stmt = $conn->prepare("INSERT INTO car_images (car_id, image_path, is_primary) VALUES (?, ?, ?)");
                $stmt->execute([
                    $car_id,
                    $image['path'],
                    $image['is_primary'] ?? false
                ]);
            }
        }

        // Додавання 3D-моделей, якщо вони є
        if (isset($data['models']) && is_array($data['models'])) {
            foreach ($data['models'] as $model) {
                $stmt = $conn->prepare("INSERT INTO car_models (car_id, model_path) VALUES (?, ?)");
                $stmt->execute([
                    $car_id,
                    $model['path']
                ]);
            }
        }

        // Завершення транзакції
        $conn->commit();

        echo json_encode(['success' => true, 'car_id' => $car_id]);
    } catch(PDOException $e) {
        // Відкат транзакції у випадку помилки
        $conn->rollBack();
        echo json_encode(['error' => 'Помилка додавання автомобіля: ' . $e->getMessage()]);
    }
}
?>