const years = [];
for (let i = new Date().getFullYear(); i > 2016; i--) {
	years.push({ label: `${i}`, value: `${i}` });
}

export default years;
