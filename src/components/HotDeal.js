const HotDeal = ({ title, description, image, badgeText }) => (
    <section className="flex justify-between items-center bg-gray-800 text-white rounded-lg p-5 mb-5 relative">
      <div className="flex-1">
        <h1 className="text-3xl text-yellow-400 mb-2">{title}</h1>
        <p className="text-lg mb-4">{description}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Kup teraz
        </button>
      </div>
      <div className="flex-1 relative text-right">
        <img
          src={image}
          alt={title}
          className="max-w-full rounded-lg shadow-lg"
        />
        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          <i className="fas fa-fire text-yellow-400"></i> {badgeText}
        </div>
      </div>
    </section>
  );
  
  export default HotDeal;
  