<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Bin - Register</title>
    <link rel="stylesheet" href="../css/style.css">
    <style>
        .error, .success {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 4px;
        }
        .error {
            color: #d32f2f;
            background-color: #ffebee;
            border: 1px solid #d32f2f;
        }
        .success {
            color: #388e3c;
            background-color: #e8f5e9;
            border: 1px solid #388e3c;
        }
        .register-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="register-container">
        <h2>Register</h2>
        <?php if (!empty($error)): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        <?php if (!empty($success)): ?>
            <div class="success"><?php echo $success; ?></div>
        <?php endif; ?>
        <form method="POST" action="">
            <label for="name">First Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" required>

            <label for="phone">Phone:</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" required>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>

            <label for="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required>

            <button type="submit">Register</button>
            <?php
                session_start();
                include '../includes/db.php';

                $error = "";
                $success = "";

                try {
                    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                        $name = $_POST['name'];
                        $lastname = $_POST['lastname'];
                        $phone = $_POST['phone'];
                        $username = $_POST['username'];
                        $password = $_POST['password'];
                        $confirm_password = $_POST['confirm_password'];

                        // Validate password match
                        if ($password !== $confirm_password) {
                            $error = "Passwords do not match.";
                        } else {
                            // Hash the password
                            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                            // Prepare SQL query to insert user into the database
                            $stmt = $mysqli->prepare("INSERT INTO users (name, lastname, phone, username, password) VALUES (?, ?, ?, ?, ?)");
                            if (!$stmt) {
                                throw new Exception("Database query preparation failed.");
                            }

                            $stmt->bind_param("sssss", $name, $lastname, $phone, $username, $hashed_password);
                            $stmt->execute();

                            if ($stmt->affected_rows > 0) {
                                $success = "Registration successful. You can now <a href='login.php'>log in</a>.";
                            } else {
                                $error = "Failed to register. Please try again.";
                            }

                            $stmt->close();
                        }
                    }
                } catch (Exception $e) {
                    $error = "Something went wrong. Please try again later.";
                    // Optionally log the error for debugging
                    // error_log($e->getMessage());
                }
            ?>

        </form>
    </div>
</body>
</html>
