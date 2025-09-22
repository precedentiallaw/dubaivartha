import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PushNotificationButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };

  const subscribeToNotifications = async () => {
    try {
      setIsLoading(true);

      // Request permission first
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        toast({
          title: "Permission Required",
          description: "Please enable notifications to receive breaking news alerts.",
          variant: "destructive"
        });
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      // In production, you would use your actual VAPID public key
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'your-vapid-public-key-here'
      });

      // Store subscription in database (would be implemented with real backend)
      console.log('Push subscription:', subscription);
      
      setIsSubscribed(true);
      
      toast({
        title: "Notifications Enabled",
        description: "You'll now receive breaking news alerts from Dubai Vartha.",
      });

      // Test notification
      await testNotification();

    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      toast({
        title: "Subscription Failed",
        description: "Could not enable notifications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      setIsLoading(true);

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
      }

      setIsSubscribed(false);
      
      toast({
        title: "Notifications Disabled",
        description: "You won't receive push notifications anymore.",
      });

    } catch (error) {
      console.error('Error unsubscribing from notifications:', error);
      toast({
        title: "Error",
        description: "Could not disable notifications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testNotification = async () => {
    try {
      // Call the push notification edge function
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'Dubai Vartha',
          body: 'Welcome! You will receive breaking news alerts here.',
          isBreaking: false,
          tag: 'welcome-notification'
        }
      });

      if (error) throw error;

      // Show notification directly (for demo purposes)
      if (data?.notification && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(data.notification.title, {
          body: data.notification.body,
          icon: data.notification.icon,
          badge: data.notification.badge,
          tag: data.notification.tag
        });
      }

    } catch (error) {
      console.error('Error testing notification:', error);
    }
  };

  const sendBreakingNewsNotification = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'BREAKING: Dubai Vartha',
          body: 'Major development in Dubai business sector - Read the latest updates now!',
          isBreaking: true,
          tag: 'breaking-news',
          url: '/'
        }
      });

      if (error) throw error;

      // Show notification directly (for demo purposes)
      if (data?.notification && 'serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification(data.notification.title, {
          body: data.notification.body,
          icon: data.notification.icon,
          badge: data.notification.badge,
          tag: data.notification.tag,
          requireInteraction: data.notification.requireInteraction
        });
      }

      toast({
        title: "Breaking News Sent",
        description: "Test breaking news notification has been sent!",
      });

    } catch (error) {
      console.error('Error sending breaking news:', error);
      toast({
        title: "Error",
        description: "Could not send breaking news notification.",
        variant: "destructive"
      });
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        variant={isSubscribed ? "default" : "outline"}
        size="sm"
        onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        {isSubscribed ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        {isLoading ? "..." : (isSubscribed ? "Notifications On" : "Enable Notifications")}
      </Button>

      {isSubscribed && (
        <Button
          variant="destructive"
          size="sm"
          onClick={sendBreakingNewsNotification}
          className="text-xs"
        >
          Test Breaking News
        </Button>
      )}
    </div>
  );
};

export default PushNotificationButton;