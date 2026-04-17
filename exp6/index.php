<?php
session_start();
require_once 'config.php';

// Simple cookie-based session restoration demo
if (!isset($_SESSION['user']) && isset($_COOKIE['remember_user'])) {
    $_SESSION['user'] = $_COOKIE['remember_user'];
}

// Fetch all users
$stmt = $pdo->query("SELECT * FROM users ORDER BY created_at DESC");
$users = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium User Management</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <header class="nav">
            <h1>User Dashboard</h1>
            <div class="user-badge">
            <?php if (isset($_SESSION['user'])): ?>
                <div class="avatar"><?php echo strtoupper(substr($_SESSION['user'], 0, 1)); ?></div>
                <span>Welcome, <?php echo htmlspecialchars($_SESSION['user']); ?></span>
                <a href="logout.php" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Logout</a>
            <?php else: ?>
                <a href="login.php" class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;">Login</a>
            <?php endif; ?>
            </div>
        </header>

        <?php if (isset($_GET['msg'])): ?>
            <div class="alert alert-success">
                <i class="fas fa-check-circle"></i> <?php echo htmlspecialchars($_GET['msg']); ?>
            </div>
        <?php endif; ?>

        <div class="glass-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="font-weight: 500;">Registered Members</h2>
                <a href="create.php" class="btn btn-primary">
                    <i class="fas fa-plus"></i> Add User
                </a>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Joined</th>
                        <th style="text-align: right;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($users as $user): ?>
                    <tr>
                        <td>
                            <div style="font-weight: 600;"><?php echo htmlspecialchars($user['full_name']); ?></div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">@<?php echo htmlspecialchars($user['username']); ?></div>
                        </td>
                        <td style="color: var(--text-muted);"><?php echo htmlspecialchars($user['email']); ?></td>
                        <td style="font-size: 0.875rem; color: var(--text-muted);">
                            <?php echo date('M j, Y', strtotime($user['created_at'])); ?>
                        </td>
                        <td style="text-align: right;">
                            <a href="update.php?id=<?php echo $user['id']; ?>" class="btn" style="color: var(--primary);"><i class="fas fa-edit"></i></a>
                            <a href="delete.php?id=<?php echo $user['id']; ?>" class="btn" style="color: var(--danger);" onclick="return confirm('Are you sure?')"><i class="fas fa-trash"></i></a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php if (empty($users)): ?>
                    <tr>
                        <td colspan="4" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                            No users found. Start by adding one!
                        </td>
                    </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
