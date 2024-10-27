import AlignmentCalculator from '@/components/AlignmentCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Shaft Alignment Calculator
        </h1>
        <AlignmentCalculator />
      </div>
    </main>
  );
}