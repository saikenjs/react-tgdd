import { useState } from 'react';
import { useIsomorphicEffect } from './useIsomorphicEffect';

export const useDocumentTitle = (title: string) => {
  const [documentTitle, setDocumentTitle] = useState(title);
  useIsomorphicEffect(() => {
    document.title = documentTitle;
  });

  return [documentTitle, setDocumentTitle];
};
