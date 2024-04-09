import React from "react";
import Sun from "../../assets/svg/Sun.svg";
import Moon from "../../assets/svg/Moon.svg";
import { setDarkMode, setLightMode } from "../../functions/utility";

const DarkMode = () => {
	const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) setDarkMode();
		else setLightMode();
	};

	const selectedTheme = localStorage.getItem("selectedTheme");

	return (
		<div className="dark_mode">
			<input
				className="dark_mode_input"
				type="checkbox"
				id="darkmode-toggle"
				onChange={toggleTheme}
				defaultChecked={selectedTheme === "dark"}
			/>
			<label className="dark_mode_label" htmlFor="darkmode-toggle">
				{/* <Sun />
				<Moon /> */}
			</label>
		</div>
	);
};

export default DarkMode;
