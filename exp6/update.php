<?php
session_start();
require_once 'config.php';

$error = '';
$id = $_GET['id'] ?? null;

if (!$id) {
    header("Location: index.php");
    exit;
}

// Fetch current user data
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) {
    header("Location: index.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $bio = trim($_POST['bio']);

    if (empty($full_name) || empty($email)) {
        $error = "Name and Email are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } else {
        try {
            $sql = "UPDATE users SET full_name = ?, email = ?, bio = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$full_name, $email, $bio, $id]);
            
            header("Location: index.php?msg=User updated successfully!");
            exit;
        } catch (PDOException $e) {
            $error = "Update failed. Email might already be in use.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit User | Premium CRUD</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container" style="max-width: 600px;">
        <div class="nav">
            <a href="index.php" class="btn" style="color: var(--text-muted);">
                <i class="fas fa-arrow-left"></i> Back to Dashboard
            </a>
        </div>

        <div class="glass-card">
            <h2 style="margin-bottom: 2rem; text-align: center;">Edit Profile</h2>

            <?php if ($error): ?>
                <div class="alert alert-error"><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></div>
            <?php endif; ?>

            <form action="update.php?id=<?php echo $id; ?>" method="POST">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" name="full_name" value="<?php echo htmlspecialchars($user['full_name']); ?>" required>
                </div>

                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
                </div>

                <div class="form-group">
                    <label>Bio</label>
                    <textarea name="bio" rows="4"><?php echo htmlspecialchars($user['bio']); ?></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 1rem;">
                    Save Changes
                </button>
            </form>
        </div>
    </div>
</body>
</html>
