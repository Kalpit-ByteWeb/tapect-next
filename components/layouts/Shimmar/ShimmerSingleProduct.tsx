const ShimmerSingleProduct = () => {
  return (
    <div className="animate-pulse py-120">
      <div className="flex container md:flex-row flex-col mx-auto gap-6 relative">
        <div className="md:w-3/5 md:px-0 px-6 ">
          <div className="h-[479px] bg-[#F5F8FE] rounded-20 mb-4 animate-shrimmer"></div>
          <div className="grid grid-cols-5">
            <div className="w-[126px] h-[105px] bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
            <div className="w-[126px] h-[105px] bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
            <div className="w-[126px] h-[105px] bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
            <div className="w-[126px] h-[105px] bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
            <div className="w-[126px] h-[105px] bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
          </div>
        </div>
        <div className="md:w-2/5 md:px-0 px-6 ">
          <div className="h-20 w-1/2 bg-[#F5F8FE] rounded-20 mb-4 animate-shrimmer"></div>
          <div className="h-48 bg-[#F5F8FE] rounded-20 w-full mb-6 animate-shrimmer"></div>
          <div className="h-10 bg-[#F5F8FE] rounded-20 w-1/5 animate-shrimmer"></div>
          <div className="flex gap-2 mt-6 mb-8">
            <div className="w-1/4 h-12 bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
            <div className="w-9/12 h-12 bg-[#F5F8FE] rounded-20 animate-shrimmer"></div>
          </div>
          <div className="h-32 w-full bg-[#F5F8FE] rounded-20 mb-4 animate-shrimmer"></div>
          <div className="h-52 w-full bg-[#F5F8FE] rounded-20 mb-4 animate-shrimmer"></div>
          <div className="h-32 w-full bg-[#F5F8FE] rounded-20 mb-4 animate-shrimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerSingleProduct;
