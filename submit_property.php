<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("❌ This page cannot be accessed directly.");
}

// 1. Collect form data
$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];
$area = $_POST['area'];
$type = $_POST['type'];
$verified = isset($_POST['verified']) ? 1 : 0;

// 2. Connect to the database
$host = 'localhost';
$dbname = 'smart_property';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

// 3. Insert into database
$stmt = $conn->prepare("INSERT INTO property_submissions (title, description, price, area, type, verified) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssdisi", $title, $description, $price, $area, $type, $verified);

if ($stmt->execute()) {
    echo "✅ Property submitted successfully!";
} else {
    echo "❌ Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
