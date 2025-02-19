import React, { useState, useEffect } from 'react';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlayShow, setOverlayShow] = useState(false);
  const [stopScrolling, setStopScrolling] = useState(false);
  const [scrollStarted, setScrollStarted] = useState(false);
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      if (scrollPos > 100 && !scrollStarted) {
        countUp();
        setScrollStarted(true);
      } else if (scrollPos < 100 && scrollStarted) {
        reset();
        setScrollStarted(false);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrollStarted]);

  const navToggle = () => {
    setMenuOpen(!menuOpen);
    setOverlayShow(!overlayShow);
    setStopScrolling(!stopScrolling);
  };

  const countUp = () => {
    const updatedCounters = counters.map((counter) => {
      const target = +counter.target;
      let value = 0;
      const increment = target / 100;

      const updateCounter = () => {
        if (value < target) {
          value = Math.ceil(value + increment);
          setCounters((prevCounters) =>
            prevCounters.map((c) => (c.id === counter.id ? { ...c, value } : c))
          );
          setTimeout(updateCounter, 75);
        } else {
          setCounters((prevCounters) =>
            prevCounters.map((c) => (c.id === counter.id ? { ...c, value: target } : c))
          );
        }
      };

      updateCounter();
      return { ...counter, value: 0 };
    });

    setCounters(updatedCounters);
  };

  const reset = () => {
    setCounters(counters.map((counter) => ({ ...counter, value: 0 })));
  };

  return (
    <div className={stopScrolling ? 'stop-scrolling' : ''}>
      <button id="menu-btn" onClick={navToggle} className={menuOpen ? 'open' : ''}>
        Menu
      </button>
      <div id="overlay" className={overlayShow ? 'overlay-show' : ''}></div>
      <div id="mobile-menu" className={menuOpen ? 'show-menu' : ''}>
        {counters.map((counter) => (
          <div key={counter.id} className="counter" data-target={counter.target}>
            {counter.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
