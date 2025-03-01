<?php
$host = "127.0.0.1";
$user = "root";
$pass = "root";
$dbname = "pos_system";

$con = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        die("<center><h2>Please fill in all fields.</h2></center>");
    }


    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);


    $stmt = $con->prepare("SELECT id FROM admins WHERE username = ?");
    if (!$stmt) {
        die("Prepare failed: " . $con->error);
    }
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "<center><h2>Username already exists. Please choose a different username.</h2></center>";
    } else {
        
        $stmt = $con->prepare("INSERT INTO admins (username, password) VALUES (?, ?)");
        if (!$stmt) {
            die("Prepare failed: " . $con->error);
        }
        $stmt->bind_param("ss", $username, $hashedPassword);

        if ($stmt->execute()) {
            echo '<script>
                    document.getElementById("successMessage").style.display = "block";
                    setTimeout(function() {
                        window.location.href = "/index/index.html";
                    }, 2000);
                  </script>';
        } else {
            echo "<center><h2>Error: " . $stmt->error . "</h2></center>";
        }
    }

    $stmt->close();
    $con->close();
}
?>