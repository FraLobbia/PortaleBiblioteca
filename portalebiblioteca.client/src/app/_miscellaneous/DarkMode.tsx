import React from "react";
import { setDarkMode, setLightMode } from "../../Functions/utility";

const DarkMode = () => {
	const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) setDarkMode();
		else setLightMode();
	};

	const selectedTheme = localStorage.getItem("selectedTheme");

	return (
		<div className="d-flex justify-content-center gap-3 mt-3">
			<label htmlFor="darkmode-toggle">Tema</label>
			<input
				className="dark_mode_input"
				type="checkbox"
				id="darkmode-toggle"
				onChange={toggleTheme}
				defaultChecked={selectedTheme === "dark"}
			/>
			<label
				className="dark_mode_label"
				htmlFor="darkmode-toggle"></label>
		</div>
	);
};

export default DarkMode;
