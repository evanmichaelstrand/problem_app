import React, { useState } from 'react';
import type { TimeframeV2 } from '@dynatrace/strato-components-preview/core';
import { TimeframeSelector } from '@dynatrace/strato-components-preview/forms';

export const TimeFilter = (): JSX.Element => {
    const [value, setValue] = useState<TimeframeV2 | null>(null);
    
    return <TimeframeSelector value={value} onChange={setValue} />;
  };