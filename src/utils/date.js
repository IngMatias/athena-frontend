const formatDateToDDMMAAAAA = (date) => {
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
    const year = newDate.getFullYear();

    return `${day}-${month}-${year}`;
};

export { formatDateToDDMMAAAAA };
