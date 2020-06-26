function addZeros(num: number, digits: number = 2) {
    const str = num.toString();
    if (str.length <= digits) {
        return "0".repeat(digits - str.length) + str;
    }
    return str;
}

function g(a: Array<any>, b: Array<any>) {
    const aux = a.map(d => b.map(e => ([] as any[]).concat(d, e)));
    return ([] as any[]).concat(...aux);
}
function cartesian(a: Array<any>, ...p: Array<any>): Array<Array<any>> {
    const b = p.shift();

    return b ? cartesian(g(a, b), ...p) : a;
}

export function combine(dic: {[p: string]: {[p: string]: string}}) {
    let counter = 0;
    const columns = Object.keys(dic).map(k => ({key: k, values: Object.values(dic[k])}))
    const combinable = columns.map(c => c.values);
    const combinations = cartesian(combinable.shift()!, ...combinable);
    return combinations.map(combination => {
        const result: {counter: string; [p: string]: any} = {counter: addZeros(counter)};
        counter++;
        for (let i = 0; i < combination.length; i++) {
            const column = columns[i];
            result[column.key] = combination[i];
        }
        return result;
    });
}

