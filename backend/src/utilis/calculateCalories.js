
export const calculateCalories = ({ weight, height, age, gender, goal }) => {
    weight = Number(weight);
    height = Number(height);
    age = Number(age);

    let BMR = 0;

    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    } else if (gender === 'others') {
        const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
        const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
        BMR = (maleBMR + femaleBMR) / 2;
    } else {
        const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
        const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
        BMR = (maleBMR + femaleBMR) / 2;
    }

    const TDEE = BMR * 1.55;

    if (goal === 'gain') {
        return Math.round(TDEE + 400);
    } else if (goal === 'lose' || goal === 'loss') {
        return Math.round(TDEE - 500);
    } else {
        return Math.round(TDEE);
    }
};
