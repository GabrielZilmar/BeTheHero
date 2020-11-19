import crypto from "crypto";

export const generateUuid = () => {
	const hexString = crypto.randomBytes(16).toString("hex");

	return (
		hexString.substring(0, 8) +
		"-" +
		hexString.substring(8, 12) +
		"-" +
		hexString.substring(12, 16) +
		"-" +
		hexString.substring(16, 20) +
		"-" +
		hexString.substring(20)
	);
};

export const validUf = (uf) => {
	const UFS = [
		"RO",
		"AC",
		"AM",
		"RR",
		"PA",
		"AP",
		"TO",
		"MA",
		"PI",
		"CE",
		"RN",
		"PB",
		"PE",
		"AL",
		"SE",
		"BA",
		"MG",
		"ES",
		"RJ",
		"SP",
		"PR",
		"SC",
		"RS",
		"MS",
		"MT",
		"GO",
		"DF",
	];

	return UFS.indexOf(uf) !== -1 ? true : false;
};

export const validEmail = (email) => {
	if (!email) {
		return false;
	}
	const indexOfAtSing = email.indexOf("@");
	const indexOfDot = email.lastIndexOf(".");
	return (
		indexOfAtSing !== -1 &&
		indexOfDot > indexOfAtSing &&
		indexOfDot + 1 !== email.length
	);
};

export const validUuid = (uuid) => {
	return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
		uuid
	);
};
