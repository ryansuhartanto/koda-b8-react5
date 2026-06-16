import { Outlet } from "react-router";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

export default function Layout() {
	return (
		<div className="w-full min-h-screen font-sans bg-violet-100">
			<Outlet />
		</div>
	);
}
