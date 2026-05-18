import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'workspace_question_width';
const DEFAULT_WIDTH = 390;
const MIN_WIDTH = 280;
const MAX_WIDTH = 680;

function clampWidth(value) {
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, value));
}

function getInitialWidth() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(saved) && saved > 0 ? clampWidth(saved) : DEFAULT_WIDTH;
}

export function useWorkspaceSplit() {
  const [panelWidth, setPanelWidth] = useState(getInitialWidth);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(panelWidth));
  }, [panelWidth]);

  useEffect(() => {
    if (!isResizing) return undefined;

    function handlePointerMove(event) {
      setPanelWidth(clampWidth(event.clientX));
    }

    function stopResizing() {
      setIsResizing(false);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResizing);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResizing);
    };
  }, [isResizing]);

  const startResizing = useCallback((event) => {
    event.preventDefault();
    setIsResizing(true);
  }, []);

  return { isResizing, panelWidth, startResizing };
}
