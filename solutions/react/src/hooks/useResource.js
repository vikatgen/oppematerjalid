import { useEffect, useState } from "react";
import { getJson } from "../services/api.js";

export function useResource(path) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState({
    path: null, status: "loading", data: null, error: null,
  });

  useEffect(() => {
    if (path === null) return;
    const controller = new AbortController();
    let active = true;
    setResult({ path, status: "loading", data: null, error: null });
    getJson(path, controller.signal).then(
      data => { if (active) setResult({ path, status: "success", data, error: null }); },
      error => {
        if (active && error.name !== "AbortError") {
          setResult({ path, status: "error", data: null, error });
        }
      }
    );
    return () => { active = false; controller.abort(); };
  }, [path, attempt]);

  const current = result.path === path
    ? result
    : { path, status: "loading", data: null, error: null };
  return { ...current, retry: () => setAttempt(value => value + 1) };
}
