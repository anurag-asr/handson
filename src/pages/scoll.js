import React, { useEffect, useRef, useState } from 'react'

const Scrolling = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
    
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
          const newItems = await response.json();
          console.log(newItems)
          setItems((prevItems) => [...prevItems, ...newItems]);
    
          setIsLoading(false);
        };
    
        fetchData();
      }, [page]);


  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollHeight - container.scrollTop === container.clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div ref={containerRef} style={{ height: "300px", overflowY: "scroll" }}>
    {items.map((item) => (
      <div key={item.id}>{item.title}</div>
    ))}
    {isLoading && <div>Loading...</div>}
  </div>
  )
}

export default Scrolling
