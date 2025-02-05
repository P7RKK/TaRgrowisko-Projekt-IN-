const CategoryCard = ({ title, image }) => (
  <div className="bg-gray-800 text-white rounded-lg p-4 text-center shadow-lg">
    <img
      src={image}
      alt={title}
      className="rounded-lg mb-2 max-w-full object-cover"
    />
    <h3 className="text-lg text-yellow-400 mb-2">{title}</h3>
    <button className="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-600">
      Zobacz więcej
    </button>
  </div>
);

export default CategoryCard;
