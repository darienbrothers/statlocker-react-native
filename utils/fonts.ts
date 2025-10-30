/**
 * Font configuration for the StatLocker app
 * Use these constants for consistent typography throughout the app
 */

export const Fonts = {
  // Primary font family (InterTight) - use for body text and general UI
  InterTight: {
    regular: 'InterTight-Regular',
    medium: 'InterTight-Medium',
    semiBold: 'InterTight-SemiBold',
    bold: 'InterTight-Bold',
  },
  
  // Secondary font family (Outfit) - use for headings and emphasis
  Outfit: {
    regular: 'Outfit-Regular',
    medium: 'Outfit-Medium',
    semiBold: 'Outfit-SemiBold',
    bold: 'Outfit-Bold',
  },
} as const;

// Default font family (using InterTight as primary)
export const defaultFontFamily = Fonts.InterTight.regular;

