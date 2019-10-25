import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Text, Box } from "ink";
import Table from "ink-table";
import axios from "axios";

import TextInput from "ink-text-input";
import { API_KEY } from "../configs";

const requestBody = {
	range: "Sheet1",
	majorDimension: "ROWS",
	values: []
};

const foods = [
	{ id: 1, name: "sườn non nướng sữa" },
	{ id: 2, name: "Thịt kho trứng cút" },
	{ id: 3, name: "thịt bò xào cải chua" },
	{ id: 4, name: "sườn thêm" },
	{ id: 5, name: "thịt kho thêm" },
	{ id: 6, name: "bò thêm" },
	{ id: 7, name: "Nuoc dua" }
];

///List all Menu for today
const MenuList = ({ list }) => {
	const [order, setOrder] = useState("");
	const [cart, setCart] = useState([]);
	const [name, setName] = useState("");
	const [step, setStep] = useState(0);
	const [listFood, setListFood] = useState({});

	useEffect(() => {
		async function fetchData() {
			const response = await axios(
				"https://sheets.googleapis.com/v4/spreadsheets/1ZjzZKCMOFp5YncC3yZLLwFW4sER6p5fkR0rA5KvhHrY/values/Sheet1?key=AIzaSyCccptxVWHp1Mf4BGCC33m1SzgwU14BRD4"
			);
			setListFood(response.data.values[1]);
			setCart(Array(response.data.values[1].length).fill(""));
		}
		fetchData();
	}, []);

	const handleSubmitFood = (data, order) => {
		const input = order
			.trim()
			.split(" ")
			.map(i => parseInt(i));
		const numberRange = data.map(food => food.id);
		if (input === 0 || numberRange.includes(input[0])) {
			setCart(([input[0]] = input[1]));
			setStep(step + 1);
			//setOrder("");
		} else {
			console.log("number invalid");
		}
	};

	switch (step) {
		case 1:
			return (
				<>
					<Text>Hi {name} </Text>
					<Text>List foods for today: </Text>
					<Table data={foods} />
					<Box>
						<Box marginRight={1}>Pick number and quantity: </Box>
						<TextInput
							value={order}
							onChange={e => setOrder(e)}
							onSubmit={() => handleSubmitFood(foods, order)}
						/>
					</Box>
				</>
			);
		case 2:
			return (
				<>
					<Text>Do you want to choose other(y/n): </Text>
					<TextInput
						value=""
						onChange={e => (e === "y" ? setStep(1) : setStep(step + 1))}
					/>
				</>
			);
		case 3:
			return (
				<>
					<Text>Done. Thank you and have a nice day !!! </Text>
					<Text> cart ne {cart} </Text>
				</>
			);
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
