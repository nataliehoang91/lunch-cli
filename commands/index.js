import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import Table from "ink-table";
import TextInput from "ink-text-input";

const main = [
	{ id: 1, food: "Food A" },
	{ id: 2, food: "Food B" },
	{ id: 3, food: "Food C" },
];

const extras = [
	{ id: 1, food: "Them A" },
	{ id: 2, food: "Them B" },
	{ id: 3, food: "Them C" },
	{ id: 3, food: "Them D" },
];

///List all Menu for today
const MenuList = ({ list }) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [step, setStep] = useState(1);

	const handleSubmit = (data, n) => {
		const input = parseInt(n);
		const numberRange = data.map(i => i.id);
		if (input === 0 || numberRange.includes(input)) {
			console.log("Going to next step " + (step + 1));
			setStep(step + 1);
		} else {
			console.log("number invalid");
			console.log(numberRange);
			console.log(input);
		}
	};

	switch (step) {
		case 1:
			return (
				<>
					<Text>Pick ur main</Text>
					<Table data={main} />
					<Box>
						<Box marginRight={1}>Pick number:</Box>

						<TextInput
							value={orderNumber}
							onChange={e => setOrderNumber(e)}
							onSubmit={() => handleSubmit(main, orderNumber)}
						/>
					</Box>
				</>
			);
		case 2:
			return (
				<>
					<Text> Pick your extras</Text>
					<Table data={extras} />
					<Box>
						<Box marginRight={1}>Pick number:</Box>
						<TextInput
							value={orderNumber}
							onChange={e => setOrderNumber(e)}
							onSubmit={() => handleSubmit(extras, orderNumber)}
						/>
					</Box>
				</>
			);
		case 3:
			return <Text>Done</Text>;
		default:
			return (
				<>
					<div>How?</div>
				</>
			);
	}
};

export default MenuList;
