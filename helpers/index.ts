import randomWords from "random-words";

export const generateWords = (length: number) =>
	randomWords({ min: length, max: length }).join(" ");

export const countWords = (words: string) => {
	return words.split(" ").length;
};
