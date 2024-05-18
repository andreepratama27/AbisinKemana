import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import "./main.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<div className="max-w-2xl mx-auto shadow-md px-4">
					<nav className="h-14 py-4 mb-2">
						<Link to="/" className="font-bold text-lg">
							<p className="text-lg">
								Abisin Kemana? <span className="text-xl">🤷🏻‍♂️</span>
							</p>
						</Link>
						<p className="text-gray-500 italic text-sm">
							Kemana uangmu kau habiskan?
						</p>
					</nav>
					{children}
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
