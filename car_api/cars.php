<?php
require_once 'config.php';

// Отримання всіх автомобілів
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->prepare("SELECT * FROM cars");
        $stmt->execute();
        $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Для кожного автомобіля отримуємо зображення та 3D-моделі
        foreach ($cars as &$car) {
            // Отримання зображень
            $stmt = $conn->prepare("SELECT * FROM car_images WHERE car_id = ?");
            $stmt->execute([$car['id']]);
            $car['images'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Отримання 3D-моделей
            $stmt = $conn->prepare("SELECT * FROM car_models WHERE car_id = ?");
            $stmt->execute([$car['id']]);
            $car['models'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($cars);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Помилка отримання даних: ' . $e->getMessage()]);
    }
}
?>