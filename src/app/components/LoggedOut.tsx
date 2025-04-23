import { useRouter } from "next/navigation";

export default function LoggedOut() {
  const router = useRouter();
	
  return (
    <div id="logged-out">
      <p>You&apos;re not logged in. Go back to the homepage to login.</p>
      <button
        type="button"
        onClick={() => {
          window.sessionStorage.removeItem("user");
          router.push("/");
        }}
      >
        Back to Login
      </button>
    </div>
  );
}
