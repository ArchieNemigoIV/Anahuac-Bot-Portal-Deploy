import BaseDeConocimiento from "../components/BaseDeConocimiento";
import BotList from "../components/BotList";

const Home = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bot List */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Panel de Control
            </h1>
          </div>
          <BotList />
        </div>

        {/* Right Column: Knowledge Base / Actions */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28">
            <BaseDeConocimiento />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
