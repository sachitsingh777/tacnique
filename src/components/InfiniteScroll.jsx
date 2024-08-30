import React, { useEffect, useRef } from "react";

const InfiniteScroll = ({ children, fetchMore, loadingComponent }) => {
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchMore();
        }
      });
    }, options);

    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.current.observe(sentinel);
    }

    return () => {
      if (observer.current && sentinel) {
        observer.current.unobserve(sentinel);
      }
    };
  }, [fetchMore]);

  return (
    <div>
      {children}
      <div id="sentinel" style={{ height: "10px" }}></div>
      {loadingComponent}
    </div>
  );
};

export default InfiniteScroll;
