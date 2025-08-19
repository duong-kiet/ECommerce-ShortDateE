export default function PromoCards() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 mb-0">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Card 1 */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 h-48 overflow-hidden group hover:shadow-xl transition-all duration-300 flex-1">
          <div className="absolute top-4 right-4 opacity-20">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
              <span className="text-6xl">🥚</span>
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                Sản phẩm hàng ngày<br />
                tươi mới
              </h3>
            </div>

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 self-start">
              Shop Now
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute bottom-4 right-4 opacity-30">
            <div className="flex space-x-2">
              <div className="w-12 h-8 bg-amber-200 rounded-full"></div>
              <div className="w-8 h-8 bg-orange-200 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Card 2 - Strawberry Milk */}
        <div className="relative bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-6 h-48 overflow-hidden group hover:shadow-xl transition-all duration-300 flex-1">
          <div className="absolute top-4 right-4">
            <div className="w-24 h-32 bg-pink-300 rounded-full flex items-center justify-center relative">
              <div className="w-16 h-24 bg-pink-400 rounded-full"></div>
              <div className="absolute top-2 w-8 h-6 bg-pink-500 rounded-t-full"></div>
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                An toàn cho bạn
                <br />
                và gia đình
              </h3>
            </div>

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 self-start">
              Shop Now
            </button>
          </div>

          {/* Strawberry decoration */}
          <div className="absolute bottom-4 right-4 opacity-40">
            <div className="flex space-x-1">
              <span className="text-2xl">🍓</span>
              <span className="text-xl">🍓</span>
            </div>
          </div>
        </div>

        {/* Card 3 - Vegetables */}
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 h-48 overflow-hidden group hover:shadow-xl transition-all duration-300 flex-1">
          <div className="absolute top-4 right-4 opacity-40">
            <div className="w-32 h-24 relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-400 rounded-lg transform rotate-12"></div>
              <div className="absolute bottom-0 left-4 text-3xl">🥬</div>
              <div className="absolute top-2 left-0 text-2xl">🥕</div>
              <div className="absolute bottom-2 right-8 text-2xl">🍅</div>
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                Dinh dưỡng &<br />
                sạch sẽ
              </h3>
            </div>

            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 self-start">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
