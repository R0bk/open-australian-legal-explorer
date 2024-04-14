import Header from "@/app/components/header";
import Playground from "./components/playground";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <Header />
      <div className="space-y-4 max-w-6xl w-full">
        <div className="w-full rounded-xl bg-white shadow-xl pb-0 border">
          <Playground />
        </div>
      </div>
    </main>
  );
}
