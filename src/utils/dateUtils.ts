/**
 * Helper to compute countdown and urgency status against current date (2026-10-18).
 */
export function getDeadlineUrgency(dateStr: string): {
  isUrgent: boolean;
  statusLabel: string;
  badgeColor: string;
} {
  if (!dateStr) {
    return { isUrgent: false, statusLabel: 'Timeline noted', badgeColor: 'slate' };
  }

  // Check for ISO-like dates (e.g. 2026-10-25)
  const isoMatch = dateStr.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const target = new Date(parseInt(isoMatch[1], 10), parseInt(isoMatch[2], 10) - 1, parseInt(isoMatch[3], 10));
    // Simulated current date: 2026-10-18
    const now = new Date(2026, 9, 18);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        isUrgent: true,
        statusLabel: `OVERDUE by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? 's' : ''}!`,
        badgeColor: 'red',
      };
    } else if (diffDays === 0) {
      return {
        isUrgent: true,
        statusLabel: 'DUE TODAY!',
        badgeColor: 'red',
      };
    } else if (diffDays <= 7) {
      return {
        isUrgent: true,
        statusLabel: `URGENT — Due in ${diffDays} day${diffDays > 1 ? 's' : ''}!`,
        badgeColor: 'red',
      };
    } else {
      return {
        isUrgent: false,
        statusLabel: `Due in ${diffDays} days`,
        badgeColor: 'emerald',
      };
    }
  }

  // Non-date string like "3rd of every month" or "Before signing"
  const lower = dateStr.toLowerCase();
  if (lower.includes('urgent') || lower.includes('overdue') || lower.includes('immediate') || lower.includes('before signing')) {
    return {
      isUrgent: true,
      statusLabel: 'Action Required Promptly',
      badgeColor: 'amber',
    };
  }

  return {
    isUrgent: false,
    statusLabel: dateStr,
    badgeColor: 'indigo',
  };
}
