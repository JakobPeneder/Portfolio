<?php
require '../sql/session.php';
require '../sql/mysql.php';

if (!isset($_SESSION['email']) || $_SESSION['email'] === '') {
    header("Location: ../pages/formular.php");
    exit();
}

$email = $_SESSION['email'];
$stmt = $conn->prepare("SELECT id FROM user WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    header("Location: ../pages/formular.php");
    exit();
}

$user_id = $user['id'];
$listing_id = null;
$listing = null;

if (isset($_GET['id'])) {
    $listing_id = intval($_GET['id']);
    $stmt = $conn->prepare("SELECT * FROM listings WHERE id = ?");
    $stmt->bind_param("i", $listing_id);
    $stmt->execute();
    $listing_result = $stmt->get_result();
    $listing = $listing_result->fetch_assoc();
}

// AJAX: Nachrichten für Partner laden (JSON Ausgabe)
if (isset($_GET['ajax']) && $_GET['ajax'] === '1' && isset($_GET['partner_id'])) {
    $partner_id = intval($_GET['partner_id']);
    $listing_id_filter = isset($_GET['listing_id']) ? intval($_GET['listing_id']) : null;

    $sql = "SELECT m.*, listings.title AS listing_title
            FROM messages m
            LEFT JOIN listings ON m.listing_id = listings.id
            WHERE ((m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?))";
    $params = [$user_id, $partner_id, $partner_id, $user_id];

    if ($listing_id_filter) {
        $sql .= " AND m.listing_id = ?";
        $params[] = $listing_id_filter;
    }
    $sql .= " ORDER BY m.date, m.time";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(str_repeat('i', count($params)), ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    $chat_messages = $result->fetch_all(MYSQLI_ASSOC);

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($chat_messages);
    exit();
}

// Alle letzten Nachrichten pro Chatpartner laden (Übersicht)
$stmt = $conn->prepare("
    SELECT m1.*, listings.title AS listing_title
    FROM messages m1
    INNER JOIN (
        SELECT 
            CASE 
                WHEN sender_id = ? THEN receiver_id 
                ELSE sender_id 
            END AS chat_partner_id,
            MAX(CONCAT(date, ' ', time)) AS latest_message
        FROM messages
        WHERE sender_id = ? OR receiver_id = ?
        GROUP BY chat_partner_id
    ) m2
    ON (
        ((m1.sender_id = ? AND m1.receiver_id = m2.chat_partner_id) OR
        (m1.receiver_id = ? AND m1.sender_id = m2.chat_partner_id))
        AND CONCAT(m1.date, ' ', m1.time) = m2.latest_message
    )
    LEFT JOIN listings ON m1.listing_id = listings.id
    ORDER BY m2.latest_message DESC
");
$stmt->bind_param("iiiii", $user_id, $user_id, $user_id, $user_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();
$messages = $result->fetch_all(MYSQLI_ASSOC);

// Nachrichten senden (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST["receiver_id"], $_POST["message"], $_POST["listing_id"])) {
    $receiver_id = intval($_POST["receiver_id"]);
    $message = trim($_POST["message"]);
    $readed = 0;
    $listing_id_post = $_POST["listing_id"];
    

    $stmt = $conn->prepare("SELECT id FROM user WHERE id = ?");
    $stmt->bind_param("i", $receiver_id);
    $stmt->execute();
    $receiver_result = $stmt->get_result();
    $receiver = $receiver_result->fetch_assoc();


    if ($receiver && $message !== '') {
        $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, date, message, readed, time, listing_id) VALUES (?, ?, CURDATE(), ?, ?, CURTIME(), ?)");
        $stmt->bind_param("iisii", $user_id, $receiver_id, $message, $readed, $listing_id_post);
        $stmt->execute();
    }

    // Bei AJAX keine Weiterleitung
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        exit();
    }

    // Fallback
    header("Location: message.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Nachrichten</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <script>
        let timestamp = new Date().getTime();

        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/generalSettings.css?' + timestamp;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../css/message.css?' + timestamp;
        document.head.appendChild(link);

        let script = document.createElement('script');
        script.src = '../generalPhp/generalJs.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);

        script = document.createElement('script');
        script.src = '../js/message.js?' + timestamp;
        script.defer = true;
        document.head.appendChild(script);
    </script>
</head>
<body>
<?php require '../generalPhp/navigation.php'; ?>

<div id="container">
    <div id="profil-container">
        <h1 class="trans">Deine Chats</h1>
        <div id="chat-user-list">
            <?php
            $senderIds = [];
            foreach ($messages as $msg) {
                $chatPartnerId = ($msg['sender_id'] == $user_id) ? $msg['receiver_id'] : $msg['sender_id'];
                if (!in_array($chatPartnerId, $senderIds)) {
                    $senderIds[] = $chatPartnerId;

                    $stmt2 = $conn->prepare("SELECT name FROM user WHERE id = ?");
                    $stmt2->bind_param("i", $chatPartnerId);
                    $stmt2->execute();
                    $res = $stmt2->get_result();
                    $sender = $res->fetch_assoc();
                    $name = htmlspecialchars($sender['name'] ?? 'Unbekannt');

                    $listingTitle = htmlspecialchars($msg['listing_title'] ?? '');
                    $listingId = htmlspecialchars($msg['listing_id'] ?? '');
                    echo "<div class='chat-user' data-sender-id='{$chatPartnerId}' data-listing-id='{$listingId}' data-listing-title='{$listingTitle}'>
                            <i class='fa-solid fa-user symbolbox'></i>
                            <span class='chat-username'>{$name}</span>
                        </div>";
                }
            }

            // Optional: falls Listing gesetzt und dessen Besitzer noch nicht in Chats
            if ($listing && $listing['user_id'] != $user_id && !in_array($listing['user_id'], $senderIds)) {
                $listingOwnerId = $listing['user_id'];
                $stmt2 = $conn->prepare("SELECT name FROM user WHERE id = ?");
                $stmt2->bind_param("i", $listingOwnerId);
                $stmt2->execute();
                $res = $stmt2->get_result();
                $owner = $res->fetch_assoc();
                $ownerName = htmlspecialchars($owner['name'] ?? 'Unbekannt');

                echo "<div class='chat-user' data-sender-id='{$listingOwnerId}' data-listing-id='{$listing["id"]}' data-listing-title='" . htmlspecialchars($listing['title']) . "'>
                        <i class='fa-solid fa-user symbolbox'></i>
                        <span class='chat-username'>{$ownerName}</span>
                    </div>";
            }
            ?>
        </div>
    </div>

    <div id="message-container">
        <h1 class="title"><?php echo isset($listing['title']) ? htmlspecialchars($listing['title']) : ''; ?></h1>

        <div class="message-list">
            
        </div>
        <div id="message-input-container">
                <form id="message-form" method="post">
                    <input type="hidden" name="receiver_id" id="receiver_id" value="">
                    <input type="hidden" name="listing_id" id="listing_id" value="">
                    <input name="message" id="message-input" placeholder="Nachricht eingeben..." required autocomplete="off">
                </form>
            </div>
    </div>
</div>

<?php require '../generalPhp/footer.php'; ?>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const chatUsers = document.querySelectorAll('.chat-user');
    const receiverInput = document.getElementById('receiver_id');
    const listingInput = document.getElementById('listing_id');
    const titleEl = document.querySelector('.title');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messageList = document.querySelector('.message-list');


    // Funktion: Nachrichten per AJAX laden und anzeigen
    function loadMessages(partnerId, listingId = '') {
        fetch(`message.php?ajax=1&partner_id=${partnerId}${listingId ? '&listing_id=' + listingId : ''}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res => res.json())
        .then(messages => {
            // Nachrichtenliste leeren (außer Eingabefeld)
            const inputContainer = document.getElementById('message-input-container');
            messageList.innerHTML = '';
            messageList.appendChild(inputContainer);

            if (messages.length === 0) {
                const p = document.createElement('p');
                p.textContent = 'Keine Nachrichten vorhanden.';
                messageList.insertBefore(p, inputContainer);
                return;
            }

            messages.forEach(msg => {
                const isSender = (msg.sender_id == <?php echo $user_id; ?>);
                const partnerIdInMsg = isSender ? msg.receiver_id : msg.sender_id;
                
                const div = document.createElement('div');
                document.getElementById('listing_id').value = msg.listing_id || '';
                div.className = 'message-item ' + (isSender ? 'sender-item' : 'receiver-item') + (msg.readed == 0 ? ' unread' : '');
                div.setAttribute('data-partner-id', partnerIdInMsg);
                div.setAttribute('data-listing-id', msg.listing_id);
                div.setAttribute('data-listing-title', msg.listing_title || '');

                div.innerHTML = `<div class="message-body">${msg.message.replace(/\n/g, '<br>')}</div>`;
                messageList.insertBefore(div, inputContainer);

                
            });
        })
        .catch(err => {
            console.error('Fehler beim Laden der Nachrichten:', err);
        });
    }

    chatUsers.forEach(user => {
        user.addEventListener('click', function () {
            chatUsers.forEach(u => u.classList.remove('active'));
            this.classList.add('active');

            const partnerId = this.getAttribute('data-sender-id');
            const listingId = this.getAttribute('data-listing-id');
            const listingTitle = this.getAttribute('data-listing-title');

            receiverInput.value = partnerId;
            listingInput.value = listingId;

            console.log('listing_title:', listingTitle);
            
            if (listingTitle && listingTitle.trim() !== '') {
                titleEl.textContent = listingTitle;
            } else {
                titleEl.textContent = 'Kein Titel';
            }

            loadMessages(partnerId, listingId);
        });
    });
    

    if (chatUsers.length > 0) {
        chatUsers[0].click();
    }

    // Nachricht senden via AJAX
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const message = messageInput.value.trim();
        if (!message) return;

        const formData = new FormData(messageForm);
        const partnerId = receiverInput.value;
        const listingId = listingInput.value;
        console.log('listingId:', listingId);
        const listingTitle = titleEl.textContent;
        formData.append('receiver_id', partnerId);
        formData.append('listing_id', listingId);
        formData.append('message', message);

        fetch(window.location.href, {
            method: "POST",
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        })
        .then(() => {
            // Neue Nachricht in der Liste anzeigen (ohne Reload)
            const newMessage = document.createElement('div');
            newMessage.className = 'message-item sender-item';

            newMessage.setAttribute('data-partner-id', partnerId);
            newMessage.setAttribute('data-listing-id', listingId);
            newMessage.setAttribute('data-listing-title', listingTitle);

            newMessage.innerHTML = `<div class="message-body">${message.replace(/\n/g, '<br>')}</div>`;
            const inputContainer = document.getElementById('message-input-container');
            messageList.insertBefore(newMessage, inputContainer);

            moveChatUserToTop(partnerId);

            messageInput.value = '';
            messageInput.focus();

            console.log("Sending to:", receiverInput.value, listingInput.value, message);

        })
        .catch(err => {
            console.error('Fehler beim Senden der Nachricht:', err);
        });
    });

    function moveChatUserToTop(partnerId) {
    const chatList = document.getElementById('chat-user-list');
    const chatUser = chatList.querySelector(`.chat-user[data-sender-id="${partnerId}"]`);
    if (chatUser) {
        chatList.prepend(chatUser);
    }
}

});
</script>
</body>
</html>
