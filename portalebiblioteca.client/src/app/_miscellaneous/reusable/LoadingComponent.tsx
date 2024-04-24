import { SyncLoader } from "react-spinners";

const LoadingComponent = () => {
	return (
		<div className="d-flex justify-content-center my-5 ">
			<SyncLoader color="#513329" size={20} />
		</div>
	);
};
export default LoadingComponent;
