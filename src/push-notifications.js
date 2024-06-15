import { urlBase64ToUint8Array } from './util';

const VAPID_PUBLIC_KEY = '<YOUR_PUBLIC_VAPID_KEY>';

export const askNotificationPermission = async () => {
  const permissionResult = await Notification.requestPermission();
  if (permissionResult !== 'granted') {
    throw new Error('Permission not granted for Notification');
  }
};

export const subscribeUserToPush = async () => {
  const registration = await navigator.serviceWorker.ready;

  if (!registration.pushManager) {
    console.log('Push manager unavailable.');
    return;
  }

  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription === null) {
    console.log('No subscription detected, make a request.');
    const newSubscription = await registration.pushManager.subscribe({
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      userVisibleOnly: true,
    });

    console.log('New subscription added.', newSubscription);

    // Send the subscription to your server to store it
    await fetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify(newSubscription),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } else {
    console.log('Existing subscription detected.');
  }
};
