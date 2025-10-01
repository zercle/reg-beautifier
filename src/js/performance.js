// Performance monitoring for REG Beautifier

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (!window.performance || !window.PerformanceObserver) {
    console.warn('Performance API not available');
    return;
  }

  // Monitor page load performance
  measurePageLoad();

  // Monitor long tasks
  observeLongTasks();

  // Monitor layout shifts
  observeLayoutShifts();

  // Log performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      logPerformanceMetrics();
    }, 0);
  });
}

/**
 * Measure page load performance
 */
function measurePageLoad() {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  const connectTime = perfData.responseEnd - perfData.requestStart;
  const renderTime = perfData.domComplete - perfData.domLoading;

  console.log('[Performance] Page Load Metrics:', {
    'Total Load Time': `${pageLoadTime}ms`,
    'Connection Time': `${connectTime}ms`,
    'Render Time': `${renderTime}ms`,
  });
}

/**
 * Observe long tasks (>50ms)
 */
function observeLongTasks() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('[Performance] Long Task Detected:', {
          duration: `${entry.duration.toFixed(2)}ms`,
          startTime: `${entry.startTime.toFixed(2)}ms`,
        });
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task API not supported
  }
}

/**
 * Observe layout shifts (CLS - Cumulative Layout Shift)
 */
function observeLayoutShifts() {
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    // Log CLS on page unload
    window.addEventListener('beforeunload', () => {
      console.log('[Performance] Cumulative Layout Shift:', clsValue.toFixed(4));
    });
  } catch (e) {
    // Layout shift API not supported
  }
}

/**
 * Log comprehensive performance metrics
 */
function logPerformanceMetrics() {
  const perfData = performance.getEntriesByType('navigation')[0];

  if (!perfData) {
    console.warn('[Performance] Navigation timing not available');
    return;
  }

  console.log('[Performance] Comprehensive Metrics:', {
    'DNS Lookup': `${(perfData.domainLookupEnd - perfData.domainLookupStart).toFixed(2)}ms`,
    'TCP Connection': `${(perfData.connectEnd - perfData.connectStart).toFixed(2)}ms`,
    'Request Time': `${(perfData.responseStart - perfData.requestStart).toFixed(2)}ms`,
    'Response Time': `${(perfData.responseEnd - perfData.responseStart).toFixed(2)}ms`,
    'DOM Processing': `${(perfData.domComplete - perfData.domInteractive).toFixed(2)}ms`,
    'Load Complete': `${(perfData.loadEventEnd - perfData.loadEventStart).toFixed(2)}ms`,
    'Total Time': `${perfData.duration.toFixed(2)}ms`,
  });

  // Log resource timing
  const resources = performance.getEntriesByType('resource');
  const slowResources = resources.filter((r) => r.duration > 200);

  if (slowResources.length > 0) {
    console.warn('[Performance] Slow Resources (>200ms):', slowResources.map(r => ({
      name: r.name,
      duration: `${r.duration.toFixed(2)}ms`,
      type: r.initiatorType,
    })));
  }
}

/**
 * Measure custom mark
 */
export function mark(name) {
  if (window.performance && performance.mark) {
    performance.mark(name);
  }
}

/**
 * Measure time between two marks
 */
export function measure(name, startMark, endMark) {
  if (window.performance && performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      return measure.duration;
    } catch (e) {
      console.warn(`[Performance] Could not measure ${name}:`, e.message);
    }
  }
  return null;
}
