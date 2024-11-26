
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Bin - Login</title>
    <link rel="stylesheet" href="../css/style.css">
    <style>
        .error-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .error-modal .error-box {
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .error-modal .error-box p {
            color: #d32f2f;
            font-size: 1.2em;
        }
        .login-container input:disabled,
        .login-container button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <?php if (!empty($error)): ?>
    <div class="error-modal">
        <div class="error-box">
            <p><?php echo htmlspecialchars($error); ?></p>
        </div>
    </div>
    <?php endif; ?>

    <div class="login-container">
        <h2>Login</h2>
        <form method="POST" action="">

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" 
                <?php echo !empty($error) ? 'disabled' : ''; ?> required>
            
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" 
                <?php echo !empty($error) ? 'disabled' : ''; ?> required>
            <button type="submit" <?php echo !empty($error) ? 'disabled' : ''; ?>>Login</button>
            <a href="register.php">No tienes una cuenta?</a>
            <?php
            session_start();
            include '../includes/db.php';

            // Enable MySQLi error reporting and set error handling
           // mysqli_report(MYSQLI_REPORT_STRICT);

            $error = ""; // Default error message

            try {
                if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                    $username = $_POST['username'];
                    $password = $_POST['password'];

                    // Prepare the SQL query to prevent SQL injection
                    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
                    if (!$stmt) {
                        throw new Exception("Database query preparation failed.");
                    }

                    $stmt->bind_param("s", $username);
                    $stmt->execute();
                    $result = $stmt->get_result();
                    $user = $result->fetch_assoc();

                    if ($user && password_verify($password, $user['password'])) {
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['username'] = $user['username'];
                        $_SESSION['role'] = $user['role'];

                        // Redirect to dashboard
                        header("Location: ../admin/dashboard.php");
                        exit;
                    } else {
                        $error = "Invalid username or password.";
                    }
                }
            } catch (Exception $e) {
                $error = "Something went wrong. Please try again later.";
                // Optionally log the error for debugging purposes
                // error_log($e->getMessage());
            }
            ?>

        </form>
    </div>
</body>
</html>
