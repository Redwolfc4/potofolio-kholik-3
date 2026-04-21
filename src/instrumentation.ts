export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Dynamically import the worker so it only runs on the Node.js server
    // and doesn't affect the Edge runtime or client builds.
    const { initEmailWorker } = await import("./lib/queue/email-worker");
    
    // Initialize the background worker
    initEmailWorker();
    console.log("[Instrumentation] Email worker initialized.");
  }
}
