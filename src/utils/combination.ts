function addZeros(num: number, digits: number = 2) {
    const str = num.toString();
    if (str.length <= digits) {
        return "0".repeat(digits - str.length) + str;
    }
    return str;
}


const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

export function combine(dic: {[p: string]: {[p: string]: string}}) {
    let counter = 0;
    const columns = Object.keys(dic).map(k => ({key: k, values: Object.values(dic[k])}))
    const combinable = columns.map(c => c.values);
    const combinations = cartesian(...combinable);
    return combinations.map(combination => {
        const result = {counter: addZeros(counter)};
        counter++;
        for (let i = 0; i < combination.length; i++) {
            const column = columns[i];
            const element = combination[i];
            result[column.key] = element;
        }
        return result;
    });
}

