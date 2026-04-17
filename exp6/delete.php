<?php
session_start();
require_once 'config.php';

$id = $_GET['id'] ?? null;

if ($id) {
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$id]);
    header("Location: index.php?msg=User deleted successfully!");
} else {
    header("Location: index.php");
}
exit;
?>
