const MAX_USES_PER_DAY = 3;
const STORAGE_KEY = 'glassCardUsage';

interface UsageData {
  count: number;
  lastReset: string;
}

// Check if running in development mode
function isDevMode(): boolean {
  return import.meta.env.DEV;
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function getUsageData(): UsageData {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { count: 0, lastReset: getTodayDate() };
  }
  
  try {
    const data: UsageData = JSON.parse(stored);
    
    // Reset if it's a new day
    if (data.lastReset !== getTodayDate()) {
      return { count: 0, lastReset: getTodayDate() };
    }
    
    return data;
  } catch {
    return { count: 0, lastReset: getTodayDate() };
  }
}

function saveUsageData(data: UsageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function checkRateLimit(): { allowed: boolean; remaining: number } {
  // Skip rate limiting in development mode
  if (isDevMode()) {
    return {
      allowed: true,
      remaining: 999
    };
  }

  const usage = getUsageData();
  const remaining = Math.max(0, MAX_USES_PER_DAY - usage.count);
  
  return {
    allowed: usage.count < MAX_USES_PER_DAY,
    remaining
  };
}

export function incrementUsage(): void {
  // Skip incrementing in development mode
  if (isDevMode()) {
    return;
  }

  const usage = getUsageData();
  usage.count += 1;
  saveUsageData(usage);
}

export function getRemainingUses(): number {
  // Show unlimited in development mode
  if (isDevMode()) {
    return 999;
  }

  const usage = getUsageData();
  return Math.max(0, MAX_USES_PER_DAY - usage.count);
}
