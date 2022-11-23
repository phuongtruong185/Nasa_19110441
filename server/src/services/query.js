const getPagination = (query) => {
    const { page, limit } = query;
    const skip = page ? (page - 1) * limit : 0;

    return { skip, limit };
};

module.exports = {
    getPagination
};