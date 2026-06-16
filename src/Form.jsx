import { useState } from "react";
import { Link } from "react-router";

const tw = {
	cardBase: "p-6 py-7 border border-black/20 bg-white flex flex-col gap-6",
	cardHeader: "rounded-b-lg rounded-t-2xl border-t-[16px] border-t-violet-700",
	cardField: "rounded-lg",
	buttonBase: "w-fit text-sm font-medium p-2.5 cursor-pointer",
	btnSubmit:
		"px-6 text-white bg-violet-700 border border-black/20 rounded hover:opacity-90 transition-opacity",
	btnReset: "text-violet-700 bg-transparent border-none hover:underline",
	inputToggle: "w-5 h-5 cursor-pointer accent-violet-700",
};

const fields = [
	{ input: "name", label: "Siapa nama Anda?", type: "text" },
	{ input: "age", label: "Berapa umur Anda?", type: "number" },
	{
		input: "gender",
		label: "Apa jenis kelamin Anda?",
		type: "radio",
		choices: [
			{ value: "male", label: "Laki-laki" },
			{ value: "female", label: "Perempuan" },
		],
	},
	{
		input: "smoking",
		label: "Apakah Anda perokok?",
		type: "radio",
		choices: [
			{ value: "1", label: "Ya" },
			{ value: "0", label: "Tidak" },
		],
	},
	{
		input: "brand",
		label: "Jika anda perokok, rokok apa yang anda pernah coba?",
		type: "checkbox",
		choices: [
			{ value: "gudang-garam-filter", label: "Gudang Garam Filter" },
			{ value: "lucky-strike", label: "Lucky Strike" },
			{ value: "marlboro", label: "Marlboro" },
			{ value: "esse", label: "Esse" },
		],
	},
];

export default function Form() {
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		const data = {};
		const formData = new FormData(e.target);

		for (const key of new Set(formData.keys())) {
			if (key.endsWith("[]")) {
				data[key.slice(0, -2)] = formData.getAll(key);
			} else {
				data[key] = formData.get(key);
			}
		}

		const existing = JSON.parse(localStorage.getItem("data") ?? "[]");
		localStorage.setItem("data", JSON.stringify([...existing, data]));
		setSubmitted(true);
	}

	if (submitted) {
		return (
			<main className="max-w-3xl mx-auto p-4">
				<div className={`${tw.cardBase} ${tw.cardHeader}`}>
					<h1 className="text-3xl">Terimakasih telah mengisi form ini.</h1>
				</div>
			</main>
		);
	}

	return (
		<main className="max-w-3xl mx-auto p-4 flex flex-col gap-6">
			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit}
				onReset={() => {}}
			>
				<div className={`${tw.cardBase} ${tw.cardHeader}`}>
					<h1 className="text-3xl">Form Survey Perokok</h1>
				</div>

				{fields.map((field) => (
					<div
						key={field.input}
						className={`${tw.cardBase} ${tw.cardField}`}
					>
						<div className="text-lg">
							<label htmlFor={field.input}>{field.label}</label>
						</div>

						{field.choices ? (
							field.choices.map((choice) => (
								<div
									key={choice.value}
									className="flex items-center gap-3"
								>
									<input
										type={field.type}
										name={
											field.type === "checkbox"
												? `${field.input}[]`
												: field.input
										}
										id={choice.value}
										value={choice.value}
										className={tw.inputToggle}
									/>
									<label
										htmlFor={choice.value}
										className="cursor-pointer"
									>
										{choice.label}
									</label>
								</div>
							))
						) : (
							<input
								type={field.type}
								name={field.input}
								id={field.input}
								placeholder="Jawaban Anda"
								className="border-0 p-4 py-5 bg-black/2.5 border-b border-black/50 mb-px focus:outline-none focus:border-b-2 focus:border-black focus:mb-0"
							/>
						)}
					</div>
				))}

				<div className="flex justify-between mt-2">
					<button
						type="submit"
						className={`${tw.buttonBase} ${tw.btnSubmit}`}
					>
						Simpan
					</button>
					<button
						type="reset"
						className={`${tw.buttonBase} ${tw.btnReset}`}
					>
						Bersihkan form
					</button>
				</div>
			</form>

			<Link
				to="/result"
				className="text-violet-700 my-2 text-sm font-medium no-underline hover:underline block"
			>
				Lihat hasil
			</Link>
		</main>
	);
}
