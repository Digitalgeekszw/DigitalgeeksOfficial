import { useState, useEffect } from 'react';

// One request per page load, shared by every component that reads CMS content.
let contentPromise = null;
let contentCache = null;

function loadContent() {
  if (!contentPromise) {
    contentPromise = fetch('/api/content', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : {}))
      .catch((error) => {
        console.error('Failed to fetch content:', error);
        return {};
      })
      .then((data) => {
        contentCache = data;
        return data;
      });
  }
  return contentPromise;
}

export function useContent() {
  const [content, setContent] = useState(contentCache || {});
  const [loading, setLoading] = useState(!contentCache);

  useEffect(() => {
    let active = true;
    loadContent().then((data) => {
      if (!active) return;
      setContent(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { content, loading };
}
