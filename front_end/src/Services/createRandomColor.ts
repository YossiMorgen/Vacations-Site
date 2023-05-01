function getNotMinOrMaxRandom(min:number, max:number):number{
    return Math.random() * (max - min - 2) + min + 1;
}

export default function getRandomColor():string{
    return `rgba(${getNotMinOrMaxRandom(0, 255)},${getNotMinOrMaxRandom(0, 255)},${getNotMinOrMaxRandom(0, 255)},${getNotMinOrMaxRandom(0, 10)})`;
}