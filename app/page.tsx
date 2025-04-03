import Image from "next-export-optimize-images/image";
import Android from "@/assets/images/gpt-at-polls.jpg";

export default function Home() {
	return (
		<div className="px-2">
			<div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-8 px-10 py-12">
				<div>
					<h1 className="text-2xl font-bold">GPT at the Polls</h1>
					<p className="text-lg text-gray-500">
						A research project that analyzes the political opinions of
						large language models.
					</p>
				</div>
				<Image
					className="rounded-4xl"
					src={Android}
					alt="Android"
					width={360}
					height={360}
					priority
				/>
			</div>
		</div>
	);
}
