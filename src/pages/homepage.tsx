import Navbar from "../components/navbar";
import SideBar from "../components/sidebar";

export default function HomePage() {
  return (
    <main class="flex">
      <SideBar />
      <p>Content on the page.</p>
      <Navbar />
    </main>
  );
}
