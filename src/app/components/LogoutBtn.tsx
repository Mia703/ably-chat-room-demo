import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();

  // TODO: how do I clear the message history on logout?
  
  return (
    <div className="logout-container flex flex-col items-end justify-end">
      <button
        id="logout-btn"
        type="button"
        onClick={() => {
          window.sessionStorage.removeItem("user");
          router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
