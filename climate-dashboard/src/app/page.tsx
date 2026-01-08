export default function HomePage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  return (
    <main>
      <h1>Climate Dashboard</h1>
      <p>API Base URL: {apiUrl}</p>
    </main>
  );
}
