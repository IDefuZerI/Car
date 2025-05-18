<?php
require_once 'config.php';

// Отримання автомобіля за ID
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $car_id = $_GET['id'];

    try {
        // Отримання інформації про автомобіль
        $stmt = $conn->prepare("SELECT * FROM cars WHERE id = ?");
        $stmt->execute([$car_id]);
        $car = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$car) {
            echo json_encode(['error' => 'Автомобіль не знайдено']);
            exit;
        }

        // Отримання зображень
        $stmt = $conn->prepare("SELECT * FROM car_images WHERE car_id = ?");
        $stmt->execute([$car_id]);
        $car['images'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Отримання 3D-моделей
        $stmt = $conn->prepare("SELECT * FROM car_models WHERE car_id = ?");
        $stmt->execute([$car_id]);
        $car['models'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($car);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Помилка отримання даних: ' . $e->getMessage()]);
    }
}
?>