export const calculateTrialEndDate = (days = 7) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const calculateSubscriptionEndDate = (plan) => {
  const date = new Date();
  
  if (plan === 'MONTHLY') {
    date.setMonth(date.getMonth() + 1);
  } else if (plan === 'YEARLY') {
    date.setFullYear(date.getFullYear() + 1);
  }
  
  return date;
};

export const isSubscriptionActive = (subscription) => {
  if (!subscription) return false;
  
  const now = new Date();
  
  if (subscription.status === 'TRIAL') {
    return subscription.trialEndsAt && new Date(subscription.trialEndsAt) > now;
  }
  
  if (subscription.status === 'ACTIVE') {
    return subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) > now;
  }
  
  return false;
};

export const getSubscriptionStatus = (subscription) => {
  if (!subscription) return 'NONE';
  
  const now = new Date();
  
  if (subscription.status === 'TRIAL') {
    if (subscription.trialEndsAt && new Date(subscription.trialEndsAt) > now) {
      return 'TRIAL_ACTIVE';
    }
    return 'TRIAL_EXPIRED';
  }
  
  if (subscription.status === 'ACTIVE') {
    if (subscription.currentPeriodEnd && new Date(subscription.currentPeriodEnd) > now) {
      return 'ACTIVE';
    }
    return 'EXPIRED';
  }
  
  return subscription.status;
};