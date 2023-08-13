const useEventSourceListener = (
  eventsAPI: string,
  // conversation_id: string,
  onOpen?: () => void,
  onMessage?: (e: MessageEvent) => void,
  onError?: (e: Event) => void
) => {
  const start = () => {
    const source = new EventSource(eventsAPI);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
      if (onOpen) onOpen();
    });

    source.addEventListener("message", (e) => {
      if (onMessage) {
        // console.log("message received");
        // console.log(e);
        onMessage(e);
      }
    });

    source.addEventListener("error", (e) => {
      // console.error("Error: ", e);
      if (onError) onError(e);
    });

    return source;
  };

  const stop = (source: EventSource) => {
    source.close();
  };

  return { start, stop };
};

export default useEventSourceListener;
