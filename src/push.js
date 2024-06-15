const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Replace with your generated VAPID keys
const vapidKeys = {
  publicKey: '<YOUR_PUBLIC_VAPID_KEY>',
  privateKey: '<YOUR_PRIVATE_VAPID_KEY>'
};

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

let subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = JSON.stringify({
    title: 'Your Event Reminder',
    body: 'Your event is starting now!'
  });

  const promises = subscriptions.map(sub => 
    webpush.sendNotification(sub, notificationPayload)
  );

  Promise.all(promises).then(() => res.sendStatus(200)).catch(err => {
    console.error("Error sending notification, reason: ", err);
    res.sendStatus(500);
  });
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
