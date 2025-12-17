<?php
    require './session.php';
    require './mysql.php';

    if(!isset($_POST['user_id']) || !isset($_POST['rated_id']) || !isset($_POST['rating'])) {
        header("Location: ../pages/rating.php");
        exit();
    }

    $user_id = $_POST['user_id'];
    $rated_id = $_POST['rated_id'];
    $rating = $_POST['rating'];

    // Check if the user has already rated this user
    $stmt = $conn->prepare("SELECT * FROM rating WHERE user_id = ? AND rating_user_id = ?");
    $stmt->bind_param("ii", $user_id, $rated_id);
    $stmt->execute();
    $result = $stmt->get_result();
        // User has already rated, update the rating

        if($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Update the existing rating
            $stmt = $conn->prepare("UPDATE rating SET rating = ? WHERE user_id = ? AND rating_user_id = ?");
            $stmt->bind_param("iii", $rating, $user_id, $rated_id);
        } else {
            // User has not rated yet, insert a new rating
            $stmt = $conn->prepare("INSERT INTO rating (user_id, rating_user_id, rating) VALUES (?, ?, ?)");
            $stmt->bind_param("iii", $user_id, $rated_id, $rating);
        }
        // Execute the statement
        $stmt->execute();
     

        $allRatingStmt = $conn->prepare("SELECT Round(AVG(rating)) as average_rating FROM rating WHERE user_id = ?");
        $allRatingStmt->bind_param("i", $user_id);
        $allRatingStmt->execute();
        $allRatingResult = $allRatingStmt->get_result();
        $allRatingRow = $allRatingResult->fetch_assoc();
        $average_rating = $allRatingRow['average_rating'];

        // If there are no ratings, set average_rating to 0
        if ($average_rating === null) {
            $average_rating = 0;
        }

        // Update the average rating in the user table
        $updateStmt = $conn->prepare("UPDATE user SET rating = ? WHERE id = ?");
        $updateStmt->bind_param("ii", $average_rating, $user_id);
        $updateStmt->execute();
        
           if($updateStmt->execute()) {
            // Rating submitted successfully
            header("Location: ../pages/bookings.php");
            exit();
        } else {
            // Error occurred while submitting the rating
            echo "<p>Fehler beim Absenden der Bewertung. Bitte versuchen Sie es später erneut.</p>";
        }
    




?>