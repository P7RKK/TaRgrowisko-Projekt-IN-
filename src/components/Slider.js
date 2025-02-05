const Slider = ({ title, items }) => {
  const sliderRef = React.useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-gray-200 p-5">
      <h2 className="text-2xl mb-4">{title}</h2>
      <div className="relative flex items-center max-w-5xl mx-auto">
        <button
          className="absolute left-0 bg-gray-700 text-white p-3 rounded-full z-10 hover:bg-gray-800"
          onClick={scrollLeft}
        >
          &#8249;
        </button>
        <div
          className="flex overflow-x-auto gap-5 scrollbar-hide"
          ref={sliderRef}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-[200px] bg-white p-4 rounded-lg shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-lg mb-2"
              />
              <h3 class
