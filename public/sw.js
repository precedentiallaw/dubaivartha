const CACHE_NAME = 'dubai-vartha-v2';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// VAPID keys would go here in production
const VAPID_PUBLIC_KEY = 'your-vapid-public-key-here';

// Global variables for notifications
let notificationQueue = [];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push event handler
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  let notificationData = {
    title: 'Dubai Vartha',
    body: 'New news update available',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'dubai-vartha-news',
    url: '/',
    requireInteraction: false,
    vibrate: [100]
  };

  if (event.data) {
    try {
      const pushData = event.data.json();
      notificationData = { ...notificationData, ...pushData };
    } catch (e) {
      console.error('Error parsing push data:', e);
    }
  }

  const promiseChain = self.registration.showNotification(notificationData.title, {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    tag: notificationData.tag,
    requireInteraction: notificationData.requireInteraction,
    vibrate: notificationData.vibrate,
    data: {
      url: notificationData.url,
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'open',
        title: 'Read Now',
        icon: '/icons/icon-72x72.png'
      }
    ]
  });

  event.waitUntil(promiseChain);
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received:', event);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // Check if there's already a window/tab open with the target URL
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url === urlToOpen && 'focus' in client) {
        return client.focus();
      }
    }
    
    // If no existing window/tab, open a new one
    if (clients.openWindow) {
      return clients.openWindow(urlToOpen);
    }
  });
  
  event.waitUntil(promiseChain);
});

// Background sync for offline actions
self.addEventListener('sync', function(event) {
  console.log('Background sync event:', event);
  
  if (event.tag === 'background-news-sync') {
    event.waitUntil(syncNewsData());
  }
});

// Function to sync news data in background
function syncNewsData() {
  return fetch('/api/articles')
    .then(response => response.json())
    .then(articles => {
      // Cache latest articles for offline access
      return caches.open(CACHE_NAME).then(cache => {
        return cache.put('/api/articles', new Response(JSON.stringify(articles)));
      });
    })
    .catch(error => {
      console.error('Background sync failed:', error);
    });
}

// Handle push subscription changes
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('Push subscription changed:', event);
  
  // In production, you would re-subscribe and update the server
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY
    }).then(function(subscription) {
      // Send new subscription to server
      return fetch('/api/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
    })
  );
});