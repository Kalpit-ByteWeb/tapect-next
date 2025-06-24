const ShimmerProductCard = () => {
  return (
    <div className="animate-pulse">
      <div className="h-[398px] bg-[#F5F8FE] rounded-20 mb-4 animate-shrimmer"></div>
      <div className="flex justify-between">
        {/* Title Placeholder */}
        <div className="h-6 w-1/2 bg-[#F5F8FE] rounded-20 mb-2 animate-shrimmer"></div>

        {/* Price Placeholder */}
        <div className="h-6 bg-[#F5F8FE] rounded-20 w-1/4 mb-4 animate-shrimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerProductCard;
