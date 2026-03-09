export type TextSegmentVariant = 'default' | 'gradient';

export type TextSegment = {
  text: string;
  variant?: TextSegmentVariant;
  breakBefore?: boolean;
};

