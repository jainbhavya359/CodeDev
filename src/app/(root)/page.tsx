import Header from "./_components/Header";
import SplitLayoutHorizontal from "./_components/SplitLayoutHorizontal";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4 overflow-hidden">
        <Header />
        <SplitLayoutHorizontal />
      </div>
    </div>
  );
}