import Image from "next-export-optimize-images/image";
import Android from "@/assets/images/gpt-at-polls.jpg";

export default function Home() {
	return (
		<div className="px-2 py-4 ">
			<div className="bg-gptyellow-200/80 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 rounded-4xl px-10 py-10 md:py-16 shadow-lg">
				<div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
					<div className="flex flex-col gap-8">
						<h1 className="text-gptblue-800 flex flex-col text-center text-4xl leading-6 font-black italic md:text-left">
							<span className="text-8xl">GPT</span>
							<span className="leading-none">at the Polls</span>
						</h1>
						<div className="max-w-md">
							<p className="text-gptblue-800 text-center text-2xl leading-tight md:text-left">
								A research project that analyzes the political opinions of
								large language models.
							</p>
						</div>
					</div>
					<Image
						className="border-gptblue-500 rounded-4xl border-4 shadow-xl"
						src={Android}
						alt="An Android at the polls."
						width={360}
						height={360}
						priority
					/>
				</div>
			</div>
		</div>
	);
}
