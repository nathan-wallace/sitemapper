export function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function diagonal(s, d) {
  return `M ${s.x} ${s.y} 
          C ${(s.x + d.x) / 2} ${s.y}, 
            ${(s.x + d.x) / 2} ${d.y}, 
            ${d.x} ${d.y}`;
}

// Assuming these are moved from utils/dom.js
export function showLoading(opacity) {
  document.body.style.opacity = opacity / 100;
}

export function hideLoading() {
  document.body.style.opacity = 1;
}