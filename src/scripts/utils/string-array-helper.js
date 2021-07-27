const joinArrayToString = (arrayData = []) => {
    let stringData = '-';
    if (arrayData && arrayData.length > 0) {
        stringData = arrayData.reduce((acc, currentValue, index) => {
            let stringvalue = acc;
            if (index === 0) {
                stringvalue += currentValue.name;
            } else {
                stringvalue += `, ${currentValue.name}`;
            }
            return stringvalue;
        }, '');
    }

    return stringData;
};

export default joinArrayToString;
