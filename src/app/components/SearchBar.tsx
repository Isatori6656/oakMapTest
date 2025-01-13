const SearchBar = () => {
  return (
    <div className="w-[80vw] md:w-[50vw] flex justify-start items-center my-2">
      <input
        className="rounded border border-gray-300 p-1"
        type="text"
        placeholder="請輸入您要查詢的地址"
      />
      <button className="px-2" onClick={() => {}}>
        查詢
      </button>
    </div>
  );
};

export default SearchBar;
