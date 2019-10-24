import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import Table from "ink-table";
import TextInput from "ink-text-input";

const main = [
	{ id: 1, name: "sườn non nướng sữa" },
	{ id: 2, name: "Thịt kho trứng cút" },
	{ id: 3, name: "thịt bò xào cải chua" }
];

const foods = [
	{
		name: "nguyen",
		main: [
			{
				name: "suon heo",
				value: 3
			}
		],
		extras: [
			{
				name: "suon bo",
				value: 2
			}
		],
		drinks: [
			{
				name: "nuoc dua",
				value: 2
			}
		]
	}
];

const extras = [
	{ id: 1, name: "sườn thêm" },
	{ id: 2, name: "thịt kho thêm" },
	{ id: 3, name: "bò thêm" }
];

const drinks = [{ id: 1, name: "Nuoc dua" }];

///List all Menu for today
const MenuList = ({ list }) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [orderQuantity, setOrderQuantity] = useState("");
	const [name, setName] = useState("");
	const [step, setStep] = useState(0);
	const [cart, setCart] = useState([]);

	const handleSubmitFoodName = (data, n) => {
		const input = parseInt(n);
		const numberRange = data.map(i => i.id);
		if (input === 0 || numberRange.includes(input)) {
			console.log("Going to next step " + (step + 1));
			setStep(step + 1);
			setOrderNumber("");
		} else {
			console.log("number invalid");
			console.log(numberRange);
			console.log(input);
		}
	};
	const handleSubmitQuantity = (data, n) => {
		const input = parseInt(n);
		const numberRange = data.map(i => i.id);
		console.log("Going to next step " + (step + 1));
		setStep(step + 1);
		setOrderNumber("");
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
							onSubmit={() => handleSubmitFoodName(main, orderNumber)}
						/>
					</Box>
				</>
			);
		case 2:
			return (
				<>
					<Box>
						<Box marginRight={1}>Quantity: </Box>
						<TextInput
							value={orderNumber}
							onChange={e => setOrderNumber(e)}
							onSubmit={() => handleSubmitFoodName(main, orderNumber)}
						/>
					</Box>
				</>
			);
		case 3:
			return (
				<>
					<Text> Pick your extras</Text>
					<Table data={extras} />
					<Box>
						<Box marginRight={1}>Pick number:</Box>
						<TextInput
							value={orderNumber}
							onChange={e => setOrderNumber(e)}
							onSubmit={() => handleSubmitFoodName(extras, orderNumber)}
						/>
					</Box>
				</>
			);
		case 4:
			return (
				<>
					<Box>
						<Box marginRight={1}>Quantity: </Box>
						<TextInput
							value={orderNumber}
							onChange={e => setOrderNumber(e)}
							onSubmit={() => handleSubmitFoodName(main, orderNumber)}
						/>
					</Box>
				</>
			);
		case 5:
			return <Text>Done</Text>;
		default:
			return (
				<>
					<Box marginRight={1}>
						<Text> Type your name: </Text>
						<TextInput
							value={name}
							onChange={e => setName(e)}
							onSubmit={() => setStep(step + 1)}
						/>
					</Box>
				</>
			);
	}
};

export default MenuList;
