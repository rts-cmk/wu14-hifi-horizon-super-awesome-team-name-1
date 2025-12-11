import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
	  <main className="w-full h-[calc(100vh-4.5rem)]">
			<section className="w-full h-full">
			  <video
					src="/assets/video.mp4"
					autoPlay
					muted
					loop
					className="w-full h-full object-cover"
			  />
			</section>
		</main>
	)
}
