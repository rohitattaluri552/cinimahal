import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const handleLogout = () => {
    // Clear user session or token here
    console.log("User logged out");
    localStorage.clear();
    // Redirect to login page or home page
    window.location.href = "/login"; // Adjust the path as needed
    router.replace("/login"); // Ensure the router state is updated
  };

  return (
    <button
      onClick={handleLogout}
      className="
        text-white px-4 py-2 rounded text-lg font-semibold
        hover:bg-red-600 transition cursor-pointer"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}
