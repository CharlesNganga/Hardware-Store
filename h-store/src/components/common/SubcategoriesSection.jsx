const SubcategoriesSection = ({ subcategories, onSelect }) => {
  return (
    <div className="w-full my-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Subcategories</h2>

      <div
        className="grid gap-4 h-[25vh]"
        style={{ gridTemplateColumns: `repeat(${subcategories.length}, minmax(0, 1fr))` }}
      >
        {subcategories.map(subcat => (
          <div
            key={subcat.id}
            className="w-full aspect-[4/5] bg-white shadow hover:shadow-lg transition duration-300 flex flex-col cursor-pointer"
            onClick={() => onSelect(subcat.slug)}
          >
            <div className="h-4/5 w-full bg-black flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Image</span>
            </div>
            <div className="h-1/5 flex items-center justify-center bg-white text-center px-2">
              <span className="font-semibold text-gray-900 text-sm sm:text-base break-words">
                {subcat.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesSection;
