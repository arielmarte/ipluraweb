import { Fragment } from 'react';
import type { TextSegment, TextSegmentVariant } from '@/content/types';

type VariantClassMap = Partial<Record<TextSegmentVariant, string>>;

export const renderTextSegments = (
  segments: readonly TextSegment[],
  variantClassMap: VariantClassMap = {}
) => {
  return segments.map((segment, index) => (
    <Fragment key={`${index}-${segment.text}`}>
      {segment.breakBefore ? <br /> : null}
      <span className={segment.variant ? variantClassMap[segment.variant] : undefined}>
        {segment.text}
      </span>
    </Fragment>
  ));
};
