import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import Table from "ink-table";
import axios from "axios";

import TextInput from "ink-text-input";
import { API_KEY } from "../configs";

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

const main = [
	{ id: 1, name: "sườn non nướng sữa" },
	{ id: 2, name: "Thịt kho trứng cút" },
	{ id: 3, name: "thịt bò xào cải chua" }
];

const extras = [
	{ id: 1, name: "sườn thêm" },
	{ id: 2, name: "thịt kho thêm" },
	{ id: 3, name: "bò thêm" }
];

const drinks = [{ id: 1, name: "Nuoc dua" }];

var cartDefault = {
	name: "",
	main: [],
	extras: [],
	drinks: []
};

///List all Menu for today
const MenuList = ({ list }) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [orderQuantity, setOrderQuantity] = useState("");
	const [name, setName] = useState("");
	const [step, setStep] = useState(0);
	const [cart, setCart] = useState(cartDefault);
	const [listFood, setListFood] = useState({});

	useEffect(() => {
		async function fetchData() {
			// You can await here
			const response = await axios(
				"https://sheets.googleapis.com/v4/spreadsheets/1ZjzZKCMOFp5YncC3yZLLwFW4sER6p5fkR0rA5KvhHrY/values/Sheet1?key=AIzaSyCccptxVWHp1Mf4BGCC33m1SzgwU14BRD4"
			);
			// ...
			setListFood(response.data.values[1]);
		}
		fetchData();
	}, []);

	const handleSubmitFoodName = (data, orderNumber) => {
		const input = parseInt(orderNumber);
		console.log(orderNumber);
		const numberRange = data.map(food => food.id);
		if (input === 0 || numberRange.includes(input)) {
			setStep(step + 1);
		} else {
			console.log("number invalid");
			console.log(numberRange);
			console.log(input);
		}
	};

	const addFoodToCart = (
		orderNumber,
		orderQuantity = 1,
		listFood,
		foodType
	) => {
		const food = listFood.find(food => food.id == orderNumber);
		food.value = orderQuantity;

		if (foodType === "main") setCart(cart, cart.main.push(food));
		else if (foodType === "extras") setCart(cart, cart.extras.push(food));
		else setCart(cart, cart.drinks.push(food));

		console.log(cart);

		setOrderNumber("");
		setOrderQuantity("");
		setStep(step + 1);
	};

	switch (step) {
		case 1:
			return (
				<>
					<Text>Pick ur main</Text>
					<Table data={main} />
					<Box>
						<Box marginRight={1}>Pick number: </Box>
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
							value={orderQuantity}
							onChange={e => setOrderQuantity(e)}
							onSubmit={() =>
								addFoodToCart(orderNumber, orderQuantity, main, "main")
							}
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
							value={orderQuantity}
							onChange={e => setOrderQuantity(e)}
							onSubmit={() =>
								addFoodToCart(orderNumber, orderQuantity, extras, "extras")
							}
						/>
					</Box>
				</>
			);
		case 5:
			return (
				<>
					<Text> Pick your drinks: </Text>
					<Table data={drinks} />
					<Box>
						<Box marginRight={1}>Pick number:</Box>
						<TextInput
							value={orderNumber}
							onChange={e => setOrderNumber(e)}
							onSubmit={() => handleSubmitFoodName(drinks, orderNumber)}
						/>
					</Box>
				</>
			);
		case 6:
			return (
				<>
					<Box>
						<Box marginRight={1}>Quantity: </Box>
						<TextInput
							value={orderQuantity}
							onChange={e => setOrderQuantity(e)}
							onSubmit={() =>
								addFoodToCart(orderNumber, orderQuantity, drinks, "drinks")
							}
						/>
					</Box>
				</>
			);
		case 7:
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
