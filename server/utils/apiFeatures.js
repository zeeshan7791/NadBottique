class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCategory = { ...this.queryStr };
    const removeQueries = ["keyword", "page", "limit"];
    removeQueries.forEach((key) => delete queryCategory[key]);

    let queryCategoryStr = JSON.stringify(queryCategory);
    queryCategoryStr = queryCategoryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );
    const newCategory = JSON.parse(queryCategoryStr);
    this.query = this.query.find(newCategory);

    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skipProducts = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skipProducts);
    return this;
  }
}

module.exports = ApiFeatures;
