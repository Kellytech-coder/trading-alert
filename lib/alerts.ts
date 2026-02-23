import prisma from './prisma';
import { getCryptoPrice, CryptoPrice } from './crypto';
import { sendAlertEmail } from './email';

// Check if an alert should be triggered
export const shouldTriggerAlert = (
  currentPrice: number,
  targetPrice: number,
  condition: string
): boolean => {
  if (condition === 'above') {
    return currentPrice >= targetPrice;
  } else if (condition === 'below') {
    return currentPrice <= targetPrice;
  }
  return false;
};

// Process a single alert
export const processAlert = async (alert: {
  id: string;
  userId: string;
  crypto: string;
  targetPrice: number;
  condition: string;
  isActive: boolean;
  user: {
    email: string;
    name: string | null;
  };
}): Promise<boolean> => {
  try {
    // Get current price
    const priceData: CryptoPrice | null = await getCryptoPrice(alert.crypto);
    
    if (!priceData) {
      console.error(`Could not fetch price for ${alert.crypto}`);
      return false;
    }

    const currentPrice = priceData.usd;

    // Check if alert should trigger
    if (shouldTriggerAlert(currentPrice, alert.targetPrice, alert.condition)) {
      console.log(
        `Alert triggered for ${alert.crypto}: ${currentPrice} ${alert.condition} ${alert.targetPrice}`
      );

      // Send email notification
      const emailSent = await sendAlertEmail({
        userEmail: alert.user.email,
        crypto: alert.crypto,
        targetPrice: alert.targetPrice,
        currentPrice: currentPrice,
        condition: alert.condition,
      });

      if (emailSent) {
        // Create triggered alert record
        await prisma.triggeredAlert.create({
          data: {
            alertId: alert.id,
            userId: alert.userId,
            priceAtTrigger: currentPrice,
          },
        });

        // Deactivate the alert (one-time trigger)
        await prisma.alert.update({
          where: { id: alert.id },
          data: { isActive: false },
        });

        console.log(`Alert ${alert.id} triggered and deactivated`);
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error processing alert ${alert.id}:`, error);
    return false;
  }
};

// Check all active alerts
export const checkAllAlerts = async (): Promise<void> => {
  try {
    console.log('Checking all active alerts...');

    // Get all active alerts with user data
    const activeAlerts = await prisma.alert.findMany({
      where: { isActive: true },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    console.log(`Found ${activeAlerts.length} active alerts`);

    // Group alerts by crypto to minimize API calls
    const alertsByCrypto: Record<string, typeof activeAlerts> = {};
    
    for (const alert of activeAlerts) {
      const crypto = alert.crypto.toLowerCase();
      if (!alertsByCrypto[crypto]) {
        alertsByCrypto[crypto] = [];
      }
      alertsByCrypto[crypto].push(alert);
    }

    // Process alerts for each crypto
    for (const [crypto, alerts] of Object.entries(alertsByCrypto)) {
      const priceData = await getCryptoPrice(crypto);
      
      if (!priceData) {
        console.error(`Could not fetch price for ${crypto}`);
        continue;
      }

      const currentPrice = priceData.usd;
      console.log(`Current ${crypto.toUpperCase()} price: $${currentPrice}`);

      // Check each alert for this crypto
      for (const alert of alerts) {
        if (shouldTriggerAlert(currentPrice, alert.targetPrice, alert.condition)) {
          await processAlert(alert);
        }
      }
    }

    console.log('Alert check completed');
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};
