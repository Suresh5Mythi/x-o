function Holder(props){
		return (
			<button className="holder" onClick={() => props.onClick()}>
			{props.value}
			</button>
		)
}
export default Holder;
