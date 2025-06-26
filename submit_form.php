<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("❌ This page cannot be accessed directly.");
}

// 1. Collect form data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// 2. Connect to the database
$host = 'localhost';
$dbname = 'smart_property';
$username = 'root';
$password = '';

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 3. Insert into database
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo "✅ Message submitted successfully.";
} else {
    echo "❌ Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
