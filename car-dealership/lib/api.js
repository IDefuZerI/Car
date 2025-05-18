// lib/api.js
const API_URL = 'http://car-api.local';

export async function getAllCars() {
    try {
        const response = await fetch(`${API_URL}/cars.php`);
        if (!response.ok) {
            throw new Error('Помилка отримання даних');
        }
        return await response.json();
    } catch (error) {
        console.error('Помилка API:', error);
        return [];
    }
}

export async function getCarById(id) {
    try {
        const response = await fetch(`${API_URL}/car.php?id=${id}`);
        if (!response.ok) {
            throw new Error('Помилка отримання даних');
        }
        return await response.json();
    } catch (error) {
        console.error('Помилка API:', error);
        return null;
    }
}

export async function addCar(carData) {
    try {
        const response = await fetch(`${API_URL}/add_car.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });

        if (!response.ok) {
            throw new Error('Помилка додавання автомобіля');
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка API:', error);
        return { error: error.message };
    }
}

export async function uploadFile(file, type) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type); // 'image' або 'model'

        const response = await fetch(`${API_URL}/upload.php`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Помилка завантаження файлу');
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка API:', error);
        return { error: error.message };
    }
}