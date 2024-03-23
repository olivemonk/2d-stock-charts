import Header from "@/components/header";
import LWCChart from "@/components/lwc-chart";

export default function Home() {
  return (
    <main>
      <Header/>
      <div className="h-[calc(100vh-73px)] bg-[#222]">
        <LWCChart />
      </div>
    </main>
  );
}
