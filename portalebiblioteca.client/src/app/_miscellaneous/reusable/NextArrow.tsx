type NextArrowProps = {
	className?: string;
	style?: { [key: string]: string };
	onClick?: () => void;
	opacity?: string;
};

function NextArrow({
	className,
	style,
	onClick,
	opacity = "0.6",
}: NextArrowProps) {
	return (
		<div
			className={className}
			style={{
				...style,
				display: "block",
				transform: "scale(3)",
				opacity: opacity,
				marginRight: "3rem",
				zIndex: "3",
			}}
			onClick={onClick}
		/>
	);
}

export default NextArrow;
