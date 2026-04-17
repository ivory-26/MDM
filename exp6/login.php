<?php
session_start();
require_once 'config.php';

$error = '';

if (isset($_SESSION['user'])) {
    header("Location: index.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $remember = isset($_POST['remember']);

    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $_SESSION['user'] = $user['username'];
        
        if ($remember) {
            // Set cookie for 30 days
            setcookie('remember_user', $user['username'], time() + (86400 * 30), "/");
        }

        header("Location: index.php");
        exit;
    } else {
        $error = "Invalid username or password.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Premium CRUD</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container" style="max-width: 450px; margin-top: 5vh;">
        <div class="glass-card" style="padding: 3rem 2rem;">
            <h1 style="font-size: 2rem;">Welcome Back</h1>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 2rem;">Sign in to your account</p>

            <?php if ($error): ?>
                <div class="alert alert-error"><i class="fas fa-times-circle"></i> <?php echo $error; ?></div>
            <?php endif; ?>

            <form action="login.php" method="POST">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter your username" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password" required>
                </div>

                <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" name="remember" id="remember" style="width: auto;">
                    <label for="remember" style="margin-bottom: 0; cursor: pointer;">Remember me for 30 days</label>
                </div>

                <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 1rem; margin-top: 1rem;">
                    Sign In
                </button>
            </form>
            
            <p style="text-align: center; margin-top: 2rem; font-size: 0.875rem; color: var(--text-muted);">
                Don't have an account? <a href="create.php" style="color: var(--primary); text-decoration: none;">Create one here</a>
            </p>
        </div>
    </div>
</body>
</html>
